# TC-CS-139: Confirm with Yield Quantity Equal to Zero (Full Scrap Scenario)

**User Story:**          [CS-52] Confirm Yield And Scrap Quantities Against A Process Order Operation
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Execution (PP)
**Feature:**             Process Order Confirmation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
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
| P5 | Master Data | Scrap Reason Code `{TD.scrapReasonCode}` exists in QMFE master data |
| P6 | Configuration | Yield quantity is zero (full scrap scenario) |

---

### Test Data

**Dataset Reference:** `testdata/CS-52/CS-52-testdata.json` — Dataset ID: `TD-CS-52-EDGE-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Existing process order in SAP — entered by the user | Valid |
| Operation Number | `{TD.operationNumber}` | Valid operation from order routing — entered by the user | Valid |
| Yield Quantity | `{TD.zeroYieldQuantity}` | Zero yield quantity — entered by the user | Valid (0) |
| Scrap Quantity | `{TD.scrapQuantity}` | Full scrap quantity equal to planned batch quantity — entered by the user | Valid |
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
| 13 | In the "Yield" field, enter zero as the yield quantity | `{TD.zeroYieldQuantity}` | Zero (0) is entered into the Yield field |
| 14 | Press Enter to confirm the Yield entry | — | SAP calculates and displays the yield variance percentage (will be -100% or full negative variance) |
| 15 | In the "Scrap" field, enter the full scrap quantity equal to planned batch quantity | `{TD.scrapQuantity}` | Scrap quantity is entered into the field |
| 16 | Press Enter to confirm the Scrap entry | — | Scrap field is confirmed; Scrap Reason field becomes highlighted as mandatory |
| 17 | In the "Scrap Reason" field, enter the scrap reason code | `{TD.scrapReasonCode}` | Scrap reason code is entered into the field |
| 18 | Press Enter to confirm the Scrap Reason entry | — | SAP validates the scrap reason code; scrap reason description is auto-populated |
| 19 | Click the "Confirm" button (primary submit action) | — | SAP begins processing the confirmation |
| 20 | Observe the on-screen confirmation response | — | A success message is displayed containing the generated confirmation number |
| 21 | Note the confirmation number from the success message | — | Confirmation number is displayed (system-generated numeric format) |
| 22 | Verify that the finished goods batch quantity is NOT updated (zero yield) | — | Batch quantity remains unchanged or is set to zero; no finished goods inventory is added |
| 23 | Verify that the full scrap quantity is recorded against the scrap reason code | `{TD.scrapQuantity}` | Scrap quantity is correctly recorded in the confirmation |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique confirmation number is generated by SAP and displayed in the success message
- The Process Order operation is confirmed with zero yield and full scrap
- The yield variance is -100% (full negative variance)
- No finished goods batch quantity is created or updated (zero yield)
- The full scrap quantity is recorded with the specified scrap reason code
- The system accepts zero yield as a valid boundary value

---

### Post-conditions

- Process Order operation confirmation exists in SAP with the generated confirmation number
- Operation status is updated to "Confirmed" or "CONF"
- Finished goods batch quantity is zero or unchanged
- Scrap quantity and scrap reason code are recorded in the confirmation
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
