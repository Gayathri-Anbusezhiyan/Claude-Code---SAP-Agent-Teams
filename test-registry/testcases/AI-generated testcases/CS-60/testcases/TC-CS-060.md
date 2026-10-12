# TC-CS-060: Attempt to Schedule Process Order Operation on Work Center with Expired Calibration

**User Story:**          [CS-60] Maintain A Resource/Work Center Master For Validated Production Equipm
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Work Center Master with Calibration/Qualification Tracking
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to create and schedule Process Orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.expiredWorkCenterId}` exists in Plant `{TD.plant}` with calibration expiration date in the past |
| P4 | Master Data | Process Order `{TD.processOrderNumber}` exists with at least one operation ready to be assigned to a Work Center |
| P5 | Configuration | System validation is enabled to check Work Center calibration status before scheduling |

---

### Test Data

**Dataset Reference:** `testdata/CS-60/CS-60-testdata.json` — Dataset ID: `TD-CS-060-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Expired Work Center ID | `{TD.expiredWorkCenterId}` | Work Center with past calibration expiration date | Invalid (expired) |
| Plant | `{TD.plant}` | Plant code where Work Center is located | Valid |
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
| 15 | In the "Work Center" field, enter the expired Work Center ID | `{TD.expiredWorkCenterId}` | Expired Work Center ID is entered into the field |
| 16 | Press Enter to confirm the Work Center entry | — | SAP validates the Work Center calibration status |
| 17 | Observe the on-screen validation response | — | An error message is displayed: "Work Center `{TD.expiredWorkCenterId}` has expired calibration. Cannot schedule operation." or similar validation error |
| 18 | Verify that the Work Center assignment is NOT saved | — | Work Center field is cleared or remains empty; operation is not assigned |
| 19 | Attempt to click the "Save" button in the toolbar (if enabled) | — | Save action is blocked or a validation error dialog appears |
| 20 | Verify that the Process Order status remains unchanged | — | Process Order status is still "Not Scheduled" or "Pending" (not "Scheduled" or "Released") |
| 21 | Click the "Cancel" or "Discard" button to exit edit mode | — | Edit mode is exited; no changes are saved |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP validation logic prevents assignment of Process Order operation to Work Center `{TD.expiredWorkCenterId}` with expired calibration
- Error message is displayed: "Work Center has expired calibration. Cannot schedule operation." or similar regulatory validation message
- Work Center assignment is NOT saved to the Process Order operation
- Process Order status remains unchanged (not scheduled)
- System log entry is created recording the attempted invalid assignment and validation failure (audit trail)
- Regulatory compliance is maintained: no production operations are allowed on expired equipment

---

### Post-conditions

- Process Order `{TD.processOrderNumber}` operation `{TD.operationNumber}` remains unassigned (no Work Center assigned)
- Work Center `{TD.expiredWorkCenterId}` calibration status remains "Expired"
- No batch production is initiated on the expired Work Center

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
