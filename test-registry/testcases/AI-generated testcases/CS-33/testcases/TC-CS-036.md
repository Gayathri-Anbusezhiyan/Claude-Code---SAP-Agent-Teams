# TC-CS-036: Attempt to Create Sales Order for Material with No Available Batches

**User Story:**          [CS-33] User Story SD-001
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Sales Order Creation with FEFO Batch Determination
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
| P1 | User Role | User has the role of Sales Order Processor with SAP authorization to create Sales Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrg}` |
| P4 | Master Data | Material `{TD.materialNoBatches}` is created, released, batch-managed (XCHPF = X), and configured for plant `{TD.plant}` |
| P5 | Configuration | FEFO batch determination strategy is configured for material `{TD.materialNoBatches}` at plant `{TD.plant}` |
| P6 | Master Data | Material `{TD.materialNoBatches}` has NO available batches with stock; all batches are either expired or have zero available quantity |
| P7 | Configuration | Sales organization `{TD.salesOrg}` is active and assigned to distribution channel `{TD.distributionChannel}` and division `{TD.division}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-33/CS-33-testdata.json` — Dataset ID: `TD-CS-033-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sold-To Party | `{TD.customerId}` | Customer account number — entered by the user | Valid |
| Material | `{TD.materialNoBatches}` | Batch-managed material with NO available batches — entered by the user | Invalid (no stock) |
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
| 15 | In the "Material" field of the new line item, enter the Material ID (material with no available batches) | `{TD.materialNoBatches}` | Material ID is entered into the field |
| 16 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialNoBatchesDesc}` is auto-populated; sales unit `{TD.salesUnit}` is auto-filled |
| 17 | In the "Order Quantity" field, enter the quantity | `{TD.orderQuantity}` | Quantity is populated in the line item |
| 18 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 19 | Click the "Save" button or trigger the batch determination event | — | SAP executes FEFO batch determination logic but finds no available batches with valid stock |
| 20 | Observe the system response and any error messages | — | SAP displays an error or warning message indicating that no available batches exist for the material; message states "No batch available" or "Insufficient stock" or similar; batch field remains empty or flagged as incomplete |
| 21 | Attempt to proceed by clicking the "Save" or "Create" button (primary submit action) | — | SAP prevents Sales Order creation; error message is displayed stating batch determination is required but no batches are available |
| 22 | Verify that no Sales Order number is generated | — | No confirmation message with a Sales Order number is displayed; Sales Order is NOT created |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays an error or warning message indicating that no available batches exist for the material or that insufficient stock is available
- The system prevents the creation of the Sales Order due to the lack of available batches
- No Sales Order number is generated
- The error message clearly communicates the stock availability issue to the user
- The user is guided to either select a different material or wait for stock replenishment

---

### Post-conditions

- No SAP Sales Order document is created
- The system state remains unchanged
- Error is logged for inventory management and procurement action
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
