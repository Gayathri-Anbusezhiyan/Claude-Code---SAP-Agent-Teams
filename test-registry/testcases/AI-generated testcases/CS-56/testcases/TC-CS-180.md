# TC-CS-180: Genealogy query for batch with hundreds of component batches (complex assembly)

**User Story:**          [CS-56] View A Batch Genealogy Report Showing The Complete Lineage From Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control / Quality Management (PP/QM)
**Feature:**             Batch Genealogy Report
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to access Batch Information Cockpit and view batch genealogy data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished goods batch `{TD.finishedGoodsBatchComplexAssembly}` exists and was produced from hundreds of component batches (wide BOM structure) |
| P4 | Configuration | Batch determination is active for the finished goods material and all component materials; batch where-used tracking is enabled |
| P5 | Transaction Data | Manufacturing order for the finished goods batch has been confirmed with batch consumption of hundreds of component batches |

---

### Test Data

**Dataset Reference:** `testdata/CS-56/CS-56-testdata.json` — Dataset ID: `TD-CS-056-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Goods Batch (Complex Assembly) | `{TD.finishedGoodsBatchComplexAssembly}` | Finished product batch with hundreds of component batches — entered by user | Valid |
| Expected Component Count | `{TD.expectedComponentCount}` | Expected number of component batches (e.g., 200, 300, 500) — used for verification | Valid |
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
| 9 | Note the current time before starting the search | — | Current time is recorded for performance measurement |
| 10 | In the "Batch" field, enter the finished goods batch number with hundreds of components | `{TD.finishedGoodsBatchComplexAssembly}` | Batch number is entered into the field |
| 11 | Press Enter to confirm the batch entry | — | SAP validates the batch number; the field is accepted |
| 12 | Click the "Go" button or press Enter to execute the search | — | SAP begins processing the wide genealogy query with hundreds of component batches |
| 13 | Observe the query execution time and wait for results to load | — | System processes the query; progress indicator or loading animation may appear |
| 14 | Note the time when the genealogy report is fully displayed | — | Time is recorded to calculate total query execution time |
| 15 | Calculate the query execution time (from step 9 to step 14) | — | Query execution time is calculated (e.g., 8 seconds, 12 seconds, 15 seconds) |
| 16 | Verify that the query completes within an acceptable time frame | — | Query execution time is within the acceptable threshold (suggest 10 seconds as per AC-6 analysis; document actual time in observations) |
| 17 | Verify that the genealogy report is displayed showing the batch structure | `{TD.finishedGoodsBatchComplexAssembly}` | Genealogy report is displayed in hierarchical or list format |
| 18 | Verify that the finished goods batch appears at the top level | `{TD.finishedGoodsBatchComplexAssembly}` | Batch number is displayed as the root node or starting point |
| 19 | Expand the finished goods batch node to view all component batches | — | Component batches are displayed as child nodes or in a component list section |
| 20 | Verify that hundreds of component batches are listed | `{TD.expectedComponentCount}` | Component list shows a large number of batches (e.g., 200+, 300+, or as per expected count) |
| 21 | Scroll through the component batch list to verify completeness | — | All component batches are displayed; list supports scrolling or pagination if necessary |
| 22 | Verify that the report displays key information for each component batch | — | Each component batch shows batch number, material ID (if available), and vendor information (if available) |
| 23 | Verify that the report remains usable and does not freeze or crash | — | Application remains responsive; user can scroll, expand/collapse nodes, and interact with the report |
| 24 | Verify that the report supports filtering or search within the component list (if applicable) | — | If the system provides filtering or search functionality for large component lists, verify it works correctly |
| 25 | Verify that all batch relationships are correctly displayed | — | All component batches are correctly linked to the finished goods batch; no missing or orphaned batches |
| 26 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 27 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 28 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Batch Information Cockpit successfully processes a wide genealogy query with hundreds of component batches
- The genealogy report displays all component batches with correct linkages to the finished goods batch
- The query completes within an acceptable time frame (target: under 10 seconds; document actual performance in observations)
- The application remains stable and responsive even with a large number of component batches
- The report supports usability features such as scrolling, pagination, or filtering to manage the large dataset
- The Production Supervisor can identify all raw material sources for regulatory recall investigations

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

**Performance Measurement:** Query execution time = _______ seconds

**Component Count:** Actual number of component batches displayed = _______

---

**Note:** This test case requires test data with a finished goods batch that consumed hundreds of component batches, which may not exist in all test systems. Test data setup may require manual creation of complex manufacturing orders. Automation is PARTIAL due to test data dependency complexity.
