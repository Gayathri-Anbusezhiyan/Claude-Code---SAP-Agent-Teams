# Test Data Guide: CS-26 — Generate A Batch Traceability Report Showing All Goods Movements For A

**Module:** MM (Materials Management — Batch Management)
**Feature:** Batch Traceability Report / Batch Where-Used List
**Generated:** 2026-08-23

---

## Purpose

This guide explains what real SAP values to substitute for each `{{PLACEHOLDER}}` in the test data JSON file (`CS-26-testdata.json`).

**Instructions for SAP Admin / Data Provisioning Team:**
1. Read the "How to Find" column for each placeholder
2. Locate the corresponding value in the SAP S/4HANA Cloud tenant (my426318.s4hana.cloud.sap)
3. Replace the `{{PLACEHOLDER}}` text in the JSON file with the actual value
4. Ensure all related values are consistent (e.g., batch must belong to the specified material)

---

## Data Sets Overview

| Dataset ID | Name | Scenario Type | Used By |
|-----------|------|---------------|---------|
| TD-CS-026-001 | Comprehensive Batch Traceability — Process Order Linkage and Excel Export | HAPPY_PATH | TC-CS-081 |
| TD-CS-026-002 | Search by Material Number | ALTERNATIVE_PATH | TC-CS-082 |
| TD-CS-026-003 | Search by Vendor Batch Reference | ALTERNATIVE_PATH | TC-CS-083 |
| TD-CS-026-004 | PDF Export | ALTERNATIVE_PATH | TC-CS-084 |
| TD-CS-026-NEG-001 | Non-Existent Batch Number | NEGATIVE | TC-CS-085 |
| TD-CS-026-NEG-002 | Non-Batch-Managed Material | NEGATIVE | TC-CS-086 |
| TD-CS-026-NEG-003 | Batch with Zero Movements | NEGATIVE | TC-CS-087 |
| TD-CS-026-ERR-001 | Missing Search Criteria | ERROR | TC-CS-088 |
| TD-CS-026-EDGE-001 | Large Dataset Performance | EDGE_CASE | TC-CS-089 |
| TD-CS-026-EDGE-002 | Multi-Plant Complexity | EDGE_CASE | TC-CS-090 |
| TD-CS-026-INT-001 | Process Order Linkage Integration | INTEGRATION | TC-CS-091 |
| TD-CS-026-INT-002 | Delivery Linkage Integration | INTEGRATION | TC-CS-092 |

---

## Placeholder Definitions

### Dataset: TD-CS-026-001 (Comprehensive Batch Traceability — Process Order Linkage and Excel Export)

