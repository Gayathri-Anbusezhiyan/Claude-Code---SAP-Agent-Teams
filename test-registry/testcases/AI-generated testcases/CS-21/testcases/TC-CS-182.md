# TC-CS-182: Attempt Return Delivery with Invalid or Non-existent Batch Number

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
| P3 | Master Data | Purchase Order `{TD.purchaseOrderValidForBatch}` exists with goods receipt posted |
| P4 | Master Data | Batch `{TD.batchInvalid}` does NOT exist in the SAP system (verified as non-existent) |
| P5 | Configuration | Movement type 122 (Return Delivery to Vendor) is configured and active |

---

### Test Data

**Dataset Reference:** `testdata/CS-21/CS-21-testdata.json` — Dataset ID: `TD-CS-021-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Purchase Order | `{TD.purchaseOrderValidForBatch}` | Valid Purchase Order with goods receipt — entered by the user | Valid |
| Batch Number | `{TD.batchInvalid}` | Non-existent Batch number — entered by the user | Invalid |
| Material Number | `{TD.materialValidForBatch}` | Valid material number from the PO — entered by the user | Valid |
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
| 11 | In the "Purchase Order" field, enter the valid Purchase Order number | `{TD.purchaseOrderValidForBatch}` | Purchase Order number is entered into the field |
| 12 | Press Enter to confirm the Purchase Order entry | — | SAP validates the PO; vendor information is auto-populated |
| 13 | In the "Material" field, enter the Material number | `{TD.materialValidForBatch}` | Material number is entered into the field |
| 14 | Press Enter to confirm the Material entry | — | SAP validates the material; material description and unit of measure are auto-populated |
| 15 | In the "Batch" field, enter the invalid/non-existent Batch number | `{TD.batchInvalid}` | Invalid Batch number is entered into the field |
| 16 | Press Enter to confirm the Batch entry | — | SAP validates the batch and detects that it does not exist in the system |
| 17 | Observe the error message displayed by SAP | — | SAP displays an error message: "Batch `{TD.batchInvalid}` does not exist" or "Batch not found for material `{TD.materialValidForBatch}`" |
| 18 | Verify that the Batch field is highlighted or marked as invalid | — | Batch field is highlighted in red or marked with an error indicator |
| 19 | Verify that stock type and inspection lot information are NOT displayed | — | Stock type and inspection lot fields remain empty; no auto-population occurs due to invalid batch |
| 20 | Attempt to click the "Post" button | — | SAP either disables the "Post" button or displays an error when attempting to post: "Batch is invalid; cannot post return delivery" |
| 21 | Verify that no Material Document is created | — | No Material Document number is generated; the transaction is NOT posted |
| 22 | Clear the form or close it | — | Form is cleared or closed; no data is saved |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects that the Batch number `{TD.batchInvalid}` does not exist in the system
- SAP displays a clear error message: "Batch does not exist" or "Batch not found"
- The Batch field is highlighted or marked as invalid
- No stock type or inspection lot information is displayed
- The "Post" button is disabled or returns an error when clicked
- No Material Document is created; the return delivery transaction is NOT posted

---

### Post-conditions

- No SAP Material Document is created
- No stock movements are recorded
- The return delivery transaction is rejected due to invalid Batch number
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
