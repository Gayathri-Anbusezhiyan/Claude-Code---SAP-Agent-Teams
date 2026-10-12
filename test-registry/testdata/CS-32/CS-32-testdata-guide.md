# Test Data Guide: [CS-32] Move Expired Batches To A Designated Blocked Storage Location Automati

**Generated:**    2026-08-23
**Module:**       MM (Materials Management)
**Feature:**      Batch Expiration Management
**Data File:**    testdata/CS-32/CS-32-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-32/CS-32-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system (tenant: my426318.s4hana.cloud.sap)
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Material Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{MATERIAL_ID_BATCH_MANAGED}}` | Material number with batch management enabled in material master | SAP Fiori: Manage Materials → search for GMP/pharmaceutical materials; verify "Batch Management" checkbox is active; or T-code MM60/MARA |
| `{{MATERIAL_ID_NON_BATCH_MANAGED}}` | Material number WITHOUT batch management enabled | SAP Fiori: Manage Materials → search for standard consumables; verify "Batch Management" checkbox is NOT active |

### Batch Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{BATCH_NUMBER_ACTIVE}}` | Active batch number in unrestricted-use stock | SAP Fiori: Manage Stock → filter by Material + Stock Type = Unrestricted-Use; note Batch number |
| `{{BATCH_NUMBER_EXPIRED}}` | Batch with expiration date (SLED) in the past | Create test batch in MSC3N/BMBC; set SLED to past date (e.g., 2024-01-01); post stock to unrestricted storage location |
| `{{BATCH_NUMBER_BLOCKED}}` | Batch currently in blocked stock type | SAP Fiori: Manage Stock → filter by Stock Type = Blocked; note Batch number |
| `{{BATCH_NUMBER_DISPOSED}}` | Batch for which disposition was previously completed | Check batch disposition audit report for historical disposition records; note Batch number |
| `{{BATCH_NUMBER_FUTURE_SLED}}` | Batch with SLED in the future (not expired) | Create test batch with SLED > current date + 30 days |
| `{{BATCH_NUMBER_ALREADY_BLOCKED}}` | Batch with expired SLED but already in blocked stock | Create test batch with expired SLED; manually transfer to blocked storage location via MIGO/MB1B before test execution |
| `{{BATCH_NUMBER_EXPIRED_ZERO_STOCK}}` | Batch with expired SLED and zero unrestricted stock | Create test batch with expired SLED; issue all stock via goods issue (MIGO GI) so unrestricted stock = 0 |
| `{{BATCH_NUMBER_SLED_TODAY}}` | Batch with SLED = current system date | Create test batch; set SLED = today's date in batch master (MSC3N/BMBC) |
| `{{BATCH_NUMBER_EXPIRED_1}}` | First batch in multi-batch expiration scenario | Create test batch with expired SLED (same date for batches 1, 2, 3) |
| `{{BATCH_NUMBER_EXPIRED_2}}` | Second batch in multi-batch expiration scenario | Create test batch with same expired SLED as batch 1 |
| `{{BATCH_NUMBER_EXPIRED_3}}` | Third batch in multi-batch expiration scenario | Create test batch with same expired SLED as batch 1 |
| `{{BATCH_NUMBER_NULL_SLED}}` | Batch with SLED field null/blank/not maintained | Create test batch; leave SLED field blank in batch master (MSC3N/BMBC) |

### Organizational Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{PLANT_CODE}}` | Plant code configured for batch management | SAP Fiori: Configuration → Enterprise Structure → Plants; or T-code OX10 (e.g., 1710) |
| `{{PLANT_CODE_NO_BLOCKED_SLOC}}` | Plant code where blocked storage location is NOT configured | Use a test plant without blocked storage location configuration; or temporarily remove blocked sloc from plant in SPRO |
| `{{STORAGE_LOCATION_UNRESTRICTED}}` | Storage location for unrestricted-use stock | Standard unrestricted sloc (e.g., 0001, 1000); check plant-sloc assignment in OX09 |
| `{{STORAGE_LOCATION_BLOCKED}}` | Designated blocked storage location for expired batches | Configure dedicated sloc for blocked stock (e.g., BLCK, 9999); verify in plant-sloc assignment |

### Stock Quantity

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{STOCK_QUANTITY_STANDARD}}` | Standard stock quantity for batch (positive value) | Use 10 to 100 depending on UoM (e.g., 10 KG, 50 EA) |

### Dates

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{DATE_PAST_SLED}}` | Expiration date (SLED) in the past | Use a date before today (e.g., 2024-06-01 or 2025-12-31 if today > 2026-01-01); format: YYYY-MM-DD or SAP date format |
| `{{DATE_FUTURE_SLED}}` | Expiration date (SLED) in the future | Use a date after today (e.g., today + 30 days); format: YYYY-MM-DD |
| `{{DATE_PAST_SLED_COMMON}}` | Common expiration date for multiple batches (past) | Use same past date for all three batches in EDGE-03 scenario |
| `{{DATE_CURRENT_SYSTEM_DATE}}` | Current system date (SLED = today) | Use today's date; dynamically calculated at test execution time |
| `{{DATE_REPORT_START}}` | Audit report filter start date | Use a date range start (e.g., first day of current month) |
| `{{DATE_REPORT_END}}` | Audit report filter end date | Use a date range end (e.g., today or last day of current month) |

