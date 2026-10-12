# TC-CS-174: Select Batch with No Associated Customer Ship Date and Verify No Priority Highlight

**User Story:**          [CS-64] Review A Batch Release Dashboard Showing All Batches Pending Final Qa
**Epic:**                N/A — no epic assigned
**Module:**              Production Planning & Quality Management (PP/QM)
**Feature:**             Batch Release Dashboard — Priority Highlighting Logic
**Test Type:**           FUNCTIONAL
**Scenario Type:**       NEGATIVE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of QA Manager with SAP authorization to access the Batch Release Fiori app |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Batch `{TD.batchNumberNoShipDate}` exists in Quality Inspection status |
| P4 | Master Data | Batch `{TD.batchNumberNoShipDate}` is NOT linked to any sales order with a committed customer ship date |

---

### Test Data

**Dataset Reference:** `testdata/CS-64/CS-64-testdata.json` — Dataset ID: `TD-CS-064-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Batch Number | `{TD.batchNumberNoShipDate}` | Batch with no associated customer ship date — should not be highlighted | Valid |
| Customer Ship Date | `{TD.customerShipDateNull}` | Null or blank — no ship date assigned | Invalid (missing) |

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
| 9 | Locate the batch row with Batch Number | `{TD.batchNumberNoShipDate}` | Batch `{TD.batchNumberNoShipDate}` is displayed in the dashboard table |
| 10 | Verify the Customer Ship Date column is blank or displays "N/A" for this batch | `{TD.customerShipDateNull}` | Ship date field is empty, blank, or shows "N/A" or equivalent |
| 11 | Verify the batch row is NOT visually highlighted or flagged with priority indicator | — | Batch row has no color highlight, icon, or visual flag; it appears as a standard row with normal styling |
| 12 | Verify the batch row does not have any "Urgent", "High Priority", or similar status indicator | — | No urgency or priority label is displayed for this batch |
| 13 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 14 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 15 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Batch with no associated customer ship date is correctly displayed in the dashboard without priority highlighting
- The system does NOT flag or highlight batches that have no committed ship date
- The QA Manager can distinguish between priority batches (with approaching ship dates) and non-priority batches (no ship date assigned)

---

### Post-conditions

- User has reviewed the dashboard and confirmed batch `{TD.batchNumberNoShipDate}` is not priority-flagged
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
