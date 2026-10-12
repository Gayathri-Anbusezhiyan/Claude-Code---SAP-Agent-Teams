# TC-CS-129: Notification triggered when Scheduling Agreement nears validity end date

**User Story:**          [CS-46] Maintain Customer Scheduling Agreement for hospital recurring supply
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Scheduling Agreement Notification
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Contract Administrator with SAP authorization to view Scheduling Agreements |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Scheduling Agreement `{TD.schedulingAgreementNumber}` exists and is active |
| P4 | Configuration | End date notification threshold is configured (e.g., 7 days before end date) |
| P5 | Master Data | The Scheduling Agreement validity end date is within the notification threshold period |

---

### Test Data

**Dataset Reference:** `testdata/CS-46/CS-46-testdata.json` — Dataset ID: `TD-CS-046-HP-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Scheduling Agreement Number | `{TD.schedulingAgreementNumber}` | Existing scheduling agreement nearing end date — entered by the user | Valid |
| Validity End Date | `{TD.validityEndDate}` | End date that is within notification threshold — verified | Valid |
| End Date Threshold | `{TD.endDateThreshold}` | Number of days before end date to trigger notification — verified | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Scheduling Agreement" | — | Search results appear listing the Scheduling Agreement application |
| 8 | Click "Scheduling Agreement" from the search results | — | Scheduling Agreement application opens with the list view |
| 9 | In the search/filter field, enter the Scheduling Agreement number | `{TD.schedulingAgreementNumber}` | Scheduling Agreement number is entered in the filter |
| 10 | Press Enter to filter | — | The list filters to show only the specified Scheduling Agreement |
| 11 | Click the Scheduling Agreement number in the list | — | Scheduling Agreement detail view opens in display mode |
| 12 | Verify the "Valid To" field shows an end date within the notification threshold period | `{TD.validityEndDate}`, `{TD.endDateThreshold}` | Validity end date is within the threshold (e.g., 5 days from today with 7-day threshold) |
| 13 | Check for notification message or alert on the Scheduling Agreement detail screen | — | A notification message or warning icon is displayed indicating that the agreement is nearing its validity end date |
| 14 | Verify the notification content | — | Notification message includes Scheduling Agreement number and validity end date; message indicates the agreement will expire soon |
| 15 | Check the notification inbox or email for Sales team notification | — | A notification has been sent to the Sales team's notification inbox or email alerting them of the approaching end date |
| 16 | Navigate back to the Scheduling Agreement list | — | Scheduling Agreement list is displayed |
| 17 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 18 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 19 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A notification is triggered by the system when the Scheduling Agreement validity end date is within the configured threshold period
- The notification message contains the Scheduling Agreement number and validity end date
- The notification is sent to the Sales team via notification inbox or email
- The Scheduling Agreement status remains "Active"
- No application-level errors or critical warnings are displayed

---

### Post-conditions

- Scheduling Agreement `{TD.schedulingAgreementNumber}` remains active
- A notification has been sent to the Sales team regarding the approaching validity end date
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
