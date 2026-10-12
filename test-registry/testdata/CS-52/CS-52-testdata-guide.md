# Test Data Guide: CS-52 — Confirm Yield And Scrap Quantities Against A Process Order Operation

## Overview

This guide explains how to replace the `{{PLACEHOLDER}}` values in `CS-52-testdata.json` with real SAP values from the test environment (tenant: my426318.s4hana.cloud.sap).

**IMPORTANT:** All placeholders in the test data JSON file must be replaced with actual values from the SAP test system before test execution.

---

## Master Data Placeholders

### Process Order and Operation Data

| Placeholder | Description | Where to Find | Example Value |
|-------------|-------------|---------------|---------------|
| `{{PROCESS_ORDER_NUMBER_VALID}}` | Valid, released Process Order number (AUFK table, AUTYP='30') | Transaction CO03 or "Display Process Order" Fiori app | `1000001234` |
| `{{PROCESS_ORDER_NUMBER_MULTI_OPERATION}}` | Valid Process Order with at least 2 operations in routing | Transaction CO03 — check routing operations table | `1000001235` |
| `{{PROCESS_ORDER_NUMBER_INVALID}}` | Non-existent Process Order number for negative test | Use a number not in SAP (e.g., 9999999999) | `9999999999` |
| `{{OPERATION_NUMBER_VALID}}` | Valid operation number from the process order routing (AFVC table) | Transaction CO03 — Operations tab | `0010` |
| `{{OPERATION_NUMBER_1}}` | First operation in multi-operation process order | Transaction CO03 — Operations tab | `0010` |
| `{{OPERATION_NUMBER_2}}` | Second operation in multi-operation process order | Transaction CO03 — Operations tab | `0020` |
| `{{OPERATION_NUMBER_INVALID}}` | Operation number not in the order routing | Use a number not in the routing (e.g., 9999) | `9999` |

### Material and Quantity Data

| Placeholder | Description | Where to Find | Example Value |
|-------------|-------------|---------------|---------------|
| `{{MATERIAL_NUMBER}}` | Finished or semi-finished goods material number assigned to process order | Transaction MM03 or "Display Material" Fiori app | `FG000001` |
| `{{MATERIAL_DESCRIPTION}}` | Material description (MAKT-MAKTX) | Transaction MM03 — Basic Data tab | `Finished Product A` |
| `{{UNIT_OF_MEASURE}}` | Base unit of measure (MARA-MEINS) | Transaction MM03 — Basic Data tab | `KG` or `PC` |
| `{{PLANNED_BATCH_QUANTITY}}` | Planned batch quantity from process order header (AFPO-GAMNG) | Transaction CO03 — Header Quantity field | `100` |
| `{{YIELD_QUANTITY_STANDARD}}` | Standard yield quantity (within tolerance) — use 95-105% of planned | Calculate: Planned * 0.98 | `98` |
| `{{YIELD_QUANTITY_WITH_SCRAP}}` | Yield quantity when scrap is present — use 80-90% of planned | Calculate: Planned * 0.85 | `85` |
| `{{YIELD_QUANTITY_POSITIVE_VARIANCE}}` | Yield quantity producing positive variance within tolerance (e.g., +8% if tolerance is +10%) | Calculate: Planned * 1.08 | `108` |
| `{{YIELD_QUANTITY_NEGATIVE_VARIANCE}}` | Yield quantity producing negative variance within tolerance (e.g., -8% if tolerance is -10%) | Calculate: Planned * 0.92 | `92` |
| `{{YIELD_QUANTITY_EXCEEDS_TOLERANCE}}` | Yield quantity exceeding upper tolerance (e.g., +15% if tolerance is +10%) | Calculate: Planned * 1.15 | `115` |
| `{{YIELD_QUANTITY_PARTIAL}}` | Partial yield (60-70% of planned) for Yield + Scrap = Planned scenario | Calculate: Planned * 0.65 | `65` |
| `{{YIELD_QUANTITY_OVER}}` | Yield quantity for over-confirmation test (e.g., 80% of planned) | Calculate: Planned * 0.80 | `80` |
| `{{YIELD_QUANTITY_OPERATION_1}}` | Yield for first operation in multi-operation scenario | Use same as standard yield | `98` |
| `{{YIELD_QUANTITY_OPERATION_2}}` | Yield for second operation in multi-operation scenario | Use same as standard yield | `98` |
| `{{YIELD_QUANTITY_AT_LOWER_BOUNDARY}}` | Yield producing variance exactly at lower tolerance boundary (e.g., -10%) | Calculate: Planned * (1 + Lower Tolerance) | `90` |
| `{{YIELD_QUANTITY_AT_UPPER_BOUNDARY}}` | Yield producing variance exactly at upper tolerance boundary (e.g., +10%) | Calculate: Planned * (1 + Upper Tolerance) | `110` |

