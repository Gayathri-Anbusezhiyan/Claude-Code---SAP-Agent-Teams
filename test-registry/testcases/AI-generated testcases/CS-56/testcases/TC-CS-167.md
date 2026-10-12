# TC-CS-167: View genealogy for a finished goods batch with single-level BOM

**User Story:**          [CS-56] View A Batch Genealogy Report Showing The Complete Lineage From Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control / Quality Management (PP/QM)
**Feature:**             Batch Genealogy Report
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to access Batch Information Cockpit and view batch genealogy data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished goods batch `{TD.finishedGoodsBatchNumber}` exists in SAP batch master (MCHA), is released, and assigned to plant `{TD.plant}` |
| P4 | Master Data | Material `{TD.finishedGoodsMaterialId}` is batch-managed, active, and configured for plant `{TD.plant}` |
| P5 | Master Data | Component batches `{TD.componentBatch1}` and `{TD.componentBatch2}` exist in SAP batch master and are linked to the finished goods batch via manufacturing order confirmation |
| P6 | Configuration | Batch determination is active for the finished goods material and all component materials; batch where-used tracking is enabled |
| P7 | Transaction Data | Manufacturing order `{TD.manufacturingOrderNumber}` has been confirmed with batch consumption of component batches and batch output of finished goods batch |

---

### Test Data

**Dataset Reference:** `testdata/CS-56/CS-56-testdata.json` — Dataset ID: `TD-CS-056-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Goods Batch Number | `{TD.finishedGoodsBatchNumber}` | Finished product batch number with single-level BOM — entered by user | Valid |
| Finished Goods Material ID | `{TD.finishedGoodsMaterialId}` | Material master number for finished goods — auto-populated by SAP | Valid |
| Plant | `{TD.plant}` | Plant code where batch was produced — auto-populated by SAP | Valid |
| Component Batch 1 | `{TD.componentBatch1}` | First component batch consumed in production — displayed in genealogy report | Valid |
| Component Batch 2 | `{TD.componentBatch2}` | Second component batch consumed in production — displayed in genealogy report | Valid |
| Manufacturing Order Number | `{TD.manufacturingOrderNumber}` | Production order that produced the finished goods batch — displayed in genealogy report | Valid |
| Manufacturing Date | `{TD.manufacturingDate}` | Date when the batch was produced — displayed in genealogy report | Valid |
| Release Date | `{TD.releaseDate}` | Date when the batch was released to unrestricted use — displayed in genealogy report | Valid |
| Vendor Name 1 | `{TD.vendorName1}` | Supplier of component batch 1 — displayed in genealogy report | Valid |
| Vendor Name 2 | `{TD.vendorName2}` | Supplier of component batch 2 — displayed in genealogy report | Valid |

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
| 9 | In the "Batch" field, enter the finished goods batch number | `{TD.finishedGoodsBatchNumber}` | Batch number is entered into the field |
| 10 | Press Enter to confirm the batch entry | — | SAP validates the batch number; the field is accepted |
| 11 | Click the "Go" button or press Enter to execute the search | — | SAP begins processing the genealogy query |
| 12 | Observe the query execution and wait for results to load | — | Genealogy report is displayed showing the batch structure in hierarchical tree format |
| 13 | Verify that the finished goods batch number appears at the top level of the report | `{TD.finishedGoodsBatchNumber}` | Finished goods batch is displayed as the root node in the genealogy tree |
| 14 | Verify that the finished goods material ID is displayed next to the batch number | `{TD.finishedGoodsMaterialId}` | Material ID is shown in the report header or tree node |
| 15 | Expand the finished goods batch node to view component batches | — | Component batches are displayed as child nodes under the finished goods batch |
| 16 | Verify that component batch 1 is listed as a consumed batch | `{TD.componentBatch1}` | Component batch 1 is displayed in the component list with appropriate icon or indentation |
| 17 | Verify that component batch 2 is listed as a consumed batch | `{TD.componentBatch2}` | Component batch 2 is displayed in the component list |
| 18 | Verify that vendor name for component batch 1 is displayed | `{TD.vendorName1}` | Vendor name 1 is shown in the component batch 1 row or detail panel |
| 19 | Verify that vendor name for component batch 2 is displayed | `{TD.vendorName2}` | Vendor name 2 is shown in the component batch 2 row or detail panel |
| 20 | Verify that the manufacturing order number is displayed | `{TD.manufacturingOrderNumber}` | Manufacturing order number is shown in the report linking the component batches to the finished goods batch |
| 21 | Verify that the manufacturing date is displayed | `{TD.manufacturingDate}` | Manufacturing date is shown in the report header or detail section |
| 22 | Verify that the release date is displayed | `{TD.releaseDate}` | Release date is shown in the report indicating when the batch was released to unrestricted use |
| 23 | Note the query execution time from the initial search click to results display | — | Query completes within an acceptable time frame (typically under 10 seconds) |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Batch Information Cockpit displays a complete single-level genealogy report for the specified finished goods batch
- All component batches consumed in production are listed with their batch numbers
- Vendor information for each component batch is displayed (vendor name and vendor batch number)
- Manufacturing order number linking components to finished goods is shown
- Relevant dates are displayed: manufacturing date and release date
- The genealogy query completes within an acceptable time frame (under 10 seconds)
- The report structure is clear and hierarchical, allowing the Production Supervisor to quickly identify the raw material sources for recall investigation

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
