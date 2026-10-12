# TC-CS-172: Search with both component view and where-used view enabled (bidirectional genealogy)

**User Story:**          [CS-56] View A Batch Genealogy Report Showing The Complete Lineage From Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control / Quality Management (PP/QM)
**Feature:**             Batch Genealogy Report
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to access Batch Information Cockpit and view bidirectional batch genealogy data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished goods batch `{TD.finishedGoodsBatchBidirectional}` exists in SAP batch master (MCHA), is released, and assigned to plant `{TD.plant}` |
| P4 | Master Data | Component batches exist and were consumed to produce `{TD.finishedGoodsBatchBidirectional}` (upstream genealogy data) |
| P5 | Master Data | Repackaged or further-processed batch `{TD.repackagedBatchBidirectional}` exists and consumed `{TD.finishedGoodsBatchBidirectional}` (downstream where-used data) |
| P6 | Configuration | Batch determination and bidirectional where-used tracking are enabled; system supports simultaneous component and where-used view |

---

### Test Data

**Dataset Reference:** `testdata/CS-56/CS-56-testdata.json` — Dataset ID: `TD-CS-056-006`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Goods Batch (Bidirectional) | `{TD.finishedGoodsBatchBidirectional}` | Finished product batch with both upstream and downstream relationships — entered by user | Valid |
| Finished Goods Material ID | `{TD.finishedGoodsMaterialIdBidirectional}` | Material master number for finished goods — auto-populated by SAP | Valid |
| Component Batch Upstream | `{TD.componentBatchUpstream}` | Component batch consumed to produce the finished goods batch — displayed in component view | Valid |
| Repackaged Batch Downstream | `{TD.repackagedBatchBidirectional}` | Batch that consumed the finished goods batch — displayed in where-used view | Valid |
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
| 9 | In the "Batch" field, enter the finished goods batch number | `{TD.finishedGoodsBatchBidirectional}` | Batch number is entered into the field |
| 10 | Press Enter to confirm the batch entry | — | SAP validates the batch number; the field is accepted |
| 11 | Locate the search direction or scope setting (e.g., "Direction" dropdown or "Usage" option) | — | Search scope selector is visible with options such as "Components Only", "Where Used Only", or "Both" |
| 12 | Select "Both" or enable both "Components" and "Where Used" views | — | Bidirectional genealogy view is activated |
| 13 | Click the "Go" button or press Enter to execute the search | — | SAP begins processing the bidirectional genealogy query |
| 14 | Observe the query execution and wait for results to load | — | Bidirectional genealogy report is displayed showing both upstream components and downstream where-used batches |
| 15 | Verify that the finished goods batch number appears as the central or starting point | `{TD.finishedGoodsBatchBidirectional}` | Batch number is displayed as the root node or central focus in the bidirectional view |
| 16 | Verify that the finished goods material ID is displayed | `{TD.finishedGoodsMaterialIdBidirectional}` | Material ID is shown in the report |
| 17 | Locate the component (upstream) section or tree branch | — | Component section or upstream branch is visible with consumed batches |
| 18 | Verify that the component batch consumed to produce the finished goods is displayed | `{TD.componentBatchUpstream}` | Component batch is displayed in the upstream/component section with appropriate indentation or linkage icon |
| 19 | Locate the where-used (downstream) section or tree branch | — | Where-used section or downstream branch is visible with batches that consumed the finished goods batch |
| 20 | Verify that the repackaged batch that consumed the finished goods batch is displayed | `{TD.repackagedBatchBidirectional}` | Repackaged batch is displayed in the downstream/where-used section with appropriate indentation or linkage icon |
| 21 | Verify that the report clearly distinguishes between upstream (components) and downstream (where-used) relationships | — | Report layout uses visual cues such as separate sections, tree branches, or labels (e.g., "Components", "Where Used") to differentiate upstream and downstream data |
| 22 | Verify that the bidirectional view provides a complete picture of the batch's role in the production chain | — | The report shows both what went into the batch (components) and what the batch was used to produce (where-used), allowing full traceability in both directions |
| 23 | Note the query execution time from the initial search click to full bidirectional results display | — | Query completes within an acceptable time frame (typically under 10 seconds for bidirectional genealogy) |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Batch Information Cockpit displays a complete bidirectional genealogy report showing both upstream components and downstream where-used batches
- Upstream (component) data shows what batches were consumed to produce the searched batch
- Downstream (where-used) data shows what batches consumed the searched batch in further processing
- The report layout clearly distinguishes between upstream and downstream relationships
- The bidirectional view provides comprehensive traceability for complete recall scope determination
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