### Scrap Data

| Placeholder | Description | Where to Find | Example Value |
|-------------|-------------|---------------|---------------|
| `{{SCRAP_QUANTITY_STANDARD}}` | Standard scrap quantity (10-15% of planned) | Calculate: Planned * 0.15 | `15` |
| `{{SCRAP_QUANTITY_PARTIAL}}` | Partial scrap for Yield + Scrap = Planned scenario | Calculate: Planned - Yield Quantity Partial | `35` |
| `{{SCRAP_QUANTITY_OVER}}` | Scrap quantity for over-confirmation test (e.g., 30% of planned) | Calculate: Planned * 0.30 | `30` |
| `{{SCRAP_REASON_CODE_VALID}}` | Valid scrap reason code (QMFE master data) | Transaction QM03 or "Display Quality Notification" Fiori app | `SCRAP01` |
| `{{SCRAP_REASON_CODE_INVALID}}` | Non-existent scrap reason code | Use a code not in SAP (e.g., INVALID99) | `INVALID99` |
| `{{SCRAP_REASON_DESCRIPTION}}` | Scrap reason code description | Transaction QM03 — Description field | `Material Defect` |

### Work Center Data

| Placeholder | Description | Where to Find | Example Value |
|-------------|-------------|---------------|---------------|
| `{{WORK_CENTER}}` | Work center assigned to operation (CRHD table, ARBPL) | Transaction CR03 or "Display Work Center" Fiori app | `WC001` |
| `{{OPERATION_DESCRIPTION}}` | Operation description text (AFVC-LTXA1) | Transaction CO03 — Operations tab, description column | `Assembly Operation` |

---

## Configuration Placeholders

### Variance Tolerance Configuration

| Placeholder | Description | Where to Find | Example Value |
|-------------|-------------|---------------|---------------|
| `{{VARIANCE_TOLERANCE_LOWER}}` | Lower tolerance threshold (%) for yield variance | Customizing: SPRO → Production → Process Order → Confirmation → Tolerance Profile | `-10` |
| `{{VARIANCE_TOLERANCE_UPPER}}` | Upper tolerance threshold (%) for yield variance | Customizing: SPRO → Production → Process Order → Confirmation → Tolerance Profile | `10` |

**Note:** Tolerance values are typically configured per material type or plant. Verify the configured values in the SAP test system.

### Deviation Management

| Placeholder | Description | Where to Find | Example Value |
|-------------|-------------|---------------|---------------|
| `{{DEVIATION_REASON}}` | Reason text for deviation record when variance exceeds tolerance | Free text entered by user during test execution | `Yield exceeded tolerance due to process optimization` |

---

## Reporting Placeholders

### Date Ranges

| Placeholder | Description | Where to Find | Example Value |
|-------------|-------------|---------------|---------------|
| `{{DATE_RANGE_START}}` | Start date for yield trend report (past date) | Use a date 30-90 days before test execution | `2026-06-01` |
| `{{DATE_RANGE_END}}` | End date for yield trend report (current or recent date) | Use current date or test execution date | `2026-08-24` |

### Shift Data

| Placeholder | Description | Where to Find | Example Value |
|-------------|-------------|---------------|---------------|
| `{{SHIFT_IDENTIFIER}}` | Shift identifier (shift calendar configuration) | Customizing: SPRO → Production → Shop Floor Control → Master Data → Shift Definition | `DAY` or `NIGHT` or `SHIFT1` |

