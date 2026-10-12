# TC-CS-136: Confirm Process Order with Batch Quantity Exactly Matching Required Quantity (Exact Boundary)

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
| P5 | Master Data | Batch `{TD.exactBatchNumber}` for material `{TD.componentMaterialId}` has available unrestricted stock quantity EXACTLY EQUAL to the required component quantity (boundary: exact match) |
| P6 | Master Data | Batch `{TD.exactBatchNumber}` is not on quality hold and has stock type "Unrestricted Use" |
| P7 | Configuration | System does NOT require substitute batch selection when available quantity exactly matches required quantity |

---

### Test Data

**Dataset Reference:** `testdata/CS-51/CS-51-testdata.json` — Dataset ID: `TD-CS-051-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Process order number in Released status | Valid |
| Yield Quantity | `{TD.yieldQuantity}` | Confirmed yield quantity for the process order | Valid |
| Posting Date | `{TD.postingDate}` | Goods movement posting date (today's date) | Valid |
| Plant | `{TD.plant}` | Production plant code | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location for batch-managed material | Valid |
| Component Material ID | `{TD.componentMaterialId}` | Raw material number (backflush component) | Valid |
| Exact Batch Number | `{TD.exactBatchNumber}` | Batch number with available quantity exactly matching required quantity (boundary) | Valid (boundary) |
| Exact Batch Available Qty | `{TD.exactBatchAvailableQty}` | Available quantity for exact batch (equals required component qty) | Valid (boundary) |
| Required Component Quantity | `{TD.requiredComponentQty}` | Quantity of component required based on yield (equals exact batch available qty) | Valid (boundary) |
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
| 12 | Press Enter to confirm the Yield entry | — | SAP recalculates component requirements; component list is updated with required quantities based on yield and BOM |
| 13 | Navigate to the "Components" or "Material" tab to view backflush components | — | Components section is displayed showing all backflush materials |
| 14 | Verify that component material `{TD.componentMaterialId}` is listed | `{TD.componentMaterialId}` | Component material is displayed in the components list |
| 15 | Verify that the required quantity for the component is `{TD.requiredComponentQty}` | `{TD.requiredComponentQty}` | Required quantity field displays `{TD.requiredComponentQty}` |
| 16 | Verify that the system automatically proposes batch `{TD.exactBatchNumber}` for the component | `{TD.exactBatchNumber}` | Batch number `{TD.exactBatchNumber}` is auto-populated in the batch field per FEFO logic |
| 17 | Verify that the batch available quantity EXACTLY MATCHES the required component quantity | `{TD.exactBatchAvailableQty}`, `{TD.requiredComponentQty}` | Available quantity for batch `{TD.exactBatchNumber}` is displayed as `{TD.exactBatchAvailableQty}`, which equals `{TD.requiredComponentQty}` (exact match / boundary) |
| 18 | Verify that NO substitute batch is proposed or required | — | Only one batch line is displayed; no additional substitute batch line appears; no substitute batch warning is displayed |
| 19 | Verify that NO warning message is displayed regarding insufficient batch quantity | — | No warning or informational message is displayed (batch quantity is sufficient by exact match) |
| 20 | In the "Posting Date" field, verify or enter the posting date | `{TD.postingDate}` | Posting date is populated with today's date |
| 21 | Click the "Confirm" or "Post" button to confirm the process order | — | SAP begins processing the goods issue and order confirmation |
| 22 | Observe the on-screen confirmation response | — | A success message is displayed confirming the process order confirmation and material document number |
| 23 | Note the Material Document Number from the success message | — | Material Document Number is displayed (10-digit format) |
| 24 | Verify that the confirmation message indicates goods movement type 261 (backflush consumption) | — | Message or document details confirm movement type 261 |
| 25 | Navigate to "Display Material Document" application (via search bar) | — | "Display Material Document" application opens |
| 26 | Enter the Material Document Number noted in step 23 | — | Material Document is retrieved and displayed |
| 27 | Verify that the material document shows component material, exact batch, and consumed quantity | `{TD.componentMaterialId}`, `{TD.exactBatchNumber}`, `{TD.requiredComponentQty}` | Material Document displays: Material = `{TD.componentMaterialId}`, Batch = `{TD.exactBatchNumber}`, Quantity = `{TD.requiredComponentQty}` (exact match with batch available qty), Movement Type = 261 |
| 28 | Verify that only one batch line is present in the material document (no substitute batch) | — | Material document displays only one line item for the component; no additional batch lines exist |
| 29 | Navigate to "Display Stock Overview" application (via search bar) to verify inventory update | — | "Display Stock Overview" application opens |
| 30 | Search for material `{TD.componentMaterialId}`, plant `{TD.plant}`, storage location `{TD.storageLocation}`, batch `{TD.exactBatchNumber}` | `{TD.componentMaterialId}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.exactBatchNumber}` | Stock overview is displayed for the specified material-batch-plant-SLoc combination |
| 31 | Verify that the unrestricted stock quantity for batch `{TD.exactBatchNumber}` has been reduced to ZERO (fully consumed) | — | Stock balance for batch `{TD.exactBatchNumber}` shows zero unrestricted stock (original available qty `{TD.exactBatchAvailableQty}` fully consumed; remaining = 0) |
| 32 | Verify that the batch is now fully depleted with no remaining unrestricted stock | — | Stock overview confirms batch `{TD.exactBatchNumber}` has zero unrestricted stock (boundary: exact consumption) |
| 33 | Navigate to the "Batch Traceability" or "Batch Where-Used" application (via search bar) | — | Batch traceability application opens |
| 34 | Search for the finished product batch `{TD.finishedProductBatch}` | `{TD.finishedProductBatch}` | Batch traceability search displays the finished product batch |
| 35 | Verify that consumed batch `{TD.exactBatchNumber}` is linked to the finished product batch in the genealogy record | `{TD.exactBatchNumber}`, `{TD.finishedProductBatch}` | Batch genealogy (WHERE-USED) record displays the linkage: raw batch `{TD.exactBatchNumber}` → finished batch `{TD.finishedProductBatch}` |
| 36 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 37 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 38 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Process order `{TD.processOrderNumber}` is successfully confirmed with yield quantity `{TD.yieldQuantity}`
- Material Document Number (10-digit) is generated by SAP for movement type 261
- Batch `{TD.exactBatchNumber}` with available quantity exactly matching the required quantity is consumed WITHOUT triggering substitute batch selection
- NO substitute batch warning or additional batch line is created
- Batch `{TD.exactBatchNumber}` is fully consumed; unrestricted stock reduced to zero (exact boundary match)
- Batch genealogy linkage is recorded: raw material batch `{TD.exactBatchNumber}` is linked to finished product batch `{TD.finishedProductBatch}`
- Material document displays one batch line with exact quantity match
- Stock overview confirms batch is fully depleted (zero remaining unrestricted stock)

---

### Post-conditions

- Process order `{TD.processOrderNumber}` status is updated to "Confirmed" or "Partially Confirmed"
- Material Document for goods movement type 261 exists with one batch line (exact quantity match)
- Batch `{TD.exactBatchNumber}` unrestricted stock is reduced to zero (fully consumed)
- Batch genealogy record links raw material batch `{TD.exactBatchNumber}` to finished product batch `{TD.finishedProductBatch}`
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
