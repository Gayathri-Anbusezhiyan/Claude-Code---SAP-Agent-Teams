# TC-CS-178: Verify Missing IPC Results from QM In-Process Control Block TECO (QM Integration)

**User Story:**          [CS-62] Technically Complete A Process Order Only After All Mandatory Quality
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control (PP) — Integration with Quality Management (QM)
**Feature:**             Process Order Technical Completion (TECO) and QM In-Process Control (IPC)
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
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to execute Technical Completion (TECO) for process orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Process Order | Process order `{TD.processOrderNumberIntQMIPC}` exists in SAP with status Released (REL) |
| P4 | QM IPC | At least one required in-process control (IPC) inspection characteristic for operation `{TD.ipcOperationNumberInt}` has NOT been recorded in QM In-Process Control module |
| P5 | Deviations | All deviations linked to the order are closed (deviation requirement is satisfied) |
| P6 | Batch Records | All mandatory batch record sections are signed (signature requirement is satisfied) |

---

### Test Data

**Dataset Reference:** `testdata/CS-62/CS-62-testdata.json` — Dataset ID: `TD-CS-062-INT-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumberIntQMIPC}` | Process order with missing QM IPC results — entered by the user | Valid (order exists) |
| IPC Operation Number | `{TD.ipcOperationNumberInt}` | Operation number with missing IPC inspection results in QM | Invalid (IPC incomplete) |
| Missing IPC Characteristic | `{TD.missingIPCCharacteristicInt}` | Inspection characteristic from QM IPC that has not been recorded | Invalid (blocks TECO) |
| Expected Error Message | `{TD.expectedErrorQMIPCInt}` | Expected system error message listing missing QM IPC results | N/A |

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
| 7 | Click the search icon (top-right shell bar) and type "In-Process Control" or "QM IPC" | — | Search results appear listing the QM In-Process Control application |
| 8 | Click "In-Process Control" or equivalent QM IPC application from the search results | — | QM In-Process Control application opens |
| 9 | Search for IPC results for process order `{TD.processOrderNumberIntQMIPC}` and operation `{TD.ipcOperationNumberInt}` | `{TD.processOrderNumberIntQMIPC}`, `{TD.ipcOperationNumberInt}` | IPC results list is displayed for the order and operation |
| 10 | Verify the inspection characteristic `{TD.missingIPCCharacteristicInt}` has NO recorded result in QM IPC | `{TD.missingIPCCharacteristicInt}` | Characteristic shows as "Not Recorded" or blank in QM module; no inspection result value is present |
| 11 | Note the operation number and missing characteristic for verification after TECO attempt | — | Operation and characteristic IDs are recorded |
| 12 | Navigate to the Confirm Process Order application (via search bar) | — | Confirm Process Order application opens |
| 13 | In the "Order" field, enter the Process Order Number | `{TD.processOrderNumberIntQMIPC}` | Process Order Number is entered into the field |
| 14 | Press Enter to confirm the Order entry | — | SAP loads the process order details; order header information is displayed |
| 15 | Verify the order status is "Released" (REL) | — | Order status shows as Released (REL) |
| 16 | Navigate to the Technical Completion action in the application toolbar or menu | — | Technical Completion (TECO) button or menu option is visible and enabled |
| 17 | Click the "Technical Completion" (TECO) button | — | SAP begins pre-completion validation checks |
| 18 | Observe the system validation process — SAP queries QM In-Process Control for missing IPC results | — | System integration call to QM IPC module retrieves inspection result status for the process order |
| 19 | Verify a blocking error message is displayed listing the missing QM IPC results | `{TD.expectedErrorQMIPCInt}` | Error message is displayed: "Technical Completion blocked. Missing in-process control results for operation `{TD.ipcOperationNumberInt}`, characteristic `{TD.missingIPCCharacteristicInt}`" or similar; message includes operation and characteristic from QM IPC module |
| 20 | Verify the Technical Completion action is NOT executed | — | Order status remains "Released" (REL); TECO is blocked due to missing IPC results in QM |
| 21 | Navigate back to the QM In-Process Control application (via search bar) | — | QM In-Process Control application opens |
| 22 | Verify the inspection characteristic `{TD.missingIPCCharacteristicInt}` remains unrecorded in QM IPC | `{TD.missingIPCCharacteristicInt}` | Characteristic status in QM IPC module is still "Not Recorded" or blank; IPC result is still missing |
| 23 | Navigate back to the Confirm Process Order application | — | Confirm Process Order application opens |
| 24 | Verify the process order `{TD.processOrderNumberIntQMIPC}` status has NOT changed to TECO | `{TD.processOrderNumberIntQMIPC}` | Order status remains "Released" (REL); integration between PP and QM IPC correctly blocked TECO |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Technical Completion (TECO) is BLOCKED by the system for process order `{TD.processOrderNumberIntQMIPC}` due to missing IPC results in QM In-Process Control module
- System integration between PP (Process Order TECO) and QM (In-Process Control) is correct: missing IPC results in QM block TECO in PP
- Error message lists the specific missing IPC operation and characteristic from QM: `{TD.ipcOperationNumberInt}`, `{TD.missingIPCCharacteristicInt}`
- Order status remains "Released" (REL)
- IPC result status in QM IPC module remains "Not Recorded" (unchanged)
- Cross-module quality gate is correctly enforced — no batch can be technically completed while mandatory IPC results are missing in QM

---

### Post-conditions

- Process order status remains "Released" (REL)
- QM IPC characteristic `{TD.missingIPCCharacteristicInt}` for operation `{TD.ipcOperationNumberInt}` remains unrecorded
- TECO action is not recorded in audit log (action was blocked before execution)
- Integration between PP and QM IPC modules is validated

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
