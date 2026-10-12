# Skill: patch-scripts

## Purpose

Apply targeted, minimal fixes to automation scripts based on gap analysis between the failure report and re-execution results. The patch corrects only the specific element that failed — no wholesale regeneration. After patching, update the exploration data with a healing record for traceability.

Output: Updated `test-registry/automation/` files + `self-healing/patches/{timestamp}-{TC-ID}-patch.md`.

---

## Pre-conditions

- A failure report must exist: `self-healing/failures/{timestamp}-{TC-ID}-failure.json`
- A re-execution report must exist: `self-healing/re-executions/{timestamp}-{TC-ID}/{TC-ID}-reexecution.json`
- The re-execution report's `recommendation` must be `PATCH_SCRIPTS` (not `LOG_DEFECT`)
- The automation script files must exist in `automation/`

---

## Execution Steps

### Step 1 — Load Both Reports

Find and load:
1. Most recent failure report: `self-healing/failures/*-{TC-ID}-failure.json`
2. Most recent re-execution report: `self-healing/re-executions/*-{TC-ID}/{TC-ID}-reexecution.json`

Verify `re-execution.recommendation === "PATCH_SCRIPTS"`. If not:
- If `LOG_DEFECT` → abort: "App defect detected — run /log-defect {TC-ID} instead of patching scripts"
- If missing → abort: "Re-execution recommendation is missing. Re-run /re-execute-scriptless {TC-ID}"

Extract key gap data:
```
failedLocatorName   : failure.failingStep.locatorName
oldPrimaryLocator   : failure.failingStep.locatorUsed.primary
workingLocator      : reexecution.failingStepResult.workingLocator
errorType           : failure.errorType
failingMethod       : failure.failingStep.method
specFile            : failure.failingStep.specFile
pageFile            : derived from spec file path
locatorsFile        : derived from spec file path
```

---

### Step 2 — Determine Change Type

Based on `errorType` and comparison of `oldPrimaryLocator` vs `workingLocator`:

| Change Type | Trigger Condition | Files to Modify |
|-------------|-------------------|-----------------|
| `LOCATOR_UPDATE` | errorType is `LOCATOR_FAILURE` AND workingLocator differs from old primary | `{app}.locators.js` |
| `WAIT_UPDATE` | errorType is `TIMEOUT_ERROR` | `{app}.page.js` |
| `INTERACTION_UPDATE` | errorType is `ELEMENT_INVISIBLE` or `ELEMENT_DISABLED` AND workingLocator succeeds with different interaction | `{app}.page.js` |
| `ASSERTION_UPDATE` | errorType is `ASSERTION_FAILURE` | `test-registry/automation/test-data/{module}-{app}.data.json` |
| `COMBINED` | Multiple change types needed | All relevant files |

Log: `Gap analysis complete — Change type: {CHANGE_TYPE}`

---

### Step 3 — Apply LOCATOR_UPDATE (if applicable)

Read `test-registry/automation/pages/{module}/{app}/{app}.locators.js`.

Find the locator entry matching `failedLocatorName` (e.g., `supplierField`).

**Before patch (example):**
```javascript
supplierField: {
  primary:   { strategy: 'role', value: 'textbox', name: 'Supplier' },
  fallbacks: [{ strategy: 'css', value: 'input[id*="Supplier"]' }]
}
```

**After patch:**
- Set `primary` to `workingLocator` from re-execution report
- Demote old `primary` to `fallbacks[0]` (insert at beginning of fallbacks array)
- Keep existing fallbacks (append after the demoted primary)
- Do NOT remove fallbacks — they may still be useful

**After patch (example):**
```javascript
supplierField: {
  primary:   { strategy: 'css', value: 'input[id*="Supplier"][type="text"]' },
  fallbacks: [
    { strategy: 'role', value: 'textbox', name: 'Supplier' },         // was primary — demoted
    { strategy: 'css', value: 'input[id*="Supplier"]' }               // existing fallback kept
  ]
}
```

Add a comment above the patched locator noting the patch date and reason:
```javascript
// PATCHED 2026-05-18: Role locator matched 2 elements (input + read-only span). CSS with type='text' is unambiguous.
```

Write the updated locators file.

**Check for shared root cause:** If the failure report noted `sharedRootCause` (multiple TCs affected by same locator), the single locator fix already covers all affected TCs. Note this in the patch record.

---

### Step 4 — Apply WAIT_UPDATE (if applicable)

Read `test-registry/automation/pages/{module}/{app}/{app}.page.js`.

Find the method matching `failingMethod` (e.g., `clickOrder`).

Identify the wait call that timed out from the error message (e.g., `waitForBusyIndicator` or `waitForSapPageReady`).

**If timeout too short:**
- Increase timeout from current value by 50% (e.g., 30000ms → 45000ms)
- Cap at 120000ms (2 minutes) — if SAP consistently takes longer, that is an app performance issue

**If wrong wait type:**
- If waiting for `networkidle` → change to `domcontentloaded` + `waitForSapPageReady()`
- If no wait after navigation → add `waitForSapPageReady()`
- If no wait after action → add `waitForBusyIndicator()`

Add comment explaining the change:
```javascript
// PATCHED 2026-05-18: Increased timeout from 30000ms to 45000ms — SAP Order processing observed ~40s on demo tenant
```

Write the updated page.js file.

---

### Step 5 — Apply INTERACTION_UPDATE (if applicable)

