# Pages Folder - Quick Reference Guide

## 🎯 What is the Pages Folder?

The `pages/` folder is a **Page Object Model (POM)** library organized by **SAP business modules**. Each folder represents a SAP module, and each subfolder represents a specific business transaction/process.

---

## 📊 SAP Modules at a Glance

### 🔴 **FI - Financial Accounting**
- **Purpose:** Money handling, invoicing, GL reconciliation
- **Users:** Finance teams, accountants, auditors
- **Transactions:**
  - Journal Entry (GL posting)
  - Supplier Invoice (AP)
  - Customer Invoice (AR)

### 🟢 **MM - Materials Management** ✅ ACTIVE
- **Purpose:** Buying things, tracking inventory
- **Users:** Buyers, warehouse staff, procurement
- **Transactions:**
  - **Purchase Order (ME21N)** — Create PO
  - **Purchase Order Change (ME22N)** — Edit PO
  - **Purchase Order View (ME23N)** — View PO
  - **Purchase Requisition** — Internal request
  - **Goods Receipt** — Receive inventory

### 🔵 **SD - Sales & Distribution** ✅ ACTIVE
- **Purpose:** Selling things, customer orders, shipping
- **Users:** Sales team, order processors, billing
- **Transactions:**
  - **Sales Order (VA01/VA02/VA03)** — Customer order
  - **Delivery Note (VL01N)** — Ship goods
  - **Customer Invoice (VF01)** — Bill customer

### 🟣 **PP - Production Planning**
- **Purpose:** Manufacturing, production scheduling
- **Users:** Factory managers, planners
- **Transactions:**
  - Production Order (CO01)
  - MRP Run

---

## 📁 Folder Structure

```
automation/pages/
│
├─ common/                              ← SHARED FOR ALL MODULES
│   ├── sap-login.page.js              (How to log in)
│   ├── fiori-launchpad.page.js        (How to search apps)
│   ├── sap-shell.page.js              (User menu, logout)
│   ├── sap-dialog.helper.js           (Close popups)
│   ├── sap-message.helper.js          (Read success/error messages)
│   └── sap-table.helper.js            (Interact with tables)
│
├─ fi/                                  ← FINANCIAL ACCOUNTING
│   ├── journal-entry/                 (GL posting)
│   └── supplier-invoice/              (Vendor invoices)
│
├─ mm/                                  ← MATERIALS MANAGEMENT ✅
│   ├── purchase-order/                (Create new PO)
│   ├── purchase-order-change/         (Modify existing PO)
│   ├── purchase-order-view/           (View PO details)
│   ├── purchase-requisition/          (Create/change PR)
│   └── goods-receipt/                 (Receive goods)
│
├─ pp/                                  ← PRODUCTION PLANNING
│   └── production-order/              (Manufacturing)
│
└─ sd/                                  ← SALES & DISTRIBUTION ✅
    ├── sales-order/                   (Customer orders)
    └── billing-document/              (Invoices & delivery)
```

---

## 📄 Files in Each Transaction Folder

Every transaction has **3 files** following this pattern:

```
mm/purchase-order/
│
├─ purchase-order.locators.js         ← WHERE things are (element selectors)
├─ purchase-order.page.js             ← HOW to use them (action methods)
└─ purchase-order.fixtures.js         ← SETUP (Playwright environment)
```

### 1️⃣ **`.locators.js`** — Element Selectors
Stores all HTML element references so they're easy to update

**What's inside:**
```javascript
module.exports = {
  supplierField: 'input[aria-label*="Supplier"]',     // Where to enter supplier
  materialField: 'input[aria-label*="Material"]',     // Where to enter material
  quantityField: 'input[aria-label*="Quantity"]',     // Where to enter qty
  saveButton: 'button >> text=Save',                  // Where save button is
  successMsg: 'text=/Purchase Order created/',        // What success looks like
};
```

**Why separate?**
- When SAP UI changes, update ONE file instead of 10
- Reuse same selector across multiple pages
- Easy to find what changed

---

### 2️⃣ **`.page.js`** — Action Methods
Contains reusable methods describing what users DO

**What's inside:**
```javascript
class PurchaseOrderPage {
  async createPurchaseOrder(supplier, items) {
    await this.fillSupplier(supplier);
    await this.addItems(items);
    await this.save();
    await this.verifySuccess();
  }

  async fillSupplier(code) {
    await this.page.fill(locators.supplierField, code);
  }

  async addItems(items) {
    // Add item logic
  }

  async save() {
    await this.page.click(locators.saveButton);
  }

  async verifySuccess() {
    await this.page.waitForSelector(locators.successMsg);
  }
}
```

**Why separate?**
- Pages can be reused in multiple test cases
- Tests read like business scenarios (not technical code)
- Easy to add error handling in one place

---

### 3️⃣ **`.fixtures.js`** — Test Setup
Sets up SAP environment ONCE for all tests in this transaction

**What's inside:**
```javascript
const test = base.extend({
  purchaseOrderPage: async ({ page }, use) => {
    // 1. Navigate to SAP
    await page.goto(SAP_URL);

    // 2. Login (if needed)
    if (!authenticated) {
      await loginPage.login(username, password);
    }

    // 3. Close annoying popups
    await dismissPopups(page);

    // 4. Initialize page object
    const poPage = new PurchaseOrderPage(page);
    await use(poPage);  // Now available in tests!
  },
});
```

