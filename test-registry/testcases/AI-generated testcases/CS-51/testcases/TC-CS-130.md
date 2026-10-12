# TC-CS-130: Attempt to Consume an Expired Batch (SLED < System Date)

**User Story:**          [CS-51] Perform A Goods Issue (Backflush) Of Raw Material Batches To A Process
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Process Order Goods Issue with Batch Backflush
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            CRITICAL
**Severity:**            CRITICAL
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
| P5 | Master Data (NEGATIVE) | Batch `{TD.expiredBatchNumber}` for material `{TD.componentMaterialId}` has Shelf Life Expiration Date (SLED) `{TD.expiredBatchSLED}` which is LESS THAN the current system date (expired) |
| P6 | Master Data | Batch `{TD.expiredBatchNumber}` has available unrestricted stock quantity (not on quality hold) |
| P7 | Configuration | System is configured to prevent consumption of expired batches (SLED < system date) during goods issue posting |

---

### Test Data

**Dataset Reference:** `testdata/CS-51/CS-51-testdata.json` — Dataset ID: `TD-CS-051-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Process order number in Released status | Valid |
| Yield Quantity | `{TD.yieldQuantity}` | Confirmed yield quantity for the process order | Valid |
| Posting Date | `{TD.postingDate}` | Goods movement posting date (today's date) | Valid |
| Plant | `{TD.plant}` | Production plant code | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location for batch-managed material | Valid |
| Component Material ID | `{TD.componentMaterialId}` | Raw material number (backflush component) | Valid |
| Expired Batch Number | `{TD.expiredBatchNumber}` | Batch number with expired SLED (SLED < system date) | Invalid |
| Expired Batch SLED | `{TD.expiredBatchSLED}` | Shelf Life Expiration Date in the past (expired) | Invalid |
| Required Component Quantity | `{TD.requiredComponentQty}` | Quantity of component required based on yield | Valid |

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
| 15 | In the batch field for the component, manually enter the expired batch number `{TD.expiredBatchNumber}` | `{TD.expiredBatchNumber}` | Batch number `{TD.expiredBatchNumber}` is entered into the batch field |
| 16 | Press Enter to confirm the batch entry | — | SAP attempts to validate the batch |
| 17 | Observe the system response after batch validation | — | SAP displays an error or warning message indicating the batch has expired and cannot be consumed (e.g., "Batch has expired", "Shelf Life Expiration Date exceeded", or similar SAP validation message) |
| 18 | Verify that the batch field is highlighted in red or marked as invalid | — | Batch field shows an error indicator (red border, exclamation icon, or error highlighting) |
| 19 | Verify that the SLED displays `{TD.expiredBatchSLED}` (date in the past) | `{TD.expiredBatchSLED}` | Shelf Life Expiration Date field shows `{TD.expiredBatchSLED}` (date is less than current system date) |
| 20 | In the "Posting Date" field, verify or enter the posting date | `{TD.postingDate}` | Posting date is populated with today's date |
| 21 | Click the "Confirm" or "Post" button to attempt confirmation of the process order | — | SAP attempts to process the goods issue and order confirmation |
| 22 | Observe the system response after attempting to confirm | — | SAP rejects the confirmation and displays an error message preventing the goods issue (e.g., "Goods movement cannot be posted: Batch has expired", "SLED validation failed", or similar blocking error) |
| 23 | Verify that NO Material Document Number is generated | — | No material document number is displayed; confirmation is blocked |
| 24 | Verify that the process order status remains unchanged (not confirmed) | — | Process order status remains "Released" or "In Process" (no confirmation posted) |
| 25 | Verify that an error log or message dialog displays the specific validation failure for expired batch | `{TD.expiredBatchNumber}`, `{TD.expiredBatchSLED}` | Error message or dialog explicitly references batch `{TD.expiredBatchNumber}` and indicates expiration (SLED `{TD.expiredBatchSLED}` < system date) |
| 26 | Close the error message or dialog | — | Error message is dismissed; user returns to the process order confirmation screen |
| 27 | Navigate to "Display Stock Overview" application (via search bar) to verify no inventory update occurred | — | "Display Stock Overview" application opens |
| 28 | Search for material `{TD.componentMaterialId}`, plant `{TD.plant}`, storage location `{TD.storageLocation}`, batch `{TD.expiredBatchNumber}` | `{TD.componentMaterialId}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.expiredBatchNumber}` | Stock overview is displayed for the expired batch |
| 29 | Verify that the stock quantity for batch `{TD.expiredBatchNumber}` remains unchanged (no consumption occurred) | — | Stock balance for expired batch shows no reduction; quantity remains the same as before the attempted confirmation |
| 30 | Verify that the SLED for batch `{TD.expiredBatchNumber}` is displayed as `{TD.expiredBatchSLED}` (expired date) | `{TD.expiredBatchSLED}` | SLED field displays `{TD.expiredBatchSLED}` (date in the past, confirming expiration) |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP rejects the attempt to consume batch `{TD.expiredBatchNumber}` due to expired SLED (SLED < system date)
- Error message is displayed explicitly stating the batch has expired and cannot be consumed
- NO Material Document Number is generated
- Process order `{TD.processOrderNumber}` status remains unchanged (not confirmed)
- Stock quantity for batch `{TD.expiredBatchNumber}` remains unchanged (no inventory reduction)
- System prevents compliance violation by blocking consumption of expired batch

---

### Post-conditions

- Process order `{TD.processOrderNumber}` status remains "Released" or "In Process" (not confirmed)
- NO Material Document is created for goods movement type 261
- Batch `{TD.expiredBatchNumber}` unrestricted stock is unchanged
- No batch genealogy linkage is created (no consumption occurred)
- Error message is logged indicating SLED expiration validation failure

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
