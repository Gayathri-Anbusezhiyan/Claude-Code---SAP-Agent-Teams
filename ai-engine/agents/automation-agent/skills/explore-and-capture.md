# Skill: explore-and-capture

## Purpose

Execute all test cases for a given Jira story KEY using the Playwright MCP server against the live SAP S/4HANA Cloud system. At every step, capture accessibility snapshots, real element refs, dynamic popup patterns, error message refs, auto-populated field values, and SAP wait behaviors. Store structured execution records per TC and aggregate discovered selectors into a selector map. This data is the sole input to the `generate-scripts` skill — no exploration data means no reliable scripts.

Output: `exploration-data/execution/{KEY}/` — per-TC execution JSONs, step snapshots, extracted locators, story-level summary.

---

## Pre-conditions

- `testcases/AI-generated testcases/{KEY}/{KEY}-summary.json` must exist (run `/generate-testcases {KEY}` first)
- `testdata/{KEY}/{KEY}-testdata.json` must exist
- Playwright MCP server must be running and connected
- `.env` must contain `SAP_FIORI_URL`, `SAP_USERNAME`, `SAP_PASSWORD`

---

## Execution Steps

### Step 1 — Load Inputs

Load the following files:

1. `testcases/AI-generated testcases/{KEY}/{KEY}-summary.json` → Extract `executionOrder` array (or all TC IDs sorted by priority)
2. `testdata/{KEY}/{KEY}-testdata.json` → Resolved test data values per TC
3. `.env` → Read `SAP_FIORI_URL`, `SAP_USERNAME`, `SAP_PASSWORD`
4. `test-registry/automation/test-data/{module}-{app}.data.json` if it exists → Use resolved `input` values per TC

Log:
```
Inputs loaded:
  Story KEY        : {KEY}
  Test Cases       : {N} TCs to execute ({executionOrder})
  Test Data        : testdata/{KEY}/{KEY}-testdata.json ✓
  SAP_FIORI_URL    : {value} ✓
```

**Skip TCs** where the test data still has unresolved `{{PLACEHOLDER}}` values in mandatory fields (supplierId, materialId, quantity, price). Log as `SKIPPED` in the summary.

---

### Step 2 — For Each TC: Login to SAP

For each TC in `executionOrder`:

1. `browser_navigate` to `SAP_FIORI_URL`
2. `browser_snapshot` → capture full accessibility tree
3. Record login page elements:
   - Find email/username input → capture `ref`, `role`, CSS selector
   - Find Continue/Next button → capture `ref`, `role`, text
4. `browser_type` username into email field
5. `browser_click` Continue button
6. `browser_snapshot` → capture password page
7. Record password page elements:
   - Find password input → capture `ref`
   - Find Continue/Sign In button → capture `ref`
8. `browser_type` password
9. `browser_click` Continue/Sign In
10. `browser_snapshot` after login → check for:
    - **Guided Tour / Welcome Tour dialog**: detect `role=dialog` with "Tour", "Guide", or "Introduction" in title or content
      - If found: `browser_click` "Leave Tour" or "Skip" or "Close" button → log as `dynamicDecision`
      - Capture: dialog ref, button ref, button text used to dismiss
    - **Any other unexpected popup**: capture and attempt dismiss via Escape key first, then Cancel button

Write step data to `exploration-data/execution/{KEY}/{TC-ID}/steps/step-01-login.json`:
```json
{
  "step": 1,
  "description": "Login to SAP Fiori",
  "actions": ["browser_navigate", "browser_type", "browser_click"],
  "capturedElements": [
    { "name": "usernameInput", "role": "textbox", "label": "Email or User Name", "ref": "e5",
      "strategies": [
        { "strategy": "css", "value": "input[type='email']", "confidence": "HIGH" },
        { "strategy": "role", "value": "textbox", "name": "Email or User Name", "confidence": "HIGH" }
      ]},
    { "name": "continueButton", "role": "button", "label": "Continue", "ref": "e8",
      "strategies": [
        { "strategy": "role", "value": "button", "name": "Continue", "confidence": "HIGH" },
        { "strategy": "css", "value": "button[type='submit']", "confidence": "MEDIUM" }
      ]}
  ],
  "dynamicDecisions": [],
  "result": "PASS"
}
```

---

### Step 3 — Navigate to App via Shell Search

