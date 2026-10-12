# Test Coverage Matrix: [CS-18] Receive Materials Into Batch-Managed Stock And Capture The Manufacturi

**Generated:** 2026-08-21
**User Story:** CS-18
**Module:** MM — Materials Management

---

## Coverage Completeness

| Scenario Type | Inventory Count | Generated | Status |
|---------------|----------------|-----------|--------|
| Happy Path    | 2 | 2 | PASS |
| Alternative   | 1 | 1 | PASS |
| Negative      | 3 | 3 | PASS |
| Error         | 3 | 3 | PASS |
| Edge Case     | 4 | 4 | PASS |
| Integration   | 1 | 1 | PASS |
| **TOTAL**     | **14** | **14** | **PASS** |

---

## Acceptance Criteria Traceability

| AC ID | Acceptance Criterion | Covered By Test Cases | Coverage Status |
|-------|---------------------|---------------------|----------------|
| AC-1 | The user can access the "Post Goods Receipt" Fiori app | TC-CS-039, TC-CS-040, TC-CS-041, TC-CS-042, TC-CS-043, TC-CS-044, TC-CS-045, TC-CS-046, TC-CS-047, TC-CS-048, TC-CS-049, TC-CS-050, TC-CS-051, TC-CS-052 (all test cases validate app access) | PASS — 100% |
| AC-2 | For batch-managed materials, the system requires entry of a batch number, manufacturing date, and expiration date before the goods receipt can be posted | TC-CS-039, TC-CS-040, TC-CS-041 (HP/AP verify all fields captured); TC-CS-045, TC-CS-046, TC-CS-047 (ERR verify mandatory enforcement); TC-CS-043, TC-CS-044 (NEG verify date validation); TC-CS-048, TC-CS-049, TC-CS-050, TC-CS-051 (EDGE verify boundary conditions) | PASS — 100% |
| AC-3 | The system automatically calculates the expiration date based on the shelf-life profile maintained in the material master, if not manually overridden | TC-CS-040 (auto-calculation), TC-CS-041 (manual override) | PASS — 100% |
| AC-4 | The system creates a new batch master record capturing vendor batch number, manufacturing date, and expiration date | TC-CS-039, TC-CS-040, TC-CS-041 (verify batch master creation); TC-CS-048 (min quantity batch creation); TC-CS-052 (INT — verify batch data visible) | PASS — 100% |
| AC-5 | The system prevents goods receipt posting if the calculated expiration date has already passed | TC-CS-042 (expired date rejection) | PASS — 100% |
| AC-6 | The batch classification data is visible in the "Display Batch" app for downstream traceability | TC-CS-039, TC-CS-040, TC-CS-041 (HP/AP verify batch display); TC-CS-052 (INT — explicit Display Batch app integration test) | PASS — 100% |

---

## Test Case Inventory

### Happy Path (HP) — 2 test cases

| TC ID | Title | Priority | Automation | ACs Covered |
|-------|-------|----------|-----------|-------------|
| TC-CS-039 | Post Goods Receipt for Batch-Managed Material with Manual Batch Entry and Date Capture | CRITICAL | YES | AC-1, AC-2, AC-4, AC-6 |
| TC-CS-040 | Post Goods Receipt for Batch-Managed Material with Auto-Calculated Expiration Date | HIGH | YES | AC-1, AC-2, AC-3, AC-4, AC-6 |

### Alternative Path (AP) — 1 test case

| TC ID | Title | Priority | Automation | ACs Covered |
|-------|-------|----------|-----------|-------------|
| TC-CS-041 | Post Goods Receipt with Manual Override of Auto-Calculated Expiration Date | MEDIUM | YES | AC-3 |

### Negative (NEG) — 3 test cases

| TC ID | Title | Priority | Automation | ACs Covered |
|-------|-------|----------|-----------|-------------|
| TC-CS-042 | Attempt to Post Goods Receipt with Expiration Date Already Passed | CRITICAL | YES | AC-5 |
| TC-CS-043 | Attempt to Post Goods Receipt with Expiration Date Earlier Than Manufacturing Date | HIGH | YES | AC-2 |
| TC-CS-044 | Attempt to Post Goods Receipt with Manufacturing Date in the Future | HIGH | YES | AC-2 |

### Error (ERR) — 3 test cases

| TC ID | Title | Priority | Automation | ACs Covered |
|-------|-------|----------|-----------|-------------|
| TC-CS-045 | Attempt to Post Goods Receipt with Batch Field Empty | HIGH | YES | AC-2 |
| TC-CS-046 | Attempt to Post Goods Receipt with Manufacturing Date Field Empty | HIGH | YES | AC-2 |
| TC-CS-047 | Attempt to Post Goods Receipt with Expiration Date Field Empty | HIGH | YES | AC-2 |

### Edge Case (EDGE) — 4 test cases

| TC ID | Title | Priority | Automation | ACs Covered |
|-------|-------|----------|-----------|-------------|
| TC-CS-048 | Post Goods Receipt with Minimum Valid Quantity | MEDIUM | PARTIAL | AC-2, AC-4 |
| TC-CS-049 | Attempt to Post Goods Receipt with Zero Quantity | MEDIUM | YES | AC-2 |
| TC-CS-050 | Post Goods Receipt with Manufacturing Date Equal to Today | MEDIUM | PARTIAL | AC-2 |
| TC-CS-051 | Post Goods Receipt with Expiration Date Equal to Manufacturing Date Plus One Day | MEDIUM | PARTIAL | AC-2, AC-3 |

### Integration (INT) — 1 test case

| TC ID | Title | Priority | Automation | ACs Covered |
|-------|-------|----------|-----------|-------------|
| TC-CS-052 | Verify Batch Classification Data Visible in Display Batch App | HIGH | PARTIAL | AC-6 |

---

## Quality Gate Results

| Gate | Threshold | Result | Status |
|------|-----------|--------|--------|
| AC Traceability | 100% — every AC covered by ≥ 1 TC | 6/6 ACs covered (100%) | PASS |
| HP Coverage | All 2 HP scenarios generated | 2/2 generated | PASS |
| AP Coverage | All 1 AP scenarios generated | 1/1 generated | PASS |
| NEG Coverage | All 3 NEG scenarios generated | 3/3 generated | PASS |
| ERR Coverage | All 3 ERR scenarios generated | 3/3 generated | PASS |
| EDGE Coverage | All 4 EDGE scenarios generated | 4/4 generated | PASS |
| INT Coverage | All 1 INT scenarios generated | 1/1 generated | PASS |
| Parameterization | 0 hardcoded SAP values | 0 hardcoded values found | PASS |
| Automation Eligibility | ≥ 50% HP/AP flagged YES | 3/3 HP+AP TCs = YES (100%) | PASS |
| Overall Automation Candidates | ≥ 50% of all TCs flagged YES or PARTIAL | 10 YES + 4 PARTIAL = 14/14 (100%) | PASS |

---

## Summary

- **Total Test Cases Generated:** 14
- **AC Coverage:** 100% (6/6 ACs fully covered)
- **Scenario Coverage:** 100% (all mandatory and recommended scenarios from risk profile generated)
- **Quality Gates:** ALL PASSED (10/10 gates)
- **Automation Readiness:** 100% (10 YES + 4 PARTIAL candidates)

All test cases are complete, parameterized, and ready for execution. Testdata file generation is the next step.

---
