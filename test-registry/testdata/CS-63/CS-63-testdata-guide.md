# Test Data Guide: [CS-63] User Story PP-014

**Generated:**    2026-08-24
**Module:**       Production Planning and Control (PP)
**Feature:**      Component Reservation Management for Process Orders
**Data File:**    testdata/CS-63/CS-63-testdata.json

---

## How to Use This Guide

1. Open `testdata/CS-63/CS-63-testdata.json`
2. Find each `"{{PLACEHOLDER}}"` value
3. Replace it with the actual value from your SAP test system
4. Save the updated JSON — do NOT commit real SAP values to version control
5. The updated values are then substituted into test steps at execution time

---

## Placeholder Reference

### Material Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{MATERIAL_NUMBER_PP_COMPONENT}}` | A component material number used in BOM and reservations | SAP Fiori: Manage Material → search for materials with material type "ROH" (raw material) or "HALB" (semi-finished) configured for the test plant; or T-code MM60/MARA |
| `{{FINISHED_PRODUCT_MATERIAL_WITH_BOM}}` | A finished product material with an active BOM | SAP Fiori: Manage Material → search for finished goods (material type "FERT"); verify BOM exists via "Manage Bill of Materials" app |
| `{{FINISHED_PRODUCT_MATERIAL_NO_BOM}}` | A finished product material WITHOUT a BOM (for negative testing) | Create a material or use an existing material that has no BOM assigned in CS01/CS02; verify via "Display Bill of Materials" — should return "No BOM found" |
| `{{COMPONENT_MATERIAL_FROM_BOM}}` | Component material listed in the BOM of the finished product | Open the BOM for the finished product material (CS03); note the component material number from the BOM item list |
| `{{COMPONENT_MATERIAL_LOW_STOCK}}` | Component material with low available stock (for shortage warning tests) | Use a material with available stock less than 10 units; check stock via "Display Stock Overview" (MB52) |
| `{{COMPONENT_MATERIAL_BACKFLUSH}}` | Component material configured with backflush indicator | Material master plant data view → MRP 4 tab → check "Backflush" indicator is active; or T-code MM02/MM03 |
| `{{COMPONENT_MATERIAL_ADJUSTABLE}}` | Component material with an open reservation that can be modified | Any component material with an active reservation in "Open" status |
| `{{COMPONENT_MATERIAL_WITH_RESERVATION}}` | Component material with an existing active reservation | Check Stock/Requirements List (MD04) for materials with reservation entries |
| `{{COMPONENT_MATERIAL_SHARED}}` | Component material used in both production orders and sales orders | Use a material with both PP reservations and SD sales order allocations |
| `{{COMPONENT_MATERIAL_DYNAMIC_STOCK}}` | Component material with dynamic stock changes (for integration testing) | Any component material with active goods movements (goods receipts/issues) |

### Order Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{PLANNED_ORDER_NUMBER_VALID}}` | An existing planned order with status "Open" or "Released" | SAP Fiori: Manage Planned Orders (MD13) → search for planned orders with status not yet converted; note the 10-digit planned order number |
| `{{PLANNED_ORDER_NUMBER_NO_BOM}}` | A planned order for a material without a BOM (for error testing) | Create a planned order (MD11) for the material without a BOM; or use an existing planned order referencing a material with no BOM |
| `{{PROCESS_ORDER_NUMBER_RELEASED}}` | An existing process order with status "Released" (ready for confirmation) | SAP Fiori: Manage Process Orders (COR3) → search for process orders with status "REL" (Released); note the order number |
| `{{PROCESS_ORDER_NUMBER_CANCELLABLE}}` | A process order that can be cancelled (status "Created" or "Released", not yet confirmed) | Use a process order with no confirmations posted; status should be "Created" or "Released" |
| `{{PLANNED_ORDER_QUANTITY}}` | The order quantity from the planned order | Display the planned order (MD13) → note the "Order Quantity" field |
| `{{ORDER_QUANTITY_STANDARD}}` | A standard order quantity for the finished product | Use a realistic quantity for the finished product (e.g., 10, 100, or 1000 depending on production volume) |
| `{{YIELD_QUANTITY_CONFIRMED}}` | The confirmed yield quantity (finished product output) from a production confirmation | Enter a quantity equal to or less than the planned order quantity (e.g., if planned = 100, yield = 100 or 95) |

