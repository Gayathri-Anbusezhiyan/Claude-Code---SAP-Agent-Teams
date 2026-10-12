# TC-CS-226: Verify On-Time Delivery Calculation Uses PO Delivery Dates and GR Actual Dates

**User Story:**          [CS-22] View An Aggregated Vendor Quality Scorecard Based On Inspection Reject
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Vendor Evaluation / Quality Scorecard
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  NO
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Manager with SAP authorization to access Vendor Evaluation analytics |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Vendor `{TD.vendorId}` exists and is active in the SAP system |
| P4 | PO/GR Data | Purchase orders exist for vendor `{TD.vendorId}` with known delivery dates, and goods receipts (GR) exist with actual receipt dates |
| P5 | Cross-Module Integration | Vendor Evaluation app is configured to compare PO delivery dates with GR actual receipt dates to calculate on-time delivery performance |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS/CS-testdata.json` — Dataset ID: `TD-CS-022-INT-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.vendorId}` | Valid vendor account number with PO and GR history | Valid |
| Time Period From | `{TD.timePeriodFrom}` | Start date for scorecard calculation | Valid |
| Time Period To | `{TD.timePeriodTo}` | End date for scorecard calculation | Valid |
| PO Number | `{TD.poNumber}` | Known purchase order number for verification | Valid |
| PO Delivery Date | `{TD.poDeliveryDate}` | Expected delivery date from the purchase order | Valid |
| GR Document Number | `{TD.grDocumentNumber}` | Goods receipt document number corresponding to the PO | Valid |
| GR Actual Date | `{TD.grActualDate}` | Actual goods receipt date from the GR document | Valid |
| Expected On-Time Deliveries | `{TD.expectedOnTimeDeliveries}` | Expected count of on-time deliveries (GR date ≤ PO delivery date) | Valid |
| Expected Late Deliveries | `{TD.expectedLateDeliveries}` | Expected count of late deliveries (GR date > PO delivery date) | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Using MM module transaction or Fiori app, query purchase orders for the vendor and time period | `{TD.vendorId}`, `{TD.timePeriodFrom}`, `{TD.timePeriodTo}` | List of purchase orders is displayed with delivery dates |
| 2 | For each PO, note the delivery date (expected delivery date) | `{TD.poNumber}`, `{TD.poDeliveryDate}` | PO delivery dates are recorded (e.g., PO 4500001234: delivery date 2026-08-20) |
| 3 | Query goods receipt (GR) documents for the same purchase orders | `{TD.poNumber}` | List of GR documents is displayed with actual receipt dates |
| 4 | For each GR, note the actual goods receipt date | `{TD.grDocumentNumber}`, `{TD.grActualDate}` | GR actual dates are recorded (e.g., GR 5000001234: actual date 2026-08-18) |
| 5 | Compare GR actual date with PO delivery date for each delivery | — | Determine if delivery is on-time (GR date ≤ PO date) or late (GR date > PO date) |
| 6 | Count the total number of on-time deliveries | — | On-time deliveries count is noted (e.g., 18 deliveries) |
| 7 | Count the total number of late deliveries | — | Late deliveries count is noted (e.g., 2 deliveries) |
| 8 | Calculate the expected on-time delivery rate manually | — | Expected OTD rate = (On-Time / Total) × 100 = (18 / 20) × 100 = 90.00% |
| 9 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed with an email/username field |
| 10 | Enter the user email address in the email field | `{ENV.SAP_USERNAME}` | Email address is entered |
| 11 | Click the "Continue" button | — | Page transitions to the password entry screen |
| 12 | Enter the user password in the password field | `{ENV.SAP_PASSWORD}` | Password is entered (masked) |
| 13 | Click the "Continue" button | — | SAP authenticates the user and redirects to the Fiori Launchpad home page |
| 14 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed; Fiori home page is fully visible |
| 15 | Click the search icon (top-right shell bar) and type "Vendor Evaluation" | — | Search results appear listing the Vendor Evaluation application |
| 16 | Click "Vendor Evaluation" from the search results | — | Vendor Evaluation analytical app opens |
| 17 | In the "Vendor" filter field, enter the Vendor ID | `{TD.vendorId}` | Vendor ID value is entered |
| 18 | Press Enter to confirm the Vendor entry | — | Vendor name `{TD.vendorName}` is displayed |
| 19 | In the "From Date" filter field, enter the start date | `{TD.timePeriodFrom}` | From Date is populated |
| 20 | In the "To Date" filter field, enter the end date | `{TD.timePeriodTo}` | To Date is populated |
| 21 | Click the "Go" button to execute the query | — | System calculates and displays the vendor quality scorecard |
| 22 | Verify the "On-Time Deliveries" metric matches the manually counted value | `{TD.expectedOnTimeDeliveries}` | On-Time Deliveries displayed in scorecard = On-time count from PO/GR comparison (e.g., 18) |
| 23 | Verify the "Late Deliveries" metric matches the manually counted value | `{TD.expectedLateDeliveries}` | Late Deliveries displayed in scorecard = Late count from PO/GR comparison (e.g., 2) |
| 24 | Verify the "On-Time Delivery Rate %" matches the manually calculated value | `{TD.expectedOTDRate}` | OTD rate displayed in scorecard = Manually calculated rate from PO/GR data (e.g., 90.00%) |
| 25 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 26 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 27 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- Vendor quality scorecard on-time delivery metrics (On-Time Deliveries, Late Deliveries, OTD Rate %) exactly match the manual comparison of PO delivery dates and GR actual dates
- OTD rate calculation in the scorecard is based on accurate date comparison between MM PO and GR documents
- Cross-module data integration within MM (PO and GR documents) is verified
- On-time delivery logic (GR date ≤ PO delivery date = on-time) is correctly implemented

---

### Post-conditions

- Scorecard data is confirmed to be sourced from MM PO and GR documents
- Cross-document integration accuracy is validated
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
