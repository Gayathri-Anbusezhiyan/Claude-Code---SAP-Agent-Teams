# Test Data Resolution Guide: CS-27

**User Story:** CS-27 — Maintain A Purchasing Contract (Outline Agreement) With Negotiated Pri  
**Module:** MM — Materials Management  
**Feature:** Purchasing Contract (Outline Agreement) Creation and Maintenance  
**Generated:** 2026-08-24  

---

## Purpose

This guide explains how to resolve each `{{PLACEHOLDER}}` value in `CS-27-testdata.json` with actual SAP tenant-specific data. All placeholders must be resolved before test execution.

---

## Master Data Requirements

### Vendor Master Data

| Placeholder | SAP Table | Field | Description | Resolution Steps |
|-------------|-----------|-------|-------------|------------------|
| `{{VENDOR_ID_APPROVED}}` | LFA1, LFM1 | LIFNR | Valid vendor account number approved for purchasing org `{{PURCHASING_ORG_CODE}}` and configured in source list | Query LFM1 table for vendor where SPERM = '' (not blocked) and EKORG = purchasing org code. Verify vendor exists in source list (EINA table) for the selected material. |
| `{{VENDOR_NAME_APPROVED}}` | LFA1 | NAME1 | Vendor name (auto-populated by SAP) | Query LFA1.NAME1 where LIFNR = `{{VENDOR_ID_APPROVED}}` |
| `{{VENDOR_ID_NOT_APPROVED}}` | LFA1 | LIFNR | Valid vendor account number that is NOT approved for purchasing org (for NEG-001 test) | Query LFA1 for a vendor that exists but does NOT have an entry in LFM1 for the target purchasing org, or has SPERM = 'X' (blocked) |

### Material Master Data

| Placeholder | SAP Table | Field | Description | Resolution Steps |
|-------------|-----------|-------|-------------|------------------|
| `{{MATERIAL_ID_API}}` | MARA, MARC | MATNR | Valid API (Active Pharmaceutical Ingredient) material number extended to plant `{{PLANT_CODE}}` | Query MARA table for material where MTART = material type for APIs (e.g., 'ZAPI' or 'FERT'). Verify material is extended to plant in MARC table (WERKS = plant code). Verify material exists in source list (EINE table) for selected vendor. |
| `{{MATERIAL_DESCRIPTION_API}}` | MAKT | MAKTX | Material description (auto-populated by SAP) | Query MAKT.MAKTX where MATNR = `{{MATERIAL_ID_API}}` and SPRAS = 'EN' |
| `{{MATERIAL_ID_NOT_IN_SOURCE_LIST}}` | MARA | MATNR | Valid material that does NOT have a source list entry for `{{VENDOR_ID_APPROVED}}` (for NEG-002 test) | Query MARA for a material that exists but does NOT have an entry in EINE table for LIFNR = vendor and WERKS = plant |
| `{{UNIT_OF_MEASURE}}` | MARA | MEINS | Base unit of measure for material | Query MARA.MEINS where MATNR = `{{MATERIAL_ID_API}}` (e.g., 'KG', 'L', 'EA') |

### Organizational Data

| Placeholder | SAP Table | Field | Description | Resolution Steps |
|-------------|-----------|-------|-------------|------------------|
| `{{PURCHASING_ORG_CODE}}` | T024E | EKORG | Purchasing Organization code | Query T024E for active purchasing org (typically '1710', '1000', etc.). Verify user has authorization object M_EINK_EKO for this org. |
| `{{PURCHASING_GROUP_CODE}}` | T024 | EKGRP | Purchasing Group code | Query T024 for active purchasing group (typically '001', '002', etc.). Often auto-populated from vendor purchasing org data (LFM1.EKGRP). |
| `{{PLANT_CODE}}` | T001W | WERKS | Plant code | Query T001W for active plant (typically '1710', '1000', etc.). Must match plant in MARC table for selected material. |
| `{{COMPANY_CODE}}` | T001 | BUKRS | Company Code (auto-populated from purchasing org) | Query T001K.BUKRS where EKORG = `{{PURCHASING_ORG_CODE}}` |
| `{{CURRENCY_CODE}}` | LFM1, T001 | WAERS | Currency code | Query LFM1.WAERS for vendor purchasing org data, or T001.WAERS for company code currency (typically 'USD', 'EUR') |

### Source List

| Placeholder | SAP Table | Field | Description | Resolution Steps |
|-------------|-----------|-------|-------------|------------------|
| Source List Entry | EINA, EINE | INFNR, LIFNR, MATNR, WERKS | Source list entry linking vendor to material for plant | Verify entry exists: Query EINA/EINE where LIFNR = `{{VENDOR_ID_APPROVED}}`, MATNR = `{{MATERIAL_ID_API}}`, WERKS = `{{PLANT_CODE}}`. If not present, create source list entry via transaction ME01 or Fiori app "Manage Source List". |