---

## How to Use This Guide

### Step 1: Access SAP Test System

1. Log in to SAP Fiori Launchpad at: `https://my426318.s4hana.cloud.sap`
2. Use credentials: `sunil.yogi@capgemini.com` / `SAP12345@1`

### Step 2: Query Master Data

Use the following SAP transactions or Fiori apps to retrieve actual values:

- **Process Orders:** Fiori app "Display Process Order" or transaction CO03
- **Materials:** Fiori app "Display Material" or transaction MM03
- **Work Centers:** Fiori app "Display Work Center" or transaction CR03
- **Scrap Reason Codes:** Fiori app "Display Quality Notification" or transaction QM03

### Step 3: Calculate Dynamic Values

For placeholders that require calculation (e.g., variance quantities):

1. Retrieve `{{PLANNED_BATCH_QUANTITY}}` from the process order
2. Calculate yield and scrap values based on the formulas in the tables above
3. Ensure that Yield + Scrap ≤ Planned Quantity (except for over-confirmation test)

**Example Calculation:**
- Planned Batch Quantity = 100 KG
- Variance Tolerance = ±10%
- Yield (Standard) = 100 * 0.98 = 98 KG
- Yield (Positive Variance) = 100 * 1.08 = 108 KG (within +10% tolerance)
- Yield (Exceeds Tolerance) = 100 * 1.15 = 115 KG (exceeds +10% tolerance)

### Step 4: Replace Placeholders in JSON

Open `CS-52-testdata.json` and replace all `{{PLACEHOLDER}}` values with the actual values retrieved or calculated.

**Before:**
```json
"yieldQuantity": "{{YIELD_QUANTITY_STANDARD}}"
```

**After:**
```json
"yieldQuantity": "98"
```

### Step 5: Validate Test Data

Before test execution:
1. Verify that all process orders exist and are in "Released" status
2. Verify that all operations exist in the order routing
3. Verify that all scrap reason codes exist in QMFE master data
4. Verify that work centers are active
5. Verify that tolerance configuration matches the expected thresholds

---

## Validation Queries

Use these queries to validate test data before execution:

### Check Process Order Exists and is Released

```sql
SELECT AUFNR, AUTYP, WERKS, GAMNG, MEINS, STATUS 
FROM AUFK 
WHERE AUFNR = '{{PROCESS_ORDER_NUMBER_VALID}}' 
  AND AUTYP = '30';
```

### Check Operations Exist in Routing

```sql
SELECT AUFPL, APLZL, ARBID, ARBPL, LTXA1 
FROM AFVC 
WHERE AUFPL = (SELECT AUFPL FROM AUFK WHERE AUFNR = '{{PROCESS_ORDER_NUMBER_VALID}}');
```

### Check Scrap Reason Code Exists

```sql
SELECT FECOD, FETXT 
FROM QPCT 
WHERE FECOD = '{{SCRAP_REASON_CODE_VALID}}' 
  AND KATALOGART = '9';
```

---

## Notes and Best Practices

1. **Test Data Isolation:** Use dedicated test process orders that do not impact production data.
2. **Data Refresh:** Re-validate test data before each test cycle; process order statuses may change.
3. **Variance Tolerance:** Verify tolerance configuration in SPRO before executing variance test cases.
4. **Deviation Workflow:** Ensure deviation management workflow is configured and active in the test system.
5. **Shift Calendar:** Verify shift calendar configuration if executing reporting test cases.
6. **Date Ranges:** Use historical confirmation data for reporting tests; ensure sufficient data exists in the date range.

---

## Contact

For questions about test data setup or SAP system access:
- **SAP System Admin:** (contact details)
- **Test Data Manager:** (contact details)
- **Project QA Lead:** (contact details)

---

**Generated By:** testcase-agent/skills/generate-testcases  
**Generated At:** 2026-08-24  
**User Story:** CS-52 — Confirm Yield And Scrap Quantities Against A Process Order Operation  
**Module:** PP — Production Planning and Execution
