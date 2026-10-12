# TC-CS-169: Reschedule Process Order from Capacity Overview and Verify Updated Start Date

**User Story:**          [CS-61] View A Capacity Planning Overview For Cleanroom/Sterile Manufacturing
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Process Order Rescheduling from Capacity Planning
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
| P1 | User Role | User has the role of Production Planner with SAP authorization to access Capacity Planning, view work center load data, and reschedule process orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.workCenterId}` exists, is active, and configured for cleanroom/sterile manufacturing with validated capacity |
| P4 | Master Data | Process order `{TD.processOrderId}` exists, is released, and is currently scheduled to Work Center `{TD.workCenterId}` with current start date `{TD.currentStartDate}` |
| P5 | Authorization | User has authorization object PP_ORDER with activity "Change" (02) to reschedule process orders |
| P6 | Configuration | Capacity Planning Fiori app supports inline rescheduling actions; capacity load recalculation is enabled and immediate |

---

### Test Data

**Dataset Reference:** `testdata/CS-61/CS-61-testdata.json` — Dataset ID: `TD-CS-061-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID | `{TD.workCenterId}` | Cleanroom/sterile work center ID — entered or selected by the user | Valid |
| Time Period | `{TD.timePeriod}` | Planning horizon (date range or period) — selected by the user | Valid |
| Process Order ID | `{TD.processOrderId}` | Process order to be rescheduled — user selects this from capacity view | Valid |
| Current Start Date | `{TD.currentStartDate}` | Current start date/time of the process order before rescheduling — system displays this value | Valid |
| New Start Date | `{TD.newStartDate}` | New start date/time for the process order after rescheduling — entered by the user | Valid |
| Available Capacity (Before) | `{TD.availableCapacityBefore}` | Available capacity at current time slot before rescheduling — system displays this value | Valid |
| Available Capacity (After) | `{TD.availableCapacityAfter}` | Available capacity at new time slot after rescheduling — system displays this value | Valid |

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
| 13 | Locate the process order in the capacity load view | `{TD.processOrderId}` | Process order is visible in the capacity timeline or list view with current start date `{TD.currentStartDate}` |
| 14 | Verify the current start date of the process order | `{TD.currentStartDate}` | Current start date is displayed for the process order (e.g., "2026-08-26 08:00") |
| 15 | Select the process order row or click the "Reschedule" action button for the process order | `{TD.processOrderId}` | Process order row is selected or a rescheduling dialog/form opens |
| 16 | In the "New Start Date" field, enter the new start date/time | `{TD.newStartDate}` | New start date is entered (e.g., "2026-08-28 10:00") |
| 17 | Press Enter to confirm the new start date entry | — | New start date value is confirmed in the field |
| 18 | Click the "Save" or "Confirm" button to apply the rescheduling change | — | SAP processes the rescheduling request |
| 19 | Observe the on-screen confirmation response | — | A success message is displayed indicating "Process order rescheduled successfully" or similar confirmation text |
| 20 | Verify that the process order start date is updated to the new value in the capacity view | `{TD.newStartDate}` | Process order start date in the capacity timeline is updated to the new start date `{TD.newStartDate}` |
| 21 | Verify that the capacity load at the original time slot is reduced | `{TD.availableCapacityBefore}` | Available capacity at the original time slot shows increased available capacity (process order load removed) |
| 22 | Verify that the capacity load at the new time slot is increased | `{TD.availableCapacityAfter}` | Available capacity at the new time slot shows reduced available capacity (process order load added) |
| 23 | Verify that the capacity load chart or timeline reflects the updated schedule immediately | — | Capacity load visualization updates in real-time showing the process order at the new time slot |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The process order is successfully rescheduled from the original start date to the new start date
- A success confirmation message is displayed by SAP
- The capacity planning view is immediately updated to reflect the new schedule
- Capacity load at the original time slot is reduced; capacity load at the new time slot is increased
- The capacity load chart or timeline visually displays the updated process order schedule in real-time

---

### Post-conditions

- Process order `{TD.processOrderId}` start date is updated in SAP to `{TD.newStartDate}`
- Process order operations and material availability dates are recalculated based on the new start date
- Capacity load data for Work Center `{TD.workCenterId}` is updated and reflects the new schedule
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
