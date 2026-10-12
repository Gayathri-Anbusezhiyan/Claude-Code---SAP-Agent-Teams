# Generate Locators from Exploration Data

## Purpose
Convert MCP exploration snapshot data into Playwright locator files for SAP Fiori page objects.

## Input
- Exploration snapshots: `exploration-data/snapshots/<module>-<app>.json`
- Exploration selectors: `exploration-data/selectors/<module>-<app>.selectors.json`
- Blueprint: `blueprints/POM-JavaScript-Blueprint.md` (locator patterns)

## Output
- Locator file: `automation/pages/<module>/<app>/<app>.locators.js`

## Generation Process

### Step 1: Read Exploration Data
Read the exploration snapshot and/or selector map for the target SAP app.

### Step 2: Map Elements to Locator Definitions
For each interactive element captured during exploration:

1. **Determine element type**: input, button, table, dropdown, checkbox, link, tab
2. **Select primary strategy** based on exploration data:
   - If element has a clear **role + name** → use `role` strategy
   - If element has a **label** association → use `label` strategy
   - If element has a stable **SAP ID part** → use `sap-id` with `partialMatch: true`
3. **Add fallback strategies** (at least 1-2 fallbacks per element):
   - Different strategy than primary
   - CSS selector as last fallback

### Step 3: Generate Locator File

Follow this exact template:

```javascript
// automation/pages/<module>/<app>/<app>.locators.js
// Source: exploration-data/selectors/<module>-<app>.selectors.json
// Captured: <date from exploration data>

const <AppName>Locators = {
  // --- Filter Bar / Search ---
  <filterField>: {
    primary: { strategy: '<strategy>', value: '<value>' },
    fallbacks: [
      { strategy: '<fallback1>', value: '<value1>' },
    ]
  },

  // --- Form Fields ---
  <inputField>: {
    primary: { strategy: 'label', value: '<Label Text>' },
    fallbacks: [
      { strategy: 'sap-id', value: '<stableIdPart>', partialMatch: true },
    ]
  },

  // --- Action Buttons ---
  <button>: {
    primary: { strategy: 'role', value: 'button', name: '<Button Text>' },
    fallbacks: [
      { strategy: 'sap-id', value: '<stableIdPart>', partialMatch: true },
    ]
  },

  // --- Tables ---
  <table>: {
    primary: { strategy: 'css', value: '[id*="<stableTableId>"]' },
    fallbacks: [
      { strategy: 'role', value: 'table' },
    ]
  },
};

const LocatorMetadata = {
  recordedDate: '<date>',
  recordedBy: 'Playwright MCP Server',
  environment: 'SAP S/4HANA Cloud',
  browser: 'Chromium',
  resolution: '1920x1080'
};

module.exports = { <AppName>Locators, LocatorMetadata };
```

### Step 4: Naming Conventions

| Element Type | Naming Pattern | Example |
|-------------|---------------|---------|
| Input field | `<fieldName>Field` | `supplierField`, `materialField` |
| Button | `<action>Button` | `saveButton`, `createButton`, `goButton` |
| Table | `<name>Table` | `itemsTable`, `resultsTable` |
| Dropdown | `<name>Select` | `companyCodeSelect`, `plantSelect` |
| Checkbox | `<name>Checkbox` | `activeCheckbox` |
| Tab | `<name>Tab` | `headerTab`, `itemsTab` |
| Link | `<name>Link` | `detailLink` |
| Filter | `<name>Filter` | `supplierFilter`, `dateFilter` |

### Step 5: Validation
- Every interactive element from the exploration snapshot should have a locator entry
- Every locator should have at least 1 fallback strategy
- No duplicate locator names
- SAP ID parts should never include the dynamic prefix (`__xmlview0--`)
- Include `LocatorMetadata` with the exploration date and environment

## Quality Checks
- All form fields from the exploration data have locator entries
- All buttons have role-based primary strategies
- All tables have CSS-based selectors with partial ID matching
- Fallback strategies use different approaches than the primary
- No hardcoded full SAP IDs (always use partial matching)
