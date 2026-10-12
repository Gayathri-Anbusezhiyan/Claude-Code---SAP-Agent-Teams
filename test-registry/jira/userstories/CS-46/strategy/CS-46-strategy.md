# Test Strategy: [CS-46] Maintain Customer Scheduling Agreement for hospital recurring supply

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-46/strategy/CS-46-analysis.md
**Risk Profile:**     jira/userstories/CS-46/strategy/CS-46-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Contract Administrator
- **Business Object:** Scheduling Agreement (SAP SD document type)
- **SAP Module:** SD — Sales & Distribution
- **Business Goal:** Enable hospital to receive regular shipments of critical medications without creating individual sales orders for each delivery

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 5 | 5 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 3 | 3 | HIGH |
| Negative (NEG) | MANDATORY | 8 | 8 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 8 | 8 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 13 | 13 | MEDIUM |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | — |
| **TOTAL** | — | **37** | **37** | — |

**Rationale:**
- **CRITICAL risk story** — All scenario types marked MANDATORY except INT (no linked issues)
- **Complex scheduling logic** — High scenario count for EDGE cases due to date/interval calculations, quantity tracking, and notification thresholds
- **8 mandatory fields** — ERR coverage requires one TC per field (Customer, Material, Total Quantity, Validity Start/End, Schedule Type, Fixed Dates/Interval conditional)
- **8 validation rules** — NEG coverage for customer/material/date/call-off validations
- **13 boundary parameters** — EDGE coverage for quantity, interval, dates, call-off, and notification thresholds

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP) — 5 scenarios**
- **HP-01**: Create Scheduling Agreement with valid customer, material, total quantity, validity period, and fixed-date delivery schedule — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3
- **HP-02**: Create Scheduling Agreement with interval-based delivery schedule (e.g., every 14 days) — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3
- **HP-03**: Call off delivery against a Scheduling Agreement by confirming a schedule line — Risk: HIGH — ACs: AC-4, AC-5
- **HP-04**: Notification triggered when remaining quantity falls below threshold — Risk: MEDIUM — ACs: AC-6
- **HP-05**: Notification triggered when Scheduling Agreement nears validity end date — Risk: MEDIUM — ACs: AC-6

**Negative (NEG) — 8 scenarios**
- **NEG-01**: Attempt to create Scheduling Agreement with non-existent customer ID — Risk: HIGH — ACs: AC-1
- **NEG-02**: Attempt to create Scheduling Agreement with non-existent material ID — Risk: HIGH — ACs: AC-1
- **NEG-03**: Attempt to create Scheduling Agreement with material not enabled for scheduling agreements — Risk: HIGH — ACs: AC-1
- **NEG-04**: Attempt to create Scheduling Agreement with customer not assigned to sales organization — Risk: HIGH — ACs: AC-1
- **NEG-05**: Attempt to create Scheduling Agreement with validity end date before start date — Risk: HIGH — ACs: AC-1
- **NEG-06**: Attempt to create Scheduling Agreement with validity start date in the past — Risk: HIGH — ACs: AC-1
- **NEG-07**: Attempt to call off quantity exceeding remaining quantity under Scheduling Agreement — Risk: HIGH — ACs: AC-4, AC-5
- **NEG-08**: Attempt to confirm schedule line that does not exist or is already fully called off — Risk: HIGH — ACs: AC-4

**Error / Missing Field (ERR) — 8 scenarios**
- **ERR-01**: Missing Customer ID field — Risk: HIGH — ACs: AC-1
- **ERR-02**: Missing Material ID field — Risk: HIGH — ACs: AC-1
- **ERR-03**: Missing Total Quantity field — Risk: HIGH — ACs: AC-1
- **ERR-04**: Missing Validity Start Date field — Risk: HIGH — ACs: AC-1
- **ERR-05**: Missing Validity End Date field — Risk: HIGH — ACs: AC-1
- **ERR-06**: Missing Delivery Schedule Type selection — Risk: HIGH — ACs: AC-2
- **ERR-07**: Missing Fixed Dates when Fixed Dates schedule type selected — Risk: HIGH — ACs: AC-2
- **ERR-08**: Missing Interval when Interval schedule type selected — Risk: HIGH — ACs: AC-2

