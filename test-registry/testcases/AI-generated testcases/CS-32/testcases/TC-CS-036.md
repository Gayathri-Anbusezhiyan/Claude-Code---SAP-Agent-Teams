# TC-CS-036: Audit Report Displays All Expired Batch Dispositions with Timestamps and User Details

**User Story:**          [CS-32] Move Expired Batches To A Designated Blocked Storage Location Automati
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch Expiration Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Manager or Auditor with SAP authorization to view batch disposition audit reports |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | At least one batch disposition has been completed (DESTROY, RETURN, or REWORK) for an expired batch |
| P4 | Pre-requisite | Disposition records exist in SAP for Material `{TD.materialId}` and Batch `{TD.disposedBatchNumber}` with Disposition Action `{TD.dispositionAction}`, Disposition Date, and Disposition User |
| P5 | Configuration | Batch disposition audit report functionality is enabled and configured in SAP |

---

### Test Data

**Dataset Reference:** `testdata/CS-32/CS-32-testdata.json` — Dataset ID: `TD-CS-032-006`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material number for disposed batch | Valid |
| Disposed Batch Number | `{TD.disposedBatchNumber}` | Batch for which disposition was completed | Valid |
| Disposition Action | `{TD.dispositionAction}` | Disposition action type (DESTROY, RETURN, or REWORK) | Valid |
| Disposition Date From | `{TD.dispositionDateFrom}` | Start date for audit report filter | Valid |
| Disposition Date To | `{TD.dispositionDateTo}` | End date for audit report filter | Valid |
| Disposition User | `{TD.dispositionUser}` | User who completed disposition | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Batch Disposition Report" or "Audit Report" | — | Search results appear listing the batch disposition audit report application |
| 8 | Click the audit report application from the search results | — | Audit report application opens displaying filter criteria fields |
| 9 | In the Material filter field, enter the Material ID (optional) | `{TD.materialId}` | Material ID is entered |
| 10 | In the Batch filter field, enter the Disposed Batch Number (optional) | `{TD.disposedBatchNumber}` | Batch number is entered |
| 11 | In the Disposition Date From field, enter the start date | `{TD.dispositionDateFrom}` | Start date is entered |
| 12 | In the Disposition Date To field, enter the end date | `{TD.dispositionDateTo}` | End date is entered |
| 13 | Click the "Execute" or "Go" button to run the report | — | Report is executed; disposition records are displayed in a table or list format |
| 14 | Verify the report displays the following columns: Material, Batch, Disposition Action, Disposition Date, Disposition User, Comments/Reason | — | All required columns are visible in the report output |
| 15 | Verify the disposition record for Batch `{TD.disposedBatchNumber}` is present in the report | — | Report row displays: Material `{TD.materialId}`, Batch `{TD.disposedBatchNumber}`, Disposition Action `{TD.dispositionAction}`, Disposition Date (today or historical date), Disposition User `{TD.dispositionUser}` |
| 16 | Verify the Disposition Date field shows the date and time (timestamp) of the disposition | — | Disposition Date field displays full timestamp (e.g., "2026-08-23 14:35:22" or SAP date/time format) |
| 17 | Verify the Disposition User field shows the SAP user ID or full name | — | Disposition User field displays the user ID (e.g., "QA_USER01") or full name (e.g., "John Doe") |
| 18 | Verify the Disposition Action field shows the action type | — | Disposition Action field displays "DESTROY", "RETURN", or "REWORK" as applicable |
| 19 | If available, verify additional details such as Plant, Storage Location, Quantity, and Expiration Date | — | Additional fields are populated with correct values for the disposed batch |
| 20 | If the report supports export, click the "Export" button to export to Excel or PDF | — | Report is exported successfully; file download begins |
| 21 | Verify the exported file contains all the same disposition records and columns | — | Exported file opens and displays all disposition records with complete data |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The batch disposition audit report is accessible to authorized QA/Auditor roles
- The report displays all expired batch disposition records with: Material ID, Batch Number, Disposition Action (DESTROY/RETURN/REWORK), Disposition Date (full timestamp), Disposition User (ID or name), and Comments/Reason
- The report supports filtering by Material, Batch, and Date Range for targeted audit queries
- All disposition records are maintained in SAP for regulatory audit and GMP compliance
- The report supports export to Excel/PDF for external audit submissions

---

### Post-conditions

- User is signed out of SAP
- No changes have been made to disposition records or master data
- Audit report remains accessible for future regulatory audits

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
