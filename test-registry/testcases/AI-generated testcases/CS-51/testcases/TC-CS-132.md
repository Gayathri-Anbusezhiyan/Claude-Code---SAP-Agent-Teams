# TC-CS-132: Attempt to Confirm Process Order with Missing Yield Quantity Field

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
| P3 | Master Data | Process Order `{TD.processOrderNumber}` exists, is in Released status, and is assigned to plant `{TD.plant}` |
| P4 | Configuration | Yield Quantity field is mandatory for process order confirmation |

---

### Test Data

**Dataset Reference:** `testdata/CS-51/CS-51-testdata.json` — Dataset ID: `TD-CS-051-ERR-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Process order number in Released status | Valid |
| Yield Quantity | `{TD.emptyValue}` | Yield Quantity field left blank (mandatory field) | Invalid (missing) |
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
| 9 | In the "Order" field, enter the Process Order Number | `{TD.processOrderNumber}` | Process Order Number is entered into the field |
| 10 | Press Enter to confirm the Process Order entry | — | SAP validates and loads the process order details; order header information is displayed |
| 11 | Observe the "Yield" field (Yield Quantity field) | — | "Yield" field is displayed as a mandatory field (typically marked with an asterisk "*") |
| 12 | Leave the "Yield" field blank (do NOT enter any value) | `{TD.emptyValue}` | "Yield" field remains empty |
| 13 | In the "Posting Date" field, verify or enter the posting date | `{TD.postingDate}` | Posting date is populated with today's date |
| 14 | Click the "Confirm" or "Post" button to attempt confirmation of the process order | — | SAP attempts to process the confirmation |
| 15 | Observe the system response after attempting to confirm | — | SAP displays an error message indicating that the Yield Quantity is mandatory (e.g., "Yield quantity is required", "Enter a yield quantity", "Please enter an order quantity", or similar validation message) |
| 16 | Verify that the "Yield" field is highlighted in red or marked with an error indicator | — | "Yield" field is highlighted in red or displays an exclamation icon / error border |
| 17 | Verify that NO Material Document Number is generated | — | No material document number is displayed; confirmation is blocked |
| 18 | Verify that the process order status remains unchanged (not confirmed) | — | Process order status remains "Released" or "In Process" (no confirmation posted) |
| 19 | Verify that an error log or message dialog displays the specific validation failure for missing yield quantity | — | Error message or dialog explicitly states that the "Yield" field is mandatory and must be filled |
| 20 | Close the error message or dialog | — | Error message is dismissed; user returns to the process order confirmation screen |
| 21 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 22 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 23 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP prevents process order confirmation when the mandatory "Yield" field (Yield Quantity) is left blank
- Error message or field validation is displayed indicating the "Yield" field is mandatory and must be filled
- "Yield" field is highlighted in red or marked with an error indicator
- NO Material Document Number is generated
- Process order status remains unchanged (not confirmed)
- System enforces mandatory field validation

---

### Post-conditions

- Process order `{TD.processOrderNumber}` status remains "Released" or "In Process" (not confirmed)
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
