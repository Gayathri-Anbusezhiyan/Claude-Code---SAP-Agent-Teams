# TC-CS-127: Status transition from Open to Under Investigation to Closed with all required fields

**User Story:**          [CS-47] Link A Customer Complaint Captured In Sales To A Formal Quality Notifi
**Epic:**                N/A — no epic assigned
**Module:**              Quality Management (QM)
**Feature:**             Quality Notification Status Workflow
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to update and close Quality Notifications |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Quality Notification `{TD.qualityNotificationNumber}` exists with status "Open" |
| P4 | Master Data | Customer `{TD.customerId}`, Material `{TD.materialNumber}`, and Batch `{TD.batchNumber}` data are recorded on the Quality Notification |
| P5 | Configuration | Disposition codes are configured in SAP QM module for Quality Notification closure |
| P6 | Regulatory | SAP system enforces GMP-compliant documentation requirements (Root Cause, Corrective Action, Disposition mandatory at closure) |

---

### Test Data

**Dataset Reference:** `testdata/CS-47/CS-47-testdata.json` — Dataset ID: `TD-CS-047-AP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Quality Notification Number | `{TD.qualityNotificationNumber}` | Existing Quality Notification in "Open" status | Valid |
| Root Cause Analysis | `{TD.rootCauseAnalysis}` | Root cause investigation text (minimum 50 characters per GMP) | Valid |
| Corrective Action | `{TD.correctiveAction}` | Documented corrective action plan (minimum 50 characters per GMP) | Valid |
| Disposition Code | `{TD.dispositionCode}` | SAP disposition code for complaint resolution | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Quality Notification Worklist" or "Manage Quality Notifications" | — | Search results appear listing the Quality Notification management application |
| 8 | Click the Quality Notification management application from the search results | — | Quality Notification management application opens |
| 9 | In the Quality Notification filter field, enter the Quality Notification number | `{TD.qualityNotificationNumber}` | Quality Notification number is entered into the filter field |
| 10 | Press Enter to apply the filter | — | Filter is applied; matching Quality Notification is displayed in the list |
| 11 | Verify that the current status is "Open" | — | Status column shows "Open" |
| 12 | Click the Quality Notification number link to open the notification details | — | Quality Notification detail page opens in view or edit mode |
| 13 | If the notification is in view mode, click the "Edit" button | — | Notification switches to edit mode |
| 14 | Locate the Status field or Status action button | — | Status field or status transition action is visible |
| 15 | Change the status from "Open" to "Under Investigation" | — | Status is updated to "Under Investigation" |
| 16 | Click the "Save" button to save the status change | — | SAP saves the status change; confirmation message appears |
| 17 | Verify that the status is now displayed as "Under Investigation" | — | Status field shows "Under Investigation" |
| 18 | In the "Root Cause Analysis" or "Root Cause" field, enter the root cause investigation text | `{TD.rootCauseAnalysis}` | Root Cause Analysis text is entered (minimum 50 characters per GMP requirement) |
| 19 | In the "Corrective Action" field, enter the corrective action plan | `{TD.correctiveAction}` | Corrective Action text is entered (minimum 50 characters per GMP requirement) |
| 20 | In the "Disposition" field, select or enter the disposition code | `{TD.dispositionCode}` | Disposition code is selected from the dropdown or entered |
| 21 | Click the "Save" button to save the investigation details | — | SAP saves the Root Cause, Corrective Action, and Disposition; confirmation message appears |
| 22 | Verify that all three mandatory fields (Root Cause, Corrective Action, Disposition) are populated | — | All three fields display the entered values |
| 23 | Change the status from "Under Investigation" to "Closed" | — | Status transition to "Closed" is initiated |
| 24 | Click the "Save" or "Complete" button to finalize the status change to "Closed" | — | SAP processes the closure |
| 25 | Observe the on-screen confirmation response | — | A success message is displayed confirming that the Quality Notification is now closed |
| 26 | Verify that the status is now displayed as "Closed" | — | Status field shows "Closed" |
| 27 | Navigate back to the Quality Notification list | — | Quality Notification list is displayed |
| 28 | Search for the Quality Notification again | `{TD.qualityNotificationNumber}` | The Quality Notification is displayed with status "Closed" |
| 29 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 30 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 31 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Quality Notification status successfully transitions from "Open" to "Under Investigation" to "Closed"
- All mandatory GMP-compliant fields (Root Cause Analysis, Corrective Action, Disposition Code) are populated before closure
- SAP allows the status change to "Closed" only after all required fields are filled
- The closed Quality Notification is persisted with all investigation details recorded
- The final status "Closed" is visible in the Quality Notification list

---

### Post-conditions

- Quality Notification status is "Closed"
- Root Cause Analysis, Corrective Action, and Disposition Code are recorded on the Quality Notification document
- All status transitions (Open → Under Investigation → Closed) are logged in the notification history
- No application-level errors or critical warnings remain outstanding

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