**Why separate?**
- Authentication happens ONCE, not for every test
- Same SAP session reused for all PO tests
- No redundant login/logout steps

---

## 🚀 Example: How It All Works Together

### Test Case (What You Write)
```javascript
test('TC_MM_PO_001 - Create Purchase Order', async ({ purchaseOrderPage }) => {
  // purchaseOrderPage comes from fixture (already logged in!)

  await purchaseOrderPage.createPurchaseOrder('17300002', [
    { material: 'RMPI001', quantity: 10 }
  ]);

  await expect(page).toHaveText('Purchase Order created');
});
```

### What Actually Happens (Behind the Scenes)

1. **Fixture runs first** (fixtures.js):
   - Navigates to SAP
   - Logs in via IDP (if not already logged in)
   - Dismisses popups
   - Creates `purchaseOrderPage` object

2. **Test runs** (test case):
   - Calls `purchaseOrderPage.createPurchaseOrder()`

3. **Page object executes** (page.js):
   - Calls `fillSupplier()` method
   - Calls `addItems()` method
   - Calls `save()` method
   - Calls `verifySuccess()` method

4. **Each method uses locators** (locators.js):
   - Finds elements using selectors from locators
   - Interacts with them (click, fill, etc.)

5. **Test verifies success**:
   - Confirms expected message appears

---

## 📊 Current Status

| Module | Status | # Transactions | # Test Cases |
|---|---|---|---|
| **MM** | ✅ Active | 5 | 5 |
| **SD** | ✅ Active | 2 | 3 |
| **FI** | 🔄 Template | 0 | 0 |
| **PP** | 🔄 Template | 0 | 0 |

### Active Test Cases

| TC | Module | Transaction | Status |
|---|---|---|---|
| TC_001 | MM | Change Purchase Requisition | ✅ Ready |
| TC_002 | MM | Change Purchase Order | ✅ Ready |
| TC_003 | SD | Change Sales Order | ✅ Ready |
| TC_004 | MM | Create Purchase Requisition | ✅ Ready |
| TC_005 | SD | Create Sales Order | ✅ Ready |
| TC_006 | MM | Display Purchase Requisition | ✅ Ready |
| TC_007 | SD | Display Sales Order | ✅ Ready |
| TC_008 | MM | View Purchase Order | ✅ Ready |
| TC_009 | MM | Create Purchase Order (detailed) | ✅ Ready |

---

## 🎓 Learning Path

### For New Team Members:

1. **Start with MM (simplest)**
   - Read: `automation/pages/mm/purchase-order/README.md` (if exists)
   - See: Purchase order folder structure
   - Understand: Locators → Page → Fixtures pattern

2. **Then explore SD**
   - More complex (multi-step workflow)
   - Introduces conditional logic

3. **Finally, understand Common**
   - How login works
   - How popups are handled
   - Helper functions

### For New Transactions:

1. **Create folder:** `automation/pages/{module}/{transaction}/`

2. **Add 3 files:**
   ```bash
   touch automation/pages/{module}/{transaction}/{transaction}.locators.js
   touch automation/pages/{module}/{transaction}/{transaction}.page.js
   touch automation/pages/{module}/{transaction}/{transaction}.fixtures.js
   ```

3. **Fill in:**
   - **Locators:** Copy from manual test steps (what to interact with)
   - **Page:** Write methods for user actions
   - **Fixtures:** Copy pattern from existing transaction

---

## 🔍 Visual Map

```
📁 Test Case (test.spec.js)
   │
   └─ Uses 👇

      📁 Fixture (fixtures.js)
      │  ├─ Login via Common
      │  ├─ Dismiss popups
      │  └─ Create Page Object
      │
      └─ Uses 👇

         📁 Page Object (page.js)
         │  ├─ Method: createOrder()
         │  ├─ Method: fillSupplier()
         │  ├─ Method: addItems()
         │  └─ Method: save()
         │
         └─ Uses 👇

            📁 Locators (locators.js)
            │  ├─ supplierField: "input[...]"
            │  ├─ materialField: "input[...]"
            │  ├─ quantityField: "input[...]"
            │  └─ saveButton: "button[...]"
            │
            └─ Uses 👇

               📁 Common Helpers
                  ├─ Login
                  ├─ Dialog handler
                  ├─ Message handler
                  └─ Table helper
```

---

## ❓ FAQ

**Q: Why separate locators from page object?**
A: When SAP UI changes, update selectors in ONE place, not scattered across 10 methods.

**Q: Why use fixtures?**
A: Login 1 time per test file, not 50 times for 50 tests. Huge speed improvement.

**Q: Can I reuse a page object for multiple tests?**
A: Yes! That's the whole point. One `PurchaseOrderPage` for all PO test cases.

**Q: Where do I write my test cases?**
A: In `automation/tests/{module}.spec.js` files. These import and USE the pages.

**Q: What about error scenarios?**
A: Add more methods to the page object, e.g., `fillSupplierInvalid()`, `verifyErrorMsg()`.

**Q: How do I add a new transaction?**
A: Create folder, add 3 files (locators, page, fixtures), add methods, write tests.

---

## 📚 Related Files

- **CLAUDE.md** — How to generate automation scripts
- **test-execution-report.md** — Timing and metrics
- **automation/tests/** — Test cases (use these pages)
- **automation/utils/** — Shared utilities (UI5 helpers, logger)

---

**Last Updated:** 2026-04-23
**Version:** 1.0
