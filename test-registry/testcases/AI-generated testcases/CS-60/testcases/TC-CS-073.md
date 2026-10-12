# TC-CS-073: Process Order Scheduling Engine Queries Work Center Calibration Status Before Assignment

**User Story:**          [CS-60] Maintain A Resource/Work Center Master For Validated Production Equipm
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Work Center Master with Calibration/Qualification Tracking
**Test Type:**           INTEGRATION
**Scenario Type:**       INTEGRATION
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to create and schedule Process Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.validWorkCenterId}` exists in Plant `{TD.plant}` with valid calibration (future expiration date) |
| P4 | Master Data | Work Center `{TD.expiredWorkCenterId}` exists in Plant `{TD.plant}` with expired calibration (past expiration date) |
| P5 | Master Data | Process Order `{TD.processOrderNumber}` exists with at least one operation ready to be assigned to a Work Center |
| P6 | Configuration | Process Order scheduling engine integration with Work Center Master calibration status validation is enabled |

---

### Test Data

**Dataset Reference:** `testdata/CS-60/CS-60-testdata.json` — Dataset ID: `TD-CS-060-INT-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Valid Work Center ID | `{TD.validWorkCenterId}` | Work Center with valid calibration | Valid |
| Expired Work Center ID | `{TD.expiredWorkCenterId}` | Work Center with expired calibration | Invalid (expired) |
| Plant | `{TD.plant}` | Plant code where Work Centers are located | Valid |
| Process Order Number | `{TD.processOrderNumber}` | Process Order to schedule | Valid |
| Operation Number | `{TD.operationNumber}` | Operation to assign to Work Center | Valid |

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
| 8 | Click "Manage Process Orders" from the search results | — | Manage Process Orders application opens with the list view |
| 9 | In the Process Order search filter field, enter the Process Order number | `{TD.processOrderNumber}` | Process Order number is entered into the filter field |
| 10 | Press Enter to execute the search | — | Filter is applied; the target Process Order appears in the list |
| 11 | Click on the Process Order number in the list to open the record | `{TD.processOrderNumber}` | Process Order detail view opens in display mode |
| 12 | Navigate to the "Operations" tab or section | — | Operations list is displayed with operation `{TD.operationNumber}` |
| 13 | Click the "Edit" button in the toolbar | — | Process Order record switches to edit mode |
| 14 | Select the operation `{TD.operationNumber}` to assign a Work Center | `{TD.operationNumber}` | Operation is selected; Work Center assignment field is displayed |
| 15 | In the "Work Center" field, enter the valid Work Center ID | `{TD.validWorkCenterId}` | Valid Work Center ID is entered into the field |
| 16 | Press Enter to confirm the Work Center entry | — | SAP scheduling engine queries Work Center calibration status; validation passes (calibration is valid) |
| 17 | Observe the on-screen validation response | — | Work Center is accepted; no error message is displayed; Work Center Description is auto-populated |
| 18 | Click the "Save" button in the toolbar | — | SAP processes the Process Order operation assignment |
| 19 | Observe the on-screen confirmation response | — | A success message is displayed: "Process Order `{TD.processOrderNumber}` updated successfully" |
| 20 | Verify that the operation is assigned to the valid Work Center | — | Operation `{TD.operationNumber}` displays Work Center `{TD.validWorkCenterId}` (scheduling engine validation passed) |
| 21 | Click the "Edit" button again to modify the operation | — | Process Order record switches to edit mode |
| 22 | Select the operation `{TD.operationNumber}` and change the Work Center assignment | `{TD.operationNumber}` | Operation is selected; Work Center field is editable |
| 23 | In the "Work Center" field, clear the valid Work Center and enter the expired Work Center ID | `{TD.expiredWorkCenterId}` | Expired Work Center ID is entered into the field |
| 24 | Press Enter to confirm the Work Center entry | — | SAP scheduling engine queries Work Center calibration status; validation fails (calibration is expired) |
| 25 | Observe the on-screen validation response | — | An error message is displayed: "Work Center `{TD.expiredWorkCenterId}` has expired calibration. Cannot schedule operation." or similar scheduling engine validation error |
| 26 | Verify that the Work Center assignment is NOT saved | — | Work Center field is cleared or reverted to previous valid value; operation is not assigned to expired Work Center |
| 27 | Verify that scheduling engine integration prevented the invalid assignment | — | Process Order scheduling engine successfully queried Work Center calibration status and blocked assignment (PP-PP integration confirmed) |
| 28 | Click the "Cancel" or "Discard" button to exit edit mode | — | Edit mode is exited; no changes are saved |
| 29 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 30 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 31 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Process Order scheduling engine successfully queries Work Center Master calibration status before assigning operations (integration confirmed)
- Valid Work Center `{TD.validWorkCenterId}` with valid calibration is accepted for Process Order operation assignment
- Expired Work Center `{TD.expiredWorkCenterId}` with expired calibration is rejected for Process Order operation assignment
- Scheduling engine validation error message is displayed: "Work Center has expired calibration. Cannot schedule operation."
- Process Order operation is assigned only to Work Centers with valid calibration (regulatory compliance enforced)
- System log entry is created recording the scheduling validation and calibration check (audit trail)

---

### Post-conditions

- Process Order `{TD.processOrderNumber}` operation `{TD.operationNumber}` is assigned to valid Work Center `{TD.validWorkCenterId}` only
- Expired Work Center `{TD.expiredWorkCenterId}` remains excluded from Process Order scheduling
- Process Order scheduling engine integration with Work Center calibration validation is confirmed operational

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
