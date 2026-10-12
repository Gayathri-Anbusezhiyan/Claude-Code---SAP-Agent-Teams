# TC-CS-155: Manually Adjust Reservation Quantity Before Process Order Release

**User Story:**          [CS-63] User Story PP-014
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Manual Adjustment of Reservation Quantity
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to change reservation documents prior to process order release |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | A process order `{TD.processOrderNumber}` exists in SAP with status "Created" (not yet released) |
| P4 | Master Data | An active reservation `{TD.reservationNumber}` exists for component material `{TD.componentMaterial}`, linked to the process order |
| P5 | Master Data | The reservation has an original reserved quantity `{TD.originalQuantity}` |
| P6 | Configuration | Reservation changes are allowed for process orders in "Created" status (not yet released) |

---

### Test Data

**Dataset Reference:** `testdata/CS-63/CS-63-testdata.json` — Dataset ID: `TD-CS-063-AP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Reservation Number | `{TD.reservationNumber}` | Existing reservation to be modified | Valid |
| Component Material | `{TD.componentMaterial}` | Component material in the reservation | Valid |
| Plant | `{TD.plant}` | Plant code for the reservation | Valid |
| Original Quantity | `{TD.originalQuantity}` | Original reserved quantity before adjustment | Valid |
| Adjusted Quantity | `{TD.adjustedQuantity}` | New reserved quantity after manual adjustment | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Change Reservation" | — | Search results appear listing the Change Reservation application |
| 8 | Click "Change Reservation" from the search results | — | Change Reservation application opens displaying the entry screen |
| 9 | In the "Reservation" field, enter the reservation number | `{TD.reservationNumber}` | Reservation number is entered |
| 10 | Press Enter to load the reservation | — | SAP retrieves the reservation; reservation header and item details are displayed in edit mode |
| 11 | Verify the reservation header shows the component material, plant, and original reserved quantity | `{TD.componentMaterial}`, `{TD.plant}`, `{TD.originalQuantity}` | All fields display the expected original values |
| 12 | Navigate to the reservation item line for the component material | — | The item line is highlighted or selected; quantity field is editable |
| 13 | In the "Required Quantity" or "Reserved Quantity" field, clear the original value | — | Original quantity is cleared; field is empty and ready for new input |
| 14 | Enter the adjusted quantity | `{TD.adjustedQuantity}` | Adjusted quantity is entered into the field |
| 15 | Press Enter to confirm the quantity entry | — | SAP accepts the new quantity; the field is updated with the adjusted value |
| 16 | Click the "Save" button | — | SAP saves the reservation change; a success message is displayed indicating the reservation has been updated |
| 17 | Observe the success message | — | Success message confirms the reservation number has been saved with the new quantity |
| 18 | Navigate back to the Fiori home page using the home icon | — | Fiori Launchpad home page is displayed |
| 19 | Click the search icon (top-right shell bar) and type "Display Reservation" | — | Search results appear listing the Display Reservation application |
| 20 | Click "Display Reservation" from the search results | — | Display Reservation application opens displaying the entry screen |
| 21 | In the "Reservation" field, enter the reservation number | `{TD.reservationNumber}` | Reservation number is entered |
| 22 | Press Enter to load the reservation | — | SAP retrieves the reservation; reservation details are displayed in read-only mode |
| 23 | Verify the "Required Quantity" or "Reserved Quantity" field shows the adjusted quantity | `{TD.adjustedQuantity}` | Reserved quantity field displays the new adjusted value, not the original quantity |
| 24 | Verify the reservation status is still "Open" (not released or consumed) | — | Status is "Open"; reservation remains active with the adjusted quantity |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The reservation quantity is successfully updated from the original value to the adjusted value
- The change is saved in SAP; the reservation document reflects the new quantity
- The reservation status remains "Open" (adjustment does not release or consume the reservation)
- Available stock calculations are updated to reflect the new reserved quantity
- No errors or warnings are displayed during the adjustment process
- The production planner can adjust reservation quantities prior to process order release to prevent material shortages

---

### Post-conditions

- Reservation document is updated with the adjusted quantity
- Reservation status remains "Open"
- Stock/requirements calculations reflect the new reserved quantity
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
