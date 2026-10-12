# TC-CS-060: Verify FI Posting of Accrued Rebate Amounts at Period End

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
| P1 | Accrued Rebate | Rebate agreement `{TD.existingRebateAgreement}` has accrued amounts from eligible sales transactions |
| P2 | Period End Process | Period end settlement process is triggered |

### Test Data
**Dataset Reference:** `testdata/CS-38/CS-38-testdata.json` — Dataset ID: `TD-CS-038-INT-002`

### Expected Final Result
- FI document created with accrued rebate amounts
- Correct GL accounts debited/credited
- Rebate agreement status updated to "Settled"

### Execution Status
- [ ] Pass
- [ ] Fail
- [ ] Blocked
- [ ] Not Executed