| Placeholder | Description | How to Find | Example Value | Data Type | Notes |
|------------|-------------|-------------|---------------|-----------|-------|
| `{{BATCH_NUMBER_VALID_WITH_MOVEMENTS}}` | Batch number with multiple goods movements (GR, transfer, consumption, issue) | Transaction MSC3N or MCHB (Batch Stock) → Find a batch with multiple material documents in MSEG → Use MB51 (Material Document List) to verify movements | `B001234567` | Alphanumeric (10 chars max) | Must have at least 4 movement types: 101 (GR), 311 (transfer), 261 (consumption), 201 (issue) |
| `{{MATERIAL_NUMBER_BATCH_MANAGED}}` | Material number associated with the batch (batch management enabled) | Transaction MM03 → Enter material → Verify "Batch management" checkbox is active in General Plant Data view | `RM123456` | Alphanumeric (18 chars max) | Must have MARA-XCHPF = X (batch management indicator) |
| `{{MATERIAL_DESCRIPTION_BATCH_MANAGED}}` | Material description | Transaction MM03 → Material description field | `Raw Material - Batch Managed` | Text (40 chars max) | Auto-populated in SAP; reference value only |
| `{{BASE_UOM}}` | Base unit of measure | Transaction MM03 → Base Unit of Measure field | `KG` | Unit code (3 chars) | Auto-populated; reference value only |
| `{{PLANT_CODE}}` | Plant code | Transaction MCHB → Plant field or use existing plant code | `1710` | Numeric (4 chars) | Must be active and assigned to company code |
| `{{STORAGE_LOCATION_CODE}}` | Storage location code | Transaction MCHB → Storage Location field | `0001` | Alphanumeric (4 chars) | Must exist for the plant |
| `{{GOODS_RECEIPT_DATE}}` | Date of goods receipt movement | Transaction MB51 → Filter by batch and movement type 101 → Note posting date | `01.01.2026` | Date (DD.MM.YYYY) | Historical date when GR occurred |
| `{{GOODS_RECEIPT_QUANTITY}}` | Quantity received | Transaction MB51 → Quantity field for movement type 101 | `100` | Decimal | Must match actual GR quantity in MSEG |
| `{{TRANSFER_DATE}}` | Date of transfer movement | Transaction MB51 → Filter by batch and movement type 311 → Note posting date | `05.01.2026` | Date (DD.MM.YYYY) | Historical date when transfer occurred |
| `{{TRANSFER_QUANTITY}}` | Quantity transferred | Transaction MB51 → Quantity field for movement type 311 | `50` | Decimal | Must match actual transfer quantity in MSEG |
| `{{CONSUMPTION_DATE}}` | Date of consumption movement | Transaction MB51 → Filter by batch and movement type 261 → Note posting date | `10.01.2026` | Date (DD.MM.YYYY) | Historical date when consumption occurred |
| `{{CONSUMPTION_QUANTITY}}` | Quantity consumed | Transaction MB51 → Quantity field for movement type 261 | `30` | Decimal | Must match actual consumption quantity in MSEG |
| `{{ISSUE_DATE}}` | Date of issue movement | Transaction MB51 → Filter by batch and movement type 201 → Note posting date | `15.01.2026` | Date (DD.MM.YYYY) | Historical date when issue occurred |
| `{{ISSUE_QUANTITY}}` | Quantity issued | Transaction MB51 → Quantity field for movement type 201 | `20` | Decimal | Must match actual issue quantity in MSEG |
| `{{PROCESS_ORDER_NUMBER}}` | Process order that consumed the batch | Transaction COOIS (Process Order List) → Find order that consumed the batch material → Note order number | `1000123456` | Numeric (12 chars) | Must reference the batch in batch assignment (PP module) |
| `{{MATERIAL_DOCUMENT_NUMBER}}` | Material document number for a sample movement | Transaction MB03 → Note material document number | `5000123456` | Numeric (10 chars) | Any material document from the batch movements |

---

### Dataset: TD-CS-026-002 (Search by Material Number)

| Placeholder | Description | How to Find | Example Value | Data Type | Notes |
|------------|-------------|-------------|---------------|-----------|-------|
| `{{MATERIAL_NUMBER_BATCH_MANAGED_SEARCH}}` | Material number with batch management enabled | Transaction MM03 → Find a batch-managed material | `RM789012` | Alphanumeric (18 chars max) | Must have at least 2 batches associated |
| `{{MATERIAL_DESCRIPTION_BATCH_MANAGED_SEARCH}}` | Material description | Transaction MM03 → Material description field | `Raw Material - Multi Batch` | Text (40 chars max) | Auto-populated; reference value only |
| `{{BASE_UOM_SEARCH}}` | Base unit of measure | Transaction MM03 → Base Unit of Measure field | `L` | Unit code (3 chars) | Auto-populated; reference value only |
| `{{BATCH_NUMBER_1}}` | First batch associated with the material | Transaction MSC3N → Enter material → Note first batch number | `B001111111` | Alphanumeric (10 chars max) | Must have goods movements |
| `{{BATCH_NUMBER_2}}` | Second batch associated with the material | Transaction MSC3N → Enter material → Note second batch number | `B002222222` | Alphanumeric (10 chars max) | Must have goods movements |
| `{{PLANT_CODE_SEARCH}}` | Plant code | Transaction MCHB → Plant field | `1710` | Numeric (4 chars) | Must be active |
| `{{GOODS_RECEIPT_QUANTITY_SEARCH}}` | Sample goods receipt quantity | Transaction MB51 → Quantity field for movement type 101 | `200` | Decimal | Sample value for verification |

