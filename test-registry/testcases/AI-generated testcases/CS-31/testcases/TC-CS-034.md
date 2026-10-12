# TC-CS-034: Attempt to Submit Vendor Change Request with Missing Approval Decision

**User Story:**          [CS-31] Review And Approve A Change Request Affecting An Approved Vendor'S Man
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Vendor Change Request Approval Workflow
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
| P1 | User Role | User has the role of Quality Assurance Manager with SAP authorization to review vendor change requests |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Vendor `{TD.vendorIdError}` exists in SAP master data |
| P4 | Change Request | A pending change request `{TD.changeRequestIdError}` exists for vendor `{TD.vendorIdError}`, requesting a manufacturing site change |
| P5 | Workflow Configuration | My Inbox app is configured; the Approval Decision field is mandatory and must be selected before submission |

---

### Test Data

**Dataset Reference:** `testdata/CS-31/CS-31-testdata.json` — Dataset ID: `TD-CS-031-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.vendorIdError}` | Vendor account number with pending change request — viewed in inbox | Valid |
| Change Request ID | `{TD.changeRequestIdError}` | Workflow item ID for the pending manufacturing site change request | Valid |
| Approval Decision | `{TD.emptyDecision}` | Decision field — intentionally left empty to test mandatory field validation | Invalid (Empty) |
| Approval Comments | `{TD.optionalComments}` | Comments field — may be filled but decision is missing | Valid |

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
| 9 | Locate the change request for vendor `{TD.vendorIdError}` with description containing "Manufacturing Site Change" | `{TD.vendorIdError}` | The change request work item is visible in the inbox list |
| 10 | Click the change request item to open it | — | Change request detail screen opens, showing vendor information and requested change |
| 11 | Verify the Vendor ID field displays the expected vendor | `{TD.vendorIdError}` | Vendor ID matches the test data value |
| 12 | In the "Comments" or "Notes" field, enter optional comments (if desired) | `{TD.optionalComments}` | Comments text is entered in the field |
| 13 | Do NOT select any value in the "Decision" or "Approval Decision" field — leave it empty | `{TD.emptyDecision}` | Decision field remains empty; no selection is made |
| 14 | Click the "Submit" or "Save" button to attempt submission without selecting a decision | — | SAP validates the form fields |
| 15 | Observe the system response | — | SAP displays a validation error message indicating that the Approval Decision field is mandatory and must be filled; submission is blocked |
| 16 | Verify that the Decision field is visually highlighted or marked as required | — | The Decision field is highlighted (e.g., red border, error indicator icon) with a label or tooltip indicating it is a mandatory field |
| 17 | Verify that the change request is NOT submitted and remains in pending status | — | Change request status remains "Pending"; no workflow progression occurs |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system successfully blocks submission of the change request when the mandatory Approval Decision field is empty
- SAP displays a clear validation error message indicating the Decision field is required
- The Decision field is visually highlighted as mandatory and requiring user input
- The change request is NOT submitted and remains in pending status
- No workflow progression occurs; no audit trail entry is created without a valid decision

---

### Post-conditions

- Change request `{TD.changeRequestIdError}` remains in "Pending" status (unchanged)
- Vendor `{TD.vendorIdError}` remains in its current state (unchanged)
- No audit trail entry is created because the decision was not submitted

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
