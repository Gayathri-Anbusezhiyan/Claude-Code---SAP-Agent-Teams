# Test Strategy: [CS-52] Confirm Yield And Scrap Quantities Against A Process Order Operation

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-52/strategy/CS-52-analysis.md
**Risk Profile:**     jira/userstories/CS-52/strategy/CS-52-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Production Supervisor
- **Business Object:** Process Order Confirmation (Manufacturing Execution)
- **SAP Module:** PP — Production Planning and Execution
- **Business Goal:** Accurately record and reconcile actual production output and losses against the planned batch size

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 3 | 3 | CRITICAL |
| Alternative Path (AP) | MANDATORY | 3 | 3 | CRITICAL |
| Negative (NEG) | MANDATORY | 4 | 4 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 4 | 4 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 7 | 7 | CRITICAL/MEDIUM |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | N/A |
| Reporting (REPORT) | RECOMMENDED | 3 | 3 | MEDIUM |
| **TOTAL** | — | **24** | **24** | — |

**Coverage Model Rationale:**
- Story has CRITICAL overall risk — all core scenario types (HP, AP, NEG, ERR, EDGE) are MANDATORY
- EDGE scenarios include variance tolerance boundary testing (CRITICAL priority per AC-3, AC-4)
- REPORT scenarios are RECOMMENDED to verify AC-6 (yield trend reporting)
- No integration scenarios — no linked issues identified

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP) — 3 scenarios:**
1. **HP-01** — Confirm single operation with yield within tolerance, no scrap  
   Risk: CRITICAL | ACs: AC-1, AC-2, AC-3, AC-5  
   Core transaction — single-operation process order confirmation with standard yield

2. **HP-02** — Confirm yield with scrap and valid scrap reason code within tolerance  
   Risk: CRITICAL | ACs: AC-2, AC-3, AC-5  
   Production loss scenario with mandatory scrap reason code validation

3. **HP-03** — Confirm multiple operations in sequence (multi-step order)  
   Risk: HIGH | ACs: AC-2, AC-3, AC-5  
   Complex routing scenario with multiple operation confirmations

**Alternative Path (AP) — 3 scenarios:**
1. **AP-01** — Yield variance within tolerance (positive variance)  
   Risk: CRITICAL | ACs: AC-3, AC-4  
   Yield exceeds planned quantity but within configured tolerance threshold

2. **AP-02** — Yield variance within tolerance (negative variance)  
   Risk: CRITICAL | ACs: AC-3, AC-4  
   Yield below planned quantity but within configured tolerance threshold

3. **AP-03** — Yield variance exceeds tolerance, deviation record created, order completed after deviation approval  
   Risk: CRITICAL | ACs: AC-4  
   Compliance workflow — out-of-tolerance variance triggers mandatory deviation

**Negative (NEG) — 4 scenarios:**
1. **NEG-01** — Non-existent Process Order number  
   Risk: HIGH | ACs: AC-2  
   Invalid master data reference validation

2. **NEG-02** — Invalid Operation number for the given Process Order  
   Risk: HIGH | ACs: AC-2  
   Operation-order mismatch validation

3. **NEG-03** — Invalid Scrap Reason Code  
   Risk: HIGH | ACs: AC-2  
   Invalid scrap master data reference validation

4. **NEG-04** — Yield variance exceeds tolerance, user attempts to complete order without creating deviation record  
   Risk: CRITICAL | ACs: AC-4  
   Compliance violation — system must block order completion

**Error / Missing Field (ERR) — 4 scenarios:**
1. **ERR-01** — Missing Process Order field  
   Risk: HIGH | ACs: AC-2  
   Mandatory field validation for primary key

2. **ERR-02** — Missing Operation Number field  
   Risk: HIGH | ACs: AC-2  
   Mandatory field validation for operation reference

3. **ERR-03** — Missing Yield Quantity field  
   Risk: HIGH | ACs: AC-2  
   Mandatory field validation for core transactional data

4. **ERR-04** — Missing Scrap Reason Code when Scrap > 0  
   Risk: HIGH | ACs: AC-2  
   Conditional mandatory field validation (business rule)

**Edge Case / Boundary (EDGE) — 7 scenarios:**
1. **EDGE-01** — Yield Quantity = 0 (full scrap scenario)  
   Risk: MEDIUM | ACs: AC-2, AC-3, AC-5  
   Lower boundary — zero yield with full scrap

2. **EDGE-02** — Yield Quantity = Maximum Order Quantity (no scrap, exact plan match)  
   Risk: MEDIUM | ACs: AC-2, AC-3  
   Upper boundary — exact match to planned quantity

3. **EDGE-03** — Yield + Scrap = Maximum Order Quantity  
   Risk: MEDIUM | ACs: AC-2, AC-3  
   Combined upper boundary — full quantity accounted

4. **EDGE-04** — Yield + Scrap > Maximum Order Quantity (over-confirmation)  
   Risk: HIGH | ACs: AC-2  
   Business rule violation — cannot confirm more than planned

