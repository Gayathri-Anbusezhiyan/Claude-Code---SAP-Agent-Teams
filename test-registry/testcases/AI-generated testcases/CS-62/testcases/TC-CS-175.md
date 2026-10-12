# TC-CS-175: Attempt Duplicate Technical Completion on Already Completed Order

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
| P3 | Process Order | Process order `{TD.processOrderNumberAlreadyTECO}` exists in SAP and is ALREADY technically completed — order status is "TECO" (Technically Completed) |
| P4 | Quality Requirements | All quality requirements were met at the time of initial TECO (deviations closed, IPC recorded, batch records signed) |
| P5 | Stock Status | Finished goods batch exists with stock status "Quality Inspection" (QI) or "Unrestricted" (UR) depending on QA release |

---

### Test Data

**Dataset Reference:** `testdata/CS-62/CS-62-testdata.json` — Dataset ID: `TD-CS-062-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumberAlreadyTECO}` | Process order already technically completed — entered by the user | Valid (order exists) |
| Order Status | `{TD.orderStatusTECO}` | Current order status (TECO — Technically Completed) | Invalid (duplicate TECO not allowed) |
| Expected Error Message | `{TD.expectedErrorDuplicateTECO}` | Expected system error or status message for duplicate TECO attempt | N/A |

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
| 9 | In the "Order" field, enter the Process Order Number | `{TD.processOrderNumberAlreadyTECO}` | Process Order Number is entered into the field |
| 10 | Press Enter to confirm the Order entry | — | SAP loads the process order details; order header information is displayed |
| 11 | Verify the order status is "Technically Completed" (TECO) | `{TD.orderStatusTECO}` | Order status shows "TECO" (Technically Completed) — order was already completed previously |
| 12 | Navigate to the Technical Completion action in the application toolbar or menu | — | Technical Completion (TECO) button or menu option may be visible but disabled, OR hidden entirely |
| 13 | If TECO button is visible and enabled, click the "Technical Completion" (TECO) button | — | SAP checks the order status before allowing duplicate TECO |
| 14 | Observe the system response | `{TD.expectedErrorDuplicateTECO}` | Error or informational message is displayed: "Order `{TD.processOrderNumberAlreadyTECO}` is already technically completed" or "TECO status already set" or similar; OR TECO button is disabled and no action is executed |
| 15 | Verify the Technical Completion action is NOT executed again | — | Order status remains "TECO"; no duplicate TECO action is recorded |
| 16 | Navigate to the Change Documents or Audit Log application (via search bar) | — | Change Documents / Audit Log application opens |
| 17 | Search for change documents related to process order `{TD.processOrderNumberAlreadyTECO}` | `{TD.processOrderNumberAlreadyTECO}` | Change document entries are displayed for the process order |
| 18 | Verify only ONE TECO audit log entry exists (from the initial TECO action) | — | Audit log shows exactly one TECO entry; no duplicate TECO entry is created during this test execution |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System prevents duplicate Technical Completion (TECO) for process order `{TD.processOrderNumberAlreadyTECO}` that is already technically completed
- TECO button is either disabled or displays an error message: "Order is already technically completed" or similar
- Order status remains "TECO" (no change)
- No duplicate TECO action is recorded in the audit log
- System correctly enforces order status validation and prevents redundant TECO execution

---

### Post-conditions

- Process order status remains "TECO" (Technically Completed)
- Audit log contains only the original TECO entry (no duplicate)
- No system state changes occur during the duplicate attempt
- Stock status remains unchanged (QI or UR depending on prior QA release)

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
