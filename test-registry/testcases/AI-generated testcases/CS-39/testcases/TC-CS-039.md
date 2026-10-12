# TC-CS-039: Create Free Goods Order with Single Sample Item for Healthcare Provider

**User Story:**          [CS-39] Process A Free Goods (Sample) Order For A Healthcare Provider
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Free Goods Order Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Sales Representative with SAP authorization to create sales orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and classified as healthcare provider (account group configured for healthcare classification) |
| P4 | Master Data | Material `{TD.materialId}` is created, released, and configured for free goods distribution (item category TANN auto-determined) |
| P5 | Configuration | Order type ZFOC (Free of Charge Order) or equivalent free goods order type is configured and active |
| P6 | Configuration | Sales organization `{TD.salesOrg}`, distribution channel `{TD.distributionChannel}`, and division `{TD.division}` are active and assigned to the customer |

---

### Test Data

**Dataset Reference:** `testdata/CS-39/CS-39-testdata.json` — Dataset ID: `TD-CS-039-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Healthcare provider customer account number — entered by the user | Valid |
| Order Type | `{TD.orderType}` | Free Goods order type code — selected by the user | Valid |
| Material ID | `{TD.materialId}` | Pharmaceutical sample material number — entered by the user | Valid |
| Order Quantity | `{TD.quantity}` | Numeric quantity to order — entered by the user | Valid |
| Delivery Date | `{TD.deliveryDate}` | Requested delivery date — entered by the user | Valid |
| Shipping Point | `{TD.shippingPoint}` | Shipping point for distribution — selected or auto-defaulted | Valid |
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
| 7 | Click the search icon (top-right shell bar) and type "Manage Sales Orders" | — | Search results appear listing the Manage Sales Orders application |
| 8 | Click "Manage Sales Orders" from the search results | — | Manage Sales Orders application opens |
| 9 | Click the "Create" button in the application toolbar | — | New sales order creation form opens in edit mode |
| 10 | In the "Order Type" field, select the Free Goods order type | `{TD.orderType}` | Free Goods order type (ZFOC or equivalent) is selected |
| 11 | In the "Sold-To Party:*" header field, enter the Customer ID | `{TD.customerId}` | Customer ID value is entered into the field |
| 12 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer name `{TD.customerName}` is auto-populated in the header; customer address `{TD.customerAddress}` is displayed |
| 13 | Verify that Sales Organization, Distribution Channel, and Division fields are populated | `{TD.salesOrg}`, `{TD.distributionChannel}`, `{TD.division}` | Sales area fields show the expected values (auto-defaulted from customer master) |
| 14 | Verify that the customer account group indicates healthcare provider classification | — | Customer account group shown reflects healthcare provider classification |
| 15 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 16 | In the "Material" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 17 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is auto-populated; unit of measure `{TD.uom}` is auto-filled |
| 18 | Verify that the Item Category field shows TANN (Free Goods) | — | Item Category is auto-determined as TANN; item is configured for free goods distribution |
| 19 | In the "Order Quantity" field, enter the quantity | `{TD.quantity}` | Quantity is populated in the line item |
| 20 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; line item is updated |
| 21 | Verify that the Net Value field shows 0.00 (free goods pricing applied) | `{TD.netValue}` | Net Value is 0.00; 100% discount or zero pricing procedure is applied |
| 22 | In the "Requested Delivery Date" field, enter the delivery date | `{TD.deliveryDate}` | Delivery date is populated with a future date |
| 23 | Press Enter to confirm the delivery date entry | — | Delivery date is confirmed |
| 24 | If the "Shipping Point" field is empty, verify or enter the shipping point | `{TD.shippingPoint}` | Shipping point is populated (auto-defaulted or manually entered) |
| 25 | Click the "Save" button (primary submit action) in the toolbar | — | SAP begins processing the sales order creation |
| 26 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated sales order number |
| 27 | Note the sales order number from the success message or the top-left header area | — | Sales order number is displayed (10-digit system-generated format) |
| 28 | Verify the sales order status | — | Sales order status is "Open" or "In Process" |
| 29 | Navigate back to the Manage Sales Orders list | — | Sales order list is displayed |
| 30 | Search for the newly created sales order using the number noted in step 27 | — | The created sales order appears in the list with the expected status |
| 31 | Click the sales order number to open the order details | — | Sales order details page opens showing all header and item data |
| 32 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 33 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 34 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Free Goods sales order number is generated by SAP and displayed in the confirmation message
- The sales order is persisted in SAP with order type ZFOC (or equivalent Free Goods order type) and status "Open" or "In Process"
- All header data (Customer, Sales Organization, Distribution Channel, Division) is correctly stored
- All line item data (Material, Quantity, Item Category TANN, Net Value 0.00) is correctly stored
- The created sales order appears in the "Manage Sales Orders" list and can be viewed
- Free goods pricing procedure is applied; net value is zero

---

### Post-conditions

- SAP Free Goods sales order document exists with the generated sales order number
- Sales order status is "Open" or "In Process"
- Customer, material, quantity, and zero pricing data are correctly recorded on the sales order
- Item category TANN (Free Goods) is correctly auto-determined for the line item
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
