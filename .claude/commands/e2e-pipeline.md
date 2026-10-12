# /e2e-pipeline

Run the complete end-to-end SAP test automation pipeline — fully autonomous, zero manual steps. Covers all seven phases: Jira import → test case generation → scriptless exploration → script generation → test execution → self-healing → defect logging.

## Usage

```
/e2e-pipeline           → Full run for all stories in the Jira project
/e2e-pipeline {KEY}     → Full pipeline for one story only (e.g., CS-2)
```

## Pipeline Phases

```
Phase 1  →  Phase 2  →  Phase 3  →  Phase 4  →  Phase 5  →  Phase 6      →  Phase 7
Jira        TestCase    Scriptless  Generate    Run Tests   Self-Healing     Defect
Import      Pipeline    Explore     Scripts     (runner)    (auto-fix)       Logging
```

| Phase | What Happens | Output |
|-------|-------------|--------|
| **1 — Jira Import** | Fetch Epics + Stories from Jira project | `test-registry/jira/userstories/`, `test-registry/jira/epics/`, `test-registry/jira/index.json` |
| **2 — TestCase Pipeline** | Analyse story + define strategy + generate TCs + extract test data | `test-registry/jira/.../strategy/`, `test-registry/testcases/`, `test-registry/testdata/` |
| **3 — Scriptless Explore** | Execute TCs via Playwright MCP, capture real element refs, popups, SAP behaviors | `test-registry/exploration-data/execution/{KEY}/` |
| **4 — Generate Scripts** | Generate locators.js + page.js + fixtures.js + spec.js + data.json | `test-registry/automation/pages/`, `test-registry/automation/tests/` |
| **5 — Run Tests** | Execute generated scripts via Playwright test runner, collect pass/fail per TC | `test-registry/automation/test-results/{KEY}/playwright-run-results.json` |
| **6 — Self-Healing** | For each failure: analyze → re-execute via MCP → patch scripts (if script bug) → re-verify. Flag app defects for Phase 7. | `test-registry/self-healing/`, updated `test-registry/automation/` files |
| **7 — Defect Logging** | For confirmed app defects from Phase 6: create Jira Bug linked to story + add comment | `test-registry/defects/{KEY}/`, Jira Bug issues |

Each phase verifies its output before the next begins. A phase failure for one story skips that story but does not stop the pipeline.

## Instructions

1. Read `.env` → extract `JIRA_PROJECT_KEY`. If empty → stop: `ERROR: JIRA_PROJECT_KEY not set in .env`
2. Read `ai-engine/agents/e2e-pipeline-agent/agent.md` for complete orchestration logic
3. Execute **all 7 phases** defined in `ai-engine/agents/e2e-pipeline-agent/agent.md` exactly as specified, in order:

**Phase 1** — Jira Import (Jira Agent)
- If `{KEY}` provided and `test-registry/jira/userstories/{KEY}/{KEY}.json` exists → skip (use cached)
- Otherwise: fetch Epics + Stories via `mcp__atlassian__searchJiraIssuesUsingJql`
- Build `STORY_LIST` from `test-registry/jira/index.json`

**Phase 2** — TestCase Pipeline (Test Strategy Architect + TestCase Agent)
- For each story: analyze → strategy → generate TCs → extract test data
- Verify all output files before proceeding

**Phase 3** — Scriptless Exploration (Automation Agent — `explore-and-capture` skill)
- Execute each TC via Playwright MCP; capture element refs, popup patterns, SAP behaviors
- Skip TCs with unresolved `{{PLACEHOLDER}}` values; write story exploration summary

**Phase 4** — Generate Scripts (Automation Agent — `generate-scripts` skill)
- Read exploration data + blueprints → generate all 5 automation files per module/app
- Always delete and recreate — never reuse stale files

**Phase 5** — Run Tests (Playwright test runner)
- Run `npx playwright test test-registry/automation/tests/{module}-{app}.spec.js --config=test-registry/automation/config/playwright.config.js`
- Parse results: pass/fail per TC + classify error type per failure
- Write `test-registry/automation/test-results/{KEY}/playwright-run-results.json`
- If all TCs pass → skip Phases 6 and 7

