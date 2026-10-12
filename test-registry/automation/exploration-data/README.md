# Exploration Data

This folder stores data captured from MCP browser exploration of SAP Fiori applications.

## Purpose

When you run the **"Explore SAP app"** command, Claude uses the Playwright MCP server to navigate through SAP Fiori apps, take accessibility snapshots, and record element information. That data is saved here and later used to generate accurate locators and automation scripts.

## Folder Structure

```
exploration-data/
├── snapshots/          # Raw accessibility tree snapshots per page/step
│   └── mm-purchase-order.json
├── selectors/          # Extracted selector maps per app
│   └── mm-purchase-order.selectors.json
└── README.md
```

## Snapshot Format

Each snapshot file contains the accessibility tree and element metadata captured from a SAP Fiori page:

```json
{
  "app": "Purchase Order - Manage",
  "hashFragment": "#PurchaseOrder-manage",
  "module": "mm",
  "capturedDate": "2026-04-07T10:00:00Z",
  "sapSystem": "my429998.s4hana.cloud.sap",
  "steps": [
    {
      "step": 1,
      "description": "List view - initial load",
      "url": "https://my429998.s4hana.cloud.sap/ui#PurchaseOrder-manage",
      "snapshot": "... accessibility tree ...",
      "elements": [
        {
          "name": "supplierField",
          "role": "textbox",
          "label": "Supplier",
          "sapId": "__xmlview0--supplierInput",
          "ref": "ref_042"
        }
      ]
    }
  ]
}
```

## Selector Map Format

Extracted from snapshots, ready for locator file generation:

```json
{
  "app": "purchase-order",
  "module": "mm",
  "selectors": {
    "supplierField": {
      "primary": { "strategy": "label", "value": "Supplier" },
      "fallbacks": [
        { "strategy": "sap-id", "value": "supplierInput", "partialMatch": true },
        { "strategy": "role", "value": "textbox", "name": "Supplier" }
      ]
    }
  }
}
```

## Workflow

1. **Explore**: Run `"Explore SAP app [name]"` to capture snapshots
2. **Generate**: Run `"Generate automation scripts from testcases"` which reads this data
3. **Update**: Re-explore when SAP UI changes to refresh stale selectors
