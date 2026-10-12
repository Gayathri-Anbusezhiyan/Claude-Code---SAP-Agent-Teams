# TC-CS-035: Create condition with indefinite validity period

**User Story:**          [CS-48] Maintain Tiered Pricing Conditions For A Pharmaceutical Product Based
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Pricing Condition Master — Indefinite Validity
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
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
| P4 | Master Data | Customer Pricing Group `{TD.customerPricingGroup}` is valid in customer master |
| P5 | Configuration | Condition Type `{TD.conditionType}` exists in the pricing procedure and is active |

---

### Test Data

**Dataset Reference:** `testdata/CS-48/CS-48-testdata.json` — Dataset ID: `TD-CS-48-007`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Customer Pricing Group | `{TD.customerPricingGroup}` | Customer pricing group code (KONDA) — entered by the user | Valid |
| Condition Type | `{TD.conditionType}` | Condition type for tiered pricing — entered by the user | Valid |
| Scale Quantity | `{TD.scaleQuantity}` | Minimum order quantity for the price tier — entered by the user | Valid |
| Price Amount | `{TD.priceAmount}` | Price per unit for the tier — entered by the user | Valid |
| Currency | `{TD.currency}` | Currency code for the price amount — entered by the user | Valid |
| Valid From | `{TD.validFrom}` | Start date for condition record validity — entered by the user | Valid |
| Valid To Indefinite | `{TD.validToIndefinite}` | Indefinite end date (9999-12-31) — entered by the user | Valid |

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
| 8 | Click the "Manage Pricing Conditions" application from the search results | — | Manage Pricing Conditions application opens |
| 9 | Click the "Create" button in the application toolbar | — | New condition record creation form opens in edit mode |
| 10 | In the "Material" field, enter the Material ID | `{TD.materialId}` | Material ID value is entered into the field |
| 11 | Press Enter to confirm the Material entry | — | SAP validates the material; Material Description is auto-populated |
| 12 | In the "Customer Pricing Group" field, enter the Customer Pricing Group | `{TD.customerPricingGroup}` | Customer Pricing Group value is entered into the field |
| 13 | Press Enter to confirm the Customer Pricing Group entry | — | SAP validates the customer pricing group; group is accepted |
| 14 | In the "Condition Type" field, enter the Condition Type | `{TD.conditionType}` | Condition Type value is entered into the field |
| 15 | Press Enter to confirm the Condition Type entry | — | SAP validates the condition type; type is accepted |
| 16 | In the "Scale Quantity" field, enter the scale quantity | `{TD.scaleQuantity}` | Scale Quantity value is entered into the field |
| 17 | In the "Amount" field, enter the price amount | `{TD.priceAmount}` | Price Amount is entered into the field |
| 18 | Press Enter to confirm the price entry | — | Price is confirmed |
| 19 | In the "Valid From" field, enter the valid from date | `{TD.validFrom}` | Valid From date is entered |
| 20 | In the "Valid To" field, enter the indefinite end date | `{TD.validToIndefinite}` | Valid To date is entered as 9999-12-31 (indefinite validity) |
| 21 | Verify the Valid To field displays the indefinite date | `{TD.validToIndefinite}` | Valid To field shows 9999-12-31 |
| 22 | Click the "Save" button in the toolbar | — | SAP begins processing the condition record creation |
| 23 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated condition record number |
| 24 | Note the condition record number from the success message | — | Condition record number is displayed |
| 25 | Navigate back to the condition record list | — | Condition record list is displayed |
| 26 | Search for and open the newly created condition record | — | The condition record opens |
| 27 | Verify the Valid To date is displayed as 9999-12-31 (indefinite) | `{TD.validToIndefinite}` | Valid To field confirms indefinite validity |
| 28 | Verify the condition record is flagged as having indefinite validity (if applicable) | — | UI indicates indefinite validity (e.g., "No expiry date" or similar indicator) |
| 29 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 30 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 31 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique condition record number is generated with indefinite validity (Valid To = 9999-12-31)
- The condition record is persisted in SAP and will remain active indefinitely unless manually changed
- The condition record does not appear in expiry alert filters (since it has no realistic expiry date)

---

### Post-conditions

- SAP Pricing Condition Record exists with indefinite validity period
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
