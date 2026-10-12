# TC-CS-113: Verify blocked invoice appears in Manage Blocked Invoices worklist

**User Story:**          [CS-29] Perform Three-Way Match Invoice Verification For A Gmp Material Purchase  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management / Financial Accounting (MM/FI)  
**Feature:**             Three-Way Match Invoice Verification  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       INTEGRATION  
**Priority:**            CRITICAL  
**Severity:**            CRITICAL  
**Automation Candidate:**  PARTIAL  
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Accounts Payable Clerk with SAP authorization to view and manage blocked invoices |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Test Data Setup | A blocked supplier invoice exists with document number `{TD.blockedInvoiceNumber}` blocked for tolerance variance (quantity or price) |
| P4 | Test Data Setup | Blocked invoice references PO number `{TD.poNumber}` and supplier `{TD.supplierId}` |
| P5 | Configuration | "Manage Blocked Invoices" Fiori app is accessible to the test user |

---

### Test Data

**Dataset Reference:** `testdata/CS-29/CS-29-testdata.json` — Dataset ID: `TD-CS-29-INT-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Blocked Invoice Number | `{TD.blockedInvoiceNumber}` | Invoice document number blocked for payment (created in TC-CS-111 or TC-CS-112) | Valid |
| PO Number | `{TD.poNumber}` | Purchase order referenced by the blocked invoice | Valid |
| Supplier ID | `{TD.supplierId}` | Supplier account number | Valid |
| Supplier Name | `{TD.supplierName}` | Supplier name (for verification) | Valid |
| Blocking Reason | `{TD.blockingReason}` | Expected blocking reason (Quantity variance or Price variance) | Valid |
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
| 8 | Click "Manage Blocked Invoices" from the search results | — | "Manage Blocked Invoices" worklist application opens with a list of blocked invoices |
| 9 | In the filter bar, locate the "Invoice Document" or "Document Number" filter field | — | Filter field for invoice document number is visible |
| 10 | Enter the blocked invoice document number in the filter field | `{TD.blockedInvoiceNumber}` | Invoice document number is entered |
| 11 | Press Enter to apply the filter | — | Filter is applied |
| 12 | Click the "Go" button to execute the search | — | SAP queries the blocked invoices worklist with the applied filter |
| 13 | Observe the search results | — | The blocked invoice `{TD.blockedInvoiceNumber}` appears in the worklist results table |
| 14 | Verify that the invoice row displays the correct supplier name | `{TD.supplierName}` | Supplier name column shows the expected supplier |
| 15 | Verify that the invoice row displays the PO reference | `{TD.poNumber}` | PO number column shows the referenced PO |
| 16 | Verify that the invoice row displays the blocking reason | `{TD.blockingReason}` | Blocking reason column shows "Quantity variance" or "Price variance" or similar |
| 17 | Verify that the invoice status is "Blocked for Payment" or equivalent | — | Status column shows blocked indicator |
| 18 | Click on the invoice row to open the invoice details | — | Invoice detail view opens showing full invoice data |
| 19 | Verify that the blocking reason is visible in the invoice details or messages section | `{TD.blockingReason}` | Blocking reason details are displayed |
| 20 | Verify that the variance details (quantity or price difference) are displayed | — | Variance amount or percentage is shown |
| 21 | Navigate back to the worklist | — | Worklist view is restored |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- The blocked invoice `{TD.blockedInvoiceNumber}` is visible in the "Manage Blocked Invoices" worklist
- The invoice row displays all key information: supplier name, PO reference, blocking reason, and blocked status
- The blocking reason clearly indicates "Quantity variance" or "Price variance" depending on which tolerance was violated
- The invoice detail view provides sufficient information for the AP Clerk to investigate and resolve the discrepancy
- The worklist integration confirms that blocked invoices are routed correctly for resolution workflow

---

### Post-conditions

- Blocked invoice remains in the "Manage Blocked Invoices" worklist until the block is resolved
- Invoice is NOT available for payment run selection
- AP Clerk has visibility to the blocking reason and can initiate resolution actions

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
