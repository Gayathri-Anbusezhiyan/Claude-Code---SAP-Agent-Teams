# TC-CS-177: Missing Batch Number field

**User Story:**          [CS-56] View A Batch Genealogy Report Showing The Complete Lineage From Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control / Quality Management (PP/QM)
**Feature:**             Batch Genealogy Report
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
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to access Batch Information Cockpit and view batch genealogy data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Configuration | Batch number field is configured as mandatory for genealogy searches in the Batch Information Cockpit |

---

### Test Data

**Dataset Reference:** `testdata/CS-56/CS-56-testdata.json` — Dataset ID: `TD-CS-056-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.emptyValue}` | Batch number field left empty — user does not enter any value | Invalid (missing mandatory field) |

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
| 9 | Verify that the "Batch" field is marked as mandatory | — | Batch field has a mandatory indicator (e.g., asterisk, red border, or "required" label) |
| 10 | Leave the "Batch" field empty | `{TD.emptyValue}` | Batch field remains blank with no value entered |
| 11 | Optionally fill in other fields (e.g., Material, Plant) if present | — | Other fields may be populated or left empty as they are optional |
| 12 | Click the "Go" button or press Enter to execute the search | — | SAP attempts to execute the search |
| 13 | Observe the system response | — | SAP displays a validation error message indicating that the Batch field is mandatory and cannot be empty |
| 14 | Verify that the error message is clear and specific | — | Message states that the Batch field is required or mandatory (e.g., "Batch number is required", "Please enter a batch number", or "Mandatory field Batch is empty") |
| 15 | Verify that the Batch field is highlighted with an error indicator | — | Batch field is highlighted in red or has an error icon next to it |
| 16 | Verify that no genealogy report is displayed | — | No batch tree structure or genealogy data is shown; the result area remains empty |
| 17 | Verify that the search is not executed until the mandatory field is filled | — | No genealogy query is processed; the user remains on the search criteria screen |
| 18 | Verify that the user can enter a valid batch number to resolve the error | — | Batch field is editable; user can enter a value |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system detects that the mandatory Batch field is empty
- A clear and specific validation error message is displayed
- The Batch field is highlighted with an error indicator
- No genealogy query is executed
- The user is prompted to enter a batch number before the search can proceed
- The application remains stable and responsive

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
