# TC-CS-115: Attempt to transfer consignment stock from expired batch

**User Story:**          [CS-28] Transfer Consignment Stock Of A High-Value Biologic From Vendor-Owned  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management (MM)  
**Feature:**             Consignment Stock Withdrawal  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       EDGE_CASE  
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
| P5 | Master Data | Batch `{TD.batchNumberExpired}` exists for material `{TD.materialNumber}` and vendor `{TD.vendorCode}` with expired shelf-life expiration date (SLED/BBD date in the past) |
| P6 | Master Data | Consignment stock exists: Material `{TD.materialNumber}`, Batch `{TD.batchNumberExpired}`, Vendor `{TD.vendorCode}`, Plant `{TD.plant}`, Storage Location `{TD.storageLocation}`, Special Stock 'K', Quantity ≥ `{TD.withdrawalQuantity}` |
| P7 | Configuration | Movement Type 411 (Consignment Withdrawal) is configured and active |
| P8 | Configuration | Batch expiry validation is active for the material (shelf-life expiration date check enabled) |
| P9 | Configuration | Automatic account determination configured for consignment liability (GBB account) and inventory consumption (BSX account) |

---

### Test Data

**Dataset Reference:** `testdata/CS-28/CS-28-testdata.json` — Dataset ID: `TD-CS-028-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Consignment-enabled, batch-managed high-value biologic material — entered by the user | Valid |
| Batch Number (Expired) | `{TD.batchNumberExpired}` | Vendor-owned consignment batch with past expiry date — entered by the user | Invalid (expired) |
| Batch Expiry Date | `{TD.batchExpiryDatePast}` | Shelf-life expiration date in the past (e.g., 30 days ago) | Invalid (expired) |
| Vendor Code | `{TD.vendorCode}` | Consignment vendor account — entered by the user | Valid |
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
| 17 | In the "Vendor" field (special stock section), enter the vendor code | `{TD.vendorCode}` | Vendor code is entered |
| 18 | Press Enter to confirm the Vendor entry | — | SAP validates the vendor; vendor name `{TD.vendorName}` is auto-populated; special stock indicator 'K' (Consignment) is displayed |
| 19 | In the "Batch" field, enter the expired batch number | `{TD.batchNumberExpired}` | Expired batch number is entered |
| 20 | Press Enter to confirm the Batch entry | — | SAP validates the batch; available consignment stock quantity may be displayed, but batch expiry date is flagged as past |
| 21 | Observe any warning or error messages after batch confirmation | — | System may display a warning or error indicating batch has expired (expiry date = `{TD.batchExpiryDatePast}`) |
| 22 | In the "Quantity" field, enter the withdrawal quantity | `{TD.withdrawalQuantity}` | Withdrawal quantity is entered |
| 23 | Press Enter to confirm the Quantity entry | — | Quantity is accepted |
| 24 | Click the "Post" button to attempt the goods movement | — | SAP begins validation of the consignment withdrawal |
| 25 | Observe the on-screen error response | — | An error message is displayed indicating the batch has expired or shelf-life expiration date has passed |
| 26 | Verify the error message contains text indicating batch expired, shelf-life expired, or batch not valid for withdrawal due to expiry | — | Error message pattern: "Batch has expired", "Shelf-life expiration date exceeded", "Batch not valid for withdrawal", or similar SAP message |
| 27 | Verify that no material document number is generated | — | No material document number is displayed; the posting is rejected |
| 28 | Verify the Post Goods Movement form remains in edit mode with the entered data | — | Form remains open with entered values; no posting has occurred |
| 29 | Navigate to "Display Batch" app via search | — | Display Batch app opens |
| 30 | Enter the material number and expired batch number | `{TD.materialNumber}`, `{TD.batchNumberExpired}` | Batch details are displayed |
| 31 | Verify the batch shows an expiry date in the past | `{TD.batchExpiryDatePast}` | Shelf-life expiration date (SLED) = past date (expired) |
| 32 | Verify the batch status or restriction indicator shows the batch is expired or restricted | — | Batch status or indicator shows expired or restricted status |
| 33 | Navigate to "Display Stock Overview" app via search | — | Display Stock Overview app opens |
| 34 | Filter by Material, Plant, Storage Location, Special Stock K, Vendor, Batch | `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.vendorCode}`, `{TD.batchNumberExpired}` | Consignment stock for the expired batch is displayed |
| 35 | Verify the consignment stock balance remains unchanged (posting was blocked) | — | Consignment stock balance = Original (unchanged) |
| 36 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 37 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 38 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system detects the expired batch and rejects the withdrawal posting
- An error message is displayed containing text such as "Batch has expired", "Shelf-life expiration date exceeded", or "Batch not valid for withdrawal"
- No Material Document number is generated
- No Accounting Document is created
- Consignment stock balance remains unchanged
- The transaction is blocked to prevent use of expired biologic material, ensuring regulatory compliance (FDA 21 CFR Part 11 batch traceability and quality control)
- Batch traceability integrity is maintained by blocking expired batches from entering the production/distribution chain

---

### Post-conditions

- No SAP Material Document is created for this attempted transaction
- Consignment stock balance remains unchanged
- No accounting document or vendor liability posting is created
- The expired batch remains in consignment stock (Special Stock K) and is flagged as unusable
- The Post Goods Movement form remains open with the entered data, allowing the user to select a different batch

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
