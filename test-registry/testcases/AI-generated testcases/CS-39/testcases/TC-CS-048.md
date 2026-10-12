# TC-CS-048: Attempt to Add Batch-Managed Material Without Batch Number

**User Story:**          [CS-39] Process A Free Goods (Sample) Order For A Healthcare Provider
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Free Goods Order Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Sales Representative with SAP authorization to create sales orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and classified as healthcare provider |
| P4 | Master Data | Material `{TD.batchMaterialId}` is batch-managed and configured for free goods distribution |

---

### Test Data

**Dataset Reference:** `testdata/CS-39/CS-39-testdata.json` — Dataset ID: `TD-CS-039-NEG-006`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Healthcare provider customer | Valid |
| Order Type | `{TD.orderType}` | Free Goods order type | Valid |
| Batch Material ID | `{TD.batchMaterialId}` | Batch-managed pharmaceutical sample | Valid |
| Order Quantity | `{TD.quantity}` | Numeric quantity | Valid |
| Batch Number | `{TD.emptyBatchNumber}` | Empty/missing batch number | Invalid (missing) |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-12 | Standard login and navigation to Create Sales Order | Standard | Sales order form opens with customer entered |
| 13 | Click "Create" in Items | — | Line item row appears |
| 14 | Enter batch-managed Material ID | `{TD.batchMaterialId}` | Material ID entered |
| 15 | Press Enter | — | Material description auto-populated; system detects batch-managed flag |
| 16 | Enter quantity | `{TD.quantity}` | Quantity entered |
| 17 | Press Enter | — | Quantity confirmed |
| 18 | Leave Batch field empty | `{TD.emptyBatchNumber}` | Batch field remains empty |
| 19 | Click "Save" | — | SAP displays error: "Batch number is mandatory for batch-managed materials"; submission blocked |
| 20 | Verify error message | — | Error clearly states batch number requirement |
| 21-23 | Sign out | — | User signed out |

---

### Expected Final Result

- SAP detects missing batch number for batch-managed material
- Descriptive error message displayed
- Sales order NOT created

---

### Post-conditions

- No sales order created
- System state unchanged

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
