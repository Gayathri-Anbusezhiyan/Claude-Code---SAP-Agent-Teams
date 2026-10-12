# TC-CS-058: Attempt Production Order Consumption Against Blocked Batch

**User Story:**          [CS-19] Place A Specific Batch Of Raw Material On Quality Hold
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch Stock Status Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner or Plant Manager with SAP authorization to perform goods issue transactions for production orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and is batch-managed |
| P4 | Master Data | Batch `{TD.batchNumber}` exists in SAP with material `{TD.materialNumber}`, plant `{TD.plant}`, and has stock with status "Blocked Stock" (blocked in a previous transaction) |
| P5 | Master Data | Production Order `{TD.productionOrderNumber}` exists and requires material `{TD.materialNumber}` as a component |
| P6 | Configuration | Plant `{TD.plant}` is configured for material `{TD.materialNumber}` and storage location `{TD.storageLocation}` exists in the plant |
| P7 | Pre-condition State | Batch `{TD.batchNumber}` is currently blocked (stock status: Blocked Stock) and cannot be consumed in production |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS-19/CS-19-testdata.json` — Dataset ID: `TD-CS-19-008`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Batch-managed material — entered by the user | Valid |
| Batch Number | `{TD.batchNumberBlocked}` | Existing batch with Blocked Stock status — entered by the user | Invalid (blocked) |
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |
| Production Order Number | `{TD.productionOrderNumber}` | Production order consuming the material — entered by the user | Valid |
| Quantity to Consume | `{TD.quantityConsume}` | Quantity to be consumed from the blocked batch — entered by the user | Valid |
| Movement Type | `{TD.movementTypeProductionConsumption}` | Production order consumption movement type (e.g., "261") — system default | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Production Orders" or "Post Goods Movement" | — | Search results appear listing the production order or goods movement application |
| 8 | Click the application from the search results | — | Application opens |
| 9 | In the Production Order field, enter the Production Order Number | `{TD.productionOrderNumber}` | Production order number is entered |
| 10 | Press Enter to confirm the Production Order entry | — | Production order details are loaded; components list is displayed |
| 11 | Navigate to the component that requires the blocked material | `{TD.materialNumber}` | Component line for material `{TD.materialNumber}` is displayed showing required quantity |
| 12 | Click the "Post Goods Issue" or "Confirm" button for the component | — | Goods issue screen opens for the selected component |
| 13 | In the Batch field, enter the Batch Number | `{TD.batchNumberBlocked}` | Batch Number is entered into the field |
| 14 | Press Enter to confirm the Batch entry | — | SAP validates the batch; system detects that the batch status is "Blocked Stock" |
| 15 | In the Plant field, verify or enter the Plant code | `{TD.plant}` | Plant code is displayed or entered |
| 16 | Press Enter to confirm the Plant entry | — | Plant is confirmed |
| 17 | In the Storage Location field, enter the Storage Location code | `{TD.storageLocation}` | Storage location is entered |
| 18 | Press Enter to confirm the Storage Location entry | — | Storage location is confirmed |
| 19 | In the Quantity field, enter the quantity to be consumed | `{TD.quantityConsume}` | Quantity is entered |
| 20 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 21 | Click the "Post" or "Confirm" button to attempt the goods issue transaction for production order consumption | — | SAP begins validation processing |
| 22 | Observe the on-screen response | — | An error message is displayed indicating that goods issue cannot be performed on blocked stock for production order consumption; message text includes "Batch is blocked" or "Stock type not allowed for goods issue" |
| 23 | Verify that no material document number is generated | — | No material document number is displayed; the transaction is not posted |
| 24 | Close the error message dialog if applicable | — | Error dialog is dismissed; goods issue screen remains open with entered data intact |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP prevents the production order consumption (goods issue) transaction from being posted
- An error message is displayed clearly stating that the batch is blocked and cannot be consumed in production orders
- No material document number is generated
- Batch `{TD.batchNumberBlocked}` remains with status "Blocked Stock"; no stock movement occurs
- The system enforces the business rule that blocked batches cannot be consumed in production order transactions

---

### Post-conditions

- No material document is created
- Batch `{TD.batchNumberBlocked}` stock status remains "Blocked Stock"
- No stock quantity change occurs for the batch
- Production order `{TD.productionOrderNumber}` component consumption is not recorded
- Audit log does NOT contain a goods issue transaction for the blocked batch
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

### AC Traceability

This test case covers the following Acceptance Criteria:
- **AC-3:** Once blocked, the system prevents any goods issue transaction against that batch, including production order consumption
