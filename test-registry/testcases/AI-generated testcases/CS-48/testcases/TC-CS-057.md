# TC-CS-057: Verify sales order with manual price override at exact tolerance threshold

**User Story:**          [CS-48] Maintain Tiered Pricing Conditions For A Pharmaceutical Product Based
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Pricing Condition Master — Manual Price Override Tolerance Boundary
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
| P1 | User Role | User has the role of Sales Order Processor with SAP authorization to create sales orders and perform manual price overrides within tolerance |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to Customer Pricing Group `{TD.customerPricingGroup}` |
| P4 | Master Data | Material `{TD.materialId}` exists in material master, is active, released for sales, and configured for sales organization `{TD.salesOrg}` |
| P5 | Configuration | A valid pricing condition record exists for Material `{TD.materialId}` and Customer Pricing Group `{TD.customerPricingGroup}` with Price Amount `{TD.priceAmount}` |
| P6 | Configuration | Manual price override tolerance is configured in the system (e.g., maximum 5.00% deviation); overrides at or below tolerance are allowed without supervisor approval |
| P7 | Configuration | Sales Organization `{TD.salesOrg}` and Distribution Channel `{TD.distributionChannel}` are assigned to the user profile |

---

### Test Data

**Dataset Reference:** `testdata/CS-48/CS-48-testdata.json` — Dataset ID: `TD-CS-48-029`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Customer account number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Quantity to order — entered by the user | Valid |
| Price Amount | `{TD.priceAmount}` | Standard price from condition record — reference only | Valid |
| Manual Override Price At Threshold | `{TD.manualOverridePriceAtThreshold}` | Manually entered price at exact tolerance threshold (e.g., 5.00% deviation) — entered by the user | Valid |
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
| 15 | In the "Order Quantity" field, enter the quantity | `{TD.orderQuantity}` | Quantity is populated in the line item |
| 16 | Press Enter to confirm the quantity entry | — | SAP applies pricing determination; standard price `{TD.priceAmount}` is auto-populated based on the condition record |
| 17 | Verify that the Net Price field displays the standard price | `{TD.priceAmount}` | Net Price field shows the expected standard price from the condition record |
| 18 | Click the Net Price field to enable manual override | — | Net Price field becomes editable for manual entry |
| 19 | Enter the manual override price at the exact tolerance threshold | `{TD.manualOverridePriceAtThreshold}` | Manual override price at exact threshold (e.g., 5.00% deviation) is entered into the Net Price field |
| 20 | Press Enter to confirm the manual price entry | — | SAP calculates the deviation percentage and determines that it is exactly at the configured tolerance limit |
| 21 | Observe any validation warning or informational message | — | SAP may display an informational message indicating that the price override is at the tolerance threshold, but no error is displayed |
| 22 | Verify that the manual override is accepted | — | The manual price override is accepted; Net Price field displays the overridden price; Net Value is recalculated |
| 23 | Click the "Save" button to save the sales order | — | SAP processes the sales order save operation |
| 24 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated sales order number |
| 25 | Note the sales order number from the success message | — | Sales order number is displayed (format is system-generated) |
| 26 | Navigate back to the sales order list | — | Sales order list is displayed |
| 27 | Search for the newly created sales order using the number noted in step 25 | — | The created sales order appears in the list with the manual price override at the tolerance threshold applied |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP accepts the manual price override when the deviation is exactly at the configured tolerance threshold (e.g., 5.00%)
- No error message is displayed; an informational message may appear indicating that the override is at the tolerance limit
- The manual override price is applied to the sales order line item
- Net Value is recalculated correctly based on the overridden price
- A unique sales order number is generated and displayed in the confirmation message
- The sales order is persisted in SAP with the manual price override correctly recorded
- The created sales order appears in the "Sales Orders" list and can be viewed
- No application-level errors or critical warnings remain outstanding

---

### Post-conditions

- SAP Sales Order exists with the generated sales order number
- Sales order pricing reflects the manual override price at the exact tolerance threshold
- Net Value is correctly calculated based on the overridden price
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