---

## Transactional Data (User Input)

### Contract Header Data

| Placeholder | Description | Valid Values | Notes |
|-------------|-------------|--------------|-------|
| `{{CONTRACT_TARGET_QUANTITY_STANDARD}}` | Standard target quantity for contract | 100-1000 (numeric, per UoM) | Must be greater than 0. Example: 500 KG |
| `{{CONTRACT_TARGET_QUANTITY_LARGE}}` | Large target quantity for multi-tier pricing | 1000-10000 (numeric, per UoM) | Large enough to span multiple pricing tiers. Example: 5000 KG |
| `{{CONTRACT_TARGET_QUANTITY_MAXIMUM}}` | Maximum target quantity (for EDGE-002) | 999999999 or system-configured maximum | Verify system limit via SAP configuration (table T001K or screen field limits). Use documented maximum value. |
| `{{CONTRACT_TARGET_VALUE_STANDARD}}` | Standard target value (currency amount) | 10000.00-100000.00 (numeric, 2 decimals) | Must be greater than 0. Example: 50000.00 USD |
| `{{NET_PRICE_STANDARD}}` | Standard negotiated price per UoM | 10.00-100.00 (numeric, 2 decimals) | Must be greater than 0. Example: 25.50 per KG |
| `{{NET_PRICE_TIER_1}}` | Tier 1 price (highest, for low quantities) | 15.00-50.00 (numeric, 2 decimals) | Highest price tier. Example: 30.00 per KG |
| `{{NET_PRICE_TIER_2}}` | Tier 2 price (medium, for mid quantities) | 10.00-30.00 (numeric, 2 decimals) | Lower than Tier 1. Example: 25.00 per KG |
| `{{NET_PRICE_TIER_3}}` | Tier 3 price (lowest, for high quantities) | 5.00-20.00 (numeric, 2 decimals) | Lowest price tier. Example: 20.00 per KG |

### Pricing Tier Thresholds

| Placeholder | Description | Valid Values | Notes |
|-------------|-------------|--------------|-------|
| `{{TIER_1_QUANTITY_FROM}}` | Tier 1 starting quantity | 1 or 0 | First tier starts at 1 or 0 (SAP convention) |
| `{{TIER_2_QUANTITY_FROM}}` | Tier 2 starting quantity | 100-500 | Must be greater than Tier 1. Example: 100 |
| `{{TIER_3_QUANTITY_FROM}}` | Tier 3 starting quantity | 500-1000 | Must be greater than Tier 2. Example: 500 |
| `{{TIER_2_QUANTITY_INVALID_LOWER}}` | Invalid tier 2 quantity (for NEG-006) | Value LESS THAN Tier 1 | Example: If Tier 1 = 100, use 50 or 10 (invalid descending order) |

### Validity Dates

| Placeholder | Description | Calculation | Notes |
|-------------|-------------|-------------|-------|
| `{{TODAY_DATE}}` | Current date (test execution date) | Use system date (today) | Format: DD.MM.YYYY or MM/DD/YYYY per SAP tenant locale |
| `{{DATE_FUTURE_1_DAY}}` | Today + 1 day (minimum validity period) | TODAY + 1 day | For EDGE-006: minimum valid period |
| `{{DATE_FUTURE_30_DAYS}}` | Today + 30 days | TODAY + 30 days | For delivery dates and short-term contracts |
| `{{DATE_FUTURE_180_DAYS}}` | Today + 180 days | TODAY + 180 days | Standard contract validity period (6 months) |
| `{{DATE_FUTURE_365_PLUS_DAYS}}` | Today + 365+ days | TODAY + 400 days (or more) | For EDGE-008: ensures alert lead time of 365 days is valid |
| `{{DATE_FUTURE_ALERT_LEAD_TIME}}` | Today + alert lead time days | TODAY + 30 days (if alert lead time = 30) | For HP-004: set end date to trigger alert soon |
| `{{DATE_PAST_30_DAYS}}` | Today - 30 days (invalid end date) | TODAY - 30 days | For NEG-005: invalid date order test |

### Release Order Data

| Placeholder | Description | Valid Values | Notes |
|-------------|-------------|--------------|-------|
| `{{RELEASE_QUANTITY_FIRST}}` | Quantity for first release order | 10-50 (less than contract target) | Example: 20 KG (if target = 500) |
| `{{RELEASE_QUANTITY_SECOND}}` | Quantity for second release order | 10-50 (less than remaining) | Example: 30 KG (total released = 50, remaining = 450) |
| `{{RELEASE_QUANTITY_EXCEEDING}}` | Quantity that exceeds remaining balance | Remaining + 10 or more | For NEG-003: if remaining = 100, use 110 or 200 |
| `{{RELEASE_QUANTITY_VALUE_EXCEEDING}}` | Quantity that when multiplied by price exceeds remaining value | Calculate: (Remaining Value / Price) + 10 | For NEG-004: ensure Quantity × Price > Remaining Value |
| `{{RELEASE_QUANTITY_FOR_EXACT_VALUE}}` | Quantity that when multiplied by price exactly equals remaining value | Calculate: Remaining Value / Price | For EDGE-010: ensure Quantity × Price = Remaining Value exactly |

