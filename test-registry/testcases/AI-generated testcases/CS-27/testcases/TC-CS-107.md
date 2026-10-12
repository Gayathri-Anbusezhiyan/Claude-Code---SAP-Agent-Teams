# TC-CS-107: Attempt to create a contract with both Target Quantity AND Target Value missing

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
| P3 | Master Data | Supplier `{TD.validVendorId}` and material `{TD.validMaterialId}` exist and are configured |

---

### Test Data

**Dataset Reference:** `testdata/CS-27/CS-27-testdata.json` — Dataset ID: `TD-CS-027-ERR-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Supplier ID | `{TD.validVendorId}` | Approved vendor — entered by user | Valid |
| Material ID | `{TD.validMaterialId}` | Material — entered by user | Valid |
| Target Quantity | `{TD.emptyValue}` | Empty (not entered) | Missing |
| Target Value | `{TD.emptyValue}` | Empty (not entered) | Missing |
| Plant | `{TD.plant}` | Plant code — entered by user | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-9 | Navigate to Contract creation form (standard login + navigate) | Login credentials | Contract form opens |
| 10 | Enter Supplier | `{TD.validVendorId}` | Supplier validated |
| 11 | Enter Material | `{TD.validMaterialId}` | Material validated |
| 12 | Enter Plant | `{TD.plant}` | Plant entered |
| 13 | Leave BOTH "Target Quantity" and "Target Value" fields BLANK | `{TD.emptyValue}` | Both fields empty |
| 14 | Enter validity dates | Valid dates | Dates entered |
| 15 | Enter pricing tier | Valid pricing | Pricing entered |
| 16 | Click "Save" | — | SAP error: at least one target (Qty or Value) required |
| 17 | Observe error | — | Message: "Enter either Target Quantity or Target Value" or similar |
| 18 | Verify fields highlighted | — | Error indicator on target fields |
| 19 | Verify contract NOT created | — | No contract persisted |
| 20 | Sign out | — | Signed out |

---

### Expected Final Result

- SAP detects both Target Quantity and Target Value are empty
- Error message: at least one target must be specified
- Contract creation blocked
- Validation enforced correctly

---

### Post-conditions

- No contract created
- Validation successful

---

### Actual Result

_[To be completed during test execution]_

---

### Execution Status

- [ ] Pass
- [ ] Fail
- [ ] Blocked
- [ ] Not Executed

---

### Defects / Observations

_[To be recorded]_

---
