# TC-CS-133: Attempt to Confirm Process Order with Missing Posting Date Field

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
| P4 | Configuration | Posting Date field is mandatory for goods movement and process order confirmation |

---

### Test Data

**Dataset Reference:** `testdata/CS-51/CS-51-testdata.json` — Dataset ID: `TD-CS-051-ERR-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Process Order Number | `{TD.processOrderNumber}` | Process order number in Released status | Valid |
| Yield Quantity | `{TD.yieldQuantity}` | Confirmed yield quantity for the process order | Valid |
| Posting Date | `{TD.emptyValue}` | Posting Date field left blank (mandatory field) | Invalid (missing) |

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
| 11 | In the "Yield" field, enter the confirmed yield quantity | `{TD.yieldQuantity}` | Yield quantity is entered |
| 12 | Press Enter to confirm the Yield entry | — | SAP recalculates component requirements; component list is updated with required quantities |
| 13 | Observe the "Posting Date" field | — | "Posting Date" field is displayed as a mandatory field (typically marked with an asterisk "*") |
| 14 | If the "Posting Date" field is auto-populated with a default date, clear the field | — | "Posting Date" field is cleared (empty) |
| 15 | Leave the "Posting Date" field blank (do NOT enter any value) | `{TD.emptyValue}` | "Posting Date" field remains empty |
| 16 | Click the "Confirm" or "Post" button to attempt confirmation of the process order | — | SAP attempts to process the confirmation |
| 17 | Observe the system response after attempting to confirm | — | SAP displays an error message indicating that the Posting Date is mandatory (e.g., "Posting date is required", "Enter a valid posting date", "Please enter a document date", or similar validation message) |
| 18 | Verify that the "Posting Date" field is highlighted in red or marked with an error indicator | — | "Posting Date" field is highlighted in red or displays an exclamation icon / error border |
| 19 | Verify that NO Material Document Number is generated | — | No material document number is displayed; confirmation is blocked |
| 20 | Verify that the process order status remains unchanged (not confirmed) | — | Process order status remains "Released" or "In Process" (no confirmation posted) |
| 21 | Verify that an error log or message dialog displays the specific validation failure for missing posting date | — | Error message or dialog explicitly states that the "Posting Date" field is mandatory and must be filled |
| 22 | Close the error message or dialog | — | Error message is dismissed; user returns to the process order confirmation screen |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP prevents process order confirmation when the mandatory "Posting Date" field is left blank
- Error message or field validation is displayed indicating the "Posting Date" field is mandatory and must be filled
- "Posting Date" field is highlighted in red or marked with an error indicator
- NO Material Document Number is generated
- Process order status remains unchanged (not confirmed)
- System enforces mandatory field validation for posting date

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
