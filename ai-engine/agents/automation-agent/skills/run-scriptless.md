# Skill: run-scriptless

## Purpose

Execute SAP test cases directly against the live system using the Playwright MCP server and report PASS/FAIL results. Unlike `explore-and-capture` (which focuses on capturing data for script generation), this skill focuses entirely on **test verification** — checking each step's expected result and producing a clear execution report. No scripts are generated. No exploration data is stored beyond the result report.

Use this when you want to validate SAP behavior against test cases without running the Playwright test runner, or when automation scripts don't yet exist for a story.

Output: `scriptless-results/{KEY}/` — per-TC result JSONs + story execution report.

---

## Pre-conditions

- `testcases/AI-generated testcases/{KEY}/{KEY}-summary.json` must exist
- `testdata/{KEY}/{KEY}-testdata.json` must exist with resolved values
- Playwright MCP server must be running and connected
- `.env` must contain `SAP_FIORI_URL`, `SAP_USERNAME`, `SAP_PASSWORD`

---

## Execution Steps

### Step 1 — Load Inputs

1. Read `testcases/AI-generated testcases/{KEY}/{KEY}-summary.json` → TC list in `executionOrder`
2. Read `testdata/{KEY}/{KEY}-testdata.json` → resolved input values + expected outcomes per TC
3. If `test-registry/automation/test-data/{module}-{app}.data.json` exists → read as additional source for `expected` values
4. Read `.env` → `SAP_FIORI_URL`, `SAP_USERNAME`, `SAP_PASSWORD`

For each TC, resolve its test data:
- Input values: `supplierId`, `materialId`, `quantity`, `price`, `plant`, `poNumber`, etc.
- Expected values: success message pattern, error message text, PO status, redirect URL, etc.

**Skip TCs** with unresolved `{{PLACEHOLDER}}` in mandatory input fields. Log as `SKIPPED`.

Log:
```
Scriptless Execution: {KEY}
  TCs to run : {N} ({M} skipped — unresolved placeholders)
  SAP URL    : {SAP_FIORI_URL}
```

---

### Step 2 — For Each TC: Login to SAP

1. `browser_navigate` to `SAP_FIORI_URL`
2. `browser_snapshot` → locate username field
3. `browser_type` email/username → `browser_click` Continue
4. `browser_snapshot` → locate password field
5. `browser_type` password → `browser_click` Continue
6. `browser_snapshot` after login → check for Guided Tour dialog
   - If present: `browser_click` "Leave Tour" → continue
7. Navigate to app via shell search:
   - `browser_click` search icon → `browser_type` app name → `browser_press_key` Enter → `browser_click` result
8. `browser_snapshot` → confirm app loaded

---

### Step 3 — Execute Each TC Step and Verify

Read the `| Step | Action | Test Data | Expected Result |` table from `testcases/AI-generated testcases/{KEY}/testcases/{TC-ID}.md`.

For **each step** in the table:

1. Perform the action (type, click, select, press key, navigate)
2. `browser_snapshot` after the action
3. **Verify** the step's `Expected Result` column:
   - Text visible on page → check snapshot for the text
   - Error message → check if message dialog contains expected text
   - Auto-populated field → confirm field now contains expected value
   - Navigation → confirm page title / URL changed as expected
   - Button enabled/disabled → confirm state from snapshot
4. Record step result:
   ```json
   {
     "stepNumber": 5,
     "action": "Enter Supplier ID 17300002 and press Enter",
     "testData": "17300002",
     "expectedResult": "System auto-populates Supplier Name as 'Carbon Tec Inc.'",
     "actualResult": "Supplier Name field shows 'Carbon Tec Inc.' ✓",
     "status": "PASS"
   }
   ```
   Or on failure:
   ```json
   {
     "stepNumber": 14,
     "action": "Click Order button",
     "expectedResult": "Purchase Order number generated and displayed",
     "actualResult": "Messages dialog appeared with error: 'Enter a plant'",
     "status": "FAIL",
     "failureNote": "Plant field was not filled — TC step 10 missed plant entry"
   }
   ```

**Handling verification:**

| Expected Result Type | How to Verify |
|----------------------|---------------|
| "System displays message X" | `browser_snapshot` → scan text content for message |
| "Field auto-populated with Y" | `browser_snapshot` → confirm field value contains Y |
| "PO number generated" | `browser_snapshot` → find 10-digit number in heading/URL/body |
| "Error message displayed" | Open Messages dialog if present → read content |
| "No error / validation passes" | Check no error dialog or Messages button present |
| "User navigated to list page" | Check page title / breadcrumb in snapshot |

---

### Step 4 — Handle SAP Dialogs During Execution

- **Messages dialog (validation errors):** `browser_click` Messages button → read content → record in step result → `browser_click` Close
- **Discard confirmation:** `browser_click` "Discard" button when navigating away from draft
- **Sign-out confirmation:** `browser_click` OK
- **Any unexpected dialog:** `browser_press_key` Escape → note in step result; continue

---

### Step 5 — Determine TC Result

After all steps complete:

