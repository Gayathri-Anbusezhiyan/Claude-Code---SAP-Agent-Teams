# TC-CS-131: Attempt to create Quality Notification from Sales Order missing batch data

**User Story:**          [CS-47] Link A Customer Complaint Captured In Sales To A Formal Quality Notifi
**Epic:**                N/A — no epic assigned
**Module:**              Quality Management (QM)
**Feature:**             Quality Notification Creation Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
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
| P3 | Master Data | Sales Order `{TD.salesOrderMissingBatch}` exists but has incomplete or missing batch data on line items |
| P4 | Negative Condition | Sales Order specifically lacks batch number data required for Quality Notification auto-population |

---

### Test Data

**Dataset Reference:** `testdata/CS-47/CS-47-testdata.json` — Dataset ID: `TD-CS-047-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number (missing batch) | `{TD.salesOrderMissingBatch}` | Sales Order with missing batch data | Invalid |
| Defect Description | `{TD.defectDescription}` | Customer complaint details | Valid |

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
| 9 | In the Sales Order filter field, enter the Sales Order number | `{TD.salesOrderMissingBatch}` | Sales Order number is entered into the filter field |
| 10 | Press Enter to apply the filter | — | Filter is applied; matching Sales Order is displayed in the list |
| 11 | Click the Sales Order number link to open the order details | — | Sales Order detail page opens displaying header and material information; batch field may be empty |
| 12 | Navigate to the "Customer Complaint" section or action menu | — | Customer Complaint action or section is visible |
| 13 | Click the "Create Quality Notification" button or action | — | Quality Notification creation form opens or error is displayed |
| 14 | Observe whether the Batch Number field is populated | — | Batch Number field is empty or shows an error indicator |
| 15 | Attempt to enter the Defect Description | `{TD.defectDescription}` | Defect Description text is entered |
| 16 | Click the "Save" button to attempt to create the Quality Notification | — | SAP processes the creation request |
| 17 | Observe the on-screen response | — | An error message is displayed indicating that batch data is missing or invalid |
| 18 | Verify that the error message specifically references the missing batch field | — | Error message states "Batch is required" or "Batch data is missing" or similar descriptive text |
| 19 | Verify that the Quality Notification is NOT created | — | No Quality Notification number is generated; the form remains in edit mode with the error displayed |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects that the Sales Order is missing batch data
- An error message is displayed indicating that batch information is required for Quality Notification creation
- The Quality Notification is NOT created or saved
- The system prevents completion of the Quality Notification creation process until batch data is available
- Data integrity is maintained: Quality Notifications cannot be created without complete batch traceability information (critical for GMP compliance)

---

### Post-conditions

- No Quality Notification document is created in the system
- The Sales Order remains unchanged
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
