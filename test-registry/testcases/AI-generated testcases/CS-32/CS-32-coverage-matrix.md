# Test Coverage Matrix: [CS-32] Move Expired Batches To A Designated Blocked Storage Location Automati

## Coverage Completeness

| Scenario Type | Required (min) | Generated | Status |
|---------------|---------------|-----------|--------|
| Happy Path    | 6             | 6         | PASS   |
| Alternative   | 0             | 0         | N/A    |
| Negative      | 4             | 4         | PASS   |
| Error         | 6             | 6         | PASS   |
| Edge Case     | 4             | 4         | PASS   |
| Integration   | 0             | 0         | N/A    |
| **TOTAL**     | **20**        | **20**    | **PASS** |

## Quality Gate Results

| Gate | Threshold | Result | Status |
|------|-----------|--------|--------|
| AC Traceability | 100% — every AC covered | 6 ACs covered across 20 TCs | PASS |
| HP Coverage | All 6 HP scenarios generated | 6 HP TCs (TC-CS-031 to TC-CS-036) | PASS |
| NEG Coverage | All 4 NEG scenarios generated | 4 NEG TCs (TC-CS-037 to TC-CS-040) | PASS |
| ERR Coverage | All 6 ERR scenarios generated | 6 ERR TCs (TC-CS-041 to TC-CS-046) | PASS |
| EDGE Coverage | All 4 EDGE TCs generated | 4 EDGE TCs (TC-CS-047 to TC-CS-050) | PASS |
| Parameterization | 0 hardcoded SAP values | All test data uses {TD.*} and {ENV.*} placeholders | PASS |
| Automation Candidates | ≥ 5 TCs flagged YES | 6 TCs flagged YES (TC-CS-031, TC-CS-033, TC-CS-034, TC-CS-035, TC-CS-036, TC-CS-044, TC-CS-045, TC-CS-046) | PASS |
| Disposition Type Coverage | All 3 disposition actions (DESTROY, RETURN, REWORK) | TC-CS-033 (DESTROY), TC-CS-034 (RETURN), TC-CS-035 (REWORK) | PASS |

## Test Case Breakdown by Acceptance Criteria

| AC ID | AC Text | Covered By Test Cases | Coverage Status |
|-------|---------|----------------------|-----------------|
| AC-1 | User can access "Manage Stock" Fiori app or background job | TC-CS-031 (HP-01) | PASS |
| AC-2 | System runs daily background check comparing batch SLED to current date | TC-CS-032 (HP-02), TC-CS-037 (NEG-01), TC-CS-039 (NEG-03), TC-CS-041 (ERR-01), TC-CS-047 (EDGE-01), TC-CS-048 (EDGE-02), TC-CS-049 (EDGE-03), TC-CS-050 (EDGE-04) | PASS |
| AC-3 | Batches identified as expired are auto-restricted from unrestricted-use stock | TC-CS-032 (HP-02), TC-CS-038 (NEG-02), TC-CS-039 (NEG-03), TC-CS-040 (NEG-04), TC-CS-042 (ERR-02), TC-CS-047 (EDGE-01), TC-CS-048 (EDGE-02), TC-CS-049 (EDGE-03), TC-CS-050 (EDGE-04) | PASS |
| AC-4 | System generates notification to Warehouse and QA teams listing expired batches | TC-CS-032 (HP-02), TC-CS-037 (NEG-01), TC-CS-043 (ERR-03) | PASS |
| AC-5 | Authorized user must complete disposition (destroy, return, rework) before removal | TC-CS-033 (HP-03: DESTROY), TC-CS-034 (HP-04: RETURN), TC-CS-035 (HP-05: REWORK), TC-CS-044 (ERR-04: unauthorized), TC-CS-045 (ERR-05: missing action) | PASS |
| AC-6 | System maintains report of all expired batch dispositions for regulatory audit | TC-CS-036 (HP-06), TC-CS-046 (ERR-06) | PASS |

