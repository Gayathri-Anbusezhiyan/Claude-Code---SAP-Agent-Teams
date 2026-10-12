# /e2e-automation-v2

Run the full end-to-end pipeline for a given user story, with **TC-CS-021 as the fixed automation and defect-detection target**. Always re-imports the Jira story, always regenerates the full TC suite (preserving TC-CS-021), then runs explore → automate → execute → self-heal → log-defect scoped to TC-CS-021 only.

## Usage

```
/e2e-automation-v2 {STORY_KEY}
```

Example: `/e2e-automation-v2 CS-4`

> `{STORY_KEY}` is the Jira story key whose TC suite will be regenerated (e.g., `CS-4`).
> TC-CS-021 is the **fixed** automation target — it is always preserved and never regenerated.
> TC-CS-021 must already exist in `testcases/AI-generated testcases/{STORY_KEY}/testcases/TC-CS-021.md`.

---

## Pipeline Phases

```
Phase 1  →  Phase 2          →  Phase 3            →  Phase 4        →  Phase 5       →  Phase 6
Jira        TestCase Pipeline    Automate               Run Test          Self-Heal         Log Defect
Import      (preserve TC-CS-021) (TC-CS-021 only)       (TC-CS-021 only)  (APP_DEFECT)      (Jira Bug)
(always)    (always regenerate)
```

| Phase | What Happens |
|-------|-------------|
| **1 — Jira Import** | Always re-fetch the story for `{STORY_KEY}`; overwrite existing cached data |
| **2 — TestCase Pipeline** | Regenerate full TC suite for `{STORY_KEY}`; **preserve TC-CS-021.md and its summary.json entry** |
| **3 — Automate** | Execute TC-CS-021 via Playwright MCP (explore + capture); generate all 5 automation files |
| **4 — Run Test** | Execute only TC-CS-021 via Playwright runner (`--grep`); capture pass/fail + error details |
| **5 — Self-Heal** | Analyze failure → re-execute via MCP → detect SAP behavior → classify as APP_DEFECT → escalate |
| **6 — Log Defect** | Classify failure vs ACs → create Jira Bug → link to parent story → add comment |

---

## Instructions

### Step 0 — Resolve Story Key and Fixed TC

1. Read `.env` → extract `JIRA_PROJECT_KEY`, `JIRA_BASE_URL`, `SAP_FIORI_URL`, `SAP_USERNAME`, `SAP_PASSWORD`
2. Resolve `STORY_KEY = $ARGUMENTS` (e.g., `CS-4`)
3. Set `TC_ID = TC-CS-021` (fixed — never changes for this command)
4. Confirm `testcases/AI-generated testcases/{STORY_KEY}/testcases/TC-CS-021.md` exists
   - If not found → stop: `ERROR: TC-CS-021.md not found under {STORY_KEY}. Verify the story key is correct.`
5. Read `testcases/AI-generated testcases/{STORY_KEY}/{STORY_KEY}-summary.json` → locate the TC-CS-021 entry
6. Read `jira/userstories/{STORY_KEY}/{STORY_KEY}.json` if it exists (used for reference only; Phase 1 will overwrite it)

Log:
```
E2E Automation v2 Pipeline starting
  Story Key  : {STORY_KEY}
  Fixed TC   : TC-CS-021 (automation + defect detection target)
  Mode       : Full re-import + full TC regeneration + TC-CS-021 preserved
```

---

### Phase 1 — Jira Import (Always Run)

**Always re-fetch — no cache skip. Existing story JSON will be overwritten.**

7. Read `agents/jira-agent/agent.md`
8. Read `agents/jira-agent/skills/fetch-userstories.md` → execute all steps for `{STORY_KEY}`:
   - Fetch the story from Jira using `mcp__atlassian__*` tools
   - Overwrite `jira/userstories/{STORY_KEY}/{STORY_KEY}.md`
   - Overwrite `jira/userstories/{STORY_KEY}/{STORY_KEY}.json`
   - Update `jira/index.json`
9. Confirm `jira/userstories/{STORY_KEY}/{STORY_KEY}.json` exists and has been freshly written

