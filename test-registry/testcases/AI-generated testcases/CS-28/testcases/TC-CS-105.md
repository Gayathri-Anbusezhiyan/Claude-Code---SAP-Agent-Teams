# TC-CS-105: Transfer consignment stock with cross-month settlement period

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
| P9 | Configuration | Consignment settlement period configured to span across calendar months |
| P10 | Authorization | User has authorization to post backdated goods movements or goods movements across fiscal periods |

---

### Test Data

**Dataset Reference:** `testdata/CS-28/CS-28-testdata.json` — Dataset ID: `TD-CS-028-AP-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Consignment-enabled, batch-managed high-value biologic material — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Vendor-owned consignment batch — entered by the user | Valid |
| Vendor Code | `{TD.vendorCode}` | Consignment vendor account — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location within plant — entered by the user | Valid |
| Withdrawal Quantity | `{TD.withdrawalQuantity}` | Quantity to transfer from consignment to owned stock — entered by the user | Valid |
| Movement Type | `{TD.movementType}` | Fixed value 411 for consignment withdrawal — system default | Valid |
| Posting Date | `{TD.postingDateCrossMonth}` | Posting date in a different month than the current date — entered by the user | Valid |
| Settlement Period Start | `{TD.settlementPeriodStartCrossMonth}` | Start date of settlement period spanning multiple months | Valid |
| Settlement Period End | `{TD.settlementPeriodEndCrossMonth}` | End date of settlement period spanning multiple months | Valid |

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
| 11 | In the "Posting Date" field, enter the posting date for cross-month settlement | `{TD.postingDateCrossMonth}` | Posting date in the previous or future month is entered |
| 12 | Press Enter to confirm the Posting Date entry | — | Posting date is accepted (assuming user has authorization for period-spanning postings) |
| 13 | In the "Material" field, enter the material number | `{TD.materialNumber}` | Material number is entered into the field |
| 14 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is auto-populated |
| 15 | In the "Plant" field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 16 | Press Enter to confirm the Plant entry | — | Plant code is accepted; storage location field becomes active |
| 17 | In the "Storage Location" field, enter the storage location code | `{TD.storageLocation}` | Storage location code is entered |
| 18 | Press Enter to confirm the Storage Location entry | — | Storage location is accepted |
| 19 | In the "Vendor" field (special stock section), enter the vendor code | `{TD.vendorCode}` | Vendor code is entered |
| 20 | Press Enter to confirm the Vendor entry | — | SAP validates the vendor; vendor name `{TD.vendorName}` is auto-populated; special stock indicator 'K' (Consignment) is displayed |
| 21 | In the "Batch" field, enter the batch number | `{TD.batchNumber}` | Batch number is entered |
| 22 | Press Enter to confirm the Batch entry | — | SAP validates the batch; available consignment stock quantity `{TD.availableStock}` is displayed |
| 23 | In the "Quantity" field, enter the withdrawal quantity | `{TD.withdrawalQuantity}` | Withdrawal quantity is entered |
| 24 | Press Enter to confirm the Quantity entry | — | Quantity is accepted; unit of measure `{TD.uom}` is displayed |
| 25 | Verify the Movement Type field shows 411, the Special Stock indicator shows 'K', and the Posting Date reflects the cross-month date | `{TD.movementType}`, `{TD.postingDateCrossMonth}` | Movement Type = 411; Special Stock = K (Consignment); Posting Date = cross-month date |
| 26 | Click the "Post" button to submit the goods movement | — | SAP begins processing the consignment withdrawal |
| 27 | Observe the on-screen confirmation response | — | A success message is displayed containing the generated material document number |
| 28 | Note the material document number from the success message | — | Material document number is displayed (format: 50xxxxxxxx) |
| 29 | Navigate to "Display Material Document" app via search | — | Display Material Document app opens |
| 30 | Enter the material document number noted in step 28 | — | Material document is displayed |
| 31 | Verify the material document header shows Movement Type 411 and Posting Date matching the cross-month date | `{TD.movementType}`, `{TD.postingDateCrossMonth}` | Movement Type = 411 (Consignment Withdrawal); Posting Date = cross-month date |
| 32 | Verify the material document line item shows Material, Batch, Quantity, Plant, Storage Location | `{TD.materialNumber}`, `{TD.batchNumber}`, `{TD.withdrawalQuantity}`, `{TD.plant}`, `{TD.storageLocation}` | All fields match entered values |
| 33 | Verify the "From" side shows Special Stock 'K' and Vendor code | `{TD.vendorCode}` | From: Special Stock K, Vendor = vendor code |
| 34 | Verify the "To" side shows unrestricted stock (no special stock indicator) | — | To: Unrestricted stock (no special stock indicator) |
| 35 | Navigate to "Display Accounting Document" app via search | — | Display Accounting Document app opens |
| 36 | Enter the material document number to retrieve the accounting document | — | Accounting document linked to the material document is displayed |
| 37 | Verify the accounting document contains a debit entry to Inventory Consumption account (BSX) with the cross-month posting date | `{TD.withdrawalQuantity}` × `{TD.price}`, `{TD.postingDateCrossMonth}` | Debit posting to BSX account with calculated value and cross-month posting date |
| 38 | Verify the accounting document contains a credit entry to Vendor Liability account (GBB) with the cross-month posting date | `{TD.vendorCode}`, `{TD.withdrawalQuantity}` × `{TD.price}`, `{TD.postingDateCrossMonth}` | Credit posting to GBB account for vendor with calculated value and cross-month posting date |
| 39 | Verify the accounting document is balanced (debit = credit) | — | Total debit amount = Total credit amount |
| 40 | Navigate to "Consignment Settlement" app or transaction via search | — | Consignment Settlement app opens |
| 41 | Define the settlement period from start date to end date spanning multiple months | `{TD.settlementPeriodStartCrossMonth}`, `{TD.settlementPeriodEndCrossMonth}` | Settlement period dates are entered spanning multiple months |
| 42 | Execute the settlement run for the vendor | `{TD.vendorCode}` | Settlement document is generated |
| 43 | Verify the settlement document includes the material document created in this test | — | Material document number from step 28 appears in the settlement document line items |
| 44 | Verify the settlement document shows the correct posting date, material, batch, quantity, and price | `{TD.postingDateCrossMonth}`, `{TD.materialNumber}`, `{TD.batchNumber}`, `{TD.withdrawalQuantity}`, `{TD.price}` | Settlement line item matches material document values |
| 45 | Verify the total settlement value includes this cross-month withdrawal | — | Total settlement value = sum of all withdrawals in the period including this cross-month transaction |
| 46 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 47 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 48 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Material Document number is generated by SAP and displayed in the confirmation message
- The material document shows Movement Type 411 (Consignment Withdrawal) with a posting date in a different month than the current date
- The material document clearly shows ownership transfer: From = Special Stock K (Vendor-owned), To = Unrestricted Stock (Company-owned)
- An Accounting Document is automatically generated with balanced postings: Debit to Inventory (BSX), Credit to Vendor Liability (GBB), with the cross-month posting date
- The consignment settlement document generated for the cross-month period includes this withdrawal line item
- The settlement document correctly aggregates withdrawals across multiple calendar months
- Batch traceability is maintained through the material document
- Financial liability to the vendor is correctly posted with the correct period assignment

---

### Post-conditions

- SAP Material Document exists with the generated document number
- Material document type is 411 (Consignment Withdrawal) with cross-month posting date
- Ownership transfer is complete: consignment stock reduced, unrestricted stock increased
- Accounting document generated with correct debit (BSX) and credit (GBB) postings with cross-month posting date
- Settlement document includes the cross-month withdrawal line item
- Batch traceability maintained: material document linked to batch history
- Vendor liability account reflects the withdrawal value in the correct fiscal period
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
