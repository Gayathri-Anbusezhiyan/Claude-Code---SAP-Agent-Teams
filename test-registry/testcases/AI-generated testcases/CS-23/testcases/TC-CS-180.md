# TC-CS-180: Run MRP for GMP material with all batches below minimum shelf-life (full replenishment proposal)

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
| P3 | Master Data | GMP Material `{TD.materialIdAllExpired}` exists, is active, has batch management enabled, and has minimum remaining shelf-life `{TD.minShelfLifeAllExpired}` days configured |
| P4 | Master Data | Material `{TD.materialIdAllExpired}` has total shelf life configured and is assigned to Plant `{TD.plantAllExpired}` |
| P5 | Configuration | Plant `{TD.plantAllExpired}` is configured for MRP |
| P6 | Stock Data | All existing batches for Material `{TD.materialIdAllExpired}` have remaining shelf life BELOW the minimum threshold `{TD.minShelfLifeAllExpired}` days (all batches are near-expired or expired) |
| P7 | Requirements Data | A net requirement exists for Material `{TD.materialIdAllExpired}` (e.g., sales order, planned independent requirement, or dependent requirement) |

---

### Test Data

**Dataset Reference:** `testdata/CS-23/CS-23-testdata.json` — Dataset ID: `TD-CS-23-007`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID (All Expired) | `{TD.materialIdAllExpired}` | GMP material with all batches below min shelf-life | Valid |
| Plant | `{TD.plantAllExpired}` | Plant configured for MRP | Valid |
| MRP Controller | `{TD.mrpControllerAllExpired}` | MRP Controller code | Valid |
| Processing Key | `{TD.processingKeyAllExpired}` | NETCH (net change) | Valid |
| Min Remaining Shelf Life | `{TD.minShelfLifeAllExpired}` | Minimum remaining shelf life in days | Valid |
| Existing Batch 1 | `{TD.expiredBatch1}` | Batch with remaining shelf life below minimum | Invalid (near-expired) |
| Existing Batch 2 | `{TD.expiredBatch2}` | Batch with remaining shelf life below minimum | Invalid (near-expired) |
| Expected Proposal Quantity | `{TD.expectedFullReplenishmentQty}` | Full net requirement quantity | Valid |

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
| 9 | In the Material field, enter the Material ID | `{TD.materialIdAllExpired}` | Material ID is entered |
| 10 | Press Enter to confirm the Material entry | — | Material ID is validated; material description is displayed |
| 11 | In the Plant field, enter the Plant code | `{TD.plantAllExpired}` | Plant code is entered |
| 12 | Press Enter to confirm the Plant entry | — | Plant is validated |
| 13 | Click "Execute" or "Go" button to display the Stock/Requirements List | — | Stock/Requirements List is displayed showing current stock and requirements |
| 14 | Review existing batches and verify that all batches have remaining shelf life below the minimum threshold | `{TD.expiredBatch1}`, `{TD.expiredBatch2}`, `{TD.minShelfLifeAllExpired}` | All batch rows show remaining shelf life values below `{TD.minShelfLifeAllExpired}` days |
| 15 | Verify that a net requirement exists for the material | — | A requirement row (sales order, planned independent requirement, or dependent requirement) is visible |
| 16 | Click the search icon (top-right shell bar) and type "Schedule MRP Runs" | — | Search results appear listing the Schedule MRP Runs application |
| 17 | Click "Schedule MRP Runs" from the search results | — | Schedule MRP Runs application opens |
| 18 | In the Material field, enter the Material ID | `{TD.materialIdAllExpired}` | Material ID is entered |
| 19 | Press Enter to confirm the Material entry | — | Material ID is validated |
| 20 | In the Plant field, enter the Plant code | `{TD.plantAllExpired}` | Plant code is entered |
| 21 | Press Enter to confirm the Plant entry | — | Plant is validated |
| 22 | In the MRP Controller field, enter the MRP Controller code | `{TD.mrpControllerAllExpired}` | MRP Controller code is entered |
| 23 | Press Enter to confirm the MRP Controller entry | — | MRP Controller is validated |
| 24 | In the Processing Key field, enter the processing key | `{TD.processingKeyAllExpired}` | Processing key "NETCH" is entered |
| 25 | Click the "Schedule" or "Execute" button to run MRP | — | MRP run begins processing |
| 26 | Wait for MRP processing to complete | — | System displays a message indicating MRP run completed successfully |
| 27 | Navigate back to the Stock/Requirements List application via search | — | Stock/Requirements List application opens |
| 28 | Enter Material `{TD.materialIdAllExpired}` and Plant `{TD.plantAllExpired}` again | `{TD.materialIdAllExpired}`, `{TD.plantAllExpired}` | Material and Plant are entered |
| 29 | Click "Execute" or "Go" button to display the updated Stock/Requirements List | — | Stock/Requirements List refreshes with updated MRP proposals |
| 30 | Verify that a new MRP element (Planned Order or Purchase Requisition) is displayed | — | A new MRP proposal row appears with element type PA (Planned Order) or BA (Purchase Requisition) |
| 31 | Verify that ALL existing batches were excluded from available stock in the MRP calculation | `{TD.expiredBatch1}`, `{TD.expiredBatch2}` | MRP proposal quantity equals the full net requirement; no existing stock is counted as available |
| 32 | Verify that the MRP proposal quantity reflects full replenishment need (all stock excluded) | `{TD.expectedFullReplenishmentQty}` | Proposed quantity equals or exceeds the total net requirement quantity |
| 33 | Click on the MRP element to view details | — | MRP element detail view opens |
| 34 | Verify that the proposal reflects shelf-life-adjusted lead time | — | Receipt date is adjusted to ensure sufficient shelf-life for newly procured or produced material |
| 35 | Note the MRP element number | — | MRP element number is displayed (10-digit format) |
| 36 | Navigate back to the Stock/Requirements List | — | Main list view is displayed |
| 37 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 38 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 39 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- MRP run completes successfully for the GMP material with all batches below minimum shelf-life
- All existing batches are excluded from available stock in the MRP availability check (none meet the minimum remaining shelf-life requirement)
- A new MRP element (Planned Order or Purchase Requisition) is generated
- The MRP proposal quantity reflects full replenishment need (no existing stock is counted as available)
- The MRP proposal reflects adjusted lead time to ensure newly procured or produced material has sufficient shelf-life
- The system correctly handles the scenario where NO existing stock is usable due to shelf-life constraints

---

### Post-conditions

- MRP run has been executed for Material `{TD.materialIdAllExpired}` in Plant `{TD.plantAllExpired}`
- A new MRP element (Planned Order or Purchase Requisition) exists in the system
- The MRP element reflects full replenishment quantity (all existing batches excluded)
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
