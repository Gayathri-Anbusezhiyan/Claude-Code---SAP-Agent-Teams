# TC-CS-200: Issue Components to Vendor and Verify Stock Provided to Vendor Creation

**User Story:**          [CS-24] Create A Subcontracting Purchase Order For Outsourced Fill-Finish Manu
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Subcontracting Component Issue (Movement Type 541)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Clerk or Inventory Manager with SAP authorization to post goods movements (MB1B or MIGO) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | PO Exists | Subcontracting Purchase Order `{TD.subcontractingPONumber}` exists with item category "L" and special stock indicator "O" |
| P4 | Component Stock | Component material `{TD.componentMaterialId}` has sufficient unrestricted stock in plant `{TD.plant}` storage location `{TD.storageLocation}` (stock ≥ `{TD.issueQuantity}`) |
| P5 | Configuration | Plant `{TD.plant}` is configured for special stock type "O" (stock provided to vendor) |

---

### Test Data

**Dataset Reference:** `testdata/CS-24/CS-24-testdata.json` — Dataset ID: `TD-CS-24-HP-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Subcontracting PO Number | `{TD.subcontractingPONumber}` | Existing subcontracting PO number — entered by the user | Valid |
| PO Item Number | `{TD.poItemNumber}` | Line item number on the PO — entered by the user | Valid |
| Component Material ID | `{TD.componentMaterialId}` | Component material to be issued to vendor — entered by the user | Valid |
| Issue Quantity | `{TD.issueQuantity}` | Quantity of component to issue to vendor — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location from which component is issued — entered by the user | Valid |
| Movement Type | `{TD.movementType541}` | Movement type 541 (Transfer to Subcontracting with Purchase Order) — selected by the user | Valid |
| CMO Supplier ID | `{TD.cmoSupplierId}` | Vendor to whom components are issued — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Post Goods Movement" or "Goods Movement" | — | Search results appear listing the goods movement posting application |
| 8 | Click "Post Goods Movement" (MB1B/MIGO equivalent) from the search results | — | Goods Movement application opens |
| 9 | In the "Movement Type" field, enter or select movement type | `{TD.movementType541}` | Movement type 541 (Transfer to Subcontracting) is selected |
| 10 | Press Enter to confirm the Movement Type | — | Movement type is confirmed; relevant input fields appear for movement type 541 |
| 11 | In the "Material" field, enter the Component Material ID | `{TD.componentMaterialId}` | Component Material ID is entered into the field |
| 12 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.componentDesc}` is auto-populated |
| 13 | In the "Plant" field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 14 | Press Enter to confirm the Plant entry | — | Plant is confirmed |
| 15 | In the "Storage Location" field, enter the storage location | `{TD.storageLocation}` | Storage location is entered |
| 16 | Press Enter to confirm the Storage Location entry | — | Storage location is confirmed; current stock is displayed if available |
| 17 | In the "Quantity" field, enter the issue quantity | `{TD.issueQuantity}` | Issue quantity is entered |
| 18 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 19 | In the "Purchase Order" field, enter the Subcontracting PO number | `{TD.subcontractingPONumber}` | Subcontracting PO number is entered |
| 20 | Press Enter to confirm the PO entry | — | SAP validates the PO; PO details are retrieved |
| 21 | In the "PO Item" field, enter the PO item number | `{TD.poItemNumber}` | PO item number is entered |
| 22 | Press Enter to confirm the PO Item entry | — | PO item is confirmed; special stock indicator "O" is auto-determined |
| 23 | In the "Supplier" field, enter the CMO Supplier ID | `{TD.cmoSupplierId}` | CMO Supplier ID is entered (required for special stock "O") |
| 24 | Press Enter to confirm the Supplier entry | — | Supplier is confirmed; supplier name `{TD.cmoSupplierName}` is auto-populated |
| 25 | Verify that the Special Stock Indicator field displays "O" | Special Stock Indicator: "O" | Special stock "O" (stock provided to vendor) is auto-set based on PO item category |
| 26 | Click the "Post" or "Save" button to post the goods movement | — | SAP begins processing the goods movement posting |
| 27 | Observe the on-screen confirmation response | — | A success message is displayed containing the material document number for the component issue |
| 28 | Note the material document number from the success message | — | Material document number is displayed (typically 10-digit numeric beginning with 49) |
| 29 | Navigate to the "Stock Overview" application via the search bar | — | Stock Overview application opens |
| 30 | In the "Material" filter field, enter the Component Material ID | `{TD.componentMaterialId}` | Component Material ID is entered in the filter |
| 31 | In the "Plant" filter field, enter the plant code | `{TD.plant}` | Plant code is entered in the filter |
| 32 | Click the "Go" button to execute the stock query | — | Stock overview results are displayed |
| 33 | Locate the "Stock provided to vendor" (special stock "O") row for the CMO supplier | `{TD.cmoSupplierId}` | A row with special stock type "O" and supplier `{TD.cmoSupplierId}` is displayed |
| 34 | Verify that the stock quantity matches the issued quantity | `{TD.issueQuantity}` | Stock provided to vendor shows the issued quantity for the component material |
| 35 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 36 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 37 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique material document number is generated by SAP for the component issue (movement type 541)
- Component material `{TD.componentMaterialId}` is deducted from unrestricted stock in plant `{TD.plant}` storage location `{TD.storageLocation}`
- Component material is added to "Stock provided to vendor" (special stock "O") for CMO supplier `{TD.cmoSupplierId}` in plant `{TD.plant}`
- Stock Overview displays the component balance at the CMO with special stock indicator "O"
- Material document is posted and visible in material document history

---

### Post-conditions

- Material document exists with movement type 541 for component issue
- Unrestricted stock of component is reduced by `{TD.issueQuantity}` in plant `{TD.plant}`
- Special stock "O" (stock provided to vendor) is increased by `{TD.issueQuantity}` for supplier `{TD.cmoSupplierId}` in plant `{TD.plant}`
- Component is available at CMO for subcontracting production
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
