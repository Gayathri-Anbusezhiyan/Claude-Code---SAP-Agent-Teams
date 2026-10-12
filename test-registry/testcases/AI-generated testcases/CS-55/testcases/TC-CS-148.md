# TC-CS-148: Verify process order hold status updated in backend (QM to PP callback)

**User Story:**          [CS-55] Record A Deviation Directly Against An In-Process Control Result That
**Epic:**                N/A — no epic assigned
**Module:**              PP — Production Planning & QM — Quality Management
**Feature:**             QM to PP Integration — Process Order Hold Status Update
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
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to create Quality Notifications (QM02) and view Process Orders (CO03) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Process Order | Process Order `{TD.processOrder}` exists in RELEASED or CONFIRMED status with operation `{TD.operationNumber}` in active status (not on hold) |
| P4 | In-Process Result | An in-process control result has been recorded for operation `{TD.operationNumber}` with value `{TD.inspectionResultOutOfSpec}` that falls outside specification limits |
| P5 | Module Integration | QM (Quality Management) and PP (Production Planning) modules are integrated; deviation creation triggers process order hold status update via backend callback |

---

### Test Data

**Dataset Reference:** `testdata/CS-55/CS-55-testdata.json` — Dataset ID: `TD-CS-055-INT-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order | `{TD.processOrder}` | Manufacturing process order number | Valid |
| Operation Number | `{TD.operationNumber}` | Operation number within process order routing | Valid |
| Batch Number | `{TD.batchNumber}` | Batch number linked to process order | Valid |
| Material ID | `{TD.materialId}` | Material master number | Valid |
| Characteristic | `{TD.characteristic}` | Inspection characteristic code | Valid |
| In-Process Result (Out-of-Spec) | `{TD.inspectionResultOutOfSpec}` | Inspection result value outside specification | Valid (out-of-spec) |
| Root Cause Code | `{TD.rootCauseCode}` | Root cause code from QM customizing | Valid |
| Root Cause Description | `{TD.rootCauseDescription}` | Root cause description text | Valid |
| Impact Assessment | `{TD.impactAssessment}` | Impact assessment text | Valid |
| Corrective Action | `{TD.correctiveAction}` | Corrective action text | Valid |
| Preventive Action | `{TD.preventiveAction}` | Preventive action text | Valid |

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
| 12 | Locate operation `{TD.operationNumber}` and verify its current status (should NOT be on hold before deviation creation) | `{TD.operationNumber}` | Operation status displays "RELEASED" or "CNF" (confirmed) — NOT "HOLD" |
| 13 | Navigate to "Manage In-Process Inspection Results" application | — | Application opens |
| 14 | Filter for Process Order and locate the out-of-spec inspection result | `{TD.processOrder}`, `{TD.operationNumber}`, `{TD.characteristic}` | Out-of-spec result row is displayed |
| 15 | Select the row and click "Create Deviation" | — | "Create Quality Notification" app opens with pre-populated context |
| 16 | Verify auto-populated fields (Process Order, Operation, Batch, Material, Characteristic, Inspection Result) | — | All context fields are correctly pre-populated |
| 17 | Enter Root Cause, Impact Assessment, Corrective Action, and Preventive Action | `{TD.rootCauseCode}`, `{TD.rootCauseDescription}`, `{TD.impactAssessment}`, `{TD.correctiveAction}`, `{TD.preventiveAction}` | CAPA fields are populated |
| 18 | Click the "Save" button | — | Deviation is created; success message displays the Deviation Number |
| 19 | Note the Deviation Number | — | Deviation Number is recorded |
| 20 | Navigate back to "Manage Process Orders" application | — | Application opens |
| 21 | Filter for Process Order and open the process order details again | `{TD.processOrder}` | Process Order details page opens |
| 22 | Navigate to the Operations tab | — | Operations list is displayed |
| 23 | Locate operation `{TD.operationNumber}` and verify its status has been updated | `{TD.operationNumber}` | Operation status now displays "HOLD" indicating the operation is on hold due to the deviation |
| 24 | Verify that the QM module (Deviation Creation) has successfully triggered a backend callback to the PP module (Process Order Management) to update the operation status | — | Integration is confirmed: QM deviation creation automatically updates PP process order operation status to HOLD; no manual intervention required |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Before deviation creation: Process Order operation status is "RELEASED" or "CNF" (not on hold)
- After deviation creation: Process Order operation status is automatically updated to "HOLD"
- Integration between QM (Quality Notification creation) and PP (Process Order Management) is verified via backend callback
- Operation hold status update is automatic and immediate (no manual update required)
- GMP compliance control is enforced: out-of-spec event automatically places process order operation on hold

---

### Post-conditions

- Deviation exists with status "OUTSTANDING"
- Process Order operation `{TD.operationNumber}` status is "HOLD"
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
