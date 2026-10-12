# TC-CS-184: Verify inspection lot results from QM appear in genealogy report

**User Story:**          [CS-56] View A Batch Genealogy Report Showing The Complete Lineage From Raw Ma
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control / Quality Management (PP/QM)
**Feature:**             Batch Genealogy Report
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to access Batch Information Cockpit and view batch genealogy data including quality inspection results |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished goods batch `{TD.finishedGoodsBatchIntegrationQM}` exists and was released to unrestricted use after QM inspection |
| P4 | Transaction Data | Inspection lot `{TD.inspectionLotNumber}` was created for batch `{TD.finishedGoodsBatchIntegrationQM}` in QM |
| P5 | Transaction Data | Inspection lot results were recorded (in-process control results and usage decision) and the batch was released based on inspection results |
| P6 | Integration | QM-PP integration is active; inspection lot data from QM is accessible in PP batch genealogy |

---

### Test Data

**Dataset Reference:** `testdata/CS-56/CS-56-testdata.json` — Dataset ID: `TD-CS-056-INT-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Goods Batch (QM Integration) | `{TD.finishedGoodsBatchIntegrationQM}` | Finished product batch with QM inspection data — entered by user | Valid |
| Inspection Lot Number | `{TD.inspectionLotNumber}` | QM inspection lot number — displayed in genealogy | Valid |
| Inspection Results | `{TD.inspectionResults}` | In-process control results (Pass/Fail or characteristic values) — displayed in genealogy | Valid |
| Release Date | `{TD.releaseDate}` | Date when batch was released to unrestricted use based on QM decision — displayed in genealogy | Valid |
| Usage Decision | `{TD.usageDecision}` | QM usage decision (e.g., "Released", "Approved") — displayed in genealogy | Valid |
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
| 9 | In the "Batch" field, enter the finished goods batch number | `{TD.finishedGoodsBatchIntegrationQM}` | Batch number is entered into the field |
| 10 | Press Enter to confirm the batch entry | — | SAP validates the batch number; the field is accepted |
| 11 | Click the "Go" button or press Enter to execute the search | — | SAP begins processing the genealogy query |
| 12 | Observe the query execution and wait for results to load | — | Genealogy report is displayed showing the batch structure |
| 13 | Verify that the finished goods batch number is displayed | `{TD.finishedGoodsBatchIntegrationQM}` | Batch number is displayed as the root node or starting point |
| 14 | Locate the quality inspection information section in the report (may be in the batch header or detail panel) | — | Quality inspection section is visible with inspection-related data |
| 15 | Verify that the inspection lot number from QM is displayed | `{TD.inspectionLotNumber}` | Inspection lot number is shown, confirming QM-PP data linkage |
| 16 | Verify that the in-process control results are displayed | `{TD.inspectionResults}` | Inspection results (e.g., "Pass", "All characteristics within specification", or specific characteristic values) are shown in the report |
| 17 | Verify that the release date is displayed | `{TD.releaseDate}` | Release date is shown indicating when the batch was released to unrestricted use based on QM decision |
| 18 | Verify that the usage decision from QM is displayed | `{TD.usageDecision}` | Usage decision (e.g., "Released", "Approved", "Accepted") is shown, confirming QM release status |
| 19 | If the system supports drill-down to QM inspection lot, verify that the inspection lot is accessible | `{TD.inspectionLotNumber}` | Inspection lot number is clickable or accessible via drill-down, allowing navigation to detailed QM inspection results |
| 20 | Verify that the integration provides complete quality traceability for the batch | — | Genealogy report shows complete quality data: inspection lot number, in-process control results, usage decision, and release date, enabling quality-related recall investigations |
| 21 | Verify that the query completes within an acceptable time frame | — | Query completes within acceptable threshold (typically under 10 seconds) |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Batch Information Cockpit successfully displays QM inspection lot data in the PP batch genealogy report
- Inspection lot number from QM is correctly displayed in the genealogy report
- In-process control results and usage decision from QM are displayed in the genealogy report
- Release date based on QM decision is displayed
- QM-PP integration provides complete quality traceability for regulatory recall investigations
- The Production Supervisor can identify inspection results and release status for batches involved in recall investigations
- The query completes within an acceptable time frame

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

**Integration Verification:**
- Inspection lot number in genealogy report: _______
- Inspection lot number in QM (verified separately): _______
- Match status: PASS (match) / FAIL (mismatch)

**Inspection Results Display:**
- In-process control results shown: _______
- Usage decision shown: _______
- Release date shown: _______

---

**Note:** This test case requires pre-existing QM inspection lot with recorded results and usage decision. Test data orchestration is complex; automation is PARTIAL due to multi-module data dependencies (PP production confirmation → QM inspection lot creation → QM results recording → batch release).