**Edge Case / Boundary (EDGE) — 13 scenarios**
- **EDGE-01**: Create Scheduling Agreement with minimum valid total quantity (1 unit) — Risk: MEDIUM — ACs: AC-1
- **EDGE-02**: Create Scheduling Agreement with zero total quantity (invalid) — Risk: MEDIUM — ACs: AC-1
- **EDGE-03**: Create Scheduling Agreement with maximum allowed total quantity — Risk: MEDIUM — ACs: AC-1
- **EDGE-04**: Create Scheduling Agreement with minimum interval (1 day) — Risk: MEDIUM — ACs: AC-2
- **EDGE-05**: Create Scheduling Agreement with maximum reasonable interval (365 days) — Risk: MEDIUM — ACs: AC-2
- **EDGE-06**: Create Scheduling Agreement with zero interval (invalid) — Risk: MEDIUM — ACs: AC-2
- **EDGE-07**: Create Scheduling Agreement with single fixed delivery date (minimum) — Risk: MEDIUM — ACs: AC-2, AC-3
- **EDGE-08**: Call off exact remaining quantity (boundary condition) — Risk: MEDIUM — ACs: AC-4, AC-5
- **EDGE-09**: Call off when cumulative quantity equals total quantity (no remaining) — Risk: MEDIUM — ACs: AC-5
- **EDGE-10**: Notification threshold at 0% (no notification) — Risk: LOW — ACs: AC-6
- **EDGE-11**: Notification threshold at 100% (immediate notification) — Risk: LOW — ACs: AC-6
- **EDGE-12**: Validity period of 1 day (minimum) — Risk: MEDIUM — ACs: AC-1, AC-3
- **EDGE-13**: Validity start date = today (earliest possible) — Risk: LOW — ACs: AC-1

### Recommended Scenarios

**Alternative Path (AP) — 3 scenarios**
- **AP-01**: Create Scheduling Agreement with fixed dates (specific calendar dates) — Risk: HIGH — ACs: AC-2, AC-3
- **AP-02**: Create Scheduling Agreement with interval (days between deliveries) — Risk: HIGH — ACs: AC-2, AC-3
- **AP-03**: Multiple call-offs against the same Scheduling Agreement (cumulative tracking) — Risk: HIGH — ACs: AC-4, AC-5

### Optional Scenarios

**Integration (INT) — 0 scenarios**
- None — no linked issues identified

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 5 HP scenarios generated | YES |
| NEG Coverage | All 8 NEG scenarios generated | YES |
| ERR Coverage | All 8 ERR scenarios generated | YES |
| EDGE Coverage | All 13 EDGE scenarios generated | YES |
| AP Coverage | All 3 AP scenarios generated (RECOMMENDED) | NO |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 19 TCs flagged as Automation Candidate: YES (50%+ of HP/AP/NEG/ERR) | YES |

**Additional gates for CRITICAL risk:**

| Additional Gate | Threshold | Mandatory |
|----------------|-----------|---------|
| Negative coverage (entity validation) | 100% — one NEG per named entity that can be invalid (customer, material) | YES |
| Error coverage (mandatory fields) | 100% — one ERR per mandatory field in ACs (8 fields) | YES |

**Overall pass threshold:** All mandatory gates must PASS. At least 75% of recommended gates must PASS (AP coverage is recommended).

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Scheduling Agreement creation is core SD operation — failure blocks hospital supply chain for critical medications |
| HP (call-off) | HIGH | MAJOR | Call-off functionality enables actual delivery execution — failure blocks hospital deliveries |
| HP (notifications) | MEDIUM | MINOR | Notification logic supports proactive management but does not block transactions |
| NEG (invalid entity) | HIGH | MAJOR | Customer/material validation failures prevent contract creation — business process blocked |
| NEG (invalid dates) | HIGH | MAJOR | Date validation ensures delivery schedules are logically correct — errors cause wrong delivery dates |
| NEG (call-off validation) | HIGH | MAJOR | Call-off quantity validation prevents overshipping or stockouts at hospitals |
| ERR (missing mandatory field) | HIGH | MAJOR | Data integrity failures — all mandatory fields must be enforced |
| EDGE (quantity boundary) | MEDIUM | MINOR | Important for quantity accuracy but not core path |
| EDGE (interval boundary) | MEDIUM | MINOR | Ensures scheduling logic handles edge cases correctly |
| EDGE (date boundary) | MEDIUM | MINOR | Date calculation edge cases (1-day validity, start date = today) |
| EDGE (notification threshold) | LOW | MINOR | Notification boundary conditions (0% and 100%) are edge cases only |
| AP (fixed dates vs intervals) | HIGH | MAJOR | Alternative scheduling approaches are explicitly defined in ACs — must be validated |
| AP (multiple call-offs) | HIGH | MAJOR | Cumulative tracking is critical for quantity accuracy across multiple deliveries |
| INT (cross-module) | — | — | Not applicable — no linked issues |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright — stable, repeatable, CRITICAL risk |
| AP | YES | Data-driven via testdata JSON — alternative paths are stable |
| NEG | YES | Stable validation checks — error messages are consistent |
| ERR | YES | Field-level validation stable — mandatory field enforcement is consistent |
| EDGE | PARTIAL | Boundary values may require specific SAP config (max quantity, max interval, notification thresholds). Mark individual TCs YES if data can be parameterized without SAP config changes. |
| INT | — | Not applicable — no integration scenarios |

