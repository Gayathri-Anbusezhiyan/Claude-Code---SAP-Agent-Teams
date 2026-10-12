# TC-CS-117: Correct blocked invoice price to match PO and verify auto-release

**User Story:**          [CS-29] Perform Three-Way Match Invoice Verification For A Gmp Material Purchase  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management / Financial Accounting (MM/FI)  
**Feature:**             Three-Way Match Invoice Verification  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       INTEGRATION  
**Priority:**            HIGH  
**Severity:**            MAJOR  
**Automation Candidate:**  PARTIAL  
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Accounts Payable Clerk with SAP authorization to edit and release blocked invoices |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Test Data Setup | A blocked supplier invoice exists with document number `{TD.blockedInvoiceNumber}` blocked for price variance |
| P4 | Test Data Setup | Blocked invoice has invoiced price `{TD.invoicePriceIncorrect}` which exceeds PO price `{TD.poPrice}` beyond tolerance |
| P5 | Test Data Setup | Blocked invoice references PO number `{TD.poNumber}` and supplier `{TD.supplierId}` |
| P6 | Configuration | "Manage Blocked Invoices" or "Manage Supplier Invoices" Fiori app is accessible for editing blocked invoices |

---

### Test Data

**Dataset Reference:** `testdata/CS-29/CS-29-testdata.json` — Dataset ID: `TD-CS-29-INT-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Blocked Invoice Number | `{TD.blockedInvoiceNumber}` | Invoice document number blocked for price variance | Valid |
| PO Number | `{TD.poNumber}` | Purchase order referenced by the blocked invoice | Valid |
| Supplier ID | `{TD.supplierId}` | Supplier account number | Valid |
| Invoice Price Incorrect | `{TD.invoicePriceIncorrect}` | Original invoiced price exceeding PO + tolerance | Invalid (original value) |
| PO Price | `{TD.poPrice}` | PO unit price (target for correction) | Valid |
| Invoice Price Corrected | `{TD.invoicePriceCorrected}` | Corrected price matching PO price exactly | Valid |
| Blocking Reason Original | `{TD.blockingReasonOriginal}` | Original blocking reason: Price variance | Valid |
| Company Code | `{TD.companyCode}` | Company code for filtering | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Manage Blocked Invoices" | — | Search results appear listing the "Manage Blocked Invoices" application |
| 8 | Click "Manage Blocked Invoices" from the search results | — | "Manage Blocked Invoices" worklist application opens |
| 9 | In the filter bar, enter the blocked invoice document number | `{TD.blockedInvoiceNumber}` | Invoice document number is entered |
| 10 | Press Enter to apply the filter | — | Filter is applied |
| 11 | Click the "Go" button to execute the search | — | SAP queries the worklist; blocked invoice appears in the results |
| 12 | Verify that the invoice status is "Blocked for Payment" and blocking reason is "Price variance" | `{TD.blockingReasonOriginal}` | Invoice row shows blocked status with price variance reason |
| 13 | Click on the invoice row to open the invoice details | — | Invoice detail view opens |
| 14 | Click the "Edit" button (or equivalent) to enter edit mode | — | Invoice enters edit mode; fields become editable |
| 15 | Verify the current Unit Price field value | `{TD.invoicePriceIncorrect}` | Unit Price field shows the incorrect price that caused the block |
| 16 | In the "Unit Price" field, change the value to the corrected price matching PO | `{TD.invoicePriceCorrected}` | Unit Price field is updated with the corrected value matching `{TD.poPrice}` |
| 17 | Press Enter to confirm the price correction | — | Price is confirmed; amount field recalculates |
| 18 | Click the "Save" or "Post" button to save the correction | — | SAP begins processing the invoice update |
| 19 | Observe the system response | — | A success message is displayed indicating the invoice has been updated |
| 20 | Verify that the blocking reason is removed or the payment block indicator is cleared | — | No blocking message is displayed; invoice status changes to "Released for Payment" or blocking indicator is removed |
| 21 | Navigate back to the "Manage Blocked Invoices" worklist | — | Worklist view is restored |
| 22 | Re-apply the filter for the same invoice document number and click "Go" | `{TD.blockedInvoiceNumber}` | SAP queries the worklist |
| 23 | Verify that the invoice NO LONGER appears in the blocked invoices list | — | The corrected invoice is removed from the "Manage Blocked Invoices" worklist (it is now released) |
| 24 | Navigate to "Manage Supplier Invoices" app via search bar | — | "Manage Supplier Invoices" app opens |
| 25 | Filter for the corrected invoice document number and click "Go" | `{TD.blockedInvoiceNumber}` | Invoice appears in the list |
| 26 | Verify that the invoice status is "Released for Payment" or no blocking indicator is present | — | Invoice status confirms it is released and available for payment run |
| 27 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 28 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 29 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The blocked invoice price is successfully corrected from `{TD.invoicePriceIncorrect}` to `{TD.invoicePriceCorrected}` (matching PO price)
- The invoice is automatically released for payment after the correction (no payment block remains)
- The invoice is removed from the "Manage Blocked Invoices" worklist
- The invoice status in "Manage Supplier Invoices" is "Released for Payment"
- The invoice is now available for payment run selection
- Three-way match validation now passes: corrected invoice price = PO price

---

### Post-conditions

- Supplier invoice `{TD.blockedInvoiceNumber}` has corrected price matching PO price
- Invoice status is "Released for Payment" with no payment block indicator
- Invoice no longer appears in "Manage Blocked Invoices" worklist
- Invoice is available for payment run processing
- Blocking reason "Price variance" has been resolved

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
