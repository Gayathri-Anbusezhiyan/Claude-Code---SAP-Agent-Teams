# TC-CS-057: Attempt Goods Issue Transaction Against Blocked Batch

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
| P1 | User Role | User has the role of Plant Manager or Warehouse Manager with SAP authorization to perform goods issue transactions |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and is batch-managed |
| P4 | Master Data | Batch `{TD.batchNumber}` exists in SAP with material `{TD.materialNumber}`, plant `{TD.plant}`, and has stock with status "Blocked Stock" (blocked in a previous transaction) |
| P5 | Configuration | Plant `{TD.plant}` is configured for material `{TD.materialNumber}` and storage location `{TD.storageLocation}` exists in the plant |
| P6 | Pre-condition State | Batch `{TD.batchNumber}` is currently blocked (stock status: Blocked Stock) and cannot be issued |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS-19/CS-19-testdata.json` — Dataset ID: `TD-CS-19-007`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Batch-managed material — entered by the user | Valid |
| Batch Number | `{TD.batchNumberBlocked}` | Existing batch with Blocked Stock status — entered by the user | Invalid (blocked) |
| Plant | `{TD.plant}` | Plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |
| Movement Type | `{TD.movementTypeGoodsIssue}` | Goods Issue movement type (e.g., "261") — selected by the user | Valid |
| Quantity to Issue | `{TD.quantityIssue}` | Quantity to be issued from the blocked batch — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Goods Issue" or "Post Goods Movements" | — | Search results appear listing the goods movement application |
| 8 | Click the goods movement application from the search results | — | Goods movement application opens |
| 9 | Select the Movement Type for Goods Issue | `{TD.movementTypeGoodsIssue}` (e.g., "261 — Goods Issue to Cost Center") | Movement type is selected |
| 10 | In the Material field, enter the Material Number | `{TD.materialNumber}` | Material Number is entered into the field |
| 11 | Press Enter to confirm the Material entry | — | Material filter is applied; material description `{TD.materialDescription}` is auto-populated |
| 12 | In the Batch field, enter the Batch Number | `{TD.batchNumberBlocked}` | Batch Number is entered into the field |
| 13 | Press Enter to confirm the Batch entry | — | SAP validates the batch; system detects that the batch status is "Blocked Stock" |
| 14 | In the Plant field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 15 | Press Enter to confirm the Plant entry | — | Plant is confirmed |
| 16 | In the Storage Location field, enter the Storage Location code | `{TD.storageLocation}` | Storage location is entered |
| 17 | Press Enter to confirm the Storage Location entry | — | Storage location is confirmed |
| 18 | In the Quantity field, enter the quantity to be issued | `{TD.quantityIssue}` | Quantity is entered |
| 19 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 20 | Click the "Post" or "Save" button to attempt the goods issue transaction | — | SAP begins validation processing |
| 21 | Observe the on-screen response | — | An error message is displayed indicating that goods issue cannot be performed on blocked stock; message text includes "Batch is blocked" or "Stock type not allowed for goods issue" |
| 22 | Verify that no material document number is generated | — | No material document number is displayed; the transaction is not posted |
| 23 | Close the error message dialog if applicable | — | Error dialog is dismissed; goods issue screen remains open with entered data intact |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP prevents the goods issue transaction from being posted
- An error message is displayed clearly stating that the batch is blocked and cannot be issued
- No material document number is generated
- Batch `{TD.batchNumberBlocked}` remains with status "Blocked Stock"; no stock movement occurs
- The system enforces the business rule that blocked batches cannot be consumed in goods issue transactions

---

### Post-conditions

- No material document is created
- Batch `{TD.batchNumberBlocked}` stock status remains "Blocked Stock"
- No stock quantity change occurs for the batch
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
