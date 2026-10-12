# Test Data Guide: [CS-64] Review A Batch Release Dashboard Showing All Batches Pending Final Qa

**Generated:**    2026-08-24
**Module:**       PP/QM — Production Planning & Quality Management
**Feature:**      Batch Release Dashboard — Quality Inspection Monitoring
**Data File:**    testdata/CS-64/CS-64-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-64/CS-64-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Batch Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{BATCH_NUMBER_QI_VALID}}` | A valid batch number in Quality Inspection status | SAP Fiori: Search for "Quality Management" or "Batch Management" app → filter batches by status = "Quality Inspection" → select an active batch number |
| `{{BATCH_NUMBER_WITH_DEVIATIONS}}` | A batch in QI status with at least one open deviation | SAP Fiori: Navigate to QM notifications or deviations app → find a batch with open deviation (QM notification) → note the batch number |
| `{{BATCH_NUMBER_NO_DEVIATIONS}}` | A batch in QI status with no open deviations | SAP Fiori: Find a batch in QI status that has no associated QM notifications or deviations |
| `{{BATCH_NUMBER_PRIORITY}}` | A batch in QI status linked to a sales order with approaching ship date | SAP Fiori: Search for a batch linked to a sales order with delivery date within 7 days → note the batch number |
| `{{BATCH_NUMBER_REJECT}}` | A batch in QI status suitable for rejection testing | Use a test batch in QI status that can be safely rejected (not linked to critical production or sales orders) |
| `{{BATCH_NUMBER_REWORK}}` | A batch in QI status suitable for rework testing | Use a test batch in QI status that can be safely flagged for rework |
| `{{BATCH_NUMBER_NO_SHIP_DATE}}` | A batch in QI status NOT linked to any sales order ship date | Find a batch that is not linked to any sales order or has no committed customer ship date |
| `{{BATCH_NUMBER_FOR_DISPOSITION}}` | A batch in QI status for disposition testing (general) | Use any valid test batch in QI status for ERR-02 test case |
| `{{BATCH_NUMBER_ZERO_DAYS}}` | A batch that entered QI status today (days pending = 0) | Create or identify a batch that was moved to QI status on the current date |
| `{{BATCH_NUMBER_OVERDUE}}` | A batch linked to a sales order with ship date in the past (overdue) | Find a batch linked to a sales order with delivery date < current date |
| `{{BATCH_NUMBER_SHIP_TODAY}}` | A batch linked to a sales order with ship date = today | Find or create a batch linked to a sales order with delivery date = current date |
| `{{BATCH_NUMBER_FUTURE_SHIP}}` | A batch linked to a sales order with ship date 30+ days in future | Find a batch linked to a sales order with delivery date > 30 days from current date |
| `{{BATCH_NUMBER_FOR_SD_RELEASE}}` | A batch in QI status to be released and verified in SD | Use a test batch linked to a material and sales order (for INT-01 integration test) |
| `{{BATCH_NUMBER_FOR_SD_REJECT}}` | A batch in QI status to be rejected and verified excluded from SD | Use a test batch linked to a material and sales order (for INT-02 integration test) |
| `{{BATCH_NUMBER_WITH_PROCESS_ORDER}}` | A batch created via a production/process order | Find a batch in the system that has a process order linkage (MCHA-CHARG → AFKO-AUFNR) |
| `{{BATCH_STATUS_QI}}` | Batch status: Quality Inspection | Use literal value: "Quality Inspection" or SAP system code for QI status (e.g., "X" or "QI") |

### Process Order Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{PROCESS_ORDER_LINKED}}` | Production order / process order number linked to a batch | SAP Fiori: Navigate to production order management → find process order linked to the batch → note the order number |
| `{{MATERIAL_FROM_PROCESS_ORDER}}` | Material produced by the process order | Check the material field in the production order header or batch master |

### Deviation Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{DEVIATION_ID_OPEN}}` | QM notification ID representing an open deviation | SAP Fiori: Navigate to QM notifications → filter by status = "Open" → note the notification ID |
| `{{DEVIATION_DESCRIPTION}}` | Description of the open deviation | Read the short text or description field from the QM notification |

### Batch Record Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{BATCH_RECORD_STATUS_COMPLETE}}` | Batch record compilation status (with deviations) | Use "Complete" or "In Review" depending on SAP system configuration |
| `{{BATCH_RECORD_STATUS_CLEAN}}` | Batch record compilation status (no deviations) | Use "Complete" or "Ready for Release" |

### Days Pending

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{DAYS_PENDING_STANDARD}}` | Number of days a batch has been in QI status | Calculate as: Current Date minus QI Status Entry Date (e.g., 3, 5, 10) |

### Customer Ship Date Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{SHIP_DATE_APPROACHING_7D}}` | Ship date within 7 days from current date | Calculate as: Current Date + 5 days (or any date ≤ 7 days); format YYYY-MM-DD |
| `{{SHIP_DATE_PAST}}` | Ship date in the past (overdue) | Use any past date, e.g., Current Date - 5 days; format YYYY-MM-DD |
| `{{SHIP_DATE_TODAY}}` | Ship date equal to current date | Use today's date; format YYYY-MM-DD |
| `{{SHIP_DATE_FUTURE_30D}}` | Ship date 30+ days in the future | Calculate as: Current Date + 30 days (or more); format YYYY-MM-DD |

