# TC-CS-041: Attempt to apply expired pricing condition record at sales order entry

**User Story:**          [CS-48] Maintain Tiered Pricing Conditions For A Pharmaceutical Product Based
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Pricing Condition Master — Condition Record Validity Validation
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
| P1 | User Role | User has the role of Sales Order Processor with SAP authorization to create sales orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Customer `{TD.customerId}` exists, is active, and assigned to Customer Pricing Group `{TD.customerPricingGroup}` |
| P4 | Master Data | Material `{TD.materialId}` exists in material master, is active, released for sales, and configured for sales organization `{TD.salesOrg}` |
| P5 | Configuration | A pricing condition record exists for Material `{TD.materialId}` and Customer Pricing Group `{TD.customerPricingGroup}` but with validity period that has expired (Valid To date is in the past) |
| P6 | Configuration | Sales Organization `{TD.salesOrg}` and Distribution Channel `{TD.distributionChannel}` are assigned to the user profile |

---

### Test Data

**Dataset Reference:** `testdata/CS-48/CS-48-testdata.json` — Dataset ID: `TD-CS-48-013`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Customer account number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Quantity to order — entered by the user | Valid |
| Customer Pricing Group | `{TD.customerPricingGroup}` | Customer pricing group code assigned to the customer — auto-populated by SAP | Valid |
| Expired Valid To Date | `{TD.expiredValidToDate}` | Validity end date of the expired condition record (past date) — reference only | Invalid |
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
| 16 | Press Enter to confirm the quantity entry | — | SAP attempts pricing determination for the material and customer pricing group combination |
| 17 | Observe the pricing result or error message | — | SAP displays a pricing error or warning message indicating that the pricing condition record has expired or is no longer valid |
| 18 | Verify that the Net Value field remains empty or shows zero | — | Net Value field is empty or displays 0.00; no price is applied to the line item |
| 19 | Attempt to save the sales order by clicking the "Save" button | — | SAP attempts to save the sales order |
| 20 | Observe the system response | — | SAP may reject the save operation with an error stating that pricing is incomplete or expired, or may allow save with a warning but the order cannot be processed further |
| 21 | Note any error or warning messages displayed | — | Error or warning message indicates that the pricing condition record is expired or no longer valid for the order date |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP pricing determination identifies that the condition record for the material and customer pricing group has expired
- A pricing error or warning message is displayed indicating that the condition record is no longer valid
- The Net Value field on the sales order line item remains empty or displays zero
- The sales order is either rejected on save or saved with an incomplete pricing status that blocks further processing
- No valid sales order with complete pricing is created

---

### Post-conditions

- No valid sales order with complete pricing exists in SAP (order may exist in incomplete/error status if system allowed partial save)
- The pricing determination log shows that the condition record was found but is expired based on the order date
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
