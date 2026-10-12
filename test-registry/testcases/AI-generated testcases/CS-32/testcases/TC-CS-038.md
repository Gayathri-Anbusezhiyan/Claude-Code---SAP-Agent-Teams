# TC-CS-038: Batch Is Already in Blocked Stock When Expiration Is Detected — No Duplicate Transfer

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
| P1 | User Role | User has the role of System Administrator with SAP authorization to monitor background jobs (SM37) and view stock transfers |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists with batch management enabled |
| P4 | Master Data | Batch `{TD.alreadyBlockedBatchNumber}` exists for material `{TD.materialId}` with Expiration Date (SLED) = `{TD.expiredDate}` (a date in the past) |
| P5 | Master Data | Batch `{TD.alreadyBlockedBatchNumber}` is ALREADY in "Blocked" stock type with blocked stock quantity `{TD.blockedStockQuantity}` in plant `{TD.plant}` and blocked storage location `{TD.blockedStorageLocation}` |
| P6 | Master Data | Batch `{TD.alreadyBlockedBatchNumber}` has ZERO unrestricted-use stock (all stock is already blocked) |
| P7 | Configuration | Daily background job for batch expiration monitoring is scheduled and active in SAP |

---

### Test Data

**Dataset Reference:** `testdata/CS-32/CS-32-testdata.json` — Dataset ID: `TD-CS-032-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material number with batch management enabled | Valid |
| Already Blocked Batch Number | `{TD.alreadyBlockedBatchNumber}` | Batch already in blocked stock type | Valid |
| Expired Date | `{TD.expiredDate}` | Batch expiration date (SLED) — a date in the past | Valid (Past) |
| Plant | `{TD.plant}` | Plant code where batch stock is stored | Valid |
| Blocked Storage Location | `{TD.blockedStorageLocation}` | Blocked storage location where batch is already located | Valid |
| Blocked Stock Quantity | `{TD.blockedStockQuantity}` | Current blocked stock quantity for the batch | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Stock" | — | Search results appear listing the Manage Stock application |
| 8 | Click "Manage Stock" from the search results | — | Manage Stock application opens |
| 9 | In the Material filter field, enter the Material ID | `{TD.materialId}` | Material ID is entered |
| 10 | In the Batch filter field, enter the Already Blocked Batch Number | `{TD.alreadyBlockedBatchNumber}` | Batch number is entered |
| 11 | Press Enter to apply filters and click "Go" | — | Stock record for the batch is displayed showing Stock Type "Blocked" and blocked stock quantity `{TD.blockedStockQuantity}` |
| 12 | Verify the batch is already in blocked stock type BEFORE the job runs | — | Stock Type field displays "Blocked"; unrestricted stock quantity is 0 |
| 13 | Note the current blocked stock quantity | `{TD.blockedStockQuantity}` | Blocked stock quantity value is recorded |
| 14 | Navigate to transaction SM37 (Job Monitoring) via search or direct transaction | — | SM37 job overview screen is displayed |
| 15 | Search for the batch expiration monitoring job by job name | `{TD.batchExpirationJobName}` | Job is listed with status "Scheduled" or "Released" |
| 16 | Select the job and execute it immediately (or wait for scheduled execution time) | — | Job status changes to "Running" then "Finished" |
| 17 | Check the job log for completion confirmation | — | Job log shows: "Batch expiration check completed; batch already in blocked stock — no action required" or similar informational message |
| 18 | Navigate back to the Manage Stock application | — | Manage Stock application reopens |
| 19 | Refresh the stock view for Material `{TD.materialId}` and Batch `{TD.alreadyBlockedBatchNumber}` | — | Stock records are refreshed |
| 20 | Verify the blocked stock quantity remains unchanged | `{TD.blockedStockQuantity}` | Blocked stock quantity matches the pre-job value (no duplicate transfer occurred) |
| 21 | Verify no new material document or stock transfer document was created | — | No new material document exists for this batch with today's date (check transaction MB51 or stock document list) |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The daily background job successfully executes and identifies batch `{TD.alreadyBlockedBatchNumber}` as expired
- The system detects that the batch is ALREADY in "Blocked" stock type and does NOT perform a duplicate stock transfer
- No new material document or stock transfer document is created
- The blocked stock quantity remains unchanged
- The job log confirms successful execution with informational message indicating batch was already blocked

---

### Post-conditions

- Batch `{TD.alreadyBlockedBatchNumber}` remains in "Blocked" stock type
- Blocked stock quantity for the batch is unchanged
- No duplicate material document is created
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
