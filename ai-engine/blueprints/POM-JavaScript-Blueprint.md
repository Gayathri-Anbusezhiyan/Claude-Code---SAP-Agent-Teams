# SAP S/4HANA Fiori — Playwright POM Automation Blueprint (JavaScript)

## Overview
This blueprint defines the architecture, patterns, and processes for generating Playwright test scripts for SAP S/4HANA Fiori applications using the Page Object Model (POM) approach in a hybrid environment with Playwright MCP Server for exploration and locator recording.

---

## Hybrid Workflow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ Test Cases from /testcases/                                  │
└────────────────┬────────────────────────────────────────────┘
                 │
    ┌────────────┼────────────────────┐
    │            │                    │
    ▼            ▼                    ▼
┌──────────┐ ┌──────────────┐ ┌────────────────┐
│ Explore  │ │ Generate POM │ │ Generate Test  │
│ SAP App  │ │ Scripts      │ │ Data JSONs     │
│ with MCP │ │              │ │                │
└────┬─────┘ └──────┬───────┘ └───────┬────────┘
     │               │                │
     ▼               │                │
┌──────────────┐     │                │
│ Store in     │     │                │
│ exploration- │─────┤                │
│ data/        │     │                │
└──────────────┘     │                │
                     ▼                ▼
              ┌────────────────────────────┐
              │ Locators + Pages + Specs   │
              │ in automation/             │
              └────────────────────────────┘
```

---

## Folder Structure

```
automation/
├── README.md
├── pages/
│   ├── common/
│   │   ├── fiori-launchpad.page.js
│   │   ├── fiori-launchpad.locators.js
│   │   ├── sap-login.page.js
│   │   ├── sap-login.locators.js
│   │   ├── sap-shell.page.js
│   │   ├── sap-shell.locators.js
│   │   ├── sap-table.helper.js
│   │   ├── sap-dialog.helper.js
│   │   ├── sap-message.helper.js
│   │   └── common.fixtures.js
│   ├── mm/
│   │   ├── purchase-order/
│   │   │   ├── purchase-order.page.js
│   │   │   ├── purchase-order.locators.js
│   │   │   └── purchase-order.fixtures.js
│   │   ├── purchase-requisition/
│   │   └── goods-receipt/
│   ├── sd/
│   │   ├── sales-order/
│   │   └── billing-document/
│   ├── fi/
│   │   ├── journal-entry/
│   │   └── supplier-invoice/
│   └── pp/
│       └── production-order/
├── tests/
│   ├── sap-login.spec.js
│   ├── mm-purchase-order.spec.js
│   ├── mm-purchase-requisition.spec.js
│   ├── sd-sales-order.spec.js
│   ├── fi-journal-entry.spec.js
│   └── pp-production-order.spec.js
├── test-data/
│   ├── environments.json
│   ├── mm-purchase-order.data.json
│   ├── sd-sales-order.data.json
│   └── fi-journal-entry.data.json
├── exploration-data/
│   ├── snapshots/
│   └── selectors/
├── fixtures/
│   ├── base.fixtures.js
│   └── test-data.js
├── utils/
│   ├── locator-helper.js
│   ├── sap-ui5-helper.js
│   ├── logger.js
│   └── self-healer.js
└── config/
    └── playwright.config.js
```

---

## 1. SAP UI5 Locator Strategies

SAP Fiori apps use the SAPUI5 framework which generates dynamic IDs and relies heavily on ARIA attributes. The locator strategy must account for this.

### Locator Priority Order (most stable first)
1. **role + name** — ARIA roles are stable across SAP updates
2. **label** — SAP UI5 labels are reliable and translatable
3. **sap-id (partial)** — Strip dynamic view prefix, match stable part: `[id*="supplierInput"]`
4. **css** — As fallback for complex selectors
5. **xpath** — Last resort

### Locator File Pattern

**File**: `pages/[module]/[app]/[app].locators.js`

```javascript
// pages/mm/purchase-order/purchase-order.locators.js
// Source: exploration-data/snapshots/mm-purchase-order.json

