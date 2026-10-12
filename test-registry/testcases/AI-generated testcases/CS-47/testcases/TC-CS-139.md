# TC-CS-139: Missing Root Cause Analysis when attempting to close Quality Notification

**User Story:**          [CS-47] Link A Customer Complaint Captured In Sales To A Formal Quality Notifi
**Epic:**                N/A — no epic assigned
**Module:**              Quality Management (QM)
**Feature:**             Quality Notification Field Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to update and close Quality Notifications |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Quality Notification `{TD.qualityNotificationNumber}` exists with status "Open" or "Under Investigation" |
| P4 | Regulatory | SAP system enforces GMP-compliant documentation: Root Cause Analysis is mandatory at closure (minimum 50 characters) |

---

### Test Data

**Dataset Reference:** `testdata/CS-47/CS-47-testdata.json` — Dataset ID: `TD-CS-047-ERR-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Quality Notification Number | `{TD.qualityNotificationNumber}` | Existing Quality Notification to be closed | Valid |
| Root Cause Analysis | — | Root Cause Analysis intentionally left empty | Invalid (missing) |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Quality Notifications" | — | Search results appear listing the Quality Notification management application |
| 8 | Click the Quality Notification management application from the search results | — | Quality Notification management application opens |
| 9 | In the Quality Notification filter field, enter the Quality Notification number | `{TD.qualityNotificationNumber}` | Quality Notification number is entered into the filter field |
| 10 | Press Enter to apply the filter | — | Filter is applied; matching Quality Notification is displayed in the list |
| 11 | Click the Quality Notification number link to open the notification details | — | Quality Notification detail page opens in view or edit mode |
| 12 | If the notification is in view mode, click the "Edit" button | — | Notification switches to edit mode |
| 13 | Leave the "Root Cause Analysis" or "Root Cause" field empty | — | Root Cause Analysis field remains blank |
| 14 | Attempt to change the status to "Closed" | — | Status transition to "Closed" is initiated |
| 15 | Click the "Save" or "Complete" button to finalize the closure | — | SAP processes the closure request |
| 16 | Observe the on-screen response | — | An error message is displayed indicating that Root Cause Analysis is required |
| 17 | Verify that the error message specifically references the Root Cause Analysis field | — | Error message states "Root Cause is required" or "Root Cause Analysis must be documented" or similar descriptive text |
| 18 | Verify that the Root Cause Analysis field is highlighted or marked as mandatory | — | Root Cause Analysis field shows an error indicator or red border with asterisk (*) |
| 19 | Verify that the Quality Notification status remains unchanged | — | Status remains "Open" or "Under Investigation"; closure is prevented |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects that the Root Cause Analysis field is empty when attempting to close the Quality Notification
- An error message is displayed indicating that Root Cause Analysis is a mandatory field for GMP-compliant closure (minimum 50 characters required)
- The Quality Notification status is NOT changed to "Closed"
- The Root Cause Analysis field is highlighted as mandatory
- The system prevents closure of the Quality Notification until the Root Cause Analysis is documented

---

### Post-conditions

- Quality Notification status remains "Open" or "Under Investigation"
- Root Cause Analysis field remains empty with error indicator displayed
- Error message is displayed to the user explaining the validation failure
- No application-level crashes or critical warnings occur

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
