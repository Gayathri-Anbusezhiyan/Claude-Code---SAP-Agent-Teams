# TC-CS-120: Create supplier invoice referencing PO with multiple GRs

**User Story:**          [CS-29] Perform Three-Way Match Invoice Verification For A Gmp Material Purchase  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management / Financial Accounting (MM/FI)  
**Feature:**             Three-Way Match Invoice Verification  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       ALTERNATIVE_PATH  
**Priority:**            MEDIUM  
**Severity:**            MAJOR  
**Automation Candidate:**  PARTIAL  
**Estimated Effort:**    LARGE

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Accounts Payable Clerk with SAP authorization to post supplier invoices |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Purchase Order `{TD.poNumber}` exists with multiple goods receipts posted (GR1 quantity `{TD.gr1Quantity}`, GR2 quantity `{TD.gr2Quantity}`) |
| P4 | Master Data | Supplier `{TD.supplierId}` is active and assigned to company code `{TD.companyCode}` |
| P5 | Master Data | Material `{TD.materialId}` is active and configured for plant `{TD.plant}` |
| P6 | Configuration | Posting period is open for date `{TD.postingDate}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-29/CS-29-testdata.json` — Dataset ID: `TD-CS-29-AP-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PO Number | `{TD.poNumber}` | Purchase order with multiple GRs posted | Valid |
| GR1 Quantity | `{TD.gr1Quantity}` | First goods receipt quantity | Valid |
| GR2 Quantity | `{TD.gr2Quantity}` | Second goods receipt quantity | Valid |
| Total GR Quantity | `{TD.totalGrQuantity}` | Sum of all GR quantities (GR1 + GR2) | Valid |
| Invoice Quantity | `{TD.invoiceQuantity}` | Invoiced quantity matching cumulative GR quantity | Valid |
| Invoice Number | `{TD.invoiceNumber}` | Unique supplier invoice number | Valid |
| Invoice Date | `{TD.invoiceDate}` | Invoice document date | Valid |
| Posting Date | `{TD.postingDate}` | Posting date within open period | Valid |
| Invoice Price | `{TD.invoicePrice}` | Invoiced unit price matching PO price | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the SAP Fiori Launchpad URL in the browser | `{ENV.SAP_FIORI_URL}` | SAP IDP login page is displayed |
| 2 | Enter the user email address and complete login sequence (steps 2-6 standard) | `{ENV.SAP_USERNAME}`, `{ENV.SAP_PASSWORD}` | User is logged in; Fiori home page is displayed |
| 6 | If an Introduction / Welcome pop-up appears, close it | — | Pop-up is dismissed |
| 7 | Navigate to "Create Supplier Invoice" app via search bar | — | "Create Supplier Invoice" application opens |
| 9 | In the "Purchase Order" field, enter the PO number | `{TD.poNumber}` | PO number is entered |
| 10 | Press Enter to confirm | — | SAP validates the PO and auto-populates data |
| 11 | Verify that the Quantity field is auto-populated with the cumulative open GR quantity | `{TD.totalGrQuantity}` | Quantity field displays the sum of all GRs (GR1 + GR2) |
| 12 | Enter invoice number, invoice date, and posting date | `{TD.invoiceNumber}`, `{TD.invoiceDate}`, `{TD.postingDate}` | Fields are populated |
| 18 | Click the "Post" button | — | SAP processes the invoice posting |
| 19 | Observe the confirmation message | — | Success message displays the generated invoice document number |
| 21 | Verify no blocking indicator is present | — | Invoice status is "Released for Payment" |
| 23-25 | Sign out (standard steps) | — | User is signed out |

---

### Expected Final Result

- Invoice posted successfully with status "Released for Payment"
- The system correctly proposes cumulative quantity from multiple GRs (GR1 + GR2 = `{TD.totalGrQuantity}`)
- Three-way match validation passes with cumulative GR logic

---

### Post-conditions

- Invoice references PO with multiple GRs
- Invoice status is "Released for Payment"
- Invoice quantity matches cumulative open GR quantity

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
