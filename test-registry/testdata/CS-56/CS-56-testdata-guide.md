# Test Data Guide: CS-56 — Batch Genealogy Report

**User Story:** CS-56 — View A Batch Genealogy Report Showing The Complete Lineage From Raw Ma
**Module:** PP/QM (Production Planning & Control / Quality Management)
**Generated:** 2026-08-24

---

## Purpose

This guide explains how to substitute real SAP values for the `{{PLACEHOLDER}}` entries in `CS-56-testdata.json`.

**CRITICAL:** Do NOT hardcode these values in test case files. All test data must be referenced via `{TD.*}` placeholders in test steps, which resolve to the values defined in the test data JSON.

---

## General Placeholder Naming Convention

| Placeholder Pattern | Description | Example |
|---------------------|-------------|---------|
| `{{ENTITY_ID}}` | Master data identifier (batch, material, vendor) | `{{FINISHED_GOODS_BATCH_SINGLE_LEVEL}}` |
| `{{ENTITY_NAME}}` | Master data description | `{{VENDOR_NAME_COMPONENT_1}}` |
| `{{DATE_FIELD}}` | Date values | `{{MANUFACTURING_DATE}}`, `{{RELEASE_DATE}}` |
| `{{INVALID_*}}` or `{{NON_EXISTENT_*}}` | Invalid or non-existent values for negative tests | `{{NON_EXISTENT_BATCH_NUMBER}}` |

---

## Master Data Placeholders

### Finished Goods Batches

| Placeholder | SAP Field | Data Type | Where to Find | Example Value |
|-------------|-----------|-----------|---------------|---------------|
| `{{FINISHED_GOODS_BATCH_SINGLE_LEVEL}}` | Batch | Alphanumeric (max 10 chars) | Transaction MSC3N or BMBC; select a finished goods batch with a simple single-level BOM | `1000000123` |
| `{{FINISHED_GOODS_BATCH_MULTI_LEVEL}}` | Batch | Alphanumeric (max 10 chars) | Transaction MSC3N or BMBC; select a finished goods batch with multi-level BOM (raw → intermediate → finished) | `1000000456` |
| `{{FINISHED_GOODS_BATCH_WHERE_USED}}` | Batch | Alphanumeric (max 10 chars) | Transaction MSC3N or BMBC; select a batch that was consumed in further processing or repackaging | `1000000789` |
| `{{FINISHED_GOODS_BATCH_EXPORT}}` | Batch | Alphanumeric (max 10 chars) | Any valid finished goods batch with genealogy data | `1000000123` |
| `{{FINISHED_GOODS_BATCH_SIMPLIFIED}}` | Batch | Alphanumeric (max 10 chars) | Any valid finished goods batch; material will be auto-derived | `1000000123` |
| `{{FINISHED_GOODS_BATCH_BIDIRECTIONAL}}` | Batch | Alphanumeric (max 10 chars) | Select a batch with both upstream (components) and downstream (where-used) relationships | `1000000789` |
| `{{FINISHED_GOODS_BATCH_INCOMPLETE_DATES}}` | Batch | Alphanumeric (max 10 chars) | Transaction MSC3N; select a batch with missing inspection date or manufacturing date | `1000001234` |
| `{{FINISHED_GOODS_BATCH_MAX_DEPTH}}` | Batch | Alphanumeric (max 10 chars) | Transaction MSC3N or BMBC; select a batch with a BOM structure spanning 10+ levels (may require test data creation) | `1000002000` |
| `{{FINISHED_GOODS_BATCH_COMPLEX_ASSEMBLY}}` | Batch | Alphanumeric (max 10 chars) | Transaction MSC3N or BMBC; select a batch with hundreds of component batches (may require test data creation) | `1000003000` |
| `{{FINISHED_GOODS_BATCH_PERFORMANCE}}` | Batch | Alphanumeric (max 10 chars) | Select a batch designed to test performance at the acceptable time threshold (moderate complexity) | `1000000456` |
| `{{FINISHED_GOODS_BATCH_INTEGRATION_MM}}` | Batch | Alphanumeric (max 10 chars) | Select a batch produced using raw materials received via MM goods receipt with vendor batch classification | `1000004000` |
| `{{FINISHED_GOODS_BATCH_INTEGRATION_QM}}` | Batch | Alphanumeric (max 10 chars) | Select a batch with QM inspection lot and recorded results | `1000005000` |
| `{{FINISHED_GOODS_BATCH_EXPORT_FAIL}}` | Batch | Alphanumeric (max 10 chars) | Any valid batch; used to test export failure scenarios | `1000000123` |

