# TC-CS-097: Create a purchasing contract using Target Value instead of Target Quantity

**User Story:**          [CS-27] Maintain A Purchasing Contract (Outline Agreement) With Negotiated Pri
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchasing Contract (Outline Agreement) Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create purchasing contracts (M_EINK_EKO) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Supplier `{TD.validVendorId}` exists, is active, and approved for purchasing organization `{TD.purchasingOrg}` |
| P4 | Master Data | Material `{TD.validMaterialId}` is created, released, and extended to plant `{TD.plant}` |
| P5 | Master Data | Source list entry exists for vendor `{TD.validVendorId}` and material `{TD.validMaterialId}` combination |
| P6 | Configuration | Purchasing Organization `{TD.purchasingOrg}` is active and assigned to company code `{TD.companyCode}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-27/CS-27-testdata.json` — Dataset ID: `TD-CS-027-AP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Supplier ID | `{TD.validVendorId}` | Approved vendor account number — entered by the user | Valid |
| Material ID | `{TD.validMaterialId}` | API material master number — entered by the user | Valid |
| Target Value | `{TD.targetValue}` | Contract target value in currency (instead of quantity) — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDate}` | Contract start date (today) — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDate}` | Contract end date (future) — entered by the user | Valid |
| Net Price | `{TD.netPrice}` | Negotiated price per unit of measure — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Manage Purchase Contracts" | — | Search results appear listing the "Manage Purchase Contracts" application |
| 8 | Click "Manage Purchase Contracts" from the search results | — | "Manage Purchase Contracts" application opens |
| 9 | Click the "Create" button in the application toolbar | — | New contract creation form opens in edit mode |
| 10 | In the "Supplier:*" header field, enter the Supplier ID | `{TD.validVendorId}` | Supplier ID value is entered into the field |
| 11 | Press Enter to confirm the Supplier entry | — | SAP validates the supplier; Supplier name `{TD.supplierName}` is auto-populated |
| 12 | In the "Material:*" item field, enter the Material ID | `{TD.validMaterialId}` | Material ID is entered into the field |
| 13 | Press Enter to confirm the Material entry | — | SAP validates the material; material description and unit of measure are auto-filled |
| 14 | In the "Plant:*" item field, enter the Plant code | `{TD.plant}` | Plant code is entered |
| 15 | Press Enter to confirm the Plant entry | — | Plant is accepted |
| 16 | In the "Target Value" header field (instead of Target Quantity), enter the target value | `{TD.targetValue}` | Target value is populated with currency `{TD.currency}` displayed |
| 17 | Verify that the "Target Quantity" field is left blank | — | Target Quantity field is empty (only Target Value is specified) |
| 18 | In the "Valid From:*" header field, enter the validity start date | `{TD.validityStartDate}` | Validity start date is entered |
| 19 | In the "Valid To:*" header field, enter the validity end date | `{TD.validityEndDate}` | Validity end date is entered |
| 20 | In the "Scale Quantity" pricing condition field, enter the starting quantity | `{TD.tier1QuantityFrom}` | Scale quantity is entered |
| 21 | In the "Net Price:*" pricing condition field, enter the negotiated price | `{TD.netPrice}` | Net price is entered with currency displayed |
| 22 | Press Enter to confirm the Net Price entry | — | Pricing condition is saved |
| 23 | Click the "Save" button in the toolbar | — | SAP processes the contract save operation |
| 24 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated contract number |
| 25 | Note the contract number from the success message | — | Contract number is displayed |
| 26 | Verify that the contract header displays "Target Value" with the specified value | `{TD.targetValue}` | Target Value is correctly stored and displayed with currency |
| 27 | Verify that the "Target Quantity" field is blank or shows zero | — | Target Quantity is not specified (only Target Value is active) |
| 28 | Navigate back to the "Manage Purchase Contracts" application list | — | Contract list is displayed |
| 29 | Search for the newly created contract using the number noted in step 25 | — | The created contract appears in the list with Target Value displayed |
| 30 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 31 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 32 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Purchasing Contract number is generated by SAP and displayed in the confirmation message
- The contract is persisted in SAP with Target Value specified (instead of Target Quantity)
- Target Value `{TD.targetValue}` in currency `{TD.currency}` is correctly stored
- Target Quantity field is blank or zero (not mandatory when Target Value is specified)
- SAP accepts contracts with Target Value only as a valid alternative to Target Quantity
- Release order tracking will track cumulative value instead of quantity
- The created contract appears in the "Manage Purchase Contracts" list with Target Value data

---

### Post-conditions

- SAP Purchasing Contract document exists with the generated contract number
- Contract status is "Draft" or "Sent" depending on release strategy
- Target Value is correctly recorded; Target Quantity is blank or zero
- Contract is ready for release order creation with value-based tracking
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
