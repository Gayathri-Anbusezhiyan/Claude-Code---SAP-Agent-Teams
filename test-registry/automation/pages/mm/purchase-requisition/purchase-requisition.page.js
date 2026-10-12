// automation/pages/mm/purchase-requisition/purchase-requisition.page.js
// Page Object for SAP Fiori Purchase Requisition apps
// Generated based on POM patterns for SAP S/4HANA Cloud

const { resolveLocator } = require('../../../utils/locator-helper');
const {
  waitForSapPageReady,
  waitForBusyIndicator,
  waitForBusyAndBlockLayer,
  navigateToFioriApp,
  retryOnIntercept,
  dismissAllPopups,
  dismissUIAdaptationMode,
  checkSessionAlive,
} = require('../../../utils/sap-ui5-helper');
const { PurchaseRequisitionLocators } = require('./purchase-requisition.locators');
const { logger } = require('../../../utils/logger');

class PurchaseRequisitionPage {
  constructor(page) {
    this.page = page;
  }

  async loc(name) {
    return await resolveLocator(this.page, PurchaseRequisitionLocators[name]);
  }

  // --- Session check ---

  async ensureSessionAlive() {
    const reAuthenticated = await checkSessionAlive(this.page);
    if (reAuthenticated) {
      logger.info('Session expired — re-authenticated successfully', 'PurchaseRequisitionPage');
    }
  }

  // --- Dismiss popups ---

  async dismissAllKnownPopups() {
    await dismissAllPopups(this.page);
    logger.info('Dismissed all known popups', 'PurchaseRequisitionPage');
  }

  async closeGuidedTourPopup() {
    await this.dismissAllKnownPopups();
  }

  // --- Launchpad search ---

  async openSearch() {
    const searchField = this.page.getByRole('searchbox', { name: 'Search' });
    const isSearchVisible = await searchField.isVisible().catch(() => false);

    if (!isSearchVisible) {
      const focusBtn = this.page.getByRole('button', { name: 'Focus Search' });
      const openBtn = this.page.getByRole('button', { name: 'Open Search' });

      logger.info('Waiting for search button...', 'PurchaseRequisitionPage');
      await Promise.race([
        focusBtn.waitFor({ state: 'visible', timeout: 15000 }).then(() => 'focus'),
        openBtn.waitFor({ state: 'visible', timeout: 15000 }).then(() => 'open'),
      ]).then(async (winner) => {
        if (winner === 'focus') {
          await focusBtn.click();
          logger.info('Clicked Focus Search button', 'PurchaseRequisitionPage');
        } else {
          await openBtn.click();
          logger.info('Clicked Open Search button', 'PurchaseRequisitionPage');
        }
      }).catch(async () => {
        const focusVisible = await focusBtn.isVisible().catch(() => false);
        if (focusVisible) {
          await focusBtn.click();
          logger.info('Clicked Focus Search button (fallback)', 'PurchaseRequisitionPage');
        }
      });

      await searchField.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {
        logger.info('Searchbox not visible after search button click — continuing', 'PurchaseRequisitionPage');
      });
    }

