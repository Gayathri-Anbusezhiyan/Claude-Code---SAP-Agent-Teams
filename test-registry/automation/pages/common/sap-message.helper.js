// automation/pages/common/sap-message.helper.js
// Helper for interacting with SAP UI5 message components
// (MessageToast, MessageStrip, MessagePopover, MessageBox)

const { waitForMessageToast, getMessageStripText } = require('../../utils/sap-ui5-helper');

class SapMessageHelper {
  constructor(page) {
    this.page = page;
  }

  /**
   * Wait for and get the text of a MessageToast (transient success/info message).
   * @param {number} timeout
   * @returns {Promise<string>}
   */
  async getToastMessage(timeout = 10000) {
    return await waitForMessageToast(this.page, timeout);
  }

  /**
   * Get the text of a MessageStrip (persistent banner message).
   * @returns {Promise<string>}
   */
  async getStripMessage() {
    return await getMessageStripText(this.page);
  }

  /**
   * Get the type of the MessageStrip (Success, Error, Warning, Information).
   * @returns {Promise<string>}
   */
  async getStripType() {
    const strip = this.page.locator('.sapMMsgStrip').first();
    const classList = await strip.getAttribute('class');
    if (classList.includes('sapMMsgStripSuccess')) return 'Success';
    if (classList.includes('sapMMsgStripError')) return 'Error';
    if (classList.includes('sapMMsgStripWarning')) return 'Warning';
    return 'Information';
  }

  /**
   * Open the Message Popover (button with message count in footer bar).
   */
  async openMessagePopover() {
    const msgButton = this.page.locator('.sapMMessagePopoverButton, .sapMMsgBtnFill, .sapMMsgBtnIcon').first();
    await msgButton.click();
    await this.page.locator('.sapMMessagePopover').waitFor({ state: 'visible', timeout: 5000 });
  }

  /**
   * Get all messages from the Message Popover.
   * @returns {Promise<Array<{type: string, title: string, description: string}>>}
   */
  async getPopoverMessages() {
    const items = this.page.locator('.sapMMessagePopover .sapMLIBContent');
    const count = await items.count();
    const messages = [];
    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      messages.push({
        title: await item.locator('.sapMSLITitle, .sapMSLITitleOnly').textContent().catch(() => ''),
        description: await item.locator('.sapMSLIDescription').textContent().catch(() => ''),
      });
    }
    return messages;
  }

  /**
   * Close the Message Popover.
   */
  async closeMessagePopover() {
    const closeBtn = this.page.locator('.sapMMessagePopover .sapMBtnIcon').first();
    await closeBtn.click().catch(() => {});
  }

  /**
   * Check if a success message appeared (toast or strip).
   * @param {string} expectedText - Text to look for in the message
   * @returns {Promise<boolean>}
   */
  async hasSuccessMessage(expectedText) {
    // Check toast first
    try {
      const toast = await this.getToastMessage(3000);
      if (toast && toast.includes(expectedText)) return true;
    } catch (e) {}

    // Check strip
    try {
      const strip = await this.getStripMessage();
      if (strip && strip.includes(expectedText)) return true;
    } catch (e) {}

    return false;
  }
}

module.exports = { SapMessageHelper };
