# Test Strategy: [CS-33] User Story SD-001 - FEFO batch determination for pharmaceutical sales orders

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-33/strategy/CS-33-analysis.md
**Risk Profile:**     jira/userstories/CS-33/strategy/CS-33-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Sales Order Processor
- **Business Object:** Sales Order (batch-managed pharmaceutical materials)
- **SAP Module:** SD — Sales & Distribution
- **Business Goal:** Automatically determine batches using FEFO (First-Expiry-First-Out) strategy to ensure products with the nearest expiration dates are shipped first

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 1 | 1 | CRITICAL |
| Alternative Path (AP) | MANDATORY | 1 | 1 | HIGH |
| Negative (NEG) | MANDATORY | 3 | 3 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 6 | 6 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 5 | 5 | MEDIUM-CRITICAL (mixed) |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | N/A |
| **TOTAL** | — | **16** | **16** | — |

**Rationale for coverage model:**
- **CRITICAL risk** story requires MANDATORY coverage across all applicable scenario types (HP, AP, NEG, ERR, EDGE)
- **Regulatory compliance** context (pharmaceutical batch management) demands 100% validation and boundary coverage
- **Complex business logic** (FEFO algorithm, multi-batch splits, shelf-life thresholds) requires exhaustive edge case testing
- **No integration scenarios** — story has no linked issues

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP) — 1 scenario**

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| HP-01 | Create Sales Order for batch-managed pharmaceutical material with single batch (sufficient stock, valid expiration) | CRITICAL | AC-1, AC-2, AC-5 |

**Alternative Path (AP) — 1 scenario**

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| AP-01 | Create Sales Order with multi-batch split (single batch insufficient, multiple batches required) | HIGH | AC-1, AC-2, AC-4, AC-5 |

**Negative (NEG) — 3 scenarios**

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| NEG-01 | System excludes expired batch (batch expiration date in the past) | CRITICAL | AC-3 |
| NEG-02 | System excludes batch within minimum remaining shelf-life threshold | CRITICAL | AC-3 |
| NEG-03 | No valid batch available (all batches expired or below threshold) — system displays warning | HIGH | AC-3, AC-6 |

**Error / Missing Field (ERR) — 6 scenarios**

| ID | Description | Risk | ACs Covered | Field |
|----|-------------|------|-------------|-------|
| ERR-01 | Missing Customer ID (Sold-To Party) | HIGH | AC-1 | Customer ID |
| ERR-02 | Missing Material ID | HIGH | AC-1 | Material ID |
| ERR-03 | Missing Order Quantity | HIGH | AC-1 | Order Quantity |
| ERR-04 | Missing Sales Organization | HIGH | AC-1 | Sales Organization |
| ERR-05 | Invalid Customer ID (non-existent) | HIGH | AC-1 | Customer ID |
| ERR-06 | Invalid Material ID (non-existent or not batch-managed) | HIGH | AC-1 | Material ID |

**Edge Case / Boundary (EDGE) — 5 scenarios**

| ID | Description | Risk | ACs Covered | Boundary Parameter |
|----|-------------|------|-------------|-------------------|
| EDGE-01 | Order quantity exactly matches single batch available quantity (no split) | MEDIUM | AC-2, AC-4 | Order Quantity (exact match) |
| EDGE-02 | Order quantity exceeds total available stock across all valid batches | HIGH | AC-4, AC-6 | Order Quantity (upper boundary) |
| EDGE-03 | Batch expiration date exactly at minimum shelf-life threshold boundary (threshold date) | CRITICAL | AC-3 | Expiration Date (threshold) |
| EDGE-04 | Minimum order quantity (1 unit) | MEDIUM | AC-2 | Order Quantity (lower boundary) |
| EDGE-05 | Multiple batches with identical expiration dates (FEFO tie-breaker logic) | MEDIUM | AC-2 | Expiration Date (tie-breaker) |

### Recommended Scenarios

None — all scenarios are MANDATORY for CRITICAL risk story.

### Optional Scenarios

None — all scenarios are MANDATORY for CRITICAL risk story.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 1 HP scenarios generated | YES |
| AP Coverage | All 1 AP scenarios generated | YES |
| NEG Coverage | All 3 NEG scenarios generated | YES |
| ERR Coverage | All 6 ERR scenarios generated | YES |
| EDGE Coverage | All 5 EDGE scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 8 TCs flagged as Automation Candidate: YES | YES |

