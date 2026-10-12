# TC-CS-143: Close Quality Notification with Corrective Action at minimum closure length boundary (50 characters)

**User Story:**          [CS-47] Link A Customer Complaint Captured In Sales To A Formal Quality Notifi
**Epic:**                N/A — no epic assigned
**Module:**              Quality Management (QM)
**Feature:**             Quality Notification Closure Data Boundary Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to update and close Quality Notifications |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Quality Notification `{TD.qualityNotificationNumber}` exists with status "Open" or "Under Investigation" |
| P4 | Regulatory | SAP system enforces GMP-compliant minimum length for Corrective Action at closure (50 characters minimum) |

---

### Test Data

**Dataset Reference:** `testdata/CS-47/CS-47-testdata.json` — Dataset ID: `TD-CS-047-EDGE-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Quality Notification Number | `{TD.qualityNotificationNumber}` | Existing Quality Notification to be closed | Valid |
| Root Cause Analysis | `{TD.rootCauseAnalysis}` | Root cause investigation text | Valid |
| Corrective Action (minimum length) | `{TD.correctiveActionMin}` | Corrective action text with exactly 50 characters (GMP minimum boundary for closure) | Valid (boundary) |
| Disposition Code | `{TD.dispositionCode}` | SAP disposition code | Valid |

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
| 13 | In the "Root Cause Analysis" field, enter the root cause investigation text | `{TD.rootCauseAnalysis}` | Root Cause Analysis text is entered |
| 14 | In the "Corrective Action" field, enter the minimum-length corrective action text | `{TD.correctiveActionMin}` | Corrective Action text is entered (exactly 50 characters) |
| 15 | Verify the character count if displayed in the UI | — | Character count shows 50 characters (or no character count warning appears) |
| 16 | In the "Disposition" field, select or enter the disposition code | `{TD.dispositionCode}` | Disposition code is selected from the dropdown or entered |
| 17 | Click the "Save" button to save the investigation details | — | SAP saves all three mandatory fields; confirmation message appears |
| 18 | Change the status from "Open" or "Under Investigation" to "Closed" | — | Status transition to "Closed" is initiated |
| 19 | Click the "Save" or "Complete" button to finalize the closure | — | SAP processes the closure request |
| 20 | Observe the on-screen confirmation response | — | A success message is displayed confirming that the Quality Notification is now closed |
| 21 | Verify that SAP accepts the 50-character Corrective Action without error | — | No validation error is displayed; the Quality Notification is closed successfully |
| 22 | Verify that the status is now displayed as "Closed" | — | Status field shows "Closed" |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Quality Notification status successfully transitions to "Closed"
- SAP accepts the Corrective Action with exactly 50 characters (GMP minimum boundary for closure) without validation error
- The system enforces the lower boundary correctly: 50 characters is sufficient to meet GMP documentation requirements for closure
- All mandatory fields are recorded on the closed Quality Notification

---

### Post-conditions

- Quality Notification status is "Closed"
- Corrective Action field contains the 50-character text
- Root Cause Analysis and Disposition Code are also recorded
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
