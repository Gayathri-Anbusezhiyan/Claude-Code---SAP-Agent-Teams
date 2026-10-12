# SAP Modules & Test Cases Mapping

## 📋 Complete Reference

### 🟢 **MM - Materials Management** (5 Test Cases)
*Handles: Buying, Procurement, Inventory, Goods Receipt*

```
┌─────────────────────────────────────────────────────────────────┐
│                    MM: MATERIALS MANAGEMENT                      │
│                   (Procurement & Inventory)                       │
└─────────────────────────────────────────────────────────────────┘

📄 PURCHASE ORDER (ME21N/ME22N/ME23N)
├─ Transaction: ME21N (Create)
│  ├─ Folder: mm/purchase-order/
│  ├─ Test Case: TC_009 ✅
│  ├─ Steps: 22 detailed steps
│  └─ Complexity: HIGH (item management, pricing)
│
├─ Transaction: ME22N (Change)
│  ├─ Folder: mm/purchase-order-change/
│  ├─ Test Case: TC_002 ✅
│  ├─ Steps: Modify PO qty, save
│  └─ Complexity: MEDIUM
│
└─ Transaction: ME23N (View)
   ├─ Folder: mm/purchase-order-view/
   ├─ Test Case: TC_008 ✅
   ├─ Steps: Open & display PO details
   └─ Complexity: SIMPLE (read-only)

📋 PURCHASE REQUISITION (ME51N/ME52N/ME53N)
├─ Transaction: ME51N (Create)
│  ├─ Folder: mm/purchase-requisition/
│  ├─ Test Case: TC_004 ✅
│  ├─ Steps: Create internal request
│  └─ Complexity: MEDIUM (material lookup)
│
├─ Transaction: ME52N (Change)
│  ├─ Folder: mm/purchase-requisition/
│  ├─ Test Case: TC_001 ✅
│  ├─ Steps: Edit PR qty, save
│  └─ Complexity: MEDIUM
│
└─ Transaction: ME53N (View)
   ├─ Folder: mm/purchase-requisition/
   ├─ Test Case: TC_006 ✅
   ├─ Steps: Display PR details
   └─ Complexity: SIMPLE (read-only)

📦 GOODS RECEIPT (MIGO)
├─ Transaction: MIGO
│  ├─ Folder: mm/goods-receipt/
│  ├─ Test Case: 🔄 Planned Phase 2
│  ├─ Steps: Receive goods, update inventory
│  └─ Complexity: HIGH (batch processing)
```

---

### 🔵 **SD - Sales & Distribution** (3 Test Cases)
*Handles: Sales Orders, Deliveries, Customer Billing*

```
┌─────────────────────────────────────────────────────────────────┐
│               SD: SALES & DISTRIBUTION                           │
│              (Order-to-Cash / Customer Orders)                    │
└─────────────────────────────────────────────────────────────────┘

📊 SALES ORDER (VA01/VA02/VA03)
├─ Transaction: VA01 (Create)
│  ├─ Folder: sd/sales-order/
│  ├─ Test Case: TC_005 ✅
│  ├─ Steps: 26 multi-step process
│  └─ Complexity: VERY HIGH ⚠️
│      └─ Includes: Pricing, weights, item list, incomplete check
│
├─ Transaction: VA02 (Change)
│  ├─ Folder: sd/sales-order/
│  ├─ Test Case: TC_003 ✅
│  ├─ Steps: Modify SO qty, save
│  └─ Complexity: MEDIUM
│
└─ Transaction: VA03 (View)
   ├─ Folder: sd/sales-order/
   ├─ Test Case: TC_007 ✅
   ├─ Steps: Display SO details (read-only)
   └─ Complexity: SIMPLE

📦 BILLING & DELIVERY
├─ Transaction: VL01N (Delivery Note)
│  ├─ Folder: sd/billing-document/
│  ├─ Test Case: 🔄 Planned Phase 2
│  ├─ Steps: Create delivery, ship goods
│  └─ Complexity: HIGH
│
└─ Transaction: VF01 (Customer Invoice)
   ├─ Folder: sd/billing-document/
   ├─ Test Case: 🔄 Planned Phase 2
   ├─ Steps: Create invoice, bill customer
   └─ Complexity: HIGH
```

---

### 🏦 **FI - Financial Accounting** (0 Test Cases)
*Handles: GL Posting, Invoicing, Reconciliation*

