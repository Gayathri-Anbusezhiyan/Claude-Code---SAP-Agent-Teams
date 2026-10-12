# TC-CS-032: Background Job Identifies Expired Batch and Auto-Restricts Stock from Unrestricted to Blocked

**User Story:**          [CS-32] Move Expired Batches To A Designated Blocked Storage Location Automati
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch Expiration Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator or System Administrator with SAP authorization to monitor background jobs (SM37) and view stock transfers |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists with batch management enabled |
| P4 | Master Data | Batch `{TD.expiredBatchNumber}` exists for material `{TD.materialId}` with Expiration Date (SLED) = `{TD.expiredDate}` (a date in the past) |
| P5 | Master Data | Batch `{TD.expiredBatchNumber}` currently has unrestricted-use stock quantity `{TD.unrestrictedStockQuantity}` in plant `{TD.plant}` and storage location `{TD.storageLocation}` |
| P6 | Configuration | Blocked storage location `{TD.blockedStorageLocation}` is configured and active in plant `{TD.plant}` |
| P7 | Configuration | Daily background job for batch expiration monitoring is scheduled and active in SAP (verify job name in SM37) |

---

### Test Data

**Dataset Reference:** `testdata/CS-32/CS-32-testdata.json` — Dataset ID: `TD-CS-032-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material number with batch management enabled | Valid |
| Expired Batch Number | `{TD.expiredBatchNumber}` | Batch with expiration date in the past | Valid |
| Expired Date | `{TD.expiredDate}` | Batch expiration date (SLED) — a date before today | Valid (Past) |
| Plant | `{TD.plant}` | Plant code where batch stock is stored | Valid |
| Storage Location | `{TD.storageLocation}` | Current unrestricted-use storage location | Valid |
| Blocked Storage Location | `{TD.blockedStorageLocation}` | Designated blocked stock storage location | Valid |
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
| 7 | Click the search icon (top-right shell bar) and type "Manage Stock" | — | Search results appear listing the Manage Stock application |
| 8 | Click "Manage Stock" from the search results | — | Manage Stock application opens displaying the stock overview list |
| 9 | In the Material filter field, enter the Material ID | `{TD.materialId}` | Material ID is entered |
| 10 | In the Batch filter field, enter the Expired Batch Number | `{TD.expiredBatchNumber}` | Batch number is entered |
| 11 | Press Enter to apply filters and click "Go" | — | Stock record for the batch is displayed showing current Stock Type as "Unrestricted-Use" and Expiration Date `{TD.expiredDate}` |
| 12 | Note the current unrestricted stock quantity | `{TD.unrestrictedStockQuantity}` | Unrestricted stock quantity is visible and matches the expected pre-test value |
| 13 | Navigate to transaction SM37 (Job Monitoring) via search or direct transaction | — | SM37 job overview screen is displayed |
| 14 | Search for the batch expiration monitoring job by job name | `{TD.batchExpirationJobName}` | Job is listed with status "Scheduled" or "Released" |
| 15 | Select the job and execute it immediately (or wait for scheduled execution time) | — | Job status changes to "Running" then "Finished" |
| 16 | Check the job log for completion confirmation | — | Job log shows: "Batch expiration check completed; X batches identified as expired" |
| 17 | Navigate back to the Manage Stock application | — | Manage Stock application reopens |
| 18 | Refresh the stock view for Material `{TD.materialId}` and Batch `{TD.expiredBatchNumber}` | — | Stock records are refreshed |
| 19 | Verify the Stock Type for the batch has changed from "Unrestricted-Use" to "Blocked" | — | Stock Type field now displays "Blocked" for the batch in blocked storage location `{TD.blockedStorageLocation}` |
| 20 | Verify the unrestricted stock quantity for the batch is now zero or reduced | — | Unrestricted-Use stock quantity is 0; blocked stock quantity equals the previous unrestricted quantity `{TD.unrestrictedStockQuantity}` |
| 21 | Navigate to the Notifications or Workflow Inbox application | — | Notifications list is displayed |
| 22 | Search for a notification related to expired batch | — | A notification is displayed with subject "Expired Batch Notification" or similar, listing Material `{TD.materialId}`, Batch `{TD.expiredBatchNumber}`, Expiration Date `{TD.expiredDate}` |
| 23 | Verify the notification is addressed to Warehouse and QA teams | — | Notification recipients include Warehouse Operator role and QA team role |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The daily background job successfully executes and identifies batch `{TD.expiredBatchNumber}` as expired (SLED < current date)
- The system automatically restricts the batch stock from "Unrestricted-Use" to "Blocked"
- A stock transfer document is created moving stock from unrestricted storage location `{TD.storageLocation}` to blocked storage location `{TD.blockedStorageLocation}`
- The batch stock type is updated to "Blocked" in the Manage Stock application
- A notification is generated and sent to Warehouse and QA teams listing the newly expired batch
- The job log confirms successful execution with details of batches processed

---

### Post-conditions

- Batch `{TD.expiredBatchNumber}` is now in "Blocked" stock type
- Unrestricted stock quantity for the batch is zero
- Blocked stock quantity for the batch equals the previous unrestricted quantity
- A material document exists recording the stock transfer
- A notification exists in the system addressed to Warehouse and QA teams
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