Log:
```
Phase 1 — Jira Import: COMPLETE
  Story {STORY_KEY} re-fetched and replaced: jira/userstories/{STORY_KEY}/{STORY_KEY}.json
```

---

### Phase 2 — TestCase Pipeline (Regenerate All, Preserve TC-CS-021)

**This phase always regenerates the full TC suite for `{STORY_KEY}` but must not overwrite TC-CS-021.**

#### Step 2a — Snapshot TC-CS-021 artefacts

10. Read and hold in memory:
    - Full content of `testcases/AI-generated testcases/{STORY_KEY}/testcases/TC-CS-021.md` → `SAVED_TC_MD`
    - The JSON entry for TC-CS-021 from `{STORY_KEY}-summary.json` → `SAVED_TC_SUMMARY_ENTRY`
    - Full content of `testdata/{STORY_KEY}/{STORY_KEY}-testdata.json` → `SAVED_TESTDATA`

Log: `Phase 2 — Snapshot of TC-CS-021 taken before testcase pipeline`

#### Step 2b — Run TestCase Pipeline for {STORY_KEY}

Execute the full testcase pipeline exactly as defined in `.claude/commands/testcase-pipeline.md`:

11. Read `agents/test-strategy-agent/agent.md`
12. Read `agents/test-strategy-agent/skills/analyze-userstory.md` → execute all steps for `{STORY_KEY}`
    - Output: `jira/userstories/{STORY_KEY}/strategy/{STORY_KEY}-analysis.md` + `{STORY_KEY}-risk-profile.json`
13. Read `agents/test-strategy-agent/skills/define-test-strategy.md` → execute all steps
    - Output: `jira/userstories/{STORY_KEY}/strategy/{STORY_KEY}-strategy.md`
14. Read `agents/testcase-agent/agent.md`
15. Read `agents/testcase-agent/skills/generate-testcases.md` → execute all steps
    - Output: `testcases/AI-generated testcases/{STORY_KEY}/testcases/` (regenerated TCs — all existing TCs except TC-CS-021 are replaced)
    - Output: `{STORY_KEY}-coverage-matrix.md` + `{STORY_KEY}-summary.json`
16. Read `agents/testcase-agent/skills/extract-testdata.md` → execute all steps
    - Output: `testdata/{STORY_KEY}/{STORY_KEY}-testdata.json` + `{STORY_KEY}-testdata-guide.md`

#### Step 2c — Restore TC-CS-021 artefacts

17. After the testcase pipeline completes, **restore** TC-CS-021:
    - If `testcases/AI-generated testcases/{STORY_KEY}/testcases/TC-CS-021.md` was overwritten or deleted → write `SAVED_TC_MD` back to disk (no changes to content)
    - If the file was NOT touched by the pipeline → leave as-is
18. **Re-inject** TC-CS-021 entry into the regenerated `{STORY_KEY}-summary.json`:
    - Read the newly written `{STORY_KEY}-summary.json`
    - Check if TC-CS-021 entry is present in `testCases` array
    - If missing → append `SAVED_TC_SUMMARY_ENTRY` to the `testCases` array; increment `totalTestCases` counter
    - Write the updated summary JSON back to disk
19. **Restore test data**: check if TC-CS-021's dataset is present in the regenerated testdata JSON
    - If missing → merge the TC-CS-021 dataset from `SAVED_TESTDATA` into the new testdata file

Log:
```
Phase 2 — TestCase Pipeline: COMPLETE
  {STORY_KEY} TCs regenerated: {n} new TCs (all replaced except TC-CS-021)
  TC-CS-021 preserved: testcases/AI-generated testcases/{STORY_KEY}/testcases/TC-CS-021.md
  TC-CS-021 in summary.json: OK
  TC-CS-021 testdata: OK
```

---

### Phase 3 — Automate TC-CS-021 (Explore + Generate)

Execute the automate flow for TC-CS-021 exactly as defined in `.claude/commands/automate.md`, scoped to TC-CS-021 only for Phase 3a (exploration).

20. Read `agents/automation-agent/agent.md`
21. Read `agents/automation-agent/skills/explore-and-capture.md`

