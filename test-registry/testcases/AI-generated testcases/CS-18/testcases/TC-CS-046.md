# TC-CS-046: Attempt to Post Goods Receipt with Manufacturing Date Field Empty

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
| P1 | User Role | User has Warehouse Operator role with SAP authorization |
| P2 | System Access | SAP Fiori Launchpad accessible at `{ENV.SAP_FIORI_URL}` |
| P3 | Master Data | PO `{TD.poNumber}` exists with batch-managed material |
| P4 | Master Data | Material `{TD.materialId}` is batch-managed |
| P5 | Test Condition | Manufacturing Date field intentionally left empty per AC-2 test |
| P6 | Configuration | All OTHER mandatory fields populated with valid values |

---

### Test Data

**Dataset Reference:** `testdata/CS-18/CS-18-testdata.json` — Dataset ID: `TD-CS-18-ERR-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PO Number | `{TD.poNumber}` | Valid PO | Valid |
| PO Item | `{TD.poItem}` | Valid item | Valid |
| Material | `{TD.materialId}` | Batch-managed material | Valid |
| Batch | `{TD.batchNumber}` | Valid batch | Valid |
| Quantity | `{TD.quantity}` | Valid quantity | Valid |
| Manufacturing Date | `{TD.emptyValue}` | EMPTY | Invalid |
| Expiration Date | `{TD.expirationDate}` | Valid date | Valid |
| Vendor Batch | `{TD.vendorBatch}` | Valid vendor batch | Valid |
| Plant | `{TD.plant}` | Valid plant | Valid |
| Storage Location | `{TD.storageLocation}` | Valid storage location | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-8 | [Standard login and app navigation steps 1-8] | `{ENV.*}` | "Post Goods Receipt" app opens |
| 9-14 | [Standard PO and item selection steps 9-14] | `{TD.poNumber}`, `{TD.poItem}`, `{TD.materialId}`, `{TD.quantity}` | Quantity confirmed |
| 15 | Enter Batch | `{TD.batchNumber}` | Batch entered |
| 16 | Press Enter | — | Batch accepted |
| 17 | Leave Manufacturing Date field EMPTY | `{TD.emptyValue}` | Mfg Date field blank |
| 18 | Enter Expiration Date | `{TD.expirationDate}` | Expiration date entered |
| 19 | Press Enter | — | Expiration confirmed |
| 20 | Enter Vendor Batch | `{TD.vendorBatch}` | Vendor batch entered |
| 21 | Verify Plant | `{TD.plant}` | Plant correct |
| 22 | Enter Storage Location | `{TD.storageLocation}` | Storage location entered |
| 23 | Click "Post" | — | SAP detects missing Manufacturing Date; error displayed; field highlighted; posting blocked |
| 24 | Observe error | — | Error indicates Manufacturing Date is mandatory |
| 25 | Verify no document | — | No Material Document |
| 26-28 | [Sign out steps] | — | Signed out |

---

### Expected Final Result

- SAP prevents posting due to missing Manufacturing Date per AC-2
- Error message indicates Manufacturing Date is mandatory
- Manufacturing Date field highlighted
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