### Reservation Data

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{RESERVATION_NUMBER_EXISTING}}` | An existing reservation number in SAP | SAP Fiori: Display Reservation (MB23) → search for active reservations; note the 10-digit reservation number |
| `{{RESERVATION_NUMBER_OPEN}}` | A reservation with status "Open" (not yet withdrawn) | Use a reservation linked to a process order not yet confirmed; status should be "Open" |
| `{{RESERVATION_NUMBER_LINKED_TO_ORDER}}` | A reservation linked to a specific process order | Display the process order (COR3) → note the reservation number(s) from the components tab |
| `{{RESERVATION_QUANTITY_STANDARD}}` | A standard reservation quantity | Use the BOM-required quantity or a typical component consumption quantity (e.g., 10, 50, 100) |
| `{{RESERVATION_QUANTITY_MIN}}` | Minimum valid reservation quantity (lower boundary) | Use 0.001 for materials with 3-decimal UoM precision, or 1 for integer UoM (EA, PC) |
| `{{RESERVATION_QUANTITY_MAX}}` | Maximum valid reservation quantity (equal to planned quantity) | Use the planned order quantity as the maximum boundary |
| `{{RESERVED_QUANTITY_ACTIVE}}` | Total quantity currently reserved (across all active reservations) | Stock/Requirements List (MD04) → "Reserved Stock" column; sum all active reservations for the material |
| `{{ORIGINAL_RESERVED_QUANTITY}}` | Original reservation quantity before manual adjustment | Display the reservation (MB23) → note the current quantity before test execution |
| `{{ADJUSTED_RESERVED_QUANTITY}}` | New reservation quantity after manual adjustment | Choose a different quantity from the original (e.g., if original = 50, adjusted = 60) |

### Stock Data

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{PHYSICAL_STOCK_QUANTITY}}` | Total physical stock in the plant (unrestricted + quality inspection + blocked) | Stock Overview (MB52) → "Total Stock" column for the material and plant |
| `{{AVAILABLE_STOCK_LOW}}` | Available stock lower than required quantity (for shortage warning) | Use a value less than BOM-required quantity (e.g., required = 100, available = 50) |
| `{{AVAILABLE_STOCK_CALCULATED}}` | Calculated available stock (Physical - Reserved) | Calculate as: Physical Stock minus Reserved Quantity |
| `{{INITIAL_AVAILABLE_STOCK}}` | Available stock before goods issue/receipt (for integration testing) | Note the stock value before executing the integration test step |
| `{{UPDATED_AVAILABLE_STOCK_CALCULATED}}` | Expected available stock after goods issue/receipt | Calculate as: Initial Stock minus Goods Issue Quantity |

### Quantity and Date Boundaries

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{BOM_REQUIRED_QUANTITY}}` | Quantity of component required per BOM | Display BOM (CS03) → note the "Component Quantity" for the component material; multiply by order quantity if needed |
| `{{BOM_REQUIRED_QUANTITY_HIGH}}` | BOM-required quantity exceeding available stock | Use a quantity higher than available stock (e.g., if available = 50, required = 100) |
| `{{GOODS_ISSUE_QUANTITY}}` | Quantity of component consumed via goods issue | Typically equal to BOM-required quantity times yield quantity |
| `{{GOODS_ISSUE_QUANTITY_EXTERNAL}}` | Goods issue quantity posted outside the process order (for stock update testing) | Any quantity issued to a different cost center or order (e.g., 10, 20) |
| `{{DATE_CURRENT}}` | Current date (today) — earliest valid requirement date | Calculate as: execution date in YYYY-MM-DD format |
| `{{DATE_PLANNING_HORIZON_END}}` | End of planning horizon (furthest valid requirement date) | Typically 1–2 years from current date; check MRP planning horizon in plant parameters (OPPQ) or use: today + 365 days |
| `{{REQUIREMENT_DATE_FUTURE}}` | A future requirement date (at least 7 days from test execution) | Calculate as: today + 7 days (YYYY-MM-DD format) |
| `{{ORIGINAL_REQUIREMENT_DATE}}` | Original requirement date on the reservation before adjustment | Display the reservation (MB23) → note the "Requirement Date" before test execution |
| `{{ADJUSTED_REQUIREMENT_DATE}}` | New requirement date after manual adjustment | Choose a different future date from the original (e.g., if original = today + 10 days, adjusted = today + 20 days) |

### Organizational Structure

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{PLANT_CODE_PP}}` | Plant code configured for production planning | SAP Fiori: Configuration → Enterprise Structure → Plants; or T-code OX10; use a plant assigned to the production planning company code |

