# TC-CS-154: Execute Backflush Consumption and Verify Automatic Reservation Release

**User Story:**          [CS-63] User Story PP-014
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Automatic Reservation Release upon Backflush Consumption
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to execute backflush confirmations and view reservations |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | A process order `{TD.processOrderNumber}` exists in SAP with status "Released" |
| P4 | Master Data | Component materials in the process order BOM are configured with backflush indicator active |
| P5 | Master Data | An active reservation `{TD.reservationNumber}` exists for the component material `{TD.componentMaterial}`, linked to the process order |
| P6 | Master Data | Sufficient physical stock exists for the component material in plant `{TD.plant}` to fulfill the backflush consumption |
| P7 | Configuration | Backflush consumption is configured for the production order type in the SAP system |

---

### Test Data

**Dataset Reference:** `testdata/CS-63/CS-63-testdata.json` — Dataset ID: `TD-CS-063-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Existing process order with released status | Valid |
| Reservation Number | `{TD.reservationNumber}` | Existing reservation linked to the process order | Valid |
| Component Material | `{TD.componentMaterial}` | Component material reserved for the process order | Valid |
| Plant | `{TD.plant}` | Plant code for the process order | Valid |
| Yield Quantity | `{TD.yieldQuantity}` | Confirmed yield quantity (finished product output) | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Confirm Process Order" | — | Search results appear listing the Confirm Process Order application |
| 8 | Click "Confirm Process Order" from the search results | — | Confirm Process Order application opens displaying the selection/entry screen |
| 9 | In the "Process Order" field, enter the process order number | `{TD.processOrderNumber}` | Process order number is entered |
| 10 | Press Enter to load the process order | — | SAP retrieves the process order; order details are displayed including operation details and BOM components |
| 11 | Verify the process order status is "Released" and components are displayed | — | Status is "Released"; component list shows materials with backflush indicator active |
| 12 | In the "Yield" or "Confirmed Quantity" field, enter the yield quantity | `{TD.yieldQuantity}` | Yield quantity is entered (represents finished product output) |
| 13 | Click the "Confirm" or "Post" button | — | SAP processes the backflush confirmation; a success message is displayed indicating the confirmation number |
| 14 | Observe the success message | — | Success message displays the confirmation document number; no errors are shown |
| 15 | Note the confirmation number from the success message | — | Confirmation number is displayed (10-digit numeric format) |
| 16 | Navigate back to the Fiori home page using the home icon | — | Fiori Launchpad home page is displayed |
| 17 | Click the search icon (top-right shell bar) and type "Display Reservation" | — | Search results appear listing the Display Reservation application |
| 18 | Click "Display Reservation" from the search results | — | Display Reservation application opens displaying the entry screen |
| 19 | In the "Reservation" field, enter the reservation number | `{TD.reservationNumber}` | Reservation number is entered |
| 20 | Press Enter to load the reservation | — | SAP retrieves the reservation; reservation header and item details are displayed |
| 21 | Observe the reservation status field | — | Reservation status is updated to "Completed" or "Closed" (indicating the reservation has been released) |
| 22 | Verify the "Withdrawn Quantity" or "Issued Quantity" field matches the consumed quantity | — | Withdrawn quantity matches the backflushed component quantity; reservation is fully fulfilled |
| 23 | Navigate back to the Fiori home page using the home icon | — | Fiori Launchpad home page is displayed |
| 24 | Click the search icon (top-right shell bar) and type "Stock/Requirements List" | — | Search results appear listing the Stock/Requirements List application |
| 25 | Click "Stock/Requirements List" from the search results | — | Stock/Requirements List application opens displaying the selection screen |
| 26 | In the "Material" filter field, enter the component material number | `{TD.componentMaterial}` | Component material number is entered |
| 27 | In the "Plant" filter field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 28 | Click the "Go" button | — | The application retrieves and displays the stock/requirements list for the component material |
| 29 | Observe the requirements list for the previously reserved quantity | — | The reservation entry for the closed reservation is no longer shown as an open requirement, or status is "Completed" |
| 30 | Verify the Available Stock has increased by the released reserved quantity | — | Available Stock reflects the release: Physical Stock minus remaining (non-released) reservations |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Backflush confirmation is successfully posted for the process order; a confirmation document number is generated
- Component materials are automatically consumed via backflush (goods issue posting)
- The reservation linked to the process order is automatically released and updated to "Completed" or "Closed" status
- The reserved quantity is no longer deducted from available stock calculations
- Available stock for the component material is updated to reflect the released reservation
- No errors or warnings are displayed during the backflush or reservation release process

---

### Post-conditions

- A backflush confirmation document exists in SAP with the generated confirmation number
- Component materials show goods issue postings in the material document
- Reservation status is "Completed" or "Closed"
- Available stock for component materials is recalculated and increased by the previously reserved quantity
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
