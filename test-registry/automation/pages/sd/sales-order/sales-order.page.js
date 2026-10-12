// automation/pages/sd/sales-order/sales-order.page.js
// Page Object for SAP VA01 "Create Sales Order" (SAP GUI for HTML)
// Based on scriptless execution of TC_SD_SO_001 on 2026-04-21 against SAP S/4HANA Cloud (my429998)
// VA01 runs inside iframe[name="__container63-iframe"] — uses SAP GUI helper utilities

const { resolveLocator } = require('../../../utils/locator-helper');
const {
  waitForSapPageReady,
  waitForBusyIndicator,
  waitForBusyAndBlockLayer,
  retryOnIntercept,
  dismissAllPopups,
  dismissUIAdaptationMode,
  checkSessionAlive,
} = require('../../../utils/sap-ui5-helper');
const {
  getSapGuiFrame,
  waitForSapGuiReady,
  getGuiStatusBarMessage,
} = require('../../../utils/sap-gui-helper');
const { SalesOrderLocators } = require('./sales-order.locators');
const { logger } = require('../../../utils/logger');

class SalesOrderPage {
  constructor(page) {
    this.page = page;
    this._frame = null;
  }

  async loc(name) {
    return await resolveLocator(this.page, SalesOrderLocators[name]);
  }

  /**
   * Get the SAP GUI iframe frame for VA01.
   * Caches the frame reference for reuse within a session.
   */
  async getFrame() {
    if (!this._frame || this._frame.isDetached()) {
      this._frame = await getSapGuiFrame(this.page);
    }
    return this._frame;
  }

  /**
   * Resolve a locator within the SAP GUI iframe (not the main page).
   * VA01 elements are inside the iframe, so locators must target the frame.
   */
  async frameLoc(name) {
    const frame = await this.getFrame();
    const config = SalesOrderLocators[name];
    const { primary, fallbacks = [] } = config;

    // Try primary strategy within frame
    const strategies = [primary, ...fallbacks];
    for (const strategyDef of strategies) {
      let locator;
      switch (strategyDef.strategy) {
        case 'role':
          locator = frame.getByRole(strategyDef.value, {
            name: strategyDef.name,
            exact: strategyDef.exact,
          });
          break;
        case 'label':
          locator = frame.getByLabel(strategyDef.value, { exact: strategyDef.exact !== false });
          break;
        case 'text':
          locator = frame.getByText(strategyDef.value, { exact: true });
          break;
        case 'css':
          locator = frame.locator(strategyDef.value);
          break;
        default:
          continue;
      }
      try {
        const count = await locator.count();
        if (count > 0) return locator;
      } catch {
        continue;
      }
    }
    // Return primary as fallback (will fail with clear error)
    return frame.getByRole(primary.value, { name: primary.name });
  }

  // --- Session check ---

  async ensureSessionAlive() {
    const reAuthenticated = await checkSessionAlive(this.page);
    if (reAuthenticated) {
      logger.info('Session expired — re-authenticated successfully', 'SalesOrderPage');
    }
  }

  // --- Dismiss popups ---

  async dismissAllKnownPopups() {
    await dismissAllPopups(this.page);
    logger.info('Dismissed all known popups', 'SalesOrderPage');
  }

  // --- Navigate to VA01 ---
  // Scriptless: VA01 is a classic SAP GUI transaction. Enterprise search returns 0 results for it.
  // During scriptless execution, Focus Search inline suggestions worked, but that uses a dropdown
  // that is difficult to automate reliably. Direct URL hash navigation is the most reliable approach.
  // The semantic object is SalesDocument-create (discovered during scriptless execution step 4).

