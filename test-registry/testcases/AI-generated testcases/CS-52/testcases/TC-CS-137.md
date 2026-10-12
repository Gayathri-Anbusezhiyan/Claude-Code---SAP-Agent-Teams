# TC-CS-137: Attempt Confirmation with Missing Yield Quantity Field

**User Story:**          [CS-52] Confirm Yield And Scrap Quantities Against A Process Order Operation
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Execution (PP)
**Feature:**             Process Order Confirmation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to confirm Process Order operations (PP_CONF authorization object) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Process Order `{TD.processOrderNumber}` exists and is released |
| P4 | Master Data | Operation `{TD.operationNumber}` exists in the routing for Process Order `{TD.processOrderNumber}` |
| P5 | Mandatory Field | Yield Quantity field is mandatory and must NOT be left empty |

---

### Test Data

**Dataset Reference:** `testdata/CS-52/CS-52-testdata.json` — Dataset ID: `TD-CS-52-ERR-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Existing process order in SAP — entered by the user | Valid |
| Operation Number | `{TD.operationNumber}` | Valid operation from order routing — entered by the user | Valid |
| Yield Quantity | `{TD.emptyValue}` | Empty/blank value — field left empty | Invalid (missing) |
| Planned Batch Quantity | `{TD.plannedBatchQuantity}` | Target quantity — displayed by system | Valid |

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
| 10 | Press Enter to confirm the Process Order entry | — | SAP validates the order; order details are loaded including planned batch quantity `{TD.plannedBatchQuantity}` |
| 11 | In the "Operation" field, enter the Operation number | `{TD.operationNumber}` | Operation number is entered into the field |
| 12 | Press Enter to confirm the Operation entry | — | SAP validates the operation; operation details are loaded |
| 13 | Leave the "Yield" field empty (do not enter any value) | `{TD.emptyValue}` | Yield field remains empty |
| 14 | Attempt to click the "Confirm" button (primary submit action) | — | SAP highlights the Yield field as mandatory and displays a validation error |
| 15 | Verify that the mandatory field error is displayed | — | Error message or indicator is displayed stating that the Yield field is mandatory (e.g., "Yield Quantity is required" or field is highlighted in red with asterisk) |
| 16 | Verify that no confirmation number is generated | — | No confirmation number is displayed; confirmation is NOT created |
| 17 | Verify that the "Confirm" button remains disabled or returns an error | — | Primary submit action is disabled or returns error; user cannot proceed without entering Yield |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP highlights the Yield field as mandatory and prevents submission
- An error message or validation indicator is displayed
- No confirmation number is generated
- The user cannot proceed with the confirmation
- No confirmation record is created in SAP
- The system enforces mandatory field validation

---

### Post-conditions

- No Process Order operation confirmation is created
- No changes are made to any order or batch data
- Mandatory field validation is enforced
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