### Material Numbers

| Placeholder | SAP Field | Data Type | Where to Find | Example Value |
|-------------|-----------|-----------|---------------|---------------|
| `{{FINISHED_GOODS_MATERIAL_ID}}` | Material | Alphanumeric (max 18 chars) | Transaction MM03; material for finished goods batch | `FG-12345` |
| `{{FINISHED_GOODS_MATERIAL_ID_MULTI_LEVEL}}` | Material | Alphanumeric (max 18 chars) | Transaction MM03; material for multi-level finished goods | `FG-67890` |
| `{{FINISHED_GOODS_MATERIAL_ID_WHERE_USED}}` | Material | Alphanumeric (max 18 chars) | Transaction MM03; material for batch used in further processing | `FG-11111` |
| `{{FINISHED_GOODS_MATERIAL_ID_EXPORT}}` | Material | Alphanumeric (max 18 chars) | Transaction MM03; any finished goods material | `FG-12345` |
| `{{FINISHED_GOODS_MATERIAL_ID_SIMPLIFIED}}` | Material | Alphanumeric (max 18 chars) | Transaction MM03; material auto-derived from batch | `FG-12345` |
| `{{FINISHED_GOODS_MATERIAL_ID_BIDIRECTIONAL}}` | Material | Alphanumeric (max 18 chars) | Transaction MM03; material with both upstream and downstream relationships | `FG-11111` |
| `{{INTERMEDIATE_MATERIAL_ID}}` | Material | Alphanumeric (max 18 chars) | Transaction MM03; semi-finished material in multi-level BOM | `SF-22222` |
| `{{REPACKAGED_MATERIAL_ID}}` | Material | Alphanumeric (max 18 chars) | Transaction MM03; repackaged finished goods material | `FG-33333` |
| `{{MATERIAL_ID_NO_COMPONENTS}}` | Material | Alphanumeric (max 18 chars) | Transaction MM03; material for batch with no component batches | `RM-44444` |

### Component Batches

| Placeholder | SAP Field | Data Type | Where to Find | Example Value |
|-------------|-----------|-----------|---------------|---------------|
| `{{COMPONENT_BATCH_1}}` | Batch | Alphanumeric (max 10 chars) | Transaction MSC3N or BMBC; first component batch consumed in single-level BOM | `2000000001` |
| `{{COMPONENT_BATCH_2}}` | Batch | Alphanumeric (max 10 chars) | Transaction MSC3N or BMBC; second component batch consumed in single-level BOM | `2000000002` |
| `{{COMPONENT_BATCH_UPSTREAM}}` | Batch | Alphanumeric (max 10 chars) | Transaction MSC3N or BMBC; component batch consumed to produce bidirectional batch | `2000000003` |
| `{{INTERMEDIATE_BATCH}}` | Batch | Alphanumeric (max 10 chars) | Transaction MSC3N or BMBC; semi-finished batch in multi-level BOM | `3000000001` |
| `{{RAW_MATERIAL_BATCH_1}}` | Batch | Alphanumeric (max 10 chars) | Transaction MSC3N or BMBC; raw material batch at lowest BOM level | `4000000001` |
| `{{RAW_MATERIAL_BATCH_2}}` | Batch | Alphanumeric (max 10 chars) | Transaction MSC3N or BMBC; second raw material batch | `4000000002` |
| `{{RAW_MATERIAL_BATCH_MM}}` | Batch | Alphanumeric (max 10 chars) | Transaction MSC3N or MIGO; raw material batch received via MM goods receipt | `4000000100` |