  async navigateToVA01() {
    // Use Fiori shell hash routing — page.goto() triggers IDP redirect and hangs.
    // Reset hash first to ensure hashchange event fires even on retries.
    logger.info('Navigating to VA01 via hash change...', 'SalesOrderPage');

    await this.page.evaluate(() => {
      window.location.hash = '#Shell-home';
    });
    await this.page.waitForTimeout(2000);

    await this.page.evaluate(() => {
      window.location.hash = '#SalesDocument-create';
    });

    // Wait for the Fiori shell to load the VA01 app inside an iframe
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(5000);

    // Wait for an iframe to appear (VA01 is SAP GUI for HTML, always in an iframe)
    await this.page.waitForSelector('iframe[name*="container"]', { timeout: 60000 }).catch(() => {
      logger.warn('No container iframe found after 60s — trying any iframe', 'SalesOrderPage');
    });

    // Additional wait for iframe content to render
    await this.page.waitForTimeout(5000);

    // Invalidate cached frame reference (fresh navigation creates new iframe)
    this._frame = null;

    // Get the SAP GUI frame and wait for it to be ready
    const frame = await this.getFrame();
    await waitForSapGuiReady(frame);

    logger.info('Navigated to VA01 (SalesDocument-create)', 'SalesOrderPage');
  }

  // --- Navigate to VA02 (Change Sales Order) ---

  async navigateToVA02() {
    logger.info('Navigating to VA02 via hash change...', 'SalesOrderPage');

    await this.page.evaluate(() => {
      window.location.hash = '#Shell-home';
    });
    await this.page.waitForTimeout(2000);

    await this.page.evaluate(() => {
      window.location.hash = '#SalesDocument-change';
    });

    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(5000);
    await this.page.waitForSelector('iframe[name*="container"]', { timeout: 60000 }).catch(() => {
      logger.warn('No container iframe found after 60s', 'SalesOrderPage');
    });
    await this.page.waitForTimeout(5000);
    this._frame = null;

    const frame = await this.getFrame();
    await waitForSapGuiReady(frame);
    logger.info('Navigated to VA02 (SalesDocument-change)', 'SalesOrderPage');
  }

  // --- Navigate to VA03 (Display Sales Order) ---

  async navigateToVA03() {
    logger.info('Navigating to VA03 via hash change...', 'SalesOrderPage');

    await this.page.evaluate(() => {
      window.location.hash = '#Shell-home';
    });
    await this.page.waitForTimeout(2000);

    await this.page.evaluate(() => {
      window.location.hash = '#SalesDocument-display';
    });

    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(5000);
    await this.page.waitForSelector('iframe[name*="container"]', { timeout: 60000 }).catch(() => {
      logger.warn('No container iframe found after 60s', 'SalesOrderPage');
    });
    await this.page.waitForTimeout(5000);
    this._frame = null;

    const frame = await this.getFrame();
    await waitForSapGuiReady(frame);
    logger.info('Navigated to VA03 (SalesDocument-display)', 'SalesOrderPage');
  }

  // --- VA02/VA03 Initial Screen: Enter Sales Order Number ---

  async enterSalesOrderNumber(soNumber) {
    const frame = await this.getFrame();
    await waitForSapGuiReady(frame);

    const field = await this.frameLoc('salesOrderNumberField');
    await field.waitFor({ state: 'visible', timeout: 30000 });
    await field.fill(soNumber);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(5000);

    // Invalidate frame cache — Enter may reload content
    this._frame = null;
    const newFrame = await this.getFrame();
    await waitForSapGuiReady(newFrame);
    logger.info(`Entered Sales Order Number: ${soNumber}`, 'SalesOrderPage');
  }

  // --- VA02: Change quantity in items grid ---

  async changeOrderQuantity(newQuantity) {
    const frame = await this.getFrame();
    await waitForSapGuiReady(frame);

    // Click the Order Quantity gridcell to activate editing
    const qtyCell = await this.frameLoc('orderQuantityGridCell');
    await qtyCell.first().waitFor({ state: 'visible', timeout: 15000 });
    await qtyCell.first().click();
    await this.page.waitForTimeout(1000);

    // Re-query for the activated textbox
    const qtyInput = frame.getByRole('textbox', { name: 'Order Quantity' }).first();
    await qtyInput.waitFor({ state: 'visible', timeout: 5000 });

    // Clear existing value and enter new quantity
    await qtyInput.fill('');
    await qtyInput.fill(newQuantity);
    await this.page.keyboard.press('Enter');
    await waitForSapGuiReady(frame);
    await this.page.waitForTimeout(2000);
    logger.info(`Changed Order Quantity to: ${newQuantity}`, 'SalesOrderPage');
  }

