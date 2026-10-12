# TC-CS-137: Non-existent Process Order Number

**User Story:**          [CS-53] Review And Electronically Sign Off The Electronic Batch Record (Ebr) G
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control / Quality Management (PP-QM)
**Feature:**             Electronic Batch Record Review and Approval
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            MEDIUM
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Reviewer with SAP authorization to review and approve batch records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Non-existent Process Order | Process Order Number `{TD.nonExistentProcessOrder}` does NOT exist in the SAP system |

---

### Test Data

**Dataset Reference:** `testdata/CS-53/CS-53-testdata.json` — Dataset ID: `TD-CS-53-ERR-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Non-existent Process Order Number | `{TD.nonExistentProcessOrder}` | Process order number that does not exist in SAP — entered by the user | Invalid |
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
| 9 | In the "Process Order" field, enter the non-existent Process Order Number | `{TD.nonExistentProcessOrder}` | Non-existent Process Order Number is entered into the field |
| 10 | Press Enter to confirm the Process Order entry | — | System validation is triggered |
| 11 | Observe the on-screen error response | — | Error message is displayed: "Process Order does not exist" or "Process Order not found" or similar validation error text |
| 12 | Verify that the "Process Order" field is highlighted or marked as invalid | — | "Process Order" field is highlighted in red or displays an error indicator (e.g., red border, error icon) |
| 13 | Verify that no batch record data is loaded or displayed | — | Batch record details screen does NOT open; user remains on the batch selection screen |
| 14 | Verify that the "Batch" field remains accessible for entry | — | "Batch" field is still editable; no batch record loading occurs |
| 15 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 16 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 17 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System prevents batch record loading due to non-existent Process Order Number
- Error message clearly indicates that the Process Order does not exist in the SAP system
- "Process Order" field is highlighted or marked as invalid with an error indicator
- No batch record data is loaded or displayed
- User cannot proceed to batch record review with an invalid Process Order Number

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
