# TC-CS-043: Attempt to Post Goods Receipt with Expiration Date Earlier Than Manufacturing Date

**User Story:**          [CS-18] Receive Materials Into Batch-Managed Stock And Capture The Manufacturi
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch-Managed Goods Receipt with Date Sequence Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to post goods receipts |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Purchase Order `{TD.poNumber}` exists with status Open; PO contains batch-managed material line item |
| P4 | Master Data | Material `{TD.materialId}` is created, released, batch-managed, and configured for plant `{TD.plant}` |
| P5 | Test Condition | Expiration Date `{TD.expirationDateBeforeMfg}` is chronologically earlier than Manufacturing Date `{TD.manufacturingDate}` — this is the invalid test condition per AC-2 |
| P6 | Configuration | Storage location `{TD.storageLocation}` is active and assigned to plant `{TD.plant}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-18/CS-18-testdata.json` — Dataset ID: `TD-CS-18-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Purchase Order Number | `{TD.poNumber}` | Existing open PO — entered by the user | Valid |
| PO Item Number | `{TD.poItem}` | Item line number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Batch-managed material — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | New batch ID — entered by the user | Valid |
| Quantity | `{TD.quantity}` | Quantity to receive — entered by the user | Valid |
| Manufacturing Date | `{TD.manufacturingDate}` | Valid manufacturing date — entered by the user | Valid |
| Expiration Date | `{TD.expirationDateBeforeMfg}` | Date earlier than manufacturing date — entered by the user | Invalid |
| Vendor Batch Number | `{TD.vendorBatch}` | Vendor batch ID — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant — verified | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location — entered by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed |
| 2 | Enter the user email address | `{ENV.SAP_USERNAME}` | Email is entered |
| 3 | Click "Continue" | — | Password entry screen appears |
| 4 | Enter the password | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click "Continue" | — | User authenticated; Fiori Launchpad home page loads |
| 6 | Close Introduction pop-up if it appears | — | Pop-up dismissed; home page visible |
| 7 | Click search icon and type "Post Goods Receipt" | — | Search results list "Post Goods Receipt" app |
| 8 | Click "Post Goods Receipt" | — | Application opens |
| 9 | Enter Purchase Order number | `{TD.poNumber}` | PO number entered |
| 10 | Press Enter | — | PO validated; line items displayed |
| 11 | Select PO line item | `{TD.poItem}` | Line item selected |
| 12 | Verify Material ID | `{TD.materialId}` | Material ID matches; description `{TD.materialDesc}` auto-populated |
| 13 | Enter Quantity | `{TD.quantity}` | Quantity populated |
| 14 | Press Enter | — | Quantity confirmed |
| 15 | Enter Batch Number | `{TD.batchNumber}` | Batch number entered |
| 16 | Press Enter | — | Batch accepted |
| 17 | Enter Manufacturing Date | `{TD.manufacturingDate}` | Manufacturing date populated |
| 18 | Press Enter | — | Manufacturing date confirmed |
| 19 | Enter Expiration Date (earlier than Mfg Date) | `{TD.expirationDateBeforeMfg}` | Expiration date populated with invalid value (earlier than manufacturing date) |
| 20 | Press Enter | — | SAP detects invalid date sequence; error message displayed indicating expiration date cannot be earlier than manufacturing date per AC-2 |
| 21 | Enter Vendor Batch | `{TD.vendorBatch}` | Vendor batch populated |
| 22 | Verify Plant | `{TD.plant}` | Plant shown correctly |
| 23 | Enter Storage Location | `{TD.storageLocation}` | Storage location populated |
| 24 | Click "Post" | — | SAP prevents posting; error message confirms expiration date must be after manufacturing date; Material Document NOT created |
| 25 | Observe error message | — | Error clearly indicates date sequence violation |
| 26 | Verify no Material Document generated | — | No document number displayed |
| 27 | Click User Profile icon | — | Profile menu appears |
| 28 | Click "Sign Out" | — | Sign out dialog appears |
| 29 | Click "OK" | — | User signed out; login page displayed |

---

### Expected Final Result

- SAP detects that the expiration date is chronologically earlier than the manufacturing date and prevents the goods receipt from being posted
- An error message is displayed indicating the invalid date sequence
- No Material Document number is generated
- No Goods Receipt document is created
- No batch master record is created
- Inventory quantities are NOT updated

---

### Post-conditions

- No SAP Material Document exists for this transaction
- No batch master record created
- Material inventory unchanged
- User notified of validation error

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
