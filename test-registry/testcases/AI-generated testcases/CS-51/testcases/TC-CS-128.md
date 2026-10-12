# TC-CS-128: Manually Override FEFO-Proposed Batch and Select Different Valid Batch

**User Story:**          [CS-51] Perform A Goods Issue (Backflush) Of Raw Material Batches To A Process
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Process Order Goods Issue with Batch Backflush
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Operator with SAP authorization to confirm process orders, post goods movements, and manually override batch selection |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Process Order `{TD.processOrderNumber}` exists, is in Released status, and is assigned to plant `{TD.plant}` |
| P4 | Master Data | Component material `{TD.componentMaterialId}` is batch-managed, configured for backflush, and exists in the BOM for the process order |
| P5 | Master Data | Multiple batches exist for material `{TD.componentMaterialId}` in storage location `{TD.storageLocation}` |
| P6 | Master Data | Batch `{TD.fefoProposedBatch}` is the FEFO-proposed batch (earliest SLED) with sufficient available quantity `{TD.fefoProposedBatchQty}` |
| P7 | Master Data | Batch `{TD.manualOverrideBatch}` is an alternative valid batch with later SLED, sufficient available quantity `{TD.manualOverrideBatchQty}`, and not on quality hold |
| P8 | Configuration | System allows manual batch override by authorized users during process order confirmation |

---

### Test Data

