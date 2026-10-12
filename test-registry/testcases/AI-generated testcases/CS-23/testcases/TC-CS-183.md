# TC-CS-183: GMP material with total shelf life equal to minimum remaining shelf-life (edge configuration scenario)

**User Story:**          [CS-23] User Story MM-008
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             MRP with Shelf-Life Management for GMP Materials
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Material Planner with SAP authorization to execute MRP runs |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | GMP Material `{TD.materialIdEqualShelfLife}` exists, is active, has batch management enabled, and has total shelf life `{TD.totalShelfLifeEqual}` days configured |
| P4 | Master Data | Material `{TD.materialIdEqualShelfLife}` has minimum remaining shelf-life configured EQUAL to total shelf life: `{TD.minShelfLifeEqual}` = `{TD.totalShelfLifeEqual}` (edge configuration: min = total) |
| P5 | Configuration | Plant `{TD.plantEqualShelfLife}` is configured for MRP |
| P6 | Configuration | Material `{TD.materialIdEqualShelfLife}` has procurement type configured (in-house or external) and valid lead times defined |

---

### Test Data

**Dataset Reference:** `testdata/CS-23/CS-23-testdata.json` — Dataset ID: `TD-CS-23-010`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialIdEqualShelfLife}` | GMP material with total shelf life = min remaining shelf life | Valid (edge configuration) |
| Plant | `{TD.plantEqualShelfLife}` | Plant configured for MRP | Valid |
| MRP Controller | `{TD.mrpControllerEqualShelfLife}` | MRP Controller code | Valid |
| Processing Key | `{TD.processingKeyEqualShelfLife}` | NETCH (net change) | Valid |
| Total Shelf Life | `{TD.totalShelfLifeEqual}` | Total shelf life in days (e.g., 30 days) | Valid |
| Min Remaining Shelf Life | `{TD.minShelfLifeEqual}` | Minimum remaining shelf life in days (equal to total: 30 days) | Valid (edge case: min = total) |
| Standard Lead Time | `{TD.standardLeadTimeEqual}` | Standard procurement or production lead time in days | Valid |

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
| 9 | In the Material field, enter the Material ID | `{TD.materialIdEqualShelfLife}` | Material ID is entered |
| 10 | Press Enter to confirm the Material entry | — | Material ID is validated; material description is displayed |
| 11 | In the Plant field, enter the Plant code | `{TD.plantEqualShelfLife}` | Plant code is entered |
| 12 | Press Enter to confirm the Plant entry | — | Plant is validated |
| 13 | In the MRP Controller field, enter the MRP Controller code | `{TD.mrpControllerEqualShelfLife}` | MRP Controller code is entered |
| 14 | Press Enter to confirm the MRP Controller entry | — | MRP Controller is validated |
| 15 | In the Processing Key field, enter the processing key | `{TD.processingKeyEqualShelfLife}` | Processing key "NETCH" is entered |
| 16 | Click the "Schedule" or "Execute" button to run MRP | — | MRP run begins processing |
| 17 | Wait for MRP processing to complete | — | System displays a message indicating MRP run completed successfully |
| 18 | Click the search icon and type "Stock/Requirements List" | — | Search results appear with Stock/Requirements List |
| 19 | Click "Stock/Requirements List" from the search results | — | Stock/Requirements List application opens |
| 20 | Enter Material `{TD.materialIdEqualShelfLife}` and Plant `{TD.plantEqualShelfLife}` | `{TD.materialIdEqualShelfLife}`, `{TD.plantEqualShelfLife}` | Material and Plant are entered |
| 21 | Click "Execute" or "Go" button | — | Stock/Requirements List is displayed with MRP results |
| 22 | Verify that an MRP proposal (Planned Order or Purchase Requisition) is generated if net requirement exists | — | MRP proposal is displayed (if requirement exists) |
| 23 | Click on the MRP element to view details | — | MRP element detail view opens |
| 24 | Verify that the system has applied adjusted lead time to account for shelf-life constraint | `{TD.standardLeadTimeEqual}` | Receipt date reflects adjusted lead time; system adds buffer to standard lead time to ensure material arrives with full shelf-life (receipt date = requirement date + standard lead time + adjustment) |
| 25 | Verify that the SLED (Shelf Life Expiration Date) is calculated as receipt date + total shelf life | `{TD.totalShelfLifeEqual}` | SLED is displayed; calculation is correct (receipt date + total shelf life days) |
| 26 | Verify that the proposed receipt date ensures the material will have sufficient shelf-life at the time of usage | `{TD.minShelfLifeEqual}` | Receipt date is early enough so that at the requirement date, remaining shelf life ≥ min remaining shelf life (since min = total, material must be received close to requirement date) |
| 27 | Note the MRP element number | — | MRP element number is displayed |
| 28 | Navigate back to the Stock/Requirements List | — | Main list view is displayed |
| 29 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 30 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 31 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- MRP run completes successfully for the material with total shelf life = minimum remaining shelf-life (edge configuration)
- The system generates MRP proposals with adjusted lead times to ensure sufficient shelf-life
- The receipt date is calculated to ensure the material arrives with full total shelf-life, meeting the minimum remaining shelf-life requirement at the time of usage
- SLED is calculated correctly based on receipt date + total shelf life
- The system handles this edge configuration correctly without errors or exceptions

---

### Post-conditions

- MRP run has been executed for Material `{TD.materialIdEqualShelfLife}` in Plant `{TD.plantEqualShelfLife}`
- MRP proposals reflect adjusted lead time to accommodate the edge configuration (min = total shelf life)
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
