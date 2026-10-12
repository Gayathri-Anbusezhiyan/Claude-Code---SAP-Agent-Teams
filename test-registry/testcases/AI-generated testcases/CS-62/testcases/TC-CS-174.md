# TC-CS-174: Attempt Technical Completion with Exactly One Open Deviation (Lower Boundary Invalid)

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
| P3 | Process Order | Process order `{TD.processOrderNumberOneDev}` exists in SAP with status Released (REL) |
| P4 | Open Deviations | Exactly ONE (1) open deviation `{TD.singleOpenDeviationId}` is linked to process order `{TD.processOrderNumberOneDev}` — boundary case: 1 vs 0 |
| P5 | IPC Results | All required in-process control (IPC) inspection results are recorded (IPC requirement is satisfied) |
| P6 | Batch Records | All mandatory batch record sections are signed (signature requirement is satisfied) |
| P7 | Stock Status | Finished goods batch exists with stock status "Quality Inspection" (QI) |

---

### Test Data

**Dataset Reference:** `testdata/CS-62/CS-62-testdata.json` — Dataset ID: `TD-CS-062-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumberOneDev}` | Process order with exactly one open deviation — entered by the user | Valid (order exists) |
| Single Open Deviation ID | `{TD.singleOpenDeviationId}` | Deviation ID (exactly 1 open) | Invalid (blocks TECO — boundary crossed) |
| Open Deviations Count | `{TD.openDeviationsCountOne}` | Count of open deviations (exactly 1) | Invalid (boundary value — not acceptable) |
| Expected Error Message | `{TD.expectedErrorOneDev}` | Expected system error message for exactly one open deviation | N/A |

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
| 9 | In the "Order" field, enter the Process Order Number | `{TD.processOrderNumberOneDev}` | Process Order Number is entered into the field |
| 10 | Press Enter to confirm the Order entry | — | SAP loads the process order details; order header information is displayed |
| 11 | Verify the order status is "Released" (REL) | — | Order status shows as Released (REL) |
| 12 | Navigate to QM Deviation Management application (via search bar) to verify exactly one open deviation | — | QM Deviation Management application opens |
| 13 | Search for deviations linked to process order `{TD.processOrderNumberOneDev}` | `{TD.processOrderNumberOneDev}` | Search result shows exactly one (1) open deviation: `{TD.singleOpenDeviationId}` |
| 14 | Verify the deviation count is exactly 1 and status is NOT "Closed" | `{TD.openDeviationsCountOne}` = 1 | Deviation count = 1; deviation `{TD.singleOpenDeviationId}` status is "Open" or "In Progress" |
| 15 | Navigate back to the Confirm Process Order application | — | Confirm Process Order application opens |
| 16 | Navigate to the Technical Completion action in the application toolbar or menu | — | Technical Completion (TECO) button or menu option is visible and enabled |
| 17 | Click the "Technical Completion" (TECO) button | — | SAP begins pre-completion validation checks |
| 18 | Observe the system validation process | — | System checks for open deviations (expects 0, finds 1) |
| 19 | Verify a blocking error message is displayed | `{TD.expectedErrorOneDev}` | Error message is displayed: "Technical Completion blocked. Open deviations: `{TD.singleOpenDeviationId}`" or similar; message lists the single deviation ID |
| 20 | Verify the Technical Completion action is NOT executed | — | Order status remains "Released" (REL); TECO is blocked (boundary crossed: 1 > 0) |
| 21 | Verify the process order status has NOT changed to TECO | `{TD.processOrderNumberOneDev}` | Order status remains "Released" (REL); TECO was successfully blocked |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Technical Completion (TECO) is BLOCKED by the system for process order `{TD.processOrderNumberOneDev}` with exactly one (1) open deviation
- System displays a specific error message listing the single open deviation: "Technical Completion blocked. Open deviations: `{TD.singleOpenDeviationId}`" or similar
- Order status remains "Released" (REL) and does NOT transition to "TECO"
- System correctly validates the lower boundary: 0 open deviations = valid; 1 open deviation = invalid (blocks TECO)
- Boundary condition (1 vs 0) is correctly enforced by SAP

---

### Post-conditions

- Process order status remains "Released" (REL)
- Open deviation count remains 1 (single deviation `{TD.singleOpenDeviationId}` persists)
- TECO action is not recorded in audit log (action was blocked before execution)
- Stock status for batch remains "Quality Inspection" (QI) — no change

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
