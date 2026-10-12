# TC-CS-139: Process Order not in TECO status (not technically complete)

**User Story:**          [CS-53] Review And Electronically Sign Off The Electronic Batch Record (Ebr) G
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control / Quality Management (PP-QM)
**Feature:**             Electronic Batch Record Review and Approval
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            MEDIUM
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Reviewer with SAP authorization to review and approve batch records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Process Order | Process Order `{TD.processOrderNumberNotTECO}` exists but does NOT have status TECO (technically complete); order is in REL (released) or PCNF (partially confirmed) status |
| P4 | Batch | Batch `{TD.batchNumberNotTECO}` exists and is linked to Process Order `{TD.processOrderNumberNotTECO}` |
| P5 | Business Rule | Batch records can only be approved for process orders with status TECO (technically complete); incomplete orders are not eligible for batch record approval |

---

### Test Data

**Dataset Reference:** `testdata/CS-53/CS-53-testdata.json` — Dataset ID: `TD-CS-53-ERR-007`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number Not TECO | `{TD.processOrderNumberNotTECO}` | Process order number not in TECO status — entered by the user | Invalid (incomplete) |
| Batch Number Not TECO | `{TD.batchNumberNotTECO}` | Batch number linked to incomplete process order — entered by the user | Valid |
| Process Order Status | `{TD.processOrderStatusNotTECO}` | Current status of the process order (e.g., REL, PCNF) — auto-populated | Invalid (not TECO) |

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
| 9 | In the "Process Order" field, enter the Process Order Number | `{TD.processOrderNumberNotTECO}` | Process Order Number is entered into the field |
| 10 | Press Enter to confirm the Process Order entry | — | System validation is triggered; SAP checks the process order status |
| 11 | Observe the on-screen error or warning response | — | Error or warning message is displayed: "Process Order is not technically complete" or "Batch record cannot be reviewed. Process Order status must be TECO" or similar validation error text |
| 12 | Verify that the Process Order Status is displayed | `{TD.processOrderStatusNotTECO}` | Process Order status field shows the current status (e.g., REL, PCNF) which is NOT TECO |
| 13 | Verify that the "Process Order" field is highlighted or marked as invalid | — | "Process Order" field is highlighted in red or displays a warning indicator (e.g., orange border, warning icon) |
| 14 | Verify that no batch record data is loaded or displayed | — | Batch record details screen does NOT open; user remains on the batch selection screen OR batch record loads but is in read-only mode with approval disabled |
| 15 | If batch record data is loaded, verify that the "Approve" button is disabled or not visible | — | "Approve" button is grayed out, disabled, or not displayed; batch record cannot be approved |
| 16 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 17 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 18 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System prevents batch record approval due to incomplete Process Order status (not TECO)
- Error or warning message clearly indicates that the Process Order must be technically complete (TECO status) before batch record approval
- Process Order status is displayed and shows a status other than TECO (e.g., REL, PCNF)
- No batch record approval is allowed; "Approve" button is disabled or not visible
- User cannot proceed to batch record approval with an incomplete process order
- System enforces GMP business rule that batch records can only be approved after all production operations are complete

---

### Post-conditions

- Batch record remains in unapproved state (if it exists)
- No electronic signature audit trail entry is created
- No archived batch record is created
- User remains on the batch selection screen or batch record loads in read-only mode with approval disabled
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
