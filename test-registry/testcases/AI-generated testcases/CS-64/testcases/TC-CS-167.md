# TC-CS-167: Access Batch Release Dashboard and View Batches in Quality Inspection Status with Days Pending and Process Orders

**User Story:**          [CS-64] Review A Batch Release Dashboard Showing All Batches Pending Final Qa
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Quality Management (PP/QM)
**Feature:**             Batch Release Dashboard — Quality Inspection Monitoring
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
| P1 | User Role | User has the role of QA Manager with SAP authorization to access the Batch Release Fiori app and view quality inspection data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | At least one batch `{TD.batchNumber}` exists in the SAP test system with Quality Inspection status |
| P4 | Master Data | Batch `{TD.batchNumber}` is linked to a valid process order `{TD.processOrder}` |
| P5 | Configuration | Batch Release analytical Fiori app is configured and accessible via Fiori Launchpad |

---

### Test Data

**Dataset Reference:** `testdata/CS-64/CS-64-testdata.json` — Dataset ID: `TD-CS-064-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.batchNumber}` | Batch in Quality Inspection status — displayed in dashboard list | Valid |
| Process Order | `{TD.processOrder}` | Production order linked to the batch — displayed in dashboard | Valid |
| Days Pending | `{TD.daysPending}` | Number of days batch has been in QI status — auto-calculated | Valid |
| Batch Status | `{TD.batchStatus}` | Quality Inspection status — displayed in dashboard | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Batch Release" | — | Search results appear listing the Batch Release analytical Fiori app |
| 8 | Click the "Batch Release" app from the search results | — | Batch Release Dashboard opens displaying a table/list of batches |
| 9 | Verify the dashboard displays a table with column headers: Batch, Process Order, Days Pending, Status | — | Column headers are visible and correctly labelled |
| 10 | Verify that at least one row appears in the table with Batch Number | `{TD.batchNumber}` | Batch `{TD.batchNumber}` is listed in the dashboard table |
| 11 | Verify the Process Order column displays the associated process order | `{TD.processOrder}` | Process Order `{TD.processOrder}` is displayed in the same row as the batch |
| 12 | Verify the Days Pending column displays a numeric value | `{TD.daysPending}` | Days Pending shows `{TD.daysPending}` (a non-negative integer) |
| 13 | Verify the Status column displays "Quality Inspection" or equivalent QI status | `{TD.batchStatus}` | Status column shows `{TD.batchStatus}` (Quality Inspection status) |
| 14 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 15 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 16 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Batch Release Dashboard is successfully accessed from the Fiori Launchpad
- All batches currently in Quality Inspection status are listed in the dashboard table
- Each batch row displays: Batch Number, associated Process Order, Days Pending (calculated), and Status (Quality Inspection)
- The dashboard provides a clear, consolidated view of all batches awaiting final QA disposition

---

### Post-conditions

- User has successfully accessed the Batch Release Dashboard
- All batches in Quality Inspection status are visible with required data fields (batch number, process order, days pending, status)
- No application-level errors or critical warnings remain outstanding

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
