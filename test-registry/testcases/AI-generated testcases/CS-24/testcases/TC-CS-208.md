# TC-CS-208: Attempt Goods Receipt When Insufficient Component Stock at Vendor

**User Story:**          [CS-24] Create A Subcontracting Purchase Order For Outsourced Fill-Finish Manu
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Subcontracting Goods Receipt - Component Stock Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
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
| P4 | Insufficient Component Stock | Component material `{TD.componentMaterialId}` has been issued to vendor `{TD.cmoSupplierId}` via movement type 541, but the special stock "O" quantity is LESS than the required consumption quantity for the attempted GR (insufficient stock scenario: current stock < `{TD.requiredComponentConsumptionQuantity}`) |
| P5 | Configuration | Plant `{TD.plant}` is configured for subcontracting procurement with automatic component consumption (backflushing) enabled |

---

### Test Data

**Dataset Reference:** `testdata/CS-24/CS-24-testdata.json` — Dataset ID: `TD-CS-24-NEG-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Subcontracting PO Number | `{TD.subcontractingPONumber}` | Existing subcontracting PO number — entered by the user | Valid |
| PO Item Number | `{TD.poItemNumber}` | Line item number on the PO — entered by the user | Valid |
| Finished Material ID | `{TD.finishedMaterialId}` | Finished product material to be received — auto-populated from PO | Valid |
| GR Quantity | `{TD.grQuantity}` | Quantity of finished product to receive — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — auto-populated from PO | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location for finished goods receipt — entered by the user | Valid |
| Component Material ID | `{TD.componentMaterialId}` | Component material to be auto-consumed — auto-determined by SAP | Valid |
| Required Component Consumption Quantity | `{TD.requiredComponentConsumptionQuantity}` | Required component consumption quantity based on BOM and GR quantity — calculated by SAP | Valid |
| Actual Component Stock at Vendor | `{TD.actualComponentStockAtVendor}` | Current special stock "O" quantity at vendor (insufficient — less than required) — reference value | Invalid (insufficient) |
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
| 7 | Navigate to the "Stock Overview" application via the search bar (pre-verification step) | — | Stock Overview application opens |
| 8 | Verify the current component stock at vendor before attempting GR | `{TD.componentMaterialId}`, `{TD.plant}`, `{TD.cmoSupplierId}` | Stock provided to vendor (special stock "O") shows quantity `{TD.actualComponentStockAtVendor}`, which is less than the required consumption quantity `{TD.requiredComponentConsumptionQuantity}` |
| 9 | Navigate back to the Fiori home page | — | Fiori home page is displayed |
| 10 | Click the search icon (top-right shell bar) and type "Goods Receipt for Purchase Order" | — | Search results appear listing the goods receipt application |
| 11 | Click "Goods Receipt for Purchase Order" (MIGO equivalent) from the search results | — | Goods Receipt application opens |
| 12 | In the "Purchase Order" field, enter the Subcontracting PO number | `{TD.subcontractingPONumber}` | Subcontracting PO number is entered |
| 13 | Press Enter to confirm the PO entry | — | SAP retrieves the PO; PO line items are displayed in the item overview table |
| 14 | Locate the line item with finished material `{TD.finishedMaterialId}` and item category "L" | `{TD.finishedMaterialId}`, Item Category: "L" | Line item is displayed with material description, order quantity, and item category "L" |
| 15 | Select the checkbox for the line item to include it in the goods receipt | — | Line item is selected; item details section becomes active |
| 16 | In the "Quantity" field for the selected line item, enter the GR quantity | `{TD.grQuantity}` | GR quantity is entered |
| 17 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; SAP calculates required component consumption quantity based on BOM |
| 18 | In the "Storage Location" field, enter the storage location for the finished goods | `{TD.storageLocation}` | Storage location is entered |
| 19 | Press Enter to confirm the Storage Location entry | — | Storage location is confirmed |
| 20 | Verify that the item shows item category "L" and special stock indicator "O" | Item Category: "L", Special Stock: "O" | Item category "L" and special stock "O" are displayed, indicating subcontracting process |
| 21 | Click the "Post" or "Save" button to post the goods receipt | — | SAP begins validation for goods receipt and component consumption |
| 22 | Observe the on-screen error response | — | An error message is displayed indicating that insufficient component stock is available at the vendor for consumption |
| 23 | Verify the error message content | Error message contains reference to component stock shortage or insufficient special stock "O" | Error message describes the stock validation failure; typical message: "Insufficient component stock at vendor" or "Special stock O for component is insufficient for consumption" or "Component stock not available for subcontracting backflush" |
| 24 | Verify the component material and required vs. actual stock quantities in the error message (if detailed) | Component: `{TD.componentMaterialId}`, Required: `{TD.requiredComponentConsumptionQuantity}`, Actual: `{TD.actualComponentStockAtVendor}` | Error message shows the component material and the stock shortage details |
| 25 | Verify that the goods receipt is NOT posted | — | No material document number is generated; the GR remains in draft/unsaved state |
| 26 | Verify that the system remains on the goods receipt screen | — | User remains on the GR screen; no navigation occurs |
| 27 | Navigate to the "Stock Overview" application via the search bar (post-verification step) | — | Stock Overview application opens |
| 28 | Verify that the component stock at vendor has NOT changed | `{TD.componentMaterialId}`, `{TD.plant}`, `{TD.cmoSupplierId}` | Stock provided to vendor (special stock "O") remains at the original quantity `{TD.actualComponentStockAtVendor}`; no consumption has occurred |
| 29 | Verify that the finished goods stock has NOT increased | `{TD.finishedMaterialId}`, `{TD.plant}` | Finished goods stock in plant has not changed; no goods receipt has been posted |
| 30 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 31 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 32 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP rejects the goods receipt posting due to insufficient component stock at vendor validation failure
- An error message is displayed indicating that component stock provided to vendor (special stock "O") is insufficient to support the automatic component consumption (backflushing)
- No material document number is generated for the goods receipt
- No goods receipt document is persisted in SAP
- No component consumption occurs
- Component stock at vendor remains unchanged
- Finished goods stock remains unchanged
- User remains on the goods receipt screen to adjust the GR quantity or issue additional components to the vendor before retrying

---

### Post-conditions

- No material document for goods receipt is created
- No material document for component consumption is created
- Special stock "O" for component at CMO remains unchanged
- Finished goods stock in plant remains unchanged
- Error message is displayed to the user
- No application-level data corruption occurs
- Inventory accuracy is maintained; system prevents inventory discrepancies by rejecting GR when components are not available

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
