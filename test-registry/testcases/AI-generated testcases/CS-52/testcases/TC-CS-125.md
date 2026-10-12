# TC-CS-125: Confirm Single Operation with Yield Within Tolerance and No Scrap

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
| P6 | Configuration | Work Center `{TD.workCenter}` is assigned to the operation and is active |
| P7 | Configuration | Finished goods batch exists or is configured for auto-creation upon yield confirmation |

---

### Test Data

**Dataset Reference:** `testdata/CS-52/CS-52-testdata.json` — Dataset ID: `TD-CS-52-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Existing process order in SAP — entered by the user | Valid |
| Operation Number | `{TD.operationNumber}` | Valid operation from order routing — entered by the user | Valid |
| Yield Quantity | `{TD.yieldQuantity}` | Confirmed yield quantity within tolerance — entered by the user | Valid |
| Planned Batch Quantity | `{TD.plannedBatchQuantity}` | Target quantity from order header — displayed by system | Valid |
| Scrap Quantity | `{TD.scrapQuantity}` | Scrap quantity (zero for this scenario) — entered by the user | Valid (0) |
| Material Number | `{TD.materialNumber}` | Material number — displayed by system after loading order | Valid |
| Unit of Measure | `{TD.uom}` | Base unit of measure — displayed by system | Valid |
| Work Center | `{TD.workCenter}` | Work center assigned to operation — displayed by system | Valid |

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
| 12 | Press Enter to confirm the Operation entry | — | SAP validates the operation; operation details are loaded including work center `{TD.workCenter}` and operation description |
| 13 | Verify that the Planned Batch Quantity is displayed | `{TD.plannedBatchQuantity}` | Planned quantity field shows the expected target quantity from the order header |
| 14 | In the "Yield" field, enter the confirmed yield quantity | `{TD.yieldQuantity}` | Yield quantity is entered into the field |
| 15 | Press Enter to confirm the Yield entry | — | SAP calculates and displays the yield variance percentage in the variance field |
| 16 | Verify that the Yield Variance is calculated and displayed | — | Yield variance percentage is shown; value is within the configured tolerance range (no warning or error indicator) |
| 17 | In the "Scrap" field, enter the scrap quantity | `{TD.scrapQuantity}` | Scrap quantity (0) is entered into the field |
| 18 | Press Enter to confirm the Scrap entry | — | Scrap field is confirmed with zero value; no scrap reason code field is highlighted as mandatory |
| 19 | Click the "Confirm" button (primary submit action) | — | SAP begins processing the confirmation |
| 20 | Observe the on-screen confirmation response | — | A success message is displayed containing the generated confirmation number |
| 21 | Note the confirmation number from the success message | — | Confirmation number is displayed (system-generated numeric format) |
| 22 | Verify that the finished goods batch quantity has been updated | `{TD.yieldQuantity}` | Batch quantity is updated to match the confirmed yield quantity |
| 23 | Navigate back to the process order list or confirmation list | — | List is displayed showing the confirmed operation with updated status |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique confirmation number is generated by SAP and displayed in the success message
- The Process Order operation is marked as confirmed with the specified yield quantity
- The yield variance percentage is calculated accurately and is within the configured tolerance
- The finished goods batch quantity is updated to reflect the confirmed yield
- No deviation record is triggered (variance is within tolerance)
- The confirmation appears in the Process Order confirmation history

---

### Post-conditions

- Process Order operation confirmation exists in SAP with the generated confirmation number
- Operation status is updated to "Confirmed" or "CONF"
- Finished goods batch quantity equals the confirmed yield quantity
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
