# TC-CS-127: Call off delivery against a Scheduling Agreement by confirming a schedule line

**User Story:**          [CS-46] Maintain Customer Scheduling Agreement for hospital recurring supply
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Scheduling Agreement Call-Off
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Contract Administrator with SAP authorization to maintain Scheduling Agreements (transaction VA32) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Scheduling Agreement `{TD.schedulingAgreementNumber}` exists, is active, and has at least one open delivery schedule line |
| P4 | Master Data | The delivery schedule line has remaining quantity available for call-off |

---

### Test Data

**Dataset Reference:** `testdata/CS-46/CS-46-testdata.json` — Dataset ID: `TD-CS-046-HP-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Scheduling Agreement Number | `{TD.schedulingAgreementNumber}` | Existing scheduling agreement number — entered by the user | Valid |
| Schedule Line Number | `{TD.scheduleLineNumber}` | Delivery schedule line to call off — selected by the user | Valid |
| Call-Off Quantity | `{TD.callOffQuantity}` | Quantity to call off for delivery — entered by the user | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Scheduling Agreement" | — | Search results appear listing the Scheduling Agreement application |
| 8 | Click "Scheduling Agreement" from the search results | — | Scheduling Agreement application opens with the list view |
| 9 | In the search/filter field, enter the Scheduling Agreement number | `{TD.schedulingAgreementNumber}` | Scheduling Agreement number is entered in the filter |
| 10 | Press Enter to filter | — | The list filters to show only the specified Scheduling Agreement |
| 11 | Click the Scheduling Agreement number in the list | — | Scheduling Agreement detail view opens in display/edit mode |
| 12 | Navigate to the "Delivery Schedule Lines" tab | — | Delivery schedule lines are displayed |
| 13 | Locate the schedule line with line number `{TD.scheduleLineNumber}` | `{TD.scheduleLineNumber}` | Schedule line is visible with remaining quantity available |
| 14 | Note the "Remaining Quantity" value before call-off | — | Remaining quantity is displayed (e.g., original quantity before any call-offs) |
| 15 | Click the "Call Off" button for the selected schedule line | — | Call-off dialog or confirmation prompt appears |
| 16 | In the "Quantity" field, enter the call-off quantity | `{TD.callOffQuantity}` | Call-off quantity is entered |
| 17 | Click "Confirm" or "OK" to confirm the call-off | — | SAP processes the call-off |
| 18 | Observe the confirmation message | — | A success message is displayed confirming the call-off and referencing the delivery document created |
| 19 | Verify that the "Cumulative Quantity" field is updated | — | Cumulative quantity increases by the call-off quantity |
| 20 | Verify that the "Remaining Quantity" field is updated | — | Remaining quantity decreases by the call-off quantity (original - called off = new remaining) |
| 21 | Navigate back to the Scheduling Agreement list | — | Scheduling Agreement list is displayed |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The call-off is successfully confirmed against the delivery schedule line
- A delivery document (outbound delivery or sales order) is created in SAP
- The cumulative quantity called off is incremented by the call-off quantity
- The remaining quantity on the schedule line is decremented by the call-off quantity
- The Scheduling Agreement status remains "Active"
- No application-level errors or critical warnings are displayed

---

### Post-conditions

- Scheduling Agreement `{TD.schedulingAgreementNumber}` remains active
- Delivery schedule line `{TD.scheduleLineNumber}` has updated cumulative and remaining quantities
- A delivery document exists referencing the Scheduling Agreement and schedule line
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