**Dataset Reference:** `testdata/CS-51/CS-51-testdata.json` — Dataset ID: `TD-CS-051-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Process order number in Released status | Valid |
| Yield Quantity | `{TD.yieldQuantity}` | Confirmed yield quantity for the process order | Valid |
| Posting Date | `{TD.postingDate}` | Goods movement posting date (today's date) | Valid |
| Plant | `{TD.plant}` | Production plant code | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location for batch-managed material | Valid |
| Component Material ID | `{TD.componentMaterialId}` | Raw material number (backflush component) | Valid |
| FEFO Proposed Batch | `{TD.fefoProposedBatch}` | Batch auto-proposed by FEFO logic (earliest SLED) | Valid |
| FEFO Proposed Batch Qty | `{TD.fefoProposedBatchQty}` | Available quantity for FEFO-proposed batch | Valid |
| Manual Override Batch | `{TD.manualOverrideBatch}` | Batch manually selected by operator (overrides FEFO) | Valid |
| Manual Override Batch Qty | `{TD.manualOverrideBatchQty}` | Available quantity for manual override batch | Valid |
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
| 16 | Verify that the system automatically proposes batch `{TD.fefoProposedBatch}` (earliest SLED per FEFO) | `{TD.fefoProposedBatch}` | Batch number `{TD.fefoProposedBatch}` is auto-populated in the batch field |
| 17 | Click on the batch field or batch selection icon/dropdown to access manual batch selection | — | Batch selection input field or dropdown is activated for manual entry |
| 18 | Clear the existing FEFO-proposed batch value | — | Batch field is cleared |
| 19 | In the batch field, manually enter the alternative batch number `{TD.manualOverrideBatch}` | `{TD.manualOverrideBatch}` | Batch number `{TD.manualOverrideBatch}` is entered into the batch field |
| 20 | Press Enter to confirm the manual batch entry | — | SAP validates the manually entered batch |
| 21 | Verify that the batch field now displays `{TD.manualOverrideBatch}` (override successful) | `{TD.manualOverrideBatch}` | Batch field shows `{TD.manualOverrideBatch}` (overriding FEFO-proposed batch) |
| 22 | Verify that the available quantity for the manually selected batch is sufficient | `{TD.manualOverrideBatchQty}` | Available quantity for batch `{TD.manualOverrideBatch}` is displayed as `{TD.manualOverrideBatchQty}` (≥ required quantity) |
| 23 | Verify that no error message is displayed for the manual batch override | — | No error or warning is displayed; manual batch is accepted |
| 24 | In the "Posting Date" field, verify or enter the posting date | `{TD.postingDate}` | Posting date is populated with today's date |
| 25 | Click the "Confirm" or "Post" button to confirm the process order | — | SAP begins processing the goods issue and order confirmation |
| 26 | Observe the on-screen confirmation response | — | A success message is displayed confirming the process order confirmation and material document number |
| 27 | Note the Material Document Number from the success message | — | Material Document Number is displayed (10-digit format) |
| 28 | Navigate to the "Batch Traceability" or "Batch Where-Used" application (via search bar) | — | Batch traceability application opens |
| 29 | Search for the finished product batch `{TD.finishedProductBatch}` | `{TD.finishedProductBatch}` | Batch traceability search displays the finished product batch |
| 30 | Verify that the manually selected batch `{TD.manualOverrideBatch}` (not the FEFO-proposed batch) is linked to the finished product batch | `{TD.manualOverrideBatch}`, `{TD.finishedProductBatch}` | Batch genealogy (WHERE-USED) record displays the linkage: raw batch `{TD.manualOverrideBatch}` → finished batch `{TD.finishedProductBatch}` |
| 31 | Verify that the FEFO-proposed batch `{TD.fefoProposedBatch}` is NOT linked to the finished product batch | `{TD.fefoProposedBatch}`, `{TD.finishedProductBatch}` | FEFO-proposed batch `{TD.fefoProposedBatch}` does NOT appear in the genealogy linkage for finished batch `{TD.finishedProductBatch}` (confirms override worked) |
| 32 | Navigate back to "Display Material Document" application (via search bar) | — | "Display Material Document" application opens |
| 33 | Enter the Material Document Number noted in step 27 | — | Material Document is retrieved and displayed |
| 34 | Verify that the material document shows component material with manually overridden batch `{TD.manualOverrideBatch}` | `{TD.componentMaterialId}`, `{TD.manualOverrideBatch}`, `{TD.requiredComponentQty}` | Material Document displays: Material = `{TD.componentMaterialId}`, Batch = `{TD.manualOverrideBatch}`, Quantity = `{TD.requiredComponentQty}`, Movement Type = 261 |
| 35 | Navigate to "Display Stock Overview" application (via search bar) to verify inventory update | — | "Display Stock Overview" application opens |
| 36 | Search for material `{TD.componentMaterialId}`, plant `{TD.plant}`, storage location `{TD.storageLocation}`, batch `{TD.manualOverrideBatch}` | `{TD.componentMaterialId}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.manualOverrideBatch}` | Stock overview is displayed for the manually overridden batch |
| 37 | Verify that the unrestricted stock quantity for batch `{TD.manualOverrideBatch}` has been reduced by the consumed quantity | `{TD.requiredComponentQty}` | Stock balance for manually overridden batch shows reduction of `{TD.requiredComponentQty}` |
| 38 | Search for material `{TD.componentMaterialId}`, plant `{TD.plant}`, storage location `{TD.storageLocation}`, batch `{TD.fefoProposedBatch}` | `{TD.componentMaterialId}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.fefoProposedBatch}` | Stock overview is displayed for the FEFO-proposed batch |
| 39 | Verify that the stock quantity for the FEFO-proposed batch `{TD.fefoProposedBatch}` remains unchanged (no consumption) | `{TD.fefoProposedBatchQty}` | Stock balance for FEFO-proposed batch shows no reduction (quantity unchanged = `{TD.fefoProposedBatchQty}`) |
| 40 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 41 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 42 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Process order `{TD.processOrderNumber}` is successfully confirmed with yield quantity `{TD.yieldQuantity}`
- Material Document Number (10-digit) is generated by SAP for movement type 261
- Operator successfully overrides FEFO-proposed batch `{TD.fefoProposedBatch}` and manually selects batch `{TD.manualOverrideBatch}`
- Manually selected batch `{TD.manualOverrideBatch}` is consumed (quantity reduced by `{TD.requiredComponentQty}`)
- FEFO-proposed batch `{TD.fefoProposedBatch}` is NOT consumed (quantity remains unchanged)
- Batch genealogy linkage records the manually selected batch `{TD.manualOverrideBatch}` to finished product batch `{TD.finishedProductBatch}`
- Material document displays the manually overridden batch, not the FEFO-proposed batch
- Stock overview confirms inventory reduction for the manually selected batch only

---

### Post-conditions

- Process order `{TD.processOrderNumber}` status is updated to "Confirmed" or "Partially Confirmed"
- Material Document for goods movement type 261 exists with the manually selected batch
- Batch `{TD.manualOverrideBatch}` unrestricted stock is reduced by `{TD.requiredComponentQty}`
- Batch `{TD.fefoProposedBatch}` unrestricted stock remains unchanged
- Batch genealogy record links manually selected batch `{TD.manualOverrideBatch}` to finished product batch `{TD.finishedProductBatch}`
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
