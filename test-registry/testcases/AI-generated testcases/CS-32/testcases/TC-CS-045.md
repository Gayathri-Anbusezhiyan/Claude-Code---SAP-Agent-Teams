# TC-CS-045: Disposition Action Is Not Selected (Blank) — System Prevents Submission

**User Story:**          [CS-32] Move Expired Batches To A Designated Blocked Storage Location Automati
**Epic:**                N/A — no epic assigned
**Module:**              Materials Management (MM)
**Feature:**             Batch Expiration Management
**Test Type:**           FUNCTIONAL
**Scenario Type:**       ERROR
**Priority:**            HIGH
**Severity:**            MAJOR
**Automation Candidate:**  YES
**Estimated Effort:**    SMALL

---

### Pre-conditions

| # | Pre-condition | Detail |
|---|--------------|--------|
| P1 | User Role | QA/QM Authorized User with disposition authorization |
| P2 | System Access | SAP Fiori Launchpad accessible at `{ENV.SAP_FIORI_URL}` |
| P3 | Master Data | Blocked batch exists pending disposition |

---

### Test Data

**Dataset Reference:** `testdata/CS-32/CS-32-testdata.json` — Dataset ID: `TD-CS-032-ERR-005`

| Parameter | Placeholder | Description | Valid / Invalid |
|-----------|-------------|-------------|-----------------|
| Material ID | `{TD.materialId}` | Material with batch management | Valid |
| Blocked Batch Number | `{TD.blockedBatchNumber}` | Blocked batch | Valid |
| Disposition Action | `{TD.emptyValue}` | Empty/blank disposition action | Invalid (empty) |

---

### Test Steps

| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1-6 | Login to SAP Fiori | Standard login | Fiori home displayed |
| 7-8 | Navigate to Batch Disposition app | — | App opens |
| 9-11 | Search for blocked batch | `{TD.materialId}`, `{TD.blockedBatchNumber}` | Batch displayed |
| 12-13 | Select batch and click Disposition button | — | Disposition dialog opens |
| 14 | Leave Disposition Action field BLANK (do not select DESTROY/RETURN/REWORK) | `{TD.emptyValue}` | Field remains empty |
| 15 | Attempt to click Submit button | — | Submit button is disabled OR error message appears |
| 16 | If Submit enabled, observe validation error | — | Error displayed: "Disposition Action is required" or "Please select a disposition type" |
| 17 | Verify Disposition Action field is highlighted as mandatory | — | Field border is red or asterisk (*) indicates required |
| 18 | Verify disposition did NOT complete | — | Dialog remains open; no disposition record created |
| 19 | Sign out | — | User signed out |

---

### Expected Final Result

- User attempts to submit disposition without selecting a disposition action (DESTROY/RETURN/REWORK)
- System prevents submission and displays validation error: "Disposition Action is required"
- Disposition Action field is visually highlighted as mandatory
- Batch remains in Blocked status; no disposition record is created
- User must select a valid disposition action before submission is allowed

---

### Post-conditions

- Batch remains blocked
- No disposition record created

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