---

### Dataset: TD-CS-026-003 (Search by Vendor Batch Reference)

| Placeholder | Description | How to Find | Example Value | Data Type | Notes |
|------------|-------------|-------------|---------------|-----------|-------|
| `{{VENDOR_BATCH_REFERENCE}}` | Vendor batch number | Transaction MSC3N → Note "Vendor Batch" field OR MB03 (Material Document Display) → Vendor Batch field | `VB-2026-001` | Alphanumeric (15 chars max) | Must be maintained at goods receipt (MIGO) |
| `{{BATCH_NUMBER_VENDOR}}` | Internal SAP batch number linked to the vendor batch | Transaction MSC3N → Note internal batch number corresponding to vendor batch | `B003333333` | Alphanumeric (10 chars max) | Must be linked to the vendor batch reference |
| `{{MATERIAL_NUMBER_VENDOR}}` | Material number associated with the vendor batch | Transaction MM03 → Material number | `RM345678` | Alphanumeric (18 chars max) | Must be batch-managed |
| `{{MATERIAL_DESCRIPTION_VENDOR}}` | Material description | Transaction MM03 → Material description field | `Raw Material - Vendor Batch` | Text (40 chars max) | Auto-populated; reference value only |
| `{{BASE_UOM_VENDOR}}` | Base unit of measure | Transaction MM03 → Base Unit of Measure field | `KG` | Unit code (3 chars) | Auto-populated; reference value only |
| `{{PLANT_CODE_VENDOR}}` | Plant code | Transaction MCHB → Plant field | `1710` | Numeric (4 chars) | Must be active |
| `{{GOODS_RECEIPT_DATE_VENDOR}}` | Date of goods receipt | Transaction MB51 → Posting date for movement type 101 | `01.02.2026` | Date (DD.MM.YYYY) | Historical GR date |
| `{{GOODS_RECEIPT_QUANTITY_VENDOR}}` | Quantity received | Transaction MB51 → Quantity field for movement type 101 | `150` | Decimal | Actual GR quantity |

---

### Dataset: TD-CS-026-004 (PDF Export)

| Placeholder | Description | How to Find | Example Value | Data Type | Notes |
|------------|-------------|-------------|---------------|-----------|-------|
| `{{BATCH_NUMBER_PDF}}` | Batch number for PDF export test | Transaction MSC3N → Find any batch with movements | `B004444444` | Alphanumeric (10 chars max) | Must have goods movements to export |
| `{{MATERIAL_NUMBER_PDF}}` | Material number | Transaction MM03 → Material number | `RM456789` | Alphanumeric (18 chars max) | Must be batch-managed |
| `{{MATERIAL_DESCRIPTION_PDF}}` | Material description | Transaction MM03 → Material description field | `Raw Material - PDF Test` | Text (40 chars max) | Auto-populated; reference value only |
| `{{GOODS_RECEIPT_QUANTITY_PDF}}` | Sample GR quantity | Transaction MB51 → Quantity field | `100` | Decimal | Sample value for verification |

---

### Dataset: TD-CS-026-NEG-001 (Non-Existent Batch Number)

| Placeholder | Description | How to Find | Example Value | Data Type | Notes |
|------------|-------------|-------------|---------------|-----------|-------|
| `{{BATCH_NUMBER_NON_EXISTENT}}` | Non-existent batch number | Create a batch number that does NOT exist in MSC3N (e.g., use alphanumeric string unlikely to exist) | `NONEXIST99` | Alphanumeric (10 chars max) | Must NOT exist in MCHA/MCH1 |

---

### Dataset: TD-CS-026-NEG-002 (Non-Batch-Managed Material)

| Placeholder | Description | How to Find | Example Value | Data Type | Notes |
|------------|-------------|-------------|---------------|-----------|-------|
| `{{MATERIAL_NUMBER_NON_BATCH_MANAGED}}` | Material number WITHOUT batch management enabled | Transaction MM03 → Find a material where "Batch management" checkbox is NOT active | `NONBATCH01` | Alphanumeric (18 chars max) | Must have MARA-XCHPF NOT set (no batch management) |
| `{{MATERIAL_DESCRIPTION_NON_BATCH_MANAGED}}` | Material description | Transaction MM03 → Material description field | `Non-Batch Material` | Text (40 chars max) | Auto-populated; reference value only |

