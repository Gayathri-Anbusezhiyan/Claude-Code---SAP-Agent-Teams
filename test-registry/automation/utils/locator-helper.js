// automation/utils/locator-helper.js
// SAP UI5-aware locator resolution with multi-strategy fallback

/**
 * Build a Playwright locator from a locator definition.
 * Supports standard web strategies plus SAP UI5-specific strategies.
 *
 * @param {import('@playwright/test').Page} page
 * @param {object} locatorDef - { strategy, value, name?, partialMatch? }
 * @returns {import('@playwright/test').Locator}
 */
function buildPlaywrightLocator(page, locatorDef) {
  const { strategy, value, name, partialMatch } = locatorDef;

  switch (strategy) {
    // --- Standard strategies ---
    case 'id':
      return page.locator(`#${value}`);

    case 'role': {
      const roleOpts = {};
      if (name) roleOpts.name = name;
      if (locatorDef.exact !== undefined) roleOpts.exact = locatorDef.exact;
      return page.getByRole(value, Object.keys(roleOpts).length > 0 ? roleOpts : undefined);
    }

    case 'text':
      return page.getByText(value, { exact: true });

    case 'label':
      return page.getByLabel(value, { exact: locatorDef.exact !== undefined ? locatorDef.exact : true });

    case 'placeholder':
      return page.getByPlaceholder(value);

    case 'css':
      return page.locator(value);

    case 'xpath':
      return page.locator(`xpath=${value}`);

    case 'data-testid':
      return page.locator(`[data-testid="${value}"]`);

    // --- SAP UI5-specific strategies ---
    case 'sap-id':
      // SAP generates IDs like __xmlview0--fieldName
      // Use partial match to handle dynamic view prefixes
      if (partialMatch) {
        return page.locator(`[id*="${value}"]`);
      }
      return page.locator(`#${value}`);

    case 'data-sap-ui':
      // SAP UI5 data attribute selectors
      return page.locator(`[data-sap-ui="${value}"]`);

    case 'sap-icon':
      // SAP icon URI matching (e.g., sap-icon://save, sap-icon://add)
      return page.locator(`[data-sap-ui-icon-content], [src*="${value}"]`)
        .or(page.locator(`span.sapUiIcon[data-sap-ui-icon-content]`).filter({
          has: page.locator(`[style*="SAP-icons"]`)
        }));

    case 'aria-describedby':
      // SAP UI5 uses ARIA extensively
      return page.locator(`[aria-describedby*="${value}"]`);

    case 'custom':
      // Custom locator strategies for complex SAP patterns
      if (value === 'toolbar-scoped') {
        // Scoped button inside a named toolbar (e.g., Items toolbar Create button)
        const { toolbarName, buttonLabel } = locatorDef;
        return page.getByRole('toolbar', { name: toolbarName, exact: true }).getByLabel(buttonLabel);
      }
      throw new Error(`Unknown custom locator value: ${value}`);

    default:
      throw new Error(`Unknown locator strategy: ${strategy}`);
  }
}

/**
 * Resolve a locator definition (with primary + fallbacks) to a working Playwright locator.
 * Tries primary strategy first, then each fallback in order.
 *
 * @param {import('@playwright/test').Page} page
 * @param {object} locatorConfig - { primary: {...}, fallbacks: [{...}, ...] }
 * @returns {Promise<import('@playwright/test').Locator>}
 */
async function resolveLocator(page, locatorConfig) {
  const { primary, fallbacks = [] } = locatorConfig;

  // Try primary locator first
  const primaryLocator = buildPlaywrightLocator(page, primary);
  try {
    const count = await primaryLocator.count();
    if (count > 0) {
      return primaryLocator;
    }
  } catch (e) {
    // Primary failed, try fallbacks
  }

  // Try each fallback in order
  for (const fallback of fallbacks) {
    const fallbackLocator = buildPlaywrightLocator(page, fallback);
    try {
      const count = await fallbackLocator.count();
      if (count > 0) {
        return fallbackLocator;
      }
    } catch (e) {
      // Continue to next fallback
    }
  }

  // If nothing works, return primary (will fail with a clear error)
  return primaryLocator;
}

/**
 * Find the first working locator from a config and report which strategy succeeded.
 * Useful for debugging and self-healing.
 *
 * @param {import('@playwright/test').Page} page
 * @param {object} locatorConfig
 * @returns {Promise<{locator: Locator, strategy: string, value: string}>}
 */
async function findWorkingLocator(page, locatorConfig) {
  const { primary, fallbacks = [] } = locatorConfig;
  const allStrategies = [primary, ...fallbacks];

  for (const strategyDef of allStrategies) {
    const locator = buildPlaywrightLocator(page, strategyDef);
    try {
      const count = await locator.count();
      if (count > 0) {
        return {
          locator,
          strategy: strategyDef.strategy,
          value: strategyDef.value
        };
      }
    } catch (e) {
      continue;
    }
  }

  return {
    locator: buildPlaywrightLocator(page, primary),
    strategy: primary.strategy,
    value: primary.value
  };
}

module.exports = {
  buildPlaywrightLocator,
  resolveLocator,
  findWorkingLocator,
};