### Contract Number (Pre-requisites for Release Order Tests)

| Placeholder | Description | Resolution Steps |
|-------------|-------------|------------------|
| `{{CONTRACT_NUMBER_EXISTING}}` | Existing contract number from HP-001 or HP-002 | Execute TC-CS-093 or TC-CS-094 first; capture the generated contract number from the success message; use that number for TC-CS-095, TC-CS-101, TC-CS-102, TC-CS-121, TC-CS-122 |
| `{{CONTRACT_REMAINING_QUANTITY}}` | Remaining target quantity on the contract | View contract in "Manage Purchase Contracts" app; note "Remaining Target Qty" value from header |
| `{{CONTRACT_REMAINING_VALUE}}` | Remaining target value on the contract | View contract in "Manage Purchase Contracts" app; note "Remaining Target Value" value from header |

---

## Resolution Workflow

### Step 1: Pre-Execution Master Data Validation

Run the following SAP queries (via SE16, SQVI, or OData API) to verify master data exists:

```sql
-- Vendor Validation
SELECT lifnr, name1, sperm FROM lfa1 WHERE lifnr = '<vendor_id>';
SELECT lifnr, ekorg, sperm, ekgrp FROM lfm1 WHERE lifnr = '<vendor_id>' AND ekorg = '<purch_org>';

-- Material Validation
SELECT matnr, mtart, meins FROM mara WHERE matnr = '<material_id>';
SELECT matnr, werks FROM marc WHERE matnr = '<material_id>' AND werks = '<plant>';
SELECT maktx FROM makt WHERE matnr = '<material_id>' AND spras = 'EN';

-- Source List Validation
SELECT infnr, lifnr, matnr, werks FROM eine 
WHERE lifnr = '<vendor_id>' AND matnr = '<material_id>' AND werks = '<plant>';

-- Organizational Data Validation
SELECT ekorg FROM t024e WHERE ekorg = '<purch_org>';
SELECT werks FROM t001w WHERE werks = '<plant>';
SELECT bukrs, waers FROM t001 WHERE bukrs = '<company_code>';
```

### Step 2: Test Data File Update

Replace all `{{PLACEHOLDER}}` values in `CS-27-testdata.json` with actual SAP tenant values resolved from Step 1.

**Example:**
```json
"data": {
  "validVendorId": "17300002",  // Resolved from LFA1
  "supplierName": "Carbon Tec Inc.",  // Resolved from LFA1.NAME1
  "validMaterialId": "RMPI001",  // Resolved from MARA
  "materialDesc": "Input 1 (WATER)",  // Resolved from MAKT
  "uom": "KG",  // Resolved from MARA.MEINS
  "targetQuantity": "500",  // User-defined test value
  "netPrice": "25.50",  // User-defined test value
  "purchasingOrg": "1710",  // Resolved from T024E
  "plant": "1710",  // Resolved from T001W
  "companyCode": "1710",  // Resolved from T001K
  "currency": "USD"  // Resolved from LFM1 or T001
}
```

### Step 3: Date Calculation

Calculate relative dates based on test execution date:

```javascript
// Example: Test execution date = 2026-08-24

TODAY_DATE = "24.08.2026"  // or "08/24/2026" per locale
DATE_FUTURE_1_DAY = "25.08.2026"  // TODAY + 1
DATE_FUTURE_30_DAYS = "23.09.2026"  // TODAY + 30
DATE_FUTURE_180_DAYS = "20.02.2027"  // TODAY + 180
DATE_FUTURE_365_PLUS_DAYS = "28.09.2027"  // TODAY + 400
DATE_PAST_30_DAYS = "25.07.2026"  // TODAY - 30
```

### Step 4: Prerequisite Contract Creation

For release order test cases (TC-CS-095, TC-CS-101, TC-CS-102, TC-CS-121, TC-CS-122):

1. Execute TC-CS-093 (standard contract creation) or TC-CS-094 (multi-tier pricing)
2. Capture the generated contract number from the success message (e.g., "4500012345")
3. Open the contract in "Manage Purchase Contracts" app
4. Note the "Remaining Target Quantity" and "Remaining Target Value" values
5. Update test data JSON:
   - `{{CONTRACT_NUMBER_EXISTING}}` = captured contract number
   - `{{CONTRACT_REMAINING_QUANTITY}}` = noted remaining quantity
   - `{{CONTRACT_REMAINING_VALUE}}` = noted remaining value

