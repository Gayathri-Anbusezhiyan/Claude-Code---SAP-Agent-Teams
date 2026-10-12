# TC-CS-185: Attempt Return Delivery with Purchase Order Having No Goods Receipt Posted

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
| P3 | Master Data | Purchase Order `{TD.purchaseOrderNoGR}` exists in the system BUT has NO goods receipt posted (PO status is "Open" without goods receipt) |
| P4 | Business Rule | Return deliveries can only be posted for Purchase Orders that have a goods receipt posted |
| P5 | Configuration | Movement type 122 (Return Delivery to Vendor) is configured and active |

---

### Test Data

**Dataset Reference:** `testdata/CS-21/CS-21-testdata.json` — Dataset ID: `TD-CS-021-NEG-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Purchase Order | `{TD.purchaseOrderNoGR}` | Valid PO but NO goods receipt posted — entered by the user | Invalid (no GR) |
| Batch Number | `{TD.batchNumberValid}` | Valid batch number (not relevant as PO has no GR) — entered by the user | Valid |
| Material Number | `{TD.materialNumberValid}` | Valid material number — entered by the user | Valid |
| Return Quantity | `{TD.returnQuantityStandard}` | Standard return quantity — entered by the user | Valid |

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
| 11 | In the "Purchase Order" field, enter the Purchase Order number | `{TD.purchaseOrderNoGR}` | Purchase Order number is entered into the field |
| 12 | Press Enter to confirm the Purchase Order entry | — | SAP validates the PO; vendor information may be auto-populated |
| 13 | Observe the validation or error response from SAP | — | SAP detects that no goods receipt has been posted for this Purchase Order |
| 14 | Observe the error message displayed by SAP | — | SAP displays an error message: "No goods receipt found for Purchase Order `{TD.purchaseOrderNoGR}`" or "Purchase Order has no goods receipt" or "Cannot post return delivery without goods receipt" |
| 15 | Verify that the Purchase Order field is highlighted or marked as invalid | — | Purchase Order field is highlighted in red or marked with an error indicator |
| 16 | Attempt to proceed to the Material or Batch fields | `{TD.materialNumberValid}`, `{TD.batchNumberValid}` | SAP may prevent navigation or show a validation warning; the PO without GR blocks further processing |
| 17 | Attempt to click the "Post" button | — | SAP either disables the "Post" button or displays an error when attempting to post: "Cannot post return delivery; no goods receipt exists for PO" |
| 18 | Verify that no Material Document is created | — | No Material Document number is generated; the transaction is NOT posted |
| 19 | Clear the form or close it | — | Form is cleared or closed; no data is saved |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects that the Purchase Order `{TD.purchaseOrderNoGR}` has no goods receipt posted
- SAP displays a clear error message: "No goods receipt found for Purchase Order" or "Cannot post return delivery without goods receipt"
- The system enforces the business rule that return deliveries require a prior goods receipt
- No Material Document is created; the return delivery transaction is NOT posted

---

### Post-conditions

- No SAP Material Document is created
- No stock movements are recorded
- The return delivery transaction is rejected due to missing goods receipt
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
