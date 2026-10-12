# TC-CS-041: Post Goods Receipt with Manual Override of Auto-Calculated Expiration Date

**User Story:**          [CS-18] Receive Materials Into Batch-Managed Stock And Capture The Manufacturi
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch-Managed Goods Receipt with Expiration Date Override
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to post goods receipts and override auto-calculated dates |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Purchase Order `{TD.poNumber}` exists with status Open; PO contains batch-managed material line item |
| P4 | Master Data | Material `{TD.materialIdAutoCalc}` is created, released, batch-managed, and has a shelf-life profile maintained |
| P5 | Configuration | Batch number `{TD.batchNumberOverride}` does NOT yet exist in the system (to be created during GR posting) |
| P6 | Configuration | Storage location `{TD.storageLocation}` is active and assigned to plant `{TD.plant}` |
| P7 | Business Rule | SAP allows manual override of auto-calculated expiration date (system config permits user input) |

---

### Test Data

**Dataset Reference:** `testdata/CS-18/CS-18-testdata.json` — Dataset ID: `TD-CS-18-AP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Purchase Order Number | `{TD.poNumber}` | Existing open PO with batch-managed material line item — entered by the user | Valid |
| PO Item Number | `{TD.poItem}` | Item line number from the PO — entered by the user | Valid |
| Material ID | `{TD.materialIdAutoCalc}` | Batch-managed material with shelf-life profile — entered by the user | Valid |
| Batch Number | `{TD.batchNumberOverride}` | New batch ID to be created — entered by the user | Valid |
| Quantity | `{TD.quantity}` | Numeric quantity to receive — entered by the user | Valid |
| Manufacturing Date | `{TD.manufacturingDate}` | Date material was manufactured — entered by the user | Valid |
| Expiration Date (Override) | `{TD.expirationDateOverride}` | Manually entered expiration date (different from auto-calculated value) — entered by the user | Valid |
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
| 12 | In the "Material" field, verify the Material ID is displayed | `{TD.materialIdAutoCalc}` | Material ID matches the expected value; material description `{TD.materialDescAutoCalc}` is auto-populated |
| 13 | In the "Quantity" field of the GR line item, enter the quantity | `{TD.quantity}` | Quantity is populated in the line item |
| 14 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; line item is updated |
| 15 | In the "Batch" field, enter the Batch Number | `{TD.batchNumberOverride}` | Batch number is entered into the field |
| 16 | Press Enter to confirm the batch number entry | — | SAP accepts the batch number (new batch to be created) |
| 17 | In the "Mfg Date" (Manufacturing Date) field, enter the manufacturing date | `{TD.manufacturingDate}` | Manufacturing date is populated |
| 18 | Press Enter to confirm the manufacturing date entry | — | Manufacturing date is confirmed; SAP automatically calculates the Expiration Date based on the shelf-life profile |
| 19 | Verify the "Expiration Date" field is auto-populated by SAP | — | Expiration Date field displays the calculated date (Mfg Date + shelf-life period) |
| 20 | Clear the auto-calculated Expiration Date and manually enter a different expiration date | `{TD.expirationDateOverride}` | Auto-calculated value is replaced with the manually entered expiration date; SAP accepts the override |
| 21 | Press Enter to confirm the manually entered expiration date | — | Expiration date is confirmed; SAP validates that the manually entered date is after manufacturing date and in the future |
| 22 | In the "Vendor Batch" field, enter the vendor batch number | `{TD.vendorBatch}` | Vendor batch number is populated |
| 23 | Verify the Plant field on the line item | `{TD.plant}` | Plant field shows the expected value (from PO) |
| 24 | In the "Storage Location" field, enter the storage location | `{TD.storageLocation}` | Storage location is populated |
| 25 | Click the "Post" button (primary submit action) in the toolbar | — | SAP begins processing the goods receipt submission |
| 26 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Material Document number |
| 27 | Note the Material Document number from the success message | — | Material Document number is displayed (10-digit numeric, begins with 49 or 50) |
| 28 | Navigate to the search icon and type "Display Batch" | — | Search results appear listing the "Display Batch" application |
| 29 | Click "Display Batch" from the search results | — | The "Display Batch" application opens |
| 30 | In the "Batch" field, enter the batch number created in step 15 | `{TD.batchNumberOverride}` | Batch number is entered |
| 31 | In the "Material" field, enter the material ID | `{TD.materialIdAutoCalc}` | Material ID is entered |
| 32 | Click the "Search" or "Display" button | — | SAP retrieves the batch master record |
| 33 | Verify the batch classification data is displayed | — | Batch master record shows Manufacturing Date `{TD.manufacturingDate}`, Expiration Date `{TD.expirationDateOverride}` (manually overridden value, NOT the auto-calculated value), and Vendor Batch `{TD.vendorBatch}` correctly captured |
| 34 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 35 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 36 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Material Document number is generated by SAP and displayed in the confirmation message
- The Goods Receipt is persisted in SAP with the material, batch, quantity, plant, and storage location correctly stored
- A new batch master record is created for batch `{TD.batchNumberOverride}` capturing:
  - Manufacturing Date: `{TD.manufacturingDate}`
  - Expiration Date: `{TD.expirationDateOverride}` (manually overridden value, not the auto-calculated value)
  - Vendor Batch: `{TD.vendorBatch}`
- SAP accepts the manual override of the auto-calculated expiration date per AC-3
- The batch classification data is visible and accurate in the "Display Batch" app with the overridden expiration date

---

### Post-conditions

- SAP Material Document exists with the generated document number
- Batch master record (MCH1) exists for `{TD.batchNumberOverride}` with manually overridden expiration date
- Material `{TD.materialIdAutoCalc}` inventory is updated with received quantity for the batch
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
