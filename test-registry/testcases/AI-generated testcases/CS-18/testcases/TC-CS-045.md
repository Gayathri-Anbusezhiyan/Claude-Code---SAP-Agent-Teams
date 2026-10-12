# TC-CS-045: Attempt to Post Goods Receipt with Batch Field Empty

**User Story:**          [CS-18] Receive Materials Into Batch-Managed Stock And Capture The Manufacturi
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch-Managed Goods Receipt Mandatory Field Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
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
| P4 | Master Data | Material `{TD.materialId}` is batch-managed and configured for plant `{TD.plant}` |
| P5 | Test Condition | Batch field is intentionally left empty to test mandatory field enforcement per AC-2 |
| P6 | Configuration | All OTHER mandatory fields (Manufacturing Date, Expiration Date) will be populated with valid values |

---

### Test Data

**Dataset Reference:** `testdata/CS-18/CS-18-testdata.json` — Dataset ID: `TD-CS-18-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Purchase Order Number | `{TD.poNumber}` | Existing open PO — entered | Valid |
| PO Item Number | `{TD.poItem}` | Item line number — entered | Valid |
| Material ID | `{TD.materialId}` | Batch-managed material — entered | Valid |
| Batch Number | `{TD.emptyValue}` | EMPTY (blank) — NOT entered | Invalid |
| Quantity | `{TD.quantity}` | Quantity — entered | Valid |
| Manufacturing Date | `{TD.manufacturingDate}` | Valid mfg date — entered | Valid |
| Expiration Date | `{TD.expirationDate}` | Valid expiration date — entered | Valid |
| Vendor Batch | `{TD.vendorBatch}` | Vendor batch — entered | Valid |
| Plant | `{TD.plant}` | Plant — verified | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location — entered | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to SAP Fiori Launchpad | `{ENV.SAP_FIORI_URL}` | Login page displayed |
| 2 | Enter email | `{ENV.SAP_USERNAME}` | Email entered |
| 3 | Click "Continue" | — | Password screen |
| 4 | Enter password | `{ENV.SAP_PASSWORD}` | Password entered |
| 5 | Click "Continue" | — | Authenticated; home page |
| 6 | Close pop-up if present | — | Home visible |
| 7 | Search "Post Goods Receipt" | — | App listed |
| 8 | Click app | — | App opens |
| 9 | Enter PO | `{TD.poNumber}` | PO entered |
| 10 | Press Enter | — | PO loaded; items shown |
| 11 | Select item | `{TD.poItem}` | Item selected |
| 12 | Verify Material | `{TD.materialId}` | Material shown; description populated |
| 13 | Enter Quantity | `{TD.quantity}` | Quantity entered |
| 14 | Press Enter | — | Quantity confirmed |
| 15 | Leave Batch field EMPTY (do not enter any value) | `{TD.emptyValue}` | Batch field remains blank |
| 16 | Enter Manufacturing Date | `{TD.manufacturingDate}` | Mfg date entered |
| 17 | Press Enter | — | Mfg date confirmed |
| 18 | Enter Expiration Date | `{TD.expirationDate}` | Expiration date entered |
| 19 | Press Enter | — | Expiration date confirmed |
| 20 | Enter Vendor Batch | `{TD.vendorBatch}` | Vendor batch entered |
| 21 | Verify Plant | `{TD.plant}` | Plant correct |
| 22 | Enter Storage Location | `{TD.storageLocation}` | Storage location entered |
| 23 | Click "Post" | — | SAP detects missing Batch field; error message displayed; Batch field highlighted as mandatory; posting blocked per AC-2 |
| 24 | Observe error | — | Error clearly indicates Batch is required for batch-managed material |
| 25 | Verify no document | — | No Material Document created |
| 26 | Click Profile icon | — | Menu appears |
| 27 | Click "Sign Out" | — | Sign out dialog |
| 28 | Click "OK" | — | Signed out; login page |

---

### Expected Final Result

- SAP detects that the Batch field is empty and prevents posting per AC-2
- Error message indicates Batch Number is mandatory for batch-managed materials
- Batch field is highlighted as required
- No Material Document generated
- No Goods Receipt created
- No batch master record created

---

### Post-conditions

- No Material Document exists
- No batch record created
- Inventory unchanged
- User notified of mandatory field error

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
