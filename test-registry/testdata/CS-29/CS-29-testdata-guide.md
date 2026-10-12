# Test Data Resolution Guide: CS-29

**Story:** CS-29 — Perform Three-Way Match Invoice Verification For A Gmp Material Purchase  
**Module:** MM/FI (Materials Management / Financial Accounting)  
**Feature:** Three-Way Match Invoice Verification  
**Generated:** 2026-08-24

---

## Overview

This guide explains how to resolve the `{{PLACEHOLDER}}` values in `CS-29-testdata.json` with actual SAP system values before test execution.

**IMPORTANT:** All placeholders must be replaced with real SAP data from the tenant **my426318.s4hana.cloud.sap** before executing test cases.

---

## Master Data Prerequisites

### Purchase Orders

| Placeholder | Description | Resolution Steps | Example Value |
|-------------|-------------|------------------|---------------|
| `{{PO_NUMBER_WITH_GR}}` | Valid open PO with goods receipt posted (not fully invoiced) | Query SAP for a PO with status "Released", GR posted, and open for invoicing. Can reuse CS-2 PO if available. | `4500065467` (from CS-2, requires re-validation for new tenant) |
| `{{PO_NUMBER_WITH_MULTIPLE_GRS}}` | PO with at least 2 separate GR documents posted | Create a test PO and post 2 separate goods receipts (partial deliveries) | `4500065468` (example) |
| `{{PO_NUMBER_WITH_PARTIAL_GR}}` | PO with total quantity > GR quantity (partial delivery received) | Create a test PO for quantity 100; post GR for quantity 50 only | `4500065469` (example) |
| `{{PO_NUMBER_WITHOUT_GR}}` | Valid released PO with NO goods receipt posted | Create a test PO and do NOT post any goods receipt | `4500065470` (example) |
| `{{PO_NUMBER_NON_EXISTENT}}` | Non-existent PO number (does not exist in SAP) | Use a number outside the SAP number range or a known invalid number | `9999999999` |

**Note:** All POs must reference Supplier `{{SUPPLIER_ID}}` and Material `{{MATERIAL_ID}}`.

---

### Supplier Master Data

| Placeholder | Description | Resolution Steps | Example Value |
|-------------|-------------|------------------|---------------|
| `{{SUPPLIER_ID}}` | Valid supplier ID with FI-AP setup | Query LFA1 table for an active supplier in company code 1710; verify payment terms configured | `17300002` (from CS-2, requires re-validation) |
| `{{SUPPLIER_NAME}}` | Supplier name (auto-populated by SAP) | Retrieved from LFA1-NAME1 for `{{SUPPLIER_ID}}` | `Carbon Tec Inc.` (from CS-2, requires re-validation) |

**Verification:** Navigate to "Manage Suppliers" Fiori app; search for `{{SUPPLIER_ID}}`; confirm status = Active, payment terms configured.

---

### Material Master Data

| Placeholder | Description | Resolution Steps | Example Value |
|-------------|-------------|------------------|---------------|
| `{{MATERIAL_ID}}` | GMP material (pharmaceutical/life sciences) | Query MARA table for a material with type ROH (raw material) or HAWA, configured for plant 1710 | `RMPI001` (from CS-2, requires re-validation) |
| `{{MATERIAL_DESCRIPTION}}` | Material description (auto-populated by SAP) | Retrieved from MAKT-MAKTX for `{{MATERIAL_ID}}` | `Input 1 (WATER)` (from CS-2, requires re-validation) |

**Verification:** Navigate to "Manage Materials" Fiori app; search for `{{MATERIAL_ID}}`; confirm status = Active, plant 1710 configured.

---

## Goods Receipt Data

