// agents/test-strategy-agent/config/strategy.config.js
// Reads Test Strategy Architect configuration from environment variables (.env)
// Usage: const { strategyConfig } = require('./strategy.config');

require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });

const strategyConfig = {
  projectKey: process.env.JIRA_PROJECT_KEY || '',
  baseUrl:    process.env.JIRA_BASE_URL    || 'https://jira-naqet.atlassian.net',

  inputDir: {
    userstories: 'jira/userstories',
    index:       'jira/index.json',
  },

  outputDir: {
    strategy:    (key) => `jira/userstories/${key}/strategy`,
    analysis:    (key) => `jira/userstories/${key}/strategy/${key}-analysis.md`,
    riskProfile: (key) => `jira/userstories/${key}/strategy/${key}-risk-profile.json`,
    strategyDoc: (key) => `jira/userstories/${key}/strategy/${key}-strategy.md`,
  },

  // Risk levels in descending severity order
  riskLevels: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'],

  // Scenario type codes and full names
  scenarioTypes: {
    HP:   'Happy Path',
    AP:   'Alternative Path',
    NEG:  'Negative',
    ERR:  'Error / Missing Field',
    EDGE: 'Edge Case / Boundary',
    INT:  'Integration',
  },

  // Minimum TC counts per scenario type per risk level
  minimumTCCounts: {
    CRITICAL: { HP: 1, AP: 1, NEG: 1, ERR: 1, EDGE: 2, INT: 0 },
    HIGH:     { HP: 1, AP: 0, NEG: 1, ERR: 1, EDGE: 0, INT: 0 },
    MEDIUM:   { HP: 1, AP: 0, NEG: 1, ERR: 0, EDGE: 0, INT: 0 },
    LOW:      { HP: 1, AP: 0, NEG: 0, ERR: 0, EDGE: 0, INT: 0 },
  },

  // AC type → scenario types mapping
  acTypeToScenarios: {
    NAVIGATION:           ['HP'],
    VALIDATION_POSITIVE:  ['HP', 'NEG'],
    VALIDATION_NEGATIVE:  ['NEG'],
    ERROR_HANDLING:       ['NEG', 'ERR'],
    SUCCESS_CONFIRMATION: ['HP'],
    MANDATORY_FIELD:      ['ERR'],
    BUSINESS_RULE:        ['HP', 'NEG'],
    INTEGRATION:          ['INT'],
  },

  // SAP module code mapping from keywords
  sapModuleKeywords: {
    MM: ['purchase order', 'supplier', 'vendor', 'material', 'goods receipt', 'invoice verification', 'procurement', 'inventory'],
    SD: ['sales order', 'customer', 'delivery', 'billing', 'shipment', 'quotation', 'contract'],
    FI: ['invoice', 'payment', 'gl account', 'cost center', 'journal entry', 'posting', 'financial', 'accounts payable', 'accounts receivable'],
    HR: ['employee', 'leave', 'payroll', 'recruitment', 'personnel', 'organisational unit', 'time management'],
    PM: ['work order', 'maintenance', 'equipment', 'functional location', 'notification'],
    PP: ['production order', 'routing', 'bom', 'bill of materials', 'planned order', 'capacity'],
  },

  // SAP risk weightings by scenario area keyword
  riskWeightings: {
    'document creation':    'CRITICAL',
    'validation':           'HIGH',
    'mandatory field':      'HIGH',
    'authorization':        'HIGH',
    'calculation':          'MEDIUM',
    'auto-population':      'MEDIUM',
    'navigation':           'LOW',
    'text length':          'LOW',
  },

  // Quality gate thresholds
  qualityGates: {
    acTraceability:        1.0,   // 100% of ACs must be covered
    hpCoverage:            1.0,   // 100% of HP scenarios generated
    negCoverage:           1.0,   // 100% of NEG scenarios generated
    errCoverage:           1.0,   // 100% of ERR scenarios generated
    minEdgeCases:          2,     // Minimum 2 EDGE TCs for numeric stories
    hardcodedValuesAllowed: 0,    // Zero hardcoded SAP values
    automationEligibility: 0.5,   // ≥ 50% of HP/AP TCs must be automation candidates
  },
};

module.exports = { strategyConfig };
