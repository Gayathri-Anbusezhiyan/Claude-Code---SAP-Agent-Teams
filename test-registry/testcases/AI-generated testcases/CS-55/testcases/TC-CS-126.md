# TC-CS-126: View trend report showing deviation frequency by material, operation, and root cause

**User Story:**          [CS-55] Record A Deviation Directly Against An In-Process Control Result That
**Epic:**                N/A — no epic assigned
**Module:**              PP — Production Planning & QM — Quality Management
**Feature:**             Quality Deviation Trend Reporting
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to view Quality Notification reports (QM03) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Historical Deviation Data | Multiple Quality Notifications (Deviations) exist in the SAP system with different materials, operations, and root cause categories to enable meaningful trend analysis |
| P4 | Reporting Module | Quality Management Analytics / Trend Reporting module is configured and accessible |

---

### Test Data

**Dataset Reference:** `testdata/CS-55/CS-55-testdata.json` — Dataset ID: `TD-CS-055-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Filter (Optional) | `{TD.materialFilterOptional}` | Material number for filtering trend report (optional) | Valid |
| Operation Filter (Optional) | `{TD.operationFilterOptional}` | Operation number for filtering trend report (optional) | Valid |
| Root Cause Filter (Optional) | `{TD.rootCauseFilterOptional}` | Root cause code for filtering trend report (optional) | Valid |
| Date Range From | `{TD.dateRangeFrom}` | Start date for trend report period | Valid |
| Date Range To | `{TD.dateRangeTo}` | End date for trend report period | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Quality Deviation Trend Report" or "Quality Notification Analytics" | — | Search results appear listing the trend report application |
| 8 | Click the "Quality Deviation Trend Report" or equivalent application from the search results | — | Trend report application opens showing the filter/selection criteria screen |
| 9 | In the Date Range filter, select the "From" date | `{TD.dateRangeFrom}` | From date is selected (e.g., 90 days prior to current date) |
| 10 | In the Date Range filter, select the "To" date | `{TD.dateRangeTo}` | To date is selected (e.g., current date) |
| 11 | Optionally, enter a Material number in the Material filter field if filtering by material | `{TD.materialFilterOptional}` | Material filter is applied (if used) |
| 12 | Optionally, enter an Operation number in the Operation filter field if filtering by operation | `{TD.operationFilterOptional}` | Operation filter is applied (if used) |
| 13 | Optionally, select a Root Cause code in the Root Cause filter field if filtering by root cause | `{TD.rootCauseFilterOptional}` | Root Cause filter is applied (if used) |
| 14 | Click the "Generate" or "Go" button to execute the trend report | — | SAP processes the report request |
| 15 | Observe the trend report output | — | Trend report is displayed showing deviation frequency aggregated by material, operation, and root cause category |
| 16 | Verify that the report displays Material column with material numbers and descriptions | — | Material column is visible with material data |
| 17 | Verify that the report displays Operation column with operation numbers | — | Operation column is visible with operation data |
| 18 | Verify that the report displays Root Cause column with root cause codes and descriptions | — | Root Cause column is visible with root cause data |
| 19 | Verify that the report displays Deviation Frequency (count) column showing the number of deviations per combination | — | Frequency column is visible with deviation counts |
| 20 | Verify that the report displays Date Range information in the header or footer | `{TD.dateRangeFrom}` to `{TD.dateRangeTo}` | Date range is displayed confirming the report period |
| 21 | Optionally, export the report data if export functionality is available | — | Report data is exported to Excel or PDF format |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Trend report is successfully generated and displayed
- Report shows aggregated deviation frequency data organized by Material, Operation, and Root Cause Category
- Report data is accurate and matches the selected date range and filter criteria
- Report format is clear and readable with appropriate columns and data visualization (table or chart)
- User can interpret the trend data to identify patterns and areas requiring corrective action

---

### Post-conditions

- Trend report has been viewed by the user
- User has gained business intelligence insights from the deviation frequency data
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
