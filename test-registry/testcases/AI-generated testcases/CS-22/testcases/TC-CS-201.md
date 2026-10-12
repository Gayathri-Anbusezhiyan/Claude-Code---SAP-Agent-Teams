# TC-CS-201: View Batch Acceptance Rate for Standard Time Period (Last 90 Days)

**User Story:**          [CS-22] View An Aggregated Vendor Quality Scorecard Based On Inspection Reject
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Vendor Evaluation / Quality Scorecard
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Manager with SAP authorization to access Vendor Evaluation analytics |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Vendor `{TD.vendorId}` exists and has inspection lot history within the last 90 days |
| P4 | Configuration | Standard time period is configured as 90 days in the Vendor Evaluation app |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS/CS-testdata.json` — Dataset ID: `TD-CS-022-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.vendorId}` | Vendor account number — entered by the user | Valid |
| Time Period | `{TD.standardTimePeriod}` | Standard period (e.g., Last 90 Days) — selected from dropdown | Valid |

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
| 11 | In the "Time Period" dropdown, select the standard period option | `{TD.standardTimePeriod}` | Standard period (e.g., "Last 90 Days") is selected |
| 12 | Click the "Go" button to execute the query | — | System calculates metrics for the last 90 days |
| 13 | Verify the time period displayed on the scorecard | — | Scorecard shows the date range covering the last 90 days from today |
| 14 | Verify the "Total Inspection Lots" metric | — | Total lots count for the 90-day period is displayed |
| 15 | Verify the "Accepted Lots" metric | — | Accepted lots count is displayed |
| 16 | Verify the "Rejected Lots" metric | — | Rejected lots count is displayed |
| 17 | Verify the "Batch Acceptance Rate %" is calculated | `{TD.expectedAcceptanceRate}` | Acceptance rate is calculated as (Accepted / Total) × 100 and displayed with 2 decimal places |
| 18 | Verify the calculation accuracy | — | Manual calculation: (Accepted Lots / Total Lots) × 100 matches displayed percentage |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Vendor quality scorecard displays batch acceptance rate calculated over the standard 90-day time period
- Acceptance rate formula (Accepted Lots / Total Lots) × 100 is correctly applied
- Date range shown on the scorecard accurately reflects the last 90 days from the current date
- All metrics are numeric values with appropriate decimal precision (2 decimal places for percentages)

---

### Post-conditions

- Scorecard data is displayed for the 90-day period
- No calculation errors or data integrity issues are present
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
