# TC-CS-056: Attempt to Create Sales Order with Material Master Missing Export Control Classification

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

Material `{TD.materialIdNoClassification}` exists but export control classification flag is MISSING or undefined in material master (MARA). Customer valid.

---

### Test Data

**Dataset Reference:** `testdata/CS-41/CS-41-testdata.json` — Dataset ID: `TD-CS-041-INT-004`

`{TD.materialIdNoClassification}` with blank export control flag. Integration: Material Master data quality issue.

---

### Test Steps

1-23: Standard SO creation steps with material entry
24: System cannot determine if material is controlled product
25: Error: "Export control classification missing in material master. Cannot perform compliance screening."
26: SO blocked or flagged
27-29: Sign out

---

### Expected Final Result

- SO blocked due to missing material classification data
- Error clearly states export control classification required
- Data quality issue flagged for correction

---

### Execution Status

- [ ] Pass | [ ] Fail | [ ] Blocked | [ ] Not Executed

---