**Additional gates for CRITICAL risk story:**

| Additional Gate | Threshold | Mandatory |
|----------------|-----------|-----------|
| Negative coverage (entity validation) | 100% — 3 NEG scenarios covering expired batch, insufficient shelf-life, no valid batch | YES |
| Error coverage (mandatory fields) | 100% — 6 ERR scenarios covering all 4 mandatory input fields + 2 master data validations | YES |
| Boundary coverage (regulatory thresholds) | 100% — EDGE-03 (shelf-life threshold) must be included as CRITICAL priority | YES |

**Overall pass threshold:** All mandatory gates must PASS. 100% of test cases must be automation-eligible (YES or PARTIAL).

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Core sales order creation for batch-managed materials — revenue-impacting |
| AP (multi-batch split) | HIGH | MAJOR | Complex allocation logic — business process continuity risk |
| NEG (expired batch) | CRITICAL | CRITICAL | Regulatory compliance risk — shipping expired drugs to customers |
| NEG (shelf-life threshold) | CRITICAL | CRITICAL | Regulatory compliance risk — pharmaceutical industry requirement (FDA/EMA) |
| NEG (no valid batch warning) | HIGH | MAJOR | Business process risk — order cannot be fulfilled without valid batches |
| ERR (missing mandatory fields) | HIGH | MAJOR | Data integrity failure — prevents SO creation |
| ERR (invalid master data) | HIGH | MAJOR | External dependency failure — blocks transaction |
| EDGE (threshold boundary) | CRITICAL | CRITICAL | Regulatory edge case — exact boundary behavior must be verified |
| EDGE (quantity boundaries) | MEDIUM | MINOR | Standard boundary testing for numeric fields |
| EDGE (tie-breaker logic) | MEDIUM | MINOR | Algorithm correctness — low business impact if tie-breaker uses secondary criteria |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Stable, repeatable, regression-critical — ideal for Playwright |
| AP | YES | Data-driven via testdata JSON — multi-batch scenarios can be parameterized |
| NEG | YES | Validation checks are stable and repeatable — SAP system behavior is deterministic |
| ERR | YES | Field-level validation is stable — error messages are consistent |
| EDGE | PARTIAL | Some edge cases (EDGE-03 threshold, EDGE-02 insufficient stock) require specific batch master data setup — may need manual preconditions |
| INT | N/A | No integration scenarios |

**Automation candidates by scenario:**
- HP-01: YES (single batch allocation with standard test data)
- AP-01: YES (multi-batch split can be scripted with pre-configured batch data)
- NEG-01: YES (expired batch test data can be maintained in SAP test system)
- NEG-02: YES (shelf-life threshold test data can be maintained)
- NEG-03: YES (no valid batch scenario can be scripted by using exhausted batches)
- ERR-01 to ERR-06: YES (all field validations are deterministic and stable)
- EDGE-01: YES (exact quantity match can be parameterized)
- EDGE-02: PARTIAL (requires batch stock data setup to create insufficient stock condition)
- EDGE-03: PARTIAL (requires precise expiration date setup to hit threshold boundary — may require manual date calculation)
- EDGE-04: YES (minimum quantity test case is straightforward)
- EDGE-05: PARTIAL (tie-breaker logic requires multiple batches with identical expiration dates — may need manual setup)

**Target automation coverage:** 13 of 16 TCs (81%) — 10 YES + 3 PARTIAL

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-034 (HP-01: Single batch allocation with valid expiration)
  TC-CS-036 (NEG-01: Expired batch exclusion)
  TC-CS-037 (NEG-02: Shelf-life threshold exclusion)
  TC-CS-044 (EDGE-03: Exact threshold boundary date)

Priority 2 — HIGH (validate immediately after):
  TC-CS-035 (AP-01: Multi-batch split)
  TC-CS-038 (NEG-03: No valid batch available warning)
  TC-CS-039 (ERR-01: Missing Customer ID)
  TC-CS-040 (ERR-02: Missing Material ID)
  TC-CS-041 (ERR-03: Missing Order Quantity)
  TC-CS-042 (ERR-04: Missing Sales Organization)
  TC-CS-043 (ERR-05: Invalid Customer ID)
  TC-CS-045 (ERR-06: Invalid Material ID)
  TC-CS-046 (EDGE-02: Quantity exceeds available stock)

