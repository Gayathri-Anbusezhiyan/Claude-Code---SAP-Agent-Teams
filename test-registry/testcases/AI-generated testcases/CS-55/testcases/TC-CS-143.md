# TC-CS-143: In-process result exactly at lower spec limit (should NOT trigger deviation)

**User Story:**          [CS-55] Record A Deviation Directly Against An In-Process Control Result That
**Epic:**                N/A — no epic assigned
**Module:**              PP — Production Planning & QM — Quality Management
**Feature:**             Deviation Trigger Logic — Lower Spec Limit Boundary
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
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to view and manage in-process inspection results |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Process Order | Process Order exists with an in-process inspection result recorded |
| P4 | Inspection Plan | In-process inspection plan has characteristic with lower specification limit `{TD.specLowerLimit}` and upper specification limit `{TD.specUpperLimit}` defined |
| P5 | In-Process Result | An in-process control result has been recorded for the characteristic with value exactly equal to the lower spec limit `{TD.inspectionResultAtLowerSpec}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-55/CS-55-testdata.json` — Dataset ID: `TD-CS-055-EDGE-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order | `{TD.processOrder}` | Manufacturing process order number | Valid |
| Operation Number | `{TD.operationNumber}` | Operation number within process order routing | Valid |
| Characteristic | `{TD.characteristic}` | Inspection characteristic code | Valid |
| In-Process Result (At Lower Spec) | `{TD.inspectionResultAtLowerSpec}` | Inspection result value exactly at lower spec limit | Valid (in-spec — at boundary) |
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
| 10 | Locate the inspection result row for operation, characteristic, with result value exactly at lower spec limit | `{TD.operationNumber}`, `{TD.characteristic}`, `{TD.inspectionResultAtLowerSpec}` | Inspection result row is visible |
| 11 | Verify that the result value equals the lower spec limit | `{TD.inspectionResultAtLowerSpec}` = `{TD.specLowerLimit}` | Result value is exactly at the lower spec limit (e.g., result = 5.0, spec lower = 5.0) |
| 12 | Verify that the result is displayed as IN-SPEC (within specification) | — | Result status indicator shows "In Spec" or green color indicating acceptable result |
| 13 | Select the inspection result row | — | Row is selected |
| 14 | Observe whether the "Create Deviation" button is enabled or disabled | — | "Create Deviation" button is DISABLED or NOT VISIBLE (result is in-spec at the boundary — no deviation required) |
| 15 | Verify that no deviation can be created for this result | — | No deviation creation is possible; system treats the boundary value as acceptable |
| 16 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 17 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 18 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- In-process result exactly at the lower spec limit is treated as IN-SPEC (acceptable)
- "Create Deviation" button is disabled or not visible for this result
- No deviation is required for boundary-compliant results
- System correctly interprets specification limits: result >= lower limit AND result <= upper limit = in-spec

---

### Post-conditions

- No deviation is created for the in-spec result at the lower boundary
- Process order continues normal flow without hold
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
