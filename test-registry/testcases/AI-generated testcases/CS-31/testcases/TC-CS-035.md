# TC-CS-035: Attempt to Process Change Request with Missing Vendor ID

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
| P3 | Change Request | A change request exists in the system with missing or corrupted Vendor ID field `{TD.changeRequestIdMissingVendor}` (simulated test condition or data setup) |
| P4 | Workflow Configuration | My Inbox app is configured; the Vendor ID field is mandatory for all vendor change requests |

---

### Test Data

**Dataset Reference:** `testdata/CS-31/CS-31-testdata.json` — Dataset ID: `TD-CS-031-ERR-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.emptyVendorId}` | Vendor ID field — intentionally empty or missing to test mandatory field validation | Invalid (Empty) |
| Change Request ID | `{TD.changeRequestIdMissingVendor}` | Workflow item ID for the change request with missing vendor ID | Valid |
| Approval Decision | `{TD.approvalDecisionErr}` | Decision value to attempt — entered by QA Manager | Valid (Approve) |

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
| 9 | Locate the change request with missing or empty Vendor ID (identified by change request ID or description) | `{TD.changeRequestIdMissingVendor}` | The change request work item is visible in the inbox list (may show as incomplete or with error indicator) |
| 10 | Click the change request item to open it | — | Change request detail screen opens |
| 11 | Verify that the Vendor ID field is empty, missing, or displays an error | `{TD.emptyVendorId}` | Vendor ID field is blank OR displays a placeholder/error indicator |
| 12 | Verify that the system displays a validation error or warning about the missing Vendor ID | — | SAP displays an error message or warning banner stating "Vendor ID is required" or "Missing mandatory field: Vendor ID" |
| 13 | In the "Decision" or "Approval Decision" field, select "Approve" (attempting to proceed) | `{TD.approvalDecisionErr}` | "Approve" option is selected |
| 14 | Click the "Submit" or "Approve" button to attempt submission | — | SAP validates the form fields |
| 15 | Observe the system response | — | SAP displays a validation error message indicating that the Vendor ID field is mandatory and must be populated; submission is blocked |
| 16 | Verify that the Vendor ID field is visually highlighted or marked as required | — | The Vendor ID field is highlighted (e.g., red border, error indicator icon) with a label or tooltip indicating it is a mandatory field |
| 17 | Verify that the change request is NOT submitted and remains in pending or error status | — | Change request status remains "Pending" or shows an error state; no workflow progression occurs |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system successfully blocks submission of the change request when the mandatory Vendor ID field is empty or missing
- SAP displays a clear validation error message indicating the Vendor ID is required
- The Vendor ID field is visually highlighted as mandatory and requiring input
- The change request is NOT submitted and remains in pending or error status
- No workflow progression occurs; data integrity is maintained

---

### Post-conditions

- Change request `{TD.changeRequestIdMissingVendor}` remains in "Pending" or "Error" status (unchanged)
- No vendor master data is affected
- No audit trail entry is created because the change request was not successfully submitted

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
