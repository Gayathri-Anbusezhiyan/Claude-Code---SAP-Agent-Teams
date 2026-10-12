# TC-CS-170: Attempt to Create Reservation When Available Stock is Exactly Zero

**User Story:**          [CS-63] User Story PP-014
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Component Reservation Management — Zero Stock Boundary Condition
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
| P1 | User Role | User has the role of Production Planner with SAP authorization to access Stock/Requirements List and create reservations |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists in the material master and is configured for plant `{TD.plant}` |
| P4 | Boundary Condition | Available stock for material `{TD.materialNumber}` in plant `{TD.plant}` is exactly zero (boundary condition for shortage warning) |

---

### Test Data

**Dataset Reference:** `testdata/CS-63/CS-63-testdata.json` — Dataset ID: `TD-CS-063-EDGE-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Material for reservation | Valid |
| Plant | `{TD.plant}` | Plant code for the material | Valid |
| Requirement Date | `{TD.requirementDate}` | Date when components are needed | Valid |
| Reservation Quantity | `{TD.reservationQuantity}` | Quantity to reserve | Valid |
| Available Stock | `{TD.zeroAvailableStock}` | Available stock quantity is exactly zero | Valid (boundary) |

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
| 7 | Click the search icon (top-right shell bar) and type "Stock/Requirements List" | — | Search results appear listing the Stock/Requirements List application |
| 8 | Click "Stock/Requirements List" from the search results | — | Stock/Requirements List application opens displaying the selection screen |
| 9 | In the "Material" filter field, enter the material number | `{TD.materialNumber}` | Material number is entered |
| 10 | In the "Plant" filter field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 11 | Click the "Go" button | — | The application retrieves and displays the stock/requirements list for the specified material and plant |
| 12 | Observe the Available Stock quantity displayed in the list | `{TD.zeroAvailableStock}` | Available stock is displayed as exactly zero (0) for the material and plant |
| 13 | Initiate a new reservation action (if available via UI button or menu) | — | Reservation creation dialog or form opens |
| 14 | In the "Requirement Date" field, enter the requirement date | `{TD.requirementDate}` | Requirement date is entered |
| 15 | In the "Reservation Quantity" field, enter the quantity | `{TD.reservationQuantity}` | Quantity is entered |
| 16 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; system accepts the value |
| 17 | Save or confirm the reservation creation | — | System processes the reservation; a warning message may be displayed indicating shortage or zero stock |
| 18 | Observe any warning messages or stock shortage indicators | — | A warning message is displayed such as "Stock shortage: Available stock is zero" or "Material shortage detected"; the warning highlights that available stock is zero and the reservation may not be fulfilled immediately |
| 19 | Verify that the reservation is still created despite the zero stock warning | — | Reservation document is created; reservation number is displayed; status indicates the reservation is active but unfulfilled due to zero stock |
| 20 | Verify that the reservation entry shows the available stock as zero | `{TD.zeroAvailableStock}` | Available stock displayed in the reservation entry or stock/requirements list is exactly zero (0); the shortage is clearly indicated in the status or warning field |
| 21 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 22 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 23 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System accepts the reservation creation attempt even when available stock is exactly zero
- A warning message is displayed indicating stock shortage or zero stock availability
- A reservation document is successfully created despite the zero stock condition
- The reservation status indicates that it is unfulfilled or pending due to zero stock
- Available stock is accurately displayed as zero (0) in the stock/requirements list and reservation details
- No system errors prevent reservation creation; the warning is informational only

---

### Post-conditions

- A reservation document exists with status indicating unfulfilled or pending due to zero stock
- Available stock for the material remains at exactly zero
- User is signed out successfully

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