### Disposition Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{DISPOSITION_COMMENTS_RELEASE}}` | QA comments for Release disposition | Use free text, e.g., "Batch meets all quality specifications. Released for distribution." (255 char max) |
| `{{DISPOSITION_COMMENTS_REJECT}}` | QA comments for Reject disposition | Use free text, e.g., "Quality deviation detected. Batch rejected as per QM protocol." (255 char max) |
| `{{DISPOSITION_COMMENTS_REWORK}}` | QA comments for Rework disposition | Use free text, e.g., "Minor quality issue identified. Batch sent for rework." (255 char max) |

### Sales Order Data (for Integration Tests)

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{MATERIAL_FOR_SD}}` | Material linked to batch and sales order (INT-01) | SAP Fiori: Navigate to sales order → note the material number on the line item linked to the batch |
| `{{SALES_ORDER_NUMBER}}` | Sales order number awaiting batch allocation (INT-01) | SAP Fiori: Manage Sales Orders → find a sales order with line item for the material → note the sales order number |
| `{{MATERIAL_FOR_SD_REJECT}}` | Material linked to batch and sales order (INT-02) | Same as above, but for a different batch/sales order for rejection testing |
| `{{SALES_ORDER_NUMBER_REJECT}}` | Sales order number for rejected batch testing (INT-02) | Same as above, but for rejection testing |

### Error Messages (System-Generated)

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{EMPTY_STATE_MESSAGE}}` | Message displayed when no batches are in QI status | Expected SAP message: "No data available" or "No batches in Quality Inspection status" or equivalent |
| `{{VALIDATION_ERROR_NO_BATCH_SELECTED}}` | Error when disposition attempted without batch selection | Expected SAP message: "Please select a batch" or "No batch selected" or equivalent |
| `{{ERROR_MISSING_BATCH}}` | Error when drill-down attempted without batch number | Expected SAP message: "Batch number is required" or "Please select a batch" or equivalent |
| `{{ERROR_MISSING_DISPOSITION}}` | Error when disposition submitted without selecting disposition type | Expected SAP message: "Disposition is required" or "Please select a disposition" or equivalent |

---

## Environment Values (from .env — not in testdata.json)

| Variable | Usage in Tests |
|----------|---------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation step 1 of every test case. Set in `.env` file. Full Fiori launch URL including SSO parameters. |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login step 2 of every test case. Set in `.env` file. User email address for SAP IDP login. |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login step 4 of every test case. Set in `.env` file. User password for SAP IDP login. |

---

## Important Notes

1. **Never commit real SAP IDs or credentials** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation should be done in a **dedicated SAP test system** — never use production data
3. **Batch-to-sales-order mappings** must be documented for EDGE and INT scenarios — ensure test batches are linked to test sales orders with appropriate ship dates
4. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured
5. If a required batch or master data object does not exist in your test system, create it using the relevant SAP Fiori apps before executing tests
6. **For integration tests (INT-01, INT-02, INT-03)**, verify that batch-to-sales-order and batch-to-process-order linkages exist in the test system
7. **Days Pending calculation** is automatic (system-calculated) — ensure test batches have realistic QI entry dates
8. **Error message placeholders** represent expected system validation messages — actual wording may vary slightly by SAP S/4HANA Cloud version

---

## Test Data Setup Recommendations

### For Dashboard Access Tests (HP-01, NEG-01):
- Create or identify at least 2–3 batches in Quality Inspection status
- Ensure batches are linked to valid process orders

### For Drill-Down Tests (HP-02, AP-03, ERR-01):
- Create or identify at least one batch with open QM notifications (deviations)
- Create or identify at least one batch with no open QM notifications

### For Disposition Tests (HP-03, AP-01, AP-02, NEG-03, ERR-02):
- Create or identify at least 3 batches in QI status that can be safely Released, Rejected, or flagged for Rework
- Document initial stock status before disposition (should be "Quality Inspection")
- Verify stock status update workflow is configured in SAP

### For Priority Highlighting Tests (EDGE-02, EDGE-03, EDGE-04, NEG-02):
- Create or identify batches linked to sales orders with varying ship dates:
  - Overdue (past date)
  - Today (current date)
  - Future (30+ days)
  - No ship date (not linked to any sales order)
- Document batch-to-sales-order mappings in a separate tracking sheet

### For Integration Tests (INT-01, INT-02, INT-03):
- Create or identify batches linked to both materials and sales orders
- Create or identify batches linked to production/process orders
- Verify that SD apps are accessible and functional in the test system
- Test integration scenarios require cross-module navigation (QM → MM → SD)

---
