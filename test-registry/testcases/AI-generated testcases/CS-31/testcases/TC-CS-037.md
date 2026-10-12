# TC-CS-037: Approve Vendor Change Request with Maximum Size Attachment Upload

**User Story:**          [CS-31] Review And Approve A Change Request Affecting An Approved Vendor'S Man
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Vendor Change Request Approval Workflow
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Manager with SAP authorization to review and approve vendor change requests |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Vendor `{TD.vendorIdMaxAttach}` exists in SAP master data |
| P4 | Change Request | A pending change request `{TD.changeRequestIdMaxAttach}` exists for vendor `{TD.vendorIdMaxAttach}`, requesting a manufacturing site change |
| P5 | Supporting Document | A site audit report file `{TD.maxSizeAttachment}` is available with file size at exactly 10 MB (maximum allowed attachment size) |
| P6 | Attachment Configuration | The attachment upload limit is set to 10 MB for workflow change request documents |

---

### Test Data

**Dataset Reference:** `testdata/CS-31/CS-31-testdata.json` — Dataset ID: `TD-CS-031-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.vendorIdMaxAttach}` | Vendor account number with pending change request — viewed in inbox | Valid |
| Change Request ID | `{TD.changeRequestIdMaxAttach}` | Workflow item ID for the pending manufacturing site change request | Valid |
| Approval Decision | `{TD.approvalDecisionMaxAttach}` | Decision value — entered by QA Manager | Valid (Approve) |
| Approval Comments | `{TD.commentsMaxAttach}` | Free text comments — entered by QA Manager | Valid |
| Audit Report File | `{TD.maxSizeAttachment}` | Site audit report file at exactly 10 MB — maximum boundary — selected from file system | Valid (Boundary) |

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
| 7 | Click the search icon (top-right shell bar) and type "My Inbox" | — | Search results appear listing the My Inbox application |
| 8 | Click "My Inbox" from the search results | — | My Inbox application opens, displaying a list of pending workflow items |
| 9 | Locate the change request for vendor `{TD.vendorIdMaxAttach}` with description containing "Manufacturing Site Change" | `{TD.vendorIdMaxAttach}` | The change request work item is visible in the inbox list |
| 10 | Click the change request item to open it | — | Change request detail screen opens, showing vendor information and requested change |
| 11 | Verify the Vendor ID field displays the expected vendor | `{TD.vendorIdMaxAttach}` | Vendor ID matches the test data value |
| 12 | Click the "Attach" or "Add Attachment" button in the change request form | — | File upload dialog or attachment section becomes active |
| 13 | Select the 10 MB audit report file from the file system | `{TD.maxSizeAttachment}` | File is selected in the file picker dialog |
| 14 | Confirm the file selection (click "Open" or equivalent) | — | File upload begins; progress indicator may display |
| 15 | Observe the file upload process | — | File uploads successfully without error; no "file too large" error is displayed |
| 16 | Verify the attachment is displayed in the Attachments section with correct file name and size (10 MB) | — | Audit report file appears in the attachments list showing file name and size "10.0 MB" or equivalent |
| 17 | In the "Decision" or "Approval Decision" field, select "Approve" | `{TD.approvalDecisionMaxAttach}` | "Approve" option is selected |
| 18 | In the "Comments" or "Notes" field, enter the approval comments | `{TD.commentsMaxAttach}` | Comments text is entered in the field |
| 19 | Click the "Submit" or "Approve" button to submit the approval decision | — | SAP begins processing the approval workflow |
| 20 | Observe the on-screen confirmation response | — | A success message is displayed indicating the change request has been approved |
| 21 | Verify the approval status of the change request changes to "Approved" | — | Status field shows "Approved" |
| 22 | Navigate back to the My Inbox list and then re-open the completed change request or access workflow history | `{TD.changeRequestIdMaxAttach}` | Change request detail or history view opens |
| 23 | Verify the 10 MB attachment is stored and retrievable | — | The Attachments section displays the audit report file with correct file name and size (10 MB) |
| 24 | Click the attachment file name or download icon to verify the file can be retrieved | — | File download begins; the downloaded file size is 10 MB and the file opens successfully |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system successfully accepts and stores an attachment at the maximum size boundary of 10 MB
- The change request is approved without any error or warning related to attachment size
- The 10 MB file is uploaded completely without truncation or corruption
- The file is stored correctly in the SAP document management system and can be retrieved/downloaded successfully
- No data loss occurs at the boundary value

---

### Post-conditions

- Change request `{TD.changeRequestIdMaxAttach}` status is "Approved" and completed
- Vendor `{TD.vendorIdMaxAttach}` manufacturing site is updated per the approved change request
- The 10 MB audit report file is attached to the change request record and is retrievable

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
