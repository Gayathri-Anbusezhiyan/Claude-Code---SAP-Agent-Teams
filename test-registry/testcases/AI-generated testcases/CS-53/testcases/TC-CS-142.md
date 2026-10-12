# TC-CS-142: Verify PP-QM integration — process order confirmations and inspection results compiled into batch record

**User Story:**          [CS-53] Review And Electronically Sign Off The Electronic Batch Record (Ebr) G
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control / Quality Management (PP-QM)
**Feature:**             Electronic Batch Record Data Compilation (PP-QM Integration)
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
| P1 | User Role | User has the role of QA Reviewer with SAP authorization to review and approve batch records |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Process Order | Process Order `{TD.processOrderNumberIntegration}` exists, is fully confirmed with all operations complete, and has status TECO (technically complete) |
| P4 | Batch | Batch `{TD.batchNumberIntegration}` exists, is linked to Process Order `{TD.processOrderNumberIntegration}` |
| P5 | PP Module Data | Process order confirmations exist in PP module (AFRU table) with component consumption data (MSEG table) |
| P6 | QM Module Data | Inspection lot exists in QM module (QALS table) with inspection results (QAMR table) linked to batch `{TD.batchNumberIntegration}` |
| P7 | Integration | SAP PP-QM integration is configured; batch record compilation pulls data from PP and QM modules |

---

### Test Data

**Dataset Reference:** `testdata/CS-53/CS-53-testdata.json` — Dataset ID: `TD-CS-53-INT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumberIntegration}` | Process order number in TECO status — entered by the user | Valid |
| Batch Number | `{TD.batchNumberIntegration}` | Batch number linked to process order — entered by the user | Valid |
| Expected Operation Count | `{TD.expectedOperationCount}` | Number of operations confirmed in PP module — auto-populated | Valid |
| Expected Component Count | `{TD.expectedComponentCount}` | Number of components consumed in PP module — auto-populated | Valid |
| Expected Inspection Lot | `{TD.expectedInspectionLot}` | Inspection lot number from QM module — auto-populated | Valid |
| Expected Control Result Count | `{TD.expectedControlResultCount}` | Number of in-process control results from QM module — auto-populated | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Review Batch Records" | — | Search results appear listing the "Review Batch Records" application |
| 8 | Click "Review Batch Records" from the search results | — | "Review Batch Records" application opens displaying the batch selection screen |
| 9 | In the "Process Order" field, enter the Process Order Number | `{TD.processOrderNumberIntegration}` | Process Order Number is entered into the field |
| 10 | Press Enter to confirm the Process Order entry | — | SAP validates the process order; batch record compilation begins; system pulls data from PP module (AFRU, MSEG tables) |
| 11 | In the "Batch" field, enter the Batch Number | `{TD.batchNumberIntegration}` | Batch Number is entered into the field |
| 12 | Press Enter to confirm the Batch entry | — | SAP validates the batch; batch record details are loaded; system pulls data from QM module (QALS, QAMR tables) |
| 13 | Verify that the "Operation Confirmations" section displays all confirmed operations from PP module | `{TD.expectedOperationCount}` | All process order operations are listed with confirmation statuses; operation count matches expected value `{TD.expectedOperationCount}` |
| 14 | Verify that operation details include operation number, work center, confirmed quantity, and confirmation date/time | — | Each operation displays complete confirmation data from PP module (AFRU table) |
| 15 | Verify that the "Component Consumption" section displays all consumed materials from PP module | `{TD.expectedComponentCount}` | All components consumed during production are listed with quantities; component count matches expected value `{TD.expectedComponentCount}` |
| 16 | Verify that component details include material number, material description, consumed quantity, unit of measure, and goods movement date | — | Each component displays complete consumption data from PP module (MSEG table) |
| 17 | Verify that the "In-Process Control Results" section displays inspection lot number from QM module | `{TD.expectedInspectionLot}` | Inspection lot number is displayed; it matches the expected value `{TD.expectedInspectionLot}` from QM module (QALS table) |
| 18 | Verify that all in-process control characteristics and results from QM module are displayed | `{TD.expectedControlResultCount}` | All mandatory inspection characteristics are listed with results; result count matches expected value `{TD.expectedControlResultCount}` |
| 19 | Verify that control result details include characteristic name, recorded value, target value, specification limits, and result status (In Spec / Out of Spec) | — | Each characteristic displays complete inspection data from QM module (QAMR table) |
| 20 | Verify that batch record compilation correctly integrates PP and QM data into a single structured document | — | All data from PP module (operations, components) and QM module (inspection lot, results) is compiled and displayed in a cohesive batch record structure |
| 21 | Verify that no data is missing or duplicated between PP and QM sections | — | Batch record is complete; no missing operations, components, or inspection results; no duplicate entries |
| 22 | Verify that all timestamps (confirmation dates, inspection dates) are displayed in consistent format | — | Timestamps are displayed in UTC or system-configured format; no inconsistency between PP and QM data timestamps |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Batch record successfully compiles data from both PP module (process order confirmations, component consumption) and QM module (inspection lot, in-process control results)
- PP-QM integration is functioning correctly; data flows seamlessly from PP (production execution) to QM (quality inspection) to batch record compilation
- All operation confirmations from PP module (AFRU table) are displayed with correct details (operation number, work center, quantity, date/time)
- All component consumption data from PP module (MSEG table) is displayed with correct details (material, quantity, UoM, date)
- Inspection lot number from QM module (QALS table) is displayed and linked to the batch
- All in-process control results from QM module (QAMR table) are displayed with correct details (characteristic, value, specification, status)
- Batch record structure is complete, accurate, and ready for approval; no data loss or duplication occurs during PP-QM integration

---

### Post-conditions

- Batch record is compiled with complete PP and QM data; ready for approval workflow
- No integration errors or data synchronization issues are present
- PP module data (operations, components) and QM module data (inspection lot, results) remain intact in their respective source tables
- No application-level errors or critical warnings remain outstanding

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
