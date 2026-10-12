# TC-CS-053: Attempt to Create Sales Order When Denied-Party Screening API Unavailable

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

Customer `{TD.customerId}` and Material `{TD.materialId}` valid. Denied-party screening API or SAP GTS is UNAVAILABLE (timeout, connection failure, or service down).

---

### Test Data

**Dataset Reference:** `testdata/CS-41/CS-41-testdata.json` — Dataset ID: `TD-CS-041-INT-001`

All valid SO data. Integration dependency: Denied-party API unavailable.

---

### Test Steps

1-27: Standard SO creation steps
28: Click "Order" to trigger compliance screening
29: System attempts denied-party API call
30: API timeout or connection failure occurs
31: Observe error message: "Denied-party screening service unavailable. Cannot confirm Sales Order at this time." or "SO blocked pending compliance check"
32: Verify SO is either blocked or deferred (not confirmed)
33-35: Sign out

---

### Expected Final Result

- SO confirmation blocked or deferred due to API unavailability
- Clear error message indicating external service failure
- SO remains unconfirmed
- Audit log records integration failure

---

### Execution Status

- [ ] Pass | [ ] Fail | [ ] Blocked | [ ] Not Executed

---
