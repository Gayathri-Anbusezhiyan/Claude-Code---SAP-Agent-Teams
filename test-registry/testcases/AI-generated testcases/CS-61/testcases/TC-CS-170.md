# TC-CS-170: View Capacity Load Including Cleaning/Changeover Time Between Different Products

**User Story:**          [CS-61] View A Capacity Planning Overview For Cleanroom/Sterile Manufacturing
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Changeover Time Inclusion in Capacity Planning
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
| P3 | Master Data | Work Center `{TD.workCenterId}` exists, is active, and configured for cleanroom/sterile manufacturing with validated capacity |
| P4 | Master Data | Two process orders `{TD.processOrderId1}` and `{TD.processOrderId2}` are created, released, and scheduled sequentially to Work Center `{TD.workCenterId}` for different products `{TD.materialId1}` and `{TD.materialId2}` |
| P5 | Configuration | Changeover/cleaning time matrix is configured in SAP for the work center; changeover time `{TD.changeoverTime}` is defined for transitions between different products |
| P6 | Configuration | Capacity Planning Fiori app is configured to display changeover time as part of total capacity load |

---

### Test Data

**Dataset Reference:** `testdata/CS-61/CS-61-testdata.json` — Dataset ID: `TD-CS-061-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID | `{TD.workCenterId}` | Cleanroom/sterile work center ID — entered or selected by the user | Valid |
| Time Period | `{TD.timePeriod}` | Planning horizon (date range or period) — selected by the user | Valid |
| Process Order 1 ID | `{TD.processOrderId1}` | First process order scheduled to the work center — system displays this in the load view | Valid |
| Material 1 ID | `{TD.materialId1}` | Material/product for process order 1 — system displays this | Valid |
| Process Order 2 ID | `{TD.processOrderId2}` | Second process order scheduled to the work center immediately after process order 1 — system displays this in the load view | Valid |
| Material 2 ID | `{TD.materialId2}` | Material/product for process order 2 (different from material 1) — system displays this | Valid |
| Changeover Time | `{TD.changeoverTime}` | Required cleaning/changeover time (hours) between process order 1 and process order 2 due to different products — system displays this value | Valid |
| Total Load | `{TD.totalLoad}` | Total load including process order durations and changeover time — system calculates and displays this value | Valid |

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
| 12 | Click the "Go" or "Display" button to load the capacity overview | — | SAP processes the request and displays the capacity planning overview screen with scheduled process orders |
| 13 | Locate the first process order in the capacity load view | `{TD.processOrderId1}` | Process order 1 is visible in the capacity timeline or list view with material `{TD.materialId1}` |
| 14 | Locate the second process order in the capacity load view | `{TD.processOrderId2}` | Process order 2 is visible in the capacity timeline or list view immediately following process order 1, with material `{TD.materialId2}` |
| 15 | Verify that the materials for the two process orders are different | `{TD.materialId1}`, `{TD.materialId2}` | Process order 1 shows material `{TD.materialId1}`; process order 2 shows material `{TD.materialId2}` (different products) |
| 16 | Verify that a changeover/cleaning time block is displayed between process order 1 and process order 2 | `{TD.changeoverTime}` | A changeover time block or entry is visible in the capacity timeline showing the required changeover duration (e.g., 2 hours) |
| 17 | Verify that the changeover time is labeled or identified as "Changeover", "Cleaning", "Setup", or similar | — | The changeover time block is clearly labeled with a descriptor indicating it is changeover/cleaning time (not production time) |
| 18 | Verify that the changeover time value matches the configured changeover time for the product transition | `{TD.changeoverTime}` | Changeover time duration displayed matches the expected configured changeover time (e.g., 2.0 hours) |
| 19 | Verify that the total capacity load includes the changeover time in addition to process order durations | `{TD.totalLoad}` | Total Load or Planned Load value includes process order 1 duration + changeover time + process order 2 duration |
| 20 | Verify that the capacity load chart or timeline visually displays the changeover time block between the two process orders | — | Capacity load visualization shows a distinct changeover time block positioned between process order 1 and process order 2 on the timeline |
| 21 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 22 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 23 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Capacity Planning overview screen successfully displays both process orders scheduled sequentially to the cleanroom/sterile work center
- A changeover/cleaning time block is clearly visible and displayed between process order 1 and process order 2
- The changeover time duration is correctly calculated based on the configured changeover matrix for the product transition
- The total capacity load includes the changeover time in addition to the process order durations
- The capacity load visualization clearly represents the changeover time block on the timeline

---

### Post-conditions

- No changes to SAP data — this is a read-only view operation
- Changeover time configuration remains active and is correctly applied in future capacity planning calculations
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
