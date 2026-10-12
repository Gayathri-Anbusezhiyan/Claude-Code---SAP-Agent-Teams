# TC-CS-132: Attempt Confirmation with Invalid Operation Number for the Process Order

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
| P4 | Master Data | Operation `{TD.invalidOperationNumber}` does NOT exist in the routing for Process Order `{TD.processOrderNumber}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-52/CS-52-testdata.json` — Dataset ID: `TD-CS-52-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Existing process order in SAP — entered by the user | Valid |
| Invalid Operation Number | `{TD.invalidOperationNumber}` | Operation number not in order routing — entered by the user | Invalid |
| Material Number | `{TD.materialNumber}` | Material number — displayed by system after loading order | Valid |
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
| 10 | Press Enter to confirm the Process Order entry | — | SAP validates the order; order details are loaded including material number `{TD.materialNumber}` and planned batch quantity `{TD.plannedBatchQuantity}` |
| 11 | In the "Operation" field, enter the invalid Operation number | `{TD.invalidOperationNumber}` | Invalid operation number is entered into the field |
| 12 | Press Enter to confirm the Operation entry | — | SAP validates the operation and displays an error message stating that the Operation does not exist for the given Process Order |
| 13 | Verify that the error message is displayed | — | Error message is displayed (e.g., "Operation does not exist for this Process Order" or "Invalid Operation number"); operation details are NOT loaded |
| 14 | Verify that operation-specific fields remain empty or disabled | — | Work center, operation description fields remain empty or disabled; no operation data is populated |
| 15 | Verify that the "Confirm" button is disabled or not available | — | Primary submit action is disabled or not available; user cannot proceed with confirmation |
| 16 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 17 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 18 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays an error message indicating that the Operation does not exist for the given Process Order
- No operation details are loaded or displayed
- The user cannot proceed with the confirmation
- No confirmation record is created in SAP
- The system prevents operation-order mismatch and protects data integrity

---

### Post-conditions

- No Process Order operation confirmation is created
- No changes are made to any order or batch data
- Error message is displayed and the user is aware of the invalid operation input
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