- **PASS**: All steps verified successfully; final expected state achieved
- **FAIL**: One or more steps did not produce the expected result
- **PARTIAL**: Most steps passed but one or more steps could not be executed (element not found, SAP blocked navigation)
- **SKIPPED**: TC had unresolved placeholders and was not executed
- **BLOCKED**: TC requires external pre-condition (e.g., GR-posted PO, display-only user)

---

### Step 6 — Sign Out After Each TC

After completing each TC:
1. `browser_click` user profile button (`button[id*='meAreaButton']`)
2. `browser_click` Sign Out item (`[id$='-logoutBtn']`)
3. `browser_click` OK in confirmation dialog

---

### Step 7 — Write TC Result File

File: `scriptless-results/{KEY}/{TC-ID}-result.json`

```json
{
  "tcId": "TC-CS-001",
  "storyKey": "CS-2",
  "description": "Create Standard PO — single line item",
  "scenarioType": "HAPPY_PATH",
  "priority": "CRITICAL",
  "executedAt": "2026-05-18T14:00:00.000Z",
  "executedBy": "automation-agent/skills/run-scriptless",
  "status": "PASS",
  "totalSteps": 28,
  "passedSteps": 28,
  "failedSteps": 0,
  "steps": [
    { "stepNumber": 1,  "status": "PASS", "action": "Navigate to SAP Fiori", "expectedResult": "SAP Fiori login page loads", "actualResult": "Login page loaded ✓" },
    { "stepNumber": 5,  "status": "PASS", "action": "Enter Supplier 17300002", "expectedResult": "Supplier Name auto-populates", "actualResult": "Carbon Tec Inc. shown ✓" },
    { "stepNumber": 22, "status": "PASS", "action": "Click Order", "expectedResult": "PO number generated", "actualResult": "Purchase Order 4500065471 created ✓" }
  ],
  "finalState": {
    "poNumber": "4500065471",
    "status": "Sent",
    "successMessage": "Purchase Order 4500065471"
  },
  "notes": ""
}
```

---

### Step 8 — Write Story Execution Report

After all TCs complete, write a human-readable report:

File: `scriptless-results/{KEY}/{KEY}-execution-report.md`

```markdown
# Scriptless Execution Report — {KEY}
**Story:** {KEY}: {storySummary}
**Executed:** {ISO timestamp}
**SAP Tenant:** my429998.s4hana.cloud.sap

## Summary

| Status  | Count |
|---------|-------|
| PASS    | {N}   |
| FAIL    | {N}   |
| PARTIAL | {N}   |
| SKIPPED | {N}   |
| BLOCKED | {N}   |
| **Total** | **{N}** |

## Results

| TC ID | Type | Priority | Status | Steps | Failure Point |
|-------|------|----------|--------|-------|---------------|
| TC-CS-001 | HP   | CRITICAL | PASS   | 28/28 | —             |
| TC-CS-002 | AP   | HIGH     | PASS   | 31/31 | —             |
| TC-CS-005 | ERR  | HIGH     | FAIL   | 18/22 | Step 19: Order accepted without supplier — no validation error shown |
| TC-CS-003 | NEG  | HIGH     | SKIPPED | —   | Unresolved: {{SUPPLIER_ID_INVALID}}  |

## Failures (Detail)

### TC-CS-005 — Missing Supplier validation
- **Failed at:** Step 19 — Click Order button
- **Expected:** Messages dialog with "Enter a supplier" error
- **Actual:** PO was created without supplier ID — no validation error raised
- **Possible cause:** SAP application defect (AC-6 may be violated)
- **Recommendation:** Run `/log-defect TC-CS-005` if this is a confirmed app bug

## Skipped TCs
- TC-CS-003 — Unresolved: `{{SUPPLIER_ID_INVALID}}` (invalid supplier test data needed)
- TC-CS-004 — Unresolved: `{{MATERIAL_ID_INVALID}}`
```

---

### Step 9 — Print Console Summary

```
Scriptless Execution: {KEY}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  PASS    : {N}
  FAIL    : {N}
  PARTIAL : {N}
  SKIPPED : {N} (unresolved placeholders)
  BLOCKED : {N} (missing pre-conditions)
  ──────────────────────────────────────────
  Total   : {N} TCs

Failures:
  TC-CS-005 (ERR/HIGH)  Step 19 — Order accepted without supplier; no validation raised
                        → Possible AC-6 violation. Run /log-defect TC-CS-005

Skipped:
  TC-CS-003, TC-CS-004  — Resolve {{SUPPLIER_ID_INVALID}}, {{MATERIAL_ID_INVALID}} in testdata

Report: scriptless-results/{KEY}/{KEY}-execution-report.md
```

---

## Error Handling

| Condition | Action |
|-----------|--------|
| MCP server unavailable | Abort: "Playwright MCP server not available." |
| SAP login fails | Abort all TCs: "Login failed. Check .env credentials." |
| TC step cannot find element | Mark step as FAIL with note: "Element not found"; continue remaining steps |
| TC step times out | Mark step as PARTIAL with note: "Step timed out after 30s"; continue |
| Unexpected popup blocks step | Dismiss via Escape; mark step as PARTIAL; continue |
| TC file not found | Skip TC; note in report |
| All steps fail for a TC | Mark TC as FAIL; sign out; continue to next TC |
