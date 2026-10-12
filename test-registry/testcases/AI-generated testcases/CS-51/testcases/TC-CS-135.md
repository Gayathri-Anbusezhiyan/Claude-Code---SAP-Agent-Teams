# TC-CS-135: Confirm Process Order with Minimum Yield Quantity (Lower Boundary)

**User Story:**          [CS-51] Perform A Goods Issue (Backflush) Of Raw Material Batches To A Process
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Process Order Goods Issue with Batch Backflush
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
| P1 | User Role | User has the role of Production Operator with SAP authorization to confirm process orders and post goods movements |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Process Order `{TD.processOrderNumber}` exists, is in Released status, and is assigned to plant `{TD.plant}` |
| P4 | Master Data | Component material `{TD.componentMaterialId}` is batch-managed, configured for backflush, and exists in the BOM for the process order |
| P5 | Master Data | Batch `{TD.batchNumber}` for material `{TD.componentMaterialId}` has available unrestricted stock and is not on quality hold |
| P6 | Configuration | Minimum valid yield quantity per UoM is 0.001 (lower boundary threshold) |

---

### Test Data

**Dataset Reference:** `testdata/CS-51/CS-51-testdata.json` — Dataset ID: `TD-CS-051-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Process order number in Released status | Valid |
| Minimum Yield Quantity | `{TD.minYieldQuantity}` | Minimum valid yield quantity (0.001 per UoM) — lower boundary | Valid (boundary) |
| Posting Date | `{TD.postingDate}` | Goods movement posting date (today's date) | Valid |
| Plant | `{TD.plant}` | Production plant code | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location for batch-managed material | Valid |
| Component Material ID | `{TD.componentMaterialId}` | Raw material number (backflush component) | Valid |
| Batch Number | `{TD.batchNumber}` | FEFO-proposed batch number | Valid |
| Required Component Quantity | `{TD.minRequiredComponentQty}` | Minimum quantity of component required based on minimum yield (auto-calculated by SAP) | Valid (boundary) |
| Finished Product Batch | `{TD.finishedProductBatch}` | Finished product batch number for genealogy linkage | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Confirm Process Order" | — | Search results appear listing the "Confirm Process Order" application |
| 8 | Click "Confirm Process Order" from the search results | — | "Confirm Process Order" application opens |
| 9 | In the "Order" field, enter the Process Order Number | `{TD.processOrderNumber}` | Process Order Number is entered into the field |
| 10 | Press Enter to confirm the Process Order entry | — | SAP validates and loads the process order details; order header information is displayed |
| 11 | In the "Yield" field, enter the minimum valid yield quantity (0.001 or equivalent minimum per UoM) | `{TD.minYieldQuantity}` | Minimum yield quantity `{TD.minYieldQuantity}` is entered |
| 12 | Press Enter to confirm the Yield entry | — | SAP recalculates component requirements; component list is updated with required quantities based on minimum yield and BOM |
| 13 | Navigate to the "Components" or "Material" tab to view backflush components | — | Components section is displayed showing all backflush materials |
| 14 | Verify that component material `{TD.componentMaterialId}` is listed | `{TD.componentMaterialId}` | Component material is displayed in the components list |
| 15 | Verify that the required quantity for the component is calculated based on the minimum yield | `{TD.minRequiredComponentQty}` | Required quantity field displays the minimum calculated value `{TD.minRequiredComponentQty}` (proportional to minimum yield) |
| 16 | Verify that the system automatically proposes batch `{TD.batchNumber}` for the component | `{TD.batchNumber}` | Batch number `{TD.batchNumber}` is auto-populated in the batch field per FEFO logic |
| 17 | Verify that the batch has sufficient available quantity to cover the minimum required quantity | — | Available quantity for batch `{TD.batchNumber}` is sufficient (≥ `{TD.minRequiredComponentQty}`) |
| 18 | In the "Posting Date" field, verify or enter the posting date | `{TD.postingDate}` | Posting date is populated with today's date |
| 19 | Click the "Confirm" or "Post" button to confirm the process order | — | SAP begins processing the goods issue and order confirmation |
| 20 | Observe the on-screen confirmation response | — | A success message is displayed confirming the process order confirmation and material document number |
| 21 | Note the Material Document Number from the success message | — | Material Document Number is displayed (10-digit format) |
| 22 | Verify that the confirmation message indicates goods movement type 261 (backflush consumption) | — | Message or document details confirm movement type 261 |
| 23 | Navigate to "Display Material Document" application (via search bar) | — | "Display Material Document" application opens |
| 24 | Enter the Material Document Number noted in step 21 | — | Material Document is retrieved and displayed |
| 25 | Verify that the material document shows component material, batch, and minimum consumed quantity | `{TD.componentMaterialId}`, `{TD.batchNumber}`, `{TD.minRequiredComponentQty}` | Material Document displays: Material = `{TD.componentMaterialId}`, Batch = `{TD.batchNumber}`, Quantity = `{TD.minRequiredComponentQty}` (minimum boundary value), Movement Type = 261 |
| 26 | Verify that the quantity precision is maintained correctly (e.g., 0.001 displayed accurately) | `{TD.minRequiredComponentQty}` | Quantity field shows the minimum value with correct decimal precision (e.g., 0.001 or equivalent UoM-specific minimum) |
| 27 | Navigate to "Display Stock Overview" application (via search bar) to verify inventory update | — | "Display Stock Overview" application opens |
| 28 | Search for material `{TD.componentMaterialId}`, plant `{TD.plant}`, storage location `{TD.storageLocation}`, batch `{TD.batchNumber}` | `{TD.componentMaterialId}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.batchNumber}` | Stock overview is displayed for the specified material-batch-plant-SLoc combination |
| 29 | Verify that the unrestricted stock quantity for batch `{TD.batchNumber}` has been reduced by the minimum consumed quantity | `{TD.minRequiredComponentQty}` | Stock balance shows reduction of `{TD.minRequiredComponentQty}` (minimum boundary value) in real time |
| 30 | Verify that inventory precision is maintained (no rounding errors for minimum quantity) | — | Stock balance displays the reduction with correct decimal precision |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Process order `{TD.processOrderNumber}` is successfully confirmed with minimum yield quantity `{TD.minYieldQuantity}` (lower boundary)
- Material Document Number (10-digit) is generated by SAP for movement type 261
- Component consumption is calculated correctly based on minimum yield (BOM factor × minimum yield = minimum required component qty)
- Batch `{TD.batchNumber}` quantity is reduced by `{TD.minRequiredComponentQty}` in real-time inventory
- Material document displays minimum consumed quantity with correct decimal precision
- Stock overview confirms inventory reduction for the minimum quantity in real time without rounding errors

---

### Post-conditions

- Process order `{TD.processOrderNumber}` status is updated to "Confirmed" or "Partially Confirmed"
- Material Document for goods movement type 261 exists with the minimum consumed quantity
- Batch `{TD.batchNumber}` unrestricted stock is reduced by `{TD.minRequiredComponentQty}` (minimum boundary value)
- Batch genealogy record links raw material batch `{TD.batchNumber}` to finished product batch `{TD.finishedProductBatch}`
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
