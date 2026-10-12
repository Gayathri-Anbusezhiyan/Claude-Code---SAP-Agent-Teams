# TC-CS-127: Confirm Process Order Requiring Multiple Batches (Substitute Batch with Warning)

**User Story:**          [CS-51] Perform A Goods Issue (Backflush) Of Raw Material Batches To A Process
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Process Order Goods Issue with Batch Backflush
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
| P1 | User Role | User has the role of Production Operator with SAP authorization to confirm process orders and post goods movements |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Process Order `{TD.processOrderNumber}` exists, is in Released status, and is assigned to plant `{TD.plant}` |
| P4 | Master Data | Component material `{TD.componentMaterialId}` is batch-managed, configured for backflush, and exists in the BOM for the process order |
| P5 | Master Data | Batch `{TD.primaryBatchNumber}` (earliest SLED per FEFO) has available quantity `{TD.primaryBatchPartialQty}` which is LESS than the required component quantity |
| P6 | Master Data | Batch `{TD.substituteBatchNumber}` (second earliest SLED) has sufficient available quantity `{TD.substituteBatchAvailableQty}` to cover the remaining component requirement |
| P7 | Master Data | Both batches are not on quality hold and have stock type "Unrestricted Use" |
| P8 | Configuration | FEFO (First Expired, First Out) batch determination strategy is active; system is configured to propose substitute batches when primary batch is insufficient |

---

### Test Data

