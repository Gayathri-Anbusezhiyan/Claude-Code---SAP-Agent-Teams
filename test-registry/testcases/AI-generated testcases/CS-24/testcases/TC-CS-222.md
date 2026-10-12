# TC-CS-222: Verify Integration with QM (Inspection Lot Creation at GR)

**User Story:**          [CS-24] Create A Subcontracting Purchase Order For Outsourced Fill-Finish Manu
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Subcontracting Integration with Quality Management (QM)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create subcontracting purchase orders, issue goods (MB1B), post goods receipts, and view inspection lots |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | CMO Supplier `{TD.cmoSupplierId}` exists, is active, has subcontracting indicator enabled, and is assigned to purchasing organization `{TD.purchasingOrg}` |
| P4 | Master Data | Finished material `{TD.finishedMaterialId}` is created, released, configured with item category "L" (Subcontracting), and configured for plant `{TD.plant}` |
| P5 | Master Data | Component material `{TD.componentMaterialId}` exists in the BOM for finished material `{TD.finishedMaterialId}` in plant `{TD.plant}` and has sufficient unrestricted stock for issue |
| P6 | Configuration | Purchasing Organization `{TD.purchasingOrg}` is active and assigned to company code `{TD.companyCode}` |
| P7 | Configuration | Plant `{TD.plant}` is configured for subcontracting procurement and special stock type "O" (stock provided to vendor) |
| P8 | Configuration | Movement types 541 (goods issue for subcontracting), 101 (goods receipt), and 543 (component consumption at goods receipt) are configured and active |
| P9 | Stock Availability | Component material `{TD.componentMaterialId}` has unrestricted stock quantity of at least `{TD.componentQuantity}` in plant `{TD.plant}` and storage location `{TD.storageLocation}` |
| P10 | QM Configuration | Quality Management (QM) module is active; inspection type `{TD.inspectionType}` (e.g., "01" for goods receipt inspection) is configured for finished material `{TD.finishedMaterialId}` in plant `{TD.plant}` |
| P11 | QM Configuration | Automatic inspection lot creation at goods receipt is enabled for finished material `{TD.finishedMaterialId}` in plant `{TD.plant}` per GMP receipt rules |
| P12 | Integration Setup | MM-QM integration is active; goods receipt posting triggers automatic inspection lot creation for materials with active inspection setup |

---

### Test Data

