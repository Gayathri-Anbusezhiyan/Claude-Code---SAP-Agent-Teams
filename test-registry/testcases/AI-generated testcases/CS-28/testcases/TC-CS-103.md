# TC-CS-103: Transfer consignment stock with full withdrawal of exact available stock quantity

**User Story:**          [CS-28] Transfer Consignment Stock Of A High-Value Biologic From Vendor-Owned  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management (MM)  
**Feature:**             Consignment Stock Withdrawal  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       ALTERNATIVE_PATH  
**Priority:**            HIGH  
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
| P6 | Master Data | Consignment stock exists: Material `{TD.materialNumber}`, Batch `{TD.batchNumber}`, Vendor `{TD.vendorCode}`, Plant `{TD.plant}`, Storage Location `{TD.storageLocation}`, Special Stock 'K', Quantity = `{TD.availableStock}` (exact amount available) |
| P7 | Configuration | Movement Type 411 (Consignment Withdrawal) is configured and active |
| P8 | Configuration | Automatic account determination configured for consignment liability (GBB account) and inventory consumption (BSX account) |

---

### Test Data

**Dataset Reference:** `testdata/CS-28/CS-28-testdata.json` — Dataset ID: `TD-CS-028-AP-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Consignment-enabled, batch-managed high-value biologic material — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Vendor-owned consignment batch — entered by the user | Valid |
| Vendor Code | `{TD.vendorCode}` | Consignment vendor account — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location within plant — entered by the user | Valid |
| Available Stock | `{TD.availableStock}` | Total available consignment stock quantity for the batch — displayed by SAP | Valid |
| Withdrawal Quantity | `{TD.withdrawalQuantityFull}` | Full withdrawal quantity (exact amount = available stock) — entered by the user | Valid |
| Movement Type | `{TD.movementType}` | Fixed value 411 for consignment withdrawal — system default | Valid |

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
| 11 | In the "Material" field, enter the material number | `{TD.materialNumber}` | Material number is entered into the field |
| 12 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is auto-populated |
| 13 | In the "Plant" field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 14 | Press Enter to confirm the Plant entry | — | Plant code is accepted; storage location field becomes active |
| 15 | In the "Storage Location" field, enter the storage location code | `{TD.storageLocation}` | Storage location code is entered |
| 16 | Press Enter to confirm the Storage Location entry | — | Storage location is accepted |
| 17 | In the "Vendor" field (special stock section), enter the vendor code | `{TD.vendorCode}` | Vendor code is entered |
| 18 | Press Enter to confirm the Vendor entry | — | SAP validates the vendor; vendor name `{TD.vendorName}` is auto-populated; special stock indicator 'K' (Consignment) is displayed |
| 19 | In the "Batch" field, enter the batch number | `{TD.batchNumber}` | Batch number is entered |
| 20 | Press Enter to confirm the Batch entry | — | SAP validates the batch; available consignment stock quantity `{TD.availableStock}` is displayed |
| 21 | In the "Quantity" field, enter the full withdrawal quantity (equal to available stock) | `{TD.withdrawalQuantityFull}` | Full withdrawal quantity (equal to available stock) is entered |
| 22 | Press Enter to confirm the Quantity entry | — | Quantity is accepted; unit of measure `{TD.uom}` is displayed |
| 23 | Verify the Movement Type field shows 411 and the Special Stock indicator shows 'K' | `{TD.movementType}` | Movement Type = 411; Special Stock = K (Consignment) |
| 24 | Click the "Post" button to submit the goods movement | — | SAP begins processing the consignment withdrawal |
| 25 | Observe the on-screen confirmation response | — | A success message is displayed containing the generated material document number |
| 26 | Note the material document number from the success message | — | Material document number is displayed (format: 50xxxxxxxx) |
| 27 | Navigate to "Display Material Document" app via search | — | Display Material Document app opens |
| 28 | Enter the material document number noted in step 26 | — | Material document is displayed |
| 29 | Verify the material document header shows Movement Type 411 | `{TD.movementType}` | Movement Type = 411 (Consignment Withdrawal) |
| 30 | Verify the material document line item shows Material, Batch, Quantity (full amount), Plant, Storage Location | `{TD.materialNumber}`, `{TD.batchNumber}`, `{TD.withdrawalQuantityFull}`, `{TD.plant}`, `{TD.storageLocation}` | All fields match entered values; quantity = full available stock |
| 31 | Verify the "From" side shows Special Stock 'K' and Vendor code | `{TD.vendorCode}` | From: Special Stock K, Vendor = vendor code |
| 32 | Verify the "To" side shows unrestricted stock (no special stock indicator) | — | To: Unrestricted stock (no special stock indicator) |
| 33 | Navigate to "Display Accounting Document" app via search | — | Display Accounting Document app opens |
| 34 | Enter the material document number to retrieve the accounting document | — | Accounting document linked to the material document is displayed |
| 35 | Verify the accounting document contains a debit entry to Inventory Consumption account (BSX) | `{TD.withdrawalQuantityFull}` × `{TD.price}` | Debit posting to BSX account with calculated value |
| 36 | Verify the accounting document contains a credit entry to Vendor Liability account (GBB) | `{TD.vendorCode}`, `{TD.withdrawalQuantityFull}` × `{TD.price}` | Credit posting to GBB account for vendor with calculated value |
| 37 | Verify the accounting document is balanced (debit = credit) | — | Total debit amount = Total credit amount |
| 38 | Navigate to "Display Stock Overview" app via search | — | Display Stock Overview app opens |
| 39 | Filter by Material, Plant, Storage Location, Special Stock K, Vendor | `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.vendorCode}` | Consignment stock query is executed |
| 40 | Verify the consignment stock balance is now zero (full withdrawal completed) | — | Consignment stock balance = 0 (or no records found for Special Stock K) |
| 41 | Filter by Material, Plant, Storage Location, Unrestricted Stock (no special stock) | `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}` | Unrestricted stock is displayed |
| 42 | Verify the unrestricted stock balance has been increased by the full withdrawal quantity | — | Unrestricted stock balance = Original + `{TD.withdrawalQuantityFull}` |
| 43 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 44 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 45 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Material Document number is generated by SAP and displayed in the confirmation message
- The material document shows Movement Type 411 (Consignment Withdrawal) with full withdrawal quantity equal to the available consignment stock
- The material document clearly shows ownership transfer: From = Special Stock K (Vendor-owned), To = Unrestricted Stock (Company-owned)
- An Accounting Document is automatically generated with balanced postings: Debit to Inventory (BSX), Credit to Vendor Liability (GBB) for the full withdrawal amount
- Consignment stock balance for the batch is reduced to zero (full depletion)
- Unrestricted stock balance (company-owned) is increased by the full withdrawal quantity
- Financial liability to the vendor is correctly posted for the full withdrawal value
- Batch traceability is maintained through the material document

---

### Post-conditions

- SAP Material Document exists with the generated document number
- Material document type is 411 (Consignment Withdrawal)
- Ownership transfer is complete: consignment stock balance = 0, unrestricted stock increased by full amount
- Accounting document generated with correct debit (BSX) and credit (GBB) postings for the full value
- Batch traceability maintained: material document linked to batch history
- Vendor liability account reflects the full withdrawal value
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
