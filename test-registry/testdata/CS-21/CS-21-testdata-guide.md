# Test Data Guide: [CS-21] Record A Return Delivery For A Rejected Batch Back To The Vendor

**Generated:**    2026-08-24  
**Module:**       MM — Materials Management  
**Feature:**      Return Delivery for Rejected Batch  
**Data File:**    test-registry/testdata/CS-21/CS-21-testdata.json

---

## How to Use This Guide

1. Open `test-registry/testdata/CS-21/CS-21-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Purchase Order Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{PURCHASE_ORDER_VALID}}` | A valid Purchase Order with goods receipt posted and batch in Blocked Stock | SAP Fiori: Manage Purchase Orders → search POs with goods receipt posted; verify batch exists in Blocked Stock (stock type 'S') |
| `{{PURCHASE_ORDER_VALID_QI}}` | A valid Purchase Order with goods receipt posted and batch in Quality Inspection Stock | SAP Fiori: Manage Purchase Orders → search POs with goods receipt posted; verify batch exists in Quality Inspection Stock (stock type 'X') |
| `{{PURCHASE_ORDER_INVALID}}` | A Purchase Order number that does NOT exist in SAP | Use a non-existent number like "9999999999" — verify it returns "not found" in PO search |
| `{{PURCHASE_ORDER_NO_GR}}` | A valid Purchase Order but with NO goods receipt posted | SAP Fiori: Manage Purchase Orders → search POs with status "Open" but no goods receipt (GR document count = 0) |

### Batch Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{BATCH_BLOCKED_STOCK}}` | A batch number in Blocked Stock (stock type 'S') with available quantity > 0 | SAP Fiori: Display Stock Overview → search by material and plant; filter for stock type 'S' (Blocked Stock); note batch number with quantity > 0 |
| `{{BATCH_QI_STOCK}}` | A batch number in Quality Inspection Stock (stock type 'X') with available quantity > 0 | SAP Fiori: Display Stock Overview → search by material and plant; filter for stock type 'X' (Quality Inspection); note batch number with quantity > 0 |
| `{{BATCH_UNRESTRICTED_STOCK}}` | A batch number in Unrestricted Stock (NOT Blocked or QI) | SAP Fiori: Display Stock Overview → search by material and plant; filter for Unrestricted Stock; note batch number with quantity > 0 |
| `{{BATCH_INVALID}}` | A batch number that does NOT exist in SAP | Use a non-existent batch like "BATCH999999" — verify it returns "not found" in stock overview |
| `{{BATCH_ZERO_QTY}}` | A batch that exists but has zero (0) quantity in Blocked or QI Stock | SAP Fiori: Display Stock Overview → search for a batch with 0 quantity in restricted stock (already fully consumed or returned) |
| `{{BATCH_FULL_RETURN}}` | A batch with a known exact quantity (e.g., 50 KG) for full return testing | SAP Fiori: Display Stock Overview → note the exact available quantity for a batch in Blocked or QI Stock |

### Material Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{MATERIAL_NUMBER}}` | An active material number configured for batch management and return processing | SAP Fiori: Manage Material → search materials with batch management enabled; verify the material is linked to a PO with goods receipt |
| `{{MATERIAL_NUMBER_QI}}` | An active material number configured for batch management (for QI stock scenarios) | SAP Fiori: Manage Material → search materials with batch management enabled; verify batches exist in QI Stock |
| `{{MATERIAL_DESCRIPTION}}` | Material description (auto-populated by SAP) | Shown in material master for the material number above |
| `{{MATERIAL_DESCRIPTION_QI}}` | Material description for QI stock material (auto-populated by SAP) | Shown in material master for the QI stock material number above |

