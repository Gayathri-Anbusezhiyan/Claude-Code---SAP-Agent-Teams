# Test Data Guide: CS-28

**User Story:** CS-28 — Transfer Consignment Stock Of A High-Value Biologic From Vendor-Owned  
**Module:** MM (Materials Management)  
**Feature:** Consignment Stock Withdrawal and Settlement  
**Generated:** 2026-08-24

---

## Purpose

This guide explains how to substitute real SAP master data values for the `{{PLACEHOLDER}}` entries in `CS-28-testdata.json`.

**IMPORTANT:** Do NOT hardcode these values in test case files. The test case `.md` files reference placeholders like `{TD.materialNumber}`. This JSON file maps those to `{{PLACEHOLDER}}` values. This guide tells you what real SAP data to use when executing tests.

---

## Master Data Prerequisites

Before test execution, ensure the following master data exists in the SAP test system:

### 1. Consignment Vendors

| Placeholder | SAP Field | Description | How to Find / Create |
|-------------|-----------|-------------|----------------------|
| `{{VENDOR_CONSIGNMENT_PRIMARY}}` | LFA1-LIFNR | Primary consignment vendor account number | Use an existing consignment vendor OR create via transaction XK01/VK11; ensure consignment agreement exists (LFM1) |
| `{{VENDOR_NAME_CONSIGNMENT_PRIMARY}}` | LFA1-NAME1 | Primary consignment vendor name | Auto-populated from vendor master |
| `{{VENDOR_CONSIGNMENT_SECONDARY}}` | LFA1-LIFNR | Secondary consignment vendor (for NEG-2 invalid combination test) | Different vendor than primary |

**Example Values:**
- `{{VENDOR_CONSIGNMENT_PRIMARY}}` = `17300005` (use your SAP consignment vendor code)
- `{{VENDOR_NAME_CONSIGNMENT_PRIMARY}}` = `BioTech Consignment Supplier Inc.`

**Consignment Agreement Requirement:**
- Vendor must have consignment info record (transaction ME11 or Fiori "Maintain Info Record")
- Info record must include consignment liabilities account (GBB account assignment)

---

### 2. Consignment-Enabled Materials

| Placeholder | SAP Field | Description | How to Find / Create |
|-------------|-----------|-------------|----------------------|
| `{{MATERIAL_BIOLOGIC_PRIMARY}}` | MARA-MATNR | High-value biologic material, consignment-enabled, batch-managed | Use existing material OR create via MM01; set MARC-KZECH = 'X' (consignment indicator), MARC-XCHPF = 'X' (batch management) |
| `{{MATERIAL_DESCRIPTION_BIOLOGIC_PRIMARY}}` | MAKT-MAKTX | Material description | Auto-populated from material master |
| `{{MATERIAL_BIOLOGIC_SECONDARY}}` | MARA-MATNR | Secondary biologic material for alternative tests | Different material than primary |
| `{{MATERIAL_NON_CONSIGNMENT}}` | MARA-MATNR | Material NOT consignment-enabled (for NEG-3 test) | Material with MARC-KZECH ≠ 'X' |
| `{{MATERIAL_CONSIGNMENT_ZERO_PRICE}}` | MARA-MATNR | Consignment material with moving average price = 0.00 (for EDGE-6 test) | Material with MBEW-VERPR = 0.00 |

**Example Values:**
- `{{MATERIAL_BIOLOGIC_PRIMARY}}` = `BIO-HV-001` (high-value biologic, $10,000+/kg)
- `{{MATERIAL_DESCRIPTION_BIOLOGIC_PRIMARY}}` = `Recombinant Protein Alpha-1`
- `{{MATERIAL_NON_CONSIGNMENT}}` = `STD-MAT-001` (standard material, no consignment)

**Material Configuration Requirements:**
- Material type: ROH (raw material) or HAWA (trading goods)
- Batch management active (MARC-XCHPF = 'X')
- Consignment indicator active (MARC-KZECH = 'X') — except for NEG-3 test material
- Shelf-life expiration date check active for batch (MARA-SLED_BBD active)
- Valuation: Moving average price (MBEW-VPRSV = 'V') recommended
- Unit of measure: KG (kilogram) recommended for biologics

---

### 3. Consignment Stock Batches

