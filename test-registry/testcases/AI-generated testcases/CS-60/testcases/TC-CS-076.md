# TC-CS-076: Background Job Scans Work Centers and Generates Alerts Based on Configurable Lead-Time

**User Story:**          [CS-60] Maintain A Resource/Work Center Master For Validated Production Equipm
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP) with Background Job Framework Integration
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
| P1 | User Role | User has the role of System Administrator or Background Job Monitor with SAP authorization to view and execute background jobs |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.workCenterId1}` exists in Plant `{TD.plant}` with calibration expiration date within alert lead-time threshold (should trigger alert) |
| P4 | Master Data | Work Center `{TD.workCenterId2}` exists in Plant `{TD.plant}` with calibration expiration date outside alert lead-time threshold (should NOT trigger alert) |
| P5 | Configuration | Alert lead-time is configured (e.g., 30 days) |
| P6 | Configuration | Background job for Work Center calibration alert scanning is scheduled and active (e.g., daily run) |

---

### Test Data

**Dataset Reference:** `testdata/CS-60/CS-60-testdata.json` — Dataset ID: `TD-CS-060-INT-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID 1 | `{TD.workCenterId1}` | Work Center with calibration date within alert threshold (e.g., 25 days from today) | Valid (triggers alert) |
| Work Center ID 2 | `{TD.workCenterId2}` | Work Center with calibration date outside alert threshold (e.g., 45 days from today) | Valid (no alert) |
| Plant | `{TD.plant}` | Plant code where Work Centers are located | Valid |
| Alert Lead-Time | `{TD.alertLeadTime}` | Configured alert lead-time (e.g., 30 days) | Valid |
| Background Job Name | `{TD.backgroundJobName}` | Background job name for calibration alert scanning (e.g., "ZCAL_ALERT_SCAN") | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Background Jobs" or "Job Monitor" | — | Search results appear listing the "Manage Background Jobs" application |
| 8 | Click "Manage Background Jobs" from the search results | — | Background Job Monitor application opens with the list view |
| 9 | In the Job Name search filter field, enter the background job name | `{TD.backgroundJobName}` | Background job name is entered into the filter field (e.g., "ZCAL_ALERT_SCAN") |
| 10 | Press Enter to execute the search | — | Filter is applied; the calibration alert scanning background job appears in the list |
| 11 | Verify that the background job status is "Active" or "Scheduled" | — | Background job status is displayed as "Active" or "Scheduled" (job is configured to run periodically) |
| 12 | Verify the background job schedule (e.g., daily at 06:00) | — | Job schedule is displayed (e.g., "Daily at 06:00" or "Every 24 hours") |
| 13 | Click on the background job name to open the job detail view | `{TD.backgroundJobName}` | Background job detail view opens |
| 14 | Verify the job parameters include alert lead-time configuration | — | Job parameters display alert lead-time value (e.g., "ALERT_LEAD_TIME = 30 days") |
| 15 | Verify the job last execution timestamp and status | — | Last execution timestamp is displayed (e.g., "2026-08-24 06:00:00"); status is "Completed" or "Success" |
| 16 | If the job has not run recently, manually trigger the background job execution | — | Job execution is triggered; job status changes to "Running" |
| 17 | Wait for the background job to complete execution (or check job log) | — | Job status changes to "Completed" or "Success"; job log is available |
| 18 | Open the background job execution log | — | Job log is displayed |
| 19 | Verify the job log shows Work Center scan results | — | Job log includes entries: "Scanning Work Centers in Plant `{TD.plant}`", "Work Centers scanned: 2" (or total count) |
| 20 | Verify the job log shows alert generation for Work Center 1 (within threshold) | — | Job log includes entry: "Alert generated for Work Center `{TD.workCenterId1}` (calibration expires in X days, within alert lead-time threshold)" |
| 21 | Verify the job log shows NO alert generation for Work Center 2 (outside threshold) | — | Job log includes entry: "Work Center `{TD.workCenterId2}` calibration expires in Y days, outside alert lead-time threshold — no alert generated" |
| 22 | Click the search icon and type "Manage Notifications" or "PM Notifications" | — | Search results appear listing the "Manage Notifications" application (PM module) |
| 23 | Click "Manage Notifications" from the search results | — | Manage Notifications application opens with the list view (PM Notifications inbox) |
| 24 | Search or filter for notifications created after the background job execution timestamp | — | Notification filter is applied (e.g., "Created Date >= [job execution timestamp]") |
| 25 | Verify that a notification exists for Work Center `{TD.workCenterId1}` calibration alert (created by background job) | — | A PM Notification record is displayed with subject "Calibration Alert: Work Center `{TD.workCenterId1}` calibration expires soon" or similar |
| 26 | Verify that NO notification exists for Work Center `{TD.workCenterId2}` (outside alert threshold) | — | No PM Notification record is displayed for Work Center `{TD.workCenterId2}` (background job correctly filtered Work Centers based on alert lead-time) |
| 27 | Verify that the background job successfully scanned Work Centers and generated alerts based on configurable alert lead-time | — | Background job integration confirmed: job scanned Work Centers, evaluated calibration expiration dates against alert lead-time, and generated PM Notifications only for Work Centers within threshold |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Background job `{TD.backgroundJobName}` successfully executes and scans Work Centers for calibration expiration dates
- Background job evaluates calibration expiration dates against configurable alert lead-time (e.g., 30 days)
- Alert notification is generated for Work Center `{TD.workCenterId1}` (calibration expiration within alert lead-time threshold)
- NO alert notification is generated for Work Center `{TD.workCenterId2}` (calibration expiration outside alert lead-time threshold)
- PM Notification is created for Work Center `{TD.workCenterId1}` and routed to Maintenance Planner
- Background job integration with Work Center Master and PM Notifications is confirmed operational
- System log entry is created recording the background job execution and alert generation (audit trail)
- Automated proactive alert generation ensures Maintenance Planners are notified of upcoming calibration expirations

---

### Post-conditions

- Background job `{TD.backgroundJobName}` remains scheduled and active for periodic execution
- PM Notification record exists for Work Center `{TD.workCenterId1}` calibration alert (created by background job)
- Work Center calibration alert generation is automated and reliable (background job framework integration confirmed)

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
