# TC-CS-214: Missing Vendor ID Field

**User Story:**          [CS-22] View An Aggregated Vendor Quality Scorecard Based On Inspection Reject
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Vendor Evaluation / Quality Scorecard
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Manager with SAP authorization to access Vendor Evaluation analytics |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS/CS-testdata.json` — Dataset ID: `TD-CS-022-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.emptyValue}` | Empty/blank vendor field | Invalid |
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
| 9 | Leave the "Vendor" filter field empty | — | Vendor field remains blank |
| 10 | In the "From Date" filter field, enter the start date | `{TD.timePeriodFrom}` | From Date is populated |
| 11 | In the "To Date" filter field, enter the end date | `{TD.timePeriodTo}` | To Date is populated |
| 12 | Click the "Go" button to execute the query | — | System validates the filter inputs |
| 13 | Observe the system response | — | System displays a validation error message indicating the Vendor field is mandatory (e.g., "Please enter a Vendor ID" or "Vendor is required") |
| 14 | Verify the Vendor field is highlighted with an error state | — | Vendor field is highlighted in red or with an error indicator |
| 15 | Verify that the scorecard is NOT displayed | — | No scorecard data is loaded; query execution is prevented |
| 16 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 17 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 18 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System detects that the Vendor ID field is empty (mandatory field missing)
- Validation error message is displayed indicating Vendor ID is required
- Vendor field is highlighted with an error state
- Scorecard query execution is prevented; no data is retrieved
- System enforces mandatory field validation before processing the request

---

### Post-conditions

- No scorecard data is displayed
- System validation prevents incomplete query execution
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