---

## Validation Checklist

Before executing test cases, verify:

- [ ] All `{{PLACEHOLDER}}` values replaced with actual SAP data (no placeholders remain in JSON)
- [ ] Vendor `{{VENDOR_ID_APPROVED}}` exists, is active, and approved for `{{PURCHASING_ORG_CODE}}`
- [ ] Material `{{MATERIAL_ID_API}}` exists and is extended to plant `{{PLANT_CODE}}`
- [ ] Source list entry exists for vendor-material-plant combination (query EINA/EINE)
- [ ] Test user has M_EINK_EKO authorization for purchasing org `{{PURCHASING_ORG_CODE}}`
- [ ] Contract number range is configured for document type MK (query NRIV)
- [ ] All date values calculated relative to test execution date
- [ ] Prerequisite contracts created and contract numbers captured for release order tests

---

## Troubleshooting

### Issue: Vendor not found or blocked

**Resolution:** Verify vendor exists in LFA1 and is not blocked (LFM1.SPERM = ''). If blocked, unblock via transaction XK02 or contact SAP admin.

### Issue: Material not extended to plant

**Resolution:** Extend material to plant via transaction MM01 or Fiori app "Create Material". Verify MARC table entry exists.

### Issue: Source list entry missing

**Resolution:** Create source list entry via transaction ME01 or Fiori app "Manage Source List". Link vendor `{{VENDOR_ID_APPROVED}}` to material `{{MATERIAL_ID_API}}` for plant `{{PLANT_CODE}}`.

### Issue: User authorization missing

**Resolution:** Request M_EINK_EKO authorization for purchasing org via SAP security admin. Verify authorization via transaction SU53 after attempting contract creation.

### Issue: Contract number range not configured

**Resolution:** Configure number range for contract document type MK via transaction OMEC or contact SAP Basis admin. Verify NRIV table entry exists.

### Issue: Release order test data calculation errors

**Resolution:** 
- For NEG-003 (exceed quantity): Ensure `{{RELEASE_QUANTITY_EXCEEDING}}` > `{{CONTRACT_REMAINING_QUANTITY}}`
- For NEG-004 (exceed value): Ensure `{{RELEASE_QUANTITY_VALUE_EXCEEDING}}` × `{{NET_PRICE}}` > `{{CONTRACT_REMAINING_VALUE}}`
- For EDGE-009 (exact quantity): Ensure `{{RELEASE_QUANTITY_EXACT}}` = `{{CONTRACT_REMAINING_QUANTITY}}` exactly
- For EDGE-010 (exact value): Calculate `{{RELEASE_QUANTITY_FOR_EXACT_VALUE}}` = `{{CONTRACT_REMAINING_VALUE}}` / `{{NET_PRICE}}` (round to 2 decimals)

---

## Environment-Specific Notes

### SAP Tenant: my426318.s4hana.cloud.sap

- **Purchasing Org:** Typical values are `1710` (Purch. Org. 1710) — verify via T024E
- **Plant:** Typical values are `1710` — verify via T001W
- **Company Code:** Typical values are `1710` (Velotics Inc.) — verify via T001
- **Currency:** Typical value is `USD` — verify via T001.WAERS
- **Material Type for API:** Verify material type code via MARA.MTART (e.g., 'ZAPI', 'FERT', 'HAWA')
- **Vendor Naming Convention:** Vendor names may follow specific patterns (e.g., "Carbon Tec Inc.", "Velotics Supplier") — query LFA1.NAME1

### Number Range Configuration

- **Contract Number Format:** Typically 10-digit numeric beginning with `45` or `46` (e.g., `4500012345`, `4600023456`)
- **Number Range Object:** Query NRIV table where OBJECT = 'EKKO' and NR_LEVEL = 'MK' (contract document type)

---

## Data Privacy and Security

- **Never commit resolved test data JSON to public repositories** — test data contains SAP tenant-specific IDs and organizational codes
- **Do not hardcode passwords** — use environment variables (`{ENV.SAP_USERNAME}`, `{ENV.SAP_PASSWORD}`) for credentials
- **Mask sensitive data in logs** — vendor names, material descriptions, and organizational codes may be business-sensitive

---

**Test Data Resolution Status:** ⏳ **PENDING** — Resolve all placeholders before test execution

**Next Steps:**
1. Query SAP tables per Step 1 (Pre-Execution Master Data Validation)
2. Update `CS-27-testdata.json` per Step 2 (Test Data File Update)
3. Calculate dates per Step 3 (Date Calculation)
4. Execute prerequisite contracts per Step 4 (Prerequisite Contract Creation)
5. Validate checklist complete ✅
6. Execute test cases via `/run-scriptless CS-27` or `/automate CS-27`

---
