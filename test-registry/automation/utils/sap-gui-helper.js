// automation/utils/sap-gui-helper.js
// Helper utilities for SAP GUI for HTML transactions embedded in iframes within Fiori shell.
// Scriptless execution of Change PO (2026-04-15) confirmed: "Change Purchase Order - Advanced"
// is a classic SAP GUI transaction (ME22N) embedded in an iframe.

const { waitForBusyIndicator, waitForBusyAndBlockLayer } = require('./sap-ui5-helper');
const { logger } = require('./logger');

/**
 * Get the SAP GUI iframe inside the Fiori shell.
 * SAP GUI for HTML apps (ME22N, ME23N, etc.) render inside an iframe.
 * @param {import('@playwright/test').Page} page
 * @param {number} timeout - Max wait time in ms
 * @returns {Promise<import('@playwright/test').Frame>} The iframe's Frame object
 */
async function getSapGuiFrame(page, timeout = 30000) {
  // SAP GUI iframes typically have these ID patterns
  const iframeSelectors = [
    'iframe[name*="container"][name*="iframe"]',
    'iframe[id*="GuiFrame"]',
    'iframe[id*="application"]',
    'iframe[id*="shellIframe"]',
    'iframe.sapUiSizeCozy',
    'iframe[src*="/sap/bc/gui/"]',
    'iframe[src*="webgui"]',
    'iframe',
  ];

  for (const selector of iframeSelectors) {
    const iframeEl = page.locator(selector).first();
    try {
      await iframeEl.waitFor({ state: 'visible', timeout: 5000 });
    } catch {
      continue;
    }

    // Prefer element handle → contentFrame (most reliable for getting the correct frame)
    const handle = await iframeEl.elementHandle().catch(() => null);
    if (handle) {
      const contentFrame = await handle.contentFrame().catch(() => null);
      if (contentFrame) {
        logger.info(`Found SAP GUI frame via element handle: ${selector}`, 'SapGuiHelper');
        // Wait for SAP GUI content to actually render inside the frame
        await contentFrame.waitForSelector('[id*="toolbar"], [title], table, button', { timeout: 30000 }).catch(() => {
          logger.info('SAP GUI frame content not fully loaded — continuing', 'SapGuiHelper');
        });
        return contentFrame;
      }
    }

    // Fallback: find non-main frame with 'sap' in URL (exclude main frame)
    const frame = page.frames().find(f => f !== page.mainFrame() && f.url().includes('sap'));
    if (frame) {
      logger.info(`Found SAP GUI frame via frame URL matching (selector: ${selector})`, 'SapGuiHelper');
      await frame.waitForSelector('[id*="toolbar"], [title], table, button', { timeout: 30000 }).catch(() => {
        logger.info('SAP GUI frame content not fully loaded — continuing', 'SapGuiHelper');
      });
      return frame;
    }
  }

  // Fallback: find any non-main frame with 'sap' in URL
  const frames = page.frames();
  const guiFrame = frames.find(f => f !== page.mainFrame() && f.url().includes('sap'));
  if (guiFrame) {
    logger.info('Found SAP GUI frame via frame URL matching (fallback)', 'SapGuiHelper');
    await guiFrame.waitForSelector('[id*="toolbar"], [title], table, button', { timeout: 30000 }).catch(() => {});
    return guiFrame;
  }

  // Last resort: wait for any iframe to appear and use its content frame
  await page.waitForSelector('iframe', { timeout });
  const iframeEl = page.locator('iframe').first();
  const handle = await iframeEl.elementHandle().catch(() => null);
  if (handle) {
    const contentFrame = await handle.contentFrame().catch(() => null);
    if (contentFrame) {
      logger.info('Found SAP GUI frame as first iframe content frame', 'SapGuiHelper');
      await contentFrame.waitForSelector('[id*="toolbar"], [title], table, button', { timeout: 30000 }).catch(() => {});
      return contentFrame;
    }
  }

  const allFrames = page.frames();
  const nonMainFrame = allFrames.find(f => f !== page.mainFrame());
  if (nonMainFrame) {
    logger.info('Found SAP GUI frame as first non-main frame', 'SapGuiHelper');
    return nonMainFrame;
  }

  throw new Error('SAP GUI iframe not found');
}

/**
 * Wait for the SAP GUI frame to be fully loaded and interactive.
 * @param {import('@playwright/test').Frame} frame
 * @param {number} timeout
 */
