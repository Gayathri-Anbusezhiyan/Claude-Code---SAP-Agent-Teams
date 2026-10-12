/**
 * Screenshot Helper for Step-by-Step Evidence Capture
 * Usage: await captureStep(page, 'TC-CS-001', 'Step-9-Create-PO');
 */

/**
 * Capture a screenshot with a descriptive name
 * @param {Page} page - Playwright page object
 * @param {string} tcId - Test case ID (e.g., 'TC-CS-001')
 * @param {string} stepName - Step description (e.g., 'Step-9-Create-PO')
 * @param {Object} options - Playwright screenshot options
 */
async function captureStep(page, tcId, stepName, options = {}) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const screenshotName = `${tcId}_${stepName}_${timestamp}`;

  await page.screenshot({
    path: `test-registry/automation/test-results/screenshots/${tcId}/${screenshotName}.png`,
    fullPage: true,
    ...options
  });

  // Also attach to Playwright test report
  await page.screenshot({
    fullPage: true,
    ...options
  });

  console.log(`📸 Screenshot captured: ${stepName}`);
}

/**
 * Capture screenshot of a specific element
 * @param {Locator} locator - Playwright locator
 * @param {string} tcId - Test case ID
 * @param {string} elementName - Element description
 */
async function captureElement(locator, tcId, elementName) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const screenshotName = `${tcId}_${elementName}_${timestamp}`;

  await locator.screenshot({
    path: `test-registry/automation/test-results/screenshots/${tcId}/${screenshotName}.png`
  });

  console.log(`📸 Element screenshot: ${elementName}`);
}

module.exports = {
  captureStep,
  captureElement
};
