# TC-CS-001: Scriptless Execution Report

**Test Case:** Create Standard Purchase Order with Valid Supplier and Single Line Item
**Story:** CS-2 - Create a New Standard Purchase Order in SAP S/4HANA Cloud
**Execution Date:** 2026-07-31
**SAP Tenant:** my426318.s4hana.cloud.sap
**Executed By:** Claude Sonnet 4.5 (Playwright MCP Browser Automation)
**Duration:** ~14 minutes

---

## 🎉 Test Result: **PASS**

### Purchase Order Created Successfully
- **PO Number:** **4500066976** (10 digits, starts with 45) ✓
- **PO Type:** Standard PO (NB)
- **Status:** Saved (IsActiveEntity=true)

---

## Summary

All 26 test steps executed successfully. The Purchase Order was created with the following details:

### Header Data
| Field | Value |
|-------|-------|
| Supplier | 17300002 (Carbon Tec Inc.) |
| Purchasing Organization | 1710 (Purch. Org. 1710) |
| Purchasing Group | 001 (Group 001) |
| Company Code | 1710 (Velotics Inc.) |
| Currency | USD |

### Line Item 1
| Field | Value |
|-------|-------|
| Material | RMPI001 (Input 1 WATER) |
| Order Quantity | 10.000 KG |
| Net Order Price | 0.08 USD |
| Plant | 1710 |
| **Net Order Value** | **0.80 USD** |

---

## Step-by-Step Results

### Phase 1: Login (Steps 1-6) ✓
- ✅ Navigated to SAP Fiori URL
- ✅ Email pre-filled (sunil.yogi@capgemini.com)
- ✅ Entered password and authenticated
- ✅ Dismissed Guided Tour dialog (using Escape key)

### Phase 2: Navigate to App (Steps 7-9) ✓
- ✅ Opened search bar
- ✅ Searched for "Manage Purchase Orders"
- ✅ Navigated to Manage Purchase Orders app
- ✅ Clicked Create button → Draft PO created

### Phase 3: Enter Header Data (Steps 10-11) ✓
- ✅ Entered Supplier ID: **17300002**
- ✅ Pressed Enter → Auto-populated:
  - Purchasing Group: **Group 001 (001)**
  - Purchasing Organization: **Purch. Org. 1710 (1710)**
  - Company Code: **Velotics Inc. (1710)**

### Phase 4: Create Line Item (Steps 12-20) ✓
- ✅ Clicked Create in Items section → New line item row created
- ✅ Entered Material ID: **RMPI001**
- ✅ Pressed Enter → Auto-populated Unit of Measure: **KG**
- ✅ Entered Quantity: **10** (displayed as 10.000)
- ✅ Pressed Tab
- ✅ Entered Price: **0.08** USD
- ✅ Pressed Enter → Net Order Value calculated: **0.80 USD** (10 × 0.08)
- ✅ Entered Plant: **1710**
- ✅ Pressed Enter → Line item fully configured

### Phase 5: Submit PO (Steps 21-23) ✓
- ✅ Clicked **Order** button
- ✅ URL changed to `IsActiveEntity=true` (PO saved)
- ✅ Page title updated to **"4500066976 (Standard PO) - Purchase Order"**
- ✅ PO Number verified: **4500066976** ✓

### Phase 6: Sign Out (Steps 24-26) ✓
- ✅ Clicked User Profile icon (Avatar)
- ✅ Clicked Sign Out
- ✅ Confirmed sign-out dialog
- ✅ User signed out (IDP logout error expected)

---

## Key Findings & Locators Captured

### ✅ Auto-Population Behavior (Verified)
1. **Supplier field** → Auto-populates:
   - Purchasing Group
   - Purchasing Organization
   - Company Code

2. **Material field** → Auto-populates:
   - Short Text
   - Unit of Measure (UoM)

3. **Price/Quantity** → Auto-calculates:
   - Net Order Value

### 🔍 Element Locators Captured

