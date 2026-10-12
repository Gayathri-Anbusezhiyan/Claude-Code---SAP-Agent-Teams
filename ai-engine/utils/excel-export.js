/**
 * Excel Export Utility for SAP Test Cases
 * Exports test cases from markdown to Excel format (.xlsx)
 *
 * Usage:
 *   const exporter = new TestCaseExcelExporter();
 *   await exporter.exportStory('CS-2', 'output/CS-2-testcases.xlsx');
 *   await exporter.exportAllStories('output/all-testcases.xlsx');
 */

const ExcelJS = require('exceljs');
const fs = require('fs').promises;
const path = require('path');

class TestCaseExcelExporter {
  constructor(options = {}) {
    this.testcasesDir = options.testcasesDir || path.join(process.cwd(), 'test-registry', 'testcases', 'AI-generated testcases');
    this.outputDir = options.outputDir || path.join(process.cwd(), 'test-registry', 'test-results', 'excel-exports');
  }

  /**
   * Export test cases for a specific story key
   */
  async exportStory(storyKey, outputPath = null) {
    const storyPath = path.join(this.testcasesDir, storyKey);

    // Check if story exists
    try {
      await fs.access(storyPath);
    } catch (e) {
      throw new Error(`Story ${storyKey} not found at ${storyPath}`);
    }

    // Read summary JSON
    const summaryPath = path.join(storyPath, `${storyKey}-summary.json`);
    let summary = null;
    try {
      const summaryContent = await fs.readFile(summaryPath, 'utf-8');
      summary = JSON.parse(summaryContent);
    } catch (e) {
      console.warn(`Warning: Could not read summary file for ${storyKey}`);
    }

    // Read all test case files
    const testcasesPath = path.join(storyPath, 'testcases');
    const testcaseFiles = await fs.readdir(testcasesPath);
    const mdFiles = testcaseFiles.filter(f => f.endsWith('.md'));

    const testcases = [];
    for (const file of mdFiles) {
      const filePath = path.join(testcasesPath, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const parsed = this.parseTestCase(content, file);
      testcases.push(parsed);
    }

    // Generate Excel
    // Default: Save to story's testcases directory
    const defaultOutput = path.join(storyPath, 'testcases', `${storyKey}-testcases.xlsx`);
    const output = outputPath || defaultOutput;
    await this.generateExcel(testcases, output, storyKey, summary);

    return output;
  }

  /**
   * Export all test cases from all stories
   */
  async exportAllStories(outputPath = null) {
    const stories = await fs.readdir(this.testcasesDir);

    const allTestcases = [];
    for (const storyKey of stories) {
      const storyPath = path.join(this.testcasesDir, storyKey);
      const stat = await fs.stat(storyPath);

      if (!stat.isDirectory()) continue;

      // Read test cases for this story
      const testcasesPath = path.join(storyPath, 'testcases');
      try {
        const testcaseFiles = await fs.readdir(testcasesPath);
        const mdFiles = testcaseFiles.filter(f => f.endsWith('.md'));

        for (const file of mdFiles) {
          const filePath = path.join(testcasesPath, file);
          const content = await fs.readFile(filePath, 'utf-8');
          const parsed = this.parseTestCase(content, file);
          parsed.storyKey = storyKey;
          allTestcases.push(parsed);
        }
      } catch (e) {
        console.warn(`Warning: Could not read test cases for ${storyKey}`);
      }
    }

    const output = outputPath || path.join(this.outputDir, `all-testcases.xlsx`);
    await this.generateExcel(allTestcases, output, 'ALL', null);

    return output;
  }

  /**
   * Parse test case markdown file
   */
  parseTestCase(content, filename) {
    const lines = content.split('\n');

    const testcase = {
      id: '',
      title: '',
      userStory: '',
      epic: '',
      module: '',
      feature: '',
      testType: '',
      scenarioType: '',
      priority: '',
      severity: '',
      automationCandidate: '',
      estimatedEffort: '',
      preconditions: [],
      testData: [],
      testSteps: [],
      expectedResult: '',
      errorScenarios: [],
      traceability: []
    };

    // Extract TC ID and title from first line
    const titleMatch = lines[0].match(/^#\s*(TC-[\w-]+):\s*(.+)$/);
    if (titleMatch) {
      testcase.id = titleMatch[1];
      testcase.title = titleMatch[2];
    }

    // Extract metadata fields
    for (let i = 1; i < Math.min(lines.length, 20); i++) {
      const line = lines[i];

      if (line.startsWith('**User Story:**')) {
        testcase.userStory = line.replace(/^\*\*User Story:\*\*\s*/, '').trim();
      } else if (line.startsWith('**Epic:**')) {
        testcase.epic = line.replace(/^\*\*Epic:\*\*\s*/, '').trim();
      } else if (line.startsWith('**Module:**')) {
        testcase.module = line.replace(/^\*\*Module:\*\*\s*/, '').trim();
      } else if (line.startsWith('**Feature:**')) {
        testcase.feature = line.replace(/^\*\*Feature:\*\*\s*/, '').trim();
      } else if (line.startsWith('**Test Type:**')) {
        testcase.testType = line.replace(/^\*\*Test Type:\*\*\s*/, '').trim();
      } else if (line.startsWith('**Scenario Type:**')) {
        testcase.scenarioType = line.replace(/^\*\*Scenario Type:\*\*\s*/, '').trim();
      } else if (line.startsWith('**Priority:**')) {
        testcase.priority = line.replace(/^\*\*Priority:\*\*\s*/, '').trim();
      } else if (line.startsWith('**Severity:**')) {
        testcase.severity = line.replace(/^\*\*Severity:\*\*\s*/, '').trim();
      } else if (line.startsWith('**Automation Candidate:**')) {
        testcase.automationCandidate = line.replace(/^\*\*Automation Candidate:\*\*\s*/, '').trim();
      } else if (line.startsWith('**Estimated Effort:**')) {
        testcase.estimatedEffort = line.replace(/^\*\*Estimated Effort:\*\*\s*/, '').trim();
      }
    }

    // Parse preconditions table
    const preconditionsStart = lines.findIndex(l => l.includes('### Pre-conditions'));
    if (preconditionsStart > -1) {
      for (let i = preconditionsStart + 3; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('|') && !line.includes('---') && !line.includes('Pre-condition')) {
          const parts = line.split('|').map(p => p.trim()).filter(p => p);
          if (parts.length >= 3) {
            testcase.preconditions.push({
              id: parts[0],
              name: parts[1],
              detail: parts[2]
            });
          }
        }
        if (line === '---' || line.startsWith('###')) break;
      }
    }

    // Parse test data table
    const testDataStart = lines.findIndex(l => l.includes('### Test Data'));
    if (testDataStart > -1) {
      for (let i = testDataStart + 3; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('|') && !line.includes('---') && !line.includes('Parameter')) {
          const parts = line.split('|').map(p => p.trim()).filter(p => p);
          if (parts.length >= 4) {
            testcase.testData.push({
              parameter: parts[0],
              placeholder: parts[1],
              description: parts[2],
              validity: parts[3]
            });
          }
        }
        if (line === '---' || line.startsWith('###')) break;
      }
    }

    // Parse test steps table
    const testStepsStart = lines.findIndex(l => l.includes('### Test Steps'));
    if (testStepsStart > -1) {
      for (let i = testStepsStart + 3; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('|') && !line.includes('---') && !line.includes('Step')) {
          const parts = line.split('|').map(p => p.trim()).filter(p => p);
          if (parts.length >= 4) {
            testcase.testSteps.push({
              step: parts[0],
              action: parts[1],
              testData: parts[2],
              expectedResult: parts[3]
            });
          }
        }
        if (line === '---' || line.startsWith('###')) break;
      }
    }

