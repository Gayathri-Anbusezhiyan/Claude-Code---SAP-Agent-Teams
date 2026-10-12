# TC-CS-058: Requalify Work Center and Verify Re-Inclusion in Capacity Planning

**User Story:**          [CS-60] Maintain A Resource/Work Center Master For Validated Production Equipm
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Work Center Master with Calibration/Qualification Tracking
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Maintenance Planner with SAP authorization to change Work Center calibration dates |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.existingWorkCenterId}` exists in Plant `{TD.plant}` with calibration date approaching expiration or recently expired |
| P4 | Configuration | Work Center is currently excluded from capacity planning or flagged for requalification |

---

### Test Data

**Dataset Reference:** `testdata/CS-60/CS-60-testdata.json` — Dataset ID: `TD-CS-060-AP-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Existing Work Center ID | `{TD.existingWorkCenterId}` | Work Center to be requalified | Valid |
| Plant | `{TD.plant}` | Plant code where Work Center is located | Valid |
| New Calibration Expiration Date | `{TD.newCalibrationExpirationDate}` | Updated future calibration date — entered by the user | Valid (future date) |

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
| 11 | Click on the Work Center ID in the list to open the record | `{TD.existingWorkCenterId}` | Work Center detail view opens in display mode |
| 12 | Verify the current calibration status shows "Expired" or "Requalification Required" | — | Calibration status indicator shows expired or requires requalification; Capacity Planning Eligible indicator shows "No" |
| 13 | Click the "Edit" button in the toolbar | — | Work Center record switches to edit mode |
| 14 | Navigate to the "Calibration/Qualification" tab or section | — | Calibration fields are displayed |
| 15 | In the "Next Calibration Due" field, clear the old date and enter the new calibration expiration date | `{TD.newCalibrationExpirationDate}` | New calibration expiration date is entered (future date) |
| 16 | Press Enter to confirm the calibration date entry | — | Date is confirmed; calibration status indicator changes to "Valid" |
| 17 | If a "Requalification Notes" or "Maintenance Completion" field is displayed, enter a note | — | Note is entered (e.g., "Equipment recalibrated and requalified post-maintenance") |
| 18 | Click the "Save" button in the toolbar | — | SAP processes the Work Center calibration update |
| 19 | Observe the on-screen confirmation response | — | A success message is displayed: "Work Center `{TD.existingWorkCenterId}` updated successfully" |
| 20 | Navigate back to the Work Centers list | — | Work Centers list is displayed |
| 21 | Search for the updated Work Center using the Work Center ID | `{TD.existingWorkCenterId}` | The updated Work Center appears in the list with Calibration Status "Valid" |
| 22 | Open the Work Center record again by clicking on the Work Center ID | — | Work Center detail view is displayed |
| 23 | Verify the "Capacity Planning Eligible" indicator | — | Indicator shows "Yes" or equivalent — Work Center is re-included in capacity planning |
| 24 | Verify the available capacity is restored and visible | — | Available capacity field displays the configured capacity value (non-zero) |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Work Center `{TD.existingWorkCenterId}` calibration expiration date is successfully updated to `{TD.newCalibrationExpirationDate}` (future date)
- Calibration Status indicator displays "Valid"
- Work Center is automatically re-included in capacity planning (Capacity Planning Eligible = Yes)
- Available capacity is restored to the configured capacity value
- Process Order scheduling engine will now assign new operations to this Work Center
- System log entry is created recording the calibration update and capacity re-inclusion (audit trail)

---

### Post-conditions

- SAP Work Center Master record `{TD.existingWorkCenterId}` has updated calibration expiration date and status "Valid"
- Work Center is flagged as "Capacity Planning Eligible"
- New Process Orders can be scheduled to this Work Center until the next calibration expiration

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
