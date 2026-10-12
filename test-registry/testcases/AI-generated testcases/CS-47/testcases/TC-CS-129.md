# TC-CS-129: Access complaint report filtered by specific batch

**User Story:**          [CS-47] Link A Customer Complaint Captured In Sales To A Formal Quality Notifi
**Epic:**                N/A — no epic assigned
**Module:**              Quality Management (QM)
**Feature:**             Customer Complaint Reporting and Analytics
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to access Quality Notification reports |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Test Data | At least one closed Quality Notification exists in the system for batch `{TD.batchNumber}` |
| P4 | Configuration | Customer Complaint report is configured and accessible in SAP QM module |

---

### Test Data

**Dataset Reference:** `testdata/CS-47/CS-47-testdata.json` — Dataset ID: `TD-CS-047-AP-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.batchNumber}` | Batch number to filter complaint report | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Customer Complaint Report" or "Quality Notification Analytics" | — | Search results appear listing the complaint report application |
| 8 | Click the complaint report application from the search results | — | Complaint report application opens with filter options |
| 9 | Locate the "Batch" filter field in the report selection criteria | — | Batch filter field is visible |
| 10 | Enter the Batch Number in the Batch filter field | `{TD.batchNumber}` | Batch Number is entered into the filter field |
| 11 | Press Enter to confirm the Batch entry | — | Batch Number is confirmed |
| 12 | Click the "Go" or "Execute" button to run the report | — | SAP processes the report request |
| 13 | Observe the report results | — | Report displays customer complaints filtered by the specified Batch Number |
| 14 | Verify that all displayed Quality Notifications are associated with the filtered batch | `{TD.batchNumber}` | Each row in the report shows the Batch Number matching the filter |
| 15 | Verify that the report displays complaint volume for the batch | — | Complaint count or volume metric is displayed |
| 16 | Verify that the report displays trend information (if available) | — | Trend data (e.g., complaints over time) is displayed or indicated as available |
| 17 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 18 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 19 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Customer Complaint report is accessible via the Fiori search bar
- The report accepts Batch Number as a filter parameter
- The report displays only Quality Notifications (customer complaints) associated with the specified batch
- Complaint volume and trend information are displayed for the filtered batch
- The report provides actionable business intelligence for quality management and batch traceability

---

### Post-conditions

- Report data is displayed accurately and filtered correctly by batch
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
