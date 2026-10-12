# TC-CS-095: Create release orders against contract within target quantity limit and verify cumulative tracking updates

**User Story:**          [CS-27] Maintain A Purchasing Contract (Outline Agreement) With Negotiated Pri
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchasing Contract (Outline Agreement) — Release Order Tracking
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create purchase orders and contracts (M_EINK_EKO, M_BANF_BSA) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Purchasing Contract | A valid purchasing contract exists with contract number `{TD.contractNumber}`, target quantity `{TD.contractTargetQuantity}`, and validity period not expired |
| P4 | Master Data | Supplier `{TD.validVendorId}` and material `{TD.validMaterialId}` are configured in the contract and source list |
| P5 | Configuration | Contract is in active status (not expired, not fully released) and available for release order creation |

---

### Test Data

**Dataset Reference:** `testdata/CS-27/CS-27-testdata.json` — Dataset ID: `TD-CS-027-HP-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Contract Number | `{TD.contractNumber}` | Existing contract number (from TC-CS-093 or pre-created) — entered by the user | Valid |
| Release Order Quantity 1 | `{TD.releaseQuantity1}` | Quantity for first release order (less than contract target quantity) — entered by the user | Valid |
| Release Order Quantity 2 | `{TD.releaseQuantity2}` | Quantity for second release order (less than remaining balance) — entered by the user | Valid |
| Contract Target Quantity | `{TD.contractTargetQuantity}` | Total target quantity of the contract — verified in the contract header | Valid |
| Supplier ID | `{TD.validVendorId}` | Vendor from contract — verified in release order | Valid |
| Material ID | `{TD.validMaterialId}` | Material from contract — verified in release order | Valid |
| Plant | `{TD.plant}` | Plant from contract — entered by the user in release order | Valid |
| Delivery Date | `{TD.deliveryDate}` | Delivery date for release order — entered by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Manage Purchase Contracts" | — | Search results appear listing the "Manage Purchase Contracts" application |
| 8 | Click "Manage Purchase Contracts" from the search results | — | "Manage Purchase Contracts" application opens displaying the contract list view |
| 9 | In the contract search filter, enter the contract number | `{TD.contractNumber}` | Contract number is entered in the filter field |
| 10 | Press Enter to search or click "Go" | — | The contract list is filtered to show the specified contract |
| 11 | Click on the contract number in the list to open the contract | — | Contract detail view opens displaying header data, target quantity, and cumulative released quantity (initially 0 or low) |
| 12 | Note the "Remaining Target Quantity" value displayed in the header | — | Remaining target quantity is displayed (initially equal to target quantity if no releases exist) |
| 13 | Navigate to the search icon again and type "Manage Purchase Orders" | — | Search results appear listing the "Manage Purchase Orders" application |
| 14 | Click "Manage Purchase Orders" from the search results | — | "Manage Purchase Orders" application opens |
| 15 | Click the "Create PO" button in the application toolbar | — | New purchase order creation form opens in edit mode |
| 16 | In the "Supplier:*" header field, enter the Supplier ID | `{TD.validVendorId}` | Supplier ID value is entered into the field |
| 17 | Press Enter to confirm the Supplier entry | — | SAP validates the supplier; Supplier name `{TD.supplierName}` is auto-populated |
| 18 | In the "Contract" header field, enter the contract number | `{TD.contractNumber}` | Contract number is entered and linked to the purchase order |
| 19 | Press Enter to confirm the Contract entry | — | SAP validates the contract; contract details (validity dates, target quantity) are referenced |
| 20 | In the "Items" section "Material" field, enter the Material ID | `{TD.validMaterialId}` | Material ID is entered (must match contract material) |
| 21 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` and unit of measure `{TD.uom}` are auto-populated |
| 22 | In the "Order Quantity" field, enter the first release order quantity | `{TD.releaseQuantity1}` | Quantity is populated (must be less than contract remaining target quantity) |
| 23 | In the "Plant" field, enter the Plant code | `{TD.plant}` | Plant code is entered |
| 24 | Press Enter to confirm the Plant entry | — | Plant is accepted |
| 25 | In the "Delivery Date" field, enter the delivery date | `{TD.deliveryDate}` | Delivery date is entered |
| 26 | Verify that the "Net Order Price" is auto-populated from the contract pricing | `{TD.netPrice}` | Net order price is auto-filled based on contract pricing tier applicable to the order quantity |
| 27 | Click the "Order" button in the toolbar to submit the first release order | — | SAP begins processing the purchase order submission |
| 28 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated purchase order number |
| 29 | Note the purchase order number from the success message | — | Purchase order number is displayed (format is system-generated) |
| 30 | Navigate back to the search icon and type "Manage Purchase Contracts" | — | Search results appear listing the "Manage Purchase Contracts" application |
| 31 | Click "Manage Purchase Contracts" from the search results | — | "Manage Purchase Contracts" application opens |
| 32 | Search for the contract using the contract number noted earlier | `{TD.contractNumber}` | The contract is displayed in the list |
| 33 | Click on the contract number to open the contract detail view | — | Contract detail view opens |
| 34 | Verify that the "Cumulative Released Quantity" field is updated | — | Cumulative released quantity shows the quantity from the first release order (`{TD.releaseQuantity1}`) |
| 35 | Verify that the "Remaining Target Quantity" field is updated | — | Remaining target quantity is reduced by the first release order quantity (Remaining = Target - `{TD.releaseQuantity1}`) |
| 36 | Navigate back to "Manage Purchase Orders" application using the search icon | — | "Manage Purchase Orders" application opens |
| 37 | Click the "Create PO" button to create a second release order | — | New purchase order creation form opens |
| 38 | In the "Supplier:*" header field, enter the Supplier ID | `{TD.validVendorId}` | Supplier ID is entered |
| 39 | Press Enter to confirm the Supplier entry | — | Supplier name is auto-populated |
| 40 | In the "Contract" header field, enter the contract number | `{TD.contractNumber}` | Contract number is entered |
| 41 | Press Enter to confirm the Contract entry | — | Contract is validated and linked |
| 42 | In the "Items" section "Material" field, enter the Material ID | `{TD.validMaterialId}` | Material ID is entered |
| 43 | Press Enter to confirm the Material entry | — | Material description and unit of measure are auto-populated |
| 44 | In the "Order Quantity" field, enter the second release order quantity | `{TD.releaseQuantity2}` | Quantity is populated (must be less than remaining contract balance) |
| 45 | In the "Plant" field, enter the Plant code | `{TD.plant}` | Plant code is entered |
| 46 | Press Enter to confirm the Plant entry | — | Plant is accepted |
| 47 | In the "Delivery Date" field, enter the delivery date | `{TD.deliveryDate}` | Delivery date is entered |
| 48 | Click the "Order" button to submit the second release order | — | SAP processes the purchase order submission |
| 49 | Observe the on-screen confirmation response | — | A success message is displayed with the second purchase order number |
| 50 | Note the second purchase order number | — | Second purchase order number is displayed |
| 51 | Navigate back to "Manage Purchase Contracts" application | — | "Manage Purchase Contracts" application opens |
| 52 | Search for the contract and open the contract detail view | `{TD.contractNumber}` | Contract detail view opens |
| 53 | Verify that the "Cumulative Released Quantity" field is updated to reflect both release orders | — | Cumulative released quantity shows the sum of both release order quantities (`{TD.releaseQuantity1}` + `{TD.releaseQuantity2}`) |
| 54 | Verify that the "Remaining Target Quantity" field is updated to reflect both releases | — | Remaining target quantity is further reduced (Remaining = Target - `{TD.releaseQuantity1}` - `{TD.releaseQuantity2}`) |
| 55 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 56 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 57 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Two release orders (purchase orders) are successfully created and linked to the purchasing contract
- First release order with quantity `{TD.releaseQuantity1}` is created and confirmed with a PO number
- Second release order with quantity `{TD.releaseQuantity2}` is created and confirmed with a PO number
- Contract "Cumulative Released Quantity" field is updated to show the sum of both release order quantities
- Contract "Remaining Target Quantity" field is updated to show the remaining balance after both releases
- SAP cumulative release tracking is functioning correctly and updating in real-time after each release order submission

---

### Post-conditions

- Two SAP Purchase Order documents exist linked to the purchasing contract
- Contract cumulative released quantity is updated to reflect both release orders
- Contract remaining target quantity is reduced accordingly
- Contract status remains active (not fully released unless total releases equal target quantity)
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
