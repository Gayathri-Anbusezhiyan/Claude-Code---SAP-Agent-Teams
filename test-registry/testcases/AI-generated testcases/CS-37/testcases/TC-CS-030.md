# TC-CS-030: Create Return Order with Return Quantity Matching Original Order Quantity (Maximum Boundary)

**User Story:**          [CS-37] Process A Return Order For A Customer Complaint About A Defective Phar
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Return Order Processing for Customer Complaints
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
| P1 | User Role | User has the role of Customer Service Representative with SAP authorization to create Sales Return Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrganization}` |
| P4 | Master Data | Material `{TD.materialId}` is created, released, and configured for sales organization `{TD.salesOrganization}` |
| P5 | Reference Data | Original sales order `{TD.originalSalesOrder}` exists with delivered quantity `{TD.originalOrderQuantity}`; customer and material match the return order data |
| P6 | Master Data | Return reason code `{TD.returnReasonCode}` is configured in SAP customizing |
| P7 | Boundary Test | Return quantity is set to match the original order delivered quantity (maximum valid boundary) |

---

### Test Data

**Dataset Reference:** `testdata/CS-37/CS-37-testdata.json` — Dataset ID: `TD-CS-037-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Valid customer account number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Valid pharmaceutical material number — entered by the user | Valid |
| Return Quantity | `{TD.maxReturnQuantity}` | Maximum valid return quantity (matches original order quantity) — entered by the user | Valid (Boundary - Upper) |
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
| 16 | In the "Quantity" field, enter the maximum return quantity (matching original order quantity) | `{TD.maxReturnQuantity}` | Maximum return quantity (equal to original delivered quantity) is populated in the line item |
| 17 | Press Enter to confirm the quantity entry | — | Quantity is accepted; SAP calculates credit amount based on original order quantity × unit price; no validation error is displayed |
| 18 | Observe that the system accepts the boundary value without error or warning | — | No error or warning message; system allows return quantity equal to original delivered quantity |
| 19 | In the "Reason for Rejection" field, enter the return reason code | `{TD.returnReasonCode}` | Return reason code is entered |
| 20 | Press Enter to confirm the return reason entry | — | Return reason is confirmed |
| 21 | Verify the net value / credit amount field is populated correctly | — | Credit amount `{TD.creditAmountMax}` is calculated correctly for the full original order quantity |
| 22 | Click the "Save" or "Create" button in the toolbar | — | SAP begins processing the return order submission |
| 23 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Return Order number |
| 24 | Note the Return Order document number from the success message | — | Return Order number is displayed |
| 25 | Navigate back to the Return Order list | — | Return Order list is displayed |
| 26 | Search for the newly created Return Order | — | The created Return Order appears in the list with status "Created" or "Open"; quantity matches original order quantity |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Return Order is successfully created with return quantity equal to the original delivered quantity (maximum valid boundary)
- SAP accepts the boundary value without validation errors or warnings
- Credit amount is correctly calculated for the full original order quantity
- Return Order document is persisted with status "Created" / "Open"
- Return Order appears in the list with correct quantity

---

### Post-conditions

- SAP Return Order document exists with the generated Return Order number
- Return Order status is "Created" / "Open"
- Return quantity is recorded as equal to original delivered quantity
- Credit amount is correctly calculated for maximum quantity
- No application-level errors or warnings

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
