# TC-CS-146: Verify complaint report aggregates data from multiple Quality Notifications

**User Story:**          [CS-47] Link A Customer Complaint Captured In Sales To A Formal Quality Notifi
**Epic:**                N/A — no epic assigned
**Module:**              Quality Management (QM) — Reporting and Analytics Integration
**Feature:**             Customer Complaint Report Data Aggregation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to access Quality Notification reports |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Test Data | Multiple closed Quality Notifications exist in the system (minimum 3) with varying materials, batches, and customer complaint data |
| P4 | Configuration | Customer Complaint report is configured and accessible in SAP QM module with data aggregation enabled |
| P5 | Reporting Integration | SAP QM module is integrated with Reporting and Analytics module for complaint volume and trend analysis |

---

### Test Data

**Dataset Reference:** `testdata/CS-47/CS-47-testdata.json` — Dataset ID: `TD-CS-047-INT-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number (filter) | `{TD.materialNumber}` | Material master number for report filtering | Valid |
| Batch Number (filter) | `{TD.batchNumber}` | Batch number for report filtering | Valid |
| Expected Notification Count | `{TD.expectedNotificationCount}` | Expected number of Quality Notifications in the report results | Valid |

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
| 8 | Click the complaint report application from the search results | — | Complaint report application opens with filter and selection criteria |
| 9 | Leave all filters empty or set to default (to retrieve all Quality Notifications) | — | Report is configured to show all Quality Notifications without specific filtering |
| 10 | Click the "Go" or "Execute" button to run the report | — | SAP processes the report request |
| 11 | Observe the report results | — | Report displays multiple Quality Notifications with complaint volume and trend information |
| 12 | Verify that the report displays multiple Quality Notification records | — | Multiple rows are displayed, each representing a Quality Notification (customer complaint) |
| 13 | Verify that the report includes aggregated complaint volume metrics | — | Complaint count or volume metric is displayed (e.g., total number of complaints, complaints per material, complaints per batch) |
| 14 | Verify that the report includes trend information if available | — | Trend data (e.g., complaints over time, increasing/decreasing trends) is displayed or available in chart/graph format |
| 15 | Apply a filter by Material Number | `{TD.materialNumber}` | Material Number is entered into the Material filter field |
| 16 | Click the "Go" or "Execute" button to re-run the report | — | SAP processes the filtered report request |
| 17 | Verify that the report displays only Quality Notifications associated with the filtered material | `{TD.materialNumber}` | All displayed rows show the Material Number matching the filter |
| 18 | Verify that the complaint volume for the filtered material is correctly aggregated | — | Complaint count for the material matches the number of rows displayed |
| 19 | Clear the Material filter and apply a filter by Batch Number | `{TD.batchNumber}` | Batch Number is entered into the Batch filter field |
| 20 | Click the "Go" or "Execute" button to re-run the report | — | SAP processes the filtered report request |
| 21 | Verify that the report displays only Quality Notifications associated with the filtered batch | `{TD.batchNumber}` | All displayed rows show the Batch Number matching the filter |
| 22 | Verify that the complaint volume for the filtered batch is correctly aggregated | — | Complaint count for the batch matches the number of rows displayed |
| 23 | Verify that the report includes key Quality Notification details (notification number, customer, material, batch, status, creation date) | — | Each row displays relevant Quality Notification metadata for business intelligence purposes |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Customer Complaint report successfully aggregates data from multiple Quality Notifications across the SAP QM system
- Complaint volume metrics are calculated and displayed correctly (total count, counts per material, counts per batch)
- Trend information is available and accurately reflects complaint patterns over time
- Report filtering by Material and Batch functions correctly and returns accurate aggregated results
- The integration between QM and Reporting modules provides actionable business intelligence for quality management and continuous improvement

---

### Post-conditions

- Report data is displayed accurately with correct aggregation and filtering
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
