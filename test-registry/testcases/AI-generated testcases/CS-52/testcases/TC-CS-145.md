# TC-CS-145: Confirm with Scrap Quantity Equal to Zero (No Scrap)

**User Story:**          [CS-52] Confirm Yield And Scrap Quantities Against A Process Order Operation
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Execution (PP)
**Feature:**             Process Order Confirmation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Supervisor with SAP authorization to confirm Process Order operations (PP_CONF authorization object) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Process Order `{TD.processOrderNumber}` exists and is released with planned batch quantity defined |
| P4 | Master Data | Operation `{TD.operationNumber}` exists in the routing for Process Order `{TD.processOrderNumber}` |
| P5 | Configuration | Scrap quantity is zero (no production loss) |

---

### Test Data

**Dataset Reference:** `testdata/CS-52/CS-52-testdata.json` — Dataset ID: `TD-CS-52-EDGE-007`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Existing process order in SAP — entered by the user | Valid |
| Operation Number | `{TD.operationNumber}` | Valid operation from order routing — entered by the user | Valid |
| Yield Quantity | `{TD.yieldQuantity}` | Confirmed yield quantity — entered by the user | Valid |
| Scrap Quantity | `{TD.zeroScrapQuantity}` | Zero scrap quantity — entered by the user | Valid (0) |
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
| 13 | In the "Yield" field, enter the confirmed yield quantity | `{TD.yieldQuantity}` | Yield quantity is entered into the field |
| 14 | Press Enter to confirm the Yield entry | — | SAP calculates and displays the yield variance percentage |
| 15 | In the "Scrap" field, enter zero as the scrap quantity | `{TD.zeroScrapQuantity}` | Zero (0) is entered into the Scrap field |
| 16 | Press Enter to confirm the Scrap entry | — | Scrap field is confirmed with zero value; Scrap Reason field is NOT highlighted as mandatory (since scrap is zero) |
| 17 | Verify that the Scrap Reason field is not mandatory | — | Scrap Reason field remains optional or disabled; no mandatory indicator is shown |
| 18 | Click the "Confirm" button (primary submit action) | — | SAP begins processing the confirmation |
| 19 | Observe the on-screen confirmation response | — | A success message is displayed containing the generated confirmation number |
| 20 | Note the confirmation number from the success message | — | Confirmation number is displayed (system-generated numeric format) |
| 21 | Verify that the finished goods batch quantity has been updated | `{TD.yieldQuantity}` | Batch quantity is updated to match the confirmed yield quantity |
| 22 | Verify that no scrap quantity is recorded | — | Scrap quantity is zero; no scrap reason code is recorded in the confirmation |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique confirmation number is generated by SAP and displayed in the success message
- The Process Order operation is confirmed with yield and zero scrap
- No scrap quantity is recorded in the confirmation
- No scrap reason code is required or recorded (conditional mandatory field is not triggered)
- The finished goods batch quantity is updated to the confirmed yield value
- The system accepts zero scrap as a valid lower boundary value

---

### Post-conditions

- Process Order operation confirmation exists in SAP with the generated confirmation number
- Operation status is updated to "Confirmed" or "CONF"
- Finished goods batch quantity equals the confirmed yield quantity
- No scrap quantity or scrap reason code is recorded
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
