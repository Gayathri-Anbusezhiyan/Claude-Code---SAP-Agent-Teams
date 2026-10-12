// automation/pages/common/common.fixtures.js
// Common fixtures providing SAP page object instances

const { test: base, expect } = require('@playwright/test');
const { SapLoginPage } = require('./sap-login.page');
const { FioriLaunchpadPage } = require('./fiori-launchpad.page');
const { SapShellPage } = require('./sap-shell.page');
const { SapTableHelper } = require('./sap-table.helper');
const { SapDialogHelper } = require('./sap-dialog.helper');
const { SapMessageHelper } = require('./sap-message.helper');
const { waitForSapPageReady, navigateToFioriApp } = require('../../utils/sap-ui5-helper');
const { logger } = require('../../utils/logger');

const test = base.extend({

  sapLoginPage: async ({ page }, use) => {
    await use(new SapLoginPage(page));
  },

  launchpadPage: async ({ page }, use) => {
    await use(new FioriLaunchpadPage(page));
  },

  shellPage: async ({ page }, use) => {
    await use(new SapShellPage(page));
  },

  dialogHelper: async ({ page }, use) => {
    await use(new SapDialogHelper(page));
  },

  messageHelper: async ({ page }, use) => {
    await use(new SapMessageHelper(page));
  },

  /**
   * Factory fixture: creates a SapTableHelper for a given table selector.
   * Usage: const table = await tableHelper('[id*="purchaseOrderTable"]');
   */
  tableHelper: async ({ page }, use) => {
    const createHelper = (tableSelector) => new SapTableHelper(page, tableSelector);
    await use(createHelper);
  },

  /**
   * Authenticated SAP page with Fiori Launchpad ready.
   * Uses IDP two-step login (email → Continue → password → Continue).
   */
  authenticatedPage: async ({ page }, use) => {
    const baseUrl = process.env.SAP_BASE_URL || 'https://my429998.s4hana.cloud.sap';
    const username = process.env.SAP_USERNAME;
    const password = process.env.SAP_PASSWORD;

    if (!username || !password) {
      throw new Error('SAP_USERNAME and SAP_PASSWORD environment variables must be set');
    }

    logger.info('Authenticating to SAP Fiori Launchpad', 'CommonFixtures');

    const loginPage = new SapLoginPage(page);
    await page.goto(`${baseUrl}/ui#Shell-home`, { waitUntil: 'domcontentloaded' });

    const isLoginVisible = await loginPage.isLoginPageVisible();
    if (isLoginVisible) {
      await loginPage.login(username, password);
    }

    await waitForSapPageReady(page, 60000);
    await use(page);
  },

  /**
   * Navigate to a specific Fiori app after authentication.
   * Usage: const page = await sapApp('#PurchaseOrder-manage');
   */
  sapApp: async ({ authenticatedPage }, use) => {
    const navigate = async (hashFragment) => {
      await navigateToFioriApp(authenticatedPage, hashFragment);
      return authenticatedPage;
    };
    await use(navigate);
  },
});

module.exports = { test, expect };
