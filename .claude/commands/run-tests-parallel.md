# /run-tests-parallel

Run the 8 passing test cases and 1 designed-to-fail test case from CS-2 in parallel using Playwright's parallel execution.

## Test Cases Executed

**8 Expected to Pass:**
- TC-CS-001 (HP) — Create PO with single line item
- TC-CS-005 (ERR) — Empty Supplier field validation
- TC-CS-006 (ERR) — Empty Material field validation
- TC-CS-007 (ERR) — Empty Order Quantity validation
- TC-CS-008 (ERR) — Empty Net Price validation
- TC-CS-009 (EDGE) — Minimum valid order quantity
- TC-CS-010 (EDGE) — Zero order quantity rejected
- TC-CS-011 (EDGE) — Zero net price rejected

**1 Expected to Fail:**
- TC-CS-021 (NEG) — Success alert missing PO number (designed to fail for defect logging pipeline)

## Usage

```
/run-tests-parallel
```

## Instructions

1. **Verify Prerequisites:**
   - Check that `.env` file exists with SAP credentials
   - Verify Playwright is installed: `npx playwright --version`
   - Confirm test files exist in `test-registry/automation/tests/mm-purchase-order.spec.js`

2. **Execute Tests in Parallel:**
   - Run Playwright with 9 workers (one per test case) for maximum parallelism
   - Use grep pattern to match only the 9 target test cases
   - Generate HTML report with timestamped folder
   - Display execution summary

3. **Run Command:**
   ```bash
   npx playwright test test-registry/automation/tests/mm-purchase-order.spec.js \
     --config=test-registry/automation/config/playwright.config.js \
     --workers=9 \
     --grep "TC-CS-001|TC-CS-005|TC-CS-006|TC-CS-007|TC-CS-008|TC-CS-009|TC-CS-010|TC-CS-011|TC-CS-021" \
     --reporter=html,list
   ```

4. **Parse Results:**
   - Count passed tests (expected: 8)
   - Count failed tests (expected: 1 — TC-CS-021)
   - Extract execution time
   - Display summary table

5. **Report Findings:**
   ```
   ═══════════════════════════════════════════════════════════════
   Parallel Test Execution Summary — CS-2 Purchase Order Tests
   ═══════════════════════════════════════════════════════════════

   Executed      : 9 test cases
   Passed        : X tests
   Failed        : Y tests
   Duration      : Xs
   Workers       : 9 (parallel)

   ✅ Expected Passes  : 8
   🔴 Expected Failures: 1 (TC-CS-021 — designed to fail)

   Status: [ALL TESTS BEHAVED AS EXPECTED | UNEXPECTED RESULTS]

   HTML Report: test-registry/automation/test-results/reports/<timestamp>/index.html
   ═══════════════════════════════════════════════════════════════
   ```

6. **Handle Unexpected Results:**
   - If more than 1 test fails → List unexpected failures
   - If TC-CS-021 passes → Flag as anomaly (should fail)
   - If fewer than 8 tests pass → List which tests failed unexpectedly

7. **Auto-open HTML Report:**
   - Open the generated HTML report in the default browser
   - Command: `npx playwright show-report test-registry/automation/test-results/reports/<timestamp>`

## Expected Behavior

- **Parallel Execution:** All 9 tests run simultaneously (9 browser instances)
- **Execution Time:** ~30-45 seconds total (vs ~5-7 minutes sequential)
- **SAP Load:** 9 concurrent sessions on SAP tenant (ensure tenant can handle load)
- **Result:** 8 ✅ + 1 🔴 = Pipeline validation complete

## Error Handling

| Condition | Action |
|-----------|--------|
| SAP tenant unavailable | Abort with error message |
| .env credentials missing | Abort with error message |
| More than 1 test fails | List all failures; recommend `/self-heal {TC-ID}` |
| TC-CS-021 passes | Flag as anomaly; validation alert may have been updated |
| Playwright not installed | Display: `npm install @playwright/test` |

## Notes

- **Parallel Safety:** Each test creates a new PO draft and discards it (no shared state)
- **SAP Tenant Load:** 9 concurrent sessions may be high for demo tenants — reduce `--workers` if needed
- **TC-CS-021 Failure:** This is intentional and validates the defect logging pipeline
- **Skipped Tests:** TC-CS-002, TC-CS-003, TC-CS-004 are NOT included (missing test data)
