# TC-CS-034: Manually Override FEFO-Proposed Batch with Valid Authorization and Reason Code

**User Story:**          [CS-33] User Story SD-001
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Sales Order Creation with FEFO Batch Determination
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Sales Order Processor with SAP authorization to create Sales Orders AND authorization object V_KONH_VKS to override batch determination |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrg}` |
| P4 | Master Data | Material `{TD.materialId}` is created, released, batch-managed (XCHPF = X), and configured for plant `{TD.plant}` |
| P5 | Configuration | FEFO batch determination strategy is configured for material `{TD.materialId}` at plant `{TD.plant}` |
| P6 | Master Data | At least two valid batches exist for material `{TD.materialId}` with available stock and expiration dates after the requested delivery date |
| P7 | Configuration | Batch override reason code customizing table is configured with valid reason codes |
| P8 | Configuration | Sales organization `{TD.salesOrg}` is active and assigned to distribution channel `{TD.distributionChannel}` and division `{TD.division}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-33/CS-33-testdata.json` — Dataset ID: `TD-CS-033-AP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sold-To Party | `{TD.customerId}` | Customer account number — entered by the user | Valid |
| Material | `{TD.materialId}` | Batch-managed pharmaceutical material number — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Quantity to order — entered by the user | Valid |
| Requested Delivery Date | `{TD.requestedDeliveryDate}` | Delivery date — entered by the user | Valid |
| Sales Organization | `{TD.salesOrg}` | Sales organization code — verified in the header | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — verified in the header | Valid |
| Division | `{TD.division}` | Division code — verified in the header | Valid |
| Override Batch | `{TD.overrideBatch}` | Alternative batch number — manually selected by user | Valid |
| Override Reason Code | `{TD.overrideReasonCode}` | Reason code for batch change — entered by user | Valid |

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
| 20 | Observe the "Batch" field on the line item | — | Batch field is auto-populated with the FEFO-proposed batch number |
| 21 | Manually clear or modify the "Batch" field and enter the override batch number | `{TD.overrideBatch}` | Override batch number is entered into the Batch field |
| 22 | Press Enter to confirm the batch override entry | — | SAP prompts for a reason code for the batch change |
| 23 | In the "Reason for Batch Change" dialog or field, enter the reason code | `{TD.overrideReasonCode}` | Reason code is entered |
| 24 | Press Enter or click "OK" to confirm the reason code | — | SAP validates the reason code; batch override is accepted; expiration date of the override batch is displayed |
| 25 | Verify the "Shelf Life Expiration Date" (VFDAT) is displayed for the override batch | — | Expiration date `{TD.overrideBatchExpirationDate}` is visible and is a date after the requested delivery date |
| 26 | Click the "Save" or "Create" button (primary submit action) | — | SAP processes the Sales Order creation with the manually overridden batch |
| 27 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Sales Order number |
| 28 | Note the Sales Order number from the success message or the top-left header area | — | Sales Order number is displayed (10-digit format) |
| 29 | Navigate back to the Sales Order list or search view | — | Sales Order list is displayed |
| 30 | Search for the newly created Sales Order using the number noted in step 28 | — | The created Sales Order appears in the list with status "Open" or "In Process" |
| 31 | Open the Sales Order and verify the batch on the line item matches the manually overridden batch | `{TD.overrideBatch}` | Batch number matches the override batch; expiration date and reason code are correctly stored |
| 32 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 33 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 34 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Sales Order number is generated by SAP and displayed in the confirmation message
- The Sales Order is persisted in SAP with document type "Sales Order" and status "Open"
- The batch field on the line item contains the user's manually overridden batch (not the FEFO-proposed batch)
- The reason code for the batch change is recorded and stored with the Sales Order
- The override batch's expiration date is after the requested delivery date (valid batch)
- The manual override is accepted by SAP due to the user having the required authorization (V_KONH_VKS)
- The created Sales Order appears in the Sales Order list with the override batch intact

---

### Post-conditions

- SAP Sales Order document exists with the generated SO number
- SO status is "Open" or "In Process"
- Customer, material, quantity, requested delivery date, and manually overridden batch data are correctly recorded on the SO
- Batch override reason code is stored for audit trail purposes
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
