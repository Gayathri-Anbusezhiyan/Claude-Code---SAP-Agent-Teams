# TC-CS-181: Verify Batch with Ship Date Far in Future (30+ Days) Displays No Priority Highlight

**User Story:**          [CS-64] Review A Batch Release Dashboard Showing All Batches Pending Final Qa
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Quality Management (PP/QM)
**Feature:**             Batch Release Dashboard — Priority Highlighting (Future Ship Date)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Manager with SAP authorization to access the Batch Release Fiori app |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Batch `{TD.batchNumberFutureShip}` exists in Quality Inspection status |
| P4 | Master Data | Batch `{TD.batchNumberFutureShip}` is linked to a sales order with customer ship date `{TD.customerShipDateFuture}` at least 30 days in the future |
| P5 | Configuration | Priority highlighting logic is configured to NOT flag batches with ship dates > 7 days in the future |

---

### Test Data

**Dataset Reference:** `testdata/CS-64/CS-64-testdata.json` — Dataset ID: `TD-CS-064-EDGE-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.batchNumberFutureShip}` | Batch with ship date far in future — no priority | Valid |
| Customer Ship Date | `{TD.customerShipDateFuture}` | Ship date 30+ days in future — no priority highlight | Valid |

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
| 9 | Locate the batch row with Batch Number | `{TD.batchNumberFutureShip}` | Batch `{TD.batchNumberFutureShip}` is displayed in the dashboard table |
| 10 | Verify the Customer Ship Date column displays a date at least 30 days in the future | `{TD.customerShipDateFuture}` | Ship date `{TD.customerShipDateFuture}` is displayed and is at least 30 days after the current date |
| 11 | Verify the batch row is NOT visually highlighted or flagged with priority indicator | — | Batch row has no color highlight, icon, or visual flag; it appears as a standard row with normal styling |
| 12 | Verify the batch row appears the same as batches with no ship date (no special priority treatment) | — | Visual styling is consistent with non-priority batches |
| 13 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 14 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 15 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Batch with customer ship date far in the future (30+ days) is correctly displayed without priority highlighting
- The system does NOT apply priority highlighting to batches with ample time before ship date
- The QA Manager can prioritize urgent batches (overdue, today, approaching) over non-urgent batches with distant ship dates

---

### Post-conditions

- User has verified batch `{TD.batchNumberFutureShip}` is correctly displayed without priority highlighting
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
