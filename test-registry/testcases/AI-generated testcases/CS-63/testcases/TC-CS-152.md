# TC-CS-152: Convert Planned Order to Process Order and Verify Automatic Component Reservation Creation

**User Story:**          [CS-63] User Story PP-014
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Automatic Component Reservation Creation from Planned Order Conversion
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Planner with SAP authorization to convert planned orders to process orders and view reservations |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished product material `{TD.finishedProductMaterial}` exists in the material master and is configured for plant `{TD.plant}` |
| P4 | Master Data | A valid Bill of Materials (BOM) exists for the finished product material, containing component materials with required quantities |
| P5 | Master Data | Component materials referenced in the BOM exist in the material master and have available stock in plant `{TD.plant}` |
| P6 | Master Data | A Planned Order `{TD.plannedOrderNumber}` exists in SAP with status "Open" or "Released", referencing the finished product material and plant |
| P7 | Configuration | Automatic reservation creation is configured for the production order type in the SAP system |

---

### Test Data

**Dataset Reference:** `testdata/CS-63/CS-63-testdata.json` — Dataset ID: `TD-CS-063-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Planned Order Number | `{TD.plannedOrderNumber}` | Existing planned order to be converted | Valid |
| Finished Product Material | `{TD.finishedProductMaterial}` | Finished product material on the planned order | Valid |
| Plant | `{TD.plant}` | Plant code for the production order | Valid |
| Component Material (BOM) | `{TD.componentMaterial}` | Component material from the BOM (for verification) | Valid |
| Required Quantity (BOM) | `{TD.requiredQuantity}` | Quantity of component required per BOM | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Planned Orders" | — | Search results appear listing the Manage Planned Orders application |
| 8 | Click "Manage Planned Orders" from the search results | — | Manage Planned Orders application opens displaying the list of planned orders |
| 9 | In the "Planned Order" filter field, enter the planned order number | `{TD.plannedOrderNumber}` | Planned order number is entered |
| 10 | Press Enter to apply the filter | — | The filter creates a token with the entered planned order number |
| 11 | Click the "Go" button | — | The specified planned order is retrieved and displayed in the list |
| 12 | Select the planned order by clicking on the row | — | The planned order row is highlighted; order details are displayed |
| 13 | Verify the planned order status, finished product material, and plant | `{TD.finishedProductMaterial}`, `{TD.plant}` | Status is "Open" or "Released"; material and plant match the expected values |
| 14 | Click the "Convert to Process Order" action button | — | A confirmation dialog appears asking to confirm the conversion |
| 15 | In the confirmation dialog, click "Convert" or "OK" | — | SAP processes the conversion; a success message is displayed indicating the process order number has been created |
| 16 | Note the generated process order number from the success message | — | Process order number is displayed (10-digit numeric format) |
| 17 | Navigate back to the Fiori home page using the home icon | — | Fiori Launchpad home page is displayed |
| 18 | Click the search icon (top-right shell bar) and type "Stock/Requirements List" | — | Search results appear listing the Stock/Requirements List application |
| 19 | Click "Stock/Requirements List" from the search results | — | Stock/Requirements List application opens displaying the selection screen |
| 20 | In the "Material" filter field, enter the component material number | `{TD.componentMaterial}` | Component material number is entered |
| 21 | In the "Plant" filter field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 22 | Click the "Go" button | — | The application retrieves and displays the stock/requirements list for the component material |
| 23 | Observe the requirements list for reservation entries | — | A new reservation entry is visible, created automatically from the process order conversion |
| 24 | Verify the reservation shows: Requirement Type = "Reservation", Reserved Quantity matches BOM-required quantity, Requirement Date is populated | `{TD.requiredQuantity}` | Reservation entry displays correct requirement type, quantity, and date; reservation status is "Open" |
| 25 | Note the reservation number from the reservation entry | — | Reservation number is displayed (10-digit numeric format) |
| 26 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 27 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 28 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The planned order is successfully converted to a process order; a unique process order number is generated
- Component reservations are automatically created by SAP during the conversion process
- The reservation appears in the Stock/Requirements List for the component material and plant
- Reserved quantity matches the BOM-required quantity for the finished product
- Reservation status is "Open"; reservation is linked to the newly created process order
- No errors or warnings are displayed during the conversion or reservation creation

---

### Post-conditions

- A new process order exists in SAP with the generated process order number
- Process order status is "Created" or "Released"
- Component reservations exist in SAP, linked to the process order
- Planned order status is updated to "Converted" or equivalent
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