| Placeholder | Description | Resolution Steps | Example Value |
|-------------|-------------|------------------|---------------|
| `{{GR_QUANTITY}}` | Quantity from posted goods receipt | Query MSEG table for the GR document referencing `{{PO_NUMBER_WITH_GR}}`; retrieve MENGE (quantity) | `10` (from CS-2, requires re-validation) |
| `{{GR1_QUANTITY}}` | First GR quantity for multi-GR scenario | Post first GR for `{{PO_NUMBER_WITH_MULTIPLE_GRS}}`; note quantity | `5` (example) |
| `{{GR2_QUANTITY}}` | Second GR quantity for multi-GR scenario | Post second GR for same PO; note quantity | `3` (example) |
| `{{GR1_QUANTITY_PLUS_GR2_QUANTITY}}` | Total cumulative GR quantity | Calculate: `{{GR1_QUANTITY}}` + `{{GR2_QUANTITY}}` | `8` (5 + 3) |
| `{{GR_PARTIAL_QUANTITY}}` | Partial GR quantity (less than PO total) | Post GR for `{{PO_NUMBER_WITH_PARTIAL_GR}}` with quantity < PO quantity | `50` (if PO = 100) |

---

## Purchase Order Data

| Placeholder | Description | Resolution Steps | Example Value |
|-------------|-------------|------------------|---------------|
| `{{PO_PRICE}}` | Net unit price from PO line item | Query EKPO table for `{{PO_NUMBER_WITH_GR}}`; retrieve NETPR (net price) | `0.08` (from CS-2, requires re-validation) |
| `{{PO_TOTAL_QUANTITY}}` | Total PO quantity (for partial GR scenario) | Query EKPO table for `{{PO_NUMBER_WITH_PARTIAL_GR}}`; retrieve MENGE (PO quantity) | `100` (example) |

---

## Invoice Data

### Invoice Numbers (Unique per Test Case)

| Placeholder | Description | Resolution Steps | Example Value |
|-------------|-------------|------------------|---------------|
| `{{INVOICE_NUMBER_UNIQUE_001}}` | Unique invoice number for TC-CS-110 | Generate unique number: `INV-{YYYYMMDD}-{NNN}` format | `INV-20260824-001` |
| `{{INVOICE_NUMBER_UNIQUE_002}}` | Unique invoice number for TC-CS-111 | Increment sequence number | `INV-20260824-002` |
| `{{INVOICE_NUMBER_UNIQUE_003}}` through `{{INVOICE_NUMBER_UNIQUE_012}}` | Unique invoice numbers for remaining TCs | Continue incrementing sequence | `INV-20260824-003` ... `INV-20260824-012` |

**Rule:** Invoice number must be unique per supplier per test execution. Use current date + sequence.

---

### Invoice Dates

| Placeholder | Description | Resolution Steps | Example Value |
|-------------|-------------|------------------|---------------|
| `{{INVOICE_DATE_CURRENT}}` | Invoice document date (current date) | Use test execution date in SAP date format (DD.MM.YYYY) | `24.08.2026` |
| `{{POSTING_DATE_CURRENT}}` | Posting date (current date, must be within open posting period) | Use test execution date in SAP date format; confirm posting period is open in T001B | `24.08.2026` |

**Verification:** Navigate to "Manage Posting Periods" or query T001B to confirm posting period is open for `{{POSTING_DATE_CURRENT}}`.

---

## Organizational Data

| Placeholder | Description | Resolution Steps | Example Value |
|-------------|-------------|------------------|---------------|
| `{{COMPANY_CODE}}` | Company code for invoice posting | Retrieved from PO header (EKKO-BUKRS) or use 1710 from CS-2 | `1710` (from CS-2, requires re-validation) |
| `{{PLANT_CODE}}` | Receiving plant | Retrieved from PO line item (EKPO-WERKS) or use 1710 from CS-2 | `1710` (from CS-2, requires re-validation) |

---

## Tolerance Configuration Data

### Quantity Tolerance

