# TC-CS-066: Missing Equipment Number When Calibration Tracking Required

**User Story:**          [CS-60] Maintain A Resource/Work Center Master For Validated Production Equipm
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Work Center Master with Calibration/Qualification Tracking
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            MEDIUM
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Maintenance Planner with SAP authorization to create Work Center Master data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Plant `{TD.plant}` exists and is active |
| P4 | Configuration | Work Center Category `{TD.workCenterCategory}` is configured to require Equipment Number for calibration tracking |

---

### Test Data

**Dataset Reference:** `testdata/CS-60/CS-60-testdata.json` — Dataset ID: `TD-CS-060-ERR-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID | `{TD.workCenterId}` | Unique Work Center identifier — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code where Work Center is located — entered by the user | Valid |
| Work Center Category | `{TD.workCenterCategory}` | Category code requiring calibration tracking — selected by the user | Valid |
| Equipment Number | `{TD.equipmentNumber}` | Intentionally left blank or not entered | Invalid (missing) |
| Calibration Expiration Date | `{TD.calibrationExpirationDate}` | Next calibration due date — entered by the user | Valid (future date) |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Work Centers" | — | Search results appear listing the "Manage Work Centers" application |
| 8 | Click "Manage Work Centers" from the search results | — | Manage Work Centers application opens with the list view |
| 9 | Click the "Create" button in the application toolbar | — | New Work Center creation form opens in edit mode |
| 10 | In the "Work Center" field, enter the Work Center ID | `{TD.workCenterId}` | Work Center ID value is entered into the field |
| 11 | Press Enter to confirm the Work Center ID entry | — | Work Center ID is confirmed; cursor moves to next field |
| 12 | In the "Plant" field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 13 | Press Enter to confirm the Plant entry | — | SAP validates the plant; organizational data is auto-populated |
| 14 | In the "Category" dropdown, select the Work Center Category requiring calibration tracking | `{TD.workCenterCategory}` | Work Center Category is selected; calibration-related fields appear |
| 15 | Navigate to the "Calibration/Qualification" tab or section | — | Calibration fields are displayed including Equipment Number field |
| 16 | Leave the "Equipment" field blank (do not enter any value) | — | Equipment Number field remains empty |
| 17 | In the "Next Calibration Due" field, enter the calibration expiration date | `{TD.calibrationExpirationDate}` | Calibration expiration date is entered (future date) |
| 18 | Press Enter to confirm the calibration date entry | — | Date is confirmed |
| 19 | Attempt to click the "Save" button in the toolbar | — | SAP validates mandatory fields before saving |
| 20 | Observe the on-screen validation response | — | An error message is displayed: "Equipment Number is required when calibration tracking is enabled. Please enter a value." or similar validation error |
| 21 | Verify that the Equipment Number field is highlighted or flagged as invalid | — | Equipment Number field is highlighted in red or displays an error icon |
| 22 | Verify that the Work Center is NOT created | — | No Work Center creation success message is displayed; form remains in edit mode with validation errors |
| 23 | Click the "Cancel" or "Discard" button to exit the creation form | — | Creation form is closed; no Work Center record is created |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP validation logic prevents creation of Work Center without Equipment Number when calibration tracking is required for the selected Work Center Category
- Error message is displayed: "Equipment Number is required when calibration tracking is enabled. Please enter a value." or similar validation error
- Work Center `{TD.workCenterId}` is NOT created in the system
- No system log entry is created for Work Center creation (validation failure prevents creation)
- Data integrity is maintained: Equipment Number is enforced when calibration tracking is configured

---

### Post-conditions

- No Work Center Master record is created with ID `{TD.workCenterId}`
- System validation rules remain enforced for conditional mandatory fields (calibration tracking dependencies)

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
