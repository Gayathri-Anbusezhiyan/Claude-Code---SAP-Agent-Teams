# TC-CS-126: Create Quality Notification from Return Order with complete customer complaint details

**User Story:**          [CS-47] Link A Customer Complaint Captured In Sales To A Formal Quality Notifi
**Epic:**                N/A — no epic assigned
**Module:**              Quality Management (QM)
**Feature:**             Quality Notification Creation from Customer Complaint
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to create Quality Notifications (Q_QMEL - Quality Notification Create) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Return Order `{TD.returnOrderNumber}` exists and is active with complete customer, material, and batch data |
| P4 | Master Data | Customer `{TD.customerId}` exists and is active in SAP Customer Master (KNA1) |
| P5 | Master Data | Material `{TD.materialNumber}` exists, is released, and has batch management enabled |
| P6 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNumber}` and is assigned to the Return Order |
| P7 | Configuration | Quality Notification Type for Customer Complaint is configured and active in SAP QM module |
| P8 | Configuration | Workflow routing is configured to route Quality Notifications to the QA team's worklist |
| P9 | Regulatory | SAP system is configured for GMP-compliant Quality Notification documentation |

---

### Test Data

**Dataset Reference:** `testdata/CS-47/CS-47-testdata.json` — Dataset ID: `TD-CS-047-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Return Order Number | `{TD.returnOrderNumber}` | Originating Return Order containing customer complaint | Valid |
| Quality Notification Type | `{TD.notificationType}` | Notification Type code for Customer Complaint | Valid |
| Customer ID | `{TD.customerId}` | Customer account number (auto-populated from Return Order) | Valid |
| Customer Name | `{TD.customerName}` | Customer name (auto-populated from Customer Master) | Valid |
| Material Number | `{TD.materialNumber}` | Material master number (auto-populated from Return Order) | Valid |
| Material Description | `{TD.materialDescription}` | Material description (auto-populated from Material Master) | Valid |
| Batch Number | `{TD.batchNumber}` | Batch number (auto-populated from Return Order) | Valid |
| Defect Description | `{TD.defectDescription}` | Customer complaint details (minimum 20 characters) | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Returns" or "Manage Sales Orders" | — | Search results appear listing the Returns management application |
| 8 | Click the Returns management application from the search results | — | Returns management application opens with the order list |
| 9 | In the Return Order filter field, enter the Return Order number | `{TD.returnOrderNumber}` | Return Order number is entered into the filter field |
| 10 | Press Enter to apply the filter | — | Filter is applied; matching Return Order is displayed in the list |
| 11 | Click the Return Order number link to open the order details | — | Return Order detail page opens displaying header and item information |
| 12 | Navigate to the "Customer Complaint" section or action menu | — | Customer Complaint action or section is visible |
| 13 | Click the "Create Quality Notification" button or action | — | Quality Notification creation form opens |
| 14 | Verify that the Notification Type field is pre-populated | `{TD.notificationType}` | Notification Type shows Customer Complaint type code |
| 15 | Verify that the Customer ID field is auto-populated from the Return Order | `{TD.customerId}` | Customer ID is displayed in the Quality Notification header |
| 16 | Verify that the Customer Name field is auto-populated | `{TD.customerName}` | Customer Name is displayed in the Quality Notification header |
| 17 | Verify that the Reference Document field shows the originating Return Order | `{TD.returnOrderNumber}` | Reference Document field displays the Return Order number |
| 18 | Verify that the Material Number field is auto-populated from the Return Order line item | `{TD.materialNumber}` | Material Number is displayed on the Quality Notification |
| 19 | Verify that the Material Description field is auto-populated | `{TD.materialDescription}` | Material Description is displayed |
| 20 | Verify that the Batch Number field is auto-populated from the Return Order line item | `{TD.batchNumber}` | Batch Number is displayed on the Quality Notification |
| 21 | Verify that the Notification Date field is auto-populated with the current system date | — | Notification Date shows today's date |
| 22 | In the "Defect Description" or "Complaint Details" field, enter the customer complaint text | `{TD.defectDescription}` | Defect Description text is entered (minimum 20 characters per GMP requirement) |
| 23 | Click the "Save" button to create the Quality Notification | — | SAP begins processing the Quality Notification creation |
| 24 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Quality Notification number |
| 25 | Note the Quality Notification number from the success message or header | — | Quality Notification number is displayed (12-digit numeric format) |
| 26 | Verify that the Quality Notification status is set to "Open" | — | Notification Status field displays "Open" |
| 27 | Click the search icon (top-right shell bar) and type "Quality Notification Worklist" or "My QA Tasks" | — | Search results appear listing the QA worklist application |
| 28 | Click the worklist application from the search results | — | QA team's worklist application opens |
| 29 | Search for the newly created Quality Notification using the number noted in step 25 | — | The Quality Notification appears in the worklist with status "Open" |
| 30 | Verify that the Quality Notification is assigned to the QA team for investigation | — | Assignment field shows QA team or QA user ID |
| 31 | Navigate back to the Returns management application via the search bar | — | Returns management application opens |
| 32 | Search for the originating Return Order | `{TD.returnOrderNumber}` | Return Order is displayed in the list |
| 33 | Open the Return Order detail page | — | Return Order detail page opens |
| 34 | Verify that the Quality Notification number and status are displayed on the Return Order | — | Quality Notification number with status "Open" is visible on the Return Order document |
| 35 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 36 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 37 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Quality Notification number is generated by SAP and displayed in the confirmation message
- The Quality Notification is persisted in SAP with Notification Type "Customer Complaint" and status "Open"
- All header data (Customer ID, Customer Name, Reference Document) is correctly auto-populated from the Return Order
- All material and batch data (Material Number, Material Description, Batch Number) is correctly auto-populated from the Return Order line item
- The Defect Description field contains the entered customer complaint text
- The Quality Notification appears in the QA team's worklist for investigation
- The Quality Notification number and status "Open" are displayed on the originating Return Order document (bidirectional link established)

---

### Post-conditions

- SAP Quality Notification document exists with the generated Quality Notification number
- Notification status is "Open"
- Customer, material, batch, and complaint details are correctly recorded on the Quality Notification
- Quality Notification is routed to QA team's worklist
- Bidirectional link between Return Order and Quality Notification is active and visible
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