### Quantity and Unit of Measure

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{RETURN_QUANTITY_STANDARD}}` | A standard, realistic return quantity | Use a quantity less than the available batch quantity (e.g., 10 KG if batch has 50 KG available) |
| `{{RETURN_QUANTITY_MIN}}` | Minimum UoM precision (lower boundary) | Typically 0.001 for materials with 3-decimal precision (e.g., 0.001 KG); confirm with material UoM configuration |
| `{{RETURN_QUANTITY_FULL}}` | Exact available batch quantity (full return) | Use the exact quantity shown in Display Stock Overview for the batch (e.g., if batch has 50 KG, use 50) |
| `{{RETURN_QUANTITY_OVER}}` | Quantity exceeding available stock (over-return attempt) | Use a quantity greater than available batch quantity (e.g., 9999 KG when batch has 50 KG) |
| `{{UNIT_OF_MEASURE}}` | Unit of measure configured for the material (auto-populated by SAP) | Shown in material master (e.g., KG, EA, PC, M) |

### Rejection Reason Code

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{REJECTION_REASON_CODE}}` | A configured rejection reason code for movement type 122 | SAP Fiori: Configuration → Inventory Management → Reason for Movement; search for codes configured for movement type 122 (e.g., 0001=Failed specification, 0002=Damaged packaging, 0003=Expired) |

### Organizational Structure

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{PLANT}}` | Plant code from the original goods receipt | SAP Fiori: Display Stock Overview → note the plant code for the batch; or check the goods receipt document for the plant |
| `{{STORAGE_LOCATION}}` | Storage location from the original goods receipt | SAP Fiori: Display Stock Overview → note the storage location for the batch; or check the goods receipt document |
| `{{PURCHASING_ORG_CODE}}` | Purchasing organization code assigned to the vendor and plant | SAP Fiori: Manage Purchase Orders → open the PO and note the purchasing organization |

### Vendor Data (Auto-populated by SAP)

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{VENDOR_ID}}` | Vendor account number from the Purchase Order (auto-populated) | Shown in the Purchase Order header; SAP auto-populates this when PO is entered |
| `{{VENDOR_NAME}}` | Vendor name from the Purchase Order (auto-populated) | Shown in the Purchase Order header; SAP auto-populates this when PO is entered |

### Debit Memo Options

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{TRIGGER_DEBIT_MEMO_YES}}` | Trigger debit memo request flag (checked/enabled) | Use "Yes", "true", "1", or "X" depending on SAP field type (checkbox or flag) |
| `{{TRIGGER_DEBIT_MEMO_NO}}` | Skip debit memo request flag (unchecked/disabled) | Use "No", "false", "0", or "" (empty) depending on SAP field type |

### Inspection Lot (Auto-populated by SAP)

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{INSPECTION_LOT_NUMBER}}` | Inspection lot number linked to the batch (auto-populated) | SAP Fiori: Display Stock Overview → select batch; SAP shows the inspection lot number |
| `{{INSPECTION_LOT_NUMBER_QI}}` | Inspection lot number for QI Stock batch (auto-populated) | SAP Fiori: Display Stock Overview → select batch in QI Stock; SAP shows the inspection lot number |

---

## Environment Values (from .env — not in testdata.json)

| Variable | Usage in Tests |
|----------|---------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation step 1 of every test case. Set in `.env` file. This is the full Fiori Launchpad URL including SSO parameters. |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login step 2 of every test case. Set in `.env` file. |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login step 4 of every test case. Set in `.env` file. |

---

## Test Data Setup Instructions

### Pre-requisites for Test Execution

1. **Create Test Purchase Orders with Goods Receipts:**
   - Use "Create Purchase Order" app to create POs for test materials
   - Post goods receipts using "Post Goods Receipt" app
   - Ensure batches are assigned during goods receipt posting
   - Verify batch quantities are visible in Display Stock Overview

2. **Move Batches to Restricted Stock:**
   - Use "Post Goods Movement" app with movement type 344 (Transfer from Unrestricted to Blocked Stock) or movement type 321 (Transfer from Unrestricted to Quality Inspection Stock)
   - This creates batches in Blocked Stock (stock type 'S') and Quality Inspection Stock (stock type 'X') for testing

3. **Configure Rejection Reason Codes:**
   - Verify that rejection reason codes are configured for movement type 122
   - Common codes: 0001=Failed specification, 0002=Damaged packaging, 0003=Expired, 0004=Wrong material
   - Path: Configuration → Inventory Management → Reason for Movement

