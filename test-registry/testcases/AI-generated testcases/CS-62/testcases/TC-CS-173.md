# TC-CS-173: Technical Completion with Zero Open Deviations (Lower Boundary Valid)

**User Story:**          [CS-62] Technically Complete A Process Order Only After All Mandatory Quality
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control (PP)
**Feature:**             Process Order Technical Completion (TECO)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to execute Technical Completion (TECO) for process orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Process Order | Process order `{TD.processOrderNumberZeroDev}` exists in SAP with status Released (REL) |
| P4 | Deviations | Exactly ZERO (0) open deviations are linked to process order `{TD.processOrderNumberZeroDev}` — boundary case: 0 vs 1+ |
| P5 | IPC Results | All required in-process control (IPC) inspection results are recorded |
| P6 | Batch Records | All mandatory batch record sections are signed |
| P7 | Stock Status | Finished goods batch exists with stock status "Quality Inspection" (QI) |

---

### Test Data

**Dataset Reference:** `testdata/CS-62/CS-62-testdata.json` — Dataset ID: `TD-CS-062-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumberZeroDev}` | Process order with exactly zero open deviations — entered by the user | Valid (boundary lower) |
| Open Deviations Count | `{TD.openDeviationsCountZero}` | Count of open deviations (exactly 0) | Valid (boundary value) |

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
| 7 | Click the search icon (top-right shell bar) and type "Confirm Process Order" | — | Search results appear listing the "Confirm Process Order" application |
| 8 | Click "Confirm Process Order" from the search results | — | The Confirm Process Order application opens |
| 9 | In the "Order" field, enter the Process Order Number | `{TD.processOrderNumberZeroDev}` | Process Order Number is entered into the field |
| 10 | Press Enter to confirm the Order entry | — | SAP loads the process order details; order header information is displayed |
| 11 | Verify the order status is "Released" (REL) | — | Order status shows as Released (REL) |
| 12 | Navigate to QM Deviation Management application (via search bar) to verify zero deviations | — | QM Deviation Management application opens |
| 13 | Search for deviations linked to process order `{TD.processOrderNumberZeroDev}` | `{TD.processOrderNumberZeroDev}` | Search result shows zero (0) open deviations OR "No data found"; deviation count = 0 |
| 14 | Navigate back to the Confirm Process Order application | — | Confirm Process Order application opens |
| 15 | Navigate to the Technical Completion action in the application toolbar or menu | — | Technical Completion (TECO) button or menu option is visible and enabled |
| 16 | Click the "Technical Completion" (TECO) button | — | SAP begins pre-completion validation checks |
| 17 | Observe the system validation process | — | System checks for open deviations (expects 0), missing IPC results, and unsigned batch record sections |
| 18 | Verify NO blocking validation messages appear | `{TD.openDeviationsCountZero}` = 0 | No error or warning messages appear; deviation check passes with count = 0 (valid lower boundary) |
| 19 | Confirm the Technical Completion action in the confirmation dialog (if prompted) | — | TECO action is submitted to SAP |
| 20 | Observe the success confirmation message | — | Success message is displayed: "Order `{TD.processOrderNumberZeroDev}` technically completed" or similar |
| 21 | Verify the order status is updated to "Technically Completed" (TECO) | — | Order status shows "TECO" (Technically Completed) |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Technical Completion (TECO) is SUCCESSFUL for process order `{TD.processOrderNumberZeroDev}` with exactly zero (0) open deviations
- Order status is updated to "TECO" (Technically Completed)
- System correctly validates that 0 open deviations is the valid lower boundary (0 is acceptable; 1+ would block TECO)
- No error messages are displayed
- Boundary condition (0 vs 1+) is correctly handled by SAP

---

### Post-conditions

- Process order status is "TECO" (Technically Completed)
- Deviation count remains 0 (no open deviations)
- Stock status for batch remains "QI" (Quality Inspection) — awaiting QA release
- TECO action is recorded in audit log

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