### Background Job

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{BACKGROUND_JOB_BATCH_EXPIRATION}}` | Name of the daily batch expiration monitoring background job | SAP transaction SM37 → search for jobs with "BATCH" or "EXPIR" in name; or check custom Z-program for batch expiration monitoring |

### User Authorization

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{USER_ID_QA_AUTHORIZED}}` | SAP user ID with QA/QM authorization for batch disposition | Create test user with role SAP_QM_BATCH_DISP or similar; user must have authorization object C_BATC_DIS |
| `{{USER_ID_WAREHOUSE_NO_DISP_AUTH}}` | SAP user ID with Warehouse Operator role WITHOUT disposition authorization | Create test user with role SAP_WM_WAREHOUSE_OPERATOR; user must NOT have C_BATC_DIS authorization |

### Disposition Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{DISPOSITION_ACTION_ANY}}` | Any disposition action type (for audit report filtering) | Use DESTROY, RETURN, or REWORK (or leave blank for "all actions") |
| `{{DISPOSITION_REASON_EXPIRED}}` | Reason code for DESTROY disposition | SAP-configured reason code (e.g., "EXPIRED", "OBSOLETE"); check customizing table T157D |
| `{{DISPOSITION_REASON_RETURN_TO_VENDOR}}` | Reason code for RETURN disposition | SAP-configured reason code (e.g., "RETURN_TO_VENDOR", "SUPPLIER_CREDIT") |
| `{{DISPOSITION_REASON_REPROCESS}}` | Reason code for REWORK disposition | SAP-configured reason code (e.g., "REPROCESS", "REPACKAGE") |
| `{{DISPOSITION_COMMENT_DESTROY}}` | Free-text comment for DESTROY disposition | Example: "Batch expired on 2024-06-01; destroyed per GMP policy" |
| `{{DISPOSITION_COMMENT_RETURN}}` | Free-text comment for RETURN disposition | Example: "Batch expired; returning to supplier for credit" |
| `{{DISPOSITION_COMMENT_REWORK}}` | Free-text comment for REWORK disposition | Example: "Batch expired; approved for rework and repackaging" |

---

## Environment Values (from .env — not in testdata.json)

| Variable | Usage in Tests |
|----------|---------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in Step 1 of every test case (full launch URL including SSO parameters). Set in `.env` file. |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in Step 2 of every test case (email address for SAP IDP login). Set in `.env` file. |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in Step 4 of every test case (password for SAP IDP login). Set in `.env` file. |

---

## Test Data Preparation Notes

### For Expired Batch Scenarios (HP-02, NEG-02, EDGE-01, EDGE-02, EDGE-03)

1. **Create test batches with past SLED**: Use MSC3N (Create Batch) or BMBC (Batch Characteristics)
2. **Post stock to unrestricted-use**: Use MIGO (Goods Receipt) or MB1C (Other Goods Receipt) with movement type 501
3. **Verify SLED is in the past**: Check batch master to confirm SLED < current date
4. **Verify unrestricted stock quantity > 0**: Check MB52 (Stock List) or Manage Stock Fiori app

### For Blocked Batch Scenarios (HP-03, HP-04, HP-05, NEG-02)

1. **Create batch with expired SLED** (as above)
2. **Transfer stock to blocked storage location**: Use MB1B (Stock Transfer) with movement type 309/349 OR run the batch expiration background job to auto-transfer
3. **Verify stock type = Blocked**: Check Manage Stock app; Stock Type should show "Blocked"

### For Disposition Scenarios (HP-03, HP-04, HP-05, HP-06, ERR-04, ERR-05, ERR-06)

1. **Blocked batch must exist** (created as above)
2. **Disposition function must be configured**: Check SPRO → Quality Management → Batch Management → Disposition
3. **User must have QM authorization**: Assign role with C_BATC_DIS authorization object
4. **Test disposition actions in sequence**: DESTROY, RETURN, REWORK (all three must be tested separately)

### For Background Job Scenarios (HP-02, NEG-01, NEG-02, ERR-01, ERR-02, EDGE-01, EDGE-02, EDGE-03, EDGE-04)

1. **Identify or create batch expiration monitoring job**: Check SM37 for existing job; if not present, create custom Z-program or configure standard SAP batch expiration monitoring
2. **Job must run daily**: Schedule job with variant for daily execution
3. **Job must have correct parameters**: Ensure job selects correct plant, storage location, and date range

### For Null SLED Scenario (EDGE-04)

1. **Create test batch**: Use MSC3N (Create Batch)
2. **Leave SLED field blank**: Do NOT enter expiration date in batch master
3. **Verify SLED is null**: Check MSC3N or BMBC; SLED field should be empty (00.00.0000 or blank)

---

## Important Notes

1. **Never commit real SAP IDs or credentials** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation should be done in a **dedicated SAP test system** (my426318.s4hana.cloud.sap) — never use production data
3. The `BATCH_NUMBER_EXPIRED` and other invalid values must be verified to exist/not exist in the test system before executing test cases
4. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured
5. If a required master data object does not exist in your test system, create it using the relevant SAP Fiori configuration apps before executing tests
6. **GMP Compliance**: All batch expiration and disposition testing must follow GMP (Good Manufacturing Practice) guidelines for pharmaceutical/regulated industries

---

## Test Data Dependencies Between Test Cases

| Dependency | Test Cases | Notes |
|-----------|-----------|-------|
| Expired batch auto-transfer (HP-02) → Disposition (HP-03/04/05) | TC-CS-032 → TC-CS-033/034/035 | After running TC-CS-032, the batch is in blocked stock and ready for disposition in TC-CS-033/034/035 |
| Disposition completion (HP-03/04/05) → Audit report (HP-06) | TC-CS-033/034/035 → TC-CS-036 | After completing dispositions, audit report (TC-CS-036) can verify disposition records |

For independent test execution, reset test data between runs:
- Recreate batches with expired SLED for repeated HP-02 testing
- Revert disposed batches to blocked stock for repeated disposition testing (HP-03/04/05)