**Dataset Reference:** `testdata/CS-24/CS-24-testdata.json` — Dataset ID: `TD-CS-24-INT-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| CMO Supplier ID | `{TD.cmoSupplierId}` | Contract Manufacturing Organization vendor account number with subcontracting indicator — entered by the user | Valid |
| Finished Material ID | `{TD.finishedMaterialId}` | Finished product material number with item category "L" and QM inspection setup — entered by the user | Valid |
| Component Material ID | `{TD.componentMaterialId}` | Component material number from BOM — auto-populated by SAP from BOM explosion | Valid |
| Order Quantity | `{TD.quantity}` | Numeric quantity of finished product to order — entered by the user | Valid |
| Component Quantity | `{TD.componentQuantity}` | Numeric quantity of component to be issued (calculated from BOM × order quantity) — auto-calculated by SAP | Valid |
| Net Order Price | `{TD.price}` | Price per unit of measure for finished product — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location for component issue and finished goods receipt — entered by the user | Valid |
| Purchasing Org | `{TD.purchasingOrg}` | Purchasing Organisation code — auto-populated from user profile | Valid |
| Delivery Date | `{TD.deliveryDate}` | Expected delivery date for finished product — entered by the user | Valid |
| Item Category | `{TD.itemCategory}` | Item Category "L" for Subcontracting — selected by the user | Valid |
| Inspection Type | `{TD.inspectionType}` | Quality inspection type code (e.g., "01" for goods receipt inspection) — configured in QM master data | Valid |

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
| 17 | Press Enter to confirm the Item Category selection | — | SAP triggers BOM explosion; component list sub-table appears below the line item |
| 18 | Verify that the component sub-table displays component material `{TD.componentMaterialId}` with calculated quantity | `{TD.componentMaterialId}`, `{TD.componentQuantity}` | Component sub-table shows the component material ID, description, and required quantity based on BOM ratio |
| 19 | In the "Order Quantity" field, enter the quantity | `{TD.quantity}` | Quantity is populated in the line item |
| 20 | In the "Net Order Price" field, enter the price | `{TD.price}` | Price is populated; net total value is calculated and displayed |
| 21 | Press Enter to confirm the price entry | — | Price is confirmed; line item totals are updated |
| 22 | In the "Plant" field, enter the plant code | `{TD.plant}` | Plant field is populated with the plant code |
| 23 | If the Delivery Date field is empty, enter the delivery date; otherwise note the SAP-defaulted value | `{TD.deliveryDate}` | Delivery date field is populated with a future date |
| 24 | Click the "Order" button (primary submit action) in the toolbar | — | SAP begins processing the subcontracting PO submission |
| 25 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated subcontracting PO number |
| 26 | Note the subcontracting PO number from the success message or the top-left header area | — | Subcontracting PO number is displayed (format is system-generated, e.g., 4500xxxxxx) |
| 27 | Click the search icon (top-right shell bar) and type "Post Goods Issue" | — | Search results appear listing the "Post Goods Issue" application (MB1B equivalent) |
| 28 | Click the "Post Goods Issue" application name from the search results | — | "Post Goods Issue" application opens |
| 29 | In the "Movement Type" field, enter or select movement type 541 (goods issue for subcontracting) | 541 | Movement type 541 is populated |
| 30 | Press Enter to confirm the movement type | — | Movement type is confirmed; relevant fields for subcontracting goods issue are displayed |
| 31 | In the "Material" field, enter the component material ID | `{TD.componentMaterialId}` | Component material ID is entered |
| 32 | Press Enter to confirm the material entry | — | SAP validates the material; material description is auto-populated |
| 33 | In the "Plant" field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 34 | In the "Storage Location" field, enter the storage location | `{TD.storageLocation}` | Storage location is entered |
| 35 | In the "Quantity" field, enter the component quantity to be issued | `{TD.componentQuantity}` | Component quantity is entered |
| 36 | In the "Purchase Order" field, enter the subcontracting PO number noted in step 26 | (PO number from step 26) | Subcontracting PO number is entered |
| 37 | In the "Item" field, enter the line item number (typically 10 for the first item) | 10 | Line item number is entered |
| 38 | Click the "Post" button to execute the goods issue (movement type 541) | — | SAP processes the goods issue and posts the material document |
| 39 | Observe the confirmation message | — | A success message is displayed containing the material document number for the goods issue (movement type 541) |
| 40 | Note the material document number from the goods issue confirmation | — | Material document number is recorded |
| 41 | Click the search icon (top-right shell bar) and type "Post Goods Receipt" | — | Search results appear listing the "Post Goods Receipt" application (MIGO equivalent) |
| 42 | Click the "Post Goods Receipt" application name from the search results | — | "Post Goods Receipt" application opens |
| 43 | In the "Purchase Order" field, enter the subcontracting PO number noted in step 26 | (PO number from step 26) | Subcontracting PO number is entered |
| 44 | Press Enter to confirm the PO number | — | SAP retrieves the PO; finished material line item is displayed with open quantity |
| 45 | Verify that the line item displays the finished material ID and order quantity | `{TD.finishedMaterialId}`, `{TD.quantity}` | Finished material and quantity are displayed in the GR line item |
| 46 | In the "Quantity" field, enter the goods receipt quantity (equal to order quantity for full receipt) | `{TD.quantity}` | Goods receipt quantity is entered |
| 47 | In the "Storage Location" field, enter the storage location for the finished goods | `{TD.storageLocation}` | Storage location is entered |
| 48 | Click the "Post" button to execute the goods receipt (movement type 101) | — | SAP processes the goods receipt, posts the material document, triggers automatic component consumption (movement type 543), and creates an inspection lot per QM configuration |
| 49 | Observe the confirmation message | — | A success message is displayed containing the material document number for the goods receipt (movement type 101) and may reference inspection lot creation |
| 50 | Note the material document number from the goods receipt confirmation | — | Material document number is recorded |
| 51 | Click the search icon (top-right shell bar) and type "Display Inspection Lots" | — | Search results appear listing the "Display Inspection Lots" application (QA33 equivalent or "Manage Inspection Lots") |
| 52 | Click the "Display Inspection Lots" application name from the search results | — | "Display Inspection Lots" application opens with filter criteria fields |
| 53 | In the "Material" filter field, enter the finished material ID | `{TD.finishedMaterialId}` | Finished material ID is entered |
| 54 | In the "Plant" filter field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 55 | In the "Inspection Type" filter field, enter the inspection type (e.g., "01" for goods receipt inspection) | `{TD.inspectionType}` | Inspection type is entered |
| 56 | Click the "Go" button or press Enter to execute the search | — | Inspection lot list is displayed showing inspection lots for the specified material and plant |
| 57 | Verify that an inspection lot is displayed in the results list | — | At least one inspection lot appears in the results, corresponding to the goods receipt posted in step 48 |
| 58 | Click the inspection lot number to open the inspection lot details | — | Inspection lot details page opens |
| 59 | Verify that the inspection lot displays the correct finished material ID | `{TD.finishedMaterialId}` | Inspection lot details show the finished material ID matching the goods receipt |
| 60 | Verify that the inspection lot displays the correct plant | `{TD.plant}` | Inspection lot details show the plant code matching the goods receipt |
| 61 | Verify that the inspection lot displays the correct inspection type | `{TD.inspectionType}` | Inspection lot details show the inspection type (e.g., "01" for goods receipt inspection) |
| 62 | Verify that the inspection lot displays the inspection lot quantity equal to the goods receipt quantity | `{TD.quantity}` | Inspection lot quantity matches the goods receipt quantity posted in step 46 |
| 63 | Verify that the inspection lot status is "Created" or "Released for Use" (depending on QM configuration) | — | Inspection lot status field displays "Created", "CRTD", "Released for Use", "REL", or similar status indicating the lot has been generated |
| 64 | If batch information is displayed, verify that the batch number corresponds to the goods receipt | — | Batch number (if applicable) is displayed and matches the goods receipt document |
| 65 | Note the inspection lot number from the inspection lot details | — | Inspection lot number is recorded (format is system-generated) |
| 66 | Click the search icon (top-right shell bar) and type "Display Stock Overview" | — | Search results appear listing the "Display Stock Overview" application |
| 67 | Click the "Display Stock Overview" application name from the search results | — | "Display Stock Overview" application opens |
| 68 | In the "Material" filter field, enter the finished material ID | `{TD.finishedMaterialId}` | Finished material ID is entered |
| 69 | In the "Plant" filter field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 70 | Click the "Go" button to execute the stock query | — | Stock overview displays stock categories for the finished material in the specified plant |
| 71 | Verify that stock is displayed in either "Unrestricted Stock" or "Quality Inspection Stock" column (depending on QM configuration) | — | If QM is configured to place goods in quality inspection stock, the "Quality Inspection Stock" column shows the goods receipt quantity; otherwise, "Unrestricted Stock" shows the quantity |
| 72 | Verify that the stock quantity matches the goods receipt quantity | `{TD.quantity}` | Stock quantity (unrestricted or quality inspection) equals the goods receipt quantity |
| 73 | If quality inspection stock is displayed, verify that unrestricted stock remains at its previous level (goods are not yet released for use) | — | Unrestricted stock does not increase until the inspection lot is completed and results are accepted |
| 74 | Click the search icon (top-right shell bar) and type "Display Material Document" | — | Search results appear listing the "Display Material Document" application (MB03 equivalent) |
| 75 | Click the "Display Material Document" application name from the search results | — | "Display Material Document" application opens |
| 76 | In the "Material Document" filter field, enter the material document number noted in step 50 | (Material document number from step 50) | Material document number is entered |
| 77 | Click the "Go" button or press Enter to display the material document | — | Material document details are displayed |
| 78 | Verify that the material document contains movement type 101 (goods receipt for finished material) and movement type 543 (component consumption) | — | Material document shows two line items: one with movement type 101 for finished material goods receipt, and one with movement type 543 for automatic component consumption |
| 79 | Verify that the material document header or line item references the inspection lot number noted in step 65 | (Inspection lot number from step 65) | Inspection lot number is displayed in the material document, confirming the link between goods receipt and QM inspection lot |
| 80 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 81 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 82 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique subcontracting Purchase Order number is generated by SAP and displayed in the confirmation message
- Component material is successfully issued from unrestricted stock to special stock "O" (stock provided to vendor) via movement type 541
- Goods receipt is successfully posted for the finished material via movement type 101
- Automatic component consumption (movement type 543) is triggered and executed at goods receipt
- An inspection lot is automatically created at goods receipt for the finished material per QM configuration
- Inspection lot displays the correct material, plant, inspection type, quantity, and status ("Created" or "Released for Use")
- Inspection lot number is linked to the goods receipt material document
- Stock is posted to either "Unrestricted Stock" or "Quality Inspection Stock" depending on QM configuration
- If quality inspection stock is used, finished goods remain in quality inspection stock until the inspection lot is completed and results are accepted
- End-to-end MM-QM integration flow is successfully completed: PO creation → component issue → goods receipt → inspection lot creation → stock posting with QM control

---

### Post-conditions

- Subcontracting Purchase Order exists with the generated PO number and is in appropriate status (e.g., "Delivered" or "Completed")
- Material document for goods issue (movement type 541) exists and is posted
- Material document for goods receipt (movement type 101 and 543) exists and is posted
- Inspection lot is created and linked to the goods receipt material document
- Inspection lot status is "Created" or "Released for Use" (depending on QM configuration)
- Finished material stock is posted to unrestricted stock or quality inspection stock (depending on QM configuration)
- Component stock balances are correctly updated: special stock "O" created and then consumed at goods receipt
- No application-level errors or critical warnings remain outstanding
- Integration between MM and QM modules is confirmed to be functioning correctly for subcontracting scenarios with automatic inspection lot creation at goods receipt

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

**Note:** This test case assumes that QM inspection setup is configured for the finished material in the test plant. If QM configuration is not active, the inspection lot may not be created, and this test case would be blocked. Confirm QM configuration in the test environment before execution.

---
