# TC-CS-128: Access complaint report filtered by specific material

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
| P3 | Test Data | At least one closed Quality Notification exists in the system for material `{TD.materialNumber}` |
| P4 | Configuration | Customer Complaint report is configured and accessible in SAP QM module |

---

### Test Data

**Dataset Reference:** `testdata/CS-47/CS-47-testdata.json` — Dataset ID: `TD-CS-047-AP-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Material master number to filter complaint report | Valid |

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
| 9 | Locate the "Material" filter field in the report selection criteria | — | Material filter field is visible |
| 10 | Enter the Material Number in the Material filter field | `{TD.materialNumber}` | Material Number is entered into the filter field |
| 11 | Press Enter to confirm the Material entry | — | Material Number is confirmed |
| 12 | Click the "Go" or "Execute" button to run the report | — | SAP processes the report request |
| 13 | Observe the report results | — | Report displays customer complaints filtered by the specified Material Number |
| 14 | Verify that all displayed Quality Notifications are associated with the filtered material | `{TD.materialNumber}` | Each row in the report shows the Material Number matching the filter |
| 15 | Verify that the report displays complaint volume for the material | — | Complaint count or volume metric is displayed |
| 16 | Verify that the report displays trend information (if available) | — | Trend data (e.g., complaints over time) is displayed or indicated as available |
| 17 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 18 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 19 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Customer Complaint report is accessible via the Fiori search bar
- The report accepts Material Number as a filter parameter
- The report displays only Quality Notifications (customer complaints) associated with the specified material
- Complaint volume and trend information are displayed for the filtered material
- The report provides actionable business intelligence for quality management

---

### Post-conditions

- Report data is displayed accurately and filtered correctly by material
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
