# TC-CS-131: Attempt to Confirm Process Order with Missing Process Order Number Field

**User Story:**          [CS-51] Perform A Goods Issue (Backflush) Of Raw Material Batches To A Process
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Process Order Goods Issue with Batch Backflush
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Operator with SAP authorization to confirm process orders and post goods movements |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Configuration | Process Order Number field is mandatory for process order confirmation |

---

### Test Data

**Dataset Reference:** `testdata/CS-51/CS-51-testdata.json` — Dataset ID: `TD-CS-051-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.emptyValue}` | Process Order Number field left blank (mandatory field) | Invalid (missing) |
| Yield Quantity | `{TD.yieldQuantity}` | Confirmed yield quantity for the process order | Valid |
| Posting Date | `{TD.postingDate}` | Goods movement posting date (today's date) | Valid |

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
| 8 | Click "Confirm Process Order" from the search results | — | "Confirm Process Order" application opens |
| 9 | Observe the "Order" field (Process Order Number field) | — | "Order" field is displayed as a mandatory field (typically marked with an asterisk "*") |
| 10 | Leave the "Order" field blank (do NOT enter any value) | `{TD.emptyValue}` | "Order" field remains empty |
| 11 | Attempt to navigate to the next field or press Enter in the empty "Order" field | — | SAP displays an error message or field validation indicating that the Process Order Number is mandatory (e.g., "Order number is required", "Enter a valid order number", or field is highlighted in red) |
| 12 | Verify that the "Order" field is highlighted as mandatory or shows an error indicator | — | "Order" field is highlighted in red or displays an exclamation icon / error border |
| 13 | Attempt to click the "Confirm" or "Post" button without entering the Process Order Number | — | SAP prevents the action and displays an error message stating that mandatory field "Order" must be filled (e.g., "Mandatory field 'Order' is empty", "Please enter a process order number") |
| 14 | Verify that NO process order details are loaded | — | Process order header and component details sections remain empty or disabled (no data loaded) |
| 15 | Verify that the confirmation action is blocked | — | "Confirm" or "Post" button is either disabled or clicking it produces no effect (no processing occurs) |
| 16 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 17 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 18 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP prevents process order confirmation when the mandatory "Order" field (Process Order Number) is left blank
- Error message or field validation is displayed indicating the "Order" field is mandatory and must be filled
- "Order" field is highlighted in red or marked with an error indicator
- NO process order details are loaded (no header, no components)
- "Confirm" or "Post" action is blocked; NO Material Document is generated
- System enforces mandatory field validation

---

### Post-conditions

- NO process order is loaded or confirmed
- NO Material Document is created for goods movement type 261
- No inventory changes occur
- Error message is displayed indicating missing mandatory field

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
