# TC-CS-204: Export Vendor Quality Scorecard to Audit-Compliant Report Format

**User Story:**          [CS-22] View An Aggregated Vendor Quality Scorecard Based On Inspection Reject
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Vendor Evaluation / Quality Scorecard
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Manager with SAP authorization to access and export vendor quality data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Vendor `{TD.vendorId}` exists with inspection and delivery history |
| P4 | Authorization | User has export authorization for vendor quality reports |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS/CS-testdata.json` — Dataset ID: `TD-CS-022-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.vendorId}` | Vendor account number | Valid |
| Time Period From | `{TD.timePeriodFrom}` | Start date for report | Valid |
| Time Period To | `{TD.timePeriodTo}` | End date for report | Valid |
| Export Format | `{TD.exportFormat}` | Report format (e.g., PDF or Excel) | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Vendor Evaluation" | — | Search results appear listing the Vendor Evaluation application |
| 8 | Click "Vendor Evaluation" from the search results | — | Vendor Evaluation analytical app opens |
| 9 | In the "Vendor" filter field, enter the Vendor ID | `{TD.vendorId}` | Vendor ID value is entered |
| 10 | Press Enter to confirm the Vendor entry | — | Vendor name `{TD.vendorName}` is displayed |
| 11 | In the "From Date" filter field, enter the start date | `{TD.timePeriodFrom}` | From Date is populated |
| 12 | In the "To Date" filter field, enter the end date | `{TD.timePeriodTo}` | To Date is populated |
| 13 | Click the "Go" button to execute the query | — | Vendor quality scorecard is displayed |
| 14 | Locate the "Export" button or action in the application toolbar | — | Export button is visible in the toolbar |
| 15 | Click the "Export" button | — | Export options dialog or menu is displayed |
| 16 | Select the export format | `{TD.exportFormat}` | Export format (PDF or Excel) is selected |
| 17 | Click "OK" or "Export" to confirm the export | — | System begins processing the export request |
| 18 | Observe the export completion notification | — | Success message indicates the report has been generated and downloaded |
| 19 | Verify the exported file is downloaded to the local system | — | File appears in the browser's download location |
| 20 | Open the exported report file | — | Report file opens successfully in the appropriate application (PDF viewer or Excel) |
| 21 | Verify the report contains the Vendor ID and Vendor Name | `{TD.vendorId}`, `{TD.vendorName}` | Vendor identification is clearly displayed in the report header |
| 22 | Verify the report contains the time period (From Date and To Date) | `{TD.timePeriodFrom}`, `{TD.timePeriodTo}` | Date range is displayed in the report |
| 23 | Verify the report contains all key metrics: Total Lots, Accepted, Rejected, Batch Acceptance Rate % | — | All scorecard metrics are present in the report with accurate values |
| 24 | Verify the report contains delivery metrics: Total Deliveries, On-Time, Late, OTD Rate % | — | All delivery metrics are present in the report |
| 25 | Verify the report contains the visual status indicator (Red/Yellow/Green) | — | Status indicator is displayed in the report |
| 26 | Verify the report is suitable for GMP vendor audit documentation | — | Report format is professional, contains all required data, and includes timestamps and user/system information |
| 27 | Close the exported report file | — | File is closed |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Vendor quality scorecard is successfully exported to the selected format (PDF or Excel)
- Exported report contains all key metrics: vendor identification, time period, inspection lot data, delivery performance, acceptance rates, OTD rates, and visual status indicator
- Report format is audit-compliant and suitable for inclusion in periodic GMP vendor audit documentation
- Report includes metadata: export date, user, system information for traceability
- File is downloaded and can be opened without errors

---

### Post-conditions

- Exported report file exists on the local system
- Report data matches the scorecard displayed in the SAP application
- No export errors or data truncation issues are present
- System returns to the login page after sign-out

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
