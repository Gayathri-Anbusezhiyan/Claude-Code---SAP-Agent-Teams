# TC-CS-175: Attempt to Reschedule Process Order to a Work Center Without Capability for the Material

**User Story:**          [CS-61] View A Capacity Planning Overview For Cleanroom/Sterile Manufacturing
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Work Center Capability Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to access Capacity Planning, view work center load data, and reschedule process orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.workCenterId1}` exists, is active, and configured for cleanroom/sterile manufacturing with capability for material `{TD.materialId}` |
| P4 | Master Data | Work Center `{TD.workCenterId2}` exists, is active, but is NOT configured with capability for material `{TD.materialId}` (incompatible work center) |
| P5 | Master Data | Process order `{TD.processOrderId}` exists, is released, and is currently scheduled to Work Center `{TD.workCenterId1}` for material `{TD.materialId}` |
| P6 | Authorization | User has authorization object PP_ORDER with activity "Change" (02) to reschedule process orders |
| P7 | Configuration | Capacity Planning Fiori app has work center capability validation enabled; system prevents rescheduling to work centers without required capability |

---

### Test Data

**Dataset Reference:** `testdata/CS-61/CS-61-testdata.json` — Dataset ID: `TD-CS-061-ERR-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID 1 | `{TD.workCenterId1}` | Original work center with capability for the material — entered or selected by the user | Valid |
| Work Center ID 2 | `{TD.workCenterId2}` | Target work center WITHOUT capability for the material — entered by the user for rescheduling | Invalid |
| Time Period | `{TD.timePeriod}` | Planning horizon (date range or period) — selected by the user | Valid |
| Process Order ID | `{TD.processOrderId}` | Process order to be rescheduled to an incompatible work center — user selects this from capacity view | Valid |
| Material ID | `{TD.materialId}` | Material/product for the process order — system displays this value | Valid |

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
| 9 | In the Work Center field, enter the original Work Center ID | `{TD.workCenterId1}` | Work Center ID 1 is entered into the field |
| 10 | Press Enter to confirm the Work Center entry | — | SAP validates the work center; Work Center description is auto-populated |
| 11 | In the Period / Time Horizon field, select or enter the time period | `{TD.timePeriod}` | Time period is selected (e.g., current week, current month, or specific date range) |
| 12 | Click the "Go" or "Display" button to load the capacity overview | — | SAP processes the request and displays the capacity planning overview screen with scheduled process orders |
| 13 | Locate the process order in the capacity load view | `{TD.processOrderId}` | Process order is visible in the capacity timeline or list view for work center `{TD.workCenterId1}` with material `{TD.materialId}` |
| 14 | Verify the material for the process order | `{TD.materialId}` | Process order displays material `{TD.materialId}` |
| 15 | Select the process order row or click the "Reschedule" action button for the process order | `{TD.processOrderId}` | Process order row is selected or a rescheduling dialog/form opens |
| 16 | In the "Work Center" field, change the work center to the incompatible work center | `{TD.workCenterId2}` | Work Center ID 2 is entered or selected (work center without capability for the material) |
| 17 | Press Enter to confirm the new work center entry | — | Work center value is confirmed in the field |
| 18 | Click the "Save" or "Confirm" button to apply the rescheduling change | — | SAP processes the rescheduling request and performs work center capability validation |
| 19 | Observe the system response | — | SAP displays an error message or field validation error indicating "Work center does not have capability for material" or "Work center incompatible with material" or "Material cannot be processed at the selected work center" |
| 20 | Verify that the error message identifies the work center and material | `{TD.workCenterId2}`, `{TD.materialId}` | Error message references the incompatible work center `{TD.workCenterId2}` and the material `{TD.materialId}` |
| 21 | Verify that the Work Center field is highlighted as invalid | — | The Work Center field is highlighted with red color or error indicator showing validation failure |
| 22 | Verify that the rescheduling action is blocked and the process order work center remains unchanged | `{TD.workCenterId1}` | The process order work center remains unchanged at the original value `{TD.workCenterId1}`; the incompatible work center is rejected |
| 23 | Verify that the capacity load view does not show the process order rescheduled to the incompatible work center | — | Capacity timeline shows the process order at the original work center `{TD.workCenterId1}`; no change is applied |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects the work center capability mismatch and prevents the process order from being rescheduled to a work center without capability for the material
- An error message is displayed indicating "Work center does not have capability for material" or similar validation error
- The Work Center field is highlighted as invalid with a red color or error indicator
- The process order work center remains unchanged at the original compatible work center
- No rescheduling to an incompatible work center is allowed

---

### Post-conditions

- Process order `{TD.processOrderId}` work center remains unchanged at `{TD.workCenterId1}`
- No invalid rescheduling to an incompatible work center is created
- Work center capability validation rules remain enforced
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
