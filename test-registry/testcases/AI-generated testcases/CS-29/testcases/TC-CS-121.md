# TC-CS-121: Create supplier invoice referencing PO with partial GR

**User Story:**          [CS-29] Perform Three-Way Match Invoice Verification For A Gmp Material Purchase  
**Epic:**                N/A — no epic assigned  
**Module:**              Materials Management / Financial Accounting (MM/FI)  
**Feature:**             Three-Way Match Invoice Verification  
**Test Type:**           FUNCTIONAL  
**Scenario Type:**       ALTERNATIVE_PATH  
**Priority:**            MEDIUM  
**Severity:**            MAJOR  
**Automation Candidate:**  PARTIAL  
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Accounts Payable Clerk with SAP authorization to post supplier invoices |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Purchase Order `{TD.poNumber}` exists with total quantity `{TD.poTotalQuantity}` and partial goods receipt posted for quantity `{TD.grQuantity}` (less than PO quantity) |
| P4 | Master Data | Supplier `{TD.supplierId}` is active and assigned to company code `{TD.companyCode}` |
| P5 | Master Data | Material `{TD.materialId}` is active and configured for plant `{TD.plant}` |
| P6 | Configuration | Posting period is open for date `{TD.postingDate}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-29/CS-29-testdata.json` — Dataset ID: `TD-CS-29-AP-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| PO Number | `{TD.poNumber}` | Purchase order with partial GR | Valid |
| PO Total Quantity | `{TD.poTotalQuantity}` | Full PO quantity | Valid |
| GR Quantity | `{TD.grQuantity}` | Partial goods receipt quantity (less than PO total) | Valid |
| Invoice Quantity | `{TD.invoiceQuantity}` | Invoiced quantity matching only received quantity (not full PO) | Valid |
| Invoice Number | `{TD.invoiceNumber}` | Unique supplier invoice number | Valid |
| Invoice Date | `{TD.invoiceDate}` | Invoice document date | Valid |
| Posting Date | `{TD.postingDate}` | Posting date within open period | Valid |
| Invoice Price | `{TD.invoicePrice}` | Invoiced unit price matching PO price | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-6 | Complete standard login sequence | `{ENV.SAP_FIORI_URL}`, `{ENV.SAP_USERNAME}`, `{ENV.SAP_PASSWORD}` | User is logged in; Fiori home page is displayed |
| 7 | Navigate to "Create Supplier Invoice" app via search bar | — | "Create Supplier Invoice" application opens |
| 9 | In the "Purchase Order" field, enter the PO number | `{TD.poNumber}` | PO number is entered |
| 10 | Press Enter to confirm | — | SAP validates the PO and auto-populates data |
| 11 | Verify that the Quantity field is auto-populated with ONLY the received GR quantity, NOT the full PO quantity | `{TD.grQuantity}` | Quantity field displays only the GR quantity (partial), NOT `{TD.poTotalQuantity}` |
| 12 | Verify that the system does NOT propose the full PO quantity for invoicing | — | Proposed quantity is limited to what has been received |
| 13 | Enter invoice number, invoice date, and posting date | `{TD.invoiceNumber}`, `{TD.invoiceDate}`, `{TD.postingDate}` | Fields are populated |
| 18 | Click the "Post" button | — | SAP processes the invoice posting |
| 19 | Observe the confirmation message | — | Success message displays the generated invoice document number |
| 21 | Verify no blocking indicator is present | — | Invoice status is "Released for Payment" |
| 23-25 | Sign out (standard steps) | — | User is signed out |

---

### Expected Final Result

- Invoice posted successfully with status "Released for Payment"
- The system correctly proposes only the received quantity from the partial GR (NOT the full PO quantity)
- Three-way match validation passes: invoice quantity matches received GR quantity
- Remaining PO open quantity (PO total - GR) is still available for future invoicing

---

### Post-conditions

- Invoice references PO with partial GR
- Invoice status is "Released for Payment"
- Invoice quantity matches only the received GR quantity
- PO remains partially open for future GRs and invoices

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
