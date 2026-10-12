# TC-CS-033: Create Sales Order with FEFO Batch Determination for Pharmaceutical Material

**User Story:**          [CS-33] User Story SD-001
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Sales Order Creation with FEFO Batch Determination
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
| P1 | User Role | User has the role of Sales Order Processor with SAP authorization to create Sales Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrg}` |
| P4 | Master Data | Material `{TD.materialId}` is created, released, batch-managed (XCHPF = X), and configured for plant `{TD.plant}` |
| P5 | Configuration | FEFO batch determination strategy is configured for material `{TD.materialId}` at plant `{TD.plant}` |
| P6 | Master Data | At least one valid batch for material `{TD.materialId}` exists with available stock and expiration date after the requested delivery date |
| P7 | Configuration | Sales organization `{TD.salesOrg}` is active and assigned to distribution channel `{TD.distributionChannel}` and division `{TD.division}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-33/CS-33-testdata.json` — Dataset ID: `TD-CS-033-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sold-To Party | `{TD.customerId}` | Customer account number — entered by the user | Valid |
| Material | `{TD.materialId}` | Batch-managed pharmaceutical material number — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Quantity to order — entered by the user | Valid |
| Requested Delivery Date | `{TD.requestedDeliveryDate}` | Delivery date — entered by the user | Valid |
| Sales Organization | `{TD.salesOrg}` | Sales organization code — verified in the header | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — verified in the header | Valid |
| Division | `{TD.division}` | Division code — verified in the header | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Sales Order" | — | Search results appear listing the "Create Sales Order" application |
| 8 | Click "Create Sales Order" from the search results | — | Create Sales Order application opens |
| 9 | In the "Sold-To Party:*" header field, enter the Customer ID | `{TD.customerId}` | Customer ID value is entered into the field |
| 10 | Press Enter to confirm the Sold-To Party entry | — | SAP validates the customer; customer name `{TD.customerName}` is auto-populated in the header |
| 11 | Verify that Sales Organization, Distribution Channel, and Division fields are populated | `{TD.salesOrg}`, `{TD.distributionChannel}`, `{TD.division}` | Organizational fields show the expected values (auto-defaulted from user profile) |
| 12 | In the "Requested Delivery Date" header field, enter the delivery date | `{TD.requestedDeliveryDate}` | Delivery date is entered |
| 13 | Press Enter to confirm the delivery date entry | — | Delivery date is confirmed |
| 14 | In the "Items" section, click the "Add" or "+" button | — | A new empty line item row appears in the Items table |
| 15 | In the "Material" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 16 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is auto-populated; sales unit `{TD.salesUnit}` is auto-filled |
| 17 | In the "Order Quantity" field, enter the quantity | `{TD.orderQuantity}` | Quantity is populated in the line item |
| 18 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 19 | Click the "Save" button or trigger the batch determination event | — | SAP executes FEFO batch determination logic |
| 20 | Observe the "Batch" field on the line item | — | Batch field is auto-populated with the batch number `{TD.determinedBatch}` (batch with earliest expiration date meeting FEFO criteria) |
| 21 | Verify the "Shelf Life Expiration Date" (VFDAT) is displayed alongside the batch | — | Expiration date `{TD.batchExpirationDate}` is visible and is a date after the requested delivery date |
| 22 | Verify the line item displays Available Quantity for the determined batch | — | Available quantity is shown and is greater than or equal to the order quantity |
| 23 | Click the "Save" or "Create" button (primary submit action) | — | SAP processes the Sales Order creation |
| 24 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Sales Order number |
| 25 | Note the Sales Order number from the success message or the top-left header area | — | Sales Order number is displayed (10-digit format) |
| 26 | Navigate back to the Sales Order list or search view | — | Sales Order list is displayed |
| 27 | Search for the newly created Sales Order using the number noted in step 25 | — | The created Sales Order appears in the list with status "Open" or "In Process" |
| 28 | Open the Sales Order and verify the batch on the line item matches the FEFO-determined batch | `{TD.determinedBatch}` | Batch number matches; expiration date is correctly stored |
| 29 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 30 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 31 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Sales Order number is generated by SAP and displayed in the confirmation message
- The Sales Order is persisted in SAP with document type "Sales Order" and status "Open"
- The FEFO batch determination logic has automatically selected the batch with the earliest expiration date that is valid for the requested delivery date
- The determined batch number and its expiration date are correctly stored on the Sales Order line item
- The expiration date is after the requested delivery date (batch is valid for shipment)
- The created Sales Order appears in the Sales Order list and can be viewed with batch details intact

---

### Post-conditions

- SAP Sales Order document exists with the generated SO number
- SO status is "Open" or "In Process"
- Customer, material, quantity, requested delivery date, and FEFO-determined batch data are correctly recorded on the SO
- Batch expiration date is stored and visible on the line item
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
