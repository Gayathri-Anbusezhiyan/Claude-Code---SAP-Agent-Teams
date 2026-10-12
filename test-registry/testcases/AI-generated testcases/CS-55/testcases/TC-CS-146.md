# TC-CS-146: In-process result 0.01 above upper spec limit (should trigger deviation)

**User Story:**          [CS-55] Record A Deviation Directly Against An In-Process Control Result That
**Epic:**                N/A — no epic assigned
**Module:**              PP — Production Planning & QM — Quality Management
**Feature:**             Deviation Trigger Logic — Above Upper Spec Limit
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to view and manage in-process inspection results and create deviations |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Process Order | Process Order exists with an in-process inspection result recorded |
| P4 | Inspection Plan | In-process inspection plan has characteristic with lower specification limit `{TD.specLowerLimit}` and upper specification limit `{TD.specUpperLimit}` defined |
| P5 | In-Process Result | An in-process control result has been recorded for the characteristic with value 0.01 above the upper spec limit `{TD.inspectionResultAboveUpperSpec}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-55/CS-55-testdata.json` — Dataset ID: `TD-CS-055-EDGE-008`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order | `{TD.processOrder}` | Manufacturing process order number | Valid |
| Operation Number | `{TD.operationNumber}` | Operation number within process order routing | Valid |
| Characteristic | `{TD.characteristic}` | Inspection characteristic code | Valid |
| In-Process Result (Above Upper Spec) | `{TD.inspectionResultAboveUpperSpec}` | Inspection result value 0.01 above upper spec limit | Valid (out-of-spec — above upper) |
| Spec Lower Limit | `{TD.specLowerLimit}` | Lower specification limit | Valid |
| Spec Upper Limit | `{TD.specUpperLimit}` | Upper specification limit | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage In-Process Inspection Results" | — | Search results appear listing the "Manage In-Process Inspection Results" application |
| 8 | Click the "Manage In-Process Inspection Results" application from the search results | — | Application opens showing the inspection results list |
| 9 | Filter for Process Order and click "Go" | `{TD.processOrder}` | Inspection results for the process order are displayed |
| 10 | Locate the inspection result row for operation, characteristic, with result value 0.01 above upper spec limit | `{TD.operationNumber}`, `{TD.characteristic}`, `{TD.inspectionResultAboveUpperSpec}` | Inspection result row is visible |
| 11 | Verify that the result value is 0.01 above the upper spec limit | `{TD.inspectionResultAboveUpperSpec}` > `{TD.specUpperLimit}` (e.g., result = 10.01, spec upper = 10.0) | Result value is above the upper spec limit by 0.01 |
| 12 | Verify that the result is displayed as OUT-OF-SPEC (outside specification) | — | Result status indicator shows "Out of Spec" or red color indicating non-acceptable result |
| 13 | Select the out-of-spec inspection result row | — | Row is selected |
| 14 | Observe whether the "Create Deviation" button is enabled | — | "Create Deviation" button is ENABLED (result is out-of-spec — deviation required) |
| 15 | Click the "Create Deviation" button | — | "Create Quality Notification" Fiori app opens with pre-populated context |
| 16 | Verify that the Inspection Result field is auto-populated with the out-of-spec value | `{TD.inspectionResultAboveUpperSpec}` | Inspection Result field displays the value 0.01 above the upper spec limit |
| 17 | Verify that the Upper Spec Limit field is displayed | `{TD.specUpperLimit}` | Upper Spec Limit field displays the spec limit value |
| 18 | Verify that the deviation form is ready for CAPA documentation | — | Deviation form is open with all context fields pre-populated; CAPA fields are editable |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- In-process result 0.01 above the upper spec limit is treated as OUT-OF-SPEC (non-acceptable)
- "Create Deviation" button is enabled for this out-of-spec result
- Deviation creation is triggered; Quality Notification form opens with pre-populated context
- System correctly interprets specification limits: result > upper limit = out-of-spec (deviation required)

---

### Post-conditions

- Deviation creation is initiated for the out-of-spec result above the upper boundary
- Process order operation will be placed on hold once the deviation is saved
- No application-level errors remain outstanding

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
