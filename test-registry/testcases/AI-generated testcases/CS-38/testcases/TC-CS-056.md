# TC-CS-056: Create Rebate Agreement with Validity Start Date Equal to Today

**User Story:**          [CS-38] Maintain Rebate Agreements For Group Purchasing Organization (Gpo) Con
**Module:**              Sales and Distribution (SD)
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    SMALL

### Test Data
**Dataset Reference:** `testdata/CS-38/CS-38-testdata.json` — Dataset ID: `TD-CS-038-EDGE-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Validity Start Date (Today) | `{TD.validityStartDateToday}` | Start date = current date | Valid (Boundary) |

### Expected Final Result
- Agreement created with validity starting today
- Status "Active"

### Execution Status
- [ ] Pass
- [ ] Fail
- [ ] Blocked
- [ ] Not Executed