**Phase 6** — Self-Healing (Self-Healing Agent — for each failed TC)
- **Step 6.1 — Analyze:** read failure from Phase 5 results; classify error type; cross-reference exploration data
- **Step 6.2 — Re-Execute:** navigate SAP via Playwright MCP to the exact failing step; try 7 locator strategies to find what works
- **Step 6.3 — Decision:**
  - SAP works in MCP (re-execution PASS) → **patch scripts** (update locators.js / page.js / data.json) → write `test-registry/self-healing/patches/`
  - SAP also fails (re-execution FAIL, behavior wrong) → flag TC as **APP_DEFECT** → pass to Phase 7
- **Step 6.4 — Re-verify:** for each patched TC, re-run with `npx playwright test --grep "{TC-ID}"` to confirm the fix
  - Passes → mark as HEALED
  - Still fails → mark as UNRESOLVED → recommend manual review
- Write `test-registry/self-healing/failures/`, `test-registry/self-healing/re-executions/`, `test-registry/self-healing/patches/`

**Phase 7** — Defect Logging (Defect Logging Agent — for APP_DEFECT TCs from Phase 6)
- For each TC flagged as APP_DEFECT:
  - Compare SAP actual behavior vs story Acceptance Criteria
  - AC violated → create Jira Bug: summary + repro steps + expected vs actual + evidence
  - Call `mcp__atlassian__createJiraIssue` → capture bug key
  - Call `mcp__atlassian__createIssueLink` → link Bug to parent Story
  - Call `mcp__atlassian__addCommentToJiraIssue` → notify on parent Story
  - Write `test-registry/defects/{KEY}/{TC-ID}-{timestamp}-defect.json`

4. Print final 7-phase pipeline report when all phases complete

## Pre-conditions

- `.env` must have: `JIRA_PROJECT_KEY`, `JIRA_BASE_URL`, `SAP_FIORI_URL`, `SAP_USERNAME`, `SAP_PASSWORD`
- Playwright MCP server must be running (Phases 3, 6)
- Atlassian MCP must be connected (Phases 1, 7)

## Output Summary

```
Phase 1  →  test-registry/jira/userstories/ + test-registry/jira/epics/ + test-registry/jira/index.json
Phase 2  →  test-registry/jira/.../strategy/ + test-registry/testcases/AI-generated testcases/ + test-registry/testdata/
Phase 3  →  test-registry/exploration-data/execution/{KEY}/
Phase 4  →  test-registry/automation/pages/ + test-registry/automation/tests/ + test-registry/automation/test-data/
Phase 5  →  test-registry/automation/test-results/{KEY}/playwright-run-results.json
Phase 6  →  test-registry/self-healing/failures/ + re-executions/ + patches/ + updated test-registry/automation/ files
Phase 7  →  test-registry/defects/{KEY}/ + Jira Bug issues
```

## Phase Failure Behaviour

| Failure | What Happens |
|---------|-------------|
| Phase 1 fails | Abort (no stories to process) |
| Phase 2 fails for one story | Skip that story in all remaining phases; continue with others |
| Phase 3 — MCP unavailable | Skip Phase 3; Phase 4 generates scripts with TODO placeholder locators |
| Phase 5 — all tests pass | Skip Phases 6 and 7 (nothing to heal or log) |
| Phase 5 — Playwright not installed | Log error; skip Phases 5–7; print manual run command |
| Phase 6 — MCP unavailable for re-execution | Mark all failures as UNRESOLVED; pass all to Phase 7 for defect logging |
| Phase 6 — patch applied but re-verify still fails | Mark TC as UNRESOLVED; do NOT flag as app defect; recommend manual `/self-heal` |
| Phase 7 — Atlassian MCP unavailable | Write `test-registry/defects/{KEY}/{TC-ID}-pending.json`; print defect details for manual Jira creation |

## Individual Phase Commands

Need to run a single phase or re-run one step?

```
/jira-import-all          → Phase 1 only
/testcase-pipeline {KEY}  → Phase 2 only
/run-scriptless {KEY}     → Phase 3 only (execution-focused, with result reporting)
/automate {KEY}           → Phase 3 + 4 combined
/run-tests {KEY}          → Phase 5 only
/self-heal {TC-ID}        → Phase 6 for a single TC
/log-defect {TC-ID}       → Phase 7 for a single TC
```
