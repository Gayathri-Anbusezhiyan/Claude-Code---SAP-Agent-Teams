# TC-CS-135: Attempt Confirmation with Missing Process Order Field

**User Story:**          [CS-52] Confirm Yield And Scrap Quantities Against A Process Order Operation
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Execution (PP)
**Feature:**             Process Order Confirmation
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
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to confirm Process Order operations (PP_CONF authorization object) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Mandatory Field | Process Order field is mandatory and must NOT be left empty |

---

### Test Data

**Dataset Reference:** `testdata/CS-52/CS-52-testdata.json` — Dataset ID: `TD-CS-52-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.emptyValue}` | Empty/blank value — field left empty | Invalid (missing) |

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
| 7 | Click the search icon (top-right shell bar) and type "Confirm Process Order" | — | Search results appear listing the "Confirm Process Order" application |
| 8 | Click the "Confirm Process Order" application from the search results | — | "Confirm Process Order" application opens |
| 9 | Leave the "Process Order" field empty (do not enter any value) | `{TD.emptyValue}` | Process Order field remains empty |
| 10 | Attempt to press Enter or move to the next field | — | SAP highlights the Process Order field as mandatory and displays a validation error |
| 11 | Verify that the mandatory field error is displayed | — | Error message or indicator is displayed stating that the Process Order field is mandatory (e.g., "Process Order is required" or field is highlighted in red with asterisk) |
| 12 | Verify that no order details are loaded | — | Material, planned batch quantity, and operation fields remain empty; no data is populated |
| 13 | Verify that the "Confirm" button is disabled or not available | — | Primary submit action is disabled; user cannot proceed without entering Process Order |
| 14 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 15 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 16 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP highlights the Process Order field as mandatory and prevents submission
- An error message or validation indicator is displayed
- No order details are loaded
- The user cannot proceed with the confirmation
- No confirmation record is created in SAP
- The system enforces mandatory field validation

---

### Post-conditions

- No Process Order confirmation is created
- No changes are made to any order or batch data
- Mandatory field validation is enforced
- No application-level errors or critical warnings remain outstanding

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
