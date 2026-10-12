// automation/utils/sap-ui5-helper.js
// SAP UI5-specific utilities for Playwright automation

/**
 * Wait for SAP UI5 core to be fully initialized and ready.
 * @param {import('@playwright/test').Page} page
 * @param {number} timeout - Max wait time in ms (default 30000)
 */
async function waitForUI5Ready(page, timeout = 30000) {
  await page.waitForFunction(() => {
    try {
      if (typeof sap === 'undefined' || typeof sap.ui === 'undefined') return false;
      // SAPUI5 1.x uses sap.ui.getCore(), newer versions may use sap.ui.require
      if (typeof sap.ui.getCore === 'function') {
        const core = sap.ui.getCore();
        return core && (core.isReady === true || core.isReady === undefined);
      }
      // Fallback: check if sap.ui.require is available (newer UI5)
      return typeof sap.ui.require === 'function';
    } catch (e) {
      return false;
    }
  }, { timeout });
}

/**
 * Wait for all SAP busy indicators to disappear.
 * SAP shows busy indicators during OData calls and rendering.
 * @param {import('@playwright/test').Page} page
 * @param {number} timeout - Max wait time in ms (default 30000)
 */
async function waitForBusyIndicator(page, timeout = 30000) {
  // Wait for global BusyIndicator to hide
  await page.waitForFunction(() => {
    if (typeof sap === 'undefined') return true;
    const busyIndicator = document.querySelector('.sapUiLocalBusyIndicator, .sapUiBusy, .sapMBusyIndicator');
    return !busyIndicator || busyIndicator.style.display === 'none';
  }, { timeout });

  // Also wait for any busy dialog overlays
  await page.waitForFunction(() => {
    const overlay = document.querySelector('.sapUiBLy');
    return !overlay || overlay.style.display === 'none';
  }, { timeout: 5000 }).catch(() => {});
}

/**
 * Wait for SAP MessageToast to appear and return its text.
 * @param {import('@playwright/test').Page} page
 * @param {number} timeout - Max wait time in ms (default 10000)
 * @returns {Promise<string>} The message toast text
 */
async function waitForMessageToast(page, timeout = 10000) {
  const toastLocator = page.locator('.sapMMessageToast');
  await toastLocator.waitFor({ state: 'visible', timeout });
  return await toastLocator.textContent();
}

/**
 * Get text from SAP MessageStrip component.
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<string>} The message strip text
 */
async function getMessageStripText(page) {
  const stripLocator = page.locator('.sapMMsgStrip .sapMMsgStripMessage');
  await stripLocator.waitFor({ state: 'visible', timeout: 10000 });
  return await stripLocator.textContent();
}

/**
 * Wait for a SAP table to finish loading rows.
 * @param {import('@playwright/test').Page} page
 * @param {string} tableSelector - CSS selector for the table
 * @param {number} timeout - Max wait time in ms (default 30000)
 */
async function waitForTableLoad(page, tableSelector, timeout = 30000) {
  // Wait for table to exist
  await page.waitForSelector(tableSelector, { timeout });
  // Wait for busy indicator on table to disappear
  await page.waitForFunction((selector) => {
    const table = document.querySelector(selector);
    if (!table) return false;
    const busy = table.querySelector('.sapUiLocalBusyIndicator');
    return !busy || busy.style.display === 'none';
  }, tableSelector, { timeout });
  // Wait for at least one row
  await page.waitForFunction((selector) => {
    const table = document.querySelector(selector);
    if (!table) return false;
    const rows = table.querySelectorAll('tr.sapMListTblRow, tr.sapUiTableRow');
    return rows.length > 0;
  }, tableSelector, { timeout }).catch(() => {});
}

/**
 * Navigate to a SAP Fiori app using semantic object hash navigation.
 * @param {import('@playwright/test').Page} page
 * @param {string} hashFragment - e.g., '#PurchaseOrder-manage' or '#SalesOrder-create'
 */