5. **EDGE-05** — Yield Variance = exact tolerance boundary (lower)  
   Risk: CRITICAL | ACs: AC-3, AC-4  
   Tolerance boundary precision testing (negative threshold)

6. **EDGE-06** — Yield Variance = exact tolerance boundary (upper)  
   Risk: CRITICAL | ACs: AC-3, AC-4  
   Tolerance boundary precision testing (positive threshold)

7. **EDGE-07** — Scrap Quantity = 0 (no scrap)  
   Risk: LOW | ACs: AC-2  
   Lower boundary — no production loss scenario

### Recommended Scenarios

**Reporting (REPORT) — 3 scenarios:**
1. **REPORT-01** — Access yield trend report and verify data aggregation by material  
   Risk: MEDIUM | ACs: AC-6  
   Continuous improvement reporting — material-level analysis

2. **REPORT-02** — Access yield trend report and verify data aggregation by line  
   Risk: MEDIUM | ACs: AC-6  
   Continuous improvement reporting — production line analysis

3. **REPORT-03** — Access yield trend report and verify data aggregation by shift  
   Risk: MEDIUM | ACs: AC-6  
   Continuous improvement reporting — shift-level analysis

### Optional Scenarios

None

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 3 HP scenarios generated | YES |
| AP Coverage | All 3 AP scenarios generated | YES |
| NEG Coverage | All 4 NEG scenarios generated | YES |
| ERR Coverage | All 4 ERR scenarios generated | YES |
| EDGE Coverage | All 7 EDGE TCs generated | YES |
| REPORT Coverage | All 3 REPORT TCs generated | RECOMMENDED |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 15 TCs flagged as Automation Candidate: YES | YES |

**Additional Quality Gates (CRITICAL risk story):**
- **Negative coverage (entity validation):** 100% — NEG scenarios cover all invalid entity references (Process Order, Operation, Scrap Reason)
- **Error coverage (mandatory fields):** 100% — ERR scenarios cover all mandatory fields (Process Order, Operation, Yield Quantity) + conditional mandatory (Scrap Reason)
- **Variance tolerance boundary coverage:** 100% — EDGE-05 and EDGE-06 must test exact tolerance boundary values (both lower and upper)
- **Deviation workflow coverage:** 100% — AP-03 and NEG-04 must verify deviation record creation and order completion blocking

**Overall pass threshold:** All mandatory gates must PASS. All recommended gates must PASS (REPORT coverage recommended but not blocking).

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Production execution core flow — HP-01 is the baseline regression test |
| HP (scrap scenario) | CRITICAL | CRITICAL | HP-02 verifies scrap quantity and reason code validation |
| HP (multi-operation) | HIGH | MAJOR | HP-03 covers complex routing scenario (higher failure probability) |
| AP (variance within tolerance) | CRITICAL | CRITICAL | AP-01 and AP-02 verify variance calculation accuracy |
| AP (deviation workflow) | CRITICAL | CRITICAL | AP-03 is compliance-critical — must verify deviation enforcement |
| NEG (invalid entity) | HIGH | MAJOR | NEG-01, NEG-02, NEG-03 prevent data integrity failures |
| NEG (deviation bypass) | CRITICAL | CRITICAL | NEG-04 is compliance-critical — must block order completion |
| ERR (missing mandatory field) | HIGH | MAJOR | ERR-01, ERR-02, ERR-03 prevent incomplete confirmations |
| ERR (conditional mandatory) | HIGH | MAJOR | ERR-04 verifies business rule for scrap reason code |
| EDGE (boundary values) | MEDIUM | MINOR | EDGE-01, EDGE-02, EDGE-03, EDGE-07 cover standard boundary cases |
| EDGE (over-confirmation) | HIGH | MAJOR | EDGE-04 prevents inventory discrepancies |
| EDGE (tolerance boundaries) | CRITICAL | CRITICAL | EDGE-05, EDGE-06 are precision-critical for deviation trigger logic |
| REPORT | MEDIUM | MINOR | REPORT-01, REPORT-02, REPORT-03 support continuous improvement but not transactional |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | All HP scenarios are stable, repeatable, regression-critical — full Playwright automation |
| AP | YES | Variance scenarios are deterministic and data-driven via testdata JSON |
| NEG | YES | Validation error checks are stable and repeatable |
| ERR | YES | Field-level validation is stable and machine-verifiable |
| EDGE | PARTIAL | EDGE-01 to EDGE-04, EDGE-07 are automatable. EDGE-05 and EDGE-06 require exact tolerance configuration in SAP test system (mark as PARTIAL — may need manual config verification) |
| INT | N/A | No integration scenarios |
| REPORT | PARTIAL | Report access is automatable, but data aggregation verification requires stable test data history in SAP (mark as PARTIAL — may need manual data validation for shift/line-specific results) |

