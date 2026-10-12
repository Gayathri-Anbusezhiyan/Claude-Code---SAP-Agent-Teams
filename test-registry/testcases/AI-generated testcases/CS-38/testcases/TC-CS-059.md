# TC-CS-059: Verify Automatic Rebate Accrual When Sales Order is Created for GPO Customer

**User Story:**          [CS-38] Maintain Rebate Agreements For Group Purchasing Organization (Gpo) Con
**Module:**              Sales and Distribution (SD)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       INTEGRATION
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    LARGE

### Pre-conditions
| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | Active Rebate Agreement | A rebate agreement `{TD.existingRebateAgreement}` exists with status "Active" for customer `{TD.customerId}` and GPO `{TD.gpoId}` |
| P2 | Material in Scope | Material `{TD.materialId}` is included in the rebate agreement scope |

### Test Data
**Dataset Reference:** `testdata/CS-38/CS-38-testdata.json` — Dataset ID: `TD-CS-038-INT-001`

### Expected Final Result
- Sales order created successfully for GPO customer
- Rebate amount automatically accrued in rebate agreement
- Accrual amount calculated per configured rate and basis

### Execution Status
- [ ] Pass
- [ ] Fail
- [ ] Blocked
- [ ] Not Executed
