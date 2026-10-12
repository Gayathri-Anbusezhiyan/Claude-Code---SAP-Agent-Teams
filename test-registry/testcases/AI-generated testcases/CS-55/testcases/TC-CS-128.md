# TC-CS-128: Record deviation with REWORK disposition (process order returns to previous operation)

**User Story:**          [CS-55] Record A Deviation Directly Against An In-Process Control Result That
**Epic:**                N/A — no epic assigned
**Module:**              PP — Production Planning & QM — Quality Management
**Feature:**             Quality Deviation Recording with REWORK Disposition
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Quality Assurance Specialist with SAP authorization to create and manage Quality Notifications (QM02, QM03) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Process Order | Process Order `{TD.processOrder}` exists in RELEASED or CONFIRMED status with active production operations |
| P4 | Material Master | Material `{TD.materialId}` is created, released, and has an active inspection plan assigned for plant `{TD.plant}` |
| P5 | Batch | Batch `{TD.batchNumber}` exists and is linked to process order `{TD.processOrder}` |
| P6 | Inspection Plan | In-process inspection plan is assigned to operation `{TD.operationNumber}` for material `{TD.materialId}` with characteristic `{TD.characteristic}` and specification limits defined |
| P7 | In-Process Result | An in-process control result has been recorded for characteristic `{TD.characteristic}` with value `{TD.inspectionResultOutOfSpec}` that falls outside the specification limits |

---

### Test Data

**Dataset Reference:** `testdata/CS-55/CS-55-testdata.json` — Dataset ID: `TD-CS-055-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order | `{TD.processOrder}` | Manufacturing process order number | Valid |
| Operation Number | `{TD.operationNumber}` | Operation number within process order routing | Valid |
| Batch Number | `{TD.batchNumber}` | Batch number linked to process order | Valid |
| Material ID | `{TD.materialId}` | Material master number | Valid |
| Characteristic | `{TD.characteristic}` | Inspection characteristic code from inspection plan | Valid |
| In-Process Result (Out-of-Spec) | `{TD.inspectionResultOutOfSpec}` | Inspection result value outside specification | Valid (out-of-spec) |
| Root Cause Code | `{TD.rootCauseCode}` | Root cause code from QM customizing | Valid |
| Root Cause Description | `{TD.rootCauseDescription}` | Root cause description text | Valid |
| Impact Assessment | `{TD.impactAssessment}` | Impact assessment text | Valid |
| Corrective Action | `{TD.correctiveAction}` | Corrective action text | Valid |
| Preventive Action | `{TD.preventiveAction}` | Preventive action text | Valid |
| Disposition Decision | `{TD.dispositionRework}` | Disposition decision REWORK | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage In-Process Inspection Results" | — | Search results appear listing the "Manage In-Process Inspection Results" application |
| 8 | Click the "Manage In-Process Inspection Results" application from the search results | — | Application opens showing the inspection results list |
| 9 | Filter for Process Order `{TD.processOrder}` and click "Go" | `{TD.processOrder}` | Inspection results for the process order are displayed |
| 10 | Select the out-of-spec inspection result row for operation `{TD.operationNumber}` and characteristic `{TD.characteristic}` | — | Inspection result row is selected |
| 11 | Click the "Create Deviation" button in the toolbar | — | "Create Quality Notification" Fiori app opens with pre-populated context |
| 12 | Verify auto-population of Process Order, Operation, Batch, Material, Characteristic, and Inspection Result fields | `{TD.processOrder}`, `{TD.operationNumber}`, `{TD.batchNumber}`, `{TD.materialId}`, `{TD.characteristic}`, `{TD.inspectionResultOutOfSpec}` | All context fields are correctly auto-populated |
| 13 | In the Root Cause section, select the Root Cause Code | `{TD.rootCauseCode}` | Root Cause Code is selected |
| 14 | Enter the Root Cause Description | `{TD.rootCauseDescription}` | Root Cause Description text is entered |
| 15 | Enter the Impact Assessment | `{TD.impactAssessment}` | Impact Assessment text is entered |
| 16 | Enter the Corrective Action | `{TD.correctiveAction}` | Corrective Action text is entered |
| 17 | Enter the Preventive Action | `{TD.preventiveAction}` | Preventive Action text is entered |
| 18 | Click the "Save" button | — | Deviation is created; success message displays the Deviation Number |
| 19 | Note the Deviation Number | — | Deviation Number is displayed |
| 20 | Verify Deviation Status is "OUTSTANDING" | — | Status displays "OUTSTANDING" |
| 21 | In the Disposition section, select "REWORK" as the Disposition Decision | `{TD.dispositionRework}` | Disposition "REWORK" is selected |
| 22 | Click the "Close Deviation" button | — | Deviation closure is processed |
| 23 | Observe the confirmation message | — | Success message confirms deviation closure with REWORK disposition |
| 24 | Verify Deviation Status is updated to "CLOSED" | — | Status displays "CLOSED" |
| 25 | Navigate to "Manage Process Orders" application | — | Application opens |
| 26 | Filter for Process Order `{TD.processOrder}` and open the order details | `{TD.processOrder}` | Process Order details page opens |
| 27 | Navigate to the Operations tab and locate operation `{TD.operationNumber}` | `{TD.operationNumber}` | Operation is displayed |
| 28 | Verify that the operation status reflects rework instruction (operation may be reset or flagged for rework) | — | Operation status indicates rework is required; process order may return to a previous operation for reprocessing |
| 29 | Verify that a rework instruction or note is present on the operation or process order header | — | Rework instruction is visible indicating the batch must be reworked before proceeding |
| 30 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 31 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 32 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Deviation is successfully created and closed with disposition "REWORK"
- Process order operation is flagged for rework; batch must return to a previous operation for reprocessing
- Rework instruction is documented on the process order
- Deviation record reflects REWORK disposition decision

---

### Post-conditions

- SAP Quality Notification (Deviation) exists with status "CLOSED" and disposition "REWORK"
- Process Order operation `{TD.operationNumber}` status reflects rework requirement
- Batch is not approved to proceed to next operation until rework is completed
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