## Test Case List

| TC ID | Title | Scenario Type | Priority | Automation |
|-------|-------|--------------|----------|------------|
| TC-CS-031 | Access Manage Stock Fiori App and View Batch Stock Data | HP | MEDIUM | YES |
| TC-CS-032 | Background Job Identifies Expired Batch and Auto-Restricts Stock from Unrestricted to Blocked | HP | CRITICAL | PARTIAL |
| TC-CS-033 | Authorized User Completes DESTROY Disposition and Batch is Removed from Blocked Stock | HP | CRITICAL | YES |
| TC-CS-034 | Authorized User Completes RETURN Disposition and Batch is Removed from Blocked Stock | HP | CRITICAL | YES |
| TC-CS-035 | Authorized User Completes REWORK Disposition and Batch is Removed from Blocked Stock | HP | CRITICAL | YES |
| TC-CS-036 | Audit Report Displays All Expired Batch Dispositions with Timestamps and User Details | HP | CRITICAL | YES |
| TC-CS-037 | Background Job Runs But No Batches Are Expired — No Transfer Occurs | NEG | HIGH | PARTIAL |
| TC-CS-038 | Batch Is Already in Blocked Stock When Expiration Is Detected — No Duplicate Transfer | NEG | HIGH | PARTIAL |
| TC-CS-039 | Material Does Not Have Batch Management Enabled — System Skips or Logs Error | NEG | HIGH | PARTIAL |
| TC-CS-040 | Blocked Storage Location Is Not Configured in the Plant — Transfer Fails with Error | NEG | HIGH | PARTIAL |
| TC-CS-041 | Background Job Fails Due to System Error (ABAP Dump or Authorization Issue) | ERR | HIGH | NO |
| TC-CS-042 | Stock Transfer Document Creation Fails (Material Document Error) | ERR | HIGH | NO |
| TC-CS-043 | Notification Fails to Send to Warehouse/QA Teams (Email or Workflow Error) | ERR | HIGH | NO |
| TC-CS-044 | Unauthorized User Attempts to Complete Disposition — System Rejects with Authorization Error | ERR | CRITICAL | YES |
| TC-CS-045 | Disposition Action Is Not Selected (Blank) — System Prevents Submission | ERR | HIGH | YES |
| TC-CS-046 | Audit Report Fails to Generate or Displays Incomplete Data | ERR | CRITICAL | YES |
| TC-CS-047 | Batch Expires Today (SLED = Current Date) — System Must Identify as Expired | EDGE | MEDIUM | PARTIAL |
| TC-CS-048 | Batch Has Zero Unrestricted Stock (Fully Consumed) — No Transfer Needed But Batch Still Flagged | EDGE | MEDIUM | PARTIAL |
| TC-CS-049 | Multiple Batches of Same Material Expire on Same Day — All Must Be Transferred in Single Job Run | EDGE | MEDIUM | PARTIAL |
| TC-CS-050 | Batch SLED Is Null or Not Maintained — System Behavior (Skip or Error) | EDGE | MEDIUM | PARTIAL |

## Overall Quality Assessment

- **Total Test Cases:** 20
- **Coverage Completeness:** 100% — all mandatory scenario types covered
- **AC Traceability:** 100% — all 6 ACs covered by at least one test case
- **Parameterization Quality:** 100% — zero hardcoded SAP values; all data uses placeholders
- **Automation Readiness:** 8 of 20 TCs (40%) flagged YES or PARTIAL for automation
- **GMP Compliance:** All disposition workflows (DESTROY, RETURN, REWORK) have dedicated test cases
- **Regulatory Audit:** Audit report verification (TC-CS-036) and error handling (TC-CS-046) included

**Overall Status:** PASS — All quality gates met. Test suite ready for Phase 4 (Automation Script Generation).

---

**Generated:** 2026-08-23
**Generated By:** testcase-agent/skills/generate-testcases
**Prompt Version:** prompts/testcase-generation-from-userstory.md
