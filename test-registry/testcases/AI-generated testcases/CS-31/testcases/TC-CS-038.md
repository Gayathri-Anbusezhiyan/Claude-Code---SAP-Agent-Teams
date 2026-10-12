# TC-CS-038: Approve Vendor Change Request Without Attachment

**User Story:**          [CS-31] Review And Approve A Change Request Affecting An Approved Vendor'S Man
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Vendor Change Request Approval Workflow
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Manager with SAP authorization to review and approve vendor change requests |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Vendor `{TD.vendorIdNoAttach}` exists in SAP master data |
| P4 | Change Request | A pending change request `{TD.changeRequestIdNoAttach}` exists for vendor `{TD.vendorIdNoAttach}`, requesting a manufacturing site change |
| P5 | Field Configuration | The Attachment field in the change request form is OPTIONAL (not mandatory) |

---

### Test Data

**Dataset Reference:** `testdata/CS-31/CS-31-testdata.json` — Dataset ID: `TD-CS-031-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.vendorIdNoAttach}` | Vendor account number with pending change request — viewed in inbox | Valid |
| Change Request ID | `{TD.changeRequestIdNoAttach}` | Workflow item ID for the pending manufacturing site change request | Valid |
| Approval Decision | `{TD.approvalDecisionNoAttach}` | Decision value — entered by QA Manager | Valid (Approve) |
| Approval Comments | `{TD.commentsNoAttach}` | Free text comments — entered by QA Manager | Valid |
| Audit Report File | `{TD.noAttachment}` | No file attached — optional field left empty | Valid (Zero boundary) |

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
| 9 | Locate the change request for vendor `{TD.vendorIdNoAttach}` with description containing "Manufacturing Site Change" | `{TD.vendorIdNoAttach}` | The change request work item is visible in the inbox list |
| 10 | Click the change request item to open it | — | Change request detail screen opens, showing vendor information and requested change |
| 11 | Verify the Vendor ID field displays the expected vendor | `{TD.vendorIdNoAttach}` | Vendor ID matches the test data value |
| 12 | Do NOT attach any file — leave the Attachments section empty | `{TD.noAttachment}` | No attachment is added; Attachments section remains empty or shows "No attachments" |
| 13 | In the "Decision" or "Approval Decision" field, select "Approve" | `{TD.approvalDecisionNoAttach}` | "Approve" option is selected |
| 14 | In the "Comments" or "Notes" field, enter the approval comments | `{TD.commentsNoAttach}` | Comments text is entered in the field |
| 15 | Click the "Submit" or "Approve" button to submit the approval decision | — | SAP begins processing the approval workflow |
| 16 | Observe the on-screen confirmation response | — | A success message is displayed indicating the change request has been approved; no error or warning about missing attachment is displayed |
| 17 | Verify the approval status of the change request changes to "Approved" | — | Status field shows "Approved" |
| 18 | Navigate back to the My Inbox list and then re-open the completed change request or access workflow history | `{TD.changeRequestIdNoAttach}` | Change request detail or history view opens |
| 19 | Verify the Attachments section shows "No attachments" or is empty | — | Attachments section is empty; no error or missing data indicator is present |
| 20 | Verify the audit trail entry is logged with approver, decision, timestamp, and comments (without attachment reference) | — | Audit log entry is present with all required details; no attachment reference or error |
| 21 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 22 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 23 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system successfully processes and approves the change request without requiring an attachment
- The attachment field is confirmed to be optional; no mandatory field validation error is triggered
- The change request is approved successfully with no error or warning related to missing attachment
- The audit trail entry is logged correctly with approver, decision, timestamp, and comments
- The vendor master record is updated as per the approved change request

---

### Post-conditions

- Change request `{TD.changeRequestIdNoAttach}` status is "Approved" and completed
- Vendor `{TD.vendorIdNoAttach}` manufacturing site is updated per the approved change request
- No attachment is stored with the change request record (Attachments section is empty)
- Audit trail entry exists with approver, decision, timestamp, and comments (no attachment reference)

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
