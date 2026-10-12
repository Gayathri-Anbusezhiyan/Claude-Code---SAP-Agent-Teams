# TC-CS-041: Background Job Fails Due to System Error (ABAP Dump or Authorization Issue)

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
| P3 | Configuration | Daily background job for batch expiration monitoring is scheduled and active in SAP |
| P4 | Test Setup | Simulated error condition: job user lacks authorization to read batch master data, or database connectivity issue exists |

---

### Test Data

**Dataset Reference:** `testdata/CS-32/CS-32-testdata.json` — Dataset ID: `TD-CS-032-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Expiration Job Name | `{TD.batchExpirationJobName}` | Background job name | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed |
| 2 | Enter the user email address | `{ENV.SAP_USERNAME}` | Email is entered |
| 3 | Click "Continue" | — | Password screen appears |
| 4 | Enter the user password | `{ENV.SAP_PASSWORD}` | Password is entered |
| 5 | Click "Continue" | — | Fiori Launchpad home page is displayed |
| 6 | If a pop-up appears, close it | — | Pop-up is dismissed |
| 7 | Navigate to transaction SM37 (Job Monitoring) | — | SM37 screen is displayed |
| 8 | Search for the batch expiration monitoring job | `{TD.batchExpirationJobName}` | Job is listed |
| 9 | Execute the job immediately | — | Job status changes to "Running" |
| 10 | Monitor job execution status | — | Job status changes to "Aborted" or "Error" |
| 11 | Check the job log for ABAP dump or authorization error | — | Job log shows: "ABAP runtime error" or "Authorization check failed for table MCHA" or "Database connection error" |
| 12 | Verify no stock transfers occurred due to job failure | — | No material documents are created; all batches remain in their original stock types |
| 13 | Verify an alert or notification is generated for job failure | — | System alert or email notification is sent to IT/Administrator indicating job failure |
| 14 | Click User Profile icon and sign out | — | User is signed out |

---

### Expected Final Result

- The background job fails during execution due to system error (ABAP dump, authorization issue, or database connectivity issue)
- The job status is "Aborted" or "Error" in SM37
- The job log contains detailed error messages indicating the root cause (e.g., missing authorization object, runtime error details)
- NO stock transfers are performed; all batches remain unchanged
- A system alert or email notification is generated to notify administrators of the job failure
- The job must be corrected and rescheduled by IT/Administrator

---

### Post-conditions

- Background job is in failed state
- No changes to batch stock data
- Error is logged in SAP job log for troubleshooting

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
