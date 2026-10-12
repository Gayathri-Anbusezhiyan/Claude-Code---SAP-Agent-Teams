# TC-CS-055: Attempt to create pricing condition record with Valid To date equal to Valid From date (invalid period)

**User Story:**          [CS-48] Maintain Tiered Pricing Conditions For A Pharmaceutical Product Based
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Pricing Condition Master — Validity Period Boundary Validation
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
| P7 | Test Condition | Valid To date will be intentionally set equal to Valid From date to test invalid period validation |

---

### Test Data

**Dataset Reference:** `testdata/CS-48/CS-48-testdata.json` — Dataset ID: `TD-CS-48-027`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Customer Pricing Group | `{TD.customerPricingGroup}` | Customer pricing group code (KONDA) — entered by the user | Valid |
| Condition Type | `{TD.conditionType}` | Condition type for tiered pricing — entered by the user | Valid |
| Scale Quantity | `{TD.scaleQuantity}` | Minimum order quantity for the price tier — entered by the user | Valid |
| Price Amount | `{TD.priceAmount}` | Price per unit for the tier — entered by the user | Valid |
| Currency | `{TD.currency}` | Currency code for the price amount — entered by the user | Valid |
| Valid From | `{TD.validFrom}` | Start date for condition record validity — entered by the user | Valid |
| Valid To | `{TD.validToEqualValidFrom}` | End date equal to Valid From date (invalid period) — entered by the user | Invalid |
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
| 17 | In the "Scale Quantity" field, enter the scale quantity | `{TD.scaleQuantity}` | Scale Quantity value is entered into the field |
| 18 | In the "Amount" field, enter the price amount | `{TD.priceAmount}` | Price Amount is entered into the field |
| 19 | Press Enter to confirm the price entry | — | Price is confirmed; currency field is auto-populated |
| 20 | Verify the "Currency" field displays the expected currency code | `{TD.currency}` | Currency field shows the expected currency code |
| 21 | In the "Valid From" field, enter the valid from date | `{TD.validFrom}` | Valid From date is entered |
| 22 | In the "Valid To" field, enter the same date as Valid From | `{TD.validToEqualValidFrom}` | Valid To date is entered with the same value as Valid From date |
| 23 | Click the "Save" button in the toolbar | — | SAP attempts to process the condition record creation |
| 24 | Observe the validation error response | — | SAP rejects the save operation; an error message is displayed indicating that Valid To date must be later than Valid From date or that the validity period is invalid |
| 25 | Verify that the Valid To date field is highlighted or marked as invalid | — | The Valid To date field is highlighted in red or displays an error indicator |
| 26 | Verify that no condition record number is generated | — | No condition record number appears; the form remains in edit mode |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP rejects the condition record creation due to the invalid validity period (Valid To date equals Valid From date)
- An error message is displayed indicating that Valid To date must be later than Valid From date or that the validity period is invalid
- The Valid To date field is highlighted or marked with an error indicator
- No condition record number is generated
- The condition record is NOT persisted in SAP
- The form remains in edit mode with the validation error visible

---

### Post-conditions

- No new pricing condition record exists in SAP
- The validity period date range validation is enforced by the system
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
