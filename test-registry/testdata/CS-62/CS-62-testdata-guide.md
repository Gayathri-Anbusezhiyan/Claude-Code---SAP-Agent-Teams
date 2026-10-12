# Test Data Guide: [CS-62] Technically Complete A Process Order Only After All Mandatory Quality

**Generated:**    2026-08-24
**Module:**       PP (Production Planning & Control)
**Feature:**      Process Order Technical Completion (TECO)
**Data File:**    testdata/CS-62/CS-62-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-62/CS-62-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Process Order Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{PROCESS_ORDER_NUMBER_VALID}}` | A valid process order in Released (REL) status with all quality requirements met (deviations closed, IPC recorded, batch records signed) | SAP Fiori: Confirm Process Order → search for orders with status REL and completed quality documentation |
| `{{PROCESS_ORDER_NUMBER_WITH_OPEN_DEVIATION}}` | A process order with at least one open deviation linked in QM Deviation Management | Create or identify a test order with an open deviation in QM; deviation status must be "Open" or "In Progress" |
| `{{PROCESS_ORDER_NUMBER_MISSING_IPC}}` | A process order with at least one missing IPC (in-process control) inspection result | Create or identify a test order where an IPC inspection characteristic has NOT been recorded in QM IPC |
| `{{PROCESS_ORDER_NUMBER_UNSIGNED_BR}}` | A process order with at least one unsigned mandatory batch record section | Create or identify a test order where a batch record section has NOT been e-signed |
| `{{PROCESS_ORDER_NUMBER_INVALID}}` | A process order number that does NOT exist in SAP | Use a non-existent number like "9999999999" — verify it returns "not found" |
| `{{PROCESS_ORDER_NUMBER_ZERO_DEVIATIONS}}` | A process order with exactly zero open deviations (boundary case) | Verify in QM Deviation Management that no deviations are linked or all are closed |
| `{{PROCESS_ORDER_NUMBER_ONE_DEVIATION}}` | A process order with exactly one open deviation (boundary case) | Create or identify a test order with exactly 1 open deviation in QM |
| `{{PROCESS_ORDER_NUMBER_ALREADY_TECO}}` | A process order already technically completed (status TECO) | Execute TECO on a test order first, then use that order number for duplicate TECO test |
| `{{PROCESS_ORDER_NUMBER_INT_STOCK}}` | A process order for stock status integration test (all quality requirements met) | Same criteria as VALID; use for verifying stock status after TECO |
| `{{PROCESS_ORDER_NUMBER_INT_QM_DEV}}` | A process order for QM deviation management integration test (with open QM deviation) | Same criteria as WITH_OPEN_DEVIATION; use for QM integration validation |
| `{{PROCESS_ORDER_NUMBER_INT_QM_IPC}}` | A process order for QM IPC integration test (with missing IPC results) | Same criteria as MISSING_IPC; use for QM IPC integration validation |
| `{{PROCESS_ORDER_NUMBER_INT_ESIG}}` | A process order for e-Signature integration test (with unsigned batch record) | Same criteria as UNSIGNED_BR; use for e-Signature integration validation |
| `{{PROCESS_ORDER_NUMBER_INT_INSPLOT}}` | A process order for QM inspection lot integration test (with pending inspection lot) | Create or identify a test order with an associated QM inspection lot in status CRTD or REL |

### Batch and Material Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{BATCH_NUMBER_VALID}}` | Batch number produced by the valid process order | SAP Fiori: Stock Overview → search by process order; or displayed in process order confirmation |
| `{{BATCH_NUMBER_INT_STOCK}}` | Batch number for stock status integration test | Same as BATCH_NUMBER_VALID; linked to PROCESS_ORDER_NUMBER_INT_STOCK |
| `{{BATCH_NUMBER_INT_INSPLOT}}` | Batch number for inspection lot integration test | Linked to PROCESS_ORDER_NUMBER_INT_INSPLOT; must have an active inspection lot |
| `{{MATERIAL_ID_VALID}}` | Material master number produced by the process orders | SAP Fiori: Manage Material → search materials; material must be configured for production in the test plant |

