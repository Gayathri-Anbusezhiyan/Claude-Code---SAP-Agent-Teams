# TC-CS-182: Batch with incomplete dates (released but no inspection date recorded)

**User Story:**          [CS-56] View A Batch Genealogy Report Showing The Complete Lineage From Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control / Quality Management (PP/QM)
**Feature:**             Batch Genealogy Report
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
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
| P3 | Master Data | Finished goods batch `{TD.finishedGoodsBatchIncompleteDates}` exists and is released to unrestricted use BUT has incomplete date information (e.g., no inspection date recorded, or missing manufacturing date) |
| P4 | Configuration | Batch determination and where-used tracking are enabled |
| P5 | Data Quality | Batch record has missing or null values for one or more date fields (manufacturing date, inspection date, or release date) due to data quality issues or incomplete process execution |

---

### Test Data

**Dataset Reference:** `testdata/CS-56/CS-56-testdata.json` — Dataset ID: `TD-CS-056-EDGE-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Goods Batch (Incomplete Dates) | `{TD.finishedGoodsBatchIncompleteDates}` | Finished product batch with missing date information — entered by user | Valid (batch exists) but Incomplete (missing dates) |
| Release Date | `{TD.releaseDate}` | Date when batch was released (present) — displayed in report | Valid |
| Missing Date Field | `{TD.missingDateField}` | Identifies which date is missing (e.g., "Inspection Date", "Manufacturing Date") — used for verification | N/A (missing) |
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
| 9 | In the "Batch" field, enter the finished goods batch number with incomplete dates | `{TD.finishedGoodsBatchIncompleteDates}` | Batch number is entered into the field |
| 10 | Press Enter to confirm the batch entry | — | SAP validates the batch number; the field is accepted |
| 11 | Click the "Go" button or press Enter to execute the search | — | SAP begins processing the genealogy query |
| 12 | Observe the query execution and wait for results to load | — | Genealogy report is displayed showing the batch structure |
| 13 | Verify that the finished goods batch number is displayed | `{TD.finishedGoodsBatchIncompleteDates}` | Batch number is displayed as the root node or starting point |
| 14 | Locate the date fields section in the report (manufacturing date, inspection date, release date) | — | Date fields section is visible in the report header or detail panel |
| 15 | Verify that the release date is displayed (present date) | `{TD.releaseDate}` | Release date is shown with a valid date value |
| 16 | Verify that the missing date field is displayed as empty, null, or with a placeholder | `{TD.missingDateField}` | Missing date field shows no value, displays "N/A", shows blank, or displays a dash (-) indicating missing data |
| 17 | Verify that the report does NOT display an error due to missing dates | — | Report loads successfully; missing dates are handled gracefully without error messages or application crashes |
| 18 | Verify that the genealogy data (component batches, vendor information) is still displayed | — | Component batches and other genealogy data are displayed correctly despite missing date information |
| 19 | Verify that the user can still use the report for recall investigations | — | Report provides sufficient information (batch lineage, component sources) to support recall decisions even with incomplete date data |
| 20 | Verify that the system does not crash or freeze due to missing dates | — | Application remains responsive; user can interact with the report normally |
| 21 | Document which date field is missing in the test observations | `{TD.missingDateField}` | Missing date field is recorded for data quality reporting (e.g., "Inspection Date missing", "Manufacturing Date missing") |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Batch Information Cockpit successfully processes the genealogy query for a batch with incomplete date information
- The report displays available dates (e.g., release date) and handles missing dates gracefully
- Missing date fields are displayed as empty, null, or with a placeholder (e.g., "N/A", "-") without causing errors
- Genealogy data (component batches, vendor information) is still accessible and complete
- The report remains usable for recall investigations despite missing date information
- The application remains stable and responsive; no crashes or technical errors occur
- Data quality issues are documented for follow-up correction

---

### Post-conditions

- No data is modified in SAP; the query is read-only
- Batch genealogy data remains unchanged (including missing dates)
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

**Missing Date Field(s):** _______

**Data Quality Issue:** Document whether the missing date is a data quality defect that should be corrected or an expected scenario in the business process.

---
