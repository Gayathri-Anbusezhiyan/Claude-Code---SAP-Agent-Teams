# TC-CS-093: Create a valid purchasing contract with single-tier pricing and valid vendor-material combination

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
| P7 | Configuration | Number range for contract document type (MK) is configured and active |

---

### Test Data

**Dataset Reference:** `testdata/CS-27/CS-27-testdata.json` — Dataset ID: `TD-CS-027-HP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Supplier ID | `{TD.validVendorId}` | Approved vendor account number — entered by the user | Valid |
| Material ID | `{TD.validMaterialId}` | API material master number — entered by the user | Valid |
| Target Quantity | `{TD.targetQuantity}` | Contract target quantity — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDate}` | Contract start date (today) — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDate}` | Contract end date (future) — entered by the user | Valid |
| Net Price | `{TD.netPrice}` | Negotiated price per unit of measure — entered by the user | Valid |
| Purchasing Org | `{TD.purchasingOrg}` | Purchasing Organization code — verified in the header | Valid |
| Purchasing Group | `{TD.purchasingGroup}` | Purchasing Group code — verified in the header | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Alert Lead Time | `{TD.alertLeadTime}` | Number of days before expiration to trigger alert — entered by the user | Valid |

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
| 9 | Click the "Create" button in the application toolbar | — | New contract creation form opens in edit mode with header and item sections visible |
| 10 | In the "Supplier:*" header field, enter the Supplier ID | `{TD.validVendorId}` | Supplier ID value is entered into the field |
| 11 | Press Enter to confirm the Supplier entry | — | SAP validates the supplier; Supplier name `{TD.supplierName}` is auto-populated in the header |
| 12 | Verify that Purchasing Organisation and Purchasing Group fields are populated | `{TD.purchasingOrg}`, `{TD.purchasingGroup}` | Organizational fields show the expected values (auto-defaulted from supplier/user profile) |
| 13 | In the "Material:*" item field, enter the Material ID | `{TD.validMaterialId}` | Material ID is entered into the field |
| 14 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is auto-populated; unit of measure `{TD.uom}` is auto-filled |
| 15 | In the "Plant:*" item field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 16 | Press Enter to confirm the Plant entry | — | Plant value is accepted; company code `{TD.companyCode}` may be auto-populated in the header |
| 17 | In the "Target Quantity" header field, enter the target quantity | `{TD.targetQuantity}` | Target quantity is populated in the header with unit of measure `{TD.uom}` |
| 18 | In the "Valid From:*" header field, enter the validity start date | `{TD.validityStartDate}` | Validity start date is entered in the field |
| 19 | In the "Valid To:*" header field, enter the validity end date | `{TD.validityEndDate}` | Validity end date is entered in the field (must be after Valid From date) |
| 20 | In the "Scale Quantity" pricing condition field (first tier), enter the starting quantity | `{TD.tier1QuantityFrom}` | Scale quantity is entered (typically 0 or 1 for first tier) |
| 21 | In the "Net Price:*" pricing condition field (first tier), enter the negotiated price | `{TD.netPrice}` | Net price is entered with currency `{TD.currency}` displayed |
| 22 | Press Enter to confirm the Net Price entry | — | Price is confirmed; pricing condition row is saved |
| 23 | In the "Reminder Days" field (alert configuration), enter the alert lead time | `{TD.alertLeadTime}` | Alert lead time (number of days before expiration) is entered |
| 24 | Click the "Save" button in the toolbar | — | SAP begins processing the contract save operation |
| 25 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated contract number |
| 26 | Note the contract number from the success message or the top-left header area | — | Contract number is displayed (format is system-generated, typically 10-digit beginning with 45 or 46) |
| 27 | Verify the contract status in the header | — | Contract status shows "Draft" or "Sent" depending on release strategy configuration |
| 28 | Navigate back to the "Manage Purchase Contracts" application list | — | Contract list is displayed |
| 29 | Search for the newly created contract using the number noted in step 26 | — | The created contract appears in the list with the expected validity dates and target quantity |
| 30 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 31 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 32 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Purchasing Contract number is generated by SAP and displayed in the confirmation message
- The contract is persisted in SAP with document type "Contract" (MK) and status "Draft" or "Sent"
- All header data (Supplier, Purchasing Org, Company Code, Target Quantity, Validity Period, Alert Lead Time) is correctly stored
- All item data (Material, Plant) is correctly stored
- Pricing condition (single tier) with scale quantity and net price is correctly stored
- The created contract appears in the "Manage Purchase Contracts" list and can be viewed

---

### Post-conditions

- SAP Purchasing Contract document exists with the generated contract number
- Contract status is "Draft" or "Sent" depending on release strategy
- Supplier, material, target quantity, validity dates, and pricing data are correctly recorded
- Alert trigger date is calculated as Validity End Date minus Alert Lead Time days
- Source list entry for vendor-material combination is consistent with the contract
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
