# TC-CS-021: Create Return Order with Valid Customer, Material, Quantity, Return Reason, and Quality Notification Link

**User Story:**          [CS-37] Process A Return Order For A Customer Complaint About A Defective Phar
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Return Order Processing for Customer Complaints
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Customer Service Representative with SAP authorization to create Sales Return Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrganization}` and distribution channel `{TD.distributionChannel}` |
| P4 | Master Data | Material `{TD.materialId}` is created, released, batch-managed (pharmaceutical), and configured for sales organization `{TD.salesOrganization}` and plant `{TD.plant}` |
| P5 | Master Data | Return reason code `{TD.returnReasonCode}` is configured in SAP customizing for return order processing |
| P6 | Integration | Quality Notification `{TD.qualityNotification}` exists in SAP QM module with status Open or In Process |
| P7 | Reference Data | Original sales order `{TD.originalSalesOrder}` exists with delivered status; customer and material match the return order data |

---

### Test Data

**Dataset Reference:** `testdata/CS-37/CS-37-testdata.json` — Dataset ID: `TD-CS-037-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Sold-to Party account number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Pharmaceutical material number (batch-managed) — entered by the user | Valid |
| Return Quantity | `{TD.returnQuantity}` | Quantity of returned goods — entered by the user | Valid |
| Return Reason Code | `{TD.returnReasonCode}` | Reason for rejection code — selected by the user | Valid |
| Quality Notification | `{TD.qualityNotification}` | QM notification number for defective product — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Batch number of the defective pharmaceutical product — entered by the user | Valid |
| Original Sales Order | `{TD.originalSalesOrder}` | Reference document number of the original sales order — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — verified on the return order | Valid |
| Sales Organization | `{TD.salesOrganization}` | Sales organization code — verified in the header | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — verified in the header | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Return Order" | — | Search results appear listing the Return Order creation application |
| 8 | Click the "Create Return Order" application name from the search results | — | Return Order creation form opens in edit mode |
| 9 | In the "Sold-to Party:*" header field, enter the Customer ID | `{TD.customerId}` | Customer ID value is entered into the field |
| 10 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer name `{TD.customerName}` is auto-populated in the header; sales organization `{TD.salesOrganization}` and distribution channel `{TD.distributionChannel}` are auto-filled |
| 11 | In the "Reference Document" field, enter the original sales order number | `{TD.originalSalesOrder}` | Original sales order number is entered |
| 12 | Press Enter to confirm the reference document entry | — | SAP validates the sales order reference; order details may be retrieved |
| 13 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 14 | In the "Material" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 15 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDescription}` is auto-populated; unit of measure `{TD.unitOfMeasure}` is auto-filled |
| 16 | In the "Batch" field of the line item, enter the batch number | `{TD.batchNumber}` | Batch number is entered and validated for the pharmaceutical material |
| 17 | Press Enter to confirm the batch entry | — | Batch is validated; batch details are confirmed |
| 18 | In the "Quantity" field, enter the return quantity | `{TD.returnQuantity}` | Return quantity is populated in the line item |
| 19 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; line item pricing is calculated based on original order or pricing conditions |
| 20 | In the "Reason for Rejection" field, select or enter the return reason code | `{TD.returnReasonCode}` | Return reason code is populated in the line item |
| 21 | Press Enter to confirm the return reason entry | — | Return reason is confirmed; reason description may be displayed |
| 22 | In the "Quality Notification" field (header or item level), enter the Quality Notification number | `{TD.qualityNotification}` | Quality Notification number is entered into the field |
| 23 | Press Enter to confirm the Quality Notification entry | — | SAP validates the QM notification; notification details are confirmed; integration link is established |
| 24 | Verify the Plant field on the line item | `{TD.plant}` | Plant field shows the expected receiving plant value (auto-defaulted or manually confirmed) |
| 25 | Verify the Sales Organization and Distribution Channel fields in the header | `{TD.salesOrganization}`, `{TD.distributionChannel}` | Organizational fields show the expected values (auto-populated from customer master) |
| 26 | Verify the net value / credit amount field is populated | — | Credit amount `{TD.creditAmount}` is calculated and displayed in the header (quantity × unit price from original order or pricing) |
| 27 | Click the "Save" or "Create" button (primary submit action) in the toolbar | — | SAP begins processing the return order submission |
| 28 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Return Order number |
| 29 | Note the Return Order document number from the success message or the top-left header area | — | Return Order number is displayed (format is system-generated, typically 10-digit numeric) |
| 30 | Navigate back to the Return Order list or search for return orders | — | Return Order list is displayed |
| 31 | Search for the newly created Return Order using the number noted in step 29 | — | The created Return Order appears in the list with status "Created" or "Open" |
| 32 | Click the Return Order number to open the document | — | Return Order details are displayed; all entered data is correctly stored |
| 33 | Verify that a Credit Memo Request document has been initiated (if auto-triggered by configuration) | — | Credit Memo Request number `{TD.creditMemoRequestNumber}` is visible in the document flow or related documents section |
| 34 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 35 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 36 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Return Order number is generated by SAP and displayed in the confirmation message
- The Return Order is persisted in SAP with document type "Return Order" and status "Created" or "Open"
- All header data (Customer, Sales Organization, Distribution Channel, Reference Document, Quality Notification) is correctly stored
- All line item data (Material, Batch, Quantity, Return Reason, Plant) is correctly stored
- The Quality Notification link is established and visible in the return order document
- Credit processing is initiated: a Credit Memo Request is created automatically (document number is visible in document flow)
- The created Return Order appears in the Return Order list and can be viewed

---

### Post-conditions

- SAP Return Order document exists with the generated Return Order number
- Return Order status is "Created" / "Open"
- Customer, material, batch, quantity, return reason, and quality notification data are correctly recorded on the Return Order
- Credit Memo Request document is created with status "Open" / "In Process"
- Quality Notification remains linked to the Return Order for traceability
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