### Repackaged Batches

| Placeholder | SAP Field | Data Type | Where to Find | Example Value |
|-------------|-----------|-----------|---------------|---------------|
| `{{REPACKAGED_BATCH}}` | Batch | Alphanumeric (max 10 chars) | Transaction MSC3N or BMBC; batch produced by consuming finished goods batch | `5000000001` |
| `{{REPACKAGED_BATCH_DOWNSTREAM}}` | Batch | Alphanumeric (max 10 chars) | Transaction MSC3N or BMBC; downstream batch in bidirectional genealogy | `5000000002` |

### Vendor Information

| Placeholder | SAP Field | Data Type | Where to Find | Example Value |
|-------------|-----------|-----------|---------------|---------------|
| `{{VENDOR_NAME_COMPONENT_1}}` | Vendor Name | Text | Transaction XK03; vendor for component batch 1 | `Acme Chemicals Inc.` |
| `{{VENDOR_NAME_COMPONENT_2}}` | Vendor Name | Text | Transaction XK03; vendor for component batch 2 | `Global Supplies Ltd.` |
| `{{VENDOR_NAME_RAW_1}}` | Vendor Name | Text | Transaction XK03; vendor for raw material batch 1 | `Raw Materials Co.` |
| `{{VENDOR_NAME_RAW_2}}` | Vendor Name | Text | Transaction XK03; vendor for raw material batch 2 | `Bulk Suppliers Inc.` |
| `{{VENDOR_NAME}}` | Vendor Name | Text | Transaction XK03; vendor for MM integration test | `Industrial Materials Ltd.` |
| `{{VENDOR_BATCH_NUMBER}}` | Vendor Batch | Alphanumeric | Transaction MIGO or batch classification (CL20N); vendor's batch number from goods receipt | `VENDOR-BATCH-12345` |

---

## Organization and Configuration Placeholders

| Placeholder | SAP Field | Data Type | Where to Find | Example Value |
|-------------|-----------|-----------|---------------|---------------|
| `{{PLANT_CODE}}` | Plant | Alphanumeric (4 chars) | Transaction OX10; plant where batches are produced | `1710` |

---

## Transaction Data Placeholders

### Manufacturing and Production Orders

| Placeholder | SAP Field | Data Type | Where to Find | Example Value |
|-------------|-----------|-----------|---------------|---------------|
| `{{MANUFACTURING_ORDER_NUMBER}}` | Order | Numeric (12 digits) | Transaction CO03; production order that produced the batch | `100000123456` |
| `{{REPACKAGING_ORDER_NUMBER}}` | Order | Numeric (12 digits) | Transaction CO03; production or repackaging order for repackaged batch | `100000789012` |

### Dates

| Placeholder | SAP Field | Data Type | Where to Find | Example Value |
|-------------|-----------|-----------|---------------|---------------|
| `{{MANUFACTURING_DATE}}` | Production Date | Date (YYYY-MM-DD) | Transaction CO03 or MSC3N; date when batch was produced | `2026-07-15` |
| `{{MANUFACTURING_DATE_FINISHED}}` | Production Date | Date (YYYY-MM-DD) | Transaction CO03; date when finished goods batch was produced | `2026-07-20` |
| `{{MANUFACTURING_DATE_INTERMEDIATE}}` | Production Date | Date (YYYY-MM-DD) | Transaction CO03; date when intermediate batch was produced | `2026-07-18` |
| `{{RELEASE_DATE}}` | Release Date | Date (YYYY-MM-DD) | Transaction MSC3N or QA11; date when batch was released to unrestricted use | `2026-07-22` |
| `{{REPACKAGING_DATE}}` | Production Date | Date (YYYY-MM-DD) | Transaction CO03; date when repackaging occurred | `2026-07-25` |

### Quality Management Data

