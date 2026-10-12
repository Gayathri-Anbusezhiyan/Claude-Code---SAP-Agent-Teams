// automation/pages/common/sap-shell.page.js
// SAP Shell Bar Page Object

const { resolveLocator } = require('../../utils/locator-helper');
const { waitForSapPageReady } = require('../../utils/sap-ui5-helper');
const { SapShellLocators } = require('./sap-shell.locators');

class SapShellPage {
  constructor(page) {
    this.page = page;
  }

  async loc(name) {
    return await resolveLocator(this.page, SapShellLocators[name]);
  }

  async getAppTitle() {
    const title = await this.loc('appTitle');
    return await title.textContent();
  }

  async clickBack() {
    const backBtn = await this.loc('backButton');
    await backBtn.click();
    await waitForSapPageReady(this.page);
  }

  async isShellVisible() {
    const shell = await this.loc('shellBar');
    return await shell.isVisible({ timeout: 10000 }).catch(() => false);
  }
}

module.exports = { SapShellPage };
