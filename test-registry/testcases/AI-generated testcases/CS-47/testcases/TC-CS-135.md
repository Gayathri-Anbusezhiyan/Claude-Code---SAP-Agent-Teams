# TC-CS-135: Attempt to close Quality Notification without root cause analysis

**User Story:**          [CS-47] Link A Customer Complaint Captured In Sales To A Formal Quality Notifi
**Epic:**                N/A — no epic assigned
**Module:**              Quality Management (QM)
**Feature:**             Quality Notification Closure Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
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
| P4 | Regulatory | SAP system enforces GMP-compliant documentation requirements: Root Cause Analysis is mandatory at closure |
| P5 | Negative Condition | Corrective Action and Disposition Code are populated but Root Cause Analysis is intentionally left empty |

---

### Test Data

**Dataset Reference:** `testdata/CS-47/CS-47-testdata.json` — Dataset ID: `TD-CS-047-NEG-006`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Quality Notification Number | `{TD.qualityNotificationNumber}` | Existing Quality Notification to be closed | Valid |
| Corrective Action | `{TD.correctiveAction}` | Documented corrective action plan (populated) | Valid |
| Disposition Code | `{TD.dispositionCode}` | SAP disposition code (populated) | Valid |
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
| 13 | In the "Corrective Action" field, enter the corrective action plan | `{TD.correctiveAction}` | Corrective Action text is entered (minimum 50 characters per GMP requirement) |
| 14 | In the "Disposition" field, select or enter the disposition code | `{TD.dispositionCode}` | Disposition code is selected from the dropdown or entered |
| 15 | Verify that the "Root Cause Analysis" field is empty or not populated | — | Root Cause Analysis field is blank |
| 16 | Click the "Save" button to save the entered data | — | SAP saves the Corrective Action and Disposition; confirmation message appears |
| 17 | Attempt to change the status to "Closed" | — | Status transition to "Closed" is initiated |
| 18 | Click the "Save" or "Complete" button to finalize the closure | — | SAP processes the closure request |
| 19 | Observe the on-screen response | — | An error message is displayed indicating that Root Cause Analysis is required for closure |
| 20 | Verify that the error message specifically references the missing Root Cause Analysis field | — | Error message states "Root Cause is required" or "Root Cause Analysis must be documented" or similar descriptive text |
| 21 | Verify that the Quality Notification status remains unchanged | — | Status remains "Open" or "Under Investigation"; closure is prevented |
| 22 | Verify that the Root Cause Analysis field is highlighted or marked as mandatory | — | Root Cause Analysis field shows an error indicator or red border |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects that the Root Cause Analysis field is empty when attempting to close the Quality Notification
- An error message is displayed indicating that Root Cause Analysis is mandatory for GMP-compliant closure
- The Quality Notification status is NOT changed to "Closed"
- The system prevents closure of the Quality Notification until the Root Cause Analysis is documented
- Regulatory compliance is enforced: Quality Notifications cannot be closed without a documented root cause investigation

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