| Placeholder | SAP Field | Data Type | Where to Find | Example Value |
|-------------|-----------|-----------|---------------|---------------|
| `{{INSPECTION_LOT_NUMBER}}` | Inspection Lot | Numeric (12 digits) | Transaction QA11 or QA32; inspection lot for batch | `100000001234` |
| `{{INSPECTION_RESULTS}}` | Inspection Results | Text | Transaction QA11 or QA32; in-process control results | `Pass` or `All characteristics within specification` |
| `{{USAGE_DECISION}}` | Usage Decision | Text | Transaction QA11 or QA32; QM usage decision | `Released` or `Approved` |

### MM Integration Data

| Placeholder | SAP Field | Data Type | Where to Find | Example Value |
|-------------|-----------|-----------|---------------|---------------|
| `{{GOODS_RECEIPT_NUMBER}}` | Material Document | Numeric (10 digits) | Transaction MIGO or MB03; goods receipt document | `5000012345` |

---

## Export Format Placeholder

| Placeholder | SAP Field | Data Type | Where to Find | Example Value |
|-------------|-----------|-----------|---------------|---------------|
| `{{EXPORT_FORMAT_PDF_OR_EXCEL}}` | Export Format | Selection | Batch Information Cockpit export menu | `PDF` or `Excel` |

---

## Performance and Edge Case Placeholders

| Placeholder | SAP Field | Data Type | Where to Find | Example Value |
|-------------|-----------|-----------|---------------|---------------|
| `{{EXPECTED_BOM_DEPTH_10_PLUS}}` | BOM Levels | Numeric | Based on BOM structure setup; count BOM levels manually | `10`, `12`, or `15` |
| `{{EXPECTED_COMPONENT_COUNT_200_PLUS}}` | Component Count | Numeric | Based on BOM structure setup; count component batches manually | `200`, `300`, or `500` |
| `{{ACCEPTABLE_TIME_THRESHOLD_SECONDS}}` | Time (seconds) | Numeric | Define acceptable threshold per AC-6 (suggest 10 seconds) | `10` |
| `{{MISSING_DATE_FIELD_NAME}}` | Field Name | Text | Identifies which date is missing | `Inspection Date` or `Manufacturing Date` |

---

## Negative Test Data Placeholders

| Placeholder | SAP Field | Data Type | How to Generate | Example Value |
|-------------|-----------|-----------|-----------------|---------------|
| `{{NON_EXISTENT_BATCH_NUMBER}}` | Batch | Alphanumeric (max 10 chars) | Use a batch number that does NOT exist in SAP batch master; verify via MSC3N | `9999999999` |
| `{{INVALID_BATCH_FORMAT}}` | Batch | Alphanumeric | Use invalid characters or exceed max length (>10 chars) | `INVALID@BATCH#123456789` or `TOOLONGBATCH123` |
| `{{BATCH_WITH_NO_COMPONENTS}}` | Batch | Alphanumeric (max 10 chars) | Transaction MSC3N; select a raw material batch or a batch never consumed in production | `6000000001` |

---

## Authorization Test Data Placeholders

| Placeholder | SAP Field | Data Type | How to Generate | Example Value |
|-------------|-----------|-----------|-----------------|---------------|
| `{{UNAUTHORIZED_USER_EMAIL}}` | Email | Email format | Create or identify a test user WITHOUT Batch Information Cockpit authorization | `unauthorized.user@capgemini.com` |
| `{{UNAUTHORIZED_USER_PASSWORD}}` | Password | Text (masked) | Password for unauthorized test user | `TestPass123` (stored securely) |

---

## Empty Value Placeholder

| Placeholder | SAP Field | Data Type | How to Generate | Example Value |
|-------------|-----------|-----------|-----------------|---------------|
| (empty value) | Any Field | N/A | Leave field blank or empty in test execution | `` (blank) |

---

## Test Data Resolution Instructions

### Step 1: Identify Available Test Data in SAP System

Use the following transactions to identify existing batches with suitable genealogy data:

