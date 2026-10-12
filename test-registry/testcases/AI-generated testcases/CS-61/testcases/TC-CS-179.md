# TC-CS-179: Reschedule Process Order with Zero Changeover Time (Same Product Continuation)

**User Story:**          [CS-61] View A Capacity Planning Overview For Cleanroom/Sterile Manufacturing
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Changeover Time Boundary Value (Lower Boundary)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            LOW
**Severity:**            TRIVIAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to access Capacity Planning, view work center load data, and reschedule process orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.workCenterId}` exists, is active, and configured for cleanroom/sterile manufacturing with validated capacity |
| P4 | Master Data | Process order `{TD.processOrderId1}` exists, is released, and is scheduled to Work Center `{TD.workCenterId}` for material `{TD.materialId}` with end time `{TD.processOrder1EndTime}` |
| P5 | Master Data | Process order `{TD.processOrderId2}` exists, is released, and is scheduled to Work Center `{TD.workCenterId}` for the same material `{TD.materialId}` (same product continuation) |
| P6 | Configuration | Changeover/cleaning time matrix is configured in SAP for the work center; changeover time is zero (0) for transitions between the same material (same product continuation) |
| P7 | Configuration | Capacity Planning Fiori app is configured to display changeover time accurately; zero changeover time is correctly handled |

---

### Test Data

**Dataset Reference:** `testdata/CS-61/CS-61-testdata.json` — Dataset ID: `TD-CS-061-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID | `{TD.workCenterId}` | Cleanroom/sterile work center ID — entered or selected by the user | Valid |
| Time Period | `{TD.timePeriod}` | Planning horizon (date range or period) — selected by the user | Valid |
| Process Order 1 ID | `{TD.processOrderId1}` | First process order scheduled to the work center — system displays this | Valid |
| Material ID | `{TD.materialId}` | Material/product for both process orders (same product) — system displays this | Valid |
| Process Order 1 End Time | `{TD.processOrder1EndTime}` | End time of process order 1 — system displays this value | Valid |
| Process Order 2 ID | `{TD.processOrderId2}` | Second process order scheduled to the work center for the same material — user reschedules this | Valid |
| Process Order 2 Start Time | `{TD.processOrder2StartTime}` | Start time for process order 2 immediately after process order 1 (no changeover time gap) — entered by the user | Valid |
| Changeover Time | `{TD.changeoverTime}` | Required changeover time between the two process orders — zero (0) hours for same product — system displays this value | Valid (boundary: zero) |

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
| 13 | Locate process order 1 in the capacity load view | `{TD.processOrderId1}` | Process order 1 is visible in the capacity timeline with material `{TD.materialId}` and end time `{TD.processOrder1EndTime}` |
| 14 | Verify the material and end time of process order 1 | `{TD.materialId}`, `{TD.processOrder1EndTime}` | Process order 1 displays material `{TD.materialId}` and end time (e.g., "2026-08-26 16:00") |
| 15 | Locate process order 2 in the capacity load view | `{TD.processOrderId2}` | Process order 2 is visible in the capacity timeline or in an unscheduled state with the same material `{TD.materialId}` |
| 16 | Verify that both process orders are for the same material | `{TD.materialId}` | Process order 1 and process order 2 both show material `{TD.materialId}` (same product continuation) |
| 17 | Select process order 2 to reschedule it immediately after process order 1 | `{TD.processOrderId2}` | Process order 2 row is selected or a rescheduling dialog/form opens |
| 18 | Set the start time of process order 2 to immediately after process order 1 end time (no gap) | `{TD.processOrder2StartTime}` | Start time of process order 2 is set to the same time as process order 1 end time (e.g., "2026-08-26 16:00") |
| 19 | Click the "Save" or "Confirm" button to apply the rescheduling change | — | SAP processes the rescheduling request |
| 20 | Observe the system response | — | SAP accepts the rescheduling action and displays a success message indicating "Process order rescheduled successfully" (no changeover time error because changeover time is zero for same product) |
| 21 | Verify that process order 2 is successfully scheduled immediately after process order 1 | `{TD.processOrder2StartTime}` | Process order 2 is displayed in the capacity timeline with start time immediately following process order 1 end time |
| 22 | Verify that no changeover time block is displayed between process order 1 and process order 2 | `{TD.changeoverTime}` | No changeover time block is shown in the capacity timeline (changeover time is zero for same product continuation) |
| 23 | Verify that the total capacity load includes only the process order durations (no changeover time added) | — | Total Load or Planned Load value includes only process order 1 duration + process order 2 duration (no additional changeover time) |
| 24 | Verify that the capacity load chart or timeline displays the two process orders back-to-back without gap | — | Capacity load visualization shows process order 1 immediately followed by process order 2 with no gap or changeover block |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Process order 2 is successfully rescheduled immediately after process order 1 with zero changeover time (boundary value)
- A success confirmation message is displayed by SAP
- No changeover time block is displayed between the two process orders (changeover time is zero for same product continuation)
- The capacity load includes only the process order durations with no additional changeover time
- The capacity load chart displays the two process orders back-to-back without gap

---

### Post-conditions

- Process order `{TD.processOrderId2}` is scheduled immediately after process order `{TD.processOrderId1}` with start time `{TD.processOrder2StartTime}`
- No changeover time is allocated between the two process orders (zero changeover time for same product)
- Capacity load data for Work Center `{TD.workCenterId}` is updated and reflects the updated schedule
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
