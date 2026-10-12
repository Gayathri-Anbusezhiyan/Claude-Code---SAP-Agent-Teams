# TC-CS-182: Batch expiration date is 1 day above minimum remaining shelf-life threshold (batch inclusion boundary)

**User Story:**          [CS-23] User Story MM-008
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             MRP with Shelf-Life Management for GMP Materials
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Material Planner with SAP authorization to execute MRP runs |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | GMP Material `{TD.materialIdOneDayAbove}` exists, is active, has batch management enabled, and has minimum remaining shelf-life `{TD.minShelfLifeOneDayAbove}` days configured |
| P4 | Master Data | Material `{TD.materialIdOneDayAbove}` has total shelf life configured and is assigned to Plant `{TD.plantOneDayAbove}` |
| P5 | Configuration | Plant `{TD.plantOneDayAbove}` is configured for MRP |
| P6 | Stock Data | An existing batch `{TD.batchOneDayAbove}` has remaining shelf life 1 day ABOVE the minimum threshold (e.g., if min = 30 days, remaining = 31 days; boundary condition: expiration date - today = min shelf-life + 1) |

---

### Test Data

**Dataset Reference:** `testdata/CS-23/CS-23-testdata.json` — Dataset ID: `TD-CS-23-009`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialIdOneDayAbove}` | GMP material with batch 1 day above minimum threshold | Valid |
| Plant | `{TD.plantOneDayAbove}` | Plant configured for MRP | Valid |
| MRP Controller | `{TD.mrpControllerOneDayAbove}` | MRP Controller code | Valid |
| Processing Key | `{TD.processingKeyOneDayAbove}` | NETCH (net change) | Valid |
| Min Remaining Shelf Life | `{TD.minShelfLifeOneDayAbove}` | Minimum remaining shelf life in days (e.g., 30 days) | Valid |
| Batch Number (1 Day Above) | `{TD.batchOneDayAbove}` | Batch with remaining shelf life = min threshold + 1 day | Edge case (boundary value) |
| Batch Quantity | `{TD.batchQuantityOneDayAbove}` | Available quantity in the batch | Valid |

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
| 8 | Click "Stock/Requirements List" from the search results | — | Stock/Requirements List application opens |
| 9 | In the Material field, enter the Material ID | `{TD.materialIdOneDayAbove}` | Material ID is entered |
| 10 | Press Enter to confirm the Material entry | — | Material ID is validated; material description is displayed |
| 11 | In the Plant field, enter the Plant code | `{TD.plantOneDayAbove}` | Plant code is entered |
| 12 | Press Enter to confirm the Plant entry | — | Plant is validated |
| 13 | Click "Execute" or "Go" button to display the Stock/Requirements List | — | Stock/Requirements List is displayed |
| 14 | Review the existing batch `{TD.batchOneDayAbove}` and verify its remaining shelf life | `{TD.batchOneDayAbove}`, `{TD.minShelfLifeOneDayAbove}` | Batch row shows remaining shelf life 1 day ABOVE `{TD.minShelfLifeOneDayAbove}` days (e.g., if min = 30, remaining = 31) |
| 15 | Note the batch quantity available | `{TD.batchQuantityOneDayAbove}` | Batch quantity is visible in the stock overview |
| 16 | Click the search icon (top-right shell bar) and type "Schedule MRP Runs" | — | Search results appear listing the Schedule MRP Runs application |
| 17 | Click "Schedule MRP Runs" from the search results | — | Schedule MRP Runs application opens |
| 18 | In the Material field, enter the Material ID | `{TD.materialIdOneDayAbove}` | Material ID is entered |
| 19 | Press Enter to confirm the Material entry | — | Material ID is validated |
| 20 | In the Plant field, enter the Plant code | `{TD.plantOneDayAbove}` | Plant code is entered |
| 21 | Press Enter to confirm the Plant entry | — | Plant is validated |
| 22 | In the MRP Controller field, enter the MRP Controller code | `{TD.mrpControllerOneDayAbove}` | MRP Controller code is entered |
| 23 | Press Enter to confirm the MRP Controller entry | — | MRP Controller is validated |
| 24 | In the Processing Key field, enter the processing key | `{TD.processingKeyOneDayAbove}` | Processing key "NETCH" is entered |
| 25 | Click the "Schedule" or "Execute" button to run MRP | — | MRP run begins processing |
| 26 | Wait for MRP processing to complete | — | System displays a message indicating MRP run completed successfully |
| 27 | Navigate back to the Stock/Requirements List application via search | — | Stock/Requirements List application opens |
| 28 | Enter Material `{TD.materialIdOneDayAbove}` and Plant `{TD.plantOneDayAbove}` again | `{TD.materialIdOneDayAbove}`, `{TD.plantOneDayAbove}` | Material and Plant are entered |
| 29 | Click "Execute" or "Go" button to display the updated Stock/Requirements List | — | Stock/Requirements List refreshes with MRP results |
| 30 | Verify that batch `{TD.batchOneDayAbove}` was INCLUDED in available stock in the MRP calculation | `{TD.batchOneDayAbove}`, `{TD.batchQuantityOneDayAbove}` | Batch IS counted as available stock; MRP treats remaining shelf life > min threshold as sufficient (boundary rule: batch is included when remaining shelf life > min threshold) |
| 31 | Verify that if net requirement exists and exceeds available batch quantity, an MRP proposal is generated for the difference; otherwise no proposal is generated | — | If requirement > batch quantity, a partial replenishment proposal appears; if requirement ≤ batch quantity, no MRP proposal is generated (stock is sufficient) |
| 32 | Review the available stock calculation in the Stock/Requirements List | — | Available stock includes the quantity from batch `{TD.batchOneDayAbove}`; batch is not excluded |
| 33 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 34 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 35 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- MRP run completes successfully
- The batch with remaining shelf life 1 day ABOVE the minimum threshold is INCLUDED in available stock
- This confirms the boundary rule: batches are included when remaining shelf life > minimum threshold (even by just 1 day)
- MRP proposals (if any) reflect inclusion of the batch in available stock calculation
- The system correctly implements the shelf-life boundary logic at the threshold + 1 day value

---

### Post-conditions

- MRP run has been executed for Material `{TD.materialIdOneDayAbove}` in Plant `{TD.plantOneDayAbove}`
- Batch `{TD.batchOneDayAbove}` was included in available stock (boundary condition confirmed)
- MRP proposals (if any) reflect the inclusion of the batch quantity
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
