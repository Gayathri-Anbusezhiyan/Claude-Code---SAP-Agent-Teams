# TC-CS-147: Verify deviation creation triggered from Fiori app "Manage In-Process Inspection Results"

**User Story:**          [CS-55] Record A Deviation Directly Against An In-Process Control Result That
**Epic:**                N/A — no epic assigned
**Module:**              PP — Production Planning & QM — Quality Management
**Feature:**             PP-QM Integration — In-Process Inspection Results to Deviation Creation
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
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to manage in-process inspection results (QM) and create Quality Notifications (QM02) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Process Order | Process Order `{TD.processOrder}` exists in RELEASED or CONFIRMED status with active production operations |
| P4 | In-Process Result | An in-process control result has been recorded for characteristic `{TD.characteristic}` with value `{TD.inspectionResultOutOfSpec}` that falls outside specification limits |
| P5 | Module Integration | PP (Production Planning) and QM (Quality Management) modules are integrated; "Create Deviation" function is enabled from In-Process Inspection Results app |

---

### Test Data

**Dataset Reference:** `testdata/CS-55/CS-55-testdata.json` — Dataset ID: `TD-CS-055-INT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order | `{TD.processOrder}` | Manufacturing process order number | Valid |
| Operation Number | `{TD.operationNumber}` | Operation number within process order routing | Valid |
| Batch Number | `{TD.batchNumber}` | Batch number linked to process order | Valid |
| Material ID | `{TD.materialId}` | Material master number | Valid |
| Characteristic | `{TD.characteristic}` | Inspection characteristic code | Valid |
| In-Process Result (Out-of-Spec) | `{TD.inspectionResultOutOfSpec}` | Inspection result value outside specification | Valid (out-of-spec) |

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
| 10 | Locate the out-of-spec inspection result row for operation and characteristic | `{TD.operationNumber}`, `{TD.characteristic}`, `{TD.inspectionResultOutOfSpec}` | Out-of-spec inspection result row is visible |
| 11 | Select the out-of-spec inspection result row | — | Row is selected |
| 12 | Verify that the "Create Deviation" button is visible and enabled in the toolbar | — | "Create Deviation" button is displayed and enabled |
| 13 | Click the "Create Deviation" button | — | System initiates the navigation from "Manage In-Process Inspection Results" app to "Create Quality Notification" app |
| 14 | Verify that the "Create Quality Notification" Fiori app opens | — | "Create Quality Notification" app is displayed; Quality Notification form is open |
| 15 | Verify that the Quality Notification form is pre-populated with context data from the inspection result | — | Form displays auto-populated fields: Process Order, Operation, Batch, Material, Characteristic, Inspection Result |
| 16 | Verify that Process Order field is auto-populated | `{TD.processOrder}` | Process Order field displays the correct process order number from the inspection result context |
| 17 | Verify that Operation field is auto-populated | `{TD.operationNumber}` | Operation field displays the correct operation number |
| 18 | Verify that Batch field is auto-populated | `{TD.batchNumber}` | Batch field displays the correct batch number |
| 19 | Verify that Material field is auto-populated | `{TD.materialId}` | Material field displays the correct material number |
| 20 | Verify that Characteristic field is auto-populated | `{TD.characteristic}` | Characteristic field displays the correct characteristic code |
| 21 | Verify that Inspection Result field is auto-populated | `{TD.inspectionResultOutOfSpec}` | Inspection Result field displays the out-of-spec value |
| 22 | Verify that the integration has successfully passed all context data from PP module (In-Process Inspection) to QM module (Deviation Creation) | — | All context fields are accurately pre-populated; no manual data entry is required for context data; integration is seamless |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- "Create Deviation" button is accessible from "Manage In-Process Inspection Results" Fiori app
- Clicking the button successfully navigates from PP module (In-Process Inspection) to QM module (Deviation Creation)
- "Create Quality Notification" app opens with all inspection result context data pre-populated
- Integration between PP and QM modules is verified: Process Order, Operation, Batch, Material, Characteristic, and Inspection Result values are correctly transferred
- No manual data entry is required for context fields (integration automation is confirmed)

---

### Post-conditions

- Integration between "Manage In-Process Inspection Results" app (PP) and "Create Quality Notification" app (QM) is verified
- Context data transfer is accurate and complete
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
