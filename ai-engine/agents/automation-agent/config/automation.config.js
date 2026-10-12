// agents/automation-agent/config/automation.config.js
// Reads Automation Agent configuration from environment variables (.env)
// Usage: const { automationConfig } = require('./automation.config');

require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });

const automationConfig = {
  sap: {
    fioriUrl: process.env.SAP_FIORI_URL || '',
    username: process.env.SAP_USERNAME  || '',
    password: process.env.SAP_PASSWORD  || '',
    client:   process.env.SAP_CLIENT    || '100',
    language: process.env.SAP_LANGUAGE  || 'en',
  },
  jira: {
    projectKey: process.env.JIRA_PROJECT_KEY || '',
    baseUrl:    process.env.JIRA_BASE_URL    || 'https://jira-naqet.atlassian.net',
  },
  paths: {
    testcases:     'testcases/AI-generated testcases',
    testdata:      'testdata',
    explorationData: 'exploration-data',
    executionData:   'exploration-data/execution',
    selectors:       'exploration-data/selectors',
    snapshots:       'exploration-data/snapshots',
    blueprints:    'blueprints',
    prompts:       'prompts',
    automation:    'test-registry/automation',
    automationPages:    'test-registry/automation/pages',
    automationTests:    'test-registry/automation/tests',
    automationTestData: 'test-registry/automation/test-data',
  },
  blueprints: {
    pomJavaScript:  'blueprints/POM-JavaScript-Blueprint.md',
    pomAutomation:  'blueprints/POM-Automation-Blueprint.md',
  },
  prompts: {
    generateScripts:  'prompts/generate-automation-scripts.md',
    exploreSapApp:    'prompts/explore-sap-app.md',
    generateLocators: 'prompts/generate-locators-from-exploration.md',
    generatePageObjects: 'prompts/generate-page-objects.md',
    generateTestSpecs:   'prompts/generate-test-specs.md',
  },
  // SAP-specific timing constants (observed from SAP demo server performance)
  sapTimings: {
    pageLoadTimeout:   90000,  // 90s — SAP Fiori initial load
    busyIndicatorWait: 30000,  // 30s — SAP busy/block layer
    fieldConfirmWait:   2000,  // 2s  — after Enter on lookup field
    actionWait:         1500,  // 1.5s — after button click
    navigationWait:     3000,  // 3s  — after app navigation
  },
  // Module → app folder name mapping
  moduleAppMap: {
    MM: {
      'Manage Purchase Orders':       { folder: 'mm/purchase-order',       specPrefix: 'mm-purchase-order' },
      'Create Purchase Requisition':  { folder: 'mm/purchase-requisition', specPrefix: 'mm-purchase-requisition' },
    },
    SD: {
      'Manage Sales Orders':          { folder: 'sd/sales-order',          specPrefix: 'sd-sales-order' },
    },
    FI: {
      'Manage Supplier Invoices':     { folder: 'fi/supplier-invoice',     specPrefix: 'fi-supplier-invoice' },
    },
  },
};

module.exports = { automationConfig };
