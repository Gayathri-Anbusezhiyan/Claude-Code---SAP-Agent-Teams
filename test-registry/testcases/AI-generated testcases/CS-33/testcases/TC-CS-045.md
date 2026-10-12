# TC-CS-045: Attempt to Create Sales Order with Batch Expiration Date One Day Before Requested Delivery Date

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
| P1 | User Role | User has the role of Sales Order Processor with SAP authorization to create Sales Orders AND authorization object V_KONH_VKS to override batch determination |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrg}` |
| P4 | Master Data | Material `{TD.materialId}` is created, released, batch-managed (XCHPF = X), and configured for plant `{TD.plant}` |
| P5 | Configuration | FEFO batch determination strategy is configured for material `{TD.materialId}` at plant `{TD.plant}` |
| P6 | Master Data | Batch `{TD.batchMinusOneDay}` exists for material `{TD.materialId}` with expiration date ONE DAY BEFORE the requested delivery date (lower boundary condition - expired) |
| P7 | Configuration | Batch override reason code customizing table is configured with valid reason codes |
| P8 | Configuration | Sales organization `{TD.salesOrg}` is active and assigned to distribution channel `{TD.distributionChannel}` and division `{TD.division}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-33/CS-33-testdata.json` — Dataset ID: `TD-CS-033-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sold-To Party | `{TD.customerId}` | Customer account number — entered by the user | Valid |
| Material | `{TD.materialId}` | Batch-managed pharmaceutical material number — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Quantity to order — entered by the user | Valid |
| Requested Delivery Date | `{TD.requestedDeliveryDate}` | Delivery date — entered by the user | Valid |
| Sales Organization | `{TD.salesOrg}` | Sales organization code — verified in the header | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — verified in the header | Valid |
| Division | `{TD.division}` | Division code — verified in the header | Valid |
| Batch Minus One Day | `{TD.batchMinusOneDay}` | Batch with expiration date = delivery date - 1 day | Invalid (expired) |
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
| 19 | Click the "Save" button or trigger the batch determination event | — | SAP executes FEFO batch determination logic; system should NOT propose the batch with expiration date - 1 day (expired batch should be excluded) |
| 20 | Observe the "Batch" field on the line item | — | Batch field is auto-populated with a valid FEFO-proposed batch (NOT the expired batch - 1 day) |
| 21 | Manually clear or modify the "Batch" field and attempt to enter the expired batch number (expiration date - 1 day) | `{TD.batchMinusOneDay}` | Expired batch number is entered into the Batch field |
| 22 | Press Enter to confirm the batch override entry | — | SAP prompts for a reason code for the batch change; "Reason for Batch Change" dialog or field is displayed |
| 23 | In the "Reason for Batch Change" dialog or field, enter the reason code | `{TD.overrideReasonCode}` | Reason code is entered |
| 24 | Press Enter or click "OK" to confirm the reason code | — | SAP validates the batch expiration date against the requested delivery date; system detects that the batch expiration date is BEFORE the delivery date (lower boundary violation - expired by 1 day) |
| 25 | Observe the system response and any error messages | — | SAP displays an error or warning message indicating "Batch expiration date is before the requested delivery date" or "Batch is expired for this delivery date" or similar; batch selection is rejected |
| 26 | Attempt to proceed by clicking the "Save" or "Create" button (primary submit action) | — | SAP prevents Sales Order creation; error message is displayed stating the batch is invalid due to expiration date constraint (expiration date before delivery date = not acceptable) |
| 27 | Verify that no Sales Order number is generated | — | No confirmation message with a Sales Order number is displayed; Sales Order is NOT created |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- FEFO batch determination logic automatically excludes batches with expiration dates before the requested delivery date
- If the user manually attempts to override with an expired batch (expiration date - 1 day), SAP displays an error message indicating the batch is invalid
- The system prevents the creation of the Sales Order with the expired batch
- No Sales Order number is generated
- The lower boundary condition (expiration date before delivery date) is correctly validated and rejected
- SAP pharmaceutical compliance logic prevents expired product shipment risk

---

### Post-conditions

- No SAP Sales Order document is created with the expired batch
- The system state remains unchanged
- Error is logged for pharmaceutical compliance and quality assurance review
- Lower boundary condition behavior is validated
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
