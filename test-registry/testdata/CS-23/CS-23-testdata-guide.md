# Test Data Guide: CS-23 — User Story MM-008

**User Story:** [CS-23] User Story MM-008  
**Module:** MM — Materials Management (MRP/Planning)  
**Feature:** MRP with Shelf-Life Management for GMP Materials  
**Generated:** 2026-08-24  

---

## Purpose

This guide explains how to substitute real SAP values for the `{{PLACEHOLDER}}` tokens in `CS-23-testdata.json` before test execution. Each placeholder is mapped to a specific SAP master data element or configuration value that must exist in the target SAP test system.

---

## Master Data Prerequisites

Before executing test cases for CS-23, the following master data must be configured in the SAP test system:

### 1. GMP Materials with Shelf-Life Management

All test materials must have:
- Batch Management enabled (XCHPF = X in material master)
- Total Shelf Life (MHDHB) configured in days
- Minimum Remaining Shelf Life (MHDRZ) configured in days
- MRP Type configured (e.g., PD = MRP, ND = Reorder Point Planning)
- Procurement Type configured (E = In-house production, F = External procurement)

### 2. Plants Configured for MRP

All test plants must have:
- Valid MRP-relevant plant settings
- Planning calendar assigned
- MRP Controller assigned

### 3. Batches with Controlled Expiration Dates

Test scenarios require batches with specific remaining shelf-life values:
- Batches with remaining shelf life BELOW minimum threshold (near-expired)
- Batches with remaining shelf life EXACTLY equal to minimum threshold (boundary)
- Batches with remaining shelf life ABOVE minimum threshold (valid)

**Batch Expiration Date Calculation:**
- Remaining Shelf Life (days) = Batch Expiration Date (SLED) - Current Date
- For EDGE test cases, batch expiration dates must be precisely calculated based on test execution date

### 4. Purchasing Info Records (for External Procurement)

Materials configured for external procurement (F) must have:
- Valid purchasing info records with vendor assignments
- Planned Delivery Time (PLIFZ) configured

### 5. Production Versions (for In-house Production)

Materials configured for in-house production (E) must have:
- Valid production versions with BOM and routing
- Sufficient production capacity

---

## Placeholder Mapping Table