  // --- VA03: Verify Sales Order is displayed (read-only) ---

  async verifySalesOrderDisplayed(soNumber) {
    const frame = await this.getFrame();
    await waitForSapGuiReady(frame);

    // Verify the page title contains the SO number or "Display Standard Order"
    const title = this.page.getByText(/Display.*Standard Order/i, { exact: false });
    const titleVisible = await title.isVisible({ timeout: 10000 }).catch(() => false);

    if (!titleVisible) {
      logger.warn('Display Standard Order title not visible', 'SalesOrderPage');
    }

    // Verify SO number appears in the status bar or content
    const statusMsg = await this.getStatusBarMessage();
    logger.info(`Sales Order displayed (read-only). Status: ${statusMsg}`, 'SalesOrderPage');
    return titleVisible;
  }

  // --- VA01 Initial Screen: Order Type selection ---

  async enterOrderType(orderTypeCode) {
    const frame = await this.getFrame();
    await waitForSapGuiReady(frame);

    // Actual element is textbox "Order Type Required" (not a dropdown)
    // Type the order type code (e.g., "OR" for Standard Order)
    const field = await this.frameLoc('orderTypeField');
    await field.waitFor({ state: 'visible', timeout: 30000 });
    await field.fill(orderTypeCode);
    await this.page.keyboard.press('Tab');
    await this.page.waitForTimeout(1000);
    logger.info(`Entered order type: ${orderTypeCode}`, 'SalesOrderPage');
  }

  // --- VA01 Initial Screen: Sales Organization data ---

  async enterSalesOrgData(salesOrg, distChannel, division) {
    const frame = await this.getFrame();
    await waitForSapGuiReady(frame);

    const salesOrgField = await this.frameLoc('salesOrganizationField');
    await salesOrgField.fill(salesOrg);
    await this.page.keyboard.press('Tab');

    const distChannelField = await this.frameLoc('distributionChannelField');
    await distChannelField.fill(distChannel);
    await this.page.keyboard.press('Tab');

    const divisionField = await this.frameLoc('divisionField');
    await divisionField.fill(division);
    await this.page.keyboard.press('Tab');

    logger.info(`Entered sales org data: ${salesOrg}/${distChannel}/${division}`, 'SalesOrderPage');
  }

  async clickContinue() {
    const frame = await this.getFrame();
    // MCP: Button name is "Continue  Emphasized" (two spaces) — use regex via frameLoc
    const continueBtn = await this.frameLoc('continueButton');
    await continueBtn.waitFor({ state: 'visible', timeout: 15000 });
    await continueBtn.click();
    // Invalidate frame cache — Continue may reload the iframe content
    this._frame = null;
    await this.page.waitForTimeout(5000);
    // Re-acquire frame after reload
    const newFrame = await this.getFrame();
    await waitForSapGuiReady(newFrame);
    logger.info('Clicked Continue', 'SalesOrderPage');
  }

  // --- Create Standard Order: Overview page ---

  async verifyOverviewPage() {
    // MCP: Page title "Create Standard Order: Overview" is in the Fiori Shell Bar
    // (OUTSIDE the iframe), not inside the SAP GUI frame
    const title = this.page.getByText('Create Standard Order: Overview', { exact: false });
    await title.waitFor({ state: 'visible', timeout: 30000 });
    // Also ensure the frame content is ready
    const frame = await this.getFrame();
    await waitForSapGuiReady(frame);
    logger.info('Overview page loaded', 'SalesOrderPage');
  }

  async enterSoldToParty(party) {
    const frame = await this.getFrame();
    const field = await this.frameLoc('soldToPartyField');
    await field.fill(party);
    await this.page.keyboard.press('Tab');
    await waitForSapGuiReady(frame);
    await this.page.waitForTimeout(2000);
    logger.info(`Entered Sold-to Party: ${party}`, 'SalesOrderPage');
  }

  async enterShipToParty(party) {
    const frame = await this.getFrame();
    const field = await this.frameLoc('shipToPartyField');
    await field.fill(party);
    await this.page.keyboard.press('Tab');
    await waitForSapGuiReady(frame);
    logger.info(`Entered Ship-to Party: ${party}`, 'SalesOrderPage');
  }

