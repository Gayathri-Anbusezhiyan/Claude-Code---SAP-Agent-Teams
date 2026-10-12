// automation/pages/mm/purchase-order-view/purchase-order-view.page.js
// Page Object for SAP "Display Purchase Order - Advanced" (ME23N) — SAP GUI in iframe
// Based on scriptless execution report 2026-04-16T06-00-00
// ME23N shares identical UI structure with ME22N (Change PO) — same toolbar, header, tabs, grid.

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
} = require('../../../utils/sap-gui-helper');
const { PurchaseOrderViewLocators } = require('./purchase-order-view.locators');
const { logger } = require('../../../utils/logger');

class PurchaseOrderViewPage {
  constructor(page) {
    this.page = page;
    this.guiFrame = null;
  }

  async loc(name) {
    return await resolveLocator(this.page, PurchaseOrderViewLocators[name]);
  }

  // --- Session check ---

  async ensureSessionAlive() {
    const reAuthenticated = await checkSessionAlive(this.page);
    if (reAuthenticated) {
      logger.info('Session expired — re-authenticated', 'PurchaseOrderViewPage');
    }
  }

  async dismissAllKnownPopups() {
    await dismissAllPopups(this.page);
    logger.info('Dismissed all known popups', 'PurchaseOrderViewPage');
  }

  // --- Launchpad search ---

