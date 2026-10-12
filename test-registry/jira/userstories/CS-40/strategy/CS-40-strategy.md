# Test Strategy: [CS-40] User Story SD-008 - ATP check excluding batches nearing expiration

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-40/strategy/CS-40-analysis.md
**Risk Profile:**     jira/userstories/CS-40/strategy/CS-40-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Sales Order Processor
- **Business Object:** Sales Order (batch-managed pharmaceutical material)
- **SAP Module:** SD — Sales & Distribution
- **Business Goal:** Ensure customers receive products with adequate remaining shelf-life and minimize the risk of returns due to short expiration dates

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 1 | 1 | CRITICAL |
| Alternative Path (AP) | MANDATORY | 1 | 1 | HIGH |
| Negative (NEG) | MANDATORY | 4 | 4 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 7 | 7 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 6 | 6 | MEDIUM |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | N/A |
| **TOTAL** | — | **19** | **19** | — |

**Rationale:** CRITICAL risk story with complex ATP + batch management + shelf-life logic. All scenario types except INT are MANDATORY due to:
- Multi-layered business logic (ATP check + batch determination + shelf-life calculation + authorization override)
- HIGH failure probability for ATP/batch logic (custom logic requiring multi-table integration)
- CRITICAL business impact (expired products shipped = regulatory violation + customer safety risk + revenue loss)
- Authorization-controlled override path requires AP + NEG coverage
- 7 mandatory fields + 3 invalid data conditions require comprehensive ERR coverage
- 6 boundary conditions (exact threshold dates, quantity boundaries, mixed batch scenarios) require EDGE coverage

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP):**
1. **HP-01** — Create Sales Order for batch-managed pharmaceutical material with sufficient stock having adequate shelf-life (> min threshold), ATP check passes, delivery date confirmed, order saved successfully
   - **Risk:** CRITICAL
   - **ACs Covered:** AC-1, AC-2, AC-3, AC-4
   - **Priority:** CRITICAL

**Alternative Path (AP):**
1. **AP-01** — User with override authorization creates Sales Order and manually overrides shelf-life restriction to use a batch nearing expiration (e.g., discount sale scenario), order saved successfully
   - **Risk:** HIGH
   - **ACs Covered:** AC-1, AC-6
   - **Priority:** HIGH

**Negative (NEG):**
1. **NEG-01** — Create Sales Order for batch-managed material where all available batches have remaining shelf-life < min threshold, ATP check fails, warning message displayed, order cannot be saved
   - **Risk:** CRITICAL
   - **ACs Covered:** AC-2, AC-3, AC-5
   - **Priority:** HIGH

2. **NEG-02** — User without override authorization attempts to override shelf-life restriction, system rejects override, order cannot proceed with near-expiration batch
   - **Risk:** HIGH
   - **ACs Covered:** AC-6
   - **Priority:** HIGH

3. **NEG-03** — Create Sales Order for batch-managed material with zero unrestricted stock, ATP check fails, warning message displayed (standard ATP failure, not shelf-life specific)
   - **Risk:** HIGH
   - **ACs Covered:** AC-2, AC-5
   - **Priority:** HIGH

4. **NEG-04** — Create Sales Order for material that is NOT batch-managed (MARA.XCHPF = blank), system performs standard ATP check without shelf-life logic (feature not applicable)
   - **Risk:** MEDIUM
   - **ACs Covered:** AC-1, AC-2
   - **Priority:** MEDIUM

**Error / Missing Field (ERR):**
1. **ERR-01** — Missing Sold-to Party (Customer ID)
   - **Risk:** HIGH
   - **ACs Covered:** AC-1
   - **Priority:** HIGH

2. **ERR-02** — Missing Material ID
   - **Risk:** HIGH
   - **ACs Covered:** AC-1
   - **Priority:** HIGH

3. **ERR-03** — Missing Order Quantity
   - **Risk:** HIGH
   - **ACs Covered:** AC-1
   - **Priority:** HIGH

4. **ERR-04** — Missing Sales Organization
   - **Risk:** HIGH
   - **ACs Covered:** AC-1
   - **Priority:** HIGH

5. **ERR-05** — Invalid Customer ID (does not exist in customer master)
   - **Risk:** HIGH
   - **ACs Covered:** AC-1
   - **Priority:** HIGH

6. **ERR-06** — Invalid Material ID (does not exist in material master)
   - **Risk:** HIGH
   - **ACs Covered:** AC-1
   - **Priority:** HIGH

7. **ERR-07** — Material not extended to Sales Org/Distribution Channel (MVKE entry missing)
   - **Risk:** HIGH
   - **ACs Covered:** AC-1
   - **Priority:** HIGH

**Edge Cases (EDGE):**
1. **EDGE-01** — Batch expiration date exactly equals (current date + min shelf-life threshold) — boundary condition — verify if batch is included or excluded from ATP
   - **Risk:** CRITICAL
   - **ACs Covered:** AC-3
   - **Priority:** CRITICAL