  async enterCustReference(reference) {
    const frame = await this.getFrame();
    const field = await this.frameLoc('custReferenceField');
    await field.fill(reference);
    await this.page.keyboard.press('Tab');
    logger.info(`Entered Cust. Reference: ${reference}`, 'SalesOrderPage');
  }

  async enterCustRefDate(date) {
    const frame = await this.getFrame();
    const field = await this.frameLoc('custRefDateField');
    await field.fill(date);
    await this.page.keyboard.press('Tab');
    logger.info(`Entered Cust. Ref. Date: ${date}`, 'SalesOrderPage');
  }

  // --- Items grid: Material and Quantity ---
  // Scriptless: SAP GUI grid cells require click → wait → re-query → fill pattern
  // browser_type crashes Chrome on SAP GUI grid cells — MUST use fill approach

  async enterMaterial(material) {
    const frame = await this.getFrame();
    await waitForSapGuiReady(frame);

    // MCP pattern: Grid cells are <span> not <input>. Click gridcell first,
    // SAP creates a NEW textbox element, then fill that textbox.
    const materialCell = await this.frameLoc('materialGridCell');
    await materialCell.first().waitFor({ state: 'visible', timeout: 15000 });
    await materialCell.first().click();
    await this.page.waitForTimeout(1000);

    // Re-query for the activated textbox (SAP creates new input after cell click)
    const materialInput = frame.getByRole('textbox', { name: 'Material' }).first();
    await materialInput.waitFor({ state: 'visible', timeout: 5000 });
    await materialInput.fill(material);
    logger.info(`Entered Material: ${material}`, 'SalesOrderPage');
  }

  async enterOrderQuantity(quantity) {
    const frame = await this.getFrame();

    // Same gridcell activation pattern as Material
    const qtyCell = await this.frameLoc('orderQuantityGridCell');
    await qtyCell.first().waitFor({ state: 'visible', timeout: 15000 });
    await qtyCell.first().click();
    await this.page.waitForTimeout(1000);

    // Re-query for the activated textbox
    const qtyInput = frame.getByRole('textbox', { name: 'Order Quantity' }).first();
    await qtyInput.waitFor({ state: 'visible', timeout: 5000 });
    await qtyInput.fill(quantity);
    logger.info(`Entered Order Quantity: ${quantity}`, 'SalesOrderPage');
  }

  async pressEnterToAutoPopulate() {
    await this.page.keyboard.press('Enter');
    const frame = await this.getFrame();
    await waitForSapGuiReady(frame);
    await this.page.waitForTimeout(2000);
    logger.info('Pressed Enter — fields auto-populated', 'SalesOrderPage');
  }

  // --- Save ---

  async clickSave() {
    const frame = await this.getFrame();
    // MCP pattern: Save button name is "Save  Emphasized" (two spaces).
    // Use regex /Save/ to match reliably across sessions.
    const saveBtn = frame.getByRole('button', { name: /Save/ }).first();
    await saveBtn.waitFor({ state: 'visible', timeout: 15000 });
    await saveBtn.click();
    await waitForSapGuiReady(frame);
    await this.page.waitForTimeout(3000);
    logger.info('Clicked Save', 'SalesOrderPage');
  }

  // --- Document Incomplete dialog handling ---
  // Scriptless: After Save, "Document Incomplete" dialog appears with Save/Edit/Cancel
  // Flow: Edit → Incompletion Log → Select All → Complete Data → fill fields → Edit Next Data

  async isDocumentIncompleteDialogVisible() {
    const frame = await this.getFrame();
    // MCP: Dialog title is "Save Incomplete Document", body contains "Document Incomplete"
    const dialogTitle = frame.getByText('Save Incomplete Document', { exact: false });
    const dialogBody = frame.getByText('Document Incomplete', { exact: false });
    const titleVisible = await dialogTitle.isVisible().catch(() => false);
    const bodyVisible = await dialogBody.isVisible().catch(() => false);
    return titleVisible || bodyVisible;
  }

