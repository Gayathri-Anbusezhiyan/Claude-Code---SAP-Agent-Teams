# TC-CS-048: Post Goods Receipt with Minimum Valid Quantity

**User Story:**          [CS-18] Receive Materials Into Batch-Managed Stock And Capture The Manufacturi
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch-Managed Goods Receipt Boundary Testing
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | Warehouse Operator role with SAP authorization |
| P2 | System Access | SAP Fiori Launchpad accessible at `{ENV.SAP_FIORI_URL}` |
| P3 | Master Data | PO `{TD.poNumber}` exists with batch-managed material |
| P4 | Master Data | Material `{TD.materialId}` is batch-managed |
| P5 | Test Condition | Quantity is set to the minimum valid boundary value (typically 0.001 or UoM-specific minimum) |

---

### Test Data

**Dataset Reference:** `testdata/CS-18/CS-18-testdata.json` — Dataset ID: `TD-CS-18-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PO Number | `{TD.poNumber}` | Valid PO | Valid |
| PO Item | `{TD.poItem}` | Valid item | Valid |
| Material | `{TD.materialId}` | Batch-managed material | Valid |
| Batch | `{TD.batchNumber}` | Valid batch | Valid |
| Quantity | `{TD.minQuantity}` | Minimum valid quantity (lower boundary) | Valid |
| Manufacturing Date | `{TD.manufacturingDate}` | Valid mfg date | Valid |
| Expiration Date | `{TD.expirationDate}` | Valid expiration date | Valid |
| Vendor Batch | `{TD.vendorBatch}` | Vendor batch | Valid |
| Plant | `{TD.plant}` | Valid plant | Valid |
| Storage Location | `{TD.storageLocation}` | Valid storage location | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-8 | [Standard login and navigation] | `{ENV.*}` | App opens |
| 9-12 | [PO selection] | `{TD.poNumber}`, `{TD.poItem}`, `{TD.materialId}` | Material shown |
| 13 | Enter minimum quantity | `{TD.minQuantity}` | Min quantity entered |
| 14 | Press Enter | — | Quantity accepted |
| 15-24 | [Batch, dates, vendor batch, plant, storage location entry] | `{TD.*}` | All fields populated |
| 25 | Click "Post" | — | SAP accepts minimum quantity; posting succeeds; Material Document generated |
| 26 | Note document number | — | Document number displayed |
| 27-32 | [Verify batch in Display Batch app] | `{TD.batchNumber}` | Batch visible with min quantity |
| 33-35 | [Sign out] | — | Signed out |

---

### Expected Final Result

- SAP accepts minimum quantity and successfully posts Goods Receipt
- Material Document created
- Batch master record created with minimum quantity
- Inventory updated correctly

---

### Post-conditions

- Material Document exists
- Batch record created
- Inventory reflects minimum quantity

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
