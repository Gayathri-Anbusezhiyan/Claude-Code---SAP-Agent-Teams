# TC-CS-179: Verify Unsigned Batch Record Sections from e-Signature Module Block TECO (e-Signature Integration)

**User Story:**          [CS-62] Technically Complete A Process Order Only After All Mandatory Quality
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control (PP) — Integration with e-Signature Module
**Feature:**             Process Order Technical Completion (TECO) and e-Signature / Batch Record Management
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
| P3 | Process Order | Process order `{TD.processOrderNumberIntESig}` exists in SAP with status Released (REL) |
| P4 | e-Signature | At least one mandatory batch record section `{TD.unsignedSectionNameInt}` for the process order has NOT been signed in the e-Signature module |
| P5 | Deviations | All deviations linked to the order are closed (deviation requirement is satisfied) |
| P6 | IPC Results | All required in-process control (IPC) inspection results are recorded (IPC requirement is satisfied) |

---

### Test Data

**Dataset Reference:** `testdata/CS-62/CS-62-testdata.json` — Dataset ID: `TD-CS-062-INT-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumberIntESig}` | Process order with unsigned batch record section in e-Signature — entered by the user | Valid (order exists) |
| Unsigned Section Name | `{TD.unsignedSectionNameInt}` | Batch record section from e-Signature module that has not been signed | Invalid (blocks TECO) |
| Expected Error Message | `{TD.expectedErrorESigInt}` | Expected system error message listing unsigned e-Signature sections | N/A |

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
| 7 | Click the search icon (top-right shell bar) and type "Batch Record" or "e-Signature" | — | Search results appear listing the e-Signature / Batch Record application |
| 8 | Click "Batch Record" or equivalent e-Signature application from the search results | — | e-Signature / Batch Record application opens |
| 9 | Search for batch record for process order `{TD.processOrderNumberIntESig}` | `{TD.processOrderNumberIntESig}` | Batch record is displayed for the order |
| 10 | Verify the section `{TD.unsignedSectionNameInt}` has NO signature in the e-Signature module | `{TD.unsignedSectionNameInt}` | Section shows as "Unsigned" or "Pending Signature" in e-Signature module; no e-signature record is present |
| 11 | Note the unsigned section name for verification after TECO attempt | — | Section name is recorded |
| 12 | Navigate to the Confirm Process Order application (via search bar) | — | Confirm Process Order application opens |
| 13 | In the "Order" field, enter the Process Order Number | `{TD.processOrderNumberIntESig}` | Process Order Number is entered into the field |
| 14 | Press Enter to confirm the Order entry | — | SAP loads the process order details; order header information is displayed |
| 15 | Verify the order status is "Released" (REL) | — | Order status shows as Released (REL) |
| 16 | Navigate to the Technical Completion action in the application toolbar or menu | — | Technical Completion (TECO) button or menu option is visible and enabled |
| 17 | Click the "Technical Completion" (TECO) button | — | SAP begins pre-completion validation checks |
| 18 | Observe the system validation process — SAP queries e-Signature module for unsigned batch record sections | — | System integration call to e-Signature module retrieves signature status for the process order |
| 19 | Verify a blocking error message is displayed listing the unsigned e-Signature sections | `{TD.expectedErrorESigInt}` | Error message is displayed: "Technical Completion blocked. Unsigned batch record sections: `{TD.unsignedSectionNameInt}`" or similar; message includes section name from e-Signature module |
| 20 | Verify the Technical Completion action is NOT executed | — | Order status remains "Released" (REL); TECO is blocked due to unsigned batch record section in e-Signature |
| 21 | Navigate back to the e-Signature / Batch Record application (via search bar) | — | e-Signature / Batch Record application opens |
| 22 | Verify the section `{TD.unsignedSectionNameInt}` remains unsigned in the e-Signature module | `{TD.unsignedSectionNameInt}` | Section status in e-Signature module is still "Unsigned" or "Pending Signature"; signature is still missing |
| 23 | Navigate back to the Confirm Process Order application | — | Confirm Process Order application opens |
| 24 | Verify the process order `{TD.processOrderNumberIntESig}` status has NOT changed to TECO | `{TD.processOrderNumberIntESig}` | Order status remains "Released" (REL); integration between PP and e-Signature correctly blocked TECO |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Technical Completion (TECO) is BLOCKED by the system for process order `{TD.processOrderNumberIntESig}` due to unsigned batch record section in e-Signature module
- System integration between PP (Process Order TECO) and e-Signature (Batch Record Management) is correct: unsigned sections in e-Signature block TECO in PP
- Error message lists the specific unsigned section from e-Signature: `{TD.unsignedSectionNameInt}`
- Order status remains "Released" (REL)
- Signature status in e-Signature module remains "Unsigned" (unchanged)
- Cross-module quality gate is correctly enforced — no batch can be technically completed while mandatory signatures are missing (regulatory compliance with 21 CFR Part 11)

---

### Post-conditions

- Process order status remains "Released" (REL)
- Batch record section `{TD.unsignedSectionNameInt}` in e-Signature module remains unsigned
- TECO action is not recorded in audit log (action was blocked before execution)
- Integration between PP and e-Signature modules is validated

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
