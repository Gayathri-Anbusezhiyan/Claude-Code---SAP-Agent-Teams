# TC-CS-036: Approve Vendor Change Request with Maximum Length Approval Comments

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
| P3 | Master Data | Vendor `{TD.vendorIdEdge}` exists in SAP master data |
| P4 | Change Request | A pending change request `{TD.changeRequestIdEdge}` exists for vendor `{TD.vendorIdEdge}`, requesting a manufacturing site change |
| P5 | Field Configuration | The Comments/Notes field in the change request form has a maximum length of 255 characters |

---

### Test Data

**Dataset Reference:** `testdata/CS-31/CS-31-testdata.json` — Dataset ID: `TD-CS-031-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.vendorIdEdge}` | Vendor account number with pending change request — viewed in inbox | Valid |
| Change Request ID | `{TD.changeRequestIdEdge}` | Workflow item ID for the pending manufacturing site change request | Valid |
| Approval Decision | `{TD.approvalDecisionEdge}` | Decision value — entered by QA Manager | Valid (Approve) |
| Approval Comments | `{TD.maxLengthComments}` | Free text comments at exactly 255 characters (maximum allowed length) — entered by QA Manager | Valid (Boundary) |

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
| 9 | Locate the change request for vendor `{TD.vendorIdEdge}` with description containing "Manufacturing Site Change" | `{TD.vendorIdEdge}` | The change request work item is visible in the inbox list |
| 10 | Click the change request item to open it | — | Change request detail screen opens, showing vendor information and requested change |
| 11 | Verify the Vendor ID field displays the expected vendor | `{TD.vendorIdEdge}` | Vendor ID matches the test data value |
| 12 | In the "Decision" or "Approval Decision" field, select "Approve" | `{TD.approvalDecisionEdge}` | "Approve" option is selected |
| 13 | In the "Comments" or "Notes" field, enter the maximum length comments text (255 characters) | `{TD.maxLengthComments}` | All 255 characters are successfully entered into the Comments field |
| 14 | Verify that the field accepts all 255 characters without truncation or error | — | Comments field displays all 255 characters; no truncation occurs; no error message about exceeding maximum length |
| 15 | Verify the character count indicator (if present) shows 255/255 or equivalent | — | Character count indicator shows the field is at maximum capacity |
| 16 | Click the "Submit" or "Approve" button to submit the approval decision | — | SAP begins processing the approval workflow |
| 17 | Observe the on-screen confirmation response | — | A success message is displayed indicating the change request has been approved |
| 18 | Verify the approval status of the change request changes to "Approved" | — | Status field shows "Approved" |
| 19 | Navigate back to the My Inbox list and then re-open the completed change request or access workflow history | `{TD.changeRequestIdEdge}` | Change request detail or history view opens |
| 20 | Verify the approval comments are fully stored and displayed (all 255 characters) | `{TD.maxLengthComments}` | The Comments field displays all 255 characters correctly; no truncation has occurred in storage or retrieval |
| 21 | Verify the audit trail entry includes the full 255-character comments text | — | Audit log entry shows the complete comments text (255 characters) |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system successfully accepts and stores approval comments at the maximum length boundary of 255 characters
- The change request is approved without any error or warning related to comments length
- All 255 characters are stored correctly in the database and displayed correctly when the change request is viewed or the audit trail is accessed
- No data loss or truncation occurs at the boundary value

---

### Post-conditions

- Change request `{TD.changeRequestIdEdge}` status is "Approved" and completed
- Vendor `{TD.vendorIdEdge}` manufacturing site is updated per the approved change request
- Audit trail entry exists with approver, decision, timestamp, and the full 255-character comments text

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
