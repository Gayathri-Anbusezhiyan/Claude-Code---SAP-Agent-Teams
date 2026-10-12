# TC-CS-034: System flags condition records nearing validity end date for renewal review

**User Story:**          [CS-48] Maintain Tiered Pricing Conditions For A Pharmaceutical Product Based
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Pricing Condition Master — Validity Expiry Alert
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
| P1 | User Role | User has the role of Pricing Analyst with SAP authorization to view and maintain pricing condition records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Pricing Condition | A pricing condition record exists with Valid To date within the alert window threshold (e.g., 30 days from current date) |
| P4 | Configuration | SAP system is configured with validity alert window (e.g., flag records expiring within 30 days) |

---

### Test Data

**Dataset Reference:** `testdata/CS-48/CS-48-testdata.json` — Dataset ID: `TD-CS-48-006`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Condition Record Number | `{TD.conditionRecordNumberNearExpiry}` | Condition record number near expiry — created in pre-condition or test setup | Valid |
| Valid To Near Expiry | `{TD.validToNearExpiry}` | Valid To date within alert window (e.g., 25 days from now) — configured in condition record | Valid |
| Alert Window Threshold | `{TD.alertWindowDays}` | Number of days before expiry to trigger alert (e.g., 30 days) | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Pricing Conditions" | — | Search results appear listing the "Manage Pricing Conditions" application |
| 8 | Click the "Manage Pricing Conditions" application from the search results | — | Manage Pricing Conditions application opens with a list of condition records |
| 9 | Apply a filter to display condition records expiring within the alert window (e.g., "Expiring Soon" or custom date filter) | — | Filter is applied; list is refreshed |
| 10 | Verify the condition record with Valid To date `{TD.validToNearExpiry}` appears in the list | `{TD.conditionRecordNumberNearExpiry}` | Condition record is displayed in the filtered list |
| 11 | Verify the condition record displays a visual indicator (e.g., icon, color, flag) indicating it is near expiry | — | Visual alert indicator (e.g., warning icon, yellow/red status) is displayed next to the condition record |
| 12 | Click on the condition record to open its detail view | — | Condition record detail view opens |
| 13 | Verify the Valid To date is displayed and is within the alert window threshold | `{TD.validToNearExpiry}` | Valid To date is shown and is within the alert window (e.g., 25 days from current date) |
| 14 | Verify an alert message or notification indicates the record is nearing expiry and requires renewal review | — | Alert message is displayed (e.g., "This condition record expires in X days and requires renewal review") |
| 15 | Navigate back to the condition record list | — | Condition record list is displayed |
| 16 | Verify the list can be sorted or filtered by expiry alert status | — | Sorting/filtering options are available and functional |
| 17 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 18 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 19 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system flags condition records nearing their validity end date with a visual indicator
- The condition record list can be filtered to show records expiring within the alert window
- An alert message or notification prompts the user to review and renew the condition record before it expires

---

### Post-conditions

- Condition records nearing expiry are clearly identified in the Manage Pricing Conditions app
- Alert mechanism is functioning as configured
- No errors or warnings are logged

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
