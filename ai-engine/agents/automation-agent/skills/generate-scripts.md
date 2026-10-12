# Skill: generate-scripts

## Purpose

Generate all five Playwright automation files for a story KEY from exploration data captured by `explore-and-capture`. Reads captured element refs, SAP wait behaviors, dynamic popup patterns, and error handling from `exploration-data/execution/{KEY}/`, then produces production-quality, 100% executable scripts that follow the POM blueprint exactly. Always regenerates from scratch — existing files are deleted before writing.

Output: 5 files in `test-registry/automation/` — locators.js, page.js, fixtures.js, spec.js, data.json.

---

## Pre-conditions

- `exploration-data/execution/{KEY}/{KEY}-exploration-summary.json` must exist (run `/explore-and-capture {KEY}` first)
- `testcases/AI-generated testcases/{KEY}/{KEY}-summary.json` must exist
- `testdata/{KEY}/{KEY}-testdata.json` must exist
- `blueprints/POM-JavaScript-Blueprint.md` must be readable
- `prompts/generate-automation-scripts.md` must be readable

---

## Execution Steps

### Step 1 — Load All Inputs

Load the following files:

**Exploration data:**
- `exploration-data/execution/{KEY}/{KEY}-exploration-summary.json` → module, app, TC list, issues
- `exploration-data/execution/{KEY}/{TC-ID}/{TC-ID}-execution.json` for every TC (all TCs in `executionOrder`)
- `exploration-data/selectors/{module}-{app}.selectors.json` → aggregated selector map

**Test case data:**
- `testcases/AI-generated testcases/{KEY}/{KEY}-summary.json` → TC metadata, priorities, scenario types
- `testcases/AI-generated testcases/{KEY}/testcases/{TC-ID}.md` → test steps, expected results, preconditions

**Test data:**
- `testdata/{KEY}/{KEY}-testdata.json` → resolved values and remaining placeholders
- `test-registry/automation/test-data/{module}-{app}.data.json` if it exists → previously resolved values

**Generation guides:**
- `blueprints/POM-JavaScript-Blueprint.md` → code patterns, class structure, method patterns
- `prompts/generate-automation-scripts.md` → generation rules and quality requirements

Log:
```
Inputs loaded for {KEY}:
  Exploration summary : exploration-data/execution/{KEY}/{KEY}-exploration-summary.json ✓
  TC execution records: {N} files ✓
  Selector map        : exploration-data/selectors/{module}-{app}.selectors.json ✓
  Test case summary   : {KEY}-summary.json ({N} TCs) ✓
  Blueprint           : blueprints/POM-JavaScript-Blueprint.md ✓
```

---

### Step 2 — Determine Output Paths

From the exploration summary:
- `module` → lowercase folder name (e.g., `mm`)
- `app` → kebab-case folder name (e.g., `purchase-order`)
- `appCamelCase` → camelCase class prefix (e.g., `PurchaseOrder`)

Output paths:
- Locators: `test-registry/automation/pages/{module}/{app}/{app}.locators.js`
- Page Object: `test-registry/automation/pages/{module}/{app}/{app}.page.js`
- Fixtures: `test-registry/automation/pages/{module}/{app}/{app}.fixtures.js`
- Spec: `test-registry/automation/tests/{module}-{app}.spec.js`
- Test data: `test-registry/automation/test-data/{module}-{app}.data.json`

---

### Step 3 — Delete Existing Output Files

Delete all 5 output files if they exist. **Never skip this step. Never reuse or append to existing files.**

This ensures the output always reflects the latest exploration data and blueprint patterns, not stale content from previous generations.

---

### Step 4 — Generate {app}.locators.js

**Structure:** Object literal `{AppCamelCase}Locators` with locators grouped by UI section.

**Rules:**
1. For every element in `exploration-data/selectors/{module}-{app}.selectors.json`, write one locator entry
2. Do NOT hardcode the `ref` value (e.g., `e23`) — refs change per browser session. Use the captured `strategies` array to determine reliable selectors
3. **Primary strategy selection priority** (pick the most stable):
   - `role` + exact `name` → highest stability, use when label is unique
   - `label` → stable when SAP renders the label correctly
   - CSS `[id*='stablePart']` → partial ID match, stable when SAP ID has stable substring
   - CSS structural → class-based, acceptable when unique
   - `xpath` → last resort only
