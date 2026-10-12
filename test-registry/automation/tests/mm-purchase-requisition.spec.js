// automation/tests/mm-purchase-requisition.spec.js
// Test specs for SAP Purchase Requisition apps
// Generated based on test case specifications

const { test, expect } = require('../pages/mm/purchase-requisition/purchase-requisition.fixtures');
const { getTestCase } = require('../fixtures/test-data');
const { logger } = require('../utils/logger');

test.describe('MM - Purchase Requisition', () => {

  test('TC_MM_PR_001: Create Purchase Requisition - Advanced', async ({ purchaseRequisitionPage }) => {
    const tc = getTestCase('mm-purchase-requisition', 'TC_MM_PR_001');
    logger.testStart('TC_MM_PR_001', 'Create Purchase Requisition - Advanced');

    // Close any blocking popups
    await purchaseRequisitionPage.closeGuidedTourPopup();

    // Search and open app
    await purchaseRequisitionPage.searchAndOpenApp(tc.input.appName);
    await purchaseRequisitionPage.clickSearchResult(tc.input.appName);

    // Expand Item Overview section
    await purchaseRequisitionPage.expandItemOverview();

    // Enter material
    await purchaseRequisitionPage.enterMaterial(tc.input.material);
    await purchaseRequisitionPage.confirmMaterial();

    // Select plant (may auto-populate)
    await purchaseRequisitionPage.selectPlant(tc.input.plant);

    // Enter quantity
    await purchaseRequisitionPage.enterQuantity(tc.input.quantity);
    await purchaseRequisitionPage.confirmQuantity();

    // Save PR
    await purchaseRequisitionPage.clickSave();

    // Verify PR creation
    const prNumber = await purchaseRequisitionPage.getPRNumber();
    expect(prNumber).toBeTruthy();
    expect(prNumber).toMatch(/^\d{10}$/);
    logger.info(`PR created successfully: ${prNumber}`, 'TC_MM_PR_001');

    // Verify success message
    const successMessage = await purchaseRequisitionPage.getSuccessMessage();
    expect(successMessage).toContain('Purchase requisition');
    expect(successMessage).toContain(prNumber);

    // Sign out
    await purchaseRequisitionPage.clickUserProfile();
    await purchaseRequisitionPage.clickSignOut();
    await purchaseRequisitionPage.confirmSignOut();

    logger.testComplete('TC_MM_PR_001', 'PASS', `PR ${prNumber} created`);
  });

  test('TC_MM_PR_002: Change Purchase Requisition', async ({ purchaseRequisitionPage }) => {
    const tc = getTestCase('mm-purchase-requisition', 'TC_MM_PR_002');
    logger.testStart('TC_MM_PR_002', 'Change Purchase Requisition');

    // Close any blocking popups
    await purchaseRequisitionPage.closeGuidedTourPopup();

    // Search and open Display PR app
    await purchaseRequisitionPage.searchAndOpenApp(tc.input.appName);
    await purchaseRequisitionPage.clickSearchResult(tc.input.appName);

    // Enter PR number and run
    await purchaseRequisitionPage.enterPRNumber(tc.input.prNumber);
    await purchaseRequisitionPage.clickRun();

    // Double-click item to open details
    await purchaseRequisitionPage.doubleClickItemValue();

    // Click Display/Change tab to enable editing
    await purchaseRequisitionPage.clickDisplayChangeTab();

    // Expand Item Overview section
    await purchaseRequisitionPage.expandItemOverview();

    // Edit PR quantity
    await purchaseRequisitionPage.editPRQuantity(tc.input.newQuantity);

    // Save changes
    await purchaseRequisitionPage.savePRChanges();

    // Verify change success message
    const isSuccess = await purchaseRequisitionPage.verifyChangeSuccessMessage(tc.input.prNumber);
    expect(isSuccess).toBe(true);

    logger.info(`PR ${tc.input.prNumber} changed successfully`, 'TC_MM_PR_002');

    // Sign out
    await purchaseRequisitionPage.clickUserProfile();
    await purchaseRequisitionPage.clickSignOut();
    await purchaseRequisitionPage.confirmSignOut();

    logger.testComplete('TC_MM_PR_002', 'PASS', `PR ${tc.input.prNumber} quantity updated`);
  });

  test('TC_MM_PR_003: Display Purchase Requisition', async ({ purchaseRequisitionPage }) => {
    const tc = getTestCase('mm-purchase-requisition', 'TC_MM_PR_003');
    logger.testStart('TC_MM_PR_003', 'Display Purchase Requisition');

    // Close any blocking popups
    await purchaseRequisitionPage.closeGuidedTourPopup();

    // Search and open Display PR app
    await purchaseRequisitionPage.searchAndOpenApp(tc.input.appName);
    await purchaseRequisitionPage.clickSearchResult(tc.input.appName);

    // Enter PR number and run
    await purchaseRequisitionPage.enterPRNumber(tc.input.prNumber);
    await purchaseRequisitionPage.clickRun();

    // Double-click item to view details
    await purchaseRequisitionPage.doubleClickItemValue();

    // Expand Item Overview and Header sections to verify read-only mode
    await purchaseRequisitionPage.expandItemOverview();

    // Verify PR details are displayed (read-only)
    const heading = purchaseRequisitionPage.page.getByRole('heading', { level: 2 });
    const headingText = await heading.textContent();
    expect(headingText).toContain(tc.input.prNumber);

    logger.info(`PR ${tc.input.prNumber} displayed successfully (read-only)`, 'TC_MM_PR_003');

    // Sign out
    await purchaseRequisitionPage.clickUserProfile();
    await purchaseRequisitionPage.clickSignOut();
    await purchaseRequisitionPage.confirmSignOut();

    logger.testComplete('TC_MM_PR_003', 'PASS', `PR ${tc.input.prNumber} viewed`);
  });

});