#### Phase 3a — Explore and Capture (Playwright MCP — TC-CS-021 only, headed mode)

> **Browser mode:** All MCP-based scriptless execution runs in **headed mode** (browser visible). This is controlled by the `--headed` flag in `.mcp.json`. If the browser does not open visibly, verify `.mcp.json` contains `"--headed"` in the playwright args and restart the MCP server.

Execute explore-and-capture for TC-CS-021 only:
- Login to SAP via `SAP_FIORI_URL` + credentials from `.env`
- Dismiss Guided Tour if shown
- Navigate to the app (Manage Purchase Orders)
- Execute every step of TC-CS-021 from `TC-CS-021.md` using Playwright MCP tools
- At the critical assertion step (where failure is expected): **capture actual SAP behavior** — record what SAP shows vs what the TC asserts
- Capture all element refs, dynamic behaviors, and SAP messages at every step
- Sign out
- Write:
  - `exploration-data/execution/{STORY_KEY}/TC-CS-021/TC-CS-021-execution.json`
  - `exploration-data/execution/{STORY_KEY}/TC-CS-021/TC-CS-021-locators.json`
  - `exploration-data/execution/{STORY_KEY}/{STORY_KEY}-exploration-summary.json`
- Update `exploration-data/selectors/{module}-{app}.selectors.json`

#### Phase 3b — Generate Scripts (Full Story)

Execute generate-scripts for the full story to ensure all TCs (including TC-CS-021) have automation coverage:
- Read `agents/automation-agent/skills/generate-scripts.md`
- Read `blueprints/POM-JavaScript-Blueprint.md`
- Read `prompts/generate-automation-scripts.md`
- Read exploration data from Phase 3a + existing exploration data for `{STORY_KEY}`
- Delete and regenerate all 5 automation files:
  - `test-registry/automation/pages/{module}/{app}/{app}.locators.js`
  - `test-registry/automation/pages/{module}/{app}/{app}.page.js`
  - `test-registry/automation/pages/{module}/{app}/{app}.fixtures.js`
  - `test-registry/automation/tests/{module}-{app}.spec.js` — include one `test()` block per TC; TC-CS-021 test must include the designed-to-fail assertion
  - `test-registry/automation/test-data/{module}-{app}.data.json`

Log:
```
Phase 3 — Automate: COMPLETE
  Explored : TC-CS-021 via Playwright MCP
  Generated: 5 automation files for {module}-{app}
  TC-CS-021 test block: included in spec.js with designed-to-fail assertion
```

---

### Phase 4 — Run Test (TC-CS-021 only)

22. Run:
    ```
    npx playwright test --config=test-registry/automation/config/playwright.config.js --grep "TC-CS-021"
    ```
23. Parse the output:
    - Capture: pass/fail status, error message, stack trace line, actual vs expected values
    - For TC-CS-021 (designed to fail): **FAIL is the expected outcome** — log it as `EXPECTED_FAIL`
24. Write `test-registry/automation/test-results/TC-CS-021-run-{timestamp}.json` with full output

Log:
```
Phase 4 — Run Test: COMPLETE
  TC-CS-021  FAIL (EXPECTED) — ASSERTION_FAILURE at spec:{line}
             Error: "{error message}"
             This TC is designed to fail — proceeding to Phase 5
```

> **Note:** A FAIL result here is correct and expected. The pipeline always continues to Phase 5, because Phase 5 (self-heal) will classify whether it is an app defect or a script bug.

---

### Phase 5 — Self-Heal (TC-CS-021)

Execute the self-healing skill for TC-CS-021:

25. Read `agents/self-healing-agent/agent.md`

#### Phase 5a — Analyze Failure

26. Read `agents/self-healing-agent/skills/analyze-failure.md` → execute all steps:
    - Load the Phase 4 test results for TC-CS-021
    - Parse error type: `ASSERTION_FAILURE` (expected for this TC)
    - Identify the failing assertion (containsPONumber / success notification check)
    - Cross-reference with Phase 3 exploration data (`TC-CS-021-execution.json`)
    - Write `self-healing/failures/{timestamp}-TC-CS-021-failure.json`