4. Add at least 2 fallback strategies per locator (from captured `strategies` array)
5. Include SAP-specific options where needed:
   - `exact: true` when label text appears in composite element names (e.g., Order Quantity inside Order Price Unit Order Quantity)
   - `nth: -1` or `.last()` for table row targeting

**Section grouping with comments:**
```javascript
// ─── Shell Bar ─────────────────────────────────────────
// ─── List Page ─────────────────────────────────────────
// ─── Create / Edit Page ────────────────────────────────
//   ── General Information Section ─────────────────────
//   ── Items Section ────────────────────────────────────
// ─── Footer Actions ────────────────────────────────────
// ─── Dialogs ───────────────────────────────────────────
// ─── Sign Out ──────────────────────────────────────────
```

**Include `LocatorMetadata` object:**
```javascript
const LocatorMetadata = {
  recordedDate:    '<YYYY-MM-DD>',
  explorationFile: 'exploration-data/selectors/{module}-{app}.selectors.json',
  storyKey:        '{KEY}',
  phase3Findings:  [
    'orderQuantityField: exact:true required — label appears in composite field',
    'signOutButton: [id$="-logoutBtn"] — ID prefix is dynamic per session',
    'itemsCreateButton: hidden after first row — use Ctrl+Enter for 2nd+ items'
  ]
};
```

**Exports:**
```javascript
module.exports = { {AppCamelCase}Locators, LocatorMetadata };
```

---

### Step 5 — Generate {app}.page.js

**Structure:** Class `{AppCamelCase}Page` with a `constructor(page)` and methods grouped by category.

**Critical rules:**
- Every method resolves its locator via `resolveLocator(this.page, {AppCamelCase}Locators.{name})` — NEVER hardcode locators inside methods
- Fill methods ALWAYS press Enter after filling (SAP server-side validation on blur)
- Click methods wrap clicks in `retryOnIntercept()` (handles SAP intercept overlays)
- All navigation uses `waitForSapPageReady()` after navigation
- All button clicks use `waitForBusyIndicator()` after clicking
- All field fills use `waitForBusyIndicator()` + `waitForTimeout()` after pressing Enter

**Method categories and required methods (based on exploration data):**

```javascript
// ─── Constructor ────────────────────────────────────────
constructor(page) { this.page = page; }
async loc(name) { return await resolveLocator(this.page, Locators[name]); }

// ─── Navigation ─────────────────────────────────────────
async goto()                    // navigate to SAP_FIORI_URL
async ensureSessionAlive()      // check if session active; re-login if needed

// ─── Dynamic Popup Handling ──────────────────────────────
async dismissAllKnownPopups()   // try all known popup dismissals in sequence
async closeGuidedTourPopup()    // detect tour dialog → click "Leave Tour"

// ─── Shell Bar Search ────────────────────────────────────
async openSearch()              // click search icon
async searchAndOpenApp(appName) // type in search, press Enter, click result

// ─── List Page ───────────────────────────────────────────
async clickCreate()             // click "Create PO" button on list page
async filterByPONumber(poNumber)// enter PO number in filter input
async clickGo()                 // click Go button (exact)
async clearPONumberFilter()     // clear the filter token
async openPOForEdit(poNumber)   // filter + click Edit button in row
async verifyNoDataFound()       // assert "No data found" message visible

// ─── Create / Edit Page — Supplier ───────────────────────
async enterSupplier(supplierId) // type into supplier field
async confirmSupplier()         // press Enter + wait for auto-populate
async verifySupplierAutoPopulated(expectedName) // assert supplier name visible

// ─── Create / Edit Page — Line Items ─────────────────────
async clickItemsCreate()        // click Items Create button (1st row)
async addSecondLineItem()       // Ctrl+Enter for 2nd+ rows
async enterMaterial(materialId) // type into material field
async confirmMaterial()         // press Enter + wait for auto-populate
async enterOrderQuantity(qty)   // type into quantity field (exact locator)
async confirmOrderQuantity()    // press Tab/Enter + wait
async enterNetPrice(price)      // type into net price field
async confirmNetPrice()         // press Tab/Enter + wait
async enterPlant(plant)         // type into plant field
async confirmPlant()            // press Enter + wait

// ─── Modify Existing PO ──────────────────────────────────
async changeOrderQuantity(newQty) // clear + type new quantity + confirm

// ─── Footer Actions ──────────────────────────────────────
async clickOrder()              // click Order button (footer)

// ─── Messages Dialog ─────────────────────────────────────
async getMessagesContent()      // open messages dialog, read all messages, return array
async closeMessagesDialog()     // close the messages dialog

// ─── Discard Draft ───────────────────────────────────────
async discardDraft()            // click Discard Draft button
async confirmDiscardDraft()     // click Discard in confirm dialog

// ─── PO Result Verification ──────────────────────────────
async getPONumber()             // try URL → link href → body regex; return PO number string
async verifyPOCreationSuccess() // assert PO number appears on page; return true/false
async getPOStatus()             // read status field; return status text
async verifyPOInEditMode()      // assert draft/edit mode indicators present

// ─── Sign Out ────────────────────────────────────────────
async clickUserProfile()        // click profile button [id*='meAreaButton']
async clickSignOut()            // click Sign Out menu item [id$='-logoutBtn']
async confirmSignOut()          // click OK in sign-out confirm dialog
```

