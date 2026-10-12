# TC-CS-040: Post Goods Receipt for Batch-Managed Material with Auto-Calculated Expiration Date

**User Story:**          [CS-18] Receive Materials Into Batch-Managed Stock And Capture The Manufacturi
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch-Managed Goods Receipt with Auto-Calculated Expiration Date
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to post goods receipts and create batch master records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Purchase Order `{TD.poNumber}` exists with status Open; PO contains batch-managed material line item |
| P4 | Master Data | Material `{TD.materialIdAutoCalc}` is created, released, batch-managed, and configured for plant `{TD.plant}` |
| P5 | Configuration | Material `{TD.materialIdAutoCalc}` has a shelf-life profile maintained in the material master (MARA-MHDHB field populated with shelf-life period in days) |
| P6 | Configuration | Batch number `{TD.batchNumberAutoCalc}` does NOT yet exist in the system (to be created during GR posting) |
| P7 | Configuration | Storage location `{TD.storageLocation}` is active and assigned to plant `{TD.plant}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-18/CS-18-testdata.json` — Dataset ID: `TD-CS-18-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Purchase Order Number | `{TD.poNumber}` | Existing open PO with batch-managed material line item — entered by the user | Valid |
| PO Item Number | `{TD.poItem}` | Item line number from the PO — entered by the user | Valid |
| Material ID | `{TD.materialIdAutoCalc}` | Batch-managed material with shelf-life profile — entered by the user | Valid |
| Batch Number | `{TD.batchNumberAutoCalc}` | New batch ID to be created — entered by the user | Valid |
| Quantity | `{TD.quantity}` | Numeric quantity to receive — entered by the user | Valid |
| Manufacturing Date | `{TD.manufacturingDate}` | Date material was manufactured — entered by the user | Valid |
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
| 15 | In the "Batch" field, enter the Batch Number | `{TD.batchNumberAutoCalc}` | Batch number is entered into the field |
| 16 | Press Enter to confirm the batch number entry | — | SAP accepts the batch number (new batch to be created) |
| 17 | In the "Mfg Date" (Manufacturing Date) field, enter the manufacturing date | `{TD.manufacturingDate}` | Manufacturing date is populated |
| 18 | Press Enter to confirm the manufacturing date entry | — | Manufacturing date is confirmed; SAP automatically calculates the Expiration Date based on the shelf-life profile (Mfg Date + shelf-life days) |
| 19 | Verify the "Expiration Date" field is auto-populated by SAP | — | Expiration Date field displays the calculated date (Mfg Date + shelf-life period from material master); date is in the future |
| 20 | Do NOT manually enter an expiration date (system has auto-calculated it) | — | Expiration Date remains as auto-calculated value |
| 21 | In the "Vendor Batch" field, enter the vendor batch number | `{TD.vendorBatch}` | Vendor batch number is populated |
| 22 | Verify the Plant field on the line item | `{TD.plant}` | Plant field shows the expected value (from PO) |
| 23 | In the "Storage Location" field, enter the storage location | `{TD.storageLocation}` | Storage location is populated |
| 24 | Click the "Post" button (primary submit action) in the toolbar | — | SAP begins processing the goods receipt submission |
| 25 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Material Document number |
| 26 | Note the Material Document number from the success message | — | Material Document number is displayed (10-digit numeric, begins with 49 or 50) |
| 27 | Navigate to the search icon and type "Display Batch" | — | Search results appear listing the "Display Batch" application |
| 28 | Click "Display Batch" from the search results | — | The "Display Batch" application opens |
| 29 | In the "Batch" field, enter the batch number created in step 15 | `{TD.batchNumberAutoCalc}` | Batch number is entered |
| 30 | In the "Material" field, enter the material ID | `{TD.materialIdAutoCalc}` | Material ID is entered |
| 31 | Click the "Search" or "Display" button | — | SAP retrieves the batch master record |
| 32 | Verify the batch classification data is displayed | — | Batch master record shows Manufacturing Date `{TD.manufacturingDate}`, Expiration Date (auto-calculated = Mfg Date + shelf-life days), and Vendor Batch `{TD.vendorBatch}` correctly captured |
| 33 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 34 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 35 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Material Document number is generated by SAP and displayed in the confirmation message
- The Goods Receipt is persisted in SAP with the material, batch, quantity, plant, and storage location correctly stored
- A new batch master record is created for batch `{TD.batchNumberAutoCalc}` capturing:
  - Manufacturing Date: `{TD.manufacturingDate}`
  - Expiration Date: Auto-calculated by SAP (Mfg Date + shelf-life period from material master)
  - Vendor Batch: `{TD.vendorBatch}`
- The batch classification data is visible and accurate in the "Display Batch" app
- Expiration date calculation is correct based on the material master shelf-life profile

---

### Post-conditions

- SAP Material Document exists with the generated document number
- Batch master record (MCH1) exists for `{TD.batchNumberAutoCalc}` with auto-calculated expiration date
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
