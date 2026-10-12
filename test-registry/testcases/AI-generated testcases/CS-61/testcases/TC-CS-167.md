# TC-CS-167: View Capacity Planning Overview with Planned and Confirmed Load Displayed

**User Story:**          [CS-61] View A Capacity Planning Overview For Cleanroom/Sterile Manufacturing
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Work Center Capacity Planning Overview
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to access Capacity Planning and view work center load data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.workCenterId}` exists, is active, and configured for cleanroom/sterile manufacturing with validated capacity `{TD.availableCapacity}` |
| P4 | Master Data | At least one process order `{TD.processOrderId}` is created, released, and scheduled to Work Center `{TD.workCenterId}` in the selected time period `{TD.timePeriod}` |
| P5 | Configuration | Capacity Planning Fiori app is configured and accessible to the user's role; work center load calculation is enabled and up-to-date |

---

### Test Data

**Dataset Reference:** `testdata/CS-61/CS-61-testdata.json` — Dataset ID: `TD-CS-061-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID | `{TD.workCenterId}` | Cleanroom/sterile work center ID — entered or selected by the user | Valid |
| Time Period | `{TD.timePeriod}` | Planning horizon (date range or period) — selected by the user | Valid |
| Process Order ID | `{TD.processOrderId}` | Process order scheduled to the work center — system displays this in the load view | Valid |
| Available Capacity | `{TD.availableCapacity}` | Total available capacity hours for the work center in the time period — system displays this value | Valid |
| Planned Load | `{TD.plannedLoad}` | Planned load (hours) from scheduled process orders — system calculates and displays this value | Valid |
| Confirmed Load | `{TD.confirmedLoad}` | Confirmed load (hours) from confirmed operations — system calculates and displays this value | Valid |
| Capacity Utilization | `{TD.capacityUtilization}` | Utilization percentage calculated by system (e.g., 75%) — system displays this value | Valid |

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
| 13 | Verify that the Available Capacity value is displayed for the selected work center and time period | `{TD.availableCapacity}` | Available Capacity field shows the expected capacity value (e.g., hours or units) |
| 14 | Verify that the Planned Load value is displayed on the capacity overview | `{TD.plannedLoad}` | Planned Load field shows the calculated planned load from scheduled process orders |
| 15 | Verify that the Confirmed Load value is displayed on the capacity overview | `{TD.confirmedLoad}` | Confirmed Load field shows the confirmed load from confirmed operations |
| 16 | Verify that the Capacity Utilization percentage is displayed | `{TD.capacityUtilization}` | Capacity Utilization field shows the calculated utilization percentage (e.g., 75%) |
| 17 | Verify that the capacity load chart or timeline is displayed with visual representation of load distribution | — | Capacity load is visualized in a bar chart, Gantt chart, or timeline format showing planned and confirmed load against available capacity |
| 18 | Verify that the process order(s) scheduled to this work center are listed in the load breakdown or detail view | `{TD.processOrderId}` | Process order number is visible in the capacity detail view with associated load values |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Capacity Planning overview screen is successfully displayed for the selected cleanroom/sterile work center and time period
- Available Capacity, Planned Load, and Confirmed Load values are correctly displayed and match the expected test data values
- Capacity Utilization percentage is correctly calculated and displayed
- Capacity load visualization (chart or timeline) is displayed with clear representation of load distribution
- Process orders scheduled to the work center are visible in the capacity breakdown

---

### Post-conditions

- No changes to SAP data — this is a read-only view operation
- Capacity planning data remains consistent with work center master data and process order schedules
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