**Dataset Reference:** `testdata/CS-51/CS-51-testdata.json` — Dataset ID: `TD-CS-051-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Process order number in Released status | Valid |
| Yield Quantity | `{TD.yieldQuantity}` | Confirmed yield quantity for the process order | Valid |
| Posting Date | `{TD.postingDate}` | Goods movement posting date (today's date) | Valid |
| Plant | `{TD.plant}` | Production plant code | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location for batch-managed material | Valid |
| Component Material ID | `{TD.componentMaterialId}` | Raw material number (backflush component) | Valid |
| Primary Batch Number | `{TD.primaryBatchNumber}` | FEFO-selected batch (earliest SLED, insufficient quantity) | Valid |
| Primary Batch Partial Qty | `{TD.primaryBatchPartialQty}` | Available quantity for primary batch (less than required) | Valid |
| Substitute Batch Number | `{TD.substituteBatchNumber}` | Second batch auto-selected to cover remaining quantity | Valid |
| Substitute Batch Available Qty | `{TD.substituteBatchAvailableQty}` | Available quantity for substitute batch | Valid |
| Required Component Quantity | `{TD.requiredComponentQty}` | Total quantity of component required (exceeds primary batch qty) | Valid |
| Remaining Quantity After Primary | `{TD.remainingQuantity}` | Quantity to be covered by substitute batch (requiredComponentQty - primaryBatchPartialQty) | Valid |
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
| 11 | In the "Yield" field, enter the confirmed yield quantity | `{TD.yieldQuantity}` | Yield quantity is entered |
| 12 | Press Enter to confirm the Yield entry | — | SAP recalculates component requirements; component list is updated with required quantities |
| 13 | Navigate to the "Components" or "Material" tab to view backflush components | — | Components section is displayed showing all backflush materials |
| 14 | Verify that component material `{TD.componentMaterialId}` is listed | `{TD.componentMaterialId}` | Component material is displayed in the components list |
| 15 | Verify that the required quantity for the component is `{TD.requiredComponentQty}` | `{TD.requiredComponentQty}` | Required quantity field displays `{TD.requiredComponentQty}` |
| 16 | Verify that the system automatically proposes batch `{TD.primaryBatchNumber}` initially | `{TD.primaryBatchNumber}` | Batch number `{TD.primaryBatchNumber}` is auto-populated in the first batch line |
| 17 | Verify that a warning or informational message is displayed indicating insufficient primary batch quantity | — | A warning/information message is displayed (e.g., "Primary batch quantity insufficient; substitute batch will be selected" or similar SAP message) |
| 18 | Verify that the system automatically adds a second batch line with batch `{TD.substituteBatchNumber}` | `{TD.substituteBatchNumber}` | A second batch line appears with batch number `{TD.substituteBatchNumber}` to cover the remaining quantity |
| 19 | Verify that the first batch line shows batch `{TD.primaryBatchNumber}` with quantity `{TD.primaryBatchPartialQty}` | `{TD.primaryBatchNumber}`, `{TD.primaryBatchPartialQty}` | First batch line: Batch = `{TD.primaryBatchNumber}`, Quantity = `{TD.primaryBatchPartialQty}` |
| 20 | Verify that the second batch line shows batch `{TD.substituteBatchNumber}` with quantity `{TD.remainingQuantity}` | `{TD.substituteBatchNumber}`, `{TD.remainingQuantity}` | Second batch line: Batch = `{TD.substituteBatchNumber}`, Quantity = `{TD.remainingQuantity}` |
| 21 | Verify that the total consumed quantity across both batches equals the required component quantity | `{TD.requiredComponentQty}` | Sum of quantities from both batch lines = `{TD.requiredComponentQty}` |
| 22 | In the "Posting Date" field, verify or enter the posting date | `{TD.postingDate}` | Posting date is populated with today's date |
| 23 | Click the "Confirm" or "Post" button to confirm the process order | — | SAP begins processing the goods issue and order confirmation |
| 24 | Observe the on-screen confirmation response | — | A success message is displayed confirming the process order confirmation and material document number |
| 25 | Note the Material Document Number from the success message | — | Material Document Number is displayed (10-digit format) |
| 26 | Navigate to the "Batch Traceability" or "Batch Where-Used" application (via search bar) | — | Batch traceability application opens |
| 27 | Search for the finished product batch `{TD.finishedProductBatch}` | `{TD.finishedProductBatch}` | Batch traceability search displays the finished product batch |
| 28 | Verify that both consumed batches `{TD.primaryBatchNumber}` and `{TD.substituteBatchNumber}` are linked to the finished product batch | `{TD.primaryBatchNumber}`, `{TD.substituteBatchNumber}`, `{TD.finishedProductBatch}` | Batch genealogy (WHERE-USED) displays linkages: raw batch `{TD.primaryBatchNumber}` → finished batch `{TD.finishedProductBatch}` AND raw batch `{TD.substituteBatchNumber}` → finished batch `{TD.finishedProductBatch}` |
| 29 | Navigate back to "Display Material Document" application (via search bar) | — | "Display Material Document" application opens |
| 30 | Enter the Material Document Number noted in step 25 | — | Material Document is retrieved and displayed |
| 31 | Verify that the material document shows two line items for component material `{TD.componentMaterialId}` with both batches | `{TD.componentMaterialId}`, `{TD.primaryBatchNumber}`, `{TD.substituteBatchNumber}` | Material Document displays two lines: Line 1: Material = `{TD.componentMaterialId}`, Batch = `{TD.primaryBatchNumber}`, Quantity = `{TD.primaryBatchPartialQty}`; Line 2: Material = `{TD.componentMaterialId}`, Batch = `{TD.substituteBatchNumber}`, Quantity = `{TD.remainingQuantity}`; both with Movement Type = 261 |
| 32 | Navigate to "Display Stock Overview" application (via search bar) to verify inventory update | — | "Display Stock Overview" application opens |
| 33 | Search for material `{TD.componentMaterialId}`, plant `{TD.plant}`, storage location `{TD.storageLocation}`, batch `{TD.primaryBatchNumber}` | `{TD.componentMaterialId}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.primaryBatchNumber}` | Stock overview is displayed for primary batch |
| 34 | Verify that the unrestricted stock quantity for primary batch has been reduced by `{TD.primaryBatchPartialQty}` | `{TD.primaryBatchPartialQty}` | Stock balance for primary batch shows reduction of `{TD.primaryBatchPartialQty}` |
| 35 | Search for material `{TD.componentMaterialId}`, plant `{TD.plant}`, storage location `{TD.storageLocation}`, batch `{TD.substituteBatchNumber}` | `{TD.componentMaterialId}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.substituteBatchNumber}` | Stock overview is displayed for substitute batch |
| 36 | Verify that the unrestricted stock quantity for substitute batch has been reduced by `{TD.remainingQuantity}` | `{TD.remainingQuantity}` | Stock balance for substitute batch shows reduction of `{TD.remainingQuantity}` |
| 37 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 38 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 39 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Process order `{TD.processOrderNumber}` is successfully confirmed with yield quantity `{TD.yieldQuantity}`
- Material Document Number (10-digit) is generated by SAP for movement type 261
- System displays a warning when primary batch quantity is insufficient
- System automatically selects substitute batch `{TD.substituteBatchNumber}` to cover the remaining component requirement
- Two batch consumption lines are created: primary batch `{TD.primaryBatchNumber}` (partial qty) + substitute batch `{TD.substituteBatchNumber}` (remaining qty)
- Both batches are linked to finished product batch `{TD.finishedProductBatch}` in genealogy records
- Material document displays two line items with both batches and their respective consumed quantities
- Stock overview confirms inventory reduction for both batches in real time

---

### Post-conditions

- Process order `{TD.processOrderNumber}` status is updated to "Confirmed" or "Partially Confirmed"
- Material Document for goods movement type 261 exists with two line items (one per batch)
- Batch `{TD.primaryBatchNumber}` unrestricted stock is reduced by `{TD.primaryBatchPartialQty}`
- Batch `{TD.substituteBatchNumber}` unrestricted stock is reduced by `{TD.remainingQuantity}`
- Batch genealogy records link both raw material batches to finished product batch `{TD.finishedProductBatch}`
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
