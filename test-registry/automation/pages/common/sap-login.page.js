// automation/pages/common/sap-login.page.js
// SAP IDP/IAS Login Page Object
// Two-step login: email → Continue → password → Continue (via accounts.sap.com)

const { resolveLocator } = require('../../utils/locator-helper');
const { waitForSapPageReady } = require('../../utils/sap-ui5-helper');
const { SapLoginLocators } = require('./sap-login.locators');
const { logger } = require('../../utils/logger');

class SapLoginPage {
  constructor(page) {
    this.page = page;
  }

  async loc(name) {
    return await resolveLocator(this.page, SapLoginLocators[name]);
  }

  async goto() {
    const fioriUrl = process.env.SAP_FIORI_URL
      || `${process.env.SAP_BASE_URL || 'https://my426318.s4hana.cloud.sap'}/ui#Shell-home`;
    await this.page.goto(fioriUrl, { waitUntil: 'domcontentloaded' });
    logger.info('Navigated to SAP login page', 'SapLoginPage');
  }

  async enterEmail(email) {
    const field = await this.loc('emailField');
    await field.fill(email);
    logger.info('Entered email/username', 'SapLoginPage');
  }

  async clickContinue() {
    const button = await this.loc('continueButton');
    await button.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1000);
    logger.info('Clicked Continue', 'SapLoginPage');
  }

  async enterPassword(password) {
    const field = await this.loc('passwordField');
    await field.fill(password);
    logger.info('Entered password', 'SapLoginPage');
  }

  async login(username, password) {
    // Step 1: Enter email and click Continue
    await this.enterEmail(username);
    await this.clickContinue();

    // Step 2: Enter password and click Continue
    await this.enterPassword(password);
    await this.clickContinue();

    // Wait for IDP redirect back to SAP domain (URL changes from accounts.sap.com to SAP host)
    const baseUrl = process.env.SAP_BASE_URL || 'https://my426318.s4hana.cloud.sap';
    const sapHost = new URL(baseUrl).hostname;
    await this.page.waitForURL(`**${sapHost}**`, { timeout: 60000, waitUntil: 'domcontentloaded' });
    logger.info('SAP IDP login completed, redirected to SAP', 'SapLoginPage');
  }

  async getErrorMessage() {
    const errorEl = await this.loc('errorMessage');
    const isVisible = await errorEl.isVisible().catch(() => false);
    if (isVisible) {
      return await errorEl.textContent();
    }
    return null;
  }

  async isLoginPageVisible() {
    try {
      const field = await this.loc('emailField');
      return await field.isVisible({ timeout: 10000 }).catch(() => false);
    } catch {
      return false;
    }
  }
}

module.exports = { SapLoginPage };