async function waitForSapGuiReady(frame, timeout = 30000) {
  // Two-phase busy detection:
  // Phase 1: Wait briefly for busy indicator to APPEAR (it may not exist yet if action just started)
  await frame.waitForSelector('.urBusy, .lsLoading, [id*="loading"]', { timeout: 2000 }).catch(() => {
    // Busy indicator never appeared — SAP may have already finished, or action was instant
  });

  // Phase 2: Wait for busy indicator to DISAPPEAR (the main wait)
  await frame.waitForFunction(() => {
    const busy = document.querySelector('.urBusy, .lsLoading, [id*="loading"]');
    return !busy || busy.style.display === 'none' || busy.style.visibility === 'hidden';
  }, { timeout }).catch(() => {
    logger.info('SAP GUI busy indicator still visible after timeout — continuing', 'SapGuiHelper');
  });

  // Wait for interactive content to be present
  await frame.waitForSelector('[id*="toolbar"], [title], table, button', { timeout: 10000 }).catch(() => {});
}

/**
 * Click a toolbar button in SAP GUI by its tooltip or title text.
 * Scriptless execution discovered: SAP GUI buttons use title attributes, not ARIA labels.
 * @param {import('@playwright/test').Frame} frame
 * @param {string} buttonTitle - The title/tooltip of the button (e.g., "Other Purchase Order", "Display <-> Change")
 */
async function clickGuiToolbarButton(frame, buttonTitle, timeout = 30000) {
  // First, wait for the SAP GUI iframe content to be ready
  await waitForSapGuiReady(frame).catch(() => {});

  // Strategy 1: Role-based locators (ARIA) — SAP GUI buttons may use these
  const roleLocators = [
    frame.getByRole('button', { name: buttonTitle }),
    frame.getByRole('link', { name: buttonTitle }),
    frame.getByRole('menuitem', { name: buttonTitle }),
    frame.getByTitle(buttonTitle),
  ];

  for (const loc of roleLocators) {
    try {
      await loc.first().waitFor({ state: 'visible', timeout: 5000 });
      await loc.first().click();
      logger.info(`Clicked GUI toolbar button via role/title: ${buttonTitle}`, 'SapGuiHelper');
      return;
    } catch {
      // Try next
    }
  }

  // Strategy 2: CSS selectors with title attribute
  const selectors = [
    `[title="${buttonTitle}"]`,
    `[title*="${buttonTitle}"]`,
    `button[title="${buttonTitle}"]`,
    `td[title="${buttonTitle}"]`,
    `a[title="${buttonTitle}"]`,
    `span[title="${buttonTitle}"]`,
  ];

  for (const selector of selectors) {
    const el = frame.locator(selector).first();
    try {
      await el.waitFor({ state: 'visible', timeout: 3000 });
      await el.click();
      logger.info(`Clicked GUI toolbar button via CSS: ${buttonTitle}`, 'SapGuiHelper');
      return;
    } catch {
      // Try next selector
    }
  }

  // Strategy 3: Text-based search — SAP GUI may render button text as inner content
  try {
    const textEl = frame.getByText(buttonTitle, { exact: false }).first();
    await textEl.waitFor({ state: 'visible', timeout: 5000 });
    await textEl.click();
    logger.info(`Clicked GUI toolbar button via text: ${buttonTitle}`, 'SapGuiHelper');
    return;
  } catch {
    // Continue to retry
  }

  // Retry once after waiting for iframe to fully load
  logger.info(`Toolbar button "${buttonTitle}" not found on first pass — retrying after 5s wait`, 'SapGuiHelper');
  await frame.waitForTimeout(5000);
  await waitForSapGuiReady(frame).catch(() => {});

  // Retry all strategies
  for (const loc of roleLocators) {
    const visible = await loc.first().isVisible().catch(() => false);
    if (visible) {
      await loc.first().click();
      logger.info(`Clicked GUI toolbar button via role/title (retry): ${buttonTitle}`, 'SapGuiHelper');
      return;
    }
  }

  for (const selector of selectors) {
    const el = frame.locator(selector).first();
    const visible = await el.isVisible().catch(() => false);
    if (visible) {
      await el.click();
      logger.info(`Clicked GUI toolbar button via CSS (retry): ${buttonTitle}`, 'SapGuiHelper');
      return;
    }
  }

  const textEl = frame.getByText(buttonTitle, { exact: false }).first();
  const textVisible = await textEl.isVisible().catch(() => false);
  if (textVisible) {
    await textEl.click();
    logger.info(`Clicked GUI toolbar button via text (retry): ${buttonTitle}`, 'SapGuiHelper');
    return;
  }

  throw new Error(`SAP GUI toolbar button not found: "${buttonTitle}"`);
}

