# TC-CS-051: Create Sales Order with Customer Added to Denied-Party List During Processing

**User Story:**          [CS-41] User Story SD-009
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Cross-Border Sales Order Creation with Export Compliance Screening
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  NO
**Estimated Effort:**    LARGE

---

### Pre-conditions

Customer `{TD.customerId}` passes denied-party screening at SO creation BUT is added to denied-party list BEFORE SO confirmation (temporal boundary test).

---

### Test Data

**Dataset Reference:** `testdata/CS-41/CS-41-testdata.json` — Dataset ID: `TD-CS-041-EDGE-002`

Includes `{TD.customerId}`, `{TD.materialId}`, all org fields, `{TD.deniedPartyStatus}` = CLEAR at creation, DENIED at confirmation.

---

### Test Steps

1-27: Standard SO creation steps
28: Save SO draft while customer passes denied-party check
29: Customer is added to denied-party list (test data setup or manual update)
30: Attempt to confirm SO with "Order" button
31: Real-time denied-party screening detects customer now on list
32: SO confirmation blocked with error: "Customer added to denied-party list. Cannot confirm Sales Order."
33-35: Sign out

---

### Expected Final Result

- SO draft created but NOT confirmed
- Real-time denied-party check at confirmation detects temporal change
- SO confirmation blocked with clear error message
- Audit log records temporal denied-party status change

---

### Execution Status

- [ ] Pass | [ ] Fail | [ ] Blocked | [ ] Not Executed

---
