# TC-CS-125: Run MRP and Generate Planned Orders for Finished Product Based on Demand and Stock

**User Story:**          [CS-54] User Story PP-005
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control (PP)
**Feature:**             MRP Run and Planned Order Generation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to execute MRP runs and view Stock/Requirements List |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and is configured as a finished product with MRP planning active (MRP Type not ND) |
| P4 | Master Data | Material `{TD.materialNumber}` has MRP controller `{TD.mrpController}` assigned in material master MRP 1 view |
| P5 | Master Data | Material `{TD.materialNumber}` has lot-sizing procedure configured with minimum lot size `{TD.minimumLotSize}` |
| P6 | Master Data | Plant `{TD.plant}` is active and configured for MRP processing |
| P7 | Transactional Data | Sales orders, forecasts, or demand data exist for material `{TD.materialNumber}` creating net requirements |
| P8 | Transactional Data | Current stock level for material `{TD.materialNumber}` at plant `{TD.plant}` is below net requirements, triggering planned order generation |
| P9 | Configuration | Work center capacity data is maintained for capacity overview calculations |

---

### Test Data

**Dataset Reference:** `testdata/CS-54/CS-54-testdata.json` — Dataset ID: `TD-CS-054-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Finished product material number configured for MRP — entered by the user | Valid |
| Plant | `{TD.plant}` | Production plant code — entered by the user | Valid |
| MRP Controller | `{TD.mrpController}` | MRP controller code — entered by the user | Valid |
| Planning Mode | `{TD.planningMode}` | Planning mode selection (1=Net change, 2=Regenerative, 3=Reorder point) — selected by the user | Valid |
| Processing Key | `{TD.processingKey}` | Processing key (NETCH, NEUPL, or combined) — selected by the user | Valid |
| Planning Horizon From | `{TD.planningHorizonFrom}` | Planning horizon start date — entered by the user | Valid |
| Planning Horizon To | `{TD.planningHorizonTo}` | Planning horizon end date — entered by the user | Valid |
| Material Description | `{TD.materialDesc}` | Material description — verified in results | Auto-populated |
| Current Stock Level | `{TD.currentStock}` | Current available stock — verified in Stock/Requirements List | Auto-populated |
| Net Requirements | `{TD.netRequirements}` | Calculated net requirements — verified in results | Auto-populated |
| Minimum Lot Size | `{TD.minimumLotSize}` | Minimum batch size from material master — verified in planned order quantity | Auto-populated |
| Planned Order Quantity | `{TD.plannedOrderQuantity}` | Expected planned order quantity — verified in results | Auto-populated |
| Planned Start Date | `{TD.plannedStartDate}` | MRP-calculated planned start date — verified in results | Auto-populated |
| Capacity Load | `{TD.capacityLoad}` | Capacity load percentage — verified in capacity overview | Auto-populated |

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
| 16 | In the "Processing Key" field, enter or select the processing key | `{TD.processingKey}` | Processing key is entered/selected |
| 17 | In the "Planning Horizon" date range, enter the start date | `{TD.planningHorizonFrom}` | Planning horizon start date is entered |
| 18 | In the "Planning Horizon" date range, enter the end date | `{TD.planningHorizonTo}` | Planning horizon end date is entered |
| 19 | Click the "Run MRP" or "Execute" button to initiate the MRP run | — | SAP begins MRP processing; a progress indicator is displayed |
| 20 | Wait for MRP processing to complete | — | MRP execution completes; results screen is displayed |
| 21 | Verify that the Stock/Requirements List displays the material number | `{TD.materialNumber}` | Material number is visible in the results header |
| 22 | Verify that the current stock level is displayed | `{TD.currentStock}` | Current available stock quantity is shown in the stock overview section |
| 23 | Verify that net requirements are calculated and displayed | `{TD.netRequirements}` | Net requirements row is visible showing the calculated demand |
| 24 | Verify that one or more planned orders have been generated | — | Planned order entries are visible in the Stock/Requirements List |
| 25 | Select or expand a generated planned order entry | — | Planned order details are displayed |
| 26 | Verify the planned order quantity meets or exceeds the minimum lot size | `{TD.plannedOrderQuantity}`, `{TD.minimumLotSize}` | Planned order quantity is equal to or greater than the minimum lot size configured in material master |
| 27 | Verify that the planned start date is calculated by MRP | `{TD.plannedStartDate}` | Planned start date is displayed (calculated based on lead time and requirements date) |
| 28 | Verify that the planned finish date is calculated by MRP | — | Planned finish date is displayed (calculated based on start date and production time) |
| 29 | Navigate to the "Capacity Overview" section or tab | — | Capacity overview section is displayed |
| 30 | Verify that the capacity overview displays capacity load information | `{TD.capacityLoad}` | Capacity load percentage or capacity utilization data is visible for the relevant work center(s) |
| 31 | Verify that the capacity overview helps identify available capacity for sequencing | — | Capacity overview shows available capacity vs. loaded capacity, enabling the planner to sequence orders |
| 32 | Note the planned order number(s) generated | — | One or more planned order numbers are displayed (10-digit SAP-generated numbers) |
| 33 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 34 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 35 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- MRP run completes successfully for material `{TD.materialNumber}` at plant `{TD.plant}`
- SAP generates one or more planned orders based on net requirements calculated from sales orders, forecasts, and current stock levels
- Planned order quantity accounts for the minimum batch size and lot-sizing rules configured in the material master
- Planned start and finish dates are calculated by the MRP engine
- Capacity overview displays capacity load information to help the planner sequence orders against available work center capacity
- Planned orders are persisted in SAP and are available for conversion to process orders or purchase requisitions

---

### Post-conditions

- One or more planned orders exist in SAP with status "Planned Order" (not yet converted)
- Planned orders are linked to material `{TD.materialNumber}`, plant `{TD.plant}`, and MRP controller `{TD.mrpController}`
- Net requirements are covered by the generated planned orders
- Stock/Requirements List reflects the planned orders in the planning result
- No application-level errors or critical warnings remain outstanding

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
