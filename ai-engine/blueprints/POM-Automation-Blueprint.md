# SAP S/4HANA Fiori — POM Automation Architecture Blueprint

## Overview
This blueprint defines the high-level architecture and workflow for automating SAP S/4HANA Fiori applications using Playwright with a Page Object Model (POM) approach. It covers the hybrid strategy of MCP-based exploration combined with scripted Playwright execution.

For detailed JavaScript implementation patterns, see `POM-JavaScript-Blueprint.md`.

---

## Hybrid Architecture

```
┌──────────────┐    ┌──────────────────┐    ┌───────────────┐
│ Requirements │───▶│ Test Cases       │───▶│ Automation    │
│ /requirements│    │ /testcases       │    │ /automation   │
└──────────────┘    └───────┬──────────┘    └───────┬───────┘
                            │                       │
                 ┌──────────┼──────────┐            │
                 │          │          │            │
                 ▼          ▼          ▼            ▼
          ┌──────────┐ ┌────────┐ ┌────────┐ ┌──────────┐
          │ Explore  │ │Generate│ │Generate│ │ Execute  │
          │ with MCP │ │Locators│ │Scripts │ │ Tests    │
          │          │ │        │ │        │ │          │
          └────┬─────┘ └───┬────┘ └───┬────┘ └──────────┘
               │           │          │
               ▼           │          │
          ┌──────────┐     │          │
          │exploration│────┘          │
          │-data/    │────────────────┘
          └──────────┘
```

---

## SAP Fiori Application Model

### Fiori Launchpad
- Entry point for all SAP Fiori apps
- URL: `https://<host>/ui#Shell-home`
- Contains: app tiles, search, user menu, notifications

### Fiori App Navigation
- Semantic object hash: `#PurchaseOrder-manage`, `#SalesOrder-create`
- Each app is a standalone UI5 component loaded in the shell

### SAP UI5 Element Hierarchy
```
sap.m.Shell
└── sap.ushell.ShellLayout
    ├── sap.ushell.ShellHeader (shell bar)
    └── sap.m.App
        └── sap.m.Page
            ├── sap.ui.comp.FilterBar (filter/search)
            ├── sap.m.Table / sap.ui.table.Table (list/grid)
            ├── sap.m.ObjectHeader (detail header)
            ├── sap.ui.layout.form.SimpleForm (edit form)
            └── sap.m.Bar (footer with actions)
```

---

## Module Organization

SAP modules map to automation folders:

| SAP Module | Code | Folder | Example Apps |
|------------|------|--------|-------------|
| Materials Management | MM | `pages/mm/` | Purchase Order, Purchase Requisition, Goods Receipt |
| Sales & Distribution | SD | `pages/sd/` | Sales Order, Billing Document |
| Finance | FI | `pages/fi/` | Journal Entry, Supplier Invoice |
| Production Planning | PP | `pages/pp/` | Production Order |

### Test Case ID Convention

Format: `TC_<MODULE>_<APP>_<NUMBER>`

| Module | App | Prefix | Example |
|--------|-----|--------|---------|
| MM | Purchase Order | TC_MM_PO_ | TC_MM_PO_001 |
| MM | Purchase Requisition | TC_MM_PR_ | TC_MM_PR_001 |
| MM | Goods Receipt | TC_MM_GR_ | TC_MM_GR_001 |
| SD | Sales Order | TC_SD_SO_ | TC_SD_SO_001 |
| SD | Billing Document | TC_SD_BD_ | TC_SD_BD_001 |
| FI | Journal Entry | TC_FI_JE_ | TC_FI_JE_001 |
| FI | Supplier Invoice | TC_FI_SI_ | TC_FI_SI_001 |
| PP | Production Order | TC_PP_PO_ | TC_PP_PO_001 |

---

## POM Layer Architecture