### QM Deviation Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{DEVIATION_ID_OPEN}}` | Deviation ID linked to the process order with status NOT "Closed" | SAP Fiori: Manage Deviations (QM) → search by process order; deviation must be in status "Open" or "In Progress" |
| `{{DEVIATION_STATUS_OPEN}}` | Status text for an open deviation | Typically "Open" or "In Progress" — verify in QM Deviation Management |
| `{{DEVIATION_ID_SINGLE}}` | A single deviation ID for boundary case (exactly 1 open deviation) | Create or identify exactly one open deviation linked to PROCESS_ORDER_NUMBER_ONE_DEVIATION |
| `{{QM_DEVIATION_ID}}` | Deviation ID for QM integration test | Same as DEVIATION_ID_OPEN; use for QM integration validation |

### QM In-Process Control (IPC) Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{IPC_OPERATION_NUMBER}}` | Operation number with missing IPC inspection results | SAP Fiori: In-Process Control → search by process order → identify operation with missing characteristic results |
| `{{IPC_CHARACTERISTIC_NAME}}` | Inspection characteristic name that has NOT been recorded | Displayed in QM IPC for the operation above; characteristic must be mandatory and unrecorded |
| `{{IPC_OPERATION_NUMBER_INT}}` | Operation number for QM IPC integration test | Same as IPC_OPERATION_NUMBER; use for QM IPC integration validation |
| `{{IPC_CHARACTERISTIC_NAME_INT}}` | Characteristic name for QM IPC integration test | Same as IPC_CHARACTERISTIC_NAME; use for QM IPC integration validation |

### e-Signature / Batch Record Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{BATCH_RECORD_SECTION_NAME}}` | Batch record section name that has NOT been signed | SAP Fiori: e-Signature / Batch Record app → search by process order → identify unsigned section |
| `{{BATCH_RECORD_SECTION_NAME_INT}}` | Section name for e-Signature integration test | Same as BATCH_RECORD_SECTION_NAME; use for e-Signature integration validation |

### QM Inspection Lot Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{INSPECTION_LOT_NUMBER}}` | Inspection lot number linked to the batch | SAP Fiori: Manage Inspection Lots → search by batch or process order |
| `{{INSPECTION_LOT_STATUS_BEFORE}}` | Inspection lot status before TECO (should be CRTD or REL) | Displayed in QM Inspection Lot; typically "CRTD" (Created) or "REL" (Released) |
| `{{INSPECTION_LOT_STATUS_AFTER}}` | Expected inspection lot status after TECO (should remain unchanged) | Same as BEFORE — TECO should NOT change inspection lot status |

### Organizational Structure

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{PLANT_CODE}}` | Production plant code configured for the process order | SAP Fiori: Configuration → Enterprise Structure → Plants; or T-code OX10 |
| `{{COMPANY_CODE}}` | Company code assigned to the plant | SAP configuration → Enterprise Structure; or T-code OX02 |

### User Authorization Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{USER_WITHOUT_TECO_AUTH}}` | User ID of a user WITHOUT TECO authorization | Create or identify a test user with view authorization for process orders but NO execute authorization for Technical Completion |
| `{{USER_PASSWORD_NO_AUTH}}` | Password for the unauthorized user above | Set in SAP user administration for the test user |

---

## Environment Values (from .env — not in testdata.json)

| Variable | Usage in Tests |
|----------|---------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation step 1 of every test case. Set in `.env` file. Must include full launch URL with SSO parameters. |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login email step 2. Set in `.env` file. Must be a user WITH TECO authorization for all test cases except TC-CS-172 (which uses `{{USER_WITHOUT_TECO_AUTH}}`). |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login password step 4. Set in `.env` file. Password for SAP_USERNAME. |

---

## Test Data Preparation Steps

### 1. Create Base Process Order with All Quality Requirements Met
- Create a process order with status Released (REL)
- Close all deviations linked to the order (or create with zero deviations)
- Record all required IPC inspection results in QM In-Process Control
- Sign all mandatory batch record sections in e-Signature module
- Verify finished goods batch has stock status "Quality Inspection" (QI)
- Use this order for: TC-CS-167 (HP), TC-CS-171 (ERR-invalid auth), TC-CS-173 (EDGE-zero deviations), TC-CS-176 (INT-stock), TC-CS-180 (INT-inspection lot)

### 2. Create Process Order with Open Deviation
- Create or clone a process order
- Create at least one deviation in QM Deviation Management with status "Open" or "In Progress"
- Link the deviation to the process order
- Use this order for: TC-CS-168 (NEG-open dev), TC-CS-177 (INT-QM dev)

### 3. Create Process Order with Missing IPC Results
- Create or clone a process order
- Leave at least one required IPC inspection characteristic UNRECORDED in QM In-Process Control
- Use this order for: TC-CS-169 (NEG-missing IPC), TC-CS-178 (INT-QM IPC)

