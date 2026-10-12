# TC-CS-108: Attempt to create a contract with missing Validity Start Date field

**User Story:**          [CS-27] Maintain A Purchasing Contract (Outline Agreement) With Negotiated Pri
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Purchasing Contract (Outline Agreement) Creation
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | User has the role of Procurement Officer with SAP authorization to create purchasing contracts (M_EINK_EKO) |
| P2 | System Access | SAP Fiori Launchpad is accessible at `{ENV.SAP_FIORI_URL}`; valid SAP credentials are available |
| P3 | Master Data | Supplier `{TD.validVendorId}` and material `{TD.validMaterialId}` exist and are linked in source list for plant `{TD.plant}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-27/CS-27-testdata.json` — Dataset ID: `TD-CS-027-ERR-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Supplier ID | `{TD.validVendorId}` | Approved vendor account number — entered by the user | Valid |
| Material ID | `{TD.validMaterialId}` | API material master number — entered by the user | Valid |
| Target Quantity | `{TD.targetQuantity}` | Contract target quantity — entered by the user | Valid |
| Validity Start Date | `{TD.emptyValue}` | Empty/blank value (field left empty) | Missing |
| Validity End Date | `{TD.validityEndDate}` | Contract end date — entered by the user | Valid |
| Plant | `{TD.plant}` | Receiving plant code — entered by the user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to SAP Fiori Launchpad | `{ENV.SAP_FIORI_URL}` | Login page displayed |
| 2 | Enter email | `{ENV.SAP_USERNAME}` | Email entered |
| 3 | Click "Continue" | — | Password screen appears |
| 4 | Enter password | `{ENV.SAP_PASSWORD}` | Password entered |
| 5 | Click "Continue" | — | Launchpad loads |
| 6 | Close pop-up if present | — | Pop-up dismissed |
| 7 | Search for "Manage Purchase Contracts" | — | Results appear |
| 8 | Click application | — | Application opens |
| 9 | Click "Create" | — | Form opens |
| 10 | Enter Supplier ID | `{TD.validVendorId}` | Supplier entered and validated |
| 11 | Enter Material ID | `{TD.validMaterialId}` | Material entered and validated |
| 12 | Enter Plant | `{TD.plant}` | Plant entered |
| 13 | Enter Target Quantity | `{TD.targetQuantity}` | Quantity entered |
| 14 | Leave "Valid From:*" field BLANK | `{TD.emptyValue}` | Start date field empty |
| 15 | Enter Validity End Date | `{TD.validityEndDate}` | End date entered |
| 16 | Enter pricing tier | `{TD.tier1QuantityFrom}`, `{TD.netPrice}` | Pricing entered |
| 17 | Click "Save" | — | SAP displays mandatory field error for Validity Start Date |
| 18 | Observe error message | — | Message: "Validity Start Date is mandatory" or similar |
| 19 | Verify field highlighted | — | Error indicator displayed |
| 20 | Verify contract NOT created | — | No success message or contract number |
| 21 | Sign out | — | User signed out |

---

### Expected Final Result

- SAP detects mandatory "Valid From" field is empty
- Error message displayed stating field is mandatory
- Validity Start Date field highlighted with error indicator
- Contract creation blocked; no contract persisted
- Mandatory field validation functioning correctly

---

### Post-conditions

- No contract document created
- Validation enforced successfully

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
