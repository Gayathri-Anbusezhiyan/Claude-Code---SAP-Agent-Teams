# TC-CS-182: Confirm Operation in Shop Floor Execution and Verify Capacity Load Updated in Capacity Planning

**User Story:**          [CS-61] View A Capacity Planning Overview For Cleanroom/Sterile Manufacturing
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Cross-Module Integration — Shop Floor Execution to Capacity Planning
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Operator or Production Supervisor with SAP authorization to confirm operations in Shop Floor Execution and Production Planner authorization to view capacity planning data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.workCenterId}` exists, is active, and configured for cleanroom/sterile manufacturing with validated capacity |
| P4 | Master Data | Process order `{TD.processOrderId}` exists, is released, and is scheduled to Work Center `{TD.workCenterId}` with operation `{TD.operationNumber}` in planned status |
| P5 | Authorization | User has authorization to confirm operations in Shop Floor Execution (authorization object PP_ORDER with activity "Confirm" or similar) and to view capacity planning data |
| P6 | Configuration | Shop Floor Execution app is configured and accessible; Capacity Planning app is configured to reflect real-time or near-real-time updates of confirmed operations |

---

### Test Data

**Dataset Reference:** `testdata/CS-61/CS-61-testdata.json` — Dataset ID: `TD-CS-061-INT-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID | `{TD.workCenterId}` | Cleanroom/sterile work center ID — entered or selected by the user | Valid |
| Time Period | `{TD.timePeriod}` | Planning horizon (date range or period) — selected by the user | Valid |
| Process Order ID | `{TD.processOrderId}` | Process order with operation to be confirmed — user selects this from shop floor execution | Valid |
| Operation Number | `{TD.operationNumber}` | Operation number to be confirmed — user selects this from the process order operations list | Valid |
| Planned Load (Before Confirmation) | `{TD.plannedLoadBefore}` | Planned load (hours) from scheduled operations before confirmation — system displays this value | Valid |
| Confirmed Load (After Confirmation) | `{TD.confirmedLoadAfter}` | Confirmed load (hours) after operation confirmation — system calculates and displays this value | Valid |
| Confirmation Quantity | `{TD.confirmationQuantity}` | Quantity confirmed for the operation — entered by the user | Valid |
| Confirmation Date | `{TD.confirmationDate}` | Date and time of operation confirmation — entered or defaulted by the system | Valid |

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
| 13 | Verify the planned load value before operation confirmation | `{TD.plannedLoadBefore}` | Planned Load field shows the planned load value (e.g., 80 hours) |
| 14 | Verify the confirmed load value before operation confirmation | — | Confirmed Load field shows the current confirmed load value (e.g., 40 hours) before the new confirmation |
| 15 | Locate the process order in the capacity load view | `{TD.processOrderId}` | Process order is visible in the capacity timeline or list view with planned operations |
| 16 | Navigate back to the Fiori Launchpad home page | — | Fiori Launchpad home page is displayed |
| 17 | Click the search icon (top-right shell bar) and type "Shop Floor Execution" or "Confirm Operations" | — | Search results appear listing the Shop Floor Execution or Confirm Operations application |
| 18 | Click the "Shop Floor Execution" or "Confirm Operations" application name from the search results | — | Shop Floor Execution application opens with the operations list or worklist |
| 19 | In the filter/search field, enter the process order number to locate the process order | `{TD.processOrderId}` | Process order filter field is populated with the process order number |
| 20 | Press Enter to apply the filter and load the process order operations | — | SAP filters the operations list and displays operations for the process order |
| 21 | Locate the operation to be confirmed | `{TD.operationNumber}` | Operation is visible in the operations list with status "Planned" or "In Process" |
| 22 | Click the operation row or the "Confirm" action button for the operation | `{TD.operationNumber}` | Operation confirmation dialog or form opens |
| 23 | In the "Confirmation Quantity" field, enter the confirmed quantity | `{TD.confirmationQuantity}` | Confirmation quantity is entered (e.g., quantity matching the planned quantity) |
| 24 | In the "Confirmation Date/Time" field, enter or accept the defaulted confirmation date and time | `{TD.confirmationDate}` | Confirmation date and time are populated (e.g., current date/time) |
| 25 | Click the "Confirm" or "Save" button to save the operation confirmation | — | SAP processes the operation confirmation |
| 26 | Observe the on-screen confirmation response | — | A success message is displayed indicating "Operation confirmed successfully" or similar confirmation text |
| 27 | Verify that the operation status is updated to "Confirmed" or "Completed" | `{TD.operationNumber}` | Operation status is displayed as "Confirmed" or "Completed" in the operations list |
| 28 | Navigate back to the Fiori Launchpad home page | — | Fiori Launchpad home page is displayed |
| 29 | Click the search icon (top-right shell bar) and type "Capacity Planning" or "Monitor Work Center Load" | — | Search results appear listing the Capacity Planning or Monitor Work Center Load application |
| 30 | Click the "Capacity Planning" or "Monitor Work Center Load" application name from the search results | — | Capacity Planning application opens with filter/selection screen |
| 31 | In the Work Center field, enter the Work Center ID | `{TD.workCenterId}` | Work Center ID is entered into the field |
| 32 | Press Enter to confirm the Work Center entry | — | SAP validates the work center; Work Center description is auto-populated |
| 33 | In the Period / Time Horizon field, select or enter the time period | `{TD.timePeriod}` | Time period is selected (e.g., current week, current month, or specific date range) |
| 34 | Click the "Go" or "Display" button to load the updated capacity overview | — | SAP processes the request and displays the capacity planning overview screen with updated load data |
| 35 | Verify that the confirmed load value is increased to reflect the confirmed operation | `{TD.confirmedLoadAfter}` | Confirmed Load field shows the updated confirmed load value (e.g., 48 hours) reflecting the newly confirmed operation (e.g., +8 hours) |
| 36 | Verify that the planned load value is decreased or recalculated after the operation confirmation | — | Planned Load field may show a reduced planned load (if the operation was moved from planned to confirmed status) or remains unchanged depending on SAP configuration |
| 37 | Verify that the capacity load chart or timeline reflects the updated confirmed load | — | Capacity load visualization shows the updated confirmed load in a distinct color or section (e.g., green for confirmed, blue for planned) |
| 38 | Locate the process order in the capacity load view and verify the operation status is reflected | `{TD.processOrderId}` | Process order displays the confirmed operation with updated status in the capacity detail view |
| 39 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 40 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 41 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The operation is successfully confirmed in Shop Floor Execution with the specified confirmation quantity and date
- A success confirmation message is displayed in Shop Floor Execution
- The confirmed load value in Capacity Planning is immediately or near-immediately updated to reflect the confirmed operation
- The capacity load chart visually displays the updated confirmed load
- Data consistency is maintained across Shop Floor Execution and Capacity Planning modules

---

### Post-conditions

- Operation `{TD.operationNumber}` for process order `{TD.processOrderId}` is confirmed in SAP with status "Confirmed" or "Completed"
- Confirmed load data for Work Center `{TD.workCenterId}` is updated and reflects the confirmed operation
- Capacity Planning displays the updated confirmed load value
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
