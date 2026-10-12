# Test Strategy: [CS-44] Block Sales Order when customer exceeds credit limit

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-44/strategy/CS-44-analysis.md
**Risk Profile:**     jira/userstories/CS-44/strategy/CS-44-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Credit Controller
- **Business Object:** Sales Order (SD-012)
- **SAP Module:** SD — Sales & Distribution
- **Business Goal:** Minimize risk of bad debt and enforce credit control policies before shipping pharmaceutical products

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 5 | 5 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 2 | 2 | HIGH |
| Negative (NEG) | MANDATORY | 3 | 3 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 4 | 4 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 5 | 5 | CRITICAL |
| Integration (INT) | RECOMMENDED | 4 | 4 | HIGH |
| **TOTAL** | — | **23** | **23** | — |

**Rationale:**

This CRITICAL risk story requires comprehensive coverage across all scenario types:

- **HP**: MANDATORY — 5 test cases covering the core credit check workflow at different credit exposure levels (under/at/over limit) and trigger points (Save vs Release)
- **AP**: RECOMMENDED — 2 test cases for alternative configurations (zero credit limit + multi-line items)
- **NEG**: MANDATORY — 3 test cases for invalid master data configurations that prevent credit check execution
- **ERR**: MANDATORY — 4 test cases for mandatory field validation (all required fields per AC-1)
- **EDGE**: MANDATORY — 5 test cases for boundary value analysis at critical decision points (99%/100%/101% of limit + min quantity + zero exposure)
- **INT**: RECOMMENDED — 4 test cases for cross-module integration (FI-AR, SD-Delivery, workflow notification, manual release)

All ACs have CRITICAL or HIGH risk — no coverage reduction is justified.

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path:**
- **HP-01**: Create SO for customer under credit limit — no block — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3
- **HP-02**: Create SO for customer at exactly 100% credit limit — no block — Risk: CRITICAL — ACs: AC-2, AC-3, AC-4
- **HP-03**: Create SO for customer exceeding credit limit — blocked with status B — Risk: CRITICAL — ACs: AC-2, AC-3, AC-4, AC-5
- **HP-04**: Credit check triggers on Save action — Risk: HIGH — ACs: AC-2
- **HP-05**: Credit check triggers on Release action — Risk: HIGH — ACs: AC-2

**Negative:**
- **NEG-01**: Create SO for customer without credit limit configured — no credit check performed — Risk: HIGH — ACs: AC-2, AC-3
- **NEG-02**: Create SO for customer not assigned to credit control area — no credit check — Risk: HIGH — ACs: AC-2, AC-3
- **NEG-03**: Attempt to create SO with invalid customer ID — Risk: MEDIUM — ACs: AC-1

**Error / Missing Field:**
- **ERR-01**: Missing Sold-to Party field — Risk: HIGH — ACs: AC-1
- **ERR-02**: Missing Material field — Risk: HIGH — ACs: AC-1
- **ERR-03**: Missing Order Quantity field — Risk: HIGH — ACs: AC-1
- **ERR-04**: Zero Order Quantity — Risk: HIGH — ACs: AC-1

**Edge Case / Boundary:**
- **EDGE-01**: Credit exposure at 99% of limit (just under) — no block — Risk: CRITICAL — ACs: AC-3, AC-4
- **EDGE-02**: Credit exposure at 100% of limit (exactly at) — no block — Risk: CRITICAL — ACs: AC-3, AC-4
- **EDGE-03**: Credit exposure at 101% of limit (just over) — blocked — Risk: CRITICAL — ACs: AC-3, AC-4
- **EDGE-04**: Minimum order quantity (1 unit) — credit check still performed — Risk: MEDIUM — ACs: AC-2, AC-3
- **EDGE-05**: Customer with zero existing exposure — first SO creation — Risk: MEDIUM — ACs: AC-3

### Recommended Scenarios

**Alternative Path:**
- **AP-01**: Create SO for customer with zero credit limit (no credit check) — Risk: MEDIUM — ACs: AC-1, AC-2
- **AP-02**: Create SO with multiple line items — total value exceeds limit — blocked — Risk: HIGH — ACs: AC-3, AC-4

**Integration:**
- **INT-01**: Credit exposure calculation includes open invoices from FI-AR — Risk: MEDIUM — ACs: AC-3
- **INT-02**: Credit exposure calculation includes open deliveries from SD — Risk: MEDIUM — ACs: AC-3
- **INT-03**: Notification work item sent to Credit Control team inbox — Risk: HIGH — ACs: AC-6
- **INT-04**: Manual release by authorized Credit Controller after review — Risk: MEDIUM — ACs: AC-6

### Optional Scenarios

None — all scenario types are MANDATORY or RECOMMENDED for this CRITICAL risk story.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC covered by ≥ 1 TC | YES |
| HP Coverage | All 5 HP scenarios generated | YES |
| NEG Coverage | All 3 NEG scenarios generated | YES |
| ERR Coverage | All 4 ERR scenarios generated | YES |
| EDGE Coverage | All 5 EDGE scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 12 TCs flagged as Automation Candidate: YES | YES |

**Additional CRITICAL risk gates:**

| Additional Gate | Threshold | Mandatory |
|----------------|-----------|---------|
| Negative coverage (entity validation) | 100% — all 3 NEG scenarios cover master data validation | YES |
| Error coverage (mandatory fields) | 100% — all 4 mandatory fields from AC-1 tested | YES |
| Boundary value coverage (credit exposure) | 100% — 99%/100%/101% scenarios generated | YES |

