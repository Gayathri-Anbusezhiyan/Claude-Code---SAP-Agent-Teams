# Test Data Guide: [CS-18] Receive Materials Into Batch-Managed Stock And Capture The Manufacturi

**Generated:**    2026-08-21
**Module:**       MM — Materials Management
**Feature:**      Batch-Managed Goods Receipt with Expiration Tracking
**Data File:**    testdata/CS-18/CS-18-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-18/CS-18-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Purchase Order Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{PO_NUMBER_BATCH_MANAGED}}` | An existing open Purchase Order containing a batch-managed material line item | SAP Fiori: "Manage Purchase Orders" → filter by status Open; select a PO with a batch-managed material; or create a test PO for a batch-managed material |
| `{{PO_ITEM_NUMBER}}` | The line item number from the PO that references the batch-managed material | Shown in the PO line items table (typically `10`, `20`, `30`, etc.) |

### Material Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{MATERIAL_ID_BATCH_MANAGED}}` | An active batch-managed material number in the SAP test system | SAP Fiori: "Manage Material" → search for materials where Batch Management flag is active (MARC-XCHPF = X); or T-code MM03/MM60 |
| `{{MATERIAL_DESCRIPTION_BATCH_MANAGED}}` | Material description for the batch-managed material (auto-populated in SAP) | Shown in material master for the material ID above |
| `{{MATERIAL_ID_BATCH_MANAGED_WITH_SHELF_LIFE}}` | A batch-managed material with a shelf-life profile configured in the material master (for auto-calculation testing) | Same as above, but verify in material master that field MARA-MHDHB (shelf-life period in days) is populated (e.g., 365 days) |
| `{{MATERIAL_DESCRIPTION_BATCH_MANAGED_WITH_SHELF_LIFE}}` | Material description for the shelf-life material | Shown in material master |

### Batch Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{BATCH_NUMBER_NEW}}` | A batch number that does NOT yet exist in SAP (will be created during GR posting) | Use a unique alphanumeric value like `BATCH-TEST-001`, `BAT2026001`, etc. — verify it does not exist by searching in "Display Batch" app |
| `{{BATCH_NUMBER_NEW_AUTO_CALC}}` | A different new batch number for auto-calculation testing | Use another unique batch ID like `BATCH-TEST-002` |
| `{{BATCH_NUMBER_NEW_OVERRIDE}}` | A different new batch number for manual override testing | Use another unique batch ID like `BATCH-TEST-003` |
| `{{VENDOR_BATCH_NUMBER}}` | The vendor's batch identifier (free-text field) | Use a realistic vendor batch format like `VB-12345`, `SUPPLIER-BATCH-001`, etc. |

### Quantity and UoM

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{GR_QUANTITY_STANDARD}}` | A standard realistic goods receipt quantity | Use 1–100 depending on the UoM (e.g., 10 for EA, 1000 for KG) |
| `{{GR_QUANTITY_MIN}}` | Minimum valid quantity (lower boundary) | Typically `1` or `0.001` depending on UoM decimal precision; confirm with material master configuration |

### Manufacturing Date

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{MFG_DATE_PAST}}` | A valid manufacturing date in the past (not today, not in the future) | Use a date 7–30 days in the past from test execution date; format YYYY-MM-DD (e.g., 2026-07-15) |
| `{{MFG_DATE_TODAY}}` | Today's date (upper boundary for manufacturing date) | Calculate as: today; format YYYY-MM-DD |
| `{{MFG_DATE_FUTURE}}` | A date in the future (INVALID — for negative testing) | Use a future date like today + 7 days; format YYYY-MM-DD |

### Expiration Date

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{EXPIRATION_DATE_FUTURE}}` | A valid expiration date in the future (after manufacturing date, after today) | Use a date at least 30 days from test execution date; must be after `{{MFG_DATE_PAST}}`; format YYYY-MM-DD |
| `{{EXPIRATION_DATE_PAST_EXPIRED}}` | An expiration date in the past (INVALID — for negative testing per AC-5) | Use a past date like 2025-12-01; format YYYY-MM-DD |
| `{{EXPIRATION_DATE_BEFORE_MFG_DATE}}` | An expiration date earlier than the manufacturing date (INVALID — for negative testing) | Use a date that is earlier than `{{MFG_DATE_PAST}}`; format YYYY-MM-DD |
| `{{EXPIRATION_DATE_MANUAL_OVERRIDE}}` | A valid future expiration date used to manually override the auto-calculated value | Use a different future date than the auto-calculated value (e.g., if auto-calc is mfg + 365 days, use mfg + 180 days); format YYYY-MM-DD |
| `{{EXPIRATION_DATE_MFG_PLUS_1_DAY}}` | Expiration date exactly 1 day after manufacturing date (minimal shelf life boundary) | Calculate as: `{{MFG_DATE_PAST}}` + 1 day; format YYYY-MM-DD |

### Organizational Structure

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{PLANT_CODE}}` | Plant code configured for the test purchasing organization and company code | SAP Fiori: Configuration → Enterprise Structure → Plants; or T-code OX10; use the plant associated with the PO |
| `{{STORAGE_LOCATION_CODE}}` | Storage location code active for the plant | SAP Fiori: Configuration → Storage Locations; or T-code OX09; ensure the storage location is assigned to the plant above |

---

## Environment Values (from .env — not in testdata.json)

| Variable | Usage in Tests |
|----------|---------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation step 1 of every test case. Set in `.env` file. Includes SSO parameters. |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login step 2 of every test case. Set in `.env` file. |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login step 4 of every test case. Set in `.env` file. |

---

## Important Notes

1. **Never commit real SAP IDs or credentials** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation should be done in a **dedicated SAP test system** — never use production data
3. The batch numbers must be verified to NOT exist in the test system before executing happy path test cases (TC-CS-039, TC-CS-040, TC-CS-041, etc.)
4. The material IDs must be batch-managed (MARC-XCHPF = X) — verify in the material master before test execution
5. For auto-calculation testing (TC-CS-040), the material must have a shelf-life profile maintained (MARA-MHDHB field populated with shelf-life period in days)
6. For negative testing (TC-CS-042, TC-CS-043, TC-CS-044), ensure the dates are intentionally invalid per the test scenario
7. For error testing (TC-CS-045, TC-CS-046, TC-CS-047), the empty string `""` in the testdata JSON represents a blank mandatory field — do NOT replace with a value
8. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured
9. If a required master data object does not exist in your test system, create it using the relevant SAP Fiori configuration apps before executing tests

---

## Batch Management Configuration Check

Before executing CS-18 test cases, verify the following in your SAP test system:

| Configuration | Location | Requirement |
|--------------|----------|-------------|
| Material Master — Batch Management Flag | Material → General Data → Batch Management (MARC-XCHPF) | Must be checked (X) |
| Material Master — Shelf Life Profile | Material → General Data → Shelf Life (MARA-MHDHB) | Must be populated with shelf-life period in days (e.g., 365) for auto-calculation test cases |
| Purchase Order | Manage Purchase Orders | PO must exist with status Open; PO line item must reference the batch-managed material |
| Plant and Storage Location | Configuration → Enterprise Structure | Plant and storage location must be active and assigned correctly |

---
