# TC-CS-176: Record Return Delivery from Quality Inspection Stock without Debit Memo Request

**User Story:**          [CS-21] Record A Return Delivery For A Rejected Batch Back To The Vendor
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Return Delivery for Rejected Batch
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to post goods movements (Return Delivery) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Purchase Order `{TD.purchaseOrderNumberQI}` exists with goods receipt posted and batch `{TD.batchNumberQI}` received |
| P4 | Master Data | Batch `{TD.batchNumberQI}` exists in Quality Inspection Stock (stock type 'X') with available quantity >= `{TD.returnQuantityQI}` |
| P5 | Master Data | Material `{TD.materialNumberQI}` from the goods receipt is configured for batch management and return processing |
| P6 | Master Data | Vendor from the Purchase Order is active |
| P7 | Configuration | Rejection reason codes are configured in SAP (e.g., 0001=Failed specification, 0002=Damaged packaging, 0003=Expired) |
| P8 | Configuration | Movement type 122 (Return Delivery to Vendor) is configured for the plant `{TD.plantQI}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-21/CS-21-testdata.json` — Dataset ID: `TD-CS-021-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Purchase Order | `{TD.purchaseOrderNumberQI}` | Existing PO with goods receipt posted — entered by the user | Valid |
| Batch Number | `{TD.batchNumberQI}` | Batch in Quality Inspection Stock (stock type 'X') — entered by the user | Valid |
| Material Number | `{TD.materialNumberQI}` | Material from original GR (auto-filled from PO) — verified by the user | Valid |
| Return Quantity | `{TD.returnQuantityQI}` | Quantity to return (< available batch quantity) — entered by the user | Valid |
| Rejection Reason Code | `{TD.rejectionReasonCodeQI}` | Reason for movement (mandatory) — selected by the user | Valid |
| Plant | `{TD.plantQI}` | Plant from original GR — verified on the document | Valid |
| Storage Location | `{TD.storageLocationQI}` | Storage location from original GR — verified on the document | Valid |
| Trigger Debit Memo | `{TD.triggerDebitMemoNo}` | Checkbox or flag to trigger debit memo request — left unchecked by the user | Valid (No/False) |

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
| 11 | In the "Purchase Order" field, enter the Purchase Order number | `{TD.purchaseOrderNumberQI}` | Purchase Order number is entered into the field |
| 12 | Press Enter to confirm the Purchase Order entry | — | SAP validates the PO; vendor ID `{TD.vendorIdQI}` and vendor name `{TD.vendorNameQI}` are auto-populated |
| 13 | In the "Material" field, enter the Material number | `{TD.materialNumberQI}` | Material number is entered into the field |
| 14 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDescriptionQI}` is auto-populated; unit of measure `{TD.uomQI}` is displayed |
| 15 | In the "Batch" field, enter the Batch number | `{TD.batchNumberQI}` | Batch number is entered into the field |
| 16 | Press Enter to confirm the Batch entry | — | SAP validates the batch; stock type 'X' (Quality Inspection Stock) is displayed; inspection lot number `{TD.inspectionLotNumberQI}` is shown; available quantity is verified |
| 17 | In the "Quantity" field, enter the return quantity | `{TD.returnQuantityQI}` | Return quantity is entered and validated against available batch quantity |
| 18 | In the "Plant" field, verify or enter the plant code | `{TD.plantQI}` | Plant field shows the plant from the original goods receipt (auto-filled or manually entered) |
| 19 | In the "Storage Location" field, verify or enter the storage location | `{TD.storageLocationQI}` | Storage location field shows the location from the original goods receipt |
| 20 | In the "Reason for Movement" dropdown, select the rejection reason code | `{TD.rejectionReasonCodeQI}` | Rejection reason code is selected (e.g., 0001=Failed specification, 0002=Damaged, 0003=Expired) |
| 21 | Locate the "Trigger Debit Memo Request" checkbox or field | — | Debit memo request field or checkbox is visible in the form |
| 22 | Leave the "Trigger Debit Memo Request" option unchecked or disabled | `{TD.triggerDebitMemoNo}` | Debit memo request option remains unchecked/disabled (manual processing later) |
| 23 | Click the "Post" button (primary submit action) in the toolbar | — | SAP begins processing the return delivery posting |
| 24 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Material Document number and year |
| 25 | Note the Material Document number from the success message | — | Material Document number is displayed (10-digit numeric format, e.g., 50000XXXXX) |
| 26 | Verify that the success message references movement type 122 and the posting date | — | Success message confirms "Material Document 50000XXXXX posted" with movement type 122 and current date |
| 27 | Verify that the success message does NOT include a Debit Memo Request number | — | No Debit Memo Request number is displayed (debit memo was not triggered) |
| 28 | Navigate to "Display Stock Overview" or equivalent stock inquiry app | — | Stock overview application opens |
| 29 | Search for the batch and material in Quality Inspection Stock | `{TD.batchNumberQI}`, `{TD.materialNumberQI}` | Stock quantity for the batch in Quality Inspection Stock is reduced by `{TD.returnQuantityQI}` |
| 30 | Return to the Fiori Launchpad home page | — | Home page is displayed |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Material Document number (10-digit) is generated by SAP and displayed in the confirmation message
- The Material Document is posted with movement type 122 (Return Delivery to Vendor) and status "Posted"
- The batch quantity in Quality Inspection Stock (stock type 'X') is reduced by the return quantity
- No Debit Memo Request document is created (debit memo option was not triggered)
- The Material Document references the original goods receipt document and inspection lot number
- All header data (vendor, plant, storage location) is correctly stored
- All line item data (material, batch, quantity, rejection reason) is correctly recorded

---

### Post-conditions

- SAP Material Document exists with the generated document number and movement type 122
- Batch `{TD.batchNumberQI}` quantity in Quality Inspection Stock is reduced by `{TD.returnQuantityQI}`
- No Debit Memo Request document is created
- Document status is "Posted" / "Completed"
- Material Document references the original goods receipt and inspection lot
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
