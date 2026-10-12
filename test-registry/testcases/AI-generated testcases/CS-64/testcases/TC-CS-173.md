# TC-CS-173: Access Dashboard When No Batches Are in Quality Inspection Status and Verify Empty State Message

**User Story:**          [CS-64] Review A Batch Release Dashboard Showing All Batches Pending Final Qa
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Quality Management (PP/QM)
**Feature:**             Batch Release Dashboard — Empty State Handling
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Manager with SAP authorization to access the Batch Release Fiori app |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | NO batches exist in Quality Inspection status in the SAP test system (all batches are either Released, Rejected, or in other statuses) |
| P4 | Configuration | Batch Release analytical Fiori app is configured and accessible via Fiori Launchpad |

---

### Test Data

**Dataset Reference:** `testdata/CS-64/CS-64-testdata.json` — Dataset ID: `TD-CS-064-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Expected Empty State Message | `{TD.emptyStateMessage}` | Message displayed when no batches are in QI status | Valid |

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
| 8 | Click the "Batch Release" app from the search results | — | Batch Release Dashboard opens |
| 9 | Verify the dashboard displays an empty state indicator or message | `{TD.emptyStateMessage}` | Empty state message is displayed, such as "No batches currently in Quality Inspection status" or "No data available" or equivalent |
| 10 | Verify no batch rows are displayed in the table | — | The batch table is empty; no batch data rows are shown |
| 11 | Verify the dashboard does not display any error messages or system failures | — | No error messages are shown; the app functions correctly with an empty result set |
| 12 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 13 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 14 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Batch Release Dashboard is successfully accessed from the Fiori Launchpad
- When no batches are in Quality Inspection status, the dashboard displays a clear, user-friendly empty state message
- The dashboard does not crash, freeze, or display system errors when no data is available
- The QA Manager understands there are no pending batches requiring review

---

### Post-conditions

- User has successfully accessed the Batch Release Dashboard and confirmed no batches are pending QA review
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
