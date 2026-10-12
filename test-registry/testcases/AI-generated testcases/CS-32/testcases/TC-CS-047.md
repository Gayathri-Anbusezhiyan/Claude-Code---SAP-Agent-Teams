# TC-CS-047: Batch Expires Today (SLED = Current Date) — System Must Identify as Expired

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
| P1 | User Role | System Administrator with authorization to monitor jobs |
| P2 | System Access | SAP Fiori Launchpad accessible at `{ENV.SAP_FIORI_URL}` |
| P3 | Master Data | Material `{TD.materialId}` with batch management enabled |
| P4 | Master Data | Batch `{TD.batchExpiringToday}` exists with SLED = current system date (expires TODAY) |
| P5 | Master Data | Batch has unrestricted-use stock |
| P6 | Configuration | Blocked storage location configured; background job active |

---

### Test Data

**Dataset Reference:** `testdata/CS-32/CS-32-testdata.json` — Dataset ID: `TD-CS-032-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material with batch management | Valid |
| Batch Expiring Today | `{TD.batchExpiringToday}` | Batch with SLED = today | Valid (Boundary: lower) |
| Expiration Date Today | `{TD.expirationDateToday}` | SLED = current system date | Valid (Boundary) |
| Plant | `{TD.plant}` | Plant code | Valid |
| Storage Location | `{TD.storageLocation}` | Unrestricted storage location | Valid |
| Blocked Storage Location | `{TD.blockedStorageLocation}` | Blocked storage location | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-6 | Login to SAP Fiori | Standard login | Fiori home displayed |
| 7 | Navigate to Manage Stock app | — | Stock app opens |
| 8-11 | Search for batch with SLED = today | `{TD.materialId}`, `{TD.batchExpiringToday}` | Batch displayed; SLED = current date |
| 12 | Verify SLED equals current system date exactly | `{TD.expirationDateToday}` | SLED field shows today's date (DD.MM.YYYY) |
| 13 | Verify stock type is Unrestricted-Use BEFORE job runs | — | Stock Type = "Unrestricted-Use" |
| 14 | Navigate to SM37 and execute batch expiration job | `{TD.batchExpirationJobName}` | Job runs and finishes |
| 15 | Check job log | — | Log shows: "1 batch identified as expired: {TD.batchExpiringToday}" (batch with SLED = today IS treated as expired) |
| 16 | Navigate back to Manage Stock app | — | Stock app opens |
| 17 | Refresh batch stock view | `{TD.materialId}`, `{TD.batchExpiringToday}` | Stock record refreshed |
| 18 | Verify stock type changed from Unrestricted to Blocked | — | Stock Type = "Blocked"; stock moved to `{TD.blockedStorageLocation}` |
| 19 | Verify notification generated for the batch | — | Notification exists listing the batch as expired |
| 20 | Sign out | — | User signed out |

---

### Expected Final Result

- Batch with SLED = current system date (expires TODAY) is correctly identified as EXPIRED by the background job
- System applies business rule: SLED <= current date → batch is expired (inclusive boundary condition)
- Stock is successfully transferred from Unrestricted to Blocked storage location
- Notification is generated to Warehouse/QA teams
- Boundary condition (SLED = today) is handled correctly (lower boundary for expiration date)

---

### Post-conditions

- Batch moved to Blocked stock
- Material document created
- Notification generated

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
