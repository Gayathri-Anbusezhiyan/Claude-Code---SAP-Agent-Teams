# CS-2 Test Data Guide

## Overview

This guide documents the test data for **CS-2: Create a New Standard Purchase Order in SAP S/4HANA Cloud**.

**Generated:** 2026-08-22  
**Source:** test-registry/exploration-data/execution/CS-2/CS-2-exploration-summary.json  
**Resolved At:** 2026-07-30 (automation-agent hybrid exploration)  
**SAP Tenant:** my429998 (⚠️ must be re-validated for my426318)

---

## Test Data Sets

### TD-CS-002-001: Standard PO Creation — Single Line Item
**Type:** HAPPY_PATH  
**Used By:** TC-CS-001

| Parameter | Value | Notes |
|-----------|-------|-------|
| Supplier ID | 17300002 | Carbon Tec Inc. |
| Material ID | RMPI001 | Input 1 (WATER) |
| Quantity | 10 | KG |
| Price | 0.08 | USD per KG |
| Plant | 1710 | Must be entered manually |
| Purchasing Org | 1710 | Auto-populated from supplier |
| Purchasing Group | 001 | Auto-populated from supplier |
| Company Code | 1710 | Auto-populated from supplier |

**Expected Outcome:** PO created with status "Sent" (Automatic Release active); PO number follows pattern 45xxxxxxxx

---

### TD-CS-002-002: Multi-Line Items (Alternative Path)
**Type:** ALTERNATIVE_PATH  
**Used By:** TC-CS-002

| Parameter | Value | Notes |
|-----------|-------|-------|
| Supplier ID | 17300002 | Carbon Tec Inc. |
| Material ID (Line 1) | RMPI001 | Input 1 (WATER) |
| Quantity (Line 1) | 10 | KG |
| Price (Line 1) | 0.08 | USD |
| Material ID (Line 2) | {{MATERIAL_ID_2_VALID}} | ⚠️ UNRESOLVED |
| Quantity (Line 2) | 5 | KG |
| Price (Line 2) | 0.10 | USD |
| Plant | 1710 | |

**Status:** BLOCKED — Material ID 2 not resolved; test executes with first material only

---

### TD-CS-002-NEG-001: Invalid Supplier ID
**Type:** NEGATIVE  
**Used By:** TC-CS-003

| Parameter | Value | Notes |
|-----------|-------|-------|
| Invalid Supplier ID | {{SUPPLIER_ID_INVALID}} | ⚠️ UNRESOLVED |

**Status:** BLOCKED — Test case skipped

---

### TD-CS-002-NEG-002: Invalid Material ID
**Type:** NEGATIVE  
**Used By:** TC-CS-004

| Parameter | Value | Notes |
|-----------|-------|-------|
| Supplier ID | 17300002 | Valid |
| Invalid Material ID | {{MATERIAL_ID_INVALID}} | ⚠️ UNRESOLVED |

**Status:** BLOCKED — Test case skipped

---

### TD-CS-002-ERR-001: Empty Supplier Field
**Type:** ERROR (Mandatory Field Validation)  
**Used By:** TC-CS-005

| Parameter | Value | Notes |
|-----------|-------|-------|
| Supplier ID | (empty) | Leave blank |
| Material ID | RMPI001 | Valid |
| Quantity | 10 | Valid |
| Price | 0.08 | Valid |

**Expected Error:** "Enter a supplier" or similar validation message

---

### TD-CS-002-ERR-002: Empty Material Field
**Type:** ERROR (Mandatory Field Validation)  
**Used By:** TC-CS-006

| Parameter | Value | Notes |
|-----------|-------|-------|
| Supplier ID | 17300002 | Valid |
| Material ID | (empty) | Leave blank |
| Quantity | 10 | Valid |
| Price | 0.08 | Valid |

**Expected Error:** "Enter a material" or similar validation message

---

### TD-CS-002-ERR-003: Empty Quantity Field
**Type:** ERROR (Mandatory Field Validation)  
**Used By:** TC-CS-007

| Parameter | Value | Notes |
|-----------|-------|-------|
| Supplier ID | 17300002 | Valid |
| Material ID | RMPI001 | Valid |
| Quantity | (empty) | Leave blank |
| Price | 0.08 | Valid |

**Expected Error:** "Enter a quantity" or "Please enter an order quantity"

---

### TD-CS-002-ERR-004: Empty Price Field
**Type:** ERROR (Mandatory Field Validation)  
**Used By:** TC-CS-008

