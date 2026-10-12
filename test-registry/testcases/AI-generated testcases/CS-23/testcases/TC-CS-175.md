# TC-CS-175: Run MRP for GMP material with in-house production (Planned Order generation)

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
| P3 | Master Data | GMP Material `{TD.materialIdInhouse}` exists, is active, has batch management enabled, and has minimum remaining shelf-life `{TD.minShelfLifeInhouse}` days configured |
| P4 | Master Data | Material `{TD.materialIdInhouse}` has total shelf life `{TD.totalShelfLifeInhouse}` days configured and procurement type is "E" (In-house production) |
| P5 | Configuration | Plant `{TD.plantInhouse}` is configured for MRP and has a valid production version for Material `{TD.materialIdInhouse}` |
| P6 | Stock Data | Existing stock for Material `{TD.materialIdInhouse}` has batches with remaining shelf life below minimum threshold, requiring replenishment |

---

### Test Data

**Dataset Reference:** `testdata/CS-23/CS-23-testdata.json` — Dataset ID: `TD-CS-23-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID (In-house) | `{TD.materialIdInhouse}` | GMP material configured for in-house production | Valid |
| Plant (In-house) | `{TD.plantInhouse}` | Plant with production capability | Valid |
| MRP Controller | `{TD.mrpControllerInhouse}` | MRP Controller code | Valid |
| Processing Key | `{TD.processingKeyInhouse}` | NETCH (net change) | Valid |
| Min Remaining Shelf Life | `{TD.minShelfLifeInhouse}` | Minimum remaining shelf life in days | Valid |
| Total Shelf Life | `{TD.totalShelfLifeInhouse}` | Total shelf life in days | Valid |
| Procurement Type | `{TD.procurementTypeInhouse}` | "E" = In-house production | Valid |

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
| 9 | In the Material field, enter the Material ID | `{TD.materialIdInhouse}` | Material ID is entered |
| 10 | Press Enter to confirm the Material entry | — | Material ID is validated; material description is displayed |
| 11 | In the Plant field, enter the Plant code | `{TD.plantInhouse}` | Plant code is entered |
| 12 | Press Enter to confirm the Plant entry | — | Plant is validated |
| 13 | In the MRP Controller field, enter the MRP Controller code | `{TD.mrpControllerInhouse}` | MRP Controller code is entered |
| 14 | Press Enter to confirm the MRP Controller entry | — | MRP Controller is validated |
| 15 | In the Processing Key field, enter the processing key | `{TD.processingKeyInhouse}` | Processing key "NETCH" is entered |
| 16 | Click the "Schedule" or "Execute" button to run MRP | — | MRP run begins processing |
| 17 | Wait for MRP processing to complete | — | System displays a message indicating MRP run completed successfully |
| 18 | Click the search icon and type "Stock/Requirements List" | — | Search results appear with Stock/Requirements List |
| 19 | Click "Stock/Requirements List" from the search results | — | Stock/Requirements List application opens |
| 20 | Enter Material `{TD.materialIdInhouse}` and Plant `{TD.plantInhouse}` | `{TD.materialIdInhouse}`, `{TD.plantInhouse}` | Material and Plant are entered |
| 21 | Click "Execute" or "Go" button | — | Stock/Requirements List is displayed with MRP elements |
| 22 | Verify that a Planned Order (MRP element type "PA") is displayed in the list | — | A row with MRP element type "PA" (Planned Order) is visible |
| 23 | Verify that the Planned Order quantity reflects exclusion of near-expired batches | — | Planned Order quantity equals the full replenishment requirement (batches below min shelf-life are not counted) |
| 24 | Click on the Planned Order row to view details | — | Planned Order detail screen opens |
| 25 | Verify that the Planned Order reflects procurement type "E" (In-house production) | `{TD.procurementTypeInhouse}` | Procurement type is displayed as "E" or "In-house production" |
| 26 | Verify that the planned receipt date considers shelf-life constraints | — | Receipt date is adjusted to ensure sufficient shelf-life for downstream production use |
| 27 | Verify that the SLED (Shelf Life Expiration Date) is calculated as receipt date + total shelf life | `{TD.totalShelfLifeInhouse}` | SLED is displayed; calculation is correct (receipt date + total shelf life days) |
| 28 | Note the Planned Order number | — | Planned Order number is displayed (10-digit format) |
| 29 | Navigate back to the Stock/Requirements List | — | Main list view is displayed |
| 30 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 31 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 32 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- MRP run completes successfully for the in-house production material
- A Planned Order (PA) is generated by the system
- The Planned Order reflects the minimum remaining shelf-life constraint defined in the material master
- Batches with remaining shelf life below the minimum threshold are excluded from available stock calculation
- The Planned Order shows adjusted lead time to ensure newly produced material has sufficient shelf life
- SLED is calculated correctly based on the planned receipt date plus total shelf life

---

### Post-conditions

- A Planned Order exists in the system for Material `{TD.materialIdInhouse}` in Plant `{TD.plantInhouse}`
- The Planned Order reflects shelf-life constraints
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
