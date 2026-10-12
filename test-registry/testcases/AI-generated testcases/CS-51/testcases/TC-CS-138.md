# TC-CS-138: Confirm Process Order with Zero Available Quantity for FEFO-Proposed Batch (Immediate Substitute Trigger)

**User Story:**          [CS-51] Perform A Goods Issue (Backflush) Of Raw Material Batches To A Process
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Process Order Goods Issue with Batch Backflush
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Operator with SAP authorization to confirm process orders and post goods movements |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Process Order `{TD.processOrderNumber}` exists, is in Released status, and is assigned to plant `{TD.plant}` |
| P4 | Master Data | Component material `{TD.componentMaterialId}` is batch-managed, configured for backflush, and exists in the BOM for the process order |
| P5 | Master Data (EDGE) | Batch `{TD.zeroBatchNumber}` (earliest SLED per FEFO) has ZERO available unrestricted stock quantity (fully depleted) |
| P6 | Master Data | Batch `{TD.substituteBatchNumber}` (second earliest SLED) has sufficient available quantity `{TD.substituteBatchAvailableQty}` to cover the required component quantity |
| P7 | Configuration | System is configured to automatically skip batches with zero available quantity and propose the next available batch per FEFO logic |

---

### Test Data

**Dataset Reference:** `testdata/CS-51/CS-51-testdata.json` — Dataset ID: `TD-CS-051-EDGE-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Process order number in Released status | Valid |
| Yield Quantity | `{TD.yieldQuantity}` | Confirmed yield quantity for the process order | Valid |
| Posting Date | `{TD.postingDate}` | Goods movement posting date (today's date) | Valid |
| Plant | `{TD.plant}` | Production plant code | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location for batch-managed material | Valid |
| Component Material ID | `{TD.componentMaterialId}` | Raw material number (backflush component) | Valid |
| Zero Batch Number | `{TD.zeroBatchNumber}` | FEFO-proposed batch with zero available quantity (boundary: fully depleted) | Invalid (zero qty) |
| Zero Batch SLED | `{TD.zeroBatchSLED}` | Earliest SLED (FEFO priority) but batch has zero stock | Valid (earliest) |
| Substitute Batch Number | `{TD.substituteBatchNumber}` | Second FEFO batch auto-selected due to zero qty in primary batch | Valid |
| Substitute Batch Available Qty | `{TD.substituteBatchAvailableQty}` | Available quantity for substitute batch | Valid |
| Substitute Batch SLED | `{TD.substituteBatchSLED}` | SLED for substitute batch (later than zero batch) | Valid |
| Required Component Quantity | `{TD.requiredComponentQty}` | Quantity of component required based on yield | Valid |
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
| 16 | Verify that the system SKIPS the zero-quantity batch `{TD.zeroBatchNumber}` and automatically proposes substitute batch `{TD.substituteBatchNumber}` | `{TD.substituteBatchNumber}` | Batch field displays `{TD.substituteBatchNumber}` (substitute batch auto-selected; zero-quantity batch is skipped) |
| 17 | Verify that batch `{TD.zeroBatchNumber}` (earliest SLED but zero qty) is NOT displayed as the proposed batch | `{TD.zeroBatchNumber}` | Batch `{TD.zeroBatchNumber}` is NOT shown in the batch field (system skips zero-quantity batches per FEFO logic) |
| 18 | Verify that a warning or informational message is displayed indicating the primary batch was skipped due to zero quantity | — | A warning/information message is displayed (e.g., "Primary batch has zero available quantity; substitute batch selected", "Batch with zero stock skipped", or similar SAP message) |
| 19 | Verify that the substitute batch SLED `{TD.substituteBatchSLED}` is later than the zero batch SLED `{TD.zeroBatchSLED}` | `{TD.substituteBatchSLED}`, `{TD.zeroBatchSLED}` | Substitute batch SLED is later than zero batch SLED (confirms FEFO logic skipped zero-quantity batch and selected next available per expiration order) |
| 20 | Verify that the substitute batch available quantity is sufficient | `{TD.substituteBatchAvailableQty}` | Available quantity for substitute batch `{TD.substituteBatchNumber}` is displayed as `{TD.substituteBatchAvailableQty}` (≥ required quantity) |
| 21 | In the "Posting Date" field, verify or enter the posting date | `{TD.postingDate}` | Posting date is populated with today's date |
| 22 | Click the "Confirm" or "Post" button to confirm the process order | — | SAP begins processing the goods issue and order confirmation |
| 23 | Observe the on-screen confirmation response | — | A success message is displayed confirming the process order confirmation and material document number |
| 24 | Note the Material Document Number from the success message | — | Material Document Number is displayed (10-digit format) |
| 25 | Navigate to "Display Material Document" application (via search bar) | — | "Display Material Document" application opens |
| 26 | Enter the Material Document Number noted in step 24 | — | Material Document is retrieved and displayed |
| 27 | Verify that the material document shows component material with substitute batch `{TD.substituteBatchNumber}` (NOT the zero-quantity batch) | `{TD.componentMaterialId}`, `{TD.substituteBatchNumber}`, `{TD.requiredComponentQty}` | Material Document displays: Material = `{TD.componentMaterialId}`, Batch = `{TD.substituteBatchNumber}`, Quantity = `{TD.requiredComponentQty}`, Movement Type = 261 |
| 28 | Verify that the zero-quantity batch `{TD.zeroBatchNumber}` does NOT appear in the material document | `{TD.zeroBatchNumber}` | Zero-quantity batch `{TD.zeroBatchNumber}` is NOT listed in the material document (confirms it was skipped) |
| 29 | Navigate to "Display Stock Overview" application (via search bar) to verify inventory update | — | "Display Stock Overview" application opens |
| 30 | Search for material `{TD.componentMaterialId}`, plant `{TD.plant}`, storage location `{TD.storageLocation}`, batch `{TD.substituteBatchNumber}` | `{TD.componentMaterialId}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.substituteBatchNumber}` | Stock overview is displayed for the substitute batch |
| 31 | Verify that the unrestricted stock quantity for substitute batch `{TD.substituteBatchNumber}` has been reduced by the consumed quantity | `{TD.requiredComponentQty}` | Stock balance for substitute batch shows reduction of `{TD.requiredComponentQty}` |
| 32 | Search for material `{TD.componentMaterialId}`, plant `{TD.plant}`, storage location `{TD.storageLocation}`, batch `{TD.zeroBatchNumber}` | `{TD.componentMaterialId}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.zeroBatchNumber}` | Stock overview is displayed for the zero-quantity batch |
| 33 | Verify that the stock quantity for zero batch `{TD.zeroBatchNumber}` remains zero (no change, not consumed) | — | Stock balance for zero batch shows zero unrestricted stock (unchanged; batch was skipped) |
| 34 | Navigate to the "Batch Traceability" or "Batch Where-Used" application (via search bar) | — | Batch traceability application opens |
| 35 | Search for the finished product batch `{TD.finishedProductBatch}` | `{TD.finishedProductBatch}` | Batch traceability search displays the finished product batch |
| 36 | Verify that substitute batch `{TD.substituteBatchNumber}` is linked to the finished product batch in the genealogy record | `{TD.substituteBatchNumber}`, `{TD.finishedProductBatch}` | Batch genealogy (WHERE-USED) record displays the linkage: raw batch `{TD.substituteBatchNumber}` → finished batch `{TD.finishedProductBatch}` |
| 37 | Verify that the zero-quantity batch `{TD.zeroBatchNumber}` is NOT linked to the finished product batch | `{TD.zeroBatchNumber}`, `{TD.finishedProductBatch}` | Zero-quantity batch `{TD.zeroBatchNumber}` does NOT appear in the genealogy linkage for finished batch `{TD.finishedProductBatch}` (confirms it was not consumed) |
| 38 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 39 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 40 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Process order `{TD.processOrderNumber}` is successfully confirmed with yield quantity `{TD.yieldQuantity}`
- Material Document Number (10-digit) is generated by SAP for movement type 261
- System automatically skips FEFO-proposed batch `{TD.zeroBatchNumber}` (earliest SLED) due to zero available quantity (boundary)
- System displays a warning indicating primary batch was skipped due to zero quantity
- Substitute batch `{TD.substituteBatchNumber}` (next earliest SLED with available stock) is automatically selected and consumed
- Substitute batch quantity is reduced by `{TD.requiredComponentQty}` in real-time inventory
- Zero-quantity batch remains at zero stock (not consumed)
- Batch genealogy linkage records substitute batch (not zero-quantity batch) to finished product batch
- Material document displays substitute batch only; zero-quantity batch is excluded

---

### Post-conditions

- Process order `{TD.processOrderNumber}` status is updated to "Confirmed" or "Partially Confirmed"
- Material Document for goods movement type 261 exists with substitute batch line
- Substitute batch `{TD.substituteBatchNumber}` unrestricted stock is reduced by `{TD.requiredComponentQty}`
- Zero-quantity batch `{TD.zeroBatchNumber}` unrestricted stock remains zero (unchanged)
- Batch genealogy record links substitute batch `{TD.substituteBatchNumber}` to finished product batch `{TD.finishedProductBatch}`
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
