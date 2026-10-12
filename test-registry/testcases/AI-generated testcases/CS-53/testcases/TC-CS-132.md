# TC-CS-132: Attempt to transfer batch to Unrestricted-Use stock before batch record approval

**User Story:**          [CS-53] Review And Electronically Sign Off The Electronic Batch Record (Ebr) G
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control / Quality Management (PP-QM)
**Feature:**             Batch Release Decision and Stock Transfer Control
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Clerk or Materials Manager with SAP authorization to execute stock transfers |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Process Order | Process Order `{TD.processOrderNumberUnapproved}` exists, is fully confirmed, and has status TECO (technically complete) |
| P4 | Batch | Batch `{TD.batchNumberUnapproved}` exists, is linked to Process Order `{TD.processOrderNumberUnapproved}`, and is in Restricted-Use stock |
| P5 | Batch Record Status | Batch record for batch `{TD.batchNumberUnapproved}` has NOT been approved by QA Reviewer; status is "PENDING" or "IN REVIEW" |
| P6 | Stock Status | Batch `{TD.batchNumberUnapproved}` is currently in Restricted-Use stock type; not yet released for Unrestricted-Use |
| P7 | Configuration | SAP MM and QM integration is configured; stock transfer to Unrestricted-Use is blocked by batch release decision |

---

### Test Data

**Dataset Reference:** `testdata/CS-53/CS-53-testdata.json` — Dataset ID: `TD-CS-53-NEG-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumberUnapproved}` | Process order number with unapproved batch record — reference only | Valid |
| Batch Number | `{TD.batchNumberUnapproved}` | Batch number with unapproved batch record in Restricted-Use stock — entered by the user | Valid |
| Material Number | `{TD.materialNumberUnapproved}` | Material number for the batch — entered by the user | Valid |
| Plant | `{TD.plantUnapproved}` | Plant code for the batch — entered by the user | Valid |
| Storage Location | `{TD.storageLocationUnapproved}` | Storage location code — entered by the user | Valid |
| Quantity | `{TD.quantityToTransfer}` | Quantity to transfer — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Transfer Posting" or "Stock Transfer" | — | Search results appear listing the stock transfer application (e.g., "Transfer Posting", "Goods Movement") |
| 8 | Click the stock transfer application from the search results | — | Stock transfer application opens displaying the transfer entry screen |
| 9 | In the "Material" field, enter the Material Number | `{TD.materialNumberUnapproved}` | Material Number is entered into the field |
| 10 | Press Enter to confirm the Material entry | — | SAP validates the material; material description is auto-populated |
| 11 | In the "Plant" field, enter the Plant code | `{TD.plantUnapproved}` | Plant code is entered into the field |
| 12 | Press Enter to confirm the Plant entry | — | SAP validates the plant |
| 13 | In the "Storage Location" field, enter the Storage Location code | `{TD.storageLocationUnapproved}` | Storage Location code is entered into the field |
| 14 | Press Enter to confirm the Storage Location entry | — | SAP validates the storage location |
| 15 | In the "Batch" field, enter the Batch Number | `{TD.batchNumberUnapproved}` | Batch Number is entered into the field |
| 16 | Press Enter to confirm the Batch entry | — | SAP validates the batch; current stock type (Restricted-Use) is displayed |
| 17 | In the "Quantity" field, enter the quantity to transfer | `{TD.quantityToTransfer}` | Quantity is entered into the field |
| 18 | In the "Stock Type" or "Movement Type" field, select or enter the movement type for transfer to Unrestricted-Use stock | — | Movement type for Unrestricted-Use transfer (e.g., movement type 321 or similar) is selected or entered |
| 19 | Click the "Post" or "Save" button to submit the stock transfer | — | System validation is triggered |
| 20 | Observe the on-screen error response | — | Error message is displayed: "Batch cannot be transferred to Unrestricted-Use stock. Batch record not approved" or "Batch release decision is pending" or similar validation error text |
| 21 | Verify that the stock transfer is NOT completed | — | Stock transfer transaction is rejected; no goods movement document is created |
| 22 | Verify that the batch stock type remains Restricted-Use | `{TD.batchNumberUnapproved}` | Batch `{TD.batchNumberUnapproved}` remains in Restricted-Use stock; no change to Unrestricted-Use stock occurs |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System prevents transfer of batch `{TD.batchNumberUnapproved}` to Unrestricted-Use stock because the batch record has not been approved
- Error message clearly indicates that the batch release decision is pending and stock transfer is blocked
- No stock transfer transaction is posted; no goods movement document is created
- Batch `{TD.batchNumberUnapproved}` remains in Restricted-Use stock
- System enforces GMP business rule that batches cannot be released for distribution until the batch record is fully approved
- MM-QM integration correctly prevents premature stock release

---

### Post-conditions

- Batch `{TD.batchNumberUnapproved}` remains in Restricted-Use stock; no change to stock type
- No goods movement document is created
- Batch record status remains "PENDING" or "IN REVIEW"
- Error validation log entry may be recorded for audit purposes
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