  async openSearch() {
    const searchField = this.page.getByRole('searchbox', { name: 'Search' });
    const isSearchVisible = await searchField.isVisible().catch(() => false);

    if (!isSearchVisible) {
      // SAP Fiori uses "Focus Search" in this environment — check it first to avoid delay
      const focusBtn = this.page.getByRole('button', { name: 'Focus Search' });
      const openBtn = this.page.getByRole('button', { name: 'Open Search' });

      logger.info('Waiting for search button...', 'PurchaseOrderViewPage');
      // Race: whichever button appears first wins
      await Promise.race([
        focusBtn.waitFor({ state: 'visible', timeout: 15000 }).then(() => 'focus'),
        openBtn.waitFor({ state: 'visible', timeout: 15000 }).then(() => 'open'),
      ]).then(async (winner) => {
        if (winner === 'focus') {
          await focusBtn.click();
          logger.info('Clicked Focus Search button', 'PurchaseOrderViewPage');
        } else {
          await openBtn.click();
          logger.info('Clicked Open Search button', 'PurchaseOrderViewPage');
        }
      }).catch(async () => {
        // Neither found — try clicking whichever is visible
        const focusVisible = await focusBtn.isVisible().catch(() => false);
        if (focusVisible) {
          await focusBtn.click();
          logger.info('Clicked Focus Search button (fallback)', 'PurchaseOrderViewPage');
        }
      });

      // Wait for searchbox to appear after clicking
      await searchField.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {
        logger.info('Searchbox not visible after search button click — continuing', 'PurchaseOrderViewPage');
      });
    }
    logger.info('Search field ready', 'PurchaseOrderViewPage');
  }

  async searchAndOpenApp(appName) {
    await this.openSearch();
    const searchField = this.page.getByRole('searchbox', { name: 'Search' });
    await searchField.waitFor({ state: 'visible', timeout: 30000 });
    await searchField.click();
    await searchField.fill(appName);
    await this.page.keyboard.press('Enter');
    await waitForBusyIndicator(this.page);
    logger.info(`Searched for app: ${appName}`, 'PurchaseOrderViewPage');
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
    // Wait for SAP GUI iframe to fully load — ME23N takes longer than Fiori apps
    await this.page.waitForTimeout(5000);
    logger.info(`Clicked search result: ${resultText}`, 'PurchaseOrderViewPage');
  }

  // --- SAP GUI iframe operations ---

  async getFrame() {
    if (!this.guiFrame) {
      this.guiFrame = await getSapGuiFrame(this.page);
    }
    return this.guiFrame;
  }

  // Scriptless 2026-04-16 confirmed: "Other Purchase Order" is toolbar button opening
  // "Select Document" modal dialog — identical to ME22N
  async clickOtherPurchaseOrder() {
    const frame = await this.getFrame();
    await clickGuiToolbarButton(frame, 'Other Purchase Order');
    await this.page.waitForTimeout(1000);
    logger.info('Clicked "Other Purchase Order" button', 'PurchaseOrderViewPage');
  }

  async enterPurchaseOrderNumber(poNumber) {
    const frame = await this.getFrame();

    // Wait for the Select Document dialog to fully appear
    await frame.getByText('Select Document').waitFor({ state: 'visible', timeout: 10000 }).catch(() => {
      logger.info('Select Document dialog text not found — continuing with input search', 'PurchaseOrderViewPage');
    });

    // Strategy 1: Find input near "Pur. Order" label text (the label is text, not input title)
    const purOrderLabel = frame.getByText('Pur. Order', { exact: false });
    const labelVisible = await purOrderLabel.first().isVisible().catch(() => false);
    if (labelVisible) {
      const nearbyInput = frame.locator('input:not([readonly]):not([aria-readonly="true"])').first();
      const inputVisible = await nearbyInput.isVisible().catch(() => false);
      if (inputVisible) {
        const isDisabled = await nearbyInput.evaluate(el => el.disabled || el.readOnly).catch(() => true);
        if (!isDisabled) {
          await nearbyInput.click();
          await nearbyInput.fill('');
          await nearbyInput.fill(poNumber);
          logger.info(`Entered PO number near label: ${poNumber}`, 'PurchaseOrderViewPage');
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
        logger.info(`Entered PO number: ${poNumber}`, 'PurchaseOrderViewPage');
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
        logger.info(`Entered PO number (textbox role): ${poNumber}`, 'PurchaseOrderViewPage');
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
        logger.info(`Entered PO number (fallback): ${poNumber}`, 'PurchaseOrderViewPage');
        return;
      }
    }

    throw new Error('Could not find PO number input field in Select Document dialog');
  }

  async confirmPurchaseOrderNumber() {
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(3000);
    const frame = await this.getFrame();
    await waitForSapGuiReady(frame);
    logger.info('Confirmed PO number — PO data loading', 'PurchaseOrderViewPage');
  }

  // --- Verification methods ---
  // Scriptless 2026-04-16 confirmed: After loading PO, the Shell Bar heading updates to
  // "Standard PO 4500063731 Created by Trial 0030517 User"

  async getPOTitle() {
    // Strategy 1: Check Shell Bar heading (Fiori shell level, not inside iframe)
    const shellTitle = this.page.locator('[id*="shellAppTitle"]').first();
    const shellTitleVisible = await shellTitle.isVisible({ timeout: 3000 }).catch(() => false);
    if (shellTitleVisible) {
      const text = await shellTitle.textContent();
      if (text && text.trim() && text.includes('PO')) {
        logger.info(`PO title from shell: ${text.trim()}`, 'PurchaseOrderViewPage');
        return text.trim();
      }
    }

    // Strategy 2: Check page title (document.title)
    const pageTitle = await this.page.title();
    if (pageTitle && pageTitle.includes('PO')) {
      logger.info(`PO title from page title: ${pageTitle}`, 'PurchaseOrderViewPage');
      return pageTitle;
    }

    // Strategy 3: Check heading in the shell bar area
    const heading = this.page.getByRole('heading', { name: /Standard PO/ }).first();
    const headingVisible = await heading.isVisible({ timeout: 3000 }).catch(() => false);
    if (headingVisible) {
      const text = await heading.textContent();
      if (text && text.trim()) {
        logger.info(`PO title from heading: ${text.trim()}`, 'PurchaseOrderViewPage');
        return text.trim();
      }
    }

    // Strategy 4: Check inside iframe for title bar
    const frame = await this.getFrame();
    const iframeSelectors = [
      '[id*="titlebar"]',
      '.urTitlebarTxt',
      '[id*="header"]',
    ];
    for (const selector of iframeSelectors) {
      const el = frame.locator(selector).first();
      const isVisible = await el.isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) {
        const text = await el.textContent();
        if (text && text.trim()) {
          logger.info(`PO title from iframe: ${text.trim()}`, 'PurchaseOrderViewPage');
          return text.trim();
        }
      }
    }

    return null;
  }

  // Scriptless 2026-04-16 confirmed: Header fields visible in iframe — Order Type, Supplier, etc.
  async getHeaderFieldValue(fieldTitle) {
    const frame = await this.getFrame();
    const field = frame.locator(`input[title*="${fieldTitle}"]`).first();
    const isVisible = await field.isVisible({ timeout: 3000 }).catch(() => false);
    if (isVisible) {
      const value = await field.inputValue();
      logger.info(`Header field "${fieldTitle}": ${value}`, 'PurchaseOrderViewPage');
      return value;
    }
    return null;
  }

  async getOrderType() {
    return await this.getHeaderFieldValue('Order Type');
  }

  async getSupplier() {
    return await this.getHeaderFieldValue('Supplier');
  }

  async getDocDate() {
    return await this.getHeaderFieldValue('Doc. Date');
  }

  async getStatusBarMessage() {
    const frame = await this.getFrame();
    return await getGuiStatusBarMessage(frame);
  }

  // --- Sign out ---
  // Scriptless 2026-04-16 confirmed: Profile dialog has 8 list items,
  // Sign Out is last (ID: __list9-8-logoutBtn)

  async clickUserProfile() {
    await waitForBusyAndBlockLayer(this.page);
    const btn = await this.loc('userProfileButton');
    await retryOnIntercept(this.page, () => btn.click());
    await this.page.waitForTimeout(1000);
    logger.info('Opened user profile menu', 'PurchaseOrderViewPage');
  }

  async clickSignOut() {
    // Primary: use ID-based selector confirmed by scriptless execution
    const signOutById = this.page.locator('[id*="logoutBtn"]');
    const idVisible = await signOutById.isVisible({ timeout: 5000 }).catch(() => false);

    if (idVisible) {
      await signOutById.click();
      await this.page.waitForTimeout(500);
      logger.info('Clicked Sign Out (by ID)', 'PurchaseOrderViewPage');
    } else {
      // Fallback: text match
      const signOutText = this.page.getByText('Sign Out', { exact: true });
      const textVisible = await signOutText.isVisible({ timeout: 3000 }).catch(() => false);
      if (textVisible) {
        await signOutText.click();
        await this.page.waitForTimeout(500);
        logger.info('Clicked Sign Out (by text)', 'PurchaseOrderViewPage');
      } else {
        const btn = await this.loc('signOutButton');
        await btn.click();
        await this.page.waitForTimeout(500);
        logger.info('Clicked Sign Out (locator fallback)', 'PurchaseOrderViewPage');
      }
    }

    const adaptationDismissed = await dismissUIAdaptationMode(this.page);
    if (adaptationDismissed) {
      logger.info('Recovered from UI Adaptation Mode — retrying sign out', 'PurchaseOrderViewPage');
      await this.clickUserProfile();
      const retryBtn = this.page.locator('[id*="logoutBtn"]');
      await retryBtn.click();
      await this.page.waitForTimeout(500);
    }
  }

  async confirmSignOut() {
    const btn = await this.loc('signOutConfirmOK');
    await retryOnIntercept(this.page, () => btn.click());
    await this.page.waitForURL('**/logoff**', { timeout: 30000 }).catch(() => {});
    await this.page.waitForLoadState('domcontentloaded');
    logger.info('Confirmed Sign Out', 'PurchaseOrderViewPage');
  }
}

module.exports = { PurchaseOrderViewPage };
