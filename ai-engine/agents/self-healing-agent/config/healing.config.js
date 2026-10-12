// agents/self-healing-agent/config/healing.config.js
// Reads Self-Healing Agent configuration from environment variables (.env)
// Usage: const { healingConfig } = require('./healing.config');

require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });

const healingConfig = {
  sap: {
    fioriUrl: process.env.SAP_FIORI_URL || '',
    username: process.env.SAP_USERNAME  || '',
    password: process.env.SAP_PASSWORD  || '',
  },
  jira: {
    projectKey: process.env.JIRA_PROJECT_KEY || '',
  },
  paths: {
    testResults:     'test-registry/automation/test-results',
    selfHealing:     'self-healing',
    failures:        'self-healing/failures',
    reExecutions:    'self-healing/re-executions',
    patches:         'self-healing/patches',
    explorationData: 'exploration-data/execution',
    automation:      'test-registry/automation',
    automationPages: 'test-registry/automation/pages',
    automationTests: 'test-registry/automation/tests',
    automationData:  'test-registry/automation/test-data',
    testcases:       'testcases/AI-generated testcases',
    jiraUserstories: 'jira/userstories',
  },
  // Error type classification patterns (matched against Playwright error messages)
  errorPatterns: {
    LOCATOR_FAILURE:    ['strict mode violation', 'resolved to 0 elements', 'resolved to 2 elements', 'locator.click:', 'locator.fill:', 'getByRole(', 'getByLabel(', 'waiting for locator'],
    TIMEOUT_ERROR:      ['Timeout', 'ms exceeded', 'waitForSelector', 'waitForNavigation', 'waitForLoadState'],
    ELEMENT_INVISIBLE:  ['not visible', 'element is hidden', 'is not visible in the viewport'],
    ELEMENT_DISABLED:   ['element is disabled', 'not enabled', 'disabled property'],
    ASSERTION_FAILURE:  ['expect(', 'toBe(', 'toContain(', 'toEqual(', 'AssertionError'],
    NAVIGATION_FAILURE: ['page.goto', 'net::ERR', 'navigation timeout', 'ERR_NAME_NOT_RESOLVED'],
  },
  // Locator strategy priority order for re-execution attempts
  locatorStrategyOrder: [
    'original',       // 1. Try the exact locator from the failing script
    'exploration',    // 2. Try the locator captured during exploration
    'fallbacks',      // 3. Try each fallback from the locators file
    'role_exact',     // 4. Try role with exact:true
    'css_structural', // 5. Try CSS with partial ID match
    'aria_label',     // 6. Try aria-label attribute
    'text_content',   // 7. Try by text content
  ],
};

module.exports = { healingConfig };
