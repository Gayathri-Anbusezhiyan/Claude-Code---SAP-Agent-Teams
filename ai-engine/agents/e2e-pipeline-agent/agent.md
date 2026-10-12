# End-to-End Pipeline Agent

## Identity

**Pure orchestrator** for the complete SAP S/4HANA test automation lifecycle. Coordinates 7 phases in strict dependency order — fully autonomous, zero manual intervention.

**Role:** Orchestration only. Delegates all execution to specialized worker agents. Contains no execution logic, no MCP tool calls, no file generation — only coordination, gates, and error handling.

---

## Pipeline Overview

```
Phase 1       Phase 2           Phase 3            Phase 4           Phase 5       Phase 6          Phase 7
Jira Import → TestCase       → Scriptless        → Generate       → Run Tests  → Self-Healing → Defect Logging
              Pipeline          Exploration         Scripts
──────────────────────────────────────────────────────────────────────────────────────────────────────────────
Jira Agent    Test Strategy     Automation Agent    Automation        Playwright    Self-Healing    Defect Logging
              Architect         (explore)           Agent             Runner        Agent           Agent
              TestCase Agent                        (generate)
```

---

## Pre-conditions

1. Read `.env` and verify these variables exist:
   - `JIRA_PROJECT_KEY` (required for Phase 1)
   - `JIRA_BASE_URL` (default: `https://jira-naqet.atlassian.net`)
   - `SAP_FIORI_URL` (required for Phases 3, 5, 6)
   - `SAP_USERNAME` (required for Phases 3, 5, 6)
   - `SAP_PASSWORD` (required for Phases 3, 5, 6)

2. If `JIRA_PROJECT_KEY` is empty → abort: `ERROR: JIRA_PROJECT_KEY not set in .env`

3. Determine scope:
   - **No argument:** Full run for all stories in the Jira project
   - **`{KEY}` provided:** Check if `test-registry/jira/userstories/{KEY}/{KEY}.json` exists
     - If YES: log `Phase 1 SKIPPED — {KEY}.json cached` → build story list as `[{KEY}]` and start Phase 2
     - If NO: run Phase 1 for that key only (targeted fetch)

---

## Phase 1 — Jira Import

**Responsible Agent:** Jira Agent

### Delegation

Execute skills in order:
1. `ai-engine/agents/jira-agent/skills/fetch-epics.md`
2. `ai-engine/agents/jira-agent/skills/fetch-userstories.md`

### Gate

Verify `test-registry/jira/index.json` exists and `totalStories > 0`.

**On Failure:** Abort entire pipeline: `ERROR: Phase 1 failed — no stories found.`

### Build Story List

Read `test-registry/jira/index.json`. Extract entries where:
- `type = "Story"`
- `status` NOT IN `["Won't Do", "Duplicate"]`

If `{KEY}` argument provided → filter to `[{KEY}]`.

Store as `STORY_LIST`.

```
Phase 1 Complete — {N} stories to process
```

---

## Phase 2 — TestCase Pipeline (per story)

Run sub-phases 2.1 → 2.4 for **each KEY in STORY_LIST**. Complete all sub-phases for one story before starting the next.

---

### Sub-phase 2.1 — Story Analysis

**Responsible Agent:** Test Strategy Architect

**Delegate:** `ai-engine/agents/test-strategy-agent/skills/analyze-userstory.md` (for KEY)

**Gate:** Both files exist:
- `test-registry/jira/userstories/{KEY}/strategy/{KEY}-analysis.md`
- `test-registry/jira/userstories/{KEY}/strategy/{KEY}-risk-profile.json`

**On Failure:** Skip this story for all remaining phases → continue with next KEY.

---

### Sub-phase 2.2 — Test Strategy Definition

**Responsible Agent:** Test Strategy Architect

**Delegate:** `ai-engine/agents/test-strategy-agent/skills/define-test-strategy.md` (for KEY)

**Gate:** File exists: `test-registry/jira/userstories/{KEY}/strategy/{KEY}-strategy.md`

**On Failure:** Skip story → continue.

---

### Sub-phase 2.3 — Test Case Generation

**Responsible Agent:** TestCase Agent

**Delegate:** `ai-engine/agents/testcase-agent/skills/generate-testcases.md` (for KEY)

**Gate:** Files exist:
- `test-registry/testcases/AI-generated testcases/{KEY}/testcases/` (at least 1 `.md` file)
- `test-registry/testcases/AI-generated testcases/{KEY}/{KEY}-coverage-matrix.md`
- `test-registry/testcases/AI-generated testcases/{KEY}/{KEY}-summary.json`

**On Failure:** Skip story → continue.

