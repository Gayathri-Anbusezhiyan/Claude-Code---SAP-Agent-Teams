// automation/pages/mm/purchase-order-change/purchase-order-change.fixtures.js
// Playwright fixtures for SAP "Change Purchase Order - Advanced" (ME22N)
// Error handling patterns from scriptless execution report (2026-04-15)

const { test: base, expect } = require('@playwright/test');
const { PurchaseOrderChangePage } = require('./purchase-order-change.page');
const { SapLoginPage } = require('../../common/sap-login.page');
const { waitForSapPageReady, dismissAllPopups, waitForBusyAndBlockLayer } = require('../../../utils/sap-ui5-helper');
const { logger } = require('../../../utils/logger');

const test = base.extend({
  purchaseOrderChangePage: async ({ page }, use) => {
    const baseUrl = process.env.SAP_BASE_URL || 'https://my426318.s4hana.cloud.sap';

    logger.info('Navigating to SAP Fiori Launchpad...', 'PurchaseOrderChangeFixture');
    await page.goto(`${baseUrl}/ui#Shell-home`, { waitUntil: 'domcontentloaded', timeout: 90000 });

    // Detect IDP login vs already-authenticated Fiori shell
    const loginField = page.getByRole('textbox', { name: 'Email, User ID or Login Name' });
    const shellBar = page.getByRole('banner', { name: 'Shell Bar' });

    logger.info('Waiting for IDP login or Fiori Launchpad...', 'PurchaseOrderChangeFixture');
    const whichAppeared = await Promise.race([
      loginField.waitFor({ state: 'visible', timeout: 60000 }).then(() => 'login'),
      shellBar.waitFor({ state: 'visible', timeout: 60000 }).then(() => 'launchpad'),
    ]);

    if (whichAppeared === 'login') {
      logger.info('IDP login page detected, authenticating...', 'PurchaseOrderChangeFixture');
      const loginPage = new SapLoginPage(page);
      await loginPage.login(
        process.env.SAP_USERNAME,
        process.env.SAP_PASSWORD
      );
      await waitForSapPageReady(page, 60000);
    }

    logger.info('SAP authentication complete', 'PurchaseOrderChangeFixture');

    // Scriptless 2026-04-15 discovered: Guided Tour popup appeared and needed dismissal
    await dismissAllPopups(page);
    logger.info('Dismissed post-login popups (if any)', 'PurchaseOrderChangeFixture');

    await waitForBusyAndBlockLayer(page);

    // Wait for Shell Bar to become visible — Fiori Launchpad needs ~15-25s after IDP login
    logger.info('Waiting for Shell Bar to become visible...', 'PurchaseOrderChangeFixture');
    await shellBar.waitFor({ state: 'visible', timeout: 30000 }).catch(async () => {
      logger.info('Shell Bar not visible after 30s — waiting additional 10s', 'PurchaseOrderChangeFixture');
      await page.waitForTimeout(10000);
    });

    const changePage = new PurchaseOrderChangePage(page);
    await use(changePage);
  },
});

module.exports = { test, expect };
