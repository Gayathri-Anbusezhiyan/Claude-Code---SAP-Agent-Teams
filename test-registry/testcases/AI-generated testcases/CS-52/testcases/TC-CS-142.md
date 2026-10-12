# TC-CS-142: Attempt Confirmation with Yield Plus Scrap Exceeding Maximum Order Quantity

**User Story:**          [CS-52] Confirm Yield And Scrap Quantities Against A Process Order Operation
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Execution (PP)
**Feature:**             Process Order Confirmation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to confirm Process Order operations (PP_CONF authorization object) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Process Order `{TD.processOrderNumber}` exists and is released with planned batch quantity defined |
| P4 | Master Data | Operation `{TD.operationNumber}` exists in the routing for Process Order `{TD.processOrderNumber}` |
| P5 | Master Data | Scrap Reason Code `{TD.scrapReasonCode}` exists in QMFE master data |
| P6 | Configuration | Yield + Scrap exceeds the planned batch quantity (over-confirmation test) |

---

### Test Data

**Dataset Reference:** `testdata/CS-52/CS-52-testdata.json` — Dataset ID: `TD-CS-52-EDGE-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Existing process order in SAP — entered by the user | Valid |
| Operation Number | `{TD.operationNumber}` | Valid operation from order routing — entered by the user | Valid |
| Yield Quantity | `{TD.yieldQuantity}` | Yield quantity — entered by the user | Valid |
| Scrap Quantity | `{TD.scrapQuantity}` | Scrap quantity — entered by the user | Valid |
| Scrap Reason Code | `{TD.scrapReasonCode}` | Valid scrap reason code — entered by the user | Valid |
| Planned Batch Quantity | `{TD.plannedBatchQuantity}` | Target quantity from order header — displayed by system | Valid |

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
| 13 | In the "Yield" field, enter the yield quantity | `{TD.yieldQuantity}` | Yield quantity is entered into the field |
| 14 | Press Enter to confirm the Yield entry | — | SAP calculates and displays the yield variance percentage |
| 15 | In the "Scrap" field, enter the scrap quantity | `{TD.scrapQuantity}` | Scrap quantity is entered into the field |
| 16 | Press Enter to confirm the Scrap entry | — | Scrap field is confirmed; Scrap Reason field becomes highlighted as mandatory |
| 17 | Verify that Yield + Scrap exceeds the Planned Batch Quantity | — | Sum of yield and scrap exceeds the planned batch quantity (over-confirmation scenario) |
| 18 | In the "Scrap Reason" field, enter the scrap reason code | `{TD.scrapReasonCode}` | Scrap reason code is entered into the field |
| 19 | Press Enter to confirm the Scrap Reason entry | — | SAP validates the scrap reason code; scrap reason description is auto-populated |
| 20 | Attempt to click the "Confirm" button (primary submit action) | — | SAP displays an error message indicating that the total confirmed quantity exceeds the planned quantity |
| 21 | Verify that the error message is displayed | — | Error message is displayed stating that Yield + Scrap cannot exceed the Maximum Order Quantity (e.g., "Over-confirmation not allowed" or "Total quantity exceeds planned batch quantity") |
| 22 | Verify that no confirmation number is generated | — | No confirmation number is displayed; confirmation is NOT created |
| 23 | Verify that the "Confirm" button remains disabled or returns an error | — | Primary submit action is blocked; user cannot proceed with over-confirmation |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays an error message indicating that over-confirmation is not allowed
- No confirmation number is generated
- No confirmation record is created in SAP
- The system enforces the business rule that Yield + Scrap cannot exceed planned batch quantity
- The finished goods batch quantity is NOT updated
- The system protects data integrity and prevents inventory discrepancies

---

### Post-conditions

- No Process Order operation confirmation is created
- No changes are made to any order or batch data
- Business rule validation is enforced (Yield + Scrap ≤ Planned Quantity)
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