    logger.info('Search field ready', 'PurchaseRequisitionPage');
  }

  async searchAndOpenApp(appName) {
    await this.openSearch();
    const searchField = this.page.getByRole('searchbox', { name: 'Search' });
    await searchField.waitFor({ state: 'visible', timeout: 30000 });
    await searchField.click();
    await searchField.fill(appName);
    await this.page.keyboard.press('Enter');
    await waitForBusyIndicator(this.page);
    logger.info(`Searched for app: ${appName}`, 'PurchaseRequisitionPage');
  }

  async clickSearchResult(resultText) {
    const link = this.page.getByRole('link', { name: new RegExp(resultText, 'i') });
    const row = this.page.getByRole('row', { name: new RegExp(resultText, 'i') });
    const textEl = this.page.getByText(new RegExp(resultText, 'i'));

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
    logger.info(`Clicked search result: ${resultText}`, 'PurchaseRequisitionPage');
  }

  // --- Create PR flow ---

  async expandItemOverview() {
    // Item Overview section may be collapsed by default — click to expand
    const sectionBtn = this.page.getByRole('button', { name: /Item Overview/i });
    const isExpanded = await sectionBtn.getAttribute('aria-expanded').catch(() => 'false');

    if (isExpanded === 'false') {
      await sectionBtn.click();
      await waitForBusyIndicator(this.page);
      logger.info('Expanded Item Overview section', 'PurchaseRequisitionPage');
    } else {
      logger.info('Item Overview section already expanded', 'PurchaseRequisitionPage');
    }
  }

  async enterMaterial(material) {
    const field = await this.loc('materialField');
    await field.waitFor({ state: 'visible', timeout: 15000 });
    await field.fill(material);
    logger.info(`Entered material: ${material}`, 'PurchaseRequisitionPage');
  }

  async confirmMaterial() {
    await this.page.keyboard.press('Enter');
    await waitForBusyIndicator(this.page);
    await this.page.waitForTimeout(2000); // SAP auto-populates plant and other fields
    logger.info('Confirmed material with Enter', 'PurchaseRequisitionPage');
  }

  async selectPlant(plant) {
    // Plant may auto-populate or need manual selection
    const field = await this.loc('plantField');
    const isVisible = await field.isVisible({ timeout: 5000 }).catch(() => false);

    if (isVisible) {
      const currentValue = await field.inputValue().catch(() => '');
      if (!currentValue || currentValue.trim() === '') {
        await field.fill(plant);
        await this.page.keyboard.press('Enter');
        await waitForBusyIndicator(this.page);
        logger.info(`Selected plant: ${plant}`, 'PurchaseRequisitionPage');
      } else {
        logger.info(`Plant already populated: ${currentValue}`, 'PurchaseRequisitionPage');
      }
    } else {
      logger.info('Plant field not visible (may have auto-populated)', 'PurchaseRequisitionPage');
    }
  }

  async enterQuantity(quantity) {
    const field = await this.loc('quantityField');
    await field.waitFor({ state: 'visible', timeout: 15000 });
    await field.fill(quantity);
    logger.info(`Entered quantity: ${quantity}`, 'PurchaseRequisitionPage');
  }

  async confirmQuantity() {
    await this.page.keyboard.press('Enter');
    await waitForBusyIndicator(this.page);
    await this.page.waitForTimeout(1000);
    logger.info('Confirmed quantity with Enter', 'PurchaseRequisitionPage');
  }

  // --- Save PR ---

  async clickSave() {
    await waitForBusyAndBlockLayer(this.page);
    const btn = await this.loc('saveButton');
    await retryOnIntercept(this.page, () => btn.click());
    await waitForBusyIndicator(this.page);
    await this.page.waitForTimeout(3000); // SAP processes PR creation
    logger.info('Clicked Save button', 'PurchaseRequisitionPage');
  }

  // --- Verification ---

  async getPRNumber() {
    // Success message: "Purchase requisition number 0010006092 created" or "0010006092/0010006093 created"
    await this.page.waitForTimeout(2000); // Wait for message to appear

    // Check for success message in toast or message strip
    const messageText = await this.page.locator('.sapMMessageToast, .sapMMessageStrip').textContent({ timeout: 10000 }).catch(() => '');

    if (messageText) {
      // Extract PR number(s) from message
      const prMatch = messageText.match(/(\d{10})/);
      if (prMatch) {
        const prNumber = prMatch[1];
        logger.info(`PR Number found in message: ${prNumber}`, 'PurchaseRequisitionPage');
        return prNumber;
      }
    }

    // Fallback: Check page heading or URL
    const heading = this.page.getByRole('heading', { level: 2 });
    const headingText = await heading.textContent({ timeout: 5000 }).catch(() => '');
    const prMatch = headingText.match(/(\d{10})/);

    if (prMatch) {
      const prNumber = prMatch[1];
      logger.info(`PR Number found in heading: ${prNumber}`, 'PurchaseRequisitionPage');
      return prNumber;
    }

    logger.info(`PR Number not found. Message text: "${messageText}"`, 'PurchaseRequisitionPage');
    return null;
  }

  async getSuccessMessage() {
    await this.page.waitForTimeout(2000);
    const messageText = await this.page.locator('.sapMMessageToast, .sapMMessageStrip').textContent({ timeout: 10000 }).catch(() => '');
    logger.info(`Success message: ${messageText}`, 'PurchaseRequisitionPage');
    return messageText.trim();
  }

  // --- Display/Change PR flow ---

  async enterPRNumber(prNumber) {
    const field = await this.loc('purchaseRequisitionNumberField');
    await field.waitFor({ state: 'visible', timeout: 15000 });
    await field.fill(prNumber);
    logger.info(`Entered PR number: ${prNumber}`, 'PurchaseRequisitionPage');
  }

  async clickRun() {
    const btn = await this.loc('runButton');
    await btn.click();
    await waitForBusyIndicator(this.page);
    await this.page.waitForTimeout(2000);
    logger.info('Clicked Run button', 'PurchaseRequisitionPage');
  }

  async doubleClickItemValue() {
    // Double-click on the first row in the PR table to open details
    const firstRow = this.page.getByRole('row').nth(1); // Skip header row
    await firstRow.waitFor({ state: 'visible', timeout: 15000 });
    await firstRow.dblclick();
    await waitForSapPageReady(this.page);
    logger.info('Double-clicked item value to open PR details', 'PurchaseRequisitionPage');
  }

  async clickDisplayChangeTab() {
    const tab = await this.loc('displayChangeTab');
    await tab.click();
    await waitForBusyIndicator(this.page);
    await this.page.waitForTimeout(1000);
    logger.info('Clicked Display/Change tab', 'PurchaseRequisitionPage');
  }

  async editPRQuantity(newQuantity) {
    const field = await this.loc('prQuantityField');
    await field.waitFor({ state: 'visible', timeout: 15000 });
    await field.fill(newQuantity);
    await this.page.keyboard.press('Enter');
    await waitForBusyIndicator(this.page);
    logger.info(`Edited PR quantity to: ${newQuantity}`, 'PurchaseRequisitionPage');
  }

  async savePRChanges() {
    await this.clickSave();
    logger.info('Saved PR changes', 'PurchaseRequisitionPage');
  }

  async verifyChangeSuccessMessage(prNumber) {
    await this.page.waitForTimeout(2000);
    const messageText = await this.page.locator('.sapMMessageToast, .sapMMessageStrip').textContent({ timeout: 10000 }).catch(() => '');
    const expectedPattern = new RegExp(`Purchase requisition.*${prNumber}.*changed`, 'i');

    if (expectedPattern.test(messageText)) {
      logger.info(`PR change success message verified: ${messageText}`, 'PurchaseRequisitionPage');
      return true;
    }

    logger.info(`PR change message not as expected: "${messageText}"`, 'PurchaseRequisitionPage');
    return false;
  }

  // --- Sign out ---

  async clickUserProfile() {
    await waitForBusyAndBlockLayer(this.page);
    const btn = await this.loc('userProfileButton');
    await retryOnIntercept(this.page, () => btn.click());
    await this.page.waitForTimeout(1000);
    logger.info('Opened user profile menu', 'PurchaseRequisitionPage');
  }

  async clickSignOut() {
    const signOutText = this.page.getByText('Sign Out', { exact: true });
    const signOutVisible = await signOutText.isVisible({ timeout: 5000 }).catch(() => false);

    if (signOutVisible) {
      await signOutText.click();
      await this.page.waitForTimeout(500);
      logger.info('Clicked Sign Out', 'PurchaseRequisitionPage');
    } else {
      const btn = await this.loc('signOutButton');
      await btn.click();
      await this.page.waitForTimeout(500);
      logger.info('Clicked Sign Out (fallback)', 'PurchaseRequisitionPage');
    }

    // Handle UI Adaptation Mode recovery
    const adaptationDismissed = await dismissUIAdaptationMode(this.page);
    if (adaptationDismissed) {
      logger.info('Recovered from UI Adaptation Mode — retrying sign out', 'PurchaseRequisitionPage');
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
    logger.info('Confirmed Sign Out', 'PurchaseRequisitionPage');
  }
}

module.exports = { PurchaseRequisitionPage };
