# TC-CS-002: Create Standard PO with Valid Supplier and Multiple Line Items

**User Story:**          [CS-2] Create a New Standard Purchase Order in SAP S/4HANA Cloud
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Standard Purchase Order Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create Purchase Orders (authorization objects: M_BEST_BSA, M_BEST_EKO, M_BEST_EKG, M_BEST_WRK) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Supplier `{TD.supplierId}` exists, is active, and assigned to purchasing organization `{TD.purchasingOrg}` |
| P4 | Master Data | Materials `{TD.materialId}` and `{TD.materialId2}` are created, released, and configured for plant `{TD.plant}` |
| P5 | Configuration | Purchasing Organization `{TD.purchasingOrg}` is active and assigned to company code `{TD.companyCode}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-2/CS-2-testdata.json` — Dataset ID: `TD-CS-002-AP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Supplier ID | `{TD.supplierId}` | Vendor account number — entered by the user | Valid |
| Material ID (Line 1) | `{TD.materialId}` | Material master number for first line item — entered by the user | Valid |
| Order Quantity (Line 1) | `{TD.quantity}` | Numeric quantity for first line item — entered by the user | Valid |
| Material ID (Line 2) | `{TD.materialId2}` | Material master number for second line item — entered by the user | Valid |
| Order Quantity (Line 2) | `{TD.quantity2}` | Numeric quantity for second line item — entered by the user | Valid |
| Net Order Price (both lines) | `{TD.price}` | Price per unit of measure — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Purchasing Org | `{TD.purchasingOrg}` | Purchasing Organisation code — verified in the header | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If a Guided Tour / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page with application tiles is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Manage Purchase Orders" | — | Search results appear listing the Manage Purchase Orders application |
| 8 | Click "Manage Purchase Orders" from the search results | — | Manage Purchase Orders application opens showing the list of existing POs |
| 9 | Click the "Create" button in the application toolbar | — | New Purchase Order creation form opens in edit mode |
| 10 | In the "Supplier:*" header field, enter the Supplier ID | `{TD.supplierId}` | Supplier ID value is entered into the field |
| 11 | Press Enter to confirm the Supplier entry | — | SAP validates the supplier; Supplier name `{TD.supplierName}` is auto-populated; Purchasing Organisation `{TD.purchasingOrg}` and Purchasing Group `{TD.purchasingGroup}` are auto-populated |
| 12 | In the "Items" section, click the "Create" button (below the Items table) for the first line item | — | A new empty line item row appears in the Items table |
| 13 | In the "Material" field of the first line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 14 | Press Enter to confirm the Material entry | — | SAP validates the material; material description is auto-populated; unit of measure is auto-filled |
| 15 | In the "Order Quantity" field, enter the quantity for line item 1 | `{TD.quantity}` | Quantity is populated in the line item |
| 16 | Press Enter to confirm the quantity entry | — | Quantity value is accepted by SAP |
| 17 | In the "Net Order Price" field, enter the price | `{TD.price}` | Price is populated; net total value is calculated and displayed |
| 18 | Press Enter to confirm the price entry | — | Price is confirmed; line item totals are updated |
| 19 | Verify the Plant field on the first line item | `{TD.plant}` | Plant field shows the expected value |
| 20 | If the Plant field is empty, enter the plant code for line item 1 | `{TD.plant}` | Plant code is populated |
| 21 | Create a second line item using Ctrl+Enter keyboard shortcut | — | A new empty line item row appears (note: Items Create button is typically hidden in toolbar overflow after first row) |
| 22 | In the "Material" field of the second line item, enter the Material ID | `{TD.materialId2}` | Material ID is entered into the field |
| 23 | Press Enter to confirm the Material entry | — | SAP validates the material; material description is auto-populated |
| 24 | In the "Order Quantity" field, enter the quantity for line item 2 | `{TD.quantity2}` | Quantity is populated in the second line item |
| 25 | Press Enter to confirm the quantity entry | — | Quantity value is accepted by SAP |
| 26 | In the "Net Order Price" field, enter the price | `{TD.price}` | Price is populated |
| 27 | Press Enter to confirm the price entry | — | Price is confirmed; line item totals are updated |
| 28 | Verify the Plant field on the second line item | `{TD.plant}` | Plant field shows the expected value |
| 29 | If the Plant field is empty, enter the plant code for line item 2 | `{TD.plant}` | Plant code is populated |
| 30 | Click the "Order" button (primary submit action) in the footer toolbar | — | SAP begins processing the document submission |
| 31 | Observe the on-screen confirmation response | — | A success message is displayed; the PO is processed |
| 32 | Navigate back to the Manage Purchase Orders application list | — | Purchase Orders list is displayed |
| 33 | Locate the newly created PO in the list (verify by supplier and material) | — | The created PO appears in the list with status "Sent" or "Open" and contains 2 line items |
| 34 | Note the PO number from the list (first column) | — | PO number is visible (10-digit numeric format) |
| 35 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 36 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 37 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Standard Purchase Order number is generated by SAP and persisted in the system
- The PO contains exactly 2 line items
- Line item 1: Material `{TD.materialId}`, Quantity `{TD.quantity}`, Price `{TD.price}`, Plant `{TD.plant}`
- Line item 2: Material `{TD.materialId2}`, Quantity `{TD.quantity2}`, Price `{TD.price}`, Plant `{TD.plant}`
- The PO is stored with document type "Standard PO" and status "Sent" (or "Open" depending on SAP release configuration)
- The created PO appears in the "Manage Purchase Orders" list with both line items

---

### Post-conditions

- SAP Purchase Order document exists with the generated PO number
- PO status is "Sent" or "Open"
- PO contains 2 line items with correct material, quantity, and price data
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
