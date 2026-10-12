# TC-CS-033: System displays condition record with validity period on sales order pricing screen

**User Story:**          [CS-48] Maintain Tiered Pricing Conditions For A Pharmaceutical Product Based
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Pricing Condition Master — Validity Period Display
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Sales Order Processor with SAP authorization to create sales orders and view pricing details |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists and is configured for sales |
| P4 | Master Data | Customer `{TD.customerId}` exists, is active, and has Customer Pricing Group assigned |
| P5 | Pricing Condition | A valid pricing condition record exists for Material `{TD.materialId}` with validity period `{TD.validFrom}` to `{TD.validTo}` |
| P6 | Pricing Condition | The pricing condition record is active and within its validity period |

---

### Test Data

**Dataset Reference:** `testdata/CS-48/CS-48-testdata.json` — Dataset ID: `TD-CS-48-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Customer account number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Order quantity — entered by the user | Valid |
| Condition Record Number | `{TD.conditionRecordNumber}` | Condition record number — displayed by SAP | Valid |
| Valid From | `{TD.validFrom}` | Start date of condition record validity — displayed by SAP | Valid |
| Valid To | `{TD.validTo}` | End date of condition record validity — displayed by SAP | Valid |

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
| 10 | Press Enter to confirm the Customer entry | — | SAP validates the customer; Customer Name is auto-populated |
| 11 | In the line items section, click the "Add Item" button | — | A new line item row appears |
| 12 | In the "Material" field of the line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 13 | Press Enter to confirm the Material entry | — | SAP validates the material; Material Description is auto-populated |
| 14 | In the "Order Quantity" field, enter the order quantity | `{TD.orderQuantity}` | Order quantity is entered |
| 15 | Press Enter to confirm the quantity entry | — | SAP triggers pricing determination; price is applied to the line item |
| 16 | Navigate to the "Pricing" view or click "Show Pricing Details" for the line item | — | Pricing details screen is displayed |
| 17 | Verify the pricing elements table displays the applied condition type | `{TD.conditionType}` | Condition type is listed in the pricing elements |
| 18 | Verify the condition record number is displayed in the pricing details | `{TD.conditionRecordNumber}` | Condition record number is shown in the pricing elements or condition record column |
| 19 | Verify the "Valid From" date is displayed for the condition record | `{TD.validFrom}` | Valid From date is shown in the pricing details |
| 20 | Verify the "Valid To" date is displayed for the condition record | `{TD.validTo}` | Valid To date is shown in the pricing details |
| 21 | Verify the validity period is clearly visible and indicates the condition record is currently active | — | Validity period dates confirm the condition record is active (current date is between Valid From and Valid To) |
| 22 | Note the displayed condition record number and validity dates | — | All information is clearly visible and matches the expected condition record |
| 23 | Navigate back to the sales order overview | — | Sales order overview is displayed |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The applicable condition record number is displayed on the sales order pricing screen
- The validity period (Valid From and Valid To dates) is clearly shown
- All pricing details confirm that the condition record is active and within its validity period

---

### Post-conditions

- Sales order pricing screen displays complete condition record information including validity dates
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
