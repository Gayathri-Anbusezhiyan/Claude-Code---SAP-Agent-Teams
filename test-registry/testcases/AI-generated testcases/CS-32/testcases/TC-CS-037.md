# TC-CS-037: Background Job Runs But No Batches Are Expired — No Transfer Occurs

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
| P4 | Master Data | Batch `{TD.nonExpiredBatchNumber}` exists for material `{TD.materialId}` with Expiration Date (SLED) = `{TD.futureExpirationDate}` (a date in the future) |
| P5 | Master Data | Batch `{TD.nonExpiredBatchNumber}` currently has unrestricted-use stock quantity `{TD.unrestrictedStockQuantity}` in plant `{TD.plant}` |
| P6 | Configuration | Daily background job for batch expiration monitoring is scheduled and active in SAP |
| P7 | Validation | Current system date is BEFORE the batch expiration date `{TD.futureExpirationDate}` (i.e., batch is NOT expired) |

---

### Test Data

**Dataset Reference:** `testdata/CS-32/CS-32-testdata.json` — Dataset ID: `TD-CS-032-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material number with batch management enabled | Valid |
| Non-Expired Batch Number | `{TD.nonExpiredBatchNumber}` | Batch with expiration date in the future | Valid |
| Future Expiration Date | `{TD.futureExpirationDate}` | Batch expiration date (SLED) — a date in the future | Valid (Future) |
| Plant | `{TD.plant}` | Plant code where batch stock is stored | Valid |
| Storage Location | `{TD.storageLocation}` | Current unrestricted-use storage location | Valid |
| Unrestricted Stock Quantity | `{TD.unrestrictedStockQuantity}` | Current unrestricted stock quantity for the batch | Valid |

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
| 9 | Select the job and execute it immediately (or wait for scheduled execution time) | — | Job status changes to "Running" then "Finished" |
| 10 | Check the job log for completion confirmation | — | Job log shows: "Batch expiration check completed; 0 batches identified as expired" or "No expired batches found" |
| 11 | Navigate to the Manage Stock application | — | Manage Stock application opens |
| 12 | In the Material filter field, enter the Material ID | `{TD.materialId}` | Material ID is entered |
| 13 | In the Batch filter field, enter the Non-Expired Batch Number | `{TD.nonExpiredBatchNumber}` | Batch number is entered |
| 14 | Press Enter to apply filters and click "Go" | — | Stock record for the batch is displayed |
| 15 | Verify the Stock Type for the batch remains "Unrestricted-Use" | — | Stock Type field displays "Unrestricted-Use" (NOT "Blocked") |
| 16 | Verify the unrestricted stock quantity for the batch is unchanged | `{TD.unrestrictedStockQuantity}` | Unrestricted stock quantity matches the pre-test value (no transfer occurred) |
| 17 | Verify the batch expiration date (SLED) is still in the future | `{TD.futureExpirationDate}` | SLED field shows a future date greater than the current system date |
| 18 | Navigate to the Notifications or Workflow Inbox application | — | Notifications list is displayed |
| 19 | Verify NO notification is generated for this batch | — | No notification exists with subject "Expired Batch Notification" for Batch `{TD.nonExpiredBatchNumber}` |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The daily background job successfully executes but identifies ZERO expired batches (all batches have SLED >= current date)
- No stock transfer is performed; batch `{TD.nonExpiredBatchNumber}` remains in "Unrestricted-Use" stock type
- No notification is generated to Warehouse or QA teams (only expired batches trigger notifications per AC-4)
- The job log confirms successful completion with message "0 batches identified as expired" or similar
- Batch stock data remains unchanged in the Manage Stock application

---

### Post-conditions

- Batch `{TD.nonExpiredBatchNumber}` remains in "Unrestricted-Use" stock type
- Unrestricted stock quantity for the batch is unchanged
- No material document or stock transfer document is created
- No notification exists for this batch
- The background job remains scheduled for future daily executions

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
