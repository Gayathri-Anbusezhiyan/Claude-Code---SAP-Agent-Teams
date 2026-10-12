const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Read all test case files
const testCaseBasePath = '../test-registry/testcases/AI-generated testcases';
const stories = ['CS-2', 'CS-3', 'CS-17'];

const allTestCases = [];

// Parse markdown test case files
function parseTestCaseMarkdown(filePath, storyKey) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract test case ID from filename
  const fileName = path.basename(filePath, '.md');
  const tcId = fileName;

  // Parse markdown content
  const lines = content.split('\n');
  let testCase = {
    'Story': storyKey,
    'Test Case ID': tcId,
    'Title': '',
    'Test Type': '',
    'Scenario Type': '',
    'Priority': '',
    'Severity': '',
    'Automation': '',
    'Estimated Effort': '',
    'Preconditions': '',
    'Test Steps': '',
    'Expected Final Result': '',
    'Post-conditions': '',
    'Notes': ''
  };

  let currentSection = '';
  let stepsRows = [];
  let preconditionsRows = [];
  let expectedResults = [];
  let postConditions = [];
  let inTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Extract title from first heading
    if (line.startsWith('# ') && !testCase['Title']) {
      testCase['Title'] = line.substring(2).replace(/^TC-[A-Z]+-\d+:\s*/, '').trim();
    }

    // Extract metadata
    if (line.startsWith('**Test Type:**')) {
      testCase['Test Type'] = line.replace('**Test Type:**', '').trim();
    }
    if (line.startsWith('**Scenario Type:**')) {
      testCase['Scenario Type'] = line.replace('**Scenario Type:**', '').trim();
    }
    if (line.startsWith('**Priority:**')) {
      testCase['Priority'] = line.replace('**Priority:**', '').trim();
    }
    if (line.startsWith('**Severity:**')) {
      testCase['Severity'] = line.replace('**Severity:**', '').trim();
    }
    if (line.startsWith('**Automation Candidate:**')) {
      testCase['Automation'] = line.replace('**Automation Candidate:**', '').trim();
    }
    if (line.startsWith('**Estimated Effort:**')) {
      testCase['Estimated Effort'] = line.replace('**Estimated Effort:**', '').trim();
    }

    // Track sections
    if (line.startsWith('### Pre-conditions')) {
      currentSection = 'preconditions';
      inTable = false;
      continue;
    }
    if (line.startsWith('### Test Steps')) {
      currentSection = 'steps';
      inTable = false;
      continue;
    }
    if (line.startsWith('### Expected Final Result')) {
      currentSection = 'expected';
      inTable = false;
      continue;
    }
    if (line.startsWith('### Post-conditions')) {
      currentSection = 'postconditions';
      inTable = false;
      continue;
    }
    if (line.startsWith('### Actual Result') || line.startsWith('### Execution Status') || line.startsWith('### Defects')) {
      currentSection = '';
      inTable = false;
      continue;
    }

    // Handle preconditions table
    if (currentSection === 'preconditions') {
      if (line.startsWith('|') && !line.includes('Pre-condition') && !line.includes('---')) {
        // Parse table row: | # | Pre-condition | Detail |
        const columns = line.split('|').map(col => col.trim()).filter(col => col);
        if (columns.length >= 3) {
          preconditionsRows.push(`${columns[0]}: ${columns[1]} - ${columns[2]}`);
        }
      }
    }

    // Handle test steps table
    if (currentSection === 'steps') {
      if (line.startsWith('|') && !line.includes('Step') && !line.includes('Action') && !line.includes('---')) {
        // Parse table row: | Step | Action | Test Data | Expected Result |
        const columns = line.split('|').map(col => col.trim()).filter(col => col);
        if (columns.length >= 4) {
          const step = columns[0];
          const action = columns[1];
          const testData = columns[2];
          const expectedResult = columns[3];
          stepsRows.push(`${step}. ${action} [Data: ${testData}] → ${expectedResult}`);
        }
      }
    }

    // Handle expected final result
    if (currentSection === 'expected') {
      if (line && !line.startsWith('#') && !line.startsWith('**') && !line.startsWith('---') && line !== '') {
        expectedResults.push(line.replace(/^-\s*/, ''));
      }
    }

    // Handle post-conditions
    if (currentSection === 'postconditions') {
      if (line && !line.startsWith('#') && !line.startsWith('**') && !line.startsWith('---') && line !== '') {
        postConditions.push(line.replace(/^-\s*/, ''));
      }
    }
  }

  testCase['Preconditions'] = preconditionsRows.join('\n');
  testCase['Test Steps'] = stepsRows.join('\n');
  testCase['Expected Final Result'] = expectedResults.join('\n');
  testCase['Post-conditions'] = postConditions.join('\n');

  return testCase;
}

