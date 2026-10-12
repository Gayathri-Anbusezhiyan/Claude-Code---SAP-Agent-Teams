# Pages Folder Structure - SAP Automation

## Overview

The `pages/` folder contains **Page Object Model (POM)** implementations organized by **SAP Module**. Each module folder contains transaction-specific page classes, locators, and test fixtures.

```
pages/
├── common/                 ← Shared utilities (Login, Shell, Dialogs)
├── fi/                    ← Financial Accounting (AP, AR, GL, Cost Center)
├── mm/                    ← Materials Management (PO, GR, PR, Inventory)
├── pp/                    ← Production Planning (Production Orders, MRP)
└── sd/                    ← Sales & Distribution (Sales Order, Delivery, Billing)
```

---

## SAP Modules Explained

### 🏦 **FI - Financial Accounting**
**What it does:** Handles all financial transactions and reporting

| Transaction | Folder | Purpose |
|---|---|---|
| **JE** | `fi/journal-entry/` | Post GL journal entries, GL account reconciliation |
| **SI** | `fi/supplier-invoice/` | Invoice receipt and posting from suppliers (AP) |
| **CI** | *pending* | Customer invoice billing and AR management |

**Typical User:** Finance Manager, Accountant, AP/AR Clerk

**Test Cases Expected:** Invoice posting, GL reconciliation, payment processing

---

### 📦 **MM - Materials Management**
**What it does:** Manages procurement, inventory, and goods movement

| Transaction | Folder | Purpose |
|---|---|---|
| **ME21N** | `mm/purchase-order/` | **Create Purchase Order** — Procurement requests to vendors |
| **ME22N** | `mm/purchase-order-change/` | **Modify Purchase Order** — Change quantities, dates, prices |
| **ME23N** | `mm/purchase-order-view/` | **View Purchase Order** — Read-only display of PO details |
| **MIGO** | `mm/goods-receipt/` | **Goods Receipt** — Receive goods against PO, update inventory |
| **ME51N** | `mm/purchase-requisition/` | **Create Purchase Requisition** — Internal request for goods |

**Typical User:** Procurement Manager, Buyer, Warehouse Clerk, Inventory Manager

**Test Cases Expected:** TC_001, TC_002, TC_004, TC_006, TC_008, TC_009 ✅

---

### 🏭 **PP - Production Planning**
**What it does:** Manages manufacturing, production orders, and resource planning

| Transaction | Folder | Purpose |
|---|---|---|
| **CO01** | `pp/production-order/` | **Create Production Order** — Schedule manufacturing runs |

**Typical User:** Production Planner, Manufacturing Manager

**Test Cases Expected:** *Planned for Phase 2*

---

### 📊 **SD - Sales & Distribution**
**What it does:** Manages sales orders, deliveries, and customer billing

| Transaction | Folder | Purpose |
|---|---|---|
| **VA01** | `sd/sales-order/` | **Create Sales Order** — Customer purchase orders (most complex) |
| **VA02** | `sd/sales-order/` | **Change Sales Order** — Modify SO quantity, dates, pricing |
| **VA03** | `sd/sales-order/` | **View Sales Order** — Read-only display of SO details |
| **VL01N** | `sd/billing-document/` | **Create Delivery Note** — Ship goods to customer |
| **VF01** | `sd/billing-document/` | **Create Customer Invoice** — Bill customer for delivered goods |

**Typical User:** Sales Order Processor, Customer Service, Billing Clerk

**Test Cases Expected:** TC_003, TC_005, TC_007 ✅

---

### 🔧 **COMMON - Shared Components**
**What it does:** Reusable utilities for all SAP modules

| Component | File | Purpose |
|---|---|---|
| **Login** | `common/sap-login.*` | IDP authentication, SAP user login via accounts.ondemand.com |
| **Fiori Launchpad** | `common/fiori-launchpad.*` | Search applications, navigate to transactions |
| **Shell** | `common/sap-shell.*` | User menu, logout, settings |
| **Dialog Handler** | `common/sap-dialog.helper.js` | Dismiss popups, handle confirmations |
| **Message Handler** | `common/sap-message.helper.js` | Capture success/error messages |
| **Table Helper** | `common/sap-table.helper.js` | Interact with SAP data tables |
| **Fixtures** | `common/common.fixtures.js` | Reusable Playwright test setup |

---

## File Structure Per Transaction

Each transaction folder follows this pattern:

```
mm/purchase-order/
├── purchase-order.locators.js       ← Element selectors (refs, roles, names)
├── purchase-order.page.js           ← Page Object class (action methods)
└── purchase-order.fixtures.js       ← Playwright fixtures (setup/teardown)
```

### 📝 **Example: MM Purchase Order**

