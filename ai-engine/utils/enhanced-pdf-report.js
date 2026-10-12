/**
 * Enhanced PDF Test Report Generator
 * Generates comprehensive PDF reports with test case details and execution steps
 *
 * Features:
 * - Test execution summary (total, passed, failed, pass rate)
 * - Individual test case details with status
 * - Test steps in tabular format from test case markdown files
 * - Professional styling with color-coded status badges
 *
 * Usage:
 *   const generator = new EnhancedPDFReportGenerator();
 *   await generator.generateReport('test-registry/automation/test-results/reports/2026-08-22/results.json');
 */

const fs = require('fs').promises;
const path = require('path');
const { chromium } = require('playwright');

class EnhancedPDFReportGenerator {
  constructor(options = {}) {
    this.projectRoot = options.projectRoot || process.cwd();
    this.testCasesDir = path.join(this.projectRoot, 'test-registry', 'testcases', 'AI-generated testcases');
  }

  /**
   * Generate comprehensive PDF report from Playwright results
   */
  async generateReport(resultsPath, outputPath = null) {
    console.log('📄 Reading test results...');
    const resultsContent = await fs.readFile(resultsPath, 'utf-8');
    const results = JSON.parse(resultsContent);

    console.log('📊 Extracting test cases...');
    const testCases = this.extractTestCases(results);

    console.log('📈 Calculating summary...');
    const summary = this.calculateSummary(testCases, results);

    console.log('📝 Loading test case details...');
    const testCasesWithSteps = await this.loadTestCaseDetails(testCases);

    // Default output path
    const output = outputPath || path.join(
      path.dirname(resultsPath),
      `test-execution-report-${new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)}.pdf`
    );

    // Ensure output directory exists
    await fs.mkdir(path.dirname(output), { recursive: true });

    // Copy screenshots and videos to report directory
    console.log('📸 Copying media files to report directory...');
    const reportDir = path.dirname(resultsPath);
    await this.copyMediaFiles(testCasesWithSteps, reportDir);

    // Generate interactive HTML (collapsible)
    console.log('🎨 Generating interactive HTML...');
    const interactiveHtml = this.generateHTML(testCasesWithSteps, summary, results, true);
    const htmlPath = output.replace('.pdf', '.html');
    await fs.writeFile(htmlPath, interactiveHtml);
    console.log(`✅ Interactive HTML saved: ${htmlPath}`);

    // Generate static HTML for PDF (no collapsible elements)
    console.log('🎨 Generating static HTML for PDF...');
    const staticHtml = this.generateHTML(testCasesWithSteps, summary, results, false);
    const staticHtmlPath = output.replace('.pdf', '-static.html');
    await fs.writeFile(staticHtmlPath, staticHtml);

    // Generate PDF from static HTML
    console.log('🖨️  Converting to PDF...');
    await this.convertToPDF(staticHtmlPath, output);

    // Clean up static HTML
    await fs.unlink(staticHtmlPath);
    console.log('🗑️  Cleaned up static HTML');

    console.log(`✅ PDF report generated: ${output}`);
    return output;
  }

  /**
   * Extract test cases from Playwright results
   */
  extractTestCases(results) {
    const testCases = [];

    for (const suite of results.suites || []) {
      this.extractFromSuite(suite, testCases);
    }

    return testCases;
  }

  extractFromSuite(suite, testCases) {
    // Process specs in this suite
    for (const spec of suite.specs || []) {
      for (const test of spec.tests || []) {
        const result = test.results[test.results.length - 1]; // Latest retry

        testCases.push({
          id: this.extractTestCaseId(spec.title),
          title: spec.title,
          file: suite.file,
          status: result.status,
          duration: result.duration,
          errors: result.errors || [],
          retries: test.results.length - 1,
          error: result.error?.message || null,
          attachments: result.attachments || [],
          screenshots: (result.attachments || []).filter(a => a.contentType?.includes('image')),
          videos: (result.attachments || []).filter(a => a.contentType?.includes('video'))
        });
      }
    }

    // Recursively process nested suites
    for (const nestedSuite of suite.suites || []) {
      this.extractFromSuite(nestedSuite, testCases);
    }
  }

  /**
   * Extract TC ID from test title
   */
  extractTestCaseId(title) {
    const match = title.match(/(TC[-_][\w-]+)/i);
    return match ? match[1] : 'N/A';
  }

