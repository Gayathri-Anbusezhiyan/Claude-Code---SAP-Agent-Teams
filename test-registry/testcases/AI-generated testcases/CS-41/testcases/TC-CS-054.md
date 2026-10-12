# TC-CS-054: Attempt to Create Sales Order When Export License System Unavailable

**User Story:**          [CS-41] User Story SD-009
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Cross-Border Sales Order Creation with Export Compliance Screening
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  NO
**Estimated Effort:**    LARGE

---

### Pre-conditions

Customer `{TD.customerId}` and Material `{TD.materialId}` valid. Export license management system or SAP GTS is UNAVAILABLE (timeout, connection failure, or service down).

---

### Test Data

**Dataset Reference:** `testdata/CS-41/CS-41-testdata.json` — Dataset ID: `TD-CS-041-INT-002`

All valid SO data. Integration dependency: Export license API unavailable.

---

### Test Steps

1-27: Standard SO creation steps
28: Click "Order" to trigger compliance screening
29: Denied-party screening passes
30: System attempts export license API call
31: API timeout or connection failure occurs
32: Observe error: "Export license validation service unavailable. Cannot confirm Sales Order."
33: SO blocked or deferred
34-36: Sign out

---

### Expected Final Result

- SO confirmation blocked due to export license API unavailability
- Error message indicates external service failure
- SO unconfirmed
- Audit log records integration failure

---

### Execution Status

- [ ] Pass | [ ] Fail | [ ] Blocked | [ ] Not Executed

---
