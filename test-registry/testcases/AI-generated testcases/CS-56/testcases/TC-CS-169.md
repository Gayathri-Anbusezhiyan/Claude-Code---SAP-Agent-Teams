# TC-CS-169: View where-used chain for a batch that was further processed (finished → repackaged)

**User Story:**          [CS-56] View A Batch Genealogy Report Showing The Complete Lineage From Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control / Quality Management (PP/QM)
**Feature:**             Batch Genealogy Report
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to access Batch Information Cockpit and view batch where-used data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished goods batch `{TD.finishedGoodsBatchWhereUsed}` exists in SAP batch master (MCHA), is released, and assigned to plant `{TD.plant}` |
| P4 | Master Data | Repackaged batch `{TD.repackagedBatch}` exists and was produced by consuming the finished goods batch `{TD.finishedGoodsBatchWhereUsed}` |
| P5 | Configuration | Batch where-used tracking is enabled for the finished goods material; batch determination is active for the repackaged material |
| P6 | Transaction Data | Manufacturing order or repackaging order `{TD.repackagingOrderNumber}` has been confirmed with batch consumption of `{TD.finishedGoodsBatchWhereUsed}` and batch output of `{TD.repackagedBatch}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-56/CS-56-testdata.json` — Dataset ID: `TD-CS-056-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Goods Batch (Where-Used) | `{TD.finishedGoodsBatchWhereUsed}` | Finished product batch that was further processed — entered by user | Valid |
| Finished Goods Material ID | `{TD.finishedGoodsMaterialIdWhereUsed}` | Material master number for finished goods — auto-populated by SAP | Valid |
| Repackaged Batch | `{TD.repackagedBatch}` | Batch produced by repackaging the finished goods batch — displayed in where-used chain | Valid |
| Repackaged Material ID | `{TD.repackagedMaterialId}` | Material master number for repackaged product — displayed in where-used chain | Valid |
| Repackaging Order Number | `{TD.repackagingOrderNumber}` | Production or repackaging order number — displayed in where-used chain | Valid |
| Plant | `{TD.plant}` | Plant code where batches were produced — auto-populated by SAP | Valid |
| Manufacturing Date | `{TD.manufacturingDate}` | Date when finished goods batch was originally produced — displayed in report | Valid |
| Repackaging Date | `{TD.repackagingDate}` | Date when the batch was repackaged — displayed in where-used chain | Valid |
| Release Date | `{TD.releaseDate}` | Date when finished goods batch was released — displayed in report | Valid |

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
| 9 | In the "Batch" field, enter the finished goods batch number | `{TD.finishedGoodsBatchWhereUsed}` | Batch number is entered into the field |
| 10 | Press Enter to confirm the batch entry | — | SAP validates the batch number; the field is accepted |
| 11 | Locate the search direction or scope setting (e.g., "Where Used" or "Usage" option) | — | Search scope selector is visible with options such as "Components", "Where Used", or "Both" |
| 12 | Select "Where Used" or enable where-used view to display downstream usage | — | Where-used view is activated |
| 13 | Click the "Go" button or press Enter to execute the search | — | SAP begins processing the where-used genealogy query |
| 14 | Observe the query execution and wait for results to load | — | Where-used chain report is displayed showing downstream batches that consumed the searched batch |
| 15 | Verify that the finished goods batch number appears as the starting point | `{TD.finishedGoodsBatchWhereUsed}` | Finished goods batch is displayed at the top or as the root node in the where-used view |
| 16 | Verify that the finished goods material ID is displayed | `{TD.finishedGoodsMaterialIdWhereUsed}` | Material ID is shown in the report |
| 17 | Verify that the repackaged batch is listed as a downstream batch | `{TD.repackagedBatch}` | Repackaged batch is displayed in the where-used chain with appropriate indentation or linkage icon |
| 18 | Verify that the repackaged material ID is displayed | `{TD.repackagedMaterialId}` | Repackaged material ID is shown next to the repackaged batch number |
| 19 | Verify that the repackaging order number is displayed | `{TD.repackagingOrderNumber}` | Repackaging order number is shown linking the finished goods batch to the repackaged batch |
| 20 | Verify that the manufacturing date for the original finished goods batch is displayed | `{TD.manufacturingDate}` | Manufacturing date is shown in the report |
| 21 | Verify that the repackaging date is displayed | `{TD.repackagingDate}` | Repackaging date is shown indicating when the finished goods batch was consumed to produce the repackaged batch |
| 22 | Verify that the release date for the finished goods batch is displayed | `{TD.releaseDate}` | Release date is shown in the report |
| 23 | Verify that the where-used chain clearly shows the lineage: finished goods → repackaged | — | Tree or list structure displays the downstream relationship with clear parent-child or usage linkage |
| 24 | Note the query execution time from the initial search click to where-used results display | — | Query completes within an acceptable time frame (typically under 10 seconds) |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Batch Information Cockpit displays a complete where-used chain showing the downstream usage of the finished goods batch
- The repackaged batch is listed as a batch that consumed the searched finished goods batch
- The repackaging order number linking the two batches is displayed
- Relevant dates are displayed: original manufacturing date, repackaging date, and release date
- The where-used chain is clear and allows the Production Supervisor to identify all downstream products that may be affected by a recall of the original finished goods batch
- The query completes within an acceptable time frame (under 10 seconds)

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
