# TC-CS-074: Alert Notification Created in PM Notifications Module and Routed to Maintenance Planner

**User Story:**          [CS-60] Maintain A Resource/Work Center Master For Validated Production Equipm
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP) with Plant Maintenance (PM) Integration
**Feature:**             Work Center Master with Calibration/Qualification Tracking
**Test Type:**           INTEGRATION
**Scenario Type:**       INTEGRATION
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Maintenance Planner with SAP authorization to view PM Notifications |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.workCenterId}` exists in Plant `{TD.plant}` with calibration expiration date within alert lead-time threshold |
| P4 | Configuration | Integration between PP Work Center Master and PM Notifications module is enabled (alert generation and routing) |
| P5 | Configuration | Alert lead-time is configured (e.g., 30 days); Work Center calibration expiration date triggers alert within this threshold |

---

### Test Data

**Dataset Reference:** `testdata/CS-60/CS-60-testdata.json` — Dataset ID: `TD-CS-060-INT-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID | `{TD.workCenterId}` | Work Center approaching calibration expiration | Valid |
| Plant | `{TD.plant}` | Plant code where Work Center is located | Valid |
| Calibration Expiration Date | `{TD.calibrationExpirationDate}` | Date within alert lead-time threshold (e.g., 25 days from today) | Valid (triggers alert) |
| Alert Lead-Time | `{TD.alertLeadTime}` | Configured alert lead-time (e.g., 30 days) | Valid |

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
| 9 | In the Work Center search filter field, enter the Work Center ID | `{TD.workCenterId}` | Work Center ID is entered into the filter field |
| 10 | Press Enter to execute the search | — | Filter is applied; the target Work Center appears in the list |
| 11 | Click on the Work Center ID in the list to open the record | `{TD.workCenterId}` | Work Center detail view opens |
| 12 | Navigate to the "Calibration/Qualification" tab or section | — | Calibration fields are displayed |
| 13 | Verify the "Next Calibration Due" date is within alert lead-time threshold | — | Calibration expiration date `{TD.calibrationExpirationDate}` is displayed (e.g., 25 days from today, within 30-day alert threshold) |
| 14 | Verify the alert status indicates "Alert Active" or "Alert Generated" | — | Alert status message confirms that alert has been triggered (calibration expiration is within alert lead-time) |
| 15 | Click the search icon and type "Manage Notifications" or "PM Notifications" | — | Search results appear listing the "Manage Notifications" application (PM module) |
| 16 | Click "Manage Notifications" from the search results | — | Manage Notifications application opens with the list view (PM Notifications inbox) |
| 17 | Search or filter for notifications related to Work Center calibration alerts | — | Notification filter is applied (e.g., "Calibration Alert" or Work Center ID) |
| 18 | Verify that a notification exists for Work Center `{TD.workCenterId}` calibration alert | — | A PM Notification record is displayed with subject "Calibration Alert: Work Center `{TD.workCenterId}` calibration expires on `{TD.calibrationExpirationDate}`" or similar |
| 19 | Click on the notification to open the notification detail view | — | Notification detail view opens |
| 20 | Verify the notification type is "Calibration Alert" or equivalent maintenance notification type | — | Notification type is displayed (e.g., "M1 - Maintenance Request" or "Calibration Alert") |
| 21 | Verify the notification description references the Work Center ID and calibration expiration date | — | Notification description includes Work Center `{TD.workCenterId}`, Plant `{TD.plant}`, and calibration expiration date `{TD.calibrationExpirationDate}` |
| 22 | Verify the notification is routed to the Maintenance Planner user or role | — | Notification "Assigned To" field displays the Maintenance Planner user ID or role (e.g., "Maintenance Planner Team") |
| 23 | Verify the notification priority is set appropriately (e.g., "High" or "Medium") | — | Notification priority is displayed (e.g., "High" for calibration alerts) |
| 24 | Verify the notification status is "Open" or "New" (pending action) | — | Notification status is "Open" or "New" (Maintenance Planner has not yet acted on the alert) |
| 25 | Verify that PP-PM integration successfully created and routed the alert notification | — | Alert notification was created by PP Work Center Master calibration logic and routed to PM Notifications module for Maintenance Planner action (integration confirmed) |
| 26 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 27 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 28 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Alert notification is successfully created in PM Notifications module when Work Center calibration expiration is within alert lead-time threshold
- Notification subject references Work Center `{TD.workCenterId}` and calibration expiration date `{TD.calibrationExpirationDate}`
- Notification is routed to Maintenance Planner user or role for action
- PP-PM integration is confirmed: Work Center calibration logic triggers PM Notification creation and routing
- System log entry is created recording the alert notification creation and routing (audit trail)
- Maintenance Planner is proactively notified of upcoming calibration expiration (preventive maintenance workflow enabled)

---

### Post-conditions

- PM Notification record exists for Work Center `{TD.workCenterId}` calibration alert
- Notification is assigned to Maintenance Planner and pending action
- Maintenance Planner can schedule equipment recalibration before expiration (proactive workflow)

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
