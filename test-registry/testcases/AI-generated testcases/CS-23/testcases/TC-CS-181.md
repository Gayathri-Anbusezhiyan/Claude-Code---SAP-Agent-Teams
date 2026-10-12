# TC-CS-181: Batch expiration date exactly equals minimum remaining shelf-life threshold (batch exclusion boundary)

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
| P3 | Master Data | GMP Material `{TD.materialIdExactBoundary}` exists, is active, has batch management enabled, and has minimum remaining shelf-life `{TD.minShelfLifeExactBoundary}` days configured |
| P4 | Master Data | Material `{TD.materialIdExactBoundary}` has total shelf life configured and is assigned to Plant `{TD.plantExactBoundary}` |
| P5 | Configuration | Plant `{TD.plantExactBoundary}` is configured for MRP |
| P6 | Stock Data | An existing batch `{TD.batchExactBoundary}` has remaining shelf life EXACTLY equal to the minimum threshold `{TD.minShelfLifeExactBoundary}` days (boundary condition: expiration date - today = min shelf-life) |

---

### Test Data

**Dataset Reference:** `testdata/CS-23/CS-23-testdata.json` — Dataset ID: `TD-CS-23-008`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialIdExactBoundary}` | GMP material with batch at exact boundary | Valid |
| Plant | `{TD.plantExactBoundary}` | Plant configured for MRP | Valid |
| MRP Controller | `{TD.mrpControllerExactBoundary}` | MRP Controller code | Valid |
| Processing Key | `{TD.processingKeyExactBoundary}` | NETCH (net change) | Valid |
| Min Remaining Shelf Life | `{TD.minShelfLifeExactBoundary}` | Minimum remaining shelf life in days (e.g., 30 days) | Valid |
| Batch Number (Exact Boundary) | `{TD.batchExactBoundary}` | Batch with remaining shelf life = min threshold exactly | Edge case (boundary value) |

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
| 9 | In the Material field, enter the Material ID | `{TD.materialIdExactBoundary}` | Material ID is entered |
| 10 | Press Enter to confirm the Material entry | — | Material ID is validated; material description is displayed |
| 11 | In the Plant field, enter the Plant code | `{TD.plantExactBoundary}` | Plant code is entered |
| 12 | Press Enter to confirm the Plant entry | — | Plant is validated |
| 13 | Click "Execute" or "Go" button to display the Stock/Requirements List | — | Stock/Requirements List is displayed |
| 14 | Review the existing batch `{TD.batchExactBoundary}` and verify its remaining shelf life | `{TD.batchExactBoundary}`, `{TD.minShelfLifeExactBoundary}` | Batch row shows remaining shelf life EXACTLY equal to `{TD.minShelfLifeExactBoundary}` days (boundary condition: expiration date - today = min shelf-life) |
| 15 | Click the search icon (top-right shell bar) and type "Schedule MRP Runs" | — | Search results appear listing the Schedule MRP Runs application |
| 16 | Click "Schedule MRP Runs" from the search results | — | Schedule MRP Runs application opens |
| 17 | In the Material field, enter the Material ID | `{TD.materialIdExactBoundary}` | Material ID is entered |
| 18 | Press Enter to confirm the Material entry | — | Material ID is validated |
| 19 | In the Plant field, enter the Plant code | `{TD.plantExactBoundary}` | Plant code is entered |
| 20 | Press Enter to confirm the Plant entry | — | Plant is validated |
| 21 | In the MRP Controller field, enter the MRP Controller code | `{TD.mrpControllerExactBoundary}` | MRP Controller code is entered |
| 22 | Press Enter to confirm the MRP Controller entry | — | MRP Controller is validated |
| 23 | In the Processing Key field, enter the processing key | `{TD.processingKeyExactBoundary}` | Processing key "NETCH" is entered |
| 24 | Click the "Schedule" or "Execute" button to run MRP | — | MRP run begins processing |
| 25 | Wait for MRP processing to complete | — | System displays a message indicating MRP run completed successfully |
| 26 | Navigate back to the Stock/Requirements List application via search | — | Stock/Requirements List application opens |
| 27 | Enter Material `{TD.materialIdExactBoundary}` and Plant `{TD.plantExactBoundary}` again | `{TD.materialIdExactBoundary}`, `{TD.plantExactBoundary}` | Material and Plant are entered |
| 28 | Click "Execute" or "Go" button to display the updated Stock/Requirements List | — | Stock/Requirements List refreshes with MRP results |
| 29 | Verify that batch `{TD.batchExactBoundary}` was EXCLUDED from available stock in the MRP calculation | `{TD.batchExactBoundary}` | Batch is NOT counted as available stock; MRP treats remaining shelf life = min threshold as insufficient (boundary rule: batch is excluded when remaining shelf life ≤ min threshold) |
| 30 | Verify that an MRP proposal (Planned Order or Purchase Requisition) is generated to replenish the stock | — | A new MRP element row appears; proposal quantity reflects exclusion of the batch at exact boundary |
| 31 | Click on the MRP element to view details | — | MRP element detail view opens |
| 32 | Verify that the proposal reflects shelf-life-adjusted lead time | — | Receipt date is adjusted to ensure sufficient shelf-life for newly procured material |
| 33 | Note the MRP element number | — | MRP element number is displayed |
| 34 | Navigate back to the Stock/Requirements List | — | Main list view is displayed |
| 35 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 36 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 37 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- MRP run completes successfully
- The batch with remaining shelf life EXACTLY equal to the minimum threshold is EXCLUDED from available stock
- This confirms the boundary rule: batches are excluded when remaining shelf life ≤ minimum threshold (not only when < minimum threshold)
- An MRP proposal is generated reflecting the exclusion of the boundary batch
- The system correctly implements the shelf-life boundary logic at the exact threshold value

---

### Post-conditions

- MRP run has been executed for Material `{TD.materialIdExactBoundary}` in Plant `{TD.plantExactBoundary}`
- Batch `{TD.batchExactBoundary}` was excluded from available stock (boundary condition confirmed)
- An MRP element exists reflecting the batch exclusion
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
