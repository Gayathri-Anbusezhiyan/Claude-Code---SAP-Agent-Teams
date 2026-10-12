# TC-CS-168: Create Reservation with Requirement Date Set to Current Date

**User Story:**          [CS-63] User Story PP-014
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Component Reservation Management — Current Date Boundary for Requirement Date
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
| P4 | Boundary Condition | Requirement Date is set to the current date (earliest valid date boundary) |

---

### Test Data

**Dataset Reference:** `testdata/CS-63/CS-63-testdata.json` — Dataset ID: `TD-CS-063-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Material for reservation | Valid |
| Plant | `{TD.plant}` | Plant code for the material | Valid |
| Requirement Date | `{TD.currentDate}` | Current date (earliest valid boundary for requirement date) | Valid (boundary) |
| Reservation Quantity | `{TD.reservationQuantity}` | Quantity to reserve | Valid |

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
| 13 | In the "Requirement Date" field, enter the current date | `{TD.currentDate}` | Current date is entered (earliest valid boundary) |
| 14 | In the "Reservation Quantity" field, enter the quantity | `{TD.reservationQuantity}` | Quantity is entered |
| 15 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; system accepts the value |
| 16 | Save or confirm the reservation creation | — | System processes the reservation; a success message is displayed or the reservation appears in the list |
| 17 | Observe the success message or newly created reservation entry | — | A reservation document is created with the current date as the requirement date; reservation number is displayed; status indicates the reservation is active |
| 18 | Verify that the requirement date matches the current date | `{TD.currentDate}` | Requirement date displayed in the reservation entry matches the current date; no warnings are displayed about past or invalid dates |
| 19 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 20 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 21 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System accepts the current date as a valid requirement date (earliest valid boundary)
- A reservation document is successfully created with the current date as the requirement date
- No validation errors or warnings are displayed about the requirement date
- The created reservation is persisted in SAP and visible in the Stock/Requirements List
- Requirement date is stored and displayed accurately as the current date

---

### Post-conditions

- A reservation document exists with the requirement date set to the current date
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
