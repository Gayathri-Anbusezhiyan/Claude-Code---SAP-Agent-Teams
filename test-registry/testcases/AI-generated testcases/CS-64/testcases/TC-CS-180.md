# TC-CS-180: Verify Batch with Ship Date Today Displays Immediate Priority Highlight

**User Story:**          [CS-64] Review A Batch Release Dashboard Showing All Batches Pending Final Qa
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Quality Management (PP/QM)
**Feature:**             Batch Release Dashboard — Priority Highlighting (Ship Date Today)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Manager with SAP authorization to access the Batch Release Fiori app |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Batch `{TD.batchNumberShipToday}` exists in Quality Inspection status |
| P4 | Master Data | Batch `{TD.batchNumberShipToday}` is linked to a sales order with customer ship date `{TD.customerShipDateToday}` equal to today's date |
| P5 | Configuration | Priority highlighting logic is configured to flag batches with ship date = today as immediate priority (e.g., orange/yellow highlight or urgent icon) |

---

### Test Data

**Dataset Reference:** `testdata/CS-64/CS-64-testdata.json` — Dataset ID: `TD-CS-064-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.batchNumberShipToday}` | Batch with ship date today — immediate priority | Valid |
| Customer Ship Date | `{TD.customerShipDateToday}` | Ship date equal to current date — triggers immediate priority highlight | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Batch Release" | — | Search results appear listing the Batch Release analytical Fiori app |
| 8 | Click the "Batch Release" app from the search results | — | Batch Release Dashboard opens displaying the batch list |
| 9 | Locate the batch row with Batch Number | `{TD.batchNumberShipToday}` | Batch `{TD.batchNumberShipToday}` is displayed in the dashboard table |
| 10 | Verify the Customer Ship Date column displays today's date | `{TD.customerShipDateToday}` | Ship date `{TD.customerShipDateToday}` is displayed and equals the current date |
| 11 | Verify the batch row is visually highlighted with an immediate priority indicator | — | Batch row is highlighted with a visual indicator (e.g., orange/yellow background color or urgent icon) indicating immediate priority |
| 12 | Verify the batch row is highlighted more prominently than batches with future ship dates but less prominently than overdue batches | — | Visual highlight for ship-today batch is moderate priority (e.g., yellow/orange) compared to overdue batches (red) and more prominent than future ship dates (no highlight or green) |
| 13 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 14 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 15 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Batch with customer ship date equal to today's date is correctly displayed with an immediate priority visual highlight
- The system applies a prominent (but not highest) priority highlighting to batches shipping today
- The QA Manager can immediately identify batches requiring same-day release action

---

### Post-conditions

- User has identified batch `{TD.batchNumberShipToday}` as requiring immediate attention based on ship date and priority highlight
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
