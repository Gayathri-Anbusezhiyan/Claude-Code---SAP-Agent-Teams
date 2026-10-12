# TC-CS-173: Schedule Two Incompatible Products Back-to-Back Without Accounting for Required Changeover Time

**User Story:**          [CS-61] View A Capacity Planning Overview For Cleanroom/Sterile Manufacturing
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Changeover Time Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to access Capacity Planning, view work center load data, and schedule process orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.workCenterId}` exists, is active, and configured for cleanroom/sterile manufacturing with validated capacity |
| P4 | Master Data | Process order `{TD.processOrderId1}` exists, is released, and is scheduled to Work Center `{TD.workCenterId}` for material `{TD.materialId1}` with end time `{TD.processOrder1EndTime}` |
| P5 | Master Data | Process order `{TD.processOrderId2}` exists, is released, and is currently unscheduled; it is for material `{TD.materialId2}` (different product from material 1) |
| P6 | Configuration | Changeover/cleaning time matrix is configured in SAP for the work center; changeover time `{TD.requiredChangeoverTime}` is required for transitions between material 1 and material 2 |
| P7 | Configuration | Capacity Planning Fiori app is configured with changeover time validation enabled; system prevents or warns when scheduling actions violate changeover time requirements |

---

### Test Data

**Dataset Reference:** `testdata/CS-61/CS-61-testdata.json` — Dataset ID: `TD-CS-061-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID | `{TD.workCenterId}` | Cleanroom/sterile work center ID — entered or selected by the user | Valid |
| Time Period | `{TD.timePeriod}` | Planning horizon (date range or period) — selected by the user | Valid |
| Process Order 1 ID | `{TD.processOrderId1}` | First process order already scheduled to the work center — system displays this | Valid |
| Material 1 ID | `{TD.materialId1}` | Material/product for process order 1 — system displays this | Valid |
| Process Order 1 End Time | `{TD.processOrder1EndTime}` | End time of process order 1 — system displays this value | Valid |
| Process Order 2 ID | `{TD.processOrderId2}` | Second process order to be scheduled immediately after process order 1 (without changeover time) — user selects this from unscheduled orders | Valid |
| Material 2 ID | `{TD.materialId2}` | Material/product for process order 2 (different from material 1) — system displays this | Valid |
| Process Order 2 Start Time (Invalid) | `{TD.processOrder2StartTimeInvalid}` | Start time for process order 2 set to immediately after process order 1 end time (no gap for changeover) — entered by the user | Invalid |
| Required Changeover Time | `{TD.requiredChangeoverTime}` | Required cleaning/changeover time (hours) between material 1 and material 2 — system should enforce this requirement | Valid |

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
| 13 | Locate process order 1 in the capacity load view | `{TD.processOrderId1}` | Process order 1 is visible in the capacity timeline with material `{TD.materialId1}` and end time `{TD.processOrder1EndTime}` |
| 14 | Verify the end time of process order 1 | `{TD.processOrder1EndTime}` | Process order 1 end time is displayed (e.g., "2026-08-26 16:00") |
| 15 | Locate the unscheduled process order 2 to be scheduled | `{TD.processOrderId2}` | Unscheduled process order 2 is visible in the unscheduled orders list with material `{TD.materialId2}` |
| 16 | Verify that material 2 is different from material 1 | `{TD.materialId1}`, `{TD.materialId2}` | Process order 1 shows material `{TD.materialId1}`; process order 2 shows material `{TD.materialId2}` (different products requiring changeover) |
| 17 | Verify the required changeover time between material 1 and material 2 | `{TD.requiredChangeoverTime}` | Changeover time requirement is documented in the changeover matrix (e.g., 2 hours) |
| 18 | Select process order 2 to schedule it immediately after process order 1 | `{TD.processOrderId2}` | Process order 2 row is selected |
| 19 | Set the start time of process order 2 to immediately after process order 1 end time (no changeover time gap) | `{TD.processOrder2StartTimeInvalid}` | Start time of process order 2 is set to the same time as process order 1 end time (e.g., "2026-08-26 16:00") creating back-to-back scheduling without changeover time |
| 20 | Click the "Save" or "Confirm" button to apply the scheduling change | — | SAP processes the scheduling request and performs changeover time validation |
| 21 | Observe the system response | — | SAP displays an error message or warning indicating "Changeover time required between different products" or "Insufficient time for cleaning/changeover" or "Scheduled start time violates changeover requirements" |
| 22 | Verify that the error message identifies the work center, the two materials, and the missing changeover time | `{TD.workCenterId}`, `{TD.materialId1}`, `{TD.materialId2}`, `{TD.requiredChangeoverTime}` | Error message references the work center, the two materials requiring changeover, and the required changeover time (e.g., "2 hours changeover required between material `{TD.materialId1}` and material `{TD.materialId2}`") |
| 23 | Verify that process order 2 is NOT scheduled immediately after process order 1 without changeover time | `{TD.processOrderId2}` | Process order 2 remains in the unscheduled list or its start time is rejected; it is NOT scheduled back-to-back with process order 1 |
| 24 | Verify that the capacity load view does not show process order 2 scheduled without changeover time | — | Capacity timeline does not show process order 2 immediately following process order 1; no invalid back-to-back scheduling is created |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects the changeover time requirement violation and prevents process order 2 from being scheduled immediately after process order 1 without the required changeover time
- An error message or warning is displayed indicating "Changeover time required between different products" or "Insufficient time for cleaning/changeover"
- The error message identifies the work center, the two materials, and the required changeover time
- Process order 2 is NOT scheduled back-to-back with process order 1
- The capacity planning data integrity is maintained and changeover time requirements are enforced

---

### Post-conditions

- Process order `{TD.processOrderId2}` remains unscheduled or its invalid start time is rejected
- No invalid back-to-back scheduling is created without required changeover time
- Changeover time configuration and enforcement remain active
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
