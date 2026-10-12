# TC-CS-104: Transfer consignment stock with multiple batches withdrawal in same settlement period

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
| P5 | Master Data | Batch `{TD.batchNumberFirst}` exists for material `{TD.materialNumber}` and vendor `{TD.vendorCode}` with unrestricted-use status |
| P6 | Master Data | Batch `{TD.batchNumberSecond}` exists for material `{TD.materialNumber}` and vendor `{TD.vendorCode}` with unrestricted-use status |
| P7 | Master Data | Consignment stock exists for Batch 1: Material `{TD.materialNumber}`, Batch `{TD.batchNumberFirst}`, Vendor `{TD.vendorCode}`, Plant `{TD.plant}`, Storage Location `{TD.storageLocation}`, Special Stock 'K', Quantity ≥ `{TD.withdrawalQuantityFirst}` |
| P8 | Master Data | Consignment stock exists for Batch 2: Material `{TD.materialNumber}`, Batch `{TD.batchNumberSecond}`, Vendor `{TD.vendorCode}`, Plant `{TD.plant}`, Storage Location `{TD.storageLocation}`, Special Stock 'K', Quantity ≥ `{TD.withdrawalQuantitySecond}` |
| P9 | Configuration | Movement Type 411 (Consignment Withdrawal) is configured and active |
| P10 | Configuration | Automatic account determination configured for consignment liability (GBB account) and inventory consumption (BSX account) |

---

### Test Data