**SAP wait pattern implementations** (from exploration data — use exact timings observed):
```javascript
// After navigation
await waitForSapPageReady(this.page, 90000);

// After button click
await waitForBusyIndicator(this.page, 30000);

// After field fill + Enter (lookup fields)
await this.page.keyboard.press('Enter');
await waitForBusyIndicator(this.page, 30000);
await this.page.waitForTimeout(2000);

// For 2nd+ table row creation
await this.page.keyboard.press('Control+Enter');
await waitForBusyIndicator(this.page, 30000);
await this.page.waitForTimeout(1500);
```

**Include all dynamic popup handler logic** discovered in exploration:
- Check for guided tour on every `goto()` call
- `dismissAllKnownPopups()` called in fixtures `beforeEach`

**Exports:**
```javascript
module.exports = { {AppCamelCase}Page };
```

---

### Step 6 — Generate {app}.fixtures.js

**Structure:** Playwright fixture extending `base` test with the page class.

```javascript
const { test: base, expect } = require('@playwright/test');
const { {AppCamelCase}Page } = require('./{app}.page');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../../../.env') });

const test = base.extend({
  {appCamelCase}Page: async ({ page }, use) => {
    const {appCamelCase}Page = new {AppCamelCase}Page(page);
    await {appCamelCase}Page.goto();
    await {appCamelCase}Page.dismissAllKnownPopups();
    await use({appCamelCase}Page);
  },
});

module.exports = { test, expect };
```

---

### Step 7 — Generate {module}-{app}.spec.js

**Structure:** One `test.describe` per story key, one `test()` per TC.

**Rules:**
- TC ID **must** appear in the test title string: `'TC-CS-001 (HP)   Create Standard PO — single line item'`
- Load test data via `getTestCase(feature, tcId)` — never hardcode values
- All assertions use exact patterns from `observedMessages` in exploration records
- Include shared helper functions for repeated navigation patterns:
  - `openCreateForm(page)` — navigate to app + click Create
  - `discardAndSignOut(page)` — discard draft + sign out
  - `navigateToPOList(page)` — navigate to app list page
- `test.skip()` for TCs with `automationCandidate: 'PARTIAL'` or unresolved placeholders — include reason comment
- Each test is fully independent (no state dependency on previous tests)

**Template per test:**
```javascript
test('TC-CS-001 (HP)   Create Standard PO — single line item', async ({ {appCamelCase}Page }) => {
  const tc = getTestCase('{module}-{app}', 'TC-CS-001');
  // Step: Navigate and open Create form
  await openCreateForm({appCamelCase}Page);
  // Step: Enter supplier
  await {appCamelCase}Page.enterSupplier(tc.input.supplierId);
  await {appCamelCase}Page.confirmSupplier();
  // ... all test steps mapped to page methods ...
  // Assert
  const created = await {appCamelCase}Page.verifyPOCreationSuccess();
  expect(created).toBe(true);
  // Teardown
  await {appCamelCase}Page.clickUserProfile();
  await {appCamelCase}Page.clickSignOut();
  await {appCamelCase}Page.confirmSignOut();
});
```

**For skipped TCs:**
```javascript
test.skip('TC-CS-003 (NEG)  Invalid Supplier — non-existent ID', async () => {
  // SKIPPED: {{SUPPLIER_ID_INVALID}} placeholder not resolved in testdata
  // To enable: set supplierId to a non-existent SAP supplier ID in testdata/CS-2/CS-2-testdata.json
});
```

