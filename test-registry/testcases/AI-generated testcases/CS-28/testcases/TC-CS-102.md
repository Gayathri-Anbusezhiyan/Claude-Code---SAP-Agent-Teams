# TC-CS-102: Transfer partial consignment stock quantity (less than available stock)

**User Story:**          [CS-28] Transfer Consignment Stock Of A High-Value Biologic From Vendor-Owned  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management (MM)  
**Feature:**             Consignment Stock Withdrawal  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       ALTERNATIVE_PATH  
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
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, batch-managed, and consignment-enabled |
| P4 | Master Data | Vendor `{TD.vendorCode}` exists, is active, and has consignment agreement for the material |
| P5 | Master Data | Batch `{TD.batchNumber}` exists for material and vendor with unrestricted-use status |
| P6 | Master Data | Consignment stock exists: Material `{TD.materialNumber}`, Batch `{TD.batchNumber}`, Vendor `{TD.vendorCode}`, Plant `{TD.plant}`, Storage Location `{TD.storageLocation}`, Special Stock 'K', Quantity = `{TD.availableStock}` where `{TD.availableStock}` > `{TD.partialQuantity}` |
| P7 | Configuration | Movement Type 411 is configured and active |

---

### Test Data

**Dataset Reference:** `testdata/CS-28/CS-28-testdata.json` — Dataset ID: `TD-CS-028-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Consignment-enabled material — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Vendor-owned consignment batch — entered by the user | Valid |
| Vendor Code | `{TD.vendorCode}` | Consignment vendor account — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location within plant — entered by the user | Valid |
| Partial Withdrawal Quantity | `{TD.partialQuantity}` | Quantity less than available stock (e.g., 50% of available) — entered by the user | Valid |
| Available Stock | `{TD.availableStock}` | Total consignment stock available before withdrawal — for verification | Valid |
| Movement Type | `{TD.movementType}` | Fixed value 411 — system default | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page is fully visible |
| 7 | Click the search icon and type "Post Goods Movement" | — | Search results appear |
| 8 | Click "Post Goods Movement" from the search results | — | Post Goods Movement application opens |
| 9 | Enter Movement Type 411 | `{TD.movementType}` | Movement Type 411 is entered |
| 10 | Press Enter to confirm | — | Movement type accepted |
| 11 | Enter the material number | `{TD.materialNumber}` | Material number is entered |
| 12 | Press Enter to confirm | — | Material description `{TD.materialDesc}` is auto-populated |
| 13 | Enter the plant code | `{TD.plant}` | Plant code is entered |
| 14 | Press Enter to confirm | — | Plant accepted |
| 15 | Enter the storage location code | `{TD.storageLocation}` | Storage location entered |
| 16 | Press Enter to confirm | — | Storage location accepted |
| 17 | Enter the vendor code | `{TD.vendorCode}` | Vendor code entered |
| 18 | Press Enter to confirm | — | Vendor name `{TD.vendorName}` auto-populated; Special Stock 'K' displayed |
| 19 | Enter the batch number | `{TD.batchNumber}` | Batch number entered |
| 20 | Press Enter to confirm | — | Available consignment stock quantity `{TD.availableStock}` is displayed |
| 21 | Verify that the available stock quantity is greater than the partial quantity to be withdrawn | `{TD.availableStock}` > `{TD.partialQuantity}` | Available stock is sufficient for partial withdrawal |
| 22 | Enter the partial withdrawal quantity (less than available stock) | `{TD.partialQuantity}` | Partial withdrawal quantity entered |
| 23 | Press Enter to confirm | — | Quantity accepted; UoM displayed |
| 24 | Click the "Post" button | — | SAP processes the consignment withdrawal |
| 25 | Observe the confirmation message | — | Success message with material document number is displayed |
| 26 | Note the material document number | — | Material document number noted |
| 27 | Navigate to "Display Stock Overview" via search | — | Stock Overview app opens |
| 28 | Filter by Material, Plant, Storage Location, Special Stock K, Vendor | `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.vendorCode}` | Consignment stock displayed |
| 29 | Verify consignment stock balance has been reduced by partial quantity | — | Consignment stock balance = `{TD.availableStock}` - `{TD.partialQuantity}` |
| 30 | Verify that remaining consignment stock still exists (balance > 0) | — | Remaining consignment stock balance > 0 (not fully depleted) |
| 31 | Filter by Material, Plant, Storage Location, Unrestricted Stock | `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}` | Unrestricted stock displayed |
| 32 | Verify unrestricted stock increased by partial quantity | — | Unrestricted stock balance = Original + `{TD.partialQuantity}` |
| 33 | Navigate to "Display Accounting Document" via search | — | Accounting Document app opens |
| 34 | Search for accounting document by material document number | — | Accounting document displayed |
| 35 | Verify liability posting is ONLY for the partial quantity withdrawn (not full stock) | `{TD.partialQuantity}` × `{TD.price}` | Vendor liability = partial quantity × price (not full available stock × price) |
| 36 | Click the User Profile icon | — | User profile menu appears |
| 37 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 38 | In the Sign Out dialog, click "OK" | — | User signed out; login page displayed |

---

### Expected Final Result

- Material Document is generated for partial withdrawal quantity only
- Consignment stock (Special Stock K) is reduced by the partial quantity, NOT fully depleted
- Remaining consignment stock continues to exist as vendor-owned (Special Stock K)
- Unrestricted stock (company-owned) is increased by the partial quantity only
- Vendor liability is posted ONLY for the partial quantity withdrawn (price × partial quantity)
- The partial withdrawal does not affect the remaining consignment stock's vendor ownership

---

### Post-conditions

- Material document exists with Movement Type 411 for partial quantity
- Consignment stock balance > 0 (remaining stock still vendor-owned)
- Unrestricted stock increased by partial quantity
- Accounting document posted with liability for partial quantity only
- Remaining consignment stock remains available for future withdrawals

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