**Target automation coverage:** 32 of 37 TCs (86%)
- All HP (5), AP (3), NEG (8), ERR (8) = 24 TCs marked YES
- EDGE: 8 of 13 marked YES (EDGE-01, EDGE-02, EDGE-04, EDGE-06, EDGE-07, EDGE-08, EDGE-12, EDGE-13). Mark PARTIAL for EDGE-03 (max quantity), EDGE-05 (max interval), EDGE-09 (cumulative = total), EDGE-10 (0% threshold), EDGE-11 (100% threshold) — these require SAP config or complex setup.

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-046-HP-01 (Create SA with fixed dates)
  TC-CS-046-HP-02 (Create SA with intervals)

Priority 2 — HIGH (validate immediately after):
  TC-CS-046-HP-03 (Call off delivery)
  TC-CS-046-NEG-01 (Non-existent customer)
  TC-CS-046-NEG-02 (Non-existent material)
  TC-CS-046-NEG-03 (Material not enabled)
  TC-CS-046-NEG-04 (Customer not assigned to sales org)
  TC-CS-046-NEG-05 (End date before start date)
  TC-CS-046-NEG-06 (Start date in past)
  TC-CS-046-NEG-07 (Call off exceeds remaining)
  TC-CS-046-NEG-08 (Invalid schedule line)
  TC-CS-046-ERR-01 to ERR-08 (All mandatory field errors)
  TC-CS-046-AP-01 (Fixed dates)
  TC-CS-046-AP-02 (Intervals)
  TC-CS-046-AP-03 (Multiple call-offs)

Priority 3 — MEDIUM (complete coverage):
  TC-CS-046-HP-04 (Notification - threshold)
  TC-CS-046-HP-05 (Notification - end date)
  TC-CS-046-EDGE-01 to EDGE-13 (All boundary scenarios)

Priority 4 — Integration (run after core stability confirmed):
  None
```

---

## Regulatory and Compliance Notes

**SAP SD Scheduling Agreements for Pharmaceutical Supply:**
- Scheduling Agreements are legally binding supply contracts — test cases must verify that all mandatory fields (customer, material, quantities, validity periods) are enforced
- Pharmaceutical supply to hospitals is regulated — ensure test data does not use real production customer or material IDs
- All test execution must use dedicated test system instances (not production)
- Delivery schedules must respect SAP calendar configuration (working days, holidays) — test cases should verify schedule line generation logic against calendar constraints where applicable
- Call-off tracking (cumulative and remaining quantities) is critical for hospital inventory management — test cases must verify accuracy of quantity calculations

**Data Privacy:**
- Use anonymized test customer names (e.g., "Test Hospital A", "Test Hospital B") instead of real hospital names
- Use test material IDs (e.g., "TEST-PHARMA-001") instead of real pharmaceutical product IDs

**Test System Governance:**
- All tests must execute in SAP S/4HANA Cloud test tenant (current: my426318.s4hana.cloud.sap)
- Test data must be cleaned up after test execution where possible (or marked as test data with "TEST" prefix)

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-46-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, NEG, ERR, EDGE)
3. Generate RECOMMENDED types (AP) unless time/scope constraints apply
4. Apply quality gates table — verify all thresholds are met before completing
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above:
   - All HP, AP, NEG, ERR = YES
   - EDGE-01, EDGE-02, EDGE-04, EDGE-06, EDGE-07, EDGE-08, EDGE-12, EDGE-13 = YES
   - EDGE-03, EDGE-05, EDGE-09, EDGE-10, EDGE-11 = PARTIAL
7. Output files to `testcases/AI-generated testcases/CS-46/` and `testdata/CS-46/`
8. Test Case ID format: `TC-CS-046-{TYPE}-{NN}` (e.g., TC-CS-046-HP-01, TC-CS-046-NEG-01)
9. Ensure all 37 test cases map to the scenario inventory in this strategy document
10. Validate AC traceability: every AC (AC-1 through AC-6) must be covered by at least one test case
