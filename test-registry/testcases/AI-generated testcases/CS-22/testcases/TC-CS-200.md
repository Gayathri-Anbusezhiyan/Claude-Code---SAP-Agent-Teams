# TC-CS-200: View Vendor Quality Scorecard for Valid Vendor with Inspection History

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
| P3 | Master Data | Vendor `{TD.vendorId}` exists, is active, and has historical inspection lot data in the QM module |
| P4 | Historical Data | Vendor `{TD.vendorId}` has completed inspection lots over the configured time period with both accepted and rejected lots |
| P5 | Historical Data | Vendor `{TD.vendorId}` has purchase orders with goods receipts to calculate on-time delivery performance |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS/CS-testdata.json` — Dataset ID: `TD-CS-022-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.vendorId}` | Vendor account number — entered by the user | Valid |
| Time Period From | `{TD.timePeriodFrom}` | Start date for scorecard calculation (e.g., 90 days ago) | Valid |
| Time Period To | `{TD.timePeriodTo}` | End date for scorecard calculation (e.g., today) | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Vendor Evaluation" | — | Search results appear listing the Vendor Evaluation application |
| 8 | Click "Vendor Evaluation" from the search results | — | Vendor Evaluation analytical app opens with filters and scorecard view |
| 9 | In the "Vendor" filter field, enter the Vendor ID | `{TD.vendorId}` | Vendor ID value is entered into the field |
| 10 | Press Enter to confirm the Vendor entry | — | SAP validates the vendor; vendor name `{TD.vendorName}` is displayed |
| 11 | In the "From Date" filter field, enter the start date | `{TD.timePeriodFrom}` | From Date is populated |
| 12 | In the "To Date" filter field, enter the end date | `{TD.timePeriodTo}` | To Date is populated |
| 13 | Click the "Go" button to execute the query | — | System calculates and displays the vendor quality scorecard |
| 14 | Verify the Vendor Name is displayed in the scorecard header | `{TD.vendorName}` | Vendor name matches the expected value |
| 15 | Verify the "Total Inspection Lots" metric is displayed | — | Total lots count is displayed as a numeric value |
| 16 | Verify the "Accepted Lots" metric is displayed | — | Accepted lots count is displayed |
| 17 | Verify the "Rejected Lots" metric is displayed | — | Rejected lots count is displayed |
| 18 | Verify the "Batch Acceptance Rate %" is calculated and displayed | `{TD.expectedAcceptanceRate}` | Acceptance rate percentage is displayed (e.g., 85.50%) |
| 19 | Verify the "On-Time Deliveries" metric is displayed | — | On-time delivery count is displayed |
| 20 | Verify the "Late Deliveries" metric is displayed | — | Late delivery count is displayed |
| 21 | Verify the "On-Time Delivery Rate %" is calculated and displayed | `{TD.expectedOTDRate}` | OTD rate percentage is displayed (e.g., 92.30%) |
| 22 | Verify a visual status indicator is displayed based on quality threshold | `{TD.expectedStatusIndicator}` | Status indicator shows Green, Yellow, or Red based on vendor performance |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The Vendor Evaluation app successfully loads and displays the vendor quality scorecard
- Batch Acceptance Rate is calculated as (Accepted Lots / Total Lots) × 100 and matches expected percentage
- On-Time Delivery Rate is calculated as (On-Time Deliveries / Total Deliveries) × 100 and matches expected percentage
- All metrics (total lots, accepted, rejected, on-time, late) are displayed with correct numeric values
- Visual status indicator (Red/Yellow/Green) is displayed based on the vendor's performance against the quality threshold
- Scorecard data is based on the configured time period (From Date to To Date)

---

### Post-conditions

- Vendor quality scorecard data is displayed for the specified vendor and time period
- No application-level errors or warnings are displayed
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
