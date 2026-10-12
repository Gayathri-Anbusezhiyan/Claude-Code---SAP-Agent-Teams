# Skill: classify-failure

## Purpose

Determine whether a test failure is caused by a bug in the automation scripts (`AUTOMATION_BUG`) or by the SAP application itself violating an Acceptance Criterion (`APP_DEFECT`). This classification drives the next action: automation bugs are self-healed by patching scripts; app defects are logged to Jira. A third outcome (`NEEDS_REVIEW`) halts automation and requires human judgment.

Output: `defects/{KEY}/{TC-ID}-{timestamp}-classification.json`

---

## Pre-conditions

- A re-execution report must exist: `self-healing/re-executions/{timestamp}-{TC-ID}/{TC-ID}-reexecution.json`
- The test case file must exist: `testcases/AI-generated testcases/{KEY}/testcases/{TC-ID}.md`
- The story JSON must exist: `jira/userstories/{KEY}/{KEY}.json`

---

## Execution Steps

### Step 1 — Load Re-Execution Report

Find the most recent re-execution report for this TC:
- List `self-healing/re-executions/` for directories containing `{TC-ID}-reexecution.json`
- Sort by timestamp prefix (newest first)
- Read the most recent `{TC-ID}-reexecution.json`

Extract key fields:
- `reExecutionStatus` — PASS, FAIL, or PARTIAL
- `sapBehavior` — CORRECT or DIFFERENT
- `failingStepResult.workingLocator` — the locator that worked in MCP (if any)
- `recommendation` — PATCH_SCRIPTS or LOG_DEFECT

---

### Step 2 — If Re-Execution PASSED (reExecutionStatus = PASS)

SAP behaved correctly when executed via MCP. The automation script was using the wrong locator or wrong interaction.

**Classification: `AUTOMATION_BUG`**

Write classification report (see Step 6) with:
- `classification: "AUTOMATION_BUG"`
- `evidence.sapBehavior: "CORRECT — TC passed in MCP re-execution"`
- `recommendation: "SELF_HEAL"`

Print:
```
Classification: AUTOMATION_BUG
  SAP worked correctly in MCP re-execution.
  The automation script had the wrong locator or interaction pattern.
  → Do NOT log a defect.
  → Run /patch-scripts {TC-ID} to fix the script.
```

Stop here — do NOT proceed to Step 3.

---

### Step 3 — If Re-Execution FAILED (reExecutionStatus = FAIL)

SAP also failed during MCP execution. Proceed to compare against Acceptance Criteria.

Read the following:

1. `testcases/AI-generated testcases/{KEY}/testcases/{TC-ID}.md`
   - Extract: scenario type, priority, severity
   - Find the `Acceptance Criteria` or `User Story` reference (field at top of TC file)
   - Identify which AC number this TC tests (e.g., `AC-7`)
   - Copy the TC's `Expected Final Result` section

2. `jira/userstories/{KEY}/{KEY}.json`
   - Read the `acceptanceCriteria` field
   - Extract the specific AC text referenced in the TC file
   - If AC is not individually numbered in the JSON, split by bullet/dash and match by content similarity

---

### Step 4 — AC Comparison (Core Classification Logic)

Compare SAP's actual behavior (from re-execution `sapBehaviorNotes` field) against the Acceptance Criterion text:

**Rule A — APP_DEFECT:** SAP behavior clearly contradicts the AC

Examples:
- AC says "system prevents submission if mandatory field is missing" → SAP submitted without error
- AC says "system displays error message if supplier does not exist" → SAP accepted non-existent supplier silently
- AC says "unique PO number is generated on success" → SAP returned no PO number
- AC says "user can filter by PO number" → filter returns nothing for a valid PO

→ Classification: `APP_DEFECT`

**Rule B — AUTOMATION_BUG:** SAP behavior actually matches the AC; the test expected the wrong thing

Examples:
- AC says "error message is displayed" but does not specify exact text → test asserted wrong message text
- AC says "PO number is generated" → PO was created but test looked in wrong location for the number
- AC says "status is updated" → status changed correctly but test checked wrong field
- Test data expected `status = "Open"` but SAP shows `status = "Sent"` (automatic release active)

→ Classification: `AUTOMATION_BUG`

**Rule C — NEEDS_REVIEW:** Ambiguous or unclear

Examples:
- AC is vague; could be interpreted either way
- Re-execution was PARTIAL (some steps passed, some failed at different points than the original failure)
- The TC tests an AC that is marked as "out of scope" or the story has `status = "Won't Do"`
- SAP returned an error message not mentioned in any AC

