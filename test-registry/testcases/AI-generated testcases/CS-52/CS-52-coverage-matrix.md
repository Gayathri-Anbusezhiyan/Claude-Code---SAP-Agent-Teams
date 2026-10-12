# Test Coverage Matrix: [CS-52] Confirm Yield And Scrap Quantities Against A Process Order Operation

## Coverage Completeness

| Scenario Type | Required (min) | Generated | Status |
|---------------|---------------|-----------|--------|
| Happy Path    | ≥ 3           | 3         | PASS   |
| Alternative   | ≥ 3           | 3         | PASS   |
| Negative      | ≥ 4           | 4         | PASS   |
| Error         | ≥ 4           | 4         | PASS   |
| Edge Case     | ≥ 7           | 7         | PASS   |
| Integration   | 0             | 0         | N/A    |
| Reporting     | ≥ 3 (recommended) | 3     | PASS   |
| **TOTAL**     | **24**        | **24**    | **PASS** |

---

## Acceptance Criteria Traceability

| AC ID | Acceptance Criterion | Test Cases | Coverage |
|-------|---------------------|------------|---------|
| AC-1 | The user can access the "Confirm Process Order" Fiori app. | TC-CS-125 | 100% |
| AC-2 | The user can enter yield quantity, scrap quantity, and scrap reason code at each relevant operation. | TC-CS-125, TC-CS-126, TC-CS-127, TC-CS-131, TC-CS-132, TC-CS-133, TC-CS-135, TC-CS-136, TC-CS-137, TC-CS-138, TC-CS-139, TC-CS-140, TC-CS-141, TC-CS-142, TC-CS-145 | 100% |
| AC-3 | The system calculates and displays the yield variance percentage against the planned batch quantity. | TC-CS-125, TC-CS-126, TC-CS-127, TC-CS-128, TC-CS-129, TC-CS-139, TC-CS-140, TC-CS-141, TC-CS-143, TC-CS-144 | 100% |
| AC-4 | A yield variance exceeding a configured tolerance triggers a mandatory deviation record before the order can be technically completed. | TC-CS-128, TC-CS-129, TC-CS-130, TC-CS-134, TC-CS-143, TC-CS-144 | 100% |
| AC-5 | The system updates the finished goods batch quantity based on confirmed yield. | TC-CS-125, TC-CS-126, TC-CS-127, TC-CS-139 | 100% |
| AC-6 | A report is available showing yield trends by material, line, and shift for continuous improvement analysis. | TC-CS-146, TC-CS-147, TC-CS-148 | 100% |

---

## Test Case Inventory

### Happy Path (HP) — 3 TCs

| TC ID | Title | Priority | AC Coverage | Automation |
|-------|-------|----------|------------|-----------|
| TC-CS-125 | Confirm Single Operation with Yield Within Tolerance and No Scrap | CRITICAL | AC-1, AC-2, AC-3, AC-5 | YES |
| TC-CS-126 | Confirm Yield with Scrap and Valid Scrap Reason Code Within Tolerance | CRITICAL | AC-2, AC-3, AC-5 | YES |
| TC-CS-127 | Confirm Multiple Operations in Sequence for Multi-Step Order | HIGH | AC-2, AC-3, AC-5 | YES |

### Alternative Path (AP) — 3 TCs

| TC ID | Title | Priority | AC Coverage | Automation |
|-------|-------|----------|------------|-----------|
| TC-CS-128 | Confirm Yield with Positive Variance Within Tolerance | CRITICAL | AC-3, AC-4 | YES |
| TC-CS-129 | Confirm Yield with Negative Variance Within Tolerance | CRITICAL | AC-3, AC-4 | YES |
| TC-CS-130 | Confirm Yield with Variance Exceeding Tolerance and Create Deviation Record | CRITICAL | AC-4 | YES |

### Negative (NEG) — 4 TCs

| TC ID | Title | Priority | AC Coverage | Automation |
|-------|-------|----------|------------|-----------|
| TC-CS-131 | Attempt Confirmation with Non-Existent Process Order Number | HIGH | AC-2 | YES |
| TC-CS-132 | Attempt Confirmation with Invalid Operation Number for the Process Order | HIGH | AC-2 | YES |
| TC-CS-133 | Attempt Confirmation with Invalid Scrap Reason Code | HIGH | AC-2 | YES |
| TC-CS-134 | Attempt to Complete Order with Variance Exceeding Tolerance Without Creating Deviation Record | CRITICAL | AC-4 | YES |

### Error / Missing Field (ERR) — 4 TCs

| TC ID | Title | Priority | AC Coverage | Automation |
|-------|-------|----------|------------|-----------|
| TC-CS-135 | Attempt Confirmation with Missing Process Order Field | HIGH | AC-2 | YES |
| TC-CS-136 | Attempt Confirmation with Missing Operation Number Field | HIGH | AC-2 | YES |
| TC-CS-137 | Attempt Confirmation with Missing Yield Quantity Field | HIGH | AC-2 | YES |
| TC-CS-138 | Attempt Confirmation with Missing Scrap Reason Code When Scrap Greater Than Zero | HIGH | AC-2 | YES |

### Edge Case (EDGE) — 7 TCs

