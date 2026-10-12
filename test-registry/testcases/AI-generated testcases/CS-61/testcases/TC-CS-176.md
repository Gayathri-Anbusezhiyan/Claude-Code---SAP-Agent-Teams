# TC-CS-176: Attempt to Access Capacity Planning for Non-Existent Work Center

**User Story:**          [CS-61] View A Capacity Planning Overview For Cleanroom/Sterile Manufacturing
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Work Center Master Data Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to access Capacity Planning and view work center load data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.nonExistentWorkCenterId}` does NOT exist in SAP master data |
| P4 | Configuration | Capacity Planning Fiori app has work center validation enabled; system validates work center existence before displaying capacity data |

---

### Test Data

**Dataset Reference:** `testdata/CS-61/CS-61-testdata.json` — Dataset ID: `TD-CS-061-ERR-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Non-Existent Work Center ID | `{TD.nonExistentWorkCenterId}` | Work center ID that does not exist in SAP master data — entered by the user | Invalid |
| Time Period | `{TD.timePeriod}` | Planning horizon (date range or period) — selected by the user | Valid |

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
| 9 | In the Work Center field, enter the non-existent Work Center ID | `{TD.nonExistentWorkCenterId}` | Non-existent Work Center ID is entered into the field |
| 10 | Press Enter to confirm the Work Center entry | — | SAP validates the work center entry |
| 11 | Observe the system response after pressing Enter | — | SAP displays a field validation error or warning message indicating "Work center does not exist" or "Invalid work center" or "Work center not found in master data" |
| 12 | Verify that the Work Center field is highlighted as invalid | — | The Work Center field is highlighted with red color or error indicator showing validation failure |
| 13 | Verify that the Work Center description field remains empty (no auto-population) | — | Work Center description field is empty or displays a dash/blank value (no valid work center data is available) |
| 14 | In the Period / Time Horizon field, select or enter the time period | `{TD.timePeriod}` | Time period is selected (e.g., current week, current month, or specific date range) |
| 15 | Click the "Go" or "Display" button to attempt loading the capacity overview | — | SAP processes the request |
| 16 | Observe the system response after clicking Go | — | SAP displays an error message indicating "Work center does not exist" or "Invalid work center selection" or "No capacity data available for the selected work center" |
| 17 | Verify that no capacity planning overview data is displayed | — | The capacity planning overview screen remains empty or displays a "No data found" message; no capacity load, no process orders, no chart/timeline is shown |
| 18 | Verify that the error message provides clear guidance | — | Error message indicates the work center is invalid and suggests verifying the work center ID or selecting a valid work center from master data |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects the non-existent work center entry and prevents the capacity planning overview from displaying invalid data
- A field validation error or warning message is displayed indicating "Work center does not exist" or similar error
- The Work Center field is highlighted as invalid with a red color or error indicator
- No capacity planning overview data is displayed (no load data, no process orders, no chart)
- The error message provides clear guidance to the user to verify the work center ID

---

### Post-conditions

- No capacity planning data is displayed for the non-existent work center
- Work center master data validation rules remain enforced
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
