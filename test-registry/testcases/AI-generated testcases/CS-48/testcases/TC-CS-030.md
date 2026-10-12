# TC-CS-030: Create multi-tier pricing condition with 3 quantity breakpoints

**User Story:**          [CS-48] Maintain Tiered Pricing Conditions For A Pharmaceutical Product Based
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Pricing Condition Master — Tiered Pricing Maintenance
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

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

**Dataset Reference:** `testdata/CS-48/CS-48-testdata.json` — Dataset ID: `TD-CS-48-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Customer Pricing Group | `{TD.customerPricingGroup}` | Customer pricing group code (KONDA) — entered by the user | Valid |
| Condition Type | `{TD.conditionType}` | Condition type for tiered pricing — entered by the user | Valid |
| Scale Quantity Tier 1 | `{TD.scaleQuantityTier1}` | Minimum quantity for tier 1 (e.g., 1) — entered by the user | Valid |
| Price Amount Tier 1 | `{TD.priceAmountTier1}` | Price per unit for tier 1 — entered by the user | Valid |
| Scale Quantity Tier 2 | `{TD.scaleQuantityTier2}` | Minimum quantity for tier 2 (e.g., 100) — entered by the user | Valid |
| Price Amount Tier 2 | `{TD.priceAmountTier2}` | Price per unit for tier 2 — entered by the user | Valid |
| Scale Quantity Tier 3 | `{TD.scaleQuantityTier3}` | Minimum quantity for tier 3 (e.g., 500) — entered by the user | Valid |
| Price Amount Tier 3 | `{TD.priceAmountTier3}` | Price per unit for tier 3 — entered by the user | Valid |
| Currency | `{TD.currency}` | Currency code for the price amounts — entered by the user | Valid |
| Valid From | `{TD.validFrom}` | Start date for condition record validity — entered by the user | Valid |
| Valid To | `{TD.validTo}` | End date for condition record validity — entered by the user | Valid |

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
| 11 | Press Enter to confirm the Material entry | — | SAP validates the material; Material Description is auto-populated |
| 12 | In the "Customer Pricing Group" field, enter the Customer Pricing Group | `{TD.customerPricingGroup}` | Customer Pricing Group value is entered into the field |
| 13 | Press Enter to confirm the Customer Pricing Group entry | — | SAP validates the customer pricing group; group is accepted |
| 14 | In the "Condition Type" field, enter the Condition Type | `{TD.conditionType}` | Condition Type value is entered into the field |
| 15 | Press Enter to confirm the Condition Type entry | — | SAP validates the condition type; type is accepted |
| 16 | In the "Valid From" field, enter the valid from date | `{TD.validFrom}` | Valid From date is entered |
| 17 | In the "Valid To" field, enter the valid to date | `{TD.validTo}` | Valid To date is entered |
| 18 | In the pricing scales section, click "Add Scale" or "Add Tier" button | — | A new scale tier row appears |
| 19 | In the first tier "Scale Quantity" field, enter tier 1 quantity | `{TD.scaleQuantityTier1}` | Tier 1 scale quantity is entered |
| 20 | In the first tier "Amount" field, enter tier 1 price | `{TD.priceAmountTier1}` | Tier 1 price amount is entered |
| 21 | Press Enter to confirm the tier 1 price entry | — | Tier 1 price is confirmed |
| 22 | Click "Add Scale" or "Add Tier" button to add second tier | — | A second scale tier row appears |
| 23 | In the second tier "Scale Quantity" field, enter tier 2 quantity | `{TD.scaleQuantityTier2}` | Tier 2 scale quantity is entered |
| 24 | In the second tier "Amount" field, enter tier 2 price | `{TD.priceAmountTier2}` | Tier 2 price amount is entered |
| 25 | Press Enter to confirm the tier 2 price entry | — | Tier 2 price is confirmed |
| 26 | Click "Add Scale" or "Add Tier" button to add third tier | — | A third scale tier row appears |
| 27 | In the third tier "Scale Quantity" field, enter tier 3 quantity | `{TD.scaleQuantityTier3}` | Tier 3 scale quantity is entered |
| 28 | In the third tier "Amount" field, enter tier 3 price | `{TD.priceAmountTier3}` | Tier 3 price amount is entered |
| 29 | Press Enter to confirm the tier 3 price entry | — | Tier 3 price is confirmed |
| 30 | Verify all three tiers are displayed in the pricing scales section with correct quantities and prices | `{TD.scaleQuantityTier1}`, `{TD.priceAmountTier1}`, `{TD.scaleQuantityTier2}`, `{TD.priceAmountTier2}`, `{TD.scaleQuantityTier3}`, `{TD.priceAmountTier3}` | All three tiers are visible with correct data |
| 31 | Click the "Save" button in the toolbar | — | SAP begins processing the condition record creation |
| 32 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated condition record number |
| 33 | Note the condition record number from the success message | — | Condition record number is displayed |
| 34 | Navigate back to the condition record list | — | Condition record list is displayed |
| 35 | Search for and open the newly created condition record | — | The condition record opens showing all three pricing tiers |
| 36 | Verify all three pricing tiers are correctly saved | — | All three tiers display with correct scale quantities and price amounts |
| 37 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 38 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 39 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique condition record number is generated by SAP with three pricing tiers configured
- All three tiers are persisted with correct scale quantities (tier 1: 1-99, tier 2: 100-499, tier 3: 500+) and corresponding price amounts
- The condition record is active with the specified validity period
- The multi-tier pricing structure can be viewed and verified in the condition record detail view

---

### Post-conditions

- SAP Pricing Condition Record exists with three pricing tiers
- Each tier has the correct minimum scale quantity and price amount
- Condition record status is "Active"
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
