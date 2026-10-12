# TC-CS-170: Record Reject Disposition on Batch and Verify Stock Status Remains Blocked

**User Story:**          [CS-64] Review A Batch Release Dashboard Showing All Batches Pending Final Qa
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Quality Management (PP/QM)
**Feature:**             Batch Release Dashboard — Reject Disposition with Stock Status Update
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Manager with SAP authorization to record batch disposition (Release, Reject, Rework) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Batch `{TD.batchNumberReject}` exists in Quality Inspection status |
| P4 | Configuration | Stock status update workflow is configured to change batch stock status to "Blocked" upon Reject disposition |

---

### Test Data

**Dataset Reference:** `testdata/CS-64/CS-64-testdata.json` — Dataset ID: `TD-CS-064-AP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.batchNumberReject}` | Batch to be rejected — selected for Reject disposition | Valid |
| Disposition | `{TD.dispositionReject}` | Final disposition decision: "Reject" | Valid |
| Disposition Comments | `{TD.dispositionCommentsReject}` | QA comments explaining rejection reason | Valid |
| Stock Status Before | `{TD.stockStatusBeforeReject}` | Quality Inspection — initial stock status | Valid |
| Stock Status After | `{TD.stockStatusAfterReject}` | Blocked — expected stock status after Reject | Valid |

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
| 9 | Locate the batch row with Batch Number | `{TD.batchNumberReject}` | Batch `{TD.batchNumberReject}` is displayed in the dashboard table |
| 10 | Verify the current Stock Status is "Quality Inspection" | `{TD.stockStatusBeforeReject}` | Stock Status column shows `{TD.stockStatusBeforeReject}` (Quality Inspection) |
| 11 | Select the batch row by clicking the checkbox or selecting the row | `{TD.batchNumberReject}` | Batch row is selected (checkbox checked or row highlighted) |
| 12 | Click the "Record Disposition" or "Reject" button in the toolbar | — | Disposition dialog or form opens |
| 13 | In the Disposition dialog, select "Reject" from the Disposition dropdown or radio button group | `{TD.dispositionReject}` | "Reject" option is selected |
| 14 | In the Comments field, enter QA rejection reason | `{TD.dispositionCommentsReject}` | Rejection comments are entered |
| 15 | Click the "Save" or "Submit" button in the disposition dialog | — | SAP processes the disposition; confirmation message appears |
| 16 | Verify the confirmation message indicates the disposition was successfully recorded | — | Success message is displayed: "Disposition recorded successfully" or equivalent |
| 17 | Verify the batch row Stock Status has been updated to "Blocked" | `{TD.stockStatusAfterReject}` | Stock Status column now shows `{TD.stockStatusAfterReject}` (Blocked) |
| 18 | Verify the batch no longer appears in the Quality Inspection list (or status is updated to Rejected) | — | Batch `{TD.batchNumberReject}` either disappears from the QI list or status column shows "Rejected" |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- QA Manager successfully records Reject disposition directly from the dashboard
- SAP automatically updates the batch stock status from "Quality Inspection" to "Blocked" upon Reject disposition
- The rejected batch is excluded from Sales & Distribution fulfillment and remains in blocked inventory

---

### Post-conditions

- Batch `{TD.batchNumberReject}` has been rejected with disposition "Reject"
- Stock status for batch `{TD.batchNumberReject}` is "Blocked" in SAP MM
- Disposition timestamp, user ID, and rejection comments are recorded in the batch audit trail
- Batch is NOT available for picking in Sales & Distribution (SD module)

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