1. `browser_snapshot` → find shell search button (top-right)
2. `browser_click` search icon — capture `ref` and selector used
3. `browser_snapshot` → search input should now be visible
4. Find search input element → capture `ref`, `role`, `aria-label`
5. `browser_type` app name (e.g., "Manage Purchase Orders")
6. `browser_press_key` Enter
7. `browser_snapshot` → wait for search results
8. Find search result matching app name → capture `ref`
9. `browser_click` search result
10. `browser_snapshot` → confirm app loaded (page title or breadcrumb)
11. Capture `appTitle` ref and text

Write step data to `steps/step-02-navigate.json`

---

### Step 4 — Execute Each TC Step

Read the `| Step | Action | Test Data | Expected Result |` table from `testcases/AI-generated testcases/{KEY}/testcases/{TC-ID}.md`.

For **each test step** in the table:

**Before the step:**
- `browser_snapshot` → extract ALL visible interactive elements from accessibility tree
- Record elements: name, role, label, ref, all viable locator strategies

**Perform the action** using the appropriate MCP tool:
- Navigate to URL → `browser_navigate`
- Type text into field → `browser_type` (followed by `browser_press_key` Enter if lookup field)
- Click button/link → `browser_click`
- Select dropdown → `browser_select_option`
- Press keyboard shortcut → `browser_press_key` (e.g., "Control+Enter", "Tab", "Escape")
- Handle browser dialog → `browser_handle_dialog`
- Wait for element → `browser_wait_for`

**After the step:**
- `browser_snapshot` → detect changes: new elements, popups, state changes
- Compare with before-snapshot to identify:
  - **New dialogs/popups**: capture dialog ref, content, dismiss button ref
  - **Auto-populated fields**: identify fields that changed value (supplier name, material desc, UoM, currency, org data)
  - **Validation messages**: capture error/warning message text and ref
  - **Loading/busy indicators**: note if SAP busy overlay appeared
  - **State transitions**: page title changes, new sections appearing

**Capture and record for each step:**
```json
{
  "stepNumber": 5,
  "description": "Enter Supplier ID",
  "testData": "17300002",
  "action": "browser_type + browser_press_key(Enter)",
  "snapshotBefore": "steps/step-05-before.json",
  "snapshotAfter": "steps/step-05-after.json",
  "capturedElements": [
    {
      "name": "supplierField",
      "role": "textbox",
      "label": "Supplier",
      "ref": "e23",
      "strategies": [
        { "strategy": "role", "value": "textbox", "name": "Supplier", "exact": true, "confidence": "HIGH" },
        { "strategy": "css", "value": "input[id*='Supplier'][type='text']", "confidence": "HIGH" },
        { "strategy": "label", "value": "Supplier", "confidence": "MEDIUM" }
      ]
    }
  ],
  "dynamicDecisions": [],
  "autoPopulatedValues": {
    "supplierName": { "value": "Carbon Tec Inc.", "ref": "e45", "strategy": "css", "selector": "span[id*='SupplierName']" },
    "purchasingOrg": { "value": "1710", "ref": "e47" },
    "purchasingGroup": { "value": "001", "ref": "e49" },
    "companyCode": { "value": "1710", "ref": "e51" }
  },
  "errorHandling": [],
  "result": "PASS",
  "notes": "Supplier auto-populated after pressing Enter"
}
```

Write to: `exploration-data/execution/{KEY}/{TC-ID}/steps/step-{NN}-{short-description}.json`

---

### Step 5 — Capture SAP-Specific Dynamic Behaviors (Critical)

Track and record these specific SAP behaviors whenever they occur:

**After Supplier field Enter:**
- Capture auto-populated: `supplierName`, `purchasingOrg`, `purchasingGroup`, `companyCode` — ref + selector + value

**After Material field Enter:**
- Capture auto-populated: `materialDescription`, `unitOfMeasure` — ref + selector + value

**After clicking Order/Save button:**
- Check for Messages dialog (validation errors) — capture dialog ref, message list ref, close button ref
- Check for success state: PO number location — try URL, heading, link text, body regex — capture ref + text content

**On any validation error:**
- Capture: Messages button ref, dialog open button, dialog title ref, error message list ref, close button ref
- Record exact error message text

**For 2nd+ line items in Items table:**
- Note if "Create" button disappears from toolbar after first row
- Try `Ctrl+Enter` keyboard shortcut → confirm if new row created
- Record as `dynamicDecision`: condition="Items Create button hidden after row 1", action="browser_press_key Ctrl+Enter"

