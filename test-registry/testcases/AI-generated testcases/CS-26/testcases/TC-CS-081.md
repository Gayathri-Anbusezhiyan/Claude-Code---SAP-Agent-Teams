# TC-CS-081: Generate Batch Traceability Report with Process Order Linkage and Excel Export

**User Story:**          [CS-26] Generate A Batch Traceability Report Showing All Goods Movements For A
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management — Batch Management (MM)
**Feature:**             Batch Traceability Report / Batch Where-Used List
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Compliance Officer with SAP authorization to access batch traceability reports (MM Batch Management) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Batch `{TD.batchNumber}` exists in SAP batch master (MCHA) and is associated with material `{TD.materialNumber}` |
| P4 | Master Data | Material `{TD.materialNumber}` is configured with batch management enabled (MARA-XCHPF = X) |
| P5 | Transactional Data | Batch `{TD.batchNumber}` has multiple goods movements recorded: goods receipt (101), transfer (311), consumption (261), and issue (201) |
| P6 | Integration Data | Batch `{TD.batchNumber}` has been consumed by process order `{TD.processOrderNumber}` with movement type 261 |

---

### Test Data

**Dataset Reference:** `testdata/CS-26/CS-26-testdata.json` — Dataset ID: `TD-CS-026-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.batchNumber}` | Batch master number for traceability search — entered by the user | Valid |
| Material Number | `{TD.materialNumber}` | Material master number associated with the batch — verified in results | Valid |
| Material Description | `{TD.materialDesc}` | Material description — verified in results | Auto-populated |
| Base UoM | `{TD.baseUoM}` | Base unit of measure — verified in results | Auto-populated |
| Plant | `{TD.plant}` | Plant code where batch movements occurred — verified in results | Valid |
| Storage Location | `{TD.storageLocation}` | Storage location code — verified in results | Valid |
| Goods Receipt Date | `{TD.grDate}` | Date of goods receipt movement | Valid |
| Goods Receipt Quantity | `{TD.grQuantity}` | Quantity received | Valid |
| Transfer Date | `{TD.transferDate}` | Date of transfer movement | Valid |
| Transfer Quantity | `{TD.transferQuantity}` | Quantity transferred | Valid |
| Consumption Date | `{TD.consumptionDate}` | Date of consumption movement | Valid |
| Consumption Quantity | `{TD.consumptionQuantity}` | Quantity consumed | Valid |
| Issue Date | `{TD.issueDate}` | Date of issue movement | Valid |
| Issue Quantity | `{TD.issueQuantity}` | Quantity issued | Valid |
| Process Order Number | `{TD.processOrderNumber}` | Process order that consumed the batch — verified in downstream linkage section | Valid |
| Material Document | `{TD.materialDocument}` | Material document number for a sample movement — verified in results | Valid |
| Movement Type GR | `{TD.movementTypeGR}` | Movement type code for goods receipt (101) | Valid |
| Movement Type Transfer | `{TD.movementTypeTransfer}` | Movement type code for transfer (311) | Valid |
| Movement Type Consumption | `{TD.movementTypeConsumption}` | Movement type code for consumption (261) | Valid |
| Movement Type Issue | `{TD.movementTypeIssue}` | Movement type code for issue (201) | Valid |
| Performance Threshold | `{TD.performanceThresholdSeconds}` | Maximum acceptable query time in seconds (e.g., 10) | Valid |

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
| 9 | In the "Batch" search field, enter the batch number | `{TD.batchNumber}` | Batch number value is entered into the field |
| 10 | Press Enter to confirm the Batch entry | — | SAP accepts the batch number input |
| 11 | Click the "Go" or "Execute" button to run the traceability query | — | SAP begins processing the batch traceability search |
| 12 | Observe the query execution time | — | Query completes within `{TD.performanceThresholdSeconds}` seconds |
| 13 | Verify that the results screen displays the batch number | `{TD.batchNumber}` | Batch number is displayed in the results header or filter criteria section |
| 14 | Verify that the material number and description are displayed | `{TD.materialNumber}`, `{TD.materialDesc}` | Material number and description are visible in the results |
| 15 | Verify that the base unit of measure is displayed | `{TD.baseUoM}` | Base UoM is visible in the results |
| 16 | Locate the "Goods Receipt" movement entry in the results table | — | Goods receipt movement row is visible with movement type `{TD.movementTypeGR}` |
| 17 | Verify the goods receipt date and quantity | `{TD.grDate}`, `{TD.grQuantity}` | Date and quantity match the expected goods receipt values |
| 18 | Locate the "Transfer" movement entry in the results table | — | Transfer movement row is visible with movement type `{TD.movementTypeTransfer}` |
| 19 | Verify the transfer date and quantity | `{TD.transferDate}`, `{TD.transferQuantity}` | Date and quantity match the expected transfer values |
| 20 | Locate the "Consumption" movement entry in the results table | — | Consumption movement row is visible with movement type `{TD.movementTypeConsumption}` |
| 21 | Verify the consumption date and quantity | `{TD.consumptionDate}`, `{TD.consumptionQuantity}` | Date and quantity match the expected consumption values |
| 22 | Locate the "Issue" movement entry in the results table | — | Issue movement row is visible with movement type `{TD.movementTypeIssue}` |
| 23 | Verify the issue date and quantity | `{TD.issueDate}`, `{TD.issueQuantity}` | Date and quantity match the expected issue values |
| 24 | Verify that all movement entries include material document numbers | `{TD.materialDocument}` | Material document numbers are displayed for each movement |
| 25 | Locate the downstream linkage section or expand process order details | — | Downstream linkage information is visible |
| 26 | Verify that the process order number is displayed in the downstream linkage section | `{TD.processOrderNumber}` | Process order number that consumed the batch is visible |
| 27 | Verify that the plant and storage location are correctly displayed | `{TD.plant}`, `{TD.storageLocation}` | Plant and storage location codes match expected values |
| 28 | Click the "Export" or "Download" button in the toolbar | — | Export options menu appears (Excel, PDF) |
| 29 | Select "Export to Excel" option | — | SAP begins generating the Excel export file |
| 30 | Observe the export process | — | Export completes successfully; a download dialog or notification appears |
| 31 | Verify that the Excel file is downloaded to the local system | — | Excel file (e.g., "Batch_Traceability_Report.xlsx") is present in the Downloads folder |
| 32 | Open the downloaded Excel file | — | Excel file opens successfully |
| 33 | Verify that the Excel file contains all the batch movement data displayed on screen | — | All goods receipt, transfer, consumption, and issue movements are present in the Excel file with dates and quantities |
| 34 | Verify that the process order linkage information is included in the Excel file | `{TD.processOrderNumber}` | Process order number is present in the Excel export |
| 35 | Close the Excel file | — | Excel file is closed |
| 36 | Return to the Batch Where-Used List application in the browser | — | Application is still open with results visible |
| 37 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 38 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 39 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Batch Where-Used List query executes successfully within the performance threshold
- All goods movements (goods receipt, transfer, consumption, issue) for the batch are displayed with correct dates, quantities, and movement types
- Downstream linkage to the process order is displayed in the results
- The report is successfully exported to Excel format
- The Excel file contains all displayed batch traceability data including movement details and process order linkage
- All verification steps pass with no errors or missing data

---

### Post-conditions

- Batch traceability report data is retrieved and displayed accurately from SAP
- No application-level errors or critical warnings remain outstanding
- Excel export file is available for regulatory submission or documentation purposes
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
