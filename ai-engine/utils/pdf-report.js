/**
 * PDF Test Report Generator
 * Generates professional PDF test execution reports from Playwright test results
 *
 * Usage:
 *   const generator = new PDFReportGenerator();
 *   await generator.generateReport('test-results/reports/2026-08-03/results.json', 'output/report.pdf');
 */

const fs = require('fs').promises;
const path = require('path');
const { chromium } = require('playwright');

class PDFReportGenerator {
  constructor(options = {}) {
    this.projectRoot = options.projectRoot || process.cwd();
  }

  /**
   * Generate PDF report from Playwright results JSON
   */
  async generateReport(resultsPath, outputPath = null) {
    // Read test results
    const resultsContent = await fs.readFile(resultsPath, 'utf-8');
    const results = JSON.parse(resultsContent);

    // Extract test cases
    const testCases = this.extractTestCases(results);

    // Calculate summary statistics
    const summary = this.calculateSummary(testCases, results);

    // Generate HTML
    const html = this.generateHTML(testCases, summary, results);

    // Default output path
    const output = outputPath || path.join(
      path.dirname(resultsPath),
      'test-execution-report.pdf'
    );

    // Ensure output directory exists
    await fs.mkdir(path.dirname(output), { recursive: true });

    // Save HTML for debugging
    const htmlPath = output.replace('.pdf', '.html');
    await fs.writeFile(htmlPath, html);

    // Generate PDF
    await this.convertToPDF(htmlPath, output);

    return output;
  }

  /**
   * Extract test cases from results
   */
  extractTestCases(results) {
    const testCases = [];

    for (const suite of results.suites || []) {
      for (const spec of suite.specs || []) {
        for (const test of spec.tests || []) {
          const result = test.results[test.results.length - 1]; // Get latest retry result

          testCases.push({
            id: this.extractTestCaseId(spec.title),
            title: spec.title,
            file: suite.file,
            status: result.status,
            duration: result.duration,
            errors: result.errors || [],
            stdout: result.stdout || [],
            stderr: result.stderr || [],
            retries: test.results.length - 1,
            attachments: result.attachments || []
          });
        }
      }
    }

    return testCases;
  }

  /**
   * Extract TC ID from test title
   */
  extractTestCaseId(title) {
    const match = title.match(/(TC-[\w-]+)/);
    return match ? match[1] : 'N/A';
  }

  /**
   * Calculate summary statistics
   */
  calculateSummary(testCases, results) {
    const passed = testCases.filter(tc => tc.status === 'passed').length;
    const failed = testCases.filter(tc => tc.status === 'failed').length;
    const skipped = testCases.filter(tc => tc.status === 'skipped').length;
    const flaky = testCases.filter(tc => tc.status === 'passed' && tc.retries > 0).length;

    const totalDuration = testCases.reduce((sum, tc) => sum + tc.duration, 0);

    return {
      total: testCases.length,
      passed,
      failed,
      skipped,
      flaky,
      passRate: testCases.length > 0 ? ((passed / testCases.length) * 100).toFixed(1) : 0,
      totalDuration: this.formatDuration(totalDuration),
      startTime: results.stats?.startTime || new Date().toISOString(),
      projectName: results.config?.projects?.[0]?.name || 'Unknown'
    };
  }

  /**
   * Format duration from ms to human-readable
   */
  formatDuration(ms) {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  }

