// automation/pages/common/sap-dialog.helper.js
// Helper for interacting with SAP UI5 dialog components (sap.m.Dialog)

const { waitForBusyIndicator } = require('../../utils/sap-ui5-helper');

class SapDialogHelper {
  constructor(page) {
    this.page = page;
  }

  /**
   * Wait for a SAP dialog to appear.
   * @param {number} timeout
   */
  async waitForDialog(timeout = 10000) {
    await this.page.locator('.sapMDialog, .sapMMessageBox').first().waitFor({ state: 'visible', timeout });
  }

  /**
   * Get the title of the currently visible dialog.
   */
  async getDialogTitle() {
    const title = this.page.locator('.sapMDialog .sapMDialogTitle, .sapMMessageBox .sapMDialogTitle').first();
    return await title.textContent();
  }

  /**
   * Get the content text of the currently visible dialog.
   */
  async getDialogContent() {
    const content = this.page.locator('.sapMDialog .sapMDialogSection, .sapMMessageBox .sapMMsgBoxText').first();
    return await content.textContent();
  }

  /**
   * Click a button in the dialog by its text.
   * @param {string} buttonText - e.g., 'OK', 'Cancel', 'Yes', 'No', 'Save', 'Delete'
   */
  async clickDialogButton(buttonText) {
    const button = this.page.locator('.sapMDialog .sapMBtn, .sapMMessageBox .sapMBtn')
      .filter({ hasText: buttonText }).first();
    await button.click();
    await waitForBusyIndicator(this.page);
  }

  /**
   * Close dialog via the close button (X icon).
   */
  async closeDialog() {
    const closeBtn = this.page.locator('.sapMDialog .sapMDialogCloseButton').first();
    const isVisible = await closeBtn.isVisible().catch(() => false);
    if (isVisible) {
      await closeBtn.click();
    }
  }

  /**
   * Check if a dialog is currently visible.
   */
  async isDialogVisible() {
    return await this.page.locator('.sapMDialog, .sapMMessageBox').first().isVisible().catch(() => false);
  }

  /**
   * Handle a confirmation dialog (click OK/Yes).
   */
  async confirmDialog() {
    await this.waitForDialog();
    // Try OK first, then Yes
    const okBtn = this.page.locator('.sapMDialog .sapMBtn, .sapMMessageBox .sapMBtn')
      .filter({ hasText: /^(OK|Yes|Confirm)$/ }).first();
    await okBtn.click();
    await waitForBusyIndicator(this.page);
  }

  /**
   * Dismiss a dialog (click Cancel/No).
   */
  async dismissDialog() {
    await this.waitForDialog();
    const cancelBtn = this.page.locator('.sapMDialog .sapMBtn, .sapMMessageBox .sapMBtn')
      .filter({ hasText: /^(Cancel|No|Close)$/ }).first();
    await cancelBtn.click();
  }
}

module.exports = { SapDialogHelper };
