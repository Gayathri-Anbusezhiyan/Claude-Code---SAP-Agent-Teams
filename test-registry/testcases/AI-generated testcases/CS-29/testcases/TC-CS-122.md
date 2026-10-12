# TC-CS-122: Attempt to create supplier invoice with non-existent PO number

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
| P3 | Test Data | PO number `{TD.invalidPoNumber}` does NOT exist in the SAP system |

---

### Test Data

**Dataset Reference:** `testdata/CS-29/CS-29-testdata.json` — Dataset ID: `TD-CS-29-NEG-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Invalid PO Number | `{TD.invalidPoNumber}` | Non-existent purchase order number | Invalid |
| Invoice Number | `{TD.invoiceNumber}` | Supplier invoice number | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-6 | Complete standard login sequence | `{ENV.SAP_FIORI_URL}`, `{ENV.SAP_USERNAME}`, `{ENV.SAP_PASSWORD}` | User is logged in; Fiori home page is displayed |
| 7 | Navigate to "Create Supplier Invoice" app via search bar | — | "Create Supplier Invoice" application opens |
| 9 | In the "Purchase Order" field, enter the non-existent PO number | `{TD.invalidPoNumber}` | PO number is entered |
| 10 | Press Enter to confirm | — | SAP attempts to validate the PO |
| 11 | Observe the system response | — | SAP displays an error message indicating "Purchase order does not exist" or "PO not found" or similar |
| 12 | Verify that the PO reference field is highlighted as invalid | — | Field is marked with an error indicator |
| 13 | Verify that no supplier or material data is auto-populated | — | All dependent fields remain empty |
| 14 | Attempt to click the "Post" button | — | Post button is disabled or clicking it produces an error message preventing submission |
| 15-17 | Sign out (standard steps) | — | User is signed out |

---

### Expected Final Result

- SAP rejects the non-existent PO number with an error message
- No invoice is created
- Error message clearly indicates the PO does not exist
- User cannot proceed with invoice posting until a valid PO is entered

---

### Post-conditions

- No invoice document is created
- No changes to SAP data
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
