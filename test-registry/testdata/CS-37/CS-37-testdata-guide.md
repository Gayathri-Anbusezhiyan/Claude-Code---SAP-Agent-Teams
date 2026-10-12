# Test Data Guide: [CS-37] Process A Return Order For A Customer Complaint About A Defective Phar

**Generated:**    2026-08-24
**Module:**       SD — Sales and Distribution
**Feature:**      Return Order Processing for Customer Complaints
**Data File:**    testdata/CS-37/CS-37-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-37/CS-37-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Customer Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{CUSTOMER_ID_VALID}}` | An active customer (Sold-to Party) account number in the SAP test system | SAP Fiori: Manage Customers → search active customers; or T-code VD03/XD03. Use a customer assigned to the test sales organization and distribution channel. |
| `{{CUSTOMER_NAME_VALID}}` | The full name of the customer above (auto-populated) | Shown in customer master data for the customer ID above |
| `{{CUSTOMER_ID_INVALID}}` | A customer number that does NOT exist in SAP | Use a random number like "9999999999" — verify it returns "not found" in customer search |

### Material Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{MATERIAL_ID_VALID}}` | An active pharmaceutical material number configured for the test sales organization and plant; must be batch-managed | SAP Fiori: Manage Material → search materials with material type "ZPHA" (pharmaceutical) or equivalent; ensure batch management is active; or T-code MM03/MARA |
| `{{MATERIAL_DESCRIPTION_VALID}}` | Material description (auto-populated) | Shown in material master for the material ID above |
| `{{MATERIAL_ID_INVALID}}` | A material number that does NOT exist in SAP | Use a non-existent number like "ZZNOTEXIST" or "999999999" |

### Return Order Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{RETURN_QUANTITY_STANDARD}}` | A standard return quantity | Use 5–20 depending on the UoM (e.g., 10 for EA, 5 for large items) |
| `{{RETURN_QUANTITY_MIN}}` | Minimum valid return quantity (lower boundary) | Use 1 (the smallest valid quantity for return orders) |
| `{{RETURN_QUANTITY_MAX}}` | Maximum valid return quantity (upper boundary — matches original order quantity) | Use the delivered quantity from the original sales order (e.g., if original order was 50, use 50) |
| `{{RETURN_QUANTITY_EXCESS}}` | Return quantity exceeding original order (invalid boundary) | Use a value greater than the original delivered quantity (e.g., if original was 50, use 60 or 100) |
| `{{UNIT_OF_MEASURE}}` | Unit of measure configured for the material | Shown in material master (e.g., EA, PC, KG, L, BOT for pharmaceutical bottles) |
| `{{RETURN_REASON_CODE}}` | Return reason code for defective goods | SAP configuration → Reason for Rejection (T-code OVAU); use a code like "DEFE" (Defective), "QUAL" (Quality Issue), or equivalent configured for pharmaceutical returns |

### Quality Management Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{QUALITY_NOTIFICATION_VALID}}` | An existing Quality Notification (QM) number in the SAP test system | SAP Fiori: Manage Quality Notifications → search for notifications with type "Customer Complaint" and status "Open" or "In Process"; or T-code QM03. Use a notification linked to a batch-managed pharmaceutical material. |
| `{{QUALITY_NOTIFICATION_INVALID}}` | A Quality Notification number that does NOT exist in SAP | Use a non-existent number like "999999999999" (12 digits) |
| `{{BATCH_NUMBER_VALID}}` | Batch number of the defective pharmaceutical product (linked to the Quality Notification) | Shown in the Quality Notification details or material document for the original sales order delivery; or T-code MB03 (Material Document Display) |
| `{{INSPECTION_LOT_NUMBER}}` | Quality Inspection Lot number (auto-created by QM integration if configured) | Shown in the Quality Notification document flow or Return Order related documents after Return Order creation; or T-code QA03 |

### Sales Organization and Plant Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{SALES_ORGANIZATION_CODE}}` | Sales organization code assigned to the test customer and material | SAP Fiori: Configuration → Sales and Distribution → Sales Organizations; or T-code OVX3. Use a sales org configured for pharmaceutical distribution (e.g., 1000, 1710). |
| `{{DISTRIBUTION_CHANNEL_CODE}}` | Distribution channel code within the sales organization | SAP configuration → Distribution Channels; or T-code OVX2. Common values: 10 (Direct Sales), 20 (Wholesale), 30 (Retail). |
| `{{PLANT_CODE}}` | Plant code configured for the sales organization and material | SAP Fiori: Configuration → Enterprise Structure → Plants; or T-code OX10. Use a plant assigned to the sales organization (e.g., 1710, 1000). |

