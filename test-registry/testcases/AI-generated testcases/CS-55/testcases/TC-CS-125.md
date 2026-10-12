# TC-CS-125: Record deviation for out-of-spec in-process result with complete CAPA documentation and verify process order hold and release

**User Story:**          [CS-55] Record A Deviation Directly Against An In-Process Control Result That
**Epic:**                N/A — no epic assigned
**Module:**              PP — Production Planning & QM — Quality Management
**Feature:**             Quality Deviation Recording from In-Process Control Results
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
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
| P7 | In-Process Result | An in-process control result has been recorded for characteristic `{TD.characteristic}` with value `{TD.inspectionResultOutOfSpec}` that falls outside the specification limits (lower: `{TD.specLowerLimit}`, upper: `{TD.specUpperLimit}`) |

---

### Test Data

**Dataset Reference:** `testdata/CS-55/CS-55-testdata.json` — Dataset ID: `TD-CS-055-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order | `{TD.processOrder}` | Manufacturing process order number | Valid |
| Operation Number | `{TD.operationNumber}` | Operation number within process order routing | Valid |
| Batch Number | `{TD.batchNumber}` | Batch number linked to process order | Valid |
| Material ID | `{TD.materialId}` | Material master number | Valid |
| Plant | `{TD.plant}` | Production plant code | Valid |
| Characteristic | `{TD.characteristic}` | Inspection characteristic code from inspection plan | Valid |
| In-Process Result (Out-of-Spec) | `{TD.inspectionResultOutOfSpec}` | Inspection result value outside specification | Valid (out-of-spec) |
| Spec Lower Limit | `{TD.specLowerLimit}` | Lower specification limit for characteristic | Valid |
| Spec Upper Limit | `{TD.specUpperLimit}` | Upper specification limit for characteristic | Valid |
| Root Cause Code | `{TD.rootCauseCode}` | Root cause code from QM customizing | Valid |
| Root Cause Description | `{TD.rootCauseDescription}` | Root cause description text (min 10 chars) | Valid |
| Impact Assessment | `{TD.impactAssessment}` | Impact assessment text (min 10 chars) | Valid |
| Corrective Action | `{TD.correctiveAction}` | Corrective action text (min 10 chars) | Valid |
| Preventive Action | `{TD.preventiveAction}` | Preventive action text (min 10 chars) | Valid |
| Disposition Decision | `{TD.dispositionDecision}` | Disposition decision code (USE_AS_IS) | Valid |

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
| 8 | Click the "Manage In-Process Inspection Results" application from the search results | — | "Manage In-Process Inspection Results" application opens showing the inspection results list |
| 9 | In the filter bar, enter the Process Order number in the Process Order filter field | `{TD.processOrder}` | Process Order value is entered into the filter field |
| 10 | Press Enter to confirm the filter entry | — | Filter token is created for the process order |
| 11 | Click the "Go" button to execute the filter | — | Inspection results for the specified process order are displayed in the list |
| 12 | Locate the inspection result row for operation `{TD.operationNumber}`, characteristic `{TD.characteristic}`, with result value `{TD.inspectionResultOutOfSpec}` | — | The out-of-spec inspection result row is visible in the list |
| 13 | Select the out-of-spec inspection result row by clicking on it | — | The inspection result row is selected |
| 14 | Click the "Create Deviation" button in the toolbar | — | System navigates to the "Create Quality Notification" Fiori app with pre-populated context data |
| 15 | Verify that the Quality Notification form opens with Notification Type "QN" (Quality Notification - Deviation) | `{TD.notificationType}` | Notification Type field displays "QN" |
| 16 | Verify that Process Order field is auto-populated | `{TD.processOrder}` | Process Order field displays the correct process order number |
| 17 | Verify that Operation field is auto-populated | `{TD.operationNumber}` | Operation field displays the correct operation number |
| 18 | Verify that Batch field is auto-populated | `{TD.batchNumber}` | Batch field displays the correct batch number |
| 19 | Verify that Material field is auto-populated | `{TD.materialId}` | Material field displays the correct material number |
| 20 | Verify that Material Description field is auto-populated | `{TD.materialDescription}` | Material Description field displays the correct description |
| 21 | Verify that Plant field is auto-populated | `{TD.plant}` | Plant field displays the correct plant code |
| 22 | Verify that Characteristic field is auto-populated | `{TD.characteristic}` | Characteristic field displays the correct characteristic code |
| 23 | Verify that Inspection Result field is auto-populated | `{TD.inspectionResultOutOfSpec}` | Inspection Result field displays the out-of-spec value |
| 24 | Verify that Specification Lower Limit field is displayed | `{TD.specLowerLimit}` | Lower Spec Limit field displays the correct value |
| 25 | Verify that Specification Upper Limit field is displayed | `{TD.specUpperLimit}` | Upper Spec Limit field displays the correct value |
| 26 | In the Root Cause section, select the Root Cause Code from the dropdown | `{TD.rootCauseCode}` | Root Cause Code is selected |
| 27 | In the Root Cause Description field, enter the root cause description | `{TD.rootCauseDescription}` | Root Cause Description text is entered (min 10 characters) |
| 28 | In the Impact Assessment field, enter the impact assessment text | `{TD.impactAssessment}` | Impact Assessment text is entered (min 10 characters) |
| 29 | In the Corrective Action (CAPA) field, enter the corrective action text | `{TD.correctiveAction}` | Corrective Action text is entered (min 10 characters) |
| 30 | In the Preventive Action (CAPA) field, enter the preventive action text | `{TD.preventiveAction}` | Preventive Action text is entered (min 10 characters) |
| 31 | Click the "Save" button in the toolbar | — | SAP begins processing the Quality Notification creation |
| 32 | Observe the on-screen confirmation response | — | A success message is displayed containing the newly generated Deviation Number (Quality Notification Number) |
| 33 | Note the Deviation Number from the success message | — | Deviation Number is displayed in 12-digit format beginning with 1000xxxxxx |
| 34 | Verify that the Deviation Status is "OUTSTANDING" (open) | — | Deviation Status field displays "OUTSTANDING" |
| 35 | Click the search icon (top-right shell bar) and type "Manage Process Orders" | — | Search results appear listing the "Manage Process Orders" application |
| 36 | Click the "Manage Process Orders" application from the search results | — | "Manage Process Orders" application opens showing the process order list |
| 37 | In the filter bar, enter the Process Order number | `{TD.processOrder}` | Process Order value is entered into the filter field |
| 38 | Press Enter to confirm the filter entry | — | Filter token is created for the process order |
| 39 | Click the "Go" button to execute the filter | — | The specified process order is displayed in the list |
| 40 | Click the Process Order number link to open the process order details | `{TD.processOrder}` | Process Order details page opens |
| 41 | Navigate to the Operations tab | — | Operations list is displayed |
| 42 | Locate operation `{TD.operationNumber}` in the operations list | `{TD.operationNumber}` | Operation row is visible |
| 43 | Verify that the operation status is "HOLD" | — | Operation status field displays "HOLD" indicating the operation is on hold pending deviation disposition |
| 44 | Navigate back to the deviation by clicking the search icon and typing "Manage Quality Notifications" | — | Search results appear listing the "Manage Quality Notifications" application |
| 45 | Click the "Manage Quality Notifications" application from the search results | — | "Manage Quality Notifications" application opens showing the notification list |
| 46 | In the filter bar, enter the Deviation Number noted in step 33 | — | Deviation Number value is entered into the filter field |
| 47 | Press Enter to confirm the filter entry | — | Filter token is created for the deviation number |
| 48 | Click the "Go" button to execute the filter | — | The specified deviation is displayed in the list |
| 49 | Click the Deviation Number link to open the deviation details | — | Deviation details page opens in edit mode |
| 50 | In the Disposition section, select the Disposition Decision | `{TD.dispositionDecision}` | Disposition Decision "USE_AS_IS" is selected |
| 51 | Click the "Close Deviation" button in the toolbar | — | System begins processing the deviation closure |
| 52 | Observe the on-screen confirmation response | — | A success message is displayed confirming the deviation has been closed with approved disposition |
| 53 | Verify that the Deviation Status is updated to "CLOSED" | — | Deviation Status field displays "CLOSED" |
| 54 | Navigate back to the "Manage Process Orders" application | — | "Manage Process Orders" application opens |
| 55 | In the filter bar, enter the Process Order number | `{TD.processOrder}` | Process Order value is entered into the filter field |
| 56 | Press Enter and click "Go" to execute the filter | — | The specified process order is displayed in the list |
| 57 | Click the Process Order number link to open the process order details | `{TD.processOrder}` | Process Order details page opens |
| 58 | Navigate to the Operations tab | — | Operations list is displayed |
| 59 | Locate operation `{TD.operationNumber}` in the operations list | `{TD.operationNumber}` | Operation row is visible |
| 60 | Verify that the operation status is no longer "HOLD" and is released for continuation | — | Operation status field displays "RELEASED" or "CNF" (confirmed) indicating the hold has been lifted |
| 61 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 62 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 63 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Quality Notification (Deviation) number is generated by SAP and displayed in the confirmation message
- The deviation is persisted in SAP with Notification Type "QN", Status "OUTSTANDING" initially, then "CLOSED" after disposition
- All auto-populated fields (Process Order, Operation, Batch, Material, Plant, Characteristic, Inspection Result, Spec Limits) are correctly pre-filled from the in-process control result context
- All CAPA fields (Root Cause, Impact Assessment, Corrective Action, Preventive Action) are correctly stored
- The process order operation is automatically placed on hold (status "HOLD") immediately after deviation creation
- The process order operation hold is automatically released (status "RELEASED" or "CNF") after deviation closure with approved disposition
- The deviation record is accessible in the "Manage Quality Notifications" application and can be viewed/edited

---

### Post-conditions

- SAP Quality Notification (Deviation) document exists with the generated Deviation Number
- Deviation status is "CLOSED" with disposition "USE_AS_IS"
- Process Order operation `{TD.operationNumber}` status has transitioned from "HOLD" back to "RELEASED" / "CNF"
- CAPA documentation (Root Cause, Impact Assessment, Corrective Action, Preventive Action) is recorded on the deviation
- No application-level errors or critical warnings remain outstanding

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
