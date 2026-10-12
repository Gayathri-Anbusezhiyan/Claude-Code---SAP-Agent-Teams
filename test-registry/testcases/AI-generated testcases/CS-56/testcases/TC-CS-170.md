# TC-CS-170: Export genealogy report to file (PDF or Excel)

**User Story:**          [CS-56] View A Batch Genealogy Report Showing The Complete Lineage From Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control / Quality Management (PP/QM)
**Feature:**             Batch Genealogy Report
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
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to access Batch Information Cockpit, view batch genealogy data, and export reports |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished goods batch `{TD.finishedGoodsBatchExport}` exists in SAP batch master (MCHA), is released, and assigned to plant `{TD.plant}` |
| P4 | Master Data | Component batches exist and are linked to the finished goods batch via manufacturing order confirmation |
| P5 | Configuration | Batch determination and where-used tracking are enabled; export functionality is configured and accessible for the user role |
| P6 | System Configuration | Export authorization is granted for the user; system supports export to PDF and Excel formats |

---

### Test Data

**Dataset Reference:** `testdata/CS-56/CS-56-testdata.json` — Dataset ID: `TD-CS-056-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Goods Batch (Export) | `{TD.finishedGoodsBatchExport}` | Finished product batch with genealogy data — entered by user | Valid |
| Finished Goods Material ID | `{TD.finishedGoodsMaterialIdExport}` | Material master number for finished goods — auto-populated by SAP | Valid |
| Export Format | `{TD.exportFormat}` | Export file format (PDF or Excel) — selected by user | Valid |
| Plant | `{TD.plant}` | Plant code where batch was produced — auto-populated by SAP | Valid |

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
| 9 | In the "Batch" field, enter the finished goods batch number | `{TD.finishedGoodsBatchExport}` | Batch number is entered into the field |
| 10 | Press Enter to confirm the batch entry | — | SAP validates the batch number; the field is accepted |
| 11 | Click the "Go" button or press Enter to execute the search | — | SAP begins processing the genealogy query |
| 12 | Observe the query execution and wait for results to load | — | Genealogy report is displayed showing the batch structure |
| 13 | Verify that the finished goods batch number and genealogy data are displayed | `{TD.finishedGoodsBatchExport}` | Batch genealogy report is fully loaded with component batches, vendor information, and dates |
| 14 | Locate the export button or menu option (typically in the toolbar or action menu) | — | Export button or menu icon is visible (e.g., "Export", "Download", or a download icon) |
| 15 | Click the export button or menu option | — | Export format selection dialog or menu appears with options such as "Export to PDF", "Export to Excel", or similar |
| 16 | Select the export format | `{TD.exportFormat}` | Export format (PDF or Excel) is selected |
| 17 | Confirm the export action (click "Export", "OK", or equivalent button) | — | SAP begins processing the export request; a progress indicator or message may appear |
| 18 | Observe the export completion | — | A download notification appears or the file download begins automatically |
| 19 | Verify that the file is downloaded to the local system | — | File download is completed successfully; the file appears in the browser's download location or a download confirmation message is displayed |
| 20 | Note the filename and format of the downloaded file | — | Filename includes identifiable information (e.g., batch number, date, or "genealogy") and the correct file extension (e.g., .pdf or .xlsx) |
| 21 | Open the downloaded file to verify content | — | File opens successfully in the appropriate application (PDF reader or Excel) |
| 22 | Verify that the exported file contains the finished goods batch number | `{TD.finishedGoodsBatchExport}` | Batch number is displayed in the exported file |
| 23 | Verify that the exported file contains component batch information | — | Component batches, vendor information, and production order numbers are present in the exported file |
| 24 | Verify that the exported file contains relevant dates | — | Manufacturing date, release date, and any inspection dates are present in the exported file |
| 25 | Verify that the exported file is properly formatted and readable | — | File layout is clear; data is organized in tables or structured format; text is legible |
| 26 | Close the exported file | — | File is closed |
| 27 | Return to the SAP Fiori Batch Information Cockpit application in the browser | — | Application is still open and responsive |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The genealogy report is successfully exported to the selected file format (PDF or Excel)
- The exported file is downloaded to the local system
- The file contains complete genealogy data: finished goods batch number, component batches, vendor information, manufacturing dates, and release dates
- The file is properly formatted and readable, suitable for inclusion in a regulatory recall response or customer quality inquiry
- The export functionality completes without errors or authorization failures

---

### Post-conditions

- Exported file is saved to the local system and available for regulatory or customer submission
- No data is modified in SAP; the export is read-only
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
