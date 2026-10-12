# TC-CS-168: Identify Overload Situation Highlighted on Work Center Capacity View

**User Story:**          [CS-61] View A Capacity Planning Overview For Cleanroom/Sterile Manufacturing
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Work Center Capacity Overload Detection
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
| P4 | Master Data | Multiple process orders are created, released, and scheduled to Work Center `{TD.workCenterId}` such that the total scheduled load `{TD.plannedLoad}` exceeds available capacity `{TD.availableCapacity}`, creating an overload situation |
| P5 | Configuration | Capacity Planning Fiori app is configured with overload detection and alerting enabled; overload indicators are visible when capacity limits are exceeded |

---

### Test Data

**Dataset Reference:** `testdata/CS-61/CS-61-testdata.json` — Dataset ID: `TD-CS-061-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID | `{TD.workCenterId}` | Cleanroom/sterile work center ID — entered or selected by the user | Valid |
| Time Period | `{TD.timePeriod}` | Planning horizon (date range or period) — selected by the user | Valid |
| Available Capacity | `{TD.availableCapacity}` | Total available capacity hours for the work center in the time period — system displays this value | Valid |
| Planned Load | `{TD.plannedLoad}` | Planned load (hours) from scheduled process orders exceeding available capacity — system calculates and displays this value | Valid (overload) |
| Capacity Utilization | `{TD.capacityUtilization}` | Utilization percentage exceeding 100% (e.g., 120%) — system displays this value | Valid (overload) |
| Overload Indicator | `{TD.overloadIndicator}` | Visual indicator (red color, warning icon, or alert message) — system displays this when overload is detected | Valid |

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
| 14 | Verify that the Planned Load value exceeds the Available Capacity | `{TD.plannedLoad}` | Planned Load field shows a value greater than Available Capacity (e.g., 192 hours when capacity is 160 hours) |
| 15 | Verify that the Capacity Utilization percentage is displayed and exceeds 100% | `{TD.capacityUtilization}` | Capacity Utilization field shows a value greater than 100% (e.g., 120%) |
| 16 | Verify that the overload situation is visually highlighted | `{TD.overloadIndicator}` | The work center row or capacity load cell is highlighted with red color, a warning icon, or a visual alert indicator |
| 17 | Verify that the capacity load chart or timeline displays the overload visually | — | Capacity load visualization shows planned load exceeding the available capacity line or boundary (e.g., bar chart bar extends beyond capacity threshold) |
| 18 | Verify that an overload alert message or warning is displayed on the screen | — | A message or alert is displayed indicating "Capacity overload detected" or similar warning text |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Capacity Planning overview screen successfully displays the work center in an overload state
- Planned Load exceeds Available Capacity, and Capacity Utilization is greater than 100%
- The overload situation is clearly highlighted with visual indicators (red color, warning icon, or alert message)
- The capacity load chart visually represents the overload condition with planned load exceeding capacity threshold
- Production planner is able to immediately identify the overload situation and take corrective action (rescheduling, resequencing)

---

### Post-conditions

- No changes to SAP data — this is a read-only view operation
- Overload situation remains documented in the capacity planning view until corrective action is taken
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
