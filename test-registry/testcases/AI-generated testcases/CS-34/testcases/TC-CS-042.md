# TC-CS-042: Attempt to Submit Sales Order with Customer ID Field Empty

**User Story:**          [CS-34] User Story SD-002
**Epic:**                N/A — no epic assigned
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
| P1 | User Role | Customer Service Representative with SO creation authorization |
| P2 | System Access | SAP Fiori Launchpad accessible at `{ENV.SAP_FIORI_URL}` |

---

### Test Data

**Dataset Reference:** `testdata/CS-34/CS-34-testdata.json` — Dataset ID: `TD-CS-034-ERR-001`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Customer ID | `{TD.emptyValue}` | Blank/empty field | Invalid (missing) |
| Material ID | `{TD.materialId}` | Controlled substance | Valid |
| Order Quantity | `{TD.orderQuantity}` | Standard quantity | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-6 | Complete login sequence | `{ENV.SAP_FIORI_URL}`, credentials | Fiori Launchpad loaded |
| 7-9 | Navigate to Create Sales Order | — | SO form opens |
| 10 | Leave Customer ID field EMPTY | `{TD.emptyValue}` | Field remains blank |
| 11 | Attempt to move to next field or save | — | System highlights Customer ID as mandatory; prevents progression |
| 12 | Verify error message | — | "Sold-To Party is a required field" or similar mandatory field error |
| 13 | Attempt to save SO | — | Save blocked; error persists |
| 14 | Verify no SO created | — | No document number generated |
| 15-17 | Sign out | — | Logged out |

---

### Expected Final Result

- NO SO created
- Customer ID field highlighted as mandatory
- Error: "Sold-To Party is required"

---

### Post-conditions

- NO SO document exists
- Mandatory field validation enforced

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
