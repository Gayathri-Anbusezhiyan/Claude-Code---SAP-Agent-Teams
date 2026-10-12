# TC-CS-203: Drill Down from Scorecard to Inspection Lot Details for Rejected Lots

**User Story:**          [CS-22] View An Aggregated Vendor Quality Scorecard Based On Inspection Reject
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Vendor Evaluation / Quality Scorecard
**Test Type:**           FUNCTIONAL
**Scenario Type:**       HAPPY_PATH
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Manager with SAP authorization to access Vendor Evaluation analytics and QM inspection data |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Vendor `{TD.vendorId}` exists with inspection history |
| P4 | Historical Data | Vendor `{TD.vendorId}` has at least one rejected inspection lot within the configured time period |

---

### Test Data

**Dataset Reference:** `test-registry/testdata/CS/CS-testdata.json` — Dataset ID: `TD-CS-022-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor ID | `{TD.vendorId}` | Vendor with rejected inspection lots | Valid |
| Time Period From | `{TD.timePeriodFrom}` | Start date for scorecard | Valid |
| Time Period To | `{TD.timePeriodTo}` | End date for scorecard | Valid |

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
| 13 | Click the "Go" button to execute the query | — | Vendor quality scorecard is displayed with metrics |
| 14 | Verify the "Rejected Lots" metric shows a value greater than zero | — | Rejected lots count is displayed (e.g., 5) |
| 15 | Locate the "Rejected Lots" metric tile or hyperlink on the scorecard | — | Rejected Lots metric is displayed as a clickable element or drill-down link |
| 16 | Click on the "Rejected Lots" metric or drill-down icon | — | System navigates to the detailed inspection lot view |
| 17 | Verify the inspection lot detail page is displayed | — | Detail view or list of rejected inspection lots is shown |
| 18 | Verify the detail view contains individual rejected inspection lot records | — | List includes inspection lot numbers, materials, rejection reasons, and dates |
| 19 | Verify that only rejected inspection lots are displayed (status = Rejected) | — | All displayed lots have rejection status; no accepted lots are shown |
| 20 | Verify the lot records are within the configured time period | — | All displayed lots have dates falling between From Date and To Date |
| 21 | Navigate back to the scorecard view | — | User returns to the vendor quality scorecard summary |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- User successfully drills down from the aggregated scorecard to the detailed inspection lot view
- Detail view displays only rejected inspection lots for the selected vendor and time period
- Each inspection lot record includes key attributes: lot number, material, rejection reason, inspection date
- All displayed lots have rejection status (not accepted or in-progress)
- Drill-down navigation is smooth; user can navigate back to the scorecard summary
- Detail data is traceable to source QM inspection lot documents

---

### Post-conditions

- Detailed inspection lot view is accessible from the scorecard
- No navigation errors or broken links are present
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
