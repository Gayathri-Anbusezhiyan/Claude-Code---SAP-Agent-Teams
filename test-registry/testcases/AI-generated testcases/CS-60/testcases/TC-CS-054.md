# TC-CS-054: Update Existing Work Center with New Calibration Expiration Date

**User Story:**          [CS-60] Maintain A Resource/Work Center Master For Validated Production Equipm
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Work Center Master with Calibration/Qualification Tracking
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Maintenance Planner with SAP authorization to change Work Center Master data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.existingWorkCenterId}` exists in Plant `{TD.plant}` with an active status |
| P4 | Master Data | Existing Work Center has a calibration expiration date `{TD.oldCalibrationDate}` that needs updating |

---

### Test Data

**Dataset Reference:** `testdata/CS-60/CS-60-testdata.json` — Dataset ID: `TD-CS-060-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Existing Work Center ID | `{TD.existingWorkCenterId}` | Work Center to be updated — searched by the user | Valid |
| Plant | `{TD.plant}` | Plant code where Work Center is located | Valid |
| Old Calibration Date | `{TD.oldCalibrationDate}` | Current calibration expiration date on record | Valid (past or near-future date) |
| New Calibration Date | `{TD.newCalibrationExpirationDate}` | Updated calibration expiration date — entered by the user | Valid (future date) |

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
| 9 | In the Work Center search filter field, enter the existing Work Center ID | `{TD.existingWorkCenterId}` | Work Center ID is entered into the filter field |
| 10 | Press Enter to execute the search | — | Filter is applied; the target Work Center appears in the list |
| 11 | Click the "Go" button if required to refresh the list | — | List displays the Work Center matching the filter criteria |
| 12 | Click on the Work Center ID in the list to open the record | `{TD.existingWorkCenterId}` | Work Center detail view opens in display mode |
| 13 | Click the "Edit" button in the toolbar | — | Work Center record switches to edit mode |
| 14 | Navigate to the "Calibration/Qualification" tab or section | — | Calibration fields are displayed with current values |
| 15 | Verify the current "Next Calibration Due" date | `{TD.oldCalibrationDate}` | Old calibration date is displayed in the field |
| 16 | Clear the "Next Calibration Due" field and enter the new calibration expiration date | `{TD.newCalibrationExpirationDate}` | New calibration expiration date is entered (future date) |
| 17 | Press Enter to confirm the new calibration date entry | — | Date is confirmed; calibration status recalculates and shows "Valid" |
| 18 | Click the "Save" button in the toolbar | — | SAP processes the Work Center update |
| 19 | Observe the on-screen confirmation response | — | A success message is displayed: "Work Center `{TD.existingWorkCenterId}` updated successfully" |
| 20 | Navigate back to the Work Centers list | — | Work Centers list is displayed |
| 21 | Search for the updated Work Center using the Work Center ID | `{TD.existingWorkCenterId}` | The updated Work Center appears in the list with Calibration Status "Valid" |
| 22 | Open the Work Center record again by clicking on the Work Center ID | — | Work Center detail view is displayed |
| 23 | Navigate to the "Calibration/Qualification" tab and verify the updated calibration date | `{TD.newCalibrationExpirationDate}` | New calibration expiration date is displayed correctly |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Work Center `{TD.existingWorkCenterId}` is successfully updated with the new calibration expiration date `{TD.newCalibrationExpirationDate}`
- Calibration Status indicator displays "Valid" (date is in the future)
- Work Center remains eligible for capacity planning
- System log entry is created recording the calibration date change (audit trail)
- Change history reflects the old date, new date, user ID, and timestamp

---

### Post-conditions

- SAP Work Center Master record `{TD.existingWorkCenterId}` has the updated calibration expiration date
- Work Center status remains "Active" and "Capacity Planning Eligible"
- Audit log entry exists documenting the calibration date change

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
