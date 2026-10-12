# TC-CS-116: Transfer consignment stock with same-day settlement

**User Story:**          [CS-28] Transfer Consignment Stock Of A High-Value Biologic From Vendor-Owned  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management (MM)  
**Feature:**             Consignment Stock Withdrawal  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       EDGE_CASE  
**Priority:**            MEDIUM  
**Severity:**            MINOR  
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
| P6 | Master Data | Consignment stock exists: Material `{TD.materialNumber}`, Batch `{TD.batchNumber}`, Vendor `{TD.vendorCode}`, Plant `{TD.plant}`, Storage Location `{TD.storageLocation}`, Special Stock 'K', Quantity ≥ `{TD.withdrawalQuantity}` |
| P7 | Configuration | Movement Type 411 (Consignment Withdrawal) is configured and active |
| P8 | Configuration | Consignment settlement is configured and can be executed on the same day as withdrawal |
| P9 | Configuration | Automatic account determination configured for consignment liability (GBB account) and inventory consumption (BSX account) |

---

### Test Data

**Dataset Reference:** `testdata/CS-28/CS-28-testdata.json` — Dataset ID: `TD-CS-028-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Consignment-enabled, batch-managed high-value biologic material — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Vendor-owned consignment batch — entered by the user | Valid |
| Vendor Code | `{TD.vendorCode}` | Consignment vendor account — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location within plant — entered by the user | Valid |
| Withdrawal Quantity | `{TD.withdrawalQuantity}` | Quantity to transfer from consignment to owned stock — entered by the user | Valid |
| Movement Type | `{TD.movementType}` | Fixed value 411 for consignment withdrawal — system default | Valid |
| Settlement Period (Same Day) | `{TD.settlementDateSameDay}` | Settlement period start and end date = current date (same day as withdrawal) | Valid |

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
| 21 | In the "Quantity" field, enter the withdrawal quantity | `{TD.withdrawalQuantity}` | Withdrawal quantity is entered |
| 22 | Press Enter to confirm the Quantity entry | — | Quantity is accepted; unit of measure `{TD.uom}` is displayed |
| 23 | Verify the Movement Type field shows 411 and the Special Stock indicator shows 'K' | `{TD.movementType}` | Movement Type = 411; Special Stock = K (Consignment) |
| 24 | Click the "Post" button to submit the goods movement | — | SAP begins processing the consignment withdrawal |
| 25 | Observe the on-screen confirmation response | — | A success message is displayed containing the generated material document number |
| 26 | Note the material document number from the success message | — | Material document number is displayed (format: 50xxxxxxxx) |
| 27 | Navigate to "Consignment Settlement" app or transaction (MRKO) via search | — | Consignment Settlement app opens |
| 28 | Enter the vendor code for settlement | `{TD.vendorCode}` | Vendor code is entered |
| 29 | Press Enter to confirm the Vendor entry | — | Vendor code is accepted |
| 30 | Define the settlement period: start date and end date both equal to current date (same day) | `{TD.settlementDateSameDay}` | Settlement period dates are entered (both = current date) |
| 31 | Execute the settlement run for the vendor | — | Settlement document generation is initiated |
| 32 | Observe the settlement document generation result | — | Settlement document is generated successfully |
| 33 | Note the settlement document number | — | Settlement document number is displayed |
| 34 | Verify the settlement document includes the material document created earlier in this test | — | Material document number from step 26 appears in the settlement document line items |
| 35 | Verify the settlement document line item shows Material, Batch, Quantity, Price, and Value | `{TD.materialNumber}`, `{TD.batchNumber}`, `{TD.withdrawalQuantity}`, `{TD.price}` | Settlement line item matches material document values |
| 36 | Verify the settlement document total value equals the withdrawal value (Quantity × Price) | — | Settlement total value = `{TD.withdrawalQuantity}` × `{TD.price}` |
| 37 | Verify the settlement document posting date is the same day as the withdrawal posting date | `{TD.settlementDateSameDay}` | Settlement posting date = current date (same as withdrawal date) |
| 38 | Navigate to "Display Accounting Document" app via search | — | Display Accounting Document app opens |
| 39 | Enter the material document number to retrieve the accounting document | — | Accounting document linked to the material document is displayed |
| 40 | Verify the accounting document contains a debit entry to Inventory Consumption account (BSX) | `{TD.withdrawalQuantity}` × `{TD.price}` | Debit posting to BSX account with calculated value |
| 41 | Verify the accounting document contains a credit entry to Vendor Liability account (GBB) | `{TD.vendorCode}`, `{TD.withdrawalQuantity}` × `{TD.price}` | Credit posting to GBB account for vendor with calculated value |
| 42 | Verify the accounting document is balanced (debit = credit) | — | Total debit amount = Total credit amount |
| 43 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 44 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 45 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Material Document number is generated by SAP and displayed in the confirmation message
- The material document shows Movement Type 411 (Consignment Withdrawal) with the current date as posting date
- The material document clearly shows ownership transfer: From = Special Stock K (Vendor-owned), To = Unrestricted Stock (Company-owned)
- An Accounting Document is automatically generated with balanced postings: Debit to Inventory (BSX), Credit to Vendor Liability (GBB)
- A Settlement Document is successfully generated on the same day as the withdrawal
- The settlement document includes the withdrawal line item with correct material, batch, quantity, and price
- The settlement document total value matches the withdrawal value
- Same-day settlement is allowed and processed correctly without period-end delays
- Batch traceability is maintained through the material document

---

### Post-conditions

- SAP Material Document exists with the generated document number
- Material document type is 411 (Consignment Withdrawal) with same-day posting date
- Ownership transfer is complete: consignment stock reduced, unrestricted stock increased
- Accounting document generated with correct debit (BSX) and credit (GBB) postings
- Settlement document generated on the same day as withdrawal with the withdrawal line item included
- Batch traceability maintained: material document linked to batch history
- Vendor liability account reflects the withdrawal value
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
