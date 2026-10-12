# /run-scriptless

Execute SAP test cases directly against the live system using the Playwright MCP server and report PASS/FAIL results. No automation scripts are needed — Claude drives the browser step by step, verifies each expected result, and produces a clear execution report. Use this to validate SAP behavior at any point: before scripts exist, after a release, or whenever you want human-readable test evidence.

## Usage

```
/run-scriptless {KEY}        → Run all TCs for a story (e.g., CS-2)
/run-scriptless {TC-ID}      → Run a single test case (e.g., TC-CS-001)
```

## Instructions

1. Read `ai-engine/agents/automation-agent/agent.md` for agent context
2. Read `.env` → get `SAP_FIORI_URL`, `SAP_USERNAME`, `SAP_PASSWORD`
3. Determine scope from `$ARGUMENTS`:
   - Story key → read `test-registry/testcases/AI-generated testcases/$ARGUMENTS/$ARGUMENTS-summary.json` for TC list and execution order
   - TC ID → read that single TC file directly: `test-registry/testcases/AI-generated testcases/{KEY}/testcases/$ARGUMENTS.md`
4. Read `test-registry/testdata/{KEY}/{KEY}-testdata.json` → resolved input values + expected outcomes
5. Execute all steps defined in `ai-engine/agents/automation-agent/skills/run-scriptless.md` exactly as specified:
   - For each TC: login → dismiss guided tour → navigate to app → execute every step
   - At each step: perform the SAP action, then verify the **Expected Result** column from the TC table
   - Record step-level PASS/FAIL with actual vs expected result
   - Handle SAP dialogs, error messages, and auto-populated fields
   - Sign out after each TC
6. Write results and report completion

## Pre-conditions

- Test cases must exist — run `/testcase-pipeline {KEY}` first if not
- Playwright MCP server must be running
- SAP credentials must be set in `.env`
- No automation scripts needed — this is script-free execution

## Output

```
test-registry/scriptless-results/{KEY}/{TC-ID}-result.json        ← Per-TC: step-by-step PASS/FAIL + actual results
test-registry/scriptless-results/{KEY}/{KEY}-execution-report.md  ← Full story report: summary table + failure details
```

## Result Summary Format

```
Scriptless Execution: {KEY}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  PASS    : {N}
  FAIL    : {N}
  PARTIAL : {N}
  SKIPPED : {N}   ← unresolved test data placeholders
  BLOCKED : {N}   ← missing pre-conditions (e.g., GR-posted PO, display-only user)

Failures:
  TC-CS-005  Step 19 — Order accepted without supplier; no validation raised
             → Possible app defect. Run /log-defect TC-CS-005

Report: test-registry/scriptless-results/{KEY}/{KEY}-execution-report.md
```

## Next Steps

| Outcome | Action |
|---------|--------|
| All TCs PASS | Generate scripts: `/automate {KEY}` |
| TC FAIL — step logic | Check TC definition and test data |
| TC FAIL — SAP behavior wrong | Classify: `/log-defect {TC-ID}` |
| TC SKIPPED | Resolve `{{PLACEHOLDER}}` values in `test-registry/testdata/{KEY}/{KEY}-testdata.json` |
