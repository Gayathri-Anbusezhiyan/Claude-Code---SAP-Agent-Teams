# TC-CS-138: Zero Available Capacity - 100% Capacity Utilization

**User Story:**          [CS-54] User Story PP-005
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control (PP)
**Feature:**             MRP Capacity Overview - Maximum Load
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to execute MRP runs and view capacity overview |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists, is active, and is configured for MRP planning |
| P4 | Master Data | Plant `{TD.plant}` is active and configured for MRP processing |
| P5 | Master Data | Work center `{TD.workCenter}` is configured with capacity limits |
| P6 | Configuration | Work center capacity data is maintained showing available capacity |
| P7 | Transactional Data | Work center `{TD.workCenter}` is fully loaded with existing planned orders or production orders (100% capacity utilization) |
| P8 | Transactional Data | Net requirements exist for material `{TD.materialNumber}` creating additional demand for planned orders |

---

### Test Data

**Dataset Reference:** `testdata/CS-54/CS-54-testdata.json` — Dataset ID: `TD-CS-054-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Finished product material number — entered by the user | Valid |
| Material Description | `{TD.materialDesc}` | Material description — verified in results | Auto-populated |
| Plant | `{TD.plant}` | Production plant code — entered by the user | Valid |
| MRP Controller | `{TD.mrpController}` | MRP controller code — entered by the user | Valid |
| Planning Mode | `{TD.planningMode}` | Planning mode selection — selected by the user | Valid |
| Work Center | `{TD.workCenter}` | Work center code with full capacity utilization — verified in capacity overview | Valid |
| Total Capacity | `{TD.totalCapacity}` | Total available capacity of the work center — verified in capacity overview | Valid |
| Loaded Capacity | `{TD.loadedCapacity}` | Currently loaded capacity (100% of total) — verified in capacity overview | Valid (Boundary) |
| Available Capacity Zero | `{TD.availableCapacityZero}` | Available capacity (0% or zero units) — verified in capacity overview | Valid (Boundary) |
| Capacity Utilization | `{TD.capacityUtilization100}` | Capacity utilization percentage (100%) — verified in capacity overview | Valid (Boundary) |

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
| 7 | Click the search icon (top-right shell bar) and type "Stock/Requirements List" | — | Search results appear listing the "Stock/Requirements List" application |
| 8 | Click the "Stock/Requirements List" application name from the search results | — | Stock/Requirements List application opens with search criteria fields displayed |
| 9 | In the "Material" field, enter the material number | `{TD.materialNumber}` | Material number value is entered into the field |
| 10 | Press Enter to confirm the Material entry | — | SAP validates the material; material description `{TD.materialDesc}` is displayed |
| 11 | In the "Plant" field, enter the plant code | `{TD.plant}` | Plant code value is entered into the field |
| 12 | Press Enter to confirm the Plant entry | — | SAP validates the plant code |
| 13 | In the "MRP Controller" field, enter the MRP controller code | `{TD.mrpController}` | MRP controller code value is entered into the field |
| 14 | Press Enter to confirm the MRP Controller entry | — | SAP validates the MRP controller code |
| 15 | In the "Planning Mode" dropdown, select the planning mode | `{TD.planningMode}` | Planning mode is selected |
| 16 | Click the "Run MRP" or "Execute" button to initiate the MRP run | — | SAP begins MRP processing; a progress indicator is displayed |
| 17 | Wait for MRP processing to complete | — | MRP execution completes; results screen is displayed |
| 18 | Verify that a planned order has been generated | — | Planned order entry is visible in the Stock/Requirements List |
| 19 | Navigate to the "Capacity Overview" or "Work Center Capacity" screen | — | Capacity overview screen is displayed |
| 20 | Filter or search for the work center | `{TD.workCenter}` | Work center capacity data is displayed |
| 21 | Verify that the total capacity of the work center is displayed | `{TD.totalCapacity}` | Total capacity (e.g., hours or units) is shown for the work center |
| 22 | Verify that the loaded capacity is equal to total capacity | `{TD.loadedCapacity}` | Loaded capacity equals total capacity (100% utilization) |
| 23 | Verify that the available capacity is zero or 0% | `{TD.availableCapacityZero}` | Available capacity shows zero units or 0% (boundary case) |
| 24 | Verify that the capacity utilization percentage is 100% | `{TD.capacityUtilization100}` | Capacity utilization is displayed as 100% |
| 25 | Verify that the capacity overview visually indicates full capacity or overload | — | Capacity overview uses visual indicators (color coding, icons) to show full capacity or overload condition |
| 26 | Verify that the planned order load contributes to capacity calculation | — | The newly generated planned order is reflected in the capacity overview (may push utilization over 100%) |
| 27 | Verify that the capacity overview alerts the planner to capacity constraint | — | Capacity overview clearly indicates that there is no available capacity for additional orders, enabling the planner to sequence or reschedule |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- MRP run completes and generates a planned order for material `{TD.materialNumber}` at plant `{TD.plant}`
- Capacity overview displays 100% capacity utilization (zero available capacity) for work center `{TD.workCenter}`
- The system correctly handles the boundary case where capacity is fully loaded
- Capacity overview alerts the planner to the capacity constraint, enabling informed sequencing or rescheduling decisions
- The planned order may be flagged or highlighted as exceeding available capacity, prompting the planner to adjust the schedule

---

### Post-conditions

- Planned order exists in SAP
- Capacity overview reflects 100% capacity utilization or overload
- Planner is informed of the capacity constraint and can take corrective action (reschedule, sequence, add capacity)
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
