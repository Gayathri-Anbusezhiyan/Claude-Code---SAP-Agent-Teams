# TC-CS-032: Manually override price within configured tolerance without requiring approval

**User Story:**          [CS-48] Maintain Tiered Pricing Conditions For A Pharmaceutical Product Based
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Pricing Condition Master — Manual Price Override
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Sales Order Processor with SAP authorization to create sales orders and manually override prices within tolerance |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialId}` exists and is configured for sales |
| P4 | Master Data | Customer `{TD.customerId}` exists, is active, and has Customer Pricing Group assigned |
| P5 | Pricing Condition | A valid pricing condition record exists for Material `{TD.materialId}` with list price `{TD.listPrice}` |
| P6 | Configuration | Price tolerance is configured (e.g., 5% allowed deviation) — manual overrides within this tolerance do not require supervisor approval |

---

### Test Data

**Dataset Reference:** `testdata/CS-48/CS-48-testdata.json` — Dataset ID: `TD-CS-48-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Customer account number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Order Quantity | `{TD.orderQuantity}` | Order quantity — entered by the user | Valid |
| List Price | `{TD.listPrice}` | List price from pricing condition — auto-applied by SAP | Valid |
| Manual Override Price | `{TD.manualOverridePriceWithinTolerance}` | Manual override price within tolerance (e.g., 4% deviation) — entered by the user | Valid |
| Tolerance Percent | `{TD.tolerancePercent}` | Configured tolerance percentage (e.g., 5%) | Valid |

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
| 15 | Press Enter to confirm the quantity entry | — | SAP triggers pricing determination; list price `{TD.listPrice}` is applied to the line item |
| 16 | Verify the line item unit price displays the list price | `{TD.listPrice}` | Unit price field shows the list price from the pricing condition |
| 17 | Navigate to the "Pricing" view or click "Show Pricing Details" for the line item | — | Pricing details screen is displayed |
| 18 | Click the "Manual Price Entry" or "Override Price" button/field | — | Manual price entry field becomes editable |
| 19 | In the manual price field, enter the override price within tolerance | `{TD.manualOverridePriceWithinTolerance}` | Override price is entered (e.g., 4% deviation from list price) |
| 20 | Press Enter to confirm the manual price override | — | SAP validates the override price against the tolerance threshold |
| 21 | Verify the system accepts the override price without displaying approval requirement | — | Override price is applied; no approval workflow is triggered; line item price is updated |
| 22 | Verify the line item unit price now displays the override price | `{TD.manualOverridePriceWithinTolerance}` | Unit price field shows the manually overridden price |
| 23 | Navigate back to the sales order overview | — | Sales order overview is displayed with line item total recalculated |
| 24 | Verify the line item net value is calculated using the override price | — | Net value = `{TD.orderQuantity}` × `{TD.manualOverridePriceWithinTolerance}` |
| 25 | Click the "Save" button to save the sales order | — | SAP begins processing the sales order creation |
| 26 | Observe the on-screen confirmation response | — | A success message is displayed containing the generated sales order number; no approval required message is shown |
| 27 | Note the sales order number from the success message | — | Sales order number is displayed |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Sales order is created successfully with manually overridden price within tolerance
- The manual price override is accepted without requiring supervisor approval
- Line item net value is calculated using the overridden price (not the list price)
- No approval workflow is triggered

---

### Post-conditions

- SAP Sales Order exists with the generated order number
- Line item pricing reflects the manually overridden price
- No approval request is pending
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