async function navigateToFioriApp(page, hashFragment) {
  const baseUrl = process.env.SAP_BASE_URL || 'https://my429998.s4hana.cloud.sap';
  const launchpadPath = '/ui#Shell-home';

  // If already on launchpad, navigate via hash
  const currentUrl = page.url();
  if (currentUrl.includes('/ui')) {
    await page.evaluate((hash) => {
      window.location.hash = hash;
    }, hashFragment);
  } else {
    await page.goto(`${baseUrl}/ui${hashFragment}`);
  }

  await page.waitForLoadState('domcontentloaded');
  await waitForUI5Ready(page);
  await waitForBusyIndicator(page);
}

/**
 * Dismiss all open SAP dialogs (message popover, error dialogs, etc.)
 * @param {import('@playwright/test').Page} page
 */
async function dismissAllDialogs(page) {
  // Close message popover if open
  const closeButton = page.locator('.sapMMessagePopover .sapMBtnIcon, .sapMDialog .sapMDialogCloseButton');
  const count = await closeButton.count();
  for (let i = 0; i < count; i++) {
    await closeButton.nth(i).click().catch(() => {});
  }

  // Close any open sap.m.Dialog via Close/OK button
  const dialogButtons = page.locator('.sapMDialog .sapMBtn').filter({ hasText: /^(Close|OK|Cancel)$/ });
  const dialogCount = await dialogButtons.count();
  if (dialogCount > 0) {
    await dialogButtons.first().click().catch(() => {});
  }
}

/**
 * Wait for SAP page to be fully loaded (UI5 ready + no busy indicators).
 * Use this after navigation or after triggering an action.
 * @param {import('@playwright/test').Page} page
 * @param {number} timeout
 */
async function waitForSapPageReady(page, timeout = 30000) {
  await page.waitForLoadState('domcontentloaded');
  try {
    await waitForUI5Ready(page, timeout);
  } catch (e) {
    // UI5 may not be available on non-SAP pages (e.g., IDP login redirects)
    // Continue and try waiting for busy indicator
  }
  await waitForBusyIndicator(page, timeout);
}

/**
 * Wait for both SAP busy indicator AND block layer (popup overlay) to clear.
 * Block layers appear during UI Adaptation mode, dialog rendering, and OData calls.
 * @param {import('@playwright/test').Page} page
 * @param {number} timeout
 */
async function waitForBusyAndBlockLayer(page, timeout = 30000) {
  await waitForBusyIndicator(page, timeout);

  // Wait for block layer (popup overlay used by SAP during dialogs/adaptation mode)
  await page.waitForFunction(() => {
    const blockLayer = document.querySelector('.sapUiBLy, .sap-ui-blocklayer-popup');
    return !blockLayer || blockLayer.style.display === 'none' || blockLayer.style.visibility === 'hidden';
  }, { timeout: 10000 }).catch(() => {});
}

/**
 * Dismiss all known SAP popups that appear after login or navigation:
 * - Guided Tour ("Leave Tour" button)
 * - Introduction dialog ("Close" button)
 * - What's New dialog ("Close" button)
 * @param {import('@playwright/test').Page} page
 */
async function dismissAllPopups(page) {
  const popupDismissals = [
    { name: 'Guided Tour', buttonRole: 'button', buttonName: 'Leave Tour' },
    { name: 'Introduction', buttonRole: 'button', buttonName: 'Close' },
    { name: "What's New", buttonRole: 'button', buttonName: 'Close' },
  ];

  for (const popup of popupDismissals) {
    try {
      const btn = page.getByRole(popup.buttonRole, { name: popup.buttonName, exact: true });
      const isVisible = await btn.isVisible({ timeout: 3000 }).catch(() => false);
      if (isVisible) {
        await btn.click();
        await waitForBusyIndicator(page, 5000).catch(() => {});
      }
    } catch (e) {
      // Popup not present — continue
    }
  }
}

/**
 * Dismiss UI Adaptation Mode if accidentally triggered.
 * Recovery sequence: Escape overlay → click Exit → handle reload dialogs.
 * Discovered during scriptless execution when "Adapt UI" was clicked instead of "Sign Out".
 * @param {import('@playwright/test').Page} page
 */
