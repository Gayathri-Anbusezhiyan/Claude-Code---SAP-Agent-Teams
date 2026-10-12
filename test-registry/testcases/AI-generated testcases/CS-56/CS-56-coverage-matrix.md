# Test Coverage Matrix: [CS-56] View A Batch Genealogy Report Showing The Complete Lineage From Raw Ma

**Generated:** 2026-08-24
**User Story:** CS-56
**Module:** PP/QM (Production Planning & Control / Quality Management)

---

## Coverage Completeness

| Scenario Type | Required (min) | Generated | Status |
|---------------|---------------|-----------|--------|
| Happy Path    | ≥ 1           | 4         | PASS   |
| Alternative   | 0 or more     | 2         | PASS   |
| Negative      | 4             | 4         | PASS   |
| Error         | 2             | 2         | PASS   |
| Edge Case     | ≥ 2           | 4         | PASS   |
| Integration   | 0 or more     | 2         | PASS   |
| **TOTAL**     | —             | **18**    | **PASS** |

---

## Acceptance Criteria to Test Case Traceability

| AC ID | Acceptance Criterion | Test Cases | Coverage Status |
|-------|---------------------|------------|-----------------|
| AC-1 | The user can access the "Batch Information Cockpit" or equivalent genealogy Fiori app. | TC-CS-167, TC-CS-168, TC-CS-169, TC-CS-170, TC-CS-171, TC-CS-172, TC-CS-175, TC-CS-183, TC-CS-184 | PASS |
| AC-2 | The user can search by finished goods batch number to view all consumed component batches and their originating vendors. | TC-CS-167, TC-CS-168, TC-CS-171, TC-CS-172, TC-CS-173, TC-CS-174, TC-CS-176, TC-CS-179, TC-CS-180, TC-CS-183 | PASS |
| AC-3 | The system displays the full where-used chain if the finished batch was further processed or repackaged. | TC-CS-169, TC-CS-172, TC-CS-176 | PASS |
| AC-4 | The report includes relevant dates: manufacturing, in-process control results, and release date. | TC-CS-167, TC-CS-168, TC-CS-169, TC-CS-182, TC-CS-184 | PASS |
| AC-5 | The report can be exported for inclusion in a regulatory recall response or customer quality inquiry. | TC-CS-170, TC-CS-178 | PASS |
| AC-6 | The system returns genealogy results within an acceptable time frame to support time-critical recall investigations. | TC-CS-167, TC-CS-168, TC-CS-169, TC-CS-173, TC-CS-179, TC-CS-180, TC-CS-181 | PASS |

**Overall AC Coverage:** 6/6 (100%) — PASS

---

## Test Case Summary by Scenario Type

### Happy Path (HP) — 4 TCs

| TC ID | Title | Priority | ACs Covered |
|-------|-------|----------|-------------|
| TC-CS-167 | View genealogy for a finished goods batch with single-level BOM | CRITICAL | AC-1, AC-2, AC-4, AC-6 |
| TC-CS-168 | View genealogy for a finished goods batch with multi-level BOM (raw → intermediate → finished) | CRITICAL | AC-1, AC-2, AC-4, AC-6 |
| TC-CS-169 | View where-used chain for a batch that was further processed (finished → repackaged) | HIGH | AC-1, AC-3, AC-4, AC-6 |
| TC-CS-170 | Export genealogy report to file (PDF or Excel) | HIGH | AC-1, AC-5 |

### Alternative Path (AP) — 2 TCs

| TC ID | Title | Priority | ACs Covered |
|-------|-------|----------|-------------|
| TC-CS-171 | Search by batch number without specifying material (system derives material) | HIGH | AC-2 |
| TC-CS-172 | Search with both component view and where-used view enabled (bidirectional genealogy) | HIGH | AC-2, AC-3 |

### Negative (NEG) — 4 TCs

| TC ID | Title | Priority | ACs Covered |
|-------|-------|----------|-------------|
| TC-CS-173 | Search by non-existent finished goods batch number | HIGH | AC-2, AC-6 |
| TC-CS-174 | Search by batch number in wrong format (invalid characters or length) | MEDIUM | AC-2 |
| TC-CS-175 | Access Batch Information Cockpit without required authorization | HIGH | AC-1 |
| TC-CS-176 | Search by batch that has no component batches (never consumed anything) | MEDIUM | AC-2, AC-3 |

### Error (ERR) — 2 TCs