| TC ID | Title | Priority | AC Coverage | Automation |
|-------|-------|----------|------------|-----------|
| TC-CS-139 | Confirm with Yield Quantity Equal to Zero (Full Scrap Scenario) | MEDIUM | AC-2, AC-3, AC-5 | YES |
| TC-CS-140 | Confirm with Yield Quantity Equal to Maximum Order Quantity (Exact Match) | MEDIUM | AC-2, AC-3 | YES |
| TC-CS-141 | Confirm with Yield Plus Scrap Equal to Maximum Order Quantity | MEDIUM | AC-2, AC-3 | YES |
| TC-CS-142 | Attempt Confirmation with Yield Plus Scrap Exceeding Maximum Order Quantity | HIGH | AC-2 | YES |
| TC-CS-143 | Confirm with Yield Variance at Exact Lower Tolerance Boundary | CRITICAL | AC-3, AC-4 | PARTIAL |
| TC-CS-144 | Confirm with Yield Variance at Exact Upper Tolerance Boundary | CRITICAL | AC-3, AC-4 | PARTIAL |
| TC-CS-145 | Confirm with Scrap Quantity Equal to Zero (No Scrap) | MEDIUM | AC-2 | YES |

### Reporting (REPORT) — 3 TCs

| TC ID | Title | Priority | AC Coverage | Automation |
|-------|-------|----------|------------|-----------|
| TC-CS-146 | Access Yield Trend Report and Verify Data Aggregation by Material | MEDIUM | AC-6 | PARTIAL |
| TC-CS-147 | Access Yield Trend Report and Verify Data Aggregation by Production Line | MEDIUM | AC-6 | PARTIAL |
| TC-CS-148 | Access Yield Trend Report and Verify Data Aggregation by Shift | MEDIUM | AC-6 | PARTIAL |

---

## Quality Gates Summary

| Gate | Threshold | Actual | Status |
|------|-----------|--------|--------|
| AC Traceability | 100% — every AC covered by ≥ 1 TC | 100% (all 6 ACs covered) | PASS |
| HP Coverage | All 3 HP scenarios generated | 3 TCs generated | PASS |
| AP Coverage | All 3 AP scenarios generated | 3 TCs generated | PASS |
| NEG Coverage | All 4 NEG scenarios generated | 4 TCs generated | PASS |
| ERR Coverage | All 4 ERR scenarios generated | 4 TCs generated | PASS |
| EDGE Coverage | All 7 EDGE scenarios generated | 7 TCs generated | PASS |
| REPORT Coverage | All 3 REPORT scenarios generated | 3 TCs generated | PASS |
| Parameterization | 0 hardcoded SAP values | 0 hardcoded values | PASS |
| Automation Eligibility | ≥ 15 TCs flagged as Automation Candidate: YES | 18 TCs flagged YES | PASS |

**Overall Coverage Status:** PASS

---

## Automation Summary

| Automation Status | Count | Test Case IDs |
|-------------------|-------|--------------|
| YES (Full Automation) | 18 | TC-CS-125, TC-CS-126, TC-CS-127, TC-CS-128, TC-CS-129, TC-CS-130, TC-CS-131, TC-CS-132, TC-CS-133, TC-CS-134, TC-CS-135, TC-CS-136, TC-CS-137, TC-CS-138, TC-CS-139, TC-CS-140, TC-CS-141, TC-CS-142, TC-CS-145 |
| PARTIAL (Config/Data Dependency) | 6 | TC-CS-143, TC-CS-144, TC-CS-146, TC-CS-147, TC-CS-148 |
| NO (Manual Only) | 0 | None |
| **TOTAL** | **24** | — |

**Automation Coverage:** 75% (18 of 24 TCs fully automatable)

---

## Priority Breakdown

| Priority | Count | Percentage |
|----------|-------|-----------|
| CRITICAL | 8     | 33.3%     |
| HIGH     | 9     | 37.5%     |
| MEDIUM   | 7     | 29.2%     |
| LOW      | 0     | 0%        |
| **TOTAL** | **24** | **100%**  |

---

## Risk Coverage

| Risk Level | Scenarios | Test Cases | Status |
|-----------|----------|------------|--------|
| CRITICAL | HP-01, HP-02, AP-01, AP-02, AP-03, NEG-04, EDGE-05, EDGE-06 | TC-CS-125, TC-CS-126, TC-CS-128, TC-CS-129, TC-CS-130, TC-CS-134, TC-CS-143, TC-CS-144 | PASS |
| HIGH | HP-03, NEG-01, NEG-02, NEG-03, ERR-01, ERR-02, ERR-03, ERR-04, EDGE-04 | TC-CS-127, TC-CS-131, TC-CS-132, TC-CS-133, TC-CS-135, TC-CS-136, TC-CS-137, TC-CS-138, TC-CS-142 | PASS |
| MEDIUM | EDGE-01, EDGE-02, EDGE-03, EDGE-07, REPORT-01, REPORT-02, REPORT-03 | TC-CS-139, TC-CS-140, TC-CS-141, TC-CS-145, TC-CS-146, TC-CS-147, TC-CS-148 | PASS |

**All risk levels are adequately covered.**

---

## Generated By

- **Agent:** testcase-agent/skills/generate-testcases
- **Prompt Version:** ai-engine/prompts/testcase-generation-from-userstory.md
- **Generated At:** 2026-08-24
- **User Story:** CS-52 — Confirm Yield And Scrap Quantities Against A Process Order Operation
- **Module:** PP — Production Planning and Execution
