# TC-CS-094: Create a purchasing contract with multi-tier pricing (three ascending quantity tiers)

**User Story:**          [CS-27] Maintain A Purchasing Contract (Outline Agreement) With Negotiated Pri
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchasing Contract (Outline Agreement) Creation
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
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create purchasing contracts (M_EINK_EKO) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Supplier `{TD.validVendorId}` exists, is active, is approved for purchasing organization `{TD.purchasingOrg}`, and is configured in the source list |
| P4 | Master Data | Material `{TD.validMaterialId}` (API type) is created, released, and extended to plant `{TD.plant}` |
| P5 | Master Data | Source list entry exists for vendor `{TD.validVendorId}` and material `{TD.validMaterialId}` combination for plant `{TD.plant}` |
| P6 | Configuration | Purchasing Organization `{TD.purchasingOrg}` is active and assigned to company code `{TD.companyCode}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-27/CS-27-testdata.json` — Dataset ID: `TD-CS-027-HP-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Supplier ID | `{TD.validVendorId}` | Approved vendor account number — entered by the user | Valid |
| Material ID | `{TD.validMaterialId}` | API material master number — entered by the user | Valid |
| Target Quantity | `{TD.targetQuantityMultiTier}` | Contract target quantity (large enough to span all tiers) — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDate}` | Contract start date (today) — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDate}` | Contract end date (future) — entered by the user | Valid |
| Tier 1 Scale Quantity From | `{TD.tier1QuantityFrom}` | First tier starting quantity (e.g., 1) — entered by the user | Valid |
| Tier 1 Net Price | `{TD.tier1NetPrice}` | Negotiated price for tier 1 — entered by the user | Valid |
| Tier 2 Scale Quantity From | `{TD.tier2QuantityFrom}` | Second tier starting quantity (greater than tier 1) — entered by the user | Valid |
| Tier 2 Net Price | `{TD.tier2NetPrice}` | Negotiated price for tier 2 (typically lower than tier 1) — entered by the user | Valid |
| Tier 3 Scale Quantity From | `{TD.tier3QuantityFrom}` | Third tier starting quantity (greater than tier 2) — entered by the user | Valid |
| Tier 3 Net Price | `{TD.tier3NetPrice}` | Negotiated price for tier 3 (typically lower than tier 2) — entered by the user | Valid |
| Purchasing Org | `{TD.purchasingOrg}` | Purchasing Organization code — verified in the header | Valid |
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
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page with application tiles is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Manage Purchase Contracts" | — | Search results appear listing the "Manage Purchase Contracts" application |
| 8 | Click "Manage Purchase Contracts" from the search results | — | "Manage Purchase Contracts" application opens displaying the contract list view |
| 9 | Click the "Create" button in the application toolbar | — | New contract creation form opens in edit mode |
| 10 | In the "Supplier:*" header field, enter the Supplier ID | `{TD.validVendorId}` | Supplier ID value is entered into the field |
| 11 | Press Enter to confirm the Supplier entry | — | SAP validates the supplier; Supplier name `{TD.supplierName}` is auto-populated in the header |
| 12 | In the "Material:*" item field, enter the Material ID | `{TD.validMaterialId}` | Material ID is entered into the field |
| 13 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` and unit of measure `{TD.uom}` are auto-filled |
| 14 | In the "Plant:*" item field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 15 | Press Enter to confirm the Plant entry | — | Plant value is accepted |
| 16 | In the "Target Quantity" header field, enter the target quantity | `{TD.targetQuantityMultiTier}` | Target quantity is populated with unit of measure `{TD.uom}` |
| 17 | In the "Valid From:*" header field, enter the validity start date | `{TD.validityStartDate}` | Validity start date is entered in the field |
| 18 | In the "Valid To:*" header field, enter the validity end date | `{TD.validityEndDate}` | Validity end date is entered in the field |
| 19 | In the pricing conditions section, in the first row "Scale Quantity" field, enter the tier 1 starting quantity | `{TD.tier1QuantityFrom}` | Tier 1 scale quantity is entered |
| 20 | In the first row "Net Price:*" field, enter the tier 1 net price | `{TD.tier1NetPrice}` | Tier 1 net price is entered with currency `{TD.currency}` displayed |
| 21 | Press Enter to confirm the tier 1 net price entry | — | Tier 1 pricing condition row is saved |
| 22 | Click the "Add" button in the pricing conditions section to add a second tier | — | A new empty pricing condition row appears below the first tier |
| 23 | In the second row "Scale Quantity" field, enter the tier 2 starting quantity | `{TD.tier2QuantityFrom}` | Tier 2 scale quantity is entered (must be greater than tier 1 scale quantity) |
| 24 | In the second row "Net Price:*" field, enter the tier 2 net price | `{TD.tier2NetPrice}` | Tier 2 net price is entered |
| 25 | Press Enter to confirm the tier 2 net price entry | — | Tier 2 pricing condition row is saved |
| 26 | Click the "Add" button in the pricing conditions section to add a third tier | — | A new empty pricing condition row appears below the second tier |
| 27 | In the third row "Scale Quantity" field, enter the tier 3 starting quantity | `{TD.tier3QuantityFrom}` | Tier 3 scale quantity is entered (must be greater than tier 2 scale quantity) |
| 28 | In the third row "Net Price:*" field, enter the tier 3 net price | `{TD.tier3NetPrice}` | Tier 3 net price is entered |
| 29 | Press Enter to confirm the tier 3 net price entry | — | Tier 3 pricing condition row is saved |
| 30 | Verify that all three pricing tiers are displayed with ascending scale quantities | `{TD.tier1QuantityFrom}`, `{TD.tier2QuantityFrom}`, `{TD.tier3QuantityFrom}` | All three tiers are visible with correct scale quantities in ascending order |
| 31 | Click the "Save" button in the toolbar | — | SAP begins processing the contract save operation |
| 32 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated contract number |
| 33 | Note the contract number from the success message | — | Contract number is displayed (format is system-generated) |
| 34 | Verify that all three pricing tiers are saved on the contract | — | Pricing conditions section displays all three tiers with the correct scale quantities and net prices |
| 35 | Navigate back to the "Manage Purchase Contracts" application list | — | Contract list is displayed |
| 36 | Search for the newly created contract using the number noted in step 33 | — | The created contract appears in the list with the expected validity dates and target quantity |
| 37 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 38 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 39 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Purchasing Contract number is generated by SAP and displayed in the confirmation message
- The contract is persisted in SAP with three pricing tiers with ascending scale quantities
- Tier 1 pricing (scale quantity `{TD.tier1QuantityFrom}`, net price `{TD.tier1NetPrice}`) is correctly stored
- Tier 2 pricing (scale quantity `{TD.tier2QuantityFrom}`, net price `{TD.tier2NetPrice}`) is correctly stored
- Tier 3 pricing (scale quantity `{TD.tier3QuantityFrom}`, net price `{TD.tier3NetPrice}`) is correctly stored
- SAP validates that scale quantities are in ascending order (tier 2 > tier 1, tier 3 > tier 2)
- The created contract appears in the "Manage Purchase Contracts" list with all pricing data intact

---

### Post-conditions

- SAP Purchasing Contract document exists with the generated contract number
- Contract status is "Draft" or "Sent" depending on release strategy
- All three pricing tiers are correctly recorded and accessible when viewing the contract
- Tiered pricing structure is ready for use in release order processing
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
