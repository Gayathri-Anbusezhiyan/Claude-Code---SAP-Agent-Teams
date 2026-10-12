# TC-CS-058: Attempt sales order with manual price override just above tolerance threshold

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
| P1 | User Role | User has the role of Sales Order Processor with SAP authorization to create sales orders but WITHOUT supervisor approval authorization for price overrides beyond tolerance |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to Customer Pricing Group `{TD.customerPricingGroup}` |
| P4 | Master Data | Material `{TD.materialId}` exists in material master, is active, released for sales, and configured for sales organization `{TD.salesOrg}` |
| P5 | Configuration | A valid pricing condition record exists for Material `{TD.materialId}` and Customer Pricing Group `{TD.customerPricingGroup}` with Price Amount `{TD.priceAmount}` |
| P6 | Configuration | Manual price override tolerance is configured in the system (e.g., maximum 5.00% deviation); overrides beyond tolerance require supervisor approval |
| P7 | Configuration | Sales Organization `{TD.salesOrg}` and Distribution Channel `{TD.distributionChannel}` are assigned to the user profile |

---

### Test Data

**Dataset Reference:** `testdata/CS-48/CS-48-testdata.json` — Dataset ID: `TD-CS-48-030`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Customer account number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Quantity to order — entered by the user | Valid |
| Price Amount | `{TD.priceAmount}` | Standard price from condition record — reference only | Valid |
| Manual Override Price Above Threshold | `{TD.manualOverridePriceAboveThreshold}` | Manually entered price just above tolerance threshold (e.g., 5.01% deviation) — entered by the user | Invalid |
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
| 19 | Enter the manual override price just above the tolerance threshold | `{TD.manualOverridePriceAboveThreshold}` | Manual override price just above threshold (e.g., 5.01% deviation) is entered into the Net Price field |
| 20 | Press Enter to confirm the manual price entry | — | SAP calculates the deviation percentage and detects that it exceeds the configured tolerance limit |
| 21 | Observe any validation warning or error message | — | A warning or error message is displayed indicating that the price deviation exceeds the allowed tolerance and requires supervisor approval |
| 22 | Attempt to save the sales order by clicking the "Save" button | — | SAP attempts to save the sales order |
| 23 | Observe the system response | — | SAP rejects the save operation with an error stating that the manual price override exceeds tolerance and requires supervisor authorization |
| 24 | Verify that no sales order number is generated | — | No sales order number appears; the form remains in edit mode with the validation error visible |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects that the manual price override exceeds the configured tolerance threshold (e.g., 5.01% deviation)
- A validation error or warning message is displayed indicating that supervisor approval is required for the price deviation
- The sales order save operation is rejected due to insufficient authorization for the price override beyond tolerance
- No sales order number is generated
- The sales order is NOT persisted in SAP
- The form remains in edit mode with the validation error visible

---

### Post-conditions

- No new sales order exists in SAP
- The manual price override beyond tolerance is rejected by the system validation due to lack of supervisor approval
- No application-level errors or critical warnings remain outstanding after sign-out

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