```
automation/pages/mm/purchase-order/
│
├── purchase-order.locators.js
│   └── Exports: e23 (vendor field), e30 (material), e32 (save button), etc.
│
├── purchase-order.page.js
│   └── Class: PurchaseOrderPage
│       ├── Methods: createPurchaseOrder(), fillSupplier(), addItem()
│       └── Inherits: Common actions (login, logout, wait for UI5)
│
└── purchase-order.fixtures.js
    └── Playwright fixture setup
        ├── Authenticates via IDP
        ├── Dismisses popups
        └── Initializes PurchaseOrderPage for tests
```

---

## File Naming Convention

| File Type | Example | Purpose |
|---|---|---|
| **Locators** | `purchase-order.locators.js` | Element selectors (constants) |
| **Page Object** | `purchase-order.page.js` | Reusable action methods |
| **Fixtures** | `purchase-order.fixtures.js` | Playwright test setup |
| **Test Spec** | `purchase-order.spec.js` | Actual test cases (in `tests/` folder) |

**Pattern:** `{transaction-name}.{type}.js`

Example: `purchase-order.locators.js`, `sales-order.page.js`, `journal-entry.fixtures.js`

---

## How Transactions Relate to Test Cases

### Current Test Cases (9 Total)

| TC# | Transaction | Module | SAP Code | Folder |
|---|---|---|---|---|
| TC_001 | Change PR | MM | MB1B | `mm/purchase-requisition/` |
| TC_002 | Change PO | MM | ME22N | `mm/purchase-order-change/` |
| TC_003 | Change SO | SD | VA02 | `sd/sales-order/` |
| TC_004 | Create PR | MM | ME51N | `mm/purchase-requisition/` |
| TC_005 | Create SO | SD | VA01 | `sd/sales-order/` |
| TC_006 | Display PR | MM | ME53N | `mm/purchase-requisition/` |
| TC_007 | Display SO | SD | VA03 | `sd/sales-order/` |
| TC_008 | View PO | MM | ME23N | `mm/purchase-order-view/` |
| TC_009 | Create PO | MM | ME21N | `mm/purchase-order/` |

**Coverage:**
- ✅ **MM:** 5 test cases (Purchase Order, Purchase Requisition)
- ✅ **SD:** 3 test cases (Sales Order)
- ⏳ **FI:** 0 test cases (Ready for Phase 2)
- ⏳ **PP:** 0 test cases (Ready for Phase 2)

---

## Key Components Explained

### 1️⃣ **Locators File** (.locators.js)
Stores element selectors as constants for maintainability

```javascript
// Example: purchase-order.locators.js
module.exports = {
  // Login (from common)
  emailField: 'textbox[name="Email, User ID or Login Name"]',
  continueButton: 'button >> text=Continue',

  // Supplier
  supplierInput: '[aria-label*="Supplier"]',
  supplierDropdown: '[id*="LIFNR"]',

  // Item
  materialField: 'input[aria-label*="Material"]',
  quantityField: 'input[aria-label*="Quantity"]',

  // Actions
  createButton: 'button >> text=Create',
  saveButton: 'button >> text=Save',

  // Messages
  successMessage: 'text=/Purchase Order.*created/',
};
```

**Benefits:**
- ✅ Single source of truth for element selectors
- ✅ Easy to update when SAP UI changes
- ✅ Shared across multiple page methods

---

### 2️⃣ **Page Object File** (.page.js)
Contains reusable methods for user interactions

```javascript
// Example: purchase-order.page.js
class PurchaseOrderPage {
  constructor(page) {
    this.page = page;
  }

  // High-level action methods
  async createPurchaseOrder(supplier, items) {
    await this.fillSupplier(supplier);
    await this.addItems(items);
    await this.save();
  }

  async fillSupplier(supplierCode) {
    await this.page.fill(locators.supplierInput, supplierCode);
    await this.page.press(locators.supplierInput, 'Enter');
  }

  async addItems(items) {
    for (const item of items) {
      await this.page.click(locators.createItemButton);
      await this.page.fill(locators.materialField, item.material);
      await this.page.fill(locators.quantityField, item.qty);
    }
  }

  async save() {
    await this.page.click(locators.saveButton);
    await this.page.waitForSelector(locators.successMessage);
  }
}
```

**Benefits:**
- ✅ Abstracts UI interactions into business logic
- ✅ Reusable across multiple test cases
- ✅ Easy to read and maintain
- ✅ Built-in error recovery (helpers)

---

### 3️⃣ **Fixtures File** (.fixtures.js)
Sets up Playwright test environment with authenticated SAP session

