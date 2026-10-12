# TC-CS-052: Verify Batch Classification Data Visible in Display Batch App

**User Story:**          [CS-18] Receive Materials Into Batch-Managed Stock And Capture The Manufacturi
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch Traceability and Display Batch Integration
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | Warehouse Operator with authorization to post GR and view batch master data |
| P2 | System Access | SAP Fiori Launchpad accessible at `{ENV.SAP_FIORI_URL}` |
| P3 | Master Data | PO `{TD.poNumber}` exists with batch-managed material |
| P4 | Master Data | Material `{TD.materialId}` is batch-managed |
| P5 | Test Objective | Verify that batch classification data captured during GR posting is correctly stored and visible in the "Display Batch" app per AC-6 |

---

### Test Data

**Dataset Reference:** `testdata/CS-18/CS-18-testdata.json` — Dataset ID: `TD-CS-18-INT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PO Number | `{TD.poNumber}` | Valid PO | Valid |
| PO Item | `{TD.poItem}` | Valid item | Valid |
| Material | `{TD.materialId}` | Batch-managed material | Valid |
| Batch | `{TD.batchNumber}` | New batch ID | Valid |
| Quantity | `{TD.quantity}` | Valid quantity | Valid |
| Manufacturing Date | `{TD.manufacturingDate}` | Valid mfg date | Valid |
| Expiration Date | `{TD.expirationDate}` | Valid expiration date | Valid |
| Vendor Batch | `{TD.vendorBatch}` | Vendor batch identifier | Valid |
| Plant | `{TD.plant}` | Valid plant | Valid |
| Storage Location | `{TD.storageLocation}` | Valid storage location | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to SAP Fiori Launchpad | `{ENV.SAP_FIORI_URL}` | Login page displayed |
| 2 | Enter email | `{ENV.SAP_USERNAME}` | Email entered |
| 3 | Click "Continue" | — | Password screen |
| 4 | Enter password | `{ENV.SAP_PASSWORD}` | Password entered |
| 5 | Click "Continue" | — | Authenticated; home page loads |
| 6 | Close pop-up if present | — | Home visible |
| 7 | Search "Post Goods Receipt" | — | App listed |
| 8 | Click app | — | App opens |
| 9 | Enter PO | `{TD.poNumber}` | PO entered |
| 10 | Press Enter | — | PO loaded; items shown |
| 11 | Select item | `{TD.poItem}` | Item selected |
| 12 | Verify Material | `{TD.materialId}` | Material shown; description populated |
| 13 | Enter Quantity | `{TD.quantity}` | Quantity entered |
| 14 | Press Enter | — | Quantity confirmed |
| 15 | Enter Batch | `{TD.batchNumber}` | Batch entered |
| 16 | Press Enter | — | Batch accepted |
| 17 | Enter Mfg Date | `{TD.manufacturingDate}` | Mfg date entered |
| 18 | Press Enter | — | Mfg date confirmed |
| 19 | Enter Expiration Date | `{TD.expirationDate}` | Expiration date entered |
| 20 | Press Enter | — | Expiration confirmed |
| 21 | Enter Vendor Batch | `{TD.vendorBatch}` | Vendor batch entered |
| 22 | Verify Plant | `{TD.plant}` | Plant correct |
| 23 | Enter Storage Location | `{TD.storageLocation}` | Storage location entered |
| 24 | Click "Post" | — | GR posted; Material Document generated |
| 25 | Note document number | — | Document number displayed |
| 26 | Search "Display Batch" | — | "Display Batch" app listed |
| 27 | Click "Display Batch" | — | App opens |
| 28 | Enter Batch | `{TD.batchNumber}` | Batch entered |
| 29 | Enter Material | `{TD.materialId}` | Material entered |
| 30 | Click "Display" or "Search" | — | Batch master record retrieved |
| 31 | Verify Manufacturing Date | `{TD.manufacturingDate}` | Mfg date matches captured value |
| 32 | Verify Expiration Date | `{TD.expirationDate}` | Expiration date matches captured value |
| 33 | Verify Vendor Batch | `{TD.vendorBatch}` | Vendor batch matches captured value |
| 34 | Verify batch is associated with correct Material and Plant | `{TD.materialId}`, `{TD.plant}` | Material and Plant shown correctly |
| 35 | Verify batch classification data is complete and accurate for downstream traceability | — | All batch classification fields (mfg date, exp date, vendor batch) are visible, accurate, and available for FEFO logic and traceability per AC-6 |
| 36 | Click Profile icon | — | Menu appears |
| 37 | Click "Sign Out" | — | Sign out dialog |
| 38 | Click "OK" | — | Signed out; login page |

---

### Expected Final Result

- Batch master record is successfully created during GR posting
- All batch classification data (Manufacturing Date, Expiration Date, Vendor Batch) is accurately stored in the batch master
- The "Display Batch" app successfully retrieves and displays the batch classification data per AC-6
- Batch data is complete and available for downstream traceability and FEFO (First-Expiry-First-Out) logic
- Integration between "Post Goods Receipt" and "Display Batch" apps is confirmed

---

### Post-conditions

- Material Document exists
- Batch master record exists with complete classification data
- Batch data is visible and accessible for downstream processes (FEFO, traceability, recall management)

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
