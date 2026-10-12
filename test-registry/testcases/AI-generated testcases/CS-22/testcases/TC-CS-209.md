# TC-CS-209: Attempt to View Scorecard for Non-Existent Vendor ID

**User Story:**          [CS-22] View An Aggregated Vendor Quality Scorecard Based On Inspection Reject
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Vendor Evaluation / Quality Scorecard
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
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
| P3 | Master Data | Vendor ID `{TD.invalidVendorId}` does NOT exist in the SAP system |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS/CS-testdata.json` — Dataset ID: `TD-CS-022-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.invalidVendorId}` | Non-existent vendor account number | Invalid |
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
| 9 | In the "Vendor" filter field, enter the non-existent Vendor ID | `{TD.invalidVendorId}` | Vendor ID value is entered |
| 10 | Press Enter to confirm the Vendor entry | — | SAP validates the vendor entry |
| 11 | Observe the system response | — | System displays an error message indicating the vendor does not exist or cannot be found (e.g., "Vendor not found" or "Invalid Vendor ID") |
| 12 | Verify that the Vendor Name field remains empty or displays an error state | — | Vendor Name field is not populated; error highlighting or message is shown |
| 13 | Verify that the "Go" button is either disabled or produces no results | — | "Go" button is disabled, or clicking it produces an empty scorecard with a message indicating no vendor data is available |
| 14 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 15 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 16 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System detects that the entered Vendor ID does not exist in SAP master data
- Error message is displayed indicating the vendor is invalid or not found
- Vendor quality scorecard is NOT displayed
- No calculation or data retrieval occurs for a non-existent vendor

---

### Post-conditions

- No scorecard data is displayed
- System validation prevents processing of invalid vendor ID
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
