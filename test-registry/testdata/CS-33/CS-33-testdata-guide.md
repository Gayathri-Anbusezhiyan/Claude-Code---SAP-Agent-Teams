# Test Data Guide: [CS-33] User Story SD-001

**Generated:**    2026-08-23
**Module:**       SD — Sales and Distribution
**Feature:**      Sales Order Creation with FEFO Batch Determination
**Data File:**    testdata/CS-33/CS-33-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-33/CS-33-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Customer Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{CUSTOMER_ID_VALID}}` | An active customer account number (Sold-To Party) in the SAP test system | SAP Fiori: Manage Customer Master → search active customers; or T-code XD03/VD03 |
| `{{CUSTOMER_NAME_VALID}}` | The full name of the customer above (auto-populated) | Shown in customer master data for the customer ID above |

---

### Material Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{MATERIAL_ID_BATCH_MANAGED_FEFO}}` | An active batch-managed pharmaceutical material number with FEFO strategy configured at plant level | SAP Fiori: Manage Material → search materials with XCHPF = X (batch-managed); verify FEFO batch determination strategy is configured in material master/plant data view |
| `{{MATERIAL_DESCRIPTION_BATCH_MANAGED}}` | Material description (auto-populated) | Shown in material master for the material ID above |
| `{{MATERIAL_ID_BATCH_MANAGED_NO_FEFO}}` | An active batch-managed material WITHOUT FEFO strategy configured | Use a batch-managed material (XCHPF = X) but ensure FEFO batch determination strategy is NOT configured at plant level |
| `{{MATERIAL_DESCRIPTION_NO_FEFO}}` | Material description for no-FEFO material (auto-populated) | Shown in material master for the material ID above |
| `{{MATERIAL_ID_NO_AVAILABLE_BATCHES}}` | A batch-managed material with FEFO configured but NO available batches (all expired or zero stock) | Use a material configured for FEFO but ensure all batches have zero available stock or expired status |
| `{{MATERIAL_DESCRIPTION_NO_BATCHES}}` | Material description for no-batches material (auto-populated) | Shown in material master for the material ID above |

---

### Quantity and Units

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{SO_QUANTITY_STANDARD}}` | A standard, realistic order quantity | Use 1–100 depending on the sales UoM (e.g., 10 for EA, 1 for large items) |
| `{{SO_QUANTITY_EXACT_BATCH_STOCK}}` | Quantity exactly equal to available batch stock (upper boundary) | Use the exact available quantity of a specific batch for boundary testing (e.g., if batch has 15 EA available, use 15) |
| `{{SALES_UNIT_OF_MEASURE}}` | Sales unit of measure configured for the material | Shown in material master sales data view (e.g., EA, PC, KG, L) |

---

### Organizational Structure

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{SALES_ORG_CODE}}` | Sales organization code assigned to the test user | SAP Fiori: Configuration → Enterprise Structure → Sales Organizations; or T-code OVXD |
| `{{DISTRIBUTION_CHANNEL_CODE}}` | Distribution channel code within the sales org | SAP configuration → Distribution Channels; or T-code OVXK |
| `{{DIVISION_CODE}}` | Division code within the sales org | SAP configuration → Divisions; or T-code OVXM |
| `{{PLANT_CODE}}` | Plant code configured for the sales org and material | SAP Fiori: Configuration → Enterprise Structure → Plants; or T-code OX10 |
| `{{SHIPPING_POINT_CODE}}` | Shipping point code for delivery creation (integration test) | SAP configuration → Shipping Points; or T-code OVXJ |

---

