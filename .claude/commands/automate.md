# /automate

Generate production-ready Playwright automation scripts for a Jira story. Runs in two phases automatically:

**Phase 1 — Explore & Capture (Playwright MCP)**
Execute every test case against the live SAP system via the Playwright MCP server. At each step, capture real element refs, accessibility snapshots, dynamic popup handling (guided tour, messages dialog, discard confirm), auto-populated SAP field values, error messages, and wait behaviors. Store structured execution records in `exploration-data/execution/{KEY}/`.

**Phase 2 — Generate Scripts**
Read the captured exploration data and generate five automation files from scratch: `{app}.locators.js` (real selectors + fallbacks), `{app}.page.js` (all methods + SAP wait patterns + popup handlers), `{app}.fixtures.js`, `{module}-{app}.spec.js` (one test per TC with TC ID in title), and `{module}-{app}.data.json`. Always regenerates — never reuses stale files.

## Usage

```
/automate {KEY}
```

Example: `/automate CS-2`

## Instructions

1. Read `ai-engine/agents/automation-agent/agent.md` for agent context
2. Read `.env` → get `SAP_FIORI_URL`, `SAP_USERNAME`, `SAP_PASSWORD`, `JIRA_PROJECT_KEY`
3. Read `test-registry/testcases/AI-generated testcases/$ARGUMENTS/$ARGUMENTS-summary.json` → TC list
4. Read `test-registry/testdata/$ARGUMENTS/$ARGUMENTS-testdata.json` → resolved test data

**Phase 1 — Execute all steps in:** `ai-engine/agents/automation-agent/skills/explore-and-capture.md`
- Skip TCs with unresolved `{{PLACEHOLDER}}` values; log as SKIPPED
- For each executed TC: login → dismiss guided tour → navigate to app → execute every step → capture element refs, dynamic decisions, error messages, auto-populated values → sign out
- Write: `test-registry/exploration-data/execution/$ARGUMENTS/{TC-ID}/{TC-ID}-execution.json` + step snapshots
- Write: `test-registry/exploration-data/execution/$ARGUMENTS/$ARGUMENTS-exploration-summary.json`
- Update: `test-registry/exploration-data/selectors/{module}-{app}.selectors.json`

**Phase 2 — Execute all steps in:** `ai-engine/agents/automation-agent/skills/generate-scripts.md`
- Read `ai-engine/blueprints/POM-JavaScript-Blueprint.md` and `ai-engine/prompts/generate-automation-scripts.md`
- Delete existing output files before generating
- Generate: `test-registry/automation/pages/{module}/{app}/{app}.locators.js`
- Generate: `test-registry/automation/pages/{module}/{app}/{app}.page.js`
- Generate: `test-registry/automation/pages/{module}/{app}/{app}.fixtures.js`
- Generate: `test-registry/automation/tests/{module}-{app}.spec.js`
- Generate: `test-registry/automation/test-data/{module}-{app}.data.json`

5. Report: exploration summary (TCs executed/skipped) + scripts generated (files + TC counts)

## Pre-conditions

- Test cases must exist — run `/testcase-pipeline {KEY}` first if not
- Playwright MCP server must be running (for Phase 1)

## Output

```
test-registry/exploration-data/execution/{KEY}/          ← Phase 1 captures
test-registry/automation/pages/{module}/{app}/           ← Phase 2 scripts
test-registry/automation/tests/{module}-{app}.spec.js
test-registry/automation/test-data/{module}-{app}.data.json
```

## Next Step

```
/run-tests {KEY}
```
