# TC-CS-220: Quality Threshold = 100% (No Vendors Flagged)

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
| P3 | Master Data | Vendor `{TD.vendorId}` exists and has inspection lot history |
| P4 | Configuration | Quality threshold is configured as 100% (maximum boundary — only perfect acceptance rate passes threshold) |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS/CS-testdata.json` — Dataset ID: `TD-CS-022-EDGE-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.vendorId}` | Valid vendor account number | Valid |
| Time Period From | `{TD.timePeriodFrom}` | Start date for scorecard calculation | Valid |
| Time Period To | `{TD.timePeriodTo}` | End date for scorecard calculation | Valid |
| Quality Threshold | `{TD.qualityThreshold}` | 100% threshold (maximum boundary) | Valid |

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
| 14 | Verify the "Batch Acceptance Rate %" is calculated and displayed | `{TD.expectedAcceptanceRate}` | Acceptance rate is displayed (any rate below 100% is below threshold) |
| 15 | Verify the visual status indicator shows Red or Yellow status | — | Red or Yellow status indicator is displayed (unless acceptance rate = exactly 100%) |
| 16 | Verify that a red flag or warning is displayed (unless acceptance rate = 100%) | — | Quality alert is shown for any acceptance rate below 100% |
| 17 | Verify the threshold configuration is reflected correctly | `{TD.qualityThreshold}` | System applies the 100% threshold correctly; nearly all vendors with any rejected lots fail the threshold |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Vendor quality scorecard is displayed with the 100% quality threshold applied
- Vendors with any acceptance rate below 100% show Red or Yellow status (fail threshold)
- Only vendors with exactly 100% acceptance rate (all lots accepted) show Green status
- System handles the maximum threshold boundary (100%) correctly without errors

---

### Post-conditions

- Scorecard data reflects the 100% quality threshold configuration
- Threshold logic is applied correctly
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
