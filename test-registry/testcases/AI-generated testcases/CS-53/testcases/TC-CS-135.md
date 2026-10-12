# TC-CS-135: Missing Electronic Signature Password

**User Story:**          [CS-53] Review And Electronically Sign Off The Electronic Batch Record (Ebr) G
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control / Quality Management (PP-QM)
**Feature:**             Electronic Batch Record Review and Approval
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Reviewer with SAP authorization to review and approve batch records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Process Order | Process Order `{TD.processOrderNumber}` exists, is fully confirmed, and has status TECO (technically complete) |
| P4 | Batch | Batch `{TD.batchNumber}` exists, is linked to Process Order `{TD.processOrderNumber}`, and has all in-process control results recorded |
| P5 | In-Process Controls | All mandatory in-process control results for batch `{TD.batchNumber}` are complete and within specification limits |
| P6 | Field Validation | Electronic signature "Password" field is configured as mandatory in the signature dialog |

---

### Test Data

**Dataset Reference:** `testdata/CS-53/CS-53-testdata.json` — Dataset ID: `TD-CS-53-ERR-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Process order number in TECO status — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Batch number linked to process order — entered by the user | Valid |
| Signature Password | `{TD.emptyValue}` | Empty/blank value — field left empty | Invalid (missing) |

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
| 7 | Click the search icon (top-right shell bar) and type "Review Batch Records" | — | Search results appear listing the "Review Batch Records" application |
| 8 | Click "Review Batch Records" from the search results | — | "Review Batch Records" application opens displaying the batch selection screen |
| 9 | In the "Process Order" field, enter the Process Order Number | `{TD.processOrderNumber}` | Process Order Number is entered into the field |
| 10 | Press Enter to confirm the Process Order entry | — | SAP validates the process order; batch record compilation begins |
| 11 | In the "Batch" field, enter the Batch Number | `{TD.batchNumber}` | Batch Number is entered into the field |
| 12 | Press Enter to confirm the Batch entry | — | SAP validates the batch; batch record details are loaded and displayed |
| 13 | Verify that all batch record sections are complete (Component Consumption, In-Process Control Results, Deviations, Operation Confirmations) | — | All sections display complete data; no validation errors are present |
| 14 | Click the "Approve" button in the batch record toolbar | — | Electronic signature dialog appears prompting for password authentication |
| 15 | Leave the "Password" field empty (do not enter any value) | `{TD.emptyValue}` | "Password" field remains blank |
| 16 | Click the "Confirm" button in the signature dialog | — | System validation is triggered |
| 17 | Observe the on-screen error response | — | Error message is displayed: "Password is required" or "Please enter your password to confirm signature" or similar mandatory field validation error text |
| 18 | Verify that the "Password" field is highlighted or marked as mandatory | — | "Password" field is highlighted in red or displays an error indicator (e.g., red border, asterisk, error icon) |
| 19 | Verify that the electronic signature is NOT recorded | — | Electronic signature dialog remains open; batch record approval does NOT proceed |
| 20 | Verify that the batch record status remains unchanged | — | Batch record status remains "PENDING" or "IN REVIEW"; status does NOT change to "APPROVED" |
| 21 | Click "Cancel" to close the signature dialog | — | Signature dialog is closed; batch record remains in unapproved state |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System prevents electronic signature submission due to missing mandatory "Password" field
- Error message clearly indicates that the password is required for signature authentication
- "Password" field is highlighted or marked as mandatory with an error indicator
- No electronic signature is recorded; batch record approval does NOT proceed
- Batch record status remains "PENDING" or "IN REVIEW"
- No EBR document number is generated
- System enforces 21 CFR Part 11 requirement for secure, password-authenticated electronic signatures

---

### Post-conditions

- Batch record remains in unapproved state with status "PENDING" or "IN REVIEW"
- No electronic signature audit trail entry is created
- No archived batch record is created
- User remains in the batch record review screen with signature dialog closed
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
