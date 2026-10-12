# TC-CS-178: View Capacity Planning at 0% Utilization (Idle Work Center)

**User Story:**          [CS-61] View A Capacity Planning Overview For Cleanroom/Sterile Manufacturing
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Capacity Planning Boundary Value (Lower Boundary)
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
| P1 | User Role | User has the role of Production Planner with SAP authorization to access Capacity Planning and view work center load data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.workCenterId}` exists, is active, and configured for cleanroom/sterile manufacturing with validated capacity `{TD.availableCapacity}` |
| P4 | Master Data | No process orders are scheduled to Work Center `{TD.workCenterId}` in the selected time period `{TD.timePeriod}`, resulting in 0% utilization (idle work center) |
| P5 | Configuration | Capacity Planning Fiori app is configured with capacity utilization calculation enabled; system displays utilization percentage accurately including 0% |

---

### Test Data

**Dataset Reference:** `testdata/CS-61/CS-61-testdata.json` — Dataset ID: `TD-CS-061-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID | `{TD.workCenterId}` | Cleanroom/sterile work center ID — entered or selected by the user | Valid |
| Time Period | `{TD.timePeriod}` | Planning horizon (date range or period) with no scheduled process orders — selected by the user | Valid |
| Available Capacity | `{TD.availableCapacity}` | Total available capacity hours for the work center in the time period — system displays this value | Valid |
| Planned Load | `{TD.plannedLoad}` | Planned load (hours) from scheduled process orders — zero in this case — system displays this value | Valid (boundary: zero) |
| Capacity Utilization | `{TD.capacityUtilization}` | Utilization percentage exactly 0% — system displays this value | Valid (boundary: zero) |

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
| 7 | Click the search icon (top-right shell bar) and type "Capacity Planning" or "Monitor Work Center Load" | — | Search results appear listing the Capacity Planning or Monitor Work Center Load application |
| 8 | Click the "Capacity Planning" or "Monitor Work Center Load" application name from the search results | — | Capacity Planning application opens with filter/selection screen |
| 9 | In the Work Center field, enter the Work Center ID | `{TD.workCenterId}` | Work Center ID is entered into the field |
| 10 | Press Enter to confirm the Work Center entry | — | SAP validates the work center; Work Center description `{TD.workCenterDescription}` is auto-populated |
| 11 | In the Period / Time Horizon field, select or enter the time period | `{TD.timePeriod}` | Time period is selected (e.g., current week, current month, or specific date range) |
| 12 | Click the "Go" or "Display" button to load the capacity overview | — | SAP processes the request and displays the capacity planning overview screen |
| 13 | Verify that the Available Capacity value is displayed for the selected work center and time period | `{TD.availableCapacity}` | Available Capacity field shows the expected capacity value (e.g., 160 hours) |
| 14 | Verify that the Planned Load value is zero | `{TD.plannedLoad}` | Planned Load field shows 0 hours (no process orders scheduled) |
| 15 | Verify that the Confirmed Load value is zero | — | Confirmed Load field shows 0 hours (no operations confirmed) |
| 16 | Verify that the Capacity Utilization percentage is displayed as exactly 0% | `{TD.capacityUtilization}` | Capacity Utilization field shows exactly 0% (boundary value — idle work center with no load) |
| 17 | Verify that the capacity load chart or timeline displays an empty or zero-load state | — | Capacity load visualization shows no load bars or blocks; the timeline is empty or shows available capacity with no scheduled work |
| 18 | Verify that no process orders are listed in the load breakdown or detail view | — | Process order list is empty or displays a "No process orders scheduled" message |
| 19 | Verify that the work center row is displayed with a neutral color indicating idle state | — | Work center is displayed with a color indicating no utilization (e.g., white, gray, or light color — not red or yellow) |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Capacity Planning overview screen successfully displays the work center at exactly 0% utilization (boundary value — idle work center)
- Planned Load and Confirmed Load are both zero; Capacity Utilization is exactly 0%
- The capacity load chart displays an empty or zero-load state with no scheduled work
- No process orders are listed in the load breakdown
- The work center is displayed with a neutral color indicating idle state

---

### Post-conditions

- No changes to SAP data — this is a read-only view operation
- Capacity planning data remains consistent with work center master data (no scheduled process orders)
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
