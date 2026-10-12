# TC-CS-164: Attempt to Create Reservation with Missing Requirement Date

**User Story:**          [CS-63] User Story PP-014
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Component Reservation Management — Missing Requirement Date Validation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to access Stock/Requirements List and create reservations |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists in the material master and is configured for plant `{TD.plant}` |
| P4 | Error Condition | Requirement Date field will be intentionally left empty to trigger mandatory field validation |

---

### Test Data

**Dataset Reference:** `testdata/CS-63/CS-63-testdata.json` — Dataset ID: `TD-CS-063-ERR-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Material for reservation | Valid |
| Plant | `{TD.plant}` | Plant code for the material | Valid |
| Requirement Date | `{TD.emptyValue}` | Requirement date field intentionally left empty | Invalid (missing) |
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
| 12 | Select a reservation entry or initiate a new reservation action | — | Reservation creation or modification dialog opens |
| 13 | In the "Reservation Quantity" field, enter the quantity | `{TD.reservationQuantity}` | Quantity is entered |
| 14 | Leave the "Requirement Date" field empty | `{TD.emptyValue}` | Requirement Date field remains empty |
| 15 | Attempt to save or confirm the reservation | — | System prevents submission or displays an error message indicating that Requirement Date is a mandatory field |
| 16 | Observe the error message or field validation indicator | — | A descriptive error message is displayed such as "Requirement Date is required" or "Enter a requirement date"; the Requirement Date field is highlighted as mandatory; system prevents reservation creation until Requirement Date is provided |
| 17 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 18 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 19 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System detects the missing Requirement Date field and prevents reservation creation
- A clear, descriptive error message is displayed indicating that Requirement Date is a mandatory field
- No reservation document is created without a valid Requirement Date
- The Requirement Date field is visually highlighted as mandatory (e.g., with a red border or asterisk)

---

### Post-conditions

- No reservation document is created
- No changes are made to the system
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
