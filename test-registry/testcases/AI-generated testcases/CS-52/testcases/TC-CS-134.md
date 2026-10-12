# TC-CS-134: Attempt to Complete Order with Variance Exceeding Tolerance Without Creating Deviation Record

**User Story:**          [CS-52] Confirm Yield And Scrap Quantities Against A Process Order Operation
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Execution (PP)
**Feature:**             Process Order Confirmation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to confirm Process Order operations (PP_CONF authorization object) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Process Order `{TD.processOrderNumber}` exists and is released |
| P4 | Master Data | Operation `{TD.operationNumber}` exists in the routing for Process Order `{TD.processOrderNumber}` |
| P5 | Configuration | Yield variance tolerance is configured for the material/plant (e.g., ±10%) |
| P6 | Configuration | Yield quantity `{TD.yieldQuantity}` exceeds the configured tolerance threshold |
| P7 | Configuration | Deviation workflow is configured and mandatory for out-of-tolerance variances |

---

### Test Data

**Dataset Reference:** `testdata/CS-52/CS-52-testdata.json` — Dataset ID: `TD-CS-52-NEG-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Existing process order in SAP — entered by the user | Valid |
| Operation Number | `{TD.operationNumber}` | Valid operation from order routing — entered by the user | Valid |
| Yield Quantity | `{TD.yieldQuantity}` | Confirmed yield quantity exceeding tolerance (variance > threshold) — entered by the user | Valid |
| Planned Batch Quantity | `{TD.plannedBatchQuantity}` | Target quantity from order header — displayed by system | Valid |
| Scrap Quantity | `{TD.scrapQuantity}` | Scrap quantity (zero for this scenario) — entered by the user | Valid (0) |
| Variance Tolerance Upper | `{TD.varianceToleranceUpper}` | Upper tolerance threshold (e.g., +10%) — configured in system | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Confirm Process Order" | — | Search results appear listing the "Confirm Process Order" application |
| 8 | Click the "Confirm Process Order" application from the search results | — | "Confirm Process Order" application opens |
| 9 | In the "Process Order" field, enter the Process Order number | `{TD.processOrderNumber}` | Process Order number is entered into the field |
| 10 | Press Enter to confirm the Process Order entry | — | SAP validates the order; order details are loaded including material number and planned batch quantity `{TD.plannedBatchQuantity}` |
| 11 | In the "Operation" field, enter the Operation number | `{TD.operationNumber}` | Operation number is entered into the field |
| 12 | Press Enter to confirm the Operation entry | — | SAP validates the operation; operation details are loaded |
| 13 | In the "Yield" field, enter the confirmed yield quantity (exceeding tolerance threshold) | `{TD.yieldQuantity}` | Yield quantity is entered into the field |
| 14 | Press Enter to confirm the Yield entry | — | SAP calculates and displays the yield variance percentage |
| 15 | Verify that the Yield Variance exceeds the configured tolerance | — | Yield variance percentage is shown and exceeds the upper tolerance threshold `{TD.varianceToleranceUpper}` (e.g., variance is +15% when tolerance is +10%) |
| 16 | Verify that a deviation warning or indicator is displayed | — | SAP displays a warning message or indicator stating that the variance exceeds tolerance and a deviation record is required |
| 17 | In the "Scrap" field, enter the scrap quantity | `{TD.scrapQuantity}` | Scrap quantity (0) is entered into the field |
| 18 | Press Enter to confirm the Scrap entry | — | Scrap field is confirmed with zero value |
| 19 | Attempt to click the "Confirm" button (primary submit action) WITHOUT creating a deviation record | — | SAP blocks the confirmation attempt and displays an error message |
| 20 | Verify that the error message is displayed | — | Error message is displayed stating that a deviation record must be created before the order can be confirmed (e.g., "Deviation record required for out-of-tolerance variance" or "Cannot confirm without deviation record") |
| 21 | Verify that no confirmation number is generated | — | No confirmation number is displayed; confirmation is NOT created |
| 22 | Verify that the "Confirm" button remains disabled or returns an error | — | Primary submit action is blocked; user cannot proceed without creating deviation record |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays an error message indicating that a deviation record is required before the order can be confirmed
- No confirmation number is generated
- No confirmation record is created in SAP
- The system enforces the compliance rule that out-of-tolerance variances require deviation records
- The user is blocked from bypassing the deviation workflow
- The finished goods batch quantity is NOT updated
- The order cannot be technically completed without creating the deviation record

---

### Post-conditions

- No Process Order operation confirmation is created
- No changes are made to any order or batch data
- No deviation record is created
- Error message is displayed and the user is aware that deviation record creation is mandatory
- Compliance workflow is enforced and cannot be bypassed
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