| Placeholder | SAP Field / Config | Description | Example Value | Data Type | Mandatory |
|-------------|-------------------|-------------|---------------|-----------|-----------|
| `{{GMP_MATERIAL_ID_STANDARD}}` | MARA-MATNR | GMP material with batch management and shelf-life configured | `GMP001` | Alphanumeric (18 chars) | Yes |
| `{{PLANT_CODE_MRP}}` | T001W-WERKS | Plant configured for MRP | `1710` | Alphanumeric (4 chars) | Yes |
| `{{MRP_CONTROLLER_CODE}}` | MARC-DISPO | MRP Controller code assigned to plant | `001` | Alphanumeric (3 chars) | Yes |
| `{{MRP_PROCESSING_KEY_NETCH}}` | Processing Key for MRP run | Net change processing | `NETCH` | Code | Yes |
| `{{MIN_SHELF_LIFE_STANDARD}}` | MARA-MHDRZ | Minimum remaining shelf life in days | `30` | Numeric | Yes |
| `{{TOTAL_SHELF_LIFE_STANDARD}}` | MARA-MHDHB | Total shelf life in days | `365` | Numeric | Yes |
| `{{BATCH_NUMBER_NEAR_EXPIRED}}` | MCHA-CHARG | Batch with remaining shelf life < min threshold | `BATCH001` | Alphanumeric (10 chars) | Yes |
| `{{MRP_ELEMENT_TYPE_PA_OR_BA}}` | MRP element type | PA = Planned Order, BA = Purchase Requisition | `PA` or `BA` | Code | No |
| `{{GMP_MATERIAL_ID_INHOUSE}}` | MARA-MATNR | GMP material with procurement type E (In-house) | `GMP002` | Alphanumeric (18 chars) | Yes |
| `{{PLANT_CODE_INHOUSE}}` | T001W-WERKS | Plant with production capability | `1710` | Alphanumeric (4 chars) | Yes |
| `{{MRP_CONTROLLER_CODE_INHOUSE}}` | MARC-DISPO | MRP Controller for in-house plant | `001` | Alphanumeric (3 chars) | Yes |
| `{{MIN_SHELF_LIFE_INHOUSE}}` | MARA-MHDRZ | Min shelf life for in-house material (days) | `60` | Numeric | Yes |
| `{{TOTAL_SHELF_LIFE_INHOUSE}}` | MARA-MHDHB | Total shelf life for in-house material (days) | `180` | Numeric | Yes |
| `{{PROCUREMENT_TYPE_INHOUSE}}` | MARC-BESKZ | Procurement type In-house production | `E` | Code | Yes |
| `{{GMP_MATERIAL_ID_EXTERNAL}}` | MARA-MATNR | GMP material with procurement type F (External) | `GMP003` | Alphanumeric (18 chars) | Yes |
| `{{PLANT_CODE_EXTERNAL}}` | T001W-WERKS | Plant for external procurement | `1710` | Alphanumeric (4 chars) | Yes |
| `{{MRP_CONTROLLER_CODE_EXTERNAL}}` | MARC-DISPO | MRP Controller for external plant | `001` | Alphanumeric (3 chars) | Yes |
| `{{MIN_SHELF_LIFE_EXTERNAL}}` | MARA-MHDRZ | Min shelf life for external material (days) | `45` | Numeric | Yes |
| `{{TOTAL_SHELF_LIFE_EXTERNAL}}` | MARA-MHDHB | Total shelf life for external material (days) | `270` | Numeric | Yes |
| `{{VENDOR_ID_EXTERNAL}}` | LFA1-LIFNR | Vendor account number for purchasing info record | `17300002` | Alphanumeric (10 chars) | Yes |
| `{{PROCUREMENT_TYPE_EXTERNAL}}` | MARC-BESKZ | Procurement type External | `F` | Code | Yes |
| `{{GMP_MATERIAL_ID_CONVERT_PA}}` | MARA-MATNR | Material with existing Planned Order | `GMP002` | Alphanumeric (18 chars) | Yes |
| `{{PLANT_CODE_CONVERT_PA}}` | T001W-WERKS | Plant where Planned Order exists | `1710` | Alphanumeric (4 chars) | Yes |
| `{{PLANNED_ORDER_NUMBER_TO_CONVERT}}` | PLAF-PLNUM | Planned Order number (from TC-CS-175 execution) | `0001234567` | Numeric (10 digits) | Yes |
| `{{GMP_MATERIAL_ID_CONVERT_PR}}` | MARA-MATNR | Material with existing Purchase Requisition | `GMP003` | Alphanumeric (18 chars) | Yes |
| `{{PLANT_CODE_CONVERT_PR}}` | T001W-WERKS | Plant where Purchase Requisition exists | `1710` | Alphanumeric (4 chars) | Yes |
| `{{PURCHASE_REQUISITION_NUMBER_TO_CONVERT}}` | EBAN-BANFN | Purchase Requisition number (from TC-CS-176 execution) | `0001234567` | Numeric (10 digits) | Yes |
| `{{MATERIAL_ID_NO_SHELF_LIFE}}` | MARA-MATNR | Material without min shelf-life configured (MHDRZ = 0 or blank) | `MAT001` | Alphanumeric (18 chars) | Yes |
| `{{PLANT_CODE_NO_SHELF_LIFE}}` | T001W-WERKS | Plant for non-GMP material | `1710` | Alphanumeric (4 chars) | Yes |
| `{{MRP_CONTROLLER_CODE_NO_SHELF_LIFE}}` | MARC-DISPO | MRP Controller | `001` | Alphanumeric (3 chars) | Yes |
| `{{GMP_MATERIAL_ID_ALL_EXPIRED}}` | MARA-MATNR | GMP material with all batches near-expired | `GMP004` | Alphanumeric (18 chars) | Yes |
| `{{PLANT_CODE_ALL_EXPIRED}}` | T001W-WERKS | Plant with expired batches | `1710` | Alphanumeric (4 chars) | Yes |
| `{{MRP_CONTROLLER_CODE_ALL_EXPIRED}}` | MARC-DISPO | MRP Controller | `001` | Alphanumeric (3 chars) | Yes |
| `{{MIN_SHELF_LIFE_ALL_EXPIRED}}` | MARA-MHDRZ | Min shelf life (days) | `30` | Numeric | Yes |
| `{{EXPIRED_BATCH_1}}` | MCHA-CHARG | Batch 1 with remaining shelf life < min | `BATCH010` | Alphanumeric (10 chars) | Yes |
| `{{EXPIRED_BATCH_2}}` | MCHA-CHARG | Batch 2 with remaining shelf life < min | `BATCH011` | Alphanumeric (10 chars) | Yes |
| `{{FULL_REPLENISHMENT_QUANTITY}}` | Quantity | Full requirement quantity (all stock excluded) | `100` | Numeric | Yes |
| `{{GMP_MATERIAL_ID_EXACT_BOUNDARY}}` | MARA-MATNR | Material with batch at exact boundary | `GMP005` | Alphanumeric (18 chars) | Yes |
| `{{PLANT_CODE_EXACT_BOUNDARY}}` | T001W-WERKS | Plant for boundary test | `1710` | Alphanumeric (4 chars) | Yes |
| `{{MRP_CONTROLLER_CODE_EXACT_BOUNDARY}}` | MARC-DISPO | MRP Controller | `001` | Alphanumeric (3 chars) | Yes |
| `{{MIN_SHELF_LIFE_EXACT_BOUNDARY}}` | MARA-MHDRZ | Min shelf life (days) | `30` | Numeric | Yes |
| `{{BATCH_EXACT_BOUNDARY}}` | MCHA-CHARG | Batch with remaining shelf life = min exactly | `BATCH020` | Alphanumeric (10 chars) | Yes |
| `{{GMP_MATERIAL_ID_ONE_DAY_ABOVE}}` | MARA-MATNR | Material with batch 1 day above min | `GMP006` | Alphanumeric (18 chars) | Yes |
| `{{PLANT_CODE_ONE_DAY_ABOVE}}` | T001W-WERKS | Plant for boundary test | `1710` | Alphanumeric (4 chars) | Yes |
| `{{MRP_CONTROLLER_CODE_ONE_DAY_ABOVE}}` | MARC-DISPO | MRP Controller | `001` | Alphanumeric (3 chars) | Yes |
| `{{MIN_SHELF_LIFE_ONE_DAY_ABOVE}}` | MARA-MHDRZ | Min shelf life (days) | `30` | Numeric | Yes |
| `{{BATCH_ONE_DAY_ABOVE}}` | MCHA-CHARG | Batch with remaining shelf life = min + 1 day | `BATCH021` | Alphanumeric (10 chars) | Yes |
| `{{BATCH_QUANTITY_ONE_DAY_ABOVE}}` | MCHA-CLABS | Available batch quantity | `50` | Numeric | Yes |
| `{{GMP_MATERIAL_ID_EQUAL_SHELF_LIFE}}` | MARA-MATNR | Material with total = min shelf-life | `GMP007` | Alphanumeric (18 chars) | Yes |
| `{{PLANT_CODE_EQUAL_SHELF_LIFE}}` | T001W-WERKS | Plant for edge config test | `1710` | Alphanumeric (4 chars) | Yes |
| `{{MRP_CONTROLLER_CODE_EQUAL_SHELF_LIFE}}` | MARC-DISPO | MRP Controller | `001` | Alphanumeric (3 chars) | Yes |
| `{{TOTAL_SHELF_LIFE_EQUAL}}` | MARA-MHDHB | Total shelf life (days) | `30` | Numeric | Yes |
| `{{MIN_SHELF_LIFE_EQUAL}}` | MARA-MHDRZ | Min shelf life (days) — equal to total | `30` | Numeric | Yes |
| `{{STANDARD_LEAD_TIME_EQUAL}}` | MARC-PLIFZ | Standard lead time (days) | `14` | Numeric | Yes |
| `{{GMP_MATERIAL_ID_EXCEPTION_EXACT}}` | MARA-MATNR | Material for exception message test | `GMP008` | Alphanumeric (18 chars) | Yes |
| `{{PLANT_CODE_EXCEPTION_EXACT}}` | T001W-WERKS | Plant for exception test | `1710` | Alphanumeric (4 chars) | Yes |
| `{{MRP_CONTROLLER_CODE_EXCEPTION_EXACT}}` | MARC-DISPO | MRP Controller | `001` | Alphanumeric (3 chars) | Yes |
| `{{MIN_SHELF_LIFE_EXCEPTION_EXACT}}` | MARA-MHDRZ | Min shelf life (days) | `30` | Numeric | Yes |
| `{{BATCH_EXCEPTION_EXACT}}` | MCHA-CHARG | Batch with remaining shelf life = min exactly | `BATCH030` | Alphanumeric (10 chars) | Yes |
| `{{EXCEPTION_CODE_SHELF_LIFE}}` | MRP exception code | Exception code for shelf-life expiration | `10` | Code (2 chars) | Yes |
| `{{GMP_MATERIAL_ID_EXCEPTION_BELOW}}` | MARA-MATNR | Material for exception message test | `GMP009` | Alphanumeric (18 chars) | Yes |
| `{{PLANT_CODE_EXCEPTION_BELOW}}` | T001W-WERKS | Plant for exception test | `1710` | Alphanumeric (4 chars) | Yes |
| `{{MRP_CONTROLLER_CODE_EXCEPTION_BELOW}}` | MARC-DISPO | MRP Controller | `001` | Alphanumeric (3 chars) | Yes |
| `{{MIN_SHELF_LIFE_EXCEPTION_BELOW}}` | MARA-MHDRZ | Min shelf life (days) | `30` | Numeric | Yes |
| `{{BATCH_EXCEPTION_BELOW}}` | MCHA-CHARG | Batch with remaining shelf life = min - 1 day | `BATCH031` | Alphanumeric (10 chars) | Yes |

