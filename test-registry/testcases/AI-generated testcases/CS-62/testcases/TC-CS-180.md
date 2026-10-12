# TC-CS-180: Verify QM Inspection Lot Status Unaffected by TECO (QM Integration)

**User Story:**          [CS-62] Technically Complete A Process Order Only After All Mandatory Quality
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control (PP) — Integration with Quality Management (QM)
**Feature:**             Process Order Technical Completion (TECO) and QM Inspection Lot Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to execute Technical Completion (TECO) for process orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Process Order | Process order `{TD.processOrderNumberIntInspLot}` exists in SAP with status Released (REL) and all quality requirements are met |
| P4 | QM Inspection Lot | QM inspection lot `{TD.inspectionLotNumber}` exists for batch `{TD.batchNumberInspLot}` produced by the process order |
| P5 | Inspection Lot Status | Inspection lot `{TD.inspectionLotNumber}` has status "CRTD" (Created) or "REL" (Released) — QA decision is pending |
| P6 | Quality Requirements | All deviations closed, all IPC results recorded, all batch records signed |
| P7 | Stock Status | Finished goods batch exists with stock status "Quality Inspection" (QI) |

---

### Test Data

**Dataset Reference:** `testdata/CS-62/CS-62-testdata.json` — Dataset ID: `TD-CS-062-INT-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumberIntInspLot}` | Process order for QM inspection lot integration test — entered by the user | Valid |
| Batch Number | `{TD.batchNumberInspLot}` | Finished goods batch produced by the process order | Valid |
| Inspection Lot Number | `{TD.inspectionLotNumber}` | QM inspection lot number linked to the batch | Valid |
| Material ID | `{TD.materialIdInspLot}` | Material master for the batch | Valid |
| Plant | `{TD.plantInspLot}` | Production plant | Valid |
| Inspection Lot Status Before TECO | `{TD.inspLotStatusBeforeTECO}` | Expected inspection lot status before TECO (e.g., "CRTD" or "REL") | Valid |
| Inspection Lot Status After TECO | `{TD.inspLotStatusAfterTECO}` | Expected inspection lot status after TECO (must remain unchanged) | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Inspection Lots" or "QM Inspection Lot" | — | Search results appear listing the QM Inspection Lot application |
| 8 | Click "Manage Inspection Lots" or equivalent QM application from the search results | — | QM Inspection Lot application opens |
| 9 | Search for inspection lot `{TD.inspectionLotNumber}` linked to batch `{TD.batchNumberInspLot}` | `{TD.inspectionLotNumber}`, `{TD.batchNumberInspLot}`, `{TD.materialIdInspLot}`, `{TD.plantInspLot}` | Inspection lot is found in the list |
| 10 | Verify the inspection lot status is "CRTD" (Created) or "REL" (Released) BEFORE TECO | `{TD.inspLotStatusBeforeTECO}` | Inspection lot status shows as "CRTD" or "REL" — QA decision is pending; lot has NOT been usage-decided |
| 11 | Note the inspection lot status and usage decision for verification after TECO | — | Inspection lot status is recorded for later comparison |
| 12 | Navigate to the Confirm Process Order application (via search bar) | — | Confirm Process Order application opens |
| 13 | In the "Order" field, enter the Process Order Number | `{TD.processOrderNumberIntInspLot}` | Process Order Number is entered into the field |
| 14 | Press Enter to confirm the Order entry | — | SAP loads the process order details; order header information is displayed |
| 15 | Verify the order status is "Released" (REL) | — | Order status shows as Released (REL) |
| 16 | Navigate to the Technical Completion action in the application toolbar or menu | — | Technical Completion (TECO) button or menu option is visible and enabled |
| 17 | Click the "Technical Completion" (TECO) button | — | SAP begins pre-completion validation checks |
| 18 | Verify no blocking validation messages appear | — | All quality gates pass; no errors are displayed |
| 19 | Confirm the Technical Completion action in the confirmation dialog (if prompted) | — | TECO action is submitted to SAP |
| 20 | Observe the success confirmation message | — | Success message is displayed: "Order `{TD.processOrderNumberIntInspLot}` technically completed" or similar |
| 21 | Verify the order status is updated to "Technically Completed" (TECO) | — | Order status shows "TECO" (Technically Completed) |
| 22 | Navigate back to the QM Inspection Lot application (via search bar) | — | QM Inspection Lot application opens |
| 23 | Search for inspection lot `{TD.inspectionLotNumber}` | `{TD.inspectionLotNumber}`, `{TD.batchNumberInspLot}` | Inspection lot is found in the list |
| 24 | Verify the inspection lot status REMAINS "CRTD" or "REL" AFTER TECO (unchanged) | `{TD.inspLotStatusAfterTECO}` | Inspection lot status STILL shows "CRTD" or "REL"; status has NOT changed to "UDEC" (Usage Decision Made) after TECO |
| 25 | Verify the inspection lot usage decision field remains blank or pending | — | Usage decision field shows as blank or "Pending" — TECO does NOT trigger automatic QA release or usage decision |
| 26 | Verify the inspection lot is still linked to batch `{TD.batchNumberInspLot}` with stock status "QI" | `{TD.batchNumberInspLot}` | Inspection lot remains linked to the batch; batch stock status is "QI" (Quality Inspection) — integration between PP (TECO), QM (Inspection Lot), and MM (Stock Status) is correct |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Process order `{TD.processOrderNumberIntInspLot}` is technically completed successfully (TECO status)
- QM inspection lot `{TD.inspectionLotNumber}` status REMAINS "CRTD" (Created) or "REL" (Released) after TECO — status is unaffected by TECO
- Inspection lot usage decision remains pending (NOT auto-decided)
- QA release process is independent of TECO — TECO does NOT trigger automatic QA release or inspection lot usage decision
- Stock status for batch `{TD.batchNumberInspLot}` remains "Quality Inspection" (QI) — consistent with pending inspection lot
- Integration between PP (Process Order TECO), QM (Inspection Lot Management), and MM (Stock Status) is correct: TECO and QA release are separate, independent processes

---

### Post-conditions

- Process order status is "TECO" (Technically Completed)
- QM inspection lot status remains "CRTD" or "REL" (unchanged — awaiting QA decision)
- Inspection lot usage decision remains pending
- Stock status for batch remains "QI" (Quality Inspection)
- QA release process can now proceed independently to usage-decide the inspection lot and release stock from QI to UR

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
