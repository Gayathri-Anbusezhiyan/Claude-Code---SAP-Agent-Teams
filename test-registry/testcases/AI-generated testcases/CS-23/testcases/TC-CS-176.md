# TC-CS-176: Run MRP for GMP material with external procurement (Purchase Requisition generation)

**User Story:**          [CS-23] User Story MM-008
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             MRP with Shelf-Life Management for GMP Materials
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
| P1 | User Role | User has the role of Material Planner with SAP authorization to execute MRP runs and view planning proposals |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | GMP Material `{TD.materialIdExternal}` exists, is active, has batch management enabled, and has minimum remaining shelf-life `{TD.minShelfLifeExternal}` days configured |
| P4 | Master Data | Material `{TD.materialIdExternal}` has total shelf life `{TD.totalShelfLifeExternal}` days configured and procurement type is "F" (External procurement) |
| P5 | Configuration | Plant `{TD.plantExternal}` is configured for MRP and has a valid purchasing info record for Material `{TD.materialIdExternal}` with Vendor `{TD.vendorIdExternal}` |
| P6 | Stock Data | Existing stock for Material `{TD.materialIdExternal}` has batches with remaining shelf life below minimum threshold, requiring replenishment |

---

### Test Data

**Dataset Reference:** `testdata/CS-23/CS-23-testdata.json` — Dataset ID: `TD-CS-23-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID (External) | `{TD.materialIdExternal}` | GMP material configured for external procurement | Valid |
| Plant (External) | `{TD.plantExternal}` | Plant configured for MRP | Valid |
| MRP Controller | `{TD.mrpControllerExternal}` | MRP Controller code | Valid |
| Processing Key | `{TD.processingKeyExternal}` | NETCH (net change) | Valid |
| Min Remaining Shelf Life | `{TD.minShelfLifeExternal}` | Minimum remaining shelf life in days | Valid |
| Total Shelf Life | `{TD.totalShelfLifeExternal}` | Total shelf life in days | Valid |
| Vendor ID | `{TD.vendorIdExternal}` | Vendor account number for purchasing info record | Valid |
| Procurement Type | `{TD.procurementTypeExternal}` | "F" = External procurement | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Schedule MRP Runs" | — | Search results appear listing the Schedule MRP Runs application |
| 8 | Click "Schedule MRP Runs" from the search results | — | Schedule MRP Runs application opens |
| 9 | In the Material field, enter the Material ID | `{TD.materialIdExternal}` | Material ID is entered |
| 10 | Press Enter to confirm the Material entry | — | Material ID is validated; material description is displayed |
| 11 | In the Plant field, enter the Plant code | `{TD.plantExternal}` | Plant code is entered |
| 12 | Press Enter to confirm the Plant entry | — | Plant is validated |
| 13 | In the MRP Controller field, enter the MRP Controller code | `{TD.mrpControllerExternal}` | MRP Controller code is entered |
| 14 | Press Enter to confirm the MRP Controller entry | — | MRP Controller is validated |
| 15 | In the Processing Key field, enter the processing key | `{TD.processingKeyExternal}` | Processing key "NETCH" is entered |
| 16 | Click the "Schedule" or "Execute" button to run MRP | — | MRP run begins processing |
| 17 | Wait for MRP processing to complete | — | System displays a message indicating MRP run completed successfully |
| 18 | Click the search icon and type "Stock/Requirements List" | — | Search results appear with Stock/Requirements List |
| 19 | Click "Stock/Requirements List" from the search results | — | Stock/Requirements List application opens |
| 20 | Enter Material `{TD.materialIdExternal}` and Plant `{TD.plantExternal}` | `{TD.materialIdExternal}`, `{TD.plantExternal}` | Material and Plant are entered |
| 21 | Click "Execute" or "Go" button | — | Stock/Requirements List is displayed with MRP elements |
| 22 | Verify that a Purchase Requisition (MRP element type "BA") is displayed in the list | — | A row with MRP element type "BA" (Purchase Requisition) is visible |
| 23 | Verify that the Purchase Requisition quantity reflects exclusion of near-expired batches | — | Purchase Requisition quantity equals the full replenishment requirement (batches below min shelf-life are not counted) |
| 24 | Click on the Purchase Requisition row to view details | — | Purchase Requisition detail screen opens |
| 25 | Verify that the Purchase Requisition reflects procurement type "F" (External procurement) | `{TD.procurementTypeExternal}` | Procurement type is displayed as "F" or "External procurement" |
| 26 | Verify that the Vendor field shows the vendor from the purchasing info record | `{TD.vendorIdExternal}` | Vendor ID is displayed and matches the purchasing info record |
| 27 | Verify that the planned delivery date considers adjusted lead time due to shelf-life constraints | — | Delivery date is adjusted to ensure sufficient shelf-life upon receipt |
| 28 | Verify that the SLED (Shelf Life Expiration Date) is calculated as delivery date + total shelf life | `{TD.totalShelfLifeExternal}` | SLED is displayed; calculation is correct (delivery date + total shelf life days) |
| 29 | Note the Purchase Requisition number | — | Purchase Requisition number is displayed (10-digit format) |
| 30 | Navigate back to the Stock/Requirements List | — | Main list view is displayed |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- MRP run completes successfully for the external procurement material
- A Purchase Requisition (BA) is generated by the system
- The Purchase Requisition reflects the minimum remaining shelf-life constraint defined in the material master
- Batches with remaining shelf life below the minimum threshold are excluded from available stock calculation
- The Purchase Requisition shows adjusted lead time to ensure newly procured material has sufficient shelf life
- SLED is calculated correctly based on the planned delivery date plus total shelf life
- The vendor from the purchasing info record is correctly proposed in the Purchase Requisition

---

### Post-conditions

- A Purchase Requisition exists in the system for Material `{TD.materialIdExternal}` in Plant `{TD.plantExternal}`
- The Purchase Requisition reflects shelf-life constraints
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