---

### Dataset: TD-CS-026-NEG-003 (Batch with Zero Movements)

| Placeholder | Description | How to Find | Example Value | Data Type | Notes |
|------------|-------------|-------------|---------------|-----------|-------|
| `{{BATCH_NUMBER_ZERO_MOVEMENTS}}` | Batch number with zero goods movements | Transaction MSC2N (Create Batch) → Create a batch manually → Do NOT post any movements | `B000000000` | Alphanumeric (10 chars max) | Must exist in MCHA but have zero records in MSEG |
| `{{MATERIAL_NUMBER_ZERO_MOVEMENTS}}` | Material number | Transaction MM03 → Material number | `RM999999` | Alphanumeric (18 chars max) | Must be batch-managed |
| `{{MATERIAL_DESCRIPTION_ZERO_MOVEMENTS}}` | Material description | Transaction MM03 → Material description field | `Raw Material - Zero Movements` | Text (40 chars max) | Auto-populated; reference value only |

---

### Dataset: TD-CS-026-ERR-001 (Missing Search Criteria)

| Placeholder | Description | How to Find | Example Value | Data Type | Notes |
|------------|-------------|-------------|---------------|-----------|-------|
| `{{emptyBatch}}` | Empty/blank batch field | Leave empty (empty string `""`) | `` | Empty string | This tests missing mandatory field validation |

---

### Dataset: TD-CS-026-EDGE-001 (Large Dataset Performance)

| Placeholder | Description | How to Find | Example Value | Data Type | Notes |
|------------|-------------|-------------|---------------|-----------|-------|
| `{{BATCH_NUMBER_LARGE_DATASET}}` | Batch number with 100+ movements | Transaction MB51 → Find a batch with very large number of material documents OR create test batch with repeated GR/GI transactions | `B100000001` | Alphanumeric (10 chars max) | Requires pre-configured test data; coordinate with SAP admin to create batch with 100+ movements |
| `{{MATERIAL_NUMBER_LARGE_DATASET}}` | Material number | Transaction MM03 → Material number | `RMLARGE001` | Alphanumeric (18 chars max) | Must be batch-managed |
| `{{MATERIAL_DESCRIPTION_LARGE_DATASET}}` | Material description | Transaction MM03 → Material description field | `Raw Material - Large Dataset` | Text (40 chars max) | Auto-populated; reference value only |
| `{{LARGE_MOVEMENT_COUNT}}` | Expected movement count | Count of material documents for the batch | `100` | Numeric | Approximate count; used for verification |

---

### Dataset: TD-CS-026-EDGE-002 (Multi-Plant Complexity)

| Placeholder | Description | How to Find | Example Value | Data Type | Notes |
|------------|-------------|-------------|---------------|-----------|-------|
| `{{BATCH_NUMBER_MULTI_PLANT}}` | Batch number with movements across multiple plants | Transaction MB51 → Find a batch with movement type 311 (inter-plant transfer) across 3+ plants | `B200000001` | Alphanumeric (10 chars max) | Requires pre-configured test data with inter-plant transfers |
| `{{MATERIAL_NUMBER_MULTI_PLANT}}` | Material number | Transaction MM03 → Material number | `RMMULTI001` | Alphanumeric (18 chars max) | Must be batch-managed and configured for multiple plants |
| `{{MATERIAL_DESCRIPTION_MULTI_PLANT}}` | Material description | Transaction MM03 → Material description field | `Raw Material - Multi Plant` | Text (40 chars max) | Auto-populated; reference value only |
| `{{PLANT_CODE_1}}` | First plant code | Transaction MCHB → Plant field | `1710` | Numeric (4 chars) | Must be active |
| `{{PLANT_CODE_2}}` | Second plant code | Transaction MCHB → Plant field | `1720` | Numeric (4 chars) | Must be active |
| `{{PLANT_CODE_3}}` | Third plant code | Transaction MCHB → Plant field | `1730` | Numeric (4 chars) | Must be active |