| Parameter | Value | Notes |
|-----------|-------|-------|
| Supplier ID | 17300002 | Valid |
| Material ID | RMPI001 | Valid |
| Quantity | 10 | Valid |
| Price | (empty) | Leave blank |

**Expected Error:** "Net price must be greater than 0"

---

### TD-CS-002-EDGE-001: Minimum Valid Quantity
**Type:** EDGE_CASE (Lower Boundary)  
**Used By:** TC-CS-009

| Parameter | Value | Notes |
|-----------|-------|-------|
| Supplier ID | 17300002 | Carbon Tec Inc. |
| Material ID | RMPI001 | Input 1 (WATER) |
| Quantity | 1 | Minimum valid |
| Price | 0.08 | USD |
| Plant | 1710 | |

**Expected Outcome:** PO created successfully; Net Order Value = 0.08 USD (1 × 0.08)

---

### TD-CS-002-EDGE-002: Zero Quantity
**Type:** EDGE_CASE (Invalid Boundary)  
**Used By:** TC-CS-010

| Parameter | Value | Notes |
|-----------|-------|-------|
| Supplier ID | 17300002 | Valid |
| Material ID | RMPI001 | Valid |
| Quantity | 0 | Zero (invalid) |
| Price | 0.08 | Valid |

**Expected Error:** "Enter a quantity" or "Please enter an order quantity"

---

### TD-CS-002-EDGE-003: Zero Price
**Type:** EDGE_CASE (Invalid Boundary)  
**Used By:** TC-CS-011

| Parameter | Value | Notes |
|-----------|-------|-------|
| Supplier ID | 17300002 | Valid |
| Material ID | RMPI001 | Valid |
| Quantity | 10 | Valid |
| Price | 0 | Zero (invalid) |

**Expected Error:** "Net price must be greater than 0" (same as blank price)

---

### TD-CS-002-TEST-001: Designed-to-Fail Test
**Type:** DESIGNED_TO_FAIL  
**Used By:** TC-CS-021

| Parameter | Value | Notes |
|-----------|-------|-------|
| Supplier ID | 17300002 | Carbon Tec Inc. |
| Material ID | RMPI001 | Input 1 (WATER) |
| Quantity | 10 | KG |
| Price | 0.08 | USD |
| Plant | 1710 | |

**Purpose:** Validate defect logging pipeline; test asserts on success notification SAP does not provide  
**Expected Outcome:** Test FAILS as designed

---

## Resolved Master Data

| Constant | Value | Description |
|----------|-------|-------------|
| SUPPLIER_ID_VALID | 17300002 | Carbon Tec Inc. |
| SUPPLIER_NAME_VALID | Carbon Tec Inc. | Auto-populated after supplier ID |
| MATERIAL_ID_VALID | RMPI001 | Input 1 (WATER) |
| MATERIAL_DESCRIPTION | Input 1 (WATER) | Auto-populated after material ID |
| UNIT_OF_MEASURE | KG | Auto-populated with material |
| PURCHASING_ORG | 1710 | Auto-populated from supplier master |
| PURCHASING_GROUP | 001 | Auto-populated from supplier master |
| PLANT | 1710 | Must be entered manually |
| COMPANY_CODE | 1710 | Auto-populated from supplier org |
| QUANTITY_STANDARD | 10 | Standard test quantity |
| QUANTITY_MIN | 1 | Minimum valid quantity |
| PRICE_VALID | 0.08 | USD per KG |
| CURRENCY | USD | US Dollar |

---

## Unresolved Placeholders

⚠️ The following placeholders remain unresolved:

1. **{{MATERIAL_ID_2_VALID}}** — Required for TC-CS-002 (multi-line PO)
2. **{{SUPPLIER_ID_INVALID}}** — Required for TC-CS-003 (invalid supplier test)
3. **{{MATERIAL_ID_INVALID}}** — Required for TC-CS-004 (invalid material test)
4. **{{DATE_FUTURE_7D}}** — Future date placeholder (not yet used)

**Impact:** TC-CS-002 (partial), TC-CS-003 (blocked), TC-CS-004 (blocked)

---

## SAP System Behaviors

### Auto-Population Rules
1. **Supplier Name** — Auto-populates after pressing Enter on Supplier ID field
2. **Material Description & UoM** — Auto-populate after pressing Enter on Material ID field
3. **Purchasing Org** — Auto-populated from supplier master data (1710)
4. **Purchasing Group** — Auto-populated from supplier master data (001)
5. **Company Code** — Auto-populated from supplier organizational assignment (1710)
6. **Plant** — Must be entered manually (NOT auto-populated in Manage PO app)