| Placeholder | Description | Resolution Steps | Example Value |
|-------------|-------------|------------------|---------------|
| `{{QUANTITY_TOLERANCE_PCT}}` | Quantity tolerance percentage | Query table T169Q for company code `{{COMPANY_CODE}}` and tolerance key; retrieve percentage value | `5%` (example — MUST BE VERIFIED from T169Q) |
| `{{GR_QUANTITY_PLUS_TOLERANCE}}` | GR quantity + tolerance (maximum allowed without blocking) | Calculate: `{{GR_QUANTITY}}` × (1 + `{{QUANTITY_TOLERANCE_PCT}}` / 100) | `10.5` (if GR=10 and tolerance=5%) |
| `{{GR_QUANTITY_PLUS_TOLERANCE_PLUS_ONE}}` | GR quantity + tolerance + 1 (exceeds tolerance) | Calculate: `{{GR_QUANTITY_PLUS_TOLERANCE}}` + 1 | `11.5` or `12` (round up if needed) |
| `{{GR_QUANTITY_PLUS_TOLERANCE_MINUS_POINT_01}}` | GR quantity + tolerance - 0.01 (within tolerance) | Calculate: `{{GR_QUANTITY_PLUS_TOLERANCE}}` - 0.01 | `10.49` (if boundary=10.5) |

**CRITICAL:** Tolerance values MUST be queried from SAP customizing (T169Q) before test execution. If table access is not available, execute exploratory test runs with incremental quantities to infer the tolerance boundary.

---

### Price Tolerance

| Placeholder | Description | Resolution Steps | Example Value |
|-------------|-------------|------------------|---------------|
| `{{PRICE_TOLERANCE_PCT}}` | Price tolerance percentage | Query table T169P for company code `{{COMPANY_CODE}}`; retrieve percentage value | `2%` (example — MUST BE VERIFIED from T169P) |
| `{{PO_PRICE_PLUS_TOLERANCE}}` | PO price + tolerance (maximum allowed without blocking) | Calculate: `{{PO_PRICE}}` × (1 + `{{PRICE_TOLERANCE_PCT}}` / 100) | `0.0816` (if PO price=0.08 and tolerance=2%) |
| `{{PO_PRICE_PLUS_TOLERANCE_PLUS_POINT_01}}` | PO price + tolerance + 0.01 (exceeds tolerance) | Calculate: `{{PO_PRICE_PLUS_TOLERANCE}}` + 0.01 | `0.0916` (if boundary=0.0816) |
| `{{PO_PRICE_PLUS_TOLERANCE_MINUS_POINT_01}}` | PO price + tolerance - 0.01 (within tolerance) | Calculate: `{{PO_PRICE_PLUS_TOLERANCE}}` - 0.01 | `0.0716` (if boundary=0.0816) |

**CRITICAL:** Tolerance values MUST be queried from SAP customizing (T169P) before test execution. If table access is not available, execute exploratory test runs with incremental prices to infer the tolerance boundary.

---

## Calculated Fields

| Placeholder | Description | Resolution Steps | Example Value |
|-------------|-------------|------------------|---------------|
| `{{CALCULATED_AMOUNT}}` | Total invoice amount (quantity × price) | Calculate: invoice quantity × invoice unit price | `0.80` (if qty=10 and price=0.08) |

---

## Integration Test Data (Blocked Invoices)

| Placeholder | Description | Resolution Steps | Example Value |
|-------------|-------------|------------------|---------------|
| `{{BLOCKED_INVOICE_NUMBER_FROM_ERR_001_OR_ERR_002}}` | Invoice document number from TC-CS-111 or TC-CS-112 | Execute TC-CS-111 or TC-CS-112 first; note the generated invoice document number | `5100000123` (example) |
| `{{BLOCKED_INVOICE_NUMBER_FROM_ERR_001}}` | Invoice document number from TC-CS-111 specifically | Execute TC-CS-111; note the generated invoice document number | `5100000124` (example) |
| `{{BLOCKED_INVOICE_NUMBER_FROM_ERR_002}}` | Invoice document number from TC-CS-112 specifically | Execute TC-CS-112; note the generated invoice document number | `5100000125` (example) |
| `{{BLOCKING_REASON_QUANTITY_OR_PRICE}}` | Blocking reason from SAP (Quantity variance or Price variance) | Retrieve blocking reason from RBKP table or "Manage Blocked Invoices" worklist | `Quantity variance` or `Price variance` |