| TC ID | Title | Priority | ACs Covered |
|-------|-------|----------|-------------|
| TC-CS-177 | Missing Batch Number field | HIGH | AC-2 |
| TC-CS-178 | Export fails due to system authorization or technical error | MEDIUM | AC-5 |

### Edge Case (EDGE) — 4 TCs

| TC ID | Title | Priority | ACs Covered |
|-------|-------|----------|-------------|
| TC-CS-179 | Genealogy query with maximum BOM depth (10+ levels) | MEDIUM | AC-2, AC-6 |
| TC-CS-180 | Genealogy query for batch with hundreds of component batches (complex assembly) | MEDIUM | AC-2, AC-6 |
| TC-CS-181 | Query genealogy at exactly the acceptable time threshold | CRITICAL | AC-6 |
| TC-CS-182 | Batch with incomplete dates (released but no inspection date recorded) | MEDIUM | AC-4 |

### Integration (INT) — 2 TCs

| TC ID | Title | Priority | ACs Covered |
|-------|-------|----------|-------------|
| TC-CS-183 | Verify vendor batch number linkage from MM goods receipt to PP batch genealogy | HIGH | AC-2 |
| TC-CS-184 | Verify inspection lot results from QM appear in genealogy report | HIGH | AC-4 |

---

## Test Execution Priority

**Priority 1 — CRITICAL (execute first):**
- TC-CS-167: HP-01 — Single-level genealogy query
- TC-CS-168: HP-02 — Multi-level genealogy query
- TC-CS-181: EDGE-03 — Performance threshold validation

**Priority 2 — HIGH (validate immediately after):**
- TC-CS-169: HP-03 — Where-used chain query
- TC-CS-170: HP-04 — Export genealogy report
- TC-CS-171: AP-01 — Simplified search (batch only)
- TC-CS-172: AP-02 — Bidirectional genealogy
- TC-CS-173: NEG-01 — Non-existent batch handling
- TC-CS-175: NEG-03 — Unauthorized access
- TC-CS-177: ERR-01 — Missing batch number validation
- TC-CS-183: INT-01 — MM/PP vendor linkage
- TC-CS-184: INT-02 — QM/PP inspection results

**Priority 3 — MEDIUM (complete coverage):**
- TC-CS-174: NEG-02 — Invalid batch format
- TC-CS-176: NEG-04 — Batch with no components
- TC-CS-178: ERR-02 — Export failure handling
- TC-CS-179: EDGE-01 — Maximum BOM depth
- TC-CS-180: EDGE-02 — Complex assembly query
- TC-CS-182: EDGE-04 — Incomplete date handling

---

## Automation Coverage

| Automation Candidate | TC Count | Percentage |
|---------------------|----------|------------|
| YES                 | 14       | 78%        |
| PARTIAL             | 4        | 22%        |
| NO                  | 0        | 0%         |
| **TOTAL**           | **18**   | **100%**   |

**PARTIAL Automation TCs:**
- TC-CS-175: Requires unauthorized user account setup
- TC-CS-178: Requires authorization restriction or simulated failure
- TC-CS-179: Requires test data with 10+ BOM levels
- TC-CS-180: Requires test data with hundreds of component batches

---

## Quality Gates — Final Status

| Gate | Threshold | Actual | Status |
|------|-----------|--------|--------|
| AC Traceability | 100% — every AC covered by ≥ 1 TC | 100% (6/6 ACs) | PASS |
| HP Coverage | All 4 HP scenarios generated | 4 generated | PASS |
| NEG Coverage | All 4 NEG scenarios generated | 4 generated | PASS |
| ERR Coverage | All 2 ERR scenarios generated | 2 generated | PASS |
| EDGE Coverage | All 4 EDGE TCs generated | 4 generated | PASS |
| Parameterization | 0 hardcoded SAP values | 0 hardcoded values | PASS |
| Automation Eligibility | ≥ 12 TCs flagged as Automation Candidate: YES | 14 TCs | PASS |

**Overall Test Case Generation:** PASS — All quality gates met

---

## Coverage Notes

- **Complete AC coverage:** All 6 acceptance criteria are covered by at least one test case
- **Performance boundary testing:** TC-CS-181 explicitly validates AC-6 performance requirement with measurable acceptance criteria
- **Integration coverage:** MM/PP and QM/PP integration scenarios are included despite no explicit linked issues, due to CRITICAL risk level
- **Regulatory compliance focus:** All test cases support time-critical recall investigation requirements
- **Data quality handling:** EDGE-04 (TC-CS-182) verifies graceful handling of incomplete batch data
