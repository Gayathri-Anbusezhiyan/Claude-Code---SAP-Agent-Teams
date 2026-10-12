# TC-CS-038: Attempt to create condition for non-existent material

**User Story:**          [CS-48] Maintain Tiered Pricing Conditions For A Pharmaceutical Product Based
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Pricing Condition Master — Material Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Pricing Analyst with SAP authorization to create and maintain pricing condition records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.invalidMaterialId}` does NOT exist in the material master (confirmed non-existent) |
| P4 | Master Data | Customer Pricing Group `{TD.customerPricingGroup}` is valid in customer master |
| P5 | Configuration | Condition Type `{TD.conditionType}` exists in the pricing procedure and is active |

---

### Test Data

**Dataset Reference:** `testdata/CS-48/CS-48-testdata.json` — Dataset ID: `TD-CS-48-010`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Invalid Material ID | `{TD.invalidMaterialId}` | Non-existent material master number — entered by the user | Invalid |
| Customer Pricing Group | `{TD.customerPricingGroup}` | Customer pricing group code (KONDA) — entered by the user | Valid |
| Condition Type | `{TD.conditionType}` | Condition type for tiered pricing — entered by the user | Valid |
| Scale Quantity | `{TD.scaleQuantity}` | Minimum order quantity for the price tier — entered by the user | Valid |
| Price Amount | `{TD.priceAmount}` | Price per unit for the tier — entered by the user | Valid |

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
| 10 | In the "Material" field, enter the invalid Material ID | `{TD.invalidMaterialId}` | Invalid Material ID value is entered into the field |
| 11 | Press Enter to confirm the Material entry | — | SAP validates the material entry |
| 12 | Verify the system displays an error message indicating the material does not exist | — | Error message is displayed: "Material does not exist" or "Material {TD.invalidMaterialId} not found" |
| 13 | Verify the Material field is highlighted or flagged as having an error | — | Material field displays error indicator (e.g., red border, error icon) |
| 14 | Verify the remaining form fields are not accessible or the form cannot proceed | — | Form is blocked or other fields cannot be filled until the material error is resolved |
| 15 | Attempt to enter data in other fields (Customer Pricing Group, Condition Type) | `{TD.customerPricingGroup}`, `{TD.conditionType}` | Fields may not be accessible, or if accessible, form still cannot be saved due to material error |
| 16 | Verify the "Save" button is disabled or clicking it triggers a validation error | — | Save button is disabled, or clicking it displays error message preventing save |
| 17 | Verify no condition record is created in SAP | — | Condition record creation is blocked; no record number is generated |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects that the Material ID does not exist in the material master
- An error message is displayed indicating the material does not exist
- The condition record creation form is blocked and cannot be saved
- No condition record is created in SAP

---

### Post-conditions

- No condition record is created
- Error message is displayed to the user
- No data integrity issues are introduced

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
