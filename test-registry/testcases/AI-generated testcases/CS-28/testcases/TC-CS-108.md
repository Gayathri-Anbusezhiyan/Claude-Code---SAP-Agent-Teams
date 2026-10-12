# TC-CS-108: Attempt to transfer consignment stock with invalid vendor-batch combination

**User Story:**          [CS-28] Transfer Consignment Stock Of A High-Value Biologic From Vendor-Owned  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management (MM)  
**Feature:**             Consignment Stock Withdrawal  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       NEGATIVE  
**Priority:**            HIGH  
**Severity:**            MAJOR  
**Automation Candidate:**  YES  
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to post goods movements (M_MSEG_BWA for Movement Type 411) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, batch-managed, and consignment-enabled (MARC-KZECH = 'X') |
| P4 | Master Data | Vendor `{TD.vendorCodePrimary}` exists, is active, and has consignment agreement for the material |
| P5 | Master Data | Vendor `{TD.vendorCodeSecondary}` exists, is active, and has consignment agreement for the material |
| P6 | Master Data | Batch `{TD.batchNumberVendorPrimary}` exists for material `{TD.materialNumber}` and vendor `{TD.vendorCodePrimary}` (owned by Vendor Primary) |
| P7 | Master Data | Consignment stock exists: Material `{TD.materialNumber}`, Batch `{TD.batchNumberVendorPrimary}`, Vendor `{TD.vendorCodePrimary}`, Plant `{TD.plant}`, Storage Location `{TD.storageLocation}`, Special Stock 'K' |
| P8 | Configuration | Movement Type 411 (Consignment Withdrawal) is configured and active |
| P9 | Configuration | Automatic account determination configured for consignment liability (GBB account) and inventory consumption (BSX account) |

---

### Test Data

**Dataset Reference:** `testdata/CS-28/CS-28-testdata.json` — Dataset ID: `TD-CS-028-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Consignment-enabled, batch-managed high-value biologic material — entered by the user | Valid |
| Batch Number (Vendor Primary) | `{TD.batchNumberVendorPrimary}` | Batch owned by Vendor Primary — entered by the user | Valid |
| Vendor Code (Primary) | `{TD.vendorCodePrimary}` | Consignment vendor account that owns the batch — entered by the user | Valid |
| Vendor Code (Secondary) | `{TD.vendorCodeSecondary}` | Different consignment vendor account (does NOT own the batch) — entered by the user | Invalid (mismatched) |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location within plant — entered by the user | Valid |
| Withdrawal Quantity | `{TD.withdrawalQuantity}` | Quantity to transfer from consignment to owned stock — entered by the user | Valid |
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
| 17 | In the "Vendor" field (special stock section), enter the secondary vendor code (mismatched) | `{TD.vendorCodeSecondary}` | Secondary vendor code is entered (this vendor does NOT own the batch) |
| 18 | Press Enter to confirm the Vendor entry | — | SAP validates the vendor; vendor name is auto-populated; special stock indicator 'K' (Consignment) is displayed |
| 19 | In the "Batch" field, enter the batch number owned by Vendor Primary (mismatched with Vendor Secondary) | `{TD.batchNumberVendorPrimary}` | Batch number is entered (this batch belongs to a different vendor) |
| 20 | Press Enter to confirm the Batch entry | — | SAP attempts to validate the batch for the entered vendor (Vendor Secondary) |
| 21 | Observe the system response after batch entry | — | System detects the invalid vendor-batch combination |
| 22 | In the "Quantity" field, enter the withdrawal quantity | `{TD.withdrawalQuantity}` | Withdrawal quantity is entered |
| 23 | Press Enter to confirm the Quantity entry | — | Quantity is entered into the field |
| 24 | Click the "Post" button to attempt the goods movement | — | SAP begins validation of the consignment withdrawal |
| 25 | Observe the on-screen error response | — | An error message is displayed indicating invalid batch for the vendor or no consignment stock found for the vendor-batch combination |
| 26 | Verify the error message contains text indicating batch does not belong to vendor or no consignment stock available for the vendor-batch combination | — | Error message pattern: "Batch does not exist for vendor", "No consignment stock found", "Invalid vendor-batch combination", or similar SAP message |
| 27 | Verify that no material document number is generated | — | No material document number is displayed; the posting is rejected |
| 28 | Verify the Post Goods Movement form remains in edit mode with the entered data | — | Form remains open with entered values; no posting has occurred |
| 29 | Navigate to "Display Material Document" app via search | — | Display Material Document app opens |
| 30 | Search for any material document posted for the material and batch in the current date range | `{TD.materialNumber}`, `{TD.batchNumberVendorPrimary}` | No material document is found for the attempted transaction |
| 31 | Navigate to "Display Stock Overview" app via search | — | Display Stock Overview app opens |
| 32 | Filter by Material, Plant, Storage Location, Special Stock K, Vendor Primary (correct owner) | `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.vendorCodePrimary}` | Consignment stock for Vendor Primary is displayed |
| 33 | Verify the consignment stock balance for Vendor Primary remains unchanged | — | Consignment stock balance for Vendor Primary = Original (unchanged) |
| 34 | Filter by Material, Plant, Storage Location, Special Stock K, Vendor Secondary (incorrect vendor) | `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.vendorCodeSecondary}` | No consignment stock is found for Vendor Secondary with the batch (or no records returned) |
| 35 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 36 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 37 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system detects the invalid vendor-batch combination and rejects the withdrawal posting
- An error message is displayed containing text such as "Batch does not exist for vendor", "No consignment stock found", or "Invalid vendor-batch combination"
- No Material Document number is generated
- No Accounting Document is created
- Consignment stock balance for the correct vendor (Vendor Primary) remains unchanged
- No consignment stock is found for the incorrect vendor (Vendor Secondary) with the batch
- The transaction is blocked to prevent incorrect vendor liability posting

---

### Post-conditions

- No SAP Material Document is created for this attempted transaction
- Consignment stock balance for Vendor Primary remains unchanged
- No accounting document or vendor liability posting is created
- The Post Goods Movement form remains open with the entered data, allowing the user to correct the vendor-batch combination

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
