# Test Data Guide: [CS-25] Perform A Batch-Specific Physical Inventory Count For Cold-Chain-Store

**Generated:**    2026-08-24
**Module:**       MM (Materials Management)
**Feature:**      Batch-Specific Physical Inventory Count
**Data File:**    test-registry/testdata/CS-25/CS-25-testdata.json

---

## How to Use This Guide

1. Open `test-registry/testdata/CS-25/CS-25-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value in the JSON
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — **do NOT commit real SAP values to version control**
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Plant and Location Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{PLANT_CODE}}` | A valid plant code in the SAP test system where physical inventory is performed | SAP Fiori: Manage Plants → search active plants; or use transaction code OX10/T001W |
| `{{STORAGE_LOCATION_COLD_CHAIN}}` | A storage location designated for cold-chain storage (temperature-controlled) | SAP Fiori: Manage Storage Locations → filter by plant and type (cold chain); or use T-code OX09/T001L |
| `{{STORAGE_LOCATION_INVALID}}` | A storage location code that does NOT exist in SAP | Use a non-existent code like "ZZZZ" or "9999" — verify it returns "not found" when searched |
| `{{STORAGE_BIN_COLD_CHAIN}}` | A storage bin within the cold-chain storage location (optional) | SAP Fiori: Display Storage Bins → search by storage location; or use T-code LS03N |

### Batch Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{BATCH_NUMBER_VALID}}` | An existing batch number in SAP batch master (MCHA) for a batch-managed material | SAP Fiori: Manage Batches → search by material and plant; or use T-code MSC3N/MCHA |
| `{{BATCH_NUMBER_1}}` | First batch number for multi-batch scenario | Same as above — select first batch in storage location |
| `{{BATCH_NUMBER_2}}` | Second batch number for multi-batch scenario | Same as above — select second batch in same storage location |
| `{{BATCH_NUMBER_INVALID}}` | A batch number that does NOT exist in SAP | Use a non-existent batch like "BATCH9999999" — verify it returns "not found" |

### Material Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{MATERIAL_ID_BATCH_MANAGED}}` | A batch-managed material number configured for the test plant and storage location | SAP Fiori: Manage Material → search materials with batch management flag; or use T-code MM03/MARA (check "Batch Management" flag) |
| `{{MATERIAL_ID_BATCH_MANAGED_2}}` | Second batch-managed material for multi-batch scenario | Same as above — select a different material with batch management |
| `{{MATERIAL_DESCRIPTION}}` | Material description (auto-populated by SAP) | Shown in material master for the material ID above (do not manually enter — SAP auto-fills) |
| `{{UNIT_OF_MEASURE}}` | Base unit of measure for the material | Shown in material master (e.g., "KG", "EA", "L") — auto-populated by SAP |

### Quantity Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{BOOK_QUANTITY_STANDARD}}` | Standard book inventory quantity in SAP system | Use 100 as a typical value (adjust based on UoM and material type) |
| `{{BOOK_QUANTITY_BATCH_1}}` | Book quantity for first batch in multi-batch scenario | Use 50 |
| `{{BOOK_QUANTITY_BATCH_2}}` | Book quantity for second batch in multi-batch scenario | Use 30 |
| `{{BOOK_QUANTITY_HIGH}}` | High book quantity for complete loss scenario | Use 500 or 1000 |
| `{{COUNTED_QUANTITY_WITHIN_TOLERANCE}}` | Counted quantity within tolerance threshold (e.g., book=100, counted=102) | Calculate based on book quantity and tolerance (e.g., if tolerance=5%, use 102 for book=100) |
| `{{COUNTED_QUANTITY_EXCEEDS_TOLERANCE}}` | Counted quantity exceeding tolerance threshold (e.g., book=100, counted=110) | Calculate to exceed tolerance (e.g., if tolerance=5%, use 110 for book=100) |
| `{{COUNTED_QUANTITY_BATCH_1}}` | Counted quantity for first batch | Use 48 (variance of -2) |
| `{{COUNTED_QUANTITY_BATCH_2}}` | Counted quantity for second batch | Use 32 (variance of +2) |
| `{{COUNTED_QUANTITY_NEGATIVE}}` | Negative quantity (invalid test data) | Use "-10" to test rejection of negative values |
| `{{COUNTED_QUANTITY_MAX}}` | Maximum system-allowed counted quantity | Use 999999 or system max configured in SAP |
| `{{COUNTED_QUANTITY_AT_TOLERANCE}}` | Counted quantity exactly at tolerance threshold boundary | Calculate exactly at threshold (e.g., if tolerance=5% and book=100, use 105) |
| `{{COUNTED_QUANTITY_ABOVE_TOLERANCE}}` | Counted quantity one unit above tolerance threshold | Calculate one unit above threshold (e.g., if tolerance=5% and book=100, use 106) |

