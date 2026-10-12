# TC-CS-144: Verify Quality Notification status displays correctly on originating Sales Order

**User Story:**          [CS-47] Link A Customer Complaint Captured In Sales To A Formal Quality Notifi
**Epic:**                N/A — no epic assigned
**Module:**              Quality Management (QM) — Sales & Distribution (SD) Integration
**Feature:**             Bidirectional Quality Notification Link from QM to SD
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to create and update Quality Notifications |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Sales Order `{TD.salesOrderNumber}` exists with complete customer, material, and batch data |
| P4 | Integration | SAP QM and SD modules are integrated with bidirectional Quality Notification link configured |
| P5 | Test Workflow | Quality Notification has been created from the Sales Order and status transitions will be observed on the originating document |

---

### Test Data

**Dataset Reference:** `testdata/CS-47/CS-47-testdata.json` — Dataset ID: `TD-CS-047-INT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | Originating Sales Order | Valid |
| Quality Notification Type | `{TD.notificationType}` | Notification Type code for Customer Complaint | Valid |
| Defect Description | `{TD.defectDescription}` | Customer complaint details | Valid |
| Root Cause Analysis | `{TD.rootCauseAnalysis}` | Root cause investigation text | Valid |
| Corrective Action | `{TD.correctiveAction}` | Documented corrective action plan | Valid |
| Disposition Code | `{TD.dispositionCode}` | SAP disposition code | Valid |

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
| 14 | In the "Defect Description" field, enter the customer complaint text | `{TD.defectDescription}` | Defect Description text is entered |
| 15 | Click the "Save" button to create the Quality Notification | — | SAP creates the Quality Notification; confirmation message appears |
| 16 | Note the Quality Notification number from the success message | — | Quality Notification number is displayed (12-digit numeric format) |
| 17 | Navigate back to the "Manage Sales Orders" application via the search bar | — | Manage Sales Orders application opens |
| 18 | Search for the originating Sales Order | `{TD.salesOrderNumber}` | Sales Order is displayed in the list |
| 19 | Open the Sales Order detail page | — | Sales Order detail page opens |
| 20 | Locate the Quality Notification section or related documents section on the Sales Order | — | Quality Notification section or related documents section is visible |
| 21 | Verify that the Quality Notification number is displayed on the Sales Order | — | The Quality Notification number noted in step 16 is visible on the Sales Order document |
| 22 | Verify that the Quality Notification status "Open" is displayed on the Sales Order | — | Status "Open" is displayed next to the Quality Notification number |
| 23 | Navigate to the Quality Notification management application via the search bar | — | Quality Notification management application opens |
| 24 | Search for the Quality Notification created in step 15 | — | Quality Notification is displayed in the list |
| 25 | Open the Quality Notification detail page | — | Quality Notification detail page opens |
| 26 | Change the status to "Under Investigation" and save | — | Status is updated to "Under Investigation"; confirmation message appears |
| 27 | Navigate back to the "Manage Sales Orders" application via the search bar | — | Manage Sales Orders application opens |
| 28 | Search for the originating Sales Order again | `{TD.salesOrderNumber}` | Sales Order is displayed in the list |
| 29 | Open the Sales Order detail page | — | Sales Order detail page opens |
| 30 | Verify that the Quality Notification status has updated to "Under Investigation" on the Sales Order | — | Status "Under Investigation" is displayed next to the Quality Notification number (bidirectional link active) |
| 31 | Navigate back to the Quality Notification management application | — | Quality Notification management application opens |
| 32 | Open the Quality Notification detail page | — | Quality Notification detail page opens in edit mode |
| 33 | Enter Root Cause, Corrective Action, and Disposition Code | `{TD.rootCauseAnalysis}`, `{TD.correctiveAction}`, `{TD.dispositionCode}` | All three mandatory fields are populated |
| 34 | Change the status to "Closed" and save | — | Quality Notification is closed; confirmation message appears |
| 35 | Navigate back to the "Manage Sales Orders" application | — | Manage Sales Orders application opens |
| 36 | Search for the originating Sales Order again | `{TD.salesOrderNumber}` | Sales Order is displayed in the list |
| 37 | Open the Sales Order detail page | — | Sales Order detail page opens |
| 38 | Verify that the Quality Notification status has updated to "Closed" on the Sales Order | — | Status "Closed" is displayed next to the Quality Notification number (bidirectional link persists through all status transitions) |
| 39 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 40 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 41 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Quality Notification number and status are displayed on the originating Sales Order document immediately after creation
- The bidirectional link between the Sales Order and Quality Notification is active and visible
- All status transitions of the Quality Notification ("Open" → "Under Investigation" → "Closed") are reflected on the Sales Order in real-time or after page refresh
- The integration between QM and SD modules functions correctly for audit trail and traceability requirements

---

### Post-conditions

- Quality Notification status is "Closed"
- Sales Order displays the Quality Notification number and status "Closed"
- Bidirectional link between Sales Order and Quality Notification is persisted and auditable
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
