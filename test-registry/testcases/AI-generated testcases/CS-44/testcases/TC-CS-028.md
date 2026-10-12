# TC-CS-028: Attempt to Submit Sales Order with Quantity Field Empty

**User Story:**          [CS-44] User Story SD-012
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Sales Order Creation with Credit Limit Check
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
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and has a defined credit limit in credit master data |
| P4 | Master Data | Material `{TD.materialId}` is created, released, and configured for sales organization `{TD.salesOrganization}` |
| P5 | Configuration | Sales Organization `{TD.salesOrganization}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are active and properly configured |
| P6 | Configuration | Credit management is active and configured for the sales organization |

---

### Test Data

**Dataset Reference:** `testdata/CS-44/CS-44-testdata.json` — Dataset ID: `TD-CS-044-ERR-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Sold-To Party account number — entered by the user | Valid |
| Sales Organization | `{TD.salesOrganization}` | Sales organization code — entered by the user | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — entered by the user | Valid |
| Division | `{TD.division}` | Division code — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Order Quantity | `{TD.emptyValue}` | Quantity field left empty — NOT entered by the user | Invalid (blank) |
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
| 11 | Press Enter to confirm the Customer entry | — | SAP validates the customer; customer name `{TD.customerName}` is auto-populated in the header; credit data is loaded |
| 12 | Verify that Sales Organization, Distribution Channel, and Division fields are populated | `{TD.salesOrganization}`, `{TD.distributionChannel}`, `{TD.division}` | Organizational fields show the expected values |
| 13 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 14 | In the "Material" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 15 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDescription}` is auto-populated; unit of measure `{TD.unitOfMeasure}` is auto-filled |
| 16 | Leave the "Order Quantity" field empty (do NOT enter any value) | `{TD.emptyValue}` | Order Quantity field remains blank |
| 17 | In the "Net Price" field, enter the price | `{TD.netPrice}` | Price is populated (if system allows) |
| 18 | Press Enter to confirm the price entry | — | Price may or may not be confirmed without quantity (system behavior varies) |
| 19 | Click the "Save" button (primary submit action) in the toolbar | — | SAP attempts to process the Sales Order submission |
| 20 | Observe the on-screen response | — | An error message is displayed indicating that the Order Quantity field is mandatory and must be filled; submission is blocked |
| 21 | Verify that the Order Quantity field in the line item is highlighted or marked with a mandatory indicator | — | The Order Quantity field is visually highlighted in red or with an asterisk (*) or error icon; field label is marked as required |
| 22 | Verify that the error message specifically references the missing Order Quantity | — | Message text includes "Order Quantity is mandatory" or "enter a quantity" or "quantity is required" or similar language |
| 23 | Verify that no Sales Order number is generated | — | No document number is displayed; order is NOT created |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Sales Order is NOT created; no document number is generated
- SAP displays an error message indicating that the Order Quantity field is mandatory
- The Order Quantity field in the line item is visually highlighted as required
- The system prevents order creation and prompts the user to fill the missing mandatory field
- The user is clearly informed that the Order Quantity must be provided before order creation can proceed

---

### Post-conditions

- No SAP Sales Order document is created
- No document number is generated
- The error message has been displayed referencing the missing mandatory Order Quantity field
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