### Dates

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{DELIVERY_DATE_FUTURE_30D}}` | A delivery date at least 30 calendar days from the test execution date | Calculate as: today + 30 days; format YYYY-MM-DD |
| `{{DELIVERY_DATE_BOUNDARY_EQUAL}}` | A delivery date exactly equal to batch expiration date (boundary test) | Calculate based on batch expiration date; use same date for both delivery and expiration |

---

### Batch Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{BATCH_FEFO_EARLIEST_EXPIRATION}}` | Batch number with earliest expiration date (FEFO logic should select this) | SAP Fiori: Manage Batches (MCHA) → search batches for material/plant; identify batch with earliest valid expiration date (VFDAT) |
| `{{BATCH_EXPIRATION_DATE_VALID}}` | Expiration date of the FEFO-selected batch (VFDAT) | Shown in batch master data; format YYYY-MM-DD; must be AFTER the requested delivery date |
| `{{BATCH_OVERRIDE_VALID}}` | Alternative valid batch number (for manual override test) | Use a different batch for the same material with valid expiration date and available stock |
| `{{BATCH_OVERRIDE_EXPIRATION_DATE_VALID}}` | Expiration date of the override batch (VFDAT) | Shown in batch master data; format YYYY-MM-DD; must be AFTER the requested delivery date |
| `{{BATCH_EXPIRED_BEFORE_DELIVERY}}` | Batch number with expiration date BEFORE the requested delivery date | Use a batch with VFDAT < requested delivery date (expired for the delivery window) |
| `{{BATCH_EXPIRATION_EQUAL_TO_DELIVERY}}` | Batch number with expiration date EXACTLY EQUAL to the requested delivery date | Use a batch with VFDAT = requested delivery date (boundary condition) |
| `{{BATCH_EXPIRATION_DATE_EQUAL}}` | Expiration date equal to delivery date | Same date as `{{DELIVERY_DATE_BOUNDARY_EQUAL}}`; format YYYY-MM-DD |
| `{{BATCH_EXPIRATION_MINUS_1_DAY}}` | Batch number with expiration date ONE DAY BEFORE the requested delivery date | Use a batch with VFDAT = requested delivery date - 1 day (lower boundary - expired) |
| `{{BATCH_WITH_EXACT_STOCK}}` | Batch number with available stock exactly equal to order quantity | Identify a batch where available stock = order quantity exactly (no excess) |
| `{{BATCH_EXACT_STOCK_EXPIRATION_DATE}}` | Expiration date of the exact-stock batch | Shown in batch master data; format YYYY-MM-DD |
| `{{BATCH_TIE_OPTION_1}}` | First batch with identical expiration date (tie condition) | Identify two batches with the same VFDAT; record the first batch number |
| `{{BATCH_TIE_OPTION_2}}` | Second batch with identical expiration date (tie condition) | Identify two batches with the same VFDAT; record the second batch number |
| `{{BATCH_IDENTICAL_EXPIRATION_DATE}}` | Expiration date shared by both tie-breaker batches | The common VFDAT for both batches; format YYYY-MM-DD |

---

### Batch Override Reason Code

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{BATCH_OVERRIDE_REASON_CODE_VALID}}` | Valid reason code for manual batch override | SAP customizing: batch change reason codes table (IMG → Sales and Distribution → Basic Functions → Batch Determination → Define Reason Codes for Batch Changes); use a configured reason code (e.g., "01" or "CUST_REQUEST") |

---

### Document Numbers (Output)

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{SO_NUMBER_GENERATED}}` | Sales Order number generated by SAP (output from test execution) | System-generated during test execution; 10-digit format (e.g., 4000000001) |
| `{{DELIVERY_NUMBER_GENERATED}}` | Delivery Document number generated by SAP (output from test execution) | System-generated during delivery creation in integration test; 10-digit format (e.g., 8000000001) |

---

## Environment Values (from .env — not in testdata.json)

| Variable | Usage in Tests |
|----------|---------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation step 1 of every test case. Set in `.env` file. Full URL including SSO parameters. |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login step 2 of every test case. Set in `.env` file. |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login step 4 of every test case. Set in `.env` file. |

---

## Important Notes

1. **Never commit real SAP IDs or credentials** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation should be done in a **dedicated SAP test system** — never use production data
3. Batch master data (MCHA) must have realistic expiration dates (VFDAT) for pharmaceutical compliance testing
4. FEFO batch determination strategy must be configured at material master plant level (IMG → Materials Management → Inventory Management and Physical Inventory → Batch Determination → Define Batch Search Strategy) — use strategy type "FEFO" (First Expiry First Out)
5. Authorization object V_KONH_VKS is required for manual batch override — ensure test users with and without this authorization are available
6. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured
7. If a required master data object does not exist in your test system, create it using the relevant SAP Fiori configuration apps before executing tests
8. For integration test (TC-CS-048), ensure delivery creation authorization and shipping point configuration are complete

---

## Pharmaceutical Compliance Notes

- This test suite validates critical pharmaceutical distribution regulations (FDA CFR Title 21 Part 11, EU GDP guidelines)
- FEFO (First Expiry First Out) is a mandatory pharmaceutical inventory management requirement for patient safety
- All batch expiration date validations ensure expired products cannot be shipped to customers
- Manual batch override with reason code is required for GxP compliance and audit trail
- Batch propagation from Sales Order to Delivery must be deterministic (no re-determination) to maintain pharmaceutical traceability
- Test batches must have realistic expiration dates but must not interfere with production inventory
