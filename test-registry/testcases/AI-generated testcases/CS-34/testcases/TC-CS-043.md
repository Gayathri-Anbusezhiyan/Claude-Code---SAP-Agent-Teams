# TC-CS-043: Attempt to Submit Sales Order with Material ID Field Empty

**User Story:**          [CS-34] User Story SD-002
**Epic:**                N/A
**Module:**              Sales & Distribution (SD)
**Feature:**             Sales Order License Verification for Controlled Substances
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
| P1 | User Role | Customer Service Representative |
| P2 | System Access | SAP Fiori Launchpad accessible at `{ENV.SAP_FIORI_URL}` |
| P3 | Master Data | Customer `{TD.customerId}` exists with valid license |

---

### Test Data

**Dataset Reference:** `testdata/CS-34/CS-34-testdata.json` — Dataset ID: `TD-CS-034-ERR-002`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.customerId}` | Valid customer | Valid |
| Material ID | `{TD.emptyValue}` | Empty/blank | Invalid (missing) |
| Order Quantity | `{TD.orderQuantity}` | Standard quantity | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-9 | Login and navigate to Create SO | Standard login sequence | SO form opens |
| 10-11 | Enter valid Customer ID | `{TD.customerId}` | Customer validated; license check passes |
| 12-19 | Complete SO header (Sales Org, Channel, Division) | Valid organizational data | Header complete |
| 20 | Click "Add" in Items section | — | New item row appears |
| 21 | Leave Material field EMPTY | `{TD.emptyValue}` | Field remains blank |
| 22 | Attempt to enter quantity | `{TD.orderQuantity}` | System highlights Material as mandatory; prevents progression |
| 23 | Verify error message | — | "Material is a required field" or similar |
| 24 | Attempt to save | — | Save blocked; error persists |
| 25 | Verify no SO created | — | No document number |
| 26-28 | Sign out | — | Logged out |

---

### Expected Final Result

- NO SO created
- Material field highlighted as mandatory
- Error: "Material is a required field"

---

### Post-conditions

- NO SO exists
- Mandatory field validation enforced

---

### Actual Result

_[To be completed]_

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
