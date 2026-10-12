# TC-CS-118: Transfer consignment stock with price change during settlement period

**User Story:**          [CS-28] Transfer Consignment Stock Of A High-Value Biologic From Vendor-Owned  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management (MM)  
**Feature:**             Consignment Stock Withdrawal  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       EDGE_CASE  
**Priority:**            HIGH  
**Severity:**            MAJOR  
**Automation Candidate:**  YES  
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to post goods movements (M_MSEG_BWA for Movement Type 411) and to execute consignment settlement (MRKO) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, batch-managed, and consignment-enabled (MARC-KZECH = 'X') |
| P4 | Master Data | Vendor `{TD.vendorCode}` exists, is active, and has consignment agreement for the material |
| P5 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNumber}` and vendor `{TD.vendorCode}` with unrestricted-use status |
| P6 | Master Data | Consignment stock exists: Material `{TD.materialNumber}`, Batch `{TD.batchNumber}`, Vendor `{TD.vendorCode}`, Plant `{TD.plant}`, Storage Location `{TD.storageLocation}`, Special Stock 'K', Quantity sufficient for two withdrawals |
| P7 | Configuration | Movement Type 411 (Consignment Withdrawal) is configured and active |
| P8 | Configuration | Material price can be changed via purchasing info record or material master |
| P9 | Configuration | Automatic account determination configured for consignment liability (GBB account) and inventory consumption (BSX account) |

---

### Test Data

**Dataset Reference:** `testdata/CS-28/CS-28-testdata.json` — Dataset ID: `TD-CS-028-EDGE-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Consignment-enabled, batch-managed high-value biologic material — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Vendor-owned consignment batch — entered by the user | Valid |
| Vendor Code | `{TD.vendorCode}` | Consignment vendor account — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location within plant — entered by the user | Valid |
| Withdrawal Quantity (First) | `{TD.withdrawalQuantityFirst}` | First withdrawal quantity — entered by the user | Valid |
| Withdrawal Quantity (Second) | `{TD.withdrawalQuantitySecond}` | Second withdrawal quantity — entered by the user | Valid |
| Price (Original) | `{TD.priceOriginal}` | Original material price — system retrieves from purchasing info record | Valid |
| Price (Updated) | `{TD.priceUpdated}` | Updated material price after first withdrawal — system retrieves from purchasing info record | Valid |
| Movement Type | `{TD.movementType}` | Fixed value 411 for consignment withdrawal — system default | Valid |
| Settlement Period Start | `{TD.settlementPeriodStart}` | Start date of settlement period covering both withdrawals | Valid |
| Settlement Period End | `{TD.settlementPeriodEnd}` | End date of settlement period covering both withdrawals | Valid |

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
| 9 | Post first consignment withdrawal with original price: Enter Movement Type 411, Material, Plant, Storage Location, Vendor, Batch, Quantity | `{TD.movementType}`, `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.vendorCode}`, `{TD.batchNumber}`, `{TD.withdrawalQuantityFirst}` | All fields are entered and validated; price = `{TD.priceOriginal}` |
| 10 | Click "Post" to submit the first goods movement | — | SAP processes the consignment withdrawal |
| 11 | Observe the confirmation message and note the first material document number | — | First material document number is displayed (format: 50xxxxxxxx) |
| 12 | Navigate to "Display Accounting Document" app and verify first accounting document shows value based on original price | `{TD.withdrawalQuantityFirst}` × `{TD.priceOriginal}` | Accounting document shows debit/credit postings with original price value |
| 13 | Navigate to material master or purchasing info record maintenance app | — | Material master or info record maintenance app opens |
| 14 | Update the material price for the vendor-material combination to a new price | `{TD.priceUpdated}` | Material price is updated from `{TD.priceOriginal}` to `{TD.priceUpdated}` |
| 15 | Save the price change | — | Price change is saved successfully |
| 16 | Navigate back to "Post Goods Movement" app | — | Post Goods Movement application opens |
| 17 | Post second consignment withdrawal with updated price: Enter Movement Type 411, Material, Plant, Storage Location, Vendor, Batch, Quantity | `{TD.movementType}`, `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.vendorCode}`, `{TD.batchNumber}`, `{TD.withdrawalQuantitySecond}` | All fields are entered and validated; price = `{TD.priceUpdated}` |
| 18 | Click "Post" to submit the second goods movement | — | SAP processes the consignment withdrawal |
| 19 | Observe the confirmation message and note the second material document number | — | Second material document number is displayed (format: 50xxxxxxxx) |
| 20 | Navigate to "Display Accounting Document" app and verify second accounting document shows value based on updated price | `{TD.withdrawalQuantitySecond}` × `{TD.priceUpdated}` | Accounting document shows debit/credit postings with updated price value |
| 21 | Navigate to "Consignment Settlement" app via search | — | Consignment Settlement app opens |
| 22 | Enter the vendor code for settlement | `{TD.vendorCode}` | Vendor code is entered |
| 23 | Press Enter to confirm the Vendor entry | — | Vendor code is accepted |
| 24 | Define the settlement period covering both withdrawals | `{TD.settlementPeriodStart}`, `{TD.settlementPeriodEnd}` | Settlement period dates are entered |
| 25 | Execute the settlement run for the vendor | — | Settlement document generation is initiated |
| 26 | Observe the settlement document generation result | — | Settlement document is generated successfully |
| 27 | Note the settlement document number | — | Settlement document number is displayed |
| 28 | Verify the settlement document includes two line items (one for each withdrawal) | — | Two line items are displayed in settlement document |
| 29 | Verify first line item shows Material, Batch, Quantity, Price (original), and Value | `{TD.materialNumber}`, `{TD.batchNumber}`, `{TD.withdrawalQuantityFirst}`, `{TD.priceOriginal}` | First line item matches first withdrawal with original price |
| 30 | Verify second line item shows Material, Batch, Quantity, Price (updated), and Value | `{TD.materialNumber}`, `{TD.batchNumber}`, `{TD.withdrawalQuantitySecond}`, `{TD.priceUpdated}` | Second line item matches second withdrawal with updated price |
| 31 | Verify the settlement document total value equals the sum of both withdrawal values | — | Settlement total value = (`{TD.withdrawalQuantityFirst}` × `{TD.priceOriginal}`) + (`{TD.withdrawalQuantitySecond}` × `{TD.priceUpdated}`) |
| 32 | Verify each line item price matches the price at the time of the respective withdrawal | — | First line item price = `{TD.priceOriginal}`; Second line item price = `{TD.priceUpdated}` |
| 33 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 34 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 35 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Two Material Documents are generated (one for each withdrawal at different prices)
- First material document shows withdrawal value based on original price
- Second material document shows withdrawal value based on updated price
- Two separate Accounting Documents are generated with correct valuations at the time of each withdrawal
- Settlement Document includes both withdrawals as separate line items
- Settlement line items correctly reflect the price valid at the time of each withdrawal
- Settlement document total value is the sum of both withdrawal values
- Price change is correctly reflected in financial postings without causing settlement discrepancies
- Invoice verification (if triggered) uses the settlement document values which aggregate different prices correctly

---

### Post-conditions

- Two SAP Material Documents exist with different valuations
- Two accounting documents generated with correct debit (BSX) and credit (GBB) postings at respective prices
- Settlement document generated with two line items showing different prices
- Vendor liability account reflects the total combined withdrawal value
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
