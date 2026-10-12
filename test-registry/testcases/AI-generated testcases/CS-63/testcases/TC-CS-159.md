# TC-CS-159: Attempt to Convert Planned Order with No BOM and Verify Error Handling

**User Story:**          [CS-63] User Story PP-014
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             BOM Validation for Planned Order Conversion
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
| P1 | User Role | User has the role of Production Planner with SAP authorization to create planned orders and convert to process orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Finished product material `{TD.finishedProductMaterialNoBOM}` exists in the material master and is configured for plant `{TD.plant}` |
| P4 | Master Data | Material `{TD.finishedProductMaterialNoBOM}` does NOT have a valid Bill of Materials (BOM) assigned in SAP |
| P5 | Master Data | A planned order `{TD.plannedOrderNumberNoBOM}` exists in SAP referencing the material with no BOM, with status "Open" or "Released" |

---

### Test Data

**Dataset Reference:** `testdata/CS-63/CS-63-testdata.json` — Dataset ID: `TD-CS-063-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Planned Order Number | `{TD.plannedOrderNumberNoBOM}` | Planned order for material without BOM | Valid |
| Finished Product Material | `{TD.finishedProductMaterialNoBOM}` | Material with no BOM configured | Invalid (no BOM) |
| Plant | `{TD.plant}` | Plant code for the order | Valid |

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
| 9 | In the "Planned Order" filter field, enter the planned order number | `{TD.plannedOrderNumberNoBOM}` | Planned order number is entered |
| 10 | Press Enter to apply the filter | — | The filter creates a token with the entered planned order number |
| 11 | Click the "Go" button | — | The specified planned order is retrieved and displayed in the list |
| 12 | Select the planned order by clicking on the row | — | The planned order row is highlighted; order details are displayed |
| 13 | Verify the planned order material and plant | `{TD.finishedProductMaterialNoBOM}`, `{TD.plant}` | Material and plant match the expected values |
| 14 | Click the "Convert to Process Order" action button | — | SAP begins the conversion process and checks for BOM existence |
| 15 | Observe the error message displayed | — | An error message is displayed indicating that no BOM exists for the material or BOM is missing/inactive |
| 16 | Verify the error message specifies: Material Number, Plant, BOM Missing or Not Found | `{TD.finishedProductMaterialNoBOM}`, `{TD.plant}` | Error message clearly states the BOM is missing for the specified material and plant |
| 17 | Verify the conversion process is blocked; no process order is created | — | Conversion is prevented; no process order number is generated; planned order status remains unchanged |
| 18 | Attempt to dismiss the error message and retry the conversion | — | Error persists; conversion remains blocked until a valid BOM is assigned to the material |
| 19 | Navigate back to the Fiori home page using the home icon | — | Fiori Launchpad home page is displayed |
| 20 | Click the search icon (top-right shell bar) and type "Display Reservation" | — | Search results appear listing the Display Reservation application |
| 21 | Click "Display Reservation" from the search results | — | Display Reservation application opens displaying the entry screen |
| 22 | Attempt to search for any reservation linked to the planned order number | `{TD.plannedOrderNumberNoBOM}` | No reservation is found; SAP returns "No data" or "Reservation does not exist" because no reservation was created |
| 23 | Verify that no component reservations were created due to the BOM error | — | No reservations exist for the planned order; conversion and reservation creation were both blocked |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP detects that the finished product material has no valid BOM assigned
- An error message is displayed clearly indicating the BOM is missing or inactive for the material and plant
- The planned order conversion to process order is blocked; no process order is created
- No component reservations are created because the BOM is required to determine component requirements
- The production planner is alerted to the BOM configuration issue and can take corrective action (create or activate BOM)
- No system crash or unhandled exception occurs; the error is gracefully communicated

---

### Post-conditions

- Planned order status remains "Open" or "Released" (unchanged)
- No process order is created
- No component reservations are created
- BOM configuration issue is flagged for resolution by the production planner or master data team
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