  /**
   * Generate HTML report
   */
  generateHTML(testCases, summary, results) {
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
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #0066cc;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #0066cc;
            margin: 0 0 10px 0;
            font-size: 28px;
        }
        .header .subtitle {
            color: #666;
            font-size: 14px;
        }
        .summary-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px;
            border-radius: 10px;
            margin-bottom: 30px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .summary-section h2 {
            margin: 0 0 20px 0;
            font-size: 22px;
            border-bottom: 2px solid rgba(255,255,255,0.3);
            padding-bottom: 10px;
        }
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        .metric-box {
            background: rgba(255,255,255,0.15);
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            backdrop-filter: blur(10px);
        }
        .metric-value {
            font-size: 36px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .metric-label {
            font-size: 14px;
            opacity: 0.9;
        }
        .testcases-list {
            margin-bottom: 40px;
        }
        .testcases-list h2 {
            color: #0066cc;
            border-bottom: 2px solid #0066cc;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        thead {
            background: linear-gradient(135deg, #0066cc 0%, #0088ee 100%);
            color: white;
        }
        th {
            padding: 15px 12px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
        }
        td {
            padding: 12px;
            border-bottom: 1px solid #e0e0e0;
        }
        tbody tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        tbody tr:hover {
            background-color: #f0f8ff;
        }
        .status-badge {
            padding: 6px 12px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 12px;
            display: inline-block;
            text-transform: uppercase;
        }
        .status-passed {
            background-color: #d4edda;
            color: #155724;
        }
        .status-failed {
            background-color: #f8d7da;
            color: #721c24;
        }
        .status-skipped {
            background-color: #fff3cd;
            color: #856404;
        }
        .detailed-section {
            page-break-before: always;
            margin-top: 40px;
        }
        .test-detail {
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            margin-bottom: 30px;
            overflow: hidden;
            page-break-inside: avoid;
        }
        .test-detail-header {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 20px;
            border-bottom: 2px solid #0066cc;
        }
        .test-detail-header h3 {
            margin: 0 0 10px 0;
            color: #0066cc;
            font-size: 20px;
        }
        .test-detail-body {
            padding: 20px;
        }
        .detail-row {
            display: flex;
            margin-bottom: 12px;
            padding: 10px;
            background-color: #f9f9f9;
            border-radius: 5px;
        }
        .detail-label {
            font-weight: 600;
            color: #666;
            min-width: 150px;
        }
        .detail-value {
            flex: 1;
            color: #333;
        }
        .error-section {
            background-color: #fff5f5;
            border-left: 4px solid #e53e3e;
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
        }
        .error-section h4 {
            color: #e53e3e;
            margin: 0 0 10px 0;
        }
        .error-message {
            font-family: 'Courier New', monospace;
            font-size: 13px;
            background-color: #fff;
            padding: 10px;
            border-radius: 5px;
            white-space: pre-wrap;
            word-break: break-word;
        }
        .stdout-section {
            background-color: #f0fff4;
            border-left: 4px solid #48bb78;
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
        }
        .stdout-section h4 {
            color: #48bb78;
            margin: 0 0 10px 0;
        }
        .stdout-content {
            font-family: 'Courier New', monospace;
            font-size: 12px;
            background-color: #fff;
            padding: 10px;
            border-radius: 5px;
            white-space: pre-wrap;
            max-height: 300px;
            overflow-y: auto;
        }
        .footer {
            text-align: center;
            color: #999;
            font-size: 12px;
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
        }
        .page-break {
            page-break-after: always;
        }
        code {
            background-color: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 13px;
        }
    </style>
</head>
<body>
    ${this.generateHeaderSection(summary)}
    ${this.generateSummarySection(summary)}
    ${this.generateTestCasesListSection(testCases)}
    <div class="page-break"></div>
    ${this.generateDetailedSection(testCases)}
    ${this.generateFooter()}
</body>
</html>
    `;
  }

  /**
   * Generate header section
   */
  generateHeaderSection(summary) {
    const date = new Date(summary.startTime).toLocaleString('en-US', {
      dateStyle: 'long',
      timeStyle: 'short'
    });

    return `
    <div class="header">
        <h1>📊 SAP S/4HANA Test Execution Report</h1>
        <div class="subtitle">
            <strong>Project:</strong> ${summary.projectName} |
            <strong>Generated:</strong> ${date}
        </div>
    </div>
    `;
  }

  /**
   * Generate summary section
   */
  generateSummarySection(summary) {
    return `
    <div class="summary-section">
        <h2>Executive Summary</h2>
        <div class="metrics-grid">
            <div class="metric-box">
                <div class="metric-value">${summary.total}</div>
                <div class="metric-label">Total Tests</div>
            </div>
            <div class="metric-box">
                <div class="metric-value">${summary.passed}</div>
                <div class="metric-label">Passed</div>
            </div>
            <div class="metric-box">
                <div class="metric-value">${summary.failed}</div>
                <div class="metric-label">Failed</div>
            </div>
            <div class="metric-box">
                <div class="metric-value">${summary.skipped}</div>
                <div class="metric-label">Skipped</div>
            </div>
            <div class="metric-box">
                <div class="metric-value">${summary.flaky}</div>
                <div class="metric-label">Flaky</div>
            </div>
            <div class="metric-box">
                <div class="metric-value">${summary.passRate}%</div>
                <div class="metric-label">Pass Rate</div>
            </div>
            <div class="metric-box">
                <div class="metric-value">${summary.totalDuration}</div>
                <div class="metric-label">Duration</div>
            </div>
        </div>
    </div>
    `;
  }

  /**
   * Generate test cases list section
   */
  generateTestCasesListSection(testCases) {
    const rows = testCases.map((tc, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><code>${tc.id}</code></td>
            <td>${this.escapeHtml(tc.title.replace(tc.id, '').trim())}</td>
            <td>
                <span class="status-badge status-${tc.status}">${tc.status}</span>
            </td>
            <td>${this.formatDuration(tc.duration)}</td>
            <td>${tc.retries}</td>
        </tr>
    `).join('');

    return `
    <div class="testcases-list">
        <h2>Test Cases Executed</h2>
        <table>
            <thead>
                <tr>
                    <th style="width: 50px;">#</th>
                    <th style="width: 120px;">TC ID</th>
                    <th>Test Case</th>
                    <th style="width: 100px;">Status</th>
                    <th style="width: 100px;">Duration</th>
                    <th style="width: 80px;">Retries</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    </div>
    `;
  }

