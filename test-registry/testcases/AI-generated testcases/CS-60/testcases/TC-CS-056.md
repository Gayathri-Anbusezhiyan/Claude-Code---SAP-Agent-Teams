# TC-CS-056: Verify Batch Record Captures Work Center ID and Calibration Status at Production Confirmation

**User Story:**          [CS-60] Maintain A Resource/Work Center Master For Validated Production Equipm
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Work Center Master with Calibration/Qualification Tracking
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Operator or Production Planner with SAP authorization to confirm Process Orders and view Batch Records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.workCenterId}` exists in Plant `{TD.plant}` with valid calibration status (calibration expiration date `{TD.calibrationExpirationDate}` is in the future) |
| P4 | Master Data | Equipment `{TD.equipmentNumber}` is linked to Work Center `{TD.workCenterId}` |
| P5 | Master Data | Process Order `{TD.processOrderNumber}` exists with an operation assigned to Work Center `{TD.workCenterId}` |
| P6 | Master Data | Batch `{TD.batchNumber}` is assigned to the Process Order `{TD.processOrderNumber}` |
| P7 | Configuration | QM Batch Management integration is active; batch record traceability is enabled |

---

### Test Data

**Dataset Reference:** `testdata/CS-60/CS-60-testdata.json` — Dataset ID: `TD-CS-060-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID | `{TD.workCenterId}` | Work Center used for production operation | Valid |
| Plant | `{TD.plant}` | Plant code where production occurs | Valid |
| Equipment Number | `{TD.equipmentNumber}` | Equipment linked to Work Center | Valid |
| Calibration Expiration Date | `{TD.calibrationExpirationDate}` | Calibration due date (valid/future) | Valid |
| Process Order Number | `{TD.processOrderNumber}` | Process Order to be confirmed | Valid |
| Batch Number | `{TD.batchNumber}` | Batch number for production | Valid |
| Operation Number | `{TD.operationNumber}` | Operation number assigned to Work Center | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Confirm Process Order" or "Production Confirmation" | — | Search results appear listing the Production Confirmation application |
| 8 | Click the application name from the search results | — | Production Confirmation application opens |
| 9 | In the Process Order search filter field, enter the Process Order number | `{TD.processOrderNumber}` | Process Order number is entered into the filter field |
| 10 | Press Enter to execute the search | — | Filter is applied; the target Process Order appears in the list |
| 11 | Click on the Process Order number in the list to open the confirmation screen | `{TD.processOrderNumber}` | Process Order confirmation screen opens showing operations |
| 12 | Verify the operation assigned to Work Center `{TD.workCenterId}` | `{TD.workCenterId}` | Operation `{TD.operationNumber}` is displayed with Work Center ID `{TD.workCenterId}` |
| 13 | Select the operation to be confirmed | `{TD.operationNumber}` | Operation is selected; confirmation input fields appear |
| 14 | Enter the required confirmation data (e.g., yield quantity, activity time) | — | Confirmation data is entered |
| 15 | Click the "Confirm" or "Save" button to complete the production confirmation | — | SAP processes the production confirmation |
| 16 | Observe the on-screen confirmation response | — | A success message is displayed: "Production confirmation completed for Process Order `{TD.processOrderNumber}`" |
| 17 | Navigate back to the Fiori Launchpad home | — | Fiori Launchpad home page is displayed |
| 18 | Click the search icon (top-right shell bar) and type "Manage Batch Records" or "Display Batch" | — | Search results appear listing the Batch Records application |
| 19 | Click "Manage Batch Records" or "Display Batch" from the search results | — | Batch Records application opens with the list view |
| 20 | In the Batch search filter field, enter the Batch number | `{TD.batchNumber}` | Batch number is entered into the filter field |
| 21 | Press Enter to execute the search | — | Filter is applied; the target Batch appears in the list |
| 22 | Click on the Batch number in the list to open the Batch Record | `{TD.batchNumber}` | Batch Record detail view opens displaying batch traceability information |
| 23 | Navigate to the "Equipment" or "Resources Used" tab or section | — | Equipment and Work Center usage details are displayed |
| 24 | Verify the Work Center ID is captured in the Batch Record | `{TD.workCenterId}` | Work Center ID `{TD.workCenterId}` is displayed in the Batch Record |
| 25 | Verify the Equipment Number is captured in the Batch Record | `{TD.equipmentNumber}` | Equipment Number `{TD.equipmentNumber}` is displayed in the Batch Record |
| 26 | Verify the calibration status at time of production confirmation is captured | — | Calibration Status displays "Valid" or shows the calibration expiration date `{TD.calibrationExpirationDate}` |
| 27 | Verify the timestamp of production confirmation is captured | — | Production confirmation timestamp is displayed in the Batch Record (date and time) |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Process Order `{TD.processOrderNumber}` operation is confirmed successfully using Work Center `{TD.workCenterId}`
- Batch Record for Batch `{TD.batchNumber}` is updated to include:
  - Work Center ID `{TD.workCenterId}`
  - Equipment Number `{TD.equipmentNumber}`
  - Calibration Status "Valid" (or calibration expiration date `{TD.calibrationExpirationDate}`)
  - Timestamp of production confirmation (date and time of use)
- Batch Record traceability is complete and compliant with GMP/FDA 21 CFR Part 11 requirements (electronic records with equipment calibration status)
- Audit trail entry exists documenting the equipment used and its calibration status at time of production

---

### Post-conditions

- Process Order `{TD.processOrderNumber}` status is "Confirmed" or "Partially Confirmed"
- Batch Record for Batch `{TD.batchNumber}` contains complete traceability information including Work Center, Equipment, Calibration Status, and Timestamp
- QM Batch Management system has recorded the equipment-batch linkage for regulatory compliance
- Audit log entry exists documenting the production confirmation and batch record update

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