```javascript
// Example: purchase-order.fixtures.js
const test = base.extend({
  purchaseOrderPage: async ({ page }, use) => {
    // 1. Navigate to SAP
    await page.goto(SAP_URL);

    // 2. Authenticate (IDP login if needed)
    if (loginFieldVisible) {
      await loginPage.login(username, password);
    }

    // 3. Dismiss popups (intro tour, guidance)
    await dismissAllPopups(page);

    // 4. Initialize page object
    const poPage = new PurchaseOrderPage(page);
    await use(poPage);  // Available in tests
  },
});
```

**Benefits:**
- ✅ Pre-authenticated SAP session for each test
- ✅ Eliminates login/logout from each test case
- ✅ Consistent setup across all tests in module
- ✅ Error recovery patterns built-in

---

## Interaction Between Files

```
Test Case (spec.js)
  ↓
  ├─→ Fixture (fixtures.js)
  │     ├─→ Common login logic
  │     ├─→ Dismiss popups
  │     └─→ Initialize PurchaseOrderPage
  │
  └─→ Page Object (page.js)
        ├─→ Uses Locators (locators.js)
        ├─→ Calls action methods
        └─→ Uses Helpers (dialog, message, table)
              ↓
              └─→ Common Helpers (common/*)
```

**Example Flow:**

```javascript
// test
test('TC_MM_PO_001 - Create Purchase Order', async ({ purchaseOrderPage }) => {
  // purchaseOrderPage comes from fixture
  // fixture already: authenticated, popups dismissed, page ready

  await purchaseOrderPage.createPurchaseOrder('17300002', [
    { material: 'RMPI001', qty: 10 }
  ]);

  await expect(page).toHaveURL(/.*purchase-order-created/);
});
```

---

## Folder Status Summary

| Module | Folder | Status | TCs Ready | Files Count |
|---|---|---|---|---|
| **MM** | `mm/` | ✅ Active | 5 | 15 |
| **SD** | `sd/` | ✅ Active | 3 | 9 |
| **FI** | `fi/` | 🔄 Template | 0 | 0 |
| **PP** | `pp/` | 🔄 Template | 0 | 0 |
| **Common** | `common/` | ✅ Active | — | 8 |

---

## How to Use This Structure

### 👤 For QA Engineers
1. Navigate to module folder (`mm/`, `sd/`, etc.)
2. Review transaction folder (`purchase-order/`, `sales-order/`)
3. Understand page object methods
4. Write tests using these methods

### 👨‍💻 For Developers
1. Add new transaction: Create `{transaction-name}/` folder
2. Add locators → Page Object → Fixtures
3. Test in isolation before adding to test suite
4. Register fixture in `tests/{module}.spec.js`

### 🏗️ For Architects
- **Scalable:** One transaction = one folder
- **Reusable:** Fixtures and helpers shared across modules
- **Maintainable:** Clear separation of concerns
- **Extensible:** Easy to add FI/PP modules

---

## Next Steps

### ✅ Currently Implemented
- MM module: 5 transactions active
- SD module: 3 transactions active
- Common helpers: Login, Shell, Dialogs, Tables

### 🔄 Phase 2 (Ready to Implement)
- FI module: Journal Entry, Supplier Invoice, Customer Invoice
- PP module: Production Order, MRP Run

### 📋 To Add New Transaction
```bash
# Create folder
mkdir -p automation/pages/{module}/{transaction-name}

# Add files
touch automation/pages/{module}/{transaction-name}/{transaction-name}.locators.js
touch automation/pages/{module}/{transaction-name}/{transaction-name}.page.js
touch automation/pages/{module}/{transaction-name}/{transaction-name}.fixtures.js
```

---

## Visual Summary

```
📁 pages/
│
├─ 🔧 common/
│   └─ Shared: Login, Shell, Dialogs, Messages, Tables
│
├─ 📦 mm/ (Materials Management - Procurement)
│   ├─ 📄 purchase-order/          (ME21N - Create PO)
│   ├─ ✏️ purchase-order-change/    (ME22N - Modify PO)
│   ├─ 👁️ purchase-order-view/     (ME23N - View PO)
│   ├─ 📋 purchase-requisition/    (ME51N - Create/Change/View PR)
│   └─ 📦 goods-receipt/           (MIGO - GR)
│
├─ 📊 sd/ (Sales & Distribution - Order-to-Cash)
│   ├─ 📄 sales-order/             (VA01/VA02/VA03 - Create/Change/View SO)
│   └─ 📦 billing-document/        (VF01/VL01N - Invoice/Delivery)
│
├─ 🏦 fi/ (Financial Accounting - Accounting)
│   ├─ 💰 journal-entry/           (FB50 - GL Journal Entry)
│   └─ 📋 supplier-invoice/        (MIRO - Supplier Invoice)
│
└─ 🏭 pp/ (Production Planning - Manufacturing)
    └─ 🔧 production-order/        (CO01 - Production Order)
```

---

**Created:** 2026-04-23
**Updated:** As modules are added
**Maintainer:** Automation Team
