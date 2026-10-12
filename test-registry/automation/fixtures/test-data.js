// automation/fixtures/test-data.js
// Test data loader for SAP S/4HANA Fiori automation

const path = require('path');
const fs = require('fs');

/**
 * Load SAP environment configuration from env vars.
 * @returns {object} Environment config
 */
function loadEnvironment() {
  return {
    baseUrl: process.env.SAP_BASE_URL || 'https://my429998.s4hana.cloud.sap',
    username: process.env.SAP_USERNAME || '',
    password: process.env.SAP_PASSWORD || '',
    client: process.env.SAP_CLIENT || '100',
    language: process.env.SAP_LANGUAGE || 'en',
    timeouts: {
      navigation: 90000,
      action: 30000,
      assertion: 15000,
    },
  };
}

/**
 * Load test data for a specific SAP module/feature.
 * @param {string} module - e.g., 'mm-purchase-order', 'sd-sales-order'
 * @returns {object} Test data object with testData keyed by TC ID
 */
function loadTestData(module) {
  const dataPath = path.resolve(__dirname, '..', 'test-data', `${module}.data.json`);
  if (!fs.existsSync(dataPath)) {
    return { feature: module, testData: {} };
  }
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(rawData);
}

/**
 * Get test data for a specific test case by ID.
 * @param {string} module - e.g., 'mm-purchase-order'
 * @param {string} tcId - e.g., 'TC_MM_PO_001'
 * @returns {object|null} Test case data with input and expected
 */
function getTestCase(module, tcId) {
  const data = loadTestData(module);
  return data.testData[tcId] || null;
}

/**
 * Get all test cases for a module.
 * @param {string} module
 * @returns {object} All test case data keyed by TC ID
 */
function getAllTestCases(module) {
  const data = loadTestData(module);
  return data.testData;
}

/**
 * Load test steps from an Excel file in the testcases/ folder.
 * @param {string} fileName - File name without extension (e.g., 'SAP_Create_Purchase_Order_TestCase')
 * @returns {Array<{step: number, action: string, expectedResult: string}>}
 */
function loadTestStepsFromExcel(fileName) {
  const { getTestStepsFromFile } = require('../utils/excel-reader');
  return getTestStepsFromFile(fileName);
}

/**
 * List all Excel test case files in the testcases/ folder.
 * @returns {Array<{fileName: string, sheetName: string, steps: Array}>}
 */
function listExcelTestCases() {
  const { readAllTestCaseFiles } = require('../utils/excel-reader');
  return readAllTestCaseFiles();
}

module.exports = {
  loadEnvironment,
  loadTestData,
  getTestCase,
  getAllTestCases,
  loadTestStepsFromExcel,
  listExcelTestCases,
};
