# Skill: re-execute-scriptless

## Purpose

Re-execute a failing test case using the Playwright MCP server against the live SAP system to determine the ground truth. At the failing step, try multiple locator strategies in sequence to find what currently works. If SAP itself returns the wrong result (not a locator problem), capture the actual SAP behavior for defect classification. This execution is the bridge between a script failure and either a patch or a defect report.

Output: `self-healing/re-executions/{timestamp}-{TC-ID}/` — re-execution report + step snapshots.

---

## Pre-conditions

- A failure report must exist: `self-healing/failures/{timestamp}-{TC-ID}-failure.json`
- The test case file must exist: `testcases/AI-generated testcases/{KEY}/testcases/{TC-ID}.md`
- Playwright MCP server must be running and connected
- `.env` must contain `SAP_FIORI_URL`, `SAP_USERNAME`, `SAP_PASSWORD`

---

## Execution Steps

### Step 1 — Load Failure Report

Find the most recent failure report for this TC:
- List `self-healing/failures/` for files matching `*-{TC-ID}-failure.json`
- Sort by timestamp prefix (newest first)
- Read the most recent report

Extract:
- `tcId`, `storyKey`, `errorType`
- `failingStep.stepNumber` — the step number where the script failed
- `failingStep.locatorName` — the locator that failed
- `failingStep.locatorUsed` — the primary + fallbacks from the script
- `failingStep.method` — the page method that failed
- `explorationComparison.explorationLocator` — the locator from exploration data (if available)

Also load:
- `testcases/AI-generated testcases/{KEY}/testcases/{TC-ID}.md` → test steps table
- `test-registry/automation/test-data/{module}-{app}.data.json` → resolved test data for this TC (`tc.input.*`)
- `test-registry/automation/pages/{module}/{app}/{app}.locators.js` → fallback strategies for the failing locator

Log:
```
Re-execution setup:
  TC          : {TC-ID}
  Story       : {storyKey}
  Error type  : {errorType}
  Failing step: Step {N} — {method}()
  Locator     : {locatorName} — {primary strategy}
```

---

### Step 2 — Execute All Steps Up to (But Not Including) the Failing Step

Login and navigate normally — same flow as `explore-and-capture`:

1. `browser_navigate` → SAP_FIORI_URL
2. `browser_type` + `browser_click` → login (email, Continue, password, Continue)
3. `browser_snapshot` → dismiss Guided Tour if present
4. `browser_click` → search icon → type app name → Enter → click result

For each TC step **before** the failing step number:
- Execute the action normally using the most reliable known locator
- Take `browser_snapshot` after each step (save to `steps/step-{NN}-normal.json`)
- Do not perform deep element analysis — only what's needed to advance to the next step

If any pre-failure step fails:
- Try all fallback strategies for that locator
- Log recovery attempt
- If still failing, abort with: "Re-execution blocked at step {N} — cannot reach failing step. SAP navigation issue or session problem."

---

### Step 3 — Execute the Failing Step with Multiple Strategies

This is the critical step. At the failing step number:

1. `browser_snapshot` → capture full accessibility tree
2. Save snapshot to `steps/step-{NN}-failing-before.json`

**Attempt locator strategies in order:**

**Attempt 1 — Original failing locator (confirm it fails):**
- Try the exact locator from `failingStep.locatorUsed.primary`
- Record result (expect FAIL to confirm the original problem)
- If this PASSES now → note: "Locator was flaky/intermittent — passed on retry"

**Attempt 2 — Exploration locator (if different from script):**
- If `explorationComparison.explorationLocator` exists and differs from the script's primary
- Try that locator
- If PASS → this is the fix

**Attempt 3 — Script fallbacks:**
- Try each `fallbacks` entry from the locators file
- Record result for each

**Attempt 4 — Role with exact:true:**
- If original was `role` without exact, retry with `{ exact: true }`

**Attempt 5 — CSS with partial ID:**
- Build CSS selector: `input[id*='{elementNameHint}']` — use element name as hint
- Variants: `[id*='Supplier'][type='text']`, `[id*='Material']`, `[id*='Quantity']` etc.

**Attempt 6 — aria-label or title attribute:**
- Try `[aria-label*='{label}']` or `[title*='{label}']`

**Attempt 7 — Text content:**
- Try `button:has-text('{buttonText}')` or `a:has-text('{linkText}')`

For each attempt, record:
```json
{
  "attemptNumber": 1,
  "strategy": "role",
  "locator": { "strategy": "role", "value": "textbox", "name": "Supplier" },
  "result": "FAIL",
  "error": "strict mode violation: resolved to 2 elements"
}
```

**When a strategy succeeds:**
- Perform the full action (type, click, select, etc.) with the working locator
- `browser_snapshot` after action → save to `steps/step-{NN}-failing-after.json`
- Capture the `ref` of the winning element from the snapshot
- Record: `workingLocator`, `workingRef`
- Continue execution from the next step

---

### Step 4 — Continue Execution After the Failing Step

After resolving the failing step, continue executing the remaining TC steps normally:
- Execute each remaining step using best available locators
- Take snapshots at key points (especially before and after Order/Save button)
- Capture the final state (success message, PO number, error dialog, etc.)

**Check SAP behavior at the end:**

If TC expected a **success outcome** (Happy Path, Alternative Path):
- Did SAP produce the expected success indicator? (PO number, status change, confirmation message)
- If YES → `sapBehavior: "CORRECT"` — the original failure was a script locator bug
- If NO → `sapBehavior: "DIFFERENT"` — SAP produced a wrong result; possible app defect

