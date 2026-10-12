# TC-CS-043: Notification Fails to Send to Warehouse/QA Teams (Email or Workflow Error)

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
| P1 | User Role | System Administrator with authorization to monitor jobs and workflow |
| P2 | System Access | SAP Fiori Launchpad accessible at `{ENV.SAP_FIORI_URL}` |
| P3 | Master Data | Expired batch exists and has been auto-transferred to blocked stock |
| P4 | Test Setup | Simulated error: email server unavailable, workflow configuration missing, or recipient addresses invalid |

---

### Test Data

**Dataset Reference:** `testdata/CS-32/CS-32-testdata.json` — Dataset ID: `TD-CS-032-ERR-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material with batch management | Valid |
| Expired Batch Number | `{TD.expiredBatchNumber}` | Expired batch | Valid |

---

### Test Steps (Condensed)

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-6 | Login to SAP Fiori | Standard login steps | Fiori home displayed |
| 7 | Navigate to SM37 | — | SM37 displayed |
| 8 | Execute batch expiration job | `{TD.batchExpirationJobName}` | Job runs and finishes |
| 9 | Check job log for notification error | — | Log shows: "Notification send failed: SMTP connection error" or "Workflow inbox creation failed" |
| 10 | Verify stock transfer occurred successfully | — | Batch moved to Blocked stock (transfer succeeded) |
| 11 | Navigate to Workflow Inbox or Notifications | — | Inbox displayed |
| 12 | Verify NO notification exists for the expired batch | `{TD.expiredBatchNumber}` | No notification found |
| 13 | Check SOST transaction (email queue) for failed emails | — | Failed email entries visible with error status |
| 14 | Sign out | — | User signed out |

---

### Expected Final Result

- Stock transfer succeeds (batch moved to Blocked)
- Notification generation FAILS due to email/workflow error
- Job log contains error message: "Notification send failed" with details
- No notification visible in Warehouse/QA team inboxes
- Administrator must resolve email/workflow configuration and manually notify teams

---

### Post-conditions

- Batch in blocked stock
- Notification failed (logged in job log)

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
