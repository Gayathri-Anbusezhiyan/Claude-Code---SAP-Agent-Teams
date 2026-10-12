# TC-CS-123: Attempt to create supplier invoice for PO with no goods receipt

**User Story:**          [CS-29] Perform Three-Way Match Invoice Verification For A Gmp Material Purchase  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management / Financial Accounting (MM/FI)  
**Feature:**             Three-Way Match Invoice Verification  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       NEGATIVE  
**Priority:**            MEDIUM  
**Severity:**            MAJOR  
**Automation Candidate:**  YES  
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Accounts Payable Clerk with SAP authorization to post supplier invoices |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Purchase Order `{TD.poNumberNoGR}` exists and is released, but NO goods receipt has been posted for this PO |
| P4 | Configuration | Three-way match is active for company code `{TD.companyCode}` (requires GR before invoicing) |

---

### Test Data

**Dataset Reference:** `testdata/CS-29/CS-29-testdata.json` — Dataset ID: `TD-CS-29-NEG-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PO Number No GR | `{TD.poNumberNoGR}` | Valid PO with no goods receipt posted | Valid PO, but no GR |
| Invoice Number | `{TD.invoiceNumber}` | Supplier invoice number | Valid |
| Invoice Date | `{TD.invoiceDate}` | Invoice document date | Valid |
| Posting Date | `{TD.postingDate}` | Posting date within open period | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-6 | Complete standard login sequence | `{ENV.SAP_FIORI_URL}`, `{ENV.SAP_USERNAME}`, `{ENV.SAP_PASSWORD}` | User is logged in; Fiori home page is displayed |
| 7 | Navigate to "Create Supplier Invoice" app via search bar | — | "Create Supplier Invoice" application opens |
| 9 | In the "Purchase Order" field, enter the PO number with no GR | `{TD.poNumberNoGR}` | PO number is entered |
| 10 | Press Enter to confirm | — | SAP validates the PO and auto-populates header data (supplier, org data) |
| 11 | Observe the Quantity field in the line item section | — | Quantity field is either empty, shows zero, or displays an error message indicating no GR available |
| 12 | Verify that an error or warning message is displayed | — | SAP displays a message such as "No goods receipt available for invoicing" or "Quantity available for invoicing is zero" |
| 13 | Enter invoice number, invoice date, and posting date | `{TD.invoiceNumber}`, `{TD.invoiceDate}`, `{TD.postingDate}` | Fields are populated |
| 14 | Attempt to click the "Post" button | — | SAP prevents posting or displays an error: "No quantity available for invoicing" or similar |
| 15 | Verify that no invoice document is created | — | No success message appears; invoice is NOT posted |
| 16-18 | Sign out (standard steps) | — | User is signed out |

---

### Expected Final Result

- SAP prevents invoice posting for a PO with no goods receipt
- Error message clearly indicates that no GR is available for invoicing
- No invoice document is created
- Three-way match requirement enforces GR as a prerequisite for invoicing

---

### Post-conditions

- No invoice document is created
- PO remains in its original state (no GR, no invoice)
- User receives clear error feedback

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
