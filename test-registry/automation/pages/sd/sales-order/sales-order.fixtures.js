// automation/pages/sd/sales-order/sales-order.fixtures.js
// Playwright fixtures for SAP VA01 Create Sales Order
// Error handling patterns from scriptless execution report (2026-04-21)

const { test: base, expect } = require('@playwright/test');
const { SalesOrderPage } = require('./sales-order.page');
const { SapLoginPage } = require('../../common/sap-login.page');
const { waitForSapPageReady, dismissAllPopups, waitForBusyAndBlockLayer } = require('../../../utils/sap-ui5-helper');
const { logger } = require('../../../utils/logger');

const test = base.extend({
  salesOrderPage: async ({ page }, use) => {
    const baseUrl = process.env.SAP_BASE_URL || 'https://my426318.s4hana.cloud.sap';

    // Navigate to SAP — triggers redirect to IDP if not authenticated
    logger.info('Navigating to SAP Fiori Launchpad...', 'SalesOrderFixture');
    await page.goto(`${baseUrl}/ui#Shell-home`, { waitUntil: 'domcontentloaded', timeout: 90000 });

    // Scriptless: SAP redirects to *.accounts.ondemand.com (NOT accounts.sap.com)
    // Use Promise.race to detect IDP login vs already-authenticated Fiori shell
    const loginField = page.getByRole('textbox', { name: 'Email, User ID or Login Name' });
    const shellBar = page.getByRole('banner', { name: 'Shell Bar' });

    logger.info('Waiting for IDP login or Fiori Launchpad...', 'SalesOrderFixture');
    const whichAppeared = await Promise.race([
      loginField.waitFor({ state: 'visible', timeout: 60000 }).then(() => 'login'),
      shellBar.waitFor({ state: 'visible', timeout: 60000 }).then(() => 'launchpad'),
    ]);

    if (whichAppeared === 'login') {
      logger.info('IDP login page detected (accounts.ondemand.com), authenticating...', 'SalesOrderFixture');
      const loginPage = new SapLoginPage(page);
      await loginPage.login(
        process.env.SAP_USERNAME,
        process.env.SAP_PASSWORD
      );
      await waitForSapPageReady(page, 60000);
    }

    logger.info('SAP authentication complete', 'SalesOrderFixture');

    // Scriptless: Multiple popups can appear after login (Guided Tour, Introduction, What's New)
    await dismissAllPopups(page);
    logger.info('Dismissed post-login popups (if any)', 'SalesOrderFixture');

    // Wait for busy/block layer to clear before verifying Shell Bar
    await waitForBusyAndBlockLayer(page);

    // Wait for Shell Bar — Fiori Launchpad needs ~15-25s after IDP login
    logger.info('Waiting for Shell Bar to become visible...', 'SalesOrderFixture');
    await shellBar.waitFor({ state: 'visible', timeout: 30000 }).catch(async () => {
      logger.info('Shell Bar not visible after 30s — waiting additional 10s', 'SalesOrderFixture');
      await page.waitForTimeout(10000);
    });

    const soPage = new SalesOrderPage(page);
    await use(soPage);
  },
});

module.exports = { test, expect };
