# TC-CS-203: Create Subcontracting PO with Multiple Components

**User Story:**          [CS-24] Create A Subcontracting Purchase Order For Outsourced Fill-Finish Manu
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Subcontracting Purchase Order Creation with Multiple Components
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create subcontracting purchase orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | CMO Supplier `{TD.cmoSupplierId}` exists, is active, has subcontracting indicator enabled, and is assigned to purchasing organization `{TD.purchasingOrg}` |
| P4 | Master Data | Finished material `{TD.finishedMaterialId}` is created, released, configured with item category "L" (Subcontracting), and configured for plant `{TD.plant}` |
| P5 | Master Data | BOM for finished material `{TD.finishedMaterialId}` in plant `{TD.plant}` contains multiple components: `{TD.componentMaterial1Id}`, `{TD.componentMaterial2Id}`, and optionally `{TD.componentMaterial3Id}` |
| P6 | Configuration | Purchasing Organization `{TD.purchasingOrg}` is active and assigned to company code `{TD.companyCode}` |
| P7 | Configuration | Plant `{TD.plant}` is configured for subcontracting procurement and special stock type "O" (stock provided to vendor) |

---

### Test Data

**Dataset Reference:** `testdata/CS-24/CS-24-testdata.json` — Dataset ID: `TD-CS-24-AP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| CMO Supplier ID | `{TD.cmoSupplierId}` | Contract Manufacturing Organization vendor account number with subcontracting indicator — entered by the user | Valid |
| Finished Material ID | `{TD.finishedMaterialId}` | Finished product material number with item category "L" — entered by the user | Valid |
| Component Material 1 ID | `{TD.componentMaterial1Id}` | First component material number from BOM — auto-populated by SAP | Valid |
| Component Material 2 ID | `{TD.componentMaterial2Id}` | Second component material number from BOM — auto-populated by SAP | Valid |
| Component Material 3 ID | `{TD.componentMaterial3Id}` | Third component material number from BOM (if applicable) — auto-populated by SAP | Valid |
| Order Quantity | `{TD.quantity}` | Numeric quantity of finished product to order — entered by the user | Valid |
| Net Order Price | `{TD.price}` | Price per unit of measure for finished product — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Purchasing Org | `{TD.purchasingOrg}` | Purchasing Organisation code — auto-populated from user profile | Valid |
| Delivery Date | `{TD.deliveryDate}` | Expected delivery date for finished product — entered by the user | Valid |
| Item Category | `{TD.itemCategory}` | Item Category "L" for Subcontracting — selected by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Purchase Order" | — | Search results appear listing the "Create Purchase Order" application |
| 8 | Click "Create Purchase Order" from the search results | — | Create Purchase Order application opens |
| 9 | Click the "Create" button in the application toolbar | — | New purchase order creation form opens in edit mode |
| 10 | In the "Supplier:*" header field, enter the CMO Supplier ID | `{TD.cmoSupplierId}` | CMO Supplier ID value is entered into the field |
| 11 | Press Enter to confirm the Supplier entry | — | SAP validates the supplier; Supplier name `{TD.cmoSupplierName}` is auto-populated in the header |
| 12 | Verify that Purchasing Organisation and Purchasing Group fields are populated | `{TD.purchasingOrg}`, `{TD.purchasingGroup}` | Organisational fields show the expected values (auto-defaulted from user profile or supplier master) |
| 13 | Verify that Company Code field is populated | `{TD.companyCode}` | Company Code is auto-populated based on purchasing organization |
| 14 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 15 | In the "Material" field of the new line item, enter the Finished Material ID | `{TD.finishedMaterialId}` | Finished Material ID is entered into the field |
| 16 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.finishedMaterialDesc}` is auto-populated; unit of measure `{TD.uom}` is auto-filled |
| 17 | In the "Item Category" dropdown field, select Item Category | `{TD.itemCategory}` | Item Category "L" (Subcontracting) is selected |
| 18 | Press Enter to confirm the Item Category selection | — | Item Category is confirmed; SAP triggers BOM explosion to populate component list |
| 19 | In the "Plant" field of the line item, enter the plant code | `{TD.plant}` | Plant code is entered into the field |
| 20 | Press Enter to confirm the Plant entry | — | Plant is confirmed; component list is populated from the BOM for the material-plant combination |
| 21 | Verify that the component table (sub-items) displays multiple component materials | — | Component sub-table is displayed below the main line item |
| 22 | Verify that the first component material appears in the component list | `{TD.componentMaterial1Id}`, `{TD.componentMaterial1Desc}`, `{TD.componentQuantity1}` | First component material ID, description, and calculated quantity appear in the component sub-table |
| 23 | Verify that the second component material appears in the component list | `{TD.componentMaterial2Id}`, `{TD.componentMaterial2Desc}`, `{TD.componentQuantity2}` | Second component material ID, description, and calculated quantity appear in the component sub-table |
| 24 | Verify that the third component material appears in the component list (if applicable) | `{TD.componentMaterial3Id}`, `{TD.componentMaterial3Desc}`, `{TD.componentQuantity3}` | Third component material ID, description, and calculated quantity appear in the component sub-table (if BOM contains 3+ components) |
| 25 | Verify that the Special Stock Indicator field shows "O" (stock provided to vendor) | Special Stock Indicator: "O" | Special stock indicator "O" is auto-set for subcontracting line item |
| 26 | In the "Order Quantity" field, enter the quantity | `{TD.quantity}` | Quantity is populated in the line item |
| 27 | Press Enter to confirm the quantity entry | — | Component quantities are recalculated based on the BOM ratio and order quantity |
| 28 | Verify that all component quantities have been updated based on the new order quantity | Updated quantities for all components | Component quantities reflect the BOM ratio multiplied by the order quantity |
| 29 | In the "Net Order Price" field, enter the price | `{TD.price}` | Price is populated; net total value is calculated and displayed |
| 30 | Press Enter to confirm the price entry | — | Price is confirmed; line item totals are updated |
| 31 | In the "Delivery Date" field, enter the delivery date | `{TD.deliveryDate}` | Delivery date field is populated with a future date |
| 32 | Press Enter to confirm the delivery date entry | — | Delivery date is confirmed |
| 33 | Click the "Order" button (primary submit action) in the toolbar | — | SAP begins processing the purchase order submission |
| 34 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated subcontracting PO number |
| 35 | Note the PO number from the success message or the top-left header area | — | Subcontracting PO number is displayed (format is system-generated, typically 10-digit numeric) |
| 36 | Navigate back to the "Manage Purchase Orders" application via the search bar | — | Manage Purchase Orders application opens |
| 37 | Search for the newly created PO using the number noted in step 35 | — | The created subcontracting PO appears in the list |
| 38 | Click the PO number to open the PO details | — | PO details page opens displaying header and item data |
| 39 | Verify the Item Category field on the line item | Item Category: "L" | Item Category "L" (Subcontracting) is displayed |
| 40 | Verify the Special Stock Indicator field | Special Stock Indicator: "O" | Special stock indicator "O" is displayed |
| 41 | Verify that the component list is displayed with all component materials and correct quantities | All components with correct quantities | All component materials from BOM are correctly stored with calculated quantities |
| 42 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 43 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 44 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Subcontracting Purchase Order number is generated by SAP and displayed in the confirmation message
- The PO is persisted in SAP with item category "L" (Subcontracting) and special stock indicator "O" (stock provided to vendor)
- All header data (CMO Supplier, Purchasing Org, Company Code) is correctly stored
- All line item data (Finished Material, Quantity, Price, Plant, Item Category) is correctly stored
- Component list from BOM is correctly populated and stored with multiple components (`{TD.componentMaterial1Id}`, `{TD.componentMaterial2Id}`, and optionally `{TD.componentMaterial3Id}`)
- Component quantities are correctly calculated based on BOM ratios and order quantity
- The created subcontracting PO appears in the "Manage Purchase Orders" list and can be viewed

---

### Post-conditions

- SAP Subcontracting Purchase Order document exists with the generated PO number
- PO item has item category "L" and special stock indicator "O"
- Multiple components are stored and linked to the PO line item
- Component quantities are correctly calculated per BOM
- PO status is "Open" or "Sent" depending on release strategy configuration
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
