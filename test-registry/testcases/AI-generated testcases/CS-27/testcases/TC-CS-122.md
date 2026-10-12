# TC-CS-122: Create release order with value exactly equal to remaining contract value

**User Story:**          [CS-27] Maintain A Purchasing Contract (Outline Agreement) With Negotiated Pri
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchasing Contract Release Order Processing
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE
**Priority:**            HIGH
**Severity:**            MEDIUM
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create purchasing contracts (M_EINK_EKO) and purchase orders (M_EINK_EKG) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Supplier `{TD.validVendorId}` exists, is active, and approved for purchasing organization `{TD.purchasingOrg}` |
| P4 | Master Data | Material `{TD.validMaterialId}` is created, released, and extended to plant `{TD.plant}` |
| P5 | Master Data | Vendor-material combination is present in source list (table EINA/EINE) for plant `{TD.plant}` |
| P6 | Contract Prerequisite | A valid purchasing contract exists (created in TC-CS-115 or similar) with Target Value = 100.00 USD and Remaining Value = 100.00 USD |

---

### Test Data

**Dataset Reference:** `testdata/CS-27/CS-27-testdata.json` — Dataset ID: `TD-CS-027-EDGE-010`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Contract Number | `{TD.contractNumber}` | Existing contract number from prerequisite test — entered by the user | Valid |
| Supplier ID | `{TD.validVendorId}` | Approved vendor account number — entered by the user | Valid |
| Material ID | `{TD.validMaterialId}` | API material master number — entered by the user | Valid |
| Release Quantity | `{TD.releaseQuantityForExactValue}` | Release order quantity calculated to match Remaining Target Value exactly — entered by the user | Valid (Boundary) |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Purchasing Organization | Auto-populated from contract/supplier | SAP auto-fills from master data | Valid |
| Purchasing Group | Auto-populated from contract/supplier | SAP auto-fills from master data | Valid |
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
| 10 | Locate the contract created in prerequisite test | `{TD.contractNumber}` | Contract is visible in list (filter by contract number if needed) |
| 11 | Click the contract number to open contract details | — | Contract details page opens |
| 12 | Verify "Target Value" field shows original value (e.g., 100.00 USD) | — | Target Value = 100.00 USD (or as per prerequisite) |
| 13 | Verify "Remaining Target Value" field shows full value (e.g., 100.00 USD) | — | Remaining Target Value = 100.00 USD (no releases yet) |
| 14 | Note the Net Price from pricing tier (e.g., 10.00 USD per unit) | — | Net Price is visible (used to calculate release quantity) |
| 15 | Calculate release quantity: Remaining Value ÷ Net Price (e.g., 100.00 ÷ 10.00 = 10 units) | — | Calculation: quantity = 10 units to match exact remaining value |
| 16 | Navigate back or open a new browser tab | — | Ready to create release order |
| 17 | Search for "Manage Purchase Orders" in search bar | — | Search results appear |
| 18 | Click "Manage Purchase Orders" in the search results | — | The "Manage Purchase Orders" Fiori app opens |
| 19 | Click "Create PO" button | — | Purchase order creation form opens |
| 20 | In the "Supplier" field, enter Supplier ID | `{TD.validVendorId}` | Supplier ID is entered |
| 21 | Press Enter | — | Supplier name auto-populates |
| 22 | In "Contract" or "Outline Agreement" field, enter contract number | `{TD.contractNumber}` | Contract number is entered |
| 23 | Press Enter | — | Contract is validated; material and pricing are pulled from contract |
| 24 | In the "Material" field, verify material auto-populated from contract | — | Material ID is displayed (auto-filled from contract) |
| 25 | In the "Plant" field, enter Plant code | `{TD.plant}` | Plant code is entered |
| 26 | Press Enter | — | Plant is validated |
| 27 | In the "Order Quantity" field, enter calculated quantity to match Remaining Target Value exactly | `{TD.releaseQuantityForExactValue}` | Quantity (e.g., 10) is entered — calculated to match exact remaining contract value |
| 28 | Press Enter | — | Quantity is validated; SAP calculates total value (Quantity × Net Price) |
| 29 | Verify calculated PO value equals Remaining Target Value (e.g., 10 units × 10.00 USD = 100.00 USD) | — | PO total value = 100.00 USD (exact match to remaining contract value) |
| 30 | Verify no warning message appears (exact match is allowed) | — | No warning or error message |
| 31 | Click "Order" button on footer toolbar | — | SAP validates and creates purchase order; success message appears (e.g., "Purchase Order XXXXXXXXXX created") |
| 32 | Observe the success message and capture the PO number | — | PO number (e.g., 4500000011) is displayed |
| 33 | Navigate back to "Manage Purchase Contracts" app | — | Contract list or search page is displayed |
| 34 | Open the same contract again | `{TD.contractNumber}` | Contract details page opens |
| 35 | Verify "Remaining Target Value" field now shows 0.00 | — | Remaining Target Value = 0.00 (full contract value consumed) |
| 36 | Verify "Cumulative Released Value" field shows Target Value | — | Cumulative Released Value = Target Value (e.g., 100.00 USD) |
| 37 | Verify contract status (may change to "Completed" or remain "Active" with 0 remaining) | — | Contract status reflects full consumption |
| 38 | Click the User Profile icon in the top-right shell bar | — | User profile menu appears |
| 39 | Click "Sign Out" in the menu | — | Sign-out confirmation dialog appears |
| 40 | Click "OK" to confirm | — | User is signed out; login page is displayed |

---

### Expected Final Result

- SAP accepts release order value exactly equal to remaining contract value (no over-commitment)
- Release order (Purchase Order) is created successfully with PO number generated
- PO total value matches Remaining Target Value exactly (boundary test: exact value match)
- Contract's Remaining Target Value is updated to 0.00 (full consumption)
- Cumulative Released Value matches Target Value (exact match)
- No warning or error message for exact match scenario
- Contract status may change to "Completed" or show 0 remaining value
- Boundary test validates SAP's handling of exact remaining value match (no under/over-commitment)

---

### Post-conditions

- A valid purchase order (release order) exists referencing the contract
- Contract's Remaining Target Value = 0.00 (fully consumed)
- Contract cannot accept further release orders (0 remaining value)
- Test validates SAP's handling of exact remaining value boundary

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
