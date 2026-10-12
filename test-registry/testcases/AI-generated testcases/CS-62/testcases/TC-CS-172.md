# TC-CS-172: Attempt Technical Completion Without Required Authorization

**User Story:**          [CS-62] Technically Complete A Process Order Only After All Mandatory Quality
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control (PP)
**Feature:**             Process Order Technical Completion (TECO)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has a role with SAP authorization to VIEW process orders but does NOT have authorization to execute Technical Completion (TECO) — missing TECO authorization object |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials for a user WITHOUT TECO authorization are available |
| P3 | Process Order | Process order `{TD.processOrderNumberNoAuth}` exists in SAP with status Released (REL) and all quality requirements are met |
| P4 | Authorization | User `{TD.unauthorizedUser}` does NOT have TECO authorization in their assigned role(s) |

---

### Test Data

**Dataset Reference:** `testdata/CS-62/CS-62-testdata.json` — Dataset ID: `TD-CS-062-ERR-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumberNoAuth}` | Valid process order number — entered by the user | Valid (order exists) |
| Unauthorized User | `{TD.unauthorizedUser}` | User WITHOUT TECO authorization — used for login | Invalid (missing authorization) |
| Unauthorized User Password | `{TD.unauthorizedUserPassword}` | Password for the unauthorized user | N/A |
| Expected Error Message | `{TD.expectedErrorNoAuth}` | Expected system authorization error message | N/A |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the unauthorized user email address in the email field | `{TD.unauthorizedUser}` | Unauthorized user email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the unauthorized user password in the password field | `{TD.unauthorizedUserPassword}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page with application tiles is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Confirm Process Order" | — | Search results appear listing the "Confirm Process Order" application |
| 8 | Click "Confirm Process Order" from the search results | — | The Confirm Process Order application opens (user has view authorization) |
| 9 | In the "Order" field, enter the Process Order Number | `{TD.processOrderNumberNoAuth}` | Process Order Number is entered into the field |
| 10 | Press Enter to confirm the Order entry | — | SAP loads the process order details; order header information is displayed (view authorization is sufficient) |
| 11 | Verify the order status is "Released" (REL) | — | Order status shows as Released (REL) |
| 12 | Attempt to navigate to the Technical Completion action in the application toolbar or menu | — | Technical Completion (TECO) button or menu option is NOT displayed, OR is displayed but disabled |
| 13 | If TECO button is visible, click the "Technical Completion" (TECO) button | — | System checks user authorization before executing TECO |
| 14 | Observe the system response | `{TD.expectedErrorNoAuth}` | Authorization error message is displayed: "You are not authorized to execute Technical Completion for order `{TD.processOrderNumberNoAuth}`" or "Missing authorization for function TECO" or similar |
| 15 | Verify the Technical Completion action is NOT executed | — | Order status remains "Released" (REL); TECO is blocked due to missing authorization |
| 16 | Verify no changes are made to the process order | `{TD.processOrderNumberNoAuth}` | Order status, stock status, and audit log are unchanged; no TECO action is recorded |
| 17 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 18 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 19 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System displays a clear authorization error message: "You are not authorized to execute Technical Completion" or "Missing authorization for function TECO" or similar
- Technical Completion (TECO) action is NOT executed for process order `{TD.processOrderNumberNoAuth}`
- Order status remains "Released" (REL)
- No TECO action is recorded in the audit log
- Authorization controls are correctly enforced by SAP (SOD — Segregation of Duties is maintained)

---

### Post-conditions

- Process order status remains "Released" (REL)
- No TECO action is executed or recorded
- User without TECO authorization is prevented from technically completing orders
- System state is unchanged

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