| Placeholder | SAP Field | Description | How to Find / Create |
|-------------|-----------|-------------|----------------------|
| `{{BATCH_VENDOR1_MAT1_A}}` | CHARG | Batch A for primary material and primary vendor | Create via MIGO (Goods Receipt against consignment PO, Movement Type 101K); batch auto-created if batch determination active |
| `{{BATCH_VENDOR1_MAT1_B}}` | CHARG | Batch B for primary material and primary vendor (for multi-batch AP-3 test) | Create second batch via MIGO |
| `{{BATCH_VENDOR2_MAT1_C}}` | CHARG | Batch C for primary material but SECONDARY vendor (for NEG-2 invalid combination test) | Create via MIGO with secondary vendor consignment PO |
| `{{BATCH_VENDOR1_MAT1_EXPIRED}}` | CHARG | Expired batch (SLED/BBD date in past) for EDGE-1 test | Create batch; set SLED date (MCH1-VFDAT) to past date (e.g., 30 days ago) |
| `{{BATCH_NON_CONSIGNMENT}}` | CHARG | Batch for non-consignment material (for NEG-3 test) | Batch for standard material, not consignment |
| `{{BATCH_VENDOR1_MAT_ZERO_PRICE}}` | CHARG | Batch for zero-price consignment material (for EDGE-6 test) | Batch for material with price = 0.00 |

**Example Values:**
- `{{BATCH_VENDOR1_MAT1_A}}` = `BATCH-2026-001`
- `{{BATCH_VENDOR1_MAT1_B}}` = `BATCH-2026-002`
- `{{BATCH_VENDOR1_MAT1_EXPIRED}}` = `BATCH-EXP-001` (SLED = 2026-07-01, if today = 2026-08-24)

**Batch Configuration Requirements:**
- Batch must exist in batch master (transaction MSC2N or MB03)
- Batch must be linked to consignment stock (Special Stock 'K' for vendor)
- Batch status: Unrestricted-use (QINSPIND = ' ')
- Shelf-life expiration date (VFDAT): Future date for valid batches, past date for EDGE-1 expired batch test

---

### 4. Consignment Stock Quantity Setup

**CRITICAL:** Before running test cases TC-CS-100 through TC-CS-123, consignment stock MUST exist in the SAP system.

**How to Create Consignment Stock:**
1. Create Consignment Purchase Order (transaction ME21N or Fiori "Create Purchase Order")
   - Document Type: Consignment PO
   - Vendor: `{{VENDOR_CONSIGNMENT_PRIMARY}}`
   - Material: `{{MATERIAL_BIOLOGIC_PRIMARY}}`
   - Quantity: Sufficient for all tests (e.g., 500 KG)
   - Plant: `{{PLANT_PRIMARY}}`
   - Storage Location: `{{STORAGE_LOCATION_PRIMARY}}`

2. Post Goods Receipt for Consignment PO (transaction MIGO or Fiori "Post Goods Receipt")
   - Movement Type: 101 K (GR for consignment)
   - PO Number: from step 1
   - Batch: `{{BATCH_VENDOR1_MAT1_A}}` (will be auto-created or selected)
   - Quantity: e.g., 100 KG

3. Verify Consignment Stock exists (transaction MB52 or Fiori "Display Stock Overview")
   - Material: `{{MATERIAL_BIOLOGIC_PRIMARY}}`
   - Plant: `{{PLANT_PRIMARY}}`
   - Storage Location: `{{STORAGE_LOCATION_PRIMARY}}`
   - Special Stock: K (Consignment)
   - Vendor: `{{VENDOR_CONSIGNMENT_PRIMARY}}`
   - Batch: `{{BATCH_VENDOR1_MAT1_A}}`
   - Unrestricted Stock: Should show > 0 (e.g., 100 KG)

| Placeholder | SAP Field | Description | Recommended Value |
|-------------|-----------|-------------|-------------------|
| `{{QUANTITY_AVAILABLE_BATCH_A}}` | MCHB-CLABS | Available consignment stock for Batch A | 100.000 KG |
| `{{QUANTITY_STANDARD}}` | User input | Standard withdrawal quantity | 50.000 KG |
| `{{QUANTITY_PARTIAL}}` | User input | Partial withdrawal (< available) | 25.000 KG |
| `{{QUANTITY_SMALL}}` | User input | Small withdrawal quantity | 10.000 KG |
| `{{QUANTITY_INSUFFICIENT}}` | MCHB-CLABS | Limited available stock (for NEG-1 test) | 10.000 KG |
| `{{QUANTITY_EXCESSIVE}}` | User input | Quantity exceeding available (for NEG-1 test) | 50.000 KG (when available = 10 KG) |
| `{{QUANTITY_DECIMAL_PRECISION}}` | User input | Quantity with 3 decimal places (for EDGE-5 test) | 10.125 KG |

---

### 5. Organizational Structure

