# TC-CS-047: Attempt to Post Goods Receipt with Expiration Date Field Empty

**User Story:**          [CS-18] Receive Materials Into Batch-Managed Stock And Capture The Manufacturi
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch-Managed Goods Receipt Mandatory Field Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | Warehouse Operator role with SAP authorization |
| P2 | System Access | SAP Fiori Launchpad accessible at `{ENV.SAP_FIORI_URL}` |
| P3 | Master Data | PO `{TD.poNumber}` exists with batch-managed material |
| P4 | Master Data | Material `{TD.materialId}` is batch-managed WITHOUT auto-calculation of expiration date (no shelf-life profile configured) |
| P5 | Test Condition | Expiration Date field intentionally left empty when manual entry is required per AC-2 |
| P6 | Configuration | All OTHER mandatory fields populated with valid values |

---

### Test Data

**Dataset Reference:** `testdata/CS-18/CS-18-testdata.json` — Dataset ID: `TD-CS-18-ERR-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PO Number | `{TD.poNumber}` | Valid PO | Valid |
| PO Item | `{TD.poItem}` | Valid item | Valid |
| Material | `{TD.materialId}` | Batch-managed material (no shelf-life profile) | Valid |
| Batch | `{TD.batchNumber}` | Valid batch | Valid |
| Quantity | `{TD.quantity}` | Valid quantity | Valid |
| Manufacturing Date | `{TD.manufacturingDate}` | Valid mfg date | Valid |
| Expiration Date | `{TD.emptyValue}` | EMPTY | Invalid |
| Vendor Batch | `{TD.vendorBatch}` | Valid vendor batch | Valid |
| Plant | `{TD.plant}` | Valid plant | Valid |
| Storage Location | `{TD.storageLocation}` | Valid storage location | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-8 | [Standard login and app navigation] | `{ENV.*}` | "Post Goods Receipt" app opens |
| 9-14 | [PO and item selection] | `{TD.poNumber}`, `{TD.poItem}`, `{TD.materialId}`, `{TD.quantity}` | Quantity confirmed |
| 15 | Enter Batch | `{TD.batchNumber}` | Batch entered |
| 16 | Press Enter | — | Batch accepted |
| 17 | Enter Manufacturing Date | `{TD.manufacturingDate}` | Mfg date entered |
| 18 | Press Enter | — | Mfg date confirmed; Expiration Date NOT auto-calculated (no shelf-life profile) |
| 19 | Verify Expiration Date field remains empty | — | Expiration Date field is blank; system did NOT auto-calculate (material has no shelf-life profile) |
| 20 | Do NOT enter Expiration Date (leave field empty) | `{TD.emptyValue}` | Expiration Date field remains blank |
| 21 | Enter Vendor Batch | `{TD.vendorBatch}` | Vendor batch entered |
| 22 | Verify Plant | `{TD.plant}` | Plant correct |
| 23 | Enter Storage Location | `{TD.storageLocation}` | Storage location entered |
| 24 | Click "Post" | — | SAP detects missing Expiration Date; error displayed; field highlighted; posting blocked per AC-2 |
| 25 | Observe error | — | Error indicates Expiration Date is mandatory when not auto-calculated |
| 26 | Verify no document | — | No Material Document |
| 27-29 | [Sign out] | — | Signed out |

---

### Expected Final Result

- SAP prevents posting due to missing Expiration Date per AC-2
- Error message indicates Expiration Date is mandatory
- Expiration Date field highlighted
- No Material Document created
- No batch record created

---

### Post-conditions

- No Material Document exists
- No batch record
- Inventory unchanged

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
