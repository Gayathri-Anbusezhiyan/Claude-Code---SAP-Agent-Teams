# Test Coverage Matrix: [CS-31] Review And Approve A Change Request Affecting An Approved Vendor'S Man

## Coverage Completeness

| Scenario Type | Required (min) | Generated | Status |
|---------------|---------------|-----------|--------|
| Happy Path    | ≥ 1           | 1         | PASS   |
| Alternative   | 0             | 0         | N/A    |
| Negative      | 2             | 2         | PASS   |
| Error         | 2             | 2         | PASS   |
| Edge Case     | ≥ 3           | 3         | PASS   |
| Integration   | 0             | 0         | N/A    |
| **TOTAL**     | **8**         | **8**     | **PASS** |

## Acceptance Criteria Coverage

| AC ID | Description | Test Cases Covering This AC | Status |
|-------|-------------|------------------------------|--------|
| AC-1 | User can access "My Inbox" Fiori app to review pending vendor change requests | TC-CS-031, TC-CS-032, TC-CS-034, TC-CS-035, TC-CS-036, TC-CS-037, TC-CS-038 | PASS |
| AC-2 | System flags manufacturing site changes as requiring QA approval | TC-CS-031, TC-CS-032, TC-CS-035 | PASS |
| AC-3 | Requestor can attach supporting documentation | TC-CS-031, TC-CS-036, TC-CS-037, TC-CS-038 | PASS |
| AC-4 | System prevents PO creation against vendor until QA approval granted | TC-CS-031, TC-CS-033 | PASS |
| AC-5 | System logs approver, decision, timestamp for audit trail | TC-CS-031, TC-CS-032, TC-CS-034, TC-CS-036 | PASS |
| AC-6 | Rejected changes return vendor record to previous approved state automatically | TC-CS-032 | PASS |

**AC Traceability:** 100% — all 6 ACs covered by ≥ 1 TC

---

## Quality Gate Results

| Gate | Threshold | Result | Status |
|------|-----------|--------|--------|
| AC Traceability | 100% | 6/6 ACs covered | PASS |
| HP Coverage | All 1 HP scenarios generated | 1 HP generated | PASS |
| NEG Coverage | All 2 NEG scenarios generated | 2 NEG generated | PASS |
| ERR Coverage | All 2 ERR scenarios generated | 2 ERR generated | PASS |
| EDGE Coverage | ≥ 3 EDGE TCs generated | 3 EDGE generated | PASS |
| Parameterization | 0 hardcoded SAP values | 0 hardcoded values found | PASS |
| Automation Eligibility | ≥ 4 TCs flagged as YES or PARTIAL | 7 automation candidates | PASS |

**Overall Quality Gate Status:** ALL PASSED

---

## Test Case Summary by Type

### Happy Path (1 TC)
- **TC-CS-031:** Review and Approve Vendor Manufacturing Site Change Request with Audit Report Attachment — CRITICAL — PARTIAL

### Negative (2 TCs)
- **TC-CS-032:** Reject Vendor Manufacturing Site Change Request and Verify Automatic Rollback — HIGH — YES
- **TC-CS-033:** Attempt to Create Purchase Order Against Vendor with Pending Change Request — HIGH — YES

### Error (2 TCs)
- **TC-CS-034:** Attempt to Submit Vendor Change Request with Missing Approval Decision — HIGH — YES
- **TC-CS-035:** Attempt to Process Change Request with Missing Vendor ID — HIGH — YES

### Edge Case (3 TCs)
- **TC-CS-036:** Approve Vendor Change Request with Maximum Length Approval Comments — MEDIUM — PARTIAL
- **TC-CS-037:** Approve Vendor Change Request with Maximum Size Attachment Upload — MEDIUM — PARTIAL
- **TC-CS-038:** Approve Vendor Change Request Without Attachment — MEDIUM — YES

---

## Automation Candidate Summary

| Automation Status | Count | Test Cases |
|------------------|-------|------------|
| YES | 5 | TC-CS-032, TC-CS-033, TC-CS-034, TC-CS-035, TC-CS-038 |
| PARTIAL | 3 | TC-CS-031, TC-CS-036, TC-CS-037 |
| NO | 0 | — |
| **TOTAL** | **8** | — |

**Automation Coverage:** 62.5% (5 YES) to 100% (including PARTIAL)

---

## Risk Coverage Analysis

All CRITICAL-risk scenarios from the risk profile have been covered:
- **HP-01** (CRITICAL): Covered by TC-CS-031
- **NEG-01** (CRITICAL): Covered by TC-CS-032
- **NEG-02** (CRITICAL): Covered by TC-CS-033
- **ERR-01** (HIGH): Covered by TC-CS-034
- **ERR-02** (HIGH): Covered by TC-CS-035
- **EDGE-01** (LOW): Covered by TC-CS-036
- **EDGE-02** (MEDIUM): Covered by TC-CS-037
- **EDGE-03** (LOW): Covered by TC-CS-038

**Risk Coverage:** 100% — all mandatory and recommended scenarios from the strategy are covered.

---

## Test Execution Recommendation

Execute test cases in this priority order:

**Priority 1 — CRITICAL (execute first):**
1. TC-CS-031: Happy Path — Approve vendor manufacturing site change request

**Priority 2 — HIGH (validate core business rules):**
2. TC-CS-032: Negative — Reject change request and verify rollback
3. TC-CS-033: Negative — Verify PO blocking for vendor with pending change
4. TC-CS-034: Error — Missing approval decision
5. TC-CS-035: Error — Missing vendor ID

**Priority 3 — MEDIUM (boundary and edge validation):**
6. TC-CS-036: Edge — Maximum length comments
7. TC-CS-037: Edge — Maximum size attachment
8. TC-CS-038: Edge — No attachment provided

---

## Notes

- All test cases follow the standard SAP Fiori login sequence (Steps 1-6) with parameterized environment variables
- All test cases navigate via search bar (not tiles) per SAP S/4HANA Cloud best practices
- All test data uses `{TD.*}` placeholders — no hardcoded SAP values
- All test cases include sign-out steps for session management
- Audit trail verification is included in HP and NEG scenarios per regulatory requirements (AC-5)
- My Inbox workflow simulation may require specific test data setup in SAP test system
- Attachment upload tests (TC-CS-037) require file system access during automation

---
