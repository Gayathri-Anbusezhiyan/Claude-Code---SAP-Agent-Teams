# TC-CS-223: Verify Integration with BOM (Component Explosion from STPO/STKO)

**User Story:**          [CS-24] Create A Subcontracting Purchase Order For Outsourced Fill-Finish Manu
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Subcontracting Integration with Bill of Materials (PP-BOM)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
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
| P5 | BOM Configuration | A valid Bill of Materials (BOM) exists for finished material `{TD.finishedMaterialId}` in plant `{TD.plant}` in SAP tables STPO (BOM items) and STKO (BOM header) |
| P6 | BOM Configuration | BOM contains multiple component materials: `{TD.componentMaterial1Id}` with BOM quantity `{TD.componentBomQty1}` and `{TD.componentMaterial2Id}` with BOM quantity `{TD.componentBomQty2}` |
| P7 | BOM Configuration | BOM is active, released, and valid for the current date (BOM validity period includes the test execution date) |
| P8 | Configuration | Purchasing Organization `{TD.purchasingOrg}` is active and assigned to company code `{TD.companyCode}` |
| P9 | Configuration | Plant `{TD.plant}` is configured for subcontracting procurement and special stock type "O" (stock provided to vendor) |
| P10 | Integration Setup | MM-PP integration is active; BOM explosion is enabled for item category "L" (Subcontracting) in purchasing documents |

---

### Test Data

