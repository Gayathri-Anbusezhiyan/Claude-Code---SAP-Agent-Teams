# TC-CS-209: Attempt Subcontracting PO Creation with Missing Supplier Field

**User Story:**          [CS-24] Create A Subcontracting Purchase Order For Outsourced Fill-Finish Manu
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Subcontracting Purchase Order Creation - Field Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
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
| P7 | Test Scenario | User will intentionally leave the Supplier field empty to validate mandatory field behavior |

---

### Test Data

**Dataset Reference:** `testdata/CS-24/CS-24-testdata.json` — Dataset ID: `TD-CS-24-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| CMO Supplier ID | `{TD.cmoSupplierId}` | Intentionally left empty to test mandatory field validation | Missing |
| Finished Material ID | `{TD.finishedMaterialId}` | Finished product material number with item category "L" — entered by the user | Valid |
| Component Material ID | `{TD.componentMaterialId}` | Component material number from BOM — auto-populated by SAP | Valid |
| Order Quantity | `{TD.quantity}` | Numeric quantity of finished product to order — entered by the user | Valid |
| Net Order Price | `{TD.price}` | Price per unit of measure for finished product — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
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
| 10 | Leave the "Supplier:*" header field empty | — | Supplier field remains empty |
| 11 | In the "Items" section, click the "Create" button (below the Items table) | — | A new empty line item row appears in the Items table |
| 12 | In the "Material" field of the new line item, enter the Finished Material ID | `{TD.finishedMaterialId}` | Finished Material ID is entered into the field |
| 13 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.finishedMaterialDesc}` is auto-populated; unit of measure `{TD.uom}` is auto-filled |
| 14 | In the "Item Category" dropdown field, select Item Category | `{TD.itemCategory}` | Item Category "L" (Subcontracting) is selected |
| 15 | Press Enter to confirm the Item Category selection | — | Item Category is confirmed |
| 16 | In the "Plant" field of the line item, enter the plant code | `{TD.plant}` | Plant code is entered into the field |
| 17 | Press Enter to confirm the Plant entry | — | Plant is confirmed |
| 18 | In the "Order Quantity" field, enter the quantity | `{TD.quantity}` | Quantity is populated in the line item |
| 19 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 20 | In the "Net Order Price" field, enter the price | `{TD.price}` | Price is populated; net total value is calculated and displayed |
| 21 | Press Enter to confirm the price entry | — | Price is confirmed; line item totals are updated |
| 22 | In the "Delivery Date" field, enter the delivery date | `{TD.deliveryDate}` | Delivery date field is populated with a future date |
| 23 | Press Enter to confirm the delivery date entry | — | Delivery date is confirmed |
| 24 | Click the "Order" button (primary submit action) in the toolbar | — | SAP validates the form and detects the missing mandatory Supplier field |
| 25 | Observe the error indication on the Supplier field | — | The Supplier field is highlighted with a red border or error indicator showing it is mandatory |
| 26 | Observe the error message displayed by SAP | — | An error message is displayed indicating that the Supplier field is required and must be entered (e.g., "Enter a supplier" or "Supplier is a mandatory field") |
| 27 | Verify that the PO is not created and the user remains on the creation form | — | No PO number is generated; the form remains in edit mode; no success message is displayed |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP system detects the missing Supplier field and prevents PO submission
- The Supplier field is highlighted as mandatory with a visual error indicator (red border or error icon)
- An error message is displayed indicating that the Supplier field is required
- No Subcontracting Purchase Order number is generated
- The PO is NOT created in the system
- User remains on the creation form to correct the error

---

### Post-conditions

- No Subcontracting Purchase Order document is created in SAP
- No data is persisted
- User session remains active on the creation form
- No application-level errors or system failures occur

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
