// automation/tests/sd-sales-order.spec.js
// Test specs for SAP VA01 Create Sales Order
// Error handling informed by scriptless execution report (2026-04-21)
// Sales Order 321089 created successfully during scriptless run

const { test, expect } = require('../pages/sd/sales-order/sales-order.fixtures');
const { getTestCase } = require('../fixtures/test-data');
const { logger } = require('../utils/logger');

test.describe('SD - Sales Order (VA01/VA02/VA03)', () => {

  // VA01/VA02/VA03 are heavy SAP GUI transactions — allow extra time
  test.setTimeout(300000);

  test('TC_SD_SO_001: Create Sales Order via VA01', async ({ salesOrderPage }) => {
    const tc = getTestCase('sd-sales-order', 'TC_SD_SO_001');
    logger.testStart('TC_SD_SO_001', 'Create Sales Order via VA01');

    // --- Phase 1: Navigate to VA01 app ---
    // Scriptless: Guided Tour popup can block all interaction after login
    await salesOrderPage.dismissAllKnownPopups();

    // VA01 is a classic SAP GUI transaction — enterprise search returns 0 results.
    // Navigate directly via semantic object hash fragment (SalesDocument-create).
    await salesOrderPage.navigateToVA01();

    // --- Phase 2: VA01 Initial Screen — Order Type and Sales Org ---
    // Scriptless: VA01 loads inside SAP GUI iframe (__container63-iframe)
    // Order Type is a textbox (not a dropdown) — type the code "OR" for Standard Order
    await salesOrderPage.enterOrderType(tc.input.orderTypeCode);
    await salesOrderPage.enterSalesOrgData(
      tc.input.salesOrganization,
      tc.input.distributionChannel,
      tc.input.division
    );
    await salesOrderPage.clickContinue();

    // --- Phase 3: Create Standard Order: Overview ---
    await salesOrderPage.verifyOverviewPage();

    // Scriptless: Sold-to party auto-resolves to customer name after Tab
    await salesOrderPage.enterSoldToParty(tc.input.soldToParty);
    await salesOrderPage.enterShipToParty(tc.input.shipToParty);
    await salesOrderPage.enterCustReference(tc.input.custReference);
    await salesOrderPage.enterCustRefDate(tc.input.custRefDate);

    // --- Phase 4: Enter line item (Material + Quantity) ---
    // Scriptless: browser_type crashes Chrome on SAP GUI grid cells — use fill approach
    // Pattern: click cell → wait → re-query for activated input → fill
    await salesOrderPage.enterMaterial(tc.input.material);
    await salesOrderPage.enterOrderQuantity(tc.input.orderQuantity);
    await salesOrderPage.pressEnterToAutoPopulate();

    // --- Phase 5: Save → Document Incomplete → Incompletion Log ---
    await salesOrderPage.clickSave();

    // Scriptless: "Document Incomplete" dialog appears with Save/Edit/Cancel
    const isIncomplete = await salesOrderPage.isDocumentIncompleteDialogVisible();
    if (isIncomplete) {
      logger.info('Document Incomplete dialog detected — entering Incompletion Log', 'TC_SD_SO_001');

      // Click Edit to enter Incompletion Log
      await salesOrderPage.clickDocumentIncompleteEdit();

      // Select All + Complete Data to navigate to first missing field
      await salesOrderPage.clickSelectAll();
      await salesOrderPage.clickCompleteData();

      // Fill Gross Weight and Net Weight
      await salesOrderPage.enterGrossWeight(tc.input.grossWeight);
      await salesOrderPage.enterNetWeight(tc.input.netWeight);

      // Navigate to next incomplete field (Pricing)
      await salesOrderPage.clickEditNextData();

      // --- Phase 6: Pricing Elements ---
      // Scriptless: CnTy cells are readonly by default. Must use "Insert Row" to create editable row.
      await salesOrderPage.enterPricingCondition(tc.input.pricingCondition, tc.input.conditionAmount);

      // Navigate back to Overview
      await salesOrderPage.clickEditNextData();
    }

    // --- Phase 7: Verify document complete and final Save ---
    const isComplete = await salesOrderPage.isDocumentComplete();
    expect(isComplete, 'Document should show "Document is complete" message').toBe(true);

    await salesOrderPage.clickSave();

    // --- Phase 8: Verify Sales Order creation ---
    const soNumber = await salesOrderPage.getSalesOrderNumber();
    expect(soNumber, 'Sales Order number should be present in status bar').toBeTruthy();
    expect(soNumber, `Sales Order "${soNumber}" should be a numeric value`).toMatch(/^\d+$/);
    logger.info(`Sales Order created: ${soNumber}`, 'TC_SD_SO_001');

    // --- Phase 9: Sign out ---
    // Scriptless: Block layer (sapUiBLy) can intercept clicks during sign-out.
    // Profile menu has "Adapt UI" close to "Sign Out" — exact matching required.
    await salesOrderPage.clickUserProfile();
    await salesOrderPage.clickSignOut();
    await salesOrderPage.confirmSignOut();

    // Verify redirect to SAP logoff page
    const currentUrl = salesOrderPage.page.url();
    expect(currentUrl, 'Should redirect to SAP logoff page').toContain(tc.expected.signOutRedirectUrl);

    logger.testEnd('TC_SD_SO_001', 'passed');
  });

  test('TC_SD_SO_002: Change Sales Order via VA02', async ({ salesOrderPage }) => {
    const tc = getTestCase('sd-sales-order', 'TC_SD_SO_002');
    logger.testStart('TC_SD_SO_002', 'Change Sales Order via VA02');

    // Dismiss popups
    await salesOrderPage.dismissAllKnownPopups();

    // Navigate to VA02
    await salesOrderPage.navigateToVA02();

    // Enter Sales Order number
    await salesOrderPage.enterSalesOrderNumber(tc.input.salesOrderNumber);

    // Sales order is displayed with editable screen
    await salesOrderPage.page.waitForTimeout(3000);

    // Change the quantity of the material
    await salesOrderPage.changeOrderQuantity(tc.input.newQuantity);

    // Save changes
    await salesOrderPage.clickSave();

    // Verify success message
    const statusMsg = await salesOrderPage.getStatusBarMessage();
    expect(statusMsg).toContain('Standard Order');
    expect(statusMsg).toContain(tc.input.salesOrderNumber);
    expect(statusMsg).toContain('has been saved');
    logger.info(`Sales Order ${tc.input.salesOrderNumber} changed successfully`, 'TC_SD_SO_002');

    // Sign out
    await salesOrderPage.clickUserProfile();
    await salesOrderPage.clickSignOut();
    await salesOrderPage.confirmSignOut();

    const currentUrl = salesOrderPage.page.url();
    expect(currentUrl).toContain(tc.expected.signOutRedirectUrl);

    logger.testEnd('TC_SD_SO_002', 'passed');
  });

  test('TC_SD_SO_003: Display Sales Order via VA03', async ({ salesOrderPage }) => {
    const tc = getTestCase('sd-sales-order', 'TC_SD_SO_003');
    logger.testStart('TC_SD_SO_003', 'Display Sales Order via VA03');

    // Dismiss popups
    await salesOrderPage.dismissAllKnownPopups();

    // Navigate to VA03
    await salesOrderPage.navigateToVA03();

    // Enter Sales Order number
    await salesOrderPage.enterSalesOrderNumber(tc.input.salesOrderNumber);

    // Verify Sales Order is displayed (read-only)
    const isDisplayed = await salesOrderPage.verifySalesOrderDisplayed(tc.input.salesOrderNumber);
    expect(isDisplayed).toBe(true);

    logger.info(`Sales Order ${tc.input.salesOrderNumber} displayed successfully (read-only)`, 'TC_SD_SO_003');

    // Sign out
    await salesOrderPage.clickUserProfile();
    await salesOrderPage.clickSignOut();
    await salesOrderPage.confirmSignOut();

    const currentUrl = salesOrderPage.page.url();
    expect(currentUrl).toContain(tc.expected.signOutRedirectUrl);

    logger.testEnd('TC_SD_SO_003', 'passed');
  });

});
