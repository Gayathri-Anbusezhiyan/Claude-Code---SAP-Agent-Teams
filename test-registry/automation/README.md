# SAP S/4HANA Fiori Test Automation Framework

Hybrid MCP + Playwright automation framework for SAP S/4HANA Fiori applications.

## Architecture

```
automation/
├── pages/
│   ├── common/          # Shared SAP Fiori components (login, launchpad, shell, helpers)
│   ├── mm/              # Materials Management (purchase-order, purchase-requisition, goods-receipt)
│   ├── sd/              # Sales & Distribution (sales-order, billing-document)
│   ├── fi/              # Finance (journal-entry, supplier-invoice)
│   └── pp/              # Production Planning (production-order)
├── tests/               # Playwright test specs (.spec.js)
├── test-data/           # Test data JSON files per module
├── exploration-data/    # MCP browser snapshots for locator generation
├── fixtures/            # Shared Playwright fixtures (authentication, test data)
├── utils/               # Utilities (locator-helper, sap-ui5-helper, logger, self-healer)
└── config/              # Playwright configuration
```

## Setup

```bash
npm install
```

Set environment variables:
```
SAP_BASE_URL=https://my429998.s4hana.cloud.sap
SAP_USERNAME=your_username
SAP_PASSWORD=your_password
SAP_CLIENT=100
```

## Running Tests

```bash
npm test                    # All tests
npm run test:login          # SAP login tests
npm run test:mm             # Materials Management tests
npm run test:sd             # Sales & Distribution tests
npm run test:fi             # Finance tests
npm run test:pp             # Production Planning tests
npm run test:tc -- "TC_ID"  # Specific test case
```

## Key Patterns

- **Page Object Model**: Each SAP app has locators.js + page.js + fixtures.js
- **Multi-strategy locators**: Primary + fallback selectors for resilience
- **SAP UI5 helpers**: Wait for UI5 ready, busy indicators, message toasts
- **Self-healing**: Automatic fallback when primary locators fail
- **Exploration-driven**: Locators generated from MCP browser snapshots
