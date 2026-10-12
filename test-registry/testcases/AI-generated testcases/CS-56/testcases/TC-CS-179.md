# TC-CS-179: Genealogy query with maximum BOM depth (10+ levels)

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
| P3 | Master Data | Finished goods batch `{TD.finishedGoodsBatchMaxDepth}` exists with a BOM structure spanning at least 10 levels (raw materials → intermediate 1 → intermediate 2 → ... → finished goods) |
| P4 | Configuration | Batch determination and multi-level where-used tracking are enabled for all materials in the deep BOM structure |
| P5 | Transaction Data | Manufacturing orders for all production levels have been confirmed with batch consumption and output assignments across all 10+ BOM levels |

---

### Test Data

**Dataset Reference:** `testdata/CS-56/CS-56-testdata.json` — Dataset ID: `TD-CS-056-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Goods Batch (Max Depth) | `{TD.finishedGoodsBatchMaxDepth}` | Finished product batch with 10+ BOM levels — entered by user | Valid |
| Expected BOM Depth | `{TD.expectedBOMDepth}` | Expected number of BOM levels (e.g., 10, 12, 15) — used for verification | Valid |
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
| 10 | In the "Batch" field, enter the finished goods batch number with maximum BOM depth | `{TD.finishedGoodsBatchMaxDepth}` | Batch number is entered into the field |
| 11 | Press Enter to confirm the batch entry | — | SAP validates the batch number; the field is accepted |
| 12 | Click the "Go" button or press Enter to execute the search | — | SAP begins processing the deep genealogy query spanning 10+ BOM levels |
| 13 | Observe the query execution time and wait for results to load | — | System processes the query; progress indicator or loading animation may appear |
| 14 | Note the time when the genealogy report is fully displayed | — | Time is recorded to calculate total query execution time |
| 15 | Calculate the query execution time (from step 9 to step 14) | — | Query execution time is calculated (e.g., 8 seconds, 12 seconds, 15 seconds) |
| 16 | Verify that the query completes within an acceptable time frame | — | Query execution time is within the acceptable threshold (suggest 10 seconds as per AC-6 analysis; document actual time in observations) |
| 17 | Verify that the genealogy report is displayed showing the batch structure | `{TD.finishedGoodsBatchMaxDepth}` | Multi-level genealogy report is displayed in hierarchical tree format |
| 18 | Verify that the finished goods batch appears at the top level | `{TD.finishedGoodsBatchMaxDepth}` | Batch number is displayed as the root node |
| 19 | Expand nodes progressively to verify the depth of the BOM structure | — | Tree structure shows multiple levels of parent-child relationships |
| 20 | Count the number of BOM levels displayed (or verify against expected depth) | `{TD.expectedBOMDepth}` | Report displays at least the expected number of BOM levels (e.g., 10+ levels visible when fully expanded) |
| 21 | Verify that all intermediate batches at each level are displayed | — | Each BOM level shows the appropriate intermediate or component batches |
| 22 | Verify that raw material batches appear at the deepest (lowest) level | — | Raw material batches are displayed at the bottom of the tree structure with no further child nodes |
| 23 | Verify that the report remains usable and does not freeze or crash | — | Application remains responsive; user can expand/collapse nodes, scroll, and interact with the report |
| 24 | Verify that all batch relationships are correctly displayed across all levels | — | Parent-child linkages are correct; no missing levels or orphaned batches |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Batch Information Cockpit successfully processes a deep genealogy query spanning 10+ BOM levels
- The genealogy report displays all BOM levels with correct parent-child relationships
- Raw material batches at the deepest level are correctly linked through all intermediate production stages to the finished goods batch
- The query completes within an acceptable time frame (target: under 10 seconds; document actual performance in observations)
- The application remains stable and responsive even with a deep BOM structure
- The Production Supervisor can trace the complete lineage across all production levels for regulatory recall investigations

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

---

**Note:** This test case requires test data with a BOM structure spanning 10+ levels, which may not exist in all test systems. Test data setup may require manual creation of multi-level manufacturing orders. Automation is PARTIAL due to test data dependency complexity.
