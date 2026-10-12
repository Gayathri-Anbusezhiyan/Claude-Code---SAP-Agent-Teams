// automation/tests/mm-purchase-order-view.spec.js
// Test specs for SAP "Display Purchase Order - Advanced" (ME23N)
// Based on scriptless execution report 2026-04-16T06-00-00

const { test, expect } = require('../pages/mm/purchase-order-view/purchase-order-view.fixtures');
const { getTestCase } = require('../fixtures/test-data');
const { logger } = require('../utils/logger');

test.describe('MM - Display Purchase Order (Advanced)', () => {

  // Increase timeout for SAP GUI transactions
  test.setTimeout(180000);

  test('TC_MM_PO_VIEW_001: View purchase order details', async ({ purchaseOrderViewPage }) => {
    const tc = getTestCase('mm-purchase-order-view', 'TC_MM_PO_VIEW_001');
    logger.testStart('TC_MM_PO_VIEW_001', 'View purchase order details');

    // --- Phase 1: Navigate to Display PO app ---
    await purchaseOrderViewPage.dismissAllKnownPopups();

    await purchaseOrderViewPage.searchAndOpenApp(tc.input.appName);
    await purchaseOrderViewPage.clickSearchResult(tc.input.appName);

    // --- Phase 2: Open specific PO ---
    // Scriptless 2026-04-16 confirmed: Same SAP GUI pattern as Change PO —
    // "Other Purchase Order" button opens "Select Document" dialog
    await purchaseOrderViewPage.clickOtherPurchaseOrder();

    // Scriptless 2026-04-16 discovered: Original test case was MISSING the PO number entry step.
    // Added PO number entry based on scriptless execution.
    await purchaseOrderViewPage.enterPurchaseOrderNumber(tc.input.purchaseOrderNumber);
    await purchaseOrderViewPage.confirmPurchaseOrderNumber();

    // --- Phase 3: Verify PO data is displayed ---
    // Scriptless 2026-04-16 confirmed: Title shows "Standard PO 4500063731 Created by Trial 0030517 User"
    const poTitle = await purchaseOrderViewPage.getPOTitle();
    expect(poTitle, `PO title should be present after loading PO ${tc.input.purchaseOrderNumber}`)
      .toBeTruthy();

    if (poTitle) {
      expect(poTitle, `PO title "${poTitle}" should contain PO number`)
        .toContain(tc.input.purchaseOrderNumber);
      expect(poTitle, `PO title "${poTitle}" should indicate correct PO type`)
        .toContain(tc.expected.poTitleContains);
    }

    logger.info(`PO ${tc.input.purchaseOrderNumber} displayed successfully — title: ${poTitle}`, 'TC_MM_PO_VIEW_001');

    // --- Phase 4: Sign out ---
    // Scriptless 2026-04-16 confirmed: Profile dialog -> Sign Out (last listitem) ->
    // alertdialog "Are you sure you want to sign out?" -> OK -> redirect to /logoff
    await purchaseOrderViewPage.clickUserProfile();
    await purchaseOrderViewPage.clickSignOut();
    await purchaseOrderViewPage.confirmSignOut();

    const currentUrl = purchaseOrderViewPage.page.url();
    expect(currentUrl, 'Should redirect to SAP logoff page').toContain(tc.expected.signOutRedirectUrl);

    logger.testEnd('TC_MM_PO_VIEW_001', 'passed');
  });

});
