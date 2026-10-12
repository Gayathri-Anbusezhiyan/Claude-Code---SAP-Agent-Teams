# TC-CS-127: Confirm Multiple Operations in Sequence for Multi-Step Order

**User Story:**          [CS-52] Confirm Yield And Scrap Quantities Against A Process Order Operation
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Execution (PP)
**Feature:**             Process Order Confirmation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to confirm Process Order operations (PP_CONF authorization object) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Process Order `{TD.processOrderNumber}` exists, is released, and has a multi-operation routing with at least two operations |
| P4 | Master Data | Operation `{TD.operationNumber1}` exists in the routing for Process Order `{TD.processOrderNumber}` |
| P5 | Master Data | Operation `{TD.operationNumber2}` exists in the routing for Process Order `{TD.processOrderNumber}` |
| P6 | Master Data | Material `{TD.materialNumber}` is assigned to the Process Order and is active in the system |
| P7 | Configuration | Work centers assigned to both operations are active |

---

### Test Data

**Dataset Reference:** `testdata/CS-52/CS-52-testdata.json` — Dataset ID: `TD-CS-52-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Existing process order with multi-operation routing — entered by the user | Valid |
| Operation Number 1 | `{TD.operationNumber1}` | First operation from order routing — entered by the user | Valid |
| Yield Quantity 1 | `{TD.yieldQuantity1}` | Confirmed yield for first operation — entered by the user | Valid |
| Scrap Quantity 1 | `{TD.scrapQuantity1}` | Scrap quantity for first operation (zero) — entered by the user | Valid (0) |
| Operation Number 2 | `{TD.operationNumber2}` | Second operation from order routing — entered by the user | Valid |
| Yield Quantity 2 | `{TD.yieldQuantity2}` | Confirmed yield for second operation — entered by the user | Valid |
| Scrap Quantity 2 | `{TD.scrapQuantity2}` | Scrap quantity for second operation (zero) — entered by the user | Valid (0) |
| Planned Batch Quantity | `{TD.plannedBatchQuantity}` | Target quantity from order header — displayed by system | Valid |
| Material Number | `{TD.materialNumber}` | Material number — displayed by system | Valid |

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
| 11 | In the "Operation" field, enter the first Operation number | `{TD.operationNumber1}` | First operation number is entered into the field |
| 12 | Press Enter to confirm the Operation entry | — | SAP validates the operation; operation details for the first operation are loaded |
| 13 | In the "Yield" field, enter the confirmed yield quantity for the first operation | `{TD.yieldQuantity1}` | Yield quantity is entered into the field |
| 14 | Press Enter to confirm the Yield entry | — | SAP calculates and displays the yield variance percentage for the first operation |
| 15 | Verify that the Yield Variance is within tolerance | — | Yield variance percentage is shown; value is within the configured tolerance range |
| 16 | In the "Scrap" field, enter the scrap quantity | `{TD.scrapQuantity1}` | Scrap quantity (0) is entered into the field |
| 17 | Press Enter to confirm the Scrap entry | — | Scrap field is confirmed with zero value |
| 18 | Click the "Confirm" button to confirm the first operation | — | SAP processes the confirmation; success message is displayed with the first confirmation number |
| 19 | Note the first confirmation number from the success message | — | First confirmation number is recorded |
| 20 | In the "Operation" field, enter the second Operation number | `{TD.operationNumber2}` | Second operation number is entered into the field |
| 21 | Press Enter to confirm the Operation entry | — | SAP validates the operation; operation details for the second operation are loaded |
| 22 | In the "Yield" field, enter the confirmed yield quantity for the second operation | `{TD.yieldQuantity2}` | Yield quantity is entered into the field |
| 23 | Press Enter to confirm the Yield entry | — | SAP calculates and displays the yield variance percentage for the second operation |
| 24 | Verify that the Yield Variance is within tolerance | — | Yield variance percentage is shown; value is within the configured tolerance range |
| 25 | In the "Scrap" field, enter the scrap quantity | `{TD.scrapQuantity2}` | Scrap quantity (0) is entered into the field |
| 26 | Press Enter to confirm the Scrap entry | — | Scrap field is confirmed with zero value |
| 27 | Click the "Confirm" button to confirm the second operation | — | SAP processes the confirmation; success message is displayed with the second confirmation number |
| 28 | Note the second confirmation number from the success message | — | Second confirmation number is recorded |
| 29 | Verify that both operations are marked as confirmed | — | Both operations show "Confirmed" status in the operation list or confirmation history |
| 30 | Verify that the finished goods batch quantity reflects the final confirmed yield | `{TD.yieldQuantity2}` | Batch quantity is updated to match the final operation confirmed yield quantity |
| 31 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 32 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 33 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Two unique confirmation numbers are generated by SAP (one per operation)
- Both operations of the Process Order are marked as confirmed with their respective yield quantities
- Yield variance percentages for both operations are within the configured tolerance
- The finished goods batch quantity is updated based on the final operation yield
- No deviation records are triggered (both variances within tolerance)
- Both confirmations appear in the Process Order confirmation history

---

### Post-conditions

- Process Order has two operation confirmations recorded in SAP
- Both operations show "Confirmed" or "CONF" status
- Finished goods batch quantity reflects the final operation yield
- No deviation records exist for either operation (variances within tolerance)
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
