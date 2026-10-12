# TC-CS-218: Create Subcontracting PO with Delivery Date = Today (Minimum Lead Time)

**User Story:**          [CS-24] Create A Subcontracting Purchase Order For Outsourced Fill-Finish Manu
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Subcontracting Purchase Order Creation - Boundary Value Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

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
| P8 | Boundary Condition | Test validates delivery date equal to today's date (minimum lead time boundary) |

---

### Test Data

**Dataset Reference:** `testdata/CS-24/CS-24-testdata.json` — Dataset ID: `TD-CS-24-EDGE-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| CMO Supplier ID | `{TD.cmoSupplierId}` | Contract Manufacturing Organization vendor account number with subcontracting indicator — entered by the user | Valid |
| Finished Material ID | `{TD.finishedMaterialId}` | Finished product material number with item category "L" — entered by the user | Valid |
| Component Material ID | `{TD.componentMaterialId}` | Component material number from BOM — auto-populated by SAP | Valid |
| Order Quantity | `{TD.quantity}` | Numeric quantity of finished product to order — entered by the user | Valid |
| Net Order Price | `{TD.price}` | Price per unit of measure for finished product — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Purchasing Org | `{TD.purchasingOrg}` | Purchasing Organisation code — auto-populated from user profile | Valid |
| Delivery Date | `{TD.deliveryDateToday}` | Delivery date equal to today (minimum lead time boundary) — entered by the user | Valid or Invalid (Boundary - Minimum Lead Time) |
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
| 21 | Verify that the component table (sub-items) displays the component material | `{TD.componentMaterialId}`, `{TD.componentDesc}`, `{TD.componentQuantity}` | Component material ID, description, and calculated quantity appear in the component sub-table |
| 22 | Verify that the Special Stock Indicator field shows "O" (stock provided to vendor) | Special Stock Indicator: "O" | Special stock indicator "O" is auto-set for subcontracting line item |
| 23 | In the "Order Quantity" field, enter the quantity | `{TD.quantity}` | Quantity is populated in the line item |
| 24 | Press Enter to confirm the quantity entry | — | Component quantities are recalculated based on the BOM ratio and order quantity |
| 25 | In the "Net Order Price" field, enter the price | `{TD.price}` | Price is populated; net total value is calculated and displayed |
| 26 | Press Enter to confirm the price entry | — | Price is confirmed; line item totals are updated |
| 27 | In the "Delivery Date" field, enter today's date | `{TD.deliveryDateToday}` | Today's date is entered in the Delivery Date field |
| 28 | Press Enter to confirm the delivery date entry | — | Delivery date is confirmed; SAP may display a warning message if today's date violates minimum lead time requirements, or may accept it if allowed |
| 29 | Observe any warning or error messages related to delivery date | — | If minimum lead time is enforced: SAP displays a warning or error indicating that delivery date is too soon or violates lead time. If not enforced: no error is shown and the system accepts today's date |
| 30 | Click the "Order" button (primary submit action) in the toolbar | — | SAP begins processing the purchase order submission |
| 31 | Observe the on-screen confirmation or error response | — | If delivery date = today is allowed: A success message is displayed containing the newly generated subcontracting PO number. If not allowed: An error message is displayed indicating invalid delivery date; PO is not created |
| 32 | If PO was created: Note the PO number from the success message or the top-left header area | — | Subcontracting PO number is displayed (format is system-generated, typically 10-digit numeric) |
| 33 | If PO was created: Navigate back to the "Manage Purchase Orders" application via the search bar | — | Manage Purchase Orders application opens |
| 34 | If PO was created: Search for the newly created PO using the number noted in step 32 | — | The created subcontracting PO appears in the list |
| 35 | If PO was created: Click the PO number to open the PO details | — | PO details page opens displaying header and item data |
| 36 | If PO was created: Verify the Delivery Date field on the line item | Delivery Date: `{TD.deliveryDateToday}` | Delivery date displays today's date |
| 37 | If PO was created: Verify the Item Category field on the line item | Item Category: "L" | Item Category "L" (Subcontracting) is displayed |
| 38 | If PO was created: Verify the Special Stock Indicator field | Special Stock Indicator: "O" | Special stock indicator "O" is displayed |
| 39 | If PO was not created: Verify that no PO number was generated | — | No PO number is displayed; error message confirms rejection due to invalid delivery date |
| 40 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 41 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 42 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

**Scenario A (System allows delivery date = today):**
- A unique Subcontracting Purchase Order number is generated by SAP and displayed in the confirmation message
- The PO is persisted in SAP with item category "L" (Subcontracting) and special stock indicator "O" (stock provided to vendor)
- All header data (CMO Supplier, Purchasing Org, Company Code) is correctly stored
- Line item data is correctly stored with delivery date equal to today's date
- Component list from BOM is correctly populated and stored with calculated quantities
- The created subcontracting PO appears in the "Manage Purchase Orders" list and can be viewed
- System accepts minimum lead time boundary (delivery date = today) as valid

**Scenario B (System enforces minimum lead time and rejects delivery date = today):**
- SAP displays an error or warning message indicating that delivery date cannot be today or violates minimum lead time requirements
- No subcontracting purchase order is created
- No PO number is generated
- User remains on the PO creation form to correct the delivery date

---

### Post-conditions

**If PO is created (Scenario A):**
- SAP Subcontracting Purchase Order document exists with the generated PO number
- PO item has item category "L" and special stock indicator "O"
- PO line item has delivery date equal to today's date
- Component list is stored and linked to the PO line item with correct calculated quantities
- PO status is "Open" or "Sent" depending on release strategy configuration
- No application-level errors or critical warnings remain outstanding

**If PO is not created (Scenario B):**
- No new SAP Purchase Order document is created
- The PO creation form remains open in error state with delivery date validation error
- No PO number is generated
- System validation successfully prevents delivery date that violates minimum lead time

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
