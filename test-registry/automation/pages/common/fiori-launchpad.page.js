// automation/pages/common/fiori-launchpad.page.js
// SAP Fiori Launchpad Page Object
// Updated with real selectors from MCP exploration on 2026-04-07

const { resolveLocator } = require('../../utils/locator-helper');
const { waitForSapPageReady, navigateToFioriApp, waitForBusyIndicator } = require('../../utils/sap-ui5-helper');
const { FioriLaunchpadLocators } = require('./fiori-launchpad.locators');
const { logger } = require('../../utils/logger');

class FioriLaunchpadPage {
  constructor(page) {
    this.page = page;
  }

  async loc(name) {
    return await resolveLocator(this.page, FioriLaunchpadLocators[name]);
  }

  async goto() {
    const baseUrl = process.env.SAP_BASE_URL || 'https://my429998.s4hana.cloud.sap';
    await this.page.goto(`${baseUrl}/ui#Shell-home`, { waitUntil: 'domcontentloaded' });
    await waitForSapPageReady(this.page, 60000);
    logger.info('Fiori Launchpad loaded', 'FioriLaunchpad');
  }

  async isLaunchpadVisible() {
    const header = await this.loc('shellHeader');
    return await header.isVisible({ timeout: 10000 }).catch(() => false);
  }

  // Search is hidden by default — click "Open Search" first
  async openSearch() {
    const btn = await this.loc('openSearchButton');
    await btn.click();
    await this.page.waitForTimeout(500);
    logger.info('Clicked Open Search button', 'FioriLaunchpad');
  }

  async searchApp(appName) {
    await this.openSearch();
    const searchField = await this.loc('searchField');
    await searchField.fill(appName);
    await this.page.keyboard.press('Enter');
    await waitForBusyIndicator(this.page);
    logger.info(`Searched for app: ${appName}`, 'FioriLaunchpad');
  }

  async clickTile(tileTitle) {
    const tile = this.page.locator('.sapMGT, .sapUshellTile').filter({ hasText: tileTitle }).first();
    await tile.click();
    await waitForSapPageReady(this.page);
    logger.info(`Opened tile: ${tileTitle}`, 'FioriLaunchpad');
  }

  async navigateToApp(hashFragment) {
    await navigateToFioriApp(this.page, hashFragment);
    logger.info(`Navigated to app: ${hashFragment}`, 'FioriLaunchpad');
  }

  // Dismiss Guided Tour popup if present (shown on first login)
  async closeGuidedTourPopup() {
    try {
      const leaveBtn = await this.loc('leaveTourButton');
      const isVisible = await leaveBtn.isVisible({ timeout: 5000 }).catch(() => false);
      if (isVisible) {
        await leaveBtn.click();
        await waitForBusyIndicator(this.page);
        logger.info('Closed Guided Tour popup', 'FioriLaunchpad');
      }
    } catch (e) {
      logger.info('No Guided Tour popup found', 'FioriLaunchpad');
    }
  }

  async openUserMenu() {
    const userBtn = await this.loc('userMenuButton');
    await userBtn.click();
    await this.page.waitForTimeout(1000);
    logger.info('Opened user menu', 'FioriLaunchpad');
  }

  async signOut() {
    await this.openUserMenu();
    const signOutBtn = await this.loc('signOutButton');
    await signOutBtn.click();
    await this.page.waitForTimeout(500);

    // Confirm sign out in alertdialog
    const okBtn = await this.loc('signOutConfirmOK');
    await okBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
    logger.info('Signed out from SAP', 'FioriLaunchpad');
  }

  async clickHome() {
    const homeBtn = await this.loc('homeButton');
    await homeBtn.click();
    await waitForSapPageReady(this.page);
  }

  async clickBack() {
    const backBtn = await this.loc('backButton');
    await backBtn.click();
    await waitForSapPageReady(this.page);
  }
}

module.exports = { FioriLaunchpadPage };
