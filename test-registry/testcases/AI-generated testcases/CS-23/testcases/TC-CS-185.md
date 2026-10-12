# TC-CS-185: Exception message triggered when batch remaining shelf life is 1 day below minimum threshold

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
| P1 | User Role | User has the role of Material Planner with SAP authorization to execute MRP runs and view exception messages |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | GMP Material `{TD.materialIdExceptionBelow}` exists, is active, has batch management enabled, and has minimum remaining shelf-life `{TD.minShelfLifeExceptionBelow}` days configured |
| P4 | Master Data | Material `{TD.materialIdExceptionBelow}` has total shelf life configured and is assigned to Plant `{TD.plantExceptionBelow}` |
| P5 | Configuration | Plant `{TD.plantExceptionBelow}` is configured for MRP and exception message processing |
| P6 | Stock Data | An existing batch `{TD.batchExceptionBelow}` has remaining shelf life 1 day BELOW the minimum threshold (e.g., if min = 30 days, remaining = 29 days; boundary condition for exception triggering) |

---

### Test Data

**Dataset Reference:** `testdata/CS-23/CS-23-testdata.json` — Dataset ID: `TD-CS-23-012`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialIdExceptionBelow}` | GMP material with batch 1 day below minimum threshold | Valid |
| Plant | `{TD.plantExceptionBelow}` | Plant configured for MRP | Valid |
| MRP Controller | `{TD.mrpControllerExceptionBelow}` | MRP Controller code | Valid |
| Processing Key | `{TD.processingKeyExceptionBelow}` | NETCH (net change) | Valid |
| Min Remaining Shelf Life | `{TD.minShelfLifeExceptionBelow}` | Minimum remaining shelf life in days | Valid |
| Batch Number (Exception) | `{TD.batchExceptionBelow}` | Batch with remaining shelf life = min threshold - 1 day | Edge case (boundary value) |
| Expected Exception Code | `{TD.expectedExceptionCodeBelow}` | MRP exception message code (e.g., "10" = shelf-life expiration) | Valid |

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
| 9 | In the Material field, enter the Material ID | `{TD.materialIdExceptionBelow}` | Material ID is entered |
| 10 | Press Enter to confirm the Material entry | — | Material ID is validated; material description is displayed |
| 11 | In the Plant field, enter the Plant code | `{TD.plantExceptionBelow}` | Plant code is entered |
| 12 | Press Enter to confirm the Plant entry | — | Plant is validated |
| 13 | In the MRP Controller field, enter the MRP Controller code | `{TD.mrpControllerExceptionBelow}` | MRP Controller code is entered |
| 14 | Press Enter to confirm the MRP Controller entry | — | MRP Controller is validated |
| 15 | In the Processing Key field, enter the processing key | `{TD.processingKeyExceptionBelow}` | Processing key "NETCH" is entered |
| 16 | Click the "Schedule" or "Execute" button to run MRP | — | MRP run begins processing |
| 17 | Wait for MRP processing to complete | — | System displays a message indicating MRP run completed successfully |
| 18 | Click the search icon and type "Stock/Requirements List" | — | Search results appear with Stock/Requirements List |
| 19 | Click "Stock/Requirements List" from the search results | — | Stock/Requirements List application opens |
| 20 | Enter Material `{TD.materialIdExceptionBelow}` and Plant `{TD.plantExceptionBelow}` | `{TD.materialIdExceptionBelow}`, `{TD.plantExceptionBelow}` | Material and Plant are entered |
| 21 | Click "Execute" or "Go" button | — | Stock/Requirements List is displayed with MRP results |
| 22 | Review the batch `{TD.batchExceptionBelow}` and verify its remaining shelf life | `{TD.batchExceptionBelow}`, `{TD.minShelfLifeExceptionBelow}` | Batch row shows remaining shelf life 1 day BELOW the minimum threshold (e.g., if min = 30, remaining = 29) |
| 23 | Verify that an MRP exception message is displayed for Material `{TD.materialIdExceptionBelow}` | `{TD.expectedExceptionCodeBelow}` | An exception message row appears with exception code `{TD.expectedExceptionCodeBelow}` (e.g., "10" for shelf-life expiration); message indicates stock has fallen below minimum shelf-life threshold |
| 24 | Click on the exception message to view details | — | Exception message detail view opens showing the specific batch and remaining shelf life information |
| 25 | Verify that the exception message references batch `{TD.batchExceptionBelow}` and indicates remaining shelf life is below the minimum threshold | `{TD.batchExceptionBelow}`, `{TD.minShelfLifeExceptionBelow}` | Exception detail clearly identifies the batch and states that remaining shelf life is below the minimum threshold (critical shelf-life warning) |
| 26 | Verify that batch `{TD.batchExceptionBelow}` is also excluded from available stock in the MRP calculation | `{TD.batchExceptionBelow}` | Batch is NOT counted as available stock; MRP proposals reflect full replenishment need (batch exclusion + exception message both active) |
| 27 | Navigate back to the Stock/Requirements List | — | Main list view is displayed |
| 28 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 29 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 30 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- MRP run completes successfully
- An exception message is triggered when the batch remaining shelf life is 1 day below the minimum threshold (boundary condition)
- The exception message displays the correct exception code (e.g., "10" for shelf-life expiration)
- The exception message identifies the specific batch and warns the planner that stock has fallen below the minimum shelf-life threshold
- The batch is also excluded from available stock in the MRP calculation (both exclusion logic and exception message are active)
- This confirms that the exception triggering logic activates when remaining shelf life < minimum threshold

---

### Post-conditions

- MRP run has been executed for Material `{TD.materialIdExceptionBelow}` in Plant `{TD.plantExceptionBelow}`
- An exception message exists for batch `{TD.batchExceptionBelow}` (boundary condition confirmed)
- Batch `{TD.batchExceptionBelow}` was excluded from available stock
- The planner is alerted to the critical shelf-life constraint issue
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
