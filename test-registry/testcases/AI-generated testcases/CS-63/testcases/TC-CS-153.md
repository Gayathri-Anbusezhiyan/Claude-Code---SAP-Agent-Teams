# TC-CS-153: Confirm Reserved Quantities Are Excluded from Available Stock in Other Processes

**User Story:**          [CS-63] User Story PP-014
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Reserved Quantity Stock Exclusion Logic
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
| P1 | User Role | User has the role of Production Planner with SAP authorization to view stock/requirements data and inventory information |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Component material `{TD.componentMaterial}` exists in the material master and is configured for plant `{TD.plant}` |
| P4 | Master Data | An active reservation exists for the component material with reserved quantity `{TD.reservedQuantity}` |
| P5 | Master Data | Physical stock exists for the component material in plant `{TD.plant}` with quantity greater than the reserved quantity |
| P6 | Configuration | ATP (Available-to-Promise) logic is configured to exclude reserved quantities from available stock calculations |

---

### Test Data

**Dataset Reference:** `testdata/CS-63/CS-63-testdata.json` — Dataset ID: `TD-CS-063-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Component Material | `{TD.componentMaterial}` | Component material with an active reservation | Valid |
| Plant | `{TD.plant}` | Plant code for the material | Valid |
| Physical Stock | `{TD.physicalStock}` | Total physical stock quantity in the plant | Valid |
| Reserved Quantity | `{TD.reservedQuantity}` | Quantity reserved by the existing reservation | Valid |
| Available Stock (Expected) | `{TD.expectedAvailableStock}` | Calculated as: Physical Stock - Reserved Quantity | Valid |

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
| 9 | In the "Material" filter field, enter the component material number | `{TD.componentMaterial}` | Component material number is entered |
| 10 | In the "Plant" filter field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 11 | Click the "Go" button | — | The application retrieves and displays the stock/requirements list for the component material |
| 12 | Observe the "Stock Overview" section or stock summary header | — | Stock overview displays fields: Physical Stock, Reserved Quantity, Available Stock |
| 13 | Verify the Physical Stock quantity displayed | `{TD.physicalStock}` | Physical Stock field shows the expected total physical quantity in the plant |
| 14 | Verify the Reserved Quantity displayed | `{TD.reservedQuantity}` | Reserved Quantity field shows the total quantity reserved by active reservations |
| 15 | Verify the Available Stock quantity displayed | `{TD.expectedAvailableStock}` | Available Stock field shows the calculated value: Physical Stock minus Reserved Quantity |
| 16 | Navigate back to the Fiori home page using the home icon | — | Fiori Launchpad home page is displayed |
| 17 | Click the search icon (top-right shell bar) and type "Display Stock Overview" | — | Search results appear listing the Display Stock Overview application |
| 18 | Click "Display Stock Overview" from the search results | — | Display Stock Overview application opens displaying the selection screen |
| 19 | In the "Material" filter field, enter the component material number | `{TD.componentMaterial}` | Component material number is entered |
| 20 | In the "Plant" filter field, enter the plant code | `{TD.plant}` | Plant code is entered |
| 21 | Click the "Execute" or "Go" button | — | The application retrieves and displays detailed stock information for the material |
| 22 | Observe the stock type breakdown (Unrestricted, Quality Inspection, Blocked, Reserved) | — | Stock breakdown shows physical stock by type; reserved stock is listed separately |
| 23 | Verify that "Unrestricted Stock" or "Available Stock" excludes the reserved quantity | `{TD.expectedAvailableStock}` | Unrestricted/Available Stock value matches the expected available stock (Physical - Reserved) |
| 24 | Verify that reserved stock is shown as a separate line item or subtraction in the calculation | `{TD.reservedQuantity}` | Reserved stock is clearly identified as a deduction from physical stock |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Reserved quantities are correctly excluded from available stock calculations in the Stock/Requirements List
- Available Stock = Physical Stock - Reserved Quantity (calculation is accurate and consistent)
- Reserved quantities are visible as a separate field or line item in stock displays
- Other planning processes (MRP, ATP checks) see the reduced available stock, not the full physical stock
- No discrepancies are observed between different stock display apps (Stock/Requirements List vs. Display Stock Overview)

---

### Post-conditions

- No changes are made to stock or reservation data (read-only verification)
- Stock exclusion logic is confirmed to be working correctly
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
