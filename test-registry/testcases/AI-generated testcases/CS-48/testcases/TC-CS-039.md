# TC-CS-039: Attempt to create pricing condition record using invalid customer pricing group

**User Story:**          [CS-48] Maintain Tiered Pricing Conditions For A Pharmaceutical Product Based
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Pricing Condition Master — Customer Pricing Group Validation
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
| P1 | User Role | User has the role of Pricing Analyst with SAP authorization to create and maintain pricing condition records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists in material master, is active, released for sales, and configured for sales organization `{TD.salesOrg}` |
| P4 | Master Data | Customer Pricing Group `{TD.invalidCustomerPricingGroup}` does NOT exist in customer master or is inactive |
| P5 | Configuration | Condition Type `{TD.conditionType}` exists in the pricing procedure and is active for sales organization `{TD.salesOrg}` |
| P6 | Configuration | Sales Organization `{TD.salesOrg}` and Distribution Channel `{TD.distributionChannel}` are assigned to the user profile |

---

### Test Data

**Dataset Reference:** `testdata/CS-48/CS-48-testdata.json` — Dataset ID: `TD-CS-48-011`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Customer Pricing Group | `{TD.invalidCustomerPricingGroup}` | Non-existent or inactive customer pricing group code — entered by the user | Invalid |
| Condition Type | `{TD.conditionType}` | Condition type for tiered pricing — entered by the user | Valid |
| Scale Quantity | `{TD.scaleQuantity}` | Minimum order quantity for the price tier — entered by the user | Valid |
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
| 12 | In the "Customer Pricing Group" field, enter the invalid Customer Pricing Group | `{TD.invalidCustomerPricingGroup}` | Invalid Customer Pricing Group value is entered into the field |
| 13 | Press Enter to confirm the Customer Pricing Group entry | — | SAP attempts to validate the customer pricing group; system detects invalid value |
| 14 | Observe the validation error message | — | An error message is displayed indicating that the customer pricing group is invalid or does not exist |
| 15 | Verify that the Customer Pricing Group field is highlighted or marked as invalid | — | The field is highlighted in red or displays an error indicator |
| 16 | Attempt to continue by entering the Condition Type | `{TD.conditionType}` | Condition Type value may be entered but validation error persists |
| 17 | In the "Scale Quantity" field, enter the scale quantity | `{TD.scaleQuantity}` | Scale Quantity value is entered into the field |
| 18 | In the "Amount" field, enter the price amount | `{TD.priceAmount}` | Price Amount is entered into the field |
| 19 | In the "Valid From" field, enter the valid from date | `{TD.validFrom}` | Valid From date is entered |
| 20 | In the "Valid To" field, enter the valid to date | `{TD.validTo}` | Valid To date is entered |
| 21 | Click the "Save" button in the toolbar | — | SAP attempts to process the condition record creation |
| 22 | Observe the response | — | SAP rejects the save operation; an error message is displayed stating that the customer pricing group is invalid or does not exist |
| 23 | Verify that no condition record number is generated | — | No condition record number appears; the form remains in edit mode |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP rejects the condition record creation due to the invalid customer pricing group
- An error message is displayed indicating that the customer pricing group does not exist or is invalid
- No condition record number is generated
- The condition record is NOT persisted in SAP
- The form remains in edit mode with the validation error visible

---

### Post-conditions

- No new pricing condition record exists in SAP
- The invalid customer pricing group is rejected by the system validation
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
