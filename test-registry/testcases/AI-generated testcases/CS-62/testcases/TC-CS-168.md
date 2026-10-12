# TC-CS-168: Attempt Technical Completion with Open Deviations Linked to Process Order

**User Story:**          [CS-62] Technically Complete A Process Order Only After All Mandatory Quality
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control (PP)
**Feature:**             Process Order Technical Completion (TECO)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
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
| P3 | Process Order | Process order `{TD.processOrderNumberWithOpenDev}` exists in SAP with status Released (REL) |
| P4 | Open Deviations | At least one open deviation `{TD.openDeviationId}` exists in QM Deviation Management and is linked to process order `{TD.processOrderNumberWithOpenDev}`; deviation status is NOT "Closed" |
| P5 | IPC Results | All required in-process control (IPC) inspection results are recorded (IPC requirement is satisfied) |
| P6 | Batch Records | All mandatory batch record sections are signed (signature requirement is satisfied) |
| P7 | Stock Status | Finished goods batch exists with stock status "Quality Inspection" (QI) |

---

### Test Data

**Dataset Reference:** `testdata/CS-62/CS-62-testdata.json` — Dataset ID: `TD-CS-062-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumberWithOpenDev}` | Process order with open deviation linked — entered by the user | Valid (order exists) |
| Open Deviation ID | `{TD.openDeviationId}` | Deviation ID that is open and linked to the order | Invalid (blocks TECO) |
| Deviation Status | `{TD.deviationStatus}` | Status of the open deviation (e.g., "Open", "In Progress") | Invalid (not "Closed") |
| Expected Error Message | `{TD.expectedErrorOpenDev}` | Expected system error message listing open deviations | N/A |

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
| 9 | In the "Order" field, enter the Process Order Number | `{TD.processOrderNumberWithOpenDev}` | Process Order Number is entered into the field |
| 10 | Press Enter to confirm the Order entry | — | SAP loads the process order details; order header information is displayed |
| 11 | Verify the order status is "Released" (REL) or equivalent active status | — | Order status shows as Released (REL) |
| 12 | Navigate to the Technical Completion action in the application toolbar or menu | — | Technical Completion (TECO) button or menu option is visible and enabled |
| 13 | Click the "Technical Completion" (TECO) button | — | SAP begins pre-completion validation checks |
| 14 | Observe the system validation process | — | System checks for open deviations, missing IPC results, and unsigned batch record sections |
| 15 | Verify a blocking error message is displayed | `{TD.expectedErrorOpenDev}` | Error message is displayed: "Technical Completion blocked. Open deviations: `{TD.openDeviationId}`" or similar; message lists specific deviation ID(s) |
| 16 | Verify the Technical Completion action is NOT executed | — | Order status remains "Released" (REL); TECO is blocked and not applied |
| 17 | Attempt to confirm or proceed with TECO (if dialog allows retry) | — | System continues to block TECO; error message persists |
| 18 | Navigate to QM Deviation Management application (via search bar) | — | QM Deviation Management application opens |
| 19 | Search for deviation `{TD.openDeviationId}` | `{TD.openDeviationId}` | Deviation is found in the list |
| 20 | Verify the deviation status is NOT "Closed" | `{TD.deviationStatus}` | Deviation status shows as "Open" or "In Progress"; deviation is NOT closed |
| 21 | Navigate back to the Confirm Process Order application | — | Confirm Process Order application opens |
| 22 | Verify the process order `{TD.processOrderNumberWithOpenDev}` status has NOT changed to TECO | `{TD.processOrderNumberWithOpenDev}` | Order status remains "Released" (REL); TECO was successfully blocked |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Technical Completion (TECO) is BLOCKED by the system for process order `{TD.processOrderNumberWithOpenDev}`
- System displays a specific error message listing the open deviation ID(s): "Technical Completion blocked. Open deviations: `{TD.openDeviationId}`" or similar
- Order status remains "Released" (REL) and does NOT transition to "TECO"
- The open deviation `{TD.openDeviationId}` is verified to exist in QM Deviation Management with status NOT "Closed"
- No batch can be considered finished while open deviations remain (business goal is enforced)
- The quality gate is correctly enforced by SAP

---

### Post-conditions

- Process order status remains "Released" (REL)
- Open deviation `{TD.openDeviationId}` persists with status NOT "Closed"
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
