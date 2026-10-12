# Test Coverage Matrix: [CS-29] Perform Three-Way Match Invoice Verification For A Gmp Material Purchase

## Coverage Completeness

| Scenario Type | Required (min) | Generated | Status |
|---------------|---------------|-----------|--------|
| Happy Path    | ≥ 1           | 1         | PASS |
| Alternative   | 0 or more     | 4         | PASS |
| Negative      | 2             | 2         | PASS |
| Error         | 3             | 3         | PASS |
| Edge Case     | ≥ 2           | 2         | PASS |
| Integration   | 3             | 3         | PASS |
| **TOTAL**     | —             | **15**    | **PASS** |

---

## Acceptance Criteria Coverage

| AC ID | Description | Test Cases | Status |
|-------|-------------|------------|--------|
| AC-1 | User can access "Create Supplier Invoice" Fiori app | TC-CS-110, TC-CS-111, TC-CS-112, TC-CS-113, TC-CS-114, TC-CS-115, TC-CS-116, TC-CS-117, TC-CS-118, TC-CS-119, TC-CS-120, TC-CS-121, TC-CS-122, TC-CS-123, TC-CS-124 (implicit in all) | PASS |
| AC-2 | System auto-proposes quantity and value based on PO and GR | TC-CS-110, TC-CS-115, TC-CS-116, TC-CS-120, TC-CS-121, TC-CS-122, TC-CS-123 | PASS |
| AC-3 | System blocks invoice if quantity exceeds GR beyond tolerance | TC-CS-111 (exceeds), TC-CS-115 (within), TC-CS-118 (boundary), TC-CS-124 (compound) | PASS |
| AC-4 | System blocks invoice if price varies beyond tolerance | TC-CS-112 (exceeds), TC-CS-116 (within), TC-CS-119 (boundary), TC-CS-124 (compound) | PASS |
| AC-5 | Blocked invoices visible in "Manage Blocked Invoices" | TC-CS-111, TC-CS-112, TC-CS-113, TC-CS-124 | PASS |
| AC-6 | Invoice released after discrepancy resolution | TC-CS-110 (no blocking), TC-CS-114 (quantity correction), TC-CS-117 (price correction) | PASS |

**AC Coverage Status:** PASS — All 6 acceptance criteria covered by multiple test cases

---

## Test Case Coverage by Scenario

### P0 — Must Test (Critical Business Risk)

| TC ID | Scenario ID | Type | Description | AC Coverage |
|-------|-------------|------|-------------|-------------|
| TC-CS-110 | HP-1 | HP | Create supplier invoice for GMP material PO with perfect three-way match | AC-1, AC-2, AC-6 |
| TC-CS-111 | ERR-1 | ERR | Create supplier invoice with quantity exceeding GR beyond tolerance | AC-3, AC-5 |
| TC-CS-112 | ERR-2 | ERR | Create supplier invoice with price exceeding PO price beyond tolerance | AC-4, AC-5 |
| TC-CS-113 | INT-1 | INT | Verify blocked invoice appears in "Manage Blocked Invoices" worklist | AC-5 |
| TC-CS-114 | INT-2 | INT | Correct blocked invoice quantity to match GR and verify auto-release | AC-6 |

**P0 Total:** 5 test cases

---

### P1 — Should Test (High Business Value)

| TC ID | Scenario ID | Type | Description | AC Coverage |
|-------|-------------|------|-------------|-------------|
| TC-CS-115 | AP-1 | AP | Create supplier invoice with quantity variance within tolerance | AC-1, AC-2, AC-3 |
| TC-CS-116 | AP-2 | AP | Create supplier invoice with price variance within tolerance | AC-1, AC-2, AC-4 |
| TC-CS-117 | INT-3 | INT | Correct blocked invoice price to match PO and verify auto-release | AC-6 |
| TC-CS-118 | EDGE-1 | EDGE | Create supplier invoice with quantity exactly at tolerance boundary | AC-3 |
| TC-CS-119 | EDGE-3 | EDGE | Create supplier invoice with price exactly at tolerance boundary | AC-4 |

**P1 Total:** 5 test cases

---

### P2 — Could Test (Medium Business Value)

| TC ID | Scenario ID | Type | Description | AC Coverage |
|-------|-------------|------|-------------|-------------|
| TC-CS-120 | AP-3 | AP | Create supplier invoice referencing PO with multiple GRs | AC-2 |
| TC-CS-121 | AP-4 | AP | Create supplier invoice referencing PO with partial GR | AC-2 |
| TC-CS-122 | NEG-2 | NEG | Attempt to create supplier invoice with non-existent PO number | AC-2 |
| TC-CS-123 | NEG-3 | NEG | Attempt to create supplier invoice for PO with no goods receipt | AC-2 |
| TC-CS-124 | ERR-3 | ERR | Create supplier invoice with both quantity and price variances beyond tolerance | AC-3, AC-4, AC-5 |

**P2 Total:** 5 test cases

---

## Quality Gate Metrics

### Coverage by Priority

| Priority | TC Count | Percentage |
|----------|----------|------------|
| CRITICAL | 5        | 33.3%      |
| HIGH     | 5        | 33.3%      |
| MEDIUM   | 5        | 33.3%      |
| LOW      | 0        | 0%         |

### Coverage by Type

| Type | TC Count | Percentage |
|------|----------|------------|
| HAPPY_PATH | 1 | 6.7% |
| ALTERNATIVE_PATH | 4 | 26.7% |
| NEGATIVE | 2 | 13.3% |
| ERROR | 3 | 20.0% |
| EDGE_CASE | 2 | 13.3% |
| INTEGRATION | 3 | 20.0% |

### Automation Readiness

| Automation Candidate | TC Count | Percentage |
|---------------------|----------|------------|
| YES | 10 | 66.7% |
| PARTIAL | 5 | 33.3% |
| NO | 0 | 0% |

**Automation Rate:** 100% automatable (YES + PARTIAL)

---

## Traceability Summary

- **Total User Stories Covered:** 1 (CS-29)
- **Total Acceptance Criteria:** 6
- **Total Test Cases Generated:** 15
- **Coverage Completeness:** 100% of ACs covered
- **Risk Coverage:** All P0 and P1 scenarios covered
- **Scenario Type Coverage:** All mandatory types covered

---

## Coverage Status: PASS

All quality gates passed:
- ✓ All acceptance criteria covered by at least one test case
- ✓ Critical ACs (AC-3, AC-4, AC-5, AC-6) covered by multiple test cases
- ✓ All mandatory scenario types (HP, ERR, INT) have 100% coverage
- ✓ All recommended scenario types (AP, NEG) have ≥50% coverage
- ✓ All P0 scenarios (100%) and P1 scenarios (100%) included
- ✓ Automation viability: 100% of test cases automatable

---

**Generated:** 2026-08-24  
**Test Strategy Reference:** `test-registry/jira/userstories/CS-29/strategy/CS-29-strategy.md`  
**Total Test Execution Effort:** 10 SMALL + 3 MEDIUM + 2 LARGE = Estimated 12-15 hours
