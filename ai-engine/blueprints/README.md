# Blueprints Index

This directory contains architectural blueprints and templates for the SAP S/4HANA Fiori test automation framework.

---

## Available Blueprints

### 1. POM-JavaScript-Blueprint.md
**Title:** SAP S/4HANA Fiori — Playwright POM Automation Blueprint (JavaScript)

**Purpose:**
Comprehensive blueprint for generating Playwright test scripts for SAP Fiori applications using the Page Object Model (POM) approach with Playwright MCP Server for exploration and locator recording. Uses JavaScript.

**Covers:**
- SAP module-based folder structure (MM, SD, FI, PP)
- SAP UI5 locator strategies (sap-id, role+name, label, partial ID matching)
- Fiori Launchpad and Shell page objects
- SAP table, dialog, and message helper patterns
- Fixtures with SAP authentication
- Test spec generation with SAP TC IDs
- SAP UI5 wait strategies (UI5 ready, busy indicators)
- Exploration data integration for locator generation

### 2. POM-Automation-Blueprint.md
**Title:** SAP S/4HANA Fiori — POM Automation Architecture Blueprint

**Purpose:**
High-level architectural blueprint covering the hybrid MCP + Playwright workflow, SAP module organization, TC ID conventions, POM layer architecture, and exploration-driven locator generation.

---

## Hybrid Workflow

```
Explore SAP App (MCP)
    ↓
Capture Snapshots → exploration-data/
    ↓
Generate Locators from snapshots
    ↓
Generate Page Objects + Test Specs
    ↓
Execute with Playwright
    ↓
Self-heal failed locators → Re-explore if needed
```

## Key Files Relationship

```
test-case (TC_MM_PO_001)
    ↓
    test spec (mm-purchase-order.spec.js)
        ↓ uses
    fixtures (purchase-order.fixtures.js)
        ↓ provides
    page object (purchase-order.page.js)
        ↓ uses
    locators (purchase-order.locators.js) ← exploration-data/
        ↓ resolved by
    locator-helper.js (SAP UI5 strategies)
        ↓
    actual SAP Fiori browser elements
```
