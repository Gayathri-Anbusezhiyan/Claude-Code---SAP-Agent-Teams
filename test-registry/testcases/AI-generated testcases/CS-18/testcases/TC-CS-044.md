# TC-CS-044: Attempt to Post Goods Receipt with Manufacturing Date in the Future

**User Story:**          [CS-18] Receive Materials Into Batch-Managed Stock And Capture The Manufacturi
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch-Managed Goods Receipt with Manufacturing Date Validation
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
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to post goods receipts |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Purchase Order `{TD.poNumber}` exists with status Open; PO contains batch-managed material line item |
| P4 | Master Data | Material `{TD.materialId}` is created, released, batch-managed, and configured for plant `{TD.plant}` |
| P5 | Test Condition | Manufacturing Date `{TD.futureMfgDate}` is a date in the future (invalid per AC-2) |
| P6 | Configuration | Storage location `{TD.storageLocation}` is active and assigned to plant `{TD.plant}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-18/CS-18-testdata.json` — Dataset ID: `TD-CS-18-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Purchase Order Number | `{TD.poNumber}` | Existing open PO — entered by the user | Valid |
| PO Item Number | `{TD.poItem}` | Item line number — entered by the user | Valid |
| Material ID | `{TD.materialId}` | Batch-managed material — entered by the user | Valid |
| Batch Number | `{TD.batchNumber}` | New batch ID — entered by the user | Valid |
| Quantity | `{TD.quantity}` | Quantity to receive — entered by the user | Valid |
| Manufacturing Date | `{TD.futureMfgDate}` | Date in the future (invalid) — entered by the user | Invalid |
| Expiration Date | `{TD.expirationDate}` | Valid future expiration date — entered by the user | Valid |
| Vendor Batch Number | `{TD.vendorBatch}` | Vendor batch ID — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant — verified | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location — entered by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to SAP Fiori Launchpad | `{ENV.SAP_FIORI_URL}` | Login page displayed |
| 2 | Enter email | `{ENV.SAP_USERNAME}` | Email entered |
| 3 | Click "Continue" | — | Password screen appears |
| 4 | Enter password | `{ENV.SAP_PASSWORD}` | Password entered |
| 5 | Click "Continue" | — | Authenticated; Launchpad loads |
| 6 | Close pop-up if present | — | Home page visible |
| 7 | Search for "Post Goods Receipt" | — | App listed in results |
| 8 | Click "Post Goods Receipt" | — | App opens |
| 9 | Enter PO number | `{TD.poNumber}` | PO entered |
| 10 | Press Enter | — | PO loaded; line items displayed |
| 11 | Select PO item | `{TD.poItem}` | Item selected |
| 12 | Verify Material | `{TD.materialId}` | Material shown; description auto-populated |
| 13 | Enter Quantity | `{TD.quantity}` | Quantity entered |
| 14 | Press Enter | — | Quantity confirmed |
| 15 | Enter Batch | `{TD.batchNumber}` | Batch entered |
| 16 | Press Enter | — | Batch accepted |
| 17 | Enter Manufacturing Date (future date) | `{TD.futureMfgDate}` | Future manufacturing date entered |
| 18 | Press Enter | — | SAP detects invalid manufacturing date (future date not allowed); error message displayed indicating manufacturing date cannot be in the future |
| 19 | Enter Expiration Date | `{TD.expirationDate}` | Expiration date entered |
| 20 | Press Enter | — | Expiration date confirmed |
| 21 | Enter Vendor Batch | `{TD.vendorBatch}` | Vendor batch entered |
| 22 | Verify Plant | `{TD.plant}` | Plant correct |
| 23 | Enter Storage Location | `{TD.storageLocation}` | Storage location entered |
| 24 | Click "Post" | — | SAP prevents posting; error confirms manufacturing date must be today or earlier; no Material Document created |
| 25 | Observe error | — | Error message clear |
| 26 | Verify no document | — | No document number |
| 27 | Click Profile icon | — | Menu appears |
| 28 | Click "Sign Out" | — | Sign out dialog |
| 29 | Click "OK" | — | Signed out; login page shown |

---

### Expected Final Result

- SAP detects that the manufacturing date is in the future and prevents posting per AC-2
- Error message indicates manufacturing date must be today or in the past
- No Material Document generated
- No Goods Receipt created
- No batch master record created
- Inventory unchanged

---

### Post-conditions

- No Material Document exists
- No batch record created
- Material inventory unchanged
- User notified of error

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