### Integration Test Data (Cross-Module)

| Placeholder | Description | How to Find the Value in SAP |
|-------------|-------------|------------------------------|
| `{{CUSTOMER_ID_VALID}}` | Customer master number for sales order integration test | SAP Fiori: Manage Customer Master (VD03) → search for active customers; note the customer number |
| `{{SALES_ORDER_QUANTITY}}` | Sales order quantity attempting to allocate the reserved component | Use a quantity equal to or exceeding available stock after reservation (e.g., if available after reservation = 20, sales order = 25) |

### Authorization Test Data (Negative Testing)

| Placeholder | Description | Value Guidance |
|-------------|-------------|----------------|
| `{{UNAUTHORIZED_USER_EMAIL}}` | Email/username of a user without Stock/Requirements List authorization | Create or identify a test user with a role that does NOT include authorization object M_MSEG_BWE or S_TCODE for MB23/MD04 |
| `{{UNAUTHORIZED_USER_PASSWORD}}` | Password for the unauthorized user | Password for the test user identified above |

---

## Environment Values (from .env — not in testdata.json)

| Variable | Usage in Tests |
|----------|---------------|
| `SAP_FIORI_URL` | Used as `{ENV.SAP_FIORI_URL}` in navigation step 1 of every test case. Set in `.env` file. Example: `https://my426318.s4hana.cloud.sap/ui?sap-language=en&help-autoStartTour=...` |
| `SAP_USERNAME` | Used as `{ENV.SAP_USERNAME}` in login step 2. Set in `.env` file. Example: `production.planner@company.com` |
| `SAP_PASSWORD` | Used as `{ENV.SAP_PASSWORD}` in login step 4. Set in `.env` file. |

---

## Important Notes

1. **Never commit real SAP IDs or credentials** to version control — the `{{PLACEHOLDER}}` values are intentionally generic
2. All test data preparation should be done in a **dedicated SAP test system** — never use production data
3. The `PLANNED_ORDER_NUMBER_NO_BOM` and `FINISHED_PRODUCT_MATERIAL_NO_BOM` values must reference materials that genuinely have no BOM in the test system
4. For **pharmaceutical production compliance**, use materials with "TEST" or "DEMO" prefixes; avoid production material numbers
5. **Reservation numbers** are system-generated — you cannot predict them; use existing reservation numbers found in the system for read/modify tests
6. **Process order numbers** are also system-generated; create test process orders before executing tests
7. For **shortage warning tests** (NEG-01, EDGE-05), manually adjust stock levels or reservation quantities to ensure required quantity exceeds available stock
8. For **integration tests** (INT-01, INT-02, INT-03), coordinate with MM (Materials Management) and SD (Sales & Distribution) test data setup
9. Refresh placeholder values whenever the SAP test system is refreshed from production or reconfigured
10. If a required master data object (BOM, material, planned order) does not exist in your test system, create it using the relevant SAP Fiori apps before executing tests

---

## Master Data Setup Checklist

Before executing CS-63 test cases, ensure the following master data exists in your SAP test system:

- [ ] At least 1 finished product material with an active BOM
- [ ] At least 3 component materials (for different test scenarios: normal stock, low stock, zero stock)
- [ ] At least 1 planned order in "Open" or "Released" status
- [ ] At least 1 process order in "Released" status (for backflush test)
- [ ] At least 1 active reservation linked to a process order
- [ ] At least 1 material configured with backflush indicator
- [ ] At least 1 unauthorized user (for authorization test)
- [ ] Plant, BOM, and MRP configuration active for the test plant
