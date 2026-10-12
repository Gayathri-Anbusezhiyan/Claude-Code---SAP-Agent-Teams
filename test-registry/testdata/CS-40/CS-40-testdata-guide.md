# Test Data Guide: [CS-40] User Story SD-008

**Generated:**    2026-08-24
**Module:**       SD — Sales and Distribution
**Feature:**      Available-to-Promise (ATP) Check with Batch Expiration Logic
**Data File:**    testdata/CS-40/CS-40-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-40/CS-40-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Material Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{MATERIAL_ID_BATCH_MANAGED}}` | An active batch-managed material number in the SAP test system | SAP Fiori: Manage Material → search materials with batch management active; or T-code MM60/MARA; verify "Batch Management" checkbox is active |
| `{{MATERIAL_DESCRIPTION_BATCH_MANAGED}}` | Material description (auto-populated) | Shown in material master for the material ID above |
| `{{MATERIAL_ID_INVALID}}` | A material number that does NOT exist in SAP | Use a non-existent number like "ZZNOTEXIST" or "9999999999" |
| `{{MATERIAL_ID_NON_BATCH_MANAGED}}` | An active material number WITHOUT batch management enabled | SAP Fiori: Manage Material → search materials; verify "Batch Management" checkbox is NOT active |
| `{{MATERIAL_DESCRIPTION_NON_BATCH_MANAGED}}` | Material description for non-batch-managed material (auto-populated) | Shown in material master for the non-batch-managed material ID above |

### Customer Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{CUSTOMER_ID_VALID}}` | An active customer account number (Sold-to Party) in the SAP test system | SAP Fiori: Manage Customer Master → search active customers; or T-code XD03/KNA1 |
| `{{CUSTOMER_NAME_VALID}}` | The full name of the customer above (auto-populated) | Shown in customer master data for the customer ID above |
| `{{CUSTOMER_ID_INVALID}}` | A customer number that does NOT exist in SAP | Use a random number like "9999999999" — verify it returns "not found" in customer search |

### Quantity and Price

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{ATP_QUANTITY_STANDARD}}` | A standard, realistic order quantity | Use 10–100 depending on the UoM (e.g., 10 for EA, 50 for KG) |
| `{{ATP_QUANTITY_MULTIPLE_BATCHES}}` | Order quantity that exceeds the available stock of any single batch (requires multi-batch allocation) | Use a quantity larger than any single batch's available stock (e.g., if Batch 1 has 50 units and Batch 2 has 30 units, use 70 units) |
| `{{ATP_QUANTITY_EXCESS}}` | Order quantity exceeding total available valid batch stock | Use a quantity larger than the sum of all available valid batch stock (e.g., if total stock is 100 units, use 150 units) |
| `{{ATP_QUANTITY_MIN}}` | Minimum valid quantity (lower boundary) | Typically 1; confirm with system configuration |
| `{{ATP_QUANTITY_MAX}}` | Maximum valid quantity (entire available stock) | Use the total available stock across all valid batches |
| `{{UNIT_OF_MEASURE}}` | Unit of measure configured for the material | Shown in material master (e.g., EA, PC, KG, M) |

### Batch Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{BATCH_NUMBER_VALID_SLED}}` | A batch number with a valid SLED (Shelf Life Expiration Date) that exceeds the delivery date + minimum shelf life buffer | SAP Fiori: Manage Batches (MCHA) → search batches for the material/plant; verify SLED is at least 30–60 days in the future from delivery date |
| `{{BATCH_SLED_VALID}}` | Shelf Life Expiration Date (SLED) of the valid batch | Shown in batch master data (MCHA-VFDAT field); format YYYY-MM-DD; must be > delivery date + buffer |
| `{{BATCH_AVAILABLE_QUANTITY}}` | Available stock quantity for the batch | Shown in batch stock overview (MMBE transaction); use unrestricted stock quantity |
| `{{BATCH_NUMBER_1_VALID_SLED}}` | First batch number (for multi-batch scenarios) | Same as above; select a batch with partial stock |
| `{{BATCH_SLED_1_VALID}}` | SLED of the first batch | SLED must be > delivery date + buffer |
| `{{BATCH_1_AVAILABLE_QUANTITY}}` | Available stock quantity for the first batch | Partial stock quantity (e.g., 50 units) |
| `{{BATCH_NUMBER_2_VALID_SLED}}` | Second batch number (for multi-batch scenarios) | Same as above; select a second batch with partial stock |
| `{{BATCH_SLED_2_VALID}}` | SLED of the second batch | SLED must be > delivery date + buffer |
| `{{BATCH_2_AVAILABLE_QUANTITY}}` | Available stock quantity for the second batch | Partial stock quantity (e.g., 30 units) |
| `{{BATCH_SLED_EXPIRING}}` | Batch SLED that is nearing expiration (falls before or on delivery date + buffer) | Use a SLED that is <= delivery date + buffer (e.g., if delivery date is 2026-09-01 and buffer is 30 days, use SLED 2026-09-30 or earlier) |
| `{{BATCH_SLED_ABOVE_THRESHOLD}}` | Batch SLED exactly 1 day above the threshold (delivery date + buffer + 1 day) | Calculate as: delivery date + buffer + 1 day; format YYYY-MM-DD |
| `{{BATCH_SLED_AT_THRESHOLD}}` | Batch SLED exactly at the threshold (delivery date + buffer) | Calculate as: delivery date + buffer; format YYYY-MM-DD |
| `{{BATCH_SLED_BELOW_THRESHOLD}}` | Batch SLED exactly 1 day below the threshold (delivery date + buffer - 1 day) | Calculate as: delivery date + buffer - 1 day; format YYYY-MM-DD |
| `{{BATCH_SLED_AT_DELIVERY_DATE}}` | Batch SLED exactly equal to the delivery date (for zero buffer scenario) | Calculate as: delivery date; format YYYY-MM-DD |

