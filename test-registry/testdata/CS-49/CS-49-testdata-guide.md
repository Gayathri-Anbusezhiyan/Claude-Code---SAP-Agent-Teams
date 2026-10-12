# Test Data Substitution Guide: CS-49

**User Story:** [CS-49] Generate Export Documentation, Including A Certificate Of Analysis Ref
**Module:** SD — Sales & Distribution (with LE, QM, DMS, Export Control integration)
**Feature:** Export Documentation Generation with Certificate of Analysis

---

## Purpose

This guide explains how to substitute the `{{PLACEHOLDER}}` values in `CS-49-testdata.json` with **real SAP master data values** from your test system. Each placeholder represents data that must exist in SAP before executing the test cases.

---

## Pre-requisites for Test Execution

Before executing any test case for CS-49, ensure the following master data and configuration exist in your SAP test system:

1. **Sales Order (VA01)**: International sales order with:
   - Customer in a foreign country (destination country ≠ plant country)
   - At least one line item with a finished pharmaceutical product (FERT)
   - Delivery block NOT set
   - Open quantity available for delivery

2. **Material Master (MM01/MM02)**:
   - Material type: FERT (Finished Product)
   - Batch management enabled (MARA-XCHPF = X)
   - HS code maintained at plant level (MARC-STAWN)
   - Country of origin maintained at plant level (MARC-HERKL)
   - Export control classification (MEAN-EXTWG) if license is required

3. **Batch Master (MSC1N/MSC3N)**:
   - Batch exists for the material
   - Batch has available unrestricted stock
   - Batch has a QM inspection lot with CoA document attached (QAMB → DRAW → TOA01)

4. **Shipping Point (OVXA/TVST)**:
   - Shipping Point exists and is export-enabled
   - Assigned to the plant

5. **Customer Master (XD01/XD02)**:
   - International customer (KNA1-LAND1 ≠ plant country)
   - Customer has valid ship-to address

6. **Export License Master (MEAN, EIPA)** (if applicable):
   - Export license exists for material-destination combination
   - License validity date (EIPA-GLTBIS) is controllable (for EDGE scenarios)

7. **QM Configuration (QM01, QA02)**:
   - Inspection lot exists for batch
   - Certificate of Analysis (CoA) document generated and attached (QAMB, TOA01)

8. **DMS ArchiveLink (OAC0, OAC2, TOA01)**:
   - ArchiveLink interface configured and active
   - Content repository exists for export documentation archival

9. **Output Control (V/47, NAST)**:
   - Export document types (commercial invoice, packing list) configured for destination country
   - Output condition records exist (NAST condition types for export docs)

---

## Placeholder Substitution Table

### Sales Order and Customer Data

| Placeholder | SAP Field | Table.Field | How to Find | Example Value | Notes |
|-------------|-----------|-------------|-------------|---------------|-------|
| `{{SALES_ORDER_INTERNATIONAL_VALID}}` | Sales Order Number | VBAK-VBELN | VA02 or VA03 — search for open international sales orders with delivery due | 1000012345 | Must be open, not fully delivered, international customer |
| `{{SALES_ORDER_INTERNATIONAL_MULTI_LINE}}` | Sales Order Number (multi-line) | VBAK-VBELN | VA02 — sales order with at least 2 line items | 1000012346 | Each line item must reference a different material/batch |
| `{{SALES_ORDER_INTERNATIONAL_LICENSE_REQUIRED}}` | Sales Order Number (export license required) | VBAK-VBELN | VA02 — sales order with material requiring export license to destination | 1000012347 | Material export control classification (MEAN-EXTWG) set |
| `{{SALES_ORDER_INTERNATIONAL_MAX_LINES}}` | Sales Order Number (999 lines) | VBAK-VBELN | VA02 — sales order with maximum line items (999) | 1000099999 | Boundary testing — requires scripted data generation |
| `{{CUSTOMER_INTERNATIONAL}}` | Ship-To Party | LIKP-KUNNR | XD03 — customer master for international customer | 1000001234 | Auto-populated from sales order |
| `{{DESTINATION_COUNTRY_INTERNATIONAL}}` | Country of Destination | KNA1-LAND1 | XD03 → Address tab | US, DE, FR, etc. | ISO Alpha-2 country code; must be ≠ plant country |

### Material Master Data

