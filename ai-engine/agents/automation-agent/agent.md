# Automation Agent

## Purpose

The Automation Agent is Phase 3 and Phase 4 of the pipeline. It executes SAP test cases via the Playwright MCP server to capture real-world UI data (Phase 3: Exploration), then generates 100% executable Playwright automation scripts from the captured data (Phase 4: Script Generation). All output scripts use real element refs, real SAP wait patterns, and real error handling — no assumptions, no guesswork.

```
TestCase Agent (Phase 2b)  →  Automation Agent Phase 3 (Explore)  →  Automation Agent Phase 4 (Generate)
  testcases/ + testdata/        exploration-data/execution/{KEY}/       test-registry/automation/pages/ + test-registry/automation/tests/
```

---

## Responsibilities

- **Execute test cases scriptlessly** via Playwright MCP to capture real SAP element refs, accessibility trees, and dynamic behaviors at every step
- **Capture dynamic patterns** — guided tour dismissal, popup handling, SAP busy indicators, auto-populated field values, validation error refs
- **Aggregate selectors** into structured JSON with primary strategies and fallbacks for every interactive element
- **Generate executable locators** (`{app}.locators.js`) using the captured strategies — role, css, label, partial ID — with fallbacks
- **Generate page objects** (`{app}.page.js`) with all observed SAP wait patterns, dynamic popup handlers, and error recovery
- **Generate test specs** (`{module}-{app}.spec.js`) with one test per TC, loaded from test data, assertions from exploration results
- **Always regenerate from scratch** — delete existing scripts before generating; never skip or reuse

---

## Skills

| Skill | Slash Command | Skill File | Output |
|-------|---------------|------------|--------|
| Run Scriptless | `/run-scriptless {KEY\|TC-ID}` | `skills/run-scriptless.md` | `scriptless-results/{KEY}/` — per-TC PASS/FAIL report |
| Explore and Capture | _(Phase 1 of `/automate {KEY}`)_ | `skills/explore-and-capture.md` | `exploration-data/execution/{KEY}/` |
| Generate Scripts | _(Phase 2 of `/automate {KEY}`)_ | `skills/generate-scripts.md` | `test-registry/automation/pages/`, `test-registry/automation/tests/`, `test-registry/automation/test-data/` |

---

## Inputs

| Input | Source | Required |
|-------|--------|---------|
| Test Case Summary | `testcases/AI-generated testcases/{KEY}/{KEY}-summary.json` | Mandatory |
| Individual Test Cases | `testcases/AI-generated testcases/{KEY}/testcases/{TC-ID}.md` | Mandatory |
| Test Data | `testdata/{KEY}/{KEY}-testdata.json` | Mandatory |
| POM Blueprint | `blueprints/POM-JavaScript-Blueprint.md` | Mandatory |
| Generation Prompt | `prompts/generate-automation-scripts.md` | Mandatory |
| Exploration Data | `exploration-data/execution/{KEY}/` | Required for generate-scripts |
| Environment Config | `.env` (SAP credentials) | Mandatory |

---

## Outputs

### Phase 3 — Exploration Data

| Path | Description |
|------|-------------|
| `exploration-data/execution/{KEY}/{TC-ID}/{TC-ID}-execution.json` | Full TC execution record with per-step snapshots, captured element refs, dynamic decisions, error handling |
| `exploration-data/execution/{KEY}/{TC-ID}/steps/step-{NN}-{action}.json` | Per-step snapshot + captured elements |
| `exploration-data/execution/{KEY}/{TC-ID}/{TC-ID}-locators.json` | Selectors extracted for this TC |
| `exploration-data/execution/{KEY}/{KEY}-exploration-summary.json` | Story-level summary: pass/fail counts, all issues, aggregated selector list |
| `exploration-data/selectors/{module}-{app}.selectors.json` | Merged selector map (updated after every run) |

### Phase 4 — Automation Scripts

