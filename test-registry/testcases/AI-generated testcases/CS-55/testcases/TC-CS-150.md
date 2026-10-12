# TC-CS-150: Verify trend report aggregates data from multiple deviations across materials and operations

**User Story:**          [CS-55] Record A Deviation Directly Against An In-Process Control Result That
**Epic:**                N/A — no epic assigned
**Module:**              PP — Production Planning & QM — Quality Management
**Feature:**             QM Analytics Integration — Trend Report Data Aggregation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to view Quality Notification reports (QM03) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Historical Deviation Data | Multiple Quality Notifications (Deviations) exist in the SAP system spanning different materials, operations, and root cause categories (minimum 5 deviations across at least 2 materials, 2 operations, and 2 root causes) |
| P4 | Reporting Module | Quality Management Analytics / Trend Reporting module is configured and accessible; data aggregation from QMEL and QMFE tables is functional |
| P5 | Module Integration | QM Analytics module is integrated with QM Notification data; trend report aggregates data from multiple deviations |

---

### Test Data

**Dataset Reference:** `testdata/CS-55/CS-55-testdata.json` — Dataset ID: `TD-CS-055-INT-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Date Range From | `{TD.dateRangeFrom}` | Start date for trend report period (e.g., 90 days prior) | Valid |
| Date Range To | `{TD.dateRangeTo}` | End date for trend report period (e.g., current date) | Valid |
| Expected Material 1 | `{TD.material1}` | First material expected in report data | Valid |
| Expected Material 2 | `{TD.material2}` | Second material expected in report data | Valid |
| Expected Operation 1 | `{TD.operation1}` | First operation expected in report data | Valid |
| Expected Operation 2 | `{TD.operation2}` | Second operation expected in report data | Valid |
| Expected Root Cause 1 | `{TD.rootCause1}` | First root cause expected in report data | Valid |
| Expected Root Cause 2 | `{TD.rootCause2}` | Second root cause expected in report data | Valid |

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
| 7 | Click the search icon and type "Quality Deviation Trend Report" or "Quality Notification Analytics" | — | Search results appear listing the trend report application |
| 8 | Click the "Quality Deviation Trend Report" or equivalent application from the search results | — | Trend report application opens showing the filter/selection criteria screen |
| 9 | In the Date Range filter, select the "From" date | `{TD.dateRangeFrom}` | From date is selected |
| 10 | In the Date Range filter, select the "To" date | `{TD.dateRangeTo}` | To date is selected |
| 11 | Click the "Generate" or "Go" button to execute the trend report | — | SAP processes the report request and aggregates data from multiple deviations |
| 12 | Observe the trend report output | — | Trend report is displayed showing deviation frequency aggregated by material, operation, and root cause category |
| 13 | Verify that the report displays data for multiple materials | `{TD.material1}`, `{TD.material2}` | Material column shows at least two different materials with deviation counts |
| 14 | Verify that the report displays data for multiple operations | `{TD.operation1}`, `{TD.operation2}` | Operation column shows at least two different operations with deviation counts |
| 15 | Verify that the report displays data for multiple root causes | `{TD.rootCause1}`, `{TD.rootCause2}` | Root Cause column shows at least two different root cause categories with deviation counts |
| 16 | Verify that the Deviation Frequency (count) column shows aggregated totals for each Material × Operation × Root Cause combination | — | Frequency column displays numeric counts (e.g., Material A + Operation 10 + Root Cause X = 3 deviations) |
| 17 | Verify that the report correctly aggregates data from multiple Quality Notifications across different dimensions | — | Report data is accurate; counts match the number of deviations recorded for each combination |
| 18 | Verify that the report enables business intelligence analysis (e.g., identifying which material, operation, or root cause has the highest deviation frequency) | — | Report data is organized in a clear format enabling trend identification and root cause analysis |
| 19 | Verify that the Analytics/Reporting module successfully integrates with the QM Notification data (QMEL and QMFE tables) | — | Integration is confirmed: trend report aggregates data from multiple deviations; no manual data collection required |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Trend report successfully aggregates data from multiple Quality Notifications (Deviations)
- Report displays deviation frequency organized by Material, Operation, and Root Cause Category
- Report data includes multiple materials, operations, and root causes (multi-dimensional aggregation)
- Report data is accurate and matches the actual deviation records in the system
- Integration between QM Analytics module and QM Notification data is verified
- Report enables business intelligence analysis for continuous improvement (identifying high-frequency deviation areas)

---

### Post-conditions

- Trend report has been generated and viewed
- Data aggregation from multiple deviations is verified
- Integration between QM Analytics and QM Notifications is confirmed
- No application-level errors remain outstanding

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