| Placeholder | SAP Field | Table.Field | How to Find | Example Value | Notes |
|-------------|-----------|-------------|-------------|---------------|-------|
| `{{MATERIAL_PHARMA_BATCH_MANAGED_VALID}}` | Material Number | MARA-MATNR | MM03 → Basic Data 1 (MARA-XCHPF = X), General/Plant Data (MARC-STAWN, MARC-HERKL) | 1000000123 | FERT material with batch management, HS code, and origin maintained |
| `{{MATERIAL_PHARMA_BATCH_MANAGED_1}}` | Material Number (first for multi-line) | MARA-MATNR | MM03 | 1000000124 | Different from Material 2 |
| `{{MATERIAL_PHARMA_BATCH_MANAGED_2}}` | Material Number (second for multi-line) | MARA-MATNR | MM03 | 1000000125 | Different from Material 1 |
| `{{MATERIAL_PHARMA_NO_HS_CODE}}` | Material Number (no HS code) | MARA-MATNR | MM03 — plant data (MARC-STAWN) is BLANK | 1000000126 | Negative test data — HS code intentionally missing |
| `{{MATERIAL_PHARMA_NO_ORIGIN}}` | Material Number (no origin) | MARA-MATNR | MM03 — plant data (MARC-HERKL) is BLANK | 1000000127 | Negative test data — country of origin intentionally missing |
| `{{MATERIAL_PHARMA_REQUIRES_LICENSE}}` | Material Number (requires export license) | MARA-MATNR | MM03 → Foreign Trade: Export Data (MEAN-EXTWG set) | 1000000128 | Export control classification indicates license required |
| `{{MATERIAL_PHARMA_PLANT_DATA_MISSING}}` | Material Number (plant data incomplete) | MARA-MATNR | MM03 — MARC record exists but STAWN/HERKL blank | 1000000129 | Integration test data — MM master data incomplete |
| `{{HS_CODE_VALID}}` | Harmonized System Code | MARC-STAWN | MM03 → General/Plant Data → Foreign Trade: Export tab | 3004.90.10.00 | 10-digit HS code for pharmaceuticals |
| `{{HS_CODE_MATERIAL_1}}` | HS Code (Material 1) | MARC-STAWN | MM03 | 3004.90.10.00 | HS code for first material in multi-line delivery |
| `{{HS_CODE_MATERIAL_2}}` | HS Code (Material 2) | MARC-STAWN | MM03 | 3004.90.20.00 | HS code for second material in multi-line delivery |
| `{{COUNTRY_OF_ORIGIN_VALID}}` | Country of Origin | MARC-HERKL | MM03 → General/Plant Data → Foreign Trade: Export tab | US, DE, IN, etc. | ISO Alpha-2 country code |
| `{{COUNTRY_OF_ORIGIN_MATERIAL_1}}` | Country of Origin (Material 1) | MARC-HERKL | MM03 | US | Origin for first material |
| `{{COUNTRY_OF_ORIGIN_MATERIAL_2}}` | Country of Origin (Material 2) | MARC-HERKL | MM03 | DE | Origin for second material |
| `{{UNIT_OF_MEASURE}}` | Unit of Measure | MARA-MEINS | MM03 → Basic Data 1 | KG, L, EA, etc. | Base UoM from material master |

### Batch and Certificate of Analysis Data

| Placeholder | SAP Field | Table.Field | How to Find | Example Value | Notes |
|-------------|-----------|-------------|-------------|---------------|-------|
| `{{BATCH_WITH_COA_VALID}}` | Batch Number | MCHA-CHARG | MSC3N (Batch Information Cockpit) → select material → select batch with CoA attached | BATCH001 | Batch must have QM inspection lot (QA03) with CoA document (DRAW/TOA01) |
| `{{BATCH_WITH_COA_1}}` | Batch Number (first batch) | MCHA-CHARG | MSC3N | BATCH001 | For multi-line delivery — different from Batch 2 |
| `{{BATCH_WITH_COA_2}}` | Batch Number (second batch) | MCHA-CHARG | MSC3N | BATCH002 | For multi-line delivery — different from Batch 1 |
| `{{BATCH_WITHOUT_COA}}` | Batch Number (no CoA) | MCHA-CHARG | MSC3N — batch exists but NO CoA document attached | BATCH999 | Negative test data — CoA intentionally missing |
| `{{BATCH_QM_INSPECTION_LOT_PENDING}}` | Batch Number (QM CoA pending) | MCHA-CHARG | QA03 — inspection lot exists but CoA generation not completed | BATCH888 | Integration test data — QM CoA generation in progress |
| `{{COA_DOCUMENT_NUMBER}}` | Certificate of Analysis Document Number | DRAW-DOKNR | DRAW → search by batch/material → document number | DOC00012345 | QM document linked to batch via QAMB → DRAW → TOA01 |
| `{{COA_DOCUMENT_NUMBER_BATCH_1}}` | CoA Document (Batch 1) | DRAW-DOKNR | DRAW | DOC00012345 | CoA for first batch |
| `{{COA_DOCUMENT_NUMBER_BATCH_2}}` | CoA Document (Batch 2) | DRAW-DOKNR | DRAW | DOC00012346 | CoA for second batch |

