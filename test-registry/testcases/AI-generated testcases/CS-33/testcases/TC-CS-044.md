# TC-CS-044: Create Sales Order with Batch Expiration Date Exactly Equal to Requested Delivery Date

**User Story:**          [CS-33] User Story SD-001
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Sales Order Creation with FEFO Batch Determination
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
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
| P6 | Master Data | Batch `{TD.batchEqualExpiration}` exists for material `{TD.materialId}` with expiration date EXACTLY EQUAL to the requested delivery date (same day boundary condition) |
| P7 | Configuration | Sales organization `{TD.salesOrg}` is active and assigned to distribution channel `{TD.distributionChannel}` and division `{TD.division}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-33/CS-33-testdata.json` — Dataset ID: `TD-CS-033-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sold-To Party | `{TD.customerId}` | Customer account number — entered by the user | Valid |
| Material | `{TD.materialId}` | Batch-managed pharmaceutical material number — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Quantity to order — entered by the user | Valid |
| Requested Delivery Date | `{TD.requestedDeliveryDateEqual}` | Delivery date equal to batch expiration date — entered by the user | Valid (boundary) |
| Sales Organization | `{TD.salesOrg}` | Sales organization code — verified in the header | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — verified in the header | Valid |
| Division | `{TD.division}` | Division code — verified in the header | Valid |
| Batch Equal Expiration | `{TD.batchEqualExpiration}` | Batch with expiration date equal to delivery date | Valid (boundary) |

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
| 12 | In the "Requested Delivery Date" header field, enter the delivery date (equal to batch expiration date) | `{TD.requestedDeliveryDateEqual}` | Delivery date is entered |
| 13 | Press Enter to confirm the delivery date entry | — | Delivery date is confirmed |
| 14 | In the "Items" section, click the "Add" or "+" button | — | A new empty line item row appears in the Items table |
| 15 | In the "Material" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 16 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is auto-populated; sales unit `{TD.salesUnit}` is auto-filled |
| 17 | In the "Order Quantity" field, enter the quantity | `{TD.orderQuantity}` | Quantity is populated in the line item |
| 18 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 19 | Click the "Save" button or trigger the batch determination event | — | SAP executes FEFO batch determination logic |
| 20 | Observe the "Batch" field on the line item and system response | — | System behavior depends on SAP configuration: either (a) batch `{TD.batchEqualExpiration}` is auto-populated (expiration date = delivery date is considered valid), OR (b) error message is displayed indicating batch expiration date must be AFTER delivery date (not equal) |
| 21 | If batch is auto-populated, verify the "Shelf Life Expiration Date" (VFDAT) is displayed alongside the batch | — | Expiration date `{TD.batchEqualExpirationDate}` is visible and equals the requested delivery date |
| 22 | If batch is auto-populated, click the "Save" or "Create" button (primary submit action) | — | SAP processes the Sales Order creation |
| 23 | If batch is auto-populated, observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Sales Order number (boundary condition is accepted) |
| 24 | If error is displayed, verify the error message content | — | Error message indicates batch expiration date must be after the delivery date; Sales Order is NOT created |
| 25 | If Sales Order is created, note the Sales Order number from the success message | — | Sales Order number is displayed (10-digit format) |
| 26 | If Sales Order is created, navigate back to the Sales Order list and search for the newly created Sales Order | — | The created Sales Order appears in the list with status "Open" or "In Process" |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System behavior depends on SAP FEFO configuration for boundary condition (expiration date = delivery date):
  - **Scenario A (Accepted):** Batch with expiration date equal to delivery date is accepted; Sales Order is created successfully; batch and expiration date are correctly stored
  - **Scenario B (Rejected):** System displays error indicating batch expiration date must be AFTER delivery date (not equal); Sales Order is NOT created
- The test verifies the boundary condition behavior for same-day expiration date and delivery date
- SAP pharmaceutical compliance logic is validated at the date boundary

---

### Post-conditions

- If accepted: SAP Sales Order document exists with the generated SO number; batch with equal expiration date is stored
- If rejected: No SAP Sales Order document is created; error is logged for compliance review
- Boundary condition behavior is documented for future reference
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

_[Record defect IDs, unexpected behaviours, or environment issues encountered during execution. Document whether the system accepts or rejects the boundary condition.]_

---