### Validation Error Messages
| Field | Error Condition | Error Message |
|-------|----------------|---------------|
| Supplier | Empty | "Enter a supplier" |
| Material | Empty | "Enter a material" |
| Quantity | Empty | "Enter a quantity" or "Please enter an order quantity" |
| Quantity | Zero | "Enter a quantity" or "Please enter an order quantity" |
| Price | Empty | "Net price must be greater than 0" |
| Price | Zero | "Net price must be greater than 0" |

### PO Creation Behavior
- **PO Number Pattern:** 10-digit number starting with "45" (e.g., 4500065360, 4500065467)
- **PO Status:** "Sent" (Automatic Release is active in this tenant)
- **PO Generation Time:** 3-4 seconds after clicking Order button
- **Success Notification:** SAP does NOT show a visible success notification (toast/message)
- **Post-Creation:** Returns to PO list page; newly created PO appears at top

---

## Environment Dependencies

Test data references the following environment variables from `.env`:

| Variable | Usage | Test Step |
|----------|-------|-----------|
| SAP_FIORI_URL | Full Fiori launch URL with SSO params | Step 1: Navigate to SAP |
| SAP_USERNAME | SAP user email/login | Step 2: Login (username) |
| SAP_PASSWORD | SAP user password | Step 4: Login (password) |

---

## Important Notes

1. ⚠️ **Tenant Migration:** This test data was resolved from **my429998** tenant on 2026-07-30. The current production tenant is **my426318**. All test data must be re-validated:
   - Verify Supplier ID 17300002 exists in my426318
   - Verify Material ID RMPI001 exists in my426318
   - Verify Purchasing Org 1710 is valid
   - Verify Plant 1710 is valid

2. **Login Flow:** Two-step IDP authentication (email → Continue → password → Continue)

3. **Guided Tour:** May appear after login; dismiss via "Leave Tour" button or Escape key

4. **Navigation:** Use search bar (top-right shell icon) to find "Manage Purchase Orders" app

5. **Field Entry:** Always press Enter after entering Supplier ID and Material ID to trigger auto-population

6. **Test Case Coverage:**
   - Total test cases: 12 (TC-CS-001 to TC-CS-011, plus TC-CS-021)
   - Automation candidates: 9
   - Blocked: 2 (TC-CS-003, TC-CS-004)
   - Designed to fail: 1 (TC-CS-021)

---

## Usage in Test Cases

### Placeholder Syntax
Test case markdown files use `{TD.parameter}` syntax to reference test data:

```markdown
| 5 | Enter Supplier ID: {TD.supplierId} | Supplier name auto-populates |
| 6 | Enter Material ID: {TD.materialId} | Material description auto-populates |
| 7 | Enter Quantity: {TD.quantity} | Quantity field shows value |
| 8 | Enter Price: {TD.price} | Net Order Value calculates |
```

### Resolution at Runtime
During test execution:
- `{TD.supplierId}` → `17300002`
- `{TD.materialId}` → `RMPI001`
- `{TD.quantity}` → `10`
- `{TD.price}` → `0.08`

---

## Test Data Maintenance

### To Resolve Unresolved Placeholders:

1. **{{MATERIAL_ID_2_VALID}}:**
   - Find a second valid material ID in SAP my426318 tenant
   - Update `TD-CS-002-002` data object
   - Remove from `unresolvedPlaceholders` array

2. **{{SUPPLIER_ID_INVALID}}:**
   - Choose a supplier ID format that SAP rejects (e.g., "99999999")
   - Verify it returns an error in SAP
   - Update `TD-CS-002-NEG-001` data object

3. **{{MATERIAL_ID_INVALID}}:**
   - Choose a material ID format that SAP rejects (e.g., "INVALID123")
   - Verify it returns an error in SAP
   - Update `TD-CS-002-NEG-002` data object

### To Update for my426318 Tenant:

1. Run TC-CS-001 manually in SAP my426318
2. Verify all master data IDs still exist:
   - Supplier 17300002
   - Material RMPI001
   - Plant 1710
3. If IDs changed, update `resolvedValues` and all test data sets
4. Update `resolvedAt` timestamp
5. Remove tenant migration warning

---

**Last Updated:** 2026-08-22  
**Status:** ⚠️ Requires tenant re-validation (my429998 → my426318)
