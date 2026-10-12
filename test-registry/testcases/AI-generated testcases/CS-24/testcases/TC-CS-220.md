# TC-CS-220: Attempt to Create Subcontracting PO with Component Quantity Override to Zero

**User Story:**          [CS-24] Create A Subcontracting Purchase Order For Outsourced Fill-Finish Manu
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Subcontracting Purchase Order Creation - Boundary Value Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create subcontracting purchase orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | CMO Supplier `{TD.cmoSupplierId}` exists, is active, has subcontracting indicator enabled, and is assigned to purchasing organization `{TD.purchasingOrg}` |
| P4 | Master Data | Finished material `{TD.finishedMaterialId}` is created, released, configured with item category "L" (Subcontracting), and configured for plant `{TD.plant}` |
| P5 | Master Data | Component material `{TD.componentMaterialId}` exists in the BOM for finished material `{TD.finishedMaterialId}` in plant `{TD.plant}` |
| P6 | Configuration | Purchasing Organization `{TD.purchasingOrg}` is active and assigned to company code `{TD.companyCode}` |
| P7 | Configuration | Plant `{TD.plant}` is configured for subcontracting procurement and special stock type "O" (stock provided to vendor) |
| P8 | Boundary Condition | Test validates that manually overriding component quantity to zero (if allowed) is invalid and rejected by SAP, or that component quantity field is read-only and cannot be manually changed |

---

### Test Data

**Dataset Reference:** `testdata/CS-24/CS-24-testdata.json` — Dataset ID: `TD-CS-24-EDGE-006`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| CMO Supplier ID | `{TD.cmoSupplierId}` | Contract Manufacturing Organization vendor account number with subcontracting indicator — entered by the user | Valid |
| Finished Material ID | `{TD.finishedMaterialId}` | Finished product material number with item category "L" — entered by the user | Valid |
| Component Material ID | `{TD.componentMaterialId}` | Component material number from BOM — auto-populated by SAP | Valid |
| Order Quantity | `{TD.quantity}` | Numeric quantity of finished product to order — entered by the user | Valid |
| Component Quantity Override | `{TD.zeroComponentQuantity}` | Zero component quantity (invalid override attempt) — entered by the user if field is editable | Invalid (Boundary - Zero Component) |
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
| 21 | Verify that the component table (sub-items) displays the component material with calculated quantity | `{TD.componentMaterialId}`, `{TD.componentDesc}`, `{TD.componentQuantity}` | Component material ID, description, and calculated quantity appear in the component sub-table |
| 22 | Verify that the Special Stock Indicator field shows "O" (stock provided to vendor) | Special Stock Indicator: "O" | Special stock indicator "O" is auto-set for subcontracting line item |
| 23 | In the "Order Quantity" field, enter the quantity | `{TD.quantity}` | Quantity is populated in the line item |
| 24 | Press Enter to confirm the quantity entry | — | Component quantities are recalculated based on the BOM ratio and order quantity |
| 25 | Attempt to click on the component quantity field in the component sub-table | — | If field is read-only/non-editable: cursor does not enter the field, or field is grayed out. If field is editable: cursor enters the field and allows input |
| 26 | If component quantity field is editable: Clear the existing component quantity and enter zero | `{TD.zeroComponentQuantity}` | Zero value "0" is entered in the component quantity field |
| 27 | If component quantity field is editable: Press Enter to confirm the zero component quantity entry | — | SAP may immediately display a field-level validation error or allow proceeding to submission |
| 28 | In the "Net Order Price" field, enter the price | `{TD.price}` | Price is populated; net total value is calculated and displayed |
| 29 | Press Enter to confirm the price entry | — | Price is confirmed; line item totals are updated |
| 30 | In the "Delivery Date" field, enter the delivery date | `{TD.deliveryDate}` | Delivery date field is populated with a future date |
| 31 | Press Enter to confirm the delivery date entry | — | Delivery date is confirmed |
| 32 | Click the "Order" button (primary submit action) in the toolbar | — | SAP attempts to process the purchase order submission |
| 33 | Observe the on-screen response | — | **If component field was read-only:** PO is created successfully with original BOM-derived component quantities (test result: system prevents manual override). **If component field was editable and zero entered:** SAP displays an error message indicating that component quantity cannot be zero or must be greater than zero (test result: system validates zero component rejection) |
| 34 | If error occurred: Verify that the component quantity field is highlighted or marked as invalid | — | Component quantity field is highlighted in red or marked with an error indicator |
| 35 | If error occurred: Verify that no PO number is generated | — | No success message or PO number is displayed; the form remains in edit mode |
| 36 | If PO was created (read-only scenario): Note the PO number from the success message | — | Subcontracting PO number is displayed (format is system-generated, typically 10-digit numeric) |
| 37 | If PO was created: Navigate back to the "Manage Purchase Orders" application via the search bar | — | Manage Purchase Orders application opens |
| 38 | If PO was created: Search for the newly created PO using the number noted in step 36 | — | The created subcontracting PO appears in the list |
| 39 | If PO was created: Click the PO number to open the PO details | — | PO details page opens displaying header and item data |
| 40 | If PO was created: Verify that the component list displays correct BOM-derived component quantities (not zero) | `{TD.componentMaterialId}`, `{TD.componentQuantity}` | Component material and correct BOM-derived quantity are displayed, confirming that manual override to zero was not possible |
| 41 | If error occurred: Navigate back to the "Manage Purchase Orders" application via the search bar | — | Manage Purchase Orders application opens |
| 42 | If error occurred: Verify that no new PO was created with zero component quantity | — | No PO with zero component quantity appears in the list; the invalid submission was rejected |
| 43 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 44 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 45 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

**Scenario A (Component quantity field is read-only):**
- Component quantity field cannot be manually edited; user cannot override BOM-derived component quantities
- A unique Subcontracting Purchase Order number is generated by SAP with correct BOM-derived component quantities
- The PO is persisted in SAP with item category "L" (Subcontracting) and special stock indicator "O" (stock provided to vendor)
- Component list from BOM is correctly populated and stored with calculated quantities; manual override to zero is not possible
- System design prevents invalid component quantity manipulation

**Scenario B (Component quantity field is editable, but zero value is rejected):**
- SAP rejects the submission and displays an error message indicating that component quantity cannot be zero or must be greater than zero
- The component quantity field is highlighted as invalid
- No subcontracting purchase order is created
- The system prevents creation of a PO with zero component quantity, enforcing BOM integrity validation rules
- User remains on the PO creation form in edit mode to correct the invalid component quantity

---

### Post-conditions

**If component field is read-only (Scenario A):**
- SAP Subcontracting Purchase Order document exists with the generated PO number
- PO item has item category "L" and special stock indicator "O"
- Component list is stored and linked to the PO line item with correct BOM-derived quantities
- PO status is "Open" or "Sent" depending on release strategy configuration
- No application-level errors or critical warnings remain outstanding

**If component field is editable and validation triggered (Scenario B):**
- No new SAP Purchase Order document is created
- The PO creation form remains open in error state with component quantity validation error
- No PO number is generated
- System validation successfully prevents invalid component quantity (zero) submission

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