| Placeholder | SAP Field | Description | How to Find |
|-------------|-----------|-------------|-------------|
| `{{PLANT_PRIMARY}}` | T001W-WERKS | Plant code | Use your test plant OR transaction OX10 to create; ensure plant is assigned to company code |
| `{{STORAGE_LOCATION_PRIMARY}}` | T001L-LGORT | Storage location within plant | Use existing storage location OR transaction OX09; common value: `0001` |
| `{{COMPANY_CODE}}` | T001-BUKRS | Company code (auto-derived from plant) | Auto-populated based on plant assignment (T001K) |

**Example Values:**
- `{{PLANT_PRIMARY}}` = `1710` (use your SAP test plant)
- `{{STORAGE_LOCATION_PRIMARY}}` = `0001` (standard storage location)

---

### 6. Unit of Measure and Currency

| Placeholder | SAP Field | Description | Value |
|-------------|-----------|-------------|-------|
| `{{UNIT_OF_MEASURE_KG}}` | MARA-MEINS | Base unit of measure for material | `KG` (kilogram) |
| `{{CURRENCY_CODE}}` | T001-WAERS | Currency code for company code | `USD` (or your company code currency) |

---

### 7. Pricing

| Placeholder | SAP Field | Description | Recommended Value |
|-------------|-----------|-------------|-------------------|
| `{{PRICE_BIOLOGIC_HIGH_VALUE}}` | MBEW-VERPR | Moving average price for high-value biologic | `10000.00` USD/KG (or realistic high-value price) |
| `{{PRICE_BIOLOGIC_BEFORE_CHANGE}}` | MBEW-VERPR | Price before mid-period price change (for EDGE-4 test) | `10000.00` USD/KG |
| `{{PRICE_BIOLOGIC_AFTER_CHANGE}}` | MBEW-VERPR | Price after mid-period price change (for EDGE-4 test) | `12000.00` USD/KG |
| `{{PRICE_BIOLOGIC_VARIANCE}}` | Invoice entry | Vendor invoice price differing from settlement (for INT-3 test) | `10500.00` USD/KG (5% variance from settlement) |

**Price Configuration:**
- Consignment materials typically use moving average price (VPRSV = 'V')
- Price is stored in MBEW table (material valuation per plant)
- For price change test (EDGE-4), manually update price via transaction MR21 between two withdrawals

---

### 8. Settlement Period Dates

| Placeholder | Description | Value Format | Example |
|-------------|-------------|--------------|---------|
| `{{DATE_SETTLEMENT_PERIOD_START}}` | Start date of settlement period (1 month) | DD.MM.YYYY | `01.01.2026` |
| `{{DATE_SETTLEMENT_PERIOD_END}}` | End date of settlement period (1 month) | DD.MM.YYYY | `31.01.2026` |
| `{{DATE_SETTLEMENT_CROSS_MONTH_START}}` | Start date for cross-month settlement (for AP-4 test) | DD.MM.YYYY | `15.01.2026` |
| `{{DATE_SETTLEMENT_CROSS_MONTH_END}}` | End date for cross-month settlement (for AP-4 test) | DD.MM.YYYY | `15.02.2026` |
| `{{DATE_TODAY}}` | Current system date (for EDGE-2 same-day settlement test) | DD.MM.YYYY | Use SAP system date |
| `{{DATE_SETTLEMENT_EMPTY_START}}` | Start date for period with no withdrawals (for EDGE-3 test) | DD.MM.YYYY | `01.06.2026` (future period with no transactions) |
| `{{DATE_SETTLEMENT_EMPTY_END}}` | End date for period with no withdrawals (for EDGE-3 test) | DD.MM.YYYY | `30.06.2026` |
| `{{DATE_POSTING_BACKDATED}}` | Backdated posting date (for AP-5 test) | DD.MM.YYYY | `15.01.2026` (7-14 days in past, within allowed backdating period) |
| `{{DATE_BATCH_EXPIRY_PAST}}` | Expired batch shelf-life expiration date (for EDGE-1 test) | DD.MM.YYYY | `01.07.2026` (30+ days in past) |

**Date Configuration:**
- All dates use SAP format: DD.MM.YYYY
- Settlement periods should align with actual withdrawal posting dates
- For backdated posting (AP-5), ensure user has M_MSEG_BWE authorization object for backdating

---

### 9. Integration Test Data

