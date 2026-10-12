# TC-CS-120: Transfer consignment stock with zero-price consignment material

**User Story:**          [CS-28] Transfer Consignment Stock Of A High-Value Biologic From Vendor-Owned  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management (MM)  
**Feature:**             Consignment Stock Withdrawal  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       EDGE_CASE  
**Priority:**            MEDIUM  
**Severity:**            MINOR  
**Automation Candidate:**  YES  
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to post goods movements (M_MSEG_BWA for Movement Type 411) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumberZeroPrice}` exists, is active, batch-managed, and consignment-enabled (MARC-KZECH = 'X') |
| P4 | Master Data | Material `{TD.materialNumberZeroPrice}` is configured with a price of zero (0.00) in the purchasing info record or material master |
| P5 | Master Data | Vendor `{TD.vendorCode}` exists, is active, and has consignment agreement for the material |
| P6 | Master Data | Batch `{TD.batchNumberZeroPrice}` exists for material `{TD.materialNumberZeroPrice}` and vendor `{TD.vendorCode}` with unrestricted-use status |
| P7 | Master Data | Consignment stock exists: Material `{TD.materialNumberZeroPrice}`, Batch `{TD.batchNumberZeroPrice}`, Vendor `{TD.vendorCode}`, Plant `{TD.plant}`, Storage Location `{TD.storageLocation}`, Special Stock 'K', Quantity ≥ `{TD.withdrawalQuantity}` |
| P8 | Configuration | Movement Type 411 (Consignment Withdrawal) is configured and active |
| P9 | Configuration | Automatic account determination configured for consignment liability (GBB account) and inventory consumption (BSX account) |
| P10 | Configuration | System allows posting of zero-value goods movements (no blocking for zero price) |

---

### Test Data

**Dataset Reference:** `testdata/CS-28/CS-28-testdata.json` — Dataset ID: `TD-CS-028-EDGE-006`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number (Zero Price) | `{TD.materialNumberZeroPrice}` | Consignment-enabled, batch-managed material with zero price — entered by the user | Valid |
| Batch Number (Zero Price) | `{TD.batchNumberZeroPrice}` | Vendor-owned consignment batch for zero-price material — entered by the user | Valid |
| Vendor Code | `{TD.vendorCode}` | Consignment vendor account — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location within plant — entered by the user | Valid |
| Withdrawal Quantity | `{TD.withdrawalQuantity}` | Quantity to transfer from consignment to owned stock — entered by the user | Valid |
| Price (Zero) | `{TD.priceZero}` | Material price = 0.00 — system retrieves from purchasing info record or material master | Valid (zero price scenario) |
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
| 11 | In the "Material" field, enter the zero-price material number | `{TD.materialNumberZeroPrice}` | Zero-price material number is entered into the field |
| 12 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDescZeroPrice}` is auto-populated |
| 13 | In the "Plant" field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 14 | Press Enter to confirm the Plant entry | — | Plant code is accepted; storage location field becomes active |
| 15 | In the "Storage Location" field, enter the storage location code | `{TD.storageLocation}` | Storage location code is entered |
| 16 | Press Enter to confirm the Storage Location entry | — | Storage location is accepted |
| 17 | In the "Vendor" field (special stock section), enter the vendor code | `{TD.vendorCode}` | Vendor code is entered |
| 18 | Press Enter to confirm the Vendor entry | — | SAP validates the vendor; vendor name `{TD.vendorName}` is auto-populated; special stock indicator 'K' (Consignment) is displayed |
| 19 | In the "Batch" field, enter the batch number for zero-price material | `{TD.batchNumberZeroPrice}` | Batch number is entered |
| 20 | Press Enter to confirm the Batch entry | — | SAP validates the batch; available consignment stock quantity `{TD.availableStock}` is displayed |
| 21 | In the "Quantity" field, enter the withdrawal quantity | `{TD.withdrawalQuantity}` | Withdrawal quantity is entered |
| 22 | Press Enter to confirm the Quantity entry | — | Quantity is accepted; unit of measure `{TD.uom}` is displayed; price = 0.00 |
| 23 | Verify the Movement Type field shows 411 and the Special Stock indicator shows 'K' | `{TD.movementType}` | Movement Type = 411; Special Stock = K (Consignment) |
| 24 | Observe if any warning messages appear regarding zero price | — | System may display a warning message about zero price, but allows posting to continue (if configured to allow zero-price postings) |
| 25 | Click the "Post" button to submit the goods movement | — | SAP begins processing the consignment withdrawal |
| 26 | Observe the on-screen confirmation response | — | A success message is displayed containing the generated material document number (posting is allowed for zero-price material) |
| 27 | Note the material document number from the success message | — | Material document number is displayed (format: 50xxxxxxxx) |
| 28 | Navigate to "Display Material Document" app via search | — | Display Material Document app opens |
| 29 | Enter the material document number noted in step 27 | — | Material document is displayed |
| 30 | Verify the material document header shows Movement Type 411 | `{TD.movementType}` | Movement Type = 411 (Consignment Withdrawal) |
| 31 | Verify the material document line item shows Material (zero-price), Batch, Quantity, Plant, Storage Location | `{TD.materialNumberZeroPrice}`, `{TD.batchNumberZeroPrice}`, `{TD.withdrawalQuantity}`, `{TD.plant}`, `{TD.storageLocation}` | All fields match entered values |
| 32 | Verify the material document line item shows Value = 0.00 (zero price × quantity = 0.00) | — | Value field = 0.00 (zero value) |
| 33 | Verify the "From" side shows Special Stock 'K' and Vendor code | `{TD.vendorCode}` | From: Special Stock K, Vendor = vendor code |
| 34 | Verify the "To" side shows unrestricted stock (no special stock indicator) | — | To: Unrestricted stock (no special stock indicator) |
| 35 | Navigate to "Display Accounting Document" app via search | — | Display Accounting Document app opens |
| 36 | Enter the material document number to retrieve the accounting document | — | Accounting document linked to the material document is displayed (or no accounting document if zero-value postings do not generate FI documents) |
| 37 | If accounting document exists, verify it contains a debit entry to Inventory Consumption account (BSX) with zero value | 0.00 | Debit posting to BSX account with zero value |
| 38 | If accounting document exists, verify it contains a credit entry to Vendor Liability account (GBB) with zero value | `{TD.vendorCode}`, 0.00 | Credit posting to GBB account for vendor with zero value |
| 39 | If accounting document exists, verify the accounting document is balanced (debit = credit = 0.00) | — | Total debit amount = Total credit amount = 0.00 |
| 40 | Navigate to "Display Stock Overview" app via search | — | Display Stock Overview app opens |
| 41 | Filter by Material, Plant, Storage Location, Special Stock K, Vendor | `{TD.materialNumberZeroPrice}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.vendorCode}` | Consignment stock for zero-price material is displayed |
| 42 | Verify the consignment stock balance has been reduced by the withdrawal quantity | — | Consignment stock balance = Original - `{TD.withdrawalQuantity}` |
| 43 | Filter by Material, Plant, Storage Location, Unrestricted Stock (no special stock) | `{TD.materialNumberZeroPrice}`, `{TD.plant}`, `{TD.storageLocation}` | Unrestricted stock for zero-price material is displayed |
| 44 | Verify the unrestricted stock balance has been increased by the withdrawal quantity | — | Unrestricted stock balance = Original + `{TD.withdrawalQuantity}` |
| 45 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 46 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 47 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Material Document number is generated by SAP and displayed in the confirmation message (zero-price posting is allowed)
- The material document shows Movement Type 411 (Consignment Withdrawal) with zero material value
- The material document clearly shows ownership transfer: From = Special Stock K (Vendor-owned), To = Unrestricted Stock (Company-owned)
- An Accounting Document may be generated with zero-value postings (Debit to BSX = 0.00, Credit to GBB = 0.00), or no accounting document is generated if system is configured to suppress zero-value FI postings
- Consignment stock balance is reduced by the withdrawal quantity (quantity tracking is maintained even with zero value)
- Unrestricted stock balance is increased by the withdrawal quantity
- No vendor liability value is posted (vendor liability remains zero for zero-price material)
- The system correctly handles the edge case of zero-price consignment materials, maintaining quantity tracking without financial impact

---

### Post-conditions

- SAP Material Document exists with the generated document number
- Material document type is 411 (Consignment Withdrawal) with zero value
- Ownership transfer is complete: consignment stock reduced, unrestricted stock increased (quantity tracking maintained)
- Accounting document may or may not be generated (depends on system configuration for zero-value postings)
- Batch traceability maintained: material document linked to batch history
- Vendor liability account remains unchanged (no financial impact due to zero price)
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
