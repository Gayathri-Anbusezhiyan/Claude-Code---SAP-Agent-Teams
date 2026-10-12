# TC-CS-052: Create Sales Order with Minimum Order Quantity for Controlled Product

**User Story:**          [CS-41] User Story SD-009
**Epic:**                N/A — no epic assigned
**Module:**              Sales & Distribution (SD)
**Feature:**             Cross-Border Sales Order Creation with Export Compliance Screening
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    SMALL

---

### Pre-conditions

All standard preconditions for valid SO creation. Customer passes denied-party screening. Export license valid.

---

### Test Data

**Dataset Reference:** `testdata/CS-41/CS-41-testdata.json` — Dataset ID: `TD-CS-041-EDGE-003`

Includes `{TD.customerId}`, `{TD.materialId}`, `{TD.minOrderQuantity}` = 1 (minimum valid boundary), all org fields.

---

### Test Steps

1-26: Standard SO creation steps
24: Enter minimum order quantity `{TD.minOrderQuantity}` = 1
27-33: Complete compliance screening and SO confirmation
34-36: Verify SO created successfully with quantity = 1

---

### Expected Final Result

- SO created successfully with minimum order quantity (1)
- Compliance screening passes
- SO status confirmed
- Minimum quantity boundary accepted by system

---

### Execution Status

- [ ] Pass | [ ] Fail | [ ] Blocked | [ ] Not Executed

---