Read `test-registry/automation/pages/{module}/{app}/{app}.page.js`.

Find the method that failed. Determine the interaction change needed:

**ELEMENT_INVISIBLE — element exists but not visible:**
- Scroll element into view before action: add `await locator.scrollIntoViewIfNeeded()`
- Or wait for visibility: change `locator.click()` to `locator.waitFor({ state: 'visible' }); await locator.click()`

**ELEMENT_DISABLED — element exists but not enabled:**
- Add a wait for the enabled state before clicking: `await locator.waitFor({ state: 'enabled', timeout: 15000 })`
- Or check if a prior step (like entering a required field) must be completed first

**Wrong keyboard shortcut:**
- e.g., if `Ctrl+Enter` was `Enter` → change to `Control+Enter`
- Note from exploration data what the correct pattern is

Add comment explaining the change. Write updated page.js.

---

### Step 6 — Apply ASSERTION_UPDATE (if applicable)

Read `test-registry/automation/test-data/{module}-{app}.data.json`.

Find the TC entry (e.g., `"TC-CS-001"`) and the `expected` object.

Determine what the correct expected value is from the re-execution report:
- `reexecution.sapFinalState` → actual values SAP produced
- Common fixes:
  - `status: "Open"` → `status: "Sent"` (automatic release in this SAP tenant)
  - `successMessagePattern: "Purchase Order created"` → `"Purchase Order \\d{10}"` (actual format)
  - `signOutRedirectUrl: "/logoff"` → `"logoff"` (partial match pattern)

Update only the specific `expected` field(s) that were wrong. Do not change `input` values.

Add note in the `phase3Verification` or `notes` field explaining the correction.

Write updated data.json file.

---

### Step 7 — Update Exploration Data with Healing Record

Read `exploration-data/execution/{KEY}/{TC-ID}/{TC-ID}-execution.json` (if it exists).

Add a `healed` array (or append to existing `healed` array):

```json
"healed": [
  {
    "timestamp": "2026-05-18T11:30:00.000Z",
    "patchFile": "self-healing/patches/20260518-113000-TC-CS-001-patch.md",
    "changeType": "LOCATOR_UPDATE",
    "element": "supplierField",
    "oldStrategy": "role textbox 'Supplier'",
    "newStrategy": "css input[id*='Supplier'][type='text']",
    "triggeredBy": "self-healing-agent/skills/patch-scripts"
  }
]
```

Write the updated execution JSON.

---

### Step 8 — Write Patch Record

File: `self-healing/patches/{YYYYMMDD-HHmmss}-{TC-ID}-patch.md`

```markdown
# Patch: {TC-ID} — {YYYY-MM-DD HH:mm:ss}

## Failure Summary
- TC ID        : {TC-ID}
- Story        : {storyKey}
- Error Type   : LOCATOR_FAILURE
- Failing At   : {method}() — {locatorName}
- Error Message: {errorMessage truncated to 120 chars}

## Root Cause
{One-sentence explanation, e.g.: "Role locator 'Supplier' resolved to 2 elements: the editable input and a read-only display field with the same role/name."}

## Fix Applied

### File: automation/pages/{module}/{app}/{app}.locators.js
- **Changed**: `{locatorName}.primary`
- **Old**: `{ strategy: 'role', value: 'textbox', name: 'Supplier' }`
- **New**: `{ strategy: 'css', value: 'input[id*="Supplier"][type="text"]' }`
- Old primary moved to `fallbacks[0]`

## Affected Test Cases
- {TC-ID} (directly fixed)
- {Other TC IDs if shared root cause}

## Verification
Re-run the fixed test case:
```
npx playwright test --config=automation/config/playwright.config.js --grep "{TC-ID}"
```

Expected: PASS

## References
- Failure report : self-healing/failures/{timestamp}-{TC-ID}-failure.json
- Re-execution   : self-healing/re-executions/{timestamp}-{TC-ID}/{TC-ID}-reexecution.json
```

---

### Step 9 — Print Completion Summary

```
Patch Applied: {TC-ID}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Change Type     : LOCATOR_UPDATE
  File Modified   : automation/pages/mm/purchase-order/purchase-order.locators.js
  Element Fixed   : supplierField
  Old Primary     : role textbox 'Supplier'
  New Primary     : css input[id*='Supplier'][type='text']
  Affected TCs    : TC-CS-001 (and TC-CS-002 — same locator)

Patch record: self-healing/patches/20260518-113000-TC-CS-001-patch.md

Verify with:
  npx playwright test --config=automation/config/playwright.config.js --grep "TC-CS-001"
```

---

## Error Handling

| Condition | Action |
|-----------|--------|
| Re-execution recommendation is LOG_DEFECT | Abort: "App defect confirmed — do not patch scripts. Run /log-defect {TC-ID}" |
| Working locator not found in re-execution report | Abort: "Re-execution did not capture a working locator. Re-run /re-execute-scriptless {TC-ID} and ensure it reaches the failing step." |
| Locators file not found | Abort: "automation/pages/.../locators.js not found. Run /generate-scripts {KEY} first." |
| Locator name not found in locators file | Add new locator entry with working strategy; note as "Added by self-healing — was missing from original generation" |
| Multiple change types needed | Apply all changes sequentially; document each in patch record under separate ## sections |
| Assertion fix requires new expected value not in re-execution | Ask user: "Re-execution did not produce a clear expected value for TC-{ID}. What should the expected {field} be?" |
