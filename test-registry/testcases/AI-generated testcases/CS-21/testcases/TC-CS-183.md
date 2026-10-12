# TC-CS-183: Attempt Return Delivery with Batch Having Zero Quantity in Restricted Stock

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
| P3 | Master Data | Purchase Order `{TD.purchaseOrderZeroStock}` exists with goods receipt posted |
| P4 | Master Data | Batch `{TD.batchZeroStock}` exists in the system BUT has zero (0) quantity in Blocked or Quality Inspection Stock |
| P5 | Configuration | Movement type 122 (Return Delivery to Vendor) is configured and active |

---

### Test Data

**Dataset Reference:** `testdata/CS-21/CS-21-testdata.json` — Dataset ID: `TD-CS-021-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Purchase Order | `{TD.purchaseOrderZeroStock}` | Valid Purchase Order with goods receipt — entered by the user | Valid |
| Batch Number | `{TD.batchZeroStock}` | Batch exists but has zero quantity in restricted stock — entered by the user | Invalid (zero stock) |
| Material Number | `{TD.materialZeroStock}` | Valid material number from the PO — entered by the user | Valid |
| Return Quantity | `{TD.returnQuantityStandard}` | Standard return quantity (> 0) — entered by the user | Valid |

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
| 11 | In the "Purchase Order" field, enter the Purchase Order number | `{TD.purchaseOrderZeroStock}` | Purchase Order number is entered into the field |
| 12 | Press Enter to confirm the Purchase Order entry | — | SAP validates the PO; vendor information is auto-populated |
| 13 | In the "Material" field, enter the Material number | `{TD.materialZeroStock}` | Material number is entered into the field |
| 14 | Press Enter to confirm the Material entry | — | SAP validates the material; material description and unit of measure are auto-populated |
| 15 | In the "Batch" field, enter the Batch number | `{TD.batchZeroStock}` | Batch number is entered into the field |
| 16 | Press Enter to confirm the Batch entry | — | SAP validates the batch; batch exists but available quantity in restricted stock is 0 (zero) |
| 17 | Observe the available stock quantity displayed | — | Available quantity for the batch in Blocked or QI Stock is displayed as 0 (zero) |
| 18 | In the "Quantity" field, enter a positive return quantity | `{TD.returnQuantityStandard}` | Return quantity is entered into the field |
| 19 | Attempt to click the "Post" button | — | SAP validates the stock availability and detects insufficient stock |
| 20 | Observe the error message displayed by SAP | — | SAP displays an error message: "No stock available for batch `{TD.batchZeroStock}`" or "Quantity exceeds available stock" or "Insufficient stock" |
| 21 | Verify that the Quantity field or Batch field is highlighted as invalid | — | Quantity or Batch field is highlighted in red or marked with an error indicator |
| 22 | Verify that no Material Document is created | — | No Material Document number is generated; the transaction is NOT posted |
| 23 | Clear the form or close it | — | Form is cleared or closed; no data is saved |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects that the Batch `{TD.batchZeroStock}` has zero (0) quantity in Blocked or Quality Inspection Stock
- SAP displays a clear error message: "No stock available for batch" or "Insufficient stock"
- The system prevents posting a return delivery when the available batch quantity is zero
- No Material Document is created; the return delivery transaction is NOT posted

---

### Post-conditions

- No SAP Material Document is created
- No stock movements are recorded
- The return delivery transaction is rejected due to zero available batch quantity
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