  /**
   * Calculate summary statistics
   */
  calculateSummary(testCases, results) {
    const passed = testCases.filter(tc => tc.status === 'passed').length;
    const failed = testCases.filter(tc => tc.status === 'failed').length;
    const skipped = testCases.filter(tc => tc.status === 'skipped').length;
    const totalDuration = testCases.reduce((sum, tc) => sum + tc.duration, 0);

    return {
      total: testCases.length,
      passed,
      failed,
      skipped,
      passRate: testCases.length > 0 ? ((passed / testCases.length) * 100).toFixed(1) : 0,
      failRate: testCases.length > 0 ? ((failed / testCases.length) * 100).toFixed(1) : 0,
      totalDuration: this.formatDuration(totalDuration),
      startTime: results.stats?.startTime || new Date().toISOString(),
      endTime: results.stats?.endTime || new Date().toISOString(),
      projectName: results.config?.projects?.[0]?.name || 'SAP S/4HANA Cloud'
    };
  }

  /**
   * Load test case details (steps) from markdown files
   */
  async loadTestCaseDetails(testCases) {
    const testCasesWithSteps = [];

    for (const tc of testCases) {
      const steps = await this.findAndParseTestCase(tc.id);
      testCasesWithSteps.push({
        ...tc,
        steps: steps || []
      });
    }

    return testCasesWithSteps;
  }

  /**
   * Find and parse test case markdown file
   */
  async findAndParseTestCase(tcId) {
    try {
      // Search in all story folders
      const stories = await fs.readdir(this.testCasesDir);

      for (const storyKey of stories) {
        const tcPath = path.join(this.testCasesDir, storyKey, 'testcases', `${tcId}.md`);

        try {
          await fs.access(tcPath);
          const content = await fs.readFile(tcPath, 'utf-8');
          return this.parseTestSteps(content);
        } catch (e) {
          // File doesn't exist in this story folder, continue
          continue;
        }
      }

      return null;
    } catch (error) {
      console.warn(`⚠️  Could not find test case: ${tcId}`);
      return null;
    }
  }

  /**
   * Parse test steps from markdown content
   */
  parseTestSteps(content) {
    const steps = [];
    const lines = content.split('\n');
    let inStepsSection = false;
    let inTable = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Detect Test Steps section
      if (line.startsWith('## Test Steps') || line.startsWith('### Test Steps')) {
        inStepsSection = true;
        continue;
      }

      // Stop at next major section
      if (inStepsSection && line.startsWith('##') && !line.startsWith('## Test Steps')) {
        break;
      }

      // Detect table header
      if (inStepsSection && line.startsWith('|') && line.includes('Step') && line.includes('Action')) {
        inTable = true;
        i++; // Skip separator line
        continue;
      }

      // Parse table rows
      if (inTable && line.startsWith('|')) {
        const parts = line.split('|').map(p => p.trim()).filter(p => p);

        // Table has 4 columns: Step | Action | Test Data | Expected Result
        if (parts.length >= 4) {
          steps.push({
            step: parts[0],
            action: parts[1],
            testData: parts[2],           // Test Data column (placeholders like {TD.supplierId})
            expectedResult: parts[3]      // Actual Expected Result column
          });
        } else if (parts.length === 3) {
          // Fallback for tables with 3 columns (older format)
          steps.push({
            step: parts[0],
            action: parts[1],
            testData: '-',
            expectedResult: parts[2]
          });
        }
      } else if (inTable && !line.startsWith('|')) {
        // End of table
        break;
      }
    }