**Target automation coverage:** 18 of 24 TCs (75%)
- Full automation: HP (3), AP (3), NEG (4), ERR (4) = 14 TCs
- Partial automation: EDGE (4 of 7), REPORT (0 of 3) = 4 TCs
- Manual verification only: EDGE-05, EDGE-06, EDGE-07 (tolerance boundary precision), REPORT (all 3) = 6 TCs

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-053 (HP-01): Confirm single operation with yield within tolerance, no scrap
  TC-CS-054 (HP-02): Confirm yield with scrap and valid scrap reason code within tolerance
  TC-CS-055 (AP-01): Yield variance within tolerance (positive variance)
  TC-CS-056 (AP-02): Yield variance within tolerance (negative variance)
  TC-CS-057 (AP-03): Yield variance exceeds tolerance, deviation record created
  TC-CS-061 (NEG-04): Yield variance exceeds tolerance, deviation bypass attempt
  TC-CS-066 (EDGE-05): Yield Variance = exact tolerance boundary (lower)
  TC-CS-067 (EDGE-06): Yield Variance = exact tolerance boundary (upper)

Priority 2 — HIGH (validate immediately after):
  TC-CS-058 (HP-03): Confirm multiple operations in sequence
  TC-CS-059 (NEG-01): Non-existent Process Order number
  TC-CS-060 (NEG-02): Invalid Operation number for the given Process Order
  TC-CS-062 (NEG-03): Invalid Scrap Reason Code
  TC-CS-063 (ERR-01): Missing Process Order field
  TC-CS-064 (ERR-02): Missing Operation Number field
  TC-CS-065 (ERR-03): Missing Yield Quantity field
  TC-CS-068 (ERR-04): Missing Scrap Reason Code when Scrap > 0
  TC-CS-069 (EDGE-04): Yield + Scrap > Maximum Order Quantity

Priority 3 — MEDIUM (complete coverage):
  TC-CS-070 (EDGE-01): Yield Quantity = 0 (full scrap scenario)
  TC-CS-071 (EDGE-02): Yield Quantity = Maximum Order Quantity
  TC-CS-072 (EDGE-03): Yield + Scrap = Maximum Order Quantity
  TC-CS-073 (EDGE-07): Scrap Quantity = 0 (no scrap)
  TC-CS-074 (REPORT-01): Access yield trend report by material
  TC-CS-075 (REPORT-02): Access yield trend report by line
  TC-CS-076 (REPORT-03): Access yield trend report by shift

Priority 4 — Integration (run after core stability confirmed):
  None
```

---

## Regulatory and Compliance Notes

**SAP PP Production Confirmations:**
- Process Order confirmations are GxP-relevant records in regulated industries (Pharma, Food & Beverage) — test cases must verify that yield variance thresholds and deviation workflows are enforced per configured business rules
- All test execution must use dedicated test system instances (not production) with representative master data and routing configurations
- Yield variance tolerance thresholds must be configured per material/plant in the SAP test system before executing EDGE-05 and EDGE-06 test cases
- Scrap reason codes must exist in QMFE master data table before executing HP-02, NEG-03, and ERR-04 test cases
- Finished goods batch numbers and inventory management integration depend on correct SAP plant/storage location configuration in the test system

**Data Privacy and Security:**
- Use anonymized or synthetic Process Order numbers and material IDs in test data
- Do not use production shift calendars, work center assignments, or employee IDs in test confirmations
- Ensure test user accounts have PP_CONF authorization object access but restricted to test plant/work center combinations

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-52-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, AP, NEG, ERR, EDGE) — 21 TCs
3. Generate RECOMMENDED types (REPORT) — 3 TCs
4. Apply quality gates table — verify all thresholds are met before completing:
   - AC Traceability: 100% — verify all 6 ACs are covered
   - HP Coverage: 100% — verify all 3 HP scenarios generated
   - AP Coverage: 100% — verify all 3 AP scenarios generated
   - NEG Coverage: 100% — verify all 4 NEG scenarios generated
   - ERR Coverage: 100% — verify all 4 ERR scenarios generated
   - EDGE Coverage: 100% — verify all 7 EDGE scenarios generated
   - REPORT Coverage: 100% — verify all 3 REPORT scenarios generated
   - Parameterization: 100% — no hardcoded Process Order, Operation, Material, or Quantity values
   - Automation Eligibility: ≥ 15 TCs flagged YES — verify at least 15 TCs are marked as Automation Candidate: YES
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above:
   - HP, AP, NEG, ERR: mark all as YES
   - EDGE-01, EDGE-02, EDGE-03, EDGE-04, EDGE-07: mark as YES
   - EDGE-05, EDGE-06: mark as PARTIAL (tolerance config dependency)
   - REPORT: mark all as PARTIAL (data aggregation verification dependency)
7. Output files to `testcases/AI-generated testcases/CS-52/` and `testdata/CS-52/`
8. Include variance tolerance boundary values in testdata JSON (e.g., `varianceToleranceLower: -10`, `varianceToleranceUpper: 10`)