**Dataset Reference:** `testdata/CS-24/CS-24-testdata.json` — Dataset ID: `TD-CS-24-INT-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| CMO Supplier ID | `{TD.cmoSupplierId}` | Contract Manufacturing Organization vendor account number with subcontracting indicator — entered by the user | Valid |
| Finished Material ID | `{TD.finishedMaterialId}` | Finished product material number with item category "L" and active BOM — entered by the user | Valid |
| Component Material 1 ID | `{TD.componentMaterial1Id}` | First component material number from BOM — auto-populated by SAP from BOM explosion | Valid |
| Component Material 2 ID | `{TD.componentMaterial2Id}` | Second component material number from BOM — auto-populated by SAP from BOM explosion | Valid |
| Component BOM Quantity 1 | `{TD.componentBomQty1}` | BOM quantity for component 1 (per 1 unit of finished material) — defined in BOM master data | Valid |
| Component BOM Quantity 2 | `{TD.componentBomQty2}` | BOM quantity for component 2 (per 1 unit of finished material) — defined in BOM master data | Valid |
| Order Quantity | `{TD.quantity}` | Numeric quantity of finished product to order — entered by the user | Valid |
| Modified Order Quantity | `{TD.modifiedQuantity}` | Modified order quantity to test recalculation of component quantities — entered by the user | Valid |
| Expected Component Quantity 1 | `{TD.expectedComponentQty1}` | Calculated component 1 quantity = `{TD.quantity}` × `{TD.componentBomQty1}` — auto-calculated by SAP | Valid |
| Expected Component Quantity 2 | `{TD.expectedComponentQty2}` | Calculated component 2 quantity = `{TD.quantity}` × `{TD.componentBomQty2}` — auto-calculated by SAP | Valid |
| Expected Modified Component Quantity 1 | `{TD.expectedModifiedComponentQty1}` | Recalculated component 1 quantity = `{TD.modifiedQuantity}` × `{TD.componentBomQty1}` — auto-calculated by SAP | Valid |
| Expected Modified Component Quantity 2 | `{TD.expectedModifiedComponentQty2}` | Recalculated component 2 quantity = `{TD.modifiedQuantity}` × `{TD.componentBomQty2}` — auto-calculated by SAP | Valid |
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
| 7 | Click the search icon (top-right shell bar) and type "Manage Purchase Orders" | — | Search results appear listing the "Manage Purchase Orders" application |
| 8 | Click the "Manage Purchase Orders" application name from the search results | — | "Manage Purchase Orders" application opens with the list view |
| 9 | Click the "Create PO" button in the application toolbar | — | New purchase order creation form opens in edit mode |
| 10 | In the "Supplier:*" header field, enter the CMO Supplier ID | `{TD.cmoSupplierId}` | CMO Supplier ID value is entered into the field |
| 11 | Press Enter to confirm the Supplier entry | — | SAP validates the supplier; CMO Supplier name `{TD.cmoSupplierName}` is auto-populated in the header |
| 12 | Verify that Purchasing Organisation and Purchasing Group fields are populated | `{TD.purchasingOrg}`, `{TD.purchasingGroup}` | Organisational fields show the expected values (auto-defaulted from user profile or supplier master) |
| 13 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 14 | In the "Material" field of the new line item, enter the Finished Material ID | `{TD.finishedMaterialId}` | Finished Material ID is entered into the field |
| 15 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.finishedMaterialDesc}` is auto-populated; unit of measure `{TD.uom}` is auto-filled |
| 16 | In the "Item Category" field, select or verify item category "L" (Subcontracting) | `{TD.itemCategory}` | Item Category field displays "L" (Subcontracting) |
| 17 | Press Enter to confirm the Item Category selection | — | SAP triggers BOM explosion; component list sub-table appears below the line item, auto-populated from BOM (STPO/STKO tables) |
| 18 | Verify that the component sub-table is displayed below the finished material line item | — | Component sub-table is visible and contains rows for BOM components |
| 19 | Verify that the component sub-table displays component material 1 ID | `{TD.componentMaterial1Id}` | Component material 1 ID is displayed in the component sub-table |
| 20 | Verify that the component sub-table displays component material 1 description | `{TD.componentMaterial1Desc}` | Component material 1 description is auto-populated from material master data |
| 21 | Verify that the component sub-table displays component material 2 ID | `{TD.componentMaterial2Id}` | Component material 2 ID is displayed in the component sub-table |
| 22 | Verify that the component sub-table displays component material 2 description | `{TD.componentMaterial2Desc}` | Component material 2 description is auto-populated from material master data |
| 23 | Verify that the total number of rows in the component sub-table matches the number of BOM components (minimum 2 in this test) | — | Component sub-table contains at least 2 rows (one for each BOM component) |
| 24 | In the "Order Quantity" field of the finished material line item, enter the order quantity | `{TD.quantity}` | Order quantity is populated in the line item |
| 25 | Press Enter to confirm the order quantity entry | — | SAP recalculates component quantities based on BOM ratio × order quantity |
| 26 | Verify that component material 1 quantity in the component sub-table is calculated as BOM quantity × order quantity | `{TD.expectedComponentQty1}` | Component material 1 quantity displays the calculated value `{TD.quantity}` × `{TD.componentBomQty1}` |
| 27 | Verify that component material 2 quantity in the component sub-table is calculated as BOM quantity × order quantity | `{TD.expectedComponentQty2}` | Component material 2 quantity displays the calculated value `{TD.quantity}` × `{TD.componentBomQty2}` |
| 28 | In the "Net Order Price" field, enter the price | `{TD.price}` | Price is populated; net total value is calculated and displayed |
| 29 | Press Enter to confirm the price entry | — | Price is confirmed; line item totals are updated |
| 30 | In the "Plant" field, enter the plant code | `{TD.plant}` | Plant field is populated with the plant code |
| 31 | If the Delivery Date field is empty, enter the delivery date; otherwise note the SAP-defaulted value | `{TD.deliveryDate}` | Delivery date field is populated with a future date |
| 32 | Modify the "Order Quantity" field by entering a different quantity | `{TD.modifiedQuantity}` | Modified order quantity is entered, replacing the previous value |
| 33 | Press Enter to confirm the modified order quantity | — | SAP recalculates component quantities based on the new order quantity |
| 34 | Verify that component material 1 quantity in the component sub-table is recalculated as BOM quantity × modified order quantity | `{TD.expectedModifiedComponentQty1}` | Component material 1 quantity displays the recalculated value `{TD.modifiedQuantity}` × `{TD.componentBomQty1}` |
| 35 | Verify that component material 2 quantity in the component sub-table is recalculated as BOM quantity × modified order quantity | `{TD.expectedModifiedComponentQty2}` | Component material 2 quantity displays the recalculated value `{TD.modifiedQuantity}` × `{TD.componentBomQty2}` |
| 36 | Verify that component quantities are automatically recalculated and updated in real-time without manual intervention | — | Component quantities update automatically when order quantity is changed, confirming BOM explosion logic is active |
| 37 | Verify that component material IDs and descriptions are read-only (cannot be manually edited by the user) | — | Component material fields in the component sub-table are read-only or disabled, confirming they are controlled by BOM master data |
| 38 | Verify that component unit of measure fields are auto-populated from component material master data | `{TD.componentUom1}`, `{TD.componentUom2}` | Component UoM fields display the unit of measure defined in the component material master records |
| 39 | Verify that no additional components appear in the component sub-table beyond those defined in the BOM | — | Component sub-table contains only the components defined in the BOM (no extra or missing rows) |
| 40 | Click the "Order" button (primary submit action) in the toolbar | — | SAP begins processing the subcontracting PO submission |
| 41 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated subcontracting PO number |
| 42 | Note the subcontracting PO number from the success message or the top-left header area | — | Subcontracting PO number is displayed (format is system-generated, e.g., 4500xxxxxx) |
| 43 | Navigate back to the "Manage Purchase Orders" list view | — | Purchase order list is displayed |
| 44 | In the "Purchase Order:*" filter field, enter the subcontracting PO number noted in step 42 | (PO number from step 42) | Subcontracting PO number is entered in the filter field |
| 45 | Press Enter to create the filter token | — | Filter token is created with the PO number |
| 46 | Click the "Go" button to execute the filter | — | Purchase order list is filtered to display only the specified PO |
| 47 | Verify that the subcontracting PO appears in the list with the correct PO number | (PO number from step 42) | Subcontracting PO is displayed in the list with matching PO number |
| 48 | Click the subcontracting PO number link to open the PO in display/edit mode | — | Purchase order details page opens, displaying the PO in edit mode (draft is created) |
| 49 | Verify that the finished material line item displays the modified order quantity | `{TD.modifiedQuantity}` | Order quantity field shows the modified quantity entered in step 32 |
| 50 | Verify that the component sub-table is displayed below the finished material line item | — | Component sub-table is visible with component details |
| 51 | Verify that component material 1 ID and description are displayed in the component sub-table | `{TD.componentMaterial1Id}`, `{TD.componentMaterial1Desc}` | Component material 1 is displayed with correct ID and description |
| 52 | Verify that component material 1 quantity matches the recalculated value | `{TD.expectedModifiedComponentQty1}` | Component material 1 quantity displays the value calculated in step 34 |
| 53 | Verify that component material 2 ID and description are displayed in the component sub-table | `{TD.componentMaterial2Id}`, `{TD.componentMaterial2Desc}` | Component material 2 is displayed with correct ID and description |
| 54 | Verify that component material 2 quantity matches the recalculated value | `{TD.expectedModifiedComponentQty2}` | Component material 2 quantity displays the value calculated in step 35 |
| 55 | Verify that all component quantities are proportionally calculated based on the BOM ratios and the modified order quantity | — | Component quantities are correct: each component quantity = BOM quantity per unit × modified order quantity |
| 56 | Click the "Discard" button to exit the edit mode without making changes | — | Discard confirmation dialog appears |
| 57 | In the Discard confirmation dialog, click the "Discard" button | — | Draft is discarded; PO returns to active (non-draft) mode or navigates back to the list view |
| 58 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 59 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 60 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique subcontracting Purchase Order number is generated by SAP and displayed in the confirmation message
- Item category "L" (Subcontracting) triggers automatic BOM explosion when the finished material is entered
- Component sub-table is auto-populated with all components from the BOM (STPO/STKO tables) for the finished material in the specified plant
- All BOM components (minimum 2 in this test) are displayed in the component sub-table with correct material IDs, descriptions, and units of measure
- Component quantities are automatically calculated based on BOM ratio × order quantity (e.g., if BOM specifies 2 kg of component per 1 unit of finished product, and order quantity is 10, component quantity = 20 kg)
- When order quantity is changed, component quantities are automatically recalculated in real-time and updated in the component sub-table
- Component material IDs and descriptions are read-only and cannot be manually edited (controlled by BOM master data)
- After PO submission and retrieval, component details are correctly saved and displayed, confirming BOM explosion results are persisted
- End-to-end MM-PP-BOM integration flow is successfully completed: finished material entry → item category "L" selection → BOM explosion → component list auto-population → quantity calculation → recalculation on order quantity change → PO submission and persistence

---

### Post-conditions

- Subcontracting Purchase Order exists with the generated PO number
- PO contains finished material line item with item category "L" (Subcontracting)
- PO contains component sub-table with all BOM components auto-populated from STPO/STKO tables
- Component quantities are correctly calculated based on BOM ratios and the final order quantity
- PO status is "Open" or "Active"
- No application-level errors or critical warnings remain outstanding
- Integration between MM (Purchasing) and PP (BOM) modules is confirmed to be functioning correctly for subcontracting scenarios with automatic BOM explosion and component quantity calculation

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

**Note:** This test case assumes that a valid BOM with multiple components exists for the finished material in the test plant. If BOM master data is not configured, BOM explosion will not occur, and this test case would be blocked. Confirm BOM configuration in the test environment before execution. The BOM must be active, released, and valid for the current date.

---
