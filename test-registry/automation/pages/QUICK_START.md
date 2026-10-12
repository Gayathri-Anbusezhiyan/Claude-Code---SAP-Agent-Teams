# Pages Folder - Quick Start Guide

## 🎯 TL;DR (30 seconds)

The `pages/` folder organizes automation by **business modules**:

- **MM** = Buying stuff (Purchase Orders, Requisitions)
- **SD** = Selling stuff (Sales Orders, Billing)
- **FI** = Money stuff (GL, Invoices)
- **PP** = Making stuff (Production Orders)

Each transaction has **3 files**:
- `.locators.js` — WHERE things are on screen
- `.page.js` — HOW to interact with them
- `.fixtures.js` — SETUP (logging in, etc.)

---

## 📁 Directory Map

```
pages/
├─ common/               ← Login, Dialogs, Messages (ALL tests use)
├─ mm/ ✅               ← Purchase Orders & Requisitions (5 tests)
├─ sd/ ✅               ← Sales Orders (3 tests)
├─ fi/ 🔄               ← Accounting (Phase 2)
└─ pp/ 🔄               ← Production (Phase 2)
```

---

## ✅ What's Ready (Phase 1)

| Folder | Module | Active | Tests |
|---|---|---|---|
| `mm/purchase-order/` | Create PO | ✅ | TC_009 |
| `mm/purchase-order-change/` | Modify PO | ✅ | TC_002 |
| `mm/purchase-order-view/` | View PO | ✅ | TC_008 |
| `mm/purchase-requisition/` | Create/Change/View PR | ✅ | TC_001, TC_004, TC_006 |
| `sd/sales-order/` | Create/Change/View SO | ✅ | TC_003, TC_005, TC_007 |

**Total:** 9 test cases ready to run

---

## 🔄 What's Coming (Phase 2)

| Folder | Transaction | Status |
|---|---|---|
| `mm/goods-receipt/` | Receive goods into inventory | 📋 Template ready |
| `sd/billing-document/` | Invoices & delivery notes | 📋 Template ready |
| `fi/journal-entry/` | Post GL entries | 📋 Template ready |
| `fi/supplier-invoice/` | 3-way match invoicing | 📋 Template ready |
| `pp/production-order/` | Create production orders | 📋 Template ready |

---

## 📄 Inside Each Folder

### Example: `mm/purchase-order/`

```
mm/purchase-order/
│
├─ purchase-order.locators.js
│  └─ Constants: supplierField, materialField, quantityField, etc.
│
├─ purchase-order.page.js
│  └─ Methods: createPurchaseOrder(), fillSupplier(), addItem(), save()
│
└─ purchase-order.fixtures.js
   └─ Setup: Login, dismiss popups, initialize page object
```

---

## 🚀 How to Use (For Test Writers)

### 1️⃣ Write a Test

```javascript
// automation/tests/mm.spec.js
const { test, expect } = require('./fixtures/mm.fixtures');

test('TC_MM_PO_001', async ({ purchaseOrderPage }) => {
  await purchaseOrderPage.createPurchaseOrder('17300002', [
    { material: 'RMPI001', quantity: 10 }
  ]);

  await expect(page).toHaveText('Purchase Order created');
});
```

### 2️⃣ Fixture Provides Setup
- Already logged into SAP
- Popups dismissed
- Page object ready to use

### 3️⃣ Page Object Does Work
- Calls methods from `purchase-order.page.js`
- Methods use selectors from `purchase-order.locators.js`
- Tests read like business logic, not technical code

---

## 📊 SAP Module at a Glance

### 🟢 MM - Materials Management
*Procurement: Buying things, managing inventory*

| Process | Transaction | Folder | Status |
|---|---|---|---|
| Create PO | ME21N | mm/purchase-order/ | ✅ |
| Modify PO | ME22N | mm/purchase-order-change/ | ✅ |
| View PO | ME23N | mm/purchase-order-view/ | ✅ |
| Create PR | ME51N | mm/purchase-requisition/ | ✅ |
| Modify PR | ME52N | mm/purchase-requisition/ | ✅ |
| View PR | ME53N | mm/purchase-requisition/ | ✅ |
| Receive Goods | MIGO | mm/goods-receipt/ | 🔄 |

### 🔵 SD - Sales & Distribution
*Sales: Customer orders, deliveries, invoicing*

