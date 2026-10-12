# TC-CS-030: Create Sales Order for Customer with Negative Outstanding Balance

**User Story:**          [CS-44] User Story SD-012
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Sales Order Creation with Credit Limit Check
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
| P1 | User Role | User has the role of Sales Order Processor with SAP authorization to create Sales Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and has a defined credit limit in credit master data |
| P4 | Master Data | Customer `{TD.customerId}` has a negative outstanding balance (credit balance / overpayment) — customer has prepaid or overpaid on account |
| P5 | Master Data | Material `{TD.materialId}` is created, released, and configured for sales organization `{TD.salesOrganization}` |
| P6 | Configuration | Sales Organization `{TD.salesOrganization}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are active and properly configured |
| P7 | Configuration | Credit management is active and configured for the sales organization |
| P8 | FI-AR Integration | FI-AR integration is operational and negative outstanding balance is correctly reflected from open items (BSID) |

---

### Test Data

**Dataset Reference:** `testdata/CS-44/CS-44-testdata.json` — Dataset ID: `TD-CS-044-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Sold-To Party account number with negative outstanding balance — entered by the user | Valid |
| Sales Organization | `{TD.salesOrganization}` | Sales organization code — entered by the user | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — entered by the user | Valid |
| Division | `{TD.division}` | Division code — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Numeric quantity to order — entered by the user | Valid |
| Net Price | `{TD.netPrice}` | Price per unit of measure — entered by the user | Valid |

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
| 9 | Click the "Create" button in the application toolbar | — | New Sales Order creation form opens in edit mode |
| 10 | In the "Sold-To Party:*" field, enter the Customer ID | `{TD.customerId}` | Customer ID value is entered into the field |
| 11 | Press Enter to confirm the Customer entry | — | SAP validates the customer; customer name `{TD.customerName}` is auto-populated in the header; credit data is loaded showing negative outstanding balance (credit balance) |
| 12 | Verify that Sales Organization, Distribution Channel, and Division fields are populated | `{TD.salesOrganization}`, `{TD.distributionChannel}`, `{TD.division}` | Organizational fields show the expected values |
| 13 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 14 | In the "Material" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 15 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDescription}` is auto-populated; unit of measure `{TD.unitOfMeasure}` is auto-filled |
| 16 | In the "Order Quantity" field, enter the quantity | `{TD.orderQuantity}` | Quantity is populated in the line item |
| 17 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; line item pricing is calculated |
| 18 | In the "Net Price" field, enter the price | `{TD.netPrice}` | Price is populated; net total value is calculated and displayed |
| 19 | Press Enter to confirm the price entry | — | Price is confirmed; line item totals and order header total are updated |
| 20 | Click the "Save" button (primary submit action) in the toolbar | — | SAP begins processing the Sales Order; credit check is performed automatically |
| 21 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Sales Order number; no credit block indicator is displayed (negative balance provides additional credit capacity) |
| 22 | Note the Sales Order number from the success message or the top-left header area | — | Sales Order number is displayed (10-digit system-generated format) |
| 23 | Verify that the order status shows as "Open" with no credit block | — | Order status is "Open"; credit exposure calculation correctly accounts for negative outstanding balance (credit available = limit + absolute value of negative balance); no block indicator is present |
| 24 | Navigate back to the Manage Sales Orders list | — | Sales Orders list is displayed |
| 25 | Search for the newly created Sales Order using the number noted in step 22 | — | The created Sales Order appears in the list with status "Open" and no credit block indicator |
| 26 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 27 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 28 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Sales Order number is generated by SAP and displayed in the confirmation message
- The Sales Order is persisted in SAP with status "Open" and no credit block indicator
- All header data (Customer, Sales Organization, Distribution Channel, Division) is correctly stored
- All line item data (Material, Quantity, Price) is correctly stored
- Credit check is performed: negative outstanding balance (customer credit balance) is correctly treated as additional available credit capacity
- Credit exposure calculation correctly handles negative balance: effective credit available = credit limit + absolute value of negative balance
- The boundary condition (negative balance) is correctly evaluated — order is allowed to proceed
- The created Sales Order appears in the "Manage Sales Orders" list and can be viewed
- The order can proceed to delivery and billing without requiring credit release

---

### Post-conditions

- SAP Sales Order document exists with the generated Sales Order number
- Sales Order status is "Open" with no credit block
- Customer, material, quantity, and price data are correctly recorded on the Sales Order
- Credit exposure calculation correctly accounts for negative outstanding balance
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