---

### Step 8 — Generate {module}-{app}.data.json

**Structure:** JSON object with `testData` keyed by TC ID.

**Rules:**
- Start from `testdata/{KEY}/{KEY}-testdata.json` resolved values
- Layer in `test-registry/automation/test-data/{module}-{app}.data.json` values if that file existed before deletion
- Add `expected` values from exploration `observedMessages` (exact message patterns, status strings)
- Add `phase3Verification` for TCs that were executed in exploration (PASS/FAIL status + PO number if created)
- For unresolved placeholders: set value to `null` and add to `unresolvedPlaceholders` array
- Add `sourceStories`, `generatedAt`, `generatedBy` metadata fields

```json
{
  "feature": "{module}-{app}",
  "sourceStories": ["{KEY}"],
  "sourceTestdata": ["testdata/{KEY}/{KEY}-testdata.json"],
  "generatedAt": "<ISO date>",
  "generatedBy": "automation-agent/skills/generate-scripts",
  "explorationSummary": "exploration-data/execution/{KEY}/{KEY}-exploration-summary.json",
  "testData": {
    "TC-CS-001": {
      "description": "Create Standard PO — single line item",
      "scenarioType": "HAPPY_PATH",
      "input": {
        "appName": "Manage Purchase Orders",
        "supplierId": "17300002",
        "materialId": "RMPI001",
        "quantity": "10",
        "price": "0.08",
        "plant": "1710"
      },
      "expected": {
        "poNumberPattern": "^\\d{10}$",
        "status": "Sent",
        "supplierName": "Carbon Tec Inc.",
        "materialDescription": "Input 1 (WATER)",
        "successMessagePattern": "Purchase Order \\d{10}",
        "signOutRedirectUrl": "logoff"
      },
      "phase3Verification": {
        "status": "PASS",
        "poNumber": "4500065467"
      }
    }
  }
}
```

---

### Step 9 — Quality Checklist Before Completing

Before writing any file, verify:

- [ ] Every locator has at least one fallback strategy
- [ ] No hardcoded element ref values (e.g., `e23`) in locators.js — only selector strings
- [ ] Every page method uses `resolveLocator()` — no inline locator strings
- [ ] Every fill method presses Enter and waits
- [ ] `dismissAllKnownPopups()` is called in fixtures `beforeEach`
- [ ] Every spec test title contains the TC ID
- [ ] All `test.skip()` entries have a reason comment
- [ ] Test data JSON has no undefined values — null for unresolved placeholders
- [ ] `getPONumber()` uses three-tier extraction (URL → link → regex)
- [ ] Sign Out uses `[id$='-logoutBtn']` CSS suffix selector

---

### Step 10 — Write Completion Report

Print:
```
Scripts generated for {KEY} ({module}-{app}):
  test-registry/automation/pages/{module}/{app}/{app}.locators.js   — {N} locators across {M} sections
  test-registry/automation/pages/{module}/{app}/{app}.page.js       — {N} methods
  test-registry/automation/pages/{module}/{app}/{app}.fixtures.js   — fixture with beforeEach login + popup dismiss
  test-registry/automation/tests/{module}-{app}.spec.js             — {N} tests ({X} active, {Y} skipped)
  automation/test-data/{module}-{app}.data.json       — {N} test datasets

Skipped TCs : {list} — reason: unresolved placeholders
To run      : npm run test:{module-prefix}
To run one  : npx playwright test --config=automation/config/playwright.config.js --grep "TC-CS-001"
```

---

## Error Handling

| Condition | Action |
|-----------|--------|
| Exploration summary not found | Abort: "Run /explore-and-capture {KEY} first. exploration-data/execution/{KEY}/{KEY}-exploration-summary.json not found." |
| TC execution record missing for a TC | Use TC .md + testdata JSON as fallback for that TC's locators; add note in LocatorMetadata phase3Findings |
| Blueprint file missing | Abort: "blueprints/POM-JavaScript-Blueprint.md not found. Cannot generate scripts." |
| Selector has no usable strategy | Use best available; add `// TODO: refine locator — no reliable strategy captured` comment |
| All TCs were skipped in exploration | Abort: "No exploration data available — all TCs were skipped. Resolve placeholders in testdata/{KEY}/" |
| Module or app name cannot be determined | Default to `mm` and `purchase-order`; log warning |