### Shipping Point and Plant Data

| Placeholder | SAP Field | Table.Field | How to Find | Example Value | Notes |
|-------------|-----------|-------------|-------------|---------------|-------|
| `{{SHIPPING_POINT_EXPORT_ENABLED}}` | Shipping Point | TVST-VSTEL | OVXA (Maintain Shipping Points) or VL02N default | 1000 | Must be export-enabled and assigned to plant |
| `{{PLANT_CODE}}` | Plant | MARC-WERKS | MM03 → Organizational Levels | 1710 | Plant where material is stocked |

### Export License Data

| Placeholder | SAP Field | Table.Field | How to Find | Example Value | Notes |
|-------------|-----------|-------------|-------------|---------------|-------|
| `{{EXPORT_LICENSE_VALID}}` | Export License Number | EIPA-EXPNR | Table EIPA (Export License Master Data) — SM30 or custom transaction | LIC00012345 | License must be valid (EIPA-GLTBIS >= today) |
| `{{EXPORT_LICENSE_VALIDITY_FUTURE}}` | License Validity Date (future) | EIPA-GLTBIS | Table EIPA | 2026-12-31 | Date in the future (valid) |
| `{{EXPORT_LICENSE_EXPIRED}}` | Export License Number (expired) | EIPA-EXPNR | Table EIPA | LIC00099999 | License with past expiry date |
| `{{EXPORT_LICENSE_EXPIRY_PAST}}` | License Expiry Date (past) | EIPA-GLTBIS | Table EIPA | 2025-01-01 | Date in the past (expired) |
| `{{EXPORT_LICENSE_EXPIRES_TODAY}}` | Export License Number (expires today) | EIPA-EXPNR | Table EIPA | LIC00011111 | Boundary test — license validity date = today (sy-datum) |
| `{{TODAY_DATE}}` | Today's Date (expiry) | EIPA-GLTBIS | System date | 2026-08-24 | Dynamic — set to test execution date |
| `{{EXPORT_LICENSE_EXPIRES_TOMORROW}}` | Export License Number (expires tomorrow) | EIPA-EXPNR | Table EIPA | LIC00011112 | Boundary test — license validity date = tomorrow (sy-datum + 1) |
| `{{TOMORROW_DATE}}` | Tomorrow's Date (expiry) | EIPA-GLTBIS | System date + 1 day | 2026-08-25 | Dynamic — set to test execution date + 1 |

### Quantity and Delivery Data

| Placeholder | SAP Field | Table.Field | How to Find | Example Value | Notes |
|-------------|-----------|-------------|-------------|---------------|-------|
| `{{DELIVERY_QUANTITY_STANDARD}}` | Delivery Quantity | LIPS-LFIMG | Standard quantity for testing | 10, 100, etc. | Must be > 0, ≤ sales order open quantity |
| `{{DELIVERY_QUANTITY_LINE1}}` | Delivery Quantity (Line 1) | LIPS-LFIMG | Multi-line delivery — first line | 10 | Quantity for first line item |
| `{{DELIVERY_QUANTITY_LINE2}}` | Delivery Quantity (Line 2) | LIPS-LFIMG | Multi-line delivery — second line | 5 | Quantity for second line item |
| `{{DELIVERY_QUANTITY_MINIMUM}}` | Minimum Valid Quantity | LIPS-LFIMG | Boundary lower — 0.001 or UoM-specific minimum | 0.001 | Edge case — minimum non-zero quantity |
| `{{DELIVERY_DATE_FUTURE}}` | Delivery Date | LIKP-LFDAT | Future date or today | 2026-09-01 | Date >= today |

