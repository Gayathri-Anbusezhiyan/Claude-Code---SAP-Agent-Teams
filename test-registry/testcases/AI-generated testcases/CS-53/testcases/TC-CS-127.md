# TC-CS-127: Retrieve archived batch record for regulatory inspection

**User Story:**          [CS-53] Review And Electronically Sign Off The Electronic Batch Record (Ebr) G
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control / Quality Management (PP-QM)
**Feature:**             Electronic Batch Record Archival and Retrieval
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Reviewer or Auditor with SAP authorization to retrieve archived batch records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Archived Batch Record | Batch record for batch `{TD.batchNumberArchived}` has been approved and archived in SAP ArchiveLink or DMS |
| P4 | Archive Reference | Archive object ID or EBR document number `{TD.archiveReference}` exists for the archived batch record |
| P5 | Configuration | SAP ArchiveLink or Document Management System (DMS) is configured and operational; archive retrieval permissions are granted to the user |

---

### Test Data

**Dataset Reference:** `testdata/CS-53/CS-53-testdata.json` — Dataset ID: `TD-CS-53-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.batchNumberArchived}` | Batch number for archived batch record — entered by the user | Valid |
| Archive Reference | `{TD.archiveReference}` | Archive object ID or EBR document number — entered by the user | Valid |
| Process Order Number | `{TD.processOrderNumberArchived}` | Process order number linked to archived batch — auto-populated | Valid |
| Material Description | `{TD.materialDescriptionArchived}` | Auto-populated material description from archived batch record | Valid |
| Reviewed By | `{TD.reviewedByArchived}` | Auto-populated user ID who approved the batch record | Valid |
| Signed On | `{TD.signedOnTimestamp}` | Auto-populated approval timestamp in UTC format | Valid |

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
| 8 | Click "Review Batch Records" from the search results | — | "Review Batch Records" application opens displaying the batch selection or search screen |
| 9 | In the "Batch" or "Archive Reference" search field, enter the Batch Number or Archive Reference | `{TD.batchNumberArchived}` or `{TD.archiveReference}` | Batch Number or Archive Reference is entered into the search field |
| 10 | Press Enter to confirm the search entry | — | SAP searches the archive; archived batch record is located |
| 11 | Click the "Retrieve" or "View" button to open the archived batch record | — | Archived batch record opens in read-only view |
| 12 | Verify that Material Description is displayed | `{TD.materialDescriptionArchived}` | Material description from archived batch record is visible |
| 13 | Verify that Process Order Number is displayed | `{TD.processOrderNumberArchived}` | Process Order Number from archived batch record is visible |
| 14 | Verify that the "Component Consumption" section displays consumed materials | — | Component consumption data from archived batch record is displayed in structured format |
| 15 | Verify that the "In-Process Control Results" section displays all inspection results | — | All in-process control results from archived batch record are displayed with their recorded statuses |
| 16 | Verify that the "Deviations" section displays any recorded deviations | — | Deviations (if any) from archived batch record are listed; if none, section indicates "No Deviations" |
| 17 | Verify that the "Operation Confirmations" section displays completed operations | — | All process order operations from archived batch record are listed with confirmation statuses |
| 18 | Verify that the batch record status is "APPROVED" | — | Batch record status field displays "APPROVED" |
| 19 | Verify that "Reviewed By" field displays the user ID who approved the batch record | `{TD.reviewedByArchived}` | "Reviewed By" field shows the recorded user ID |
| 20 | Verify that "Signed On" timestamp is displayed in UTC format | `{TD.signedOnTimestamp}` | Timestamp is visible showing the approval date and time in UTC format (e.g., 2026-08-23T10:15:00Z) |
| 21 | Verify that Archive Reference or EBR Document Number is displayed | `{TD.archiveReference}` | Archive object ID or EBR document number is visible in the batch record header |
| 22 | Verify that electronic signature audit trail is visible or accessible | — | Audit trail entry is visible showing timestamp, user ID, and approval action; or a link to view audit log is present |
| 23 | If a "Print" or "Export" button is available, verify it is functional | — | Print or Export function is enabled; clicking it generates a PDF or downloadable version of the archived batch record |
| 24 | Navigate back to the batch record list or close the archived record | — | Batch record list or search screen is displayed |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Archived batch record for batch `{TD.batchNumberArchived}` is successfully retrieved from SAP ArchiveLink or DMS
- All batch record data is intact and displayed in read-only format: component consumption, in-process controls, operation confirmations, deviations
- Electronic signature details are visible: user ID, timestamp in UTC format, approval action
- Archive Reference or EBR document number is displayed
- Audit trail entry is visible or accessible, confirming 21 CFR Part 11 compliance
- Print/Export functionality is available for regulatory inspection purposes
- Archived batch record is immutable and cannot be edited

---

### Post-conditions

- Archived batch record remains in SAP ArchiveLink or DMS with status "APPROVED"
- No changes are made to the archived batch record (read-only access enforced)
- Audit log entry for archive retrieval action is created (if configured)
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
