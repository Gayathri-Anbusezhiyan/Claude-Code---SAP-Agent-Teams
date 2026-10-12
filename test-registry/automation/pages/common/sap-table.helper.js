// automation/pages/common/sap-table.helper.js
// Helper for interacting with SAP UI5 table components (sap.m.Table, sap.ui.table.Table)

const { waitForTableLoad } = require('../../utils/sap-ui5-helper');

class SapTableHelper {
  constructor(page, tableLocator) {
    this.page = page;
    this.tableLocator = tableLocator;
  }

  /**
   * Wait for table to finish loading.
   */
  async waitForLoad(timeout = 30000) {
    if (typeof this.tableLocator === 'string') {
      await waitForTableLoad(this.page, this.tableLocator, timeout);
    }
  }

  /**
   * Get the number of visible rows in the table.
   */
  async getRowCount() {
    const rows = this.page.locator(`${this.tableLocator} tr.sapMListTblRow, ${this.tableLocator} tr.sapUiTableRow`);
    return await rows.count();
  }

  /**
   * Get cell text by row index and column index.
   * @param {number} rowIndex - 0-based row index
   * @param {number} colIndex - 0-based column index
   */
  async getCellText(rowIndex, colIndex) {
    const cell = this.page.locator(
      `${this.tableLocator} tr.sapMListTblRow:nth-child(${rowIndex + 1}) td:nth-child(${colIndex + 1}), ` +
      `${this.tableLocator} tr.sapUiTableRow:nth-child(${rowIndex + 1}) td:nth-child(${colIndex + 1})`
    ).first();
    return await cell.textContent();
  }

  /**
   * Click on a row by index.
   * @param {number} rowIndex - 0-based row index
   */
  async clickRow(rowIndex) {
    const row = this.page.locator(
      `${this.tableLocator} tr.sapMListTblRow:nth-child(${rowIndex + 1}), ` +
      `${this.tableLocator} tr.sapUiTableRow:nth-child(${rowIndex + 1})`
    ).first();
    await row.click();
  }

  /**
   * Select a row checkbox by index.
   * @param {number} rowIndex - 0-based row index
   */
  async selectRow(rowIndex) {
    const checkbox = this.page.locator(
      `${this.tableLocator} tr:nth-child(${rowIndex + 1}) .sapMCb, ` +
      `${this.tableLocator} tr:nth-child(${rowIndex + 1}) .sapUiTableSelBtm`
    ).first();
    await checkbox.click();
  }

  /**
   * Find a row containing specific text and click it.
   * @param {string} text - Text to search for in any column
   */
  async clickRowByText(text) {
    const row = this.page.locator(
      `${this.tableLocator} tr.sapMListTblRow, ${this.tableLocator} tr.sapUiTableRow`
    ).filter({ hasText: text }).first();
    await row.click();
  }

  /**
   * Sort table by clicking a column header.
   * @param {string} columnHeaderText
   */
  async sortByColumn(columnHeaderText) {
    const header = this.page.locator(`${this.tableLocator} th, ${this.tableLocator} .sapUiTableCol`)
      .filter({ hasText: columnHeaderText }).first();
    await header.click();
  }
}

module.exports = { SapTableHelper };
