# TC-CS-202: View On-Time Delivery Performance with Valid PO and GR Data

**User Story:**          [CS-22] View An Aggregated Vendor Quality Scorecard Based On Inspection Reject
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Vendor Evaluation / Quality Scorecard
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Manager with SAP authorization to access Vendor Evaluation analytics |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Vendor `{TD.vendorId}` exists with completed purchase orders in the system |
| P4 | Historical Data | Vendor `{TD.vendorId}` has goods receipts recorded against purchase orders with delivery dates |
| P5 | Data Requirement | PO delivery dates and actual GR dates are present to calculate on-time delivery performance |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS/CS-testdata.json` — Dataset ID: `TD-CS-022-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.vendorId}` | Vendor account number with PO and GR history | Valid |
| Time Period From | `{TD.timePeriodFrom}` | Start date for OTD calculation | Valid |
| Time Period To | `{TD.timePeriodTo}` | End date for OTD calculation | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 2 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 3 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 4 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 5 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page is fully visible |
| 7 | Click the search icon (top-right shell bar) and type "Vendor Evaluation" | — | Search results appear listing the Vendor Evaluation application |
| 8 | Click "Vendor Evaluation" from the search results | — | Vendor Evaluation analytical app opens |
| 9 | In the "Vendor" filter field, enter the Vendor ID | `{TD.vendorId}` | Vendor ID value is entered |
| 10 | Press Enter to confirm the Vendor entry | — | Vendor name `{TD.vendorName}` is displayed |
| 11 | In the "From Date" filter field, enter the start date | `{TD.timePeriodFrom}` | From Date is populated |
| 12 | In the "To Date" filter field, enter the end date | `{TD.timePeriodTo}` | To Date is populated |
| 13 | Click the "Go" button to execute the query | — | System retrieves and calculates delivery performance metrics |
| 14 | Verify the "Total Deliveries" metric is displayed | — | Total number of goods receipts within the time period is shown |
| 15 | Verify the "On-Time Deliveries" metric is displayed | — | Count of deliveries where actual GR date ≤ PO delivery date is shown |
| 16 | Verify the "Late Deliveries" metric is displayed | — | Count of deliveries where actual GR date > PO delivery date is shown |
| 17 | Verify the "On-Time Delivery Rate %" is calculated and displayed | `{TD.expectedOTDRate}` | OTD rate percentage is displayed (e.g., 87.50%) |
| 18 | Verify the calculation accuracy | — | Manual calculation: (On-Time Deliveries / Total Deliveries) × 100 matches displayed percentage |
| 19 | Verify that the OTD metric is based on comparison of PO delivery date vs actual GR date | — | Tooltip or detail view confirms calculation methodology |
| 20 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 21 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 22 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- On-Time Delivery Rate is successfully calculated and displayed on the vendor quality scorecard
- Calculation is based on comparing PO delivery dates (planned) versus actual goods receipt dates
- OTD rate formula: (On-Time Deliveries / Total Deliveries) × 100 is correctly applied
- All delivery counts (total, on-time, late) are accurate and sum correctly (On-Time + Late = Total)
- OTD percentage is displayed with 2 decimal places

---

### Post-conditions

- On-time delivery performance data is displayed for the specified vendor and time period
- No data integrity issues or calculation errors are present
- System returns to the login page after sign-out

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