**Dataset Reference:** `testdata/CS-28/CS-28-testdata.json` — Dataset ID: `TD-CS-028-AP-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Consignment-enabled, batch-managed high-value biologic material — entered by the user | Valid |
| Batch Number (First) | `{TD.batchNumberFirst}` | First vendor-owned consignment batch — entered by the user | Valid |
| Batch Number (Second) | `{TD.batchNumberSecond}` | Second vendor-owned consignment batch — entered by the user | Valid |
| Vendor Code | `{TD.vendorCode}` | Consignment vendor account — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location within plant — entered by the user | Valid |
| Withdrawal Quantity (First Batch) | `{TD.withdrawalQuantityFirst}` | Quantity to transfer from first batch — entered by the user | Valid |
| Withdrawal Quantity (Second Batch) | `{TD.withdrawalQuantitySecond}` | Quantity to transfer from second batch — entered by the user | Valid |
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
| 19 | In the "Batch" field, enter the first batch number | `{TD.batchNumberFirst}` | First batch number is entered |
| 20 | Press Enter to confirm the Batch entry | — | SAP validates the batch; available consignment stock quantity for first batch is displayed |
| 21 | In the "Quantity" field, enter the withdrawal quantity for the first batch | `{TD.withdrawalQuantityFirst}` | Withdrawal quantity for first batch is entered |
| 22 | Press Enter to confirm the Quantity entry | — | Quantity is accepted; unit of measure `{TD.uom}` is displayed |
| 23 | Verify the Movement Type field shows 411 and the Special Stock indicator shows 'K' | `{TD.movementType}` | Movement Type = 411; Special Stock = K (Consignment) |
| 24 | Click the "Post" button to submit the first goods movement | — | SAP begins processing the first consignment withdrawal |
| 25 | Observe the on-screen confirmation response | — | A success message is displayed containing the first generated material document number |
| 26 | Note the first material document number from the success message | — | First material document number is displayed (format: 50xxxxxxxx) |
| 27 | Click the "New" or "Create" button to initiate a second goods movement | — | Post Goods Movement form is cleared for a new entry |
| 28 | In the "Movement Type" field, enter the movement type | `{TD.movementType}` | Movement Type 411 is entered |
| 29 | Press Enter to confirm the Movement Type entry | — | System accepts the movement type; additional fields become active |
| 30 | In the "Material" field, enter the material number | `{TD.materialNumber}` | Material number is entered into the field |
| 31 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is auto-populated |
| 32 | In the "Plant" field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 33 | Press Enter to confirm the Plant entry | — | Plant code is accepted; storage location field becomes active |
| 34 | In the "Storage Location" field, enter the storage location code | `{TD.storageLocation}` | Storage location code is entered |
| 35 | Press Enter to confirm the Storage Location entry | — | Storage location is accepted |
| 36 | In the "Vendor" field (special stock section), enter the vendor code | `{TD.vendorCode}` | Vendor code is entered |
| 37 | Press Enter to confirm the Vendor entry | — | SAP validates the vendor; vendor name `{TD.vendorName}` is auto-populated; special stock indicator 'K' (Consignment) is displayed |
| 38 | In the "Batch" field, enter the second batch number | `{TD.batchNumberSecond}` | Second batch number is entered |
| 39 | Press Enter to confirm the Batch entry | — | SAP validates the batch; available consignment stock quantity for second batch is displayed |
| 40 | In the "Quantity" field, enter the withdrawal quantity for the second batch | `{TD.withdrawalQuantitySecond}` | Withdrawal quantity for second batch is entered |
| 41 | Press Enter to confirm the Quantity entry | — | Quantity is accepted; unit of measure `{TD.uom}` is displayed |
| 42 | Click the "Post" button to submit the second goods movement | — | SAP begins processing the second consignment withdrawal |
| 43 | Observe the on-screen confirmation response | — | A success message is displayed containing the second generated material document number |
| 44 | Note the second material document number from the success message | — | Second material document number is displayed (format: 50xxxxxxxx) |
| 45 | Navigate to "Display Material Document" app via search | — | Display Material Document app opens |
| 46 | Enter the first material document number noted in step 26 | — | First material document is displayed |
| 47 | Verify the first material document shows Movement Type 411, Material, Batch 1, Quantity 1, Vendor | `{TD.movementType}`, `{TD.materialNumber}`, `{TD.batchNumberFirst}`, `{TD.withdrawalQuantityFirst}`, `{TD.vendorCode}` | All fields match first withdrawal values |
| 48 | Navigate back to "Display Material Document" app | — | Display Material Document app is ready for new query |
| 49 | Enter the second material document number noted in step 44 | — | Second material document is displayed |
| 50 | Verify the second material document shows Movement Type 411, Material, Batch 2, Quantity 2, Vendor | `{TD.movementType}`, `{TD.materialNumber}`, `{TD.batchNumberSecond}`, `{TD.withdrawalQuantitySecond}`, `{TD.vendorCode}` | All fields match second withdrawal values |
| 51 | Navigate to "Display Batch" app via search | — | Display Batch app opens |
| 52 | Enter the material number and first batch number | `{TD.materialNumber}`, `{TD.batchNumberFirst}` | First batch details are displayed |
| 53 | Navigate to the "Document Flow" or "Where-Used List" tab | — | Document flow or where-used list is displayed |
| 54 | Verify the first material document number is present in the batch history | — | First material document number appears in batch document flow |
| 55 | Navigate back to "Display Batch" app | — | Display Batch app is ready for new query |
| 56 | Enter the material number and second batch number | `{TD.materialNumber}`, `{TD.batchNumberSecond}` | Second batch details are displayed |
| 57 | Navigate to the "Document Flow" or "Where-Used List" tab | — | Document flow or where-used list is displayed |
| 58 | Verify the second material document number is present in the batch history | — | Second material document number appears in batch document flow |
| 59 | Navigate to "Display Stock Overview" app via search | — | Display Stock Overview app opens |
| 60 | Filter by Material, Plant, Storage Location, Special Stock K, Vendor | `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.vendorCode}` | Consignment stock is displayed |
| 61 | Verify the consignment stock balance has been reduced by the sum of both withdrawal quantities | — | Consignment stock balance = Original - (`{TD.withdrawalQuantityFirst}` + `{TD.withdrawalQuantitySecond}`) |
| 62 | Filter by Material, Plant, Storage Location, Unrestricted Stock (no special stock) | `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}` | Unrestricted stock is displayed |
| 63 | Verify the unrestricted stock balance has been increased by the sum of both withdrawal quantities | — | Unrestricted stock balance = Original + (`{TD.withdrawalQuantityFirst}` + `{TD.withdrawalQuantitySecond}`) |
| 64 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 65 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 66 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Two unique Material Document numbers are generated by SAP (one for each batch withdrawal)
- Each material document shows Movement Type 411 (Consignment Withdrawal) with correct batch segregation
- First material document: Batch = `{TD.batchNumberFirst}`, Quantity = `{TD.withdrawalQuantityFirst}`
- Second material document: Batch = `{TD.batchNumberSecond}`, Quantity = `{TD.withdrawalQuantitySecond}`
- Each material document clearly shows ownership transfer: From = Special Stock K (Vendor-owned), To = Unrestricted Stock (Company-owned)
- Two separate Accounting Documents are automatically generated (one per withdrawal) with balanced postings
- Batch traceability is maintained separately for each batch: each batch document flow includes its respective material document number
- Consignment stock balance is reduced by the sum of both withdrawal quantities
- Unrestricted stock balance is increased by the sum of both withdrawal quantities
- Both withdrawals are within the same settlement period and will be aggregated in the settlement document

---

### Post-conditions

- Two SAP Material Documents exist with the generated document numbers
- Both material documents have type 411 (Consignment Withdrawal)
- Ownership transfer is complete for both batches: consignment stock reduced, unrestricted stock increased
- Two separate accounting documents generated with correct debit (BSX) and credit (GBB) postings
- Batch traceability maintained separately for each batch
- Vendor liability account reflects the combined withdrawal value for both batches
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
