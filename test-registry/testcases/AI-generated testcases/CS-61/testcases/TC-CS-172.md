# TC-CS-172: Attempt to Schedule Process Order into Time Period with Insufficient Capacity (Overload)

**User Story:**          [CS-61] View A Capacity Planning Overview For Cleanroom/Sterile Manufacturing
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Capacity Overload Prevention
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
| P3 | Master Data | Work Center `{TD.workCenterId}` exists, is active, and configured for cleanroom/sterile manufacturing with validated capacity `{TD.availableCapacity}` |
| P4 | Master Data | Multiple process orders are already scheduled to Work Center `{TD.workCenterId}` such that available capacity in time period `{TD.timePeriod}` is nearly fully utilized (e.g., 95% utilization) |
| P5 | Master Data | Process order `{TD.processOrderId}` exists, is released, and is currently unscheduled or scheduled to a different time period; the duration of this process order `{TD.processOrderDuration}` exceeds the remaining available capacity in the target time period |
| P6 | Configuration | Capacity Planning Fiori app is configured with capacity overload validation enabled; system prevents or warns when scheduling actions create overload situations |

---

### Test Data

**Dataset Reference:** `testdata/CS-61/CS-61-testdata.json` — Dataset ID: `TD-CS-061-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID | `{TD.workCenterId}` | Cleanroom/sterile work center ID — entered or selected by the user | Valid |
| Time Period | `{TD.timePeriod}` | Target planning horizon with limited remaining capacity — selected by the user | Valid |
| Process Order ID | `{TD.processOrderId}` | Process order to be scheduled into the overload time period — user selects this from unscheduled orders | Valid |
| Process Order Duration | `{TD.processOrderDuration}` | Duration (hours) of the process order to be scheduled — system displays this value | Valid |
| Available Capacity | `{TD.availableCapacity}` | Total available capacity (hours) in the target time period — system displays this value | Valid |
| Remaining Capacity | `{TD.remainingCapacity}` | Remaining available capacity (hours) in the target time period after existing scheduled orders — system calculates and displays this value | Valid (insufficient) |

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
| 13 | Verify the available capacity for the selected work center and time period | `{TD.availableCapacity}` | Available Capacity field shows the total capacity value (e.g., 160 hours) |
| 14 | Verify the remaining available capacity after existing scheduled orders | `{TD.remainingCapacity}` | Remaining Capacity field shows a small remaining capacity value (e.g., 8 hours) indicating near-full utilization |
| 15 | Locate the unscheduled process order to be scheduled | `{TD.processOrderId}` | Unscheduled process order is visible in the unscheduled orders list or in a different time period |
| 16 | Verify the duration of the process order to be scheduled | `{TD.processOrderDuration}` | Process order duration is displayed (e.g., 20 hours) and exceeds the remaining capacity (e.g., 8 hours) |
| 17 | Select the process order to schedule it to the target time period | `{TD.processOrderId}` | Process order row is selected |
| 18 | Drag the process order to the target time period or click the "Schedule" action button to assign it to the target time period | `{TD.timePeriod}` | A scheduling dialog or action is triggered; user attempts to assign the process order to the overload time period |
| 19 | Click the "Save" or "Confirm" button to apply the scheduling change | — | SAP processes the scheduling request and performs capacity validation |
| 20 | Observe the system response | — | SAP displays an error message or warning indicating "Capacity overload detected" or "Insufficient capacity in the selected time period" or "Scheduled load exceeds available capacity" |
| 21 | Verify that the error message identifies the work center and time period with insufficient capacity | `{TD.workCenterId}`, `{TD.timePeriod}` | Error message references the work center and time period where capacity is insufficient |
| 22 | Verify that the error message indicates the capacity shortfall | `{TD.processOrderDuration}`, `{TD.remainingCapacity}` | Error message indicates the required capacity (e.g., 20 hours) exceeds the remaining capacity (e.g., 8 hours) with shortfall (e.g., 12 hours) |
| 23 | Verify that the process order is NOT scheduled to the target time period | `{TD.processOrderId}` | Process order remains in the unscheduled list or in its original time period; it is NOT added to the overload time period |
| 24 | Verify that the capacity load in the target time period remains unchanged | — | Capacity load in the target time period is unchanged; no overload is created |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects the capacity overload situation and prevents the process order from being scheduled to the time period with insufficient capacity
- An error message or warning is displayed indicating "Capacity overload detected" or "Insufficient capacity in the selected time period"
- The error message identifies the work center, time period, and capacity shortfall
- The process order is NOT scheduled to the overload time period
- The capacity load in the target time period remains unchanged and does not exceed available capacity

---

### Post-conditions

- Process order `{TD.processOrderId}` remains unscheduled or in its original time period
- No capacity overload is created in the target time period
- Capacity planning data integrity is maintained
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
