# TC-CS-205: View Scorecard with Custom Time Period (Last 12 Months)

**User Story:**          [CS-22] View An Aggregated Vendor Quality Scorecard Based On Inspection Reject
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Vendor Evaluation / Quality Scorecard
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Manager with SAP authorization to access Vendor Evaluation analytics |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Vendor `{TD.vendorId}` exists with inspection and delivery history spanning 12 months |
| P4 | Configuration | Custom time period selection is available in the Vendor Evaluation app |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS/CS-testdata.json` — Dataset ID: `TD-CS-022-AP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.vendorId}` | Vendor account number | Valid |
| Custom Time Period | `{TD.customTimePeriod}` | Custom period (e.g., Last 12 Months) | Valid |

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
| 11 | In the "Time Period" dropdown, select the custom period option | `{TD.customTimePeriod}` | Custom period (e.g., "Last 12 Months") is selected |
| 12 | Click the "Go" button to execute the query | — | System calculates metrics for the 12-month period |
| 13 | Verify the time period displayed on the scorecard | — | Scorecard shows the date range covering the last 12 months from today |
| 14 | Verify the "Total Inspection Lots" metric | — | Total lots count for the 12-month period is displayed |
| 15 | Verify the "Batch Acceptance Rate %" is calculated for the custom period | `{TD.expectedAcceptanceRate}` | Acceptance rate is calculated over 12 months and displayed |
| 16 | Verify the "On-Time Delivery Rate %" is calculated for the custom period | `{TD.expectedOTDRate}` | OTD rate is calculated over 12 months and displayed |
| 17 | Verify that the metrics reflect data from the full 12-month span | — | Lot counts and delivery counts reflect the extended time period (higher counts than a 90-day period) |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Vendor quality scorecard is successfully displayed for a custom 12-month time period
- All metrics (batch acceptance rate, OTD rate) are calculated based on data from the last 12 months
- Custom time period configuration is correctly applied by the system
- Date range shown on the scorecard accurately reflects the 12-month span from the current date

---

### Post-conditions

- Scorecard data is displayed for the custom 12-month period
- No errors or data aggregation issues are present
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