```
┌─────────────────────────────────────────────────────────────────┐
│              FI: FINANCIAL ACCOUNTING                            │
│            (Money, Invoices, GL Reconciliation)                  │
└─────────────────────────────────────────────────────────────────┘

💰 JOURNAL ENTRY (FB50/FB60)
├─ Transaction: FB50 (Post GL Entry)
│  ├─ Folder: fi/journal-entry/
│  ├─ Test Case: 🔄 Planned Phase 2
│  ├─ Steps: Enter GL account, amount, cost center
│  └─ Complexity: MEDIUM
│
└─ Status: TEMPLATE READY (not implemented)

📋 INVOICING (MIRO/VF01)
├─ Transaction: MIRO (Supplier Invoice)
│  ├─ Folder: fi/supplier-invoice/
│  ├─ Test Case: 🔄 Planned Phase 2
│  ├─ Steps: 3-way match (PO → GR → Invoice)
│  └─ Complexity: VERY HIGH ⚠️
│
├─ Transaction: VF01 (Customer Invoice)
│  ├─ Status: Listed under SD module
│  └─ Complexity: HIGH
│
└─ Status: FOLDER CREATED (no tests yet)
```

---

### 🏭 **PP - Production Planning** (0 Test Cases)
*Handles: Manufacturing, Production Orders, MRP*

```
┌─────────────────────────────────────────────────────────────────┐
│            PP: PRODUCTION PLANNING                               │
│           (Manufacturing, Production Orders, MRP)                │
└─────────────────────────────────────────────────────────────────┘

🔧 PRODUCTION ORDER (CO01)
├─ Transaction: CO01 (Create Production Order)
│  ├─ Folder: pp/production-order/
│  ├─ Test Case: 🔄 Planned Phase 2
│  ├─ Steps: Create, schedule, release
│  └─ Complexity: HIGH (resource allocation)
│
└─ Status: TEMPLATE READY (not implemented)
```

---

## 📊 Test Case Distribution

### By Module
```
MM (Materials Management)    ████████ 5 tests (55%)
SD (Sales & Distribution)    ███ 3 tests (33%)
FI (Financial Accounting)    0 tests (0%)
PP (Production Planning)     0 tests (0%)
────────────────────────────────────
Total:                       ███████████ 9 tests (100%)
```

### By Complexity
```
SIMPLE (Read-only views)     ████ 3 tests
MEDIUM (Edit operations)     ████ 4 tests
HIGH (Multi-step workflows)  ███ 2 tests
────────────────────────────────────
Total:                       ███████████ 9 tests
```

### By Folder Status
```
IMPLEMENTED ✅              7 folders
├─ mm/purchase-order/       (files present)
├─ mm/purchase-order-change/ (files present)
├─ mm/purchase-order-view/  (files present)
├─ mm/purchase-requisition/ (files present)
├─ sd/sales-order/          (files present)
├─ sd/billing-document/     (structure only)
└─ common/                  (shared utilities)

TEMPLATE (ready to use) 🔄  3 folders
├─ fi/journal-entry/        (ready for content)
├─ fi/supplier-invoice/     (ready for content)
└─ pp/production-order/     (ready for content)
```

---

## 🔀 Test Case Flow

### Procurement Flow (MM)
```
PR (Purchase Requisition)
    ├─ TC_004: CREATE PR ✅ (me/purchase-requisition)
    ├─ TC_001: CHANGE PR ✅ (mm/purchase-requisition)
    ├─ TC_006: VIEW PR ✅ (mm/purchase-requisition)
    │
    └─→ Becomes PO (Purchase Order)
        ├─ TC_009: CREATE PO ✅ (mm/purchase-order)
        ├─ TC_002: CHANGE PO ✅ (mm/purchase-order-change)
        ├─ TC_008: VIEW PO ✅ (mm/purchase-order-view)
        │
        └─→ Leads to GR (Goods Receipt)
            └─ 🔄 RECEIVE GOODS (mm/goods-receipt) Phase 2
```

### Sales Order Flow (SD)
```
SO (Sales Order)
    ├─ TC_005: CREATE SO ✅ (sd/sales-order) [26 steps!]
    ├─ TC_003: CHANGE SO ✅ (sd/sales-order)
    ├─ TC_007: VIEW SO ✅ (sd/sales-order)
    │
    └─→ Leads to Delivery
        └─ 🔄 CREATE DELIVERY (sd/billing-document) Phase 2
            └─→ CREATE INVOICE
                └─ 🔄 BILL CUSTOMER (sd/billing-document) Phase 2
```

### Accounting Flow (FI) - Phase 2
```
GL Journal Entry
    └─ 🔄 POST GL ENTRY (fi/journal-entry) Phase 2

Supplier Invoice (3-Way Match)
    └─ PO ──┐
       GR ──┼─→ 🔄 MIRO INVOICE (fi/supplier-invoice) Phase 2
       INV ─┘

Customer Invoice
    └─ 🔄 BILL CUSTOMER (sd/billing-document or fi/) Phase 2
```

---

## 📈 Implementation Roadmap

### ✅ Phase 1 - COMPLETE
| Module | Status | Coverage |
|---|---|---|
| **MM** | ✅ Active | 5/5 main transactions |
| **SD** | ✅ Active | 2/3 transactions (SO coverage) |
| **FI** | 📋 Prepared | Folder structure ready |
| **PP** | 📋 Prepared | Folder structure ready |

