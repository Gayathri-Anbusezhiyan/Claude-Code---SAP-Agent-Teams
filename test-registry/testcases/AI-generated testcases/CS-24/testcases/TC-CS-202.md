# TC-CS-202: View Component Balances at CMO via Stock Overview App After Issue

**User Story:**          [CS-24] Create A Subcontracting Purchase Order For Outsourced Fill-Finish Manu
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Stock Overview — Component Visibility at CMO
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer or Inventory Analyst with SAP authorization to view stock overview |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Component Issued | Component material `{TD.componentMaterialId}` has been issued to vendor `{TD.cmoSupplierId}` via movement type 541; special stock "O" (stock provided to vendor) exists with quantity `{TD.issueQuantity}` |
| P4 | Master Data | Component material `{TD.componentMaterialId}` is configured in plant `{TD.plant}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-24/CS-24-testdata.json` — Dataset ID: `TD-CS-24-HP-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Component Material ID | `{TD.componentMaterialId}` | Component material issued to vendor — entered by the user | Valid |
| Plant | `{TD.plant}` | Plant code where component is managed — entered by the user | Valid |
| CMO Supplier ID | `{TD.cmoSupplierId}` | Vendor to whom components are provided — filter parameter | Valid |
| Issue Quantity | `{TD.issueQuantity}` | Quantity of component currently at CMO — expected in result | Valid |
| Special Stock Type | `{TD.specialStockType}` | Stock type "O" (stock provided to vendor) — expected in result | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Stock Overview" | — | Search results appear listing the "Stock Overview" application |
| 8 | Click "Stock Overview" from the search results | — | Stock Overview application opens with filter criteria fields |
| 9 | In the "Material" filter field, enter the Component Material ID | `{TD.componentMaterialId}` | Component Material ID is entered in the filter |
| 10 | Press Enter to confirm the Material entry | — | Material filter is applied |
| 11 | In the "Plant" filter field, enter the plant code | `{TD.plant}` | Plant code is entered in the filter |
| 12 | Press Enter to confirm the Plant entry | — | Plant filter is applied |
| 13 | In the "Special Stock" or "Stock Type" filter field (if available), select or enter "O" (stock provided to vendor) | `{TD.specialStockType}` | Special stock type "O" filter is applied (optional — may not be a separate filter) |
| 14 | Click the "Go" button to execute the stock query | — | SAP retrieves and displays stock overview results for the component material in the plant |
| 15 | Observe the stock overview results table | — | Table displays stock types and quantities for the component material |
| 16 | Locate the row with Special Stock Type "O" (stock provided to vendor) | Special Stock: "O" | Row with special stock "O" is displayed |
| 17 | Verify that the Supplier/Vendor column displays the CMO Supplier ID and name | `{TD.cmoSupplierId}`, `{TD.cmoSupplierName}` | CMO Supplier ID and name are displayed in the stock row |
| 18 | Verify that the stock quantity matches the issued quantity (or current balance if partial consumption has occurred) | `{TD.issueQuantity}` | Stock quantity in special stock "O" for the CMO matches the expected balance |
| 19 | Verify that the stock is attributed to the correct plant and storage location (if displayed) | `{TD.plant}`, `{TD.storageLocation}` (if shown) | Plant and storage location are correctly displayed |
| 20 | Click on the stock row to view detailed stock information (if drill-down is available) | — | Stock details page or pop-up opens showing additional information |
| 21 | Verify additional details such as batch information (if batch-managed), stock valuation, and material document history | — | Additional stock details are displayed correctly |
| 22 | Navigate back to the stock overview list (if drill-down was performed) | — | Stock overview list is displayed again |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Stock Overview application displays component material `{TD.componentMaterialId}` in plant `{TD.plant}` with special stock type "O" (stock provided to vendor)
- Stock is correctly attributed to CMO supplier `{TD.cmoSupplierId}` with supplier name `{TD.cmoSupplierName}`
- Stock quantity matches the expected balance at the CMO (issued quantity minus any consumption if goods receipts have been posted)
- Procurement and inventory teams can monitor component balances at the CMO for subcontracting transparency

---

### Post-conditions

- User has successfully viewed the component stock balance at the CMO via the Stock Overview application
- Stock data displayed is accurate and up-to-date as of the query execution time
- No application-level errors or critical warnings remain outstanding

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
