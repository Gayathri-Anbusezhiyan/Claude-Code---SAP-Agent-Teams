# TC-CS-109: Attempt to transfer consignment stock using material not consignment-enabled

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
| P3 | Master Data | Material `{TD.materialNumberNonConsignment}` exists, is active, batch-managed, but consignment indicator is NOT active (MARC-KZECH = blank or unchecked) |
| P4 | Master Data | Vendor `{TD.vendorCode}` exists and is active |
| P5 | Master Data | Batch `{TD.batchNumberNonConsignment}` exists for material `{TD.materialNumberNonConsignment}` (regular stock, not consignment) |
| P6 | Configuration | Movement Type 411 (Consignment Withdrawal) is configured and active |
| P7 | Configuration | Automatic account determination configured for consignment liability (GBB account) and inventory consumption (BSX account) |

---

### Test Data

**Dataset Reference:** `testdata/CS-28/CS-28-testdata.json` — Dataset ID: `TD-CS-028-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number (Non-Consignment) | `{TD.materialNumberNonConsignment}` | Batch-managed material with consignment indicator NOT active — entered by the user | Invalid (not consignment-enabled) |
| Batch Number (Non-Consignment) | `{TD.batchNumberNonConsignment}` | Batch for non-consignment material — entered by the user | Valid |
| Vendor Code | `{TD.vendorCode}` | Vendor account — entered by the user | Valid |
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
| 11 | In the "Material" field, enter the non-consignment material number | `{TD.materialNumberNonConsignment}` | Non-consignment material number is entered into the field |
| 12 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDescNonConsignment}` is auto-populated |
| 13 | In the "Plant" field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 14 | Press Enter to confirm the Plant entry | — | Plant code is accepted; storage location field becomes active |
| 15 | In the "Storage Location" field, enter the storage location code | `{TD.storageLocation}` | Storage location code is entered |
| 16 | Press Enter to confirm the Storage Location entry | — | Storage location is accepted |
| 17 | In the "Vendor" field (special stock section), enter the vendor code | `{TD.vendorCode}` | Vendor code is entered |
| 18 | Press Enter to confirm the Vendor entry | — | SAP attempts to validate the vendor; vendor name may be auto-populated |
| 19 | Observe the system response after vendor entry | — | System may display a warning or error indicating the material is not consignment-enabled, or the special stock field may not activate |
| 20 | In the "Batch" field, enter the batch number | `{TD.batchNumberNonConsignment}` | Batch number is entered |
| 21 | Press Enter to confirm the Batch entry | — | SAP attempts to validate the batch |
| 22 | In the "Quantity" field, enter the withdrawal quantity | `{TD.withdrawalQuantity}` | Withdrawal quantity is entered |
| 23 | Press Enter to confirm the Quantity entry | — | Quantity is entered into the field |
| 24 | Click the "Post" button to attempt the goods movement | — | SAP begins validation of the consignment withdrawal |
| 25 | Observe the on-screen error response | — | An error message is displayed indicating the material is not consignment-enabled or not valid for Movement Type 411 |
| 26 | Verify the error message contains text indicating material is not consignment-enabled, not configured for consignment, or not valid for Movement Type 411 | — | Error message pattern: "Material not consignment-enabled", "Movement Type 411 not allowed for this material", "Consignment not active for material", or similar SAP message |
| 27 | Verify that no material document number is generated | — | No material document number is displayed; the posting is rejected |
| 28 | Verify the Post Goods Movement form remains in edit mode with the entered data | — | Form remains open with entered values; no posting has occurred |
| 29 | Navigate to "Display Material Document" app via search | — | Display Material Document app opens |
| 30 | Search for any material document posted for the material and batch in the current date range | `{TD.materialNumberNonConsignment}`, `{TD.batchNumberNonConsignment}` | No material document is found for the attempted transaction |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system detects that the material is not consignment-enabled and rejects the withdrawal posting
- An error message is displayed containing text such as "Material not consignment-enabled", "Movement Type 411 not allowed for this material", or "Consignment not active for material"
- No Material Document number is generated
- No Accounting Document is created
- No stock changes occur
- The transaction is blocked to prevent incorrect consignment processing for non-consignment materials

---

### Post-conditions

- No SAP Material Document is created for this attempted transaction
- No stock changes occur (consignment or unrestricted stock)
- No accounting document or vendor liability posting is created
- The Post Goods Movement form remains open with the entered data, allowing the user to correct the material number

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
