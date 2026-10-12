# TC-CS-050: Batch SLED Is Null or Not Maintained — System Behavior (Skip or Error)

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
| P4 | Master Data | Batch `{TD.batchWithNullSled}` exists with SLED field = NULL or blank (not maintained in batch master) |
| P5 | Master Data | Batch has unrestricted-use stock |
| P6 | Configuration | Background job active |

---

### Test Data

**Dataset Reference:** `testdata/CS-32/CS-32-testdata.json` — Dataset ID: `TD-CS-032-EDGE-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material with batch management | Valid |
| Batch With Null SLED | `{TD.batchWithNullSled}` | Batch with SLED = NULL | Invalid (Boundary: null) |
| Plant | `{TD.plant}` | Plant code | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-6 | Login to SAP Fiori (standard steps) | `{ENV.SAP_FIORI_URL}`, `{ENV.SAP_USERNAME}`, `{ENV.SAP_PASSWORD}` | Fiori home displayed |
| 7-8 | Navigate to Manage Stock app | — | Stock app opens |
| 9-11 | Search for batch with null SLED | `{TD.materialId}`, `{TD.batchWithNullSled}` | Batch displayed |
| 12 | Verify SLED field is blank/null/empty | — | SLED field shows no date (blank or "00.00.0000") |
| 13 | Verify stock type is Unrestricted-Use | — | Stock Type = "Unrestricted-Use" |
| 14 | Navigate to SM37 and execute batch expiration job | — | Job runs and finishes |
| 15 | Check job log for handling of null SLED batch | — | Log shows one of: "Batch skipped: SLED not maintained" OR "Warning: Batch has null SLED — cannot determine expiration" OR "Error: Batch SLED missing" |
| 16 | Verify job completes successfully (does not abort due to null SLED) | — | Job status = "Finished" (not "Aborted") |
| 17 | Navigate back to Manage Stock app | — | Stock app opens |
| 18 | Verify batch remains in Unrestricted-Use stock (no transfer) | — | Stock Type = "Unrestricted-Use" (batch was skipped) |
| 19 | Verify NO material document created for this batch | — | No material document exists for this batch |
| 20 | Verify NO notification generated for this batch | — | No notification exists for this batch (SLED null → expiration cannot be determined → batch skipped) |
| 21 | Sign out | — | User signed out |

---

### Expected Final Result

- Batch with NULL or blank SLED is encountered by the background job
- System gracefully handles the null SLED condition: SKIPS the batch from expiration processing (does not transfer to blocked stock) AND logs a warning or informational message in the job log
- NO stock transfer occurs; batch remains in Unrestricted-Use stock
- NO notification is generated (cannot determine expiration without SLED)
- Job completes successfully (does not abort or dump due to null SLED)
- Boundary condition (null expiration date) is handled correctly — system does not fail but logs the data quality issue

---

### Post-conditions

- Batch remains in Unrestricted stock
- No material document created
- Warning/info logged in job log

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
