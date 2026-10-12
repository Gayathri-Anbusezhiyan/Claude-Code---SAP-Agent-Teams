# TC-CS-042: Stock Transfer Document Creation Fails (Material Document Error)

**User Story:**          [CS-32] Move Expired Batches To A Designated Blocked Storage Location Automati
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch Expiration Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  NO
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of System Administrator with SAP authorization to monitor background jobs (SM37) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists with batch management enabled |
| P4 | Master Data | Batch `{TD.expiredBatchNumber}` exists with expired SLED and unrestricted stock |
| P5 | Configuration | Daily background job for batch expiration monitoring is active |
| P6 | Test Setup | Simulated error: material document posting fails (e.g., fiscal year closed, movement type blocked, or material document number range exhausted) |

---

### Test Data

**Dataset Reference:** `testdata/CS-32/CS-32-testdata.json` — Dataset ID: `TD-CS-032-ERR-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material with batch management | Valid |
| Expired Batch Number | `{TD.expiredBatchNumber}` | Expired batch | Valid |
| Batch Expiration Job Name | `{TD.batchExpirationJobName}` | Background job name | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-6 | Login to SAP Fiori (standard steps 1-6) | `{ENV.SAP_FIORI_URL}`, `{ENV.SAP_USERNAME}`, `{ENV.SAP_PASSWORD}` | Fiori home page displayed |
| 7 | Navigate to SM37 (Job Monitoring) | — | SM37 displayed |
| 8 | Search for batch expiration job | `{TD.batchExpirationJobName}` | Job listed |
| 9 | Execute job immediately | — | Job starts running |
| 10 | Monitor job execution | — | Job finishes with error status |
| 11 | Check job log for material document error | — | Log shows: "Material document creation failed: Fiscal year closed" or "Movement type 309 blocked" or "Number range exhausted" |
| 12 | Navigate to Manage Stock app | — | Stock app opens |
| 13 | Search for batch `{TD.expiredBatchNumber}` | `{TD.materialId}`, `{TD.expiredBatchNumber}` | Batch displayed |
| 14 | Verify stock type remains Unrestricted-Use (transfer failed) | — | Stock Type = "Unrestricted-Use" (NOT Blocked) |
| 15 | Verify no material document created | — | No document exists for today with this batch |
| 16 | Sign out | — | User signed out |

---

### Expected Final Result

- Job identifies expired batch but FAILS to create stock transfer material document
- Error is logged: "Material document creation failed" with root cause details
- Batch remains in Unrestricted-Use stock (transfer did not occur)
- Job status is Finished with errors or Aborted
- Administrator must resolve the underlying issue (open fiscal period, unblock movement type, extend number range) before retrying

---

### Post-conditions

- Batch remains in unrestricted stock
- No material document created
- Job error logged in SM37

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

_[Record defect IDs, unexpected behaviours, or environment issues encountered during execution]_

---