### 4. Create Process Order with Unsigned Batch Record Section
- Create or clone a process order
- Leave at least one mandatory batch record section UNSIGNED in e-Signature module
- Use this order for: TC-CS-170 (NEG-unsigned BR), TC-CS-179 (INT-e-Signature)

### 5. Create Process Order with Exactly One Open Deviation (Boundary Case)
- Create or clone a process order
- Create EXACTLY ONE deviation in QM Deviation Management with status "Open"
- Link the deviation to the process order
- Verify count = 1 (not 0, not 2+)
- Use this order for: TC-CS-174 (EDGE-one deviation)

### 6. Create Already Technically Completed Process Order
- Create a process order with all quality requirements met
- Execute Technical Completion (TECO) on the order
- Verify order status is "TECO" (Technically Completed)
- Use this order for: TC-CS-175 (EDGE-duplicate TECO)

### 7. Create Test User Without TECO Authorization
- Create a new test user (or clone existing test user)
- Assign role with view authorization for process orders
- Remove TECO function authorization from the user's role
- Verify user can view orders but cannot execute TECO
- Use this user for: TC-CS-172 (ERR-no auth)

---

## Important Notes

1. **Never commit real SAP IDs or credentials** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation should be done in a **dedicated SAP test system** — never use production data
3. The `PROCESS_ORDER_NUMBER_INVALID` value must be verified to NOT exist in the test system before executing error test cases
4. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured
5. If a required master data object does not exist in your test system, create it using the relevant SAP Fiori configuration apps before executing tests
6. **Regulatory Compliance:** This test data supports GxP validation for pharmaceutical/regulated manufacturing — all test execution must be documented for regulatory audits
7. **Data Integrity:** Ensure deviations, IPC results, and e-signatures are correctly configured in QM and e-Signature modules before executing negative and integration tests
8. **Stock Status:** Verify all batches have stock status "Quality Inspection" (QI) before executing TECO tests — stock should NOT auto-transition to Unrestricted (UR) after TECO

---

## Cross-Reference: Test Case to Placeholder Mapping

| Test Case ID | Primary Placeholder(s) | Scenario Type |
|--------------|----------------------|---------------|
| TC-CS-167 | PROCESS_ORDER_NUMBER_VALID, BATCH_NUMBER_VALID | HAPPY_PATH |
| TC-CS-168 | PROCESS_ORDER_NUMBER_WITH_OPEN_DEVIATION, DEVIATION_ID_OPEN | NEGATIVE |
| TC-CS-169 | PROCESS_ORDER_NUMBER_MISSING_IPC, IPC_OPERATION_NUMBER, IPC_CHARACTERISTIC_NAME | NEGATIVE |
| TC-CS-170 | PROCESS_ORDER_NUMBER_UNSIGNED_BR, BATCH_RECORD_SECTION_NAME | NEGATIVE |
| TC-CS-171 | PROCESS_ORDER_NUMBER_INVALID | ERROR |
| TC-CS-172 | USER_WITHOUT_TECO_AUTH, USER_PASSWORD_NO_AUTH | ERROR |
| TC-CS-173 | PROCESS_ORDER_NUMBER_ZERO_DEVIATIONS | EDGE_CASE |
| TC-CS-174 | PROCESS_ORDER_NUMBER_ONE_DEVIATION, DEVIATION_ID_SINGLE | EDGE_CASE |
| TC-CS-175 | PROCESS_ORDER_NUMBER_ALREADY_TECO | EDGE_CASE |
| TC-CS-176 | PROCESS_ORDER_NUMBER_INT_STOCK, BATCH_NUMBER_INT_STOCK | INTEGRATION |
| TC-CS-177 | PROCESS_ORDER_NUMBER_INT_QM_DEV, QM_DEVIATION_ID | INTEGRATION |
| TC-CS-178 | PROCESS_ORDER_NUMBER_INT_QM_IPC, IPC_OPERATION_NUMBER_INT, IPC_CHARACTERISTIC_NAME_INT | INTEGRATION |
| TC-CS-179 | PROCESS_ORDER_NUMBER_INT_ESIG, BATCH_RECORD_SECTION_NAME_INT | INTEGRATION |
| TC-CS-180 | PROCESS_ORDER_NUMBER_INT_INSPLOT, INSPECTION_LOT_NUMBER, BATCH_NUMBER_INT_INSPLOT | INTEGRATION |
