# TC-CS-084: Export Batch Traceability Report to PDF

**User Story:**          [CS-26] Generate A Batch Traceability Report Showing All Goods Movements For A
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management — Batch Management (MM)
**Feature:**             Batch Traceability Report / Batch Where-Used List
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Compliance Officer with SAP authorization to access batch traceability reports and export functionality |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Batch `{TD.batchNumberPDF}` exists in SAP batch master (MCHA) and is associated with material `{TD.materialNumberPDF}` |
| P4 | Transactional Data | Batch `{TD.batchNumberPDF}` has multiple goods movements recorded |
| P5 | Authorization | User has authorization for PDF export (S_GUI with activity 61 for export operations) |

---

### Test Data

**Dataset Reference:** `testdata/CS-26/CS-26-testdata.json` — Dataset ID: `TD-CS-026-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.batchNumberPDF}` | Batch master number for traceability search — entered by the user | Valid |
| Material Number | `{TD.materialNumberPDF}` | Material master number associated with the batch — verified in results | Valid |
| Material Description | `{TD.materialDescPDF}` | Material description — verified in results | Auto-populated |
| Goods Receipt Quantity | `{TD.grQuantityPDF}` | Sample goods receipt quantity for verification in PDF | Valid |
| Movement Type | `{TD.movementTypeGRPDF}` | Movement type code for goods receipt (101) | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Batch Where-Used List" | — | Search results appear listing the "Batch Where-Used List" application |
| 8 | Click the "Batch Where-Used List" application name from the search results | — | Batch Where-Used List application opens with search criteria fields displayed |
| 9 | In the "Batch" search field, enter the batch number | `{TD.batchNumberPDF}` | Batch number value is entered into the field |
| 10 | Press Enter to confirm the Batch entry | — | SAP accepts the batch number input |
| 11 | Click the "Go" or "Execute" button to run the traceability query | — | SAP begins processing the batch traceability search |
| 12 | Verify that the results screen displays the batch number and material details | `{TD.batchNumberPDF}`, `{TD.materialNumberPDF}`, `{TD.materialDescPDF}` | Batch number, material number, and description are visible in the results |
| 13 | Verify that goods movements are displayed in the results table | `{TD.grQuantityPDF}`, `{TD.movementTypeGRPDF}` | Movement entries with dates, quantities, and movement types are visible |
| 14 | Click the "Export" or "Download" button in the toolbar | — | Export options menu appears (Excel, PDF) |
| 15 | Select "Export to PDF" option | — | SAP begins generating the PDF export file |
| 16 | Observe the export process | — | Export completes successfully; a download dialog or notification appears |
| 17 | Verify that the PDF file is downloaded to the local system | — | PDF file (e.g., "Batch_Traceability_Report.pdf") is present in the Downloads folder |
| 18 | Open the downloaded PDF file | — | PDF file opens successfully in a PDF reader |
| 19 | Verify that the PDF file contains the batch number and material details | `{TD.batchNumberPDF}`, `{TD.materialNumberPDF}`, `{TD.materialDescPDF}` | Batch number, material number, and description are present in the PDF |
| 20 | Verify that the PDF file contains all the batch movement data displayed on screen | `{TD.grQuantityPDF}`, `{TD.movementTypeGRPDF}` | All goods movements are present in the PDF with dates, quantities, and movement types |
| 21 | Close the PDF file | — | PDF file is closed |
| 22 | Return to the Batch Where-Used List application in the browser | — | Application is still open with results visible |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Batch Where-Used List query executes successfully
- All goods movements for the batch are displayed in the results
- The report is successfully exported to PDF format
- The PDF file contains all displayed batch traceability data including batch number, material details, and movement information
- All verification steps pass with no errors or missing data

---

### Post-conditions

- Batch traceability report data is retrieved and displayed accurately from SAP
- No application-level errors or critical warnings remain outstanding
- PDF export file is available for regulatory submission or documentation purposes
- User session is terminated cleanly

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
