# TC-CS-218: Time Period = 3 Years (Maximum Historical Data Range)

**User Story:**          [CS-22] View An Aggregated Vendor Quality Scorecard Based On Inspection Reject
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Vendor Evaluation / Quality Scorecard
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Manager with SAP authorization to access Vendor Evaluation analytics |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Vendor `{TD.vendorId}` exists and has inspection lot history spanning at least 3 years |
| P4 | Configuration | System is configured to retain historical data for at least 3 years |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS/CS-testdata.json` — Dataset ID: `TD-CS-022-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.vendorId}` | Valid vendor account number | Valid |
| Time Period From | `{TD.timePeriodFrom}` | Date 3 years ago (e.g., 2023-08-24) | Valid |
| Time Period To | `{TD.timePeriodTo}` | Current date (e.g., 2026-08-24) | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Vendor Evaluation" | — | Search results appear listing the Vendor Evaluation application |
| 8 | Click "Vendor Evaluation" from the search results | — | Vendor Evaluation analytical app opens |
| 9 | In the "Vendor" filter field, enter the Vendor ID | `{TD.vendorId}` | Vendor ID value is entered |
| 10 | Press Enter to confirm the Vendor entry | — | Vendor name `{TD.vendorName}` is displayed |
| 11 | In the "From Date" filter field, enter the date 3 years ago | `{TD.timePeriodFrom}` | From Date is populated (e.g., 2023-08-24) |
| 12 | In the "To Date" filter field, enter the current date | `{TD.timePeriodTo}` | To Date is populated (e.g., 2026-08-24) |
| 13 | Click the "Go" button to execute the query | — | System calculates metrics for the 3-year time period |
| 14 | Verify the time period displayed on the scorecard | — | Scorecard shows date range spanning 3 years |
| 15 | Verify the "Total Inspection Lots" metric is displayed | — | Total lots count for the 3-year period is displayed (likely a large number) |
| 16 | Verify the "Batch Acceptance Rate %" is calculated | `{TD.expectedAcceptanceRate}` | Acceptance rate is calculated correctly for the 3-year period |
| 17 | Verify the "On-Time Delivery Rate %" is calculated | `{TD.expectedOTDRate}` | OTD rate is calculated correctly for the 3-year period |
| 18 | Verify no performance degradation or timeout errors occur | — | System handles the maximum 3-year historical data range without performance issues |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Vendor quality scorecard displays data for a 3-year time period (maximum boundary)
- All metrics are calculated correctly for the extended historical period
- System accepts the maximum 3-year date range as a valid time period
- Query execution completes without timeout or performance errors

---

### Post-conditions

- Scorecard data is displayed for the 3-year period
- System handles maximum historical data range boundary correctly
- System returns to the login page after sign-out

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
