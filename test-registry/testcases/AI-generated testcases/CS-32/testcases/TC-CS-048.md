# TC-CS-048: Batch Has Zero Unrestricted Stock (Fully Consumed) — No Transfer Needed But Batch Still Flagged

**User Story:**          [CS-32] Move Expired Batches To A Designated Blocked Storage Location Automati
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch Expiration Management
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
| P1 | User Role | System Administrator |
| P2 | System Access | SAP Fiori Launchpad accessible at `{ENV.SAP_FIORI_URL}` |
| P3 | Master Data | Material `{TD.materialId}` with batch management |
| P4 | Master Data | Batch `{TD.expiredBatchZeroStock}` exists with expired SLED and ZERO unrestricted stock (fully consumed or already transferred) |
| P5 | Configuration | Background job active |

---

### Test Data

**Dataset Reference:** `testdata/CS-32/CS-32-testdata.json` — Dataset ID: `TD-CS-032-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material with batch management | Valid |
| Expired Batch Zero Stock | `{TD.expiredBatchZeroStock}` | Batch with SLED < today and unrestricted stock = 0 | Valid (Boundary: lower stock) |
| Expired Date | `{TD.expiredDate}` | Past date | Valid |
| Unrestricted Stock Quantity | `0` | Zero stock | Valid (Boundary: zero) |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-6 | Login to SAP Fiori | Standard login | Fiori home displayed |
| 7-11 | Navigate to Manage Stock; search for batch | `{TD.materialId}`, `{TD.expiredBatchZeroStock}` | Batch displayed; unrestricted stock = 0 |
| 12 | Verify SLED is in the past | `{TD.expiredDate}` | SLED < current date |
| 13 | Verify unrestricted stock quantity is zero | — | Unrestricted stock = 0 |
| 14 | Navigate to SM37 and execute batch expiration job | — | Job runs and finishes |
| 15 | Check job log | — | Log shows: "Batch {TD.expiredBatchZeroStock} identified as expired; no stock to transfer (unrestricted stock = 0)" |
| 16 | Verify NO material document created (no transfer needed) | — | No new material document for this batch |
| 17 | Verify notification is generated (batch still flagged as expired) | — | Notification exists listing the batch as expired (even though no stock transfer occurred) |
| 18 | Sign out | — | User signed out |

---

### Expected Final Result

- Batch with expired SLED but ZERO unrestricted stock is correctly identified as expired
- System logs informational message: "No stock to transfer (unrestricted stock = 0)"
- NO stock transfer occurs (no material document created) because there is no stock to move
- Notification IS generated to Warehouse/QA teams to flag the expired batch (for audit tracking even if no stock exists)
- Boundary condition (zero stock quantity) is handled correctly

---

### Post-conditions

- No material document created
- Notification generated
- Batch flagged in job log

---

### Actual Result

_[To be completed during test execution]_

---

### Execution Status

- [ ] Pass
- [ ] Fail
- [ ] Blocked
- [ ] Not Executed

---

### Defects / Observations

_[Record defect IDs during execution]_

---