2. **EDGE-02** — Order Quantity equals exact available ATP stock (with shelf-life filter applied) — full consumption — verify delivery date and stock allocation
   - **Risk:** MEDIUM
   - **ACs Covered:** AC-2, AC-4
   - **Priority:** MEDIUM

3. **EDGE-03** — Order Quantity exceeds available ATP stock (with shelf-life filter applied) by 1 unit — verify ATP failure warning
   - **Risk:** MEDIUM
   - **ACs Covered:** AC-5
   - **Priority:** MEDIUM

4. **EDGE-04** — Requested Delivery Date is today (same day) — verify ATP check uses today as base date for shelf-life calculation
   - **Risk:** MEDIUM
   - **ACs Covered:** AC-4
   - **Priority:** MEDIUM

5. **EDGE-05** — Minimum shelf-life threshold configured as 0 days (no restriction) — verify all batches included in ATP regardless of expiration date
   - **Risk:** LOW
   - **ACs Covered:** AC-3
   - **Priority:** LOW

6. **EDGE-06** — Material has multiple batches: one with adequate shelf-life (> threshold), one near expiration (< threshold) — verify system selects only adequate batch
   - **Risk:** CRITICAL
   - **ACs Covered:** AC-3
   - **Priority:** CRITICAL

### Recommended Scenarios

None — all identified scenarios are MANDATORY due to CRITICAL risk level.

### Optional Scenarios

None — all identified scenarios are MANDATORY due to CRITICAL risk level.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 1 HP scenarios generated | YES |
| AP Coverage | All 1 AP scenarios generated | YES |
| NEG Coverage | All 4 NEG scenarios generated | YES |
| ERR Coverage | All 7 ERR scenarios generated | YES |
| EDGE Coverage | All 6 EDGE scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 12 TCs flagged as Automation Candidate: YES (HP + AP + NEG + ERR = 13 TCs) | YES |

**Overall pass threshold:** All mandatory gates must PASS. 100% of gates must PASS (all gates are mandatory due to CRITICAL risk).

**Additional CRITICAL risk gates:**
- **Negative coverage (entity validation):** 100% — all 4 NEG scenarios must be generated (ATP failure due to shelf-life, unauthorized override, zero stock, non-batch-managed material)
- **Error coverage (mandatory fields):** 100% — all 7 ERR scenarios must be generated (3 missing mandatory fields + 1 missing sales org + 3 invalid/misconfigured data)
- **Edge coverage (boundary conditions):** 100% — all 6 EDGE scenarios must be generated (exact threshold date, exact ATP stock, ATP stock exceeded by 1 unit, same-day delivery, zero threshold config, mixed batch shelf-life)

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Core transactional operation for batch-managed pharmaceutical material — revenue-generating transaction; ATP logic with shelf-life filtering is the primary feature |
| AP (authorized override) | HIGH | MAJOR | Business-critical alternative path — enables discount sales and urgent orders; authorization-controlled feature |
| NEG (ATP failure scenarios) | HIGH | MAJOR | Business process blocked — invalid master data or insufficient stock prevents order creation; critical user notifications (warning messages) must be verified |
| ERR (missing mandatory fields) | HIGH | MAJOR | Data integrity failure — SAP prevents transaction without mandatory fields; ensures data completeness |
| EDGE (boundary conditions) | CRITICAL / MEDIUM | MAJOR / MINOR | EDGE-01 and EDGE-06 are CRITICAL (exact threshold date and mixed batch scenarios define the core shelf-life logic correctness); other EDGE scenarios are MEDIUM (important but secondary to core path) |
| INT (integration) | N/A | N/A | Not applicable — no linked issues identified |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidate for Playwright — stable, repeatable, business-critical |
| AP | PARTIAL | Requires user authorization setup (user with override auth) — automation feasible if test users are pre-configured with authorization object; mark PARTIAL due to authorization dependency |
| NEG | YES | Stable validation checks — ATP failure messages, authorization rejection messages are machine-verifiable |
| ERR | YES | Field-level validation is stable — missing field error messages are machine-verifiable |
| EDGE | PARTIAL | Requires specific SAP configuration: (1) batches with specific expiration dates, (2) specific ATP stock quantities, (3) material shelf-life threshold config — automation feasible but requires careful test data setup in SAP |
| INT | N/A | Not applicable |

**Target automation coverage:** 13 of 19 TCs (68%)
- **Full automation (YES):** 12 TCs (HP: 1, NEG: 4, ERR: 7)
- **Partial automation (PARTIAL):** 7 TCs (AP: 1, EDGE: 6) — feasible with proper test data setup and authorization configuration
- **Manual only (NO):** 0 TCs