---

### Dataset: TD-CS-026-INT-001 (Process Order Linkage Integration)

| Placeholder | Description | How to Find | Example Value | Data Type | Notes |
|------------|-------------|-------------|---------------|-----------|-------|
| `{{BATCH_NUMBER_PROCESS_ORDER}}` | Batch number consumed by process order | Transaction COOIS (Process Order List) → Find order → Note batch consumed in components | `B300000001` | Alphanumeric (10 chars max) | Must be consumed by a process order (movement type 261) |
| `{{MATERIAL_NUMBER_PROCESS_ORDER}}` | Material number | Transaction MM03 → Material number | `RMPO001` | Alphanumeric (18 chars max) | Must be batch-managed |
| `{{MATERIAL_DESCRIPTION_PROCESS_ORDER}}` | Material description | Transaction MM03 → Material description field | `Raw Material - Process Order` | Text (40 chars max) | Auto-populated; reference value only |
| `{{PROCESS_ORDER_NUMBER_INT}}` | Process order number | Transaction COOIS → Order number | `1000456789` | Numeric (12 chars) | Must exist in PP module and reference the batch |
| `{{FINISHED_GOODS_NUMBER}}` | Finished goods produced by the process order | Transaction COOIS → Header material (finished goods) | `FG123456` | Alphanumeric (18 chars max) | Finished or semi-finished goods material number |
| `{{CONSUMPTION_DATE_PROCESS_ORDER}}` | Date of consumption movement | Transaction MB51 → Posting date for movement type 261 | `15.02.2026` | Date (DD.MM.YYYY) | Historical consumption date |
| `{{CONSUMPTION_QUANTITY_PROCESS_ORDER}}` | Quantity consumed | Transaction MB51 → Quantity field for movement type 261 | `50` | Decimal | Actual consumption quantity |
| `{{PLANT_CODE_PROCESS_ORDER}}` | Plant code | Transaction COOIS → Plant field | `1710` | Numeric (4 chars) | Must be active |

---

### Dataset: TD-CS-026-INT-002 (Delivery Linkage Integration)

| Placeholder | Description | How to Find | Example Value | Data Type | Notes |
|------------|-------------|-------------|---------------|-----------|-------|
| `{{BATCH_NUMBER_DELIVERY}}` | Batch number issued to delivery | Transaction VL03N (Display Delivery) → Batch split → Note batch number | `B400000001` | Alphanumeric (10 chars max) | Must be issued to a delivery (movement type 601 or 261) |
| `{{MATERIAL_NUMBER_DELIVERY}}` | Material number | Transaction MM03 → Material number | `RMDEL001` | Alphanumeric (18 chars max) | Must be batch-managed |
| `{{MATERIAL_DESCRIPTION_DELIVERY}}` | Material description | Transaction MM03 → Material description field | `Raw Material - Delivery` | Text (40 chars max) | Auto-populated; reference value only |
| `{{DELIVERY_NUMBER_INT}}` | Delivery document number | Transaction VL03N → Delivery number | `8000123456` | Numeric (10 chars) | Must exist in SD module and reference the batch |
| `{{SALES_ORDER_NUMBER}}` | Sales order number | Transaction VA03 (Display Sales Order) → Sales order number | `1234567` | Numeric (10 chars) | Sales order linked to the delivery |
| `{{CUSTOMER_NUMBER}}` | Customer account number | Transaction VA03 → Sold-to party | `100001` | Alphanumeric (10 chars max) | Customer account number |
| `{{ISSUE_DATE_DELIVERY}}` | Date of goods issue | Transaction MB51 → Posting date for movement type 601 or 261 | `20.02.2026` | Date (DD.MM.YYYY) | Historical issue date |
| `{{ISSUE_QUANTITY_DELIVERY}}` | Quantity issued | Transaction MB51 → Quantity field for movement type 601 or 261 | `75` | Decimal | Actual issue quantity |
| `{{PLANT_CODE_DELIVERY}}` | Plant code | Transaction VL03N → Shipping point → Plant field | `1710` | Numeric (4 chars) | Must be active |

