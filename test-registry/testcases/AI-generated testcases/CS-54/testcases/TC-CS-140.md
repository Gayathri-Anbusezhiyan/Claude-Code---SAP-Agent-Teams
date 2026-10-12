# TC-CS-140: Run MRP with Live Sales Orders from SD and Current Stock from MM

**User Story:**          [CS-54] User Story PP-005
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control (PP)
**Feature:**             MRP Cross-Module Integration (PP-SD-MM)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to execute MRP runs and view Stock/Requirements List |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and is configured for MRP planning in PP module |
| P4 | Master Data | Material `{TD.materialNumber}` has sales data maintained in SD module (sales organization, distribution channel) |
| P5 | Master Data | Plant `{TD.plant}` is active and configured for MRP processing, inventory management (MM), and sales (SD) |
| P6 | Transactional Data (SD) | One or more sales orders exist in SAP SD module for material `{TD.materialNumber}` with open order quantities |
| P7 | Transactional Data (MM) | Current stock level for material `{TD.materialNumber}` at plant `{TD.plant}` exists in SAP MM module (MARD table) |
| P8 | Transactional Data (MM) | Current stock level is below the total open sales order quantities, creating net requirements |
| P9 | Configuration | SD and MM modules are integrated with PP module for MRP processing |

---

### Test Data

**Dataset Reference:** `testdata/CS-54/CS-54-testdata.json` — Dataset ID: `TD-CS-054-INT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Finished product material number — entered by the user | Valid |
| Material Description | `{TD.materialDesc}` | Material description — verified in results | Auto-populated |
| Plant | `{TD.plant}` | Production plant code — entered by the user | Valid |
| MRP Controller | `{TD.mrpController}` | MRP controller code — entered by the user | Valid |
| Planning Mode | `{TD.planningMode}` | Planning mode selection — selected by the user | Valid |
| Sales Order Number | `{TD.salesOrderNumber}` | Existing sales order number from SD module — verified in Stock/Requirements List | Valid (SD) |
| Sales Order Quantity | `{TD.salesOrderQuantity}` | Open quantity in the sales order — verified in results | Valid (SD) |
| Customer | `{TD.customer}` | Customer ID from the sales order — verified in results | Valid (SD) |
| Current Stock Level MM | `{TD.currentStockMM}` | Current stock level from MM module (MARD) — verified in results | Valid (MM) |
| Total Sales Demand | `{TD.totalSalesDemand}` | Total demand from all open sales orders — verified in results | Auto-populated (SD) |
| Net Requirements Calculated | `{TD.netRequirementsCalc}` | Calculated net requirements (sales demand - current stock) — verified in results | Auto-populated |
| Planned Order Quantity | `{TD.plannedOrderQuantity}` | Expected planned order quantity to cover net requirements — verified in results | Auto-populated |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page with application tiles is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Stock/Requirements List" | — | Search results appear listing the "Stock/Requirements List" application |
| 8 | Click the "Stock/Requirements List" application name from the search results | — | Stock/Requirements List application opens with search criteria fields displayed |
| 9 | In the "Material" field, enter the material number | `{TD.materialNumber}` | Material number value is entered into the field |
| 10 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is displayed |
| 11 | In the "Plant" field, enter the plant code | `{TD.plant}` | Plant code value is entered into the field |
| 12 | Press Enter to confirm the Plant entry | — | SAP validates the plant code |
| 13 | In the "MRP Controller" field, enter the MRP controller code | `{TD.mrpController}` | MRP controller code value is entered into the field |
| 14 | Press Enter to confirm the MRP Controller entry | — | SAP validates the MRP controller code |
| 15 | In the "Planning Mode" dropdown, select the planning mode | `{TD.planningMode}` | Planning mode is selected |
| 16 | Click the "Run MRP" or "Execute" button to initiate the MRP run | — | SAP begins MRP processing with cross-module data retrieval; a progress indicator is displayed |
| 17 | Wait for MRP processing to complete | — | MRP execution completes; results screen is displayed |
| 18 | Verify that the Stock/Requirements List displays the material number | `{TD.materialNumber}` | Material number is visible in the results header |
| 19 | Verify that the current stock level from MM module is displayed | `{TD.currentStockMM}` | Current available stock quantity from MM module is shown in the stock overview section |
| 20 | Verify that sales orders from SD module are displayed in the requirements section | `{TD.salesOrderNumber}`, `{TD.salesOrderQuantity}` | Sales order entries are visible with order numbers, quantities, and customer information from SD module |
| 21 | Verify that the customer ID is displayed in the sales order row | `{TD.customer}` | Customer ID from the SD sales order is shown in the requirements list |
| 22 | Verify that the total sales demand is calculated from all open sales orders | `{TD.totalSalesDemand}` | Total demand from SD sales orders is aggregated and displayed |
| 23 | Verify that net requirements are calculated correctly | `{TD.netRequirementsCalc}` | Net requirements row shows the calculated demand (total sales demand from SD - current stock from MM) |
| 24 | Verify that the net requirements calculation reflects cross-module integration | — | Net requirements calculation correctly uses SD sales order data as demand input and MM stock data as supply input |
| 25 | Verify that one or more planned orders have been generated to cover net requirements | — | Planned order entries are visible in the Stock/Requirements List |
| 26 | Select or expand a generated planned order entry | — | Planned order details are displayed |
| 27 | Verify the planned order quantity | `{TD.plannedOrderQuantity}` | Planned order quantity covers the net requirements calculated from SD and MM data |
| 28 | Verify that the planned order is linked to the sales orders driving the demand | `{TD.salesOrderNumber}` | Planned order is associated with or references the sales order(s) that created the demand |
| 29 | Verify that the Stock/Requirements List shows a complete integration view | — | Stock/Requirements List displays current stock (MM), sales orders (SD), and planned orders (PP) in a unified view |
| 30 | Note the planned order number(s) generated | — | One or more planned order numbers are displayed (10-digit SAP-generated numbers) |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- MRP run completes successfully with cross-module integration between PP, SD, and MM modules
- Current stock level from MM module is correctly retrieved and displayed
- Sales orders from SD module are correctly retrieved and displayed as demand sources
- Net requirements are accurately calculated as: (Total SD sales demand) - (Current MM stock) = Net requirements
- Planned orders are generated in PP module to cover the net requirements
- Stock/Requirements List displays an integrated view showing stock (MM), sales orders (SD), and planned orders (PP)
- Cross-module integration ensures accurate MRP calculation based on real sales demand and inventory data

---

### Post-conditions

- Planned orders exist in SAP PP module covering the net requirements
- Planned orders are linked to the sales orders from SD module that created the demand
- Stock/Requirements List reflects the integrated data from PP, SD, and MM modules
- No application-level errors or integration errors remain outstanding

---

### Actual Result

_[To be completed during test execution]_

---

### Execution Status

- [ ] Pass
- [ ] Fail — see Defects section
- [ ] Blocked — state reason below
- [ ] Not Executed — state reason below

---

### Defects / Observations

_[Record defect IDs, unexpected behaviours, or environment issues encountered during execution]_

---