/**
 * Fill a SAP GUI input field by its label text or ID pattern.
 * SAP GUI fields use different markup than Fiori — typically <input> inside <td> elements.
 * @param {import('@playwright/test').Frame} frame
 * @param {string} fieldLabel - Label text near the field (e.g., "Pur. Order", "PO Quantity")
 * @param {string} value
 */
async function fillGuiField(frame, fieldLabel, value) {
  // Strategy 1: Find by label text and navigate to adjacent input
  const labelEl = frame.getByText(fieldLabel, { exact: false }).first();
  const labelVisible = await labelEl.isVisible({ timeout: 3000 }).catch(() => false);

  if (labelVisible) {
    // SAP GUI often has input in the next sibling cell
    const input = frame.locator(`input`).filter({ has: frame.locator(`..`).filter({ hasText: fieldLabel }) }).first();
    const inputVisible = await input.isVisible({ timeout: 3000 }).catch(() => false);
    if (inputVisible) {
      await input.click();
      await input.fill(value);
      logger.info(`Filled GUI field "${fieldLabel}" with "${value}"`, 'SapGuiHelper');
      return;
    }
  }

  // Strategy 2: Find input near the label using parent traversal
  const inputs = frame.locator('input[type="text"], input:not([type])');
  const count = await inputs.count();
  for (let i = 0; i < count; i++) {
    const input = inputs.nth(i);
    const parent = await input.evaluate(el => {
      // Walk up to find if label text is nearby
      let node = el.parentElement;
      for (let j = 0; j < 5; j++) {
        if (node && node.textContent && node.textContent.includes(arguments[0])) return true;
        node = node ? node.parentElement : null;
      }
      return false;
    }, fieldLabel).catch(() => false);
    if (parent) {
      await input.click();
      await input.fill(value);
      logger.info(`Filled GUI field "${fieldLabel}" with "${value}" (parent traversal)`, 'SapGuiHelper');
      return;
    }
  }

  throw new Error(`SAP GUI field not found: "${fieldLabel}"`);
}

/**
 * Get text content from a SAP GUI message bar (status bar at the bottom).
 * After save in SAP GUI, success/error messages appear in the status bar.
 * @param {import('@playwright/test').Frame} frame
 * @returns {Promise<string|null>}
 */
async function getGuiStatusBarMessage(frame) {
  const selectors = [
    '[id*="msgArea"]',
    '[id*="statusbar"]',
    '[id*="MessageArea"]',
    '.urMsgBarTxt',
    '.lsMsgBar',
  ];

  for (const selector of selectors) {
    const el = frame.locator(selector).first();
    const isVisible = await el.isVisible({ timeout: 3000 }).catch(() => false);
    if (isVisible) {
      const text = await el.textContent();
      if (text && text.trim()) {
        return text.trim();
      }
    }
  }

  return null;
}

/**
 * Click the Save button in SAP GUI.
 * @param {import('@playwright/test').Frame} frame
 */
async function clickGuiSave(frame) {
  const selectors = [
    '[title="Save (Ctrl+S)"]',
    '[title="Save"]',
    'button[id*="save"]',
    '[id*="SAVE"]',
  ];

  for (const selector of selectors) {
    const el = frame.locator(selector).first();
    const isVisible = await el.isVisible({ timeout: 3000 }).catch(() => false);
    if (isVisible) {
      await el.click();
      logger.info('Clicked GUI Save button', 'SapGuiHelper');
      return;
    }
  }

  // Fallback: Ctrl+S keyboard shortcut
  await frame.page().keyboard.press('Control+s');
  logger.info('Triggered Save via Ctrl+S', 'SapGuiHelper');
}

/**
 * Wait for SAP GUI to finish processing after an action.
 * Combines iframe busy indicator + page-level busy indicator.
 * @param {import('@playwright/test').Frame} frame
 * @param {import('@playwright/test').Page} page
 * @param {number} timeout
 */
async function waitForGuiReady(frame, page, timeout = 30000) {
  await waitForSapGuiReady(frame, timeout);
  await waitForBusyAndBlockLayer(page, 10000).catch(() => {});
}

module.exports = {
  getSapGuiFrame,
  waitForSapGuiReady,
  clickGuiToolbarButton,
  fillGuiField,
  getGuiStatusBarMessage,
  clickGuiSave,
  waitForGuiReady,
};