**Automation feasibility notes:**
- All HP, NEG, and ERR scenarios are fully automatable via Playwright — expected results are machine-verifiable (success messages, warning messages, error messages, document numbers)
- AP-01 (authorized override) requires test user with override authorization — feasible if SAP test tenant has pre-configured users with authorization object (e.g., custom Z_SO_OVERRIDE or V_VBAK_AAT)
- EDGE scenarios require batch master data (MCH1) with specific expiration dates — test data setup required before automation execution
- ATP stock quantities must be controlled for EDGE-02 and EDGE-03 scenarios — may require inventory management or test data reset scripts

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-001 (HP-01) — Create SO with batch-managed material, ATP passes with shelf-life filter
  TC-CS-020 (EDGE-01) — Batch expiration date exactly equals threshold — boundary condition
  TC-CS-025 (EDGE-06) — Mixed batch shelf-life selection logic

Priority 2 — HIGH (validate immediately after):
  TC-CS-002 (AP-01) — Authorized override of shelf-life restriction
  TC-CS-003 (NEG-01) — ATP failure due to insufficient shelf-life stock
  TC-CS-004 (NEG-02) — Unauthorized override attempt rejection
  TC-CS-005 (NEG-03) — ATP failure due to zero stock
  TC-CS-007 (ERR-01) — Missing Customer ID
  TC-CS-008 (ERR-02) — Missing Material ID
  TC-CS-009 (ERR-03) — Missing Order Quantity
  TC-CS-010 (ERR-04) — Missing Sales Organization
  TC-CS-011 (ERR-05) — Invalid Customer ID
  TC-CS-012 (ERR-06) — Invalid Material ID
  TC-CS-013 (ERR-07) — Material not extended to Sales Org

Priority 3 — MEDIUM (complete coverage):
  TC-CS-006 (NEG-04) — Non-batch-managed material (feature not applicable)
  TC-CS-021 (EDGE-02) — Order Quantity equals exact ATP stock
  TC-CS-022 (EDGE-03) — Order Quantity exceeds ATP stock by 1 unit
  TC-CS-023 (EDGE-04) — Same-day delivery date

Priority 4 — LOW (final validation):
  TC-CS-024 (EDGE-05) — Zero shelf-life threshold config

Priority 5 — Integration (run after core stability confirmed):
  None
```

**Rationale:**
- **Priority 1 (CRITICAL):** HP-01 validates the core ATP + shelf-life logic; EDGE-01 and EDGE-06 validate the threshold boundary logic (most critical aspect of the feature)
- **Priority 2 (HIGH):** All NEG and ERR scenarios validate business rules, authorization, and data integrity — these are regression-critical and must pass before proceeding
- **Priority 3 (MEDIUM):** Remaining EDGE scenarios validate secondary boundary conditions and ATP stock calculations
- **Priority 4 (LOW):** EDGE-05 validates edge case configuration (zero threshold) — important but not core functionality
- **Priority 5 (Integration):** Not applicable — no integration scenarios identified

---

## Regulatory and Compliance Notes

**SAP SD pharmaceutical material handling:**
- Batch-managed pharmaceutical materials are subject to regulatory requirements (e.g., FDA, EMA) for shelf-life and expiration date tracking
- Test cases must verify that the ATP logic correctly excludes batches with insufficient remaining shelf-life to prevent expired products from being shipped to customers
- Ensure test data uses dedicated test materials with batch management enabled (MARA.XCHPF = 'X') and shelf-life configuration (MHDHB field populated) — do NOT use production material IDs
- All test execution must use SAP test tenant (not production) to avoid creating real Sales Orders

**Authorization override (AP-01):**
- Authorization override feature enables authorized users to bypass shelf-life restrictions for legitimate business reasons (e.g., discount sales, urgent orders, customer-approved exceptions)
- Test case must verify that unauthorized users cannot override shelf-life restrictions (security control)
- Ensure test data includes both authorized and unauthorized user IDs

**Data privacy:**
- Do NOT use real customer names or addresses in test data
- Use dedicated test customer master records (KNA1) for all test cases

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-40-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, AP, NEG, ERR, EDGE)
3. No RECOMMENDED types exist for this story (all scenarios are MANDATORY due to CRITICAL risk)
4. Apply quality gates table — verify all thresholds are met before completing:
   - 100% AC traceability (all 6 ACs covered)
   - All 19 scenarios generated (1 HP, 1 AP, 4 NEG, 7 ERR, 6 EDGE)
   - 0 hardcoded SAP values (all data must use `{TD.*}` placeholders)
   - ≥ 12 TCs flagged as Automation Candidate: YES or PARTIAL
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above:
   - YES: HP-01, NEG-01, NEG-02, NEG-03, NEG-04, ERR-01 through ERR-07 (12 TCs)
   - PARTIAL: AP-01, EDGE-01 through EDGE-06 (7 TCs)
7. Output files to `testcases/AI-generated testcases/CS-40/` and `testdata/CS-40/`
8. Generate comprehensive test data JSON with:
   - Valid batch-managed pharmaceutical material with shelf-life config
   - Valid customer master data
   - Valid sales org, distribution channel, division
   - Batch master data with varying expiration dates (for EDGE scenarios)
   - User IDs with and without override authorization (for AP and NEG scenarios)
   - ATP stock quantities for boundary testing (for EDGE scenarios)
