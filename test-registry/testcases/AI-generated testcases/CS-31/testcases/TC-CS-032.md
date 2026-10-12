# TC-CS-032: Reject Vendor Manufacturing Site Change Request and Verify Automatic Rollback

**User Story:**          [CS-31] Review And Approve A Change Request Affecting An Approved Vendor'S Man
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Vendor Change Request Approval Workflow
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Manager with SAP authorization to review and reject vendor change requests |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Vendor `{TD.vendorIdReject}` exists in SAP master data with current approved manufacturing site `{TD.currentManufacturingSite}` |
| P4 | Change Request | A pending change request `{TD.changeRequestIdReject}` exists, requesting a manufacturing site change from `{TD.currentManufacturingSite}` to `{TD.proposedManufacturingSite}` |
| P5 | Workflow Configuration | My Inbox app is configured; vendor manufacturing site changes require QA approval and support rejection with automatic rollback |

---

### Test Data

**Dataset Reference:** `testdata/CS-31/CS-31-testdata.json` — Dataset ID: `TD-CS-031-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.vendorIdReject}` | Vendor account number with pending change request — viewed in inbox | Valid |
| Change Request ID | `{TD.changeRequestIdReject}` | Workflow item ID for the pending manufacturing site change request to be rejected | Valid |
| Approval Decision | `{TD.rejectionDecision}` | Decision value — entered by QA Manager | Valid (Reject) |
| Rejection Comments | `{TD.rejectionComments}` | Free text comments explaining the rejection reason — entered by QA Manager | Valid |
| Current Manufacturing Site | `{TD.currentManufacturingSite}` | The existing approved manufacturing site (pre-change request) | Valid |
| Proposed Manufacturing Site | `{TD.proposedManufacturingSite}` | The proposed new manufacturing site that will be rejected | Valid |

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
| 9 | Locate the change request for vendor `{TD.vendorIdReject}` with description containing "Manufacturing Site Change" | `{TD.vendorIdReject}` | The change request work item is visible in the inbox list |
| 10 | Click the change request item to open it | — | Change request detail screen opens, showing vendor information and requested change |
| 11 | Verify the Vendor ID field displays the expected vendor | `{TD.vendorIdReject}` | Vendor ID matches the test data value |
| 12 | Verify the Current Manufacturing Site field displays the existing approved site | `{TD.currentManufacturingSite}` | Current site address/code matches the test data value |
| 13 | Verify the New Manufacturing Site field displays the proposed new site | `{TD.proposedManufacturingSite}` | Proposed site address/code matches the test data value |
| 14 | In the "Decision" or "Approval Decision" field, select "Reject" | `{TD.rejectionDecision}` | "Reject" option is selected |
| 15 | In the "Comments" or "Notes" field, enter the rejection comments | `{TD.rejectionComments}` | Comments text is entered in the field |
| 16 | Click the "Submit" or "Reject" button to submit the rejection decision | — | SAP begins processing the rejection workflow |
| 17 | Observe the on-screen confirmation response | — | A success message is displayed indicating the change request has been rejected |
| 18 | Verify the status of the change request changes to "Rejected" | — | Status field shows "Rejected" |
| 19 | Navigate back to the My Inbox list | — | My Inbox list is displayed; the rejected change request is no longer in the pending items list or is marked as completed |
| 20 | Click the search icon and type "Manage Suppliers" or equivalent vendor master app | — | Search results appear listing the vendor management application |
| 21 | Click the vendor management application from search results | — | Vendor management application opens |
| 22 | Search for the vendor using the Vendor ID | `{TD.vendorIdReject}` | Vendor record appears in the search results |
| 23 | Click the vendor record to open it in display mode | — | Vendor master record opens, displaying vendor details |
| 24 | Verify the Manufacturing Site field shows the ORIGINAL site address (not the proposed new site) | `{TD.currentManufacturingSite}` | Manufacturing Site field displays the original value; the proposed change has been rolled back automatically |
| 25 | Verify the vendor status is "Active" or not blocked | — | Vendor status shows Active; no blocking indicator is present |
| 26 | Navigate back to the My Inbox application via the search bar | — | My Inbox application opens |
| 27 | Click the completed/rejected change request (if still visible) or access workflow history | `{TD.changeRequestIdReject}` | Change request detail or history view opens |
| 28 | Verify the Approver Name field displays the current user's name | — | Approver name (rejector) matches the logged-in QA Manager |
| 29 | Verify the Decision Timestamp field displays the date and time of rejection | — | Timestamp is displayed showing the date and time when the rejection was submitted |
| 30 | Verify the audit trail entry is logged with approver, decision, timestamp, and comments | — | Audit log entry is present with all required details (approver ID, "Rejected", timestamp, comments text) |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The vendor manufacturing site change request is successfully rejected
- The vendor master record for `{TD.vendorIdReject}` retains the ORIGINAL manufacturing site `{TD.currentManufacturingSite}` — the proposed change `{TD.proposedManufacturingSite}` is NOT applied
- The system automatically reverts the vendor record to its previous approved state
- The vendor status remains Active and is not blocked
- The audit trail entry is logged in the system with the approver name (QA Manager), decision ("Rejected"), timestamp, and rejection comments

---

### Post-conditions

- Vendor `{TD.vendorIdReject}` manufacturing site remains at `{TD.currentManufacturingSite}` (unchanged)
- Vendor status is Active; vendor is not blocked for purchasing transactions
- Change request `{TD.changeRequestIdReject}` status is "Rejected" and completed
- Audit trail entry exists with approver, decision, timestamp, and comments

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
