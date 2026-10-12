// automation/pages/mm/purchase-order-change/purchase-order-change.page.js
// Page Object for SAP "Change Purchase Order - Advanced" (ME22N) — SAP GUI in iframe
// Based on scriptless execution reports 2026-04-15T11-12-00 and 2026-04-16T06-00-00

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
  clickGuiToolbarButton,
  getGuiStatusBarMessage,
  waitForGuiReady,
} = require('../../../utils/sap-gui-helper');
const { PurchaseOrderChangeLocators } = require('./purchase-order-change.locators');
const { logger } = require('../../../utils/logger');

class PurchaseOrderChangePage {
  constructor(page) {
    this.page = page;
    this.guiFrame = null;
  }

  async loc(name) {
    return await resolveLocator(this.page, PurchaseOrderChangeLocators[name]);
  }

  // --- Session check ---

  async ensureSessionAlive() {
    const reAuthenticated = await checkSessionAlive(this.page);
    if (reAuthenticated) {
      logger.info('Session expired — re-authenticated successfully', 'PurchaseOrderChangePage');
    }
  }

  // --- Dismiss ALL popups (Guided Tour, Introduction, What's New) ---
  // Scriptless 2026-04-15 discovered: Guided Tour "Start Guided Tour" dialog appeared and
  // was dismissed via "Leave Tour" button.

  async dismissAllKnownPopups() {
    await dismissAllPopups(this.page);
    logger.info('Dismissed all known popups', 'PurchaseOrderChangePage');
  }

  // --- Launchpad search ---

