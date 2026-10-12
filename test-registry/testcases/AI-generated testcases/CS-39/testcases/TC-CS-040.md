# TC-CS-040: Create Free Goods Order with Batch-Managed Sample Material

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
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and classified as healthcare provider |
| P4 | Master Data | Material `{TD.batchMaterialId}` is created, released, configured for free goods distribution, and flagged as batch-managed |
| P5 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.batchMaterialId}` with expiry date `{TD.batchExpiry}` (future date) |
| P6 | Configuration | Order type ZFOC (Free of Charge Order) or equivalent free goods order type is configured and active |
| P7 | Configuration | Sales organization `{TD.salesOrg}`, distribution channel `{TD.distributionChannel}`, and division `{TD.division}` are active and assigned to the customer |

---

### Test Data

**Dataset Reference:** `testdata/CS-39/CS-39-testdata.json` — Dataset ID: `TD-CS-039-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Healthcare provider customer account number — entered by the user | Valid |
| Order Type | `{TD.orderType}` | Free Goods order type code — selected by the user | Valid |
| Batch Material ID | `{TD.batchMaterialId}` | Pharmaceutical sample material number (batch-managed) — entered by the user | Valid |
| Order Quantity | `{TD.quantity}` | Numeric quantity to order — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Batch number for the material — entered by the user | Valid |
| Batch Expiry Date | `{TD.batchExpiry}` | Batch expiry date (future date) — displayed or verified | Valid |
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
| 12 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer name `{TD.customerName}` is auto-populated in the header |
| 13 | Verify that Sales Organization, Distribution Channel, and Division fields are populated | `{TD.salesOrg}`, `{TD.distributionChannel}`, `{TD.division}` | Sales area fields show the expected values |
| 14 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 15 | In the "Material" field of the new line item, enter the batch-managed Material ID | `{TD.batchMaterialId}` | Material ID is entered into the field |
| 16 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.batchMaterialDesc}` is auto-populated; unit of measure `{TD.uom}` is auto-filled |
| 17 | Verify that the Item Category field shows TANN (Free Goods) | — | Item Category is auto-determined as TANN |
| 18 | In the "Order Quantity" field, enter the quantity | `{TD.quantity}` | Quantity is populated in the line item |
| 19 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; line item is updated |
| 20 | Verify that the Net Value field shows 0.00 (free goods pricing applied) | `{TD.netValue}` | Net Value is 0.00; zero pricing procedure is applied |
| 21 | In the "Requested Delivery Date" field, enter the delivery date | `{TD.deliveryDate}` | Delivery date is populated with a future date |
| 22 | Press Enter to confirm the delivery date entry | — | Delivery date is confirmed |
| 23 | If the "Shipping Point" field is empty, verify or enter the shipping point | `{TD.shippingPoint}` | Shipping point is populated |
| 24 | In the "Batch" field on the line item, enter the batch number | `{TD.batchNumber}` | Batch number is entered |
| 25 | Press Enter to confirm the batch entry | — | SAP validates the batch; batch expiry date `{TD.batchExpiry}` is auto-populated or displayed |
| 26 | Verify that the batch expiry date is displayed and is a future date | `{TD.batchExpiry}` | Batch expiry date is displayed; date is in the future (not expired) |
| 27 | Click the "Save" button (primary submit action) in the toolbar | — | SAP begins processing the sales order creation |
| 28 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated sales order number |
| 29 | Note the sales order number from the success message or the top-left header area | — | Sales order number is displayed (10-digit system-generated format) |
| 30 | Verify the sales order status | — | Sales order status is "Open" or "In Process" |
| 31 | Navigate back to the Manage Sales Orders list | — | Sales order list is displayed |
| 32 | Search for the newly created sales order using the number noted in step 29 | — | The created sales order appears in the list with the expected status |
| 33 | Click the sales order number to open the order details | — | Sales order details page opens showing all header and item data |
| 34 | Verify that the line item displays the batch number and expiry date | `{TD.batchNumber}`, `{TD.batchExpiry}` | Batch number and expiry date are correctly stored and displayed on the line item |
| 35 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 36 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 37 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Free Goods sales order number is generated by SAP and displayed in the confirmation message
- The sales order is persisted in SAP with order type ZFOC and status "Open" or "In Process"
- All header data (Customer, Sales Organization, Distribution Channel, Division) is correctly stored
- All line item data (Material, Quantity, Item Category TANN, Net Value 0.00, Batch Number, Batch Expiry Date) is correctly stored
- The batch number and expiry date are captured and displayed on the line item for pharmaceutical traceability
- The created sales order appears in the "Manage Sales Orders" list and can be viewed

---

### Post-conditions

- SAP Free Goods sales order document exists with the generated sales order number
- Sales order status is "Open" or "In Process"
- Customer, batch-managed material, quantity, zero pricing, batch number, and expiry date are correctly recorded on the sales order
- Batch and expiry date tracking is enabled for pharmaceutical recall capability
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
