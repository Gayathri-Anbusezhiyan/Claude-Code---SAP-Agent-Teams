# TC-CS-117: Generate settlement document for period with no withdrawals

**User Story:**          [CS-28] Transfer Consignment Stock Of A High-Value Biologic From Vendor-Owned  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management (MM)  
**Feature:**             Consignment Stock Withdrawal  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       EDGE_CASE  
**Priority:**            LOW  
**Severity:**            TRIVIAL  
**Automation Candidate:**  YES  
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to execute consignment settlement (MRKO) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Vendor `{TD.vendorCode}` exists, is active, and has consignment agreement for materials |
| P4 | Configuration | Consignment settlement is configured |
| P5 | Data Condition | NO consignment withdrawals (Movement Type 411) were posted for vendor `{TD.vendorCode}` during the settlement period `{TD.settlementPeriodNoWithdrawals}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-28/CS-28-testdata.json` — Dataset ID: `TD-CS-028-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor Code | `{TD.vendorCode}` | Consignment vendor account — entered by the user | Valid |
| Settlement Period Start | `{TD.settlementPeriodStartNoWithdrawals}` | Start date of settlement period with no withdrawals | Valid |
| Settlement Period End | `{TD.settlementPeriodEndNoWithdrawals}` | End date of settlement period with no withdrawals | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Consignment Settlement" | — | Search results appear listing the Consignment Settlement application |
| 8 | Click "Consignment Settlement" from the search results | — | Consignment Settlement app opens |
| 9 | Enter the vendor code for settlement | `{TD.vendorCode}` | Vendor code is entered |
| 10 | Press Enter to confirm the Vendor entry | — | Vendor code is accepted |
| 11 | Define the settlement period: start date and end date for a period with no withdrawals | `{TD.settlementPeriodStartNoWithdrawals}`, `{TD.settlementPeriodEndNoWithdrawals}` | Settlement period dates are entered |
| 12 | Execute the settlement run for the vendor | — | Settlement document generation is initiated |
| 13 | Observe the settlement document generation result | — | System displays a message indicating no data found, no line items to settle, or settlement document is not generated |
| 14 | Verify the system message contains text indicating no consignment withdrawals found, no line items to settle, or no settlement document created | — | Message pattern: "No data found", "No line items for settlement", "No consignment withdrawals in period", or similar SAP message |
| 15 | Verify that no settlement document number is generated | — | No settlement document number is displayed |
| 16 | Verify the Consignment Settlement form remains open or returns to initial state | — | Form is ready for a new settlement run; no document created |
| 17 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 18 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 19 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The system detects that no consignment withdrawals occurred during the settlement period
- A message is displayed containing text such as "No data found", "No line items for settlement", or "No consignment withdrawals in period"
- No Settlement Document number is generated
- The settlement run completes without errors
- This edge case validates that the system correctly handles periods with no activity without generating empty settlement documents

---

### Post-conditions

- No Settlement Document is created for the period
- No invoice verification is triggered
- The system correctly handles the no-data scenario without errors
- The Consignment Settlement app is ready for a new settlement run

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