async function dismissUIAdaptationMode(page) {
  try {
    // Check if adaptation mode is active (tour dialog or adaptation toolbar visible)
    const tourDialog = page.getByText('Take a tour to learn about Key User Adaptation');
    const adaptToolbar = page.locator('[id*="RTA_Toolbar"], .sapUiRtaToolbar');

    const isTourVisible = await tourDialog.isVisible({ timeout: 3000 }).catch(() => false);
    const isAdaptActive = await adaptToolbar.isVisible({ timeout: 2000 }).catch(() => false);

    if (!isTourVisible && !isAdaptActive) return false;

    // Step 1: Dismiss the tour dialog if present
    if (isTourVisible) {
      // Click "No" or press Escape to skip the tour
      const noBtn = page.getByRole('button', { name: 'No' });
      const noBtnVisible = await noBtn.isVisible({ timeout: 2000 }).catch(() => false);
      if (noBtnVisible) {
        await noBtn.click();
      } else {
        await page.keyboard.press('Escape');
      }
      await page.waitForTimeout(1000);
    }

    // Step 2: Click the Exit button on the adaptation toolbar
    const exitBtn = page.getByRole('button', { name: 'Exit' });
    const exitVisible = await exitBtn.isVisible({ timeout: 5000 }).catch(() => false);
    if (exitVisible) {
      await page.keyboard.press('Escape'); // Clear any overlay first
      await page.waitForTimeout(500);
      await exitBtn.click();
      await page.waitForTimeout(2000);
    }

    // Step 3: Handle reload confirmation dialogs (SAP may ask to reload after exiting adaptation)
    for (let i = 0; i < 3; i++) {
      const okBtn = page.getByRole('button', { name: 'OK' });
      const okVisible = await okBtn.isVisible({ timeout: 3000 }).catch(() => false);
      if (okVisible) {
        await okBtn.click();
        await page.waitForTimeout(2000);
      } else {
        break;
      }
    }

    await waitForSapPageReady(page, 30000).catch(() => {});
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Retry an action if it fails due to element being intercepted by an overlay.
 * SAP busy indicators and block layers can intercept pointer events.
 * @param {import('@playwright/test').Page} page
 * @param {Function} action - Async function to retry (e.g., () => locator.click())
 * @param {number} maxRetries - Maximum retry attempts (default 3)
 * @param {number} retryDelay - Delay between retries in ms (default 2000)
 */
async function retryOnIntercept(page, action, maxRetries = 3, retryDelay = 2000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await action();
      return;
    } catch (e) {
      const isIntercept = e.message && (
        e.message.includes('intercept') ||
        e.message.includes('overlay') ||
        e.message.includes('not clickable') ||
        e.message.includes('pointer event')
      );

      if (isIntercept && attempt < maxRetries) {
        await waitForBusyAndBlockLayer(page);
        await page.waitForTimeout(retryDelay);
      } else {
        throw e;
      }
    }
  }
}

/**
 * Check if the SAP session is still alive or if the page has redirected to IDP login.
 * If redirected to IDP, re-authenticate and return true. Returns false if session is alive.
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<boolean>} true if re-authentication was performed
 */
async function checkSessionAlive(page) {
  const currentUrl = page.url();
  const isOnIDP = currentUrl.includes('accounts.ondemand.com') ||
                  currentUrl.includes('accounts.sap.com') ||
                  currentUrl.includes('/saml2/') ||
                  currentUrl.includes('/oauth2/');

  if (!isOnIDP) return false;

  // Session expired — re-authenticate
  const { SapLoginPage } = require('../pages/common/sap-login.page');
  const loginPage = new SapLoginPage(page);
  await loginPage.login(
    process.env.SAP_USERNAME,
    process.env.SAP_PASSWORD
  );
  await waitForSapPageReady(page, 60000);
  return true;
}

module.exports = {
  waitForUI5Ready,
  waitForBusyIndicator,
  waitForMessageToast,
  getMessageStripText,
  waitForTableLoad,
  navigateToFioriApp,
  dismissAllDialogs,
  waitForSapPageReady,
  waitForBusyAndBlockLayer,
  dismissAllPopups,
  dismissUIAdaptationMode,
  retryOnIntercept,
  checkSessionAlive,
};
