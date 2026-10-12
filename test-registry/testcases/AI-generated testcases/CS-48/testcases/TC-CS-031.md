# TC-CS-031: Apply tiered pricing automatically at sales order entry for customer in configured pricing group

**User Story:**          [CS-48] Maintain Tiered Pricing Conditions For A Pharmaceutical Product Based
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Pricing Condition Master — Tiered Pricing Application
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Sales Order Processor with SAP authorization to create sales orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists and is configured for sales |
| P4 | Master Data | Customer `{TD.customerId}` exists, is active, and has Customer Pricing Group `{TD.customerPricingGroup}` assigned |
| P5 | Pricing Condition | A valid pricing condition record exists for Material `{TD.materialId}`, Customer Pricing Group `{TD.customerPricingGroup}`, with multiple pricing tiers (e.g., tier 1: 1-99 units, tier 2: 100-499 units) |
| P6 | Pricing Condition | The pricing condition record is active and within its validity period |

---

### Test Data

**Dataset Reference:** `testdata/CS-48/CS-48-testdata.json` — Dataset ID: `TD-CS-48-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Customer account number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Order quantity matching tier 2 (e.g., 150) — entered by the user | Valid |
| Expected Price Tier 2 | `{TD.expectedPriceTier2}` | Expected price per unit for tier 2 — system should apply this | Valid |
| Sales Organization | `{TD.salesOrg}` | Sales organization code — auto-populated from user context | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — auto-populated from user context | Valid |
| Division | `{TD.division}` | Division code — auto-populated | Valid |

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
| 8 | Click the "Create Sales Order" application from the search results | — | Create Sales Order application opens |
| 9 | In the "Sold-to Party" field, enter the Customer ID | `{TD.customerId}` | Customer ID value is entered into the field |
| 10 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer Name and Pricing Group are auto-populated |
| 11 | Verify the Customer Pricing Group matches the expected group | `{TD.customerPricingGroup}` | Customer Pricing Group field displays the expected value |
| 12 | In the line items section, click the "Add Item" button | — | A new line item row appears |
| 13 | In the "Material" field of the line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 14 | Press Enter to confirm the Material entry | — | SAP validates the material; Material Description is auto-populated |
| 15 | In the "Order Quantity" field, enter the order quantity | `{TD.orderQuantity}` | Order quantity is entered (e.g., 150 units) |
| 16 | Press Enter to confirm the quantity entry | — | SAP triggers pricing determination; line item is recalculated |
| 17 | Navigate to the "Pricing" view or click "Show Pricing Details" for the line item | — | Pricing details screen is displayed |
| 18 | Verify the applied price per unit matches the expected tier 2 price | `{TD.expectedPriceTier2}` | Unit price field displays the tier 2 price (not tier 1 or tier 3) |
| 19 | Verify the applied condition type matches the configured pricing condition | `{TD.conditionType}` | Condition type is listed in the pricing elements with the correct price |
| 20 | Verify the condition record number is displayed in the pricing details | — | Condition record number from the pricing condition master is shown |
| 21 | Verify the validity period of the condition record is displayed | `{TD.validFrom}`, `{TD.validTo}` | Validity dates are shown in the pricing details |
| 22 | Navigate back to the sales order overview | — | Sales order overview is displayed with line item total correctly calculated |
| 23 | Verify the line item net value is calculated as Order Quantity × Tier 2 Price | — | Net value = `{TD.orderQuantity}` × `{TD.expectedPriceTier2}` |
| 24 | Click the "Save" button to save the sales order | — | SAP begins processing the sales order creation |
| 25 | Observe the on-screen confirmation response | — | A success message is displayed containing the generated sales order number |
| 26 | Note the sales order number from the success message | — | Sales order number is displayed |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Sales order is created successfully with the correct tiered pricing applied automatically
- The price per unit for the line item matches the tier 2 price (for order quantity 100-499)
- The condition record and its validity period are displayed on the sales order pricing screen
- Line item net value is correctly calculated based on the applied tier price

---

### Post-conditions

- SAP Sales Order exists with the generated order number
- Line item pricing reflects the automatically applied tier 2 price
- Condition record reference is stored on the sales order line item
- No pricing errors or warnings are logged

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
