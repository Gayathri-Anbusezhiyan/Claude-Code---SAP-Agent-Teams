# TC-CS-173: Verify Shortage Warning Reflects Real-Time Stock Updates from Warehouse (MM to PP Integration)

**User Story:**          [CS-63] User Story PP-014
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Component Reservation Management — MM to PP Integration (Real-Time Stock Updates)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to access Stock/Requirements List and view real-time stock information |
| P2 | User Role | User also has authorization to perform goods movements (MM module) for verification of real-time updates |
| P3 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P4 | Master Data | Material `{TD.materialNumber}` exists in the material master and is configured for plant `{TD.plant}` |
| P5 | Master Data | Initial available stock for material `{TD.materialNumber}` in plant `{TD.plant}` is `{TD.initialStock}` (sufficient to create a reservation) |
| P6 | Integration | MM and PP modules are integrated; stock/requirements list reflects real-time stock updates from warehouse goods movements |

---

### Test Data

**Dataset Reference:** `testdata/CS-63/CS-63-testdata.json` — Dataset ID: `TD-CS-063-INT-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Material for reservation and stock monitoring | Valid |
| Plant | `{TD.plant}` | Plant code for the material | Valid |
| Initial Stock | `{TD.initialStock}` | Initial available stock quantity before goods movement | Valid |
| Requirement Date | `{TD.requirementDate}` | Date when components are needed | Valid |
| Reservation Quantity | `{TD.reservationQuantity}` | Quantity to reserve (greater than initial stock to trigger shortage warning) | Valid |
| Goods Issue Quantity | `{TD.goodsIssueQuantity}` | Quantity to be issued from warehouse (reduces available stock) | Valid |
| Expected Updated Stock | `{TD.expectedUpdatedStock}` | Expected stock after goods issue (initial stock minus goods issue quantity) | Valid |

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
| 12 | Observe the initial Available Stock quantity | `{TD.initialStock}` | Available stock is displayed as `{TD.initialStock}` |
| 13 | Initiate a new reservation action | — | Reservation creation dialog or form opens |
| 14 | In the "Requirement Date" field, enter the requirement date | `{TD.requirementDate}` | Requirement date is entered |
| 15 | In the "Reservation Quantity" field, enter a quantity greater than initial stock | `{TD.reservationQuantity}` | Quantity is entered (greater than `{TD.initialStock}` to trigger shortage warning) |
| 16 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; system checks availability |
| 17 | Observe any shortage warning messages | — | A warning message is displayed such as "Material shortage: Available stock insufficient to fulfill reservation" or "Stock shortage detected"; the shortage warning is based on current available stock `{TD.initialStock}` |
| 18 | Note the shortage warning details | — | Shortage warning indicates available stock `{TD.initialStock}` is less than requested reservation quantity `{TD.reservationQuantity}` |
| 19 | Do not save the reservation yet; keep the reservation dialog open or cancel and return to the stock/requirements list | — | Reservation dialog is open or closed; no reservation is created yet |
| 20 | Navigate back to the Fiori Launchpad home page | — | Launchpad home page is displayed |
| 21 | Click the search icon and type "Goods Issue" or "Post Goods Movement" | — | Search results appear listing the goods issue or goods movement application |
| 22 | Click "Goods Issue" from the search results | — | Goods Issue application opens |
| 23 | In the "Material" field, enter the material number | `{TD.materialNumber}` | Material number is entered |
| 24 | In the "Plant" field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 25 | In the "Quantity" field, enter the goods issue quantity | `{TD.goodsIssueQuantity}` | Goods issue quantity is entered (reduces available stock) |
| 26 | Press Enter to confirm the goods issue quantity | — | Quantity is confirmed; system calculates the stock reduction |
| 27 | Save or post the goods issue | — | System posts the goods issue; a success message is displayed; material document number is generated; available stock is reduced by `{TD.goodsIssueQuantity}` |
| 28 | Note the material document number from the success message | — | Material document number is displayed and recorded |
| 29 | Navigate back to the Fiori Launchpad home page | — | Launchpad home page is displayed |
| 30 | Click the search icon and type "Stock/Requirements List" | — | Search results appear listing the Stock/Requirements List application |
| 31 | Click "Stock/Requirements List" from the search results | — | Stock/Requirements List application opens displaying the selection screen |
| 32 | In the "Material" filter field, enter the material number | `{TD.materialNumber}` | Material number is entered |
| 33 | In the "Plant" filter field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 34 | Click the "Go" button | — | The application retrieves and displays the updated stock/requirements list for the specified material and plant |
| 35 | Observe the updated Available Stock quantity | `{TD.expectedUpdatedStock}` | Available stock is displayed as `{TD.expectedUpdatedStock}` (initial stock minus goods issue quantity); the stock value has been updated in real-time to reflect the goods issue from the warehouse |
| 36 | Initiate a new reservation action again | — | Reservation creation dialog or form opens |
| 37 | In the "Requirement Date" field, enter the requirement date | `{TD.requirementDate}` | Requirement date is entered |
| 38 | In the "Reservation Quantity" field, enter the same reservation quantity as before | `{TD.reservationQuantity}` | Quantity is entered (same as before) |
| 39 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; system checks availability based on the updated stock |
| 40 | Observe any updated shortage warning messages | — | The shortage warning message is updated to reflect the new available stock `{TD.expectedUpdatedStock}`; the shortage warning now indicates a greater shortage (or confirms zero stock if goods issue reduced stock to zero) based on real-time warehouse updates |
| 41 | Verify that the shortage warning reflects the real-time stock update from the warehouse goods issue | — | The shortage warning accurately reflects the reduced available stock `{TD.expectedUpdatedStock}` after the goods issue; the integration between MM (goods movements) and PP (reservations) correctly updates stock availability in real-time; no manual refresh or delay is observed |
| 42 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 43 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 44 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Stock/Requirements List initially displays available stock as `{TD.initialStock}`
- A reservation attempt with quantity greater than initial stock triggers a shortage warning based on the initial stock level
- A goods issue is successfully posted from the warehouse, reducing available stock to `{TD.expectedUpdatedStock}`
- The Stock/Requirements List immediately reflects the updated available stock `{TD.expectedUpdatedStock}` after the goods issue (real-time update)
- A subsequent reservation attempt for the same quantity triggers an updated shortage warning reflecting the reduced available stock
- The integration between MM (warehouse goods movements) and PP (reservations) correctly provides real-time stock updates
- No manual refresh or delay is required; stock availability is updated instantly

---

### Post-conditions

- Available stock is reduced to `{TD.expectedUpdatedStock}` after goods issue
- Stock/Requirements List reflects real-time stock updates from warehouse
- Shortage warnings accurately reflect current available stock levels
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
