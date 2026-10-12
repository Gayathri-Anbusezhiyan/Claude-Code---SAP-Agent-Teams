# TC-CS-133: Attempt Confirmation with Invalid Scrap Reason Code

**User Story:**          [CS-52] Confirm Yield And Scrap Quantities Against A Process Order Operation
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Execution (PP)
**Feature:**             Process Order Confirmation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
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
| P5 | Master Data | Scrap Reason Code `{TD.invalidScrapReasonCode}` does NOT exist in QMFE master data |

---

### Test Data

**Dataset Reference:** `testdata/CS-52/CS-52-testdata.json` — Dataset ID: `TD-CS-52-NEG-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Existing process order in SAP — entered by the user | Valid |
| Operation Number | `{TD.operationNumber}` | Valid operation from order routing — entered by the user | Valid |
| Yield Quantity | `{TD.yieldQuantity}` | Confirmed yield quantity — entered by the user | Valid |
| Scrap Quantity | `{TD.scrapQuantity}` | Confirmed scrap quantity (greater than 0) — entered by the user | Valid |
| Invalid Scrap Reason Code | `{TD.invalidScrapReasonCode}` | Non-existent scrap reason code — entered by the user | Invalid |
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
| 10 | Press Enter to confirm the Process Order entry | — | SAP validates the order; order details are loaded including material number and planned batch quantity `{TD.plannedBatchQuantity}` |
| 11 | In the "Operation" field, enter the Operation number | `{TD.operationNumber}` | Operation number is entered into the field |
| 12 | Press Enter to confirm the Operation entry | — | SAP validates the operation; operation details are loaded |
| 13 | In the "Yield" field, enter the confirmed yield quantity | `{TD.yieldQuantity}` | Yield quantity is entered into the field |
| 14 | Press Enter to confirm the Yield entry | — | SAP calculates and displays the yield variance percentage |
| 15 | In the "Scrap" field, enter the scrap quantity | `{TD.scrapQuantity}` | Scrap quantity is entered into the field |
| 16 | Press Enter to confirm the Scrap entry | — | Scrap field is confirmed; Scrap Reason field becomes highlighted as mandatory |
| 17 | In the "Scrap Reason" field, enter the invalid scrap reason code | `{TD.invalidScrapReasonCode}` | Invalid scrap reason code is entered into the field |
| 18 | Press Enter to confirm the Scrap Reason entry | — | SAP validates the scrap reason code and displays an error message stating that the Scrap Reason Code does not exist or is invalid |
| 19 | Verify that the error message is displayed | — | Error message is displayed (e.g., "Scrap Reason Code does not exist" or "Invalid Scrap Reason Code"); scrap reason description is NOT auto-populated |
| 20 | Verify that the "Confirm" button is disabled or displays an error when clicked | — | Primary submit action is disabled or displays an error when clicked; user cannot proceed with confirmation |
| 21 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 22 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 23 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays an error message indicating that the Scrap Reason Code does not exist or is invalid
- No scrap reason description is auto-populated
- The user cannot proceed with the confirmation
- No confirmation record is created in SAP
- The system prevents invalid scrap master data reference and protects data integrity

---

### Post-conditions

- No Process Order operation confirmation is created
- No changes are made to any order or batch data
- Error message is displayed and the user is aware of the invalid scrap reason code input
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
