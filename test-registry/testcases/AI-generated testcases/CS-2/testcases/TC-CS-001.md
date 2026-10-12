# TC-CS-001: Create Standard PO with Valid Supplier and Single Line Item

**User Story:**          [CS-2] Create a New Standard Purchase Order in SAP S/4HANA Cloud
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Standard Purchase Order Creation
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
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create Purchase Orders (authorization objects: M_BEST_BSA, M_BEST_EKO, M_BEST_EKG, M_BEST_WRK) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Supplier `{TD.supplierId}` exists, is active, and assigned to purchasing organization `{TD.purchasingOrg}` |
| P4 | Master Data | Material `{TD.materialId}` is created, released, and configured for plant `{TD.plant}` |
| P5 | Configuration | Purchasing Organization `{TD.purchasingOrg}` is active and assigned to company code `{TD.companyCode}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-2/CS-2-testdata.json` — Dataset ID: `TD-CS-002-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Supplier ID | `{TD.supplierId}` | Vendor account number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Material master number — entered by the user | Valid |
| Order Quantity | `{TD.quantity}` | Numeric quantity to order — entered by the user | Valid |
| Net Order Price | `{TD.price}` | Price per unit of measure — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Purchasing Org | `{TD.purchasingOrg}` | Purchasing Organisation code — verified in the header | Valid |
| Delivery Date | `{TD.deliveryDate}` | Delivery date — entered if not auto-defaulted by SAP | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Purchase Orders" | — | Search results appear listing the Manage Purchase Orders application |
| 8 | Click "Manage Purchase Orders" from the search results | — | Manage Purchase Orders application opens showing the list of existing POs |
| 9 | Click the "Create" button in the application toolbar | — | New Purchase Order creation form opens in edit mode |
| 10 | In the "Supplier:*" header field, enter the Supplier ID | `{TD.supplierId}` | Supplier ID value is entered into the field |
| 11 | Press Enter to confirm the Supplier entry | — | SAP validates the supplier; Supplier name `{TD.supplierName}` is auto-populated in the header; Purchasing Organisation `{TD.purchasingOrg}` and Purchasing Group `{TD.purchasingGroup}` are auto-populated |
| 12 | Verify that Purchasing Organisation and Purchasing Group fields are populated | `{TD.purchasingOrg}`, `{TD.purchasingGroup}` | Organisational fields show the expected values (auto-defaulted from supplier master) |
| 13 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 14 | In the "Material" field of the new line item, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 15 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is auto-populated; unit of measure `{TD.uom}` is auto-filled; material group `{TD.materialGroup}` is populated |
| 16 | In the "Order Quantity" field, enter the quantity | `{TD.quantity}` | Quantity is populated in the line item |
| 17 | Press Enter to confirm the quantity entry | — | Quantity value is accepted by SAP |
| 18 | In the "Net Order Price" field, enter the price | `{TD.price}` | Price is populated; net total value is calculated and displayed |
| 19 | Press Enter to confirm the price entry | — | Price is confirmed; line item totals are updated; currency `{TD.currency}` is displayed |
| 20 | Verify the Plant field on the line item | `{TD.plant}` | Plant field shows the expected value (manually entered or auto-defaulted) |
| 21 | If the Plant field is empty, enter the plant code | `{TD.plant}` | Plant code is populated |
| 22 | If the Delivery Date field is empty, enter the delivery date; otherwise note the SAP-defaulted value | `{TD.deliveryDate}` | Delivery date field is populated with a future date |
| 23 | Click the "Order" button (primary submit action) in the footer toolbar | — | SAP begins processing the document submission |
| 24 | Observe the on-screen confirmation response | — | A success message is displayed (note: per known defect CS-6, the message does NOT contain the PO number) |
| 25 | Navigate back to the Manage Purchase Orders application list | — | Purchase Orders list is displayed |
| 26 | Locate the newly created PO in the list (verify by supplier and material) | — | The created PO appears in the list with status "Sent" or "Open" |
| 27 | Note the PO number from the list (first column) | — | PO number is visible (10-digit numeric format, typically begins with 45) |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Standard Purchase Order number is generated by SAP and persisted in the system
- The PO is stored with document type "Standard PO" and status "Sent" (or "Open" depending on SAP release configuration)
- All header data (Supplier `{TD.supplierId}`, Purchasing Org `{TD.purchasingOrg}`, Company Code `{TD.companyCode}`) is correctly stored
- All line item data (Material `{TD.materialId}`, Quantity `{TD.quantity}`, Price `{TD.price}`, Plant `{TD.plant}`) is correctly stored
- The created PO appears in the "Manage Purchase Orders" list and can be viewed

---

### Post-conditions

- SAP Purchase Order document exists with the generated PO number
- PO status is "Sent" or "Open"
- Supplier, material, quantity, and price data are correctly recorded on the PO
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
