# TC-CS-121: Transfer consignment stock via production order integration

**User Story:**          [CS-28] Transfer Consignment Stock Of A High-Value Biologic From Vendor-Owned  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management (MM) - Integration with Production Planning (PP)  
**Feature:**             Consignment Stock Withdrawal  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       INTEGRATION  
**Priority:**            CRITICAL  
**Severity:**            CRITICAL  
**Automation Candidate:**  YES  
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner or Manufacturing Operator with SAP authorization to confirm production orders and post goods issues |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` (consignment component) exists, is active, batch-managed, and consignment-enabled (MARC-KZECH = 'X') |
| P4 | Master Data | Finished product material `{TD.finishedProductMaterial}` exists with BOM (Bill of Materials) including consignment material `{TD.materialNumber}` as a component |
| P5 | Master Data | Vendor `{TD.vendorCode}` exists, is active, and has consignment agreement for the material |
| P6 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNumber}` and vendor `{TD.vendorCode}` with unrestricted-use status |
| P7 | Master Data | Consignment stock exists: Material `{TD.materialNumber}`, Batch `{TD.batchNumber}`, Vendor `{TD.vendorCode}`, Plant `{TD.plant}`, Storage Location `{TD.storageLocation}`, Special Stock 'K', Quantity ≥ component quantity required for production order |
| P8 | Master Data | Production Order `{TD.productionOrderNumber}` exists with status "Released" and includes consignment material `{TD.materialNumber}` as a component |
| P9 | Configuration | Movement Type 411 (Consignment Withdrawal) is configured and active |
| P10 | Configuration | Movement Type 261 (Goods Issue to Production Order) is configured and can automatically trigger Movement Type 411 for consignment components |
| P11 | Configuration | Automatic account determination configured for consignment liability (GBB account) and inventory consumption (BSX account) |

---

### Test Data

