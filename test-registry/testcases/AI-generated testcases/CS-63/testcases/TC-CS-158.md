# TC-CS-158: Attempt to Reserve Component Quantity Exceeding Available Stock and Verify Shortage Warning

**User Story:**          [CS-63] User Story PP-014
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Shortage Warning for Insufficient Available Stock
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to create planned orders and view reservations |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Component material `{TD.componentMaterial}` exists in the material master and is configured for plant `{TD.plant}` |
| P4 | Master Data | Current available stock for the component material is `{TD.currentAvailableStock}` (a quantity lower than the required quantity) |
| P5 | Master Data | A Bill of Materials (BOM) exists for finished product material `{TD.finishedProductMaterial}` requiring component quantity `{TD.requiredQuantity}` (greater than current available stock) |
| P6 | Configuration | Shortage warning indicator is configured and active for material availability checks |

---

### Test Data

**Dataset Reference:** `testdata/CS-63/CS-63-testdata.json` — Dataset ID: `TD-CS-063-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Finished Product Material | `{TD.finishedProductMaterial}` | Finished product material for the planned order | Valid |
| Component Material | `{TD.componentMaterial}` | Component material with insufficient stock | Valid |
| Plant | `{TD.plant}` | Plant code for the order | Valid |
| Current Available Stock | `{TD.currentAvailableStock}` | Current available stock (low quantity) | Valid |
| Required Quantity | `{TD.requiredQuantity}` | BOM-required quantity exceeding available stock | Invalid (exceeds available stock) |
| Order Quantity | `{TD.orderQuantity}` | Planned order quantity for the finished product | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Planned Order" | — | Search results appear listing the Create Planned Order application |
| 8 | Click "Create Planned Order" from the search results | — | Create Planned Order application opens displaying the creation form |
| 9 | In the "Material" field, enter the finished product material number | `{TD.finishedProductMaterial}` | Finished product material number is entered |
| 10 | Press Enter to confirm the material entry | — | SAP validates the material; material description is auto-populated |
| 11 | In the "Plant" field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 12 | Press Enter to confirm the plant entry | — | Plant is accepted; MRP data is loaded |
| 13 | In the "Order Quantity" field, enter the order quantity | `{TD.orderQuantity}` | Order quantity is entered |
| 14 | Press Enter to confirm the quantity entry | — | Quantity is accepted; system prepares to calculate component requirements |
| 15 | Click the "Check Availability" or "Save" button to trigger material availability check | — | SAP calculates component requirements from the BOM and checks available stock |
| 16 | Observe the on-screen messages or availability indicator | — | A shortage warning message is displayed indicating insufficient stock for component material `{TD.componentMaterial}` |
| 17 | Verify the shortage warning specifies: Component Material, Required Quantity, Available Stock, Shortage Quantity | `{TD.componentMaterial}`, `{TD.requiredQuantity}`, `{TD.currentAvailableStock}` | Shortage warning displays all key fields; shortage quantity = Required - Available |
| 18 | Verify the system highlights or marks the component with a shortage indicator (e.g., red icon, warning symbol) | — | Component line item is visually marked with a warning or error indicator |
| 19 | Attempt to save or convert the planned order to a process order | — | System allows saving the planned order but displays a persistent warning; shortage remains visible in Stock/Requirements List |
| 20 | Navigate back to the Fiori home page using the home icon | — | Fiori Launchpad home page is displayed |
| 21 | Click the search icon (top-right shell bar) and type "Stock/Requirements List" | — | Search results appear listing the Stock/Requirements List application |
| 22 | Click "Stock/Requirements List" from the search results | — | Stock/Requirements List application opens displaying the selection screen |
| 23 | In the "Material" filter field, enter the component material number | `{TD.componentMaterial}` | Component material number is entered |
| 24 | In the "Plant" filter field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 25 | Click the "Go" button | — | The application retrieves and displays the stock/requirements list for the component material |
| 26 | Observe the shortage indicator in the stock overview or requirements list | — | Shortage is visible; required quantity exceeds available stock; shortage quantity is calculated and displayed |
| 27 | Verify that the shortage warning persists and is clearly communicated to the planner | — | Shortage warning remains visible; available stock is insufficient to cover the reservation requirement |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects that the required component quantity exceeds current available stock
- A shortage warning is displayed to the production planner with clear details (Component Material, Required Quantity, Available Stock, Shortage Quantity)
- The component material is visually marked with a shortage indicator in the planned order or Stock/Requirements List
- The system allows the planned order to be saved but flags the material shortage for procurement or production rescheduling
- The production planner is alerted to the shortage before process order release, preventing production delays
- No system errors occur; the shortage warning is the expected behavior

---

### Post-conditions

- Planned order is created (if saved) with a shortage warning flag for the component material
- Shortage warning is visible in Stock/Requirements List for the component material
- No reservation is created until the shortage is resolved or the order is released with the warning acknowledged
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