### Export Document Output Data

| Placeholder | SAP Field | Table.Field | How to Find | Example Value | Notes |
|-------------|-----------|-------------|-------------|---------------|-------|
| `{{COMMERCIAL_INVOICE_GENERATED}}` | Commercial Invoice Number | NAST output or VF01 billing doc | Output log after export doc generation | INV00012345 | Generated by SAP during export doc generation |
| `{{PACKING_LIST_GENERATED}}` | Packing List Number | NAST output | Output log after export doc generation | PKL00012345 | Generated by SAP during export doc generation |
| `{{COMMERCIAL_INVOICE_ARCHIVED}}` | Archived Commercial Invoice Number | TOA01 archive object | Archive Link viewer or TOA01 table | INV00012345 | Previously archived invoice for retrieval test |
| `{{PACKING_LIST_ARCHIVED}}` | Archived Packing List Number | TOA01 archive object | Archive Link viewer or TOA01 table | PKL00012345 | Previously archived packing list for retrieval test |
| `{{DOCUMENT_TYPE_FAILED}}` | Failed Document Type | NAST output | Output log error message | Certificate of Origin | Document type that failed generation |

### Existing Delivery Data (for retrieval test)

| Placeholder | SAP Field | Table.Field | How to Find | Example Value | Notes |
|-------------|-----------|-------------|-------------|---------------|-------|
| `{{DELIVERY_NUMBER_EXISTING_GOODS_ISSUED}}` | Existing Outbound Delivery Number | LIKP-VBELN | VL03N — search for goods-issued export deliveries | 8000012345 | Delivery must be in status "Goods Issued" (LIKP-WBSTK) with archived export docs |

### Empty/Missing Values (for error test cases)

| Placeholder | SAP Field | Table.Field | How to Find | Example Value | Notes |
|-------------|-----------|-------------|-------------|---------------|-------|
| `{{EMPTY_VALUE}}` | N/A — empty field | N/A | Leave field blank during test execution | (blank) | Used for ERR scenarios to test missing mandatory fields |

---

## How to Create Test Data in SAP

### 1. Create International Sales Order (VA01)

```
Transaction: VA01 (Create Sales Order)
- Order Type: OR (Standard Order)
- Sales Organization: [Your sales org]
- Distribution Channel: 10 (Export)
- Division: 00
- Sold-To Party: [International customer — KNA1-LAND1 ≠ plant country]
- PO Number: [Optional reference]
- Material: [Finished pharmaceutical product with batch management]
- Order Quantity: [Standard quantity, e.g., 10 KG]
- Plant: [Plant with export shipping point]
- Requested Delivery Date: [Future date]
Save → Note Sales Order Number
```

### 2. Create/Verify Material Master Export Data (MM02)

```
Transaction: MM02 (Change Material)
- Material: [FERT material]
- Plant: [Your plant]
→ Basic Data 1 tab:
  - Check "Batch Management" is activated (MARA-XCHPF = X)
→ General/Plant Data → Foreign Trade: Export tab:
  - HS Code (MARC-STAWN): [10-digit HS code, e.g., 3004.90.10.00]
  - Country of Origin (MARC-HERKL): [ISO Alpha-2 code, e.g., US, DE]
Save
```

### 3. Create Batch with CoA (MSC1N, QA01, QM11)

```
Step 1: Create Batch (MSC1N — Batch Master Record)
- Material: [Your material]
- Plant: [Your plant]
- Batch: [Batch number, e.g., BATCH001]
- Expiry Date: [Future date]
Save

Step 2: Create QM Inspection Lot (QA01)
- Material: [Your material]
- Batch: [Batch created in Step 1]
- Inspection Type: 04 (Goods Receipt from Production)
- Plant: [Your plant]
Save → Note Inspection Lot Number

Step 3: Enter Inspection Results and Generate CoA (QA02, QM11)
- Inspection Lot: [Lot from Step 2]
- Enter results for all characteristics
- Complete inspection (usage decision = 04 - Released)
- Generate Certificate of Analysis (QM11):
  - Batch: [Your batch]
  - Select CoA template
  - Generate → Note CoA Document Number (DRAW-DOKNR)
  - Attach CoA to batch via DRAW/TOA01
```

### 4. Create or Verify Export License (MEAN, EIPA)

