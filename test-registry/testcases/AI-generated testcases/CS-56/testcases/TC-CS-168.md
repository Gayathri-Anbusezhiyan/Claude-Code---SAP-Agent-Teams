# TC-CS-168: View genealogy for a finished goods batch with multi-level BOM (raw → intermediate → finished)

**User Story:**          [CS-56] View A Batch Genealogy Report Showing The Complete Lineage From Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control / Quality Management (PP/QM)
**Feature:**             Batch Genealogy Report
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to access Batch Information Cockpit and view batch genealogy data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished goods batch `{TD.finishedGoodsBatchMultiLevel}` exists in SAP batch master (MCHA), is released, and assigned to plant `{TD.plant}` |
| P4 | Master Data | Intermediate batch `{TD.intermediateBatch}` exists and was consumed to produce the finished goods batch |
| P5 | Master Data | Raw material batches `{TD.rawMaterialBatch1}` and `{TD.rawMaterialBatch2}` exist and were consumed to produce the intermediate batch |
| P6 | Configuration | Batch determination is active for all materials (raw, intermediate, finished); multi-level batch where-used tracking is enabled |
| P7 | Transaction Data | Manufacturing orders for intermediate and finished goods production have been confirmed with batch consumption and output assignments spanning at least 3 BOM levels |

---

### Test Data

**Dataset Reference:** `testdata/CS-56/CS-56-testdata.json` — Dataset ID: `TD-CS-056-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Goods Batch Number (Multi-Level) | `{TD.finishedGoodsBatchMultiLevel}` | Finished product batch with multi-level BOM — entered by user | Valid |
| Finished Goods Material ID | `{TD.finishedGoodsMaterialIdMultiLevel}` | Material master number for finished goods — auto-populated by SAP | Valid |
| Intermediate Batch | `{TD.intermediateBatch}` | Semi-finished batch consumed to produce finished goods — displayed in genealogy report | Valid |
| Intermediate Material ID | `{TD.intermediateMaterialId}` | Material master number for intermediate product — displayed in genealogy report | Valid |
| Raw Material Batch 1 | `{TD.rawMaterialBatch1}` | First raw material batch consumed to produce intermediate — displayed in genealogy report | Valid |
| Raw Material Batch 2 | `{TD.rawMaterialBatch2}` | Second raw material batch consumed to produce intermediate — displayed in genealogy report | Valid |
| Plant | `{TD.plant}` | Plant code where batches were produced — auto-populated by SAP | Valid |
| Manufacturing Date Finished | `{TD.manufacturingDateFinished}` | Date when finished goods batch was produced — displayed in report | Valid |
| Manufacturing Date Intermediate | `{TD.manufacturingDateIntermediate}` | Date when intermediate batch was produced — displayed in report | Valid |
| Release Date | `{TD.releaseDate}` | Date when finished goods batch was released — displayed in report | Valid |
| Vendor Name Raw1 | `{TD.vendorNameRaw1}` | Supplier of raw material batch 1 — displayed in report | Valid |
| Vendor Name Raw2 | `{TD.vendorNameRaw2}` | Supplier of raw material batch 2 — displayed in report | Valid |

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
| 9 | In the "Batch" field, enter the finished goods batch number | `{TD.finishedGoodsBatchMultiLevel}` | Batch number is entered into the field |
| 10 | Press Enter to confirm the batch entry | — | SAP validates the batch number; the field is accepted |
| 11 | Click the "Go" button or press Enter to execute the search | — | SAP begins processing the multi-level genealogy query |
| 12 | Observe the query execution and wait for results to load | — | Multi-level genealogy report is displayed showing the batch structure in hierarchical tree format spanning multiple BOM levels |
| 13 | Verify that the finished goods batch number appears at the top level of the report | `{TD.finishedGoodsBatchMultiLevel}` | Finished goods batch is displayed as the root node in the genealogy tree |
| 14 | Verify that the finished goods material ID is displayed | `{TD.finishedGoodsMaterialIdMultiLevel}` | Material ID is shown in the report header or tree node |
| 15 | Expand the finished goods batch node to view consumed batches | — | Intermediate batch node is displayed as a child node under the finished goods batch |
| 16 | Verify that the intermediate batch is listed as a consumed batch | `{TD.intermediateBatch}` | Intermediate batch is displayed with appropriate indentation or tree icon indicating Level 2 |
| 17 | Verify that the intermediate material ID is displayed | `{TD.intermediateMaterialId}` | Intermediate material ID is shown next to the intermediate batch number |
| 18 | Expand the intermediate batch node to view its component batches | — | Raw material batch nodes are displayed as child nodes under the intermediate batch |
| 19 | Verify that raw material batch 1 is listed as a consumed batch | `{TD.rawMaterialBatch1}` | Raw material batch 1 is displayed with appropriate indentation indicating Level 3 |
| 20 | Verify that raw material batch 2 is listed as a consumed batch | `{TD.rawMaterialBatch2}` | Raw material batch 2 is displayed with appropriate indentation indicating Level 3 |
| 21 | Verify that vendor name for raw material batch 1 is displayed | `{TD.vendorNameRaw1}` | Vendor name for raw material batch 1 is shown in the batch row or detail panel |
| 22 | Verify that vendor name for raw material batch 2 is displayed | `{TD.vendorNameRaw2}` | Vendor name for raw material batch 2 is shown in the batch row or detail panel |
| 23 | Verify that the manufacturing date for the finished goods batch is displayed | `{TD.manufacturingDateFinished}` | Manufacturing date for finished goods is shown in the report |
| 24 | Verify that the manufacturing date for the intermediate batch is displayed | `{TD.manufacturingDateIntermediate}` | Manufacturing date for intermediate batch is shown in the report |
| 25 | Verify that the release date for the finished goods batch is displayed | `{TD.releaseDate}` | Release date is shown indicating when the finished goods batch was released to unrestricted use |
| 26 | Verify that the genealogy tree clearly shows the lineage: raw materials → intermediate → finished goods | — | Tree structure displays at least 3 levels of batch relationships with clear parent-child linkages |
| 27 | Note the query execution time from the initial search click to full multi-level results display | — | Query completes within an acceptable time frame (typically under 10 seconds for multi-level genealogy) |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Batch Information Cockpit displays a complete multi-level genealogy report spanning at least 3 BOM levels (raw → intermediate → finished)
- All batch relationships are correctly displayed in a hierarchical tree structure
- Raw material batches consumed at the lowest level are linked to the intermediate batch
- The intermediate batch is linked to the finished goods batch at the top level
- Vendor information for all raw material batches is displayed
- Manufacturing dates for both intermediate and finished goods batches are shown
- Release date for the finished goods batch is displayed
- The genealogy query completes within an acceptable time frame (under 10 seconds)
- The Production Supervisor can trace the complete lineage from raw materials through all production stages to the finished product, supporting regulatory recall investigations

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
