# Explore SAP Fiori App — MCP Exploration Prompt

## Purpose
Use the Playwright MCP server to explore a SAP S/4HANA Fiori application, capture accessibility snapshots, and record element data for automation script generation.

## Prerequisites
- Playwright MCP server is running (configured in `.mcp.json`)
- SAP Fiori Launchpad is accessible
- SAP credentials are available (env vars: `SAP_USERNAME`, `SAP_PASSWORD`)

## Exploration Process

### Step 1: Navigate to SAP Fiori Launchpad
1. Use `browser_navigate` to go to the SAP Fiori Launchpad URL:
   ```
   https://my429998.s4hana.cloud.sap/ui#Shell-home
   ```
2. If a login page appears, use `browser_fill_form` or `browser_type` to enter credentials
3. Wait for the Launchpad to fully load (shell header visible)

### Step 2: Navigate to Target Fiori App
1. Either search for the app using the search bar, or
2. Navigate directly via hash fragment: `browser_navigate` to `<baseUrl>/ui#<SemanticObject-action>`

Common SAP Fiori app hash fragments:
| App | Hash Fragment |
|-----|---------------|
| Manage Purchase Orders | `#PurchaseOrder-manage` |
| Create Purchase Order | `#PurchaseOrder-create` |
| Manage Purchase Requisitions | `#PurchaseRequisition-manage` |
| Manage Sales Orders | `#SalesOrder-manage` |
| Create Sales Order | `#SalesOrder-create` |
| Manage Billing Documents | `#BillingDocument-manage` |
| Manage Journal Entries | `#JournalEntry-manage` |
| Post Supplier Invoice | `#SupplierInvoice-manage` |
| Manage Production Orders | `#ProductionOrder-manage` |

### Step 3: Capture Accessibility Snapshots
At each step/screen of the app workflow:

1. Use `browser_snapshot` to capture the accessibility tree
2. Document all interactive elements found:
   - **Input fields**: Note the label, SAP ID (from `id` attribute), role, placeholder
   - **Buttons**: Note the text/name, role, SAP icon if present
   - **Tables**: Note the table type, column headers, row structure
   - **Dropdowns/Select**: Note the label, options if visible
   - **Tabs/Sections**: Note section titles and navigation structure
   - **Messages**: Note any message areas, strips, or toast locations

3. Record the element data in this format:
   ```json
   {
     "name": "supplierField",
     "role": "textbox",
     "label": "Supplier",
     "sapId": "__xmlview0--supplierInput",
     "stableIdPart": "supplierInput",
     "ref": "ref_042",
     "type": "input"
   }
   ```

### Step 4: Walk Through Workflow Steps
For each app, navigate through the complete user workflow:

**List/Table view (initial):**
- Capture filter bar elements
- Capture table structure and columns
- Capture action buttons (Create, Delete, Go, Adapt Filters)

**Create/Edit view:**
- Capture all form fields (header and item level)
- Capture section headers/tabs
- Capture footer bar actions (Save, Cancel, Post, Approve)

**Detail view:**
- Capture object header elements
- Capture tab navigation
- Capture related data tables

### Step 5: Save Exploration Data

Save the captured data to `exploration-data/snapshots/<module>-<app>.json`:

```json
{
  "app": "Manage Purchase Orders",
  "hashFragment": "#PurchaseOrder-manage",
  "module": "mm",
  "appName": "purchase-order",
  "capturedDate": "2026-04-07T10:00:00Z",
  "sapSystem": "my429998.s4hana.cloud.sap",
  "steps": [
    {
      "step": 1,
      "description": "List view with filter bar",
      "url": "current URL",
      "elements": [
        {
          "name": "supplierFilter",
          "role": "textbox",
          "label": "Supplier",
          "sapId": "__xmlview0--supplierInput",
          "stableIdPart": "supplierInput",
          "type": "input"
        },
        {
          "name": "goButton",
          "role": "button",
          "label": "Go",
          "sapId": "__xmlview0--btnGo",
          "stableIdPart": "btnGo",
          "type": "button"
        }
      ]
    },
    {
      "step": 2,
      "description": "Create view - header form",
      "url": "current URL",
      "elements": []
    }
  ]
}
```

### Step 6: Extract Selector Map

From the snapshot, generate a selector map at `exploration-data/selectors/<module>-<app>.selectors.json`:

```json
{
  "app": "purchase-order",
  "module": "mm",
  "extractedDate": "2026-04-07",
  "selectors": {
    "supplierField": {
      "primary": { "strategy": "label", "value": "Supplier" },
      "fallbacks": [
        { "strategy": "sap-id", "value": "supplierInput", "partialMatch": true },
        { "strategy": "role", "value": "textbox", "name": "Supplier" }
      ]
    },
    "goButton": {
      "primary": { "strategy": "role", "value": "button", "name": "Go" },
      "fallbacks": [
        { "strategy": "sap-id", "value": "btnGo", "partialMatch": true }
      ]
    }
  }
}
```

## Locator Strategy Selection Rules

When mapping elements to selectors, follow this priority:

1. **role + name** → For buttons, links, headings (most stable)
2. **label** → For input fields, dropdowns, checkboxes (SAP labels are reliable)
3. **sap-id (partial)** → Strip `__xmlview0--` prefix, use `[id*="stablePart"]`
4. **text** → For static text elements, menu items
5. **css** → For structural selectors (table cells, container elements)
6. **xpath** → Only if no other strategy works

## Important Notes

- SAP UI5 IDs have a dynamic prefix (e.g., `__xmlview0--`). Always record the **stable part** after `--` for `sap-id` strategy with `partialMatch: true`
- Some elements only appear after interactions (clicking a tab, expanding a section). Navigate through all tabs/sections to capture everything
- SAP tables can be `sap.m.Table` (responsive) or `sap.ui.table.Table` (grid). Document which type
- Busy indicators block interaction. Wait for them to disappear before taking snapshots
- The MCP `browser_snapshot` captures the accessibility tree which gives roles and names — this is the primary source for locator strategies
