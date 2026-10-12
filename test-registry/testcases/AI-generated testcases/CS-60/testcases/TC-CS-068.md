# TC-CS-068: Alert Lead-Time Equals 0 Days (Alert on Expiration Day Only)

**User Story:**          [CS-60] Maintain A Resource/Work Center Master For Validated Production Equipm
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Work Center Master with Calibration/Qualification Tracking
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Maintenance Planner with SAP authorization to configure system parameters |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.workCenterId}` exists in Plant `{TD.plant}` with a calibration expiration date set |
| P4 | Configuration | System parameter for alert lead-time is configurable (default value exists) |

---

### Test Data

**Dataset Reference:** `testdata/CS-60/CS-60-testdata.json` — Dataset ID: `TD-CS-060-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID | `{TD.workCenterId}` | Work Center for alert configuration | Valid |
| Plant | `{TD.plant}` | Plant code where Work Center is located | Valid |
| Alert Lead-Time | `{TD.alertLeadTime}` | 0 days (minimum boundary) — entered by the user | Valid (boundary) |
| Calibration Expiration Date | `{TD.calibrationExpirationDate}` | Date to trigger alert on expiration day | Valid (future date) |

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
| 7 | Click the search icon (top-right shell bar) and type "Calibration Alert Configuration" or "System Configuration" | — | Search results appear listing the configuration application |
| 8 | Click the configuration application from the search results | — | Configuration application opens |
| 9 | Navigate to the "Alert Lead-Time" or "Calibration Alert Settings" section | — | Alert lead-time configuration fields are displayed |
| 10 | Verify the current default alert lead-time value | — | Default alert lead-time value is displayed (e.g., "30 days") |
| 11 | In the "Alert Lead-Time (Days)" field, clear the default value and enter 0 (zero) | `{TD.alertLeadTime}` | Alert lead-time value "0" is entered (minimum boundary) |
| 12 | Press Enter to confirm the alert lead-time entry | — | Alert lead-time value is confirmed |
| 13 | Click the "Save" button in the toolbar | — | SAP processes the configuration update |
| 14 | Observe the on-screen confirmation response | — | A success message is displayed: "Alert lead-time configuration updated successfully" |
| 15 | Click the search icon and type "Manage Work Centers" | — | Search results appear listing the "Manage Work Centers" application |
| 16 | Click "Manage Work Centers" from the search results | — | Manage Work Centers application opens with the list view |
| 17 | In the Work Center search filter field, enter the Work Center ID | `{TD.workCenterId}` | Work Center ID is entered into the filter field |
| 18 | Press Enter to execute the search | — | Filter is applied; the target Work Center appears in the list |
| 19 | Click on the Work Center ID in the list to open the record | `{TD.workCenterId}` | Work Center detail view opens |
| 20 | Navigate to the "Calibration/Qualification" tab or section | — | Calibration fields are displayed with expiration date `{TD.calibrationExpirationDate}` |
| 21 | Verify the "Alert Trigger Date" or "Alert Generation Date" field | — | Alert trigger date equals the calibration expiration date (0 days lead-time = alert on expiration day only) |
| 22 | Verify the alert status indicates "Alert will be generated on expiration date" | — | Alert status message confirms 0-day lead-time configuration: alert on expiration day only (no advance warning) |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Alert lead-time configuration is successfully set to 0 days (minimum boundary)
- Work Center `{TD.workCenterId}` alert trigger date equals the calibration expiration date (no advance warning)
- Alert will be generated only on the expiration day (not before)
- System accepts 0 days as a valid alert lead-time (lower boundary test passed)
- System log entry is created recording the alert lead-time configuration change (audit trail)

---

### Post-conditions

- System alert lead-time parameter is set to 0 days (minimum boundary)
- All Work Centers with calibration expiration dates will trigger alerts only on the expiration day (no advance notice)
- Configuration change is reflected in the Work Center alert calculation logic

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