---

## Special Considerations for Test Data Preparation

### Batch Expiration Date Calculation (CRITICAL for EDGE Test Cases)

For test cases TC-CS-181, TC-CS-182, TC-CS-184, and TC-CS-185, batch expiration dates must be calculated dynamically based on the test execution date:

**Formula:**
```
Batch Expiration Date (SLED) = Test Execution Date + Remaining Shelf Life (days)
```

**Examples (assuming test execution date = 2026-08-24):**

| Test Case | Scenario | Min Shelf Life | Target Remaining Shelf Life | Batch Expiration Date (SLED) |
|-----------|----------|---------------|---------------------------|------------------------------|
| TC-CS-181 | Batch at exact threshold | 30 days | 30 days | 2026-09-23 |
| TC-CS-182 | Batch 1 day above threshold | 30 days | 31 days | 2026-09-24 |
| TC-CS-184 | Exception at exact threshold | 30 days | 30 days | 2026-09-23 |
| TC-CS-185 | Exception 1 day below threshold | 30 days | 29 days | 2026-09-22 |

**Test Data Creation Steps for Boundary Test Cases:**

1. Calculate the target Batch Expiration Date (SLED) based on test execution date + target remaining shelf life
2. Create a new batch in SAP using transaction MIGO or Fiori app "Create Batch"
3. Set the Batch Expiration Date (SLED) field to the calculated value
4. Post goods receipt or production confirmation to create batch stock
5. Verify the batch appears in Stock/Requirements List with the correct remaining shelf life

