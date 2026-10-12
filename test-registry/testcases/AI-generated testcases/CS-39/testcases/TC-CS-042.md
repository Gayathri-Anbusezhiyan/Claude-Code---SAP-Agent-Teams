# TC-CS-042: Create Free Goods Order with Automatic Delivery Document Creation

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
| P1 | User Role | User has the role of Sales Representative with SAP authorization to create sales orders and view delivery documents |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and classified as healthcare provider |
| P4 | Master Data | Material `{TD.materialId}` is created, released, and configured for free goods distribution |
| P5 | Configuration | Order type ZFOC is configured with automatic delivery document creation enabled |
| P6 | Configuration | Sales organization `{TD.salesOrg}` and plant `{TD.plant}` are configured for automatic delivery creation |

---

### Test Data

**Dataset Reference:** `testdata/CS-39/CS-39-testdata.json` — Dataset ID: `TD-CS-039-AP-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Healthcare provider customer account number — entered by the user | Valid |
| Order Type | `{TD.orderType}` | Free Goods order type code — selected by the user | Valid |
| Material ID | `{TD.materialId}` | Pharmaceutical sample material number — entered by the user | Valid |
| Order Quantity | `{TD.quantity}` | Numeric quantity to order — entered by the user | Valid |
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
| 14 | In the "Material" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 15 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is auto-populated |
| 16 | In the "Order Quantity" field, enter the quantity | `{TD.quantity}` | Quantity is populated in the line item |
| 17 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; line item is updated |
| 18 | In the "Requested Delivery Date" field, enter the delivery date | `{TD.deliveryDate}` | Delivery date is populated with a future date |
| 19 | Press Enter to confirm the delivery date entry | — | Delivery date is confirmed |
| 20 | Click the "Save" button (primary submit action) in the toolbar | — | SAP begins processing the sales order creation |
| 21 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated sales order number |
| 22 | Note the sales order number from the success message | — | Sales order number is displayed |
| 23 | Verify that a success message or notification indicates automatic delivery document creation | — | Message indicates delivery document was created automatically (or navigate to check) |
| 24 | Click the search icon (top-right shell bar) and type "Manage Outbound Deliveries" | — | Search results appear listing the Manage Outbound Deliveries application |
| 25 | Click "Manage Outbound Deliveries" from the search results | — | Manage Outbound Deliveries application opens |
| 26 | In the filter/search field, enter the sales order number noted in step 22 | — | Filter is applied to search for deliveries linked to the sales order |
| 27 | Click the "Go" button to execute the search | — | Delivery list is displayed; a delivery document linked to the sales order appears |
| 28 | Note the delivery document number from the list | — | Delivery document number is displayed (10-digit format starting with 80) |
| 29 | Click the delivery document number to open the delivery details | — | Delivery document details page opens |
| 30 | Verify that the delivery document is linked to the sales order created in step 22 | — | Delivery header shows reference to the sales order number; material and quantity match the order |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Free Goods sales order number is generated by SAP and displayed in the confirmation message
- The sales order is persisted in SAP with order type ZFOC and status "Open" or "In Process"
- A delivery document is automatically created and linked to the sales order
- The delivery document appears in the "Manage Outbound Deliveries" list with a reference to the sales order number
- All header and line item data are correctly stored in both the sales order and delivery document

---

### Post-conditions

- SAP Free Goods sales order document exists with the generated sales order number
- SAP delivery document exists and is linked to the sales order
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
