# TC-CS-161: Attempt to Convert Planned Order with Missing Planned Order Number

**User Story:**          [CS-63] User Story PP-014
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Mandatory Field Validation — Planned Order Number
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
| P1 | User Role | User has the role of Production Planner with SAP authorization to access planned order management functions |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Configuration | Planned Order Number is configured as a mandatory field for order conversion and reservation creation |

---

### Test Data

**Dataset Reference:** `testdata/CS-63/CS-63-testdata.json` — Dataset ID: `TD-CS-063-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Planned Order Number | `{TD.emptyValue}` | Empty/blank value (mandatory field left empty) | Invalid (missing) |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Planned Orders" | — | Search results appear listing the Manage Planned Orders application |
| 8 | Click "Manage Planned Orders" from the search results | — | Manage Planned Orders application opens displaying the list screen with filter fields |
| 9 | Leave the "Planned Order" filter field empty (do not enter any value) | `{TD.emptyValue}` | Planned Order field remains blank |
| 10 | Click the "Go" button to attempt retrieval without specifying a planned order number | — | SAP displays an information or warning message indicating that no specific order is selected or filter criteria are too broad |
| 11 | Attempt to click the "Convert to Process Order" action button without selecting a planned order | — | System prevents the action; button is disabled or an error message is displayed: "No planned order selected" or "Planned Order Number is required" |
| 12 | Verify the error message clearly states that a Planned Order Number is mandatory | — | Error message is displayed: "Planned Order is a mandatory field" or "Please enter or select a Planned Order Number" |
| 13 | Verify that no conversion or reservation creation process is initiated | — | No process order is created; no reservation is generated; system blocks the transaction |
| 14 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 15 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 16 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP enforces mandatory field validation for Planned Order Number
- An error message is displayed clearly indicating the field is required
- The conversion process is blocked; no process order or reservation is created
- The user is prompted to enter a valid Planned Order Number before proceeding
- System ensures data integrity by preventing incomplete or invalid order conversions

---

### Post-conditions

- No process order is created
- No component reservations are created
- Mandatory field validation is enforced correctly
- User is signed out successfully

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
