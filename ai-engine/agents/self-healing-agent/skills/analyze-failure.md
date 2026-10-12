# Skill: analyze-failure

## Purpose

Parse Playwright test runner failure output, identify which test cases failed, classify each failure by error type, cross-reference against exploration data to find likely root causes, and produce a structured failure report with a clear recommendation: `SELF_HEAL` (automation script bug — fix the scripts) or `LOG_DEFECT` (SAP app bug — log a Jira defect).

Output: `self-healing/failures/{timestamp}-{TC-ID}-failure.json` per failed TC.

---

## Pre-conditions

- Playwright test runner must have produced output (either run `npm test` and capture output, or specify the results path)
- The automation script files that failed must exist in `automation/`

---

## Input Formats

This skill accepts failure data in two formats. Use whichever is available:

**Format A — File path:** Provide a path to the test results directory:
- `automation/test-results/` — skill reads the most recently modified JSON results file
- Or a specific results file path

**Format B — Pasted output:** Paste the Playwright stdout/stderr directly into the conversation. The skill parses it inline.

---

## Execution Steps

### Step 1 — Locate and Load Failure Data

**If file path provided:**
- List all files in `automation/test-results/` sorted by modification time (newest first)
- Read the most recent `*.json` results file (Playwright JSON reporter output)
- Extract all tests with status `"failed"` or `"timedOut"`

**If pasted output provided:**
- Scan the text for patterns:
  - `✗` or `FAILED` or `×` followed by a test name
  - Error message block following the test name
  - Stack trace lines (`at ...`)

**Extract per failed test:**
```
- testTitle  : full test name string (e.g., "TC-CS-001 (HP)   Create Standard PO...")
- tcId       : extracted from title (pattern: TC-[A-Z]+-\d+)
- errorMsg   : full error message text
- stackTrace : full stack trace text
- specFile   : path to .spec.js file (from stack trace or reporter)
- lineNumber  : line number of failure (from stack trace)
```

Log:
```
Failure data loaded:
  Total failed TCs : {N}
  TCs              : {list of TC IDs}
```

---

### Step 2 — For Each Failed TC: Classify Error Type

Match the `errorMsg` against these patterns (in order — first match wins):

| Error Type | Match Pattern(s) |
|------------|-----------------|
| `LOCATOR_FAILURE` | "strict mode violation", "resolved to 0 elements", "resolved to 2 elements", "resolved to N elements", "waiting for locator", "locator.click:", "locator.fill:", "locator.type:", "Element not found" |
| `TIMEOUT_ERROR` | "Timeout", "ms exceeded", "waitForSelector", "waitForNavigation", "waitForLoadState", "waitForFunction" |
| `ELEMENT_INVISIBLE` | "not visible", "element is hidden", "is not visible in the viewport", "outside of the viewport" |
| `ELEMENT_DISABLED` | "element is disabled", "not enabled", "disabled property" |
| `ASSERTION_FAILURE` | "expect(", "toBe(", "toContain(", "toEqual(", "toBeGreaterThan(", "AssertionError", "Expected:" |
| `NAVIGATION_FAILURE` | "page.goto", "net::ERR", "navigation timeout", "ERR_NAME_NOT_RESOLVED", "ERR_CONNECTION_REFUSED" |
| `UNKNOWN` | No pattern matched |

Log classified error type for each TC.

---

### Step 3 — For Each Failed TC: Locate Failing Code

From the `specFile` and `lineNumber` extracted in Step 1:

1. Read the spec file `test-registry/automation/tests/{module}-{app}.spec.js`
2. Find the line that threw the error (stack trace reference)
3. Identify which page method was called on that line (e.g., `enterSupplier`, `clickOrder`)
4. Read the corresponding page file `test-registry/automation/pages/{module}/{app}/{app}.page.js`
5. Find that method and identify which locator it uses (the `loc('{locatorName}')` call)
6. Read the locators file `test-registry/automation/pages/{module}/{app}/{app}.locators.js`
7. Find the locator definition entry and record its `primary` strategy and all `fallbacks`

Record:
```json
{
  "specFile": "automation/tests/mm-purchase-order.spec.js",
  "specLine": 87,
  "failingMethodCall": "purchaseOrderPage.enterSupplier(tc.input.supplierId)",
  "pageFile": "automation/pages/mm/purchase-order/purchase-order.page.js",
  "failingMethod": "enterSupplier",
  "locatorName": "supplierField",
  "locatorFile": "automation/pages/mm/purchase-order/purchase-order.locators.js",
  "locatorUsed": {
    "primary": { "strategy": "role", "value": "textbox", "name": "Supplier" },
    "fallbacks": [{ "strategy": "css", "value": "input[id*='Supplier']" }]
  }
}
```

---

### Step 4 — Cross-Reference with Exploration Data

1. From the story KEY (derived from TC ID: `TC-CS-001` → key `CS-2`; read `jira/index.json` to confirm), locate exploration data:
   - `exploration-data/execution/{KEY}/{TC-ID}/{TC-ID}-execution.json`
   - `exploration-data/selectors/{module}-{app}.selectors.json`

