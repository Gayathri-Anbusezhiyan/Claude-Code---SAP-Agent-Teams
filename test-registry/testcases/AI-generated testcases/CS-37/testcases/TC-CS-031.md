# TC-CS-031: Attempt to Create Return Order with Return Quantity Exceeding Original Order Quantity

**User Story:**          [CS-37] Process A Return Order For A Customer Complaint About A Defective Phar
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Return Order Processing for Customer Complaints
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Customer Service Representative with SAP authorization to create Sales Return Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrganization}` |
| P4 | Master Data | Material `{TD.materialId}` is created, released, and configured for sales organization `{TD.salesOrganization}` |
| P5 | Reference Data | Original sales order `{TD.originalSalesOrder}` exists with delivered quantity `{TD.originalOrderQuantity}`; customer and material match the return order data |
| P6 | Master Data | Return reason code `{TD.returnReasonCode}` is configured in SAP customizing |
| P7 | Boundary Test | Return quantity is set to exceed the original order delivered quantity (invalid boundary — over limit) |

---

### Test Data

**Dataset Reference:** `testdata/CS-37/CS-37-testdata.json` — Dataset ID: `TD-CS-037-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Valid customer account number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Valid pharmaceutical material number — entered by the user | Valid |
| Return Quantity | `{TD.excessReturnQuantity}` | Return quantity exceeding original order quantity (invalid boundary) — entered by the user | Invalid (Exceeds Limit) |
| Original Sales Order | `{TD.originalSalesOrder}` | Reference document number of the original sales order — entered by the user | Valid |
| Original Order Quantity | `{TD.originalOrderQuantity}` | Delivered quantity from the original sales order (for verification) | Valid |
| Return Reason Code | `{TD.returnReasonCode}` | Reason for rejection code — selected by the user | Valid |

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
| 10 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer name `{TD.customerName}` is auto-populated; sales organization and distribution channel are auto-filled |
| 11 | In the "Reference Document" field, enter the original sales order number | `{TD.originalSalesOrder}` | Original sales order number is entered |
| 12 | Press Enter to confirm the reference document entry | — | SAP validates the sales order reference; order details are retrieved; delivered quantity `{TD.originalOrderQuantity}` may be displayed |
| 13 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 14 | In the "Material" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 15 | Press Enter to confirm the Material entry | — | SAP validates the material; material description and unit of measure are auto-populated |
| 16 | In the "Quantity" field, enter the excess return quantity (exceeding original order quantity) | `{TD.excessReturnQuantity}` | Excess return quantity (greater than original delivered quantity) is entered in the line item |
| 17 | Press Enter to confirm the quantity entry | — | SAP displays a validation error or warning message indicating the return quantity exceeds the original delivered quantity; the message may read: "Return quantity exceeds delivered quantity" or "Quantity `{TD.excessReturnQuantity}` is greater than delivered quantity `{TD.originalOrderQuantity}`" |
| 18 | Observe the error or warning message | — | Error or warning message clearly states the quantity validation failure; system may prevent submission or display a warning that requires acknowledgment |
| 19 | Attempt to proceed by entering the return reason code in the "Reason for Rejection" field | `{TD.returnReasonCode}` | Return reason code may be entered, but validation error persists |
| 20 | Attempt to click the "Save" or "Create" button in the toolbar | — | System blocks submission due to excess quantity validation error; error message highlights the Quantity field; submission is prevented |
| 21 | Observe the final system response | — | Return Order is NOT created; error message persists; user is prompted to correct the return quantity to a value within the valid range (≤ original delivered quantity) |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays a validation error or warning message indicating the return quantity exceeds the original delivered quantity
- Return Order document is NOT created (or creation is blocked pending correction)
- Error message clearly communicates the boundary violation to the user
- System prevents submission until the return quantity is corrected to a valid value

---

### Post-conditions

- No Return Order document is created in SAP (or creation is blocked)
- No document number is generated
- No credit processing is initiated
- System state remains unchanged; no data is persisted

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
