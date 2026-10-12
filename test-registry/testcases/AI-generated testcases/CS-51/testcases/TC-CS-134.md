# TC-CS-134: Attempt to Confirm Process Order in Incorrect Status (Locked or Closed)

**User Story:**          [CS-51] Perform A Goods Issue (Backflush) Of Raw Material Batches To A Process
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning and Control (PP)
**Feature:**             Process Order Goods Issue with Batch Backflush
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Production Operator with SAP authorization to confirm process orders and post goods movements |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data (NEGATIVE) | Process Order `{TD.invalidStatusProcessOrderNumber}` exists but is in an INVALID status for confirmation (e.g., "Locked", "Closed", "Technically Completed", or "Deleted") |
| P4 | Configuration | System is configured to prevent confirmation of process orders not in "Released" or "In Process" status |

---

### Test Data

**Dataset Reference:** `testdata/CS-51/CS-51-testdata.json` — Dataset ID: `TD-CS-051-ERR-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Invalid Status Process Order Number | `{TD.invalidStatusProcessOrderNumber}` | Process order number in incorrect status (e.g., Locked, Closed) | Invalid |
| Process Order Status | `{TD.invalidProcessOrderStatus}` | Status of the process order (e.g., "Locked", "Closed", "Technically Completed") | Invalid |
| Yield Quantity | `{TD.yieldQuantity}` | Confirmed yield quantity (for attempted confirmation) | Valid |
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
| 9 | In the "Order" field, enter the Process Order Number with invalid status | `{TD.invalidStatusProcessOrderNumber}` | Process Order Number is entered into the field |
| 10 | Press Enter to confirm the Process Order entry | — | SAP attempts to validate and load the process order |
| 11 | Observe the system response after process order validation | — | SAP either: (a) displays an error message indicating the process order status is invalid for confirmation (e.g., "Process order is locked", "Order status does not allow confirmation", "Process order is closed"); OR (b) loads the order details but displays the invalid status |
| 12 | Verify the Process Order Status field value | `{TD.invalidProcessOrderStatus}` | Process order status is displayed as `{TD.invalidProcessOrderStatus}` (e.g., "Locked", "Closed", "Technically Completed") |
| 13 | If the order details are loaded, attempt to enter the Yield Quantity | `{TD.yieldQuantity}` | Yield quantity is entered (or field may be disabled/read-only due to invalid status) |
| 14 | In the "Posting Date" field, verify or enter the posting date | `{TD.postingDate}` | Posting date is populated with today's date (or field may be disabled) |
| 15 | Click the "Confirm" or "Post" button to attempt confirmation of the process order | — | SAP attempts to process the confirmation |
| 16 | Observe the system response after attempting to confirm | — | SAP displays an error message rejecting the confirmation due to invalid process order status (e.g., "Process order status does not allow confirmation", "Order is locked and cannot be confirmed", "Closed orders cannot be confirmed", or similar blocking error) |
| 17 | Verify that NO Material Document Number is generated | — | No material document number is displayed; confirmation is blocked |
| 18 | Verify that the process order status remains unchanged | `{TD.invalidProcessOrderStatus}` | Process order status remains `{TD.invalidProcessOrderStatus}` (no change to status) |
| 19 | Verify that an error log or message dialog displays the specific validation failure for invalid process order status | `{TD.invalidStatusProcessOrderNumber}`, `{TD.invalidProcessOrderStatus}` | Error message or dialog explicitly references process order `{TD.invalidStatusProcessOrderNumber}` and indicates the status `{TD.invalidProcessOrderStatus}` prevents confirmation |
| 20 | Close the error message or dialog | — | Error message is dismissed; user returns to the process order confirmation screen |
| 21 | Navigate to "Display Process Order" application (via search bar) to verify process order status | — | "Display Process Order" application opens |
| 22 | Search for the process order `{TD.invalidStatusProcessOrderNumber}` | `{TD.invalidStatusProcessOrderNumber}` | Process order is retrieved and displayed |
| 23 | Verify that the process order status is still `{TD.invalidProcessOrderStatus}` (no confirmation occurred) | `{TD.invalidProcessOrderStatus}` | Process order status remains `{TD.invalidProcessOrderStatus}` (unchanged) |
| 24 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 25 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 26 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- SAP rejects the attempt to confirm process order `{TD.invalidStatusProcessOrderNumber}` due to invalid status `{TD.invalidProcessOrderStatus}`
- Error message is displayed explicitly stating the process order status does not allow confirmation (e.g., order is locked, closed, or technically completed)
- NO Material Document Number is generated
- Process order status remains unchanged (still `{TD.invalidProcessOrderStatus}`)
- System enforces process order status prerequisite validation

---

### Post-conditions

- Process order `{TD.invalidStatusProcessOrderNumber}` status remains `{TD.invalidProcessOrderStatus}` (unchanged)
- NO Material Document is created for goods movement type 261
- No inventory changes occur
- Error message is logged indicating invalid process order status validation failure

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
