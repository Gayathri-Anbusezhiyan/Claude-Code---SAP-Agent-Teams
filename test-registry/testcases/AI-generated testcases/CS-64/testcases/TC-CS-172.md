# TC-CS-172: Drill Down into Batch with No Open Deviations and Confirm Empty Deviation List

**User Story:**          [CS-64] Review A Batch Release Dashboard Showing All Batches Pending Final Qa
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Quality Management (PP/QM)
**Feature:**             Batch Release Dashboard — Batch Record Drill-Down
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Manager with SAP authorization to access batch records and deviation data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Batch `{TD.batchNumberNoDeviations}` exists in Quality Inspection status |
| P4 | Master Data | Batch `{TD.batchNumberNoDeviations}` has NO open deviations recorded in the QM system |

---

### Test Data

**Dataset Reference:** `testdata/CS-64/CS-64-testdata.json` — Dataset ID: `TD-CS-064-AP-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.batchNumberNoDeviations}` | Batch with no open deviations — selected for drill-down | Valid |
| Batch Record Status | `{TD.batchRecordStatusClean}` | Compilation status of the batch record — displayed in drill-down | Valid |

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
| 8 | Click the "Batch Release" app from the search results | — | Batch Release Dashboard opens displaying the batch list |
| 9 | Locate the batch row with Batch Number | `{TD.batchNumberNoDeviations}` | Batch `{TD.batchNumberNoDeviations}` is visible in the dashboard table |
| 10 | Click the Batch Number hyperlink to drill down | `{TD.batchNumberNoDeviations}` | Batch detail screen opens displaying the complete compiled batch record |
| 11 | Verify the batch record detail screen displays batch attributes (batch number, material, quantity, production date) | — | Batch record attributes are displayed with correct values |
| 12 | Verify the screen displays a "Deviations" section or table | — | Deviations section is visible on the batch detail screen |
| 13 | Verify the Deviations section displays an empty state or "No deviations" message | — | Deviations section shows "No open deviations" or equivalent empty state message; no deviation rows are listed |
| 14 | Verify the batch record compilation status is displayed | `{TD.batchRecordStatusClean}` | Batch record status `{TD.batchRecordStatusClean}` is shown (e.g., "Complete" or "Ready for Release") |
| 15 | Click the "Back" or navigation button to return to the dashboard | — | Batch Release Dashboard is displayed again with the batch list |
| 16 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 17 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 18 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- User successfully drills down into a batch from the dashboard
- The batch detail screen displays the complete compiled batch record
- The Deviations section confirms there are no open deviations associated with the batch (empty state or "No deviations" message)
- User can confidently proceed with release disposition knowing no unresolved quality issues exist

---

### Post-conditions

- User has reviewed the compiled batch record and confirmed no open deviations exist for batch `{TD.batchNumberNoDeviations}`
- User has returned to the Batch Release Dashboard
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
