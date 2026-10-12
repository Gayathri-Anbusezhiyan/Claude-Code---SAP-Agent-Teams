# TC-CS-136: Missing Defect Description field when creating Quality Notification

**User Story:**          [CS-47] Link A Customer Complaint Captured In Sales To A Formal Quality Notifi
**Epic:**                N/A — no epic assigned
**Module:**              Quality Management (QM)
**Feature:**             Quality Notification Field Validation
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
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to create Quality Notifications (Q_QMEL - Quality Notification Create) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Sales Order `{TD.salesOrderNumber}` exists with complete customer, material, and batch data |
| P4 | Regulatory | SAP system enforces GMP-compliant documentation: Defect Description is mandatory at creation (minimum 20 characters) |

---

### Test Data

**Dataset Reference:** `testdata/CS-47/CS-47-testdata.json` — Dataset ID: `TD-CS-047-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | Originating Sales Order | Valid |
| Defect Description | — | Defect Description intentionally left empty | Invalid (missing) |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Sales Orders" | — | Search results appear listing the "Manage Sales Orders" application |
| 8 | Click the "Manage Sales Orders" application from the search results | — | Manage Sales Orders application opens with the order list |
| 9 | In the Sales Order filter field, enter the Sales Order number | `{TD.salesOrderNumber}` | Sales Order number is entered into the filter field |
| 10 | Press Enter to apply the filter | — | Filter is applied; matching Sales Order is displayed in the list |
| 11 | Click the Sales Order number link to open the order details | — | Sales Order detail page opens |
| 12 | Navigate to the "Customer Complaint" section or action menu | — | Customer Complaint action or section is visible |
| 13 | Click the "Create Quality Notification" button or action | — | Quality Notification creation form opens |
| 14 | Verify that Customer, Material, and Batch fields are auto-populated | — | All required master data fields are pre-populated from the Sales Order |
| 15 | Leave the "Defect Description" or "Complaint Details" field empty | — | Defect Description field remains blank |
| 16 | Click the "Save" button to attempt to create the Quality Notification | — | SAP processes the creation request |
| 17 | Observe the on-screen response | — | An error message is displayed indicating that Defect Description is required |
| 18 | Verify that the error message specifically references the Defect Description field | — | Error message states "Defect Description is required" or "Complaint Details must be entered" or similar descriptive text |
| 19 | Verify that the Defect Description field is highlighted or marked as mandatory | — | Defect Description field shows an error indicator or red border with asterisk (*) |
| 20 | Verify that the Quality Notification is NOT created | — | No Quality Notification number is generated; the form remains in edit mode with the error displayed |
| 21 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 22 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 23 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects that the Defect Description field is empty when attempting to save the Quality Notification
- An error message is displayed indicating that Defect Description is a mandatory field for GMP-compliant documentation
- The Quality Notification is NOT created or saved
- The Defect Description field is highlighted as mandatory
- The system prevents creation of the Quality Notification until the Defect Description is provided (minimum 20 characters per GMP requirement)

---

### Post-conditions

- No Quality Notification document is created in the system
- Defect Description field remains empty with error indicator displayed
- Error message is displayed to the user explaining the validation failure
- No application-level crashes or critical warnings occur

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
