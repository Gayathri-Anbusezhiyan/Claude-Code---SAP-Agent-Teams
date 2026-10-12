# TC-CS-129: Attempt to Consume a Batch on Quality Hold (QI Blocked)

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
| P5 | Master Data (NEGATIVE) | Batch `{TD.qualityHoldBatchNumber}` for material `{TD.componentMaterialId}` is on QUALITY HOLD status (QI blocked / quality inspection blocked) |
| P6 | Master Data (NEGATIVE) | Batch `{TD.qualityHoldBatchNumber}` has stock type "Quality Inspection" or "Blocked Stock" (not "Unrestricted Use") |
| P7 | Configuration | System is configured to prevent consumption of batches on quality hold during goods issue posting |

---

### Test Data

**Dataset Reference:** `testdata/CS-51/CS-51-testdata.json` — Dataset ID: `TD-CS-051-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Process order number in Released status | Valid |
| Yield Quantity | `{TD.yieldQuantity}` | Confirmed yield quantity for the process order | Valid |
| Posting Date | `{TD.postingDate}` | Goods movement posting date (today's date) | Valid |
| Plant | `{TD.plant}` | Production plant code | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location for batch-managed material | Valid |
| Component Material ID | `{TD.componentMaterialId}` | Raw material number (backflush component) | Valid |
| Quality Hold Batch Number | `{TD.qualityHoldBatchNumber}` | Batch number on quality hold (QI blocked) | Invalid |
| Quality Hold Status | `{TD.qualityHoldStatus}` | Stock type status: "Quality Inspection" or "Blocked" | Invalid |
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
| 15 | In the batch field for the component, manually enter the quality hold batch number `{TD.qualityHoldBatchNumber}` | `{TD.qualityHoldBatchNumber}` | Batch number `{TD.qualityHoldBatchNumber}` is entered into the batch field |
| 16 | Press Enter to confirm the batch entry | — | SAP attempts to validate the batch |
| 17 | Observe the system response after batch validation | — | SAP displays an error message indicating the batch is on quality hold and cannot be consumed (e.g., "Batch is blocked for quality inspection", "Batch stock type is not unrestricted", or similar SAP validation message) |
| 18 | Verify that the batch field is highlighted in red or marked as invalid | — | Batch field shows an error indicator (red border, exclamation icon, or error highlighting) |
| 19 | Verify that the stock type or batch status displays "Quality Inspection" or "Blocked" | `{TD.qualityHoldStatus}` | Stock type field (if visible) shows `{TD.qualityHoldStatus}` (e.g., "Quality Inspection", "QI Blocked", or "Blocked Stock") |
| 20 | In the "Posting Date" field, verify or enter the posting date | `{TD.postingDate}` | Posting date is populated with today's date |
| 21 | Click the "Confirm" or "Post" button to attempt confirmation of the process order | — | SAP attempts to process the goods issue and order confirmation |
| 22 | Observe the system response after attempting to confirm | — | SAP rejects the confirmation and displays an error message preventing the goods issue (e.g., "Goods movement cannot be posted: Batch is on quality hold", "Batch stock type is restricted", or similar blocking error) |
| 23 | Verify that NO Material Document Number is generated | — | No material document number is displayed; confirmation is blocked |
| 24 | Verify that the process order status remains unchanged (not confirmed) | — | Process order status remains "Released" or "In Process" (no confirmation posted) |
| 25 | Verify that an error log or message dialog displays the specific validation failure for quality hold batch | `{TD.qualityHoldBatchNumber}` | Error message or dialog explicitly references batch `{TD.qualityHoldBatchNumber}` and indicates quality hold / stock type restriction |
| 26 | Close the error message or dialog | — | Error message is dismissed; user returns to the process order confirmation screen |
| 27 | Navigate to "Display Stock Overview" application (via search bar) to verify no inventory update occurred | — | "Display Stock Overview" application opens |
| 28 | Search for material `{TD.componentMaterialId}`, plant `{TD.plant}`, storage location `{TD.storageLocation}`, batch `{TD.qualityHoldBatchNumber}` | `{TD.componentMaterialId}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.qualityHoldBatchNumber}` | Stock overview is displayed for the quality hold batch |
| 29 | Verify that the stock quantity for batch `{TD.qualityHoldBatchNumber}` remains unchanged (no consumption occurred) | — | Stock balance for quality hold batch shows no reduction; quantity remains the same as before the attempted confirmation |
| 30 | Verify that the stock type for batch `{TD.qualityHoldBatchNumber}` is still "Quality Inspection" or "Blocked" | `{TD.qualityHoldStatus}` | Stock type field displays `{TD.qualityHoldStatus}` (quality hold status unchanged) |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP rejects the attempt to consume batch `{TD.qualityHoldBatchNumber}` due to quality hold status
- Error message is displayed explicitly stating the batch is on quality hold / blocked for quality inspection and cannot be consumed
- NO Material Document Number is generated
- Process order `{TD.processOrderNumber}` status remains unchanged (not confirmed)
- Stock quantity for batch `{TD.qualityHoldBatchNumber}` remains unchanged (no inventory reduction)
- Batch stock type remains "Quality Inspection" or "Blocked"
- System prevents compliance violation by blocking consumption of restricted batch

---

### Post-conditions

- Process order `{TD.processOrderNumber}` status remains "Released" or "In Process" (not confirmed)
- NO Material Document is created for goods movement type 261
- Batch `{TD.qualityHoldBatchNumber}` unrestricted stock is unchanged; stock remains in quality inspection / blocked status
- No batch genealogy linkage is created (no consumption occurred)
- Error message is logged indicating quality hold validation failure

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
