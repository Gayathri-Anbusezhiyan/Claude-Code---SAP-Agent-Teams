# TC-CS-101: Generate consignment settlement document and create vendor invoice automatically

**User Story:**          [CS-28] Transfer Consignment Stock Of A High-Value Biologic From Vendor-Owned  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management (MM)  
**Feature:**             Consignment Settlement and Invoice Automation  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       HAPPY_PATH  
**Priority:**            CRITICAL  
**Severity:**            CRITICAL  
**Automation Candidate:**  YES  
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Warehouse Operator with SAP authorization to execute consignment settlement (S_TCODE for MRKO) and view invoice verification (MIRO) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Vendor `{TD.vendorCode}` exists, is active, and has consignment agreement |
| P4 | Master Data | Material `{TD.materialNumber}` exists and is consignment-enabled |
| P5 | Transaction Data | At least one consignment withdrawal (Movement Type 411) has been posted for the vendor within the settlement period `{TD.settlementPeriodStart}` to `{TD.settlementPeriodEnd}` |
| P6 | Configuration | Evaluated Receipt Settlement (ERS) is configured for automatic invoice creation from settlement documents |
| P7 | Configuration | Number ranges configured for settlement documents and invoice documents |

---

### Test Data

**Dataset Reference:** `testdata/CS-28/CS-28-testdata.json` — Dataset ID: `TD-CS-028-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Vendor Code | `{TD.vendorCode}` | Consignment vendor account — entered by the user | Valid |
| Settlement Period Start | `{TD.settlementPeriodStart}` | Start date of settlement period — entered by the user | Valid |
| Settlement Period End | `{TD.settlementPeriodEnd}` | End date of settlement period — entered by the user | Valid |
| Material Number | `{TD.materialNumber}` | Material withdrawn during the period — for verification | Valid |
| Batch Number | `{TD.batchNumber}` | Batch withdrawn during the period — for verification | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Consignment Settlement" | — | Search results appear listing consignment settlement-related applications |
| 8 | Click "Consignment Settlement" from the search results | — | Consignment Settlement application opens (transaction MRKO) |
| 9 | In the "Vendor" field, enter the vendor code | `{TD.vendorCode}` | Vendor code is entered |
| 10 | Press Enter to confirm the Vendor entry | — | Vendor code is accepted; vendor name `{TD.vendorName}` is auto-populated |
| 11 | In the "Settlement Period From" field, enter the start date | `{TD.settlementPeriodStart}` | Settlement period start date is entered |
| 12 | In the "Settlement Period To" field, enter the end date | `{TD.settlementPeriodEnd}` | Settlement period end date is entered |
| 13 | Click the "Execute" or "Generate" button to create the settlement document | — | SAP retrieves all consignment withdrawals (Movement Type 411) for the vendor and period |
| 14 | Observe the settlement document item list | — | Settlement document displays a list of all consignment withdrawal line items within the period |
| 15 | Verify that the settlement document includes the material number from the prerequisite withdrawal | `{TD.materialNumber}` | Material number appears in the settlement item list |
| 16 | Verify that the settlement document includes the batch number from the prerequisite withdrawal | `{TD.batchNumber}` | Batch number appears in the settlement item list |
| 17 | Verify that the settlement document shows the withdrawal quantity | `{TD.withdrawalQuantity}` | Withdrawal quantity is displayed for the line item |
| 18 | Verify that the settlement document shows the price per unit | `{TD.price}` | Price per unit is displayed |
| 19 | Verify that the settlement document calculates the total line value (quantity × price) | `{TD.withdrawalQuantity}` × `{TD.price}` | Line item total value is calculated correctly |
| 20 | Verify that the settlement document shows a grand total for all line items | — | Grand total is displayed at the bottom of the settlement document |
| 21 | Click the "Save" or "Post" button to finalize the settlement document | — | Settlement document is saved and a settlement document number is generated |
| 22 | Note the settlement document number from the confirmation message | — | Settlement document number is displayed (system-generated) |
| 23 | Navigate to "Display Invoice Verification" app or "Invoice List" via search | — | Invoice Verification or Invoice List app opens (MIRO or MIR7) |
| 24 | Search for invoices by settlement document number or vendor code | `{TD.vendorCode}` | Invoice list is displayed |
| 25 | Verify that an invoice document has been automatically created | — | Invoice document is present in the list |
| 26 | Click on the invoice document to open it | — | Invoice document details are displayed |
| 27 | Verify that the invoice references the settlement document number | — | Settlement document number is shown in the invoice header or reference field |
| 28 | Verify that the invoice amount matches the settlement document grand total | — | Invoice amount = Settlement document grand total |
| 29 | Verify that the invoice is posted to the vendor account | `{TD.vendorCode}` | Vendor account is credited with the invoice amount |
| 30 | Navigate to "Display Accounting Document" app via search | — | Display Accounting Document app opens |
| 31 | Search for the accounting document linked to the invoice | — | Accounting document linked to the invoice is displayed |
| 32 | Verify that the accounting document contains a credit entry to the vendor account | `{TD.vendorCode}` | Credit posting to vendor account (GBB or Vendor AP account) |
| 33 | Verify that the accounting document contains a debit entry to the GR/IR Clearing account (WRX) | — | Debit posting to GR/IR Clearing account |
| 34 | Verify that the accounting document is balanced (debit = credit) | — | Total debit amount = Total credit amount |
| 35 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 36 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 37 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique Settlement Document number is generated by SAP for the consignment vendor and period
- The settlement document lists all consignment withdrawals (Movement Type 411) posted within the specified settlement period
- Each settlement line item includes: Material number, Batch number, Withdrawal quantity, Price per unit, Total line value
- The settlement document displays a grand total representing the sum of all line item values
- An Invoice Document is automatically created (via ERS or automatic invoice verification) with the settlement document as reference
- The invoice amount matches the settlement document grand total
- The invoice is posted to the vendor's liability account, correctly reflecting the consignment liability
- GR/IR Clearing account (WRX) is debited, balancing the invoice posting
- The settlement document can be used as the basis for vendor billing and payment processing

---

### Post-conditions

- SAP Settlement Document exists with the generated document number
- Settlement document status is "Posted" or "Completed"
- All consignment withdrawals within the period are included in the settlement
- Invoice Document exists with automatic creation timestamp
- Invoice references the settlement document number
- Vendor account reflects the invoice posting (accounts payable increased)
- GR/IR Clearing account is updated (if PO-based consignment)
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
