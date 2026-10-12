# Self-Healing Agent

## Purpose

The Self-Healing Agent activates when `npm test` (Playwright test runner) produces failures. It analyzes the failure, re-executes the failing test case via the Playwright MCP server to find what actually works, compares the two results, and applies targeted patches to the automation scripts. When re-execution reveals that the SAP application itself is misbehaving (not the scripts), it escalates to the Defect Logging Agent.

```
npm test fails  →  Self-Healing Agent  →  patch scripts (automation bug)
                                        OR escalate to Defect Logging Agent (app bug)
```

---

## Responsibilities

- **Analyze Playwright test runner failures** — parse error output, classify error type, locate the failing line in the spec and locators files
- **Re-execute failing TCs via MCP** — navigate SAP to the exact failing step and try multiple locator strategies to find what currently works
- **Perform gap analysis** — compare the locator/interaction used in the script vs what succeeds in MCP re-execution
- **Patch automation scripts** — apply targeted fixes to `locators.js`, `page.js`, or test data files
- **Escalate app defects** — when SAP itself returns wrong results, flag for defect logging rather than patching scripts
- **Record all healing activity** — write failure reports, re-execution records, and patch histories for traceability

---

## Skills

| Skill | Slash Command | Skill File | Output |
|-------|---------------|------------|--------|
| Analyze Failure | `/analyze-failure {TC-ID}` | `skills/analyze-failure.md` | `self-healing/failures/{timestamp}-{TC-ID}-failure.json` |
| Re-Execute Scriptless | `/re-execute-scriptless {TC-ID}` | `skills/re-execute-scriptless.md` | `self-healing/re-executions/{timestamp}-{TC-ID}/` |
| Patch Scripts | `/patch-scripts {TC-ID}` | `skills/patch-scripts.md` | Updated `test-registry/automation/` files + `self-healing/patches/{timestamp}-{TC-ID}-patch.md` |
| Full Heal Cycle | `/heal-failure {TC-ID}` | `.claude/commands/heal-failure.md` | Runs all 3 skills in sequence |

---

## Decision Logic

```
Playwright runner fails TC
  └─ /analyze-failure
       ├─ errorType = LOCATOR_FAILURE / TIMEOUT / ELEMENT_INVISIBLE → SELF_HEAL
       │     └─ /re-execute-scriptless
       │           ├─ SAP works (reExecutionStatus = PASS) → /patch-scripts
       │           └─ SAP fails (sapBehavior = DIFFERENT)  → /log-defect
       └─ errorType = APP_BUG (assertion mismatch with no locator issue) → escalate to /classify-failure
```

---

## Error Type Classification

| Error Type | Pattern | Typical Cause |
|------------|---------|---------------|
| `LOCATOR_FAILURE` | "strict mode violation", "getBy" timeout, "resolved to 0 elements" | Stale or ambiguous locator |
| `TIMEOUT_ERROR` | "Timeout NNNNNms exceeded", "waitForSelector" | SAP slow response; wait too short |
| `ELEMENT_INVISIBLE` | "element is not visible", "hidden" | Element present but off-screen or behind overlay |
| `ELEMENT_DISABLED` | "element is disabled", "not enabled" | Element present but not interactable |
| `ASSERTION_FAILURE` | `expect(...).toBe`, `toContain` failed | Wrong expected value or app changed behavior |
| `NAVIGATION_FAILURE` | "page.goto", "net::ERR", "navigation timeout" | SAP URL unreachable or session expired |
| `UNKNOWN` | No pattern match | Needs manual investigation |

---

## Inputs

| Input | Source | Required |
|-------|--------|---------|
| Playwright test output | `test-registry/automation/test-results/` or pasted stdout | Mandatory |
| Failing spec file | `test-registry/test-registry/automation/tests/{module}-{app}.spec.js` | Mandatory |
| Failing locators file | `test-registry/test-registry/automation/pages/{module}/{app}/{app}.locators.js` | Mandatory |
| Exploration data | `exploration-data/execution/{KEY}/{TC-ID}/{TC-ID}-execution.json` | Recommended |
| Test case file | `testcases/AI-generated testcases/{KEY}/testcases/{TC-ID}.md` | Required for re-execution |
| Test data | `test-registry/test-registry/automation/test-data/{module}-{app}.data.json` | Required for re-execution |

---

## Outputs

| Path | Description |
|------|-------------|
| `self-healing/failures/{timestamp}-{TC-ID}-failure.json` | Failure analysis: error type, failing step, locator used, recommendation |
| `self-healing/re-executions/{timestamp}-{TC-ID}/{TC-ID}-reexecution.json` | Re-execution result: tried locators, working locator, SAP behavior |
| `self-healing/patches/{timestamp}-{TC-ID}-patch.md` | Patch record: what changed, why, verification command |
| Updated `test-registry/test-registry/automation/pages/{module}/{app}/{app}.locators.js` | Fixed locator primary + demoted fallback |
| Updated `test-registry/test-registry/automation/pages/{module}/{app}/{app}.page.js` | Fixed wait strategy or interaction pattern |
| Updated `test-registry/test-registry/automation/test-data/{module}-{app}.data.json` | Fixed expected value (if assertion issue) |

---

## Configuration

Config file: `agents/self-healing-agent/config/healing.config.js`

| Variable | Description |
|----------|-------------|
| `SAP_FIORI_URL` | SAP login URL for MCP re-execution |
| `SAP_USERNAME` | SAP credentials |
| `SAP_PASSWORD` | SAP credentials |

---

## MCP Dependency

The `re-execute-scriptless` skill requires the **Playwright MCP server** to be running. The `analyze-failure` and `patch-scripts` skills work without MCP (file-based only).

---

## How to Invoke

### Full healing cycle (recommended)

```
/heal-failure TC-CS-001          # Analyze → re-execute → patch (or escalate)
```

### Individual skills

```
/analyze-failure TC-CS-001       # Analyze failure only (no MCP needed)
/re-execute-scriptless TC-CS-001 # Re-execute only (requires MCP)
/patch-scripts TC-CS-001         # Patch only (requires prior re-execution report)
```

### After patching, verify

```
npx playwright test --config=test-registry/automation/config/playwright.config.js --grep "TC-CS-001"
```

---

## Integration with Other Agents

- **Automation Agent** — provides `exploration-data/execution/` used as baseline in gap analysis
- **Defect Logging Agent** — receives escalation when re-execution reveals SAP app defect; reads `self-healing/re-executions/` as evidence
