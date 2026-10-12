# TC-CS-039: Material Does Not Have Batch Management Enabled — System Skips or Logs Error

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
| P3 | Master Data | Material `{TD.nonBatchManagedMaterialId}` exists in SAP but does NOT have batch management enabled in the material master |
| P4 | Configuration | Daily background job for batch expiration monitoring is scheduled and active in SAP |

---

### Test Data

**Dataset Reference:** `testdata/CS-32/CS-32-testdata.json` — Dataset ID: `TD-CS-032-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Non-Batch Material ID | `{TD.nonBatchManagedMaterialId}` | Material number WITHOUT batch management enabled | Invalid (for batch processing) |

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
| 10 | Check the job log for completion confirmation and error handling | — | Job log shows: "Batch expiration check completed; X materials skipped (no batch management enabled)" or "Warning: Material {TD.nonBatchManagedMaterialId} does not have batch management — skipped" |
| 11 | Verify the job completes successfully without ABAP dump or critical error | — | Job status is "Finished" (not "Aborted" or "Error") |
| 12 | Verify the job log contains informational or warning messages for non-batch materials | — | Job log includes a warning or info message indicating non-batch materials were skipped from processing |
| 13 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 14 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 15 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The daily background job successfully executes and encounters material `{TD.nonBatchManagedMaterialId}` which does NOT have batch management enabled
- The system gracefully skips the material from batch expiration processing (does not attempt to process batches for non-batch materials)
- The job log contains a warning or informational message indicating the material was skipped
- The job completes with status "Finished" (no ABAP dump or critical error occurs)
- No stock transfer or notification is generated for non-batch materials

---

### Post-conditions

- The background job remains scheduled for future daily executions
- No changes are made to stock or batch data for non-batch-managed materials
- The job log preserves the warning message for audit purposes

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
