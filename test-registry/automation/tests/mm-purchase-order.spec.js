/**
 * MM Purchase Order Test Suite
 * SAP S/4HANA Cloud Fiori - Materials Management (MM)
 * App: Manage Purchase Orders
 *
 * Test Cases: CS-2 (Create Standard Purchase Order)
 * Generated: 2026-07-31 (from MCP scriptless execution)
 * Total: 1 test case (TC-CS-001) - fully executable
 */

import { test, expect } from '../pages/mm/purchase-order/purchase-order.fixtures.js';
import { getTestCase, getTestData } from '../helpers/test-data.helper.js';

/**
 * ==========================================================================
 * TC-CS-001: Create Standard PO — Single Line Item (Happy Path)
 * ==========================================================================
 * This test verifies the complete flow of creating a Standard Purchase Order
 * with a single line item in SAP S/4HANA Cloud.
 */
test('TC-CS-001 (HP) Create Standard PO — single line item', async ({ purchaseOrderPage: page }) => {
  // Get test data
  const tc = getTestCase('TC-CS-001');
  const td = getTestData('TD-CS-002-001');

  console.log(`\n🧪 Executing: ${tc.title}`);
  console.log(`📊 Priority: ${tc.priority}`);

  // Step 1-6: Navigate and Login (handled by fixture)
  console.log('✓ Steps 1-6: Logged in to SAP Fiori');

  // Step 7-8: Navigate to Manage Purchase Orders
  console.log('⏳ Steps 7-8: Navigating to Manage Purchase Orders...');
  await page.navigateToManagePurchaseOrders();
  console.log('✓ Steps 7-8: Navigated to Manage Purchase Orders');

  // Step 9: Click Create PO button
  console.log('⏳ Step 9: Creating new PO draft...');
  await page.clickCreatePoButton();
  console.log('✓ Step 9: PO draft created');

  // Step 10-11: Enter Supplier and press Enter
  console.log(`⏳ Steps 10-11: Entering Supplier: ${td.supplierId}...`);
  await page.enterSupplier(td.supplierId);
  await page.confirmSupplierEntry();

  const autoFields = await page.getSupplierAutoPopulatedFields();
  console.log(`✓ Steps 10-11: Supplier entered. Auto-populated:`);
  console.log(`  - Purchasing Group: ${autoFields.purchasingGroup}`);
  console.log(`  - Purchasing Org: ${autoFields.purchasingOrg}`);
  console.log(`  - Company Code: ${autoFields.companyCode}`);

  expect(autoFields.purchasingGroup).toContain('(');
  expect(autoFields.purchasingOrg).toContain('(');
  expect(autoFields.companyCode).toContain('(');

  // Step 12: Create line item
  console.log('⏳ Step 12: Creating line item...');
  await page.createLineItem();
  console.log('✓ Step 12: Line item created');

  // Step 13-14: Enter Material and press Enter
  console.log(`⏳ Steps 13-14: Entering Material: ${td.materialId}...`);
  await page.enterMaterial(td.materialId);
  await page.confirmMaterialEntry();

  // Verify UoM auto-populated
  const uom = await page.getLineItemUoM();
  console.log(`✓ Steps 13-14: Material entered. Auto-populated UoM: ${uom}`);
  expect(uom).toBeTruthy();

  // Step 15-16: Enter Quantity and press Tab
  console.log(`⏳ Steps 15-16: Entering Quantity: ${td.quantity}...`);
  await page.enterQuantity(td.quantity);
  await page.tabToNextField();
  console.log('✓ Steps 15-16: Quantity entered');

  // Step 17-18: Enter Price and press Enter
  console.log(`⏳ Steps 17-18: Entering Price: ${td.price} USD...`);
  await page.enterNetPrice(td.price);
  await page.confirmPriceEntry();
  console.log('✓ Steps 17-18: Price entered (Net Order Value calculated automatically)');

  // Step 19-20: Enter Plant and press Enter
  console.log(`⏳ Steps 19-20: Entering Plant: ${td.plant}...`);
  await page.enterPlant(td.plant);
  await page.confirmPlantEntry();
  console.log('✓ Steps 19-20: Plant entered. Line item fully configured.');

  // Step 21-23: Submit PO and verify
  console.log('⏳ Steps 21-23: Submitting Purchase Order...');
  await page.submitPurchaseOrder();

  const poInfo = await page.getPoInfo();
  console.log('✓ Steps 21-23: PO submitted successfully!');
  console.log(`\n🎉 Purchase Order Created:`);
  console.log(`   PO Number: ${poInfo.poNumber}`);
  console.log(`   Page Title: ${poInfo.pageTitle}`);
  console.log(`   Status: ${poInfo.isSuccessful ? 'SAVED' : 'DRAFT'}`);

  // Verify PO creation
  expect(poInfo.isSuccessful).toBeTruthy();
  expect(poInfo.poNumber).toMatch(/^45\d{8}$/); // 10-digit number starting with 45
  expect(poInfo.pageTitle).toContain(poInfo.poNumber);
  expect(poInfo.pageTitle).toContain('Standard PO');

  // Step 24-26: Sign out (handled by fixture teardown)
  console.log('✓ Steps 24-26: Sign out will be handled by fixture cleanup');

  console.log(`\n✅ TC-CS-001 PASSED\n`);
});
