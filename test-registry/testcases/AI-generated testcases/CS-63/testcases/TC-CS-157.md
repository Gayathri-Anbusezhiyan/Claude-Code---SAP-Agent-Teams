# TC-CS-157: Cancel Process Order and Verify Automatic Reservation Release

**User Story:**          [CS-63] User Story PP-014
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Automatic Reservation Release upon Process Order Cancellation
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
| P1 | User Role | User has the role of Production Planner with SAP authorization to cancel process orders and view reservations |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | A process order `{TD.processOrderNumber}` exists in SAP with status "Created" or "Released" (not yet confirmed or completed) |
| P4 | Master Data | An active reservation `{TD.reservationNumber}` exists for component material `{TD.componentMaterial}`, linked to the process order |
| P5 | Configuration | Automatic reservation cancellation/release is configured for process order cancellation |

---

### Test Data

**Dataset Reference:** `testdata/CS-63/CS-63-testdata.json` — Dataset ID: `TD-CS-063-AP-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Existing process order to be cancelled | Valid |
| Reservation Number | `{TD.reservationNumber}` | Existing reservation linked to the process order | Valid |
| Component Material | `{TD.componentMaterial}` | Component material reserved for the process order | Valid |
| Plant | `{TD.plant}` | Plant code for the process order | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Process Orders" | — | Search results appear listing the Manage Process Orders application |
| 8 | Click "Manage Process Orders" from the search results | — | Manage Process Orders application opens displaying the list of process orders |
| 9 | In the "Process Order" filter field, enter the process order number | `{TD.processOrderNumber}` | Process order number is entered |
| 10 | Press Enter to apply the filter | — | The filter creates a token with the entered process order number |
| 11 | Click the "Go" button | — | The specified process order is retrieved and displayed in the list |
| 12 | Select the process order by clicking on the row | — | The process order row is highlighted; order details are displayed |
| 13 | Verify the process order status and linked reservation number | `{TD.reservationNumber}` | Status is "Created" or "Released"; reservation is linked and active |
| 14 | Click the "Cancel Order" or "Delete" action button | — | A confirmation dialog appears asking to confirm the cancellation |
| 15 | In the confirmation dialog, click "Cancel Order" or "OK" | — | SAP processes the cancellation; a success message is displayed indicating the process order has been cancelled |
| 16 | Observe the success message | — | Success message confirms the process order has been cancelled or deleted |
| 17 | Navigate back to the Fiori home page using the home icon | — | Fiori Launchpad home page is displayed |
| 18 | Click the search icon (top-right shell bar) and type "Display Reservation" | — | Search results appear listing the Display Reservation application |
| 19 | Click "Display Reservation" from the search results | — | Display Reservation application opens displaying the entry screen |
| 20 | In the "Reservation" field, enter the reservation number | `{TD.reservationNumber}` | Reservation number is entered |
| 21 | Press Enter to load the reservation | — | SAP retrieves the reservation; reservation header and item details are displayed |
| 22 | Observe the reservation status field | — | Reservation status is updated to "Cancelled" or "Deleted" (indicating the reservation has been released automatically) |
| 23 | Verify the reservation is no longer active and is not consuming available stock | — | Status confirms the reservation is closed; no reserved quantity is shown as active |
| 24 | Navigate back to the Fiori home page using the home icon | — | Fiori Launchpad home page is displayed |
| 25 | Click the search icon (top-right shell bar) and type "Stock/Requirements List" | — | Search results appear listing the Stock/Requirements List application |
| 26 | Click "Stock/Requirements List" from the search results | — | Stock/Requirements List application opens displaying the selection screen |
| 27 | In the "Material" filter field, enter the component material number | `{TD.componentMaterial}` | Component material number is entered |
| 28 | In the "Plant" filter field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 29 | Click the "Go" button | — | The application retrieves and displays the stock/requirements list for the component material |
| 30 | Observe the requirements list for the cancelled reservation | — | The cancelled reservation is no longer shown as an open requirement; available stock has been recalculated |
| 31 | Verify the Available Stock has increased by the previously reserved quantity | — | Available Stock reflects the released reservation: Physical Stock minus remaining (active) reservations only |
| 32 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 33 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 34 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The process order is successfully cancelled or deleted
- The reservation linked to the cancelled process order is automatically released and updated to "Cancelled" or "Deleted" status
- The previously reserved quantity is no longer deducted from available stock calculations
- Available stock for the component material is recalculated and increased by the released quantity
- No errors or warnings are displayed during the cancellation or reservation release process
- The system prevents inventory lock-up when production orders are cancelled

---

### Post-conditions

- Process order status is "Cancelled" or "Deleted"
- Reservation status is "Cancelled" or "Deleted"
- Available stock for component materials is recalculated and reflects the released reservation
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
