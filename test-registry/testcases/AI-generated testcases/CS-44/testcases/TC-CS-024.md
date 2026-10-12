# TC-CS-024: Attempt to Create Sales Order for Customer with No Credit Limit Defined

**User Story:**          [CS-44] User Story SD-012
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Sales Order Creation with Credit Limit Check
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
| P1 | User Role | User has the role of Sales Order Processor with SAP authorization to create Sales Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists and is active in the customer master |
| P4 | Master Data | Customer `{TD.customerId}` does NOT have a credit limit defined in credit master data (KNKK) |
| P5 | Master Data | Material `{TD.materialId}` is created, released, and configured for sales organization `{TD.salesOrganization}` |
| P6 | Configuration | Sales Organization `{TD.salesOrganization}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are active and properly configured |
| P7 | Configuration | Credit management is active and configured for the sales organization |

---

### Test Data

**Dataset Reference:** `testdata/CS-44/CS-44-testdata.json` — Dataset ID: `TD-CS-044-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Sold-To Party account number with no credit limit defined — entered by the user | Valid (customer exists, but no credit limit) |
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
| 11 | Press Enter to confirm the Customer entry | — | SAP validates the customer; customer name `{TD.customerName}` is auto-populated in the header; credit data is attempted to load |
| 12 | Verify that Sales Organization, Distribution Channel, and Division fields are populated | `{TD.salesOrganization}`, `{TD.distributionChannel}`, `{TD.division}` | Organizational fields show the expected values |
| 13 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 14 | In the "Material" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 15 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDescription}` is auto-populated; unit of measure `{TD.unitOfMeasure}` is auto-filled |
| 16 | In the "Order Quantity" field, enter the quantity | `{TD.orderQuantity}` | Quantity is populated in the line item |
| 17 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; line item pricing is calculated |
| 18 | In the "Net Price" field, enter the price | `{TD.netPrice}` | Price is populated; net total value is calculated and displayed |
| 19 | Press Enter to confirm the price entry | — | Price is confirmed; line item totals and order header total are updated |
| 20 | Click the "Save" button (primary submit action) in the toolbar | — | SAP begins processing the Sales Order; credit check is attempted |
| 21 | Observe the on-screen response | — | An error or warning message is displayed indicating that no credit limit is defined for the customer; Sales Order creation is blocked or the order is saved with a credit block |
| 22 | Verify that the error message specifically references the missing credit limit | — | Message text includes "credit limit not defined" or "credit master data missing" or similar language |
| 23 | Verify that either the order is not created OR the order is created with a credit block indicator | — | Either: no Sales Order number is generated, OR a Sales Order number is generated with a credit block indicator visible in the header |
| 24 | If a Sales Order number was generated, navigate back to the Manage Sales Orders list | — | Sales Orders list is displayed |
| 25 | If a Sales Order number was generated, search for the newly created Sales Order using the number noted | — | The created Sales Order appears in the list with a credit block indicator visible (if created) |
| 26 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 27 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 28 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Either the Sales Order is NOT created and no document number is generated, OR the Sales Order is created with a credit block indicator due to missing credit limit data
- An error or warning message is displayed indicating that the customer does not have a defined credit limit in the credit master data
- If the order is created, it is automatically blocked and cannot proceed to delivery or billing without credit limit definition and release approval
- The system correctly identifies the missing credit master data configuration and prevents or blocks the transaction

---

### Post-conditions

- Either no SAP Sales Order document is created, OR a Sales Order document exists with a credit block indicator
- If created, the Sales Order is blocked and cannot proceed without credit limit definition
- An error or warning message has been displayed referencing the missing credit limit
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
