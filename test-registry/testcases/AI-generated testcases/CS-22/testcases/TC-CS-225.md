# TC-CS-225: Verify Batch Acceptance Rate Aggregates Inspection Lot Results from QM Module

**User Story:**          [CS-22] View An Aggregated Vendor Quality Scorecard Based On Inspection Reject
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Vendor Evaluation / Quality Scorecard
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  NO
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Manager with SAP authorization to access Vendor Evaluation analytics |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Vendor `{TD.vendorId}` exists and is active in the SAP system |
| P4 | QM Module Data | Inspection lots exist in the QM module for vendor `{TD.vendorId}` with known inspection lot numbers and status (accepted/rejected) |
| P5 | Cross-Module Integration | Vendor Evaluation app is configured to read inspection lot data from the QM inspection lot results table |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS/CS-testdata.json` — Dataset ID: `TD-CS-022-INT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.vendorId}` | Valid vendor account number with QM inspection history | Valid |
| Time Period From | `{TD.timePeriodFrom}` | Start date for scorecard calculation | Valid |
| Time Period To | `{TD.timePeriodTo}` | End date for scorecard calculation | Valid |
| QM Inspection Lot | `{TD.inspectionLotNumber}` | Known inspection lot number from QM module for verification | Valid |
| Expected Total Lots | `{TD.expectedTotalLots}` | Expected total inspection lots count from QM module query | Valid |
| Expected Accepted Lots | `{TD.expectedAcceptedLots}` | Expected accepted lots count from QM module query | Valid |
| Expected Rejected Lots | `{TD.expectedRejectedLots}` | Expected rejected lots count from QM module query | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Using QM module transaction or Fiori app, query inspection lots for the vendor and time period | `{TD.vendorId}`, `{TD.timePeriodFrom}`, `{TD.timePeriodTo}` | List of inspection lots is displayed from the QM module |
| 2 | Count the total number of inspection lots for the vendor in the time period | — | Total inspection lots count is noted (e.g., 20 lots) |
| 3 | Count the number of inspection lots with status "Accepted" or "Approved" | — | Accepted lots count is noted (e.g., 17 lots) |
| 4 | Count the number of inspection lots with status "Rejected" or "Not Accepted" | — | Rejected lots count is noted (e.g., 3 lots) |
| 5 | Calculate the expected batch acceptance rate manually | — | Expected acceptance rate = (Accepted / Total) × 100 = (17 / 20) × 100 = 85.00% |
| 6 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 7 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 8 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 9 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 10 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 11 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page is fully visible |
| 12 | Click the search icon (top-right shell bar) and type "Vendor Evaluation" | — | Search results appear listing the Vendor Evaluation application |
| 13 | Click "Vendor Evaluation" from the search results | — | Vendor Evaluation analytical app opens |
| 14 | In the "Vendor" filter field, enter the Vendor ID | `{TD.vendorId}` | Vendor ID value is entered |
| 15 | Press Enter to confirm the Vendor entry | — | Vendor name `{TD.vendorName}` is displayed |
| 16 | In the "From Date" filter field, enter the start date | `{TD.timePeriodFrom}` | From Date is populated |
| 17 | In the "To Date" filter field, enter the end date | `{TD.timePeriodTo}` | To Date is populated |
| 18 | Click the "Go" button to execute the query | — | System calculates and displays the vendor quality scorecard |
| 19 | Verify the "Total Inspection Lots" metric matches the QM module count | `{TD.expectedTotalLots}` | Total lots displayed in scorecard = Total lots counted in QM module (e.g., 20) |
| 20 | Verify the "Accepted Lots" metric matches the QM module count | `{TD.expectedAcceptedLots}` | Accepted lots displayed in scorecard = Accepted lots counted in QM module (e.g., 17) |
| 21 | Verify the "Rejected Lots" metric matches the QM module count | `{TD.expectedRejectedLots}` | Rejected lots displayed in scorecard = Rejected lots counted in QM module (e.g., 3) |
| 22 | Verify the "Batch Acceptance Rate %" matches the manually calculated value | `{TD.expectedAcceptanceRate}` | Acceptance rate displayed in scorecard = Manually calculated rate from QM data (e.g., 85.00%) |
| 23 | Click the drill-down link for rejected lots (if available) | — | System navigates to inspection lot details page |
| 24 | Verify that the inspection lot numbers displayed match the QM module rejected lots | `{TD.inspectionLotNumber}` | Inspection lot numbers in drill-down match the rejected lot numbers from QM module |
| 25 | Navigate back to the scorecard | — | Scorecard is displayed again |
| 26 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 27 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 28 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Vendor quality scorecard batch acceptance rate metrics (Total Lots, Accepted Lots, Rejected Lots) exactly match the QM module inspection lot data
- Acceptance rate calculation in the scorecard is based on accurate aggregation of QM inspection lot results
- Cross-module data integration between Vendor Evaluation (MM) and Quality Management (QM) is verified
- Drill-down to inspection lot details shows the correct inspection lot numbers from the QM module

---

### Post-conditions

- Scorecard data is confirmed to be sourced from QM module inspection lots
- Cross-module integration accuracy is validated
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