const PurchaseOrderLocators = {
  // Header fields
  supplierField: {
    primary: { strategy: 'label', value: 'Supplier' },
    fallbacks: [
      { strategy: 'sap-id', value: 'supplierInput', partialMatch: true },
      { strategy: 'css', value: '[id*="supplierInput"] input' }
    ]
  },

  purchaseOrderType: {
    primary: { strategy: 'label', value: 'Purchase Order Type' },
    fallbacks: [
      { strategy: 'sap-id', value: 'purchaseOrderType', partialMatch: true }
    ]
  },

  purchasingOrg: {
    primary: { strategy: 'label', value: 'Purchasing Organization' },
    fallbacks: [
      { strategy: 'sap-id', value: 'purchasingOrg', partialMatch: true }
    ]
  },

  companyCode: {
    primary: { strategy: 'label', value: 'Company Code' },
    fallbacks: [
      { strategy: 'sap-id', value: 'companyCode', partialMatch: true }
    ]
  },

  // Item table
  itemsTable: {
    primary: { strategy: 'css', value: '[id*="itemsTable"]' },
    fallbacks: [
      { strategy: 'role', value: 'table' }
    ]
  },

  // Action buttons
  saveButton: {
    primary: { strategy: 'role', value: 'button', name: 'Save' },
    fallbacks: [
      { strategy: 'sap-id', value: 'saveButton', partialMatch: true }
    ]
  },

  createButton: {
    primary: { strategy: 'role', value: 'button', name: 'Create' },
    fallbacks: [
      { strategy: 'css', value: '[id*="createButton"]' }
    ]
  },

  deleteButton: {
    primary: { strategy: 'role', value: 'button', name: 'Delete' },
    fallbacks: [
      { strategy: 'css', value: '[id*="deleteButton"]' }
    ]
  },

  // Filter bar
  filterBar: {
    primary: { strategy: 'css', value: '.sapUiCompFilterBar, [id*="filterBar"]' },
    fallbacks: [
      { strategy: 'role', value: 'search' }
    ]
  },

  goButton: {
    primary: { strategy: 'role', value: 'button', name: 'Go' },
    fallbacks: [
      { strategy: 'css', value: '[id*="btnGo"]' }
    ]
  },
};

const LocatorMetadata = {
  recordedDate: '2026-04-07',
  recordedBy: 'Playwright MCP Server',
  environment: 'SAP S/4HANA Cloud - my429998',
  browser: 'Chromium',
  resolution: '1920x1080'
};

module.exports = { PurchaseOrderLocators, LocatorMetadata };
```

### Locator Resolution

The `locator-helper.js` utility supports these SAP-specific strategies:

| Strategy | Description | Example |
|----------|-------------|---------|
| `sap-id` | Partial ID match (strips view prefix) | `[id*="supplierInput"]` |
| `data-sap-ui` | SAP UI5 data attribute | `[data-sap-ui="controlId"]` |
| `sap-icon` | SAP icon URI | `sap-icon://save` |
| `role` | ARIA role + name | `getByRole('button', { name: 'Save' })` |
| `label` | Form label association | `getByLabel('Supplier')` |
| `css` | Standard CSS selector | `.sapMInput input` |

---

## 2. Page Object Model (page.js)

**File**: `pages/[module]/[app]/[app].page.js`

```javascript
// pages/mm/purchase-order/purchase-order.page.js

const { resolveLocator } = require('../../../utils/locator-helper');
const { waitForSapPageReady, waitForBusyIndicator, navigateToFioriApp } = require('../../../utils/sap-ui5-helper');
const { PurchaseOrderLocators } = require('./purchase-order.locators');
const { SapTableHelper } = require('../../common/sap-table.helper');
const { SapMessageHelper } = require('../../common/sap-message.helper');
const { logger } = require('../../../utils/logger');

class PurchaseOrderPage {
  constructor(page) {
    this.page = page;
    this.messageHelper = new SapMessageHelper(page);
  }

  async loc(name) {
    return await resolveLocator(this.page, PurchaseOrderLocators[name]);
  }

  // --- Navigation ---

  async goto() {
    await navigateToFioriApp(this.page, '#PurchaseOrder-manage');
    logger.info('Navigated to Manage Purchase Orders', 'PurchaseOrderPage');
  }

  // --- Filter bar actions ---

  async filterBySupplier(supplier) {
    const field = await this.loc('supplierField');
    await field.fill(supplier);
    await this.clickGo();
  }

  async clickGo() {
    const goBtn = await this.loc('goButton');
    await goBtn.click();
    await waitForBusyIndicator(this.page);
  }

  // --- CRUD actions ---

  async clickCreate() {
    const btn = await this.loc('createButton');
    await btn.click();
    await waitForSapPageReady(this.page);
  }

  async fillHeaderData({ supplier, purchaseOrderType, purchasingOrg, companyCode }) {
    if (supplier) {
      const field = await this.loc('supplierField');
      await field.fill(supplier);
      await this.page.keyboard.press('Tab');
      await waitForBusyIndicator(this.page);
    }
    if (purchaseOrderType) {
      const field = await this.loc('purchaseOrderType');
      await field.fill(purchaseOrderType);
    }
    if (purchasingOrg) {
      const field = await this.loc('purchasingOrg');
      await field.fill(purchasingOrg);
    }
    if (companyCode) {
      const field = await this.loc('companyCode');
      await field.fill(companyCode);
    }
    await waitForBusyIndicator(this.page);
  }

  async clickSave() {
    const btn = await this.loc('saveButton');
    await btn.click();
    await waitForBusyIndicator(this.page);
    logger.info('Clicked Save', 'PurchaseOrderPage');
  }

  // --- Table interactions ---

  async getItemsTable() {
    const tableEl = await this.loc('itemsTable');
    const selector = await tableEl.evaluate(el => {
      return el.tagName.toLowerCase() === 'table' ? `#${el.id}` : `[id="${el.id}"]`;
    }).catch(() => '[id*="itemsTable"]');
    return new SapTableHelper(this.page, selector);
  }

  // --- Assertions ---

  async getSuccessMessage() {
    return await this.messageHelper.getToastMessage();
  }

  async hasSuccessMessage(expectedText) {
    return await this.messageHelper.hasSuccessMessage(expectedText);
  }
}

