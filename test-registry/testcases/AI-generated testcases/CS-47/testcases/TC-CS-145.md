# TC-CS-145: Verify Quality Notification routes to correct QA team member's worklist

**User Story:**          [CS-47] Link A Customer Complaint Captured In Sales To A Formal Quality Notifi
**Epic:**                N/A — no epic assigned
**Module:**              Quality Management (QM) — Workflow Management Integration
**Feature:**             Quality Notification Worklist Routing
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to create Quality Notifications and access QA worklist |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Sales Order `{TD.salesOrderNumber}` exists with complete customer, material, and batch data |
| P4 | Workflow Configuration | SAP Workflow routing rules are configured to assign Quality Notifications to QA team worklist based on notification type or organizational assignment |
| P5 | Authorization | Test user has access to the QA team's worklist application |

---

### Test Data

**Dataset Reference:** `testdata/CS-47/CS-47-testdata.json` — Dataset ID: `TD-CS-047-INT-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sales Order Number | `{TD.salesOrderNumber}` | Originating Sales Order | Valid |
| Quality Notification Type | `{TD.notificationType}` | Notification Type code for Customer Complaint | Valid |
| Defect Description | `{TD.defectDescription}` | Customer complaint details | Valid |
| Expected QA Team/User | `{TD.expectedQAAssignment}` | QA team or user ID expected to receive the notification | Valid |

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
| 14 | Verify that the Notification Type field is pre-populated | `{TD.notificationType}` | Notification Type shows Customer Complaint type code |
| 15 | In the "Defect Description" field, enter the customer complaint text | `{TD.defectDescription}` | Defect Description text is entered |
| 16 | Click the "Save" button to create the Quality Notification | — | SAP creates the Quality Notification; confirmation message appears |
| 17 | Note the Quality Notification number from the success message | — | Quality Notification number is displayed (12-digit numeric format) |
| 18 | Click the search icon (top-right shell bar) and type "Quality Notification Worklist" or "My QA Tasks" | — | Search results appear listing the QA worklist application |
| 19 | Click the worklist application from the search results | — | QA team's worklist application opens |
| 20 | Search for the newly created Quality Notification using the number noted in step 17 | — | The Quality Notification appears in the worklist |
| 21 | Verify that the Quality Notification is visible in the QA team's worklist | — | The Quality Notification is listed with status "Open" and assigned to the QA team |
| 22 | Verify that the assignment field shows the expected QA team or user ID | `{TD.expectedQAAssignment}` | Assignment field displays the QA team or user ID as per workflow routing rules |
| 23 | Click the Quality Notification number link in the worklist to open the notification details | — | Quality Notification detail page opens from the worklist context |
| 24 | Verify that all pre-populated data (Customer, Material, Batch, Defect Description) is correctly displayed | — | Customer, Material, Batch, and Defect Description fields show the expected values from the Sales Order |
| 25 | Verify that the worklist entry includes relevant metadata (creation date, notification type, priority) | — | Worklist entry displays creation date, notification type, and priority information |
| 26 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 27 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 28 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Quality Notification is automatically routed to the QA team's worklist immediately after creation
- The worklist assignment field displays the correct QA team or user ID as per SAP Workflow routing rules
- The Quality Notification is accessible and actionable from the QA team's worklist
- All pre-populated data from the Sales Order is correctly displayed in the worklist and notification detail view
- The integration between QM and Workflow Management functions correctly for investigation assignment and SLA tracking

---

### Post-conditions

- Quality Notification is visible in the QA team's worklist with status "Open"
- Assignment field shows the expected QA team or user ID
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
