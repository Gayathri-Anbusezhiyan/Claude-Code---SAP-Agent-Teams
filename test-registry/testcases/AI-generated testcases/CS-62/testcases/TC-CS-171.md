# TC-CS-171: Attempt Technical Completion with Non-Existent Process Order Number

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
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to execute Technical Completion (TECO) for process orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Non-Existent Order | Process order `{TD.invalidOrderNumber}` does NOT exist in SAP |

---

### Test Data

**Dataset Reference:** `testdata/CS-62/CS-62-testdata.json` — Dataset ID: `TD-CS-062-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Invalid Process Order Number | `{TD.invalidOrderNumber}` | Non-existent process order number — entered by the user | Invalid (does not exist) |
| Expected Error Message | `{TD.expectedErrorInvalidOrder}` | Expected system error message for non-existent order | N/A |

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
| 8 | Click "Confirm Process Order" from the search results | — | The Confirm Process Order application opens with the order list or search screen |
| 9 | In the "Order" field, enter the invalid Process Order Number | `{TD.invalidOrderNumber}` | Invalid Process Order Number is entered into the field |
| 10 | Press Enter to confirm the Order entry | — | SAP attempts to load the process order details |
| 11 | Observe the system response | `{TD.expectedErrorInvalidOrder}` | Error message is displayed: "Order `{TD.invalidOrderNumber}` not found" or "Order does not exist" or similar; order details are NOT loaded |
| 12 | Verify the Technical Completion button or action is NOT accessible | — | TECO button/action is NOT displayed or is disabled; no order details are shown |
| 13 | Verify no order header information is displayed | — | Order header section is empty or shows an error placeholder; no order data is retrieved |
| 14 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 15 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 16 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System displays a clear error message indicating the process order does NOT exist: "Order `{TD.invalidOrderNumber}` not found" or similar
- No order details are loaded or displayed
- Technical Completion (TECO) action is NOT accessible (button not displayed or disabled)
- User is prevented from attempting TECO on a non-existent order
- Error handling is correct and user-friendly

---

### Post-conditions

- No process order is loaded or modified
- No TECO action is executed or recorded
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
