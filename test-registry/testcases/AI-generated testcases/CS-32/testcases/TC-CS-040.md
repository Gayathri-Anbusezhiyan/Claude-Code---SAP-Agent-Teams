# TC-CS-040: Blocked Storage Location Is Not Configured in the Plant — Transfer Fails with Error

**User Story:**          [CS-32] Move Expired Batches To A Designated Blocked Storage Location Automati
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch Expiration Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of System Administrator with SAP authorization to monitor background jobs (SM37) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists with batch management enabled |
| P4 | Master Data | Batch `{TD.expiredBatchNumber}` exists for material `{TD.materialId}` with Expiration Date (SLED) = `{TD.expiredDate}` (a date in the past) |
| P5 | Master Data | Batch `{TD.expiredBatchNumber}` currently has unrestricted-use stock in plant `{TD.plantWithoutBlockedSloc}` |
| P6 | Configuration | Blocked storage location is NOT configured or does NOT exist in plant `{TD.plantWithoutBlockedSloc}` |
| P7 | Configuration | Daily background job for batch expiration monitoring is scheduled and active in SAP |

---

### Test Data

**Dataset Reference:** `testdata/CS-32/CS-32-testdata.json` — Dataset ID: `TD-CS-032-NEG-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material number with batch management enabled | Valid |
| Expired Batch Number | `{TD.expiredBatchNumber}` | Batch with expiration date in the past | Valid |
| Expired Date | `{TD.expiredDate}` | Batch expiration date (SLED) — a date in the past | Valid (Past) |
| Plant Without Blocked Sloc | `{TD.plantWithoutBlockedSloc}` | Plant code where blocked storage location is NOT configured | Invalid (missing config) |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page with application tiles is fully visible |
| 7 | Navigate to transaction SM37 (Job Monitoring) via search or direct transaction | — | SM37 job overview screen is displayed |
| 8 | Search for the batch expiration monitoring job by job name | `{TD.batchExpirationJobName}` | Job is listed with status "Scheduled" or "Released" |
| 9 | Select the job and execute it immediately (or wait for scheduled execution time) | — | Job status changes to "Running" then "Finished" or "Error" |
| 10 | Check the job log for error messages related to missing blocked storage location | — | Job log shows error message: "Error: Blocked storage location not configured for plant {TD.plantWithoutBlockedSloc}" or "Stock transfer failed: target storage location does not exist" |
| 11 | Verify the job status is "Finished" with warnings or errors (not "Aborted") | — | Job status is "Finished" but contains error messages in the log |
| 12 | Navigate to the Manage Stock application | — | Manage Stock application opens |
| 13 | Search for Material `{TD.materialId}` and Batch `{TD.expiredBatchNumber}` in plant `{TD.plantWithoutBlockedSloc}` | — | Batch stock record is displayed |
| 14 | Verify the Stock Type for the batch remains "Unrestricted-Use" (transfer did NOT occur) | — | Stock Type field displays "Unrestricted-Use" (NOT "Blocked") because the transfer failed |
| 15 | Verify no material document was created for the failed transfer | — | No new material document exists for this batch with today's date (check transaction MB51 or stock document list) |
| 16 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 17 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 18 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The daily background job successfully identifies batch `{TD.expiredBatchNumber}` as expired
- The system attempts to transfer the batch to the blocked storage location but FAILS because the blocked storage location is not configured in plant `{TD.plantWithoutBlockedSloc}`
- An error message is logged in the job log indicating the missing blocked storage location configuration
- The stock transfer does NOT occur; the batch remains in "Unrestricted-Use" stock type
- No material document is created
- The job completes with status "Finished" (with errors logged) or "Error" depending on SAP error handling configuration

---

### Post-conditions

- Batch `{TD.expiredBatchNumber}` remains in "Unrestricted-Use" stock type (transfer failed)
- No material document or stock transfer document is created
- The job log contains error messages for audit and troubleshooting purposes
- System administrator must configure the blocked storage location in the plant before retrying

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
