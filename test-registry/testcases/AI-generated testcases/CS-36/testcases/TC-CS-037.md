# TC-CS-037: Attempt to Create Sales Order for Material-Batch with Active SD Block

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
| P1 | User Role | User has the role of Sales Representative with SAP authorization to create sales orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists in SAP, is active, and is configured as batch-managed (MARC-XCHPF = 'X') |
| P4 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNumber}` with an ACTIVE Sales & Distribution block |
| P5 | Master Data | Customer `{TD.customerId}` exists, is active, and is assigned to sales organization `{TD.salesOrg}` |
| P6 | Configuration | Sales organization `{TD.salesOrg}` and distribution channel `{TD.distributionChannel}` are configured and active |

---

### Test Data

**Dataset Reference:** `testdata/CS-36/CS-36-testdata.json` — Dataset ID: `TD-CS-036-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Batch-managed material with blocked batch — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Batch with ACTIVE SD block — entered by the user | Valid (but blocked) |
| Customer ID | `{TD.customerId}` | Sold-to party account number — entered by the user | Valid |
| Sales Org | `{TD.salesOrg}` | Sales organization code — entered by the user | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — entered by the user | Valid |
| Order Quantity | `{TD.quantity}` | Requested order quantity — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Sales Order" | — | Search results appear listing sales order creation applications |
| 8 | Click "Create Sales Order" from the search results | — | Sales order creation form opens in edit mode |
| 9 | In the Customer field, enter the Customer ID | `{TD.customerId}` | Customer ID is entered into the field |
| 10 | Press Enter to confirm the Customer entry | — | SAP validates the customer; customer name and details are auto-populated |
| 11 | Verify that Sales Organization and Distribution Channel fields are populated | `{TD.salesOrg}`, `{TD.distributionChannel}` | Sales organizational fields show the expected values |
| 12 | In the Items section, click the "Add Item" or "Create" button | — | A new empty line item row appears in the Items table |
| 13 | In the Material field of the new line item, enter the Material Number | `{TD.materialNumber}` | Material Number is entered into the field |
| 14 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDescription}` is auto-populated |
| 15 | In the Batch field of the line item, enter the Batch Number | `{TD.batchNumber}` | Batch Number is entered into the field |
| 16 | Press Enter to confirm the Batch entry | — | SAP validates the batch and checks for SD block status |
| 17 | Observe the system response to the blocked batch entry | — | SAP displays an error or warning message: "Batch `{TD.batchNumber}` for material `{TD.materialNumber}` is blocked for sales and distribution. Sales order creation is not permitted." |
| 18 | In the Order Quantity field, attempt to enter the quantity | `{TD.quantity}` | Quantity field may be disabled or entry is blocked |
| 19 | Attempt to save or submit the sales order | — | SAP prevents the save/submit action; error message is displayed |
| 20 | Verify that the sales order is NOT created | — | Sales order document is not saved; no sales order number is generated |
| 21 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 22 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 23 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP prevents the creation of a sales order for the material-batch combination with an active SD block
- A clear error message is displayed indicating that the batch is blocked for sales and distribution
- No sales order number is generated
- The user is informed that the selected batch cannot be used in sales transactions
- System prevents submission or saving of the sales order

---

### Post-conditions

- No sales order document exists for the material-batch combination attempted in this test case
- Batch `{TD.batchNumber}` remains blocked for sales and distribution
- SD block enforcement is validated and functioning correctly
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
