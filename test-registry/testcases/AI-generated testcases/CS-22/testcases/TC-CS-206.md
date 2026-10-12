# TC-CS-206: View Scorecard Filtered by Specific Purchasing Organization

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
| P3 | Master Data | Vendor `{TD.vendorId}` exists and is assigned to multiple purchasing organizations |
| P4 | Historical Data | Vendor has inspection and delivery data for the specific purchasing organization `{TD.purchasingOrg}` |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS/CS-testdata.json` — Dataset ID: `TD-CS-022-AP-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.vendorId}` | Vendor account number | Valid |
| Purchasing Org | `{TD.purchasingOrg}` | Specific purchasing organization code | Valid |
| Time Period From | `{TD.timePeriodFrom}` | Start date | Valid |
| Time Period To | `{TD.timePeriodTo}` | End date | Valid |

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
| 11 | In the "Purchasing Organization" filter field, enter the purchasing org code | `{TD.purchasingOrg}` | Purchasing organization code is entered |
| 12 | Press Enter to confirm the Purchasing Organization entry | — | Purchasing organization name is displayed |
| 13 | In the "From Date" filter field, enter the start date | `{TD.timePeriodFrom}` | From Date is populated |
| 14 | In the "To Date" filter field, enter the end date | `{TD.timePeriodTo}` | To Date is populated |
| 15 | Click the "Go" button to execute the query | — | System calculates metrics filtered by the specific purchasing organization |
| 16 | Verify the scorecard displays data for the specified purchasing organization only | `{TD.purchasingOrg}` | Purchasing organization is shown in the filter summary or header |
| 17 | Verify the "Total Inspection Lots" metric reflects only lots for this purchasing org | — | Total lots count is displayed (may be lower than unfiltered vendor total) |
| 18 | Verify the "Batch Acceptance Rate %" is calculated for this purchasing org | `{TD.expectedAcceptanceRate}` | Acceptance rate is calculated and displayed |
| 19 | Verify the "On-Time Delivery Rate %" is calculated for this purchasing org | `{TD.expectedOTDRate}` | OTD rate is calculated and displayed |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Vendor quality scorecard is successfully filtered by the specified purchasing organization
- All metrics (acceptance rate, OTD rate) reflect only data associated with the selected purchasing organization
- Filter is correctly applied; data from other purchasing organizations is excluded
- Scorecard accurately represents vendor performance within the organizational scope

---

### Post-conditions

- Scorecard data is displayed for the specified vendor and purchasing organization
- No data leakage from other purchasing organizations
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
