# TC-CS-221: Batch Acceptance Rate = 0% (All Lots Rejected)

**User Story:**          [CS-22] View An Aggregated Vendor Quality Scorecard Based On Inspection Reject
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Vendor Evaluation / Quality Scorecard
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
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
| P3 | Master Data | Vendor `{TD.vendorId}` exists and has inspection lot history |
| P4 | Historical Data | Vendor `{TD.vendorId}` has completed inspection lots but ALL lots are REJECTED (zero accepted lots) |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS/CS-testdata.json` — Dataset ID: `TD-CS-022-EDGE-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.vendorId}` | Valid vendor with all rejected lots | Valid |
| Time Period From | `{TD.timePeriodFrom}` | Start date for scorecard calculation | Valid |
| Time Period To | `{TD.timePeriodTo}` | End date for scorecard calculation | Valid |

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
| 11 | In the "From Date" filter field, enter the start date | `{TD.timePeriodFrom}` | From Date is populated |
| 12 | In the "To Date" filter field, enter the end date | `{TD.timePeriodTo}` | To Date is populated |
| 13 | Click the "Go" button to execute the query | — | System calculates and displays the vendor quality scorecard |
| 14 | Verify the "Total Inspection Lots" metric is displayed | — | Total lots count is displayed as a numeric value greater than zero |
| 15 | Verify the "Accepted Lots" metric displays zero | — | Accepted Lots = 0 |
| 16 | Verify the "Rejected Lots" metric equals Total Inspection Lots | — | Rejected Lots = Total Inspection Lots |
| 17 | Verify the "Batch Acceptance Rate %" displays 0.00% | `{TD.expectedAcceptanceRate}` | Acceptance rate = 0.00% (calculated as 0 / Total × 100) |
| 18 | Verify the visual status indicator shows Red status | — | Red status indicator is displayed, indicating critical vendor quality failure |
| 19 | Verify that a critical red flag alert is displayed | — | Critical alert message is shown indicating all inspection lots were rejected |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Vendor quality scorecard displays 0% batch acceptance rate (all lots rejected)
- Acceptance rate calculation: (0 Accepted / Total Lots) × 100 = 0.00%
- Visual status indicator shows Red color, signaling critical quality failure
- Critical red flag alert is displayed indicating severe vendor quality issues
- System handles the 0% acceptance rate boundary without calculation errors

---

### Post-conditions

- Scorecard data confirms vendor has 0% acceptance rate
- Critical quality alert is generated
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
