# TC-CS-177: Verify Open Deviations from QM Deviation Management Block TECO (QM Integration)

**User Story:**          [CS-62] Technically Complete A Process Order Only After All Mandatory Quality
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control (PP) — Integration with Quality Management (QM)
**Feature:**             Process Order Technical Completion (TECO) and QM Deviation Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to execute Technical Completion (TECO) for process orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Process Order | Process order `{TD.processOrderNumberIntQMDev}` exists in SAP with status Released (REL) |
| P4 | QM Deviation | At least one open deviation `{TD.qmDeviationIdInt}` exists in QM Deviation Management module and is linked to process order `{TD.processOrderNumberIntQMDev}` |
| P5 | Deviation Status | Deviation `{TD.qmDeviationIdInt}` status is NOT "Closed" in QM Deviation Management |
| P6 | IPC Results | All required in-process control (IPC) inspection results are recorded (IPC requirement is satisfied) |
| P7 | Batch Records | All mandatory batch record sections are signed (signature requirement is satisfied) |

---

### Test Data

**Dataset Reference:** `testdata/CS-62/CS-62-testdata.json` — Dataset ID: `TD-CS-062-INT-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumberIntQMDev}` | Process order with open QM deviation — entered by the user | Valid (order exists) |
| QM Deviation ID | `{TD.qmDeviationIdInt}` | Deviation ID from QM Deviation Management module | Invalid (blocks TECO) |
| Deviation Status | `{TD.qmDeviationStatusInt}` | Deviation status in QM (e.g., "Open", "In Progress") | Invalid (not "Closed") |
| Expected Error Message | `{TD.expectedErrorQMDevInt}` | Expected system error message listing QM deviation | N/A |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Deviations" or "QM Deviation Management" | — | Search results appear listing the QM Deviation Management application |
| 8 | Click "Manage Deviations" or equivalent QM application from the search results | — | QM Deviation Management application opens |
| 9 | Search for deviations linked to process order `{TD.processOrderNumberIntQMDev}` | `{TD.processOrderNumberIntQMDev}` | Deviation list is displayed for the process order |
| 10 | Verify deviation `{TD.qmDeviationIdInt}` exists and is NOT closed | `{TD.qmDeviationIdInt}`, `{TD.qmDeviationStatusInt}` | Deviation `{TD.qmDeviationIdInt}` is displayed with status "Open" or "In Progress" (NOT "Closed") — deviation is open in QM module |
| 11 | Note the deviation ID and status for verification after TECO attempt | — | Deviation ID and status are recorded |
| 12 | Navigate to the Confirm Process Order application (via search bar) | — | Confirm Process Order application opens |
| 13 | In the "Order" field, enter the Process Order Number | `{TD.processOrderNumberIntQMDev}` | Process Order Number is entered into the field |
| 14 | Press Enter to confirm the Order entry | — | SAP loads the process order details; order header information is displayed |
| 15 | Verify the order status is "Released" (REL) | — | Order status shows as Released (REL) |
| 16 | Navigate to the Technical Completion action in the application toolbar or menu | — | Technical Completion (TECO) button or menu option is visible and enabled |
| 17 | Click the "Technical Completion" (TECO) button | — | SAP begins pre-completion validation checks |
| 18 | Observe the system validation process — SAP queries QM Deviation Management for open deviations | — | System integration call to QM module retrieves deviation status for the process order |
| 19 | Verify a blocking error message is displayed listing the QM deviation | `{TD.expectedErrorQMDevInt}` | Error message is displayed: "Technical Completion blocked. Open deviations: `{TD.qmDeviationIdInt}`" or similar; message includes deviation ID from QM module |
| 20 | Verify the Technical Completion action is NOT executed | — | Order status remains "Released" (REL); TECO is blocked due to open deviation in QM |
| 21 | Navigate back to the QM Deviation Management application (via search bar) | — | QM Deviation Management application opens |
| 22 | Verify deviation `{TD.qmDeviationIdInt}` status remains unchanged (NOT "Closed") | `{TD.qmDeviationIdInt}`, `{TD.qmDeviationStatusInt}` | Deviation status in QM module is still "Open" or "In Progress"; deviation persists |
| 23 | Navigate back to the Confirm Process Order application | — | Confirm Process Order application opens |
| 24 | Verify the process order `{TD.processOrderNumberIntQMDev}` status has NOT changed to TECO | `{TD.processOrderNumberIntQMDev}` | Order status remains "Released" (REL); integration between PP and QM correctly blocked TECO |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Technical Completion (TECO) is BLOCKED by the system for process order `{TD.processOrderNumberIntQMDev}` due to open deviation in QM Deviation Management module
- System integration between PP (Process Order TECO) and QM (Deviation Management) is correct: open deviations in QM block TECO in PP
- Error message lists the specific open deviation ID from QM: `{TD.qmDeviationIdInt}`
- Order status remains "Released" (REL)
- Deviation status in QM module remains "Open" or "In Progress" (unchanged)
- Cross-module quality gate is correctly enforced — no batch can be technically completed while deviations are open in QM

---

### Post-conditions

- Process order status remains "Released" (REL)
- QM deviation `{TD.qmDeviationIdInt}` persists with status NOT "Closed"
- TECO action is not recorded in audit log (action was blocked before execution)
- Integration between PP and QM modules is validated

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
