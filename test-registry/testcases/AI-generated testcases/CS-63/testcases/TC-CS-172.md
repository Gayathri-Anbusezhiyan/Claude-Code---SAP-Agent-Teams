# TC-CS-172: Verify Backflush Goods Issue Releases Reservation (PP to MM Integration)

**User Story:**          [CS-63] User Story PP-014
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Component Reservation Management — PP to MM Integration (Backflush Releases Reservation)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            HIGH
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to access Stock/Requirements List, create reservations, and perform backflush goods issue |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialNumber}` exists in the material master and is configured for plant `{TD.plant}` |
| P4 | Master Data | A production order `{TD.productionOrderNumber}` exists and is released for the specified material and plant |
| P5 | Master Data | A reservation `{TD.existingReservationNumber}` exists for the production order with reserved quantity `{TD.reservationQuantity}` |
| P6 | Integration | PP and MM modules are integrated; backflush goods issue automatically releases the corresponding reservation |

---

### Test Data

**Dataset Reference:** `testdata/CS-63/CS-63-testdata.json` — Dataset ID: `TD-CS-063-INT-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Material for reservation and backflush | Valid |
| Plant | `{TD.plant}` | Plant code for the material | Valid |
| Production Order Number | `{TD.productionOrderNumber}` | Released production order number | Valid |
| Existing Reservation Number | `{TD.existingReservationNumber}` | Reservation document for the production order | Valid |
| Reservation Quantity | `{TD.reservationQuantity}` | Quantity reserved for the production order | Valid |
| Goods Issue Quantity | `{TD.goodsIssueQuantity}` | Quantity to be backflushed (equal to or less than reserved quantity) | Valid |

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
| 12 | Locate the existing reservation entry in the list | `{TD.existingReservationNumber}` | Reservation entry is visible with status "Active" or "Open"; reserved quantity `{TD.reservationQuantity}` is displayed |
| 13 | Note the initial reservation status and reserved quantity | `{TD.reservationQuantity}` | Reservation status is "Active" or "Open"; reserved quantity matches `{TD.reservationQuantity}` |
| 14 | Navigate back to the Fiori Launchpad home page | — | Launchpad home page is displayed |
| 15 | Click the search icon and type "Goods Issue for Production Order" or "Backflush Production Order" | — | Search results appear listing the goods issue or backflush application |
| 16 | Click "Goods Issue for Production Order" from the search results | — | Goods Issue application opens |
| 17 | In the "Production Order" field, enter the production order number | `{TD.productionOrderNumber}` | Production order number is entered |
| 18 | Press Enter to confirm the production order entry | — | Production order is validated; production order details are displayed; components linked to the reservation are listed |
| 19 | In the "Quantity" field for the material, enter the goods issue quantity | `{TD.goodsIssueQuantity}` | Goods issue quantity is entered (equal to or less than reserved quantity) |
| 20 | Press Enter to confirm the goods issue quantity | — | Quantity is confirmed; system calculates the backflush impact |
| 21 | Save or post the goods issue | — | System posts the goods issue; a success message is displayed; material document number is generated |
| 22 | Note the material document number from the success message | — | Material document number is displayed and recorded |
| 23 | Navigate back to the Fiori Launchpad home page | — | Launchpad home page is displayed |
| 24 | Click the search icon and type "Stock/Requirements List" | — | Search results appear listing the Stock/Requirements List application |
| 25 | Click "Stock/Requirements List" from the search results | — | Stock/Requirements List application opens displaying the selection screen |
| 26 | In the "Material" filter field, enter the material number | `{TD.materialNumber}` | Material number is entered |
| 27 | In the "Plant" filter field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 28 | Click the "Go" button | — | The application retrieves and displays the updated stock/requirements list for the specified material and plant |
| 29 | Locate the reservation entry in the list | `{TD.existingReservationNumber}` | Reservation entry is visible; status has changed to "Released", "Fulfilled", or "Closed"; reserved quantity is reduced or set to zero |
| 30 | Verify that the reservation has been released or adjusted by the backflush goods issue | — | Reservation status indicates "Released" or "Closed"; reserved quantity is reduced by `{TD.goodsIssueQuantity}` or set to zero; the backflush goods issue has successfully released the reservation |
| 31 | Verify that the integration between PP (reservation) and MM (goods issue) is functioning correctly | — | The backflush goods issue automatically updates the reservation status and quantity; no manual intervention is required; the reservation is correctly released in response to the goods issue posting |
| 32 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 33 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 34 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A goods issue is successfully posted for the production order via backflush
- The backflush goods issue automatically releases the corresponding reservation
- The reservation status changes from "Active" or "Open" to "Released", "Fulfilled", or "Closed"
- The reserved quantity is reduced by the goods issue quantity or set to zero
- The integration between PP (reservations) and MM (goods issue) correctly automates reservation release upon backflush
- No manual intervention is required to update the reservation after backflush

---

### Post-conditions

- The reservation is released or adjusted by the backflush goods issue
- Material document is posted for the goods issue
- Reservation status is updated to "Released", "Fulfilled", or "Closed"
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
