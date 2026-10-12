# TC-CS-130: Attempt to record deviation for in-spec result (result within specification limits)

**User Story:**          [CS-55] Record A Deviation Directly Against An In-Process Control Result That
**Epic:**                N/A — no epic assigned
**Module:**              PP — Production Planning & QM — Quality Management
**Feature:**             Quality Deviation Recording Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to create and manage Quality Notifications (QM02, QM03) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Process Order | Process Order `{TD.processOrder}` exists in RELEASED or CONFIRMED status with active production operations |
| P4 | Material Master | Material `{TD.materialId}` is created, released, and has an active inspection plan assigned for plant `{TD.plant}` |
| P5 | Batch | Batch `{TD.batchNumber}` exists and is linked to process order `{TD.processOrder}` |
| P6 | Inspection Plan | In-process inspection plan is assigned to operation `{TD.operationNumber}` for material `{TD.materialId}` with characteristic `{TD.characteristic}` and specification limits defined |
| P7 | In-Process Result | An in-process control result has been recorded for characteristic `{TD.characteristic}` with value `{TD.inspectionResultInSpec}` that is WITHIN the specification limits (result is acceptable) |

---

### Test Data

**Dataset Reference:** `testdata/CS-55/CS-55-testdata.json` — Dataset ID: `TD-CS-055-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order | `{TD.processOrder}` | Manufacturing process order number | Valid |
| Operation Number | `{TD.operationNumber}` | Operation number within process order routing | Valid |
| Batch Number | `{TD.batchNumber}` | Batch number linked to process order | Valid |
| Material ID | `{TD.materialId}` | Material master number | Valid |
| Characteristic | `{TD.characteristic}` | Inspection characteristic code from inspection plan | Valid |
| In-Process Result (In-Spec) | `{TD.inspectionResultInSpec}` | Inspection result value WITHIN specification limits | Invalid for deviation (in-spec) |
| Spec Lower Limit | `{TD.specLowerLimit}` | Lower specification limit for characteristic | Valid |
| Spec Upper Limit | `{TD.specUpperLimit}` | Upper specification limit for characteristic | Valid |

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
| 9 | Filter for Process Order `{TD.processOrder}` and click "Go" | `{TD.processOrder}` | Inspection results for the process order are displayed |
| 10 | Locate the inspection result row for operation `{TD.operationNumber}`, characteristic `{TD.characteristic}`, with result value `{TD.inspectionResultInSpec}` (within specification limits) | — | The in-spec inspection result row is visible in the list |
| 11 | Verify that the result value `{TD.inspectionResultInSpec}` is within the specification limits (between `{TD.specLowerLimit}` and `{TD.specUpperLimit}`) | `{TD.inspectionResultInSpec}`, `{TD.specLowerLimit}`, `{TD.specUpperLimit}` | Result value is within specification (in-spec); result is acceptable |
| 12 | Select the in-spec inspection result row by clicking on it | — | Inspection result row is selected |
| 13 | Observe whether the "Create Deviation" button is enabled or disabled in the toolbar | — | The "Create Deviation" button is DISABLED or NOT VISIBLE for in-spec results |
| 14 | Attempt to click the "Create Deviation" button (if it is enabled) | — | If button is enabled, clicking it should trigger a validation error message; if button is disabled, no action occurs |
| 15 | Observe the system response | — | System displays an error message: "Result is within specification — deviation not required" or "Deviation cannot be created for in-spec results" or button remains disabled |
| 16 | Verify that no Quality Notification (Deviation) is created | — | No Deviation Number is generated; no deviation record is persisted |
| 17 | Verify that the in-spec result remains in the list without any deviation linkage | — | Inspection result row does not have a linked deviation indicator |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System prevents deviation creation for in-spec inspection results
- "Create Deviation" button is disabled or not visible for in-spec results
- If button is enabled, system displays validation error: "Result is within specification — deviation not required"
- No Quality Notification (Deviation) is created
- In-spec inspection result remains in the list without deviation linkage

---

### Post-conditions

- No SAP Quality Notification (Deviation) document is created
- In-spec inspection result is unchanged
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
