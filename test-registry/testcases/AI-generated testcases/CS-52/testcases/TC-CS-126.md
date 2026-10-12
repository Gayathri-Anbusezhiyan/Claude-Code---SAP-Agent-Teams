# TC-CS-126: Confirm Yield with Scrap and Valid Scrap Reason Code Within Tolerance

**User Story:**          [CS-52] Confirm Yield And Scrap Quantities Against A Process Order Operation
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Execution (PP)
**Feature:**             Process Order Confirmation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
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
| P3 | Master Data | Process Order `{TD.processOrderNumber}` exists, is released, and has planned batch quantity defined |
| P4 | Master Data | Operation `{TD.operationNumber}` exists in the routing for Process Order `{TD.processOrderNumber}` |
| P5 | Master Data | Material `{TD.materialNumber}` is assigned to the Process Order and is active in the system |
| P6 | Master Data | Scrap Reason Code `{TD.scrapReasonCode}` exists in QMFE master data and is active |
| P7 | Configuration | Work Center `{TD.workCenter}` is assigned to the operation and is active |

---

### Test Data

**Dataset Reference:** `testdata/CS-52/CS-52-testdata.json` — Dataset ID: `TD-CS-52-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Existing process order in SAP — entered by the user | Valid |
| Operation Number | `{TD.operationNumber}` | Valid operation from order routing — entered by the user | Valid |
| Yield Quantity | `{TD.yieldQuantity}` | Confirmed yield quantity — entered by the user | Valid |
| Scrap Quantity | `{TD.scrapQuantity}` | Confirmed scrap quantity (greater than 0) — entered by the user | Valid |
| Scrap Reason Code | `{TD.scrapReasonCode}` | Valid scrap reason code from QMFE master data — entered by the user | Valid |
| Planned Batch Quantity | `{TD.plannedBatchQuantity}` | Target quantity from order header — displayed by system | Valid |
| Material Number | `{TD.materialNumber}` | Material number — displayed by system | Valid |
| Unit of Measure | `{TD.uom}` | Base unit of measure — displayed by system | Valid |

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
| 10 | Press Enter to confirm the Process Order entry | — | SAP validates the order; order details are loaded including material number `{TD.materialNumber}`, planned batch quantity `{TD.plannedBatchQuantity}`, and unit of measure `{TD.uom}` |
| 11 | In the "Operation" field, enter the Operation number | `{TD.operationNumber}` | Operation number is entered into the field |
| 12 | Press Enter to confirm the Operation entry | — | SAP validates the operation; operation details are loaded including work center and operation description |
| 13 | In the "Yield" field, enter the confirmed yield quantity | `{TD.yieldQuantity}` | Yield quantity is entered into the field |
| 14 | Press Enter to confirm the Yield entry | — | SAP calculates and displays the yield variance percentage |
| 15 | Verify that the Yield Variance is calculated and displayed | — | Yield variance percentage is shown; value is within the configured tolerance range |
| 16 | In the "Scrap" field, enter the scrap quantity | `{TD.scrapQuantity}` | Scrap quantity is entered into the field |
| 17 | Press Enter to confirm the Scrap entry | — | Scrap field is confirmed; Scrap Reason field becomes highlighted as mandatory |
| 18 | In the "Scrap Reason" field, enter the scrap reason code | `{TD.scrapReasonCode}` | Scrap reason code is entered into the field |
| 19 | Press Enter to confirm the Scrap Reason entry | — | SAP validates the scrap reason code; scrap reason description is auto-populated |
| 20 | Verify that Yield + Scrap does not exceed the Maximum Order Quantity | — | Sum of yield and scrap is less than or equal to planned batch quantity; no over-confirmation error |
| 21 | Click the "Confirm" button (primary submit action) | — | SAP begins processing the confirmation |
| 22 | Observe the on-screen confirmation response | — | A success message is displayed containing the generated confirmation number |
| 23 | Note the confirmation number from the success message | — | Confirmation number is displayed (system-generated numeric format) |
| 24 | Verify that the finished goods batch quantity has been updated | `{TD.yieldQuantity}` | Batch quantity is updated to match the confirmed yield quantity (scrap is not added to batch) |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique confirmation number is generated by SAP and displayed in the success message
- The Process Order operation is confirmed with the specified yield and scrap quantities
- The scrap reason code is correctly recorded against the scrap quantity
- The yield variance percentage is within the configured tolerance
- The finished goods batch quantity reflects only the confirmed yield (not scrap)
- No deviation record is triggered (variance is within tolerance)

---

### Post-conditions

- Process Order operation confirmation exists in SAP with the generated confirmation number
- Operation status is updated to "Confirmed" or "CONF"
- Finished goods batch quantity equals the confirmed yield quantity
- Scrap quantity and scrap reason code are recorded in the confirmation record
- No deviation record exists (variance within tolerance)
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
