# TC-CS-162: Attempt to Create Reservation with Missing Material Number

**User Story:**          [CS-63] User Story PP-014
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Mandatory Field Validation — Material Number
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
| P1 | User Role | User has the role of Production Planner with SAP authorization to create manual reservations |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Configuration | Material Number is configured as a mandatory field for reservation creation |

---

### Test Data

**Dataset Reference:** `testdata/CS-63/CS-63-testdata.json` — Dataset ID: `TD-CS-063-ERR-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.emptyValue}` | Empty/blank value (mandatory field left empty) | Invalid (missing) |
| Plant | `{TD.plant}` | Valid plant code | Valid |
| Requirement Date | `{TD.requirementDate}` | Valid future date | Valid |
| Reservation Quantity | `{TD.reservationQuantity}` | Valid quantity | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Reservation" | — | Search results appear listing the Create Reservation application |
| 8 | Click "Create Reservation" from the search results | — | Create Reservation application opens displaying the creation form |
| 9 | Leave the "Material" field empty (do not enter any value) | `{TD.emptyValue}` | Material field remains blank |
| 10 | In the "Plant" field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 11 | Press Enter to confirm the plant entry | — | Plant is accepted |
| 12 | In the "Requirement Date" field, enter the requirement date | `{TD.requirementDate}` | Requirement date is entered |
| 13 | In the "Quantity" field, enter the reservation quantity | `{TD.reservationQuantity}` | Quantity is entered |
| 14 | Attempt to save the reservation by clicking the "Save" button | — | SAP validates the form and detects the missing Material field |
| 15 | Observe the error message displayed | — | An error message is displayed: "Material is a mandatory field" or "Please enter a Material Number" |
| 16 | Verify the Material field is highlighted as mandatory (e.g., red border, asterisk indicator) | — | Material field is visually indicated as required and missing |
| 17 | Verify the reservation save process is blocked; no reservation is created | — | Save action is prevented; no reservation number is generated |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP enforces mandatory field validation for Material Number
- An error message is displayed clearly indicating the field is required
- The reservation creation process is blocked; no reservation document is created
- The user is prompted to enter a valid Material Number before proceeding
- System ensures data integrity by preventing incomplete reservation entries

---

### Post-conditions

- No reservation is created
- Mandatory field validation is enforced correctly
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
