# Test Coverage Matrix: [CS-22] View An Aggregated Vendor Quality Scorecard Based On Inspection Reject

## Coverage Completeness

| Scenario Type | Inventory Count | Generated | Status |
|---------------|----------------|-----------|--------|
| Happy Path (HP) | 5 | 5 | PASS |
| Alternative Path (AP) | 4 | 4 | PASS |
| Negative (NEG) | 5 | 5 | PASS |
| Error (ERR) | 3 | 3 | PASS |
| Edge Case (EDGE) | 8 | 8 | PASS |
| Integration (INT) | 2 | 2 | PASS |
| **TOTAL** | **27** | **27** | **PASS** |

---

## Acceptance Criteria Traceability

| AC ID | Description | Covered By Test Cases | Coverage % |
|-------|-------------|----------------------|-----------|
| AC-1 | The user can access a "Vendor Evaluation" Fiori analytical app | TC-CS-200, TC-CS-209, TC-CS-214 | 100% |
| AC-2 | The system calculates and displays a vendor's batch acceptance rate over a configurable time period | TC-CS-200, TC-CS-201, TC-CS-205, TC-CS-209, TC-CS-210, TC-CS-215, TC-CS-217, TC-CS-218, TC-CS-221, TC-CS-222 | 100% |
| AC-3 | The system displays on-time delivery performance based on PO delivery dates versus actual goods receipt dates | TC-CS-200, TC-CS-202, TC-CS-206, TC-CS-212, TC-CS-223, TC-CS-224, TC-CS-226 | 100% |
| AC-4 | The user can drill down from the scorecard into individual rejected inspection lots | TC-CS-203, TC-CS-211 | 100% |
| AC-5 | The system flags vendors falling below a configurable quality threshold with a visual indicator | TC-CS-200, TC-CS-207, TC-CS-208, TC-CS-213, TC-CS-219, TC-CS-220, TC-CS-221, TC-CS-223 | 100% |
| AC-6 | The scorecard can be exported for inclusion in periodic GMP vendor audit reports | TC-CS-204, TC-CS-216 | 100% |

**Overall AC Coverage:** 6/6 (100%) — All acceptance criteria are covered by one or more test cases.

---

## Quality Gate Results

| Gate | Threshold | Result | Status |
|------|-----------|--------|--------|
| AC Traceability | 100% — every AC covered by ≥ 1 TC | 6/6 ACs covered | **PASS** |
| HP Coverage | All 5 HP scenarios generated | 5 generated | **PASS** |
| AP Coverage | All 4 AP scenarios generated | 4 generated | **PASS** |
| NEG Coverage | All 5 NEG scenarios generated | 5 generated | **PASS** |
| ERR Coverage | All 3 ERR scenarios generated | 3 generated | **PASS** |
| EDGE Coverage | All 8 EDGE scenarios generated | 8 generated | **PASS** |
| INT Coverage | All 2 INT scenarios generated | 2 generated | **PASS** |
| Parameterization | 0 hardcoded SAP values | 0 found | **PASS** |
| Automation Eligibility | ≥ 14 TCs flagged as Automation Candidate: YES | 18 flagged YES | **PASS** |

**Additional CRITICAL Risk Gates:**

| Additional Gate | Threshold | Result | Status |
|----------------|-----------|--------|--------|
| Entity validation coverage | 100% — NEG-01 (non-existent vendor) included | TC-CS-209 included | **PASS** |
| Mandatory field coverage | 100% — ERR-01 (vendor), ERR-02 (date range) included | TC-CS-214, TC-CS-215 included | **PASS** |
| Calculation verification | 100% — HP-02 (acceptance rate), HP-03 (OTD rate) verify formulas | TC-CS-201, TC-CS-202 verify calculations | **PASS** |

---

## Test Case Summary by Priority

| Priority | Count | Test Case IDs |
|----------|-------|--------------|
| CRITICAL | 5 | TC-CS-200, TC-CS-201, TC-CS-202, TC-CS-203, TC-CS-204 |
| HIGH | 14 | TC-CS-205, TC-CS-206, TC-CS-207, TC-CS-208, TC-CS-209, TC-CS-210, TC-CS-211, TC-CS-212, TC-CS-213, TC-CS-214, TC-CS-215, TC-CS-216, TC-CS-221, TC-CS-223 |
| MEDIUM | 6 | TC-CS-217, TC-CS-218, TC-CS-219, TC-CS-220, TC-CS-222, TC-CS-224 |
| LOW | 2 | TC-CS-225, TC-CS-226 |

---

## Automation Viability

| Category | Count | Automation Flag | Test Case IDs |
|----------|-------|----------------|--------------|
| Automation: YES | 18 | YES | TC-CS-200 to TC-CS-206, TC-CS-209 to TC-CS-224 |
| Automation: PARTIAL | 2 | PARTIAL | TC-CS-207, TC-CS-208 |
| Automation: NO | 2 | NO | TC-CS-225, TC-CS-226 |

**Target automation coverage:** 18 of 27 TCs (67%) — Target met.

---

## Test Execution Order (Priority-Based)

**Priority 1 — CRITICAL (execute first):**
- TC-CS-200: Access Vendor Evaluation app and view scorecard for valid vendor
- TC-CS-201: View batch acceptance rate for standard time period (90 days)
- TC-CS-202: View on-time delivery performance
- TC-CS-203: Drill down to inspection lot details
- TC-CS-204: Export vendor quality scorecard

**Priority 2 — HIGH (validate immediately after):**
- TC-CS-209: Non-existent vendor ID
- TC-CS-213: Vendor falls below quality threshold (red flag)
- TC-CS-214: Missing Vendor ID field
- TC-CS-215: Invalid date range
- TC-CS-216: Export authorization failure
- TC-CS-207: Quality threshold met (green status)
- TC-CS-208: Quality threshold warning (yellow status)
- TC-CS-221: Batch acceptance rate = 0% (all rejected)
- TC-CS-223: On-time delivery rate = 0% (all late)
- TC-CS-205: Custom time period (12 months)
- TC-CS-206: Filter by purchasing organization
- TC-CS-210: Vendor with no inspection history
- TC-CS-211: No rejected inspection lots
- TC-CS-212: No purchase orders or goods receipts

**Priority 3 — MEDIUM (complete coverage):**
- TC-CS-217: Time period = 1 day (minimum)
- TC-CS-218: Time period = 3 years (maximum)
- TC-CS-219: Quality threshold = 0%
- TC-CS-220: Quality threshold = 100%
- TC-CS-222: Batch acceptance rate = 100% (all accepted)
- TC-CS-224: On-time delivery rate = 100% (all on-time)

**Priority 4 — Integration (run after core stability confirmed):**
- TC-CS-225: Verify QM inspection lot aggregation
- TC-CS-226: Verify PO/GR date comparison calculation

---

## Notes

- All test cases follow the standard template from `ai-engine/prompts/testcase-generation-from-userstory.md`
- All data parameters are fully parameterized using `{TD.*}` and `{ENV.*}` placeholders
- Test cases are independent and executable in any order (execution order above is recommended for efficiency)
- Integration test cases (TC-CS-225, TC-CS-226) require cross-module data setup (QM, MM) and are not candidates for Phase 1 automation
- GMP compliance requirements are addressed in export test case (TC-CS-204) — report must be audit-ready

---

**Generated:** 2026-08-24  
**Generated By:** testcase-agent/skills/generate-testcases  
**Strategy:** test-registry/jira/userstories/CS-22/strategy/CS-22-strategy.md  
**Status:** ALL QUALITY GATES PASSED
