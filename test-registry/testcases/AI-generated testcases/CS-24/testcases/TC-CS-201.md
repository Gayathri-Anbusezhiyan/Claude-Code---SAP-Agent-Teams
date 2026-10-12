# TC-CS-201: Post Goods Receipt for Finished Product and Verify Component Auto-Consumption and Inspection Lot Creation

**User Story:**          [CS-24] Create A Subcontracting Purchase Order For Outsourced Fill-Finish Manu
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Subcontracting Goods Receipt with Component Consumption and QM Inspection
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
| P1 | User Role | User has the role of Warehouse Clerk or Goods Receipt Processor with SAP authorization to post goods receipts |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | PO Exists | Subcontracting Purchase Order `{TD.subcontractingPONumber}` exists with item category "L" and special stock indicator "O" |
| P4 | Components Issued | Component material `{TD.componentMaterialId}` has been issued to vendor `{TD.cmoSupplierId}` via movement type 541; sufficient special stock "O" exists (stock ≥ `{TD.componentConsumptionQuantity}`) |
| P5 | QM Configuration | Quality Management inspection type is configured for finished material `{TD.finishedMaterialId}` in plant `{TD.plant}` with automatic inspection lot creation at goods receipt |
| P6 | Configuration | Plant `{TD.plant}` is configured for subcontracting procurement with automatic component consumption (backflushing) enabled |

---

### Test Data