```
Test Spec (mm-purchase-order.spec.js)
    ↓ uses
Fixtures (purchase-order.fixtures.js)
    ↓ provides
Page Object (purchase-order.page.js)
    ↓ uses
Locators (purchase-order.locators.js)  ←── Generated from exploration-data/
    ↓ resolved by
Locator Helper (locator-helper.js)
    ↓ resolves to
Playwright Locator → Browser Element
```

### Common Layer
Shared across all modules:
- **sap-login.page.js** — SAP authentication
- **fiori-launchpad.page.js** — Launchpad navigation, tile clicks, app search
- **sap-shell.page.js** — Shell bar interactions
- **sap-table.helper.js** — Table row/cell interactions
- **sap-dialog.helper.js** — Dialog confirm/dismiss
- **sap-message.helper.js** — Toast, strip, popover messages

### Utility Layer
- **locator-helper.js** — Multi-strategy locator resolution with SAP UI5 support
- **sap-ui5-helper.js** — UI5 ready waits, busy indicator waits, Fiori app navigation
- **logger.js** — Structured logging for test steps
- **self-healer.js** — Automatic fallback locators with healing reports

---

## Exploration-Driven Locator Generation

### Why Exploration First?
SAP Fiori apps use dynamically generated IDs (`__xmlview0--inputField`) that change across views and sessions. Manual locator guessing is unreliable. Instead:

1. **Explore** the actual SAP app with MCP browser tools
2. **Capture** the accessibility tree (roles, labels, IDs)
3. **Generate** locators from real data, not assumptions

### Exploration Data Flow
```
MCP browser_snapshot
    ↓
exploration-data/snapshots/<module>-<app>.json
    ↓ extract
exploration-data/selectors/<module>-<app>.selectors.json
    ↓ generate
automation/pages/<module>/<app>/<app>.locators.js
```

### Locator Strategy Priority
1. **role + name** — Most stable (e.g., `getByRole('button', { name: 'Save' })`)
2. **label** — SAP UI5 form labels are reliable
3. **sap-id (partial)** — `[id*="supplierInput"]` strips dynamic prefix
4. **css** — Structural selectors as fallback
5. **xpath** — Last resort

---

## SAP-Specific Automation Considerations

### Wait Strategies
- **Never use `networkidle`** — SAP maintains persistent OData connections
- **Always use `domcontentloaded`** + `waitForUI5Ready()` + `waitForBusyIndicator()`
- **Tab after fill** — SAP input fields trigger server-side validation on blur/tab

### Timeouts
- Navigation: **90 seconds** (SAP pages load OData metadata + data)
- Actions: **30 seconds** (save, post, approve trigger backend processing)
- Assertions: **15 seconds** (wait for UI updates after actions)

### Session Management
- **Single worker** — SAP sessions conflict in parallel
- **Persistent login** — Reuse authenticated session across tests in a describe block
- **Session timeout** — SAP sessions expire; handle re-login in fixtures

### Error Handling
- **MessageToast** — Transient success/info messages (auto-dismiss after ~3s)
- **MessageStrip** — Persistent banner messages (success, error, warning)
- **MessagePopover** — Button in footer bar showing multiple messages
- **MessageBox** — Modal dialogs for errors/confirmations

---

## Workflow Summary

### End-to-End Process
1. **Write requirements** → `requirements/<module>-<app>.txt`
2. **Generate test cases** → `testcases/<module>-<app>-testcases.md`
3. **Explore SAP app** with MCP → `exploration-data/snapshots/` + `exploration-data/selectors/`
4. **Generate automation scripts** → `automation/pages/`, `automation/tests/`, `automation/test-data/`
5. **Execute tests** → `npm test` or per-module
6. **Review reports** → `automation/config/test-results/reports/<timestamp>/`
7. **Maintain** — Re-explore when UI changes, update locators

### Parallel Workflows
- **Workflow A**: Test Cases → Spec files (test logic)
- **Workflow B**: MCP Exploration → Locator files (element selectors)
- **Combined**: Specs + Locators → Executable tests
