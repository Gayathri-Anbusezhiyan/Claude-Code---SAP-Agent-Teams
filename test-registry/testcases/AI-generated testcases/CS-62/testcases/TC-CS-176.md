# TC-CS-176: Verify Stock Status Remains Quality Inspection After TECO (MM Integration)

**User Story:**          [CS-62] Technically Complete A Process Order Only After All Mandatory Quality
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Control (PP) — Integration with Materials Management (MM)
**Feature:**             Process Order Technical Completion (TECO) and Stock Status Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to execute Technical Completion (TECO) for process orders |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Process Order | Process order `{TD.processOrderNumberIntStock}` exists in SAP with status Released (REL) and all quality requirements are met |
| P4 | Stock | Finished goods batch `{TD.batchNumberIntStock}` exists with stock status "Quality Inspection" (QI) in MM stock management |
| P5 | Quality Requirements | All deviations closed, all IPC results recorded, all batch records signed |
| P6 | QA Release | QA release has NOT been executed for batch `{TD.batchNumberIntStock}` — QA decision is pending |

---

### Test Data

**Dataset Reference:** `testdata/CS-62/CS-62-testdata.json` — Dataset ID: `TD-CS-062-INT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumberIntStock}` | Process order for stock status integration test — entered by the user | Valid |
| Batch Number | `{TD.batchNumberIntStock}` | Finished goods batch produced by the process order | Valid |
| Material ID | `{TD.materialIdIntStock}` | Material master for the batch | Valid |
| Plant | `{TD.plantIntStock}` | Production plant | Valid |
| Stock Status Before TECO | `{TD.stockStatusBeforeTECO}` | Expected stock status before TECO (QI — Quality Inspection) | Valid |
| Stock Status After TECO | `{TD.stockStatusAfterTECO}` | Expected stock status after TECO (QI — must remain Quality Inspection) | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Stock Overview" or "Manage Stock" | — | Search results appear listing the Stock Overview application |
| 8 | Click "Stock Overview" from the search results | — | Stock Overview application opens |
| 9 | Search for batch `{TD.batchNumberIntStock}` in the stock list | `{TD.batchNumberIntStock}`, `{TD.materialIdIntStock}`, `{TD.plantIntStock}` | Batch is found in the stock list |
| 10 | Verify the stock status for batch `{TD.batchNumberIntStock}` is "Quality Inspection" (QI) BEFORE TECO | `{TD.stockStatusBeforeTECO}` = QI | Stock status shows "Quality Inspection" (QI) — batch is in restricted stock awaiting QA decision |
| 11 | Note the stock quantity for verification after TECO | — | Stock quantity is recorded for later comparison |
| 12 | Navigate to the Confirm Process Order application (via search bar) | — | Confirm Process Order application opens |
| 13 | In the "Order" field, enter the Process Order Number | `{TD.processOrderNumberIntStock}` | Process Order Number is entered into the field |
| 14 | Press Enter to confirm the Order entry | — | SAP loads the process order details; order header information is displayed |
| 15 | Verify the order status is "Released" (REL) | — | Order status shows as Released (REL) |
| 16 | Navigate to the Technical Completion action in the application toolbar or menu | — | Technical Completion (TECO) button or menu option is visible and enabled |
| 17 | Click the "Technical Completion" (TECO) button | — | SAP begins pre-completion validation checks |
| 18 | Verify no blocking validation messages appear | — | All quality gates pass; no errors are displayed |
| 19 | Confirm the Technical Completion action in the confirmation dialog (if prompted) | — | TECO action is submitted to SAP |
| 20 | Observe the success confirmation message | — | Success message is displayed: "Order `{TD.processOrderNumberIntStock}` technically completed" or similar |
| 21 | Verify the order status is updated to "Technically Completed" (TECO) | — | Order status shows "TECO" (Technically Completed) |
| 22 | Navigate back to the Stock Overview application (via search bar) | — | Stock Overview application opens |
| 23 | Search for batch `{TD.batchNumberIntStock}` in the stock list | `{TD.batchNumberIntStock}`, `{TD.materialIdIntStock}`, `{TD.plantIntStock}` | Batch is found in the stock list |
| 24 | Verify the stock status for batch `{TD.batchNumberIntStock}` REMAINS "Quality Inspection" (QI) AFTER TECO | `{TD.stockStatusAfterTECO}` = QI | Stock status STILL shows "Quality Inspection" (QI); stock has NOT auto-transitioned to Unrestricted (UR) after TECO |
| 25 | Verify the stock quantity has NOT changed | — | Stock quantity matches the value noted in Step 11; TECO does NOT affect stock quantity |
| 26 | Verify the stock type indicator shows "QI" or "Quality Inspection" | — | Stock type field explicitly shows "QI" or "Quality Inspection"; integration between PP (TECO) and MM (stock status) is correct |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Process order `{TD.processOrderNumberIntStock}` is technically completed successfully (TECO status)
- Finished goods batch `{TD.batchNumberIntStock}` stock status REMAINS "Quality Inspection" (QI) after TECO
- Stock does NOT auto-transition to Unrestricted (UR) after TECO — QA release is a separate, independent action
- Stock quantity is unchanged by TECO action
- Integration between PP (Process Order TECO) and MM (Stock Status) is correct: TECO completion does NOT trigger stock release
- Business goal is enforced: batch cannot be considered finished (and released to Unrestricted stock) while QA formal release is pending

---

### Post-conditions

- Process order status is "TECO" (Technically Completed)
- Stock status for batch `{TD.batchNumberIntStock}` remains "QI" (Quality Inspection)
- Stock quantity is unchanged
- QA release process remains pending (independent of TECO)
- No automatic stock status transition occurs due to TECO

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
