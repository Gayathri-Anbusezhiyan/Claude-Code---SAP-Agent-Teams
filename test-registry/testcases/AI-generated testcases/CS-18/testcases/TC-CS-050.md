# TC-CS-050: Post Goods Receipt with Manufacturing Date Equal to Today

**User Story:**          [CS-18] Receive Materials Into Batch-Managed Stock And Capture The Manufacturi
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch-Managed Goods Receipt Date Boundary Testing
**Test Type:**           FUNCTIONAL
**Scenario Type:**       EDGE_CASE
**Priority:**            MEDIUM
**Severity:**            MINOR
**Automation Candidate:**  PARTIAL
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | Warehouse Operator |
| P2 | System Access | SAP accessible |
| P3 | Test Condition | Manufacturing Date = today (upper boundary) |

---

### Test Data

**Dataset Reference:** `testdata/CS-18/CS-18-testdata.json` — Dataset ID: `TD-CS-18-EDGE-003`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Manufacturing Date | `{TD.mfgDateToday}` | Current date | Valid |
| [All other fields] | `{TD.*}` | Valid values | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-16 | [Standard steps through batch entry] | `{ENV.*}`, `{TD.*}` | Batch accepted |
| 17 | Enter Mfg Date = today | `{TD.mfgDateToday}` | Today's date entered |
| 18 | Press Enter | — | SAP accepts today's date; expiration auto-calculated (if shelf-life profile exists) |
| 19-25 | [Complete remaining fields and post] | `{TD.*}` | Posting succeeds; document generated |
| 26-32 | [Verify batch] | `{TD.*}` | Batch shows today as mfg date |
| 33-35 | [Sign out] | — | Signed out |

---

### Expected Final Result

- SAP accepts manufacturing date = today
- GR posted successfully
- Batch created with today's manufacturing date

---

### Post-conditions

- Document created
- Batch record exists

---

### Actual Result

_[To be completed during test execution]_

---

### Execution Status

- [ ] Pass
- [ ] Fail — see Defects section
- [ ] Blocked — state reason below
- [ ] Not Executed — state reason below

---

### Defects / Observations

_[Record defect IDs, unexpected behaviours, or environment issues encountered during execution]_

---
