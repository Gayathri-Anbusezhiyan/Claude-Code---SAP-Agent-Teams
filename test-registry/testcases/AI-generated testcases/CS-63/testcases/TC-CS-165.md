# TC-CS-165: Attempt to Adjust Reservation Quantity with Missing Quantity Value

**User Story:**          [CS-63] User Story PP-014
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Component Reservation Management — Missing Reservation Quantity Validation
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
| P1 | User Role | User has the role of Production Planner with SAP authorization to access Stock/Requirements List and modify reservations |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists in the material master and is configured for plant `{TD.plant}` |
| P4 | Master Data | An existing reservation `{TD.existingReservationNumber}` is available for the specified material and plant |
| P5 | Error Condition | Reservation Quantity field will be intentionally cleared to empty to trigger mandatory field validation |

---

### Test Data

**Dataset Reference:** `testdata/CS-63/CS-63-testdata.json` — Dataset ID: `TD-CS-063-ERR-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Material for reservation | Valid |
| Plant | `{TD.plant}` | Plant code for the material | Valid |
| Existing Reservation Number | `{TD.existingReservationNumber}` | Reservation document to be modified | Valid |
| Reservation Quantity | `{TD.emptyValue}` | Quantity field intentionally cleared to empty | Invalid (missing) |

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
| 12 | Locate the existing reservation entry in the list | `{TD.existingReservationNumber}` | Reservation entry is visible in the list |
| 13 | Click on the reservation entry to open the details or edit view | — | Reservation details are displayed; the entry opens in edit mode or an edit button is available |
| 14 | Click the "Edit" button if not already in edit mode | — | Reservation fields become editable |
| 15 | Clear the "Reservation Quantity" field to empty | `{TD.emptyValue}` | Quantity field is cleared; field is now empty |
| 16 | Attempt to save or confirm the reservation change | — | System prevents submission or displays an error message indicating that Reservation Quantity is a mandatory field |
| 17 | Observe the error message or field validation indicator | — | A descriptive error message is displayed such as "Reservation Quantity is required" or "Enter a quantity"; the Reservation Quantity field is highlighted as mandatory; system prevents saving until a valid quantity is provided |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- System detects the missing Reservation Quantity field and prevents saving the modification
- A clear, descriptive error message is displayed indicating that Reservation Quantity is a mandatory field
- The reservation remains unchanged in the system
- The Reservation Quantity field is visually highlighted as mandatory (e.g., with a red border or asterisk)

---

### Post-conditions

- No changes are saved to the reservation document
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
