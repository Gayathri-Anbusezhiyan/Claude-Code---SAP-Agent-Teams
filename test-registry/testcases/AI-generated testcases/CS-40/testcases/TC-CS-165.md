# TC-CS-165: Attempt ATP Check with Material Field Empty

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
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrg}` |
| P4 | Configuration | Sales Organization `{TD.salesOrg}` is active |

---

### Test Data

**Dataset Reference:** `testdata/CS-40/CS-40-testdata.json` — Dataset ID: `TD-CS-040-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.emptyValue}` | Material field left blank (empty) | Invalid (mandatory field) |
| Customer ID | `{TD.customerId}` | Sold-to party account number | Valid |
| Requested Quantity | `{TD.requestedQuantity}` | Order quantity requested | Valid |
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
| 11 | Press Enter to confirm the Customer entry | — | SAP validates the customer; customer name `{TD.customerName}` is auto-populated in the header |
| 12 | In the "Items" section, click the "Add" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 13 | Leave the "Material" field empty; do not enter any value | `{TD.emptyValue}` | Material field remains blank |
| 14 | In the "Order Quantity" field, enter the requested quantity | `{TD.requestedQuantity}` | Quantity is populated in the line item |
| 15 | In the "Requested Delivery Date" field, enter the delivery date | `{TD.requestedDeliveryDate}` | Delivery date is populated in the line item |
| 16 | Attempt to click the "Save" button in the toolbar | — | System highlights the Material field as mandatory; submission is blocked; Material field is visually indicated as required |
| 17 | Verify the error message content | — | Error message states that Material is a required field or "Enter a material" or similar validation message |
| 18 | Verify that the Sales Order is NOT created | — | No Sales Order number is generated; user is prompted to fill the missing Material field |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System highlights the Material field as mandatory
- Submission is blocked
- Material field is visually indicated as required (e.g., red border or asterisk)
- Error message clearly states that Material is a required field
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
