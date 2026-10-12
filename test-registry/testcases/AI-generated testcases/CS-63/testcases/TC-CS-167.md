# TC-CS-167: Create Reservation with Maximum Boundary Quantity Equal to Planned Quantity

**User Story:**          [CS-63] User Story PP-014
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Component Reservation Management — Maximum Quantity Boundary
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to access Stock/Requirements List and create reservations |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists in the material master and is configured for plant `{TD.plant}` |
| P4 | Master Data | A planned quantity `{TD.plannedQuantity}` is defined for the material in the production order or requirement |
| P5 | Boundary Condition | Reservation quantity is set equal to the planned quantity (maximum valid boundary for reservation) |

---

### Test Data

**Dataset Reference:** `testdata/CS-63/CS-63-testdata.json` — Dataset ID: `TD-CS-063-EDGE-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Material for reservation | Valid |
| Plant | `{TD.plant}` | Plant code for the material | Valid |
| Requirement Date | `{TD.requirementDate}` | Date when components are needed | Valid |
| Planned Quantity | `{TD.plannedQuantity}` | Total planned quantity from production order | Valid |
| Reservation Quantity | `{TD.maxQuantity}` | Maximum valid quantity equal to planned quantity | Valid (boundary) |

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
| 12 | Initiate a new reservation action (if available via UI button or menu) | — | Reservation creation dialog or form opens |
| 13 | In the "Requirement Date" field, enter the requirement date | `{TD.requirementDate}` | Requirement date is entered |
| 14 | In the "Reservation Quantity" field, enter the maximum boundary quantity equal to planned quantity | `{TD.maxQuantity}` | Maximum quantity value (equal to `{TD.plannedQuantity}`) is entered |
| 15 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; system accepts the value |
| 16 | Save or confirm the reservation creation | — | System processes the reservation; a success message is displayed or the reservation appears in the list |
| 17 | Observe the success message or newly created reservation entry | — | A reservation document is created with the maximum boundary quantity; reservation number is displayed; status indicates the reservation is active |
| 18 | Verify that the reservation quantity matches the entered maximum value and equals the planned quantity | `{TD.maxQuantity}`, `{TD.plannedQuantity}` | Quantity displayed in the reservation entry matches `{TD.maxQuantity}` exactly and equals `{TD.plannedQuantity}`; no warnings are displayed about exceeding planned quantity |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System accepts the maximum valid boundary quantity (equal to planned quantity) for reservation creation
- A reservation document is successfully created with the maximum quantity
- No validation errors or warnings are displayed about exceeding planned quantity
- The created reservation is persisted in SAP and visible in the Stock/Requirements List
- Reservation quantity exactly matches the planned quantity

---

### Post-conditions

- A reservation document exists with the maximum boundary quantity equal to planned quantity
- Reservation status is active
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