| Placeholder | SAP Field | Description | How to Create |
|-------------|-----------|-------------|---------------|
| `{{PRODUCTION_ORDER_NUMBER}}` | AUFK-AUFNR | Production order number (for INT-1 test) | Create via transaction CO01 or Fiori "Create Production Order"; use material `{{MATERIAL_BIOLOGIC_PRIMARY}}` as component |
| `{{INSPECTION_LOT_NUMBER}}` | QALS-PRUEFLOS | Quality inspection lot number (for INT-2 test) | Created automatically when consignment stock is withdrawn to quality inspection stock |

---

### 10. Authorization Test Data

| Placeholder | Description | Value |
|-------------|-------------|-------|
| `{{USERNAME_UNAUTHORIZED}}` | Username without M_MSEG_BWA authorization (for NEG-4 test) | Create test user without Movement Type 411 authorization OR use existing limited-access user |
| `{{PASSWORD_UNAUTHORIZED}}` | Password for unauthorized user | Password for the unauthorized test user |

**Authorization Setup for NEG-4 Test:**
- Create a separate user profile WITHOUT authorization object M_MSEG_BWA (activity 01, Movement Type 411)
- This test case is marked as NOT automation-eligible (requires user context switch)

---

## Data Substitution Example

**From JSON:**
```json
"data": {
  "materialNumber": "{{MATERIAL_BIOLOGIC_PRIMARY}}",
  "vendorCode": "{{VENDOR_CONSIGNMENT_PRIMARY}}",
  "withdrawalQuantity": "{{QUANTITY_STANDARD}}"
}
```

**Substitute with Real SAP Values:**
```json
"data": {
  "materialNumber": "BIO-HV-001",
  "vendorCode": "17300005",
  "withdrawalQuantity": "50.000"
}
```

**In Test Execution:**
When test step says: "Enter the material number: `{TD.materialNumber}`"  
You enter: `BIO-HV-001`

---

## Pre-Test Validation Checklist

Before executing the CS-28 test suite, verify:

- [ ] Primary consignment vendor (`{{VENDOR_CONSIGNMENT_PRIMARY}}`) exists with consignment agreement (info record)
- [ ] Primary biologic material (`{{MATERIAL_BIOLOGIC_PRIMARY}}`) exists with consignment indicator (MARC-KZECH = 'X') and batch management (MARC-XCHPF = 'X')
- [ ] At least 3 consignment stock batches exist:
  - [ ] Batch A (`{{BATCH_VENDOR1_MAT1_A}}`) with sufficient quantity (≥ 100 KG)
  - [ ] Batch B (`{{BATCH_VENDOR1_MAT1_B}}`) for multi-batch test
  - [ ] Expired Batch (`{{BATCH_VENDOR1_MAT1_EXPIRED}}`) with past SLED date
- [ ] Consignment stock verified in MB52: Material + Plant + Storage Location + Vendor + Batch + Special Stock K
- [ ] Movement Type 411 configured and active
- [ ] Automatic account determination configured: GBB (vendor liability), BSX (inventory consumption)
- [ ] Test user has required authorization: M_MSEG_BWA (activity 01 for Movement Type 411), S_TCODE for MRKO
- [ ] Unauthorized user profile created (for NEG-4 test) WITHOUT M_MSEG_BWA authorization
- [ ] Material price (moving average) set correctly: ≥ $10,000/KG for high-value biologic (or use realistic price)

---

## Notes

1. **Consignment Stock Creation:** The most common issue is missing consignment stock. Always post Goods Receipt (Movement Type 101 K) against a consignment PO BEFORE running withdrawal tests.

2. **Batch Expiry:** For EDGE-1 test, manually set the batch shelf-life expiration date (VFDAT in MCH1) to a past date via transaction MSC2N or batch master maintenance.

3. **Price Changes:** For EDGE-4 test, post one withdrawal, then change the material price via MR21, then post a second withdrawal within the same settlement period.

4. **Settlement Period Alignment:** Ensure settlement period dates (`{{DATE_SETTLEMENT_PERIOD_START}}` and `{{DATE_SETTLEMENT_PERIOD_END}}`) encompass the dates when test withdrawals are posted.

5. **Authorization Testing:** TC-CS-110 (NEG-4) requires manual execution with a different user context — it is not automation-eligible.

6. **Test Data Cleanup:** After test execution, you may want to reverse test material documents (Movement Type 412 — Consignment Return) to restore initial stock levels for re-execution.

---

## Guide Metadata

- **User Story:** CS-28
- **Module:** MM (Materials Management)
- **Generated By:** TestCase Agent (Phase 3)
- **Generated Date:** 2026-08-24
- **Test Data JSON Source:** testdata/CS-28/CS-28-testdata.json
- **Total Test Data Sets:** 24 (one per test case)
- **Test Cases Covered:** TC-CS-100 through TC-CS-123