### Variance Data (Auto-calculated by SAP)

| Placeholder | Description | Calculation Formula |
|-------------|-------------|---------------------|
| `{{VARIANCE_AMOUNT_WITHIN_TOL}}` | Variance amount within tolerance | Counted - Book (e.g., 102 - 100 = 2) |
| `{{VARIANCE_AMOUNT_EXCEEDS_TOL}}` | Variance amount exceeding tolerance | Counted - Book (e.g., 110 - 100 = 10) |
| `{{VARIANCE_AMOUNT_BATCH_1}}` | Variance for first batch | Counted1 - Book1 (e.g., 48 - 50 = -2) |
| `{{VARIANCE_AMOUNT_BATCH_2}}` | Variance for second batch | Counted2 - Book2 (e.g., 32 - 30 = 2) |
| `{{VARIANCE_AMOUNT_AT_TOL}}` | Variance exactly at tolerance threshold | Counted - Book (e.g., 105 - 100 = 5) |
| `{{VARIANCE_AMOUNT_ABOVE_TOL}}` | Variance one unit above tolerance | Counted - Book (e.g., 106 - 100 = 6) |
| `{{VARIANCE_NEGATIVE_FULL}}` | Complete loss variance (counted=0) | 0 - Book (e.g., 0 - 100 = -100) |
| `{{VARIANCE_NEGATIVE_FULL_HIGH}}` | Complete loss for high book quantity | 0 - BookHigh (e.g., 0 - 500 = -500) |
| `{{VARIANCE_POSITIVE_MAX}}` | High positive variance for max quantity | CountedMax - Book (e.g., 999999 - 100 = 999899) |
| `{{VARIANCE_PERCENTAGE_WITHIN_TOL}}` | Variance percentage within tolerance | (Variance / Book) * 100 (e.g., (2/100)*100 = 2%) |
| `{{VARIANCE_PERCENTAGE_EXCEEDS_TOL}}` | Variance percentage exceeding tolerance | (Variance / Book) * 100 (e.g., (10/100)*100 = 10%) |
| `{{VARIANCE_PERCENTAGE_MAX}}` | High variance percentage for max quantity | (VarianceMax / Book) * 100 |
| `{{VARIANCE_PERCENTAGE_ABOVE_TOL}}` | Variance percentage one unit above tolerance | (VarianceAbove / Book) * 100 (e.g., (6/100)*100 = 6%) |

### Configuration Data

| Placeholder | Description | How to Find/Configure in SAP |
|-------------|-------------|------------------------------|
| `{{TOLERANCE_THRESHOLD_PERCENTAGE}}` | Tolerance threshold percentage configured in SAP for variance approval | SAP T-code: OMCO → Configure tolerance limits for physical inventory; use 5% as a typical value |

### Approval Workflow Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{REASON_CODE_VARIANCE}}` | Reason code for variance explanation | SAP Fiori: Manage Physical Inventory → check reason code dropdown; use codes like "DAMAGE", "EXPIRED", "THEFT" or numeric codes from customizing (T-code OMBC) |
| `{{REASON_CODE_COMPLETE_LOSS}}` | Reason code for complete inventory loss | Use specific reason code for total loss (e.g., "COMPLOSS", "THEFT", "DESTROYED") |
| `{{SUPERVISOR_USER_ID}}` | SAP user ID of supervisor authorized to approve high variances | Use a valid SAP user with supervisor authorization; check authorization object I_INVE (Inventory Authorization); example format: "SUPERVISOR01" or actual user ID from SU01 |

