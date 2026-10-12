# TC-CS-181: Attempt Return Delivery with Invalid or Non-existent Purchase Order Number

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
| P3 | Master Data | Purchase Order `{TD.purchaseOrderInvalid}` does NOT exist in the SAP system (verified as non-existent) |
| P4 | Configuration | Movement type 122 (Return Delivery to Vendor) is configured and active |

---

### Test Data

**Dataset Reference:** `testdata/CS-21/CS-21-testdata.json` — Dataset ID: `TD-CS-021-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Purchase Order | `{TD.purchaseOrderInvalid}` | Non-existent Purchase Order number — entered by the user | Invalid |
| Batch Number | `{TD.batchNumberValid}` | Valid batch number (not relevant as PO validation fails first) — entered by the user | Valid |
| Material Number | `{TD.materialNumberValid}` | Valid material number — entered by the user | Valid |
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
| 11 | In the "Purchase Order" field, enter the invalid/non-existent Purchase Order number | `{TD.purchaseOrderInvalid}` | Invalid Purchase Order number is entered into the field |
| 12 | Press Enter to confirm the Purchase Order entry | — | SAP validates the PO and detects that it does not exist in the system |
| 13 | Observe the error message displayed by SAP | — | SAP displays an error message: "Purchase Order `{TD.purchaseOrderInvalid}` does not exist" or "PO not found" |
| 14 | Verify that the Purchase Order field is highlighted or marked as invalid | — | Purchase Order field is highlighted in red or marked with an error indicator |
| 15 | Verify that vendor information is NOT auto-populated | — | Vendor fields remain empty; no auto-population occurs due to invalid PO |
| 16 | Attempt to proceed to the next field (Material) | `{TD.materialNumberValid}` | SAP may prevent navigation or show a validation warning; the invalid PO blocks further processing |
| 17 | Attempt to click the "Post" button | — | SAP either disables the "Post" button or displays an error when attempting to post: "Purchase Order is invalid; cannot post return delivery" |
| 18 | Verify that no Material Document is created | — | No Material Document number is generated; the transaction is NOT posted |
| 19 | Clear the Purchase Order field or close the form | — | Form is cleared or closed; no data is saved |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects that the Purchase Order number `{TD.purchaseOrderInvalid}` does not exist in the system
- SAP displays a clear error message: "Purchase Order does not exist" or "PO not found"
- The Purchase Order field is highlighted or marked as invalid
- No vendor information is auto-populated
- The "Post" button is disabled or returns an error when clicked
- No Material Document is created; the return delivery transaction is NOT posted
- The system prevents submission with invalid Purchase Order data

---

### Post-conditions

- No SAP Material Document is created
- No stock movements are recorded
- The return delivery transaction is rejected due to invalid Purchase Order
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
