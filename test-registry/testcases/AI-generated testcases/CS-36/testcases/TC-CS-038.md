# TC-CS-038: Attempt to Process Delivery for Blocked Batch

**User Story:**          [CS-36] Place An Automatic Sales & Distribution Block On A Recalled Batch
**Epic:**                N/A — no epic assigned
**Module:**              Quality Management + Sales & Distribution Integration (QM-SD)
**Feature:**             Batch Recall with Sales & Distribution Block Placement
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
| P1 | User Role | User has the role of Warehouse Clerk or Shipping Specialist with SAP authorization to create and process deliveries |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists in SAP, is active, and is configured as batch-managed (MARC-XCHPF = 'X') |
| P4 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNumber}` with an ACTIVE Sales & Distribution block |
| P5 | Master Data | Customer `{TD.customerId}` exists and is active |
| P6 | Configuration | Shipping point `{TD.shippingPoint}` and plant `{TD.plant}` are configured and active |

---

### Test Data

**Dataset Reference:** `testdata/CS-36/CS-36-testdata.json` — Dataset ID: `TD-CS-036-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Batch-managed material with blocked batch — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Batch with ACTIVE SD block — entered by the user | Valid (but blocked) |
| Customer ID | `{TD.customerId}` | Ship-to party account number — entered by the user | Valid |
| Shipping Point | `{TD.shippingPoint}` | Shipping point code — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code for stock location — entered by the user | Valid |
| Delivery Quantity | `{TD.quantity}` | Requested delivery quantity — entered by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up or Guided Tour dialog appears, dismiss it | — | Pop-up is dismissed; Fiori home page is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Create Outbound Delivery" | — | Search results appear listing delivery creation applications |
| 8 | Click "Create Outbound Delivery" from the search results | — | Outbound delivery creation form opens in edit mode |
| 9 | In the Customer field, enter the Customer ID | `{TD.customerId}` | Customer ID is entered into the field |
| 10 | Press Enter to confirm the Customer entry | — | SAP validates the customer; customer details are auto-populated |
| 11 | In the Shipping Point field, enter the Shipping Point code | `{TD.shippingPoint}` | Shipping Point code is entered |
| 12 | Press Enter to confirm the Shipping Point entry | — | Shipping point is validated and set |
| 13 | In the Items section, click the "Add Item" or "Create" button | — | A new empty line item row appears in the Items table |
| 14 | In the Material field of the new line item, enter the Material Number | `{TD.materialNumber}` | Material Number is entered into the field |
| 15 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDescription}` is auto-populated |
| 16 | In the Batch field of the line item, enter the Batch Number | `{TD.batchNumber}` | Batch Number is entered into the field |
| 17 | Press Enter to confirm the Batch entry | — | SAP validates the batch and checks for SD block status |
| 18 | Observe the system response to the blocked batch entry | — | SAP displays an error or warning message: "Batch `{TD.batchNumber}` for material `{TD.materialNumber}` is blocked for sales and distribution. Delivery creation is not permitted." |
| 19 | In the Delivery Quantity field, attempt to enter the quantity | `{TD.quantity}` | Quantity field may be disabled or entry is blocked |
| 20 | In the Plant field, enter the Plant code | `{TD.plant}` | Plant code is entered |
| 21 | Attempt to save or post the delivery | — | SAP prevents the save/post action; error message is displayed |
| 22 | Verify that the delivery document is NOT created | — | Delivery document is not saved; no delivery number is generated |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP prevents the creation and processing of an outbound delivery for the material-batch combination with an active SD block
- A clear error message is displayed indicating that the batch is blocked for sales and distribution
- No delivery document number is generated
- The user is informed that the selected batch cannot be used in delivery transactions
- System prevents submission or posting of the delivery

---

### Post-conditions

- No delivery document exists for the material-batch combination attempted in this test case
- Batch `{TD.batchNumber}` remains blocked for sales and distribution
- SD block enforcement in delivery transactions is validated and functioning correctly
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
