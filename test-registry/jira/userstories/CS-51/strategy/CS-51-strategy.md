# Test Strategy: [CS-51] Perform A Goods Issue (Backflush) Of Raw Material Batches To A Process

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-51/strategy/CS-51-analysis.md
**Risk Profile:**     jira/userstories/CS-51/strategy/CS-51-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Production Operator
- **Business Object:** Process Order / Goods Movement / Batch Inventory Record
- **SAP Module:** PP — Production Planning and Control
- **Business Goal:** Automatically record component consumption with full batch traceability to the finished product

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 2 | 2 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 2 | 2 | HIGH |
| Negative (NEG) | MANDATORY | 2 | 2 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 4 | 4 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 4 | 4 | MEDIUM |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | — |
| **TOTAL** | — | **14** | **14** | — |

**Rationale for Coverage Model:**
- CRITICAL risk story requires mandatory coverage across all functional scenario types
- EDGE scenarios elevated to MANDATORY due to batch quantity boundaries, expiration dates, and FEFO logic being business-critical
- INT marked NOT APPLICABLE (no Jira-linked issues), though implicit SAP module integration with MM/QM exists

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP) — 2 scenarios**

1. **HP-01**: Confirm process order with single batch consumption (FEFO-proposed batch has exact quantity)
   - Risk: CRITICAL
   - ACs covered: AC-1, AC-2, AC-4, AC-6
   - Validates: Navigation, FEFO batch proposal, batch genealogy recording, inventory update

2. **HP-02**: Confirm process order with yield quantity that triggers consumption of primary batch (FEFO logic)
   - Risk: CRITICAL
   - ACs covered: AC-2, AC-4, AC-6
   - Validates: FEFO batch selection algorithm, batch traceability linkage, real-time inventory reduction

**Negative (NEG) — 2 scenarios**

3. **NEG-01**: Attempt to consume a batch on quality hold (QI blocked)
   - Risk: CRITICAL
   - ACs covered: AC-3
   - Validates: Quality hold validation prevents consumption (compliance-critical)

4. **NEG-02**: Attempt to consume an expired batch (SLED < system date)
   - Risk: CRITICAL
   - ACs covered: AC-3
   - Validates: Expiration date validation prevents consumption (compliance-critical)

**Error (ERR) — 4 scenarios**

5. **ERR-01**: Missing Process Order Number field
   - Risk: HIGH
   - ACs covered: (implicit mandatory field)
   - Validates: Mandatory field validation

6. **ERR-02**: Missing Yield Quantity field
   - Risk: HIGH
   - ACs covered: (implicit mandatory field)
   - Validates: Mandatory field validation

7. **ERR-03**: Missing Posting Date field
   - Risk: HIGH
   - ACs covered: (implicit mandatory field)
   - Validates: Mandatory field validation

8. **ERR-04**: Process Order in incorrect status (e.g., "Locked", "Closed")
   - Risk: HIGH
   - ACs covered: (implicit business rule)
   - Validates: Process order status prerequisite enforcement

**Edge (EDGE) — 4 scenarios**

9. **EDGE-01**: Minimum yield quantity (0.001 per UoM)
   - Risk: MEDIUM
   - ACs covered: AC-2, AC-6
   - Validates: Lower boundary handling for yield quantity, inventory precision

10. **EDGE-02**: Batch available quantity exactly matches required quantity (boundary)
    - Risk: MEDIUM
    - ACs covered: AC-2, AC-5
    - Validates: Exact quantity consumption without substitute batch trigger

11. **EDGE-03**: Batch expiration date is today (SLED = system date)
    - Risk: HIGH
    - ACs covered: AC-3
    - Validates: Boundary condition for expiration validation (same-day expiry handling)

12. **EDGE-04**: Zero available quantity for FEFO-proposed batch (triggers immediate substitute)
    - Risk: HIGH
    - ACs covered: AC-2, AC-5
    - Validates: Substitute batch selection when primary batch is fully depleted

---

### Recommended Scenarios

**Alternative Path (AP) — 2 scenarios**

13. **AP-01**: Confirm process order requiring multiple batches (primary batch insufficient, substitute batch auto-selected with warning)
    - Risk: HIGH
    - ACs covered: AC-2, AC-5, AC-6
    - Validates: Multi-batch consumption logic, substitute warning display, inventory update across batches

14. **AP-02**: Manually override FEFO-proposed batch and select a different valid batch
    - Risk: MEDIUM
    - ACs covered: AC-2, AC-4, AC-6
    - Validates: Manual batch selection override capability, genealogy recording for non-FEFO batch

---

### Optional Scenarios

None.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — all 6 ACs covered by ≥ 1 TC | YES |
| HP Coverage | All 2 HP scenarios generated | YES |
| NEG Coverage | All 2 NEG scenarios generated | YES |
| ERR Coverage | All 4 ERR scenarios generated | YES |
| EDGE Coverage | All 4 EDGE scenarios generated | YES |
| AP Coverage | All 2 AP scenarios generated | RECOMMENDED |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 8 TCs flagged as Automation Candidate: YES | YES |
| Batch Traceability Verification | Every HP/AP TC includes explicit batch genealogy verification step | YES |
| FEFO Logic Verification | Every HP/AP TC includes explicit FEFO batch proposal verification step | YES |

