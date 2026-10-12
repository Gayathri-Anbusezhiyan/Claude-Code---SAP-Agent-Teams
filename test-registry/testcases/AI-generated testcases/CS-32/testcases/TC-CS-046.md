# TC-CS-046: Audit Report Fails to Generate or Displays Incomplete Data

**User Story:**          [CS-32] Move Expired Batches To A Designated Blocked Storage Location Automati
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch Expiration Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            CRITICAL
**Severity:**            CRITICAL
**Automation Candidate:**  YES
**Estimated Effort:**    MEDIUM

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | QA Manager or Auditor with authorization to view reports |
| P2 | System Access | SAP Fiori Launchpad accessible at `{ENV.SAP_FIORI_URL}` |
| P3 | Master Data | Disposition records exist in SAP |
| P4 | Test Setup | Simulated error: report database table missing data, report authorization missing, or report program error |

---

### Test Data

**Dataset Reference:** `testdata/CS-32/CS-32-testdata.json` — Dataset ID: `TD-CS-032-ERR-006`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material for disposed batch | Valid |
| Disposition Date From | `{TD.dispositionDateFrom}` | Report filter start date | Valid |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-6 | Login to SAP Fiori | Standard login | Fiori home displayed |
| 7-8 | Navigate to Batch Disposition Audit Report app | — | Report app opens |
| 9-12 | Enter filter criteria and click Execute | `{TD.materialId}`, `{TD.dispositionDateFrom}` | Report attempts to execute |
| 13 | Observe error message or incomplete data | — | Error: "Report execution failed: database error" OR Report displays with missing columns (no Disposition Date, User, or Action) OR Report shows "No data" despite known disposition records |
| 14 | Verify error message clearly indicates failure reason | — | Message includes details: "Authorization missing for report ZMM_BATCH_DISP" or "Table ZBATCH_DISP not found" |
| 15 | Attempt to export report (if displayed) | — | Export fails OR exported file is empty/incomplete |
| 16 | Sign out | — | User signed out |

---

### Expected Final Result

- Audit report fails to generate due to system error (missing authorization, database table error, or report program error)
- Error message is displayed clearly indicating the failure reason
- OR Report displays but is incomplete: missing key columns (Disposition Date, User, Action) or shows no data despite known disposition records
- User cannot complete regulatory audit due to report failure
- IT/Administrator must resolve the underlying issue (grant authorization, fix database table, correct report program)

---

### Post-conditions

- Report failure logged
- Audit data remains inaccessible until issue resolved

---

### Actual Result

_[To be completed during test execution]_

---

### Execution Status

- [ ] Pass
- [ ] Fail
- [ ] Blocked
- [ ] Not Executed

---

### Defects / Observations

_[Record defect IDs during execution]_

---
