# TC-CS-122: Transfer consignment stock with quality inspection post-withdrawal

**User Story:**          [CS-28] Transfer Consignment Stock Of A High-Value Biologic From Vendor-Owned  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management (MM) - Integration with Quality Management (QM)  
**Feature:**             Consignment Stock Withdrawal  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       INTEGRATION  
**Priority:**            MEDIUM  
**Severity:**            MAJOR  
**Automation Candidate:**  YES  
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to post goods movements (M_MSEG_BWA for Movement Type 411) and Quality Inspector with authorization to record inspection results |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, batch-managed, and consignment-enabled (MARC-KZECH = 'X') |
| P4 | Master Data | Material `{TD.materialNumber}` is subject to quality inspection (QM active, inspection type configured for goods receipt or stock transfer) |
| P5 | Master Data | Vendor `{TD.vendorCode}` exists, is active, and has consignment agreement for the material |
| P6 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNumber}` and vendor `{TD.vendorCode}` with unrestricted-use status |
| P7 | Master Data | Consignment stock exists: Material `{TD.materialNumber}`, Batch `{TD.batchNumber}`, Vendor `{TD.vendorCode}`, Plant `{TD.plant}`, Storage Location `{TD.storageLocation}`, Special Stock 'K', Quantity ≥ `{TD.withdrawalQuantity}` |
| P8 | Configuration | Movement Type 411 (Consignment Withdrawal) is configured and active |
| P9 | Configuration | Quality inspection is configured to trigger automatically upon consignment withdrawal or manual inspection lot creation is supported |
| P10 | Configuration | Inspection plan or inspection catalog exists for the material |
| P11 | Configuration | Automatic account determination configured for consignment liability (GBB account) and inventory consumption (BSX account) |

---

### Test Data

**Dataset Reference:** `testdata/CS-28/CS-28-testdata.json` — Dataset ID: `TD-CS-028-INT-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Consignment-enabled, batch-managed high-value biologic material subject to QM — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Vendor-owned consignment batch — entered by the user | Valid |
| Vendor Code | `{TD.vendorCode}` | Consignment vendor account — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location within plant — entered by the user | Valid |
| Withdrawal Quantity | `{TD.withdrawalQuantity}` | Quantity to transfer from consignment to owned stock — entered by the user | Valid |
| Movement Type | `{TD.movementType}` | Fixed value 411 for consignment withdrawal — system default | Valid |
| Inspection Lot Number | `{TD.inspectionLotNumber}` | Inspection lot created for the withdrawn batch — system generates | Valid |
| Inspection Result | `{TD.inspectionResult}` | Inspection result (Accepted / Rejected) — entered by quality inspector | Valid |

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
| 25 | Observe the on-screen confirmation response | — | A success message is displayed containing the generated material document number; system may also display a message about automatic inspection lot creation |
| 26 | Note the material document number from the success message | — | Material document number is displayed (format: 50xxxxxxxx) |
| 27 | Navigate to "Display Inspection Lot" or "Manage Inspection Lots" app via search | — | Display Inspection Lot app opens |
| 28 | Search for inspection lots created for the material and batch | `{TD.materialNumber}`, `{TD.batchNumber}` | Inspection lot(s) related to the material and batch are displayed |
| 29 | Identify the inspection lot created for the consignment withdrawal | — | Inspection lot is displayed with status "Created" or "In Process" |
| 30 | Note the inspection lot number | — | Inspection lot number is displayed |
| 31 | Verify the inspection lot is linked to the material document number noted in step 26 | — | Inspection lot shows reference to material document number (Movement Type 411) |
| 32 | Verify the inspection lot shows Material, Batch, Vendor, Quantity | `{TD.materialNumber}`, `{TD.batchNumber}`, `{TD.vendorCode}`, `{TD.withdrawalQuantity}` | Inspection lot details match consignment withdrawal values |
| 33 | Open the inspection lot to record inspection results | — | Inspection lot details screen opens with inspection characteristics |
| 34 | Record inspection results for the required inspection characteristics | `{TD.inspectionResult}` | Inspection results are entered (e.g., all characteristics meet acceptance criteria) |
| 35 | Save the inspection results | — | Inspection results are saved successfully |
| 36 | Perform usage decision: Accept the inspection lot | — | Usage decision "Accepted" is recorded for the inspection lot |
| 37 | Save the usage decision | — | Usage decision is saved; inspection lot status changes to "Completed" or "Accepted" |
| 38 | Navigate to "Display Batch" app via search | — | Display Batch app opens |
| 39 | Enter the material number and batch number | `{TD.materialNumber}`, `{TD.batchNumber}` | Batch details are displayed |
| 40 | Navigate to the "Document Flow" or "Where-Used List" tab | — | Document flow or where-used list is displayed |
| 41 | Verify the batch document flow includes the material document (Movement Type 411) and the inspection lot | — | Both material document and inspection lot appear in batch document flow, maintaining traceability |
| 42 | Verify the batch quality status reflects the inspection acceptance | — | Batch status shows "Unrestricted-Use" or "Accepted" quality status |
| 43 | Navigate to "Display Material Document" app via search | — | Display Material Document app opens |
| 44 | Enter the material document number noted in step 26 | — | Material document is displayed |
| 45 | Verify the material document shows Movement Type 411, Material, Batch, Quantity | `{TD.movementType}`, `{TD.materialNumber}`, `{TD.batchNumber}`, `{TD.withdrawalQuantity}` | Material document details match consignment withdrawal values |
| 46 | Verify the material document shows ownership transfer: From = Special Stock 'K', To = Unrestricted Stock | — | From: Special Stock K (Vendor-owned), To: Unrestricted Stock (Company-owned) |
| 47 | Navigate to "Display Stock Overview" app via search | — | Display Stock Overview app opens |
| 48 | Filter by Material, Plant, Storage Location, Special Stock K, Vendor | `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.vendorCode}` | Consignment stock is displayed |
| 49 | Verify the consignment stock balance has been reduced by the withdrawal quantity | — | Consignment stock balance = Original - `{TD.withdrawalQuantity}` |
| 50 | Filter by Material, Plant, Storage Location, Unrestricted Stock (no special stock) | `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}` | Unrestricted stock is displayed |
| 51 | Verify the unrestricted stock balance has been increased by the withdrawal quantity | — | Unrestricted stock balance = Original + `{TD.withdrawalQuantity}` |
| 52 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 53 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 54 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Material Document number is generated by SAP for the consignment withdrawal (Movement Type 411)
- An Inspection Lot is automatically created for the withdrawn consignment batch
- The inspection lot is linked to the material document, maintaining traceability
- Inspection results are recorded successfully, and usage decision "Accepted" is made
- The batch document flow includes both the material document (Movement Type 411) and the inspection lot
- Batch quality status reflects the inspection acceptance
- Consignment stock balance is reduced by the withdrawal quantity
- Unrestricted stock balance is increased by the withdrawal quantity
- The integration between MM (consignment) and QM (quality management) functions correctly, ensuring quality validation of consignment materials post-withdrawal
- Batch traceability integrity is maintained throughout the quality inspection process

---

### Post-conditions

- SAP Material Document exists with the generated document number
- Material document type is 411 (Consignment Withdrawal)
- Inspection Lot exists and is linked to the material document and batch
- Inspection lot status is "Completed" or "Accepted" after usage decision
- Batch quality status reflects the inspection acceptance
- Ownership transfer is complete: consignment stock reduced, unrestricted stock increased
- Batch traceability maintained: material document → inspection lot → batch history
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