All element locators have been captured and saved to:
`exploration-data/execution/CS-2/TC-CS-001/TC-CS-001-locators-2026-07-31.json`

**Key Locators:**
- **Email input:** `page.getByRole('textbox', { name: 'Email, User ID or Login Name' })`
- **Password input:** `page.getByRole('textbox', { name: 'Password' })`
- **Search combobox:** `page.getByRole('combobox', { name: 'Search', exact: true })`
- **Create PO button:** `page.getByRole('button', { name: 'Create' })`
- **Supplier input:** `page.getByRole('textbox', { name: 'Supplier' })`
- **Items Create button:** `page.getByRole('toolbar', { name: 'Items', exact: true }).getByLabel('Create')`
- **Material input:** `page.getByRole('textbox', { name: 'Material', exact: true })`
- **Order Quantity input:** `page.getByRole('textbox', { name: 'Order Quantity', exact: true })`
- **Net Order Price input:** `page.getByRole('textbox', { name: 'Net Order Price' })`
- **Plant input:** `page.getByRole('textbox', { name: 'Plant' })`
- **Order button:** `page.getByRole('button', { name: 'Order', description: 'Default Action' })`
- **Sign Out button:** `page.getByRole('button', { name: 'Sign Out' })`

---

## Observations

### ✅ Successful Behaviors
1. Two-step SAP IDP login worked as expected
2. Guided Tour dialog dismissed successfully with Escape key
3. Search functionality worked correctly
4. All auto-population fields populated as expected
5. Net Order Value calculated correctly (10 × 0.08 = 0.80 USD)
6. PO submission successful with PO number generation
7. URL state changed correctly (IsActiveEntity: false → true)
8. Page title updated to reflect PO number

### ⚠️ Notable Behaviors
1. **Guided Tour:** Dismissed with `Escape` key instead of clicking "Leave Tour" button (both methods work)
2. **Search exact match required:** Search combobox needs `exact: true` parameter
3. **Material field exact match required:** Material textbox needs `exact: true` to distinguish from Material Group
4. **Order Quantity exact match required:** To distinguish from composite label
5. **Items Create button context required:** Must use toolbar context to disambiguate from header Create button
6. **Order button description required:** `description: 'Default Action'` needed to distinguish from header button
7. **Sign out IDP error:** HTTP 400 error on logout is expected SAP behavior (single logout issue)

---

## Defects Found

**None** - All test steps passed successfully.

---

## Next Steps

### 1. Update Automation Scripts ✅
The captured locators should be used to update:
- `automation/pages/mm/purchase-order/purchase-order.locators.js`
- `automation/pages/mm/purchase-order/purchase-order.page.js`
- `automation/tests/mm-purchase-order.spec.js`

### 2. Re-run Playwright Tests
After updating locators, run:
```bash
/run-tests TC-CS-001
```

### 3. Execute Remaining Test Cases
Continue with:
- TC-CS-002 (Multiple line items)
- TC-CS-003 through TC-CS-011 (Negative, Error, Edge cases)

---

## Test Data Used

```json
{
  "supplierId": "17300002",
  "supplierName": "Carbon Tec Inc.",
  "materialId": "RMPI001",
  "materialDesc": "Input 1 (WATER)",
  "uom": "KG",
  "quantity": "10",
  "price": "0.08",
  "currency": "USD",
  "plant": "1710",
  "purchasingOrg": "1710",
  "purchasingGroup": "001",
  "companyCode": "1710",
  "netOrderValue": "0.80"
}
```

---

## Files Generated

1. **Locators (JSON):** `exploration-data/execution/CS-2/TC-CS-001/TC-CS-001-locators-2026-07-31.json`
2. **Test Results (JSON):** `scriptless-results/CS-2/TC-CS-001-result-2026-07-31.json`
3. **Execution Report (MD):** `scriptless-results/CS-2/TC-CS-001-execution-report-2026-07-31.md` (this file)

---

**Test Execution Completed Successfully** ✅
