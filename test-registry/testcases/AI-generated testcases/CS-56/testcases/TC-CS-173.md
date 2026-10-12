# TC-CS-173: Search by non-existent finished goods batch number

**User Story:**          [CS-56] View A Batch Genealogy Report Showing The Complete Lineage From Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control / Quality Management (PP/QM)
**Feature:**             Batch Genealogy Report
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
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
| P3 | Master Data | Batch number `{TD.nonExistentBatchNumber}` does NOT exist in SAP batch master (MCHA) for any material or plant |

---

### Test Data

**Dataset Reference:** `testdata/CS-56/CS-56-testdata.json` — Dataset ID: `TD-CS-056-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Non-existent Batch Number | `{TD.nonExistentBatchNumber}` | Batch number that does not exist in SAP — entered by user | Invalid |

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
| 9 | In the "Batch" field, enter the non-existent batch number | `{TD.nonExistentBatchNumber}` | Non-existent batch number is entered into the field |
| 10 | Press Enter to confirm the batch entry | — | SAP attempts to validate the batch number |
| 11 | Click the "Go" button or press Enter to execute the search | — | SAP begins processing the genealogy query |
| 12 | Observe the system response | — | SAP displays an error message or informational message indicating that the batch does not exist or no data was found |
| 13 | Verify that the error message is clear and specific | — | Message states that the batch number does not exist, is not valid, or no genealogy data is available for the entered batch (e.g., "Batch {batch_number} does not exist" or "No data found for the specified batch") |
| 14 | Verify that no genealogy report is displayed | — | No batch tree structure or genealogy data is shown; the result area remains empty or displays "No data found" |
| 15 | Verify that the system does not crash or freeze | — | Application remains responsive; no technical errors or unhandled exceptions occur |
| 16 | Verify that the user can clear the invalid batch number and attempt a new search | — | Batch field is editable; user can delete or modify the entry without needing to refresh the page |
| 17 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 18 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 19 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system detects that the entered batch number does not exist in SAP
- A clear and specific error or informational message is displayed to the user
- No genealogy report is generated
- The application remains stable and responsive
- The user can correct the input and retry the search without technical issues

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
