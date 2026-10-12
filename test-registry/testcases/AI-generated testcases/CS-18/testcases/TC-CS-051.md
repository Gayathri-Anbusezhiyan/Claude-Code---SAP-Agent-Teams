# TC-CS-051: Post Goods Receipt with Expiration Date Equal to Manufacturing Date Plus One Day

**User Story:**          [CS-18] Receive Materials Into Batch-Managed Stock And Capture The Manufacturi
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch-Managed Goods Receipt Expiration Date Boundary Testing
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
| P3 | Test Condition | Expiration Date = Mfg Date + 1 day (lower boundary) |

---

### Test Data

**Dataset Reference:** `testdata/CS-18/CS-18-testdata.json` — Dataset ID: `TD-CS-18-EDGE-004`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Manufacturing Date | `{TD.manufacturingDate}` | Valid past date | Valid |
| Expiration Date | `{TD.expirationDateMfgPlus1}` | Mfg Date + 1 day | Valid |
| [All other fields] | `{TD.*}` | Valid values | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-16 | [Standard steps] | `{ENV.*}`, `{TD.*}` | Batch accepted |
| 17 | Enter Mfg Date | `{TD.manufacturingDate}` | Mfg date entered |
| 18 | Press Enter | — | Mfg date confirmed |
| 19 | Enter Expiration Date = Mfg + 1 day | `{TD.expirationDateMfgPlus1}` | Expiration date (minimal shelf life) entered |
| 20 | Press Enter | — | SAP accepts expiration date (valid: after mfg date and in future) |
| 21-25 | [Complete and post] | `{TD.*}` | Posting succeeds; document generated |
| 26-32 | [Verify batch] | `{TD.*}` | Batch shows mfg date and expiration date correctly |
| 33-35 | [Sign out] | — | Signed out |

---

### Expected Final Result

- SAP accepts expiration date = mfg date + 1 day (minimal shelf life)
- GR posted successfully
- Batch created with correct dates

---

### Post-conditions

- Document created
- Batch record exists with minimal shelf life

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
