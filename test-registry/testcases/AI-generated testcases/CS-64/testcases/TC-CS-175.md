# TC-CS-175: Attempt Disposition Action Without Selecting a Batch and Verify Validation Error

**User Story:**          [CS-64] Review A Batch Release Dashboard Showing All Batches Pending Final Qa
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Quality Management (PP/QM)
**Feature:**             Batch Release Dashboard — Disposition Validation
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
| P1 | User Role | User has the role of QA Manager with SAP authorization to record batch disposition |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | At least one batch exists in Quality Inspection status in the dashboard |
| P4 | Configuration | Batch disposition action buttons (Release, Reject, Rework) are available in the dashboard toolbar |

---

### Test Data

**Dataset Reference:** `testdata/CS-64/CS-64-testdata.json` — Dataset ID: `TD-CS-064-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Expected Validation Error | `{TD.validationErrorNoSelection}` | Error message displayed when no batch is selected | Valid |

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
| 9 | Verify at least one batch is displayed in the table (but do NOT select any batch) | — | Batch list is populated with at least one batch row; no row is selected |
| 10 | Click the "Record Disposition" or "Release" button in the toolbar WITHOUT selecting a batch | — | SAP displays a validation error message |
| 11 | Verify the error message indicates that a batch must be selected before recording disposition | `{TD.validationErrorNoSelection}` | Error message is displayed: "Please select a batch to record disposition" or "No batch selected" or equivalent |
| 12 | Verify the disposition dialog does NOT open | — | Disposition dialog or form does not appear; user remains on the dashboard |
| 13 | Verify no disposition is recorded in the system | — | No changes are made to any batch; all batches remain in their current status |
| 14 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 15 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 16 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system prevents disposition action when no batch is selected
- A clear validation error message is displayed indicating that batch selection is mandatory
- The disposition dialog does not open and no batch data is modified
- Data integrity is maintained by preventing unintended disposition actions

---

### Post-conditions

- No disposition has been recorded
- All batches in the dashboard remain in their original status
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
