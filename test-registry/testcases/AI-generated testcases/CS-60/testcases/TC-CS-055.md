# TC-CS-055: Verify Alert Generated When Calibration Expiration is Within Alert Lead-Time Threshold

**User Story:**          [CS-60] Maintain A Resource/Work Center Master For Validated Production Equipm
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Work Center Master with Calibration/Qualification Tracking
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Maintenance Planner with SAP authorization to view Work Center Master data and PM Notifications |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.workCenterId}` exists in Plant `{TD.plant}` with calibration expiration date set to `{TD.calibrationExpirationDate}` |
| P4 | Configuration | Alert lead-time threshold is configured to `{TD.alertLeadTime}` days before calibration expiration |
| P5 | Master Data | Calibration expiration date `{TD.calibrationExpirationDate}` is exactly `{TD.alertLeadTime}` days from today (or less) |
| P6 | System Configuration | Background job for calibration alert generation is active and has executed after the alert threshold trigger |

---

### Test Data

**Dataset Reference:** `testdata/CS-60/CS-60-testdata.json` — Dataset ID: `TD-CS-060-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID | `{TD.workCenterId}` | Work Center with calibration expiring soon | Valid |
| Plant | `{TD.plant}` | Plant code where Work Center is located | Valid |
| Calibration Expiration Date | `{TD.calibrationExpirationDate}` | Calibration due date within alert lead-time | Valid (future date within threshold) |
| Alert Lead Time | `{TD.alertLeadTime}` | Configured alert lead-time in days (e.g., 30) | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "My Notifications" or "Manage Notifications" | — | Search results appear listing the PM Notifications application |
| 8 | Click "My Notifications" or "Manage Notifications" from the search results | — | PM Notifications application opens with the list view |
| 9 | Apply filter to show notifications for Work Center `{TD.workCenterId}` or calibration-related notifications | `{TD.workCenterId}` | Filter is applied; notification list is refined |
| 10 | Press Enter or click "Go" to execute the filter | — | Filtered notifications are displayed |
| 11 | Verify that an alert notification exists with subject or description mentioning calibration expiration | — | Alert notification is present in the list with notification type "Calibration Due" or similar |
| 12 | Click on the alert notification to open the details | — | Notification detail view opens |
| 13 | Verify the notification details include Work Center ID | `{TD.workCenterId}` | Work Center ID is displayed in the notification body |
| 14 | Verify the notification details include the calibration expiration date | `{TD.calibrationExpirationDate}` | Calibration expiration date is displayed in the notification body |
| 15 | Verify the notification details include alert lead-time or days remaining | — | Days remaining until calibration expiration is calculated and displayed (e.g., "Calibration due in X days") |
| 16 | Verify the notification recipient or responsible person | — | Notification is routed to the Maintenance Planner role or configured responsible person |
| 17 | Navigate back to the notifications list | — | Notifications list is displayed |
| 18 | Click the search icon (top-right shell bar) and type "Manage Work Centers" | — | Search results appear listing the "Manage Work Centers" application |
| 19 | Click "Manage Work Centers" from the search results | — | Manage Work Centers application opens with the list view |
| 20 | In the Work Center search filter field, enter the Work Center ID | `{TD.workCenterId}` | Work Center ID is entered into the filter field |
| 21 | Press Enter to execute the search | — | Filter is applied; the target Work Center appears in the list |
| 22 | Click on the Work Center ID in the list to open the record | `{TD.workCenterId}` | Work Center detail view opens in display mode |
| 23 | Navigate to the "Calibration/Qualification" tab or section | — | Calibration fields are displayed |
| 24 | Verify the calibration expiration date | `{TD.calibrationExpirationDate}` | Calibration expiration date matches the date in the notification |
| 25 | Verify the calibration status indicator | — | Status shows "Valid" but with a warning indicator or color (e.g., yellow) indicating expiration is near |
| 26 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 27 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 28 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A PM Notification (alert) is generated automatically by the background job when the calibration expiration date enters the alert lead-time threshold window
- The alert notification includes Work Center ID `{TD.workCenterId}`, calibration expiration date `{TD.calibrationExpirationDate}`, and days remaining
- The alert is routed to the Maintenance Planner or configured responsible person
- Work Center calibration status indicator shows "Valid" but with a near-expiration warning
- The alert is visible in the PM Notifications inbox and can be actioned by the Maintenance Planner

---

### Post-conditions

- PM Notification exists for Work Center `{TD.workCenterId}` with notification type "Calibration Due" or equivalent
- Notification status is "Open" or "Outstanding" (not yet processed)
- Work Center calibration status remains "Valid" (expiration date has not yet passed)
- System log entry exists documenting the alert generation (audit trail)

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
