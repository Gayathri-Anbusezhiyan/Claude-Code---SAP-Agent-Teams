# /v1-pipeline

Run the Version 1 pipeline — from importing user stories all the way to generating ready-to-execute automation scripts. Covers Phases 1 through 4 of the full pipeline.

## Usage

```
/v1-pipeline           → Run for all stories in the Jira project
/v1-pipeline {KEY}     → Run for one story only (e.g., CS-2)
```

## Pipeline Phases

```
Phase 1  →  Phase 2  →  Phase 3  →  Phase 4
Jira        TestCase    Scriptless  Generate
Import      Pipeline    Explore     Scripts
```

| Phase | What Happens | Output |
|-------|-------------|--------|
| **1 — Jira Import** | Fetch Epics + Stories from the Jira project | `test-registry/jira/userstories/`, `test-registry/jira/epics/`, `test-registry/jira/index.json` |
| **2 — TestCase Pipeline** | Analyse story + define strategy + generate TCs + extract test data | `test-registry/jira/.../strategy/`, `test-registry/testcases/AI-generated testcases/`, `test-registry/testdata/` |
| **3 — Scriptless Explore** | Execute each TC via Playwright MCP, capture real element refs, dynamic popups, SAP behaviors | `test-registry/exploration-data/execution/{KEY}/` |
| **4 — Generate Scripts** | Generate all 5 automation files from exploration data | `test-registry/automation/pages/`, `test-registry/automation/tests/`, `test-registry/automation/test-data/` |

## Instructions

1. Read `.env` → extract `JIRA_PROJECT_KEY`. If empty → stop: `ERROR: JIRA_PROJECT_KEY not set in .env`
2. Read `ai-engine/agents/e2e-pipeline-agent/agent.md` for orchestration context

**Phase 1** — Jira Import
- If `{KEY}` provided and `test-registry/jira/userstories/{KEY}/{KEY}.json` already exists → skip Phase 1; use cached story
- Otherwise: read and follow `ai-engine/agents/jira-agent/skills/fetch-epics.md` (all steps), then `ai-engine/agents/jira-agent/skills/fetch-userstories.md` (all steps)
- Build `STORY_LIST` from `test-registry/jira/index.json` (Stories only; exclude Won't Do / Duplicate)
- Gate: verify `totalStories > 0` before proceeding

**Phase 2** — TestCase Pipeline (repeat for each story in STORY_LIST)
- Read and follow `ai-engine/agents/test-strategy-agent/skills/analyze-userstory.md` (all steps)
- Verify `{KEY}-analysis.md` + `{KEY}-risk-profile.json` written before continuing
- Read and follow `ai-engine/agents/test-strategy-agent/skills/define-test-strategy.md` (all steps)
- Verify `{KEY}-strategy.md` written before continuing
- Read and follow `ai-engine/agents/testcase-agent/skills/generate-testcases.md` (all steps)
- Read and follow `ai-engine/agents/testcase-agent/skills/extract-testdata.md` (all steps)
- Verify TC files + `{KEY}-summary.json` + `{KEY}-testdata.json` written before proceeding

**Phase 3** — Scriptless Exploration (Automation Agent)
- Read `.env` → get `SAP_FIORI_URL`, `SAP_USERNAME`, `SAP_PASSWORD`
- Read and follow `ai-engine/agents/automation-agent/skills/explore-and-capture.md` (all steps) for each story
- Skip TCs with unresolved `{{PLACEHOLDER}}` values; log as SKIPPED
- Verify `{KEY}-exploration-summary.json` written before proceeding

**Phase 4** — Generate Scripts (Automation Agent)
- Read `ai-engine/blueprints/POM-JavaScript-Blueprint.md` and `ai-engine/prompts/generate-automation-scripts.md`
- Read and follow `ai-engine/agents/automation-agent/skills/generate-scripts.md` (all steps) for each story
- Delete existing automation files before generating — always regenerate from scratch
- Verify all 5 output files written

3. Print pipeline completion report

## Pre-conditions

- `.env` must have: `JIRA_PROJECT_KEY`, `JIRA_BASE_URL`, `SAP_FIORI_URL`, `SAP_USERNAME`, `SAP_PASSWORD`
- Atlassian MCP must be connected (Phase 1)
- Playwright MCP server must be running (Phase 3)

## Output

```
Phase 1  →  test-registry/jira/userstories/ + test-registry/jira/epics/ + test-registry/jira/index.json
Phase 2  →  test-registry/jira/.../strategy/ + test-registry/testcases/AI-generated testcases/ + test-registry/testdata/
Phase 3  →  test-registry/exploration-data/execution/{KEY}/
Phase 4  →  test-registry/automation/pages/{module}/{app}/ + test-registry/automation/tests/ + test-registry/automation/test-data/
```

## Completion Report

```
V1 Pipeline Complete
  Story          : {KEY} — {storySummary}
  TCs generated  : {n} (HP:{n} AP:{n} NEG:{n} ERR:{n} EDGE:{n})
  TCs explored   : {n} ({n} skipped — unresolved placeholders)
  Scripts        : locators.js + page.js + fixtures.js + spec.js + data.json

Next step: /run-tests {KEY}
```

## Phase Failure Behaviour

| Failure | What Happens |
|---------|-------------|
| Phase 1 fails | Abort |
| Phase 2 fails for a story | Skip that story in Phases 3 and 4; continue with others |
| Phase 3 MCP unavailable | Skip Phase 3; Phase 4 generates scripts with TODO placeholder locators |
| Phase 4 blueprint missing | Abort Phase 4: "ai-engine/blueprints/POM-JavaScript-Blueprint.md not found" |

## Next Step

Once scripts are generated, run them:
```
/run-tests {KEY}
```