**Files Generated:** 27 automation script files
**Tests Ready:** 9/9

---

### 🔄 Phase 2 - PLANNED
| Module | Transaction | Folder | Planned Tests |
|---|---|---|---|
| **MM** | Goods Receipt | mm/goods-receipt/ | TC_010 |
| **SD** | Delivery | sd/billing-document/ | TC_011 |
| **SD** | Invoice | sd/billing-document/ | TC_012 |
| **FI** | GL Journal | fi/journal-entry/ | TC_013 |
| **FI** | Supplier Invoice | fi/supplier-invoice/ | TC_014 |
| **PP** | Production Order | pp/production-order/ | TC_015 |

**Estimated:** 6 additional test cases

---

## 🎯 Key Transactions Summary

| SAP Code | Transaction Name | Module | Folder | TC # | Status |
|---|---|---|---|---|---|
| **ME21N** | Create PO | MM | purchase-order | TC_009 | ✅ |
| **ME22N** | Change PO | MM | purchase-order-change | TC_002 | ✅ |
| **ME23N** | View PO | MM | purchase-order-view | TC_008 | ✅ |
| **ME51N** | Create PR | MM | purchase-requisition | TC_004 | ✅ |
| **ME52N** | Change PR | MM | purchase-requisition | TC_001 | ✅ |
| **ME53N** | View PR | MM | purchase-requisition | TC_006 | ✅ |
| **MIGO** | Goods Receipt | MM | goods-receipt | — | 🔄 |
| **VA01** | Create SO | SD | sales-order | TC_005 | ✅ |
| **VA02** | Change SO | SD | sales-order | TC_003 | ✅ |
| **VA03** | View SO | SD | sales-order | TC_007 | ✅ |
| **VL01N** | Delivery | SD | billing-document | — | 🔄 |
| **VF01** | Invoice | SD/FI | billing-document | TC_012 | 🔄 |
| **FB50** | GL Entry | FI | journal-entry | TC_013 | 🔄 |
| **MIRO** | Supplier Invoice | FI | supplier-invoice | TC_014 | 🔄 |
| **CO01** | Production Order | PP | production-order | TC_015 | 🔄 |

---

## 📚 How Folders Connect

```
Folder Hierarchy                Test Case Usage
─────────────────              ───────────────

common/                         All tests
├─ sap-login.page              All (IDP login)
├─ fiori-launchpad             All (search apps)
├─ sap-dialog.helper           All (dismiss popups)
├─ sap-message.helper          All (verify messages)
└─ sap-shell.page              All (logout)

mm/                             MM tests (5)
├─ purchase-order/             TC_009
├─ purchase-order-change/      TC_002
├─ purchase-order-view/        TC_008
├─ purchase-requisition/       TC_001, TC_004, TC_006
└─ goods-receipt/              TC_010 (Phase 2)

sd/                             SD tests (3) + (3 Phase 2)
├─ sales-order/                TC_003, TC_005, TC_007
└─ billing-document/           TC_011, TC_012 (Phase 2)

fi/                             FI tests (0) → (3 Phase 2)
├─ journal-entry/              TC_013 (Phase 2)
└─ supplier-invoice/           TC_014 (Phase 2)

pp/                             PP tests (0) → (1 Phase 2)
└─ production-order/           TC_015 (Phase 2)
```

---

## 🎓 Learning Guide

### New to SAP?
1. **Start here:** Read this document
2. **Learn MM:** Simpler procurement process
3. **Then SD:** More complex sales workflow
4. **Finally FI:** Complex accounting rules

### New to Test Automation?
1. **Read:** STRUCTURE_GUIDE.md (this folder)
2. **Understand:** POM pattern (Locators → Page → Fixtures)
3. **Try:** Modify one test case
4. **Create:** New transaction folder

### New to Playwright?
1. **Browse:** automation/tests/*.spec.js
2. **See:** How tests use page objects
3. **Check:** automation/utils/sap-ui5-helper.js
4. **Try:** Write a new page object method

---

## ✅ Checklist: Adding New Transaction

- [ ] Create folder: `automation/pages/{module}/{transaction}/`
- [ ] Create file: `{transaction}.locators.js`
- [ ] Create file: `{transaction}.page.js`
- [ ] Create file: `{transaction}.fixtures.js`
- [ ] Identify SAP transaction code (ME21N, VA01, etc.)
- [ ] Test locators in manual SAP session
- [ ] Write page object methods
- [ ] Create fixture setup/teardown
- [ ] Create test case in `automation/tests/{module}.spec.js`
- [ ] Run test and debug
- [ ] Document SAP-specific considerations in comments

---

**Version:** 1.0
**Last Updated:** 2026-04-23
**Status:** Phase 1 Complete ✅ | Phase 2 Planned 🔄
