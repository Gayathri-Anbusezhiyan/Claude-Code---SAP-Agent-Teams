# TC-CS-139: Planning Horizon - Minimum Future Period of 1 Day

**User Story:**          [CS-54] User Story PP-005
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control (PP)
**Feature:**             MRP Planning Horizon Boundary Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            LOW
**Severity:**            TRIVIAL
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to execute MRP runs |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and is configured for MRP planning |
| P4 | Master Data | Plant `{TD.plant}` is active and configured for MRP processing |
| P5 | Transactional Data | Net requirements exist for material `{TD.materialNumber}` within the next 1 day (minimum planning horizon) |

---

### Test Data

**Dataset Reference:** `testdata/CS-54/CS-54-testdata.json` — Dataset ID: `TD-CS-054-EDGE-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Finished product material number — entered by the user | Valid |
| Material Description | `{TD.materialDesc}` | Material description — verified in results | Auto-populated |
| Plant | `{TD.plant}` | Production plant code — entered by the user | Valid |
| MRP Controller | `{TD.mrpController}` | MRP controller code — entered by the user | Valid |
| Planning Mode | `{TD.planningMode}` | Planning mode selection — selected by the user | Valid |
| Planning Horizon From | `{TD.planningHorizonFromMin}` | Planning horizon start date (today or current date) — entered by the user | Valid (Boundary) |
| Planning Horizon To | `{TD.planningHorizonToMin}` | Planning horizon end date (1 day from start date) — entered by the user | Valid (Boundary) |
| Net Requirements | `{TD.netRequirements}` | Net requirements within the 1-day planning horizon — verified in results | Auto-populated |
| Planned Order Quantity | `{TD.plannedOrderQuantity}` | Expected planned order quantity — verified in results | Auto-populated |

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
| 16 | In the "Planning Horizon" date range, enter the start date (today or current date) | `{TD.planningHorizonFromMin}` | Planning horizon start date is entered (boundary: minimum future period) |
| 17 | In the "Planning Horizon" date range, enter the end date (1 day from start date) | `{TD.planningHorizonToMin}` | Planning horizon end date is entered (boundary: 1 day) |
| 18 | Click the "Run MRP" or "Execute" button to initiate the MRP run | — | SAP begins MRP processing; a progress indicator is displayed |
| 19 | Wait for MRP processing to complete | — | MRP execution completes; results screen is displayed |
| 20 | Verify that net requirements within the 1-day planning horizon are calculated | `{TD.netRequirements}` | Net requirements for the 1-day period are displayed |
| 21 | Verify that a planned order has been generated if requirements exist within the 1-day horizon | — | Planned order entry is visible in the Stock/Requirements List (if requirements exist within 1 day) |
| 22 | Verify the planned order quantity | `{TD.plannedOrderQuantity}` | Planned order quantity matches the net requirements for the 1-day period |
| 23 | Verify that the MRP calculation respects the 1-day planning horizon boundary | — | Only requirements within the 1-day period are considered; requirements beyond 1 day are excluded from the current MRP run |
| 24 | Verify that no error or warning messages are displayed regarding the planning horizon | — | 1-day planning horizon is accepted as valid (lower boundary case) |
| 25 | Note the planned order number (if generated) | — | Planned order number is displayed (10-digit SAP-generated number) |
| 26 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 27 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 28 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- MRP run completes successfully for material `{TD.materialNumber}` at plant `{TD.plant}` with a 1-day planning horizon
- Net requirements within the 1-day period are calculated and displayed
- Planned order is generated if requirements exist within the 1-day horizon
- The system correctly handles the lower boundary case where the planning horizon is set to the minimum future period (1 day)
- No error or warning messages are displayed; the 1-day planning horizon is accepted as valid

---

### Post-conditions

- Planned order exists in SAP (if requirements exist within 1 day)
- MRP calculation scope is limited to the 1-day planning horizon
- No application-level errors remain outstanding

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
