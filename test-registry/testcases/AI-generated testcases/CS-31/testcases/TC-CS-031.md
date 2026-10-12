# TC-CS-031: Review and Approve Vendor Manufacturing Site Change Request with Audit Report Attachment

**User Story:**          [CS-31] Review And Approve A Change Request Affecting An Approved Vendor'S Man
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Vendor Change Request Approval Workflow
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Manager with SAP authorization to review and approve vendor change requests |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Vendor `{TD.vendorId}` exists in SAP master data and is currently in approved status |
| P4 | Change Request | A pending change request `{TD.changeRequestId}` exists in the system, requesting a manufacturing site change for vendor `{TD.vendorId}` |
| P5 | Workflow Configuration | My Inbox app is configured and accessible; vendor manufacturing site changes require QA approval per system configuration |
| P6 | Supporting Document | A site audit report file `{TD.auditReportFile}` is available for attachment (PDF or DOCX format, under 10 MB) |

---

### Test Data

**Dataset Reference:** `testdata/CS-31/CS-31-testdata.json` — Dataset ID: `TD-CS-031-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.vendorId}` | Vendor account number with pending change request — viewed in inbox | Valid |
| Change Request ID | `{TD.changeRequestId}` | Workflow item ID for the pending manufacturing site change request | Valid |
| Approval Decision | `{TD.approvalDecision}` | Decision value — entered by QA Manager | Valid (Approve) |
| Approval Comments | `{TD.approvalComments}` | Free text comments explaining the approval decision — entered by QA Manager | Valid |
| Audit Report File | `{TD.auditReportFile}` | Site audit report file to attach — selected from file system | Valid |
| New Manufacturing Site | `{TD.newManufacturingSite}` | The proposed new manufacturing site address/code shown in the change request | Valid |
| PO Supplier ID | `{TD.poSupplierId}` | Vendor ID to use when verifying PO creation is unblocked after approval | Valid (same as vendorId) |

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
| 9 | Locate the change request for vendor `{TD.vendorId}` with description containing "Manufacturing Site Change" | `{TD.vendorId}` | The change request work item is visible in the inbox list |
| 10 | Click the change request item to open it | — | Change request detail screen opens, showing vendor information and requested change |
| 11 | Verify the Vendor ID field displays the expected vendor | `{TD.vendorId}` | Vendor ID matches the test data value |
| 12 | Verify the Current Manufacturing Site field displays the existing site | — | Current site address/code is displayed |
| 13 | Verify the New Manufacturing Site field displays the proposed new site | `{TD.newManufacturingSite}` | New site address/code matches the test data value |
| 14 | Verify the Requestor Name field displays the name of the user who requested the change | — | Requestor name is auto-populated and displayed |
| 15 | Verify the Request Date field displays the date the change was requested | — | Request date is auto-populated and displayed |
| 16 | Click the "Attach" or "Add Attachment" button in the change request form | — | File upload dialog or attachment section becomes active |
| 17 | Select the audit report file from the file system | `{TD.auditReportFile}` | File is selected in the file picker dialog |
| 18 | Confirm the file selection (click "Open" or equivalent) | — | Audit report file is uploaded and displayed in the Attachments section with file name and size |
| 19 | In the "Decision" or "Approval Decision" field, select "Approve" | `{TD.approvalDecision}` | "Approve" option is selected |
| 20 | In the "Comments" or "Notes" field, enter the approval comments | `{TD.approvalComments}` | Comments text is entered in the field |
| 21 | Click the "Submit" or "Approve" button to submit the approval decision | — | SAP begins processing the approval workflow |
| 22 | Observe the on-screen confirmation response | — | A success message is displayed indicating the change request has been approved |
| 23 | Verify the approval status of the change request changes to "Approved" | — | Status field shows "Approved" |
| 24 | Navigate back to the My Inbox list | — | My Inbox list is displayed; the approved change request is no longer in the pending items list or is marked as completed |
| 25 | Click the search icon and type "Manage Suppliers" or equivalent vendor master app | — | Search results appear listing the vendor management application |
| 26 | Click the vendor management application from search results | — | Vendor management application opens |
| 27 | Search for the vendor using the Vendor ID | `{TD.vendorId}` | Vendor record appears in the search results |
| 28 | Click the vendor record to open it in display mode | — | Vendor master record opens, displaying vendor details |
| 29 | Verify the Manufacturing Site field now shows the new site address | `{TD.newManufacturingSite}` | Manufacturing Site field has been updated to the new value as per the approved change request |
| 30 | Verify the vendor status is "Active" or not blocked | — | Vendor status shows Active; no blocking indicator is present |
| 31 | Navigate to the "Manage Purchase Orders" application via the search bar | — | Manage Purchase Orders application opens |
| 32 | Click the "Create PO" button | — | New PO creation form opens |
| 33 | In the "Supplier" field, enter the Vendor ID | `{TD.poSupplierId}` | Vendor ID is entered |
| 34 | Press Enter to confirm the Supplier entry | — | SAP validates the supplier; supplier name is auto-populated; no blocking error is displayed |
| 35 | Verify that PO creation is not blocked | — | PO header fields are populated with organizational data; no error message about vendor blocking is displayed |
| 36 | Discard the PO draft (click "Cancel" or "Discard") | — | PO draft is discarded; no PO is created |
| 37 | Navigate back to the My Inbox application via the search bar | — | My Inbox application opens |
| 38 | Click the completed change request (if still visible) or access workflow history | `{TD.changeRequestId}` | Change request detail or history view opens |
| 39 | Verify the Approver Name field displays the current user's name | — | Approver name matches the logged-in QA Manager |
| 40 | Verify the Decision Timestamp field displays the date and time of approval | — | Timestamp is displayed showing the date and time when the approval was submitted |
| 41 | Verify the audit trail entry is logged with approver, decision, timestamp, and comments | — | Audit log entry is present with all required details (approver ID, "Approved", timestamp, comments text) |
| 42 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 43 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 44 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The vendor manufacturing site change request is successfully approved
- The vendor master record for `{TD.vendorId}` is updated with the new manufacturing site `{TD.newManufacturingSite}`
- The vendor status remains Active and is not blocked
- Purchase orders can be created against the vendor without blocking errors
- The audit trail entry is logged in the system with the approver name (QA Manager), decision ("Approved"), timestamp, and approval comments
- The audit report attachment is stored with the change request record

---

### Post-conditions

- Vendor `{TD.vendorId}` manufacturing site is updated to `{TD.newManufacturingSite}` in SAP master data
- Vendor status is Active; vendor is not blocked for purchasing transactions
- Change request `{TD.changeRequestId}` status is "Approved" and completed
- Audit trail entry exists with approver, decision, timestamp, and comments
- Audit report file is attached to the change request record

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
