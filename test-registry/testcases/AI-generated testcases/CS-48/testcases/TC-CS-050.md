# TC-CS-050: Create pricing condition record with minimum quantity tier boundary (quantity = 1)

**User Story:**          [CS-48] Maintain Tiered Pricing Conditions For A Pharmaceutical Product Based
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Pricing Condition Master — Boundary Value Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Pricing Analyst with SAP authorization to create and maintain pricing condition records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists in material master, is active, released for sales, and configured for sales organization `{TD.salesOrg}` |
| P4 | Master Data | Customer Pricing Group `{TD.customerPricingGroup}` is valid in customer master and assigned to distribution channel `{TD.distributionChannel}` |
| P5 | Configuration | Condition Type `{TD.conditionType}` exists in the pricing procedure and is active for sales organization `{TD.salesOrg}` |
| P6 | Configuration | Sales Organization `{TD.salesOrg}` and Distribution Channel `{TD.distributionChannel}` are assigned to the user profile |

---

### Test Data

**Dataset Reference:** `testdata/CS-48/CS-48-testdata.json` — Dataset ID: `TD-CS-48-022`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Customer Pricing Group | `{TD.customerPricingGroup}` | Customer pricing group code (KONDA) — entered by the user | Valid |
| Condition Type | `{TD.conditionType}` | Condition type for tiered pricing — entered by the user | Valid |
| Scale Quantity | `{TD.minScaleQuantity}` | Minimum valid quantity tier boundary (value = 1) — entered by the user | Valid |
| Price Amount | `{TD.priceAmount}` | Price per unit for the tier — entered by the user | Valid |
| Currency | `{TD.currency}` | Currency code for the price amount — entered by the user | Valid |
| Valid From | `{TD.validFrom}` | Start date for condition record validity — entered by the user | Valid |
| Valid To | `{TD.validTo}` | End date for condition record validity — entered by the user | Valid |
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
| 7 | Click the search icon (top-right shell bar) and type "Manage Pricing Conditions" | — | Search results appear listing the "Manage Pricing Conditions" application |
| 8 | Click the "Manage Pricing Conditions" application from the search results | — | Manage Pricing Conditions application opens with a list of existing condition records |
| 9 | Click the "Create" button in the application toolbar | — | New condition record creation form opens in edit mode |
| 10 | In the "Material" field, enter the Material ID | `{TD.materialId}` | Material ID value is entered into the field |
| 11 | Press Enter to confirm the Material entry | — | SAP validates the material; Material Description `{TD.materialDescription}` is auto-populated; Base UoM `{TD.baseUom}` is auto-filled |
| 12 | In the "Customer Pricing Group" field, enter the Customer Pricing Group | `{TD.customerPricingGroup}` | Customer Pricing Group value is entered into the field |
| 13 | Press Enter to confirm the Customer Pricing Group entry | — | SAP validates the customer pricing group; group is accepted |
| 14 | In the "Condition Type" field, enter the Condition Type | `{TD.conditionType}` | Condition Type value is entered into the field |
| 15 | Press Enter to confirm the Condition Type entry | — | SAP validates the condition type; type is accepted |
| 16 | Verify that Sales Organization and Distribution Channel fields are populated | `{TD.salesOrg}`, `{TD.distributionChannel}` | Organizational fields show the expected values (auto-populated from user profile) |
| 17 | In the "Scale Quantity" field, enter the minimum scale quantity value of 1 | `{TD.minScaleQuantity}` | Scale Quantity value of 1 is entered into the field |
| 18 | In the "Amount" field, enter the price amount | `{TD.priceAmount}` | Price Amount is entered into the field |
| 19 | Press Enter to confirm the price entry | — | Price is confirmed; currency field is auto-populated |
| 20 | Verify the "Currency" field displays the expected currency code | `{TD.currency}` | Currency field shows the expected currency code |
| 21 | In the "Valid From" field, enter the valid from date | `{TD.validFrom}` | Valid From date is entered |
| 22 | In the "Valid To" field, enter the valid to date | `{TD.validTo}` | Valid To date is entered |
| 23 | Click the "Save" button in the toolbar | — | SAP begins processing the condition record creation |
| 24 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated condition record number |
| 25 | Note the condition record number from the success message | — | Condition record number is displayed (format is system-generated) |
| 26 | Navigate back to the condition record list | — | Condition record list is displayed |
| 27 | Search for the newly created condition record using the number noted in step 25 | — | The created condition record appears in the list with Scale Quantity = 1 and the expected validity period |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique condition record number is generated by SAP and displayed in the confirmation message
- The condition record is persisted in SAP with Scale Quantity = 1 (minimum valid boundary value)
- All header data (Material, Customer Pricing Group, Condition Type, Scale Quantity, Price Amount, Currency, Valid From, Valid To) is correctly stored
- The condition record validity period is active and matches the entered dates
- The created condition record appears in the "Manage Pricing Conditions" list and can be viewed
- No application-level errors or critical warnings remain outstanding

---

### Post-conditions

- SAP Pricing Condition Record exists with the generated condition record number
- Condition record status is "Active" with validity period from `{TD.validFrom}` to `{TD.validTo}`
- Scale Quantity is correctly recorded as 1 (minimum valid boundary)
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