module.exports = { PurchaseOrderPage };
```

---

## 3. Fixtures (fixtures.js)

**File**: `pages/[module]/[app]/[app].fixtures.js`

```javascript
// pages/mm/purchase-order/purchase-order.fixtures.js

const { test: base, expect } = require('@playwright/test');
const { PurchaseOrderPage } = require('./purchase-order.page');
const { SapLoginPage } = require('../../common/sap-login.page');
const { waitForSapPageReady, navigateToFioriApp } = require('../../../utils/sap-ui5-helper');
const { logger } = require('../../../utils/logger');

const test = base.extend({
  purchaseOrderPage: async ({ page }, use) => {
    // Authenticate
    const baseUrl = process.env.SAP_BASE_URL || 'https://my429998.s4hana.cloud.sap';
    const loginPage = new SapLoginPage(page);
    await page.goto(`${baseUrl}/ui#Shell-home`, { waitUntil: 'domcontentloaded' });

    const isLoginVisible = await loginPage.isLoginPageVisible();
    if (isLoginVisible) {
      await loginPage.login(
        process.env.SAP_USERNAME,
        process.env.SAP_PASSWORD,
        process.env.SAP_CLIENT
      );
    }

    await waitForSapPageReady(page, 60000);

    // Navigate to Purchase Order app
    const poPage = new PurchaseOrderPage(page);
    await poPage.goto();

    await use(poPage);
  },
});

module.exports = { test, expect };
```

---

## 4. Test Spec (spec.js)

**File**: `tests/[module]-[app].spec.js`

```javascript
// tests/mm-purchase-order.spec.js

const { test, expect } = require('../pages/mm/purchase-order/purchase-order.fixtures');
const { getTestCase } = require('../fixtures/test-data');
const { logger } = require('../utils/logger');

test.describe('MM - Manage Purchase Orders', () => {

  test('TC_MM_PO_001: Create standard purchase order', async ({ purchaseOrderPage }) => {
    const tc = getTestCase('mm-purchase-order', 'TC_MM_PO_001');
    logger.testStart('TC_MM_PO_001', 'Create standard purchase order');

    // Step 1: Click Create
    await purchaseOrderPage.clickCreate();

    // Step 2: Fill header data
    await purchaseOrderPage.fillHeaderData({
      supplier: tc.input.supplier,
      purchaseOrderType: tc.input.purchaseOrderType,
      purchasingOrg: tc.input.purchasingOrg,
      companyCode: tc.input.companyCode,
    });

    // Step 3: Save
    await purchaseOrderPage.clickSave();

    // Expected: Success message
    const hasSuccess = await purchaseOrderPage.hasSuccessMessage(tc.expected.messagePattern);
    expect(hasSuccess).toBeTruthy();

    logger.testEnd('TC_MM_PO_001', 'passed');
  });

  test('TC_MM_PO_002: Search purchase order by supplier', async ({ purchaseOrderPage }) => {
    const tc = getTestCase('mm-purchase-order', 'TC_MM_PO_002');
    logger.testStart('TC_MM_PO_002', 'Search purchase order by supplier');

    // Step 1: Filter by supplier
    await purchaseOrderPage.filterBySupplier(tc.input.supplier);

    // Expected: Table shows filtered results
    const table = await purchaseOrderPage.getItemsTable();
    await table.waitForLoad();
    const rowCount = await table.getRowCount();
    expect(rowCount).toBeGreaterThan(0);

    logger.testEnd('TC_MM_PO_002', 'passed');
  });
});
```

---

## 5. Test Data (data.json)

**File**: `test-data/[module]-[app].data.json`

```json
{
  "feature": "mm-purchase-order",
  "testData": {
    "TC_MM_PO_001": {
      "description": "Create standard purchase order",
      "input": {
        "supplier": "10000001",
        "purchaseOrderType": "NB",
        "purchasingOrg": "1000",
        "purchasingGroup": "001",
        "companyCode": "1000",
        "material": "100-100",
        "quantity": "10",
        "plant": "1000",
        "storageLocation": "0001"
      },
      "expected": {
        "messagePattern": "Purchase order",
        "statusAfterSave": "Created"
      }
    },
    "TC_MM_PO_002": {
      "description": "Search purchase order by supplier",
      "input": {
        "supplier": "10000001"
      },
      "expected": {
        "minResults": 1
      }
    }
  }
}
```

---

## 6. SAP UI5 Wait Strategies

SAP Fiori apps require special wait handling:

| Wait Function | When to Use |
|---------------|-------------|
| `waitForUI5Ready(page)` | After initial page load — ensures UI5 core is initialized |
| `waitForBusyIndicator(page)` | After any action that triggers OData calls (save, filter, navigate) |
| `waitForSapPageReady(page)` | Combined: domcontentloaded + UI5 ready + busy indicator |
| `waitForTableLoad(page, sel)` | After filtering/searching — waits for table rows to populate |
| `waitForMessageToast(page)` | After save/post — captures transient success messages |

**Important**: Never use `networkidle` with SAP — Fiori apps maintain persistent OData connections that prevent `networkidle` from resolving. Always use `domcontentloaded` + UI5-specific waits.

---

## 7. SAP Table Interaction Patterns

SAP has multiple table types. Use `SapTableHelper`:

```javascript
const { SapTableHelper } = require('../../common/sap-table.helper');