#### Phase 5b — Re-Execute via Playwright MCP (headed mode)

> **Browser mode:** Runs in headed mode (same as Phase 3a — controlled by `--headed` in `.mcp.json`).

27. Read `agents/self-healing-agent/skills/re-execute-scriptless.md` → execute all steps:
    - Login to SAP → navigate to app → execute all TC steps via MCP
    - At the critical assertion step: observe and record what SAP actually shows
    - **Expected finding:** SAP shows `role=alert` "Purchase order has been created." WITHOUT the 10-digit PO number → `sapBehavior = DIFFERENT`
    - Write `self-healing/re-executions/{timestamp}-TC-CS-021/TC-CS-021-reexecution.json`

#### Phase 5c — Decision

28. Evaluate re-execution result:
    - `reExecutionStatus = FAIL` AND `sapBehavior = DIFFERENT` → **APP_DEFECT detected**
    - Do NOT patch scripts (the assertion is correct — SAP behavior is the bug)
    - Set `recommendation = LOG_DEFECT`
    - Write failure summary

Log:
```
Phase 5 — Self-Heal: COMPLETE
  TC-CS-021  APP_DEFECT detected
             SAP alert text : "Purchase order has been created."
             Contains PO#   : false
             AC violated    : AC-6
  → Escalating to Phase 6 (Defect Logging)
  → Scripts NOT patched (assertion is correct; SAP behavior is the defect)
```

---

### Phase 6 — Log Defect (TC-CS-021)

Execute the defect logging skill for TC-CS-021:

29. Read `agents/defect-logging-agent/agent.md`

#### Phase 6a — Classify Failure

30. Read `agents/defect-logging-agent/skills/classify-failure.md` → execute all steps:
    - Load Phase 5 re-execution report
    - Load `TC-CS-021.md` → identify AC covered (e.g., AC-6)
    - Load `jira/userstories/{STORY_KEY}/{STORY_KEY}.json` → extract exact AC text
    - Compare SAP actual behavior vs AC text → **APP_DEFECT** (SAP violates AC)
    - Write `defects/{STORY_KEY}/TC-CS-021-{timestamp}-classification.json`

#### Phase 6b — Create Jira Bug

31. Read `agents/defect-logging-agent/skills/log-defect.md` → execute all steps:
    - Compose Bug summary: `[{MODULE}] TC-CS-021: {description} — {AC-N} violated`
    - Compose full Bug description: AC violated + steps to reproduce (with resolved test data) + expected vs actual + evidence table + SAP environment
    - Call `mcp__atlassian__createJiraIssue` → capture bug key (e.g., `CS-6`)
    - Call `mcp__atlassian__getIssueLinkTypes` → prefer "Defect" link, fallback "Relates"
    - Call `mcp__atlassian__createIssueLink` → link Bug to parent Story `{STORY_KEY}`
    - Call `mcp__atlassian__addCommentToJiraIssue` → notify on parent Story
    - Write `defects/{STORY_KEY}/TC-CS-021-{timestamp}-defect.json`

Log:
```
Phase 6 — Log Defect: COMPLETE
  Bug Key  : {PROJECT}-{NNN}
  Linked   : Bug → {STORY_KEY}
  Comment  : Added to {STORY_KEY}
  Jira URL : https://{JIRA_BASE_URL}/browse/{BUG_KEY}
```

---

### Final Report

After all six phases complete, print:

```
E2E Automation v2 | Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Story       : {STORY_KEY} — {story summary}
  Fixed TC    : TC-CS-021 — {TC title}
  Module      : {MODULE}

  Phase 1  Jira Import          : COMPLETE (re-fetched + replaced)
           Story JSON           : jira/userstories/{STORY_KEY}/{STORY_KEY}.json

  Phase 2  TestCase Pipeline    : COMPLETE
           TCs regenerated      : {n} (all replaced except TC-CS-021)
           TC-CS-021 preserved  : OK

  Phase 3  Automate             : COMPLETE
           MCP exploration      : TC-CS-021 executed
           Scripts generated    : {module}-{app} (5 files)

  Phase 4  Run Test             : EXPECTED FAIL
           TC-CS-021            : FAIL — ASSERTION_FAILURE (designed to fail)
           Error                : "{short error message}"

  Phase 5  Self-Heal            : APP_DEFECT confirmed
           SAP actual behavior  : {actual alert text}
           Scripts patched      : NO (assertion is correct)

  Phase 6  Defect Logged        : OK
           Jira Bug             : {BUG_KEY}
           Linked to            : {STORY_KEY}
           Jira URL             : {BUG_URL}

  Local artefacts:
    defects/{STORY_KEY}/TC-CS-021-{timestamp}-classification.json
    defects/{STORY_KEY}/TC-CS-021-{timestamp}-defect.json
    self-healing/failures/{timestamp}-TC-CS-021-failure.json
    self-healing/re-executions/{timestamp}-TC-CS-021/
    exploration-data/execution/{STORY_KEY}/TC-CS-021/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Pre-conditions

- `.env` must contain: `JIRA_PROJECT_KEY`, `JIRA_BASE_URL`, `SAP_FIORI_URL`, `SAP_USERNAME`, `SAP_PASSWORD`
- `TC-CS-021.md` must exist in `testcases/AI-generated testcases/{STORY_KEY}/testcases/`
- Playwright MCP server must be running (Phases 3, 5)
- Atlassian MCP must be connected (Phases 1, 6)

## Phase Failure Behaviour

| Failure | What Happens |
|---------|-------------|
| Phase 1 Jira MCP unavailable | Abort: `ERROR: Cannot re-fetch {STORY_KEY}. Atlassian MCP required for Phase 1. Start MCP and retry.` |
| Phase 2 testcase pipeline fails | Abort: `ERROR: TestCase pipeline failed for {STORY_KEY}. TC-CS-021 cannot be guaranteed safe.` |
| Phase 2 TC-CS-021 lost after restore | Abort: `ERROR: TC-CS-021.md restore failed. Check disk permissions.` |
| Phase 3 MCP unavailable | Abort: `ERROR: Playwright MCP required for exploration. Start MCP server and retry.` |
| Phase 4 PASS (unexpected) | Log warning: `TC-CS-021 passed unexpectedly — SAP behavior may have changed. Re-verify designed-to-fail assertion.` → continue to Phase 5 |
| Phase 5 AUTOMATION_BUG (unexpected) | Log warning: `Self-heal classified as AUTOMATION_BUG, but TC-CS-021 is designed to fail. Manual review required.` → stop before Phase 6 |
| Phase 6 Jira MCP unavailable | Write `defects/{STORY_KEY}/TC-CS-021-pending.json`; print defect details for manual creation |
| Duplicate defect found | Skip Jira creation; print: `Defect already exists: {existing BUG_KEY}` |

## Key Design Decisions

### Why is TC-CS-021 the fixed target?

TC-CS-021 is a specially crafted test case added outside the normal test generation flow. It validates the defect detection pipeline by asserting SAP behavior that deliberately violates an Acceptance Criterion. The testcase pipeline would overwrite or exclude it during regeneration, so Phase 2 snapshots and restores it after the pipeline runs. Hardcoding TC-CS-021 (rather than accepting a TC-ID argument) ensures every run of this command validates the same defect scenario consistently.

### Why is the Jira import never skipped?

This command is designed for complete end-to-end re-runs. Re-importing ensures the story data (ACs, linked issues, description) is always current, so generated test cases and defect reports reflect the latest Jira state rather than potentially stale cached data.

### Why are all other TCs regenerated and replaced?

Every run of this command should produce a fresh, up-to-date TC suite based on the current story content. Old TCs are replaced to prevent stale test coverage from persisting. TC-CS-021 is the only exception because it is a manually authored defect-detection TC, not a generated one.

### Why NOT patch scripts in Phase 5?

For TC-CS-021, the automation script assertion is **intentionally correct** — it tests whether SAP meets an AC that SAP currently fails. Patching the script to match SAP's wrong behavior would hide the real defect. The correct action is always to log a Jira Bug and leave the assertion unchanged.