  async openSearch() {
    const searchField = this.page.getByRole('searchbox', { name: 'Search' });
    const isSearchVisible = await searchField.isVisible().catch(() => false);

    if (!isSearchVisible) {
      // SAP Fiori uses "Focus Search" in this environment — check it first to avoid delay
      const focusBtn = this.page.getByRole('button', { name: 'Focus Search' });
      const openBtn = this.page.getByRole('button', { name: 'Open Search' });

      logger.info('Waiting for search button...', 'PurchaseOrderChangePage');
      await Promise.race([
        focusBtn.waitFor({ state: 'visible', timeout: 15000 }).then(() => 'focus'),
        openBtn.waitFor({ state: 'visible', timeout: 15000 }).then(() => 'open'),
      ]).then(async (winner) => {
        if (winner === 'focus') {
          await focusBtn.click();
          logger.info('Clicked Focus Search button', 'PurchaseOrderChangePage');
        } else {
          await openBtn.click();
          logger.info('Clicked Open Search button', 'PurchaseOrderChangePage');
        }
      }).catch(async () => {
        const focusVisible = await focusBtn.isVisible().catch(() => false);
        if (focusVisible) {
          await focusBtn.click();
          logger.info('Clicked Focus Search button (fallback)', 'PurchaseOrderChangePage');
        }
      });

      await searchField.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {
        logger.info('Searchbox not visible after search button click — continuing', 'PurchaseOrderChangePage');
      });
    }
    logger.info('Search field ready', 'PurchaseOrderChangePage');
  }

  async searchAndOpenApp(appName) {
    await this.openSearch();
    const searchField = this.page.getByRole('searchbox', { name: 'Search' });
    await searchField.waitFor({ state: 'visible', timeout: 30000 });
    await searchField.click();
    await searchField.fill(appName);
    await this.page.keyboard.press('Enter');
    await waitForBusyIndicator(this.page);
    logger.info(`Searched for app: ${appName}`, 'PurchaseOrderChangePage');
  }

  async clickSearchResult(resultText) {
    const link = this.page.getByRole('link', { name: resultText });
    const row = this.page.getByRole('row', { name: resultText });
    const textEl = this.page.getByText(resultText, { exact: false });

    const linkVisible = await link.first().isVisible({ timeout: 5000 }).catch(() => false);
    if (linkVisible) {
      await link.first().click();
    } else {
      const rowVisible = await row.first().isVisible({ timeout: 3000 }).catch(() => false);
      if (rowVisible) {
        await row.first().click();
      } else {
        await textEl.first().click();
      }
    }

    await waitForSapPageReady(this.page);
    // Wait for SAP GUI iframe to fully load — ME22N takes longer than Fiori apps
    await this.page.waitForTimeout(5000);
    logger.info(`Clicked search result: ${resultText}`, 'PurchaseOrderChangePage');
  }

  // --- SAP GUI iframe operations ---

  async getFrame() {
    if (!this.guiFrame) {
      this.guiFrame = await getSapGuiFrame(this.page);
    }
    return this.guiFrame;
  }

  // Scriptless discovered: "Other Purchase Order" is a toolbar BUTTON that opens a
  // "Select Document" modal dialog — NOT a tab.
  async clickOtherPurchaseOrder() {
    const frame = await this.getFrame();
    await clickGuiToolbarButton(frame, 'Other Purchase Order');
    await this.page.waitForTimeout(1000);
    logger.info('Clicked "Other Purchase Order" button', 'PurchaseOrderChangePage');
  }

  async enterPurchaseOrderNumber(poNumber) {
    const frame = await this.getFrame();

    // Wait for the Select Document dialog to fully appear
    await frame.getByText('Select Document').waitFor({ state: 'visible', timeout: 10000 }).catch(() => {
      logger.info('Select Document dialog text not found — continuing with input search', 'PurchaseOrderChangePage');
    });

    // Strategy 1: Find input near "Pur. Order" label text (the label is text, not input title)
    const purOrderLabel = frame.getByText('Pur. Order', { exact: false });
    const labelVisible = await purOrderLabel.first().isVisible().catch(() => false);
    if (labelVisible) {
      // The input is a sibling or nearby element — find editable input near the label
      const nearbyInput = frame.locator('input:not([readonly]):not([aria-readonly="true"])').first();
      const inputVisible = await nearbyInput.isVisible().catch(() => false);
      if (inputVisible) {
        // Check if this input is enabled
        const isDisabled = await nearbyInput.evaluate(el => el.disabled || el.readOnly).catch(() => true);
        if (!isDisabled) {
          await nearbyInput.click();
          await nearbyInput.fill('');
          await nearbyInput.fill(poNumber);
          logger.info(`Entered PO number near label: ${poNumber}`, 'PurchaseOrderChangePage');
          return;
        }
      }
    }

    // Strategy 2: CSS selectors with title attribute
    const selectors = [
      'input[title*="Pur. Order"]',
      'input[id*="PurchaseOrder"]',
      'input[id*="purOrder"]',
      'input[title*="Purchase Order"]',
    ];

    for (const selector of selectors) {
      const field = frame.locator(selector).first();
      try {
        await field.waitFor({ state: 'visible', timeout: 3000 });
        await field.click();
        await field.fill('');
        await field.fill(poNumber);
        logger.info(`Entered PO number: ${poNumber}`, 'PurchaseOrderChangePage');
        return;
      } catch {
        // Try next selector
      }
    }

    // Strategy 3: Role-based — find textbox in the dialog
    const textbox = frame.getByRole('textbox').first();
    try {
      await textbox.waitFor({ state: 'visible', timeout: 3000 });
      const isReadonly = await textbox.evaluate(el => el.readOnly || el.getAttribute('aria-readonly') === 'true').catch(() => true);
      if (!isReadonly) {
        await textbox.click();
        await textbox.fill('');
        await textbox.fill(poNumber);
        logger.info(`Entered PO number (textbox role): ${poNumber}`, 'PurchaseOrderChangePage');
        return;
      }
    } catch {
      // Continue to fallback
    }

    // Fallback: find any visible ENABLED input (skip readonly/disabled)
    const inputs = frame.locator('input[type="text"], input:not([type])');
    const count = await inputs.count();
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const visible = await input.isVisible().catch(() => false);
      if (!visible) continue;
      const isDisabled = await input.evaluate(el =>
        el.disabled || el.readOnly || el.getAttribute('aria-readonly') === 'true' || el.getAttribute('aria-disabled') === 'true'
      ).catch(() => true);
      if (!isDisabled) {
        await input.click();
        await input.fill(poNumber);
        logger.info(`Entered PO number (fallback): ${poNumber}`, 'PurchaseOrderChangePage');
        return;
      }
    }

    throw new Error(`Could not find PO number input field in Select Document dialog`);
  }

  async confirmPurchaseOrderNumber() {
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(3000);
    // Wait for the PO data to load in the GUI frame
    const frame = await this.getFrame();
    await waitForSapGuiReady(frame);
    logger.info('Confirmed PO number with Enter — PO data loading', 'PurchaseOrderChangePage');
  }

  // Scriptless discovered: Display/Change button toggles edit mode.
  // After save, SAP reverts to Display mode — must click again to re-enter edit.
  // CRITICAL: The iframe reloads entirely during mode toggle — must invalidate cached frame
  // and wait for the new iframe content to be fully ready.
  async clickDisplayChange() {
    const frame = await this.getFrame();
    await clickGuiToolbarButton(frame, 'Display');

    // Invalidate cached frame — SAP reloads the iframe during Display/Change toggle
    this.guiFrame = null;

    // Wait for the iframe to reload (Fiori shows loading spinner during this)
    await this.page.waitForTimeout(5000);

    // Re-acquire the frame and wait for content to be ready
    const newFrame = await this.getFrame();
    await waitForSapGuiReady(newFrame);

    // Extra wait for SAP GUI to finish rendering the edit-mode controls
    await this.page.waitForTimeout(2000);
    logger.info('Clicked Display/Change toggle button — frame re-acquired', 'PurchaseOrderChangePage');
  }

  async editPoQuantity(quantity) {
    const frame = await this.getFrame();

    // Ensure the frame content is fully loaded before searching for quantity field
    await waitForSapGuiReady(frame);

    // SAP GUI grid cells work differently: the visible value is a DISPLAY cell.
    // Clicking it ACTIVATES an inline edit input (new DOM element).
    // Must: (1) find and click the cell, (2) re-query for the NEW input, (3) fill it.

    // Step 1: Find the quantity cell/input and click to activate edit mode
    const cellSelectors = [
      'input[title*="PO Quantity"]',
      'input[title*="PO quantity"]',
      'input[title*="Quantity"]',
      '[title*="PO Quantity"]',
      '[title*="PO quantity"]',
      '[title*="Quantity"]',
    ];

    let clicked = false;

    // Try up to 2 passes — first pass may fail if frame is still rendering
    for (let pass = 0; pass < 2 && !clicked; pass++) {
      if (pass > 0) {
        logger.info('Quantity field not found on first pass — waiting 5s and retrying', 'PurchaseOrderChangePage');
        await this.page.waitForTimeout(5000);
        // Re-acquire frame in case it was reloaded
        this.guiFrame = null;
        const freshFrame = await this.getFrame();
        await waitForSapGuiReady(freshFrame);
      }

      const currentFrame = await this.getFrame();

      for (const selector of cellSelectors) {
        const cell = currentFrame.locator(selector).first();
        try {
          await cell.waitFor({ state: 'visible', timeout: 5000 });
          await cell.click({ clickCount: 3 }); // Triple-click to select all
          clicked = true;
          logger.info(`Clicked quantity cell: ${selector}`, 'PurchaseOrderChangePage');
          break;
        } catch {
          // Try next selector
        }
      }

      if (!clicked) {
        // Fallback: try role-based
        const currentFrame2 = await this.getFrame();
        const gridcells = currentFrame2.getByRole('gridcell');
        const count = await gridcells.count();
        for (let i = 0; i < count; i++) {
          const cell = gridcells.nth(i);
          const title = await cell.getAttribute('title').catch(() => '');
          if (title && title.toLowerCase().includes('quantity')) {
            await cell.click({ clickCount: 3 });
            clicked = true;
            logger.info(`Clicked quantity gridcell at index ${i}`, 'PurchaseOrderChangePage');
            break;
          }
        }
      }
    }

    if (!clicked) {
      throw new Error('PO Quantity field not found in SAP GUI frame');
    }

    // Step 2: Wait for SAP to create the inline edit input (new DOM element)
    await this.page.waitForTimeout(500);

    // Step 3: Find the NEW activated input and fill it
    // After clicking, SAP creates/activates an input — try focused element first
    const activeInput = frame.locator('input:focus').first();
    const focusedVisible = await activeInput.isVisible().catch(() => false);
    if (focusedVisible) {
      await activeInput.fill(quantity);
      logger.info(`Edited PO Quantity to: ${quantity} (focused input)`, 'PurchaseOrderChangePage');
      return;
    }

    // Fallback: find first enabled, non-readonly input with quantity-related title
    for (const selector of cellSelectors.slice(0, 3)) {
      const input = frame.locator(selector).first();
      const visible = await input.isVisible().catch(() => false);
      if (!visible) continue;
      const isReadonly = await input.evaluate(el =>
        el.readOnly || el.getAttribute('aria-readonly') === 'true'
      ).catch(() => true);
      if (!isReadonly) {
        await input.fill(quantity);
        logger.info(`Edited PO Quantity to: ${quantity} (re-queried input)`, 'PurchaseOrderChangePage');
        return;
      }
    }

    // Last resort: type into whatever is focused
    await this.page.keyboard.type(quantity);
    logger.info(`Typed PO Quantity: ${quantity} (keyboard fallback)`, 'PurchaseOrderChangePage');
  }

  async clickSave() {
    // SAP GUI Save is Ctrl+S — the toolbar "Save As Template" button must NOT be clicked.
    await this.page.keyboard.press('Control+s');

    // Invalidate cached frame — save may reload the iframe (SAP reverts to Display mode)
    this.guiFrame = null;
    await this.page.waitForTimeout(5000);

    // Re-acquire frame and wait for content
    const newFrame = await this.getFrame();
    await waitForSapGuiReady(newFrame);
    logger.info('Triggered Save via Ctrl+S — frame re-acquired', 'PurchaseOrderChangePage');
  }

  // Scriptless discovered: After save, status bar shows:
  // "Standard PO 4500063731 changed" (success) or "No data changed" (no change)
  async getStatusBarMessage() {
    const frame = await this.getFrame();
    return await getGuiStatusBarMessage(frame);
  }

  // Scriptless discovered: After saving, SAP reverts to Display mode.
  // If further edits are needed, must click Display/Change again.
  async saveAndVerify(expectedPONumber) {
    await this.clickSave();

    const message = await this.getStatusBarMessage();
    logger.info(`Status bar message after save: ${message || '(none)'}`, 'PurchaseOrderChangePage');

    if (message && message.includes('No data changed')) {
      logger.info('No data changed — value was same as current', 'PurchaseOrderChangePage');
      return { changed: false, message };
    }

    if (message && message.includes('changed')) {
      logger.info(`PO ${expectedPONumber} changed successfully`, 'PurchaseOrderChangePage');
      return { changed: true, message };
    }

    return { changed: null, message };
  }

  // --- Sign out (in Fiori shell, NOT iframe) ---

  async clickUserProfile() {
    await waitForBusyAndBlockLayer(this.page);
    const btn = await this.loc('userProfileButton');
    await retryOnIntercept(this.page, () => btn.click());
    await this.page.waitForTimeout(1000);
    logger.info('Opened user profile menu', 'PurchaseOrderChangePage');
  }

  async clickSignOut() {
    const signOutText = this.page.getByText('Sign Out', { exact: true });
    const signOutVisible = await signOutText.isVisible({ timeout: 5000 }).catch(() => false);

    if (signOutVisible) {
      await signOutText.click();
      await this.page.waitForTimeout(500);
      logger.info('Clicked Sign Out', 'PurchaseOrderChangePage');
    } else {
      const btn = await this.loc('signOutButton');
      await btn.click();
      await this.page.waitForTimeout(500);
      logger.info('Clicked Sign Out (fallback)', 'PurchaseOrderChangePage');
    }

    const adaptationDismissed = await dismissUIAdaptationMode(this.page);
    if (adaptationDismissed) {
      logger.info('Recovered from UI Adaptation Mode — retrying sign out', 'PurchaseOrderChangePage');
      await this.clickUserProfile();
      const retryBtn = this.page.getByText('Sign Out', { exact: true });
      await retryBtn.click();
      await this.page.waitForTimeout(500);
    }
  }

  async confirmSignOut() {
    const btn = await this.loc('signOutConfirmOK');
    await retryOnIntercept(this.page, () => btn.click());
    await this.page.waitForURL('**/logoff**', { timeout: 30000 }).catch(() => {});
    await this.page.waitForLoadState('domcontentloaded');
    logger.info('Confirmed Sign Out', 'PurchaseOrderChangePage');
  }
}

module.exports = { PurchaseOrderChangePage };
