# TC-CS-043: Create Cross-Border Sales Order with Non-Controlled Product to Verify Reduced Screening

**User Story:**          [CS-41] User Story SD-009
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Cross-Border Sales Order Creation with Export Compliance Screening
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Export Compliance Officer with SAP authorization to create Sales Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and has a destination country different from the company code country (cross-border flag) |
| P4 | Master Data | Material `{TD.nonControlledMaterialId}` is created, released, and NOT flagged as a controlled pharmaceutical product in the material master (export control classification is blank or non-controlled) |
| P5 | Configuration | Sales Organization `{TD.salesOrganization}`, Distribution Channel `{TD.distributionChannel}`, and Division `{TD.division}` are active |

---

### Test Data

**Dataset Reference:** `testdata/CS-41/CS-41-testdata.json` — Dataset ID: `TD-CS-041-AP-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Sold-To Party account number with cross-border address — entered by the user | Valid |
| Destination Country | `{TD.destinationCountry}` | ISO country code different from company code country — derived from customer master | Valid |
| Material ID (Non-Controlled) | `{TD.nonControlledMaterialId}` | Material master number for non-controlled product — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Numeric quantity to order — entered by the user | Valid |
| Sales Order Type | `{TD.salesOrderType}` | Order type code — entered by the user | Valid |
| Sales Organization | `{TD.salesOrganization}` | Sales Organization code — entered by the user | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution Channel code — entered by the user | Valid |
| Division | `{TD.division}` | Division code — entered by the user | Valid |
| Requested Delivery Date | `{TD.requestedDeliveryDate}` | Future delivery date — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Sales Order" | — | Search results appear listing the "Create Sales Order" application |
| 8 | Click the "Create Sales Order" application name from the search results | — | Create Sales Order application opens |
| 9 | Click the "Create" button in the application toolbar | — | New Sales Order creation form opens in edit mode |
| 10 | In the "Order Type" header field, enter the Sales Order Type | `{TD.salesOrderType}` | Order Type value is entered into the field |
| 11 | Press Enter to confirm the Order Type entry | — | SAP validates the order type; form structure is configured accordingly |
| 12 | In the "Sales Organization" field, enter the Sales Organization code | `{TD.salesOrganization}` | Sales Organization code is entered |
| 13 | Press Enter to confirm the Sales Organization entry | — | Sales Organization is validated and confirmed |
| 14 | In the "Distribution Channel" field, enter the Distribution Channel code | `{TD.distributionChannel}` | Distribution Channel code is entered |
| 15 | Press Enter to confirm the Distribution Channel entry | — | Distribution Channel is validated and confirmed |
| 16 | In the "Division" field, enter the Division code | `{TD.division}` | Division code is entered |
| 17 | Press Enter to confirm the Division entry | — | Division is validated and confirmed |
| 18 | In the "Sold-To Party" header field, enter the Customer ID | `{TD.customerId}` | Customer ID value is entered into the field |
| 19 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer name `{TD.customerName}` and destination country `{TD.destinationCountry}` are auto-populated in the header |
| 20 | Verify that the Destination Country field shows a country different from the company code country | `{TD.destinationCountry}` | Destination Country is populated with a cross-border destination (e.g., USA, GBR, DEU) |
| 21 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 22 | In the "Material" field of the new line item, enter the non-controlled Material ID | `{TD.nonControlledMaterialId}` | Material ID is entered into the field |
| 23 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.nonControlledMaterialDescription}` is auto-populated; export control classification is blank or non-controlled |
| 24 | In the "Order Quantity" field, enter the quantity | `{TD.orderQuantity}` | Quantity is populated in the line item |
| 25 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; line item totals are updated |
| 26 | In the "Requested Delivery Date" field, enter the delivery date | `{TD.requestedDeliveryDate}` | Requested delivery date is populated with a future date |
| 27 | Press Enter to confirm the delivery date entry | — | Delivery date is confirmed |
| 28 | Verify that NO compliance check status field or export license screening indicator appears (reduced or no screening for non-controlled products) | — | No export license check fields are visible; denied-party screening may still occur but export license validation is bypassed because the product is non-controlled |
| 29 | Click the "Save" or "Order" button (primary submit action) in the toolbar | — | SAP begins processing the Sales Order submission without export license screening |
| 30 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Sales Order number; no export license screening delay is performed |
| 31 | Note the Sales Order number from the success message or the top-left header area | — | Sales Order number is displayed (format is 10-digit system-generated number) |
| 32 | Navigate back to the Sales Order list application | — | Sales Order list is displayed |
| 33 | Search for the newly created Sales Order using the number noted in step 31 | — | The created Sales Order appears in the list with status "In Process" or "Confirmed" |
| 34 | Open the newly created Sales Order to verify compliance check section | — | Sales Order document opens in display mode; denied-party screening result may be visible but NO export license check data is present |
| 35 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 36 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 37 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Sales Order number is generated by SAP and displayed in the confirmation message
- The Sales Order is persisted in SAP with document type per `{TD.salesOrderType}` and status "In Process" or "Confirmed"
- All header and line item data are correctly stored
- NO export license screening is performed because the product is non-controlled
- Denied-party screening may still occur for cross-border orders but export license check is bypassed
- The Sales Order is created without export license validation delay

---

### Post-conditions

- SAP Sales Order document exists with the generated SO number
- SO status is "In Process" or "Confirmed"
- Denied-party screening result may be recorded but no export license check data is present
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
