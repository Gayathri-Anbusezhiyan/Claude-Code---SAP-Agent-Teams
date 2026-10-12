# TC-CS-161: Multiple call-offs against the same Scheduling Agreement (cumulative tracking)

**User Story:**          [CS-46] Maintain Customer Scheduling Agreement for hospital recurring supply
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Scheduling Agreement Call-off
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ALTERNATIVE_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Contract Administrator with SAP authorization to call off Scheduling Agreements (transaction VA32) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Existing SA | An active Scheduling Agreement `{TD.schedulingAgreementNumber}` exists with total quantity `{TD.totalQuantity}` and multiple schedule lines |

---

### Test Data

**Dataset Reference:** `testdata/CS-46/CS-46-testdata.json` — Dataset ID: `TD-CS-046-AP-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Scheduling Agreement Number | `{TD.schedulingAgreementNumber}` | Valid active SA number — entered by the user | Valid |
| First Call-off Quantity | `{TD.firstCalloffQuantity}` | First call-off quantity — entered by the user | Valid |
| Second Call-off Quantity | `{TD.secondCalloffQuantity}` | Second call-off quantity — entered by the user | Valid |
| Third Call-off Quantity | `{TD.thirdCalloffQuantity}` | Third call-off quantity — entered by the user | Valid |
| Total Quantity | `{TD.totalQuantity}` | Total target quantity under SA | Valid |

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
| 11 | Navigate to the "Delivery Schedule Lines" tab | — | Delivery schedule lines are displayed with cumulative and remaining quantities |
| 12 | Note the initial cumulative quantity (should be 0) and remaining quantity (should equal total quantity) | — | Cumulative quantity = 0; remaining quantity = total quantity |
| 13 | Select the first schedule line | — | First schedule line is selected |
| 14 | Click the "Call Off" button | — | Call-off dialog or entry screen opens |
| 15 | Enter the first call-off quantity | `{TD.firstCalloffQuantity}` | First call-off quantity is entered |
| 16 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 17 | Click the "Confirm" button to process the first call-off | — | SAP begins processing the call-off |
| 18 | Observe the on-screen confirmation response | — | A success message is displayed; first delivery document number is generated |
| 19 | Note the first delivery document number | — | First delivery document number is displayed |
| 20 | Navigate back to the "Delivery Schedule Lines" tab | — | Delivery schedule lines are displayed |
| 21 | Verify that cumulative quantity is updated to reflect the first call-off | `{TD.firstCalloffQuantity}` | Cumulative quantity = first call-off quantity; remaining quantity = total - first call-off |
| 22 | Select the second schedule line | — | Second schedule line is selected |
| 23 | Click the "Call Off" button | — | Call-off dialog or entry screen opens |
| 24 | Enter the second call-off quantity | `{TD.secondCalloffQuantity}` | Second call-off quantity is entered |
| 25 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 26 | Click the "Confirm" button to process the second call-off | — | SAP begins processing the call-off |
| 27 | Observe the on-screen confirmation response | — | A success message is displayed; second delivery document number is generated |
| 28 | Note the second delivery document number | — | Second delivery document number is displayed |
| 29 | Navigate back to the "Delivery Schedule Lines" tab | — | Delivery schedule lines are displayed |
| 30 | Verify that cumulative quantity is updated to reflect both call-offs | — | Cumulative quantity = first call-off + second call-off; remaining quantity = total - cumulative |
| 31 | Select the third schedule line | — | Third schedule line is selected |
| 32 | Click the "Call Off" button | — | Call-off dialog or entry screen opens |
| 33 | Enter the third call-off quantity | `{TD.thirdCalloffQuantity}` | Third call-off quantity is entered |
| 34 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 35 | Click the "Confirm" button to process the third call-off | — | SAP begins processing the call-off |
| 36 | Observe the on-screen confirmation response | — | A success message is displayed; third delivery document number is generated |
| 37 | Note the third delivery document number | — | Third delivery document number is displayed |
| 38 | Navigate back to the "Delivery Schedule Lines" tab | — | Delivery schedule lines are displayed |
| 39 | Verify that cumulative quantity is updated to reflect all three call-offs | — | Cumulative quantity = first + second + third call-off; remaining quantity = total - cumulative |
| 40 | Verify that cumulative tracking is accurate across multiple call-offs | — | Cumulative quantity correctly sums all call-offs; remaining quantity is correctly calculated |
| 41 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 42 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 43 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Three call-offs are processed successfully against the same Scheduling Agreement
- Three delivery document numbers are generated
- Cumulative quantity is accurately tracked across all three call-offs
- Remaining quantity is correctly calculated after each call-off (total - cumulative)
- The system maintains accurate quantity tracking for multiple call-offs

---

### Post-conditions

- Three delivery documents exist in SAP (one per call-off)
- Scheduling Agreement cumulative quantity = sum of all three call-offs
- Remaining quantity = total quantity - cumulative quantity
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
