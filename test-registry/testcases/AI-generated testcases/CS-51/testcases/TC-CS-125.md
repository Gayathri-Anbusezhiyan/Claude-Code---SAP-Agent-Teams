# TC-CS-125: Confirm Process Order with Single Batch Consumption (FEFO-Proposed Batch Exact Quantity)

**User Story:**          [CS-51] Perform A Goods Issue (Backflush) Of Raw Material Batches To A Process
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Process Order Goods Issue with Batch Backflush
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
| P1 | User Role | User has the role of Production Operator with SAP authorization to confirm process orders and post goods movements |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Process Order `{TD.processOrderNumber}` exists, is in Released status, and is assigned to plant `{TD.plant}` |
| P4 | Master Data | Component material `{TD.componentMaterialId}` is batch-managed, configured for backflush, and exists in the BOM for the process order |
| P5 | Master Data | Batch `{TD.batchNumber}` for material `{TD.componentMaterialId}` has available unrestricted stock quantity `{TD.batchAvailableQty}` in storage location `{TD.storageLocation}` |
| P6 | Master Data | Batch `{TD.batchNumber}` has Shelf Life Expiration Date (SLED) `{TD.batchExpirationDate}` and is not expired |
| P7 | Master Data | Batch `{TD.batchNumber}` is not on quality hold and has stock type "Unrestricted Use" |
| P8 | Configuration | FEFO (First Expired, First Out) batch determination strategy is active for material `{TD.componentMaterialId}` in plant `{TD.plant}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-51/CS-51-testdata.json` — Dataset ID: `TD-CS-051-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Process order number in Released status | Valid |
| Yield Quantity | `{TD.yieldQuantity}` | Confirmed yield quantity for the process order | Valid |
| Posting Date | `{TD.postingDate}` | Goods movement posting date (today's date) | Valid |
| Plant | `{TD.plant}` | Production plant code | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location for batch-managed material | Valid |
| Component Material ID | `{TD.componentMaterialId}` | Raw material number (backflush component) | Valid |
| Batch Number | `{TD.batchNumber}` | FEFO-proposed batch number with exact required quantity | Valid |
| Batch Available Quantity | `{TD.batchAvailableQty}` | Available unrestricted stock quantity for the batch (matches required qty) | Valid |
| Batch Expiration Date | `{TD.batchExpirationDate}` | SLED of the batch (earliest expiration per FEFO) | Valid |
| Required Component Quantity | `{TD.requiredComponentQty}` | Quantity of component required based on yield (auto-calculated by SAP) | Valid |
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
| 11 | Verify that the process order status is "Released" or "In Process" | — | Order status is displayed as "Released" or "In Process" |
| 12 | In the "Yield" field, enter the confirmed yield quantity | `{TD.yieldQuantity}` | Yield quantity is entered |
| 13 | Press Enter to confirm the Yield entry | — | SAP recalculates component requirements; component list is updated with required quantities |
| 14 | Navigate to the "Components" or "Material" tab to view backflush components | — | Components section is displayed showing all backflush materials |
| 15 | Verify that component material `{TD.componentMaterialId}` is listed | `{TD.componentMaterialId}` | Component material is displayed in the components list |
| 16 | Verify that the required quantity for the component is calculated based on the yield | `{TD.requiredComponentQty}` | Required quantity field displays the calculated value based on yield and BOM |
| 17 | Verify that the system automatically proposes batch `{TD.batchNumber}` for the component | `{TD.batchNumber}` | Batch number `{TD.batchNumber}` is auto-populated in the batch field per FEFO logic |
| 18 | Verify that the proposed batch has the earliest expiration date per FEFO logic | `{TD.batchExpirationDate}` | Batch expiration date (SLED) is displayed; confirms this is the earliest expiring batch available |
| 19 | Verify that the batch available quantity matches or exceeds the required component quantity | `{TD.batchAvailableQty}` | Available quantity for batch `{TD.batchNumber}` is displayed as `{TD.batchAvailableQty}` (sufficient for requirement) |
| 20 | In the "Posting Date" field, verify or enter the posting date | `{TD.postingDate}` | Posting date is populated with today's date (or entered if blank) |
| 21 | Click the "Confirm" or "Post" button to confirm the process order | — | SAP begins processing the goods issue and order confirmation |
| 22 | Observe the on-screen confirmation response | — | A success message is displayed confirming the process order confirmation and material document number |
| 23 | Note the Material Document Number from the success message | — | Material Document Number is displayed (10-digit format) |
| 24 | Verify that the confirmation message indicates goods movement type 261 (backflush consumption) | — | Message or document details confirm movement type 261 |
| 25 | Navigate to the "Batch Traceability" or "Batch Where-Used" application (via search bar) | — | Batch traceability application opens |
| 26 | Search for the finished product batch `{TD.finishedProductBatch}` | `{TD.finishedProductBatch}` | Batch traceability search displays the finished product batch |
| 27 | Verify that consumed raw material batch `{TD.batchNumber}` is linked to the finished product batch in the genealogy record | `{TD.batchNumber}`, `{TD.finishedProductBatch}` | Batch genealogy (WHERE-USED) record displays the linkage: raw batch `{TD.batchNumber}` → finished batch `{TD.finishedProductBatch}` |
| 28 | Navigate back to "Display Material Document" application (via search bar) | — | "Display Material Document" application opens |
| 29 | Enter the Material Document Number noted in step 23 | — | Material Document is retrieved and displayed |
| 30 | Verify that the material document shows component material `{TD.componentMaterialId}`, batch `{TD.batchNumber}`, and consumed quantity | `{TD.componentMaterialId}`, `{TD.batchNumber}`, `{TD.requiredComponentQty}` | Material Document displays: Material = `{TD.componentMaterialId}`, Batch = `{TD.batchNumber}`, Quantity = `{TD.requiredComponentQty}`, Movement Type = 261 |
| 31 | Navigate to "Display Stock Overview" application (via search bar) to verify inventory update | — | "Display Stock Overview" application opens |
| 32 | Search for material `{TD.componentMaterialId}`, plant `{TD.plant}`, storage location `{TD.storageLocation}`, batch `{TD.batchNumber}` | `{TD.componentMaterialId}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.batchNumber}` | Stock overview is displayed for the specified material-batch-plant-SLoc combination |
| 33 | Verify that the unrestricted stock quantity for batch `{TD.batchNumber}` has been reduced by the consumed quantity | `{TD.requiredComponentQty}` | Stock balance shows reduction of `{TD.requiredComponentQty}` from the original available quantity `{TD.batchAvailableQty}` |
| 34 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 35 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 36 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Process order `{TD.processOrderNumber}` is successfully confirmed with yield quantity `{TD.yieldQuantity}`
- Material Document Number (10-digit) is generated by SAP for movement type 261 (goods issue / backflush)
- Raw material batch `{TD.batchNumber}` is automatically consumed per FEFO logic (earliest expiration date)
- Batch `{TD.batchNumber}` quantity is reduced by `{TD.requiredComponentQty}` in real-time inventory
- Batch genealogy linkage is recorded: raw material batch `{TD.batchNumber}` is linked to finished product batch `{TD.finishedProductBatch}` for traceability
- Material document displays correct component material, batch number, consumed quantity, and movement type 261
- Stock overview confirms inventory reduction for the consumed batch in real time

---

### Post-conditions

- Process order `{TD.processOrderNumber}` status is updated to "Confirmed" or "Partially Confirmed"
- Material Document for goods movement type 261 exists with the generated document number
- Batch `{TD.batchNumber}` unrestricted stock is reduced by `{TD.requiredComponentQty}`
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