Priority 3 — MEDIUM (complete coverage):
  TC-CS-047 (EDGE-01: Exact quantity match)
  TC-CS-048 (EDGE-04: Minimum quantity)
  TC-CS-049 (EDGE-05: Tie-breaker logic)

Priority 4 — Integration (run after core stability confirmed):
  (None — no integration test cases for this story)
```

**Execution dependencies:**
- All test cases are independent and can be executed in parallel (no sequential dependencies)
- However, execution order above follows risk-descending approach for early failure detection
- CRITICAL scenarios should be executed first in CI/CD pipeline to fail fast on regulatory violations

---

## Regulatory and Compliance Notes

**Pharmaceutical Industry Context:**
- **FEFO batch determination** is a regulatory requirement in pharmaceutical supply chains (FDA 21 CFR Part 11, EU GDP Guidelines)
- Test cases **NEG-01, NEG-02, NEG-03, EDGE-03** directly validate regulatory compliance — failures in these scenarios constitute audit findings
- **Minimum remaining shelf-life (SLED)** enforcement must be verified — customers must receive products with sufficient remaining shelf-life per contractual agreements and regulatory guidance
- **Batch traceability** is mandatory — AC-5 verification (batch numbers and expiration dates displayed on SO line items) ensures audit trail for downstream logistics and quality management

**SAP Test Data Governance:**
- Use dedicated **test customer master data** (KNA1) — do not use real production customer IDs
- Use dedicated **test batch-managed materials** (MARA with XCHPF=X) — ensure test materials are flagged as batch-managed in Customizing
- Maintain **test batch records** (MCHA) with varied expiration dates for FEFO testing
- Ensure **test sales organization, distribution channel, division** (MVKE configuration) is active for test materials
- All test execution must use **dedicated SAP test tenant** (not production) — currently: my426318.s4hana.cloud.sap (test tenant)

**Data Privacy:**
- No sensitive customer data or production vendor/material IDs in test datasets
- Use anonymized test data following SAP Data Protection and Privacy guidelines

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-33-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, AP, NEG, ERR, EDGE)
3. Do not skip any scenario types — this is a CRITICAL risk story requiring 100% coverage
4. Apply quality gates table — verify all thresholds are met before completing:
   - 100% AC traceability (all 6 ACs covered)
   - All 16 scenarios generated (1 HP + 1 AP + 3 NEG + 6 ERR + 5 EDGE)
   - 0 hardcoded values (all test data must use `{TD.*}` placeholders)
   - ≥ 8 TCs flagged as Automation Candidate: YES
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above:
   - YES: HP-01, AP-01, NEG-01, NEG-02, NEG-03, ERR-01 to ERR-06, EDGE-01, EDGE-04
   - PARTIAL: EDGE-02, EDGE-03, EDGE-05
7. Assign test case priorities per the Test Case Priority Assignment table:
   - CRITICAL: HP-01, NEG-01, NEG-02, EDGE-03
   - HIGH: AP-01, NEG-03, ERR-01 to ERR-06, EDGE-02
   - MEDIUM: EDGE-01, EDGE-04, EDGE-05
8. Output files to:
   - `testcases/AI-generated testcases/CS-33/testcases/` — individual TC markdown files
   - `testcases/AI-generated testcases/CS-33/CS-33-coverage-matrix.md` — AC-to-TC traceability
   - `testcases/AI-generated testcases/CS-33/CS-33-summary.json` — machine-readable registry
   - `testdata/CS-33/CS-33-testdata.json` — parameterized test datasets
   - `testdata/CS-33/CS-33-testdata-guide.md` — guide for resolving test data placeholders

**Special attention required:**
- **NEG-01, NEG-02, NEG-03**: Verify that expected results include exact SAP warning messages for batch exclusion and no valid batch scenarios
- **EDGE-03**: Batch expiration date must be calculated as `current_date + SLED_threshold` — parameterize SLED value in test data
- **AP-01**: Multi-batch split scenario must verify that multiple line items are created with correct batch allocations (sum of quantities = order quantity)
- **ERR-06**: Invalid Material ID test case must distinguish between non-existent material and non-batch-managed material (two sub-scenarios)
