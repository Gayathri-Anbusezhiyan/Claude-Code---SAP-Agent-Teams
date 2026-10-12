# TC-CS-151: Access Stock/Requirements List App and View Existing Reservations

**User Story:**          [CS-63] User Story PP-014
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Component Reservation Management — Stock/Requirements List Access
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            HIGH
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to access Stock/Requirements List and view reservation documents |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists in the material master and is configured for plant `{TD.plant}` |
| P4 | Master Data | At least one reservation exists in the system for the specified material and plant (created from prior production orders) |

---

### Test Data

**Dataset Reference:** `testdata/CS-63/CS-63-testdata.json` — Dataset ID: `TD-CS-063-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Material for which reservations are to be viewed | Valid |
| Plant | `{TD.plant}` | Plant code for the material | Valid |
| Reservation Number | `{TD.existingReservationNumber}` | Existing reservation document number (if searching by reservation) | Valid |

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
| 8 | Click "Stock/Requirements List" from the search results | — | Stock/Requirements List application opens displaying the selection screen with filter fields |
| 9 | In the "Material" filter field, enter the material number | `{TD.materialNumber}` | Material number is entered |
| 10 | In the "Plant" filter field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 11 | Click the "Go" button | — | The application retrieves and displays the stock/requirements list for the specified material and plant |
| 12 | Observe the list of requirements displayed | — | The list includes reservation items (indicated by reservation numbers or requirement type "Reservation") |
| 13 | Verify that reservation entries show key fields: Reservation Number, Requirement Date, Required Quantity, Available Stock | — | Reservation entries are displayed with all key fields visible; data is readable and structured in a table format |
| 14 | Select one reservation entry from the list (click on the row) | — | The reservation row is highlighted; reservation details are displayed in a detail pane or the row expands to show additional information |
| 15 | Verify that reservation details include: Material, Plant, Requirement Date, Reserved Quantity, UoM, Movement Type, Status | — | All specified fields are visible in the reservation detail view |
| 16 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 17 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 18 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Stock/Requirements List application is accessible to the Production Planner role
- Reservation documents for the specified material and plant are displayed in a structured list format
- Key reservation fields (Reservation Number, Requirement Date, Reserved Quantity, Available Stock) are visible and accurate
- Reservation details can be viewed by selecting a row from the list
- No application errors or missing data are observed

---

### Post-conditions

- Stock/Requirements List session is closed
- No changes are made to reservation data (read-only access verified)
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
