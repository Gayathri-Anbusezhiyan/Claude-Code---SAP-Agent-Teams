// automation/config/playwright.config.js
// SAP S/4HANA Fiori Playwright Configuration

const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

// Load .env from project root
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '..', '.env') });

// Generate timestamped report directory
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const reportDir = path.resolve(__dirname, '..', 'test-results', 'reports', timestamp);

module.exports = defineConfig({
  testDir: path.resolve(__dirname, '..', 'tests'),

  // SAP sessions cannot run in parallel — single worker
  fullyParallel: false,
  workers: 1,

  // Retry once for SAP flakiness (OData calls, slow renders)
  retries: process.env.CI ? 2 : 1,

  forbidOnly: !!process.env.CI,

  // Timeouts — SAP Fiori apps are slower than standard web apps
  timeout: 300000,        // 5 min per test (includes fixture setup + test execution)
  expect: {
    timeout: 15000        // 15s for assertions
  },

  reporter: [
    ['html', { outputFolder: path.join(reportDir), open: process.env.CI ? 'never' : 'on-failure' }],
    ['json', { outputFile: path.join(reportDir, 'results.json') }],
    ['junit', { outputFile: path.join(reportDir, 'junit.xml') }]
  ],

  use: {
    // SAP Fiori Launchpad URL — override with SAP_BASE_URL env var
    baseURL: process.env.SAP_BASE_URL || 'https://my429998.s4hana.cloud.sap',

    // Navigation and action timeouts for SAP
    navigationTimeout: 90000,   // 90s — SAP pages load slowly
    actionTimeout: 30000,       // 30s — SAP actions (save, post) take time

    // Always capture evidence
    trace: 'on',                // Capture full trace (includes screenshots at every step)
    screenshot: 'on',           // Screenshot on every action
    video: 'on',                // Record video at native screen resolution

    // Browser settings
    headless: false,            // Run in headed mode to see browser execution
    viewport: null,             // null = use full available screen size automatically
    ignoreHTTPSErrors: true,

    // Browser window settings - maximize to use full screen
    launchOptions: {
      args: [
        '--start-maximized',      // Start browser maximized to native screen size
      ],
    },

    // Locale and timezone for SAP
    locale: 'en-US',
    timezoneId: 'Europe/Berlin',
  },

  projects: [
    {
      name: 'sap-chromium',
      use: {
        viewport: null,  // null = use full available screen size automatically
        launchOptions: {
          args: [
            '--start-maximized',  // Maximize to native screen resolution
          ],
        },
      },
    },
  ],
});
