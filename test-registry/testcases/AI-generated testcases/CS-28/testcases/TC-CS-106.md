# TC-CS-106: Transfer consignment stock with backdated withdrawal posting

**User Story:**          [CS-28] Transfer Consignment Stock Of A High-Value Biologic From Vendor-Owned  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management (MM)  
**Feature:**             Consignment Stock Withdrawal  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       ALTERNATIVE_PATH  
**Priority:**            MEDIUM  
**Severity:**            MAJOR  
**Automation Candidate:**  YES  
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to post goods movements (M_MSEG_BWA for Movement Type 411) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, batch-managed, and consignment-enabled (MARC-KZECH = 'X') |
| P4 | Master Data | Vendor `{TD.vendorCode}` exists, is active, and has consignment agreement for the material |
| P5 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNumber}` and vendor `{TD.vendorCode}` with unrestricted-use status |
| P6 | Master Data | Consignment stock exists: Material `{TD.materialNumber}`, Batch `{TD.batchNumber}`, Vendor `{TD.vendorCode}`, Plant `{TD.plant}`, Storage Location `{TD.storageLocation}`, Special Stock 'K', Quantity ≥ `{TD.withdrawalQuantity}` |
| P7 | Configuration | Movement Type 411 (Consignment Withdrawal) is configured and active |
| P8 | Configuration | Automatic account determination configured for consignment liability (GBB account) and inventory consumption (BSX account) |
| P9 | Configuration | Fiscal period for the backdated posting date is open |
| P10 | Authorization | User has authorization to post backdated goods movements or goods movements in prior fiscal periods |

---

### Test Data

**Dataset Reference:** `testdata/CS-28/CS-28-testdata.json` — Dataset ID: `TD-CS-028-AP-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Consignment-enabled, batch-managed high-value biologic material — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Vendor-owned consignment batch — entered by the user | Valid |
| Vendor Code | `{TD.vendorCode}` | Consignment vendor account — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location within plant — entered by the user | Valid |
| Withdrawal Quantity | `{TD.withdrawalQuantity}` | Quantity to transfer from consignment to owned stock — entered by the user | Valid |
| Movement Type | `{TD.movementType}` | Fixed value 411 for consignment withdrawal — system default | Valid |
| Posting Date (Backdated) | `{TD.postingDateBackdated}` | Posting date in the past (e.g., 7-14 days prior) — entered by the user | Valid |
| Document Date | `{TD.documentDateCurrent}` | Document date (current date) — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Post Goods Movement" | — | Search results appear listing the "Post Goods Movement" application |
| 8 | Click "Post Goods Movement" from the search results | — | Post Goods Movement application opens |
| 9 | In the "Movement Type" field, enter the movement type | `{TD.movementType}` | Movement Type 411 is entered |
| 10 | Press Enter to confirm the Movement Type entry | — | System accepts the movement type; additional fields become active |
| 11 | In the "Posting Date" field, enter the backdated posting date | `{TD.postingDateBackdated}` | Backdated posting date (in the past) is entered |
| 12 | Press Enter to confirm the Posting Date entry | — | Posting date is accepted (assuming user has authorization for backdated postings and the period is open) |
| 13 | In the "Document Date" field, enter the current document date | `{TD.documentDateCurrent}` | Current document date is entered |
| 14 | Press Enter to confirm the Document Date entry | — | Document date is accepted |
| 15 | In the "Material" field, enter the material number | `{TD.materialNumber}` | Material number is entered into the field |
| 16 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is auto-populated |
| 17 | In the "Plant" field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 18 | Press Enter to confirm the Plant entry | — | Plant code is accepted; storage location field becomes active |
| 19 | In the "Storage Location" field, enter the storage location code | `{TD.storageLocation}` | Storage location code is entered |
| 20 | Press Enter to confirm the Storage Location entry | — | Storage location is accepted |
| 21 | In the "Vendor" field (special stock section), enter the vendor code | `{TD.vendorCode}` | Vendor code is entered |
| 22 | Press Enter to confirm the Vendor entry | — | SAP validates the vendor; vendor name `{TD.vendorName}` is auto-populated; special stock indicator 'K' (Consignment) is displayed |
| 23 | In the "Batch" field, enter the batch number | `{TD.batchNumber}` | Batch number is entered |
| 24 | Press Enter to confirm the Batch entry | — | SAP validates the batch; available consignment stock quantity `{TD.availableStock}` is displayed |
| 25 | In the "Quantity" field, enter the withdrawal quantity | `{TD.withdrawalQuantity}` | Withdrawal quantity is entered |
| 26 | Press Enter to confirm the Quantity entry | — | Quantity is accepted; unit of measure `{TD.uom}` is displayed |
| 27 | Verify the Movement Type field shows 411, the Special Stock indicator shows 'K', and the Posting Date reflects the backdated date | `{TD.movementType}`, `{TD.postingDateBackdated}` | Movement Type = 411; Special Stock = K (Consignment); Posting Date = backdated date |
| 28 | Click the "Post" button to submit the goods movement | — | SAP begins processing the consignment withdrawal |
| 29 | Observe the on-screen confirmation response | — | A success message is displayed containing the generated material document number |
| 30 | Note the material document number from the success message | — | Material document number is displayed (format: 50xxxxxxxx) |
| 31 | Navigate to "Display Material Document" app via search | — | Display Material Document app opens |
| 32 | Enter the material document number noted in step 30 | — | Material document is displayed |
| 33 | Verify the material document header shows Movement Type 411, Posting Date (backdated), and Document Date (current) | `{TD.movementType}`, `{TD.postingDateBackdated}`, `{TD.documentDateCurrent}` | Movement Type = 411 (Consignment Withdrawal); Posting Date = backdated date; Document Date = current date |
| 34 | Verify the material document line item shows Material, Batch, Quantity, Plant, Storage Location | `{TD.materialNumber}`, `{TD.batchNumber}`, `{TD.withdrawalQuantity}`, `{TD.plant}`, `{TD.storageLocation}` | All fields match entered values |
| 35 | Verify the "From" side shows Special Stock 'K' and Vendor code | `{TD.vendorCode}` | From: Special Stock K, Vendor = vendor code |
| 36 | Verify the "To" side shows unrestricted stock (no special stock indicator) | — | To: Unrestricted stock (no special stock indicator) |
| 37 | Navigate to "Display Accounting Document" app via search | — | Display Accounting Document app opens |
| 38 | Enter the material document number to retrieve the accounting document | — | Accounting document linked to the material document is displayed |
| 39 | Verify the accounting document contains a debit entry to Inventory Consumption account (BSX) with the backdated posting date | `{TD.withdrawalQuantity}` × `{TD.price}`, `{TD.postingDateBackdated}` | Debit posting to BSX account with calculated value and backdated posting date |
| 40 | Verify the accounting document contains a credit entry to Vendor Liability account (GBB) with the backdated posting date | `{TD.vendorCode}`, `{TD.withdrawalQuantity}` × `{TD.price}`, `{TD.postingDateBackdated}` | Credit posting to GBB account for vendor with calculated value and backdated posting date |
| 41 | Verify the accounting document is balanced (debit = credit) | — | Total debit amount = Total credit amount |
| 42 | Navigate to "Display Batch" app via search | — | Display Batch app opens |
| 43 | Enter the material number and batch number | `{TD.materialNumber}`, `{TD.batchNumber}` | Batch details are displayed |
| 44 | Navigate to the "Document Flow" or "Where-Used List" tab | — | Document flow or where-used list is displayed |
| 45 | Verify the material document number is present in the batch history with the backdated posting date | — | Material document number appears in batch document flow with backdated posting date |
| 46 | Navigate to "Display Stock Overview" app via search | — | Display Stock Overview app opens |
| 47 | Filter by Material, Plant, Storage Location, Special Stock K, Vendor | `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.vendorCode}` | Consignment stock is displayed |
| 48 | Verify the consignment stock balance has been reduced by the withdrawal quantity | — | Consignment stock balance = Original - `{TD.withdrawalQuantity}` |
| 49 | Filter by Material, Plant, Storage Location, Unrestricted Stock (no special stock) | `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}` | Unrestricted stock is displayed |
| 50 | Verify the unrestricted stock balance has been increased by the withdrawal quantity | — | Unrestricted stock balance = Original + `{TD.withdrawalQuantity}` |
| 51 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 52 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 53 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Material Document number is generated by SAP and displayed in the confirmation message
- The material document shows Movement Type 411 (Consignment Withdrawal) with a backdated posting date and current document date
- The material document clearly shows ownership transfer: From = Special Stock K (Vendor-owned), To = Unrestricted Stock (Company-owned)
- An Accounting Document is automatically generated with balanced postings: Debit to Inventory (BSX), Credit to Vendor Liability (GBB), with the backdated posting date
- The batch document flow includes the material document number with the backdated posting date, maintaining traceability
- Consignment stock balance is reduced by the withdrawal quantity
- Unrestricted stock balance is increased by the withdrawal quantity
- Financial liability to the vendor is correctly posted with the backdated period assignment
- The settlement document generated for the period will include this withdrawal based on the backdated posting date

---

### Post-conditions

- SAP Material Document exists with the generated document number
- Material document type is 411 (Consignment Withdrawal) with backdated posting date
- Ownership transfer is complete: consignment stock reduced, unrestricted stock increased
- Accounting document generated with correct debit (BSX) and credit (GBB) postings with backdated posting date
- Batch traceability maintained: material document linked to batch history with backdated posting date
- Vendor liability account reflects the withdrawal value in the correct fiscal period (backdated)
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
