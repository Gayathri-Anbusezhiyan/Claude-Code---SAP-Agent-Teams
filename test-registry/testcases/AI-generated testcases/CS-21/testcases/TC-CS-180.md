# TC-CS-180: Skip Debit Memo Request for Manual Processing Later

**User Story:**          [CS-21] Record A Return Delivery For A Rejected Batch Back To The Vendor
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Return Delivery for Rejected Batch
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to post goods movements (Return Delivery) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Purchase Order `{TD.purchaseOrderNoDebitMemo}` exists with goods receipt posted and batch `{TD.batchNoDebitMemo}` received |
| P4 | Master Data | Batch `{TD.batchNoDebitMemo}` exists in Blocked or Quality Inspection Stock with available quantity >= `{TD.returnQuantityNoDebitMemo}` |
| P5 | Master Data | Vendor from the Purchase Order is active |
| P6 | Configuration | Movement type 122 (Return Delivery to Vendor) is configured for the plant `{TD.plantNoDebitMemo}` |
| P7 | Business Policy | Business policy allows deferring debit memo request to manual FI processing after return delivery is posted |

---

### Test Data

**Dataset Reference:** `testdata/CS-21/CS-21-testdata.json` — Dataset ID: `TD-CS-021-AP-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Purchase Order | `{TD.purchaseOrderNoDebitMemo}` | Existing PO with goods receipt posted — entered by the user | Valid |
| Batch Number | `{TD.batchNoDebitMemo}` | Batch in Blocked or QI Stock — entered by the user | Valid |
| Material Number | `{TD.materialNoDebitMemo}` | Material from original GR (auto-filled from PO) — verified by the user | Valid |
| Return Quantity | `{TD.returnQuantityNoDebitMemo}` | Quantity to return — entered by the user | Valid |
| Rejection Reason Code | `{TD.rejectionReasonNoDebitMemo}` | Reason for movement (mandatory) — selected by the user | Valid |
| Plant | `{TD.plantNoDebitMemo}` | Plant from original GR — verified on the document | Valid |
| Storage Location | `{TD.storageLocationNoDebitMemo}` | Storage location from original GR — verified on the document | Valid |
| Trigger Debit Memo | `{TD.skipDebitMemo}` | Checkbox or flag to trigger debit memo request — left unchecked by the user | Valid (No/False) |

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
| 11 | In the "Purchase Order" field, enter the Purchase Order number | `{TD.purchaseOrderNoDebitMemo}` | Purchase Order number is entered into the field |
| 12 | Press Enter to confirm the Purchase Order entry | — | SAP validates the PO; vendor information is auto-populated |
| 13 | In the "Material" field, enter the Material number | `{TD.materialNoDebitMemo}` | Material number is entered into the field |
| 14 | Press Enter to confirm the Material entry | — | SAP validates the material; material description and unit of measure are auto-populated |
| 15 | In the "Batch" field, enter the Batch number | `{TD.batchNoDebitMemo}` | Batch number is entered into the field |
| 16 | Press Enter to confirm the Batch entry | — | SAP validates the batch; stock type (Blocked or QI) is displayed; available quantity is verified |
| 17 | In the "Quantity" field, enter the return quantity | `{TD.returnQuantityNoDebitMemo}` | Return quantity is entered and validated against available batch quantity |
| 18 | In the "Plant" field, verify or enter the plant code | `{TD.plantNoDebitMemo}` | Plant field shows the plant from the original goods receipt |
| 19 | In the "Storage Location" field, verify or enter the storage location | `{TD.storageLocationNoDebitMemo}` | Storage location field shows the location from the original goods receipt |
| 20 | In the "Reason for Movement" dropdown, select the rejection reason code | `{TD.rejectionReasonNoDebitMemo}` | Rejection reason code is selected |
| 21 | Locate the "Trigger Debit Memo Request" checkbox or field | — | Debit memo request field or checkbox is visible in the form |
| 22 | Ensure the "Trigger Debit Memo Request" option is unchecked or disabled | `{TD.skipDebitMemo}` | Debit memo request option remains unchecked/disabled (manual FI processing will be handled later) |
| 23 | Click the "Post" button (primary submit action) in the toolbar | — | SAP begins processing the return delivery posting WITHOUT creating a debit memo request |
| 24 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Material Document number and year |
| 25 | Note the Material Document number from the success message | — | Material Document number is displayed (10-digit numeric format) |
| 26 | Verify that the success message does NOT include a Debit Memo Request number | — | No Debit Memo Request number is displayed in the success message (debit memo was not triggered) |
| 27 | Verify that the success message confirms the return delivery posting only | — | Success message confirms "Material Document 50000XXXXX posted" with movement type 122; no mention of debit memo |
| 28 | Navigate to "Display Stock Overview" or equivalent stock inquiry app | — | Stock overview application opens |
| 29 | Search for the batch and material in restricted stock | `{TD.batchNoDebitMemo}`, `{TD.materialNoDebitMemo}` | Stock quantity for the batch in Blocked or QI Stock is reduced by `{TD.returnQuantityNoDebitMemo}` |
| 30 | Return to the Fiori Launchpad home page | — | Home page is displayed |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Material Document number (10-digit) is generated by SAP and displayed in the confirmation message
- The Material Document is posted with movement type 122 (Return Delivery to Vendor) and status "Posted"
- NO Debit Memo Request document is created (debit memo option was not triggered)
- The batch quantity in Blocked or Quality Inspection Stock is reduced by the return quantity
- The return delivery is successfully recorded with full traceability; vendor cost recovery can be handled manually by the FI team at a later time

---

### Post-conditions

- SAP Material Document exists with the generated document number and movement type 122
- No Debit Memo Request document is created
- Batch quantity in restricted stock is reduced by the return quantity
- Document status is "Posted" / "Completed"
- Vendor cost recovery remains as a manual FI task (debit memo can be created separately if needed)
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
