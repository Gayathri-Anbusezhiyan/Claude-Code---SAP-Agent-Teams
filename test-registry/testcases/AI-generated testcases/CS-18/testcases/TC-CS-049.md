# TC-CS-049: Attempt to Post Goods Receipt with Zero Quantity

**User Story:**          [CS-18] Receive Materials Into Batch-Managed Stock And Capture The Manufacturi
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch-Managed Goods Receipt Boundary Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | Warehouse Operator role |
| P2 | System Access | SAP accessible at `{ENV.SAP_FIORI_URL}` |
| P3 | Master Data | PO `{TD.poNumber}` exists |
| P4 | Test Condition | Quantity = 0 (invalid boundary) |

---

### Test Data

**Dataset Reference:** `testdata/CS-18/CS-18-testdata.json` — Dataset ID: `TD-CS-18-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Quantity | `{TD.zeroQuantity}` | Zero (invalid) | Invalid |
| [All other fields] | `{TD.*}` | Valid values | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-12 | [Standard steps] | `{ENV.*}`, `{TD.*}` | Material shown |
| 13 | Enter zero quantity | `{TD.zeroQuantity}` | Zero entered |
| 14 | Press Enter | — | SAP rejects zero; error displayed |
| 15-23 | [Complete other fields] | `{TD.*}` | Fields populated |
| 24 | Click "Post" | — | SAP prevents posting; error confirms quantity must be > 0; no document created |
| 25-27 | [Sign out] | — | Signed out |

---

### Expected Final Result

- SAP rejects zero quantity
- Error message displayed
- No Material Document created

---

### Post-conditions

- No document created
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
