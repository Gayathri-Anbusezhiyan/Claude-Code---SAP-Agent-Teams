# TC-CS-052: Verify pricing determination with order quantity exactly at tier breakpoint

**User Story:**          [CS-48] Maintain Tiered Pricing Conditions For A Pharmaceutical Product Based
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Pricing Condition Master — Tier Breakpoint Boundary Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Sales Order Processor with SAP authorization to create sales orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to Customer Pricing Group `{TD.customerPricingGroup}` |
| P4 | Master Data | Material `{TD.materialId}` exists in material master, is active, released for sales, and configured for sales organization `{TD.salesOrg}` |
| P5 | Configuration | Active pricing condition records exist for Material `{TD.materialId}` and Customer Pricing Group `{TD.customerPricingGroup}` with tier breakpoint at quantity `{TD.tierBreakpointQuantity}` (e.g., tier 1: 1-99 at price X, tier 2: 100-499 at price Y) |
| P6 | Configuration | Sales Organization `{TD.salesOrg}` and Distribution Channel `{TD.distributionChannel}` are assigned to the user profile |

---

### Test Data

**Dataset Reference:** `testdata/CS-48/CS-48-testdata.json` — Dataset ID: `TD-CS-48-024`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Customer account number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Order Quantity | `{TD.tierBreakpointQuantity}` | Order quantity exactly at tier breakpoint (e.g., 100) — entered by the user | Valid |
| Expected Tier 2 Price | `{TD.tier2PriceAmount}` | Expected price for tier 2 (quantity >= breakpoint) — reference only | Valid |
| Customer Pricing Group | `{TD.customerPricingGroup}` | Customer pricing group code assigned to the customer — auto-populated by SAP | Valid |
| Customer Name | `{TD.customerName}` | Customer name — auto-populated by SAP | Valid |
| Material Description | `{TD.materialDescription}` | Material description — auto-populated by SAP | Valid |
| Base UoM | `{TD.baseUom}` | Base unit of measure — auto-populated by SAP | Valid |
| Sales Organization | `{TD.salesOrg}` | Sales organization code — auto-populated from user context | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — auto-populated from user context | Valid |

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
| 8 | Click the "Create Sales Order" application from the search results | — | Create Sales Order application opens in edit mode |
| 9 | In the "Sold-to Party" field, enter the Customer ID | `{TD.customerId}` | Customer ID value is entered into the field |
| 10 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer Name `{TD.customerName}` is auto-populated; Customer Pricing Group `{TD.customerPricingGroup}` is set |
| 11 | Verify that Sales Organization and Distribution Channel fields are populated | `{TD.salesOrg}`, `{TD.distributionChannel}` | Organizational fields show the expected values (auto-populated from user profile) |
| 12 | In the "Items" section, click the "Add Item" button | — | A new empty line item row appears in the Items table |
| 13 | In the "Material" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 14 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDescription}` is auto-populated; unit of measure `{TD.baseUom}` is auto-filled |
| 15 | In the "Order Quantity" field, enter the quantity exactly at the tier breakpoint | `{TD.tierBreakpointQuantity}` | Quantity exactly at the tier breakpoint is populated in the line item |
| 16 | Press Enter to confirm the quantity entry | — | SAP applies pricing determination based on the tier breakpoint; price for tier 2 is applied |
| 17 | Verify that the Net Price field displays the expected tier 2 price | `{TD.tier2PriceAmount}` | Net Price field shows the expected price for tier 2 (quantity >= breakpoint value) |
| 18 | Verify that the Net Value is calculated correctly based on quantity and tier 2 price | — | Net Value = Order Quantity × Tier 2 Price Amount; calculation is correct |
| 19 | Click the "Save" button to save the sales order | — | SAP processes the sales order save operation |
| 20 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated sales order number |
| 21 | Note the sales order number from the success message | — | Sales order number is displayed (format is system-generated) |
| 22 | Navigate back to the sales order list | — | Sales order list is displayed |
| 23 | Search for the newly created sales order using the number noted in step 21 | — | The created sales order appears in the list with the expected pricing applied |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP pricing determination correctly applies the tier 2 price when the order quantity is exactly at the tier breakpoint value
- The Net Price field displays the expected tier 2 price amount
- The Net Value is calculated correctly as Order Quantity × Tier 2 Price Amount
- A unique sales order number is generated and displayed in the confirmation message
- The sales order is persisted in SAP with the correct tier 2 pricing applied
- The created sales order appears in the "Sales Orders" list and can be viewed
- No application-level errors or critical warnings remain outstanding

---

### Post-conditions

- SAP Sales Order exists with the generated sales order number
- Sales order pricing reflects the tier 2 price for the order quantity exactly at the tier breakpoint
- Net Value is correctly calculated based on tier 2 pricing
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
