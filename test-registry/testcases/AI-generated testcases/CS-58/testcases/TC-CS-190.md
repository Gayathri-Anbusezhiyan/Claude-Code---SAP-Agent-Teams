# TC-CS-190: Verify Trend Report Displays Environmental Data Across Multiple Batches and Production Suites

**User Story:**          [CS-58] Record Environmental Monitoring Readings (E.G., Cleanroom Particle Cou
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Environmental Monitoring for Process Orders
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
| P1 | User Role | User has the role of Production Operator or Production Manager with SAP authorization to view environmental monitoring trend reports |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Historical Data | At least 3 Process Orders with confirmed environmental monitoring readings exist in the system across different batches and/or production suites (work centers) |
| P4 | Historical Data | Environmental readings span a date range of at least 7 days to enable trend analysis |
| P5 | Configuration | Trend reporting application or analytics dashboard is configured and accessible |
| P6 | Configuration | Trend report is configured to aggregate environmental data from Process Order confirmations across batches and work centers |

---

### Test Data

**Dataset Reference:** `testdata/CS-58/CS-58-testdata.json` — Dataset ID: `TD-CS-058-INT-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Date Range Start | `{TD.dateRangeStart}` | Start date for trend report filter (e.g., 7 days ago) — entered by the user | Valid |
| Date Range End | `{TD.dateRangeEnd}` | End date for trend report filter (e.g., today) — entered by the user | Valid |
| Work Center Filter | `{TD.workCenterFilter}` | Work center or production suite filter (optional) — entered by the user | Valid (optional) |

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
| 7 | Click the search icon (top-right shell bar) and type "Environmental Monitoring Trend Report" or equivalent analytics application name | — | Search results appear listing the trend report application |
| 8 | Click the trend report application from the search results | — | Trend report application or analytics dashboard opens |
| 9 | In the "Date Range" filter, enter the start date | `{TD.dateRangeStart}` | Start date is entered (e.g., 7 days ago) |
| 10 | Press Enter to confirm the start date entry | — | Start date is confirmed |
| 11 | In the "Date Range" filter, enter the end date | `{TD.dateRangeEnd}` | End date is entered (e.g., today) |
| 12 | Press Enter to confirm the end date entry | — | End date is confirmed |
| 13 | If a Work Center or Production Suite filter is available, enter the work center filter value (optional) | `{TD.workCenterFilter}` | Work center filter value is entered (or left empty for all work centers) |
| 14 | Press Enter to confirm the work center filter entry (if applicable) | — | Work center filter is confirmed |
| 15 | Click the "Run" or "Generate Report" button | — | System processes the request and generates the trend report |
| 16 | Verify that the trend report is displayed | — | Trend report is displayed with charts or tables showing environmental monitoring data |
| 17 | Verify that the report displays particle count trends across multiple Process Orders or batches | — | Particle count data is visible in a chart or table format showing values over time or across batches |
| 18 | Verify that the report displays temperature trends across multiple Process Orders or batches | — | Temperature data is visible in a chart or table format showing values over time or across batches |
| 19 | Verify that the report displays humidity trends across multiple Process Orders or batches | — | Humidity data is visible in a chart or table format showing values over time or across batches |
| 20 | Verify that the report includes data from multiple Process Orders or batches (at least 3 data points) | — | The report shows data from at least 3 different Process Orders or batches confirming aggregation across batches |
| 21 | Verify that the report includes work center or production suite information for each data point | — | Work center or production suite labels are displayed alongside each data point or aggregated by work center |
| 22 | Verify that the date range filter is correctly applied (only data within the specified date range is displayed) | `{TD.dateRangeStart}`, `{TD.dateRangeEnd}` | Data displayed falls within the specified date range; no data from outside the range is visible |
| 23 | Verify that the report includes chart accuracy (data points match the underlying confirmation records) | — | Data points in the chart or table match the actual environmental readings from Process Order confirmations |
| 24 | If drill-down functionality is available, click a data point to view detailed confirmation data | — | Detailed confirmation data is displayed showing Process Order number, operation number, and environmental readings |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The trend report application is accessible and functional
- The report displays environmental monitoring data (particle count, temperature, humidity) across multiple Process Orders or batches
- The report correctly applies date range filtering and displays only data within the specified range
- The report includes work center or production suite information for each data point
- The report data is accurate and matches the underlying Process Order confirmation records
- The integration between PP (Process Order Confirmation) and the trend reporting system (analytics/BW) is working correctly

---

### Post-conditions

- The trend report is displayed with accurate environmental monitoring data
- The report covers multiple Process Orders, batches, and production suites
- The date range filter is correctly applied
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
