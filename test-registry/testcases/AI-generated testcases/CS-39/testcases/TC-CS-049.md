# TC-CS-049: Attempt to Submit Free Goods Order with Customer Field Empty

**User Story:**          [CS-39] Process A Free Goods (Sample) Order For A Healthcare Provider
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Free Goods Order Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
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
| P3 | Master Data | Material `{TD.materialId}` is created, released, and configured for free goods distribution |

---

### Test Data

**Dataset Reference:** `testdata/CS-39/CS-39-testdata.json` — Dataset ID: `TD-CS-039-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.emptyValue}` | Empty customer field | Invalid (empty) |
| Order Type | `{TD.orderType}` | Free Goods order type | Valid |
| Material ID | `{TD.materialId}` | Pharmaceutical sample material | Valid |
| Order Quantity | `{TD.quantity}` | Numeric quantity | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-9 | Standard login and navigate to Create Sales Order | Standard | Sales order form opens |
| 10 | Select Free Goods order type | `{TD.orderType}` | ZFOC selected |
| 11 | Leave Sold-To Party field EMPTY | `{TD.emptyValue}` | Customer field remains empty |
| 12 | Attempt to proceed | — | System may prevent or warn |
| 13 | Click "Save" | — | SAP highlights Customer field as mandatory; displays error; submission blocked |
| 14 | Sign out | — | User signed out |

---

### Expected Final Result

- System highlights Customer field as mandatory
- Sales order NOT created

---

### Post-conditions

- No sales order created

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
