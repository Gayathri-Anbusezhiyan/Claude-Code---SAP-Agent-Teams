# TC-CS-089: Verify Batch Traceability Report Performance with Large Dataset

**User Story:**          [CS-26] Generate A Batch Traceability Report Showing All Goods Movements For A
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management — Batch Management (MM)
**Feature:**             Batch Traceability Report / Batch Where-Used List
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
| P1 | User Role | User has the role of Compliance Officer with SAP authorization to access batch traceability reports (MM Batch Management) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Batch `{TD.largeBatchNumber}` exists in SAP batch master (MCHA) and is associated with material `{TD.largeBatchMaterial}` |
| P4 | Transactional Data | Batch `{TD.largeBatchNumber}` has a large number of goods movements recorded (e.g., 100+ movements or more) representing multiple goods receipts, transfers, consumption, and issues over time |
| P5 | Performance Benchmark | Acceptable performance threshold is defined as `{TD.performanceThresholdSecondsLarge}` seconds (e.g., 10 seconds) for query execution |

---

### Test Data

**Dataset Reference:** `testdata/CS-26/CS-26-testdata.json` — Dataset ID: `TD-CS-026-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.largeBatchNumber}` | Batch master number with large number of movements — entered by the user | Valid |
| Material Number | `{TD.largeBatchMaterial}` | Material master number associated with the batch — verified in results | Valid |
| Material Description | `{TD.largeBatchMaterialDesc}` | Material description — verified in results | Auto-populated |
| Expected Movement Count | `{TD.largeMovementCount}` | Expected number of movements (e.g., 100+) | Valid |
| Performance Threshold | `{TD.performanceThresholdSecondsLarge}` | Maximum acceptable query time in seconds (e.g., 10) | Valid |

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
| 9 | Note the current timestamp before entering the batch number | — | Timestamp is recorded (for performance measurement) |
| 10 | In the "Batch" search field, enter the batch number with large dataset | `{TD.largeBatchNumber}` | Batch number value is entered into the field |
| 11 | Press Enter to confirm the Batch entry | — | SAP accepts the batch number input |
| 12 | Click the "Go" or "Execute" button to run the traceability query | — | SAP begins processing the batch traceability search |
| 13 | Observe the query execution time and note the timestamp when results are displayed | — | Query completes and results are displayed |
| 14 | Calculate the elapsed time between clicking "Go" and results display | — | Elapsed time is calculated |
| 15 | Verify that the query execution time is within the acceptable performance threshold | `{TD.performanceThresholdSecondsLarge}` | Query completes within the defined threshold (e.g., less than 10 seconds) |
| 16 | Verify that the results screen displays the batch number and material details | `{TD.largeBatchNumber}`, `{TD.largeBatchMaterial}`, `{TD.largeBatchMaterialDesc}` | Batch number, material number, and description are visible in the results |
| 17 | Verify that a large number of goods movements are displayed in the results table | `{TD.largeMovementCount}` | Multiple movement entries are visible (e.g., 100+ rows or paginated results showing large dataset) |
| 18 | Verify that the results include various movement types (goods receipt, transfer, consumption, issue) | — | Movement types 101, 311, 261, 201, and others are present in the results |
| 19 | Verify that all movement entries include dates, quantities, and material document numbers | — | Each movement row displays date, quantity, movement type, and material document number |
| 20 | Verify that pagination or scrolling functionality works correctly for large result sets | — | User can navigate through all movement entries via pagination controls or scrolling |
| 21 | Verify that the application remains responsive during result display | — | No application freezing, lagging, or timeout errors occur |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Batch Where-Used List query executes successfully for a batch with a large number of movements
- Query execution time meets the defined performance threshold (e.g., less than 10 seconds)
- All goods movements are accurately retrieved and displayed in the results
- The application remains responsive and handles large datasets without errors or timeouts
- Pagination or scrolling functionality allows the user to navigate through all movement entries
- All verification steps pass with no performance degradation or application errors

---

### Post-conditions

- Batch traceability report data for large datasets is retrieved and displayed accurately from SAP
- No application-level errors, critical warnings, or performance issues remain outstanding
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
