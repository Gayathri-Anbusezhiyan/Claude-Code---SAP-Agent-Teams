# TC-CS-188: Attempt Return Delivery with Missing Purchase Order

**User Story:**          [CS-21] Record A Return Delivery For A Rejected Batch Back To The Vendor
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Return Delivery for Rejected Batch
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to post goods movements (Return Delivery) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Configuration | "Purchase Order" is configured as a MANDATORY field for movement type 122 (Return Delivery to Vendor) |

---

### Test Data

**Dataset Reference:** `testdata/CS-21/CS-21-testdata.json` — Dataset ID: `TD-CS-021-ERR-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Purchase Order | (empty) | Left EMPTY to test mandatory field validation | Invalid (missing) |
| Batch Number | `{TD.batchNumberValid}` | Valid batch number — entered by the user | Valid |
| Material Number | `{TD.materialNumberValid}` | Valid material number — entered by the user | Valid |
| Return Quantity | `{TD.returnQuantityStandard}` | Standard return quantity — entered by the user | Valid |
| Rejection Reason Code | `{TD.rejectionReasonStandard}` | Valid rejection reason code — selected by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to SAP Fiori Launchpad | `{ENV.SAP_FIORI_URL}` | Login page is displayed |
| 2 | Enter email | `{ENV.SAP_USERNAME}` | Email is entered |
| 3 | Click "Continue" | — | Password screen is displayed |
| 4 | Enter password | `{ENV.SAP_PASSWORD}` | Password is entered |
| 5 | Click "Continue" | — | Fiori Launchpad is displayed |
| 6 | Close pop-up if present | — | Pop-up is dismissed |
| 7 | Search for "Post Goods Movement" | — | Search results appear |
| 8 | Click "Post Goods Movement" | — | Application opens |
| 9 | Enter movement type | 122 | Movement type 122 is entered |
| 10 | Press Enter | — | Movement type is confirmed |
| 11 | Leave the "Purchase Order" field EMPTY (do NOT enter any value) | (empty) | Purchase Order field remains empty |
| 12 | Attempt to enter Material number | `{TD.materialNumberValid}` | SAP may prevent entry or show warning that PO is required first |
| 13 | Attempt to enter Batch number | `{TD.batchNumberValid}` | SAP may prevent entry or show warning |
| 14 | Attempt to enter Quantity | `{TD.returnQuantityStandard}` | SAP may allow entry but will validate on Post |
| 15 | Attempt to select rejection reason | `{TD.rejectionReasonStandard}` | Selection may be allowed |
| 16 | Click "Post" | — | SAP validates mandatory fields |
| 17 | Observe error message | — | SAP displays error: "Purchase Order is required" or "Enter a Purchase Order" or "Mandatory field missing: Purchase Order" |
| 18 | Verify Purchase Order field is highlighted | — | Field is highlighted in red or marked with error indicator |
| 19 | Verify no Material Document is created | — | No document number is generated |
| 20 | Close form | — | Form is closed |
| 21 | Click User Profile icon | — | Profile menu appears |
| 22 | Click "Sign Out" | — | Sign out dialog appears |
| 23 | Click "OK" | — | User is signed out |

---

### Expected Final Result

- SAP enforces the mandatory field rule for "Purchase Order"
- SAP displays a clear error message indicating the Purchase Order field is required
- The "Purchase Order" field is highlighted as mandatory
- No Material Document is created

---

### Post-conditions

- No SAP Material Document is created
- No stock movements are recorded
- Transaction is rejected due to missing Purchase Order

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
