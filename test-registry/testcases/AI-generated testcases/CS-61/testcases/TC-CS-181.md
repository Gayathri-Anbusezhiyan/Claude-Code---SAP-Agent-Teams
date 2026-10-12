# TC-CS-181: Reschedule Process Order and Verify Material Availability Dates Re-Calculated in MRP

**User Story:**          [CS-61] View A Capacity Planning Overview For Cleanroom/Sterile Manufacturing
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning (PP)
**Feature:**             Cross-Module Integration — Capacity Planning to Material Requirements Planning
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to access Capacity Planning, reschedule process orders, and view MRP data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Work Center `{TD.workCenterId}` exists, is active, and configured for cleanroom/sterile manufacturing with validated capacity |
| P4 | Master Data | Process order `{TD.processOrderId}` exists, is released, and is currently scheduled to Work Center `{TD.workCenterId}` with current start date `{TD.currentStartDate}` |
| P5 | Master Data | Material `{TD.materialId}` produced by the process order has material requirements planning (MRP) data configured; material availability dates are linked to the process order schedule |
| P6 | Authorization | User has authorization to reschedule process orders and view MRP data (e.g., Stock/Requirements List) |
| P7 | Configuration | MRP is configured to automatically recalculate material availability dates when process order schedules change; real-time or near-real-time MRP updates are enabled |

---

### Test Data

**Dataset Reference:** `testdata/CS-61/CS-61-testdata.json` — Dataset ID: `TD-CS-061-INT-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Work Center ID | `{TD.workCenterId}` | Cleanroom/sterile work center ID — entered or selected by the user | Valid |
| Time Period | `{TD.timePeriod}` | Planning horizon (date range or period) — selected by the user | Valid |
| Process Order ID | `{TD.processOrderId}` | Process order to be rescheduled — user selects this from capacity view | Valid |
| Material ID | `{TD.materialId}` | Material/product produced by the process order — system displays this value | Valid |
| Current Start Date | `{TD.currentStartDate}` | Current start date/time of the process order before rescheduling — system displays this value | Valid |
| New Start Date | `{TD.newStartDate}` | New start date/time for the process order after rescheduling — entered by the user | Valid |
| Original Availability Date | `{TD.originalAvailabilityDate}` | Original material availability date before rescheduling — system displays this value in MRP data | Valid |
| Updated Availability Date | `{TD.updatedAvailabilityDate}` | Updated material availability date after rescheduling — system recalculates and displays this value in MRP data | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Stock/Requirements List" or "MRP" | — | Search results appear listing the Stock/Requirements List or MRP application |
| 8 | Click the "Stock/Requirements List" or MRP application name from the search results | — | Stock/Requirements List application opens |
| 9 | In the Material field, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 10 | Press Enter to confirm the Material entry and load the MRP data | — | SAP loads the Stock/Requirements List displaying receipts and requirements for the material |
| 11 | Locate the process order in the MRP list | `{TD.processOrderId}` | Process order is visible in the receipts list with the original availability date `{TD.originalAvailabilityDate}` |
| 12 | Verify the original material availability date for the process order | `{TD.originalAvailabilityDate}` | Availability date is displayed (e.g., "2026-08-26") |
| 13 | Navigate back to the Fiori Launchpad home page | — | Fiori Launchpad home page is displayed |
| 14 | Click the search icon (top-right shell bar) and type "Capacity Planning" or "Monitor Work Center Load" | — | Search results appear listing the Capacity Planning or Monitor Work Center Load application |
| 15 | Click the "Capacity Planning" or "Monitor Work Center Load" application name from the search results | — | Capacity Planning application opens with filter/selection screen |
| 16 | In the Work Center field, enter the Work Center ID | `{TD.workCenterId}` | Work Center ID is entered into the field |
| 17 | Press Enter to confirm the Work Center entry | — | SAP validates the work center; Work Center description `{TD.workCenterDescription}` is auto-populated |
| 18 | In the Period / Time Horizon field, select or enter the time period | `{TD.timePeriod}` | Time period is selected (e.g., current week, current month, or specific date range) |
| 19 | Click the "Go" or "Display" button to load the capacity overview | — | SAP processes the request and displays the capacity planning overview screen with scheduled process orders |
| 20 | Locate the process order in the capacity load view | `{TD.processOrderId}` | Process order is visible in the capacity timeline or list view with current start date `{TD.currentStartDate}` |
| 21 | Select the process order row or click the "Reschedule" action button for the process order | `{TD.processOrderId}` | Process order row is selected or a rescheduling dialog/form opens |
| 22 | In the "New Start Date" field, enter the new start date/time | `{TD.newStartDate}` | New start date is entered (e.g., "2026-08-30 10:00") |
| 23 | Press Enter to confirm the new start date entry | — | New start date value is confirmed in the field |
| 24 | Click the "Save" or "Confirm" button to apply the rescheduling change | — | SAP processes the rescheduling request |
| 25 | Observe the on-screen confirmation response | — | A success message is displayed indicating "Process order rescheduled successfully" or similar confirmation text |
| 26 | Navigate back to the Fiori Launchpad home page | — | Fiori Launchpad home page is displayed |
| 27 | Click the search icon (top-right shell bar) and type "Stock/Requirements List" or "MRP" | — | Search results appear listing the Stock/Requirements List or MRP application |
| 28 | Click the "Stock/Requirements List" or MRP application name from the search results | — | Stock/Requirements List application opens |
| 29 | In the Material field, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 30 | Press Enter to confirm the Material entry and load the updated MRP data | — | SAP loads the Stock/Requirements List displaying updated receipts and requirements for the material |
| 31 | Locate the process order in the MRP list | `{TD.processOrderId}` | Process order is visible in the receipts list with the updated availability date |
| 32 | Verify that the material availability date is updated to reflect the new process order start date | `{TD.updatedAvailabilityDate}` | Availability date is updated and displayed (e.g., "2026-08-30") matching the new start date set in Capacity Planning |
| 33 | Verify that dependent MRP elements (e.g., dependent requirements, planned orders) are recalculated based on the new availability date | — | MRP data shows recalculated requirement dates and planned orders reflecting the updated material availability |
| 34 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 35 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 36 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The process order is successfully rescheduled in Capacity Planning from the original start date to the new start date
- Material availability date for the material produced by the process order is automatically recalculated in MRP
- The updated availability date in the Stock/Requirements List reflects the new process order schedule
- Dependent MRP elements (e.g., dependent requirements, planned orders) are recalculated based on the new availability date
- Data consistency is maintained across Capacity Planning and Material Requirements Planning modules

---

### Post-conditions

- Process order `{TD.processOrderId}` start date is updated in SAP to `{TD.newStartDate}`
- Material availability date for material `{TD.materialId}` is recalculated and updated in MRP data
- Dependent MRP elements are recalculated based on the new availability date
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