| Process | Transaction | Folder | Status |
|---|---|---|---|
| Create SO | VA01 | sd/sales-order/ | ✅ |
| Modify SO | VA02 | sd/sales-order/ | ✅ |
| View SO | VA03 | sd/sales-order/ | ✅ |
| Create Delivery | VL01N | sd/billing-document/ | 🔄 |
| Create Invoice | VF01 | sd/billing-document/ | 🔄 |

### 🏦 FI - Financial
*Accounting: GL, supplier invoices, cash management*

| Process | Transaction | Folder | Status |
|---|---|---|---|
| Post GL Entry | FB50 | fi/journal-entry/ | 🔄 |
| Supplier Invoice | MIRO | fi/supplier-invoice/ | 🔄 |

### 🏭 PP - Production
*Manufacturing: Production orders, scheduling*

| Process | Transaction | Folder | Status |
|---|---|---|---|
| Create Prod Order | CO01 | pp/production-order/ | 🔄 |

---

## 🔗 File Relationships

```
Test Case (.spec.js)
   │
   ├─ Imports: Fixture
   │
   └─ Uses: purchaseOrderPage (from fixture)
      │
      ├─ Has: Methods (createPO, fillSupplier, save)
      │
      └─ Methods Use: Locators (selectors for elements)
         │
         └─ Finds: HTML elements on SAP screen
```

---

## 🛠️ For Developers: Add New Transaction

### Step 1: Create Folder
```bash
mkdir -p automation/pages/mm/purchase-order-approve
```

### Step 2: Add 3 Files
```bash
touch automation/pages/mm/purchase-order-approve/purchase-order-approve.locators.js
touch automation/pages/mm/purchase-order-approve/purchase-order-approve.page.js
touch automation/pages/mm/purchase-order-approve/purchase-order-approve.fixtures.js
```

### Step 3: Copy Template & Customize
```javascript
// purchase-order-approve.locators.js
module.exports = {
  approvalButton: 'button >> text=Approve',
  rejectButton: 'button >> text=Reject',
  commentField: 'textarea[aria-label="Comments"]',
  successMsg: 'text=/approved successfully/',
};

// purchase-order-approve.page.js
class PurchaseOrderApprovePage {
  async approvePO(comment) {
    await this.fillComment(comment);
    await this.clickApprove();
    await this.verifySuccess();
  }
}

// purchase-order-approve.fixtures.js
// Copy from existing fixture, change class name
```

### Step 4: Use in Test
```javascript
test('Approve PO', async ({ poApprovePage }) => {
  await poApprovePage.approvePO('Approved for delivery');
});
```

---

## 📚 Related Docs

| Document | Purpose |
|---|---|
| **README.md** | Detailed reference (this folder) |
| **STRUCTURE_GUIDE.md** | How POM pattern works |
| **MODULES_AND_TESTCASES.md** | Test case mapping & roadmap |
| **QUICK_START.md** | This file (TL;DR) |

---

## ❓ Common Questions

**Q: Where do I find element selectors?**
A: See `{transaction}.locators.js` in each folder

**Q: How do I add a new test?**
A: Use existing page object methods. Write test case in `automation/tests/{module}.spec.js`

**Q: Where's the login code?**
A: In fixture `{transaction}.fixtures.js` (handled automatically)

**Q: Can I modify selectors?**
A: Yes! Update `{transaction}.locators.js` and all tests using it will update automatically

**Q: What if SAP UI changes?**
A: Update selectors in locators file, retry tests

**Q: How do I debug a failing test?**
A: Run with `--headed` flag to see browser: `npx playwright test --headed`

---

## 🎬 Quick Actions

### Run All MM Tests
```bash
npm run test:mm
```

### Run All SD Tests
```bash
npm run test:sd
```

### Run Specific Test
```bash
npm run test:tc -- "TC_MM_PO_001"
```

### View Test Report
```bash
npx playwright show-report
```

---

## 📊 Current Status

```
Phase 1: ✅ COMPLETE
├─ 9 test cases ready
├─ MM module: 5 tests
├─ SD module: 3 tests
└─ 27 automation files generated

Phase 2: 🔄 PLANNED
├─ 6 additional tests
├─ FI module: 3 tests
├─ PP module: 1 test
└─ MM additions: 2 tests
```

---

## 🎓 Next Steps

1. **Run the tests:** `npm test`
2. **Read docs:** See README.md in each folder
3. **Modify tests:** Try changing test data
4. **Add new tests:** Copy existing test pattern
5. **Add transactions:** Use template folders (FI, PP)

---

**Version:** 1.0
**Last Updated:** 2026-04-23
**Status:** Phase 1 ✅ | Phase 2 🔄