---

## Test Data Resolution Checklist

Before executing test cases, verify ALL placeholders are resolved:

- [ ] All PO numbers validated in SAP tenant my426318.s4hana.cloud.sap
- [ ] Supplier `{{SUPPLIER_ID}}` is active and configured
- [ ] Material `{{MATERIAL_ID}}` is active and configured
- [ ] Goods receipts posted for all required PO numbers
- [ ] Quantity tolerance `{{QUANTITY_TOLERANCE_PCT}}` queried from T169Q
- [ ] Price tolerance `{{PRICE_TOLERANCE_PCT}}` queried from T169P
- [ ] All tolerance boundaries calculated correctly (boundary, boundary +1, boundary -0.01)
- [ ] Invoice numbers are unique per test case
- [ ] Posting period is open for `{{POSTING_DATE_CURRENT}}`
- [ ] Blocked invoice numbers obtained from prerequisite test case execution

---

## Dependency Execution Order

Some test cases depend on data generated by prior test cases:

1. **Execute first (generate blocked invoices):**
   - TC-CS-111 (quantity variance block) → generates `{{BLOCKED_INVOICE_NUMBER_FROM_ERR_001}}`
   - TC-CS-112 (price variance block) → generates `{{BLOCKED_INVOICE_NUMBER_FROM_ERR_002}}`

2. **Execute after blocked invoices exist:**
   - TC-CS-113 (requires any blocked invoice from TC-CS-111 or TC-CS-112)
   - TC-CS-114 (requires blocked invoice from TC-CS-111)
   - TC-CS-117 (requires blocked invoice from TC-CS-112)

---

## Example Resolved Dataset (TD-CS-29-HP-001)

```json
{
  "id": "TD-CS-29-HP-001",
  "name": "Perfect Three-Way Match — Invoice Quantity and Price Match GR and PO",
  "scenarioType": "HAPPY_PATH",
  "usedByTestCases": ["TC-CS-110"],
  "data": {
    "poNumber": "4500065467",
    "invoiceNumber": "INV-20260824-001",
    "invoiceDate": "24.08.2026",
    "postingDate": "24.08.2026",
    "invoiceQuantity": "10",
    "invoicePrice": "0.08",
    "amount": "0.80",
    "supplierId": "17300002",
    "supplierName": "Carbon Tec Inc.",
    "materialId": "RMPI001",
    "materialDesc": "Input 1 (WATER)",
    "plant": "1710",
    "companyCode": "1710",
    "grQuantity": "10",
    "poPrice": "0.08"
  },
  "expectedOutcome": "Invoice posted successfully with status Released for Payment"
}
```

---

## Notes

- **WARNING:** All test data examples shown above (PO numbers, supplier IDs, material IDs) are from the OLD tenant (my429998). They MUST be re-validated for the NEW tenant (my426318.s4hana.cloud.sap).
- **Tolerance values are CRITICAL:** Test cases TC-CS-111, TC-CS-112, TC-CS-115, TC-CS-116, TC-CS-118, TC-CS-119, TC-CS-124 will FAIL if tolerance boundaries are incorrect.
- **Invoice uniqueness:** Ensure all invoice numbers are unique per supplier. Duplicate invoice numbers will cause posting errors.
- **GR prerequisites:** Test cases will fail if goods receipts are not posted for the referenced POs.

---

**Test Data Owner:** QA Lead / Test Data Administrator  
**Validation Date:** [To be completed before test execution]  
**Validated By:** [Name]  
**SAP Tenant:** my426318.s4hana.cloud.sap
