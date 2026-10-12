# TC-CS-111: Attempt to transfer consignment stock with zero withdrawal quantity

**User Story:**          [CS-28] Transfer Consignment Stock Of A High-Value Biologic From Vendor-Owned  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management (MM)  
**Feature:**             Consignment Stock Withdrawal  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       ERROR  
**Priority:**            MEDIUM  
**Severity:**            MINOR  
**Automation Candidate:**  YES  
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to post goods movements (M_MSEG_BWA for Movement Type 411) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, batch-managed, and consignment-enabled (MARC-KZECH = 'X') |
| P4 | Master Data | Vendor `{TD.vendorCode}` exists, is active, and has consignment agreement for the material |
| P5 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNumber}` and vendor `{TD.vendorCode}` with unrestricted-use status |
| P6 | Master Data | Consignment stock exists: Material `{TD.materialNumber}`, Batch `{TD.batchNumber}`, Vendor `{TD.vendorCode}`, Plant `{TD.plant}`, Storage Location `{TD.storageLocation}`, Special Stock 'K' |
| P7 | Configuration | Movement Type 411 (Consignment Withdrawal) is configured and active |
| P8 | Configuration | Automatic account determination configured for consignment liability (GBB account) and inventory consumption (BSX account) |

---

### Test Data

**Dataset Reference:** `testdata/CS-28/CS-28-testdata.json` — Dataset ID: `TD-CS-028-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Consignment-enabled, batch-managed high-value biologic material — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Vendor-owned consignment batch — entered by the user | Valid |
| Vendor Code | `{TD.vendorCode}` | Consignment vendor account — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location within plant — entered by the user | Valid |
| Withdrawal Quantity (Zero) | `{TD.withdrawalQuantityZero}` | Zero quantity (0) — entered by the user | Invalid (zero not allowed) |
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
| 20 | Press Enter to confirm the Batch entry | — | SAP validates the batch; available consignment stock quantity `{TD.availableStock}` is displayed |
| 21 | In the "Quantity" field, enter zero as the withdrawal quantity | `{TD.withdrawalQuantityZero}` | Zero (0) is entered in the quantity field |
| 22 | Press Enter to confirm the Quantity entry | — | SAP detects the zero quantity and highlights the field as invalid |
| 23 | Click the "Post" button to attempt the goods movement | — | SAP begins validation of the consignment withdrawal |
| 24 | Observe the on-screen error response | — | An error message is displayed indicating zero quantity is not allowed or quantity must be greater than zero |
| 25 | Verify the error message contains text indicating zero quantity is invalid, quantity must be greater than zero, or quantity is mandatory | — | Error message pattern: "Quantity must be greater than 0", "Zero quantity not allowed", "Enter a valid quantity", or similar SAP message |
| 26 | Verify that the "Quantity" field is highlighted as a mandatory field with invalid value | — | Quantity field is highlighted (red border or error indicator); field-level error message may appear |
| 27 | Verify that no material document number is generated | — | No material document number is displayed; the posting is rejected |
| 28 | Verify the Post Goods Movement form remains in edit mode with the entered data | — | Form remains open with entered values; no posting has occurred |
| 29 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 30 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 31 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system detects zero quantity and rejects the withdrawal posting
- An error message is displayed containing text such as "Quantity must be greater than 0", "Zero quantity not allowed", or "Enter a valid quantity"
- The Quantity field is highlighted as a mandatory field with invalid value
- No Material Document number is generated
- No Accounting Document is created
- No stock changes occur
- The transaction is blocked to prevent zero-quantity postings

---

### Post-conditions

- No SAP Material Document is created for this attempted transaction
- No stock changes occur (consignment or unrestricted stock)
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
