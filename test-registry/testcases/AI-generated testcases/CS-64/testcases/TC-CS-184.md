# TC-CS-184: Verify Process Order Linkage Displayed Correctly for Batches Created via Production Order

**User Story:**          [CS-64] Review A Batch Release Dashboard Showing All Batches Pending Final Qa
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP) → Quality Management (QM)
**Feature:**             Batch Release Dashboard — Process Order Integration
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Manager with SAP authorization to access the Batch Release Fiori app and view production data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Batch `{TD.batchNumberWithPO}` exists in Quality Inspection status |
| P4 | Master Data | Batch `{TD.batchNumberWithPO}` was created via a production order / process order `{TD.processOrderLinked}` in SAP PP |
| P5 | Configuration | Batch-to-process-order linkage is configured and maintained in the SAP system (batch master table MCHA linked to production order AFKO) |

---

### Test Data

**Dataset Reference:** `testdata/CS-64/CS-64-testdata.json` — Dataset ID: `TD-CS-064-INT-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.batchNumberWithPO}` | Batch linked to a production order | Valid |
| Process Order | `{TD.processOrderLinked}` | Production order / process order that created the batch | Valid |
| Material | `{TD.materialForProcessOrder}` | Material produced by the process order | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Batch Release" | — | Search results appear listing the Batch Release analytical Fiori app |
| 8 | Click the "Batch Release" app from the search results | — | Batch Release Dashboard opens displaying the batch list |
| 9 | Locate the batch row with Batch Number | `{TD.batchNumberWithPO}` | Batch `{TD.batchNumberWithPO}` is displayed in the dashboard table |
| 10 | Verify the Process Order column displays the linked process order number | `{TD.processOrderLinked}` | Process Order column shows `{TD.processOrderLinked}` (the production order that created the batch) |
| 11 | Verify the process order number is correctly associated with the batch (no blank or incorrect value) | `{TD.processOrderLinked}` | Process order number is accurate and matches the expected production order |
| 12 | Click the Batch Number hyperlink to drill down (if available) | `{TD.batchNumberWithPO}` | Batch detail screen opens |
| 13 | Verify the batch detail screen displays the Process Order linkage in the batch record | `{TD.processOrderLinked}` | Batch record attributes include Process Order `{TD.processOrderLinked}` |
| 14 | Verify the material displayed in the batch record matches the material from the production order | `{TD.materialForProcessOrder}` | Material `{TD.materialForProcessOrder}` is displayed correctly |
| 15 | Navigate back to the Batch Release Dashboard | — | Dashboard is displayed again with the batch list |
| 16 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 17 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 18 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Batch Release Dashboard correctly displays the Process Order linkage for batches created via production orders
- The integration between Production Planning (PP) and Quality Management (QM) maintains accurate batch-to-process-order traceability
- QA Managers can trace batch origin back to the production order for full manufacturing traceability

---

### Post-conditions

- User has verified the process order linkage for batch `{TD.batchNumberWithPO}` is correctly displayed in the dashboard
- Cross-module integration (PP → QM) is verified as functioning correctly for batch traceability

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
