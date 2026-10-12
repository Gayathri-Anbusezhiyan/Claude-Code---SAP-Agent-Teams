# /run-tests

Execute Playwright automation scripts using the Playwright test runner and display a clear failure summary. This uses the generated `.spec.js` files — no MCP server required.

## Usage

```
/run-tests              → Run all tests
/run-tests {KEY}        → Run all TCs for a story (e.g., CS-2)
/run-tests {module}     → Run all tests for a module (mm, sd, fi, hr)
/run-tests {TC-ID}      → Run a single test case (e.g., TC-CS-001)
```

## Instructions

1. Determine the run scope from `$ARGUMENTS`:
   - Empty → run all: `npx playwright test --config=test-registry/automation/config/playwright.config.js`
   - Story key (e.g., `CS-2`) → look up TC IDs from `test-registry/testcases/AI-generated testcases/$ARGUMENTS/$ARGUMENTS-summary.json`, then grep all TC IDs: `--grep "TC-CS-001|TC-CS-002|..."`
   - Module name (e.g., `mm`) → run module spec: `npx playwright test test-registry/automation/tests/mm-purchase-order.spec.js --config=test-registry/automation/config/playwright.config.js`
   - TC ID (e.g., `TC-CS-001`) → run single: `npx playwright test --config=test-registry/automation/config/playwright.config.js --grep "TC-CS-001"`

2. Run the Playwright command using the Bash tool

3. After test execution completes, automatically generate PDF report:
   - Find the latest results.json: `find test-registry/automation/test-results/reports -name "results.json" -type f -printf '%T@ %p\n' | sort -n | tail -1 | cut -d' ' -f2-`
   - Extract timestamp from path (e.g., "2026-08-22T10-24-22")
   - Generate PDF report: `node ai-engine/utils/enhanced-pdf-report.js {results-path} test-registry/pdf-reports/test-execution-report-{timestamp}.pdf`
   - Report PDF location to user

4. Parse the Playwright output and display a structured summary:

```
Test Run Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Passed  : {N}
  Failed  : {N}
  Skipped : {N}
  Duration: {Xs}

Failures:
  TC-CS-003  LOCATOR_FAILURE   enterSupplier() — line 87
             "strict mode violation: getByRole resolved to 2 elements"

  TC-CS-007  TIMEOUT_ERROR     clickOrder() — line 142
             "Timeout 30000ms exceeded waiting for waitForBusyIndicator"

No action needed for passing tests.
```

4. If there are failures, print recommended next step:
   - For each failing TC: `→ Run /self-heal {TC-ID} to auto-fix`
   - If failure looks like an app defect (assertion on business logic): `→ Run /log-defect {TC-ID} if SAP behavior is wrong`

## Pre-conditions

- Automation scripts must exist — run `/automate {KEY}` first if they don't
- `test-registry/automation/config/playwright.config.js` must exist

## Output

Generated reports after each test run:

1. **Playwright HTML Report:** `test-registry/automation/test-results/reports/<timestamp>/index.html` (interactive, auto-opens)
2. **JSON Results:** `test-registry/automation/test-results/reports/<timestamp>/results.json` (machine-readable)
3. **PDF Report:** `test-registry/pdf-reports/test-execution-report-<timestamp>.pdf` (professional, print-ready)
4. **HTML Report Preview:** `test-registry/pdf-reports/test-execution-report-<timestamp>.html` (browser-viewable)

## Next Step

```
/self-heal {TC-ID}     → Fix a failing test case automatically
/log-defect {TC-ID}    → Log a Jira defect if SAP itself is broken
```