**On SAP busy/loading state:**
- Note if page becomes unresponsive temporarily
- Record estimated wait time before interaction was possible

**On Sign Out flow:**
- Capture: user profile button ref (note: ID is dynamic — use `[id*='meAreaButton']` or role)
- Capture: Sign Out menu item ref
- Capture: OK/Confirm button ref
- Note: sign-out button ID suffix (`-logoutBtn`) is stable despite dynamic prefix

---

### Step 6 — Handle Unexpected Situations

When an unexpected element, popup, or SAP state is encountered:

1. `browser_snapshot` to capture full current state
2. Attempt dismiss in order: Escape key → Cancel button → Close button → navigate away
3. Record as `dynamicDecision`:
   ```json
   { "condition": "Unexpected dialog appeared after clicking Order",
     "detectedBy": "snapshot comparison — new role=dialog element",
     "dismissAction": "browser_press_key Escape",
     "ref": "e99",
     "resolved": true }
   ```
4. Continue with TC execution from the next step

If TC cannot be completed after 3 recovery attempts, mark TC as `PARTIAL` and continue to next TC.

---

### Step 7 — Sign Out After Each TC

After completing each TC (whether PASS, FAIL, or PARTIAL):

1. `browser_snapshot` → locate user profile button
2. `browser_click` user profile button
3. `browser_snapshot` → locate Sign Out item
4. `browser_click` Sign Out
5. `browser_snapshot` → confirm sign-out dialog if present
6. `browser_click` OK/Confirm
7. Capture all sign-out flow refs

Record sign-out steps in `steps/step-{NN}-signout.json`

---

### Step 8 — Write TC Execution Record

After completing all steps for a TC, write the full execution record:

File: `exploration-data/execution/{KEY}/{TC-ID}/{TC-ID}-execution.json`

```json
{
  "tcId": "TC-CS-001",
  "storyKey": "CS-2",
  "module": "MM",
  "app": "purchase-order",
  "appName": "Manage Purchase Orders",
  "executedAt": "<ISO 8601 timestamp>",
  "executedBy": "automation-agent/skills/explore-and-capture",
  "status": "PASS",
  "stepCount": 28,
  "steps": [ ... ],
  "capturedSelectors": {
    "openSearchButton":     { "primary": { "strategy": "css", "value": "[title='Open Search']" }, "fallbacks": [...] },
    "searchInput":          { "primary": { "strategy": "role", "value": "searchbox", "name": "Search" }, "fallbacks": [...] },
    "createPOButton":       { "primary": { "strategy": "role", "value": "button", "name": "Create PO" }, "fallbacks": [...] },
    "supplierField":        { "primary": { "strategy": "css", "value": "input[id*='Supplier'][type='text']" }, "fallbacks": [...] },
    "materialField":        { "primary": { "strategy": "role", "value": "textbox", "name": "Material", "exact": true }, "fallbacks": [...] },
    "orderQuantityField":   { "primary": { "strategy": "role", "value": "textbox", "name": "Order Quantity", "exact": true }, "fallbacks": [...] },
    "netPriceField":        { "primary": { "strategy": "role", "value": "textbox", "name": "Net Order Price" }, "fallbacks": [...] },
    "plantField":           { "primary": { "strategy": "role", "value": "textbox", "name": "Plant" }, "fallbacks": [...] },
    "orderButton":          { "primary": { "strategy": "css", "value": "button:has-text('Order')" }, "fallbacks": [...] },
    "userProfileButton":    { "primary": { "strategy": "css", "value": "button[id*='meAreaButton']" }, "fallbacks": [...] },
    "signOutButton":        { "primary": { "strategy": "css", "value": "[id$='-logoutBtn']" }, "fallbacks": [...] }
  },
  "dynamicPopups": [
    { "condition": "Guided Tour dialog on login",
      "detection": "role=dialog with 'Tour' in content",
      "resolution": "browser_click 'Leave Tour'",
      "ref": "e12",
      "frequency": "ALWAYS_ON_FIRST_LOGIN" }
  ],
  "observedMessages": {
    "success": { "pattern": "Purchase Order \\d{10}", "ref": "e55", "location": "page body heading" },
    "zeroQuantityError": { "text": "Enter a quantity", "ref": "e60" },
    "zeroPriceError": { "text": "Net price must be greater than 0", "ref": "e61" },
    "missingSupplierError": { "text": "Enter a supplier", "ref": "e62" }
  },
  "sapAutoPopulatedValues": {
    "supplier_17300002": { "supplierName": "Carbon Tec Inc.", "purchasingOrg": "1710", "purchasingGroup": "001", "companyCode": "1710" },
    "material_RMPI001": { "materialDescription": "Input 1 (WATER)", "uom": "KG" }
  },
  "issues": []
}
```

