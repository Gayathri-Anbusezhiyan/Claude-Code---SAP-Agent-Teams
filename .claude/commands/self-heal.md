# /self-heal

Automatically fix a failing Playwright test case. Runs three steps in sequence: analyze the failure, re-execute the TC via Playwright MCP to find what actually works in SAP, then patch the automation scripts. If re-execution reveals the SAP application itself is broken (not the script), escalates with a recommendation to log a defect.

## Usage

```
/self-heal {TC-ID}
```

Example: `/self-heal TC-CS-001`

## Instructions

1. Read `ai-engine/agents/self-healing-agent/agent.md` for agent context
2. Read `.env` → get `SAP_FIORI_URL`, `SAP_USERNAME`, `SAP_PASSWORD`

**Step 1 — Analyze Failure**
Execute all steps in `ai-engine/agents/self-healing-agent/skills/analyze-failure.md`:
- Find the most recent test results in `test-registry/automation/test-results/` for `$ARGUMENTS`
  - If no results file found: ask the user to paste the Playwright failure output
- Parse error message + stack trace → identify failing method + locator used
- Classify error type: `LOCATOR_FAILURE` / `TIMEOUT_ERROR` / `ELEMENT_INVISIBLE` / `ELEMENT_DISABLED` / `ASSERTION_FAILURE` / `NAVIGATION_FAILURE`
- Cross-reference against `test-registry/exploration-data/execution/{KEY}/$ARGUMENTS/$ARGUMENTS-execution.json` (if available)
- Write: `test-registry/self-healing/failures/{timestamp}-$ARGUMENTS-failure.json`

**Step 2 — Re-Execute via Playwright MCP**
Execute all steps in `ai-engine/agents/self-healing-agent/skills/re-execute-scriptless.md`:
- Login to SAP → navigate to app → execute all steps up to the failing step
- At the failing step: try 7 locator strategies in order (original → exploration → fallbacks → role exact → CSS partial ID → aria-label → text content)
- Record which strategy succeeds and the working element ref
- Continue to end of TC and check if SAP produces the correct final result
- Write: `test-registry/self-healing/re-executions/{timestamp}-$ARGUMENTS/{TC-ID}-reexecution.json`

**Step 3 — Decide and Act**

If `recommendation = PATCH_SCRIPTS` (re-execution passed — automation bug):
- Execute all steps in `ai-engine/agents/self-healing-agent/skills/patch-scripts.md`
- Perform gap analysis: old locator vs working locator
- Apply minimal targeted fix:
  - `LOCATOR_UPDATE` → update `{app}.locators.js`: set new primary, demote old to fallback[0]
  - `WAIT_UPDATE` → update `{app}.page.js`: increase timeout or fix wait strategy
  - `ASSERTION_UPDATE` → update `{module}-{app}.data.json`: correct expected value
- Write: `test-registry/self-healing/patches/{timestamp}-$ARGUMENTS-patch.md`
- Print verification command: `npx playwright test --grep "$ARGUMENTS"`

If `recommendation = LOG_DEFECT` (re-execution also failed — SAP is broken):
- Print:
  ```
  SAP application defect detected.
  Re-execution failed: SAP returned wrong result at step {N}.
  → Run /log-defect $ARGUMENTS to create a Jira Bug.
  ```
- Do NOT patch scripts.

3. Report final outcome

## Pre-conditions

- `/run-tests` must have been run and produced a failure
- Playwright MCP server must be running (needed for Step 2 re-execution)
- Automation scripts must exist in `test-registry/automation/`

## Output

```
test-registry/self-healing/failures/{timestamp}-{TC-ID}-failure.json         ← Error classification
test-registry/self-healing/re-executions/{timestamp}-{TC-ID}/                ← What works in SAP
test-registry/self-healing/patches/{timestamp}-{TC-ID}-patch.md              ← What was fixed + verify command
Updated: test-registry/automation/pages/{module}/{app}/{app}.locators.js     ← (if LOCATOR_UPDATE)
Updated: test-registry/automation/pages/{module}/{app}/{app}.page.js         ← (if WAIT/INTERACTION_UPDATE)
Updated: test-registry/automation/test-data/{module}-{app}.data.json         ← (if ASSERTION_UPDATE)
```

## Next Step

After patching:
```
/run-tests {TC-ID}      → Verify the fix
```

If app defect detected:
```
/log-defect {TC-ID}     → Log Jira defect
```
