# TC-CS-183: Verify vendor batch number linkage from MM goods receipt to PP batch genealogy

**User Story:**          [CS-56] View A Batch Genealogy Report Showing The Complete Lineage From Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control / Quality Management (PP/QM)
**Feature:**             Batch Genealogy Report
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to access Batch Information Cockpit and view batch genealogy data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished goods batch `{TD.finishedGoodsBatchIntegrationMM}` exists and was produced using raw material batch `{TD.rawMaterialBatchMM}` that was received via MM goods receipt |
| P4 | Transaction Data | Goods receipt `{TD.goodsReceiptNumber}` was posted in MM for raw material batch `{TD.rawMaterialBatchMM}` with vendor batch number `{TD.vendorBatchNumber}` |
| P5 | Transaction Data | Manufacturing order was confirmed with consumption of raw material batch `{TD.rawMaterialBatchMM}` to produce finished goods batch `{TD.finishedGoodsBatchIntegrationMM}` |
| P6 | Integration | MM-PP integration is active; vendor batch classification data from MM goods receipt is accessible in PP batch genealogy |

---

### Test Data

**Dataset Reference:** `testdata/CS-56/CS-56-testdata.json` — Dataset ID: `TD-CS-056-INT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Goods Batch (MM Integration) | `{TD.finishedGoodsBatchIntegrationMM}` | Finished product batch with MM-sourced components — entered by user | Valid |
| Raw Material Batch | `{TD.rawMaterialBatchMM}` | Raw material batch received via MM goods receipt — displayed in genealogy | Valid |
| Vendor Batch Number | `{TD.vendorBatchNumber}` | Vendor's batch number assigned at goods receipt in MM — displayed in genealogy | Valid |
| Vendor Name | `{TD.vendorName}` | Supplier name from MM vendor master — displayed in genealogy | Valid |
| Goods Receipt Number | `{TD.goodsReceiptNumber}` | MM goods receipt document number — used for verification | Valid |
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
| 9 | In the "Batch" field, enter the finished goods batch number | `{TD.finishedGoodsBatchIntegrationMM}` | Batch number is entered into the field |
| 10 | Press Enter to confirm the batch entry | — | SAP validates the batch number; the field is accepted |
| 11 | Click the "Go" button or press Enter to execute the search | — | SAP begins processing the genealogy query |
| 12 | Observe the query execution and wait for results to load | — | Genealogy report is displayed showing the batch structure |
| 13 | Verify that the finished goods batch number is displayed | `{TD.finishedGoodsBatchIntegrationMM}` | Batch number is displayed as the root node |
| 14 | Expand the finished goods batch node to view component batches | — | Component batches are displayed as child nodes |
| 15 | Locate the raw material batch that was received via MM goods receipt | `{TD.rawMaterialBatchMM}` | Raw material batch is displayed in the component list |
| 16 | Verify that the vendor batch number from MM goods receipt is displayed | `{TD.vendorBatchNumber}` | Vendor batch number is shown in the raw material batch row or detail panel, confirming MM-PP data linkage |
| 17 | Verify that the vendor name from MM vendor master is displayed | `{TD.vendorName}` | Vendor name is shown next to or associated with the raw material batch, confirming MM-PP integration |
| 18 | If the system supports drill-down to source documents, verify that the goods receipt number is accessible | `{TD.goodsReceiptNumber}` | Goods receipt number is displayed or accessible via drill-down, confirming traceability back to MM source document |
| 19 | Verify that the vendor batch number matches the value recorded in the MM goods receipt | `{TD.vendorBatchNumber}` | Vendor batch number in genealogy report matches the vendor batch classification maintained in MM during goods receipt |
| 20 | Verify that the integration provides complete traceability from finished goods back to the vendor source | — | Genealogy report shows complete lineage: finished goods → raw material batch → vendor batch number → vendor name, enabling complete supplier traceability for recall investigations |
| 21 | Verify that the query completes within an acceptable time frame | — | Query completes within acceptable threshold (typically under 10 seconds) |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Batch Information Cockpit successfully displays vendor batch information from MM goods receipt in the PP batch genealogy report
- Vendor batch number recorded in MM is correctly displayed in the genealogy report
- Vendor name from MM vendor master is displayed in the genealogy report
- MM-PP integration provides complete traceability from finished goods batch back to the originating vendor and vendor batch
- The Production Supervisor can identify the vendor source of raw materials for regulatory recall investigations
- The query completes within an acceptable time frame

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

**Integration Verification:**
- Vendor batch number in genealogy report: _______
- Vendor batch number in MM goods receipt (verified separately): _______
- Match status: PASS (match) / FAIL (mismatch)

---

**Note:** This test case requires pre-existing MM goods receipt with vendor batch classification and subsequent production order confirmation. Test data orchestration is complex; automation is PARTIAL due to multi-module data dependencies.
