# TC-CS-144: Verify 21 CFR Part 11 compliance — electronic signature includes timestamp, user ID, and audit trail

**User Story:**          [CS-53] Review And Electronically Sign Off The Electronic Batch Record (Ebr) G
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control / Quality Management (PP-QM)
**Feature:**             Electronic Signature Compliance (21 CFR Part 11)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
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
| P6 | Regulatory Configuration | SAP is configured for 21 CFR Part 11 compliance; electronic signatures are enabled; audit logging is active |
| P7 | Audit Trail Access | User has authorization to view SAP Change Documents (CDHDR/CDPOS tables) or Audit Log app for verification |

---

### Test Data

**Dataset Reference:** `testdata/CS-53/CS-53-testdata.json` — Dataset ID: `TD-CS-53-INT-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Process order number in TECO status — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Batch number linked to process order — entered by the user | Valid |
| Signature Password | `{TD.signaturePassword}` | User's SAP password for electronic signature authentication — entered by the user | Valid |
| Expected User ID | `{ENV.SAP_USERNAME}` | Expected user ID in audit trail — matches logged-in user | Valid |
| Expected Action | `{TD.expectedAuditAction}` | Expected audit log action (e.g., "Batch Record Approved", "Electronic Signature Recorded") | Valid |

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
| 7 | Note the current system timestamp before starting the batch record approval | — | Current timestamp is noted (e.g., 2026-08-24T14:30:00Z) for comparison with signature timestamp |
| 8 | Click the search icon (top-right shell bar) and type "Review Batch Records" | — | Search results appear listing the "Review Batch Records" application |
| 9 | Click "Review Batch Records" from the search results | — | "Review Batch Records" application opens displaying the batch selection screen |
| 10 | In the "Process Order" field, enter the Process Order Number | `{TD.processOrderNumber}` | Process Order Number is entered into the field |
| 11 | Press Enter to confirm the Process Order entry | — | SAP validates the process order; batch record compilation begins |
| 12 | In the "Batch" field, enter the Batch Number | `{TD.batchNumber}` | Batch Number is entered into the field |
| 13 | Press Enter to confirm the Batch entry | — | SAP validates the batch; batch record details are loaded and displayed |
| 14 | Verify that all batch record sections are complete (Component Consumption, In-Process Control Results, Deviations, Operation Confirmations) | — | All sections display complete data; no validation errors are present |
| 15 | Click the "Approve" button in the batch record toolbar | — | Electronic signature dialog appears prompting for password authentication |
| 16 | In the "Password" field of the signature dialog, enter the signature password | `{TD.signaturePassword}` | Password is entered (masked) |
| 17 | Click the "Confirm" button in the signature dialog | — | SAP processes the electronic signature; batch record approval begins; electronic signature is recorded with timestamp and user ID |
| 18 | Observe the on-screen confirmation response | — | Success message is displayed: "Batch record approved successfully" |
| 19 | Verify that the batch record status changes to "APPROVED" | — | Batch record status field displays "APPROVED" |
| 20 | Verify that "Reviewed By" field displays the current user ID | `{ENV.SAP_USERNAME}` | "Reviewed By" field shows the logged-in user's ID; matches `{ENV.SAP_USERNAME}` exactly |
| 21 | Verify that "Signed On" timestamp is displayed in UTC format | — | Timestamp is visible showing date and time in UTC format (e.g., 2026-08-24T14:30:05Z); timestamp is within a few seconds of the noted system timestamp from step 7 |
| 22 | Verify that the timestamp includes both date and time components with sufficient precision (at least to seconds) | — | Timestamp format is complete: YYYY-MM-DDTHH:MM:SSZ or similar ISO 8601 format |
| 23 | Navigate to the SAP Change Documents or Audit Log application to verify audit trail entry | — | Change Documents or Audit Log application opens |
| 24 | Search for audit trail entries related to batch `{TD.batchNumber}` or the approval action | `{TD.batchNumber}` | Audit trail entries are displayed; electronic signature event is listed |
| 25 | Verify that the audit trail entry includes the following 21 CFR Part 11 required elements: User ID, Timestamp, Action | `{ENV.SAP_USERNAME}`, `{TD.expectedAuditAction}` | Audit trail entry displays: (a) User ID = `{ENV.SAP_USERNAME}`, (b) Timestamp = timestamp from step 21, (c) Action = "Batch Record Approved" or "Electronic Signature Recorded" |
| 26 | Verify that the audit trail entry is immutable (cannot be edited or deleted) | — | Audit trail entry is read-only; no edit or delete options are available |
| 27 | Verify that the audit trail entry includes the meaning of the signature (approval of batch record) | — | Audit trail entry includes descriptive text indicating the action performed (e.g., "QA Reviewer approved batch record for batch [number]") |
| 28 | Verify that the electronic signature is linked to the batch record and retrievable for regulatory inspection | — | Electronic signature data is permanently associated with batch `{TD.batchNumber}`; retrievable via batch record or audit log |
| 29 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 30 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 31 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Electronic signature is recorded in compliance with FDA 21 CFR Part 11 requirements
- Electronic signature includes all three required elements:
  1. User ID (logged-in user who approved the batch record)
  2. Timestamp (date and time in UTC format with seconds precision)
  3. Action meaning (approval of batch record for regulatory release)
- Audit trail entry is created in SAP Change Documents (CDHDR/CDPOS tables) or Audit Log
- Audit trail entry is immutable (cannot be edited or deleted after creation)
- Electronic signature is permanently linked to batch record `{TD.batchNumber}` and retrievable for regulatory inspection
- System meets 21 CFR Part 11 requirements for secure, computer-generated, time-stamped audit trails

---

### Post-conditions

- Electronic signature is recorded with user ID `{ENV.SAP_USERNAME}`, timestamp in UTC format, and action description
- Audit trail entry exists in SAP Change Documents or Audit Log with complete 21 CFR Part 11 required elements
- Audit trail entry is immutable and retrievable for regulatory inspection
- Batch record with electronic signature is archived and accessible
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
