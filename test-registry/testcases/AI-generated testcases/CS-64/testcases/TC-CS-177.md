# TC-CS-177: Attempt to Submit Disposition Without Selecting Disposition Type and Verify Error

**User Story:**          [CS-64] Review A Batch Release Dashboard Showing All Batches Pending Final Qa
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Quality Management (PP/QM)
**Feature:**             Batch Release Dashboard — Disposition Mandatory Field Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Manager with SAP authorization to record batch disposition |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Batch `{TD.batchNumberForDisposition}` exists in Quality Inspection status |
| P4 | Configuration | Disposition field (Release, Reject, Rework) is mandatory and must be selected before submission |

---

### Test Data

**Dataset Reference:** `testdata/CS-64/CS-64-testdata.json` — Dataset ID: `TD-CS-064-ERR-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.batchNumberForDisposition}` | Batch selected for disposition action | Valid |
| Disposition | `{TD.emptyDisposition}` | Empty or null disposition — intentionally not selected | Invalid (missing) |
| Expected Error Message | `{TD.errorMissingDisposition}` | Error message displayed when disposition is missing | Valid |

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
| 9 | Locate the batch row with Batch Number | `{TD.batchNumberForDisposition}` | Batch `{TD.batchNumberForDisposition}` is displayed in the dashboard table |
| 10 | Select the batch row by clicking the checkbox or selecting the row | `{TD.batchNumberForDisposition}` | Batch row is selected (checkbox checked or row highlighted) |
| 11 | Click the "Record Disposition" button in the toolbar | — | Disposition dialog or form opens |
| 12 | In the Disposition dialog, do NOT select any disposition option (leave the Disposition dropdown or radio button group empty) | `{TD.emptyDisposition}` | Disposition field remains blank or unselected |
| 13 | Optionally enter comments in the Comments field (if present) | — | Comments are entered (but disposition field is still empty) |
| 14 | Click the "Save" or "Submit" button in the disposition dialog | — | SAP validates the form and prevents submission |
| 15 | Verify the system highlights the Disposition field as mandatory | — | Disposition field is visually highlighted (red border, asterisk, or error indicator) |
| 16 | Verify the system displays a validation error message indicating disposition is required | `{TD.errorMissingDisposition}` | Error message is displayed: "Disposition is required" or "Please select a disposition" or equivalent |
| 17 | Verify the disposition is NOT recorded and the dialog remains open | — | Disposition dialog remains open; no disposition is saved; batch status is unchanged |
| 18 | Click "Cancel" or close the disposition dialog | — | Disposition dialog closes; user returns to the dashboard |
| 19 | Verify the batch status remains "Quality Inspection" (unchanged) | — | Batch `{TD.batchNumberForDisposition}` still shows Quality Inspection status |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system prevents disposition submission when the Disposition field is empty or not selected
- The Disposition field is visually highlighted as mandatory
- A clear validation error message is displayed indicating that disposition selection is required
- No disposition is recorded and the batch status remains unchanged
- Data integrity is maintained by enforcing mandatory field validation

---

### Post-conditions

- No disposition has been recorded for batch `{TD.batchNumberForDisposition}`
- Batch status remains "Quality Inspection" in SAP QM
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
