# TC-CS-137: Confirm Process Order with Batch Expiration Date Today (SLED = System Date Boundary)

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
| P5 | Master Data (EDGE) | Batch `{TD.expiringTodayBatchNumber}` for material `{TD.componentMaterialId}` has Shelf Life Expiration Date (SLED) EXACTLY EQUAL to the current system date (boundary: expires today) |
| P6 | Master Data | Batch `{TD.expiringTodayBatchNumber}` has available unrestricted stock and is not on quality hold |
| P7 | Configuration | System configuration determines whether batches expiring on the same day as the system date are allowed or rejected (boundary validation rule) |

---

### Test Data

**Dataset Reference:** `testdata/CS-51/CS-51-testdata.json` — Dataset ID: `TD-CS-051-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Process order number in Released status | Valid |
| Yield Quantity | `{TD.yieldQuantity}` | Confirmed yield quantity for the process order | Valid |
| Posting Date | `{TD.postingDate}` | Goods movement posting date (today's date) | Valid |
| Plant | `{TD.plant}` | Production plant code | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location for batch-managed material | Valid |
| Component Material ID | `{TD.componentMaterialId}` | Raw material number (backflush component) | Valid |
| Expiring Today Batch Number | `{TD.expiringTodayBatchNumber}` | Batch number with SLED = system date (expires today — boundary) | Valid or Invalid (depends on system config) |
| Expiring Today Batch SLED | `{TD.expiringTodayBatchSLED}` | SLED equal to current system date (boundary: same-day expiry) | Valid or Invalid (depends on system config) |
| Batch Available Quantity | `{TD.batchAvailableQty}` | Available unrestricted stock for the batch | Valid |
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
| 15 | In the batch field for the component, manually enter the batch number expiring today `{TD.expiringTodayBatchNumber}` | `{TD.expiringTodayBatchNumber}` | Batch number `{TD.expiringTodayBatchNumber}` is entered into the batch field |
| 16 | Press Enter to confirm the batch entry | — | SAP attempts to validate the batch |
| 17 | Verify that the SLED displays `{TD.expiringTodayBatchSLED}` (SLED = system date / today) | `{TD.expiringTodayBatchSLED}` | Shelf Life Expiration Date field shows `{TD.expiringTodayBatchSLED}` (same as current system date — boundary) |
| 18 | Observe the system response after batch validation | — | SAP either: (a) ACCEPTS the batch if system config allows same-day expiry consumption (no error displayed); OR (b) REJECTS the batch if system config treats same-day expiry as expired (error/warning message displayed: "Batch expires today", "SLED validation boundary", or similar) |
| 19 | IF batch is ACCEPTED: Verify that no error is displayed and batch field is valid | — | Batch field shows no error indicator; batch `{TD.expiringTodayBatchNumber}` is accepted for consumption |
| 20 | IF batch is REJECTED: Verify that an error or warning message is displayed | — | Error or warning message is displayed indicating batch expiration boundary (e.g., "Batch expires today and cannot be consumed", "SLED is at boundary limit", or similar) |
| 21 | In the "Posting Date" field, verify or enter the posting date | `{TD.postingDate}` | Posting date is populated with today's date |
| 22 | Click the "Confirm" or "Post" button to attempt confirmation of the process order | — | SAP attempts to process the goods issue and order confirmation |
| 23 | Observe the system response after attempting to confirm | — | SAP either: (a) SUCCESS — confirmation proceeds, material document is generated (if batch accepted); OR (b) ERROR — confirmation is blocked with error message referencing SLED boundary (if batch rejected) |
| 24 | IF SUCCESS: Note the Material Document Number from the success message | — | Material Document Number is displayed (10-digit format) |
| 25 | IF SUCCESS: Navigate to "Display Material Document" application (via search bar) | — | "Display Material Document" application opens |
| 26 | IF SUCCESS: Enter the Material Document Number noted in step 24 | — | Material Document is retrieved and displayed |
| 27 | IF SUCCESS: Verify that the material document shows component material, batch expiring today, and consumed quantity | `{TD.componentMaterialId}`, `{TD.expiringTodayBatchNumber}`, `{TD.requiredComponentQty}` | Material Document displays: Material = `{TD.componentMaterialId}`, Batch = `{TD.expiringTodayBatchNumber}`, Quantity = `{TD.requiredComponentQty}`, Movement Type = 261 |
| 28 | IF SUCCESS: Navigate to "Display Stock Overview" application (via search bar) to verify inventory update | — | "Display Stock Overview" application opens |
| 29 | IF SUCCESS: Search for material `{TD.componentMaterialId}`, plant `{TD.plant}`, storage location `{TD.storageLocation}`, batch `{TD.expiringTodayBatchNumber}` | `{TD.componentMaterialId}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.expiringTodayBatchNumber}` | Stock overview is displayed for the batch expiring today |
| 30 | IF SUCCESS: Verify that the unrestricted stock quantity for batch `{TD.expiringTodayBatchNumber}` has been reduced by the consumed quantity | `{TD.requiredComponentQty}` | Stock balance shows reduction of `{TD.requiredComponentQty}` from the original available quantity |
| 31 | IF ERROR: Verify that NO Material Document Number is generated | — | No material document number is displayed; confirmation is blocked due to SLED boundary validation |
| 32 | IF ERROR: Verify that the process order status remains unchanged (not confirmed) | — | Process order status remains "Released" or "In Process" (no confirmation posted) |
| 33 | IF ERROR: Close the error message or dialog | — | Error message is dismissed; user returns to the process order confirmation screen |
| 34 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 35 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 36 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

**SCENARIO A (if system config ALLOWS same-day expiry consumption):**
- Process order `{TD.processOrderNumber}` is successfully confirmed with yield quantity `{TD.yieldQuantity}`
- Material Document Number (10-digit) is generated by SAP for movement type 261
- Batch `{TD.expiringTodayBatchNumber}` with SLED = system date (expires today) is ACCEPTED and consumed
- Batch quantity is reduced by `{TD.requiredComponentQty}` in real-time inventory
- Material document displays batch expiring today with consumed quantity
- Stock overview confirms inventory reduction for the batch expiring on the boundary date

**SCENARIO B (if system config REJECTS same-day expiry consumption):**
- SAP rejects the attempt to consume batch `{TD.expiringTodayBatchNumber}` due to SLED boundary (expires today)
- Error or warning message is displayed indicating batch expiration boundary validation failure
- NO Material Document Number is generated
- Process order status remains unchanged (not confirmed)
- Stock quantity for batch `{TD.expiringTodayBatchNumber}` remains unchanged (no inventory reduction)

**Note:** The exact behavior depends on SAP system configuration for SLED boundary validation. This test case verifies that the system enforces the configured boundary rule consistently.

---

### Post-conditions

**IF ACCEPTED:**
- Process order `{TD.processOrderNumber}` status is updated to "Confirmed" or "Partially Confirmed"
- Material Document for goods movement type 261 exists with the batch expiring today
- Batch `{TD.expiringTodayBatchNumber}` unrestricted stock is reduced by `{TD.requiredComponentQty}`
- Batch genealogy record links raw material batch to finished product batch

**IF REJECTED:**
- Process order status remains "Released" or "In Process" (not confirmed)
- NO Material Document is created
- Batch unrestricted stock is unchanged
- Error message is logged indicating SLED boundary validation failure

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
