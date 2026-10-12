# TC-CS-179: Trigger Debit Memo Request for Vendor Cost Recovery

**User Story:**          [CS-21] Record A Return Delivery For A Rejected Batch Back To The Vendor
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Return Delivery for Rejected Batch
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to post goods movements and trigger debit memo requests |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Purchase Order `{TD.purchaseOrderDebitMemo}` exists with goods receipt posted and batch `{TD.batchDebitMemo}` received |
| P4 | Master Data | Batch `{TD.batchDebitMemo}` exists in Blocked or Quality Inspection Stock with available quantity >= `{TD.returnQuantityDebitMemo}` |
| P5 | Master Data | Vendor from the Purchase Order is active and configured for debit memo processing in FI module |
| P6 | Configuration | Debit memo request functionality is configured and active for the purchasing organization `{TD.purchasingOrgDebitMemo}` |
| P7 | Configuration | Movement type 122 (Return Delivery to Vendor) is configured for the plant `{TD.plantDebitMemo}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-21/CS-21-testdata.json` — Dataset ID: `TD-CS-021-AP-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Purchase Order | `{TD.purchaseOrderDebitMemo}` | Existing PO with goods receipt posted — entered by the user | Valid |
| Batch Number | `{TD.batchDebitMemo}` | Batch in Blocked or QI Stock — entered by the user | Valid |
| Material Number | `{TD.materialDebitMemo}` | Material from original GR (auto-filled from PO) — verified by the user | Valid |
| Return Quantity | `{TD.returnQuantityDebitMemo}` | Quantity to return — entered by the user | Valid |
| Rejection Reason Code | `{TD.rejectionReasonDebitMemo}` | Reason for movement (mandatory) — selected by the user | Valid |
| Plant | `{TD.plantDebitMemo}` | Plant from original GR — verified on the document | Valid |
| Storage Location | `{TD.storageLocationDebitMemo}` | Storage location from original GR — verified on the document | Valid |
| Trigger Debit Memo | `{TD.triggerDebitMemoYes}` | Checkbox or flag to trigger debit memo request — checked by the user | Valid (Yes/True) |

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
| 7 | Click the search icon (top-right shell bar) and type "Post Goods Movement" | — | Search results appear listing "Post Goods Movement" application |
| 8 | Click "Post Goods Movement" from the search results | — | Post Goods Movement application opens in create mode |
| 9 | In the "Movement Type" field, enter the movement type | 122 | Movement type 122 (Return Delivery to Vendor) is entered and validated |
| 10 | Press Enter to confirm the movement type entry | — | Movement type is confirmed; additional fields become available for data entry |
| 11 | In the "Purchase Order" field, enter the Purchase Order number | `{TD.purchaseOrderDebitMemo}` | Purchase Order number is entered into the field |
| 12 | Press Enter to confirm the Purchase Order entry | — | SAP validates the PO; vendor information is auto-populated |
| 13 | In the "Material" field, enter the Material number | `{TD.materialDebitMemo}` | Material number is entered into the field |
| 14 | Press Enter to confirm the Material entry | — | SAP validates the material; material description and unit of measure are auto-populated |
| 15 | In the "Batch" field, enter the Batch number | `{TD.batchDebitMemo}` | Batch number is entered into the field |
| 16 | Press Enter to confirm the Batch entry | — | SAP validates the batch; stock type (Blocked or QI) is displayed; available quantity is verified |
| 17 | In the "Quantity" field, enter the return quantity | `{TD.returnQuantityDebitMemo}` | Return quantity is entered and validated against available batch quantity |
| 18 | In the "Plant" field, verify or enter the plant code | `{TD.plantDebitMemo}` | Plant field shows the plant from the original goods receipt |
| 19 | In the "Storage Location" field, verify or enter the storage location | `{TD.storageLocationDebitMemo}` | Storage location field shows the location from the original goods receipt |
| 20 | In the "Reason for Movement" dropdown, select the rejection reason code | `{TD.rejectionReasonDebitMemo}` | Rejection reason code is selected |
| 21 | Locate the "Trigger Debit Memo Request" checkbox or field | — | Debit memo request field or checkbox is visible in the form |
| 22 | Check or enable the "Trigger Debit Memo Request" option | `{TD.triggerDebitMemoYes}` | Debit memo request option is checked/enabled for vendor cost recovery |
| 23 | Click the "Post" button (primary submit action) in the toolbar | — | SAP begins processing the return delivery posting and debit memo request creation |
| 24 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Material Document number and year |
| 25 | Note the Material Document number from the success message | — | Material Document number is displayed (10-digit numeric format) |
| 26 | Verify that the success message includes a Debit Memo Request number | — | Debit Memo Request number is displayed in the success message (10-digit numeric format) for vendor cost recovery |
| 27 | Note the Debit Memo Request number from the success message | — | Debit Memo Request number is recorded for verification |
| 28 | Navigate to "Manage Debit Memo Requests" or equivalent FI app (optional verification step) | — | Debit Memo Requests list is displayed |
| 29 | Search for the Debit Memo Request number noted in step 27 (optional verification step) | Debit Memo Request number from step 27 | Debit Memo Request document is found in the system with status "Open" or "In Process" |
| 30 | Verify that the Debit Memo Request references the Material Document and vendor (optional verification step) | — | Debit Memo Request correctly references the Material Document, vendor, and return quantity amount |
| 31 | Return to the Fiori Launchpad home page | — | Home page is displayed |
| 32 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 33 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 34 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Material Document number (10-digit) is generated by SAP and displayed in the confirmation message
- The Material Document is posted with movement type 122 (Return Delivery to Vendor) and status "Posted"
- A Debit Memo Request document is created and the document number is displayed in the success message
- The Debit Memo Request is linked to the Material Document and references the vendor for cost recovery
- The batch quantity in Blocked or Quality Inspection Stock is reduced by the return quantity
- Financial integration is confirmed: the debit memo request can be processed by the Accounts Payable team for vendor cost recovery

---

### Post-conditions

- SAP Material Document exists with the generated document number and movement type 122
- Debit Memo Request document exists with the generated request number
- Debit Memo Request status is "Open" or "In Process" (pending FI processing)
- Debit Memo Request references the Material Document, vendor, and return quantity
- Batch quantity in restricted stock is reduced by the return quantity
- Document status is "Posted" / "Completed"
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
