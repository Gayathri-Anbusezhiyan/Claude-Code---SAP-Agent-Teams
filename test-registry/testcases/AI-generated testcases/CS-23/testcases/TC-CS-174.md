# TC-CS-174: Access Stock/Requirements List and run MRP end-to-end for GMP material with shelf-life constraints

**User Story:**          [CS-23] User Story MM-008
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             MRP with Shelf-Life Management for GMP Materials
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Material Planner with SAP authorization to access Stock/Requirements List and execute MRP runs |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | GMP Material `{TD.materialId}` exists, is active, has batch management enabled (XCHPF = X), and has minimum remaining shelf-life `{TD.minShelfLife}` days configured in the material master (MARA-MHDRZ) |
| P4 | Master Data | Material `{TD.materialId}` has total shelf life `{TD.totalShelfLife}` days configured (MARA-MHDHB) and is assigned to Plant `{TD.plant}` |
| P5 | Configuration | Plant `{TD.plant}` is configured for MRP with a valid planning calendar and assigned to MRP Controller `{TD.mrpController}` |
| P6 | Configuration | Material `{TD.materialId}` has MRP Type configured (e.g., PD = MRP) and procurement type is set (E = In-house or F = External) |
| P7 | Stock Data | Existing batch `{TD.batchNumber}` has remaining shelf life below the minimum threshold `{TD.minShelfLife}` days, making it unavailable for MRP planning |

---

### Test Data

**Dataset Reference:** `testdata/CS-23/CS-23-testdata.json` — Dataset ID: `TD-CS-23-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | GMP material with batch management and shelf-life enabled | Valid |
| Plant | `{TD.plant}` | Plant configured for MRP | Valid |
| MRP Controller | `{TD.mrpController}` | MRP Controller code assigned to the plant | Valid |
| Processing Key | `{TD.processingKey}` | MRP processing key (NETCH = net change) | Valid |
| Min Remaining Shelf Life | `{TD.minShelfLife}` | Minimum remaining shelf life in days (from material master) | Valid |
| Total Shelf Life | `{TD.totalShelfLife}` | Total shelf life in days (from material master) | Valid |
| Batch Number | `{TD.batchNumber}` | Existing batch with remaining shelf life below minimum | Valid |
| Expected MRP Element Type | `{TD.expectedMRPElementType}` | Expected MRP proposal type (BA = Purchase Requisition, PA = Planned Order) | Valid |

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
| 9 | In the Material field, enter the Material ID | `{TD.materialId}` | Material ID is entered into the field |
| 10 | Press Enter to confirm the Material entry | — | SAP validates the material; material description is displayed |
| 11 | In the Plant field, enter the Plant code | `{TD.plant}` | Plant code is entered into the field |
| 12 | Press Enter to confirm the Plant entry | — | SAP validates the plant; plant is confirmed |
| 13 | In the MRP Controller field, enter the MRP Controller code | `{TD.mrpController}` | MRP Controller code is entered |
| 14 | Press Enter to confirm the MRP Controller entry | — | MRP Controller is confirmed |
| 15 | Click the "Execute" or "Go" button to display the Stock/Requirements List | — | Stock/Requirements List is displayed showing current stock situation and MRP elements |
| 16 | Review the list and verify that existing batch `{TD.batchNumber}` is displayed | `{TD.batchNumber}` | Existing batch is visible in the stock overview section |
| 17 | Observe the remaining shelf life of the existing batch | — | Remaining shelf life is shown as below the minimum threshold `{TD.minShelfLife}` days |
| 18 | Click the search icon (top-right shell bar) and type "Schedule MRP Runs" | — | Search results appear listing the Schedule MRP Runs application |
| 19 | Click "Schedule MRP Runs" from the search results | — | Schedule MRP Runs application opens with MRP run configuration screen |
| 20 | In the Material field, enter the Material ID | `{TD.materialId}` | Material ID is entered |
| 21 | Press Enter to confirm the Material entry | — | Material ID is validated |
| 22 | In the Plant field, enter the Plant code | `{TD.plant}` | Plant code is entered |
| 23 | Press Enter to confirm the Plant entry | — | Plant is validated |
| 24 | In the Processing Key field, enter the processing key | `{TD.processingKey}` | Processing key "NETCH" (net change) is entered |
| 25 | Click the "Schedule" or "Execute" button to run MRP | — | MRP run is scheduled and begins processing |
| 26 | Wait for MRP processing to complete (may take a few moments) | — | System displays a message indicating MRP run completed successfully |
| 27 | Navigate back to the Stock/Requirements List application via search | — | Stock/Requirements List application opens |
| 28 | Enter Material `{TD.materialId}` and Plant `{TD.plant}` again | `{TD.materialId}`, `{TD.plant}` | Material and Plant are entered |
| 29 | Click "Execute" or "Go" to display the updated Stock/Requirements List | — | Stock/Requirements List refreshes with updated MRP proposals |
| 30 | Verify that a new MRP element (Planned Order or Purchase Requisition) is displayed | `{TD.expectedMRPElementType}` | A new MRP element row appears with element type matching `{TD.expectedMRPElementType}` (BA or PA) |
| 31 | Verify that the existing batch `{TD.batchNumber}` was excluded from available stock in MRP calculation | `{TD.batchNumber}` | Batch is not counted as available stock; MRP proposal quantity reflects full replenishment need |
| 32 | Click on the MRP element to view details | — | MRP element detail view opens showing proposed receipt date and SLED (Shelf Life Expiration Date) |
| 33 | Verify that the proposed receipt date considers adjusted lead time due to shelf-life constraints | — | Receipt date is displayed; SLED is calculated as receipt date + `{TD.totalShelfLife}` days |
| 34 | Note the MRP element number (Planned Order or Purchase Requisition number) | — | Element number is displayed (10-digit numeric format) |
| 35 | Navigate back to the main Stock/Requirements List | — | Main list view is displayed |
| 36 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 37 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 38 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Stock/Requirements List is successfully accessed for the GMP material
- MRP run is executed and completes successfully
- A new MRP element (Planned Order or Purchase Requisition) is generated
- The existing batch with remaining shelf life below the minimum threshold is excluded from available stock in the MRP calculation
- The MRP proposal reflects adjusted lead time to ensure newly procured material has sufficient shelf life
- The SLED (Shelf Life Expiration Date) is calculated correctly based on receipt date + total shelf life
- The planner can review the planning proposal directly from the Stock/Requirements List

---

### Post-conditions

- MRP run has been executed for Material `{TD.materialId}` in Plant `{TD.plant}`
- A new MRP element (Planned Order or Purchase Requisition) exists in the system
- The MRP element reflects shelf-life constraints and excludes near-expired batches from availability
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
