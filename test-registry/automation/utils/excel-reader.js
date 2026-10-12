// automation/utils/excel-reader.js
// Utility to read test cases from Excel (.xlsx) files

const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const { logger } = require('./logger');

// Flexible column name matching (case-insensitive)
const STEP_COLUMNS = ['step', 'step #', 'step no', 's.no', 'sl no', 'sno', 'step number'];
const ACTION_COLUMNS = ['action', 'test step', 'description', 'steps', 'test action', 'action description'];
const EXPECTED_COLUMNS = ['expected result', 'expected', 'expected output', 'verification', 'expected results', 'result'];

/**
 * Find the matching column header from a row using fuzzy matching.
 * @param {object} row - Row object from xlsx
 * @param {string[]} candidates - List of candidate column names (lowercase)
 * @returns {string|null} The actual column key in the row, or null
 */
function findColumn(headers, candidates) {
  for (const header of headers) {
    const normalized = String(header).trim().toLowerCase();
    if (candidates.includes(normalized)) {
      return header;
    }
  }
  return null;
}

/**
 * Read all test steps from an Excel file.
 * @param {string} filePath - Absolute or relative path to .xlsx file
 * @param {string} [sheetName] - Sheet name (defaults to first sheet)
 * @returns {Array<{step: number, action: string, expectedResult: string}>}
 */
function readTestSteps(filePath, sheetName) {
  const resolvedPath = path.resolve(filePath);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`Excel file not found: ${resolvedPath}`);
  }

  const workbook = XLSX.readFile(resolvedPath);

  // Use specified sheet or first sheet
  const targetSheet = sheetName || workbook.SheetNames[0];
  const worksheet = workbook.Sheets[targetSheet];

  if (!worksheet) {
    throw new Error(`Sheet "${targetSheet}" not found. Available sheets: ${workbook.SheetNames.join(', ')}`);
  }

  // Parse as array of objects (header row becomes keys)
  const rawData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

  if (rawData.length === 0) {
    logger.warn(`No data rows found in sheet "${targetSheet}"`, 'ExcelReader');
    return [];
  }

  // Detect column names from first row keys
  const headers = Object.keys(rawData[0]);
  const stepCol = findColumn(headers, STEP_COLUMNS);
  const actionCol = findColumn(headers, ACTION_COLUMNS);
  const expectedCol = findColumn(headers, EXPECTED_COLUMNS);

  if (!actionCol) {
    throw new Error(
      `Could not find Action column. Headers found: [${headers.join(', ')}]. ` +
      `Expected one of: ${ACTION_COLUMNS.join(', ')}`
    );
  }

  logger.info(
    `Reading Excel: sheet="${targetSheet}", ` +
    `stepCol="${stepCol || 'auto'}", actionCol="${actionCol}", expectedCol="${expectedCol || 'none'}"`,
    'ExcelReader'
  );

  const steps = [];
  for (let i = 0; i < rawData.length; i++) {
    const row = rawData[i];
    const action = String(row[actionCol] || '').trim();

    // Skip empty rows
    if (!action) continue;

    steps.push({
      step: stepCol ? Number(row[stepCol]) || (i + 1) : (i + 1),
      action: action,
      expectedResult: expectedCol ? String(row[expectedCol] || '').trim() : '',
    });
  }

  logger.info(`Read ${steps.length} test steps from "${path.basename(filePath)}"`, 'ExcelReader');
  return steps;
}

/**
 * Read all .xlsx files from the testcases/ folder.
 * @param {string} [testcasesDir] - Path to testcases folder (defaults to project testcases/)
 * @returns {Array<{fileName: string, filePath: string, sheetName: string, steps: Array}>}
 */
function readAllTestCaseFiles(testcasesDir) {
  const dir = testcasesDir || path.resolve(__dirname, '..', '..', 'testcases');

  if (!fs.existsSync(dir)) {
    logger.warn(`Testcases directory not found: ${dir}`, 'ExcelReader');
    return [];
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.xlsx') && !f.startsWith('~$'));
  const results = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    try {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const steps = readTestSteps(filePath, sheetName);
      results.push({
        fileName: file,
        filePath: filePath,
        sheetName: sheetName,
        steps: steps,
      });
    } catch (err) {
      logger.error(`Failed to read ${file}: ${err.message}`, 'ExcelReader');
    }
  }

  logger.info(`Found ${results.length} Excel test case file(s) in ${dir}`, 'ExcelReader');
  return results;
}

/**
 * Get test steps for a specific Excel file by name (without extension).
 * @param {string} name - e.g., 'SAP_Create_Purchase_Order_TestCase'
 * @param {string} [testcasesDir] - Path to testcases folder
 * @returns {Array<{step: number, action: string, expectedResult: string}>}
 */
function getTestStepsFromFile(name, testcasesDir) {
  const dir = testcasesDir || path.resolve(__dirname, '..', '..', 'testcases');
  const filePath = path.join(dir, `${name}.xlsx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Excel test case file not found: ${filePath}`);
  }

  return readTestSteps(filePath);
}

/**
 * Get sheet names from an Excel file.
 * @param {string} filePath - Path to .xlsx file
 * @returns {string[]} Array of sheet names
 */
function getSheetNames(filePath) {
  const resolvedPath = path.resolve(filePath);
  const workbook = XLSX.readFile(resolvedPath);
  return workbook.SheetNames;
}

module.exports = {
  readTestSteps,
  readAllTestCaseFiles,
  getTestStepsFromFile,
  getSheetNames,
};
