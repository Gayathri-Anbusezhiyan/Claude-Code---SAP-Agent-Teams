# TC-CS-120: Create a contract with Alert Lead Time = 365 days (maximum boundary)

**User Story:**          [CS-27] Maintain A Purchasing Contract (Outline Agreement) With Negotiated Pri
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchasing Contract (Outline Agreement) Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE
**Priority:**            MEDIUM
**Severity:**            LOW
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
| P5 | Master Data | Vendor-material combination is present in source list (table EINA/EINE) for plant `{TD.plant}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-27/CS-27-testdata.json` — Dataset ID: `TD-CS-027-EDGE-008`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Supplier ID | `{TD.validVendorId}` | Approved vendor account number — entered by the user | Valid |
| Material ID | `{TD.validMaterialId}` | API material master number — entered by the user | Valid |
| Target Quantity | `{TD.targetQuantity}` | Contract target quantity — entered by the user | Valid |
| Validity Start Date | `{TD.validityStartDate}` | Contract start date — entered by the user | Valid |
| Validity End Date | `{TD.longValidityEndDate}` | Contract end date (at least 365+ days from start) — entered by the user | Valid |
| Net Price | `{TD.netPrice}` | Negotiated price per unit — entered by the user | Valid |
| Alert Lead Time | `{TD.maxAlertLeadTime}` | Maximum alert lead time = 365 days — entered by the user | Valid (Boundary) |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Purchasing Organization | Auto-populated from supplier | SAP auto-fills from vendor master data | Valid |
| Purchasing Group | Auto-populated from supplier | SAP auto-fills from vendor master data | Valid |
| Company Code | Auto-populated from purchasing org | SAP auto-fills from organizational structure | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed |
| 2 | Enter the user email address in the "Email" field | `{ENV.SAP_USERNAME}` | Email is entered in the field |
| 3 | Click the "Continue" button | — | Password entry screen is displayed |
| 4 | Enter the password in the "Password" field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | Fiori Launchpad home page loads successfully |
| 6 | If an Introduction pop-up appears, close it by clicking the close button or "Leave Tour" | — | Pop-up is dismissed; Launchpad is visible |
| 7 | Click the search icon in the top-right corner of the shell | — | Search bar appears |
| 8 | Type "Manage Purchase Contracts" in the search bar | — | Search results list appears showing the app |
| 9 | Click "Manage Purchase Contracts" in the search results | — | The "Manage Purchase Contracts" Fiori app opens, displaying the contract list view |
| 10 | Click the "Create" button on the toolbar | — | Contract creation form opens with empty fields |
| 11 | In the "Supplier:*" field, enter the Supplier ID | `{TD.validVendorId}` | Supplier ID is entered |
| 12 | Press Enter or tab out of the field | — | Supplier name auto-populates; Purchasing Organization and Purchasing Group auto-populate |
| 13 | In the "Material:*" field, enter the Material ID | `{TD.validMaterialId}` | Material ID is entered |
| 14 | Press Enter or tab out of the field | — | Material description, unit of measure (UoM) auto-populate |
| 15 | In the "Plant:*" field, enter the Plant code | `{TD.plant}` | Plant code is entered |
| 16 | Press Enter or tab out of the field | — | Plant is validated; Company Code auto-populates |
| 17 | In the "Target Quantity" field, enter quantity | `{TD.targetQuantity}` | Quantity is entered |
| 18 | In the "Valid From:*" field, enter start date | `{TD.validityStartDate}` | Start date is entered (e.g., 2026-08-24) |
| 19 | In the "Valid To:*" field, enter end date (at least 365+ days from start) | `{TD.longValidityEndDate}` | End date is entered (e.g., 2028-08-24 or later) |
| 20 | Press Enter or tab out of the date field | — | Validity period is validated (end date > start date; sufficient for 365-day alert) |
| 21 | Navigate to the "Alert Lead Time" or similar field (may be in Additional Data or Settings section) | — | Alert Lead Time field is visible |
| 22 | In the "Alert Lead Time" field, enter 365 days | `{TD.maxAlertLeadTime}` | Alert Lead Time = 365 is entered |
| 23 | Press Enter or tab out of the field | — | Value is accepted (alert will trigger 365 days before expiration) |
| 24 | Navigate to the "Pricing Conditions" or "Conditions" section | — | Pricing section is visible |
| 25 | In the first pricing tier row, in "Scale Quantity" field, enter starting quantity | `{TD.tier1QuantityFrom}` | Scale quantity is entered (e.g., 0 or 1) |
| 26 | In the "Net Price:*" field of the first tier, enter the negotiated price | `{TD.netPrice}` | Net price is entered |
| 27 | Press Enter or tab out of the field | — | Price is validated; currency auto-populated |
| 28 | Click the "Save" button on the footer toolbar | — | SAP validates all inputs; success message appears (e.g., "Contract XXXXXXXXXX created successfully") |
| 29 | Observe the success message and capture the contract number | — | Contract number (e.g., 5500000008) is displayed in the message |
| 30 | Verify contract details are visible in the form (contract number in header, all fields populated) | — | Contract header shows contract number; all entered data is displayed correctly |
| 31 | Verify "Alert Lead Time" field shows value = 365 days | — | Alert Lead Time = 365 is displayed |
| 32 | Verify contract is saved with maximum expiration alert lead time configured | — | Alert will be triggered 365 days before expiration (boundary test: maximum alert window) |
| 33 | Click the User Profile icon in the top-right shell bar | — | User profile menu appears |
| 34 | Click "Sign Out" in the menu | — | Sign-out confirmation dialog appears |
| 35 | Click "OK" to confirm | — | User is signed out; login page is displayed |

---

### Expected Final Result

- SAP accepts Alert Lead Time = 365 days as a valid boundary value (maximum expiration alert window)
- Contract is created successfully with contract number generated
- All mandatory fields are validated and accepted
- Supplier-material-source list validation passes
- Organizational data (Purchasing Org, Purchasing Group, Company Code) auto-populates correctly from master data
- Contract details are saved with Alert Lead Time = 365 days
- Expiration alert will be triggered 365 days before contract end date (maximum alert window)
- Maximum alert lead time boundary (365) is correctly handled by SAP validation logic

---

### Post-conditions

- A valid purchasing contract exists in the SAP system with Alert Lead Time = 365 days (maximum boundary)
- Contract number is available for reference
- Contract is in active status
- Test validates SAP's handling of maximum alert lead time boundary (365 days = maximum alert window)

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
