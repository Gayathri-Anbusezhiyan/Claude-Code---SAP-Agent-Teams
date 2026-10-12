# TC-CS-179: Run MRP for material without minimum remaining shelf-life configured (standard MRP without shelf-life constraint)

**User Story:**          [CS-23] User Story MM-008
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             MRP with Shelf-Life Management for GMP Materials
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
| P1 | User Role | User has the role of Material Planner with SAP authorization to execute MRP runs |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Material `{TD.materialIdNoShelfLife}` exists, is active, and is configured for MRP |
| P4 | Master Data | Material `{TD.materialIdNoShelfLife}` does NOT have minimum remaining shelf-life configured (MHDRZ = 0 or blank) in the material master |
| P5 | Master Data | Material `{TD.materialIdNoShelfLife}` may or may not have batch management enabled; shelf-life fields are not maintained |
| P6 | Configuration | Plant `{TD.plantNoShelfLife}` is configured for MRP |

---

### Test Data

**Dataset Reference:** `testdata/CS-23/CS-23-testdata.json` — Dataset ID: `TD-CS-23-006`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID (No Shelf-Life) | `{TD.materialIdNoShelfLife}` | Material without min remaining shelf-life configured | Valid (no shelf-life constraint) |
| Plant | `{TD.plantNoShelfLife}` | Plant configured for MRP | Valid |
| MRP Controller | `{TD.mrpControllerNoShelfLife}` | MRP Controller code | Valid |
| Processing Key | `{TD.processingKeyNoShelfLife}` | NETCH (net change) | Valid |

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
| 9 | In the Material field, enter the Material ID | `{TD.materialIdNoShelfLife}` | Material ID is entered |
| 10 | Press Enter to confirm the Material entry | — | Material ID is validated; material description is displayed |
| 11 | In the Plant field, enter the Plant code | `{TD.plantNoShelfLife}` | Plant code is entered |
| 12 | Press Enter to confirm the Plant entry | — | Plant is validated |
| 13 | In the MRP Controller field, enter the MRP Controller code | `{TD.mrpControllerNoShelfLife}` | MRP Controller code is entered |
| 14 | Press Enter to confirm the MRP Controller entry | — | MRP Controller is validated |
| 15 | In the Processing Key field, enter the processing key | `{TD.processingKeyNoShelfLife}` | Processing key "NETCH" is entered |
| 16 | Click the "Schedule" or "Execute" button to run MRP | — | MRP run begins processing |
| 17 | Wait for MRP processing to complete | — | System displays a message indicating MRP run completed successfully |
| 18 | Click the search icon and type "Stock/Requirements List" | — | Search results appear with Stock/Requirements List |
| 19 | Click "Stock/Requirements List" from the search results | — | Stock/Requirements List application opens |
| 20 | Enter Material `{TD.materialIdNoShelfLife}` and Plant `{TD.plantNoShelfLife}` | `{TD.materialIdNoShelfLife}`, `{TD.plantNoShelfLife}` | Material and Plant are entered |
| 21 | Click "Execute" or "Go" button | — | Stock/Requirements List is displayed |
| 22 | Verify that MRP proposals (Planned Orders or Purchase Requisitions) are generated if requirements exist | — | MRP proposals are displayed in the list if there is net requirement |
| 23 | Verify that no shelf-life constraint logic is applied to the MRP calculation | — | All existing stock (regardless of age or batch expiration) is counted as available stock; no batches are excluded based on shelf-life |
| 24 | Verify that no exception messages related to shelf-life (exception code "10" or similar) are displayed | — | No shelf-life exception messages appear; system processes as standard MRP |
| 25 | Verify that the proposed receipt dates do NOT include any shelf-life-based lead time adjustments | — | Receipt dates are calculated using standard lead times only; no shelf-life adjustment is applied |
| 26 | Review MRP element details if proposals are generated | — | MRP element details show standard MRP logic; no SLED calculations or shelf-life-related fields are populated |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- MRP run completes successfully for the material without minimum remaining shelf-life configured
- The system processes the MRP run as standard MRP logic without applying any shelf-life constraints
- All existing stock is counted as available stock; no batches are excluded based on shelf-life criteria
- No exception messages related to shelf-life expiration are displayed
- Proposed receipt dates do not include shelf-life-based lead time adjustments
- The system generates MRP proposals (if requirements exist) using standard MRP calculations without shelf-life considerations

---

### Post-conditions

- MRP run has been executed for Material `{TD.materialIdNoShelfLife}` in Plant `{TD.plantNoShelfLife}`
- MRP proposals (if any) reflect standard MRP logic without shelf-life constraints
- No shelf-life-related exception messages or warnings are generated
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
