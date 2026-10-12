# TC-CS-177: View Capacity Planning at 100% Utilization (No Overload)

**User Story:**          [CS-61] View A Capacity Planning Overview For Cleanroom/Sterile Manufacturing
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Capacity Planning Boundary Value (Upper Boundary)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to access Capacity Planning and view work center load data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.workCenterId}` exists, is active, and configured for cleanroom/sterile manufacturing with validated capacity `{TD.availableCapacity}` |
| P4 | Master Data | Process orders are created, released, and scheduled to Work Center `{TD.workCenterId}` such that the total scheduled load `{TD.plannedLoad}` exactly equals available capacity `{TD.availableCapacity}`, resulting in 100% utilization |
| P5 | Configuration | Capacity Planning Fiori app is configured with capacity utilization calculation enabled; system displays utilization percentage accurately |

---

### Test Data

**Dataset Reference:** `testdata/CS-61/CS-61-testdata.json` — Dataset ID: `TD-CS-061-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID | `{TD.workCenterId}` | Cleanroom/sterile work center ID — entered or selected by the user | Valid |
| Time Period | `{TD.timePeriod}` | Planning horizon (date range or period) — selected by the user | Valid |
| Available Capacity | `{TD.availableCapacity}` | Total available capacity hours for the work center in the time period — system displays this value | Valid |
| Planned Load | `{TD.plannedLoad}` | Planned load (hours) from scheduled process orders exactly equal to available capacity — system calculates and displays this value | Valid (boundary) |
| Capacity Utilization | `{TD.capacityUtilization}` | Utilization percentage exactly 100% — system displays this value | Valid (boundary) |

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
| 14 | Verify that the Planned Load value equals the Available Capacity | `{TD.plannedLoad}` | Planned Load field shows a value exactly equal to Available Capacity (e.g., 160 hours) |
| 15 | Verify that the Capacity Utilization percentage is displayed as exactly 100% | `{TD.capacityUtilization}` | Capacity Utilization field shows exactly 100% (boundary value — full utilization with no overload) |
| 16 | Verify that no overload indicator or warning is displayed | — | No red color, warning icon, or overload alert is displayed (100% utilization is valid and does not constitute overload) |
| 17 | Verify that the capacity load chart or timeline displays the load at the 100% boundary | — | Capacity load visualization shows planned load exactly meeting (but not exceeding) the available capacity line or threshold |
| 18 | Verify that the work center row or capacity load cell is displayed with a neutral or success color (e.g., green or yellow) | — | Work center is displayed with a color indicating full utilization without overload (not red — red indicates overload >100%) |
| 19 | Verify that process orders scheduled to this work center are listed in the load breakdown with no errors | — | Process orders are visible in the capacity detail view with associated load values; no validation errors or warnings are shown |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Capacity Planning overview screen successfully displays the work center at exactly 100% utilization (boundary value)
- Planned Load equals Available Capacity; Capacity Utilization is exactly 100%
- No overload indicator or warning is displayed (100% is full utilization but not overload)
- The capacity load chart visually represents the load at the 100% boundary without exceeding capacity
- Process orders are correctly displayed with no validation errors

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