```
Transaction: SM30 (Table Maintenance)
- Table: EIPA (Export License Master Data)
→ Create new entry:
  - Export License Number (EXPNR): [License number, e.g., LIC00012345]
  - Material Number (MATNR): [Material requiring license]
  - Destination Country (LAND1): [Destination country, e.g., US]
  - Valid From (GLTBS): [Past or today]
  - Valid Until (GLTBIS): [Future date for valid license; past date for expired license; today for boundary test]
Save

For EDGE test cases (expires today/tomorrow):
- Create separate license entries with GLTBIS = sy-datum (today) and sy-datum + 1 (tomorrow)
```

### 5. Configure Export Documentation Output (V/47)

```
Transaction: V/47 (Output Control: Outbound Delivery)
→ Create condition records for export document types:
  - Output Type: [e.g., ZEXP (Commercial Invoice), ZEXL (Packing List)]
  - Sales Organization: [Your sales org]
  - Distribution Channel: [Export channel]
  - Division: 00
  - Destination Country: [International country requiring export docs]
  - Medium: 1 (Print)
  - Partner Function: SP (Sold-To Party)
  - Dispatch Time: 4 (When sending with delivery output)
Save
```

### 6. Configure DMS ArchiveLink (OAC0, OAC2)

```
Transaction: OAC0 (Customizing ArchiveLink)
→ Verify or create content repository:
  - Repository ID: [e.g., D1]
  - Content Category: DMS Archive
  - Storage System: [File system or storage device]
Save

Transaction: OAC2 (Link SAP Document Classes to Content Repository)
→ Link delivery document class to repository:
  - Object Type: LIKP (Outbound Delivery)
  - Document Class: [Export documentation class]
  - Content Repository: D1
Save
```

---

## Test Data Validation Checklist

Before executing test cases, verify the following in your SAP test system:

- [ ] International sales order exists with open delivery quantity (VA03)
- [ ] Material master has HS code and country of origin maintained at plant level (MM03)
- [ ] Batch exists with available stock and CoA attached (MSC3N, QA03, DRAW)
- [ ] Shipping point is export-enabled and assigned to plant (OVXA)
- [ ] Customer is international (KNA1-LAND1 ≠ plant country) (XD03)
- [ ] Export license exists with controllable validity dates for boundary tests (EIPA)
- [ ] Output control configured for export document types (commercial invoice, packing list) (V/47)
- [ ] DMS ArchiveLink interface configured and active (OAC0, TOA01)
- [ ] QM inspection lot with CoA generated for test batch (QA03, QM11)
- [ ] Export control classification maintained for materials requiring license (MEAN)

---

## Notes for Automation Script (Playwright)

When automating test execution with Playwright:

1. **Dynamic Date Handling**: For EDGE test cases (TC-CS-139, TC-CS-140), use JavaScript `Date()` object to calculate `today` and `tomorrow` dynamically at test execution time. Update test data JSON or pass dynamic values to test scripts.

2. **Test Data Setup Scripts**: For NEG and ERR scenarios, pre-create master data with intentional missing fields (e.g., material without HS code, batch without CoA). Store these as separate master data records for negative testing.

3. **Integration Test Data**: For INT scenarios (TC-CS-143, TC-CS-144, TC-CS-145), coordinate with QM, DMS, and MM teams to ensure test system has:
   - QM inspection lots with pending CoA generation status
   - DMS interface that can be toggled off (for TC-CS-144)
   - Materials with missing plant-specific export data (for TC-CS-145)

4. **Multi-Line Delivery Data**: For TC-CS-142 (999 line items), use a scripted approach to generate sales order with 999 line items programmatically (BAPI_SALESORDER_CREATEFROMDAT2 or custom script).

5. **Archive Link Verification**: For retrieval test (TC-CS-127), pre-create and goods-issue a delivery with export documentation archived. Note the delivery number for use in test data.

---

## Contact for Test Data Issues

If you encounter issues with master data availability, export license configuration, or QM CoA generation, contact:

- **MM Master Data Team**: Material master export data (HS code, origin)
- **QM Team**: Certificate of Analysis generation and attachment
- **DMS Team**: ArchiveLink configuration and archival interface
- **Export Control Team**: Export license master data (EIPA)
- **SD Configuration Team**: Output control for export documentation (V/47)

---

**Document Version:** 1.0  
**Last Updated:** 2026-08-24  
**Owner:** TestCase Agent (testcase-agent/skills/extract-testdata)
