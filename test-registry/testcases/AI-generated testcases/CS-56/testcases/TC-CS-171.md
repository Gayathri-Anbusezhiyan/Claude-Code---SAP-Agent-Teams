# TC-CS-171: Search by batch number without specifying material (system derives material)

**User Story:**          [CS-56] View A Batch Genealogy Report Showing The Complete Lineage From Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control / Quality Management (PP/QM)
**Feature:**             Batch Genealogy Report
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
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
| P3 | Master Data | Finished goods batch `{TD.finishedGoodsBatchSimplified}` exists in SAP batch master (MCHA), is released, and assigned to plant `{TD.plant}` |
| P4 | Configuration | Batch determination is active; SAP system is configured to derive material from batch number automatically |

---

### Test Data

**Dataset Reference:** `testdata/CS-56/CS-56-testdata.json` — Dataset ID: `TD-CS-056-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Goods Batch (Simplified Search) | `{TD.finishedGoodsBatchSimplified}` | Finished product batch number — entered by user without specifying material | Valid |
| Finished Goods Material ID | `{TD.finishedGoodsMaterialIdSimplified}` | Material master number — auto-derived by SAP from batch number | Valid |
| Plant | `{TD.plant}` | Plant code — auto-populated by SAP | Valid |

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
| 9 | Verify that the "Material" field is optional or can be left blank | — | Material field is not marked as mandatory (no asterisk or "required" indicator) |
| 10 | In the "Batch" field, enter the finished goods batch number | `{TD.finishedGoodsBatchSimplified}` | Batch number is entered into the field |
| 11 | Press Enter to confirm the batch entry | — | SAP validates the batch number; the field is accepted |
| 12 | Leave the "Material" field empty or blank | — | Material field remains empty |
| 13 | Click the "Go" button or press Enter to execute the search | — | SAP begins processing the genealogy query and automatically derives the material from the batch number |
| 14 | Observe the query execution and wait for results to load | — | Genealogy report is displayed showing the batch structure |
| 15 | Verify that the finished goods batch number appears in the report | `{TD.finishedGoodsBatchSimplified}` | Batch number is displayed as the root node or starting point |
| 16 | Verify that the system automatically derived and displayed the material ID | `{TD.finishedGoodsMaterialIdSimplified}` | Material ID is shown in the report header or tree node even though it was not entered by the user |
| 17 | Verify that the genealogy data (component batches, vendor information) is displayed | — | Component batches and vendor information are displayed in the report |
| 18 | Verify that the query completes successfully without requiring manual material entry | — | Query completes within an acceptable time frame (typically under 10 seconds); no error message about missing material |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Batch Information Cockpit successfully processes the genealogy query using only the batch number without requiring the material ID
- The system automatically derives the material ID from the batch master record
- The genealogy report is displayed with complete batch data, component batches, and vendor information
- The simplified search workflow reduces user input effort and speeds up recall investigations when only the batch number is known

---

### Post-conditions

- No data is modified in SAP; the query is read-only
- Batch genealogy data remains unchanged
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
