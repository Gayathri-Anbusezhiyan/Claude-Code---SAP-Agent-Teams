# TC-CS-059: Verify condition record alert at exact expiry alert window threshold

**User Story:**          [CS-48] Maintain Tiered Pricing Conditions For A Pharmaceutical Product Based
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Pricing Condition Master — Expiry Alert Window Threshold
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
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
| P3 | Master Data | Material `{TD.materialId}` exists in material master, is active, released for sales, and configured for sales organization `{TD.salesOrg}` |
| P4 | Master Data | Customer Pricing Group `{TD.customerPricingGroup}` is valid in customer master and assigned to distribution channel `{TD.distributionChannel}` |
| P5 | Configuration | Condition Type `{TD.conditionType}` exists in the pricing procedure and is active for sales organization `{TD.salesOrg}` |
| P6 | Configuration | An active pricing condition record exists for Material `{TD.materialId}` and Customer Pricing Group `{TD.customerPricingGroup}` with Valid To date exactly at the alert window threshold (e.g., 30 days from current date) |
| P7 | Configuration | System is configured to display expiry alerts for condition records approaching their validity end date within the alert window (e.g., 30 days) |
| P8 | Configuration | Sales Organization `{TD.salesOrg}` and Distribution Channel `{TD.distributionChannel}` are assigned to the user profile |

---

### Test Data

**Dataset Reference:** `testdata/CS-48/CS-48-testdata.json` — Dataset ID: `TD-CS-48-031`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material master number — used to search for condition record | Valid |
| Customer Pricing Group | `{TD.customerPricingGroup}` | Customer pricing group code (KONDA) — used to search for condition record | Valid |
| Condition Record Number | `{TD.conditionRecordNumber}` | Existing condition record number with Valid To date at alert threshold — used to search for the specific record | Valid |
| Valid To Date At Alert Threshold | `{TD.validToDateAtAlertThreshold}` | Valid To date exactly at the alert window threshold (e.g., 30 days from today) — reference only | Valid |
| Alert Window Threshold Days | `{TD.alertWindowThresholdDays}` | Number of days before expiry when alert is triggered (e.g., 30) — reference only | Valid |
| Sales Organization | `{TD.salesOrg}` | Sales organization code — auto-populated from user context | Valid |
| Distribution Channel | `{TD.distributionChannel}` | Distribution channel code — auto-populated from user context | Valid |

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
| 8 | Click the "Manage Pricing Conditions" application from the search results | — | Manage Pricing Conditions application opens with a list of existing condition records |
| 9 | In the search/filter area, enter the Condition Record Number | `{TD.conditionRecordNumber}` | Condition Record Number is entered in the search field |
| 10 | Press Enter or click the "Go" button to search | — | SAP filters the list to display the specified condition record |
| 11 | Verify that the condition record appears in the list | `{TD.conditionRecordNumber}` | The condition record with the specified number is displayed in the list |
| 12 | Observe any alert indicator or warning icon displayed for the condition record | — | An alert indicator, warning icon, or color-coded status (e.g., yellow/orange) is displayed indicating that the condition record is approaching its expiry date |
| 13 | Click on the condition record to open the detail view | — | The condition record detail view opens displaying all fields including Valid To date |
| 14 | Verify the Valid To date displayed in the detail view | `{TD.validToDateAtAlertThreshold}` | Valid To date is exactly at the alert window threshold (e.g., 30 days from current date) |
| 15 | Observe any alert message or notification displayed in the detail view | — | An alert message or notification is displayed indicating that the condition record is expiring soon (e.g., "This condition record will expire in 30 days") |
| 16 | Verify that the alert window threshold logic is functioning correctly | `{TD.alertWindowThresholdDays}` | The system correctly identifies and alerts on condition records with Valid To date at the exact alert window threshold |
| 17 | Navigate back to the condition record list | — | Condition record list is displayed |
| 18 | Verify that the alert indicator is consistently displayed in the list view | — | The alert indicator remains visible in the list view for the condition record at the alert threshold |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays an alert indicator or warning for the condition record with Valid To date exactly at the alert window threshold (e.g., 30 days from current date)
- The alert indicator is visible in both the list view and detail view of the condition record
- An alert message or notification clearly indicates that the condition record is approaching its expiry date
- The alert window threshold logic (e.g., 30 days) is correctly implemented and functioning as expected
- The system provides timely visibility of condition records requiring renewal or extension
- No application-level errors or critical warnings remain outstanding

---

### Post-conditions

- The condition record exists in SAP with Valid To date at the alert window threshold
- Alert indicators and notifications are correctly displayed for the approaching expiry condition
- No application-level errors or critical warnings remain outstanding after sign-out

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
