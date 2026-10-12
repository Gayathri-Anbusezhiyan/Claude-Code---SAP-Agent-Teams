# TC-CS-162: Attempt ATP Check with Non-existent Material

**User Story:**          [CS-40] User Story SD-008
**Epic:**                N/A — no epic assigned
**Module:**              Sales and Distribution (SD)
**Feature:**             Available-to-Promise (ATP) Check with Batch Expiration Logic
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
| P1 | User Role | User has the role of Logistics Coordinator with SAP authorization to perform ATP checks and create Sales Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.invalidMaterialId}` does NOT exist in SAP |
| P4 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to sales organization `{TD.salesOrg}` |
| P5 | Configuration | Sales Organization `{TD.salesOrg}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are active |

---

### Test Data

**Dataset Reference:** `testdata/CS-40/CS-40-testdata.json` — Dataset ID: `TD-CS-040-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID (Invalid) | `{TD.invalidMaterialId}` | Non-existent material master number | Invalid |
| Customer ID | `{TD.customerId}` | Sold-to party account number | Valid |
| Requested Quantity | `{TD.requestedQuantity}` | Order quantity requested by customer | Valid |
| Requested Delivery Date | `{TD.requestedDeliveryDate}` | Customer requested delivery date (future) | Valid |
| Sales Organization | `{TD.salesOrg}` | Sales organization code | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code | Valid |
| Division | `{TD.division}` | Division code | Valid |

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
| 12 | Verify that Sales Organization, Distribution Channel, and Division fields are populated | `{TD.salesOrg}`, `{TD.distributionChannel}`, `{TD.division}` | Organizational fields show the expected values |
| 13 | In the "Items" section, click the "Add" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 14 | In the "Material" field of the new line item, enter the invalid Material ID | `{TD.invalidMaterialId}` | Invalid Material ID is entered into the field |
| 15 | Press Enter to confirm the Material entry | — | SAP attempts to validate the material; an error message is displayed indicating the material does not exist; material description and unit of measure are NOT auto-populated |
| 16 | Verify the error message content | — | Error message states that the material does not exist, is not found, or is not valid for the sales organization/plant combination |
| 17 | Attempt to populate the "Order Quantity" field | `{TD.requestedQuantity}` | Quantity field may be disabled or entry is allowed but ATP check cannot proceed without valid material |
| 18 | Attempt to click the "Save" button in the toolbar | — | SAP displays a blocking error preventing save; Sales Order cannot be created with invalid material |
| 19 | Verify that no ATP check is triggered | — | No ATP status indicator appears; ATP check cannot execute without valid material master data |
| 20 | Observe the final system response | — | Sales Order is NOT created; error is clearly communicated to user; system prevents submission with non-existent material |
| 21 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 22 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 23 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays an error message indicating the material does not exist
- Material description and unit of measure are NOT auto-populated
- ATP check is NOT triggered because valid material master data is required
- Sales Order is NOT created
- System prevents submission with non-existent material
- Error is clearly communicated to the user

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
