# TC-CS-075: Batch Record in QM Captures Equipment ID and Calibration Status from Work Center at Production Confirmation

**User Story:**          [CS-60] Maintain A Resource/Work Center Master For Validated Production Equipm
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP) with Quality Management (QM) Integration
**Feature:**             Work Center Master with Calibration/Qualification Tracking
**Test Type:**           INTEGRATION
**Scenario Type:**       INTEGRATION
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    XLARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Operator with SAP authorization to confirm production orders and view batch records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.workCenterId}` exists in Plant `{TD.plant}` with valid calibration and linked Equipment `{TD.equipmentNumber}` |
| P4 | Master Data | Process Order `{TD.processOrderNumber}` exists with operation assigned to Work Center `{TD.workCenterId}` |
| P5 | Master Data | Batch-managed material `{TD.materialNumber}` is configured for batch traceability (QM module) |
| P6 | Configuration | Integration between PP Work Center Master and QM Batch Management is enabled (equipment and calibration status capture at production confirmation) |

---

### Test Data

**Dataset Reference:** `testdata/CS-60/CS-60-testdata.json` — Dataset ID: `TD-CS-060-INT-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Process Order to confirm production | Valid |
| Operation Number | `{TD.operationNumber}` | Operation assigned to Work Center | Valid |
| Work Center ID | `{TD.workCenterId}` | Work Center with valid calibration | Valid |
| Equipment Number | `{TD.equipmentNumber}` | Equipment linked to Work Center | Valid |
| Calibration Expiration Date | `{TD.calibrationExpirationDate}` | Valid calibration date (future date) | Valid |
| Material Number | `{TD.materialNumber}` | Batch-managed material (QM module) | Valid |
| Batch Number | `{TD.batchNumber}` | Production batch number | Valid |
| Quantity Confirmed | `{TD.quantityConfirmed}` | Quantity produced | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Confirm Production Orders" or "Production Confirmation" | — | Search results appear listing the "Confirm Production Orders" application |
| 8 | Click "Confirm Production Orders" from the search results | — | Production Confirmation application opens |
| 9 | In the Process Order search filter field, enter the Process Order number | `{TD.processOrderNumber}` | Process Order number is entered into the filter field |
| 10 | Press Enter to execute the search | — | Filter is applied; the target Process Order appears in the list |
| 11 | Click on the Process Order number in the list to open the confirmation view | `{TD.processOrderNumber}` | Production confirmation view opens with operation `{TD.operationNumber}` assigned to Work Center `{TD.workCenterId}` |
| 12 | Verify that the operation is assigned to Work Center with valid calibration | — | Operation `{TD.operationNumber}` displays Work Center `{TD.workCenterId}` with calibration status "Valid" |
| 13 | In the "Yield" or "Quantity Confirmed" field, enter the production quantity | `{TD.quantityConfirmed}` | Production quantity is entered |
| 14 | In the "Batch" field, enter or select the batch number | `{TD.batchNumber}` | Batch number is entered or selected (batch-managed material) |
| 15 | Click the "Confirm" or "Post" button to confirm production | — | SAP processes the production confirmation |
| 16 | Observe the on-screen confirmation response | — | A success message is displayed: "Production Order `{TD.processOrderNumber}` confirmed successfully" |
| 17 | Verify that the production confirmation is posted | — | Confirmation number or timestamp is displayed |
| 18 | Click the search icon and type "Manage Batch Records" or "Batch Master" | — | Search results appear listing the "Manage Batch Records" application (QM module) |
| 19 | Click "Manage Batch Records" from the search results | — | Manage Batch Records application opens with the list view (QM Batch Management) |
| 20 | In the Batch search filter field, enter the batch number | `{TD.batchNumber}` | Batch number is entered into the filter field |
| 21 | Press Enter to execute the search | — | Filter is applied; the target Batch record appears in the list |
| 22 | Click on the Batch number in the list to open the batch record detail view | `{TD.batchNumber}` | Batch record detail view opens |
| 23 | Navigate to the "Production Details" or "Equipment Traceability" tab or section | — | Production details fields are displayed |
| 24 | Verify that the batch record captures the Work Center ID used for production | — | Work Center ID `{TD.workCenterId}` is displayed in the batch record (PP-QM integration confirmed) |
| 25 | Verify that the batch record captures the Equipment Number linked to the Work Center | — | Equipment Number `{TD.equipmentNumber}` is displayed in the batch record (equipment traceability captured) |
| 26 | Verify that the batch record captures the calibration expiration date at the time of production confirmation | — | Calibration expiration date `{TD.calibrationExpirationDate}` is displayed in the batch record (calibration status captured at production confirmation timestamp) |
| 27 | Verify that the batch record captures the calibration status as "Valid" | — | Calibration status "Valid" is displayed in the batch record (regulatory compliance: only valid equipment used for production) |
| 28 | Verify that PP-QM integration successfully captured Work Center, Equipment, and calibration status at production confirmation | — | Batch record contains complete equipment traceability: Work Center ID, Equipment Number, Calibration Expiration Date, and Calibration Status at production timestamp (integration confirmed) |
| 29 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 30 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 31 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Batch record `{TD.batchNumber}` in QM module successfully captures Work Center ID `{TD.workCenterId}`, Equipment Number `{TD.equipmentNumber}`, and calibration status at production confirmation timestamp
- Calibration expiration date `{TD.calibrationExpirationDate}` is captured in the batch record (regulatory traceability)
- Calibration status "Valid" is captured in the batch record (compliance: only valid equipment used for production)
- PP-QM integration is confirmed: Production confirmation triggers batch record update with Work Center and calibration data
- System log entry is created recording the production confirmation and batch record update (audit trail)
- Regulatory compliance is maintained: every batch has complete equipment traceability including calibration status (GMP 21 CFR Part 11)

---

### Post-conditions

- QM Batch record `{TD.batchNumber}` contains Work Center ID, Equipment Number, Calibration Expiration Date, and Calibration Status
- Batch traceability is complete for regulatory audit (equipment and calibration data linked to production batch)
- Production confirmation and batch record integration is confirmed operational

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
