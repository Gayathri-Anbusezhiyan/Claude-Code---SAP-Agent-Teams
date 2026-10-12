# TC-CS-114: Attempt to transfer consignment stock with missing mandatory field (Storage Location)

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
| P6 | Configuration | Movement Type 411 (Consignment Withdrawal) is configured and active |
| P7 | Configuration | Automatic account determination configured for consignment liability (GBB account) and inventory consumption (BSX account) |

---

### Test Data

**Dataset Reference:** `testdata/CS-28/CS-28-testdata.json` — Dataset ID: `TD-CS-028-ERR-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Consignment-enabled, batch-managed high-value biologic material — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Vendor-owned consignment batch — entered by the user | Valid |
| Vendor Code | `{TD.vendorCode}` | Consignment vendor account — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Storage Location | — | Storage Location field left blank (missing mandatory field) — NOT entered by the user | Invalid (missing) |
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
| 15 | Leave the "Storage Location" field blank (do not enter any value) | — | Storage Location field remains empty |
| 16 | In the "Vendor" field (special stock section), enter the vendor code | `{TD.vendorCode}` | Vendor code is entered |
| 17 | Press Enter to confirm the Vendor entry | — | SAP validates the vendor; vendor name `{TD.vendorName}` is auto-populated; special stock indicator 'K' (Consignment) is displayed |
| 18 | In the "Batch" field, enter the batch number | `{TD.batchNumber}` | Batch number is entered |
| 19 | Press Enter to confirm the Batch entry | — | SAP may reject batch validation due to missing storage location, or accept it provisionally |
| 20 | In the "Quantity" field, enter the withdrawal quantity | `{TD.withdrawalQuantity}` | Withdrawal quantity is entered |
| 21 | Press Enter to confirm the Quantity entry | — | Quantity is accepted |
| 22 | Click the "Post" button to attempt the goods movement | — | SAP begins validation of the consignment withdrawal |
| 23 | Observe the on-screen error response | — | An error message is displayed indicating the Storage Location field is mandatory and must be filled |
| 24 | Verify the error message contains text indicating Storage Location is a mandatory field, Storage Location must be entered, or Storage Location is required | — | Error message pattern: "Storage Location is a required field", "Enter Storage Location", "Storage Location is mandatory", or similar SAP message |
| 25 | Verify that the "Storage Location" field is highlighted as a mandatory field with missing value | — | Storage Location field is highlighted (red border or error indicator); field-level error message may appear |
| 26 | Verify that no material document number is generated | — | No material document number is displayed; the posting is rejected |
| 27 | Verify the Post Goods Movement form remains in edit mode with the entered data | — | Form remains open with entered values; no posting has occurred |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system detects the missing Storage Location field and rejects the withdrawal posting
- An error message is displayed containing text such as "Storage Location is a required field", "Enter Storage Location", or "Storage Location is mandatory"
- The Storage Location field is highlighted as a mandatory field with missing value
- No Material Document number is generated
- No Accounting Document is created
- No stock changes occur
- The transaction is blocked to prevent postings with incomplete storage location data

---

### Post-conditions

- No SAP Material Document is created for this attempted transaction
- No stock changes occur (consignment or unrestricted stock)
- No accounting document or vendor liability posting is created
- The Post Goods Movement form remains open with the entered data, allowing the user to fill in the missing Storage Location field

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