1. **Transaction BMBC (Batch Information Cockpit)** — Browse batches with genealogy data
2. **Transaction MSC3N (Batch Where-Used List)** — Identify batches with component or where-used relationships
3. **Transaction CO03 (Display Production Order)** — View manufacturing orders and batch assignments
4. **Transaction QA11 (Display Inspection Lot)** — View QM inspection lots for batches
5. **Transaction MIGO (Goods Receipt)** or **MB03 (Display Material Document)** — View MM goods receipts with vendor batch classification

### Step 2: Validate Test Data Suitability

For each batch identified:

- **Single-Level BOM:** Verify batch has component batches at only one BOM level (components → finished goods)
- **Multi-Level BOM:** Verify batch has component batches spanning at least 3 BOM levels (raw → intermediate → finished)
- **Where-Used Chain:** Verify batch was consumed in further processing (finished → repackaged)
- **Vendor Batch Linkage:** Verify vendor batch number is maintained in batch classification (Transaction CL20N) for raw material batches
- **QM Inspection Data:** Verify inspection lot exists and results are recorded for the batch

### Step 3: Substitute Placeholders in Test Data JSON

Replace all `{{PLACEHOLDER}}` values in `CS-56-testdata.json` with real SAP values identified in Steps 1-2.

### Step 4: Verify Data Consistency

Ensure that:

- All batches exist in the SAP system being tested
- All organizational units (plant, company code) match the test system configuration
- All dates are realistic and within acceptable ranges
- Vendor information is correctly maintained for raw material batches
- QM inspection data is accessible and complete for integration tests

---

## Test Data Creation Requirements (If Existing Data Is Insufficient)

If suitable test data does not exist in the SAP system, you may need to create test data manually:

### Single-Level Genealogy (TC-CS-167):
1. Create two raw material batches via MIGO goods receipt
2. Create a manufacturing order (CO01) for a finished goods material with a simple BOM
3. Confirm the manufacturing order (CO15) with batch consumption of the two raw material batches and batch output of one finished goods batch

### Multi-Level Genealogy (TC-CS-168):
1. Create raw material batches via MIGO
2. Create and confirm a manufacturing order for an intermediate material (consuming raw material batches)
3. Create and confirm a manufacturing order for a finished goods material (consuming the intermediate batch)
4. Verify the genealogy chain spans at least 3 levels

### Where-Used Chain (TC-CS-169):
1. Use an existing finished goods batch or create one as per TC-CS-167
2. Create a repackaging or further processing manufacturing order that consumes the finished goods batch
3. Confirm the order to create a repackaged batch

### MM-PP Integration (TC-CS-183):
1. Post a goods receipt (MIGO) for a raw material batch with vendor batch classification (CL20N)
2. Create and confirm a manufacturing order consuming the raw material batch
3. Verify vendor batch number is accessible in batch genealogy report

### QM-PP Integration (TC-CS-184):
1. Create a finished goods batch via manufacturing order confirmation
2. QM inspection lot is automatically created (or create manually via QA01)
3. Record inspection results (QA11 or QA32) and make a usage decision to release the batch
4. Verify inspection lot data is accessible in batch genealogy report

---

## Notes

- **Do NOT hardcode any values in test case `.md` files.** All values must use `{TD.*}` placeholders that reference this test data JSON.
- **Date placeholders:** Use relative dates (e.g., today - 7 days for manufacturing date) if dynamic dates are required in automation.
- **Sensitive data:** Never use real production batch numbers or vendor-proprietary information. Use synthetic test data only.
- **Performance test data:** EDGE-01 (max depth) and EDGE-02 (complex assembly) may require specialized test data creation with controlled BOM structures.

---

## Related Files

- **Test Data JSON:** `testdata/CS-56/CS-56-testdata.json`
- **Test Cases:** `testcases/AI-generated testcases/CS-56/testcases/TC-CS-167.md` through `TC-CS-184.md`
- **Coverage Matrix:** `testcases/AI-generated testcases/CS-56/CS-56-coverage-matrix.md`
- **Summary JSON:** `testcases/AI-generated testcases/CS-56/CS-56-summary.json`