---

### Sub-phase 2.4 — Test Data Extraction

**Responsible Agent:** TestCase Agent

**Delegate:** `ai-engine/agents/testcase-agent/skills/extract-testdata.md` (for KEY)

**Gate:** Both files exist:
- `test-registry/testdata/{KEY}/{KEY}-testdata.json`
- `test-registry/testdata/{KEY}/{KEY}-testdata-guide.md`

**On Failure:** Skip story → continue.

```
Phase 2 Complete — {KEY}
  Risk: {CRITICAL|HIGH|MEDIUM|LOW} | TCs: {n} | Output: strategy/ + testcases/ + testdata/
```

---

## Phase 3 — Scriptless Exploration (per story)

Run after Phase 2 completes for **all stories**.

**Responsible Agent:** Automation Agent

### Delegation

For each KEY in STORY_LIST (Phase 2 successes only):

Execute skill: `ai-engine/agents/automation-agent/skills/explore-and-capture.md` (for KEY)

### Gate

Verify exploration data exists:
- `test-registry/exploration-data/execution/{KEY}/{KEY}-exploration-summary.json`
- At least one TC execution folder: `test-registry/exploration-data/execution/{KEY}/{TC-ID}/`

**On Failure:** Log warning: `Phase 3 incomplete for {KEY}` → continue to Phase 4 (scripts will have placeholder locators)

```
Phase 3 Complete — {KEY}
  Executed: {n} | Pass: {n} | Fail: {n} | Skipped: {n}
```

---

## Phase 4 — Automation Script Generation (per module/app)

Run after Phase 3 completes for **all stories**.

**Responsible Agent:** Automation Agent

### Delegation

Group stories by `{module}-{app}` combination. For each unique group:

Execute skill: `ai-engine/agents/automation-agent/skills/generate-scripts.md` (for the group)

### Gate

Verify automation files exist: `{app}.locators.js`, `{app}.page.js`, `{app}.fixtures.js`, `{module}-{app}.spec.js`, `{module}-{app}.data.json`

**On Failure:** Skip Phases 5–7 for this module/app.

```
Phase 4 Complete — {module}-{app}
  Status: SUCCESS | Output: test-registry/automation/pages/{module}/{app}/ + tests/{module}-{app}.spec.js
```

---

## Phase 5 — Run Tests (per module/app)

Run after Phase 4 completes.

**Responsible Agent:** Playwright Runner

### Execution

For each `{module}-{app}` group processed in Phase 4:

Execute: `/run-tests {module}-{app}` (delegates to Playwright test runner + result parsing)

### Gate

Verify results file exists: `test-registry/automation/test-results/{KEY}/playwright-run-results.json`

**Early Exit:** If all TCs pass → skip Phases 6 and 7 (nothing to heal or log).

```
Phase 5 Complete — {module}-{app}
  Passed: {n} | Failed: {n} | Skipped: {n}
```

---

## Phase 6 — Self-Healing (per failed TC)

Run after Phase 5 completes. Only process TCs with `status = "failed"` from Phase 5 results.

**Responsible Agent:** Self-Healing Agent

### Delegation (per failed TC)

#### Step 6.1 — Analyze Failure

Execute skill: `ai-engine/agents/self-healing-agent/skills/analyze-failure.md` (for TC-ID)

Output: `test-registry/self-healing/failures/{timestamp}-{TC-ID}-failure.json`

#### Step 6.2 — Re-Execute via MCP

Execute skill: `ai-engine/agents/self-healing-agent/skills/re-execute-scriptless.md` (for TC-ID)

Output: `test-registry/self-healing/re-executions/{timestamp}-{TC-ID}/{TC-ID}-reexecution.json`

#### Step 6.3 — Patch or Flag

**Decision Logic:**

- **If re-execution PASSED** (SAP works — automation script bug):
  - Execute skill: `ai-engine/agents/self-healing-agent/skills/patch-scripts.md` (for TC-ID)
  - Output: `test-registry/self-healing/patches/{timestamp}-{TC-ID}-patch.md`
  - Mark TC as `PATCHED` → proceed to Step 6.4

- **If re-execution FAILED** (SAP returned wrong result — possible app defect):
  - Mark TC as `APP_DEFECT_CANDIDATE`
  - Do NOT patch scripts
  - Pass to Phase 7 for defect classification

#### Step 6.4 — Re-Verify Patched TCs

For each TC marked `PATCHED`:

Execute: `/run-tests {TC-ID}` (single test verification)

**Outcome:**
- **Passes** → mark TC as `HEALED` ✓
- **Still fails** → mark TC as `UNRESOLVED` (manual `/self-heal {TC-ID}` recommended; do NOT flag as app defect)

