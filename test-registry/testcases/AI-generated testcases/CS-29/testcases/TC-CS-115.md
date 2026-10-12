# TC-CS-115: Create supplier invoice with quantity variance within tolerance

**User Story:**          [CS-29] Perform Three-Way Match Invoice Verification For A Gmp Material Purchase  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management / Financial Accounting (MM/FI)  
**Feature:**             Three-Way Match Invoice Verification  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       ALTERNATIVE_PATH  
**Priority:**            HIGH  
**Severity:**            MAJOR  
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

**Dataset Reference:** `testdata/CS-29/CS-29-testdata.json` — Dataset ID: `TD-CS-29-AP-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PO Number | `{TD.poNumber}` | Purchase order number with posted goods receipt | Valid |
| Invoice Number | `{TD.invoiceNumber}` | Unique supplier invoice number | Valid |
| Invoice Date | `{TD.invoiceDate}` | Invoice document date | Valid |
| Posting Date | `{TD.postingDate}` | Posting date within open period | Valid |
| Invoice Quantity Within Tolerance | `{TD.invoiceQuantityWithinTol}` | Invoiced quantity exceeding GR quantity but within tolerance | Valid (within tolerance) |
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
| 15 | In the "Quantity" field, override the proposed quantity with a quantity within tolerance | `{TD.invoiceQuantityWithinTol}` | Quantity field is updated with a value slightly exceeding GR but within tolerance threshold |
| 16 | Press Enter to confirm the quantity entry | — | Quantity is confirmed; amount field recalculates |
| 17 | Verify that the Amount field displays the calculated total | — | Amount field shows the recalculated amount based on the quantity within tolerance |
| 18 | Click the "Post" button to submit the invoice | — | SAP begins processing the invoice posting |
| 19 | Observe the system response | — | A success message is displayed containing the newly generated invoice document number |
| 20 | Note the invoice document number from the success message | — | Invoice document number is displayed |
| 21 | Verify that NO blocking message or payment block indicator is displayed | — | No blocking messages appear; invoice is posted without quantity variance block |
| 22 | Verify that the invoice status is "Released for Payment" | — | Invoice status confirms it is released and available for payment run |
| 23 | Click the User Profile icon (top-right of the Fiori shell bar) | — | User profile menu appears |
| 24 | Click "Sign Out" | — | Sign out confirmation dialog appears |
| 25 | In the Sign Out dialog, click "OK" | — | User is signed out; SAP login page is displayed |

---

### Expected Final Result

- A unique supplier invoice document number is generated by SAP and displayed in the success message
- The invoice is posted successfully with status "Released for Payment" (no payment block)
- The quantity variance is within the configured tolerance `{TD.quantityTolerancePct}`, so no blocking occurs
- The invoiced quantity `{TD.invoiceQuantityWithinTol}` is greater than GR quantity `{TD.grQuantity}` but less than or equal to `{TD.maxAllowedQuantity}` (GR + tolerance)
- The invoice is immediately available for payment run selection
- Three-way match validation passes: quantity variance is acceptable

---

### Post-conditions

- Supplier invoice document exists in SAP with the generated document number
- Invoice status is "Released for Payment" with no payment block indicator
- Invoice references the PO number `{TD.poNumber}` and goods receipt
- Three-way match validation passed: quantity variance is within tolerance
- Invoice is available for payment run processing

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