---

## Environment Dependencies

These placeholders are resolved from the `.env` file and should **NOT** be replaced in the JSON:

| Placeholder | Description | Source |
|-------------|-------------|--------|
| `{ENV.SAP_FIORI_URL}` | Full SAP Fiori Launchpad URL including SSO parameters | Read from `.env` file: `SAP_FIORI_URL` variable |
| `{ENV.SAP_USERNAME}` | SAP user email for login | Read from `.env` file: `SAP_USERNAME` variable |
| `{ENV.SAP_PASSWORD}` | SAP user password for login | Read from `.env` file: `SAP_PASSWORD` variable |

---

## Test Data Resolution Strategy

### Step 1: Resolve Master Data (One-Time Setup)
1. Identify a valid plant, storage location (cold-chain type), and batch-managed material
2. Create or identify existing batches in the SAP test system
3. Ensure batches have book inventory quantities configured
4. Document the IDs in a local configuration file (do not commit to repo)

### Step 2: Configure Tolerance Threshold
1. Access SAP transaction OMCO
2. Set tolerance threshold percentage (recommended: 5%)
3. Document the configured percentage

### Step 3: Calculate Variance Scenarios
1. Choose a base book quantity (e.g., 100)
2. Calculate counted quantities for each scenario:
   - Within tolerance: 102 (2% variance)
   - Exceeds tolerance: 110 (10% variance)
   - At tolerance: 105 (5% variance)
   - Above tolerance: 106 (6% variance)
3. Document the calculated values

### Step 4: Identify Supervisor User
1. Find a user with physical inventory approval authorization
2. Verify authorization object I_INVE
3. Document the user ID

### Step 5: Replace Placeholders
1. Open CS-25-testdata.json
2. Use find/replace for each placeholder with actual value
3. Save as CS-25-testdata-resolved.json (local only — never commit)

---

## Sample Resolved Values (Example Only — Do Not Use Directly)

**WARNING:** These are example values only. Replace with actual values from your SAP test system.

```json
"plant": "1710",
"storageLocation": "CC01",
"batchNumber": "BATCH20260101",
"materialId": "BIOMAT001",
"bookQuantity": "100",
"countedQuantity": "102",
"toleranceThreshold": "5",
"reasonCode": "VARIANCE",
"supervisorApproval": "SUPERVISOR01"
```

---

## Regulatory Compliance Notes

- **Cold-Chain Storage**: Ensure storage location master data includes temperature control parameters
- **Batch Traceability**: Batch numbers must be unique and traceable for pharmaceutical/food industries
- **Audit Trail**: All physical inventory documents are immutable and must retain complete history
- **Approval Workflow**: Supervisor approval for high variances is a regulatory requirement — do not skip or bypass
- **Test Data Isolation**: Use dedicated test batches and materials — never use production data
- **Data Privacy**: Do not commit resolved test data with real SAP IDs to version control

---

## Troubleshooting

| Issue | Resolution |
|-------|-----------|
| Batch not found error | Verify batch exists in MCHA table for the material and plant; check batch status is active |
| Storage location not found | Verify storage location exists in T001L table; check plant assignment |
| Tolerance threshold not applied | Configure tolerance in OMCO transaction; restart SAP session |
| Supervisor approval fails | Verify user has authorization object I_INVE with appropriate activity; check role assignment |
| Material not batch-managed | Check material master (MM03) → "Batch Management" indicator must be set; may require material change via MM02 |
| Negative variance not allowed | This is expected behavior — test case verifies rejection; do not configure SAP to allow negative stock |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-08-24 | Initial test data guide for CS-25; 41 placeholders defined; 20 datasets documented |
