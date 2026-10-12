# TC-CS-176: Attempt Drill-Down Without Batch Number and Verify Error

**User Story:**          [CS-64] Review A Batch Release Dashboard Showing All Batches Pending Final Qa
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Quality Management (PP/QM)
**Feature:**             Batch Release Dashboard — Drill-Down Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Manager with SAP authorization to access batch records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Dashboard is accessible but batch selection is intentionally missing or invalid for drill-down |
| P4 | Configuration | Batch drill-down functionality requires a valid batch number to be selected |

---

### Test Data

**Dataset Reference:** `testdata/CS-64/CS-64-testdata.json` — Dataset ID: `TD-CS-064-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.emptyBatchNumber}` | Empty or null batch number — intentionally missing | Invalid (missing) |
| Expected Error Message | `{TD.errorMissingBatch}` | Error message displayed when batch number is missing | Valid |

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
| 9 | Attempt to trigger drill-down action without selecting a valid batch (e.g., by attempting URL manipulation or direct action without batch selection) | `{TD.emptyBatchNumber}` | SAP prevents the drill-down action |
| 10 | Verify the system displays a validation error message indicating batch number is required | `{TD.errorMissingBatch}` | Error message is displayed: "Batch number is required" or "Please select a batch" or equivalent |
| 11 | Verify the batch detail screen does NOT open | — | Batch detail view is not displayed; user remains on the dashboard |
| 12 | Verify no batch data is accessed or displayed | — | No batch record or deviation data is loaded |
| 13 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 14 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 15 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system prevents drill-down action when batch number is missing or not selected
- A clear validation error message is displayed indicating that batch selection is mandatory for drill-down
- The batch detail screen does not open and no batch data is accessed
- Data integrity and navigation logic are maintained by preventing invalid drill-down attempts

---

### Post-conditions

- No batch detail screen has been accessed
- User remains on the Batch Release Dashboard
- No application-level errors or critical warnings remain outstanding (validation error is expected behaviour)

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
