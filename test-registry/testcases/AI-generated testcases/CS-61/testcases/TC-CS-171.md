# TC-CS-171: Resequence Multiple Process Orders Without Changing Dates

**User Story:**          [CS-61] View A Capacity Planning Overview For Cleanroom/Sterile Manufacturing
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Process Order Resequencing from Capacity Planning
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to access Capacity Planning, view work center load data, and resequence process orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.workCenterId}` exists, is active, and configured for cleanroom/sterile manufacturing with validated capacity |
| P4 | Master Data | At least three process orders `{TD.processOrderId1}`, `{TD.processOrderId2}`, `{TD.processOrderId3}` exist, are released, and are scheduled to Work Center `{TD.workCenterId}` in a specific sequence with current order `{TD.currentSequence}` |
| P5 | Authorization | User has authorization object PP_ORDER with activity "Change" (02) to resequence process orders |
| P6 | Configuration | Capacity Planning Fiori app supports inline resequencing actions (change execution order without changing dates); capacity load recalculation is enabled and immediate |

---

### Test Data

**Dataset Reference:** `testdata/CS-61/CS-61-testdata.json` — Dataset ID: `TD-CS-061-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID | `{TD.workCenterId}` | Cleanroom/sterile work center ID — entered or selected by the user | Valid |
| Time Period | `{TD.timePeriod}` | Planning horizon (date range or period) — selected by the user | Valid |
| Process Order 1 ID | `{TD.processOrderId1}` | First process order in current sequence — user views this in capacity planning | Valid |
| Process Order 2 ID | `{TD.processOrderId2}` | Second process order in current sequence — user views this in capacity planning | Valid |
| Process Order 3 ID | `{TD.processOrderId3}` | Third process order in current sequence — user views this in capacity planning | Valid |
| Current Sequence | `{TD.currentSequence}` | Current execution sequence of process orders (e.g., PO1 → PO2 → PO3) — system displays this sequence | Valid |
| New Sequence | `{TD.newSequence}` | New execution sequence after resequencing (e.g., PO2 → PO1 → PO3) — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Capacity Planning" or "Monitor Work Center Load" | — | Search results appear listing the Capacity Planning or Monitor Work Center Load application |
| 8 | Click the "Capacity Planning" or "Monitor Work Center Load" application name from the search results | — | Capacity Planning application opens with filter/selection screen |
| 9 | In the Work Center field, enter the Work Center ID | `{TD.workCenterId}` | Work Center ID is entered into the field |
| 10 | Press Enter to confirm the Work Center entry | — | SAP validates the work center; Work Center description `{TD.workCenterDescription}` is auto-populated |
| 11 | In the Period / Time Horizon field, select or enter the time period | `{TD.timePeriod}` | Time period is selected (e.g., current week, current month, or specific date range) |
| 12 | Click the "Go" or "Display" button to load the capacity overview | — | SAP processes the request and displays the capacity planning overview screen with scheduled process orders |
| 13 | Verify the current sequence of process orders in the capacity load view | `{TD.currentSequence}` | Process orders are displayed in the current sequence: `{TD.processOrderId1}` (first), `{TD.processOrderId2}` (second), `{TD.processOrderId3}` (third) |
| 14 | Select process order 2 to resequence it | `{TD.processOrderId2}` | Process order 2 row is selected or highlighted |
| 15 | Click the "Move Up" or "Resequence" action button to change the execution order | — | A resequencing dialog or action is triggered allowing the user to change the process order position |
| 16 | Move process order 2 to the first position in the sequence (before process order 1) | `{TD.processOrderId2}` | Process order 2 is moved to the first position in the sequence |
| 17 | Click the "Save" or "Confirm" button to apply the resequencing change | — | SAP processes the resequencing request |
| 18 | Observe the on-screen confirmation response | — | A success message is displayed indicating "Process orders resequenced successfully" or similar confirmation text |
| 19 | Verify that the sequence of process orders is updated in the capacity load view | `{TD.newSequence}` | Process orders are now displayed in the new sequence: `{TD.processOrderId2}` (first), `{TD.processOrderId1}` (second), `{TD.processOrderId3}` (third) |
| 20 | Verify that the start dates of the process orders remain unchanged | — | Start dates of all three process orders remain the same as before resequencing (only execution order changed, not dates) |
| 21 | Verify that changeover time (if applicable) is recalculated based on the new sequence | — | If changeover time depends on product sequence, changeover time blocks are recalculated and updated in the capacity view |
| 22 | Verify that the capacity load chart or timeline reflects the updated sequence immediately | — | Capacity load visualization updates in real-time showing the new process order sequence |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The process orders are successfully resequenced from the original execution order to the new execution order
- A success confirmation message is displayed by SAP
- The capacity planning view is immediately updated to reflect the new sequence
- Start dates of the process orders remain unchanged (only execution order is modified)
- Changeover time (if applicable) is recalculated based on the new product sequence
- The capacity load chart or timeline visually displays the updated process order sequence in real-time

---

### Post-conditions

- Process orders `{TD.processOrderId1}`, `{TD.processOrderId2}`, `{TD.processOrderId3}` execution sequence is updated in SAP to the new sequence `{TD.newSequence}`
- Start dates and end dates of the process orders remain unchanged
- Capacity load data for Work Center `{TD.workCenterId}` is updated and reflects the new sequence
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
