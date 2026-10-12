# TC-CS-146: Access Yield Trend Report and Verify Data Aggregation by Material

**User Story:**          [CS-52] Confirm Yield And Scrap Quantities Against A Process Order Operation
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Execution (PP)
**Feature:**             Yield Trend Reporting
**Test Type:**           FUNCTIONAL
**Scenario Type:**       REPORTING
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor or Production Manager with SAP authorization to access yield trend reports |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Data Availability | Historical process order confirmations exist in SAP with yield and scrap data for multiple materials |
| P4 | Configuration | Yield trend reporting application is configured and accessible |

---

### Test Data

**Dataset Reference:** `testdata/CS-52/CS-52-testdata.json` — Dataset ID: `TD-CS-52-REPORT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Material to filter report data — entered by the user | Valid |
| Date Range Start | `{TD.dateRangeStart}` | Start date for report period — entered by the user | Valid |
| Date Range End | `{TD.dateRangeEnd}` | End date for report period — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Yield Trend Report" or "Production Analysis" | — | Search results appear listing the yield trend reporting application |
| 8 | Click the yield trend reporting application from the search results | — | Yield trend report application opens |
| 9 | In the "Material" filter field, enter the material number | `{TD.materialNumber}` | Material number is entered into the filter field |
| 10 | Press Enter to apply the Material filter | — | SAP validates the material; material description is auto-populated |
| 11 | In the "Date Range" filter, select or enter the start date | `{TD.dateRangeStart}` | Start date is entered into the filter |
| 12 | In the "Date Range" filter, select or enter the end date | `{TD.dateRangeEnd}` | End date is entered into the filter |
| 13 | Click the "Go" or "Execute" button to generate the report | — | SAP retrieves and displays yield trend data aggregated by material |
| 14 | Verify that the report displays yield data for the selected material | `{TD.materialNumber}` | Report shows yield confirmations, variance percentages, and scrap data for the selected material |
| 15 | Verify that the report aggregates data across multiple process orders for the material | — | Report displays aggregated metrics (average yield, total scrap, variance trends) for the material within the date range |
| 16 | Verify that the report displays yield variance trends over time | — | Report includes charts or tables showing variance trends by confirmation date or period |
| 17 | Verify that the report is filterable and sortable by date, variance, or other metrics | — | Report controls allow sorting by variance percentage, confirmation date, or scrap quantity |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The yield trend report is accessible and displays data for the selected material
- Data is aggregated by material across multiple process order confirmations
- Yield variance trends are displayed over the selected date range
- Report includes key metrics: average yield, total scrap, variance percentage trends
- Report supports filtering, sorting, and exporting for continuous improvement analysis
- AC-6 (yield trend reporting by material) is verified

---

### Post-conditions

- Yield trend report is successfully accessed and displays material-level aggregated data
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