---

### Step 9 — Extract and Write TC Locators

From `capturedSelectors` in the execution record, write a condensed locator file:

File: `exploration-data/execution/{KEY}/{TC-ID}/{TC-ID}-locators.json`

```json
{
  "tcId": "TC-CS-001",
  "storyKey": "CS-2",
  "module": "MM",
  "app": "purchase-order",
  "locators": {
    "<elementName>": {
      "primary": { "strategy": "...", "value": "...", "options": {} },
      "fallbacks": [...]
    }
  },
  "explorationNotes": [
    "orderQuantityField requires exact:true — label 'Order Quantity' appears in composite field label 'Order Price Unit Order Quantity'",
    "signOutButton uses CSS suffix [id$='-logoutBtn'] — dynamic prefix per session",
    "itemsCreateButton hidden in toolbar overflow after first row — use Ctrl+Enter for 2nd+ rows"
  ]
}
```

---

### Step 10 — Aggregate Selectors

After all TCs complete, merge all `capturedSelectors` from every TC execution record:

1. Read all `{TC-ID}-locators.json` files
2. For each selector name, keep the most reliable strategy (prefer strategies with `confidence: HIGH`)
3. Merge new selectors with existing `exploration-data/selectors/{module}-{app}.selectors.json` — only overwrite if new capture has higher confidence
4. Write updated `exploration-data/selectors/{module}-{app}.selectors.json`

---

### Step 11 — Write Story Exploration Summary

File: `exploration-data/execution/{KEY}/{KEY}-exploration-summary.json`

```json
{
  "storyKey": "CS-2",
  "module": "MM",
  "app": "purchase-order",
  "appName": "Manage Purchase Orders",
  "exploredAt": "<ISO timestamp>",
  "exploredBy": "automation-agent/skills/explore-and-capture",
  "totalTCs": 11,
  "passed": 8,
  "failed": 0,
  "partial": 1,
  "skipped": 2,
  "skippedTCs": ["TC-CS-003", "TC-CS-004"],
  "skippedReason": "Unresolved {{PLACEHOLDER}} in test data",
  "tcResults": {
    "TC-CS-001": "PASS",
    "TC-CS-002": "PASS"
  },
  "capturedSelectorCount": 22,
  "selectorsFile": "exploration-data/selectors/mm-purchase-order.selectors.json",
  "issues": []
}
```

---

### Step 12 — Report Completion

Print summary:
```
Exploration complete for {KEY}:
  Executed : {N} TCs
  Passed   : {X}
  Skipped  : {Y} (unresolved placeholders)
  Failed   : {Z}
  Selectors: {N} captured → exploration-data/selectors/mm-purchase-order.selectors.json
  Data dir : exploration-data/execution/{KEY}/

Next step: /generate-scripts {KEY}
```

---

## Error Handling

| Condition | Action |
|-----------|--------|
| TC has `{{PLACEHOLDER}}` in mandatory field | Skip TC; add to `skippedTCs` in summary with reason |
| MCP server unavailable | Abort immediately: "Playwright MCP server not available. Cannot execute exploration." |
| SAP login fails (wrong credentials) | Abort: "SAP login failed. Check SAP_USERNAME and SAP_PASSWORD in .env" |
| Browser navigation timeout | Retry once with `browser_navigate`; if still fails, mark step FAIL, continue to next TC |
| Element ref not found after snapshot | Try all known fallback strategies; if none work, log element as UNKNOWN in capturedElements, continue |
| Unexpected SAP dialog | Take snapshot, attempt Escape → Cancel → navigate away; log as dynamicDecision; continue |
| TC step fails 3 times | Mark TC as PARTIAL; record failure reason; sign out and proceed to next TC |
| TC .md file missing | Log warning: "TC-{ID}.md not found — skipping"; add to issues in summary |
| Session expired mid-execution | Re-login and re-navigate to app; retry from last successful step |
