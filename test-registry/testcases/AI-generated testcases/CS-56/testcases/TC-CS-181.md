# TC-CS-181: Query genealogy at exactly the acceptable time threshold

**User Story:**          [CS-56] View A Batch Genealogy Report Showing The Complete Lineage From Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control / Quality Management (PP/QM)
**Feature:**             Batch Genealogy Report
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to access Batch Information Cockpit and view batch genealogy data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished goods batch `{TD.finishedGoodsBatchPerformanceThreshold}` exists with genealogy data of sufficient complexity to test performance at the acceptable time threshold |
| P4 | Configuration | Batch determination and where-used tracking are enabled; system performance is within normal operational parameters |
| P5 | Performance Threshold | Acceptable time threshold for genealogy query completion is defined as `{TD.acceptableTimeThresholdSeconds}` seconds (suggest 10 seconds as per AC-6 analysis) |

---

### Test Data

**Dataset Reference:** `testdata/CS-56/CS-56-testdata.json` — Dataset ID: `TD-CS-056-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Goods Batch (Performance Threshold) | `{TD.finishedGoodsBatchPerformanceThreshold}` | Finished product batch designed to test performance at threshold — entered by user | Valid |
| Acceptable Time Threshold (seconds) | `{TD.acceptableTimeThresholdSeconds}` | Maximum acceptable query execution time in seconds (e.g., 10) — used for verification | Valid |
| Plant | `{TD.plant}` | Plant code — auto-populated by SAP | Valid |

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
| 9 | Note the current time before starting the search (use high-precision timer if available) | — | Current time is recorded for performance measurement (e.g., using browser developer tools or stopwatch) |
| 10 | In the "Batch" field, enter the finished goods batch number | `{TD.finishedGoodsBatchPerformanceThreshold}` | Batch number is entered into the field |
| 11 | Press Enter to confirm the batch entry | — | SAP validates the batch number; the field is accepted |
| 12 | Click the "Go" button or press Enter to execute the search | — | SAP begins processing the genealogy query |
| 13 | Observe the query execution time and wait for results to load | — | System processes the query; progress indicator or loading animation may appear |
| 14 | Note the time when the genealogy report is fully displayed (when loading indicator disappears and data is visible) | — | Time is recorded to calculate total query execution time |
| 15 | Calculate the query execution time (from step 9 to step 14) | — | Query execution time is calculated with precision (e.g., 9.8 seconds, 10.2 seconds) |
| 16 | Verify that the query execution time is at or below the acceptable time threshold | `{TD.acceptableTimeThresholdSeconds}` | Query execution time is ≤ acceptable threshold (e.g., ≤ 10 seconds); document actual time for compliance verification |
| 17 | Verify that the genealogy report is displayed showing the batch structure | `{TD.finishedGoodsBatchPerformanceThreshold}` | Genealogy report is displayed in hierarchical tree format with complete data |
| 18 | Verify that all genealogy data is complete and accurate | — | Component batches, vendor information, manufacturing dates, and release dates are all displayed correctly |
| 19 | Verify that the report is fully usable immediately after loading | — | User can expand/collapse nodes, scroll, and interact with the report without delays or lag |
| 20 | Verify that the system did not time out or display performance warnings | — | No timeout errors or performance degradation warnings are displayed |
| 21 | Record the query execution time in the test observations section | — | Actual query execution time is documented for regulatory compliance and performance baseline |
| 22 | If the query exceeds the acceptable threshold, document the excess time and any contributing factors | — | If query time > threshold, note actual time, system load, network conditions, or other factors that may have impacted performance |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The genealogy query completes at or below the acceptable time threshold (e.g., ≤ 10 seconds)
- The genealogy report displays complete and accurate batch data
- The application remains fully responsive and usable immediately after loading
- No timeout errors or performance warnings occur
- The system meets the performance requirement defined in AC-6 to support time-critical recall investigations
- Actual query execution time is documented for regulatory compliance and performance monitoring

---

### Post-conditions

- No data is modified in SAP; the query is read-only
- Batch genealogy data remains unchanged
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

**Performance Measurement:**
- Acceptable Time Threshold: _______ seconds (per test data)
- Actual Query Execution Time: _______ seconds
- Performance Status: PASS (≤ threshold) / FAIL (> threshold)

**Contributing Factors (if applicable):**
- System load: _______
- Network latency: _______
- Database performance: _______
- Other: _______

---

**Note:** This test case is CRITICAL for regulatory recall readiness. Performance must be measured accurately and documented for compliance with AC-6 (time-critical recall investigations).
