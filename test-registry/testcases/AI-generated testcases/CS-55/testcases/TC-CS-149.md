# TC-CS-149: Verify process order released after deviation closure (QM to PP callback)

**User Story:**          [CS-55] Record A Deviation Directly Against An In-Process Control Result That
**Epic:**                N/A — no epic assigned
**Module:**              PP — Production Planning & QM — Quality Management
**Feature:**             QM to PP Integration — Process Order Release After Deviation Closure
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
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to manage Quality Notifications (QM02, QM03) and view Process Orders (CO03) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Deviation Exists | A Quality Notification (Deviation) `{TD.deviationNumber}` has been created against operation `{TD.operationNumber}` of process order `{TD.processOrder}` with status "OUTSTANDING" (open) and complete CAPA documentation |
| P4 | Process Order On Hold | Process Order operation `{TD.operationNumber}` is on hold (status "HOLD") due to the outstanding deviation |
| P5 | Module Integration | QM (Quality Management) and PP (Production Planning) modules are integrated; deviation closure triggers process order hold release via backend callback |

---

### Test Data

**Dataset Reference:** `testdata/CS-55/CS-55-testdata.json` — Dataset ID: `TD-CS-055-INT-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order | `{TD.processOrder}` | Manufacturing process order number | Valid |
| Operation Number | `{TD.operationNumber}` | Operation number on hold due to outstanding deviation | Valid |
| Deviation Number | `{TD.deviationNumber}` | Quality Notification number with status OUTSTANDING | Valid (open deviation) |
| Disposition Decision | `{TD.dispositionDecision}` | Disposition decision code | Valid |

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
| 7 | Click the search icon and type "Manage Process Orders" | — | Search results appear listing the "Manage Process Orders" application |
| 8 | Click the "Manage Process Orders" application from the search results | — | Application opens showing the process order list |
| 9 | Filter for Process Order and click "Go" | `{TD.processOrder}` | The specified process order is displayed in the list |
| 10 | Click the Process Order number link to open the process order details | `{TD.processOrder}` | Process Order details page opens |
| 11 | Navigate to the Operations tab | — | Operations list is displayed |
| 12 | Locate operation `{TD.operationNumber}` and verify its current status is "HOLD" (before deviation closure) | `{TD.operationNumber}` | Operation status displays "HOLD" due to outstanding deviation |
| 13 | Navigate to "Manage Quality Notifications" application | — | Application opens |
| 14 | Filter for Deviation Number and click "Go" | `{TD.deviationNumber}` | The deviation is displayed in the list |
| 15 | Click the Deviation Number link to open the deviation details | `{TD.deviationNumber}` | Deviation details page opens in edit mode |
| 16 | Verify that the deviation status is "OUTSTANDING" | — | Status displays "OUTSTANDING" |
| 17 | Verify that all CAPA fields are populated (Root Cause, Impact Assessment, Corrective Action, Preventive Action) | — | All CAPA fields are complete |
| 18 | In the Disposition section, select the Disposition Decision | `{TD.dispositionDecision}` | Disposition Decision is selected |
| 19 | Click the "Close Deviation" button | — | Deviation closure is processed |
| 20 | Observe the confirmation message | — | Success message confirms deviation closure with approved disposition |
| 21 | Verify Deviation Status is updated to "CLOSED" | — | Status displays "CLOSED" |
| 22 | Navigate back to "Manage Process Orders" application | — | Application opens |
| 23 | Filter for Process Order and open the process order details again | `{TD.processOrder}` | Process Order details page opens |
| 24 | Navigate to the Operations tab | — | Operations list is displayed |
| 25 | Locate operation `{TD.operationNumber}` and verify its status has been updated (hold released) | `{TD.operationNumber}` | Operation status now displays "RELEASED" or "CNF" (confirmed) — NO LONGER "HOLD" |
| 26 | Verify that the QM module (Deviation Closure) has successfully triggered a backend callback to the PP module (Process Order Management) to release the operation hold | — | Integration is confirmed: QM deviation closure automatically releases PP process order operation hold; operation can now proceed |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Before deviation closure: Process Order operation status is "HOLD"
- After deviation closure: Process Order operation status is automatically updated to "RELEASED" or "CNF" (hold is released)
- Integration between QM (Quality Notification closure) and PP (Process Order Management) is verified via backend callback
- Operation hold release is automatic and immediate (no manual update required)
- GMP compliance control is enforced: process order operation can only proceed after deviation is formally closed with approved disposition

---

### Post-conditions

- Deviation status is "CLOSED" with approved disposition
- Process Order operation `{TD.operationNumber}` status is "RELEASED" or "CNF" (hold released)
- Integration between QM and PP modules is verified
- No application-level errors remain outstanding

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
