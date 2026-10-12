# TC-CS-121: Create release order with quantity exactly equal to remaining contract quantity

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
| P6 | Contract Prerequisite | A valid purchasing contract exists (created in TC-CS-113 or similar) with Target Quantity = 10 and Remaining Quantity = 10 |

---

### Test Data

**Dataset Reference:** `testdata/CS-27/CS-27-testdata.json` — Dataset ID: `TD-CS-027-EDGE-009`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Contract Number | `{TD.contractNumber}` | Existing contract number from prerequisite test — entered by the user | Valid |
| Supplier ID | `{TD.validVendorId}` | Approved vendor account number — entered by the user | Valid |
| Material ID | `{TD.validMaterialId}` | API material master number — entered by the user | Valid |
| Release Quantity | `{TD.exactRemainingQuantity}` | Release order quantity = Remaining Target Quantity (exact match) — entered by the user | Valid (Boundary) |
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
| 12 | Verify "Target Quantity" field shows original value (e.g., 10) | — | Target Quantity = 10 (or as per prerequisite) |
| 13 | Verify "Remaining Target Quantity" field shows full value (e.g., 10) | — | Remaining Target Quantity = 10 (no releases yet) |
| 14 | Navigate back or open a new browser tab | — | Ready to create release order |
| 15 | Search for "Manage Purchase Orders" in search bar | — | Search results appear |
| 16 | Click "Manage Purchase Orders" in the search results | — | The "Manage Purchase Orders" Fiori app opens |
| 17 | Click "Create PO" button | — | Purchase order creation form opens |
| 18 | In the "Supplier" field, enter Supplier ID | `{TD.validVendorId}` | Supplier ID is entered |
| 19 | Press Enter | — | Supplier name auto-populates |
| 20 | In "Contract" or "Outline Agreement" field, enter contract number | `{TD.contractNumber}` | Contract number is entered |
| 21 | Press Enter | — | Contract is validated; material and pricing are pulled from contract |
| 22 | In the "Material" field, verify material auto-populated from contract | — | Material ID is displayed (auto-filled from contract) |
| 23 | In the "Plant" field, enter Plant code | `{TD.plant}` | Plant code is entered |
| 24 | Press Enter | — | Plant is validated |
| 25 | In the "Order Quantity" field, enter quantity EXACTLY equal to Remaining Target Quantity | `{TD.exactRemainingQuantity}` | Quantity (e.g., 10) is entered — exact match to remaining contract quantity |
| 26 | Press Enter | — | Quantity is validated; no warning message (exact match is allowed) |
| 27 | Verify pricing is pulled from contract | — | Net price and currency are auto-filled from contract pricing tier |
| 28 | Click "Order" button on footer toolbar | — | SAP validates and creates purchase order; success message appears (e.g., "Purchase Order XXXXXXXXXX created") |
| 29 | Observe the success message and capture the PO number | — | PO number (e.g., 4500000010) is displayed |
| 30 | Navigate back to "Manage Purchase Contracts" app | — | Contract list or search page is displayed |
| 31 | Open the same contract again | `{TD.contractNumber}` | Contract details page opens |
| 32 | Verify "Remaining Target Quantity" field now shows 0 | — | Remaining Target Quantity = 0 (full contract quantity consumed) |
| 33 | Verify "Cumulative Released Quantity" field shows Target Quantity value | — | Cumulative Released Quantity = Target Quantity (e.g., 10) |
| 34 | Verify contract status (may change to "Completed" or remain "Active" with 0 remaining) | — | Contract status reflects full consumption |
| 35 | Click the User Profile icon in the top-right shell bar | — | User profile menu appears |
| 36 | Click "Sign Out" in the menu | — | Sign-out confirmation dialog appears |
| 37 | Click "OK" to confirm | — | User is signed out; login page is displayed |

---

### Expected Final Result

- SAP accepts release order quantity exactly equal to remaining contract quantity (no over-commitment)
- Release order (Purchase Order) is created successfully with PO number generated
- Contract's Remaining Target Quantity is updated to 0 (full consumption)
- Cumulative Released Quantity matches Target Quantity (exact match)
- No warning or error message for exact match scenario
- Contract status may change to "Completed" or show 0 remaining quantity
- Boundary test validates SAP's handling of exact remaining quantity match (no under/over-commitment)

---

### Post-conditions

- A valid purchase order (release order) exists referencing the contract
- Contract's Remaining Target Quantity = 0 (fully consumed)
- Contract cannot accept further release orders (0 remaining)
- Test validates SAP's handling of exact remaining quantity boundary

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
