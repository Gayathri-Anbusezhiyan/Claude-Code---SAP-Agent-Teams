# TC-CS-176: Search by batch that has no component batches (never consumed anything)

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
| P3 | Master Data | Batch `{TD.batchWithNoComponents}` exists in SAP batch master (MCHA) but has NO component batches (it is a raw material batch or was never produced via a manufacturing order with component consumption) |
| P4 | Transaction Data | No manufacturing orders exist that consumed other batches to produce `{TD.batchWithNoComponents}` (no upstream genealogy data) |

---

### Test Data

**Dataset Reference:** `testdata/CS-56/CS-56-testdata.json` — Dataset ID: `TD-CS-056-NEG-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch with No Components | `{TD.batchWithNoComponents}` | Batch number that exists but has no component batches — entered by user | Valid (batch exists) but Invalid (no genealogy data) |
| Material ID | `{TD.materialIdNoComponents}` | Material master number for the batch — auto-populated by SAP | Valid |

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
| 9 | In the "Batch" field, enter the batch number with no components | `{TD.batchWithNoComponents}` | Batch number is entered into the field |
| 10 | Press Enter to confirm the batch entry | — | SAP validates the batch number; the field is accepted |
| 11 | Click the "Go" button or press Enter to execute the search | — | SAP begins processing the genealogy query |
| 12 | Observe the query execution and wait for results to load | — | Genealogy report is displayed showing the batch header information |
| 13 | Verify that the batch number and material ID are displayed | `{TD.batchWithNoComponents}`, `{TD.materialIdNoComponents}` | Batch number and material ID are shown in the report header |
| 14 | Verify that no component batches are listed | — | Component section is empty OR displays a message such as "No component batches found", "No genealogy data available", or "This batch has no consumed materials" |
| 15 | Verify that the report does not display an error but clearly indicates the absence of genealogy data | — | An informational message or empty component section is shown; the application does not treat this as a system error |
| 16 | Verify that other batch information (if available) is still displayed correctly | — | Batch status, plant, material description, and dates (if maintained) are shown in the report |
| 17 | Verify that the system remains responsive and does not crash | — | Application remains stable; user can perform other actions or searches |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system successfully retrieves the batch record for the entered batch number
- The report displays the batch header information (batch number, material, plant)
- No component batches are listed because none exist for this batch
- An informational message or empty section clearly indicates the absence of genealogy data
- The system does not treat this as an error; it handles the scenario gracefully
- The application remains stable and responsive

---

### Post-conditions

- No data is modified in SAP; the query is read-only
- Batch master data remains unchanged
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
