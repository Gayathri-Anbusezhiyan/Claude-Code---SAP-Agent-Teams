# TC-CS-210: Attempt to create count document with missing Plant field

**User Story:**          [CS-25] Perform A Batch-Specific Physical Inventory Count For Cold-Chain-Store
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch-Specific Physical Inventory Count
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
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to perform physical inventory counts |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Configuration | Physical inventory process is configured in the SAP system |

---

### Test Data

**Dataset Reference:** `testdata/CS-25/CS-25-testdata.json` — Dataset ID: `TD-CS-25-ERR-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Plant | `{TD.emptyValue}` | Plant field left empty | Missing (mandatory field) |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Physical Inventory" | — | Search results appear listing the "Manage Physical Inventory" application |
| 8 | Click "Manage Physical Inventory" from the search results | — | Manage Physical Inventory application opens displaying the count document list |
| 9 | Click the "Create" button in the application toolbar | — | New physical inventory count document creation form opens |
| 10 | Leave the "Plant:*" field empty | `{TD.emptyValue}` | Plant field remains empty |
| 11 | Click the "Generate" or "Create Count Document" button | — | SAP validates mandatory fields and displays an error message indicating that Plant is required |
| 12 | Verify that the error message is displayed | — | Error message is displayed with text indicating "Plant is required" or "Please enter plant" or similar validation error; the Plant field is highlighted as mandatory |
| 13 | Verify that the count document is NOT created | — | Count document is NOT created; user remains on the creation form with validation error displayed |
| 14 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 15 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 16 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays a validation error message indicating that Plant is a mandatory field
- The Plant field is highlighted as mandatory
- Count document is NOT created
- System prevents document creation without required Plant field

---

### Post-conditions

- No physical inventory document is created
- No inventory data is affected
- User remains on the document creation screen with validation error displayed
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