// Create helper for a specific table
const table = new SapTableHelper(page, '[id*="purchaseOrderTable"]');

// Wait for data
await table.waitForLoad();

// Read data
const rowCount = await table.getRowCount();
const cellText = await table.getCellText(0, 1);

// Interact
await table.clickRow(0);
await table.selectRow(2);
await table.clickRowByText('10000001');
await table.sortByColumn('Supplier');
```

---

## 8. SAP Message Handling

Use `SapMessageHelper` for all message types:

```javascript
const { SapMessageHelper } = require('../../common/sap-message.helper');

const msgHelper = new SapMessageHelper(page);

// After save — check toast
const toastText = await msgHelper.getToastMessage();

// Check strip messages
const stripText = await msgHelper.getStripMessage();
const stripType = await msgHelper.getStripType(); // 'Success', 'Error', etc.

// Message popover (multiple messages)
await msgHelper.openMessagePopover();
const messages = await msgHelper.getPopoverMessages();
```

---

## 9. Exploration Data Integration

Locators are generated from MCP exploration data stored in `exploration-data/`.

### Workflow:
1. **Explore**: Use MCP to navigate SAP app and capture accessibility snapshots
2. **Save**: Snapshots stored in `exploration-data/snapshots/<module>-<app>.json`
3. **Extract**: Selector maps saved to `exploration-data/selectors/<module>-<app>.selectors.json`
4. **Generate**: Script generation reads selectors and creates locator files

### Linking locators to exploration data:
```javascript
// pages/mm/purchase-order/purchase-order.locators.js
// Source: exploration-data/selectors/mm-purchase-order.selectors.json
// Captured: 2026-04-07
```

---

## 10. Hybrid Execution Process

### Phase 1: Explore SAP App with MCP
1. Navigate to SAP Fiori Launchpad via MCP `browser_navigate`
2. Login if required
3. Open target Fiori app (e.g., Manage Purchase Orders)
4. Take `browser_snapshot` at each workflow step
5. Map all interactive elements with SAP UI5 IDs, roles, labels
6. Save to `exploration-data/`

### Phase 2: Generate Automation Scripts
1. Read test cases from `testcases/`
2. Read exploration data from `exploration-data/`
3. Generate locators.js files from selector maps
4. Generate page.js files with methods matching test steps
5. Generate fixtures.js files with SAP authentication
6. Generate spec.js files with TC IDs

### Phase 3: Execute Tests
```bash
npm test                          # All tests
npm run test:mm                   # Materials Management
npx playwright test --grep "TC_MM_PO_001"  # Single test case
```

### Phase 4: Maintain
- Re-explore when UI changes
- Self-healer logs which locators needed fallbacks
- Update exploration data and regenerate locators

---

## Best Practices

- **Always explore first**: Never guess SAP locators — use MCP exploration data
- **Prefer role+name**: Most stable across SAP updates
- **Use partial ID matching**: SAP IDs have dynamic view prefixes (`__xmlview0--`)
- **Wait for UI5**: Always call `waitForSapPageReady` after navigation
- **Never use networkidle**: SAP maintains persistent connections
- **Single worker**: SAP sessions often conflict when run in parallel
- **Log test steps**: Use `logger.step()` for debugging failed tests
- **Tab after fill**: SAP input fields often trigger validation on Tab
