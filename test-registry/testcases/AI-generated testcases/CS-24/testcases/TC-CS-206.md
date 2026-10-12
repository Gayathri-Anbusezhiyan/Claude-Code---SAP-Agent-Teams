# TC-CS-206: Attempt to Create PO with Material Without Item Category L Configured

**User Story:**          [CS-24] Create A Subcontracting Purchase Order For Outsourced Fill-Finish Manu
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Subcontracting PO Creation - Material Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create subcontracting purchase orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | CMO Supplier `{TD.cmoSupplierId}` exists, is active, has subcontracting indicator enabled, and is assigned to purchasing organization `{TD.purchasingOrg}` |
| P4 | Master Data | Standard Material `{TD.standardMaterialId}` is created, released, but does NOT have item category "L" (Subcontracting) configured, and is configured for plant `{TD.plant}` |
| P5 | Configuration | Purchasing Organization `{TD.purchasingOrg}` is active and assigned to company code `{TD.companyCode}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-24/CS-24-testdata.json` — Dataset ID: `TD-CS-24-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| CMO Supplier ID | `{TD.cmoSupplierId}` | Contract Manufacturing Organization vendor account number with subcontracting indicator — entered by the user | Valid |
| Standard Material ID | `{TD.standardMaterialId}` | Standard material number WITHOUT item category "L" — entered by the user | Invalid |
| Order Quantity | `{TD.quantity}` | Numeric quantity to order — entered by the user | Valid |
| Net Order Price | `{TD.price}` | Price per unit of measure — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Purchasing Org | `{TD.purchasingOrg}` | Purchasing Organisation code — auto-populated from user profile | Valid |
| Delivery Date | `{TD.deliveryDate}` | Expected delivery date — entered by the user | Valid |
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
| 12 | Verify that Purchasing Organisation and Purchasing Group fields are populated | `{TD.purchasingOrg}`, `{TD.purchasingGroup}` | Organisational fields show the expected values |
| 13 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 14 | In the "Material" field of the new line item, enter the Standard Material ID (without item category "L") | `{TD.standardMaterialId}` | Standard Material ID is entered into the field |
| 15 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.standardMaterialDesc}` is auto-populated; unit of measure `{TD.uom}` is auto-filled |
| 16 | In the "Item Category" dropdown field, select Item Category | `{TD.itemCategory}` | Item Category "L" (Subcontracting) is selected |
| 17 | Press Enter to confirm the Item Category selection | — | Item Category is confirmed; SAP validates material-item category combination |
| 18 | Observe if an error or warning message appears immediately | — | Error or warning message may appear indicating that the material is not configured for subcontracting or item category "L" is not allowed |
| 19 | In the "Plant" field of the line item, enter the plant code | `{TD.plant}` | Plant code is entered into the field |
| 20 | Press Enter to confirm the Plant entry | — | Plant is confirmed; SAP further validates material-plant-item category combination |
| 21 | In the "Order Quantity" field, enter the quantity | `{TD.quantity}` | Quantity is populated in the line item |
| 22 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 23 | In the "Net Order Price" field, enter the price | `{TD.price}` | Price is populated |
| 24 | Press Enter to confirm the price entry | — | Price is confirmed |
| 25 | In the "Delivery Date" field, enter the delivery date | `{TD.deliveryDate}` | Delivery date field is populated |
| 26 | Press Enter to confirm the delivery date entry | — | Delivery date is confirmed |
| 27 | Click the "Order" button (primary submit action) in the toolbar | — | SAP begins validation for purchase order submission |
| 28 | Observe the on-screen error response | — | An error message is displayed indicating that the material is not configured for item category "L" (Subcontracting) or does not have a BOM configured |
| 29 | Verify the error message content | Error message contains reference to material configuration or item category restriction | Error message describes the material validation failure; typical message: "Material is not configured for subcontracting" or "Item category L not allowed for this material" or "BOM not found for subcontracting material" |
| 30 | Verify that the PO is NOT created | — | No PO number is generated; the document remains in draft/unsaved state |
| 31 | Verify that the system remains on the PO creation form | — | User remains on the PO creation screen; no navigation occurs |
| 32 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 33 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 34 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP rejects the subcontracting PO creation due to material validation failure
- An error message is displayed indicating that the material is not configured for item category "L" (Subcontracting)
- No PO number is generated
- The PO document is not persisted in SAP
- User remains on the PO creation form to correct the material selection
- System prevents creating subcontracting POs with materials not configured for subcontracting

---

### Post-conditions

- No SAP Purchase Order document is created
- No database records are persisted for the attempted PO
- Error message is displayed to the user
- No application-level data corruption occurs
- User can attempt to create a new PO with a valid subcontracting material

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