### Credit Processing Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{CREDIT_AMOUNT_CALCULATED}}` | Expected credit amount (quantity × unit price from original order or pricing conditions) | Calculated automatically by SAP based on return quantity and pricing; verify this matches the original sales order line item value for the returned material. Example: if return quantity = 10 and unit price = 50.00, credit amount = 500.00. |
| `{{CREDIT_AMOUNT_MIN}}` | Expected credit amount for minimum quantity (1 unit) | Calculated as 1 × unit price. Example: if unit price = 50.00, credit amount min = 50.00. |
| `{{CREDIT_AMOUNT_MAX}}` | Expected credit amount for maximum quantity (full original order quantity) | Calculated as original order quantity × unit price. Example: if original quantity = 50 and unit price = 50.00, credit amount max = 2500.00. |
| `{{CREDIT_MEMO_REQUEST_NUMBER}}` | Credit Memo Request document number (auto-generated by SAP FI/CO integration) | Shown in the Return Order document flow or related documents section after Return Order creation; or T-code VA03 (Display Sales Document) — check document flow. Format: 10-digit numeric. |

### Reference Documents

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{ORIGINAL_SALES_ORDER_VALID}}` | Original sales order number that was delivered to the customer (referenced in the return order) | SAP Fiori: Manage Sales Orders → search for completed sales orders with delivered status; or T-code VA03. Use a sales order with material `{{MATERIAL_ID_VALID}}` and customer `{{CUSTOMER_ID_VALID}}`. |
| `{{ORIGINAL_ORDER_QUANTITY}}` | Delivered quantity from the original sales order (for boundary testing) | Shown in the sales order line item; or T-code VA03 → Item Overview → Delivered Quantity column. |

---

## Environment Values (from .env — not in testdata.json)

| Variable | Usage in Tests |
|----------|---------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation step 1 of every test case. Set in `.env` file. Full URL including SSO parameters. |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login step 2 of every test case. Set in `.env` file. Email address for SAP IDP login. |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login step 4 of every test case. Set in `.env` file. Password for SAP IDP login. |

---

## Important Notes

1. **Never commit real SAP IDs or credentials** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation should be done in a **dedicated SAP test system** — never use production data
3. The `CUSTOMER_ID_INVALID`, `MATERIAL_ID_INVALID`, and `QUALITY_NOTIFICATION_INVALID` values must be verified to NOT exist in the test system before executing negative test cases
4. **Pharmaceutical compliance:** Use only test batch numbers and test materials for pharmaceutical return orders — never use real production batch numbers or patient-identifiable data
5. **Original sales order setup:** For EDGE test cases (TC-CS-030, TC-CS-031), create a test sales order with a known delivered quantity before executing the return order tests — use the same customer and material for consistency
6. **Quality Notification setup:** For integration test case TC-CS-032, create a test Quality Notification (Customer Complaint type) linked to the test material and batch before executing the return order test
7. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured
8. If a required master data object does not exist in your test system, create it using the relevant SAP Fiori configuration apps before executing tests
9. **Credit Memo Request verification:** For integration test case TC-CS-033, ensure that automatic credit processing is configured in SAP customizing for the sales organization — otherwise, Credit Memo Request may need to be created manually

---

## Test Data Dependency Map

| Test Case | Critical Pre-requisite Master Data |
|-----------|-----------------------------------|
| TC-CS-021 (HP) | Customer, Material (batch-managed), Quality Notification, Original Sales Order, Return Reason Code |
| TC-CS-022 (NEG-Customer) | Valid Material, Return Reason Code; Invalid Customer ID verified non-existent |
| TC-CS-023 (NEG-Material) | Valid Customer; Invalid Material ID verified non-existent |
| TC-CS-024 (NEG-QM) | Valid Customer, Valid Material; Invalid Quality Notification verified non-existent |
| TC-CS-025 to TC-CS-028 (ERR) | Valid Material, Return Reason Code (for test context); no pre-filled Customer/Material/Quantity/Reason in test execution |
| TC-CS-029 (EDGE-Min) | Customer, Material, Return Reason Code |
| TC-CS-030 (EDGE-Max) | Customer, Material, Original Sales Order with delivered quantity, Return Reason Code |
| TC-CS-031 (EDGE-Excess) | Customer, Material, Original Sales Order with delivered quantity, Return Reason Code |
| TC-CS-032 (INT-QM) | Customer, Material (batch-managed), Batch Number, Quality Notification (Open status), Return Reason Code |
| TC-CS-033 (INT-FI/CO) | Customer, Material, Return Reason Code; Credit processing configuration active |

---

## Data Preparation Checklist

Before executing CS-37 test cases, ensure the following test data is prepared in your SAP test system:

- [ ] Test Customer (Sold-to Party) created and assigned to test Sales Organization and Distribution Channel
- [ ] Test Pharmaceutical Material (batch-managed) created and configured for test Sales Organization and Plant
- [ ] Test Batch Number created for the pharmaceutical material (linked to a test production or goods receipt)
- [ ] Test Return Reason Code configured for defective goods returns
- [ ] Test Sales Organization, Distribution Channel, and Plant configured and linked
- [ ] Test Original Sales Order created and delivered (with known quantity) for the test customer and material
- [ ] Test Quality Notification created (Customer Complaint type, Open status) linked to the test material and batch
- [ ] Credit processing configuration verified active for the test sales organization
- [ ] Invalid test data IDs verified non-existent (invalid customer, material, quality notification)

---

**Generated by:** testcase-agent/skills/extract-testdata
**Date:** 2026-08-24
