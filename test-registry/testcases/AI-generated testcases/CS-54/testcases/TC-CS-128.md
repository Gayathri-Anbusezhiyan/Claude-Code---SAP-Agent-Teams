# TC-CS-128: Run MRP with Multiple Materials and Sequence by Capacity

**User Story:**          [CS-54] User Story PP-005
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control (PP)
**Feature:**             MRP Multi-Material Capacity Sequencing
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to execute MRP runs for multiple materials and view capacity overview |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber1}` exists, is active, and is configured for MRP planning |
| P4 | Master Data | Material `{TD.materialNumber2}` exists, is active, and is configured for MRP planning |
| P5 | Master Data | Both materials share the same MRP controller `{TD.mrpController}` |
| P6 | Master Data | Both materials are assigned to the same plant `{TD.plant}` |
| P7 | Transactional Data | Net requirements exist for both materials creating demand for planned orders |
| P8 | Configuration | Work center capacity data is maintained with sufficient detail to show capacity utilization for multiple orders |
| P9 | Configuration | Routing or recipe data for both materials reference the same work center or production line |

---

### Test Data

**Dataset Reference:** `testdata/CS-54/CS-54-testdata.json` — Dataset ID: `TD-CS-054-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number 1 | `{TD.materialNumber1}` | First finished product material number — entered by the user | Valid |
| Material Description 1 | `{TD.materialDesc1}` | Material description for first material — verified in results | Auto-populated |
| Material Number 2 | `{TD.materialNumber2}` | Second finished product material number — entered by the user | Valid |
| Material Description 2 | `{TD.materialDesc2}` | Material description for second material — verified in results | Auto-populated |
| Plant | `{TD.plant}` | Production plant code — entered by the user | Valid |
| MRP Controller | `{TD.mrpController}` | MRP controller code for both materials — entered by the user | Valid |
| Planning Mode | `{TD.planningMode}` | Planning mode selection — selected by the user | Valid |
| Planned Order Quantity 1 | `{TD.plannedOrderQuantity1}` | Expected planned order quantity for material 1 — verified in results | Auto-populated |
| Planned Order Quantity 2 | `{TD.plannedOrderQuantity2}` | Expected planned order quantity for material 2 — verified in results | Auto-populated |
| Work Center | `{TD.workCenter}` | Work center shared by both materials — verified in capacity overview | Valid |
| Available Capacity | `{TD.availableCapacity}` | Available capacity in capacity overview — verified in results | Auto-populated |
| Capacity Utilization | `{TD.capacityUtilization}` | Capacity utilization percentage for the work center — verified in results | Auto-populated |

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
| 7 | Click the search icon (top-right shell bar) and type "Schedule MRP Runs" | — | Search results appear listing the "Schedule MRP Runs" application |
| 8 | Click the "Schedule MRP Runs" application name from the search results | — | Schedule MRP Runs application opens with selection criteria fields displayed |
| 9 | In the "MRP Controller" field, enter the MRP controller code | `{TD.mrpController}` | MRP controller code value is entered into the field |
| 10 | Press Enter to confirm the MRP Controller entry | — | SAP validates the MRP controller code |
| 11 | In the "Plant" field, enter the plant code | `{TD.plant}` | Plant code value is entered into the field |
| 12 | Press Enter to confirm the Plant entry | — | SAP validates the plant code |
| 13 | In the "Planning Mode" dropdown, select the planning mode | `{TD.planningMode}` | Planning mode is selected |
| 14 | Select the option to include multiple materials in the MRP run | — | Multi-material selection is enabled |
| 15 | Click the "Run MRP" or "Execute" button to initiate the MRP run for all materials under the MRP controller | — | SAP begins MRP processing for multiple materials; a progress indicator is displayed |
| 16 | Wait for MRP processing to complete | — | MRP execution completes; results screen or notification is displayed |
| 17 | Navigate to the "Stock/Requirements List" or "MRP Result" screen | — | MRP results screen is displayed showing planned orders for multiple materials |
| 18 | Verify that planned orders have been generated for material 1 | `{TD.materialNumber1}`, `{TD.materialDesc1}` | Planned order(s) for material 1 are visible in the results |
| 19 | Verify the planned order quantity for material 1 | `{TD.plannedOrderQuantity1}` | Planned order quantity for material 1 is displayed |
| 20 | Verify that planned orders have been generated for material 2 | `{TD.materialNumber2}`, `{TD.materialDesc2}` | Planned order(s) for material 2 are visible in the results |
| 21 | Verify the planned order quantity for material 2 | `{TD.plannedOrderQuantity2}` | Planned order quantity for material 2 is displayed |
| 22 | Navigate to the "Capacity Overview" or "Work Center Capacity" screen | — | Capacity overview screen is displayed |
| 23 | Filter or search for the shared work center | `{TD.workCenter}` | Work center capacity data is displayed |
| 24 | Verify that the capacity overview displays available capacity for the work center | `{TD.availableCapacity}` | Available capacity (e.g., hours or units) is shown for the work center |
| 25 | Verify that the capacity overview displays capacity utilization or load | `{TD.capacityUtilization}` | Capacity utilization percentage or loaded capacity is displayed |
| 26 | Verify that both planned orders are reflected in the capacity overview | `{TD.materialNumber1}`, `{TD.materialNumber2}` | Both materials' planned orders contribute to the capacity load calculation |
| 27 | Analyze the capacity overview to identify sequencing options | — | Capacity overview provides information on when each order can be scheduled based on available capacity |
| 28 | Note the planned order numbers for both materials | — | Planned order numbers for both materials are displayed |
| 29 | Verify that the planner can use the capacity overview to determine the optimal sequence for releasing orders | — | Capacity overview enables the planner to sequence orders to avoid capacity overload or conflicts |
| 30 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 31 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 32 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- MRP run completes successfully for multiple materials under MRP controller `{TD.mrpController}` at plant `{TD.plant}`
- Planned orders are generated for both material 1 and material 2 based on their respective net requirements
- Capacity overview displays capacity load information for the shared work center showing how both planned orders impact available capacity
- The planner can analyze the capacity overview to sequence the planned orders against available cleanroom/suite/work center capacity
- Capacity utilization data helps the planner avoid capacity overload and optimize production scheduling

---

### Post-conditions

- Planned orders exist in SAP for both material `{TD.materialNumber1}` and material `{TD.materialNumber2}`
- Planned orders are linked to plant `{TD.plant}` and MRP controller `{TD.mrpController}`
- Capacity overview reflects the capacity load from both planned orders
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
