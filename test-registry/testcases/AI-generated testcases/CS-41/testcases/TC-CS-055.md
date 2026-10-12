# TC-CS-055: Attempt to Create Sales Order with Customer Master Missing Destination Country

**User Story:**          [CS-41] User Story SD-009
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Cross-Border Sales Order Creation with Export Compliance Screening
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  NO
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

Customer `{TD.customerIdNoCountry}` exists but destination country data is MISSING in customer master (KNA1/ADRC). Material valid.

---

### Test Data

**Dataset Reference:** `testdata/CS-41/CS-41-testdata.json` — Dataset ID: `TD-CS-041-INT-003`

`{TD.customerIdNoCountry}` with blank country field in address. Integration: Customer Master data quality issue.

---

### Test Steps

1-19: Standard login and customer entry
20: System cannot derive destination country from customer address
21: Error displayed: "Destination country missing in customer master. Cannot determine cross-border status."
22: Compliance screening cannot proceed
23: SO blocked or flagged for manual review
24-26: Sign out

---

### Expected Final Result

- SO blocked due to missing customer master data
- Error clearly states destination country required
- Data quality issue flagged for correction

---

### Execution Status

- [ ] Pass | [ ] Fail | [ ] Blocked | [ ] Not Executed

---
