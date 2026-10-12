# TC-CS-177: Attempt to Access Non-Existent Process Order Number

**User Story:**          [CS-58] Record Environmental Monitoring Readings (E.G., Cleanroom Particle Cou
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Environmental Monitoring for Process Orders
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            MEDIUM
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Operator with SAP authorization to confirm Process Orders (authorization object PP_PROC_ORDER_CONFIRM with activity 02) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Process Order number `{TD.processOrderNonExistent}` does not exist in the SAP system |

---

### Test Data

**Dataset Reference:** `testdata/CS-58/CS-58-testdata.json` — Dataset ID: `TD-CS-058-ERR-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNonExistent}` | Non-existent Process Order number (e.g., 999999999999) — entered by the user | Invalid (does not exist) |

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
| 8 | Click "Confirm Process Order" from the search results | — | "Confirm Process Order" Fiori app opens |
| 9 | In the "Process Order" field, enter the non-existent Process Order number | `{TD.processOrderNonExistent}` | Process Order number is entered into the field |
| 10 | Press Enter to confirm the Process Order entry | — | SAP validates the Process Order number; an error message is displayed indicating that the Process Order does not exist (e.g., "Process Order does not exist" or "Invalid Process Order number") |
| 11 | Verify that the error message is displayed | — | Error message is visible indicating that the Process Order does not exist |
| 12 | Verify that no Process Order details are loaded (description, material, etc.) | — | No Process Order description, material, or other fields are populated; the form remains empty |
| 13 | Verify that the "Operation" field is disabled or not accessible | — | Operation field is disabled or not displayed; user cannot proceed with entering operation details |
| 14 | Verify that no environmental monitoring fields are displayed | — | Environmental monitoring input section is not visible |
| 15 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 16 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 17 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system displays an error message indicating that the Process Order does not exist
- No Process Order details are loaded
- The "Operation" field is disabled or not accessible
- No environmental monitoring fields are displayed
- The system prevents the user from proceeding with the confirmation

---

### Post-conditions

- No confirmation is created
- No environmental monitoring data is recorded
- No deviation records are created
- The form remains in the initial state with the error message displayed
- No application-level errors remain outstanding

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
