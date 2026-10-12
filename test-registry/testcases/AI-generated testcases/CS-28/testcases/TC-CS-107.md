# TC-CS-107: Attempt to transfer consignment stock with insufficient available stock quantity

**User Story:**          [CS-28] Transfer Consignment Stock Of A High-Value Biologic From Vendor-Owned  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management (MM)  
**Feature:**             Consignment Stock Withdrawal  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       NEGATIVE  
**Priority:**            CRITICAL  
**Severity:**            CRITICAL  
**Automation Candidate:**  YES  
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to post goods movements (M_MSEG_BWA for Movement Type 411) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, batch-managed, and consignment-enabled (MARC-KZECH = 'X') |
| P4 | Master Data | Vendor `{TD.vendorCode}` exists, is active, and has consignment agreement for the material |
| P5 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNumber}` and vendor `{TD.vendorCode}` with unrestricted-use status |
| P6 | Master Data | Consignment stock exists: Material `{TD.materialNumber}`, Batch `{TD.batchNumber}`, Vendor `{TD.vendorCode}`, Plant `{TD.plant}`, Storage Location `{TD.storageLocation}`, Special Stock 'K', Quantity = `{TD.availableStockLimited}` (less than requested withdrawal quantity) |
| P7 | Configuration | Movement Type 411 (Consignment Withdrawal) is configured and active |
| P8 | Configuration | Automatic account determination configured for consignment liability (GBB account) and inventory consumption (BSX account) |

---

### Test Data

**Dataset Reference:** `testdata/CS-28/CS-28-testdata.json` — Dataset ID: `TD-CS-028-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Consignment-enabled, batch-managed high-value biologic material — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Vendor-owned consignment batch — entered by the user | Valid |
| Vendor Code | `{TD.vendorCode}` | Consignment vendor account — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location within plant — entered by the user | Valid |
| Available Stock (Limited) | `{TD.availableStockLimited}` | Limited available consignment stock quantity (e.g., 10 KG) — displayed by SAP | Valid |
| Withdrawal Quantity (Excessive) | `{TD.withdrawalQuantityExcessive}` | Quantity exceeding available stock (e.g., 50 KG when only 10 KG available) — entered by the user | Invalid |
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
| 20 | Press Enter to confirm the Batch entry | — | SAP validates the batch; available consignment stock quantity `{TD.availableStockLimited}` is displayed (limited quantity) |
| 21 | In the "Quantity" field, enter the excessive withdrawal quantity (greater than available stock) | `{TD.withdrawalQuantityExcessive}` | Excessive withdrawal quantity is entered (exceeds available stock) |
| 22 | Press Enter to confirm the Quantity entry | — | Quantity is entered into the field |
| 23 | Click the "Post" button to attempt the goods movement | — | SAP begins validation of the consignment withdrawal |
| 24 | Observe the on-screen error response | — | An error message is displayed indicating insufficient consignment stock |
| 25 | Verify the error message contains text indicating insufficient stock or quantity exceeding available consignment stock | — | Error message pattern: "Insufficient stock", "Stock not available", "Quantity exceeds available consignment stock", or similar SAP message |
| 26 | Verify that no material document number is generated | — | No material document number is displayed; the posting is rejected |
| 27 | Verify the Post Goods Movement form remains in edit mode with the entered data | — | Form remains open with entered values; no posting has occurred |
| 28 | Navigate to "Display Material Document" app via search | — | Display Material Document app opens |
| 29 | Search for any material document posted for the material and batch in the current date range | `{TD.materialNumber}`, `{TD.batchNumber}` | No material document is found for the attempted transaction |
| 30 | Navigate to "Display Stock Overview" app via search | — | Display Stock Overview app opens |
| 31 | Filter by Material, Plant, Storage Location, Special Stock K, Vendor | `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.vendorCode}` | Consignment stock is displayed |
| 32 | Verify the consignment stock balance remains unchanged (original limited quantity) | — | Consignment stock balance = `{TD.availableStockLimited}` (unchanged) |
| 33 | Filter by Material, Plant, Storage Location, Unrestricted Stock (no special stock) | `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}` | Unrestricted stock is displayed |
| 34 | Verify the unrestricted stock balance remains unchanged | — | Unrestricted stock balance = Original (unchanged) |
| 35 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 36 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 37 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system detects insufficient consignment stock and rejects the withdrawal posting
- An error message is displayed containing text such as "Insufficient stock", "Stock not available", or "Quantity exceeds available consignment stock"
- No Material Document number is generated
- No Accounting Document is created
- Consignment stock balance remains unchanged at the original limited quantity
- Unrestricted stock balance remains unchanged
- The transaction is blocked to prevent negative stock or overstated vendor liability

---

### Post-conditions

- No SAP Material Document is created for this attempted transaction
- Consignment stock balance remains at the original limited quantity (unchanged)
- Unrestricted stock balance remains unchanged
- No accounting document or vendor liability posting is created
- The Post Goods Movement form remains open with the entered data, allowing the user to correct the quantity

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
