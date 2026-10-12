# TC-CS-110: Attempt to transfer consignment stock with unauthorized user access

**User Story:**          [CS-28] Transfer Consignment Stock Of A High-Value Biologic From Vendor-Owned  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management (MM)  
**Feature:**             Consignment Stock Withdrawal  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       NEGATIVE  
**Priority:**            MEDIUM  
**Severity:**            MAJOR  
**Automation Candidate:**  NO  
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has a role WITHOUT SAP authorization to post goods movements (M_MSEG_BWA for Movement Type 411 NOT granted) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available for an unauthorized user |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, batch-managed, and consignment-enabled (MARC-KZECH = 'X') |
| P4 | Master Data | Vendor `{TD.vendorCode}` exists, is active, and has consignment agreement for the material |
| P5 | Master Data | Batch `{TD.batchNumber}` exists for material `{TD.materialNumber}` and vendor `{TD.vendorCode}` with unrestricted-use status |
| P6 | Master Data | Consignment stock exists: Material `{TD.materialNumber}`, Batch `{TD.batchNumber}`, Vendor `{TD.vendorCode}`, Plant `{TD.plant}`, Storage Location `{TD.storageLocation}`, Special Stock 'K', Quantity ≥ `{TD.withdrawalQuantity}` |
| P7 | Configuration | Movement Type 411 (Consignment Withdrawal) is configured and active |
| P8 | Configuration | Automatic account determination configured for consignment liability (GBB account) and inventory consumption (BSX account) |
| P9 | Authorization | User does NOT have authorization object M_MSEG_BWA with activity 01 (Create) for Movement Type 411 |

---

### Test Data

**Dataset Reference:** `testdata/CS-28/CS-28-testdata.json` — Dataset ID: `TD-CS-028-NEG-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Unauthorized Username | `{ENV.SAP_USERNAME_UNAUTHORIZED}` | User email for unauthorized user — used for login | Valid (user exists but lacks authorization) |
| Unauthorized Password | `{ENV.SAP_PASSWORD_UNAUTHORIZED}` | Password for unauthorized user — used for login | Valid |
| Material Number | `{TD.materialNumber}` | Consignment-enabled, batch-managed high-value biologic material — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | Vendor-owned consignment batch — entered by the user | Valid |
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
| 2 | Enter the unauthorized user email address in the email field | `{ENV.SAP_USERNAME_UNAUTHORIZED}` | Unauthorized user email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the unauthorized user password in the password field | `{ENV.SAP_PASSWORD_UNAUTHORIZED}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page with application tiles is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Post Goods Movement" | — | Search results may appear, or the app may be missing from the launchpad if the user lacks access |
| 8 | Attempt to click "Post Goods Movement" from the search results (if visible) | — | If the app is visible, it attempts to open; if not visible, note that the app is not available for this user |
| 9 | Observe the system response | — | Either the app does not appear in search results, or an authorization error is displayed when attempting to open the app |
| 10 | If the app opens, in the "Movement Type" field, enter the movement type | `{TD.movementType}` | Movement Type 411 is entered (if app is accessible) |
| 11 | Press Enter to confirm the Movement Type entry | — | System accepts the movement type; additional fields become active |
| 12 | In the "Material" field, enter the material number | `{TD.materialNumber}` | Material number is entered into the field |
| 13 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is auto-populated |
| 14 | In the "Plant" field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 15 | Press Enter to confirm the Plant entry | — | Plant code is accepted; storage location field becomes active |
| 16 | In the "Storage Location" field, enter the storage location code | `{TD.storageLocation}` | Storage location code is entered |
| 17 | Press Enter to confirm the Storage Location entry | — | Storage location is accepted |
| 18 | In the "Vendor" field (special stock section), enter the vendor code | `{TD.vendorCode}` | Vendor code is entered |
| 19 | Press Enter to confirm the Vendor entry | — | SAP validates the vendor; vendor name `{TD.vendorName}` is auto-populated; special stock indicator 'K' (Consignment) is displayed |
| 20 | In the "Batch" field, enter the batch number | `{TD.batchNumber}` | Batch number is entered |
| 21 | Press Enter to confirm the Batch entry | — | SAP validates the batch; available consignment stock quantity `{TD.availableStock}` is displayed |
| 22 | In the "Quantity" field, enter the withdrawal quantity | `{TD.withdrawalQuantity}` | Withdrawal quantity is entered |
| 23 | Press Enter to confirm the Quantity entry | — | Quantity is accepted; unit of measure `{TD.uom}` is displayed |
| 24 | Click the "Post" button to attempt the goods movement | — | SAP begins authorization check for the consignment withdrawal |
| 25 | Observe the on-screen error response | — | An authorization error message is displayed indicating the user lacks authorization to post goods movements for Movement Type 411 |
| 26 | Verify the error message contains text indicating missing authorization, insufficient authorization, or user not authorized for Movement Type 411 | — | Error message pattern: "No authorization for Movement Type 411", "Insufficient authorization", "User not authorized", or similar SAP authorization message |
| 27 | Verify that no material document number is generated | — | No material document number is displayed; the posting is rejected |
| 28 | Verify the Post Goods Movement form remains in edit mode or closes with the error | — | Form remains open or closes; no posting has occurred |
| 29 | Navigate to "Display Material Document" app via search | — | Display Material Document app opens (if user has display authorization) |
| 30 | Search for any material document posted for the material and batch in the current date range | `{TD.materialNumber}`, `{TD.batchNumber}` | No material document is found for the attempted transaction |
| 31 | Navigate to "Display Stock Overview" app via search | — | Display Stock Overview app opens (if user has display authorization) |
| 32 | Filter by Material, Plant, Storage Location, Special Stock K, Vendor | `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}`, `{TD.vendorCode}` | Consignment stock is displayed |
| 33 | Verify the consignment stock balance remains unchanged | — | Consignment stock balance = Original (unchanged) |
| 34 | Filter by Material, Plant, Storage Location, Unrestricted Stock (no special stock) | `{TD.materialNumber}`, `{TD.plant}`, `{TD.storageLocation}` | Unrestricted stock is displayed |
| 35 | Verify the unrestricted stock balance remains unchanged | — | Unrestricted stock balance = Original (unchanged) |
| 36 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 37 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 38 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system detects that the user lacks authorization to post goods movements for Movement Type 411 and rejects the withdrawal posting
- An authorization error message is displayed containing text such as "No authorization for Movement Type 411", "Insufficient authorization", or "User not authorized"
- No Material Document number is generated
- No Accounting Document is created
- Consignment stock balance remains unchanged
- Unrestricted stock balance remains unchanged
- The transaction is blocked to prevent unauthorized consignment stock transfers

---

### Post-conditions

- No SAP Material Document is created for this attempted transaction
- Consignment stock balance remains unchanged
- Unrestricted stock balance remains unchanged
- No accounting document or vendor liability posting is created
- The unauthorized user is blocked from executing consignment stock withdrawals

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
