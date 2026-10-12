# TC-CS-171: Verify Reservation Prevents Concurrent Allocation to Sales Order (PP to SD Integration)

**User Story:**          [CS-63] User Story PP-014
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Component Reservation Management — PP to SD Integration (Reservation Prevents Sales Order Allocation)
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
| P1 | User Role | User has the role of Production Planner with SAP authorization to access Stock/Requirements List and create reservations |
| P2 | User Role | User also has authorization to access Sales Order Management (SD module) for verification of allocation |
| P3 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P4 | Master Data | Material `{TD.materialNumber}` exists in the material master and is configured for plant `{TD.plant}` |
| P5 | Master Data | Available stock for material `{TD.materialNumber}` in plant `{TD.plant}` is exactly `{TD.availableStock}` (sufficient for only one allocation: either reservation or sales order, not both) |
| P6 | Integration | PP and SD modules are integrated; stock allocation logic prevents double-booking of reserved stock |

---

### Test Data

**Dataset Reference:** `testdata/CS-63/CS-63-testdata.json` — Dataset ID: `TD-CS-063-INT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material Number | `{TD.materialNumber}` | Material for reservation | Valid |
| Plant | `{TD.plant}` | Plant code for the material | Valid |
| Requirement Date | `{TD.requirementDate}` | Date when components are needed | Valid |
| Reservation Quantity | `{TD.reservationQuantity}` | Quantity to reserve (equal to available stock) | Valid |
| Available Stock | `{TD.availableStock}` | Available stock quantity (limited to reservation quantity) | Valid |
| Sales Order Customer | `{TD.customerId}` | Customer ID for sales order creation | Valid |
| Sales Order Material | `{TD.materialNumber}` | Same material as reserved | Valid |
| Sales Order Quantity | `{TD.salesOrderQuantity}` | Quantity for sales order (equal to or less than available stock) | Valid |

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
| 12 | Observe the initial Available Stock quantity | `{TD.availableStock}` | Available stock is displayed as `{TD.availableStock}` (sufficient for only one allocation) |
| 13 | Initiate a new reservation action | — | Reservation creation dialog or form opens |
| 14 | In the "Requirement Date" field, enter the requirement date | `{TD.requirementDate}` | Requirement date is entered |
| 15 | In the "Reservation Quantity" field, enter the quantity equal to available stock | `{TD.reservationQuantity}` | Quantity is entered (equal to `{TD.availableStock}`) |
| 16 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; system accepts the value |
| 17 | Save or confirm the reservation creation | — | System processes the reservation; a success message is displayed; reservation document is created |
| 18 | Note the reservation number from the success message | — | Reservation number is displayed and recorded |
| 19 | Navigate back to the Fiori Launchpad home page | — | Launchpad home page is displayed |
| 20 | Click the search icon and type "Create Sales Order" or "Manage Sales Orders" | — | Search results appear listing the sales order application |
| 21 | Click "Create Sales Order" from the search results | — | Sales Order creation form opens |
| 22 | In the "Customer" field, enter the customer ID | `{TD.customerId}` | Customer ID is entered |
| 23 | Press Enter to confirm the customer entry | — | Customer is validated; customer name and details are auto-populated |
| 24 | In the line item "Material" field, enter the same material number | `{TD.materialNumber}` | Material number is entered |
| 25 | Press Enter to confirm the material entry | — | Material is validated; material description is auto-populated |
| 26 | In the "Quantity" field, enter the sales order quantity | `{TD.salesOrderQuantity}` | Quantity is entered (equal to or less than original available stock) |
| 27 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; system checks availability |
| 28 | Observe any availability check results or warning messages | — | System displays a warning message such as "Material shortage" or "Insufficient available stock" or "Stock is reserved"; available-to-promise (ATP) check indicates that the material quantity is reserved and not available for sales order allocation |
| 29 | Attempt to save or create the sales order | — | System either prevents sales order creation with a blocking error message, or creates the sales order but marks it as incomplete/on hold due to insufficient unreserved stock |
| 30 | Verify that the reservation has prevented concurrent allocation of the stock to the sales order | — | The sales order cannot allocate the reserved stock; the reserved quantity is protected from concurrent SD allocation; the integration between PP and SD correctly enforces reservation priority |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A reservation is successfully created for the material with quantity equal to available stock
- When a sales order is subsequently attempted for the same material and plant, the system detects that the stock is reserved
- The ATP (available-to-promise) check reflects the reservation and prevents concurrent allocation to the sales order
- A warning or error message is displayed indicating material shortage or reserved stock
- The sales order is either blocked from creation or marked as incomplete/on hold due to insufficient unreserved stock
- The integration between PP (reservations) and SD (sales orders) correctly enforces reservation priority and prevents double-booking of stock

---

### Post-conditions

- A reservation document exists and protects the reserved stock from sales order allocation
- No sales order is successfully created and allocated with the reserved stock
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
