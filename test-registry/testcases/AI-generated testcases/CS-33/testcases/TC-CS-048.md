# TC-CS-048: Verify FEFO-Determined Batch Flows Through from Sales Order to Delivery Document Without Re-Determination

**User Story:**          [CS-33] User Story SD-001
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Sales Order Creation with FEFO Batch Determination
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
| P1 | User Role | User has the role of Sales Order Processor with SAP authorization to create Sales Orders AND authorization to create Delivery documents |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrg}` |
| P4 | Master Data | Material `{TD.materialId}` is created, released, batch-managed (XCHPF = X), and configured for plant `{TD.plant}` |
| P5 | Configuration | FEFO batch determination strategy is configured for material `{TD.materialId}` at plant `{TD.plant}` |
| P6 | Master Data | At least one valid batch for material `{TD.materialId}` exists with available stock and expiration date after the requested delivery date |
| P7 | Configuration | Sales organization `{TD.salesOrg}` is active and assigned to distribution channel `{TD.distributionChannel}` and division `{TD.division}` |
| P8 | Configuration | Delivery creation is configured to inherit batch from Sales Order without re-determination |

---

### Test Data

**Dataset Reference:** `testdata/CS-33/CS-33-testdata.json` — Dataset ID: `TD-CS-033-INT-001`

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
| 21 | Note the determined batch number for later verification | `{TD.determinedBatch}` | Batch number is recorded |
| 22 | Verify the "Shelf Life Expiration Date" (VFDAT) is displayed alongside the batch | — | Expiration date `{TD.batchExpirationDate}` is visible and is a date after the requested delivery date |
| 23 | Click the "Save" or "Create" button (primary submit action) | — | SAP processes the Sales Order creation |
| 24 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Sales Order number |
| 25 | Note the Sales Order number from the success message or the top-left header area | `{TD.salesOrderNumber}` | Sales Order number is displayed (10-digit format) and recorded for next step |
| 26 | Navigate back to the SAP Fiori Launchpad home page | — | Fiori home page is displayed |
| 27 | Click the search icon (top-right shell bar) and type "Create Outbound Delivery" or "Create Delivery" | — | Search results appear listing the delivery creation application |
| 28 | Click "Create Outbound Delivery" or "Create Delivery" from the search results | — | Delivery creation application opens |
| 29 | In the delivery creation screen, select delivery type "Outbound Delivery" or equivalent | — | Delivery type is selected |
| 30 | In the "Shipping Point" or "Delivery" field, enter the shipping point or select from dropdown | `{TD.shippingPoint}` | Shipping point is entered or selected |
| 31 | In the "Sales Order" or "Reference Document" field, enter the Sales Order number noted in step 25 | `{TD.salesOrderNumber}` | Sales Order number is entered as reference |
| 32 | Press Enter or click "Add" to load the Sales Order line items into the delivery | — | Sales Order line items are loaded into the delivery document; material, quantity, and BATCH from the Sales Order are copied to the delivery |
| 33 | Verify the "Batch" field on the delivery line item | — | Batch field displays the SAME batch number `{TD.determinedBatch}` that was determined in the Sales Order (NO re-determination has occurred) |
| 34 | Verify the "Shelf Life Expiration Date" (VFDAT) on the delivery line item matches the Sales Order batch expiration date | — | Expiration date `{TD.batchExpirationDate}` is displayed and matches the Sales Order batch expiration date exactly |
| 35 | Verify the delivery quantity matches the Sales Order quantity | — | Delivery quantity equals Sales Order quantity; no changes to quantity or batch |
| 36 | Click the "Save" or "Post" button to create the delivery document | — | SAP processes the delivery document creation |
| 37 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Delivery Document number |
| 38 | Note the Delivery Document number from the success message | `{TD.deliveryDocumentNumber}` | Delivery Document number is displayed (10-digit format) and recorded |
| 39 | Navigate back to the delivery list or search view | — | Delivery list is displayed |
| 40 | Search for the newly created Delivery Document using the number noted in step 38 | — | The created Delivery Document appears in the list |
| 41 | Open the Delivery Document and verify the batch on the line item | — | Batch number `{TD.determinedBatch}` matches the Sales Order batch exactly; expiration date matches; NO re-determination has occurred; batch has flowed through from SO to Delivery without change |
| 42 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 43 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 44 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Sales Order number is generated by SAP with FEFO-determined batch
- A unique Delivery Document number is generated by SAP
- The FEFO-determined batch from the Sales Order is carried forward to the Delivery Document WITHOUT re-determination
- The batch number on the Delivery line item matches the Sales Order batch number exactly
- The batch expiration date on the Delivery matches the Sales Order batch expiration date exactly
- No batch re-determination logic is triggered during delivery creation
- Integration flow from Sales Order to Delivery preserves batch integrity and pharmaceutical compliance
- Critical pharmaceutical requirement (AC-6) is validated: determined batch flows through to delivery without re-determination

---

### Post-conditions

- SAP Sales Order document exists with the generated SO number and FEFO-determined batch
- SAP Delivery Document exists with the generated Delivery number and the SAME batch as the Sales Order
- Batch integrity is maintained across the SO-to-Delivery integration flow
- No re-determination has occurred; batch propagation is correct
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

_[Record defect IDs, unexpected behaviours, or environment issues encountered during execution. Document any discrepancies between SO batch and Delivery batch.]_

---
