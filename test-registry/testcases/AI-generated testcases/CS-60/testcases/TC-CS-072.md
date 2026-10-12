# TC-CS-072: Calibration Date in Equipment Master Propagates to Work Center Master (PM to PP Integration)

**User Story:**          [CS-60] Maintain A Resource/Work Center Master For Validated Production Equipm
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP) with Plant Maintenance (PM) Integration
**Feature:**             Work Center Master with Calibration/Qualification Tracking
**Test Type:**           INTEGRATION
**Scenario Type:**       INTEGRATION
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Maintenance Planner with SAP authorization to access Equipment Master (PM) and Work Center Master (PP) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Equipment `{TD.equipmentNumber}` exists in Equipment Master (PM module) with calibration expiration date `{TD.equipmentCalibrationDate}` |
| P4 | Master Data | Plant `{TD.plant}` exists and is active |
| P5 | Configuration | Integration between PM Equipment Master and PP Work Center Master is enabled (calibration date synchronization) |

---

### Test Data

**Dataset Reference:** `testdata/CS-60/CS-60-testdata.json` — Dataset ID: `TD-CS-060-INT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Equipment Number | `{TD.equipmentNumber}` | Equipment Master record number (PM module) — entered by the user | Valid |
| Equipment Calibration Date | `{TD.equipmentCalibrationDate}` | Calibration date in Equipment Master (PM) | Valid (future date) |
| Work Center ID | `{TD.workCenterId}` | Work Center to be linked to Equipment — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code where Equipment and Work Center are located | Valid |
| Work Center Category | `{TD.workCenterCategory}` | Category code (e.g., 0001 for Machine) — selected by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Equipment" or "Equipment Master" | — | Search results appear listing the "Manage Equipment" application (PM module) |
| 8 | Click "Manage Equipment" from the search results | — | Manage Equipment application opens with the list view |
| 9 | In the Equipment search filter field, enter the Equipment Number | `{TD.equipmentNumber}` | Equipment Number is entered into the filter field |
| 10 | Press Enter to execute the search | — | Filter is applied; the target Equipment appears in the list |
| 11 | Click on the Equipment Number in the list to open the record | `{TD.equipmentNumber}` | Equipment detail view opens |
| 12 | Navigate to the "Calibration" or "Technical Data" tab or section | — | Calibration fields are displayed |
| 13 | Verify the "Next Calibration Due" date in Equipment Master | — | Calibration expiration date `{TD.equipmentCalibrationDate}` is displayed (future date) |
| 14 | Note the Equipment calibration expiration date for comparison | `{TD.equipmentCalibrationDate}` | Calibration date is noted (e.g., "2026-12-31") |
| 15 | Click the search icon and type "Manage Work Centers" | — | Search results appear listing the "Manage Work Centers" application (PP module) |
| 16 | Click "Manage Work Centers" from the search results | — | Manage Work Centers application opens with the list view |
| 17 | Click the "Create" button in the application toolbar | — | New Work Center creation form opens in edit mode |
| 18 | In the "Work Center" field, enter the Work Center ID | `{TD.workCenterId}` | Work Center ID value is entered into the field |
| 19 | Press Enter to confirm the Work Center ID entry | — | Work Center ID is confirmed; cursor moves to next field |
| 20 | In the "Plant" field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 21 | Press Enter to confirm the Plant entry | — | SAP validates the plant; organizational data is auto-populated |
| 22 | In the "Category" dropdown, select the Work Center Category | `{TD.workCenterCategory}` | Work Center Category is selected; category-specific fields appear |
| 23 | In the "Equipment" field, enter the Equipment Number (linking to PM Equipment Master) | `{TD.equipmentNumber}` | Equipment Number is entered into the field |
| 24 | Press Enter to confirm the Equipment Number entry | — | SAP validates the equipment; Equipment Description is auto-populated; PM-PP integration triggers calibration date propagation |
| 25 | Navigate to the "Calibration/Qualification" tab or section | — | Calibration fields are displayed |
| 26 | Verify the "Next Calibration Due" date in Work Center Master | — | Calibration expiration date is automatically populated with `{TD.equipmentCalibrationDate}` (propagated from PM Equipment Master) |
| 27 | Verify that the calibration date in Work Center matches the Equipment Master calibration date | — | Work Center calibration date = `{TD.equipmentCalibrationDate}` (PM-PP integration successful) |
| 28 | Click the "Save" button in the toolbar | — | SAP processes the Work Center creation with integrated calibration data |
| 29 | Observe the on-screen confirmation response | — | A success message is displayed: "Work Center `{TD.workCenterId}` created successfully" |
| 30 | Navigate back to the Work Centers list | — | Work Centers list is displayed |
| 31 | Search for the newly created Work Center using the Work Center ID | `{TD.workCenterId}` | The created Work Center appears in the list with Calibration Status "Valid" and calibration date matching Equipment Master |
| 32 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 33 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 34 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Calibration expiration date from Equipment Master (PM module) `{TD.equipmentCalibrationDate}` is successfully propagated to Work Center Master (PP module)
- Work Center `{TD.workCenterId}` calibration date matches the Equipment `{TD.equipmentNumber}` calibration date (PM-PP integration confirmed)
- Cross-module integration ensures data consistency: one source of truth for calibration dates (Equipment Master)
- Work Center is flagged as eligible for capacity planning with calibration status "Valid" (inherited from Equipment Master)
- System log entry is created recording the Work Center creation and PM-PP integration (audit trail)

---

### Post-conditions

- SAP Work Center Master record exists with ID `{TD.workCenterId}` linked to Equipment `{TD.equipmentNumber}`
- Work Center calibration expiration date is synchronized with Equipment Master calibration date
- Any future updates to Equipment Master calibration date should propagate to linked Work Centers (data consistency maintained)

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