→ Classification: `NEEDS_REVIEW`

---

### Step 5 — Module and Severity Assessment

If classification is `APP_DEFECT`, also determine:

- **Module**: from TC metadata or story JSON (`components` field)
- **Jira priority**: map from TC priority field
  - CRITICAL → Critical
  - HIGH → High
  - MEDIUM → Medium
  - LOW → Low
- **Labels**: `["defect", "automation-detected", "{module-lower}", "{KEY}"]`
- **AC number violated**: e.g., `AC-7`
- **AC text**: exact text of the violated criterion

---

### Step 6 — Write Classification Report

File: `defects/{KEY}/{TC-ID}-{YYYYMMDD-HHmmss}-classification.json`

```json
{
  "tcId": "TC-CS-003",
  "storyKey": "CS-2",
  "timestamp": "2026-05-18T11:00:00.000Z",
  "classifiedBy": "defect-logging-agent/skills/classify-failure",
  "reExecutionFile": "self-healing/re-executions/20260518-105500-TC-CS-003/TC-CS-003-reexecution.json",
  "reExecutionStatus": "FAIL",
  "sapBehavior": "DIFFERENT",
  "classification": "APP_DEFECT",
  "evidence": {
    "sapActualBehavior": "Supplier field accepted non-existent supplier ID '99999999' without any error message. PO creation proceeded to items section.",
    "acViolated": "AC-7",
    "acText": "The system displays a descriptive error message if the supplier or material entered does not exist in the system.",
    "acSource": "jira/userstories/CS-2/CS-2.json",
    "tcExpectedResult": "System should display error: 'Supplier 99999999 does not exist'",
    "screenshotRef": "self-healing/re-executions/20260518-105500-TC-CS-003/step-05-supplier-accept.json"
  },
  "defectMetadata": {
    "module": "MM",
    "jiraPriority": "High",
    "labels": ["defect", "automation-detected", "mm", "CS-2"],
    "acViolated": "AC-7"
  },
  "recommendation": "LOG_DEFECT",
  "notes": "SAP accepted non-existent supplier ID without validation. This is a clear AC violation. Recommend logging to Jira."
}
```

---

### Step 7 — Print Classification Summary

**For APP_DEFECT:**
```
Classification: APP_DEFECT
  TC          : TC-CS-003 — Invalid Supplier (Negative)
  Story       : CS-2
  AC Violated : AC-7 — System displays error if supplier does not exist
  SAP Behavior: Accepted non-existent supplier silently; no error shown
  Priority    : High (maps to Jira High)
  → A Jira defect should be logged.
  → Run /log-defect TC-CS-003 to create the Jira Bug.
```

**For AUTOMATION_BUG:**
```
Classification: AUTOMATION_BUG
  TC          : TC-CS-001 — Create Standard PO
  SAP Behavior: Correct — PO was created successfully
  Root Cause  : Test expected status "Open" but SAP shows "Sent" (automatic release)
  → Do NOT log a defect.
  → Run /patch-scripts TC-CS-001 to update the expected value in test data.
```

**For NEEDS_REVIEW:**
```
Classification: NEEDS_REVIEW
  TC          : TC-CS-015 — Modify PO in Display Mode
  Reason      : SAP always opens PO in edit mode (no display-only mode accessible via list navigation).
                AC-4 requires display mode, but the app may be configured differently.
                Cannot determine automatically if this is a defect or an expected configuration.
  → Human review required.
  → Check defects/CS-3/TC-CS-015-{timestamp}-classification.json for details.
```

---

## Error Handling

| Condition | Action |
|-----------|--------|
| Re-execution report not found | Abort: "Re-execution report for {TC-ID} not found. Run /re-execute-scriptless {TC-ID} first." |
| TC file not found | Abort: "testcases/AI-generated testcases/{KEY}/testcases/{TC-ID}.md not found. Cannot classify." |
| Story JSON not found | Abort: "jira/userstories/{KEY}/{KEY}.json not found. Run /jira-fetch-userstories first." |
| AC text cannot be matched to TC | Set classification to NEEDS_REVIEW with note: "AC reference in TC could not be matched to story AC text" |
| Re-execution was PARTIAL | Classify based on the first step that failed; note partial status in report |
| sapBehavior field is CORRECT but status is FAIL | Contradiction — set to NEEDS_REVIEW; note inconsistency |
