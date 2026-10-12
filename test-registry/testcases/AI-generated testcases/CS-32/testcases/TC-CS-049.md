# TC-CS-049: Multiple Batches of Same Material Expire on Same Day — All Must Be Transferred in Single Job Run

**User Story:**          [CS-32] Move Expired Batches To A Designated Blocked Storage Location Automati
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch Expiration Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | System Administrator |
| P2 | System Access | SAP Fiori Launchpad accessible at `{ENV.SAP_FIORI_URL}` |
| P3 | Master Data | Material `{TD.materialId}` with batch management |
| P4 | Master Data | THREE batches exist for same material with identical SLED (all expire on same date): `{TD.expiredBatch1}`, `{TD.expiredBatch2}`, `{TD.expiredBatch3}` |
| P5 | Master Data | All three batches have unrestricted stock |
| P6 | Configuration | Background job active; blocked storage location configured |

---

### Test Data

**Dataset Reference:** `testdata/CS-32/CS-32-testdata.json` — Dataset ID: `TD-CS-032-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material with batch management | Valid |
| Expired Batch 1 | `{TD.expiredBatch1}` | First batch with identical SLED | Valid |
| Expired Batch 2 | `{TD.expiredBatch2}` | Second batch with identical SLED | Valid |
| Expired Batch 3 | `{TD.expiredBatch3}` | Third batch with identical SLED | Valid |
| Expired Date | `{TD.expiredDate}` | Common expiration date (past) | Valid |
| Plant | `{TD.plant}` | Plant code | Valid |
| Blocked Storage Location | `{TD.blockedStorageLocation}` | Blocked storage location | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-6 | Login to SAP Fiori (standard steps) | `{ENV.SAP_FIORI_URL}`, `{ENV.SAP_USERNAME}`, `{ENV.SAP_PASSWORD}` | Fiori home displayed |
| 7-8 | Navigate to Manage Stock app | — | Stock app opens |
| 9 | Search for Material | `{TD.materialId}` | All batches for material displayed |
| 10 | Verify all three batches have identical SLED (past date) | `{TD.expiredBatch1}`, `{TD.expiredBatch2}`, `{TD.expiredBatch3}`, `{TD.expiredDate}` | All batches show SLED = same past date |
| 11 | Verify all three batches are in Unrestricted-Use stock | — | Stock Type = "Unrestricted-Use" for all three |
| 12 | Navigate to SM37 and execute batch expiration job | — | Job runs and finishes |
| 13 | Check job log for batch count | — | Log shows: "3 batches identified as expired" |
| 14 | Verify job log lists all three batch numbers | — | Log lists: {TD.expiredBatch1}, {TD.expiredBatch2}, {TD.expiredBatch3} |
| 15 | Navigate back to Manage Stock app | — | Stock app opens |
| 16 | Refresh stock view for Material | `{TD.materialId}` | Stock records refreshed |
| 17 | Verify ALL THREE batches are now in Blocked stock | — | Stock Type = "Blocked" for all three batches; all moved to `{TD.blockedStorageLocation}` |
| 18 | Verify three separate material documents created (one per batch) | — | Three material documents exist with today's date, one for each batch transfer |
| 19 | Verify notification lists all three batches | — | Single notification lists all three expired batches, or three separate notifications generated |
| 20 | Sign out | — | User signed out |

---

### Expected Final Result

- Background job successfully processes MULTIPLE batches (3) of same material with identical expiration date in a SINGLE job run
- All three batches are correctly identified as expired
- All three batches are successfully transferred from Unrestricted to Blocked stock
- Three separate material documents are created (one per batch transfer)
- Notification(s) generated listing all three expired batches
- Boundary condition (multiple batches, upper batch count) is handled correctly — no job timeout or performance degradation

---

### Post-conditions

- All three batches in Blocked stock
- Three material documents created
- Notification(s) generated

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
