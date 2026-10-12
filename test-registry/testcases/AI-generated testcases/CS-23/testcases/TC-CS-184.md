# TC-CS-184: Exception message triggered when batch remaining shelf life reaches minimum threshold exactly

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
| P3 | Master Data | GMP Material `{TD.materialIdExceptionExact}` exists, is active, has batch management enabled, and has minimum remaining shelf-life `{TD.minShelfLifeExceptionExact}` days configured |
| P4 | Master Data | Material `{TD.materialIdExceptionExact}` has total shelf life configured and is assigned to Plant `{TD.plantExceptionExact}` |
| P5 | Configuration | Plant `{TD.plantExceptionExact}` is configured for MRP and exception message processing |
| P6 | Stock Data | An existing batch `{TD.batchExceptionExact}` has remaining shelf life EXACTLY equal to the minimum threshold `{TD.minShelfLifeExceptionExact}` days (boundary condition for exception triggering) |

---

### Test Data

**Dataset Reference:** `testdata/CS-23/CS-23-testdata.json` — Dataset ID: `TD-CS-23-011`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialIdExceptionExact}` | GMP material with batch at exact minimum threshold | Valid |
| Plant | `{TD.plantExceptionExact}` | Plant configured for MRP | Valid |
| MRP Controller | `{TD.mrpControllerExceptionExact}` | MRP Controller code | Valid |
| Processing Key | `{TD.processingKeyExceptionExact}` | NETCH (net change) | Valid |
| Min Remaining Shelf Life | `{TD.minShelfLifeExceptionExact}` | Minimum remaining shelf life in days | Valid |
| Batch Number (Exception) | `{TD.batchExceptionExact}` | Batch with remaining shelf life = min threshold exactly | Edge case (boundary value) |
| Expected Exception Code | `{TD.expectedExceptionCode}` | MRP exception message code (e.g., "10" = shelf-life expiration) | Valid |

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
| 9 | In the Material field, enter the Material ID | `{TD.materialIdExceptionExact}` | Material ID is entered |
| 10 | Press Enter to confirm the Material entry | — | Material ID is validated; material description is displayed |
| 11 | In the Plant field, enter the Plant code | `{TD.plantExceptionExact}` | Plant code is entered |
| 12 | Press Enter to confirm the Plant entry | — | Plant is validated |
| 13 | In the MRP Controller field, enter the MRP Controller code | `{TD.mrpControllerExceptionExact}` | MRP Controller code is entered |
| 14 | Press Enter to confirm the MRP Controller entry | — | MRP Controller is validated |
| 15 | In the Processing Key field, enter the processing key | `{TD.processingKeyExceptionExact}` | Processing key "NETCH" is entered |
| 16 | Click the "Schedule" or "Execute" button to run MRP | — | MRP run begins processing |
| 17 | Wait for MRP processing to complete | — | System displays a message indicating MRP run completed successfully |
| 18 | Click the search icon and type "Stock/Requirements List" | — | Search results appear with Stock/Requirements List |
| 19 | Click "Stock/Requirements List" from the search results | — | Stock/Requirements List application opens |
| 20 | Enter Material `{TD.materialIdExceptionExact}` and Plant `{TD.plantExceptionExact}` | `{TD.materialIdExceptionExact}`, `{TD.plantExceptionExact}` | Material and Plant are entered |
| 21 | Click "Execute" or "Go" button | — | Stock/Requirements List is displayed with MRP results |
| 22 | Review the batch `{TD.batchExceptionExact}` and verify its remaining shelf life | `{TD.batchExceptionExact}`, `{TD.minShelfLifeExceptionExact}` | Batch row shows remaining shelf life EXACTLY equal to the minimum threshold |
| 23 | Verify that an MRP exception message is displayed for Material `{TD.materialIdExceptionExact}` | `{TD.expectedExceptionCode}` | An exception message row appears with exception code `{TD.expectedExceptionCode}` (e.g., "10" for shelf-life expiration); message indicates stock is approaching minimum shelf-life threshold |
| 24 | Click on the exception message to view details | — | Exception message detail view opens showing the specific batch and remaining shelf life information |
| 25 | Verify that the exception message references batch `{TD.batchExceptionExact}` and the minimum shelf-life threshold | `{TD.batchExceptionExact}`, `{TD.minShelfLifeExceptionExact}` | Exception detail clearly identifies the batch and states that remaining shelf life has reached the minimum threshold |
| 26 | Navigate back to the Stock/Requirements List | — | Main list view is displayed |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- MRP run completes successfully
- An exception message is triggered when the batch remaining shelf life reaches the minimum threshold exactly (boundary condition)
- The exception message displays the correct exception code (e.g., "10" for shelf-life expiration)
- The exception message identifies the specific batch and warns the planner that stock is approaching the minimum shelf-life threshold
- This confirms that the exception triggering logic activates at the exact threshold value (not only below the threshold)

---

### Post-conditions

- MRP run has been executed for Material `{TD.materialIdExceptionExact}` in Plant `{TD.plantExceptionExact}`
- An exception message exists for batch `{TD.batchExceptionExact}` (boundary condition confirmed)
- The planner is alerted to the shelf-life constraint issue
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
