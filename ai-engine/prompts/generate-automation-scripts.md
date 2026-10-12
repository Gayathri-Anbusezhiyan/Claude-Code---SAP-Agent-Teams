# Generate Complete Automation Scripts from Test Cases + Exploration Data

## Purpose
Master prompt for generating a complete Playwright POM automation suite for a SAP Fiori app in one pass. This generates all files: locators, page objects, fixtures, test specs, and test data — using test cases and exploration data as input.

## Prerequisites
- Test cases exist in `testcases/` in any supported format (`.xlsx`, `.csv`, `.docx`, `.txt`, `.md`). Non-`.md` files are auto-converted to `.md` by the universal converter (`automation/utils/testcase-converter.js`) before processing.
- Exploration data exists in `exploration-data/snapshots/<module>-<app>.json` and/or `exploration-data/selectors/<module>-<app>.selectors.json`. If exploration data is missing for a test case, the "Generate automation scripts from testcases" workflow will auto-generate it by running scriptless execution via MCP before script generation begins.
- Blueprint is available at `blueprints/POM-JavaScript-Blueprint.md`

## Input Files to Read
1. **Test cases** — First run the universal converter to ensure all files are in `.md` format:
   ```bash
   node automation/utils/testcase-converter.js
   ```
   Converted files are output to `testcases/converted/`. Then read all `.md` files from both `testcases/*.md` (manually created) and `testcases/converted/*.md` (auto-converted).
2. **Exploration snapshots**: `exploration-data/snapshots/<module>-<app>.json`
3. **Exploration selectors**: `exploration-data/selectors/<module>-<app>.selectors.json` (if available)
4. **Blueprint**: `blueprints/POM-JavaScript-Blueprint.md`
5. **Existing common pages**: `automation/pages/common/` (for import paths and helper usage)
6. **Existing utils**: `automation/utils/` (for import paths)

## Output Files to Generate

For each SAP module/app, generate these files:

### 1. Locators File
**Path**: `automation/pages/<module>/<app>/<app>.locators.js`

**CRITICAL: Follow exploration data.** Every locator must be derived from the captured exploration snapshots. Do NOT guess or invent locators.

- Read the exploration snapshot/selectors
- For each interactive element, create a locator entry with primary + fallbacks
- Use the locator strategy priority: role+name > label > sap-id(partial) > css
- Include `LocatorMetadata` with exploration date
- Add a source comment linking to the exploration data file

### 2. Page Object File
**Path**: `automation/pages/<module>/<app>/<app>.page.js`

- Import `resolveLocator` from `../../utils/locator-helper`
- Import SAP UI5 helpers from `../../utils/sap-ui5-helper`
- Import the locators from `./<app>.locators`
- Import common helpers (SapTableHelper, SapMessageHelper, SapDialogHelper) as needed
- Create a class with:
  - `loc(name)` method using `resolveLocator`
  - `goto()` method using `navigateToFioriApp`
  - Action methods matching test case steps
  - Assertion helper methods
- Every action method must include appropriate SAP waits
- Tab after fill for fields that trigger server validation

### 3. Fixtures File
**Path**: `automation/pages/<module>/<app>/<app>.fixtures.js`

- Extend Playwright `test` with a fixture providing the authenticated page object
- Handle SAP login via `SapLoginPage`
- Navigate to the target Fiori app
- Provide the page object instance to tests

### 4. Test Spec File
**Path**: `automation/tests/<module>-<app>.spec.js`

- Import fixtures from the app's fixtures file
- Import `getTestCase` from `../fixtures/test-data`
- One `test.describe` block for the app
- One `test()` block per test case, with TC ID in the title
- Load test data via `getTestCase()`
- Map test steps to page object method calls
- Assertions matching expected results from test cases
- Logger calls for test start/end

### 5. Test Data File
**Path**: `automation/test-data/<module>-<app>.data.json`

- JSON format with `feature` and `testData` keys
- One entry per TC ID containing `description`, `input`, and `expected`
- Extract test data values from the test case files
- All test input values must be in this file (not hardcoded in specs)

## Generation Workflow

```
1. Read test cases → Understand what tests to generate
2. Read exploration data → Understand what elements exist on the page
3. Read blueprint → Understand code patterns and conventions
4. Generate locators.js → Map exploration elements to locator definitions
5. Generate page.js → Create methods for each test step using locators
6. Generate fixtures.js → Set up authentication and app navigation
7. Generate spec.js → Map test cases to executable tests
8. Generate data.json → Extract test data from test cases
```

## CRITICAL RULES

1. **ALWAYS follow exploration data for locators.** Never invent SAP IDs or selectors. If exploration data is missing for an element, add a comment: `// TODO: Explore this element — no exploration data available`

2. **Use the established patterns.** Follow the code style in `automation/pages/common/` and `automation/utils/`.

3. **SAP UI5 waits are mandatory.** Every navigation uses `waitForSapPageReady()`. Every action that triggers OData calls uses `waitForBusyIndicator()`. Never use `networkidle`.

4. **Tab after fill.** SAP input fields often validate server-side on blur:
   ```javascript
   await field.fill(value);
   await this.page.keyboard.press('Tab');
   await waitForBusyIndicator(this.page);
   ```

5. **Test data in JSON files.** No hardcoded values in spec files. All test input/expected values in `test-data/<module>-<app>.data.json`.

6. **TC ID in test title.** Every `test()` block must include the TC ID for grep execution:
   ```javascript
   test('TC_MM_PO_001: Create standard purchase order', ...)
   ```

7. **Independent tests.** Each test must work standalone — no dependency on other tests.

8. **Use common helpers.** Table interactions via `SapTableHelper`, dialogs via `SapDialogHelper`, messages via `SapMessageHelper`.

## File Naming Conventions

| File | Naming Pattern | Example |
|------|---------------|---------|
| Locators | `<app>.locators.js` | `purchase-order.locators.js` |
| Page Object | `<app>.page.js` | `purchase-order.page.js` |
| Fixtures | `<app>.fixtures.js` | `purchase-order.fixtures.js` |
| Test Spec | `<module>-<app>.spec.js` | `mm-purchase-order.spec.js` |
| Test Data | `<module>-<app>.data.json` | `mm-purchase-order.data.json` |

## TC ID Convention

Format: `TC_<MODULE>_<APP>_<NUMBER>`

| Module | App Code | Example |
|--------|----------|---------|
| MM | PO (Purchase Order) | TC_MM_PO_001 |
| MM | PR (Purchase Requisition) | TC_MM_PR_001 |
| MM | GR (Goods Receipt) | TC_MM_GR_001 |
| SD | SO (Sales Order) | TC_SD_SO_001 |
| SD | BD (Billing Document) | TC_SD_BD_001 |
| FI | JE (Journal Entry) | TC_FI_JE_001 |
| FI | SI (Supplier Invoice) | TC_FI_SI_001 |
| PP | PO (Production Order) | TC_PP_PO_001 |
