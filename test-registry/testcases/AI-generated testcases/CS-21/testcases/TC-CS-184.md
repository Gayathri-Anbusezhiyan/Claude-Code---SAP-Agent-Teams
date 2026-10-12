# TC-CS-184: Attempt Return Delivery with Batch in Unrestricted Stock (Not Blocked or QI)

**User Story:**          [CS-21] Record A Return Delivery For A Rejected Batch Back To The Vendor
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Return Delivery for Rejected Batch
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to post goods movements (Return Delivery) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Purchase Order `{TD.purchaseOrderUnrestricted}` exists with goods receipt posted |
| P4 | Master Data | Batch `{TD.batchUnrestricted}` exists in Unrestricted Stock (NOT in Blocked or Quality Inspection Stock) with available quantity >= `{TD.returnQuantityStandard}` |
| P5 | Business Rule | Return deliveries for rejected batches must be posted from Blocked Stock (stock type 'S') or Quality Inspection Stock (stock type 'X') only — NOT from Unrestricted Stock |
| P6 | Configuration | Movement type 122 (Return Delivery to Vendor) is configured and active |

---

### Test Data

**Dataset Reference:** `testdata/CS-21/CS-21-testdata.json` — Dataset ID: `TD-CS-021-NEG-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Purchase Order | `{TD.purchaseOrderUnrestricted}` | Valid Purchase Order with goods receipt — entered by the user | Valid |
| Batch Number | `{TD.batchUnrestricted}` | Batch exists in Unrestricted Stock (NOT Blocked or QI) — entered by the user | Invalid (wrong stock type) |
| Material Number | `{TD.materialUnrestricted}` | Valid material number from the PO — entered by the user | Valid |
| Return Quantity | `{TD.returnQuantityStandard}` | Standard return quantity — entered by the user | Valid |
| Rejection Reason Code | `{TD.rejectionReasonStandard}` | Valid rejection reason code — selected by the user | Valid |

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
| 11 | In the "Purchase Order" field, enter the Purchase Order number | `{TD.purchaseOrderUnrestricted}` | Purchase Order number is entered into the field |
| 12 | Press Enter to confirm the Purchase Order entry | — | SAP validates the PO; vendor information is auto-populated |
| 13 | In the "Material" field, enter the Material number | `{TD.materialUnrestricted}` | Material number is entered into the field |
| 14 | Press Enter to confirm the Material entry | — | SAP validates the material; material description and unit of measure are auto-populated |
| 15 | In the "Batch" field, enter the Batch number | `{TD.batchUnrestricted}` | Batch number is entered into the field |
| 16 | Press Enter to confirm the Batch entry | — | SAP validates the batch; stock type is displayed as Unrestricted (NOT 'S' for Blocked or 'X' for QI) |
| 17 | Observe the stock type displayed | — | Stock type field shows Unrestricted Stock (or blank stock type indicator), confirming the batch is NOT in Blocked or QI Stock |
| 18 | In the "Quantity" field, enter the return quantity | `{TD.returnQuantityStandard}` | Return quantity is entered into the field |
| 19 | In the "Reason for Movement" dropdown, select the rejection reason code | `{TD.rejectionReasonStandard}` | Rejection reason code is selected |
| 20 | Attempt to click the "Post" button | — | SAP validates the stock type and detects that the batch is not in restricted stock (Blocked or QI) |
| 21 | Observe the error message displayed by SAP | — | SAP displays an error message: "Batch not in Blocked or Quality Inspection stock" or "Stock type is not valid for return delivery" or "Batch must be in restricted stock" |
| 22 | Verify that the Batch field or Stock Type field is highlighted as invalid | — | Batch or Stock Type field is highlighted in red or marked with an error indicator |
| 23 | Verify that no Material Document is created | — | No Material Document number is generated; the transaction is NOT posted |
| 24 | Clear the form or close it | — | Form is cleared or closed; no data is saved |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects that the Batch `{TD.batchUnrestricted}` is in Unrestricted Stock, NOT in Blocked or Quality Inspection Stock
- SAP displays a clear error message: "Batch not in Blocked or Quality Inspection stock" or "Invalid stock type for return delivery"
- The system enforces the business rule that return deliveries for rejected batches must be posted from Blocked or QI Stock only
- No Material Document is created; the return delivery transaction is NOT posted
- Unrestricted Stock quantities remain unchanged

---

### Post-conditions

- No SAP Material Document is created
- No stock movements are recorded
- The return delivery transaction is rejected due to invalid stock type (Unrestricted)
- No application-level errors or critical warnings remain outstanding after closing the form

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
