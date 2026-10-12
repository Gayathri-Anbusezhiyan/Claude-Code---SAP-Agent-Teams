# TC-CS-178: Return Batch from Quality Inspection Stock (Stock Type X) Validation

**User Story:**          [CS-21] Record A Return Delivery For A Rejected Batch Back To The Vendor
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Return Delivery for Rejected Batch
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
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
| P3 | Master Data | Purchase Order `{TD.purchaseOrderQIStock}` exists with goods receipt posted and batch `{TD.batchQIStock}` received |
| P4 | Master Data | Batch `{TD.batchQIStock}` exists SPECIFICALLY in Quality Inspection Stock (stock type 'X') with available quantity >= `{TD.returnQuantityQIStock}` |
| P5 | Master Data | Material `{TD.materialQIStock}` from the goods receipt is configured for batch management and return processing |
| P6 | Configuration | Movement type 122 (Return Delivery to Vendor) is configured for the plant `{TD.plantQIStock}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-21/CS-21-testdata.json` — Dataset ID: `TD-CS-021-AP-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Purchase Order | `{TD.purchaseOrderQIStock}` | Existing PO with goods receipt posted — entered by the user | Valid |
| Batch Number | `{TD.batchQIStock}` | Batch SPECIFICALLY in Quality Inspection Stock (stock type 'X') — entered by the user | Valid |
| Material Number | `{TD.materialQIStock}` | Material from original GR (auto-filled from PO) — verified by the user | Valid |
| Return Quantity | `{TD.returnQuantityQIStock}` | Quantity to return — entered by the user | Valid |
| Rejection Reason Code | `{TD.rejectionReasonQIStock}` | Reason for movement (mandatory) — selected by the user | Valid |
| Plant | `{TD.plantQIStock}` | Plant from original GR — verified on the document | Valid |
| Storage Location | `{TD.storageLocationQIStock}` | Storage location from original GR — verified on the document | Valid |

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
| 11 | In the "Purchase Order" field, enter the Purchase Order number | `{TD.purchaseOrderQIStock}` | Purchase Order number is entered into the field |
| 12 | Press Enter to confirm the Purchase Order entry | — | SAP validates the PO; vendor information is auto-populated |
| 13 | In the "Material" field, enter the Material number | `{TD.materialQIStock}` | Material number is entered into the field |
| 14 | Press Enter to confirm the Material entry | — | SAP validates the material; material description and unit of measure are auto-populated |
| 15 | In the "Batch" field, enter the Batch number | `{TD.batchQIStock}` | Batch number is entered into the field |
| 16 | Press Enter to confirm the Batch entry | — | SAP validates the batch; stock type 'X' (Quality Inspection Stock) is EXPLICITLY displayed; inspection lot number is shown; available quantity is verified |
| 17 | Verify that the stock type field or indicator shows 'X' (Quality Inspection Stock) | — | Stock type 'X' (Quality Inspection Stock) is displayed, confirming the batch is in the correct restricted stock type |
| 18 | In the "Quantity" field, enter the return quantity | `{TD.returnQuantityQIStock}` | Return quantity is entered and validated against available batch quantity |
| 19 | In the "Plant" field, verify or enter the plant code | `{TD.plantQIStock}` | Plant field shows the plant from the original goods receipt |
| 20 | In the "Storage Location" field, verify or enter the storage location | `{TD.storageLocationQIStock}` | Storage location field shows the location from the original goods receipt |
| 21 | In the "Reason for Movement" dropdown, select the rejection reason code | `{TD.rejectionReasonQIStock}` | Rejection reason code is selected |
| 22 | Click the "Post" button (primary submit action) in the toolbar | — | SAP begins processing the return delivery posting |
| 23 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Material Document number and year |
| 24 | Note the Material Document number from the success message | — | Material Document number is displayed (10-digit numeric format) |
| 25 | Navigate to "Display Stock Overview" or equivalent stock inquiry app | — | Stock overview application opens |
| 26 | Search for the batch and material in Quality Inspection Stock (stock type 'X') | `{TD.batchQIStock}`, `{TD.materialQIStock}` | Stock quantity for the batch in Quality Inspection Stock (stock type 'X') is reduced by `{TD.returnQuantityQIStock}` |
| 27 | Verify that no quantity has been deducted from Unrestricted or Blocked stock | — | Only Quality Inspection Stock (stock type 'X') quantity is reduced; other stock types remain unchanged |
| 28 | Return to the Fiori Launchpad home page | — | Home page is displayed |
| 29 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 30 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 31 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Material Document number (10-digit) is generated by SAP and displayed in the confirmation message
- The Material Document is posted with movement type 122 (Return Delivery to Vendor) and status "Posted"
- The batch quantity is removed ONLY from Quality Inspection Stock (stock type 'X'), NOT from Unrestricted or Blocked stock
- The stock type validation ensures that the return delivery correctly identifies and processes the Quality Inspection Stock type
- All document references and traceability are correctly maintained

---

### Post-conditions

- SAP Material Document exists with the generated document number and movement type 122
- Batch `{TD.batchQIStock}` quantity in Quality Inspection Stock (stock type 'X') is reduced by `{TD.returnQuantityQIStock}`
- Unrestricted and Blocked stock quantities remain unchanged
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