    // Parse expected final result
    const expectedResultStart = lines.findIndex(l => l.includes('### Expected Final Result'));
    if (expectedResultStart > -1) {
      const resultLines = [];
      for (let i = expectedResultStart + 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('###')) break;
        if (line && line !== '---') {
          resultLines.push(line.replace(/^-\s*/, ''));
        }
      }
      testcase.expectedResult = resultLines.join('\n');
    }

    // Parse error scenarios
    const errorScenariosStart = lines.findIndex(l => l.includes('### Error Scenarios'));
    if (errorScenariosStart > -1) {
      for (let i = errorScenariosStart + 3; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('|') && !line.includes('---') && !line.includes('Scenario ID')) {
          const parts = line.split('|').map(p => p.trim()).filter(p => p);
          if (parts.length >= 4) {
            testcase.errorScenarios.push({
              id: parts[0],
              trigger: parts[1],
              expectedBehavior: parts[2],
              errorMessage: parts[3]
            });
          }
        }
        if (line === '---' || line.startsWith('###')) break;
      }
    }

    // Parse traceability
    const traceabilityStart = lines.findIndex(l => l.includes('### Traceability'));
    if (traceabilityStart > -1) {
      for (let i = traceabilityStart + 3; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('|') && !line.includes('---') && !line.includes('Requirement')) {
          const parts = line.split('|').map(p => p.trim()).filter(p => p);
          if (parts.length >= 2) {
            testcase.traceability.push({
              requirement: parts[0],
              coverage: parts[1]
            });
          }
        }
        if (line === '---' || line.startsWith('###')) break;
      }
    }

    return testcase;
  }

  /**
   * Extract story key from TC ID (pattern: TC-{STORY}-{NNN})
   */
  extractStoryKey(tcId) {
    const match = tcId.match(/^TC-([\w-]+)-\d+$/);
    return match ? match[1] : null;
  }

  /**
   * Read test data from testdata.json file
   */
  async readTestData(storyKey) {
    const testdataPath = path.join(
      process.cwd(),
      'test-registry',
      'testdata',
      storyKey,
      `${storyKey}-testdata.json`
    );

    try {
      await fs.access(testdataPath);
      const content = await fs.readFile(testdataPath, 'utf-8');
      const data = JSON.parse(content);
      return data.testDataSets || {};
    } catch (e) {
      console.warn(`Warning: Could not read testdata file for ${storyKey}: ${testdataPath}`);
      return {};
    }
  }

  /**
   * Get execution status for a test case
   */
  async getExecutionStatus(storyKey, tcId) {
    // Priority 1: Check Playwright results
    const playwrightStatus = await this.checkPlaywrightResults(storyKey, tcId);
    if (playwrightStatus) return playwrightStatus;

    // Priority 2: Check scriptless results
    const scriptlessPath = path.join(
      process.cwd(),
      'test-registry',
      'scriptless-results',
      storyKey,
      `${tcId}-result.json`
    );

    try {
      await fs.access(scriptlessPath);
      const content = await fs.readFile(scriptlessPath, 'utf-8');
      const data = JSON.parse(content);
      return data.status === 'passed' ? 'PASS' : 'FAIL';
    } catch (e) {
      // Scriptless results not found
    }

    // Priority 3: Check exploration execution data
    const explorationPath = path.join(
      process.cwd(),
      'test-registry',
      'exploration-data',
      'execution',
      storyKey,
      tcId,
      `${tcId}-execution.json`
    );

    try {
      await fs.access(explorationPath);
      const content = await fs.readFile(explorationPath, 'utf-8');
      const data = JSON.parse(content);
      return data.status === 'passed' ? 'PASS' : 'FAIL';
    } catch (e) {
      // Exploration results not found
    }

    // Default: Not executed
    return 'NOT_EXECUTED';
  }

  /**
   * Check Playwright results for a test case
   */
  async checkPlaywrightResults(storyKey, tcId) {
    const reportsDir = path.join(
      process.cwd(),
      'test-registry',
      'automation',
      'test-results',
      'reports'
    );

    try {
      // Get all timestamp folders
      const folders = await fs.readdir(reportsDir);

      // Sort by timestamp (latest first)
      folders.sort().reverse();

      // Check latest results.json
      for (const folder of folders) {
        const resultsPath = path.join(reportsDir, folder, 'results.json');
        try {
          await fs.access(resultsPath);
          const content = await fs.readFile(resultsPath, 'utf-8');
          const results = JSON.parse(content);

          // Search for test case in results
          for (const suite of results.suites || []) {
            for (const spec of suite.specs || []) {
              for (const test of spec.tests || []) {
                // Check if test title contains the TC ID
                if (test.title && test.title.includes(tcId)) {
                  const testResult = test.results && test.results[0];
                  if (testResult) {
                    if (testResult.status === 'passed') return 'PASS';
                    if (testResult.status === 'failed') return 'FAIL';
                    if (testResult.status === 'skipped') return 'NOT_EXECUTED';
                  }
                }
              }
            }
          }
        } catch (e) {
          // Skip this folder, try next
          continue;
        }
      }
    } catch (e) {
      // Reports directory not found
    }

    return null;
  }

  /**
   * Get defect ID(s) for a test case
   */
  async getDefectId(storyKey, tcId) {
    const defectsDir = path.join(
      process.cwd(),
      'test-registry',
      'defects',
      storyKey
    );

    try {
      await fs.access(defectsDir);
      const files = await fs.readdir(defectsDir);

      // Find all defect files for this TC
      const defectFiles = files.filter(f =>
        f.startsWith(tcId) && f.endsWith('-defect.json')
      );

      if (defectFiles.length === 0) return '-';

      const defectIds = [];
      for (const file of defectFiles) {
        try {
          const content = await fs.readFile(path.join(defectsDir, file), 'utf-8');
          const data = JSON.parse(content);
          if (data.defectKey) {
            defectIds.push(data.defectKey);
          }
        } catch (e) {
          // Skip malformed file
          continue;
        }
      }

      return defectIds.length > 0 ? defectIds.join(', ') : '-';
    } catch (e) {
      // Defects directory not found
      return '-';
    }
  }

  /**
   * Generate Excel workbook
   */
  async generateExcel(testcases, outputPath, storyKey, summary) {
    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    await fs.mkdir(outputDir, { recursive: true });

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'SAP Agent Teams';
    workbook.created = new Date();

    // Sheet 1: Test Case Summary
    const summarySheet = workbook.addWorksheet('Test Case Summary');
    this.createSummarySheet(summarySheet, testcases, storyKey, summary);

    // Sheet 2: Test Steps (all test cases)
    const stepsSheet = workbook.addWorksheet('Test Steps');
    this.createTestStepsSheet(stepsSheet, testcases, storyKey);

    // Sheet 3: Pre-conditions
    const preconditionsSheet = workbook.addWorksheet('Pre-conditions');
    this.createPreconditionsSheet(preconditionsSheet, testcases);

    // Sheet 4: Test Data (declared values from testdata.json)
    const testDataSheet = workbook.addWorksheet('Test Data');
    await this.createTestDataSheet(testDataSheet, testcases, storyKey);

    // Sheet 5: Error Scenarios (if any)
    const hasErrorScenarios = testcases.some(tc => tc.errorScenarios.length > 0);
    if (hasErrorScenarios) {
      const errorSheet = workbook.addWorksheet('Error Scenarios');
      this.createErrorScenariosSheet(errorSheet, testcases);
    }

    // Sheet 6: Traceability (execution status + defects)
    const traceabilitySheet = workbook.addWorksheet('Traceability');
    await this.createTraceabilitySheet(traceabilitySheet, testcases, storyKey);

    // Save workbook
    await workbook.xlsx.writeFile(outputPath);
    console.log(`✓ Excel exported: ${outputPath}`);

    return outputPath;
  }

  /**
   * Create summary sheet
   */
  createSummarySheet(sheet, testcases, storyKey, summary) {
    // Title
    sheet.mergeCells('A1:L1');
    const titleCell = sheet.getCell('A1');
    titleCell.value = `Test Case Summary — ${storyKey}`;
    titleCell.font = { size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0070C0' } };
    titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
    sheet.getRow(1).height = 30;

    // Story summary info (if available)
    if (summary) {
      sheet.getCell('A3').value = 'Total Test Cases:';
      sheet.getCell('B3').value = summary.totalTestCases || testcases.length;
      sheet.getCell('A4').value = 'Generated Date:';
      sheet.getCell('B4').value = summary.generatedDate || new Date().toISOString().split('T')[0];

      if (summary.coverageTypes) {
        sheet.getCell('D3').value = 'Coverage Types:';
        sheet.getCell('E3').value = Object.keys(summary.coverageTypes).join(', ');
      }
    }

    // Headers
    const headerRow = sheet.getRow(6);
    const headers = [
      'TC ID', 'Title', 'Story', 'Module', 'Feature', 'Type', 'Scenario',
      'Priority', 'Severity', 'Automation', 'Effort', 'Steps Count'
    ];

    headers.forEach((header, i) => {
      const cell = headerRow.getCell(i + 1);
      cell.value = header;
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0070C0' } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
    headerRow.height = 25;

    // Data rows
    testcases.forEach((tc, index) => {
      const row = sheet.getRow(7 + index);
      row.getCell(1).value = tc.id;
      row.getCell(2).value = tc.title;
      row.getCell(3).value = tc.storyKey || storyKey;
      row.getCell(4).value = tc.module;
      row.getCell(5).value = tc.feature;
      row.getCell(6).value = tc.testType;
      row.getCell(7).value = tc.scenarioType;
      row.getCell(8).value = tc.priority;
      row.getCell(9).value = tc.severity;
      row.getCell(10).value = tc.automationCandidate;
      row.getCell(11).value = tc.estimatedEffort;
      row.getCell(12).value = tc.testSteps.length;

      // Apply cell borders
      for (let i = 1; i <= 12; i++) {
        row.getCell(i).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      }

      // Color code priority
      const priorityCell = row.getCell(8);
      if (tc.priority === 'CRITICAL') {
        priorityCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF0000' } };
        priorityCell.font = { color: { argb: 'FFFFFFFF' }, bold: true };
      } else if (tc.priority === 'HIGH') {
        priorityCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFC000' } };
      } else if (tc.priority === 'MEDIUM') {
        priorityCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF00' } };
      }
    });

    // Auto-fit columns
    sheet.columns = [
      { width: 15 },  // TC ID
      { width: 50 },  // Title
      { width: 12 },  // Story
      { width: 20 },  // Module
      { width: 30 },  // Feature
      { width: 15 },  // Type
      { width: 15 },  // Scenario
      { width: 12 },  // Priority
      { width: 12 },  // Severity
      { width: 12 },  // Automation
      { width: 12 },  // Effort
      { width: 12 }   // Steps Count
    ];
  }

  /**
   * Create test steps sheet
   */
  createTestStepsSheet(sheet, testcases, storyKey) {
    // Title
    sheet.mergeCells('A1:F1');
    const titleCell = sheet.getCell('A1');
    titleCell.value = 'Test Steps — All Test Cases';
    titleCell.font = { size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0070C0' } };
    titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
    sheet.getRow(1).height = 30;

    // Headers
    const headerRow = sheet.getRow(3);
    const headers = ['User Story ID', 'TC ID', 'Step #', 'Action', 'Test Data', 'Expected Result'];

    headers.forEach((header, i) => {
      const cell = headerRow.getCell(i + 1);
      cell.value = header;
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0070C0' } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
    headerRow.height = 25;

    // Data rows
    let rowIndex = 4;
    testcases.forEach(tc => {
      // Use the provided storyKey parameter, or fall back to tc.storyKey
      const tcStoryKey = tc.storyKey || storyKey;

      tc.testSteps.forEach((step, index) => {
        const row = sheet.getRow(rowIndex);
        row.getCell(1).value = index === 0 ? tcStoryKey : '';
        row.getCell(2).value = index === 0 ? tc.id : '';
        row.getCell(3).value = step.step;
        row.getCell(4).value = step.action;
        row.getCell(5).value = step.testData;
        row.getCell(6).value = step.expectedResult;

        // Apply cell borders and wrap text
        for (let i = 1; i <= 6; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
          row.getCell(i).alignment = { vertical: 'top', wrapText: true };
        }

        // Bold Story Key and TC ID
        if (index === 0) {
          row.getCell(1).font = { bold: true };
          row.getCell(2).font = { bold: true };
        }

        rowIndex++;
      });
    });

    // Column widths
    sheet.columns = [
      { width: 15 },  // User Story ID
      { width: 15 },  // TC ID
      { width: 8 },   // Step #
      { width: 55 },  // Action
      { width: 25 },  // Test Data
      { width: 55 }   // Expected Result
    ];
  }

  /**
   * Create preconditions sheet
   */
  createPreconditionsSheet(sheet, testcases) {
    // Title
    sheet.mergeCells('A1:D1');
    const titleCell = sheet.getCell('A1');
    titleCell.value = 'Pre-conditions';
    titleCell.font = { size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0070C0' } };
    titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
    sheet.getRow(1).height = 30;

    // Headers
    const headerRow = sheet.getRow(3);
    const headers = ['TC ID', 'PC #', 'Pre-condition', 'Detail'];

    headers.forEach((header, i) => {
      const cell = headerRow.getCell(i + 1);
      cell.value = header;
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0070C0' } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
    headerRow.height = 25;

    // Data rows
    let rowIndex = 4;
    testcases.forEach(tc => {
      tc.preconditions.forEach((pc, index) => {
        const row = sheet.getRow(rowIndex);
        row.getCell(1).value = index === 0 ? tc.id : '';
        row.getCell(2).value = pc.id;
        row.getCell(3).value = pc.name;
        row.getCell(4).value = pc.detail;

        // Apply cell borders
        for (let i = 1; i <= 4; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
          row.getCell(i).alignment = { vertical: 'top', wrapText: true };
        }

        if (index === 0) {
          row.getCell(1).font = { bold: true };
        }

        rowIndex++;
      });
    });

    // Column widths
    sheet.columns = [
      { width: 15 },  // TC ID
      { width: 8 },   // PC #
      { width: 30 },  // Pre-condition
      { width: 70 }   // Detail
    ];
  }

  /**
   * Create test data sheet
   */
  async createTestDataSheet(sheet, testcases, storyKey) {
    // Title
    sheet.mergeCells('A1:H1');
    const titleCell = sheet.getCell('A1');
    titleCell.value = 'Test Data — Declared Values';
    titleCell.font = { size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0070C0' } };
    titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
    sheet.getRow(1).height = 30;

    // Headers
    const headerRow = sheet.getRow(3);
    const headers = ['User Story ID', 'TC ID', 'Test Data ID', 'Data Set Name', 'Parameter', 'Value', 'Scenario Type', 'Expected Outcome'];

    headers.forEach((header, i) => {
      const cell = headerRow.getCell(i + 1);
      cell.value = header;
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0070C0' } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
    headerRow.height = 25;

    // Read testdata.json for the story
    const testDataSets = await this.readTestData(storyKey);

    // Data rows
    let rowIndex = 4;

    if (Object.keys(testDataSets).length === 0) {
      // No test data found, show message
      const row = sheet.getRow(rowIndex);
      row.getCell(1).value = 'No test data found';
      sheet.mergeCells(`A${rowIndex}:H${rowIndex}`);
      row.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
      rowIndex++;
    } else {
      // Iterate through test data sets
      Object.values(testDataSets).forEach(dataSet => {
        const tcIds = dataSet.usedByTestCases || [];
        const dataParams = dataSet.data || {};
        const paramKeys = Object.keys(dataParams);

        if (paramKeys.length === 0) {
          // Empty data set, show one row
          const row = sheet.getRow(rowIndex);
          row.getCell(1).value = storyKey;
          row.getCell(2).value = tcIds.join(', ');
          row.getCell(3).value = dataSet.id;
          row.getCell(4).value = dataSet.name;
          row.getCell(5).value = '(empty)';
          row.getCell(6).value = '';
          row.getCell(7).value = dataSet.scenarioType || '';
          row.getCell(8).value = dataSet.expectedOutcome || '';

          for (let i = 1; i <= 8; i++) {
            row.getCell(i).border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' }
            };
            row.getCell(i).alignment = { vertical: 'top', wrapText: true };
          }
          row.getCell(1).font = { bold: true };
          row.getCell(2).font = { bold: true };

          rowIndex++;
        } else {
          // One row per parameter
          paramKeys.forEach((paramKey, index) => {
            const row = sheet.getRow(rowIndex);
            row.getCell(1).value = index === 0 ? storyKey : '';
            row.getCell(2).value = index === 0 ? tcIds.join(', ') : '';
            row.getCell(3).value = index === 0 ? dataSet.id : '';
            row.getCell(4).value = index === 0 ? dataSet.name : '';
            row.getCell(5).value = paramKey;
            row.getCell(6).value = dataParams[paramKey];
            row.getCell(7).value = index === 0 ? (dataSet.scenarioType || '') : '';
            row.getCell(8).value = index === 0 ? (dataSet.expectedOutcome || '') : '';

            // Apply cell borders
            for (let i = 1; i <= 8; i++) {
              row.getCell(i).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
              };
              row.getCell(i).alignment = { vertical: 'top', wrapText: true };
            }

            if (index === 0) {
              row.getCell(1).font = { bold: true };
              row.getCell(2).font = { bold: true };
            }

            rowIndex++;
          });
        }
      });
    }

    // Column widths
    sheet.columns = [
      { width: 12 },  // User Story ID
      { width: 15 },  // TC ID
      { width: 18 },  // Test Data ID
      { width: 25 },  // Data Set Name
      { width: 20 },  // Parameter
      { width: 20 },  // Value
      { width: 15 },  // Scenario Type
      { width: 35 }   // Expected Outcome
    ];
  }

  /**
   * Create error scenarios sheet
   */
  createErrorScenariosSheet(sheet, testcases) {
    // Title
    sheet.mergeCells('A1:E1');
    const titleCell = sheet.getCell('A1');
    titleCell.value = 'Error Scenarios';
    titleCell.font = { size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF0000' } };
    titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
    sheet.getRow(1).height = 30;

    // Headers
    const headerRow = sheet.getRow(3);
    const headers = ['TC ID', 'Error ID', 'Trigger', 'Expected Behavior', 'Error Message'];

    headers.forEach((header, i) => {
      const cell = headerRow.getCell(i + 1);
      cell.value = header;
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF0000' } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
    headerRow.height = 25;

    // Data rows
    let rowIndex = 4;
    testcases.forEach(tc => {
      tc.errorScenarios.forEach((error, index) => {
        const row = sheet.getRow(rowIndex);
        row.getCell(1).value = index === 0 ? tc.id : '';
        row.getCell(2).value = error.id;
        row.getCell(3).value = error.trigger;
        row.getCell(4).value = error.expectedBehavior;
        row.getCell(5).value = error.errorMessage;

        // Apply cell borders
        for (let i = 1; i <= 5; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
          row.getCell(i).alignment = { vertical: 'top', wrapText: true };
        }

        if (index === 0) {
          row.getCell(1).font = { bold: true };
        }

        rowIndex++;
      });
    });

    // Column widths
    sheet.columns = [
      { width: 15 },  // TC ID
      { width: 15 },  // Error ID
      { width: 40 },  // Trigger
      { width: 40 },  // Expected Behavior
      { width: 40 }   // Error Message
    ];
  }

  /**
   * Create traceability sheet
   */
  async createTraceabilitySheet(sheet, testcases, storyKey) {
    // Title
    sheet.mergeCells('A1:D1');
    const titleCell = sheet.getCell('A1');
    titleCell.value = 'Requirements Traceability Matrix';
    titleCell.font = { size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0070C0' } };
    titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
    sheet.getRow(1).height = 30;

    // Headers
    const headerRow = sheet.getRow(3);
    const headers = ['User Story ID', 'Testcase ID', 'Execution Status', 'Defect ID'];

    headers.forEach((header, i) => {
      const cell = headerRow.getCell(i + 1);
      cell.value = header;
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0070C0' } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
    headerRow.height = 25;

    // Data rows
    let rowIndex = 4;
    for (const tc of testcases) {
      const row = sheet.getRow(rowIndex);
      // Use the provided storyKey parameter, or fall back to tc.storyKey
      const tcStoryKey = tc.storyKey || storyKey;

      // Get execution status and defect ID
      const executionStatus = await this.getExecutionStatus(tcStoryKey, tc.id);
      const defectId = await this.getDefectId(tcStoryKey, tc.id);

      row.getCell(1).value = tcStoryKey;
      row.getCell(2).value = tc.id;
      row.getCell(3).value = executionStatus;
      row.getCell(4).value = defectId;

      // Apply cell borders
      for (let i = 1; i <= 4; i++) {
        row.getCell(i).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
        row.getCell(i).alignment = { vertical: 'top', wrapText: true };
      }

      // Bold story key and TC ID
      row.getCell(1).font = { bold: true };
      row.getCell(2).font = { bold: true };

      // Color code execution status
      const statusCell = row.getCell(3);
      if (executionStatus === 'PASS') {
        statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF92D050' } }; // Green
        statusCell.font = { bold: true, color: { argb: 'FF006100' } };
      } else if (executionStatus === 'FAIL') {
        statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF6B6B' } }; // Red
        statusCell.font = { bold: true, color: { argb: 'FF9C0006' } };
      } else {
        statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD3D3D3' } }; // Gray
        statusCell.font = { color: { argb: 'FF7F7F7F' } };
      }

      // Color code defect ID
      const defectCell = row.getCell(4);
      if (defectId !== '-') {
        defectCell.font = { bold: true, color: { argb: 'FFFF0000' } };
      }

      rowIndex++;
    }

    // Column widths
    sheet.columns = [
      { width: 15 },  // User Story ID
      { width: 18 },  // Testcase ID
      { width: 18 },  // Execution Status
      { width: 20 }   // Defect ID
    ];
  }
}

module.exports = { TestCaseExcelExporter };
