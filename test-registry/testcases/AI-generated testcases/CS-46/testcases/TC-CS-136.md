# TC-CS-136: Attempt to call off quantity exceeding remaining quantity under Scheduling Agreement

**User Story:**          [CS-46] Maintain Customer Scheduling Agreement for hospital recurring supply
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Scheduling Agreement Call-off
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Contract Administrator with SAP authorization to call off Scheduling Agreements (transaction VA32) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Existing SA | An active Scheduling Agreement `{TD.schedulingAgreementNumber}` exists with total quantity `{TD.totalQuantity}` and remaining quantity `{TD.remainingQuantity}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-46/CS-46-testdata.json` — Dataset ID: `TD-CS-046-NEG-007`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Scheduling Agreement Number | `{TD.schedulingAgreementNumber}` | Valid active SA number — entered by the user | Valid |
| Call-off Quantity | `{TD.calloffQuantityExceedingRemaining}` | Quantity exceeding remaining quantity — entered by the user | Invalid |
| Remaining Quantity | `{TD.remainingQuantity}` | Current remaining quantity under SA | Valid |

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
| 8 | Click "Scheduling Agreement" from the search results | — | Scheduling Agreement application opens |
| 9 | In the Scheduling Agreement list, search for the SA number | `{TD.schedulingAgreementNumber}` | The Scheduling Agreement appears in the list |
| 10 | Click the Scheduling Agreement to open it | — | The Scheduling Agreement opens in display mode |
| 11 | Navigate to the "Delivery Schedule Lines" tab | — | Delivery schedule lines are displayed with remaining quantities |
| 12 | Select a schedule line with remaining quantity | `{TD.remainingQuantity}` | Schedule line is selected |
| 13 | Click the "Call Off" button | — | Call-off dialog or entry screen opens |
| 14 | Enter a call-off quantity that exceeds the remaining quantity | `{TD.calloffQuantityExceedingRemaining}` | Call-off quantity exceeding remaining quantity is entered |
| 15 | Press Enter to confirm the quantity entry | — | SAP performs quantity validation |
| 16 | Observe the system response | — | An error message is displayed stating that the call-off quantity exceeds the remaining quantity; the "Call-off Quantity" field is highlighted as invalid |
| 17 | Attempt to proceed with confirming the call-off | — | System prevents submission; the quantity validation error persists |
| 18 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 19 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 20 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP displays an error message indicating that the call-off quantity exceeds the remaining quantity
- The "Call-off Quantity" field is highlighted as invalid
- The call-off is NOT processed
- The system prevents submission with the exceeding call-off quantity

---

### Post-conditions

- No call-off or delivery document is created in SAP
- The Scheduling Agreement remains unchanged with the original remaining quantity
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