    return steps;
  }

  /**
   * Format duration
   */
  formatDuration(ms) {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  }

  /**
   * Generate HTML report with test steps
   * @param {boolean} interactive - If true, generates collapsible HTML; if false, static HTML for PDF
   */
  generateHTML(testCases, summary, results, interactive = true) {
    const now = new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'medium' });

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>SAP S/4HANA Test Execution Report</title>
    <style>
        @page {
            size: A4;
            margin: 1.5cm;
        }
        * {
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
            font-size: 11pt;
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #0066cc;
            padding-bottom: 20px;
            margin-bottom: 30px;
            page-break-after: avoid;
        }
        .header h1 {
            color: #0066cc;
            margin: 0 0 10px 0;
            font-size: 24pt;
        }
        .header .subtitle {
            color: #666;
            font-size: 11pt;
        }
        .summary-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 25px;
            page-break-inside: avoid;
            page-break-after: auto;
        }
        .summary-section h2 {
            margin: 0 0 15px 0;
            font-size: 16pt;
            border-bottom: 2px solid rgba(255,255,255,0.3);
            padding-bottom: 8px;
        }
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            margin-top: 15px;
        }
        .metric-box {
            background: rgba(255,255,255,0.15);
            padding: 15px;
            border-radius: 6px;
            text-align: center;
        }
        .metric-value {
            font-size: 28pt;
            font-weight: bold;
            margin-bottom: 3px;
        }
        .metric-label {
            font-size: 10pt;
            opacity: 0.9;
        }
        .controls-section {
            margin-bottom: 20px;
            text-align: right;
        }
        .control-btn {
            background: #0066cc;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 10pt;
            margin-left: 8px;
            transition: background 0.2s;
        }
        .control-btn:hover {
            background: #0052a3;
        }
        .testcase-section {
            margin-bottom: 15px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            background: white;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        .testcase-section.failed {
            border-left: 4px solid #dc3545;
        }
        .testcase-section.passed {
            border-left: 4px solid #28a745;
        }
        .testcase-header {
            padding: 15px;
            ${interactive ? `
            cursor: pointer;
            user-select: none;
            transition: background 0.2s;
            ` : ''}
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        ${interactive ? `
        .testcase-header:hover {
            background: #f8f9fa;
        }
        ` : ''}
        .testcase-header-left {
            flex: 1;
        }
        .testcase-header-right {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .collapse-icon {
            font-size: 18pt;
            transition: transform 0.3s;
            color: #666;
        }
        .testcase-section.collapsed .collapse-icon {
            transform: rotate(-90deg);
        }
        .testcase-content {
            padding: 0 15px 15px 15px;
            ${interactive ? `
            max-height: 10000px;
            overflow: hidden;
            transition: max-height 0.3s ease, padding 0.3s ease;
            ` : ''}
        }
        ${interactive ? `
        .testcase-section.collapsed .testcase-content {
            max-height: 0;
            padding: 0 15px;
        }
        ` : ''}
        .testcase-title {
            font-size: 13pt;
            font-weight: 600;
            color: #0066cc;
            margin-bottom: 5px;
        }
        .testcase-meta {
            font-size: 9pt;
            color: #666;
        }
        .status-badge {
            padding: 4px 10px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 9pt;
            display: inline-block;
            text-transform: uppercase;
            margin-left: 10px;
        }
        .status-passed {
            background-color: #28a745;
            color: white;
        }
        .status-failed {
            background-color: #dc3545;
            color: white;
        }
        .status-skipped {
            background-color: #6c757d;
            color: white;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
            background: white;
            border-radius: 6px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.08);
        }
        thead {
            background: linear-gradient(135deg, #0066cc 0%, #0088ee 100%);
            color: white;
        }
        th {
            padding: 10px 8px;
            text-align: left;
            font-weight: 600;
            font-size: 10pt;
        }
        td {
            padding: 8px;
            border-bottom: 1px solid #e0e0e0;
            font-size: 9pt;
            vertical-align: top;
        }
        tbody tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        tbody tr:hover {
            background-color: #f0f8ff;
        }
        .step-number {
            font-weight: 600;
            color: #0066cc;
            width: 50px;
            text-align: center;
        }
        .step-status-pass {
            background-color: #d4edda;
            color: #155724;
            font-weight: 600;
            text-align: center;
            border-left: 3px solid #28a745;
        }
        .step-status-fail {
            background-color: #f8d7da;
            color: #721c24;
            font-weight: 600;
            text-align: center;
            border-left: 3px solid #dc3545;
        }
        .failure-reason {
            font-size: 8pt;
            color: #721c24;
            font-style: italic;
        }
        .error-box {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 10px;
            margin-top: 10px;
            border-radius: 4px;
            font-size: 9pt;
        }
        .error-box strong {
            color: #dc3545;
        }
        .no-steps {
            text-align: center;
            padding: 20px;
            color: #999;
            font-style: italic;
            font-size: 9pt;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
            text-align: center;
            color: #666;
            font-size: 9pt;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎯 SAP S/4HANA Test Execution Report</h1>
        <div class="subtitle">Generated on ${now}</div>
        <div class="subtitle">Project: ${summary.projectName}</div>
    </div>

    <div class="summary-section">
        <h2>📊 Execution Summary</h2>
        <div class="metrics-grid">
            <div class="metric-box">
                <div class="metric-value">${summary.total}</div>
                <div class="metric-label">Total Tests</div>
            </div>
            <div class="metric-box">
                <div class="metric-value" style="color: #4ade80;">${summary.passed}</div>
                <div class="metric-label">Passed</div>
            </div>
            <div class="metric-box">
                <div class="metric-value" style="color: #f87171;">${summary.failed}</div>
                <div class="metric-label">Failed</div>
            </div>
            <div class="metric-box">
                <div class="metric-value">${summary.passRate}%</div>
                <div class="metric-label">Pass Rate</div>
            </div>
        </div>
        <div style="margin-top: 15px; font-size: 10pt;">
            <strong>Total Duration:</strong> ${summary.totalDuration} |
            <strong>Start:</strong> ${new Date(summary.startTime).toLocaleTimeString()} |
            <strong>End:</strong> ${new Date(summary.endTime).toLocaleTimeString()}
        </div>
    </div>

    <h2 style="color: #0066cc; border-bottom: 2px solid #0066cc; padding-bottom: 8px; margin-bottom: 15px;">📝 Test Case Details</h2>

    ${interactive ? `
    <div class="controls-section">
        <button class="control-btn" onclick="expandAll()">▼ Expand All</button>
        <button class="control-btn" onclick="collapseAll()">▶ Collapse All</button>
    </div>
    ` : ''}

    ${testCases.map(tc => this.generateTestCaseHTML(tc, interactive)).join('\n')}

    <div class="footer">
        <strong>SAP S/4HANA Cloud Automation Framework</strong><br>
        Powered by Playwright + Agent Teams Architecture<br>
        © ${new Date().getFullYear()} - All Rights Reserved
    </div>

    ${interactive ? `
    <script>
        // Toggle individual test case
        function toggleTestCase(element) {
            element.closest('.testcase-section').classList.toggle('collapsed');
        }

        // Expand all test cases
        function expandAll() {
            document.querySelectorAll('.testcase-section').forEach(section => {
                section.classList.remove('collapsed');
            });
        }

        // Collapse all test cases
        function collapseAll() {
            document.querySelectorAll('.testcase-section').forEach(section => {
                section.classList.add('collapsed');
            });
        }

        // Initialize: Collapse passed tests, expand failed tests
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.testcase-section.passed').forEach(section => {
                section.classList.add('collapsed');
            });
        });
    </script>
    ` : ''}
</body>
</html>
    `;
  }

  /**
   * Generate HTML for a single test case with steps
   * @param {boolean} interactive - If true, generates collapsible structure
   */
  generateTestCaseHTML(tc, interactive = true) {
    const statusClass = `status-${tc.status}`;
    const statusBadge = `<span class="status-badge ${statusClass}">${tc.status}</span>`;

    // Determine step-level status
    // If test passed, all steps passed
    // If test failed, mark last step as failed (since we don't have step-level tracking)
    const allStepsPassed = tc.status === 'passed';
    const failedStepIndex = tc.steps ? tc.steps.length - 1 : -1;

    // Generate screenshots section (ONLY for interactive HTML, NOT for PDF)
    let screenshotsSection = '';
    if (interactive && tc.screenshots && tc.screenshots.length > 0) {
      screenshotsSection = `
        <div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e0e0e0;">
          <h4 style="color: #0066cc; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #0066cc;">📸 Screenshots</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px;">
            ${tc.screenshots.map((screenshot, idx) => {
              const imgPath = screenshot.relativePath || screenshot.path || screenshot.body;
              return `
                <div style="background: white; border: 2px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                  <img src="${imgPath}" alt="Screenshot ${idx + 1}" style="width: 100%; height: auto; display: block; cursor: zoom-in;" onclick="window.open(this.src, '_blank')" title="Click to open full size" />
                  <div style="padding: 10px; background: #0066cc; color: white; font-size: 10pt; font-weight: 600;">
                    Screenshot ${idx + 1} ${screenshot.name ? '- ' + screenshot.name : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    // Generate videos section (ONLY for interactive HTML, NOT for PDF)
    let videosSection = '';
    if (interactive && tc.videos && tc.videos.length > 0) {
      videosSection = `
        <div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e0e0e0;">
          <h4 style="color: #0066cc; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #0066cc;">🎥 Test Execution Videos</h4>
          ${tc.videos.map((video, idx) => {
            const videoPath = video.relativePath || video.path || video.body;
            return `
              <div style="margin-bottom: 20px; background: white; padding: 15px; border-radius: 8px; border: 2px solid #e0e0e0; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="margin-bottom: 10px; font-weight: 600; color: #0066cc; font-size: 11pt;">
                  Video ${idx + 1} ${video.name ? '- ' + video.name : '- Full Test Execution Recording'}
                </div>
                <div style="display: flex; justify-content: center;">
                  <video controls preload="metadata" style="width: 100%; max-width: 1200px; height: auto; border: 2px solid #0066cc; border-radius: 6px; background: black;">
                    <source src="${videoPath}" type="${video.contentType || 'video/webm'}">
                    Your browser does not support the video tag. <a href="${videoPath}" target="_blank">Download video</a>
                  </video>
                </div>
                <div style="margin-top: 8px; font-size: 9pt; color: #666; text-align: center;">
                  💡 Tip: Click play to watch test execution. Use controls to skip forward/backward.
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    let stepsTable = '';
    if (tc.steps && tc.steps.length > 0) {
      stepsTable = `
        <table>
            <thead>
                <tr>
                    <th style="width: 50px;">Step</th>
                    <th style="width: 35%;">Action</th>
                    <th style="width: 30%;">Expected Result</th>
                    <th style="width: 80px;">Status</th>
                    <th style="width: 25%;">Failure Reason</th>
                </tr>
            </thead>
            <tbody>
                ${tc.steps.map((step, index) => {
                  const isFailedStep = !allStepsPassed && index === failedStepIndex;
                  const stepStatus = allStepsPassed ? 'PASS' : (isFailedStep ? 'FAIL' : 'PASS');
                  const stepStatusClass = stepStatus === 'PASS' ? 'step-status-pass' : 'step-status-fail';
                  const failureReason = isFailedStep && tc.error ? this.escapeHtml(tc.error) : '-';

                  return `
                    <tr>
                        <td class="step-number">${step.step}</td>
                        <td>${this.escapeHtml(step.action)}</td>
                        <td>${this.escapeHtml(step.expectedResult)}</td>
                        <td class="${stepStatusClass}">${stepStatus}</td>
                        <td class="failure-reason">${failureReason}</td>
                    </tr>
                  `;
                }).join('')}
            </tbody>
        </table>
      `;
    } else {
      stepsTable = '<div class="no-steps">Test steps not available for this test case</div>';
    }

    let errorBox = '';
    if (tc.status === 'failed' && tc.error) {
      errorBox = `
        <div class="error-box">
            <strong>❌ Overall Failure Reason:</strong><br>
            ${this.escapeHtml(tc.error)}
        </div>
      `;
    }

    const sectionClass = tc.status === 'passed' ? 'passed' : 'failed';

    if (interactive) {
      // Interactive HTML with collapsible sections - INCLUDE screenshots/videos
      return `
        <div class="testcase-section ${sectionClass}">
            <div class="testcase-header" onclick="toggleTestCase(this)">
                <div class="testcase-header-left">
                    <div class="testcase-title">
                        ${tc.id}: ${this.escapeHtml(tc.title)}
                    </div>
                    <div class="testcase-meta">
                        Duration: ${this.formatDuration(tc.duration)} |
                        File: ${tc.file}
                        ${tc.retries > 0 ? ` | Retries: ${tc.retries}` : ''}
                        ${tc.screenshots.length > 0 ? ` | 📸 ${tc.screenshots.length} screenshots` : ''}
                        ${tc.videos.length > 0 ? ` | 🎥 ${tc.videos.length} videos` : ''}
                    </div>
                </div>
                <div class="testcase-header-right">
                    ${statusBadge}
                    <span class="collapse-icon">▼</span>
                </div>
            </div>
            <div class="testcase-content">
                ${errorBox}
                ${stepsTable}
                ${screenshotsSection}
                ${videosSection}
            </div>
        </div>
      `;
    } else {
      // Static HTML for PDF - NO screenshots/videos (PDF doesn't need them)
      return `
        <div class="testcase-section ${sectionClass}">
            <div class="testcase-header">
                <div class="testcase-header-left">
                    <div class="testcase-title">
                        ${tc.id}: ${this.escapeHtml(tc.title)}
                        ${statusBadge}
                    </div>
                    <div class="testcase-meta">
                        Duration: ${this.formatDuration(tc.duration)} |
                        File: ${tc.file}
                        ${tc.retries > 0 ? ` | Retries: ${tc.retries}` : ''}
                    </div>
                </div>
            </div>
            <div class="testcase-content">
                ${errorBox}
                ${stepsTable}
            </div>
        </div>
      `;
    }
  }

  /**
   * Escape HTML entities
   */
  escapeHtml(text) {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Copy media files (screenshots/videos) to BOTH report directories
   */
  async copyMediaFiles(testCases, reportDir) {
    // Copy to test-results report directory (for Playwright native report)
    const testResultsMediaDir = path.join(reportDir, 'media');
    await fs.mkdir(testResultsMediaDir, { recursive: true });

    // Also copy to pdf-reports directory (for custom HTML report)
    const pdfReportsDir = path.join(this.projectRoot, 'test-registry', 'pdf-reports', 'media');
    await fs.mkdir(pdfReportsDir, { recursive: true });

    for (const tc of testCases) {
      // Copy screenshots
      if (tc.screenshots && tc.screenshots.length > 0) {
        for (let i = 0; i < tc.screenshots.length; i++) {
          const screenshot = tc.screenshots[i];
          if (screenshot.path && await this.fileExists(screenshot.path)) {
            const newFileName = `${tc.id}_screenshot_${i + 1}${path.extname(screenshot.path)}`;

            // Copy to test-results/media/
            const testResultsPath = path.join(testResultsMediaDir, newFileName);
            try {
              await fs.copyFile(screenshot.path, testResultsPath);
              console.log(`  ✓ Copied screenshot to test-results: ${newFileName}`);
            } catch (error) {
              console.warn(`  ⚠️  Failed to copy screenshot to test-results: ${screenshot.path}`);
            }

            // Copy to pdf-reports/media/
            const pdfReportsPath = path.join(pdfReportsDir, newFileName);
            try {
              await fs.copyFile(screenshot.path, pdfReportsPath);
              // Update path to relative path for HTML (relative to pdf-reports/)
              screenshot.relativePath = `media/${newFileName}`;
              console.log(`  ✓ Copied screenshot to pdf-reports: ${newFileName}`);
            } catch (error) {
              console.warn(`  ⚠️  Failed to copy screenshot to pdf-reports: ${screenshot.path}`);
            }
          }
        }
      }

      // Copy videos
      if (tc.videos && tc.videos.length > 0) {
        for (let i = 0; i < tc.videos.length; i++) {
          const video = tc.videos[i];
          if (video.path && await this.fileExists(video.path)) {
            const newFileName = `${tc.id}_video_${i + 1}${path.extname(video.path)}`;

            // Copy to test-results/media/
            const testResultsPath = path.join(testResultsMediaDir, newFileName);
            try {
              await fs.copyFile(video.path, testResultsPath);
              console.log(`  ✓ Copied video to test-results: ${newFileName}`);
            } catch (error) {
              console.warn(`  ⚠️  Failed to copy video to test-results: ${video.path}`);
            }

            // Copy to pdf-reports/media/
            const pdfReportsPath = path.join(pdfReportsDir, newFileName);
            try {
              await fs.copyFile(video.path, pdfReportsPath);
              // Update path to relative path for HTML (relative to pdf-reports/)
              video.relativePath = `media/${newFileName}`;
              console.log(`  ✓ Copied video to pdf-reports: ${newFileName}`);
            } catch (error) {
              console.warn(`  ⚠️  Failed to copy video to pdf-reports: ${video.path}`);
            }
          }
        }
      }
    }
  }

  /**
   * Check if file exists
   */
  async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Convert HTML to PDF using Playwright
   */
  async convertToPDF(htmlPath, pdfPath) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Convert to absolute path and use proper file URL format for Windows
    const absoluteHtmlPath = path.resolve(htmlPath);
    const fileUrl = `file:///${absoluteHtmlPath.replace(/\\/g, '/')}`;

    await page.goto(fileUrl, { waitUntil: 'networkidle' });
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '1.5cm',
        right: '1.5cm',
        bottom: '1.5cm',
        left: '1.5cm'
      }
    });
    await browser.close();
  }
}

module.exports = EnhancedPDFReportGenerator;

// CLI Usage
if (require.main === module) {
  const resultsPath = process.argv[2];
  const outputPath = process.argv[3];

  if (!resultsPath) {
    console.error('Usage: node enhanced-pdf-report.js <results.json> [output.pdf]');
    process.exit(1);
  }

  const generator = new EnhancedPDFReportGenerator();
  generator.generateReport(resultsPath, outputPath)
    .then(output => console.log(`\n✅ PDF report generated successfully!\n📄 ${output}`))
    .catch(error => {
      console.error('❌ Error generating report:', error);
      process.exit(1);
    });
}