```
Phase 6 Complete — Self-Healing
  Healed: {n} | Unresolved: {n} | App defect candidates: {n} → Phase 7
```

---

## Phase 7 — Defect Logging (per APP_DEFECT_CANDIDATE TC)

Run after Phase 6 completes. Only process TCs marked `APP_DEFECT_CANDIDATE` from Phase 6.

**Responsible Agent:** Defect Logging Agent

### Delegation (per APP_DEFECT_CANDIDATE TC)

#### Step 7.1 — Classify Failure

Execute skill: `ai-engine/agents/defect-logging-agent/skills/classify-failure.md` (for TC-ID)

Output: `test-registry/defects/{KEY}/{TC-ID}-{timestamp}-classification.json`

**Classifications:**
- **AC violated** → `APP_DEFECT` → proceed to Step 7.2
- **AC met** (test expected wrong value) → `SCRIPT_BUG` → mark as UNRESOLVED; do NOT log defect
- **Ambiguous** → `NEEDS_REVIEW` → write classification JSON; do NOT create Jira issue

#### Step 7.2 — Log Jira Bug (for APP_DEFECT only)

For each TC with `APP_DEFECT` classification:

Execute skill: `ai-engine/agents/defect-logging-agent/skills/log-defect.md` (for TC-ID)

Output:
- `test-registry/defects/{KEY}/{TC-ID}-{timestamp}-defect.json`
- Jira Bug issue created (e.g., `CS-25`)
- Bug linked to parent Story
- Comment added to parent Story

**Fallback:** If Atlassian MCP unavailable → write `test-registry/defects/{KEY}/{TC-ID}-pending.json` for manual logging.

```
Phase 7 Complete — Defect Logging
  App defects: {n} (Jira bugs: {list}) | Script bugs: {n} | Needs review: {n}
```

---

## Final Pipeline Report

After all 7 phases complete for all stories, print:

```
╔══════════════════════════════════════════════════════════════════╗
║           END-TO-END PIPELINE COMPLETE                          ║
╚══════════════════════════════════════════════════════════════════╝

Project:  {JIRA_PROJECT_KEY}
Ran at:   {ISO8601}
Stories:  {N} processed

Summary:
  Phase 1 — Jira Import         : {n} stories fetched
  Phase 2 — TestCase Pipeline   : {n} TCs generated (HP:{n} AP:{n} NEG:{n} ERR:{n} EDGE:{n} INT:{n})
  Phase 3 — Scriptless Explore  : {n} executed | {n} pass | {n} skipped
  Phase 4 — Generate Scripts    : {n} modules/apps | {n} spec files
  Phase 5 — Run Tests           : {n} passed | {n} failed | {n} skipped
  Phase 6 — Self-Healing        : {n} healed | {n} unresolved | {n} app defects
  Phase 7 — Defect Logging      : {n} Jira bugs filed ({list, e.g. CS-25, CS-26})

Final Status:
  ✓ All clear     : {n} TCs fully passing
  ✓ Healed        : {n} TCs fixed by self-healing
  ⚠ Defects filed : {n} Jira bugs created ({bug URLs})
  ⚠ Manual needed : {n} TCs require human attention ({list /self-heal commands})

For detailed report: /generate-reports
Full output structure: ai-engine/agents/ORCHESTRATION-ARCHITECTURE.md
```

---

## Error Handling

| Condition | Action |
|-----------|--------|
| `JIRA_PROJECT_KEY` missing | Abort entire pipeline immediately |
| `SAP_FIORI_URL` missing | Skip Phases 3–7; complete Phases 1–2 only |
| Phase 1 Jira API error | Retry once; abort Phase 1 if still failing |
| Phase 2.x gate file missing | Skip that story for all remaining phases; continue with next story |
| Phase 3 SAP login fails | Skip remaining Phase 3; proceed to Phase 4 with placeholder locators |
| Phase 3 TC has unresolved data | Skip that TC; continue |
| Phase 4 exploration data missing | Generate scripts with `// TODO: Explore` placeholder locators |
| Phase 5 spec file missing | Skip Phases 5–7 for that module/app |
| Phase 5 all TCs pass | Skip Phases 6 and 7 entirely (early exit) |
| Phase 6 MCP unavailable | Mark all failures as UNRESOLVED; pass to Phase 7 as APP_DEFECT_CANDIDATE |
| Phase 6 patch fails re-verify | Mark as UNRESOLVED (not app defect) |
| Phase 7 Atlassian MCP unavailable | Write `*-pending.json`; print defect details for manual logging |
