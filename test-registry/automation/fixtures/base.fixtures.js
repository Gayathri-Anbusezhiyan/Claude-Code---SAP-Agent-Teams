// automation/fixtures/base.fixtures.js
// Shared Playwright fixtures for SAP S/4HANA Fiori automation

const { test: base, expect } = require('@playwright/test');
const { SapLoginPage } = require('../pages/common/sap-login.page');
const { waitForSapPageReady, navigateToFioriApp } = require('../utils/sap-ui5-helper');
const { logger } = require('../utils/logger');

const test = base.extend({

  /**
   * Authenticated SAP page fixture.
   * Logs into SAP Fiori Launchpad using IDP two-step login and provides a ready-to-use page.
   */
  authenticatedPage: async ({ page }, use) => {
    const baseUrl = process.env.SAP_BASE_URL || 'https://my429998.s4hana.cloud.sap';
    const username = process.env.SAP_USERNAME;
    const password = process.env.SAP_PASSWORD;

    if (!username || !password) {
      throw new Error('SAP_USERNAME and SAP_PASSWORD environment variables must be set');
    }

    logger.info('Navigating to SAP Fiori Launchpad', 'Fixtures');
    await page.goto(`${baseUrl}/ui#Shell-home`, { waitUntil: 'domcontentloaded' });

    // Handle SAP IDP login (two-step: email → Continue → password → Continue)
    const loginPage = new SapLoginPage(page);
    const isLoginPage = await loginPage.isLoginPageVisible();

    if (isLoginPage) {
      logger.info('IDP login page detected, entering credentials', 'Fixtures');
      await loginPage.login(username, password);
    }

    // Wait for SAP UI5 to be ready
    await waitForSapPageReady(page, 60000);

    logger.info('SAP Fiori Launchpad ready', 'Fixtures');
    await use(page);
  },

  /**
   * Navigate to a specific SAP Fiori app after authentication.
   * Usage: test('my test', async ({ sapApp }) => { const page = await sapApp('#PurchaseOrder-manage'); })
   */
  sapApp: async ({ authenticatedPage }, use) => {
    const navigate = async (hashFragment) => {
      logger.info(`Navigating to SAP app: ${hashFragment}`, 'Fixtures');
      await navigateToFioriApp(authenticatedPage, hashFragment);
      return authenticatedPage;
    };
    await use(navigate);
  },
});

module.exports = { test, expect };
