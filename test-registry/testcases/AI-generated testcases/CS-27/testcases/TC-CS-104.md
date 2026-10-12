# TC-CS-104: Attempt to create tiered pricing with non-ascending quantity thresholds

**User Story:**          [CS-27] Maintain A Purchasing Contract (Outline Agreement) With Negotiated Pri
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchasing Contract (Outline Agreement) Creation
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
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create purchasing contracts (M_EINK_EKO) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Supplier `{TD.validVendorId}` exists, is active, and approved for purchasing organization `{TD.purchasingOrg}` |
| P4 | Master Data | Material `{TD.validMaterialId}` is created, released, and extended to plant `{TD.plant}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-27/CS-27-testdata.json` — Dataset ID: `TD-CS-027-NEG-006`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Supplier ID | `{TD.validVendorId}` | Approved vendor account number — entered by the user | Valid |
| Material ID | `{TD.validMaterialId}` | API material master number — entered by the user | Valid |
| Target Quantity | `{TD.targetQuantityMultiTier}` | Contract target quantity — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDate}` | Contract start date (today) — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDate}` | Contract end date (future) — entered by the user | Valid |
| Tier 1 Scale Quantity From | `{TD.tier1QuantityFrom}` | First tier starting quantity (e.g., 1) — entered by the user | Valid |
| Tier 1 Net Price | `{TD.tier1NetPrice}` | Negotiated price for tier 1 — entered by the user | Valid |
| Tier 2 Scale Quantity From | `{TD.tier2QuantityInvalid}` | Second tier starting quantity LESS THAN tier 1 (invalid order) — entered by the user | Invalid |
| Tier 2 Net Price | `{TD.tier2NetPrice}` | Negotiated price for tier 2 — entered by the user | Valid |
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
| 16 | In the "Target Quantity" header field, enter the target quantity | `{TD.targetQuantityMultiTier}` | Target quantity is populated |
| 17 | In the "Valid From:*" header field, enter the validity start date | `{TD.validityStartDate}` | Validity start date is entered |
| 18 | In the "Valid To:*" header field, enter the validity end date | `{TD.validityEndDate}` | Validity end date is entered |
| 19 | In the pricing conditions section, in the first row "Scale Quantity" field, enter the tier 1 starting quantity | `{TD.tier1QuantityFrom}` | Tier 1 scale quantity is entered (e.g., 1 or 10) |
| 20 | In the first row "Net Price:*" field, enter the tier 1 net price | `{TD.tier1NetPrice}` | Tier 1 net price is entered |
| 21 | Press Enter to confirm the tier 1 net price entry | — | Tier 1 pricing condition row is saved |
| 22 | Click the "Add" button in the pricing conditions section to add a second tier | — | A new empty pricing condition row appears below the first tier |
| 23 | In the second row "Scale Quantity" field, enter a quantity LESS THAN tier 1 scale quantity | `{TD.tier2QuantityInvalid}` | Tier 2 scale quantity is entered (value is less than `{TD.tier1QuantityFrom}`, violating ascending order) |
| 24 | In the second row "Net Price:*" field, enter the tier 2 net price | `{TD.tier2NetPrice}` | Tier 2 net price is entered |
| 25 | Press Enter to confirm the tier 2 net price entry | — | SAP validates the pricing tier order and displays an error message |
| 26 | Observe the error message content | — | Error message states "Scale quantities must be in ascending order" or "Tier 2 quantity must be greater than Tier 1 quantity" or similar SAP validation message |
| 27 | Verify that the tier 2 "Scale Quantity" field is highlighted with an error indicator | — | Field displays error icon or red border indicating invalid value |
| 28 | Attempt to click the "Save" button in the toolbar | — | SAP blocks the save action due to the pricing tier validation error |
| 29 | Observe that the save operation fails or displays the pricing tier validation error again | — | Error message is displayed; no success message appears; no contract number is generated |
| 30 | Verify that the contract is NOT created | — | No contract document is persisted in SAP |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP validates the pricing tier scale quantities and detects that tier 2 quantity is less than tier 1 quantity (non-ascending order)
- An error message is displayed indicating the pricing tier order is invalid
- The tier 2 "Scale Quantity" field is highlighted with an error indicator
- Contract creation is blocked and the "Save" button does not function
- No contract number is generated
- No contract document is persisted in SAP
- SAP tiered pricing validation is functioning correctly and enforces ascending scale quantity order

---

### Post-conditions

- No SAP Purchasing Contract document is created
- Pricing tier validation has been enforced successfully
- No data corruption or invalid pricing structures remain in the system
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
