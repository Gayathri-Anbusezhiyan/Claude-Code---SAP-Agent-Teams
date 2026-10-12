# TC-CS-110: Create supplier invoice for GMP material PO with perfect three-way match

**User Story:**          [CS-29] Perform Three-Way Match Invoice Verification For A Gmp Material Purchase  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management / Financial Accounting (MM/FI)  
**Feature:**             Three-Way Match Invoice Verification  
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
| P1 | User Role | User has the role of Accounts Payable Clerk with SAP authorization to post supplier invoices (authorization objects F_BKPF_BUK, F_LFA1_BUK) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Purchase Order `{TD.poNumber}` exists, is released, and has a goods receipt posted for quantity `{TD.grQuantity}` |
| P4 | Master Data | Supplier `{TD.supplierId}` is active and assigned to company code `{TD.companyCode}` with valid payment terms |
| P5 | Master Data | Material `{TD.materialId}` is active and configured for plant `{TD.plant}` |
| P6 | Configuration | Posting period is open for date `{TD.postingDate}` |
| P7 | Configuration | Three-way match is active for company code `{TD.companyCode}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-29/CS-29-testdata.json` — Dataset ID: `TD-CS-29-HP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PO Number | `{TD.poNumber}` | Purchase order number with posted goods receipt | Valid |
| Invoice Number | `{TD.invoiceNumber}` | Unique supplier invoice number | Valid |
| Invoice Date | `{TD.invoiceDate}` | Invoice document date | Valid |
| Posting Date | `{TD.postingDate}` | Posting date within open period | Valid |
| Invoice Quantity | `{TD.invoiceQuantity}` | Invoiced quantity matching GR quantity exactly | Valid |
| Invoice Price | `{TD.invoicePrice}` | Invoiced unit price matching PO price exactly | Valid |
| Amount | `{TD.amount}` | Total invoice amount (calculated) | Valid |
| Supplier ID | `{TD.supplierId}` | Supplier account number (for verification) | Valid |
| Material ID | `{TD.materialId}` | Material number (for verification) | Valid |
| Plant | `{TD.plant}` | Receiving plant code (for verification) | Valid |
| Company Code | `{TD.companyCode}` | Company code (for verification) | Valid |
| GR Quantity | `{TD.grQuantity}` | Goods receipt quantity (reference for verification) | Valid |
| PO Price | `{TD.poPrice}` | PO unit price (reference for verification) | Valid |

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
| 11 | Verify that the Supplier field is auto-populated with the correct supplier | `{TD.supplierId}` | Supplier field displays the supplier ID and name from the PO |
| 12 | Verify that the Material field in the line item is auto-populated | `{TD.materialId}` | Material field displays the material number and description from the PO |
| 13 | Verify that the Quantity field is auto-populated with the goods receipt quantity | `{TD.grQuantity}` | Quantity field displays the GR quantity (matches `{TD.invoiceQuantity}` in this scenario) |
| 14 | Verify that the Unit Price field is auto-populated with the PO price | `{TD.poPrice}` | Unit Price field displays the PO net price (matches `{TD.invoicePrice}` in this scenario) |
| 15 | In the "Invoice Number" field, enter the supplier invoice number | `{TD.invoiceNumber}` | Invoice number is entered |
| 16 | In the "Invoice Date" field, enter the invoice date | `{TD.invoiceDate}` | Invoice date is entered |
| 17 | In the "Posting Date" field, enter the posting date | `{TD.postingDate}` | Posting date is entered |
| 18 | Verify that the Amount field displays the calculated total | `{TD.amount}` | Amount field shows quantity × unit price (auto-calculated by SAP) |
| 19 | Click the "Post" button to submit the invoice | — | SAP begins processing the invoice posting |
| 20 | Observe the on-screen confirmation message | — | A success message is displayed containing the newly generated invoice document number |
| 21 | Note the invoice document number from the success message | — | Invoice document number is displayed in the confirmation (format: 10-digit number) |
| 22 | Verify that no blocking message or payment block indicator is displayed | — | No blocking messages appear; invoice status is "Released for Payment" |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique supplier invoice document number is generated by SAP and displayed in the success message
- The invoice is posted successfully with status "Released for Payment" (no payment block)
- All header data (PO reference, Supplier, Invoice Date, Posting Date) is correctly stored
- All line item data (Material, Quantity matching GR quantity, Price matching PO price) is correctly stored
- No tolerance violation blocking messages are displayed
- The invoice is immediately available for payment run selection

---

### Post-conditions

- Supplier invoice document exists in SAP with the generated document number
- Invoice status is "Released for Payment" with no payment block indicator
- Invoice references the PO number `{TD.poNumber}` and goods receipt
- Three-way match validation passed: invoice quantity = GR quantity, invoice price = PO price
- Invoice amount matches the PO line item amount
- No outstanding error messages or blocking reasons exist

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