| Path | Description |
|------|-------------|
| `test-registry/automation/pages/{module}/{app}/{app}.locators.js` | Locator definitions — primary strategy + fallbacks per element |
| `test-registry/automation/pages/{module}/{app}/{app}.page.js` | Page Object class — all methods, SAP waits, error handling |
| `test-registry/automation/pages/{module}/{app}/{app}.fixtures.js` | Playwright fixtures — page setup, login, popup dismiss |
| `test-registry/automation/tests/{module}-{app}.spec.js` | Test specs — one test per TC with TC ID in title |
| `test-registry/automation/test-data/{module}-{app}.data.json` | Resolved test data — inputs + expected values per TC |

---

## Configuration

Config file: `agents/automation-agent/config/automation.config.js`

| Variable | Description | Example |
|----------|-------------|---------|
| `SAP_FIORI_URL` | Full SAP Fiori launch URL | `https://my429998.s4hana.cloud.sap/ui?...` |
| `SAP_USERNAME` | SAP login email | `user@example.com` |
| `SAP_PASSWORD` | SAP login password | stored in `.env` |
| `JIRA_PROJECT_KEY` | Project key for file naming | `CS` |

---

## MCP Dependency

This agent uses the **Playwright MCP server** configured in `.mcp.json` for Phase 3 (exploration). The following MCP tools are used:

- `mcp__playwright__browser_navigate` — Navigate to SAP URLs
- `mcp__playwright__browser_snapshot` — Capture accessibility tree with element refs
- `mcp__playwright__browser_take_screenshot` — Visual state capture
- `mcp__playwright__browser_click` — Click buttons, links, icons
- `mcp__playwright__browser_type` — Type into input fields
- `mcp__playwright__browser_press_key` — Press Enter, Tab, Ctrl+Enter, Escape
- `mcp__playwright__browser_handle_dialog` — Handle browser dialogs
- `mcp__playwright__browser_wait_for` — Wait for SAP page states
- `mcp__playwright__browser_console_messages` — Capture SAP console output

The Playwright MCP server must be running before invoking any skill. Phase 4 (generate-scripts) does not require MCP.

---

## How to Invoke

### Via slash commands (recommended)

```
/explore-and-capture CS-2       # Phase 3: execute TCs via MCP, capture data
/generate-scripts CS-2          # Phase 4: generate automation scripts
```

Run both in sequence for a complete automation build:

```
/explore-and-capture CS-2
/generate-scripts CS-2
npm run test:mm                  # Execute the generated scripts
```

### Via natural language

```
"Run the Automation Agent exploration for CS-2"
"Execute explore-and-capture from agents/automation-agent/skills/explore-and-capture.md for CS-2"
"Generate Playwright scripts for CS-2"
```

---

## Integration with Downstream Agents

- **Self-Healing Agent** reads `exploration-data/execution/{KEY}/{TC-ID}/{TC-ID}-execution.json` during failure analysis to compare what the script used vs what was captured during exploration
- **Self-Healing Agent** patches scripts in `test-registry/automation/pages/` and `test-registry/automation/tests/` based on gap analysis
- **Defect Logging Agent** reads `testcases/AI-generated testcases/{KEY}/testcases/{TC-ID}.md` and `jira/userstories/{KEY}/{KEY}.json` to compose defect reports when app bugs are detected

---

## SAP-Specific Patterns (Preserved in All Generated Scripts)

| Pattern | Implementation |
|---------|---------------|
| Page load after navigation | `waitForSapPageReady()` — 90s timeout |
| After button click / form submit | `waitForBusyIndicator()` — 30s timeout |
| After field fill | Press `Enter` or `Tab` → `waitForBusyIndicator()` → `waitForTimeout(800-2000ms)` |
| 2nd+ line item in table | `Ctrl+Enter` (Items Create button hidden in toolbar overflow after row 1) |
| PO number extraction | URL parse → link href → body text regex (three-tier) |
| Sign Out button | CSS `[id$="-logoutBtn"]` (dynamic ID per session) |
| Guided Tour popup | Detect `role=dialog` with "Tour" in title → click "Leave Tour" |
| Messages dialog | Open via button or `Ctrl+Shift+M` → read content → close |
| Discard draft | Confirm with `role=button name="Discard" exact:true` |
