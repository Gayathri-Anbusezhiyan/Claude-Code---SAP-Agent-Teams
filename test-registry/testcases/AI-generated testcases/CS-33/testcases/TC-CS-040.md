# TC-CS-040: Attempt to Submit Sales Order with Sold-To Party Field Empty

**User Story:**          [CS-33] User Story SD-001
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Sales Order Creation with FEFO Batch Determination
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Sales Order Processor with SAP authorization to create Sales Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` is created, released, batch-managed (XCHPF = X), and configured for plant `{TD.plant}` |
| P4 | Configuration | FEFO batch determination strategy is configured for material `{TD.materialId}` at plant `{TD.plant}` |
| P5 | Master Data | At least one valid batch for material `{TD.materialId}` exists with available stock |
| P6 | Configuration | Sales organization, distribution channel, and division are configured in the system |

---

### Test Data

**Dataset Reference:** `testdata/CS-33/CS-33-testdata.json` — Dataset ID: `TD-CS-033-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Sold-To Party | `{TD.emptyValue}` | Customer account number — intentionally left blank | Invalid (empty) |
| Material | `{TD.materialId}` | Batch-managed pharmaceutical material number — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Quantity to order — entered by the user | Valid |
| Requested Delivery Date | `{TD.requestedDeliveryDate}` | Delivery date — entered by the user | Valid |

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
| 9 | Leave the "Sold-To Party:*" header field empty (do not enter a customer ID) | `{TD.emptyValue}` | Sold-To Party field remains blank |
| 10 | In the "Requested Delivery Date" header field, enter the delivery date | `{TD.requestedDeliveryDate}` | Delivery date is entered |
| 11 | Press Enter to confirm the delivery date entry | — | Delivery date is confirmed |
| 12 | In the "Items" section, click the "Add" or "+" button | — | A new empty line item row appears in the Items table |
| 13 | In the "Material" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 14 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is auto-populated; sales unit `{TD.salesUnit}` is auto-filled |
| 15 | In the "Order Quantity" field, enter the quantity | `{TD.orderQuantity}` | Quantity is populated in the line item |
| 16 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 17 | Attempt to click the "Save" or "Create" button (primary submit action) | — | SAP detects the missing mandatory Sold-To Party field |
| 18 | Observe the system response and any error messages | — | SAP highlights the "Sold-To Party" field as mandatory; error message is displayed indicating "Sold-To Party is a required field" or "Please enter a Sold-To Party"; submission is blocked |
| 19 | Verify that no Sales Order number is generated | — | No confirmation message with a Sales Order number is displayed; Sales Order is NOT created |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP highlights the "Sold-To Party" field as mandatory and prevents submission
- An error message is displayed clearly indicating that the Sold-To Party field is required
- No Sales Order number is generated
- The user is prompted to fill in the missing Sold-To Party field before proceeding
- The system enforces mandatory field validation and ensures data integrity

---

### Post-conditions

- No SAP Sales Order document is created
- The system state remains unchanged
- Mandatory field validation is correctly enforced
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
