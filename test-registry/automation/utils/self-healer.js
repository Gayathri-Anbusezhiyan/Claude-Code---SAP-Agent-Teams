// automation/utils/self-healer.js
// Self-healing locator resolution for SAP Fiori automation

const { findWorkingLocator } = require('./locator-helper');
const { logger } = require('./logger');

/**
 * Attempt to resolve a locator with self-healing.
 * If the primary strategy fails, tries fallbacks and logs which one worked.
 *
 * @param {import('@playwright/test').Page} page
 * @param {object} locatorConfig - { primary: {...}, fallbacks: [{...}] }
 * @param {string} elementName - Human-readable name for logging
 * @returns {Promise<import('@playwright/test').Locator>}
 */
async function resolveWithHealing(page, locatorConfig, elementName) {
  const result = await findWorkingLocator(page, locatorConfig);

  if (result.strategy !== locatorConfig.primary.strategy ||
      result.value !== locatorConfig.primary.value) {
    logger.warn(
      `Self-healed "${elementName}": primary [${locatorConfig.primary.strategy}="${locatorConfig.primary.value}"] ` +
      `failed, using fallback [${result.strategy}="${result.value}"]`,
      'SelfHealer'
    );
  }

  return result.locator;
}

/**
 * Generate a healing report showing which locators needed fallbacks.
 * Useful for identifying stale exploration data that needs refreshing.
 *
 * @param {import('@playwright/test').Page} page
 * @param {object} allLocators - The full locators object for a page
 * @returns {Promise<Array<{name: string, primaryWorked: boolean, usedStrategy: string}>>}
 */
async function generateHealingReport(page, allLocators) {
  const report = [];

  for (const [name, config] of Object.entries(allLocators)) {
    const result = await findWorkingLocator(page, config);
    report.push({
      name,
      primaryWorked: result.strategy === config.primary.strategy,
      usedStrategy: result.strategy,
      usedValue: result.value,
    });
  }

  const healedCount = report.filter(r => !r.primaryWorked).length;
  if (healedCount > 0) {
    logger.warn(
      `Healing report: ${healedCount}/${report.length} locators needed fallback strategies. ` +
      `Consider re-exploring the SAP app to refresh exploration data.`,
      'SelfHealer'
    );
  }

  return report;
}

module.exports = {
  resolveWithHealing,
  generateHealingReport,
};