**Dataset Reference:** `testdata/CS-28/CS-28-testdata.json` — Dataset ID: `TD-CS-028-INT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number (Consignment Component) | `{TD.materialNumber}` | Consignment-enabled component material used in production — entered by the user | Valid |
| Finished Product Material | `{TD.finishedProductMaterial}` | Finished product using consignment component — referenced in production order | Valid |
| Batch Number | `{TD.batchNumber}` | Vendor-owned consignment batch — entered by the user | Valid |
| Vendor Code | `{TD.vendorCode}` | Consignment vendor account — auto-populated from material master | Valid |
| Plant | `{TD.plant}` | Production plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location within plant — entered by the user | Valid |
| Production Order Number | `{TD.productionOrderNumber}` | Released production order consuming consignment material — entered by the user | Valid |
| Component Quantity | `{TD.componentQuantity}` | Quantity of consignment component required for production order — entered by the user | Valid |
| Movement Type (Goods Issue) | `{TD.movementType261}` | Movement Type 261 (Goods Issue to Production Order) — system default | Valid |
| Movement Type (Consignment Withdrawal) | `{TD.movementType411}` | Movement Type 411 (Consignment Withdrawal) — system auto-generates | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Confirm Production Order" or "Post Goods Issue" | — | Search results appear listing the production order confirmation or goods issue application |
| 8 | Click the application name from the search results | — | Production order confirmation or goods issue application opens |
| 9 | Enter the production order number | `{TD.productionOrderNumber}` | Production order number is entered |
| 10 | Press Enter to confirm the Production Order entry | — | SAP retrieves the production order details including component list |
| 11 | Navigate to the component list or goods issue section | — | Component list is displayed showing all materials required for the production order |
| 12 | Locate the consignment component material in the component list | `{TD.materialNumber}` | Consignment component material is displayed in the list |
| 13 | Enter the batch number for the consignment component | `{TD.batchNumber}` | Batch number is entered for the consignment component |
| 14 | Press Enter to confirm the Batch entry | — | SAP validates the batch; available consignment stock is displayed; vendor code `{TD.vendorCode}` is auto-populated |
| 15 | Verify the component quantity required matches or enter the quantity to be issued | `{TD.componentQuantity}` | Component quantity is displayed or entered |
| 16 | Verify that the component is flagged as consignment material (Special Stock 'K' indicator) | — | Special Stock indicator 'K' (Consignment) is displayed or noted for the component |
| 17 | Confirm or post the goods issue for the production order | — | SAP begins processing the goods issue |
| 18 | Observe the on-screen confirmation response | — | A success message is displayed containing the generated material document number(s) |
| 19 | Note the material document number(s) from the success message | — | Material document number(s) displayed (format: 50xxxxxxxx) — may include one or two documents (261 and/or 411) |
| 20 | Navigate to "Display Material Document" app via search | — | Display Material Document app opens |
| 21 | Search for material documents posted for the production order | `{TD.productionOrderNumber}` | Material documents related to the production order are displayed |
| 22 | Identify the material document with Movement Type 261 (Goods Issue to Production Order) | `{TD.movementType261}` | Material document with Movement Type 261 is displayed |
| 23 | Verify the Movement Type 261 document shows the consignment component material, batch, and quantity | `{TD.materialNumber}`, `{TD.batchNumber}`, `{TD.componentQuantity}` | Material document line item matches goods issue values |
| 24 | Identify the material document with Movement Type 411 (Consignment Withdrawal) auto-generated by the system | `{TD.movementType411}` | Material document with Movement Type 411 is displayed (auto-generated for consignment component) |
| 25 | Verify the Movement Type 411 document shows ownership transfer: From = Special Stock 'K', To = Unrestricted Stock | — | From: Special Stock K (Vendor-owned), To: Unrestricted Stock (Company-owned) |
| 26 | Verify the Movement Type 411 document shows Material, Batch, Vendor, Quantity | `{TD.materialNumber}`, `{TD.batchNumber}`, `{TD.vendorCode}`, `{TD.componentQuantity}` | All fields match the consignment withdrawal values |
| 27 | Navigate to "Display Production Order" app via search | — | Display Production Order app opens |
| 28 | Enter the production order number | `{TD.productionOrderNumber}` | Production order details are displayed |
| 29 | Navigate to the "Goods Movements" or "Document Flow" tab | — | Goods movements or document flow for the production order is displayed |
| 30 | Verify the goods issue (Movement Type 261) is linked to the production order | — | Material document with Movement Type 261 appears in the production order document flow |
| 31 | Verify the consignment withdrawal (Movement Type 411) is linked to the production order | — | Material document with Movement Type 411 appears in the production order document flow |
| 32 | Navigate to "Display Accounting Document" app via search | — | Display Accounting Document app opens |
| 33 | Search for the accounting document linked to the Movement Type 411 material document | — | Accounting document linked to the consignment withdrawal is displayed |
| 34 | Verify the accounting document contains a debit entry to Inventory Consumption account (BSX) | `{TD.componentQuantity}` × `{TD.price}` | Debit posting to BSX account with calculated value |
| 35 | Verify the accounting document contains a credit entry to Vendor Liability account (GBB) | `{TD.vendorCode}`, `{TD.componentQuantity}` × `{TD.price}` | Credit posting to GBB account for vendor with calculated value |
| 36 | Verify the accounting document is balanced (debit = credit) | — | Total debit amount = Total credit amount |
| 37 | Navigate to "Display Batch" app via search | — | Display Batch app opens |
| 38 | Enter the material number and batch number | `{TD.materialNumber}`, `{TD.batchNumber}` | Batch details are displayed |
| 39 | Navigate to the "Document Flow" or "Where-Used List" tab | — | Document flow or where-used list is displayed |
| 40 | Verify the batch document flow includes both Movement Type 261 and Movement Type 411 material documents | — | Both material documents appear in batch document flow, maintaining traceability from production order to consignment withdrawal |
| 41 | Verify the batch genealogy links the consignment batch to the production order and finished product batch | — | Batch traceability chain: Consignment batch → Production order → Finished product batch |
| 42 | Navigate to "Display Stock Overview" app via search | — | Display Stock Overview app opens |
| 43 | Filter by Material, Plant, Storage Location, Special Stock K, Vendor | `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.vendorCode}` | Consignment stock is displayed |
| 44 | Verify the consignment stock balance has been reduced by the component quantity | — | Consignment stock balance = Original - `{TD.componentQuantity}` |
| 45 | Filter by Material, Plant, Storage Location, Unrestricted Stock (no special stock) | `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}` | Unrestricted stock is displayed (or may be zero if immediately consumed by production) |
| 46 | Verify the stock movement reflects the consignment withdrawal and subsequent production consumption | — | Stock balances reflect ownership transfer and production consumption |
| 47 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 48 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 49 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Goods issue to production order (Movement Type 261) is posted successfully
- Consignment withdrawal (Movement Type 411) is automatically triggered by the system for the consignment component
- Two Material Documents are generated: one for Movement Type 261 (Goods Issue), one for Movement Type 411 (Consignment Withdrawal)
- Both material documents are linked to the production order in the document flow
- The Movement Type 411 document clearly shows ownership transfer: From = Special Stock K (Vendor-owned), To = Unrestricted Stock (Company-owned)
- An Accounting Document is automatically generated for the consignment withdrawal with balanced postings: Debit to Inventory (BSX), Credit to Vendor Liability (GBB)
- Batch traceability is maintained throughout the production process: consignment batch → production order → finished product batch
- Consignment stock balance is reduced by the component quantity
- The integration between MM (consignment) and PP (production) functions correctly, ensuring automatic consignment liability recognition at the time of production consumption

---

### Post-conditions

- SAP Material Documents exist for both Movement Type 261 and Movement Type 411
- Both material documents are linked to the production order
- Ownership transfer is complete: consignment stock reduced, unrestricted stock updated
- Accounting document generated with correct debit (BSX) and credit (GBB) postings
- Batch traceability maintained: consignment batch linked to production order and finished product batch
- Vendor liability account reflects the consignment component value
- Production order status updated to reflect component consumption
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