If TC expected a **validation error** (Negative, Error, Edge):
- Did SAP display the expected error message?
- If YES (correct error shown) → `sapBehavior: "CORRECT"` — test assertion may have been wrong
- If NO (no error shown, or wrong error) → `sapBehavior: "DIFFERENT"` — possible app defect

---

### Step 5 — If All Locator Strategies Failed

If NONE of the attempted strategies found the element:

1. Take `browser_snapshot` — capture the full page state
2. Analyze: is the element present anywhere in the accessibility tree?
   - If element not in tree at all → element does not exist → `ELEMENT_NOT_PRESENT`
   - If element in tree but not interactable → `ELEMENT_INVISIBLE` or `ELEMENT_DISABLED`

3. Set:
   - `reExecutionStatus: "FAIL"`
   - `sapBehavior: "DIFFERENT"` (element expected to be present but isn't)
   - `recommendation: "LOG_DEFECT"`

4. Document: what the snapshot showed instead of the expected element

---

### Step 6 — Sign Out

After completing re-execution (whether PASS or FAIL):
- Click user profile → Sign Out → OK
- Take final snapshot

---

### Step 7 — Write Re-Execution Report

Directory: `self-healing/re-executions/{YYYYMMDD-HHmmss}-{TC-ID}/`

File: `{TC-ID}-reexecution.json`

```json
{
  "tcId": "TC-CS-001",
  "storyKey": "CS-2",
  "module": "MM",
  "app": "purchase-order",
  "timestamp": "2026-05-18T10:45:00.000Z",
  "reExecutedBy": "self-healing-agent/skills/re-execute-scriptless",
  "failureReportRef": "self-healing/failures/20260518-103000-TC-CS-001-failure.json",
  "reExecutionStatus": "PASS",
  "failingStepResult": {
    "stepNumber": 5,
    "method": "enterSupplier",
    "locatorName": "supplierField",
    "triedLocators": [
      { "attempt": 1, "strategy": "role", "value": "textbox", "name": "Supplier", "result": "FAIL",
        "error": "strict mode violation: resolved to 2 elements" },
      { "attempt": 2, "strategy": "css", "value": "input[id*='Supplier'][type='text']", "result": "PASS",
        "ref": "e23" }
    ],
    "workingLocator": { "strategy": "css", "value": "input[id*='Supplier'][type='text']" },
    "workingRef": "e23",
    "resolutionNote": "CSS selector with type='text' restriction avoids matching the SupplierName read-only span"
  },
  "stepsExecuted": 28,
  "sapBehavior": "CORRECT",
  "sapBehaviorNotes": "PO was created successfully. PO number 4500065470 visible on page.",
  "sapFinalState": {
    "poNumber": "4500065470",
    "status": "Sent",
    "successMessage": "Purchase Order 4500065470"
  },
  "recommendation": "PATCH_SCRIPTS",
  "steps": [
    { "stepNumber": 1, "result": "PASS", "snapshotFile": "step-01-login.json" },
    { "stepNumber": 5, "result": "PASS_AFTER_RETRY", "snapshotFile": "step-05-supplier.json",
      "note": "Passed on attempt 2 with CSS locator" }
  ],
  "snapshots": ["step-01-login.json", "step-05-supplier.json", "step-28-signout.json"]
}
```

---

### Step 8 — Print Summary

**If re-execution passed (automation bug confirmed):**
```
Re-Execution Complete: PASS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  TC           : TC-CS-001
  Result       : PASS (after locator retry)
  SAP Behavior : CORRECT — PO created successfully
  Failing Step : Step 5 — enterSupplier()
  Failed With  : role 'Supplier' → resolved to 2 elements
  Fixed With   : CSS input[id*='Supplier'][type='text']
  Recommendation: PATCH_SCRIPTS

Report: self-healing/re-executions/20260518-104500-TC-CS-001/TC-CS-001-reexecution.json
Next  : /patch-scripts TC-CS-001
```

**If re-execution also failed (app defect suspected):**
```
Re-Execution Complete: FAIL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  TC           : TC-CS-003
  Result       : FAIL
  SAP Behavior : DIFFERENT — Supplier field accepted non-existent ID without error
  Failing Step : Step 14 — expected validation error, but no error dialog appeared
  Recommendation: LOG_DEFECT

Report: self-healing/re-executions/20260518-105500-TC-CS-003/TC-CS-003-reexecution.json
Next  : /classify-failure TC-CS-003  (or /log-defect TC-CS-003 for full cycle)
```

---

## Error Handling

| Condition | Action |
|-----------|--------|
| Failure report not found | Abort: "Failure report for {TC-ID} not found. Run /analyze-failure {TC-ID} first." |
| MCP server unavailable | Abort: "Playwright MCP server not available. Cannot re-execute scriptlessly." |
| SAP login fails | Abort: "SAP login failed during re-execution. Check .env credentials." |
| Pre-failure steps cannot complete | Abort with note: "Cannot reach failing step — blocked at step {N}. Possible navigation issue." |
| All 7 locator strategies fail | Mark as ELEMENT_NOT_PRESENT; set sapBehavior=DIFFERENT; recommend LOG_DEFECT |
| Re-execution step count differs significantly from original | Log note: "TC step count mismatch — possible SAP UI change or flow difference" |
| Session expires mid-execution | Re-login and retry from last successful step (max 1 retry) |
