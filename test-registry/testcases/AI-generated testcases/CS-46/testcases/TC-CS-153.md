# TC-CS-153: Call off exact remaining quantity (boundary condition)

**User Story:**          [CS-46] Maintain Customer Scheduling Agreement for hospital recurring supply
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Scheduling Agreement Call-off
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
| P1 | User Role | User has the role of Contract Administrator with SAP authorization to call off Scheduling Agreements (transaction VA32) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Existing SA | An active Scheduling Agreement `{TD.schedulingAgreementNumber}` exists with total quantity `{TD.totalQuantity}` and remaining quantity `{TD.remainingQuantity}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-46/CS-46-testdata.json` — Dataset ID: `TD-CS-046-EDGE-008`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Scheduling Agreement Number | `{TD.schedulingAgreementNumber}` | Valid active SA number — entered by the user | Valid |
| Call-off Quantity | `{TD.calloffQuantityExact}` | Quantity exactly equal to remaining quantity — entered by the user | Valid (boundary) |
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
| 12 | Note the remaining quantity for a schedule line | `{TD.remainingQuantity}` | Remaining quantity is displayed |
| 13 | Select a schedule line with remaining quantity | `{TD.remainingQuantity}` | Schedule line is selected |
| 14 | Click the "Call Off" button | — | Call-off dialog or entry screen opens |
| 15 | Enter a call-off quantity exactly equal to the remaining quantity | `{TD.calloffQuantityExact}` | Call-off quantity matching remaining quantity is entered |
| 16 | Press Enter to confirm the quantity entry | — | Quantity is confirmed |
| 17 | Click the "Confirm" button to process the call-off | — | SAP begins processing the call-off |
| 18 | Observe the on-screen confirmation response | — | A success message is displayed indicating that the call-off was processed successfully; delivery document number is generated |
| 19 | Navigate back to the "Delivery Schedule Lines" tab | — | Delivery schedule lines are displayed |
| 20 | Verify that the remaining quantity for the called-off schedule line is now zero | — | Remaining quantity = 0; cumulative quantity = total quantity |
| 21 | Verify that the schedule line status is updated to "Fully Called Off" or equivalent | — | Schedule line status reflects full call-off |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The call-off is processed successfully with quantity exactly equal to remaining quantity
- A delivery document number is generated
- The remaining quantity for the schedule line is updated to zero
- The schedule line status is updated to "Fully Called Off"
- The system accepts the exact remaining quantity without errors

---

### Post-conditions

- Delivery document is created in SAP for the call-off quantity
- Scheduling Agreement schedule line remaining quantity = 0
- Schedule line status is "Fully Called Off"
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
