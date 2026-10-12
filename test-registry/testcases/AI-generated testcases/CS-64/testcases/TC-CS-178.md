# TC-CS-178: Verify Batch with Zero Days Pending (Entered QI Status Today)

**User Story:**          [CS-64] Review A Batch Release Dashboard Showing All Batches Pending Final Qa
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Quality Management (PP/QM)
**Feature:**             Batch Release Dashboard — Days Pending Calculation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Manager with SAP authorization to access the Batch Release Fiori app |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Batch `{TD.batchNumberZeroDays}` exists in Quality Inspection status and entered QI status today (current date) |
| P4 | Configuration | Days Pending calculation is configured to calculate as: Current Date minus QI Status Entry Date |

---

### Test Data

**Dataset Reference:** `testdata/CS-64/CS-64-testdata.json` — Dataset ID: `TD-CS-064-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.batchNumberZeroDays}` | Batch entered QI status today — days pending = 0 | Valid |
| Days Pending | `{TD.daysPendingZero}` | 0 — lower boundary for days pending | Valid |

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
| 9 | Locate the batch row with Batch Number | `{TD.batchNumberZeroDays}` | Batch `{TD.batchNumberZeroDays}` is displayed in the dashboard table |
| 10 | Verify the Days Pending column displays "0" (zero) | `{TD.daysPendingZero}` | Days Pending column shows `{TD.daysPendingZero}` (0) |
| 11 | Verify the batch is correctly listed and no calculation error is displayed | — | Batch is displayed normally with all other fields populated correctly (Batch Number, Process Order, Status) |
| 12 | Verify the system correctly handles the zero-day boundary without errors | — | No error messages or warnings related to days pending calculation |
| 13 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 14 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 15 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Batch that entered Quality Inspection status today is correctly displayed with Days Pending = 0
- The system correctly calculates and displays the lower boundary (zero days) without errors
- The dashboard handles the edge case gracefully and all data fields are populated correctly

---

### Post-conditions

- User has verified batch `{TD.batchNumberZeroDays}` is correctly displayed with Days Pending = 0
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
