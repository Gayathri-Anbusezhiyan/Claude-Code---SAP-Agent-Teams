# TC-CS-154: Call off when cumulative quantity equals total quantity

**User Story:**          [CS-46] Maintain Customer Scheduling Agreement for hospital recurring supply
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Scheduling Agreement Call-off
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Contract Administrator with SAP authorization to call off Scheduling Agreements (transaction VA32) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Existing SA | An active Scheduling Agreement `{TD.schedulingAgreementNumber}` exists with total quantity `{TD.totalQuantity}` and cumulative called-off quantity nearly equal to total quantity |

---

### Test Data

**Dataset Reference:** `testdata/CS-46/CS-46-testdata.json` — Dataset ID: `TD-CS-046-EDGE-009`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Scheduling Agreement Number | `{TD.schedulingAgreementNumber}` | Valid active SA number — entered by the user | Valid |
| Call-off Quantity | `{TD.finalCalloffQuantity}` | Quantity that brings cumulative to total — entered by the user | Valid (boundary) |
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
| 12 | Note the cumulative quantity and remaining quantity | — | Cumulative quantity is close to total quantity; small remaining quantity exists |
| 13 | Select a schedule line with remaining quantity | — | Schedule line is selected |
| 14 | Click the "Call Off" button | — | Call-off dialog or entry screen opens |
| 15 | Enter the final call-off quantity that brings cumulative to total | `{TD.finalCalloffQuantity}` | Final call-off quantity is entered |
| 16 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 17 | Click the "Confirm" button to process the call-off | — | SAP begins processing the call-off |
| 18 | Observe the on-screen confirmation response | — | A success message is displayed indicating that the call-off was processed successfully; delivery document number is generated |
| 19 | Navigate back to the "Delivery Schedule Lines" tab | — | Delivery schedule lines are displayed |
| 20 | Verify that the cumulative quantity now equals the total quantity | `{TD.totalQuantity}` | Cumulative quantity = total quantity; remaining quantity = 0 |
| 21 | Verify that the Scheduling Agreement status is updated to "Fully Called Off" or "Completed" | — | SA status reflects full call-off |
| 22 | Attempt to call off additional quantity from any schedule line | — | System prevents further call-offs; error message indicates no remaining quantity |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The final call-off is processed successfully
- Cumulative quantity equals total quantity
- Remaining quantity = 0
- Scheduling Agreement status is updated to "Fully Called Off" or "Completed"
- System prevents further call-offs once cumulative = total

---

### Post-conditions

- Delivery document is created in SAP for the final call-off quantity
- Scheduling Agreement cumulative quantity = total quantity
- Remaining quantity = 0
- SA status is "Fully Called Off" or "Completed"
- No further call-offs are possible
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
