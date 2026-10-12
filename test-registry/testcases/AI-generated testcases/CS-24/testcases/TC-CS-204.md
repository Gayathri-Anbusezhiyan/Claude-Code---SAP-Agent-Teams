# TC-CS-204: Post Partial Goods Receipt and Verify Partial Component Consumption

**User Story:**          [CS-24] Create A Subcontracting Purchase Order For Outsourced Fill-Finish Manu
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Subcontracting Partial Goods Receipt with Partial Component Consumption
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Clerk or Goods Receipt Processor with SAP authorization to post goods receipts |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | PO Exists | Subcontracting Purchase Order `{TD.subcontractingPONumber}` exists with item category "L", order quantity `{TD.poOrderQuantity}`, and special stock indicator "O" |
| P4 | Components Issued | Component material `{TD.componentMaterialId}` has been issued to vendor `{TD.cmoSupplierId}` via movement type 541; sufficient special stock "O" exists to cover partial consumption (stock ≥ `{TD.partialComponentConsumptionQuantity}`) |
| P5 | Configuration | Plant `{TD.plant}` is configured for subcontracting procurement with automatic component consumption (backflushing) enabled |

---

### Test Data

**Dataset Reference:** `testdata/CS-24/CS-24-testdata.json` — Dataset ID: `TD-CS-24-AP-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Subcontracting PO Number | `{TD.subcontractingPONumber}` | Existing subcontracting PO number — entered by the user | Valid |
| PO Item Number | `{TD.poItemNumber}` | Line item number on the PO — entered by the user | Valid |
| PO Order Quantity | `{TD.poOrderQuantity}` | Total order quantity on the PO line item — reference value | Valid |
| Finished Material ID | `{TD.finishedMaterialId}` | Finished product material to be received — auto-populated from PO | Valid |
| Partial GR Quantity | `{TD.partialGRQuantity}` | Partial quantity of finished product to receive (less than PO order quantity) — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — auto-populated from PO | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location for finished goods receipt — entered by the user | Valid |
| Component Material ID | `{TD.componentMaterialId}` | Component material to be auto-consumed — auto-determined by SAP | Valid |
| Partial Component Consumption Quantity | `{TD.partialComponentConsumptionQuantity}` | Expected component consumption quantity based on BOM and partial GR quantity — calculated by SAP | Valid |
| Remaining PO Quantity | `{TD.remainingPOQuantity}` | Remaining quantity on PO after partial GR — reference value for verification | Valid |
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
| 11 | Locate the line item with finished material `{TD.finishedMaterialId}` and item category "L" | `{TD.finishedMaterialId}`, Item Category: "L" | Line item is displayed with material description, order quantity `{TD.poOrderQuantity}`, and item category "L" |
| 12 | Verify that the order quantity on the PO line is the full original quantity | Order Quantity: `{TD.poOrderQuantity}` | Full order quantity is displayed |
| 13 | Select the checkbox for the line item to include it in the goods receipt | — | Line item is selected; item details section becomes active |
| 14 | In the "Quantity" field for the selected line item, enter the partial GR quantity | `{TD.partialGRQuantity}` | Partial GR quantity (less than full order quantity) is entered |
| 15 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; component consumption is calculated automatically based on BOM and partial GR quantity |
| 16 | Verify that the GR quantity is less than the PO order quantity | GR Quantity `{TD.partialGRQuantity}` < PO Quantity `{TD.poOrderQuantity}` | Partial GR quantity is confirmed as less than full order quantity |
| 17 | In the "Storage Location" field, enter the storage location for the finished goods | `{TD.storageLocation}` | Storage location is entered |
| 18 | Press Enter to confirm the Storage Location entry | — | Storage location is confirmed |
| 19 | Verify that the item shows item category "L" and special stock indicator "O" | Item Category: "L", Special Stock: "O" | Item category "L" and special stock "O" are displayed, indicating subcontracting process |
| 20 | Expand the component details or navigate to the component consumption preview (if available in UI) | — | Component list is displayed showing materials to be auto-consumed |
| 21 | Verify that component material `{TD.componentMaterialId}` appears in the consumption list with partial consumption quantity | `{TD.componentMaterialId}`, `{TD.partialComponentConsumptionQuantity}` | Component material and partial consumption quantity (calculated from BOM ratio × partial GR quantity) are displayed |
| 22 | Click the "Post" or "Save" button to post the partial goods receipt | — | SAP begins processing the partial goods receipt and partial component consumption |
| 23 | Observe the on-screen confirmation response | — | A success message is displayed containing the material document number for the partial goods receipt |
| 24 | Note the material document number (goods receipt) from the success message | — | Material document number for partial GR is displayed (typically 10-digit numeric beginning with 49) |
| 25 | Navigate back to the "Manage Purchase Orders" application via the search bar | — | Manage Purchase Orders application opens |
| 26 | Search for the PO `{TD.subcontractingPONumber}` | `{TD.subcontractingPONumber}` | The subcontracting PO appears in the list |
| 27 | Click the PO number to open the PO details | — | PO details page opens displaying header and item data |
| 28 | Verify that the PO line item shows a remaining open quantity | Remaining Quantity: `{TD.remainingPOQuantity}` | PO line item displays the remaining quantity = original order quantity minus partial GR quantity |
| 29 | Verify that the PO status is still "Open" or "Partially Received" | Status: "Open" or "Partially Received" | PO is not fully completed; remaining quantity can still be received |
| 30 | Navigate to the "Stock Overview" application via the search bar | — | Stock Overview application opens |
| 31 | In the "Material" filter field, enter the Component Material ID | `{TD.componentMaterialId}` | Component Material ID is entered in the filter |
| 32 | In the "Plant" filter field, enter the plant code | `{TD.plant}` | Plant code is entered in the filter |
| 33 | Click the "Go" button to execute the stock query | — | Stock overview results are displayed |
| 34 | Locate the "Stock provided to vendor" (special stock "O") row for the CMO supplier | `{TD.cmoSupplierId}` | Stock provided to vendor row is displayed for the supplier |
| 35 | Verify that the stock quantity has been reduced by the partial component consumption quantity | Stock reduced by `{TD.partialComponentConsumptionQuantity}` | Component stock at vendor is reduced by the partial consumed quantity (proportional to partial GR) |
| 36 | Verify that remaining component stock is still available at the vendor for future GRs | Remaining stock > 0 | Sufficient component stock remains at vendor to support remaining PO quantity |
| 37 | Navigate to the "Stock Overview" for the finished material `{TD.finishedMaterialId}` | `{TD.finishedMaterialId}`, `{TD.plant}` | Stock overview for finished material is displayed |
| 38 | Verify that the finished goods have been received with the partial GR quantity | GR Quantity: `{TD.partialGRQuantity}` | Finished goods stock is increased by the partial GR quantity |
| 39 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 40 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 41 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique material document number is generated by SAP for the partial goods receipt of the finished product
- Finished material `{TD.finishedMaterialId}` is received into plant `{TD.plant}` storage location `{TD.storageLocation}` with partial quantity `{TD.partialGRQuantity}` (less than full PO order quantity)
- Component material `{TD.componentMaterialId}` is automatically consumed (backflushed) from special stock "O" (stock provided to vendor) with partial consumption quantity `{TD.partialComponentConsumptionQuantity}` based on BOM ratio and partial GR quantity
- A material document for partial component consumption (movement type 543) is created automatically
- PO line item shows remaining open quantity = original order quantity minus partial GR quantity
- PO status is "Open" or "Partially Received" (not fully completed)
- Stock provided to vendor for component is reduced by the partial consumed quantity; remaining component stock is available at CMO for future receipts
- Finished goods appear in stock with the partial GR quantity

---

### Post-conditions

- Material document for partial goods receipt (movement type 101) exists with reference to subcontracting PO
- Material document for partial component consumption (movement type 543) exists, linked to the partial GR document
- Special stock "O" for component at CMO is reduced by the partial consumption quantity
- Remaining component stock at CMO is sufficient to support remaining PO quantity
- Finished goods stock in plant is increased by the partial GR quantity
- PO line item has remaining open quantity; PO is not fully completed
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