**Dataset Reference:** `testdata/CS-24/CS-24-testdata.json` — Dataset ID: `TD-CS-24-HP-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Subcontracting PO Number | `{TD.subcontractingPONumber}` | Existing subcontracting PO number — entered by the user | Valid |
| PO Item Number | `{TD.poItemNumber}` | Line item number on the PO — entered by the user | Valid |
| Finished Material ID | `{TD.finishedMaterialId}` | Finished product material to be received — auto-populated from PO | Valid |
| GR Quantity | `{TD.grQuantity}` | Quantity of finished product to receive — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — auto-populated from PO | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location for finished goods receipt — entered by the user | Valid |
| Component Material ID | `{TD.componentMaterialId}` | Component material to be auto-consumed — auto-determined by SAP | Valid |
| Component Consumption Quantity | `{TD.componentConsumptionQuantity}` | Expected component consumption quantity based on BOM and GR quantity — calculated by SAP | Valid |
| CMO Supplier ID | `{TD.cmoSupplierId}` | Vendor from whom finished product is received — auto-populated from PO | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Goods Receipt for Purchase Order" | — | Search results appear listing the goods receipt application |
| 8 | Click "Goods Receipt for Purchase Order" (MIGO equivalent) from the search results | — | Goods Receipt application opens |
| 9 | In the "Purchase Order" field, enter the Subcontracting PO number | `{TD.subcontractingPONumber}` | Subcontracting PO number is entered |
| 10 | Press Enter to confirm the PO entry | — | SAP retrieves the PO; PO line items are displayed in the item overview table |
| 11 | Locate the line item with finished material `{TD.finishedMaterialId}` and item category "L" | `{TD.finishedMaterialId}`, Item Category: "L" | Line item is displayed with material description, order quantity, and item category "L" |
| 12 | Select the checkbox for the line item to include it in the goods receipt | — | Line item is selected; item details section becomes active |
| 13 | In the "Quantity" field for the selected line item, enter or verify the GR quantity | `{TD.grQuantity}` | GR quantity is entered or confirmed |
| 14 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; component consumption is calculated automatically based on BOM |
| 15 | In the "Storage Location" field, enter the storage location for the finished goods | `{TD.storageLocation}` | Storage location is entered |
| 16 | Press Enter to confirm the Storage Location entry | — | Storage location is confirmed |
| 17 | Verify that the item shows item category "L" and special stock indicator "O" | Item Category: "L", Special Stock: "O" | Item category "L" and special stock "O" are displayed, indicating subcontracting process |
| 18 | Expand the component details or navigate to the component consumption preview (if available in UI) | — | Component list is displayed showing materials to be auto-consumed |
| 19 | Verify that component material `{TD.componentMaterialId}` appears in the consumption list | `{TD.componentMaterialId}`, `{TD.componentConsumptionQuantity}` | Component material and calculated consumption quantity are displayed |
| 20 | Click the "Post" or "Save" button to post the goods receipt | — | SAP begins processing the goods receipt and component consumption |
| 21 | Observe the on-screen confirmation response | — | A success message is displayed containing the material document number for the goods receipt |
| 22 | Note the material document number (goods receipt) from the success message | — | Material document number for GR is displayed (typically 10-digit numeric beginning with 49) |
| 23 | Verify if a second material document number for component consumption is displayed or referenced | — | Component consumption material document number may be displayed or logged separately |
| 24 | Navigate to the "Display Inspection Lot" or "Quality Inspection" application via the search bar | — | Quality Inspection or Inspection Lot application opens |
| 25 | Search for inspection lots created for material `{TD.finishedMaterialId}` in plant `{TD.plant}` on today's date | `{TD.finishedMaterialId}`, `{TD.plant}` | Search results display recently created inspection lots |
| 26 | Locate the inspection lot linked to the material document from step 22 | Material Document: (from step 22) | Inspection lot appears in the list with status "Created" or "Released for Use" |
| 27 | Verify the inspection lot details: material, batch (if batch-managed), plant, and creation trigger | `{TD.finishedMaterialId}`, `{TD.plant}`, Trigger: "Goods Receipt" | Inspection lot details confirm it was created automatically at goods receipt per GMP rules |
| 28 | Navigate to the "Stock Overview" application via the search bar | — | Stock Overview application opens |
| 29 | In the "Material" filter field, enter the Component Material ID | `{TD.componentMaterialId}` | Component Material ID is entered in the filter |
| 30 | In the "Plant" filter field, enter the plant code | `{TD.plant}` | Plant code is entered in the filter |
| 31 | Click the "Go" button to execute the stock query | — | Stock overview results are displayed |
| 32 | Locate the "Stock provided to vendor" (special stock "O") row for the CMO supplier | `{TD.cmoSupplierId}` | Stock provided to vendor row is displayed for the supplier |
| 33 | Verify that the stock quantity has been reduced by the component consumption quantity | Stock reduced by `{TD.componentConsumptionQuantity}` | Component stock at vendor is reduced by the auto-consumed quantity (backflushing) |
| 34 | Navigate to the "Stock Overview" for the finished material `{TD.finishedMaterialId}` | `{TD.finishedMaterialId}`, `{TD.plant}` | Stock overview for finished material is displayed |
| 35 | Verify that the finished goods have been received into quality inspection stock (if batch-managed) or unrestricted stock | GR Quantity: `{TD.grQuantity}` in Quality Inspection or Unrestricted | Finished goods stock is increased by the GR quantity; stock type depends on QM configuration |
| 36 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 37 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 38 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique material document number is generated by SAP for the goods receipt of the finished product
- Finished material `{TD.finishedMaterialId}` is received into plant `{TD.plant}` storage location `{TD.storageLocation}` with quantity `{TD.grQuantity}`
- Component material `{TD.componentMaterialId}` is automatically consumed (backflushed) from special stock "O" (stock provided to vendor) with quantity `{TD.componentConsumptionQuantity}` based on BOM ratio
- A material document for component consumption (movement type 543) is created automatically
- A quality inspection lot is automatically created for the received finished goods per GMP receipt rules
- Stock provided to vendor for component is reduced by the consumed quantity
- Finished goods appear in quality inspection stock or unrestricted stock depending on QM configuration

---

### Post-conditions

- Material document for goods receipt (movement type 101) exists with reference to subcontracting PO
- Material document for component consumption (movement type 543) exists, linked to the GR document
- Quality inspection lot exists for finished material `{TD.finishedMaterialId}` with status "Created" or "Released for Use"
- Special stock "O" for component at CMO is reduced by the consumption quantity
- Finished goods stock in plant is increased by the GR quantity
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
