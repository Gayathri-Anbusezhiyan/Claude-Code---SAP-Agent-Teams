# TC-CS-042: Attempt to Post Goods Receipt with Expiration Date Already Passed

**User Story:**          [CS-18] Receive Materials Into Batch-Managed Stock And Capture The Manufacturi
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch-Managed Goods Receipt with Expiration Date Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            CRITICAL
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
| P5 | Test Condition | Expiration Date `{TD.expiredDate}` is a date in the past (already passed) — this is the invalid test condition per AC-5 |
| P6 | Configuration | Storage location `{TD.storageLocation}` is active and assigned to plant `{TD.plant}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-18/CS-18-testdata.json` — Dataset ID: `TD-CS-18-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Purchase Order Number | `{TD.poNumber}` | Existing open PO with batch-managed material line item — entered by the user | Valid |
| PO Item Number | `{TD.poItem}` | Item line number from the PO — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Batch-managed material master number — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | New batch ID to be created — entered by the user | Valid |
| Quantity | `{TD.quantity}` | Numeric quantity to receive — entered by the user | Valid |
| Manufacturing Date | `{TD.manufacturingDate}` | Date material was manufactured — entered by the user | Valid |
| Expiration Date | `{TD.expiredDate}` | Date in the past (already expired) — entered by the user | Invalid |
| Vendor Batch Number | `{TD.vendorBatch}` | Vendor's batch identifier — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — verified on the GR document | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Post Goods Receipt" | — | Search results appear listing the "Post Goods Receipt" application |
| 8 | Click "Post Goods Receipt" from the search results | — | The "Post Goods Receipt" application opens |
| 9 | In the "Purchase Order" field, enter the Purchase Order number | `{TD.poNumber}` | PO number is entered into the field |
| 10 | Press Enter to confirm the PO entry | — | SAP validates the PO; PO details are loaded; line items are displayed |
| 11 | Select the PO line item corresponding to the batch-managed material | `{TD.poItem}` | Line item is selected; item details are shown |
| 12 | In the "Material" field, verify the Material ID is displayed | `{TD.materialId}` | Material ID matches the expected value; material description `{TD.materialDesc}` is auto-populated |
| 13 | In the "Quantity" field of the GR line item, enter the quantity | `{TD.quantity}` | Quantity is populated in the line item |
| 14 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; line item is updated |
| 15 | In the "Batch" field, enter the Batch Number | `{TD.batchNumber}` | Batch number is entered into the field |
| 16 | Press Enter to confirm the batch number entry | — | SAP accepts the batch number (new batch to be created) |
| 17 | In the "Mfg Date" (Manufacturing Date) field, enter the manufacturing date | `{TD.manufacturingDate}` | Manufacturing date is populated |
| 18 | Press Enter to confirm the manufacturing date entry | — | Manufacturing date is confirmed |
| 19 | In the "Expiration Date" field, enter the expired date (date in the past) | `{TD.expiredDate}` | Expiration date is populated with a past date |
| 20 | Press Enter to confirm the expiration date entry | — | SAP detects that the expiration date has already passed; an error message or warning is displayed indicating the material is expired |
| 21 | In the "Vendor Batch" field, enter the vendor batch number | `{TD.vendorBatch}` | Vendor batch number is populated |
| 22 | Verify the Plant field on the line item | `{TD.plant}` | Plant field shows the expected value (from PO) |
| 23 | In the "Storage Location" field, enter the storage location | `{TD.storageLocation}` | Storage location is populated |
| 24 | Click the "Post" button (primary submit action) in the toolbar | — | SAP prevents the goods receipt posting; an error message is displayed indicating that the expiration date has already passed; the system does NOT allow posting of expired material per AC-5 |
| 25 | Observe the error message | — | Error message clearly states that the expiration date is in the past or has already expired; posting is blocked |
| 26 | Verify that no Material Document number is generated | — | No Material Document is created; transaction is not completed |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects the expired expiration date and prevents the goods receipt from being posted per AC-5
- An error message is displayed clearly indicating that the expiration date has already passed
- No Material Document number is generated
- No Goods Receipt document is created in SAP
- No batch master record is created
- Inventory quantities are NOT updated

---

### Post-conditions

- No SAP Material Document exists for this transaction
- No batch master record is created for `{TD.batchNumber}`
- Material `{TD.materialId}` inventory remains unchanged
- User is notified of the validation error

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