// Load summary files to get test data mapping
const summaries = {};
for (const story of stories) {
  const summaryPath = path.join(testCaseBasePath, story, `${story}-summary.json`);
  if (fs.existsSync(summaryPath)) {
    summaries[story] = JSON.parse(fs.readFileSync(summaryPath, 'utf-8'));
  }
}

// Process all stories
for (const story of stories) {
  const storyPath = path.join(testCaseBasePath, story, 'testcases');

  if (!fs.existsSync(storyPath)) {
    console.log(`Skipping ${story} - path not found: ${storyPath}`);
    continue;
  }

  const files = fs.readdirSync(storyPath);
  const tcFiles = files.filter(f => f.endsWith('.md'));

  console.log(`Processing ${story}: ${tcFiles.length} test cases`);

  for (const tcFile of tcFiles) {
    const filePath = path.join(storyPath, tcFile);
    const testCase = parseTestCaseMarkdown(filePath, story);

    // Add test data from summary
    const tcId = tcFile.replace('.md', '');
    if (summaries[story]) {
      const tcSummary = summaries[story].testCases.find(tc => tc.id === tcId);
      if (tcSummary && tcSummary.testDataset) {
        testCase['Test Data'] = tcSummary.testDataset;
      }
    }

    allTestCases.push(testCase);
  }
}

// Sort by story and test case ID
allTestCases.sort((a, b) => {
  if (a['Story'] !== b['Story']) {
    return a['Story'].localeCompare(b['Story']);
  }
  return a['Test Case ID'].localeCompare(b['Test Case ID']);
});

// Create workbook
const wb = XLSX.utils.book_new();

// Create main worksheet with all test cases
const ws = XLSX.utils.json_to_sheet(allTestCases);

// Set column widths (optimized for readability)
ws['!cols'] = [
  { wch: 8 },   // Story
  { wch: 15 },  // Test Case ID
  { wch: 50 },  // Title
  { wch: 12 },  // Test Type
  { wch: 15 },  // Scenario Type
  { wch: 10 },  // Priority
  { wch: 10 },  // Severity
  { wch: 12 },  // Automation
  { wch: 12 },  // Estimated Effort
  { wch: 60 },  // Preconditions
  { wch: 100 }, // Test Steps (widest column)
  { wch: 60 },  // Expected Final Result
  { wch: 40 },  // Post-conditions
  { wch: 30 },  // Notes
  { wch: 20 }   // Test Data
];

// Enable text wrapping for cells
const range = XLSX.utils.decode_range(ws['!ref']);
for (let R = range.s.r; R <= range.e.r; ++R) {
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cell_address = XLSX.utils.encode_cell({ r: R, c: C });
    if (!ws[cell_address]) continue;
    if (!ws[cell_address].s) ws[cell_address].s = {};
    ws[cell_address].s.alignment = { wrapText: true, vertical: 'top' };
  }
}

// Add worksheet to workbook
XLSX.utils.book_append_sheet(wb, ws, 'All Test Cases');

// Create summary worksheet
const summaryData = [
  { 'Story': 'CS-2', 'Summary': 'Create a New Standard Purchase Order in SAP S/4HANA Cloud', 'Module': 'MM', 'Total TCs': summaries['CS-2'] ? summaries['CS-2'].totalTestCases : 0 },
  { 'Story': 'CS-3', 'Summary': 'View and Modify an Existing Purchase Order', 'Module': 'MM', 'Total TCs': summaries['CS-3'] ? summaries['CS-3'].totalTestCases : 0 },
  { 'Story': 'CS-17', 'Summary': 'Maintain An Approved Vendor List (Source List) For Critical Gmp Raw Ma', 'Module': 'MM', 'Total TCs': summaries['CS-17'] ? summaries['CS-17'].totalTestCases : 0 }
];

const wsSummary = XLSX.utils.json_to_sheet(summaryData);
wsSummary['!cols'] = [
  { wch: 8 },  // Story
  { wch: 60 }, // Summary
  { wch: 8 },  // Module
  { wch: 10 }  // Total TCs
];

XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

// Create separate worksheets per story
for (const story of stories) {
  const storyTCs = allTestCases.filter(tc => tc['Story'] === story);
  if (storyTCs.length > 0) {
    const wsStory = XLSX.utils.json_to_sheet(storyTCs);
    wsStory['!cols'] = ws['!cols']; // Use same column widths
    XLSX.utils.book_append_sheet(wb, wsStory, story);
  }
}

// Write to file
const outputPath = 'SAP_Test_Cases_Export.xlsx';
XLSX.writeFile(wb, outputPath);

console.log(`\n✓ Export complete: ${outputPath}`);
console.log(`Total test cases exported: ${allTestCases.length}`);
console.log('\nBreakdown by story:');
for (const story of stories) {
  const count = allTestCases.filter(tc => tc['Story'] === story).length;
  console.log(`  ${story}: ${count} test cases`);
}
