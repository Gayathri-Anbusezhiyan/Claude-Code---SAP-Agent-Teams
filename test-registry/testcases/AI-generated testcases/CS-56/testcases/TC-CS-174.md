# TC-CS-174: Search by batch number in wrong format (invalid characters or length)

**User Story:**          [CS-56] View A Batch Genealogy Report Showing The Complete Lineage From Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control / Quality Management (PP/QM)
**Feature:**             Batch Genealogy Report
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to access Batch Information Cockpit and view batch genealogy data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Configuration | Batch number format validation is enabled in SAP (typical format: alphanumeric, maximum 10 characters) |

---

### Test Data

**Dataset Reference:** `testdata/CS-56/CS-56-testdata.json` — Dataset ID: `TD-CS-056-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Invalid Batch Number (Format) | `{TD.invalidBatchFormat}` | Batch number with invalid characters or exceeding maximum length — entered by user | Invalid |

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
| 7 | Click the search icon (top-right shell bar) and type "Batch Information Cockpit" | — | Search results appear listing the Batch Information Cockpit application |
| 8 | Click "Batch Information Cockpit" from the search results | — | Batch Information Cockpit application opens with search criteria screen |
| 9 | In the "Batch" field, enter the invalid batch number | `{TD.invalidBatchFormat}` | Invalid batch number is entered into the field |
| 10 | Press Enter to confirm the batch entry | — | SAP attempts to validate the batch number |
| 11 | Observe the field validation response | — | SAP displays a validation error message indicating that the batch number format is invalid (e.g., "Invalid characters", "Batch number too long", or "Format not allowed") OR the field is highlighted in red with an error indicator |
| 12 | If validation occurs on field exit, verify the error message appears immediately | — | Error message is displayed next to or below the Batch field without requiring the "Go" button to be clicked |
| 13 | If validation occurs on search execution, click the "Go" button | — | SAP displays an error message indicating that the batch number format is invalid |
| 14 | Verify that no genealogy report is displayed | — | No batch tree structure or genealogy data is shown; the result area remains empty |
| 15 | Verify that the system does not crash or freeze | — | Application remains responsive; no technical errors or unhandled exceptions occur |
| 16 | Verify that the user can correct the invalid batch number | — | Batch field is editable; user can delete or modify the entry |
| 17 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 18 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 19 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system detects that the entered batch number does not conform to the expected format
- A clear validation error message is displayed to the user
- No genealogy report is generated
- The application remains stable and responsive
- The user can correct the input and retry the search

---

### Post-conditions

- No data is modified in SAP; the query is read-only
- User session is terminated after sign-out

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
