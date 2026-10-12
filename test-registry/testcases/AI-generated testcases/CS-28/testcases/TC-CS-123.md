# TC-CS-123: Transfer consignment stock with invoice verification and price variance

**User Story:**          [CS-28] Transfer Consignment Stock Of A High-Value Biologic From Vendor-Owned  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management (MM) - Integration with Financial Accounting (FI)  
**Feature:**             Consignment Stock Withdrawal  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       INTEGRATION  
**Priority:**            HIGH  
**Severity:**            MAJOR  
**Automation Candidate:**  YES  
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to post goods movements (M_MSEG_BWA for Movement Type 411) and Accounts Payable Clerk with authorization to post invoices (MIRO) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, batch-managed, and consignment-enabled (MARC-KZECH = 'X') |
| P4 | Master Data | Vendor `{TD.vendorCode}` exists, is active, and has consignment agreement for the material |
| P5 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNumber}` and vendor `{TD.vendorCode}` with unrestricted-use status |
| P6 | Master Data | Consignment stock exists: Material `{TD.materialNumber}`, Batch `{TD.batchNumber}`, Vendor `{TD.vendorCode}`, Plant `{TD.plant}`, Storage Location `{TD.storageLocation}`, Special Stock 'K', Quantity ≥ `{TD.withdrawalQuantity}` |
| P7 | Configuration | Movement Type 411 (Consignment Withdrawal) is configured and active |
| P8 | Configuration | Consignment settlement is configured and can generate settlement documents |
| P9 | Configuration | Automatic account determination configured for consignment liability (GBB account), inventory consumption (BSX account), and price variance accounts |
| P10 | Configuration | Invoice verification is enabled for consignment settlements |
| P11 | Configuration | Price variance tolerance limits are configured (or invoice posting with variance is allowed) |

---

### Test Data

**Dataset Reference:** `testdata/CS-28/CS-28-testdata.json` — Dataset ID: `TD-CS-028-INT-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Consignment-enabled, batch-managed high-value biologic material — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Vendor-owned consignment batch — entered by the user | Valid |
| Vendor Code | `{TD.vendorCode}` | Consignment vendor account — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location within plant — entered by the user | Valid |
| Withdrawal Quantity | `{TD.withdrawalQuantity}` | Quantity to transfer from consignment to owned stock — entered by the user | Valid |
| Movement Type | `{TD.movementType}` | Fixed value 411 for consignment withdrawal — system default | Valid |
| Price (Expected) | `{TD.priceExpected}` | Expected price per unit from purchasing info record or material master | Valid |
| Price (Invoice) | `{TD.priceInvoice}` | Actual invoice price per unit (different from expected price) — entered in invoice verification | Valid |
| Price Variance Amount | `{TD.priceVarianceAmount}` | Calculated price variance: (`{TD.priceInvoice}` - `{TD.priceExpected}`) × `{TD.withdrawalQuantity}` | Valid |
| Settlement Document Number | `{TD.settlementDocumentNumber}` | Settlement document generated for the consignment withdrawal — system generates | Valid |
| Invoice Document Number | `{TD.invoiceDocumentNumber}` | Invoice document created referencing the settlement document — system generates | Valid |

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
| 9 | Post consignment withdrawal: Enter Movement Type 411, Material, Plant, Storage Location, Vendor, Batch, Quantity | `{TD.movementType}`, `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.vendorCode}`, `{TD.batchNumber}`, `{TD.withdrawalQuantity}` | All fields are entered and validated; expected price = `{TD.priceExpected}` |
| 10 | Click "Post" to submit the goods movement | — | SAP processes the consignment withdrawal |
| 11 | Observe the confirmation message and note the material document number | — | Material document number is displayed (format: 50xxxxxxxx) |
| 12 | Navigate to "Display Accounting Document" app and verify accounting document shows value based on expected price | `{TD.withdrawalQuantity}` × `{TD.priceExpected}` | Accounting document shows debit/credit postings with expected price value |
| 13 | Navigate to "Consignment Settlement" app via search | — | Consignment Settlement app opens |
| 14 | Enter the vendor code for settlement | `{TD.vendorCode}` | Vendor code is entered |
| 15 | Press Enter to confirm the Vendor entry | — | Vendor code is accepted |
| 16 | Define the settlement period covering the consignment withdrawal | — | Settlement period dates are entered |
| 17 | Execute the settlement run for the vendor | — | Settlement document generation is initiated |
| 18 | Observe the settlement document generation result | — | Settlement document is generated successfully |
| 19 | Note the settlement document number | — | Settlement document number is displayed |
| 20 | Verify the settlement document includes the material document created earlier in this test | — | Material document number from step 11 appears in the settlement document line items |
| 21 | Verify the settlement document line item shows Material, Batch, Quantity, Price (expected), and Value | `{TD.materialNumber}`, `{TD.batchNumber}`, `{TD.withdrawalQuantity}`, `{TD.priceExpected}` | Settlement line item matches material document values with expected price |
| 22 | Verify the settlement document total value equals the withdrawal value (Quantity × Expected Price) | — | Settlement total value = `{TD.withdrawalQuantity}` × `{TD.priceExpected}` |
| 23 | Navigate to "Enter Invoice" or "Invoice Verification" (MIRO) app via search | — | Enter Invoice app opens |
| 24 | Enter the vendor code | `{TD.vendorCode}` | Vendor code is entered |
| 25 | Press Enter to confirm the Vendor entry | — | Vendor code is accepted |
| 26 | Select "Invoice" as the document type | — | Invoice document type is selected |
| 27 | Enter the invoice date and posting date | — | Invoice date and posting date are entered |
| 28 | Reference the settlement document number in the invoice | `{TD.settlementDocumentNumber}` | Settlement document number is entered as reference |
| 29 | Press Enter to retrieve the settlement document line items | — | Settlement document line items are loaded into the invoice |
| 30 | Verify the invoice line item shows Material, Batch, Quantity, Price (expected from settlement) | `{TD.materialNumber}`, `{TD.batchNumber}`, `{TD.withdrawalQuantity}`, `{TD.priceExpected}` | Invoice line item matches settlement document values |
| 31 | Modify the invoice price to introduce a price variance | `{TD.priceInvoice}` | Invoice price is changed to a different value (higher or lower than expected price) |
| 32 | Verify the system calculates the price variance | `{TD.priceVarianceAmount}` | Price variance amount = (`{TD.priceInvoice}` - `{TD.priceExpected}`) × `{TD.withdrawalQuantity}` |
| 33 | Observe any warning messages regarding price variance | — | System may display a warning or information message about price variance exceeding tolerance (depending on configuration) |
| 34 | Save and post the invoice (or simulate the invoice if posting is blocked due to variance) | — | Invoice is posted (or parked/blocked for payment if variance exceeds tolerance) |
| 35 | Note the invoice document number | — | Invoice document number is displayed |
| 36 | Navigate to "Display Invoice Document" or "Display Accounting Document" app via search | — | Display Invoice Document app opens |
| 37 | Enter the invoice document number to retrieve the invoice accounting document | `{TD.invoiceDocumentNumber}` | Invoice accounting document is displayed |
| 38 | Verify the invoice accounting document contains a debit entry to Vendor Payable account | `{TD.vendorCode}`, `{TD.withdrawalQuantity}` × `{TD.priceInvoice}` | Debit posting to vendor payable account with invoice price value |
| 39 | Verify the invoice accounting document contains a credit entry to GR/IR Clearing account (WRX) | `{TD.withdrawalQuantity}` × `{TD.priceExpected}` | Credit posting to GR/IR clearing account with expected price value (from settlement) |
| 40 | Verify the invoice accounting document contains a debit or credit entry to Price Variance account | `{TD.priceVarianceAmount}` | Debit (if invoice price > expected) or Credit (if invoice price < expected) posting to price variance account |
| 41 | Verify the invoice accounting document is balanced (total debit = total credit) | — | Total debit amount = Total credit amount |
| 42 | Navigate to "Display Settlement Document" app via search | — | Display Settlement Document app opens |
| 43 | Enter the settlement document number noted in step 19 | `{TD.settlementDocumentNumber}` | Settlement document is displayed |
| 44 | Verify the settlement document status reflects the invoice posting (e.g., "Invoiced" or "Completed") | — | Settlement document status = "Invoiced" or "Completed" |
| 45 | Navigate to "Display Vendor Account" or "Vendor Line Items" app via search | — | Display Vendor Account app opens |
| 46 | Enter the vendor code | `{TD.vendorCode}` | Vendor account line items are displayed |
| 47 | Verify the vendor account shows the consignment liability posting (credit from Movement Type 411) | `{TD.withdrawalQuantity}` × `{TD.priceExpected}` | Vendor account shows credit entry from consignment withdrawal |
| 48 | Verify the vendor account shows the invoice posting (debit from invoice verification) | `{TD.withdrawalQuantity}` × `{TD.priceInvoice}` | Vendor account shows debit entry from invoice |
| 49 | Verify the net vendor balance reflects the price variance | `{TD.priceVarianceAmount}` | Net vendor balance = Credit (consignment liability) - Debit (invoice) = Price variance amount (if any uncleared balance remains) |
| 50 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 51 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 52 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Material Document number is generated by SAP for the consignment withdrawal (Movement Type 411)
- An Accounting Document is generated with balanced postings: Debit to Inventory (BSX), Credit to Vendor Liability (GBB), using expected price
- A Settlement Document is generated including the consignment withdrawal line item with expected price
- An Invoice Document is created referencing the settlement document with a different invoice price (price variance scenario)
- The invoice accounting document includes:
  - Debit to Vendor Payable account (invoice price)
  - Credit to GR/IR Clearing account (expected price from settlement)
  - Debit or Credit to Price Variance account (difference between invoice and expected price)
- The invoice accounting document is balanced (total debit = total credit)
- Vendor account reflects both consignment liability (expected price) and invoice payable (invoice price)
- Price variance is correctly posted and tracked in the price variance account
- The integration between MM (consignment), FI (accounting), and Logistics Invoice Verification (MIRO) functions correctly, handling price variances appropriately

---

### Post-conditions

- SAP Material Document exists with the generated document number
- Material document type is 411 (Consignment Withdrawal)
- Settlement document exists and includes the consignment withdrawal line item
- Invoice document exists referencing the settlement document with price variance
- Invoice accounting document generated with correct postings including price variance
- Vendor account reflects both consignment liability and invoice payable
- Price variance posted to designated price variance account
- Settlement document status = "Invoiced" or "Completed"
- No application-level errors or critical warnings remain outstanding (unless price variance exceeds tolerance and invoice is blocked, which is expected behavior)

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