**Overall pass threshold:** All mandatory gates must PASS. Recommended gates (AP and INT coverage) should achieve ≥ 75% coverage (6 of 6 scenarios generated).

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Core credit check workflow — failure allows bad debt exposure |
| HP (trigger points) | HIGH | MAJOR | Verify credit check executes at both Save and Release control points |
| NEG (invalid master data) | HIGH | MAJOR | Missing/incorrect credit config prevents credit check — silent failure risk |
| ERR (missing mandatory field) | HIGH | MAJOR | Data integrity — SO creation must enforce required fields |
| EDGE (credit exposure boundaries) | CRITICAL | CRITICAL | Decision point at 99%/100%/101% determines block outcome — incorrect calculation = business risk |
| AP (alternative configurations) | MEDIUM | MINOR | Valid edge configurations (zero limit, multi-line) — lower business impact |
| INT (cross-module) | HIGH | MAJOR | FI/SD integration failures affect credit exposure calculation accuracy |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright — stable credit check workflow |
| AP | YES | Data-driven via testdata JSON (zero limit + multi-line scenarios) |
| NEG | YES | Stable validation checks for master data configuration |
| ERR | YES | Field-level validation stable and repeatable |
| EDGE | PARTIAL | Boundary tests require specific customer credit master data setup in SAP (KNKK table) — pre-configured test customers needed |
| INT | PARTIAL | FI-AR and SD-Delivery integration requires existing open documents (invoices, deliveries) in test system; workflow notification requires SAP workflow configuration |

**Target automation coverage:** 17 of 23 TCs (74%)

**Automation blockers:**
- EDGE scenarios (EDGE-01/02/03) require pre-configured test customers with specific credit limits and existing exposure
- INT-01/02 require pre-existing open invoices/deliveries in FI-AR and SD modules
- INT-03/04 require SAP workflow system configuration (notification work items + manual release authorization)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  HP-01: Create SO under credit limit — no block
  HP-03: Create SO exceeding credit limit — blocked
  EDGE-01: Credit exposure at 99% of limit — no block
  EDGE-02: Credit exposure at 100% of limit — no block
  EDGE-03: Credit exposure at 101% of limit — blocked

Priority 2 — HIGH (validate immediately after):
  HP-04: Credit check triggers on Save
  HP-05: Credit check triggers on Release
  NEG-01: Customer without credit limit configured
  NEG-02: Customer not assigned to credit control area
  NEG-03: Invalid customer ID
  ERR-01: Missing Sold-to Party
  ERR-02: Missing Material
  ERR-03: Missing Order Quantity
  ERR-04: Zero Order Quantity
  AP-02: Multiple line items — total exceeds limit

Priority 3 — MEDIUM (complete coverage):
  HP-02: Create SO at exactly 100% credit limit
  EDGE-04: Minimum order quantity (1 unit)
  EDGE-05: Customer with zero existing exposure
  AP-01: Customer with zero credit limit (no check)

Priority 4 — Integration (run after core stability confirmed):
  INT-01: Credit exposure includes FI-AR open invoices
  INT-02: Credit exposure includes SD open deliveries
  INT-03: Notification work item sent to Credit Control team
  INT-04: Manual release by authorized Credit Controller
```

---

## Regulatory and Compliance Notes

**SAP SD Credit Management:**
- Credit checks are part of enterprise credit risk management and may be subject to financial controls auditing (SOX compliance if applicable)
- Test cases must verify that credit blocks cannot be bypassed without proper authorization (AC-6)
- Ensure test data does not use real production customer IDs — use dedicated test customers with "TEST" prefix in customer master (KNA1)
- All test execution must use dedicated test system instances (not production) to avoid impacting live sales order processing

**Authorization Requirements:**
- Credit Controller role must have authorization object F_KNA1_BUK (Customer Master Credit Management)
- Manual release workflow (INT-04) requires authorization to remove credit blocks — test with proper role assignment

**Data Privacy:**
- Credit limit and exposure values may be considered sensitive financial data — ensure test reports do not expose production customer credit information

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-44-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, NEG, ERR, EDGE) — 17 TCs minimum
3. Generate RECOMMENDED types (AP, INT) unless time/scope constraints apply — target 23 TCs total
4. Apply quality gates table — verify all thresholds are met before completing:
   - 100% AC traceability (all 6 ACs covered)
   - 100% HP coverage (5 scenarios)
   - 100% NEG coverage (3 scenarios)
   - 100% ERR coverage (4 scenarios)
   - 100% EDGE coverage (5 scenarios, including 99%/100%/101% boundaries)
   - 0 hardcoded SAP values (all data via `{TD.*}` placeholders)
   - ≥ 12 TCs flagged as Automation Candidate: YES
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above:
   - HP, AP, NEG, ERR → Automation Candidate: YES
   - EDGE → Automation Candidate: PARTIAL (note: requires pre-configured test customer data)
   - INT → Automation Candidate: PARTIAL (note: requires FI/SD integration setup + workflow config)
7. Output files to `testcases/AI-generated testcases/CS-44/` and `testdata/CS-44/`
8. Test data requirements:
   - Customer IDs: 3 test customers required (under/at/over credit limit scenarios)
   - Material IDs: 1 test material
   - Sales Organization/Distribution Channel/Division: standard test org data
   - Credit limits: configure specific limits to enable 99%/100%/101% boundary tests
   - Invalid customer ID for NEG-03: use `9999999999`
   - Customer without credit limit (NEG-01): requires SAP master data setup
   - Customer not assigned to credit control area (NEG-02): requires SAP master data setup