  async clickDocumentIncompleteEdit() {
    const frame = await this.getFrame();
    const editBtn = frame.getByRole('button', { name: 'Edit' });
    await editBtn.waitFor({ state: 'visible', timeout: 10000 });
    await editBtn.click();
    await waitForSapGuiReady(frame);
    await this.page.waitForTimeout(2000);
    logger.info('Clicked Edit in Document Incomplete dialog', 'SalesOrderPage');
  }

  // --- Incompletion Log ---

  async clickSelectAll() {
    const frame = await this.getFrame();
    // MCP: Button label is "Select All (F5)" — use regex to match
    const selectAllBtn = frame.getByRole('button', { name: /Select All/ }).first();
    await selectAllBtn.waitFor({ state: 'visible', timeout: 10000 });
    await selectAllBtn.click();
    // MCP: All button refs change after Select All — wait before next action
    await this.page.waitForTimeout(1000);
    logger.info('Clicked Select All', 'SalesOrderPage');
  }

  async clickCompleteData() {
    const frame = await this.getFrame();
    // MCP: Must re-find Complete Data button after Select All changes refs
    const completeDataBtn = frame.getByRole('button', { name: 'Complete Data' }).first();
    await completeDataBtn.waitFor({ state: 'visible', timeout: 10000 });
    await completeDataBtn.click();
    await waitForSapGuiReady(frame);
    await this.page.waitForTimeout(2000);
    logger.info('Clicked Complete Data', 'SalesOrderPage');
  }

  // --- Weight fields (via Incompletion Log flow) ---

  async enterGrossWeight(weight) {
    const frame = await this.getFrame();
    const field = await this.frameLoc('grossWeightField');
    await field.waitFor({ state: 'visible', timeout: 15000 });
    await field.fill(weight);
    await this.page.keyboard.press('Tab');
    logger.info(`Entered Gross Weight: ${weight}`, 'SalesOrderPage');
  }

  async enterNetWeight(weight) {
    const frame = await this.getFrame();
    const field = await this.frameLoc('netWeightField');
    await field.waitFor({ state: 'visible', timeout: 15000 });
    await field.fill(weight);
    await this.page.keyboard.press('Tab');
    logger.info(`Entered Net Weight: ${weight}`, 'SalesOrderPage');
  }

  // --- Edit Next Data (navigate between incomplete fields) ---

  async clickEditNextData() {
    const frame = await this.getFrame();
    const editNextBtn = frame.getByRole('button', { name: 'Edit Next Data' }).first();
    await editNextBtn.waitFor({ state: 'visible', timeout: 10000 });
    await editNextBtn.click();
    await waitForSapGuiReady(frame);
    await this.page.waitForTimeout(3000);
    logger.info('Clicked Edit Next Data', 'SalesOrderPage');
  }

  // --- Pricing Elements grid ---
  // Scriptless: CnTy cells are readonly by default. Must use "Insert Row" to create editable row.
  // Direct click on readonly cells doesn't activate editing.

  async clickInsertRow() {
    const frame = await this.getFrame();
    const insertBtn = frame.getByRole('button', { name: 'Insert Row' }).first();
    await insertBtn.waitFor({ state: 'visible', timeout: 10000 });
    await insertBtn.click();
    await this.page.waitForTimeout(1000);
    logger.info('Clicked Insert Row in Pricing Elements grid', 'SalesOrderPage');
  }

  async enterPricingCondition(cnType, amount) {
    const frame = await this.getFrame();

    // Step 1: Insert Row — existing CnTy cells are readonly
    await this.clickInsertRow();

    // Step 2: Fill CnTy field — after Insert Row, the NEW editable CnTy is nth(1)
    // (nth(0) is the existing readonly row)
    const cnTypeInput = frame.getByRole('textbox', { name: 'CnTy' }).nth(1);
    await cnTypeInput.waitFor({ state: 'visible', timeout: 10000 });
    await cnTypeInput.fill(cnType);
    await this.page.keyboard.press('Tab');
    // MCP: Tab from CnTy creates a NEW Amount input ref — must wait then re-query
    await this.page.waitForTimeout(2000);

    // Step 3: Fill Amount — after Tab, Amount gets a new element, use nth(1)
    const amountInput = frame.getByRole('textbox', { name: 'Amount' }).nth(1);
    await amountInput.waitFor({ state: 'visible', timeout: 10000 });
    await amountInput.fill(amount);
    await this.page.keyboard.press('Enter');
    await waitForSapGuiReady(frame);
    await this.page.waitForTimeout(2000);

    logger.info(`Entered pricing condition: ${cnType} = ${amount}`, 'SalesOrderPage');
  }