### Organizational Structure

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{SALES_ORG_CODE}}` | Sales organization code assigned to the test customer | SAP Fiori: Configuration → Sales Organizations; or T-code OVX3 |
| `{{DISTRIBUTION_CHANNEL_CODE}}` | Distribution channel code within the sales org | SAP configuration → Distribution Channels; or T-code OVXT |
| `{{DIVISION_CODE}}` | Division code | SAP configuration → Divisions; or T-code OVXC |
| `{{PLANT_CODE}}` | Plant code configured for the sales org | SAP Fiori: Configuration → Enterprise Structure → Plants; or T-code OX10 |

### Dates

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{DATE_FUTURE_7D}}` | A delivery date at least 7 calendar days from the test execution date | Calculate as: today + 7 days; format YYYY-MM-DD (e.g., if today is 2026-08-24, use 2026-08-31 or later) |
| `{{DATE_TODAY}}` | Current date (today) | Use the date of test execution; format YYYY-MM-DD |
| `{{DATE_PAST}}` | A date in the past (for negative/validation tests) | Use any past date, e.g., 2024-01-01; format YYYY-MM-DD |

### Integration Test Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{MM_IM_AVAILABLE_STOCK}}` | Available stock quantity from MM-IM (Inventory Management) | SAP Fiori: Stock Overview (MMBE) → unrestricted stock for material/plant; cross-reference with ATP confirmation result |
| `{{BATCH_MGMT_SLED}}` | Batch SLED data from Batch Management module | SAP Fiori: Manage Batches (MCHA) → SLED field (VFDAT); cross-reference with ATP batch assignment result |

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
3. The `MATERIAL_ID_INVALID` and `CUSTOMER_ID_INVALID` values must be verified to NOT exist in the test system before executing negative test cases
4. Batch SLED data and ATP configuration parameters (shelf life buffer) must be validated against test tenant configuration before test execution
5. For EDGE scenarios involving SLED boundaries (TC-CS-170 to TC-CS-173), batch master data must be manually configured to match the exact boundary values specified
6. For INTEGRATION scenarios (TC-CS-179 and TC-CS-180), pre-verify master data in MM-IM and Batch Management modules before executing ATP check tests
7. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured
8. If a required master data object does not exist in your test system, create it using the relevant SAP Fiori configuration apps before executing tests
9. **CRITICAL:** For CS-40 (CRITICAL risk story), all test data must reflect realistic shelf-life-sensitive materials (e.g., pharmaceuticals, food & beverage, chemicals)
10. Minimum shelf life buffer configuration must be documented per material — typical values are 30, 60, or 90 days depending on industry

---

## Data Preparation Checklist

Before executing CS-40 test cases:

- [ ] Verify at least 1 batch-managed material exists in the test system
- [ ] Verify at least 2 batches exist for the batch-managed material with valid SLEDs
- [ ] Verify at least 1 non-batch-managed material exists for NEG-005 test
- [ ] Verify customer master data exists and is assigned to the sales org
- [ ] Verify sales org, distribution channel, division, and plant are configured and active
- [ ] Verify minimum shelf life buffer is configured for the batch-managed material
- [ ] Verify batch SLED data is accurate and up-to-date in Batch Management (MCHA)
- [ ] Verify available stock quantities are accurate in MM-IM (MMBE)
- [ ] Document the configured minimum shelf life buffer value for reference during EDGE test execution
- [ ] For EDGE scenarios TC-CS-170 to TC-CS-173, manually configure batches with exact SLED boundaries as specified

---

## Example Data Set (for reference only — replace with your system values)

```json
{
  "MATERIAL_ID_BATCH_MANAGED": "MAT-PHARMA-001",
  "MATERIAL_DESCRIPTION_BATCH_MANAGED": "Pharmaceutical Product with Batch Management",
  "CUSTOMER_ID_VALID": "1000123",
  "CUSTOMER_NAME_VALID": "Acme Healthcare Ltd.",
  "ATP_QUANTITY_STANDARD": "50",
  "ATP_QUANTITY_MIN": "1",
  "DATE_FUTURE_7D": "2026-09-01",
  "PLANT_CODE": "1710",
  "SALES_ORG_CODE": "1710",
  "DISTRIBUTION_CHANNEL_CODE": "01",
  "DIVISION_CODE": "00",
  "BATCH_NUMBER_VALID_SLED": "BATCH-2026-08-001",
  "BATCH_SLED_VALID": "2026-12-31",
  "BATCH_AVAILABLE_QUANTITY": "100",
  "UNIT_OF_MEASURE": "EA"
}
```

**Note:** The above example values are for illustration only. Replace all values with actual data from your SAP test tenant (my426318.s4hana.cloud.sap).
