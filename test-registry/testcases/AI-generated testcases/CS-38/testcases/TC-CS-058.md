# TC-CS-058: Attempt to Create Rebate Agreement with Validity End Date Before Start Date

**User Story:**          [CS-38] Maintain Rebate Agreements For Group Purchasing Organization (Gpo) Con
**Module:**              Sales and Distribution (SD)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    SMALL

### Test Data
**Dataset Reference:** `testdata/CS-38/CS-38-testdata.json` — Dataset ID: `TD-CS-038-EDGE-007`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Validity End Date (Before) | `{TD.validityEndDateBefore}` | End date < Start date | Invalid (Boundary) |

### Expected Final Result
- SAP rejects end date before start date
- Agreement NOT created
- Validation error displayed

### Execution Status
- [ ] Pass
- [ ] Fail
- [ ] Blocked
- [ ] Not Executed