  // --- Document complete verification ---

  async isDocumentComplete() {
    const frame = await this.getFrame();
    const message = frame.getByText('Document is complete', { exact: false });
    return await message.isVisible({ timeout: 5000 }).catch(() => false);
  }

  // --- Status bar message (order saved confirmation) ---

  async getStatusBarMessage() {
    const frame = await this.getFrame();
    return await getGuiStatusBarMessage(frame);
  }

  async getSalesOrderNumber() {
    const frame = await this.getFrame();
    // Scriptless: After save, message is "Standard Order XXXXXX has been saved."
    const statusMsg = await getGuiStatusBarMessage(frame);
    if (statusMsg) {
      const match = statusMsg.match(/Standard Order (\d+) has been saved/);
      if (match) {
        logger.info(`Sales Order Number: ${match[1]}`, 'SalesOrderPage');
        return match[1];
      }
    }

    // Fallback: search for the message text in the frame
    for (let attempt = 0; attempt < 5; attempt++) {
      const msgText = await frame.locator('text=/Standard Order \\d+ has been saved/').first()
        .textContent().catch(() => null);
      if (msgText) {
        const soMatch = msgText.match(/Standard Order (\d+) has been saved/);
        if (soMatch) {
          logger.info(`Sales Order Number (fallback): ${soMatch[1]}`, 'SalesOrderPage');
          return soMatch[1];
        }
      }
      await this.page.waitForTimeout(2000);
    }

    logger.warn('Sales Order Number not found in status bar', 'SalesOrderPage');
    return null;
  }

  // --- Sign out ---
  // Scriptless: Block layer (sapUiBLy) can intercept clicks during sign-out flow.
  // Must wait for block layer to clear before interacting.

  async clickUserProfile() {
    await waitForBusyAndBlockLayer(this.page);
    const btn = await this.loc('userProfileButton');
    await retryOnIntercept(this.page, () => btn.click());
    await this.page.waitForTimeout(1000);
    logger.info('Opened user profile menu', 'SalesOrderPage');
  }

  async clickSignOut() {
    const signOutText = this.page.getByText('Sign Out', { exact: true });
    const signOutVisible = await signOutText.isVisible({ timeout: 5000 }).catch(() => false);

    if (signOutVisible) {
      await signOutText.click();
      await this.page.waitForTimeout(500);
    } else {
      const btn = await this.loc('signOutButton');
      await btn.click();
      await this.page.waitForTimeout(500);
    }

    // Handle accidental UI Adaptation Mode trigger
    const adaptationDismissed = await dismissUIAdaptationMode(this.page);
    if (adaptationDismissed) {
      logger.info('Recovered from UI Adaptation Mode — retrying sign out', 'SalesOrderPage');
      await this.clickUserProfile();
      const retryBtn = this.page.getByText('Sign Out', { exact: true });
      await retryBtn.click();
      await this.page.waitForTimeout(500);
    }

    logger.info('Clicked Sign Out', 'SalesOrderPage');
  }

  async confirmSignOut() {
    // Scriptless: Block layer may appear during sign-out processing. Wait for it to clear.
    await waitForBusyAndBlockLayer(this.page);
    await this.page.waitForTimeout(2000);

    const btn = await this.loc('signOutConfirmOK');
    await retryOnIntercept(this.page, () => btn.click());
    await this.page.waitForURL('**/logoff**', { timeout: 30000 }).catch(() => {});
    await this.page.waitForLoadState('domcontentloaded');
    logger.info('Confirmed Sign Out', 'SalesOrderPage');
  }
}

module.exports = { SalesOrderPage };
