# TC-CS-174: Attempt to Reschedule Process Order to a Past Date

**User Story:**          [CS-61] View A Capacity Planning Overview For Cleanroom/Sterile Manufacturing
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Process Order Rescheduling Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to access Capacity Planning, view work center load data, and reschedule process orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.workCenterId}` exists, is active, and configured for cleanroom/sterile manufacturing with validated capacity |
| P4 | Master Data | Process order `{TD.processOrderId}` exists, is released, and is currently scheduled to Work Center `{TD.workCenterId}` with current start date `{TD.currentStartDate}` (future date) |
| P5 | Authorization | User has authorization object PP_ORDER with activity "Change" (02) to reschedule process orders |
| P6 | Configuration | Capacity Planning Fiori app has date validation enabled; system prevents rescheduling to past dates |

---

### Test Data

**Dataset Reference:** `testdata/CS-61/CS-61-testdata.json` — Dataset ID: `TD-CS-061-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID | `{TD.workCenterId}` | Cleanroom/sterile work center ID — entered or selected by the user | Valid |
| Time Period | `{TD.timePeriod}` | Planning horizon (date range or period) — selected by the user | Valid |
| Process Order ID | `{TD.processOrderId}` | Process order to be rescheduled — user selects this from capacity view | Valid |
| Current Start Date | `{TD.currentStartDate}` | Current start date/time of the process order before rescheduling (future date) — system displays this value | Valid |
| New Start Date (Past) | `{TD.newStartDatePast}` | New start date/time in the past (before current date) — entered by the user | Invalid |

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
| 14 | Verify the current start date of the process order | `{TD.currentStartDate}` | Current start date is displayed for the process order (e.g., "2026-08-30 08:00") |
| 15 | Select the process order row or click the "Reschedule" action button for the process order | `{TD.processOrderId}` | Process order row is selected or a rescheduling dialog/form opens |
| 16 | In the "New Start Date" field, enter a past date (before the current date) | `{TD.newStartDatePast}` | Past date is entered (e.g., "2026-08-20 08:00" when current date is "2026-08-24") |
| 17 | Press Enter to confirm the new start date entry or click outside the field | — | The Start Date field is populated with the past date value |
| 18 | Click the "Save" or "Confirm" button to apply the rescheduling change | — | SAP processes the rescheduling request and performs date validation |
| 19 | Observe the system response | — | SAP displays an error message or field validation error indicating "Start date cannot be in the past" or "Invalid start date: date must be in the future" or "Start date must be greater than or equal to current date" |
| 20 | Verify that the Start Date field is highlighted as invalid | — | The Start Date field is highlighted with red color or error indicator showing validation failure |
| 21 | Verify that the rescheduling action is blocked and the process order start date remains unchanged | `{TD.currentStartDate}` | The process order start date remains unchanged at the original value `{TD.currentStartDate}`; the past date is rejected |
| 22 | Verify that the capacity load view does not show the process order rescheduled to the past date | — | Capacity timeline shows the process order at the original start date; no change is applied |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects the invalid past date entry and prevents the process order from being rescheduled to a past date
- An error message is displayed indicating "Start date cannot be in the past" or similar validation error
- The Start Date field is highlighted as invalid with a red color or error indicator
- The process order start date remains unchanged at the original future date
- No rescheduling to a past date is allowed

---

### Post-conditions

- Process order `{TD.processOrderId}` start date remains unchanged at `{TD.currentStartDate}`
- No invalid past-dated schedule is created
- Date validation rules remain enforced
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