**Alternative Approach (Date Backdating):**
- If batch creation with custom SLED is restricted, use SAP date backdating functionality to simulate the passage of time
- Adjust the system date temporarily for test execution (only in isolated test environments)

---

## Data Refresh Strategy

**Before each test execution cycle:**

1. **Clean up prior test data:**
   - Delete or archive old Planned Orders and Purchase Requisitions generated in previous test runs
   - Clear MRP exception messages
   - Reset batch stock levels if necessary

2. **Re-validate master data:**
   - Confirm all GMP materials still have correct shelf-life settings (MHDRZ, MHDHB)
   - Verify batch expiration dates are still within the target ranges for boundary tests

3. **Regenerate batches for EDGE test cases:**
   - Recalculate batch expiration dates based on the current test execution date
   - Create new batches with precise expiration dates for TC-CS-181, TC-CS-182, TC-CS-184, TC-CS-185

4. **Dependency sequencing:**
   - TC-CS-177 (Convert Planned Order) requires TC-CS-175 to run first and generate a Planned Order
   - TC-CS-178 (Convert Purchase Requisition) requires TC-CS-176 to run first and generate a Purchase Requisition
   - Note the generated Planned Order and Purchase Requisition numbers from HP test cases and substitute them into the `{{PLANNED_ORDER_NUMBER_TO_CONVERT}}` and `{{PURCHASE_REQUISITION_NUMBER_TO_CONVERT}}` placeholders

