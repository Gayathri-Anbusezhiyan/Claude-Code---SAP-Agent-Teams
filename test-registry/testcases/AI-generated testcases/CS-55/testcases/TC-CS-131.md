# TC-CS-131: Attempt to advance process order operation while deviation status is OUTSTANDING

**User Story:**          [CS-55] Record A Deviation Directly Against An In-Process Control Result That
**Epic:**                N/A — no epic assigned
**Module:**              PP — Production Planning & QM — Quality Management
**Feature:**             Process Order Hold Enforcement
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
| P1 | User Role | User has the role of Production Operator or Production Manager with SAP authorization to confirm process order operations (CO11N, CO15) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Process Order | Process Order `{TD.processOrder}` exists in RELEASED or CONFIRMED status with active production operations |
| P4 | Material Master | Material `{TD.materialId}` is created, released, and has an active inspection plan assigned for plant `{TD.plant}` |
| P5 | Batch | Batch `{TD.batchNumber}` exists and is linked to process order `{TD.processOrder}` |
| P6 | Deviation Exists | A Quality Notification (Deviation) `{TD.deviationNumber}` has been created against operation `{TD.operationNumber}` of process order `{TD.processOrder}` with status "OUTSTANDING" (open) |
| P7 | Operation Hold | Process Order operation `{TD.operationNumber}` is on hold (status "HOLD") due to the outstanding deviation |

---

### Test Data

**Dataset Reference:** `testdata/CS-55/CS-55-testdata.json` — Dataset ID: `TD-CS-055-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order | `{TD.processOrder}` | Manufacturing process order number | Valid |
| Operation Number | `{TD.operationNumber}` | Operation number on hold due to outstanding deviation | Valid |
| Batch Number | `{TD.batchNumber}` | Batch number linked to process order | Valid |
| Deviation Number | `{TD.deviationNumber}` | Quality Notification number with status OUTSTANDING | Valid (open deviation) |
| Next Operation Number | `{TD.nextOperationNumber}` | Next operation in the process order routing | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Process Orders" | — | Search results appear listing the "Manage Process Orders" application |
| 8 | Click the "Manage Process Orders" application from the search results | — | Application opens showing the process order list |
| 9 | Filter for Process Order `{TD.processOrder}` and click "Go" | `{TD.processOrder}` | The specified process order is displayed in the list |
| 10 | Click the Process Order number link to open the process order details | `{TD.processOrder}` | Process Order details page opens |
| 11 | Navigate to the Operations tab | — | Operations list is displayed |
| 12 | Locate operation `{TD.operationNumber}` in the operations list | `{TD.operationNumber}` | Operation row is visible |
| 13 | Verify that operation `{TD.operationNumber}` status is "HOLD" | — | Operation status displays "HOLD" indicating the operation is on hold due to deviation `{TD.deviationNumber}` |
| 14 | Attempt to confirm operation `{TD.operationNumber}` or advance to the next operation `{TD.nextOperationNumber}` by clicking the "Confirm" or "Complete" button for the operation | `{TD.operationNumber}`, `{TD.nextOperationNumber}` | System detects the outstanding deviation and prevents the confirmation |
| 15 | Observe the system response | — | System displays an error message: "Operation on hold — deviation {deviationNumber} must be closed" or "Cannot confirm operation — outstanding deviation" |
| 16 | Verify that the operation status remains "HOLD" | — | Operation status is unchanged; still displays "HOLD" |
| 17 | Verify that the process order cannot advance to the next operation | `{TD.nextOperationNumber}` | Next operation `{TD.nextOperationNumber}` remains in "NOT STARTED" or "PENDING" status; operation confirmation is blocked |
| 18 | Navigate to "Manage Quality Notifications" application to verify the deviation status | — | Application opens |
| 19 | Filter for Deviation Number `{TD.deviationNumber}` and click "Go" | `{TD.deviationNumber}` | The deviation is displayed in the list |
| 20 | Verify that the deviation status is "OUTSTANDING" (not yet closed) | — | Deviation status displays "OUTSTANDING" |
| 21 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 22 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 23 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System prevents process order operation confirmation when an outstanding deviation exists
- Error message is displayed: "Operation on hold — deviation {deviationNumber} must be closed"
- Operation status remains "HOLD"
- Process order cannot advance to the next operation until the deviation is formally closed with an approved disposition
- GMP compliance control is enforced: non-conforming batch cannot proceed without investigation closure

---

### Post-conditions

- Process Order operation `{TD.operationNumber}` status remains "HOLD"
- Deviation `{TD.deviationNumber}` status remains "OUTSTANDING"
- Next operation `{TD.nextOperationNumber}` has not been started
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
