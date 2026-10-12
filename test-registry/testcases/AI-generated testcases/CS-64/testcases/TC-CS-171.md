# TC-CS-171: Record Rework Disposition on Batch and Verify Stock Status Remains in Quality Inspection

**User Story:**          [CS-64] Review A Batch Release Dashboard Showing All Batches Pending Final Qa
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Quality Management (PP/QM)
**Feature:**             Batch Release Dashboard — Rework Disposition with Stock Status Update
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Manager with SAP authorization to record batch disposition (Release, Reject, Rework) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Batch `{TD.batchNumberRework}` exists in Quality Inspection status |
| P4 | Configuration | Stock status update workflow is configured to retain batch stock status as "Quality Inspection" upon Rework disposition |

---

### Test Data

**Dataset Reference:** `testdata/CS-64/CS-64-testdata.json` — Dataset ID: `TD-CS-064-AP-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.batchNumberRework}` | Batch requiring rework — selected for Rework disposition | Valid |
| Disposition | `{TD.dispositionRework}` | Final disposition decision: "Rework" | Valid |
| Disposition Comments | `{TD.dispositionCommentsRework}` | QA comments explaining rework requirements | Valid |
| Stock Status Before | `{TD.stockStatusBeforeRework}` | Quality Inspection — initial stock status | Valid |
| Stock Status After | `{TD.stockStatusAfterRework}` | Quality Inspection — expected stock status after Rework (remains unchanged) | Valid |

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
| 9 | Locate the batch row with Batch Number | `{TD.batchNumberRework}` | Batch `{TD.batchNumberRework}` is displayed in the dashboard table |
| 10 | Verify the current Stock Status is "Quality Inspection" | `{TD.stockStatusBeforeRework}` | Stock Status column shows `{TD.stockStatusBeforeRework}` (Quality Inspection) |
| 11 | Select the batch row by clicking the checkbox or selecting the row | `{TD.batchNumberRework}` | Batch row is selected (checkbox checked or row highlighted) |
| 12 | Click the "Record Disposition" or "Rework" button in the toolbar | — | Disposition dialog or form opens |
| 13 | In the Disposition dialog, select "Rework" from the Disposition dropdown or radio button group | `{TD.dispositionRework}` | "Rework" option is selected |
| 14 | In the Comments field, enter QA rework instructions | `{TD.dispositionCommentsRework}` | Rework comments are entered |
| 15 | Click the "Save" or "Submit" button in the disposition dialog | — | SAP processes the disposition; confirmation message appears |
| 16 | Verify the confirmation message indicates the disposition was successfully recorded | — | Success message is displayed: "Disposition recorded successfully" or equivalent |
| 17 | Verify the batch row Stock Status remains as "Quality Inspection" (unchanged) | `{TD.stockStatusAfterRework}` | Stock Status column still shows `{TD.stockStatusAfterRework}` (Quality Inspection) |
| 18 | Verify the batch remains in the Quality Inspection list with updated rework status flag | — | Batch `{TD.batchNumberRework}` remains visible in the QI list; status or disposition column may show "Rework" or "Pending Rework" |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- QA Manager successfully records Rework disposition directly from the dashboard
- SAP retains the batch stock status as "Quality Inspection" upon Rework disposition (stock status does NOT change)
- The batch remains in quality inspection pending rework completion; it is not released for distribution

---

### Post-conditions

- Batch `{TD.batchNumberRework}` has been flagged for rework with disposition "Rework"
- Stock status for batch `{TD.batchNumberRework}` remains "Quality Inspection" in SAP MM
- Disposition timestamp, user ID, and rework instructions are recorded in the batch audit trail
- Batch remains in the Quality Inspection list and is NOT available for picking in Sales & Distribution

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