---

## GMP Compliance and Regulatory Notes

**Important:** All test data must comply with GMP (Good Manufacturing Practice) regulations:

- Use dedicated test materials only — NEVER use production GMP materials for testing
- Batch records created during testing must be clearly marked as "TEST" or "TRAINING" in the batch description
- Ensure test batches are not visible to production users or systems
- All test-generated Planned Orders, Purchase Requisitions, and Production Orders must be deleted or archived after test execution
- Do NOT execute MRP runs in production plants — use isolated test plants only

**Test System Isolation:**
- Execute all test cases in a dedicated SAP test system (e.g., QAS, DEV)
- Do NOT execute these test cases in production (PRD) systems
- Verify that test plants are not connected to real production planning processes

---

## Example Data Substitution (Sample Values)

Below is an example of how to substitute placeholder values for a hypothetical SAP test system:

```json
{
  "TD-CS-23-001": {
    "data": {
      "materialId": "GMP001",
      "plant": "1710",
      "mrpController": "001",
      "processingKey": "NETCH",
      "minShelfLife": "30",
      "totalShelfLife": "365",
      "batchNumber": "BATCH001",
      "expectedMRPElementType": "PA"
    }
  }
}
```

**Note:** The above example uses sample values. Replace with actual SAP master data from your test system.

---

## Troubleshooting Common Issues

| Issue | Possible Cause | Resolution |
|-------|---------------|------------|
| MRP run completes but no proposals generated | No net requirement exists for the material | Create a sales order, planned independent requirement, or dependent requirement |
| Batch is not excluded despite being near-expired | Batch expiration date calculation is incorrect | Verify SLED = current date + remaining shelf life; recalculate if necessary |
| Exception message not triggered | Exception message processing not active for MRP Controller | Check MRP Controller configuration; activate exception messages |
| Planned Order conversion fails | No valid production version exists for the material | Create a production version with BOM and routing |
| Purchase Requisition conversion fails | No valid purchasing info record exists | Create purchasing info record with vendor and price |
| MRP run fails with error | Material master data incomplete | Verify MRP Type, Lot Size, Procurement Type, and Plant-Material settings |

---

## Validation Checklist

Before marking test data preparation as complete, verify:

- [ ] All GMP materials exist with batch management enabled (XCHPF = X)
- [ ] All materials have Total Shelf Life (MHDHB) and Min Remaining Shelf Life (MHDRZ) configured
- [ ] All plants are configured for MRP with valid planning calendars
- [ ] All MRP Controllers are assigned to test plants
- [ ] Batches with controlled expiration dates are created for boundary test cases (TC-CS-181, TC-CS-182, TC-CS-184, TC-CS-185)
- [ ] In-house materials have valid production versions
- [ ] External procurement materials have valid purchasing info records
- [ ] Test data is isolated from production systems
- [ ] All placeholder values in `CS-23-testdata.json` have been substituted with real SAP values

---

## Contact / Support

For questions regarding test data preparation or SAP master data configuration, contact:
- SAP Basis Team (for system access and configuration)
- Master Data Team (for material master, plant, and vendor data)
- Test Data Management Team (for batch creation and test data setup)

---

**Document Version:** 1.0  
**Last Updated:** 2026-08-24  
**Author:** testcase-agent/skills/generate-testcases