**Overall pass threshold:** All mandatory gates must PASS. At least 80% of recommended gates must PASS.

**Additional CRITICAL risk gates:**
- Negative coverage (entity validation): 100% — 2 NEG TCs for quality hold + expired batch (PASSED)
- Error coverage (mandatory fields): 100% — 4 ERR TCs for all mandatory fields + process order status (PASSED)

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Batch backflush is a core PP transaction; failure blocks production confirmation |
| NEG (quality hold / expired batch) | CRITICAL | CRITICAL | Compliance-critical validations; consuming blocked/expired batches violates regulatory requirements |
| ERR (missing fields / order status) | HIGH | MAJOR | Prevents invalid process order confirmations; protects data integrity |
| EDGE (batch quantity boundaries / expiration) | HIGH | MAJOR | FEFO logic and batch boundaries directly impact traceability and compliance |
| AP (multi-batch / manual override) | HIGH | MAJOR | Multi-batch consumption is a common production scenario; failure impacts throughput |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright; stable FEFO logic and batch recording |
| AP | YES | Data-driven via testdata JSON; multi-batch scenarios repeatable with test master data |
| NEG | YES | Stable validation checks; quality hold and expiration validations are deterministic |
| ERR | YES | Field-level validation is stable and repeatable |
| EDGE | PARTIAL | Boundary scenarios require specific batch master data setup (SLED dates, available quantities); may require manual test data preparation in SAP |
| INT | NOT APPLICABLE | No integration scenarios defined |

**Target automation coverage:** 12 of 14 TCs (86%)

**Automation prerequisites:**
- Test process orders in "Released" status must exist in SAP test system
- Batch-managed raw materials with multiple batches (varying SLED, quantities, quality statuses) must be configured
- BOM with backflush components must be linked to test process orders
- Test batches with quality hold status and expired SLED dates must be available
- Batch genealogy verification requires access to batch classification tables (AUSP/INOB) or Fiori batch traceability app

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-021 (HP-01): Single batch consumption with FEFO logic
  TC-CS-022 (HP-02): Primary batch consumption with yield-based calculation
  TC-CS-025 (NEG-01): Quality hold batch rejection
  TC-CS-026 (NEG-02): Expired batch rejection

Priority 2 — HIGH (validate immediately after):
  TC-CS-027 (ERR-01): Missing Process Order Number
  TC-CS-028 (ERR-02): Missing Yield Quantity
  TC-CS-029 (ERR-03): Missing Posting Date
  TC-CS-030 (ERR-04): Invalid Process Order status
  TC-CS-023 (AP-01): Multi-batch consumption with substitute warning
  TC-CS-031 (EDGE-03): Batch expiration boundary (SLED = today)
  TC-CS-032 (EDGE-04): Zero available quantity triggers substitute

Priority 3 — MEDIUM (complete coverage):
  TC-CS-024 (AP-02): Manual batch override
  TC-CS-033 (EDGE-01): Minimum yield quantity
  TC-CS-034 (EDGE-02): Exact batch quantity match
```

**Execution notes:**
- Critical priority TCs (batch validation, FEFO logic) must pass before proceeding to alternative/edge scenarios
- ERR scenarios can run in parallel (no dependencies)
- EDGE scenarios require specific test data setup; execute after HP scenarios confirm baseline functionality
- Multi-batch AP-01 scenario depends on HP-01/HP-02 passing (validates single-batch logic first)

---

## Regulatory and Compliance Notes

**SAP PP Production Process Compliance:**
- Batch backflush goods issue creates legally binding inventory movements and batch genealogy records
- Test cases must verify that quality hold and expiration validations cannot be bypassed (regulatory compliance for pharmaceutical, food, chemical industries)
- Batch traceability is required for product recalls and regulatory audits — every TC must verify genealogy linkage
- Ensure test data uses dedicated test batches (not production batches) to avoid contaminating real batch genealogy records

**Data Privacy:**
- Test process orders and batches must use fictional material descriptions and batch numbers
- Do not use production plant codes or storage locations in test data

**Test System Configuration:**
- All test execution must use dedicated SAP test system (not production or quality assurance systems with production data)
- Test batches must be marked with "TEST" prefix in batch number or batch classification to prevent accidental use in real production

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-51-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, NEG, ERR, EDGE)
3. Generate RECOMMENDED types (AP) unless time/scope constraints apply
4. Apply quality gates table — verify all thresholds are met before completing:
   - 100% AC traceability (all 6 ACs covered)
   - All 2 HP scenarios generated
   - All 2 NEG scenarios generated
   - All 4 ERR scenarios generated
   - All 4 EDGE scenarios generated
   - All 2 AP scenarios generated (recommended)
   - 0 hardcoded SAP values (use {TD.*} placeholders)
   - ≥ 8 TCs flagged as Automation Candidate: YES
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above
7. Output files to `testcases/AI-generated testcases/CS-51/` and `testdata/CS-51/`
8. **Batch traceability verification:** Every HP/AP test case MUST include a verification step that confirms the consumed batch number is recorded against the process order's finished product batch (via batch genealogy/WHERE-USED query)
9. **FEFO logic verification:** Every HP/AP test case MUST include a verification step that confirms the system proposed the correct batch based on FEFO (earliest SLED first)
