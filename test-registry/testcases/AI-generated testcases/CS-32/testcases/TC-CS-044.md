# TC-CS-044: Unauthorized User Attempts to Complete Disposition — System Rejects with Authorization Error

**User Story:**          [CS-32] Move Expired Batches To A Designated Blocked Storage Location Automati
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch Expiration Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has Warehouse Operator role WITHOUT QM/disposition authorization |
| P2 | System Access | SAP Fiori Launchpad accessible at `{ENV.SAP_FIORI_URL}` |
| P3 | Master Data | Blocked batch exists pending disposition |
| P4 | Authorization | User lacks authorization object for batch disposition (e.g., C_BATC_DIS) |

---

### Test Data

**Dataset Reference:** `testdata/CS-32/CS-32-testdata.json` — Dataset ID: `TD-CS-032-ERR-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material with batch management | Valid |
| Blocked Batch Number | `{TD.blockedBatchNumber}` | Blocked batch | Valid |
| Unauthorized User | `{TD.unauthorizedUser}` | User WITHOUT disposition auth | Invalid (unauthorized) |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-6 | Login as unauthorized user | `{ENV.SAP_FIORI_URL}`, `{TD.unauthorizedUser}` credentials | Fiori home displayed |
| 7-8 | Navigate to Batch Disposition app | — | App opens |
| 9-11 | Search for blocked batch | `{TD.materialId}`, `{TD.blockedBatchNumber}` | Batch displayed |
| 12 | Select batch row | — | Batch selected |
| 13 | Attempt to click "Disposition" button | — | Button is grayed out/disabled OR error dialog appears |
| 14 | If button enabled, select DESTROY and click Submit | `{TD.dispositionActionDestroy}` | Authorization error displayed: "You do not have authorization to perform batch disposition (object C_BATC_DIS)" |
| 15 | Verify disposition did NOT complete | — | Batch remains in Blocked status; no disposition record created |
| 16 | Verify error message clearly indicates authorization failure | — | Message includes authorization object name and missing activity |
| 17 | Sign out | — | User signed out |

---

### Expected Final Result

- Unauthorized user (Warehouse Operator without QM role) attempts to complete disposition
- System rejects the action with authorization error message
- Error clearly indicates missing authorization object (e.g., C_BATC_DIS or QM authorization)
- Batch remains in Blocked status; no disposition record is created
- Segregation of Duties (SOD) control is enforced: only QA/QM authorized users can dispose batches

---

### Post-conditions

- Batch remains blocked
- No disposition record created
- Authorization error logged

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