4. **Verify Debit Memo Configuration (for AP-03 test case):**
   - Ensure debit memo request functionality is configured and active for the purchasing organization
   - Verify that the vendor master data allows debit memo creation

5. **Prepare Test Data for Edge Cases:**
   - **EDGE-01 (Min Quantity):** Verify that materials are configured to allow decimal precision (e.g., 0.001 KG)
   - **EDGE-02 (Full Return):** Create a batch with a known exact quantity (e.g., 50 KG) in restricted stock
   - **EDGE-03 (Over-return):** No setup needed — test uses an invalid over-return quantity
   - **EDGE-04 (Zero Quantity):** No setup needed — test uses zero as invalid input

---

## Important Notes

1. **Never commit real SAP IDs or credentials** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation should be done in a **dedicated SAP test system** — never use production data
3. The `PURCHASE_ORDER_INVALID`, `BATCH_INVALID` values must be verified to NOT exist in the test system before executing negative test cases
4. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured
5. If a required master data object does not exist in your test system, create it using the relevant SAP Fiori configuration apps before executing tests
6. **GMP Compliance:** This feature is audit-critical in regulated industries (pharma, food, medical devices). Ensure test data does not use real production batch numbers or vendor IDs
7. **Stock Removal Verification:** After each successful return delivery, verify stock quantities using "Display Stock Overview" app to confirm that stock is removed from the correct stock type (Blocked or QI)
8. **Debit Memo Verification:** For test cases involving debit memo requests (TC-CS-175, TC-CS-179), verify the debit memo request creation using "Manage Debit Memo Requests" app in the FI module

---

## Test Data Mapping Summary

| Scenario Type | Dataset Count | Key Placeholders Required |
|--------------|--------------|--------------------------|
| Happy Path | 2 | PURCHASE_ORDER_VALID, BATCH_BLOCKED_STOCK, BATCH_QI_STOCK, TRIGGER_DEBIT_MEMO_YES, TRIGGER_DEBIT_MEMO_NO |
| Alternative Path | 4 | PURCHASE_ORDER_VALID, PURCHASE_ORDER_VALID_QI, BATCH_BLOCKED_STOCK, BATCH_QI_STOCK, TRIGGER_DEBIT_MEMO_YES, TRIGGER_DEBIT_MEMO_NO |
| Negative | 5 | PURCHASE_ORDER_INVALID, PURCHASE_ORDER_NO_GR, BATCH_INVALID, BATCH_ZERO_QTY, BATCH_UNRESTRICTED_STOCK |
| Error | 3 | PURCHASE_ORDER_VALID, BATCH_BLOCKED_STOCK (with empty mandatory fields) |
| Edge Case | 4 | RETURN_QUANTITY_MIN, RETURN_QUANTITY_FULL, RETURN_QUANTITY_OVER, BATCH_FULL_RETURN |

**Total Unique Placeholders:** 29

---

## Troubleshooting

| Issue | Likely Cause | Solution |
|-------|-------------|----------|
| "Purchase Order does not exist" error during valid PO test | PO was deleted or system was refreshed | Verify PO exists in "Manage Purchase Orders"; create new PO if needed |
| "No goods receipt found" error during valid PO test | Goods receipt was reversed or not posted | Post goods receipt for the PO using "Post Goods Receipt" app |
| "Batch does not exist" error | Batch was not assigned during goods receipt | Re-post goods receipt with batch assignment; or use "Manage Batches" app to create batch |
| "No stock available" error | Batch quantity is zero or batch is in wrong stock type | Verify batch quantity in "Display Stock Overview"; transfer stock to Blocked or QI Stock if needed |
| "Stock type is not valid" error | Batch is in Unrestricted Stock instead of Blocked or QI | Use movement type 344 or 321 to transfer stock to restricted stock type |
| "Reason for Movement is required" error during HP test | Rejection reason code is not configured | Configure rejection reason codes in Inventory Management configuration |
| Debit memo request is not created | Debit memo functionality is not configured or vendor is not set up | Verify purchasing organization configuration and vendor master data allow debit memo creation |

---