2. Find the same selector (`locatorName`) in the exploration data's `capturedSelectors`

3. Compare:
   - Script's `primary` strategy vs exploration's captured strategy
   - If they differ → probable root cause: script generated a different strategy than what exploration captured → `confidence: HIGH, recommendation: SELF_HEAL`
   - If they match → exploration confirms the same locator → possible SAP UI change → `confidence: MEDIUM, recommendation: SELF_HEAL` (try re-execution to confirm)
   - If no exploration data → cannot cross-reference → `confidence: LOW, recommendation: SELF_HEAL` (default)

4. For `ASSERTION_FAILURE`: cross-reference expected value in spec/test-data vs `observedMessages` in exploration record
   - If expected value differs from what exploration observed → test data was wrong → `recommendation: SELF_HEAL`
   - If expected value matches exploration but SAP returned something different → possible app change → `recommendation: LOG_DEFECT` (pending re-execution confirmation)

---

### Step 5 — Write Failure Report

File: `self-healing/failures/{YYYYMMDD-HHmmss}-{TC-ID}-failure.json`

```json
{
  "tcId": "TC-CS-001",
  "storyKey": "CS-2",
  "timestamp": "2026-05-18T10:30:00.000Z",
  "analysedBy": "self-healing-agent/skills/analyze-failure",
  "errorType": "LOCATOR_FAILURE",
  "failingStep": {
    "specFile": "automation/tests/mm-purchase-order.spec.js",
    "specLine": 87,
    "methodCall": "purchaseOrderPage.enterSupplier(tc.input.supplierId)",
    "method": "enterSupplier",
    "locatorName": "supplierField",
    "locatorFile": "automation/pages/mm/purchase-order/purchase-order.locators.js",
    "locatorUsed": {
      "primary": { "strategy": "role", "value": "textbox", "name": "Supplier" },
      "fallbacks": [{ "strategy": "css", "value": "input[id*='Supplier']" }]
    },
    "errorMessage": "strict mode violation: getByRole('textbox', { name: 'Supplier' }) resolved to 2 elements. See the list below... 1) <input id='...-Supplier-combobox'> 2) <input id='...-SupplierName'>",
    "stackTrace": "..."
  },
  "explorationComparison": {
    "explorationLocator": {
      "primary": { "strategy": "css", "value": "input[id*='Supplier'][type='text']" }
    },
    "match": false,
    "note": "Exploration used CSS with type selector to avoid SupplierName read-only field. Script used role (ambiguous — matches both input and read-only display)."
  },
  "recommendation": "SELF_HEAL",
  "confidence": "HIGH",
  "notes": "Role locator 'Supplier' matches 2 elements: the editable combobox and the auto-populated display field. Needs CSS with type='text' restriction or exact:true with stricter role.",
  "nextStep": "Run /re-execute-scriptless TC-CS-001 to capture working locator, then /patch-scripts TC-CS-001"
}
```

---

### Step 6 — Handle Multiple Failed TCs

If multiple TCs failed:
- Analyze each TC independently
- Write a separate failure report for each
- Check if multiple TCs share the same root locator (e.g., all fail on `supplierField`) — note in each report: `"sharedRootCause": "supplierField locator — fixing one will fix all"`
- Print consolidated summary at end

---

### Step 7 — Print Summary

```
Failure Analysis Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  TC-CS-001   LOCATOR_FAILURE    enterSupplier()         → SELF_HEAL (HIGH confidence)
  TC-CS-002   TIMEOUT_ERROR      waitForBusyIndicator()  → SELF_HEAL (MEDIUM confidence)
  TC-CS-012   ASSERTION_FAILURE  verifyPOCreationSuccess → SELF_HEAL (LOW confidence — no exploration data)

Shared root cause detected:
  TC-CS-001 and TC-CS-002 both fail on supplierField — fixing this locator may resolve both.

Reports written:
  self-healing/failures/20260518-103000-TC-CS-001-failure.json
  self-healing/failures/20260518-103000-TC-CS-002-failure.json
  self-healing/failures/20260518-103000-TC-CS-012-failure.json

Next step:
  /re-execute-scriptless TC-CS-001   (or /heal-failure TC-CS-001 for full cycle)
```

---

## Error Handling

| Condition | Action |
|-----------|--------|
| No test results found | Abort: "No test results found in automation/test-results/. Run npm test first." |
| TC ID cannot be extracted from test title | Use spec filename + line number as TC identifier; note in report |
| Spec file not found | Note in report: "Spec file not readable — cannot locate failing code"; still write failure report |
| Exploration data missing for TC | Set `explorationComparison: null`; set confidence to LOW; proceed |
| All tests passed | Abort: "All tests passed — no failures to analyze" |
| Test output format unrecognized | Ask: "Please paste the Playwright test output or specify the path to automation/test-results/" |
