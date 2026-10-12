/**
 * Purchase Order Playwright Fixtures
 * Provides pre-configured test context with:
 * - Authenticated SAP session
 * - Page Object instance
 * - Cleanup and teardown
 *
 * Generated: 2026-07-31 (from MCP scriptless execution)
 */

import { test as base } from '@playwright/test';
import { PurchaseOrderPage } from './purchase-order.page.js';

/**
 * Custom fixture: purchaseOrderPage
 * Provides authenticated PurchaseOrderPage instance
 */
export const test = base.extend({
  purchaseOrderPage: async ({ page }, use) => {
    const poPage = new PurchaseOrderPage(page);

    // Setup: Navigate and login to SAP Fiori
    const sapFioriUrl = process.env.SAP_FIORI_URL || 'https://my426318.s4hana.cloud.sap/ui?sap-language=en&help-mixedLanguages=false&help-autoStartTour=e8bc3755f84d8126e10000000a4450e5#Shell-home';
    const sapUsername = process.env.SAP_USERNAME || 'sunil.yogi@capgemini.com';
    const sapPassword = process.env.SAP_PASSWORD || 'SAP12345@1';

    // Navigate to Fiori
    await poPage.navigateToFiori(sapFioriUrl);

    // Perform two-step login
    await poPage.loginTwoStep(sapUsername, sapPassword);

    // Dismiss any popups
    await poPage.dismissAllKnownPopups();

    // Use the fixture in test
    await use(poPage);

    // Teardown: Sign out if test didn't already do it
    try {
      const currentUrl = page.url();
      // Only sign out if still in SAP (not on IDP logout page)
      if (currentUrl.includes('s4hana.cloud.sap') && !currentUrl.includes('accounts.sap.com')) {
        await poPage.signOut();
      }
    } catch (e) {
      console.log('Cleanup: Could not sign out gracefully:', e.message);
      // Continue anyway - browser will close
    }
  },
});

/**
 * Re-export test utilities for convenient use in specs
 */
export { expect } from '@playwright/test';
