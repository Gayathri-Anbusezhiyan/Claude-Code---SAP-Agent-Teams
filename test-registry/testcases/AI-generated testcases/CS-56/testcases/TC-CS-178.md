# TC-CS-178: Export fails due to system authorization or technical error

**User Story:**          [CS-56] View A Batch Genealogy Report Showing The Complete Lineage From Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control / Quality Management (PP/QM)
**Feature:**             Batch Genealogy Report
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to access Batch Information Cockpit and view batch genealogy data BUT does NOT have authorization to export reports |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished goods batch `{TD.finishedGoodsBatchExportFail}` exists in SAP batch master (MCHA) with genealogy data |
| P4 | Configuration | Export authorization is NOT granted for the user OR export service is configured to simulate a technical failure |

---

### Test Data

**Dataset Reference:** `testdata/CS-56/CS-56-testdata.json` — Dataset ID: `TD-CS-056-ERR-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Goods Batch (Export Fail) | `{TD.finishedGoodsBatchExportFail}` | Finished product batch with genealogy data — entered by user | Valid |
| Export Format | `{TD.exportFormatFail}` | Export file format (PDF or Excel) — selected by user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Batch Information Cockpit" | — | Search results appear listing the Batch Information Cockpit application |
| 8 | Click "Batch Information Cockpit" from the search results | — | Batch Information Cockpit application opens with search criteria screen |
| 9 | In the "Batch" field, enter the finished goods batch number | `{TD.finishedGoodsBatchExportFail}` | Batch number is entered into the field |
| 10 | Press Enter to confirm the batch entry | — | SAP validates the batch number; the field is accepted |
| 11 | Click the "Go" button or press Enter to execute the search | — | SAP begins processing the genealogy query |
| 12 | Observe the query execution and wait for results to load | — | Genealogy report is displayed showing the batch structure |
| 13 | Verify that the finished goods batch number and genealogy data are displayed | `{TD.finishedGoodsBatchExportFail}` | Batch genealogy report is fully loaded |
| 14 | Locate the export button or menu option (typically in the toolbar or action menu) | — | Export button or menu icon is visible (e.g., "Export", "Download", or a download icon) |
| 15 | Click the export button or menu option | — | Export format selection dialog or menu appears |
| 16 | Select the export format | `{TD.exportFormatFail}` | Export format (PDF or Excel) is selected |
| 17 | Confirm the export action (click "Export", "OK", or equivalent button) | — | SAP attempts to process the export request |
| 18 | Observe the system response | — | SAP displays an error message indicating that the export has failed |
| 19 | Verify that the error message is clear and informative | — | Message indicates the reason for export failure (e.g., "Export authorization missing", "You are not authorized to export reports", "Export service unavailable", or "Technical error during export") |
| 20 | Verify that no file is downloaded | — | No file download occurs; no file appears in the browser's download location |
| 21 | Verify that the genealogy report remains displayed on screen | — | The in-app genealogy report is still visible and accessible even though export failed |
| 22 | Verify that the application remains stable and does not crash | — | Application remains responsive; user can continue viewing the genealogy data or attempt other actions |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system attempts to export the genealogy report but encounters an authorization or technical error
- A clear and informative error message is displayed to the user
- No file is downloaded
- The in-app genealogy report remains visible and accessible
- The application remains stable and responsive
- The user is informed of the export failure and can take alternative actions (e.g., request authorization or report the issue)

---

### Post-conditions

- No data is modified in SAP; the query is read-only
- User session is terminated after sign-out

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

**Note:** This test case requires either (1) a test user account without export authorization, or (2) a simulated export service failure. Automation is PARTIAL because setting up authorization restrictions or simulating technical failures may require manual configuration.
