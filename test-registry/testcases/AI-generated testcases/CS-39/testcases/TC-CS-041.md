# TC-CS-041: Create Free Goods Order with Multiple Sample Items

**User Story:**          [CS-39] Process A Free Goods (Sample) Order For A Healthcare Provider
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Free Goods Order Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
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
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and classified as healthcare provider |
| P4 | Master Data | Material `{TD.materialId}` is created, released, and configured for free goods distribution |
| P5 | Master Data | Material `{TD.materialId2}` (second sample material) is created, released, and configured for free goods distribution |
| P6 | Configuration | Order type ZFOC (Free of Charge Order) or equivalent free goods order type is configured and active |

---

### Test Data

**Dataset Reference:** `testdata/CS-39/CS-39-testdata.json` — Dataset ID: `TD-CS-039-AP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Healthcare provider customer account number — entered by the user | Valid |
| Order Type | `{TD.orderType}` | Free Goods order type code — selected by the user | Valid |
| Material ID (Line 1) | `{TD.materialId}` | First pharmaceutical sample material — entered by the user | Valid |
| Order Quantity (Line 1) | `{TD.quantity}` | Quantity for first line item — entered by the user | Valid |
| Material ID (Line 2) | `{TD.materialId2}` | Second pharmaceutical sample material — entered by the user | Valid |
| Order Quantity (Line 2) | `{TD.quantity2}` | Quantity for second line item — entered by the user | Valid |
| Delivery Date | `{TD.deliveryDate}` | Requested delivery date — entered by the user | Valid |

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
| 13 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 14 | In the "Material" field of the first line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 15 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is auto-populated; unit of measure `{TD.uom}` is auto-filled |
| 16 | Verify that the Item Category field shows TANN (Free Goods) | — | Item Category is auto-determined as TANN |
| 17 | In the "Order Quantity" field of the first line item, enter the quantity | `{TD.quantity}` | Quantity is populated in the line item |
| 18 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; line item is updated |
| 19 | Verify that the Net Value field for the first line item shows 0.00 | `{TD.netValue}` | Net Value is 0.00; zero pricing procedure is applied |
| 20 | In the "Items" section, click the "Create" button again to add a second line item | — | A second new empty line item row appears in the Items table |
| 21 | In the "Material" field of the second line item, enter the second Material ID | `{TD.materialId2}` | Second material ID is entered into the field |
| 22 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc2}` is auto-populated; unit of measure `{TD.uom2}` is auto-filled |
| 23 | Verify that the Item Category field for the second line item shows TANN (Free Goods) | — | Item Category is auto-determined as TANN for the second line item |
| 24 | In the "Order Quantity" field of the second line item, enter the quantity | `{TD.quantity2}` | Quantity is populated in the second line item |
| 25 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; second line item is updated |
| 26 | Verify that the Net Value field for the second line item shows 0.00 | `{TD.netValue2}` | Net Value is 0.00; zero pricing procedure is applied to the second line item |
| 27 | In the "Requested Delivery Date" field, enter the delivery date | `{TD.deliveryDate}` | Delivery date is populated with a future date |
| 28 | Press Enter to confirm the delivery date entry | — | Delivery date is confirmed |
| 29 | Click the "Save" button (primary submit action) in the toolbar | — | SAP begins processing the sales order creation |
| 30 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated sales order number |
| 31 | Note the sales order number from the success message or the top-left header area | — | Sales order number is displayed (10-digit system-generated format) |
| 32 | Navigate back to the Manage Sales Orders list | — | Sales order list is displayed |
| 33 | Search for the newly created sales order using the number noted in step 31 | — | The created sales order appears in the list |
| 34 | Click the sales order number to open the order details | — | Sales order details page opens showing all header and item data |
| 35 | Verify that two line items are displayed with correct materials, quantities, and zero pricing | `{TD.materialId}`, `{TD.materialId2}`, `{TD.quantity}`, `{TD.quantity2}` | Two line items are correctly stored; both show item category TANN and net value 0.00 |
| 36 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 37 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 38 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Free Goods sales order number is generated by SAP and displayed in the confirmation message
- The sales order is persisted in SAP with order type ZFOC and status "Open" or "In Process"
- Two line items are correctly stored on the sales order with separate materials, quantities, item category TANN, and net value 0.00
- All header data is correctly stored
- The created sales order appears in the "Manage Sales Orders" list with both line items visible

---

### Post-conditions

- SAP Free Goods sales order document exists with the generated sales order number
- Sales order contains two line items, both with item category TANN and zero pricing
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
