# Generate Page Objects from Locators + Test Cases

## Purpose
Generate Playwright Page Object Model (POM) classes for SAP Fiori apps, using locator files and test case steps to define the page methods.

## Input
- Locator file: `automation/pages/<module>/<app>/<app>.locators.js`
- Test cases: `testcases/<module>-<app>-testcases.md`
- Exploration data: `exploration-data/snapshots/<module>-<app>.json` (for workflow understanding)
- Blueprint: `blueprints/POM-JavaScript-Blueprint.md` (POM patterns)
- Common helpers: `automation/pages/common/` (table, dialog, message helpers)

## Output
- Page object: `automation/pages/<module>/<app>/<app>.page.js`
- Fixtures: `automation/pages/<module>/<app>/<app>.fixtures.js`

## Page Object Generation Rules

### 1. Class Structure

```javascript
const { resolveLocator } = require('../../../utils/locator-helper');
const { waitForSapPageReady, waitForBusyIndicator, navigateToFioriApp } = require('../../../utils/sap-ui5-helper');
const { <AppName>Locators } = require('./<app>.locators');
const { SapTableHelper } = require('../../common/sap-table.helper');
const { SapMessageHelper } = require('../../common/sap-message.helper');
const { SapDialogHelper } = require('../../common/sap-dialog.helper');
const { logger } = require('../../../utils/logger');

class <AppName>Page {
  constructor(page) {
    this.page = page;
    this.messageHelper = new SapMessageHelper(page);
    this.dialogHelper = new SapDialogHelper(page);
  }

  async loc(name) {
    return await resolveLocator(this.page, <AppName>Locators[name]);
  }

  // ... methods
}

module.exports = { <AppName>Page };
```

### 2. Method Categories

Generate methods in this order:

**Navigation methods:**
- `goto()` — Navigate to the Fiori app via hash fragment
- Use `navigateToFioriApp()` + `waitForSapPageReady()`

**Filter/Search methods:**
- Map to filter bar interactions from test cases
- Always call `waitForBusyIndicator()` after clicking Go/Search

**Form fill methods:**
- One method per logical form section (e.g., `fillHeaderData({...})`, `fillItemData({...})`)
- Accept an object parameter with optional fields
- After filling each field that triggers server validation, call `page.keyboard.press('Tab')` + `waitForBusyIndicator()`

**Action methods:**
- `clickCreate()`, `clickSave()`, `clickDelete()`, `clickPost()`, etc.
- Always call `waitForBusyIndicator()` or `waitForSapPageReady()` after clicks

**Table methods:**
- Return a `SapTableHelper` instance for the table locator
- `getItemsTable()`, `getResultsTable()`, etc.

**Assertion helper methods:**
- `getSuccessMessage()` — Uses `SapMessageHelper`
- `hasSuccessMessage(text)` — Boolean check
- `getErrorMessages()` — Gets popover messages

### 3. SAP-Specific Rules

- **Never use `networkidle`** — Always use `domcontentloaded` + UI5 waits
- **Tab after fill** — SAP validates on blur: `await page.keyboard.press('Tab'); await waitForBusyIndicator(page);`
- **Wait after every action** — SAP processes actions server-side
- **Use `resolveLocator`** — Never hardcode locators in page objects
- **Log steps** — Use `logger.info()` for key actions

### 4. Fixtures Generation

```javascript
const { test: base, expect } = require('@playwright/test');
const { <AppName>Page } = require('./<app>.page');
const { SapLoginPage } = require('../../common/sap-login.page');
const { waitForSapPageReady } = require('../../../utils/sap-ui5-helper');

const test = base.extend({
  <appName>Page: async ({ page }, use) => {
    // 1. Authenticate
    const loginPage = new SapLoginPage(page);
    await page.goto(process.env.SAP_BASE_URL + '/ui#Shell-home', { waitUntil: 'domcontentloaded' });
    const isLogin = await loginPage.isLoginPageVisible();
    if (isLogin) {
      await loginPage.login(process.env.SAP_USERNAME, process.env.SAP_PASSWORD, process.env.SAP_CLIENT);
    }
    await waitForSapPageReady(page, 60000);

    // 2. Navigate to app
    const appPage = new <AppName>Page(page);
    await appPage.goto();

    await use(appPage);
  },
});

module.exports = { test, expect };
```

### 5. Method Mapping from Test Cases

For each test step in a test case, ensure there is a corresponding page method:

| Test Step Pattern | Page Method |
|-------------------|-------------|
| "Navigate to [App]" | `goto()` |
| "Enter [value] in [field]" | `fill<Field>(value)` or `fillHeaderData({field: value})` |
| "Click [Button]" | `click<Button>()` |
| "Select [option] in [dropdown]" | `select<Field>(option)` |
| "Verify [table] shows results" | `get<Table>Table()` → `waitForLoad()` |
| "Verify success message" | `hasSuccessMessage(text)` |
| "Filter by [field]" | `filterBy<Field>(value)` |

## Quality Checks
- Every test step in the test cases has a corresponding page method
- All methods use `resolveLocator()` (no hardcoded locators)
- All action methods include appropriate waits
- Table interactions use `SapTableHelper`
- Message checks use `SapMessageHelper`
- Fixtures handle authentication and app navigation
