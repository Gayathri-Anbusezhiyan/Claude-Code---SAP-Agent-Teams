# TC-CS-166: Attempt ATP Check with Requested Quantity Field Empty

**User Story:**          [CS-40] User Story SD-008
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Available-to-Promise (ATP) Check with Batch Expiration Logic
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to perform ATP checks and create Sales Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists, is active, batch-managed, and configured for plant `{TD.plant}` |
| P4 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrg}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-40/CS-40-testdata.json` — Dataset ID: `TD-CS-040-ERR-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Batch-managed material master number | Valid |
| Customer ID | `{TD.customerId}` | Sold-to party account number | Valid |
| Requested Quantity | `{TD.emptyValue}` | Order quantity field left blank (empty) | Invalid (mandatory field) |
| Requested Delivery Date | `{TD.requestedDeliveryDate}` | Customer requested delivery date (future) | Valid |
| Sales Organization | `{TD.salesOrg}` | Sales organization code | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Sales Orders" | — | Search results appear listing the "Manage Sales Orders" application |
| 8 | Click "Manage Sales Orders" from the search results | — | Manage Sales Orders application opens |
| 9 | Click the "Create" button in the application toolbar | — | New Sales Order creation form opens in edit mode |
| 10 | In the "Sold-to Party:*" header field, enter the Customer ID | `{TD.customerId}` | Customer ID value is entered into the field |
| 11 | Press Enter to confirm the Customer entry | — | SAP validates the customer; customer name is auto-populated |
| 12 | In the "Items" section, click the "Add" button | — | A new empty line item row appears in the Items table |
| 13 | In the "Material" field, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 14 | Press Enter to confirm the Material entry | — | SAP validates the material; material description and unit of measure are auto-populated |
| 15 | Leave the "Order Quantity" field empty; do not enter any value | `{TD.emptyValue}` | Order Quantity field remains blank |
| 16 | In the "Requested Delivery Date" field, enter the delivery date | `{TD.requestedDeliveryDate}` | Delivery date is populated in the line item |
| 17 | Attempt to click the "Save" button in the toolbar | — | System highlights the Order Quantity field as mandatory; submission is blocked; Order Quantity field is visually indicated as required |
| 18 | Verify the error message content | — | Error message states that Order Quantity is a required field or "Enter a quantity" or similar validation message |
| 19 | Verify that the Sales Order is NOT created | — | No Sales Order number is generated; user is prompted to fill the missing Order Quantity field |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System highlights the Order Quantity field as mandatory
- Submission is blocked
- Order Quantity field is visually indicated as required
- Error message clearly states that Order Quantity is a required field
- Sales Order is NOT created
- User is prompted to fill the missing field

---

### Post-conditions

- No Sales Order document is created
- No ATP check is performed
- No application-level critical errors remain outstanding (validation error messages are expected)

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