---

## Data Dependencies and Relationships

### Critical Relationships (Must Match)

1. **Batch → Material:**
   - Every batch must belong to exactly one material
   - Material must have batch management enabled (MARA-XCHPF = X)
   - Use transaction MSC3N to verify batch-material relationship

2. **Batch → Plant:**
   - Batch exists at plant level (MCHA table)
   - All movements must reference valid plant codes
   - Use transaction MCHB to verify batch stock per plant

3. **Movements → Batch:**
   - All movement dates must be chronologically consistent:
     - Goods receipt (101) typically first
     - Transfers (311) after GR
     - Consumption/issue (261/201) after stock availability
   - Use transaction MB51 to verify movement history

4. **Process Order → Batch:**
   - Process order must reference the batch in component list
   - Consumption movement type 261 links batch to process order
   - Use transaction COOIS to verify process order details

5. **Delivery → Batch:**
   - Delivery must reference the batch in batch split
   - Goods issue movement type 601 or 261 links batch to delivery
   - Use transaction VL03N to verify delivery details

---

## Test Data Creation Instructions

### Step 1: Identify or Create Batch-Managed Materials
- Use transaction MM03 to verify existing materials OR MM01 to create new test materials
- Enable "Batch management" in General Plant Data view
- Note material numbers for use in placeholders

### Step 2: Create Batches
- Use transaction MSC2N (Create Batch) or create via goods receipt (MIGO)
- Assign batches to the batch-managed materials
- For vendor batch scenarios, maintain vendor batch reference during goods receipt

### Step 3: Post Goods Movements
- Use transaction MIGO to post:
  - Goods receipt (movement type 101)
  - Transfer postings (movement type 311) for multi-plant scenarios
  - Goods issues (movement type 261, 201, 601) for consumption/delivery scenarios
- Ensure batch selection is enabled and batches are assigned during posting

### Step 4: Create Process Orders (for Integration Tests)
- Use transaction COR1 (Create Process Order)
- Assign the batch to the raw material component
- Confirm the order to post consumption movement (261)
- Note the process order number for use in placeholders

### Step 5: Create Sales Orders and Deliveries (for Integration Tests)
- Use transaction VA01 (Create Sales Order)
- Create delivery with VL01N (Create Delivery)
- Assign the batch in the delivery batch split
- Post goods issue (601) to complete the delivery
- Note delivery and sales order numbers for use in placeholders

### Step 6: Verify Data Consistency
- Run transaction MB51 to verify all movements are correctly posted
- Run transaction MSC3N to verify batch master data
- Run Batch Where-Used List app in Fiori to preview traceability data

---

## Notes and Best Practices

1. **Do NOT use production data** — All test data must be created in the SAP test system (my426318.s4hana.cloud.sap)

2. **Coordinate with SAP Admin** — Some datasets (EDGE-001, EDGE-002, INT-001, INT-002) require significant data setup; coordinate with SAP BASIS or functional admin

3. **Date consistency** — Ensure all movement dates are in the past and chronologically consistent (GR before consumption, transfer before issue, etc.)

4. **Quantity consistency** — Total consumption/issue quantities must not exceed goods receipt quantities (unless negative stock is allowed)

5. **Authorization** — Ensure test user has authorization for:
   - MM03 (Display Material)
   - MSC3N (Batch Where-Used List)
   - MB51 (Material Document List)
   - COOIS (Process Order List) for integration tests
   - VL03N (Display Delivery) for integration tests

6. **Placeholder format** — When substituting values in the JSON, replace the ENTIRE placeholder including `{{` and `}}` — example: `"{{BATCH_NUMBER_VALID_WITH_MOVEMENTS}}"` becomes `"B001234567"`

7. **Empty values** — For ERR-001 dataset, the `emptyBatch` placeholder should remain as an empty string `""` (not `null`)

---

**Questions or Issues?**
Contact the Test Data Provisioning Team or SAP Functional Admin for assistance with test data setup.

---

**Generated:** 2026-08-23
**Module:** MM (Materials Management — Batch Management)
**User Story:** CS-26
