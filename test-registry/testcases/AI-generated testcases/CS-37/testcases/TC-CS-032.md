# TC-CS-032: Verify Return Order Integration with Quality Notification (QM Module)

**User Story:**          [CS-37] Process A Return Order For A Customer Complaint About A Defective Phar
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Return Order Processing for Customer Complaints
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
| P1 | User Role | User has the role of Customer Service Representative with SAP authorization to create Sales Return Orders and view Quality Notifications |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrganization}` |
| P4 | Master Data | Material `{TD.materialId}` is created, released, batch-managed (pharmaceutical), and configured for sales organization `{TD.salesOrganization}` and plant `{TD.plant}` |
| P5 | Integration Pre-condition | Quality Notification `{TD.qualityNotification}` exists in SAP QM module with status "Open" or "In Process"; notification type is "Customer Complaint" or equivalent; linked to material `{TD.materialId}` and batch `{TD.batchNumber}` |
| P6 | Master Data | Return reason code `{TD.returnReasonCode}` is configured in SAP customizing for return order processing |
| P7 | Configuration | QM integration is enabled for Return Orders in SAP customizing (linking Return Order to Quality Notification is configured) |

---

### Test Data

**Dataset Reference:** `testdata/CS-37/CS-37-testdata.json` — Dataset ID: `TD-CS-037-INT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Valid customer account number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Valid pharmaceutical material number (batch-managed) — entered by the user | Valid |
| Return Quantity | `{TD.returnQuantity}` | Quantity of returned goods — entered by the user | Valid |
| Return Reason Code | `{TD.returnReasonCode}` | Reason for rejection code — selected by the user | Valid |
| Quality Notification | `{TD.qualityNotification}` | Existing QM notification number for defective product — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Batch number linked to the Quality Notification — entered by the user | Valid |
| Inspection Lot | `{TD.inspectionLot}` | Expected Quality Inspection Lot number (if auto-created by QM integration) | Valid (Output) |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Quality Notifications" | — | Search results appear listing the Quality Notifications application |
| 8 | Click the "Manage Quality Notifications" application name from the search results | — | Quality Notifications list is displayed |
| 9 | Search for the Quality Notification using the notification number | `{TD.qualityNotification}` | Quality Notification `{TD.qualityNotification}` appears in the search results |
| 10 | Click the Quality Notification number to open the notification details | — | Quality Notification details are displayed; status is "Open" or "In Process"; material `{TD.materialId}` and batch `{TD.batchNumber}` are visible |
| 11 | Note the Quality Notification status and linked data before creating the Return Order | — | Current status and data are recorded for comparison after Return Order creation |
| 12 | Navigate back to the Fiori home page | — | Fiori home page is displayed |
| 13 | Click the search icon and type "Create Return Order" | — | Search results appear listing the Return Order creation application |
| 14 | Click the "Create Return Order" application name from the search results | — | Return Order creation form opens in edit mode |
| 15 | In the "Sold-to Party:*" header field, enter the Customer ID | `{TD.customerId}` | Customer ID value is entered into the field |
| 16 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer name is auto-populated |
| 17 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 18 | In the "Material" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 19 | Press Enter to confirm the Material entry | — | SAP validates the material; material description and unit of measure are auto-populated |
| 20 | In the "Batch" field of the line item, enter the batch number | `{TD.batchNumber}` | Batch number (linked to the Quality Notification) is entered and validated |
| 21 | Press Enter to confirm the batch entry | — | Batch is validated |
| 22 | In the "Quantity" field, enter the return quantity | `{TD.returnQuantity}` | Return quantity is populated in the line item |
| 23 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 24 | In the "Reason for Rejection" field, enter the return reason code | `{TD.returnReasonCode}` | Return reason code is entered |
| 25 | Press Enter to confirm the return reason entry | — | Return reason is confirmed |
| 26 | In the "Quality Notification" field (header or item level), enter the Quality Notification number | `{TD.qualityNotification}` | Quality Notification number is entered into the field |
| 27 | Press Enter to confirm the Quality Notification entry | — | SAP validates the QM notification; notification details are confirmed; integration link is established; notification status may be displayed |
| 28 | Observe that the Quality Notification is successfully linked to the Return Order | — | Quality Notification number is visible in the Return Order; no error message; integration link is active |
| 29 | Click the "Save" or "Create" button in the toolbar | — | SAP processes the return order submission and establishes the QM integration link |
| 30 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Return Order number |
| 31 | Note the Return Order document number from the success message | — | Return Order number is displayed |
| 32 | Navigate to the Return Order list and open the newly created Return Order | — | Return Order details are displayed; Quality Notification `{TD.qualityNotification}` is visible in the document (header or items section or related documents tab) |
| 33 | Verify the Quality Notification link in the Return Order document | — | Quality Notification number is displayed; link is clickable (if UI supports navigation); integration is confirmed |
| 34 | Navigate back to the Quality Notification application ("Manage Quality Notifications") | — | Quality Notifications list is displayed |
| 35 | Search for and open the Quality Notification `{TD.qualityNotification}` | — | Quality Notification details are displayed |
| 36 | Verify that the Return Order number is visible in the Quality Notification document (related documents or linked sales documents section) | — | Return Order number is displayed in the Quality Notification; bidirectional link is established |
| 37 | If applicable, verify that a Quality Inspection Lot `{TD.inspectionLot}` has been created (if auto-triggered by QM configuration) | — | Inspection Lot number is visible in the Quality Notification or Return Order document flow; inspection status is "Created" or "Open" |
| 38 | Observe the Quality Notification status after Return Order creation | — | Status may remain "Open" / "In Process" or may transition based on QM workflow configuration (e.g., "Linked to Return Order") |
| 39 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 40 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 41 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Return Order is successfully created with Quality Notification `{TD.qualityNotification}` linked
- Quality Notification number is visible in the Return Order document (header, items, or related documents section)
- Return Order number is visible in the Quality Notification document (bidirectional link is established)
- If applicable, a Quality Inspection Lot is auto-created and linked to the Return Order and Quality Notification
- Quality Notification status reflects the integration (status may remain unchanged or transition based on workflow)
- QM integration is successfully established and traceable in both SD and QM modules

---

### Post-conditions

- SAP Return Order document exists with the generated Return Order number
- Return Order status is "Created" / "Open"
- Quality Notification `{TD.qualityNotification}` is linked to the Return Order
- Return Order number is visible in the Quality Notification document
- Quality Inspection Lot may be created (if configured) and linked to both documents
- QM integration link is active and bidirectional

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
