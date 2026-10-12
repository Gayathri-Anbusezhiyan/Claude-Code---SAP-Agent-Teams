# TC-CS-133: Missing Process Order Number

**User Story:**          [CS-53] Review And Electronically Sign Off The Electronic Batch Record (Ebr) G
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control / Quality Management (PP-QM)
**Feature:**             Electronic Batch Record Review and Approval
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Reviewer with SAP authorization to review and approve batch records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Field Validation | "Process Order" field is configured as mandatory in the "Review Batch Records" application |

---

### Test Data

**Dataset Reference:** `testdata/CS-53/CS-53-testdata.json` — Dataset ID: `TD-CS-53-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.emptyValue}` | Empty/blank value — field left empty | Invalid (missing) |
| Batch Number | `{TD.batchNumber}` | Valid batch number — entered by the user | Valid |

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
| 9 | Leave the "Process Order" field empty (do not enter any value) | `{TD.emptyValue}` | "Process Order" field remains blank |
| 10 | In the "Batch" field, enter the Batch Number | `{TD.batchNumber}` | Batch Number is entered into the field |
| 11 | Press Enter or click the "Continue" or "Load" button to proceed | — | System validation is triggered |
| 12 | Observe the on-screen error response | — | Error message is displayed: "Process Order is required" or "Please enter a Process Order Number" or similar mandatory field validation error text |
| 13 | Verify that the "Process Order" field is highlighted or marked as mandatory | — | "Process Order" field is highlighted in red or displays an error indicator (e.g., red border, asterisk, error icon) |
| 14 | Verify that no batch record data is loaded or displayed | — | Batch record details screen does NOT open; user remains on the batch selection screen |
| 15 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 16 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 17 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System prevents batch record loading due to missing mandatory "Process Order" field
- Error message clearly indicates that the Process Order Number is required
- "Process Order" field is highlighted or marked as mandatory with an error indicator
- No batch record data is loaded or displayed
- User cannot proceed to batch record review without entering a Process Order Number

---

### Post-conditions

- No batch record data is accessed or loaded
- User remains on the batch selection screen with validation error displayed
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