  /**
   * Generate detailed section for each test case
   */
  generateDetailedSection(testCases) {
    const details = testCases.map((tc, index) =>
      this.generateTestCaseDetail(tc, index + 1)
    ).join('');

    return `
    <div class="detailed-section">
        <h2 style="color: #0066cc; border-bottom: 2px solid #0066cc; padding-bottom: 10px; margin-bottom: 30px;">
            Detailed Test Results
        </h2>
        ${details}
    </div>
    `;
  }

  /**
   * Generate detail for single test case
   */
  generateTestCaseDetail(tc, number) {
    const statusClass = `status-${tc.status}`;

    return `
    <div class="test-detail">
        <div class="test-detail-header">
            <h3>${number}. ${this.escapeHtml(tc.title)}</h3>
            <span class="status-badge ${statusClass}">${tc.status}</span>
        </div>
        <div class="test-detail-body">
            <div class="detail-row">
                <div class="detail-label">Test Case ID:</div>
                <div class="detail-value"><code>${tc.id}</code></div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Test File:</div>
                <div class="detail-value"><code>${tc.file}</code></div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Duration:</div>
                <div class="detail-value">${this.formatDuration(tc.duration)}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Retries:</div>
                <div class="detail-value">${tc.retries}</div>
            </div>

            ${tc.errors.length > 0 ? this.generateErrorSection(tc.errors) : ''}
            ${tc.stdout.length > 0 ? this.generateStdoutSection(tc.stdout) : ''}
        </div>
    </div>
    `;
  }

  /**
   * Generate error section
   */
  generateErrorSection(errors) {
    const errorMessages = errors.map(err =>
      this.escapeHtml(err.message || JSON.stringify(err))
    ).join('\n\n---\n\n');

    return `
    <div class="error-section">
        <h4>❌ Error Details</h4>
        <div class="error-message">${errorMessages}</div>
    </div>
    `;
  }

  /**
   * Generate stdout section
   */
  generateStdoutSection(stdout) {
    const output = stdout.map(s =>
      typeof s === 'string' ? s : s.text || JSON.stringify(s)
    ).join('');

    return `
    <div class="stdout-section">
        <h4>📋 Execution Log</h4>
        <div class="stdout-content">${this.escapeHtml(output)}</div>
    </div>
    `;
  }

  /**
   * Generate footer
   */
  generateFooter() {
    return `
    <div class="footer">
        <p><strong>© ${new Date().getFullYear()} SAP S/4HANA Cloud Automation Project - Capgemini</strong></p>
        <p>Generated by SAP Agent Teams | Playwright Test Framework</p>
        <p>Report generated: ${new Date().toLocaleString()}</p>
    </div>
    `;
  }

  /**
   * Escape HTML special characters
   */
  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  /**
   * Convert HTML to PDF using Playwright
   */
  async convertToPDF(htmlPath, pdfPath) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm'
      },
      printBackground: true
    });

    await browser.close();

    console.log(`✓ PDF report generated: ${pdfPath}`);
  }
}

module.exports = { PDFReportGenerator };
