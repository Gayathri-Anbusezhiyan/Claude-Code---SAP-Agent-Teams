# TC-CS-111: Create supplier invoice with quantity exceeding GR beyond tolerance

**User Story:**          [CS-29] Perform Three-Way Match Invoice Verification For A Gmp Material Purchase  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management / Financial Accounting (MM/FI)  
**Feature:**             Three-Way Match Invoice Verification  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       ERROR  
**Priority:**            CRITICAL  
**Severity:**            CRITICAL  
**Automation Candidate:**  YES  
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Accounts Payable Clerk with SAP authorization to post supplier invoices (authorization objects F_BKPF_BUK, F_LFA1_BUK) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Purchase Order `{TD.poNumber}` exists, is released, and has a goods receipt posted for quantity `{TD.grQuantity}` |
| P4 | Master Data | Supplier `{TD.supplierId}` is active and assigned to company code `{TD.companyCode}` with valid payment terms |
| P5 | Master Data | Material `{TD.materialId}` is active and configured for plant `{TD.plant}` |
| P6 | Configuration | Posting period is open for date `{TD.postingDate}` |
| P7 | Configuration | Quantity tolerance is configured in table T169Q for company code `{TD.companyCode}` as `{TD.quantityTolerancePct}` |
| P8 | Configuration | Three-way match is active for company code `{TD.companyCode}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-29/CS-29-testdata.json` — Dataset ID: `TD-CS-29-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PO Number | `{TD.poNumber}` | Purchase order number with posted goods receipt | Valid |
| Invoice Number | `{TD.invoiceNumber}` | Unique supplier invoice number | Valid |
| Invoice Date | `{TD.invoiceDate}` | Invoice document date | Valid |
| Posting Date | `{TD.postingDate}` | Posting date within open period | Valid |
| Invoice Quantity | `{TD.invoiceQuantityExceeds}` | Invoiced quantity exceeding GR quantity beyond tolerance | Invalid (exceeds tolerance) |
| Invoice Price | `{TD.invoicePrice}` | Invoiced unit price matching PO price exactly | Valid |
| Amount | `{TD.amount}` | Total invoice amount (calculated) | Valid |
| GR Quantity | `{TD.grQuantity}` | Goods receipt quantity (reference for verification) | Valid |
| Quantity Tolerance | `{TD.quantityTolerancePct}` | Configured quantity tolerance percentage | Valid |
| Max Allowed Quantity | `{TD.maxAllowedQuantity}` | GR quantity + tolerance (reference for verification) | Valid |
| Supplier ID | `{TD.supplierId}` | Supplier account number (for verification) | Valid |
| Material ID | `{TD.materialId}` | Material number (for verification) | Valid |

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
| 7 | Click the search icon (top-right shell bar) and type "Create Supplier Invoice" | — | Search results appear listing the "Create Supplier Invoice" application |
| 8 | Click "Create Supplier Invoice" from the search results | — | "Create Supplier Invoice" application opens with a blank invoice entry form |
| 9 | In the "Purchase Order" header field, enter the PO number | `{TD.poNumber}` | PO number is entered into the field |
| 10 | Press Enter to confirm the PO number entry | — | SAP validates the PO; supplier name, material details, and quantities are auto-populated based on the PO and goods receipt |
| 11 | Verify that the Quantity field is auto-populated with the goods receipt quantity | `{TD.grQuantity}` | Quantity field displays the GR quantity |
| 12 | In the "Invoice Number" field, enter the supplier invoice number | `{TD.invoiceNumber}` | Invoice number is entered |
| 13 | In the "Invoice Date" field, enter the invoice date | `{TD.invoiceDate}` | Invoice date is entered |
| 14 | In the "Posting Date" field, enter the posting date | `{TD.postingDate}` | Posting date is entered |
| 15 | In the "Quantity" field, override the proposed quantity with the quantity that exceeds tolerance | `{TD.invoiceQuantityExceeds}` | Quantity field is updated with the value exceeding GR quantity + tolerance |
| 16 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; amount field recalculates |
| 17 | Verify that the Amount field displays the calculated total based on the exceeded quantity | — | Amount field shows exceeded quantity × unit price |
| 18 | Click the "Post" button to submit the invoice | — | SAP begins processing the invoice posting |
| 19 | Observe the system response | — | SAP displays a blocking message indicating "Quantity variance" or similar tolerance violation message |
| 20 | Verify that the invoice is posted but blocked for payment | — | Invoice document number is generated, but a payment block indicator is set; blocking reason "Quantity variance" is displayed |
| 21 | Note the invoice document number and blocking reason from the message | — | Invoice document number and blocking reason are displayed |
| 22 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 23 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 24 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A supplier invoice document number is generated by SAP
- The invoice is posted to the system but with status "Blocked for Payment"
- A blocking reason "Quantity variance" (or equivalent) is recorded on the invoice document
- The invoice does NOT appear in payment run selection until the block is removed
- The invoiced quantity `{TD.invoiceQuantityExceeds}` exceeds the maximum allowed quantity `{TD.maxAllowedQuantity}` (GR quantity + tolerance)
- The invoice is visible in "Manage Blocked Invoices" worklist for resolution

---

### Post-conditions

- Supplier invoice document exists in SAP with the generated document number
- Invoice status is "Blocked for Payment" with payment block indicator set
- Blocking reason is "Quantity variance" or similar tolerance violation code
- Invoice references the PO number `{TD.poNumber}` and goods receipt
- Three-way match validation failed: invoice quantity exceeds GR quantity beyond tolerance
- Invoice is NOT available for payment run until block is resolved

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
