# Test Strategy: [CS-38] Maintain Rebate Agreements for GPO contracts

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-38/strategy/CS-38-analysis.md
**Risk Profile:**     jira/userstories/CS-38/strategy/CS-38-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Contract Administrator
- **Business Object:** Rebate Agreement
- **SAP Module:** SD — Sales & Distribution
- **Business Goal:** Ensure member hospitals and pharmacies receive correct volume-based rebates at the end of each contract period

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 5 | 5 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 3 | 3 | HIGH |
| Negative (NEG) | MANDATORY | 6 | 6 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 7 | 7 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 6 | 6 | MEDIUM |
| Integration (INT) | RECOMMENDED | 3 | 3 | CRITICAL |
| **TOTAL** | — | **30** | **30** | — |

**Coverage Model Rationale:**
- CRITICAL risk story requires all scenario types to be MANDATORY or RECOMMENDED
- AC-1, AC-3, AC-5 are CRITICAL risk — HP, NEG, ERR, and INT scenarios are mandatory
- AC-2 involves complex business logic (multi-tier rebate calculation) — requires EDGE scenarios for boundary testing
- AC-6 (locked agreement validation) requires NEG scenario
- 3 implicit integration points (SD billing, FI credit memo, FI payment) justify INT scenarios despite no Jira links
- Financial implications (rebate payouts) mandate comprehensive error and negative coverage

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP) — 5 scenarios:**
- **HP-01**: Create Rebate Agreement with GPO contract number, validity period, and 2+ eligible customers — Risk: CRITICAL — ACs: AC-1
- **HP-02**: Define 2 rebate tiers with non-overlapping volume ranges and valid percentages — Risk: CRITICAL — ACs: AC-2
- **HP-03**: Sales order posted for GPO member → system automatically accrues rebate based on cumulative volume and tier — Risk: CRITICAL — ACs: AC-3
- **HP-04**: Generate rebate report showing cumulative purchases and accrued rebates for all GPO members — Risk: MEDIUM — ACs: AC-4
- **HP-05**: Process rebate settlement at end of contract period, generating credit memos for all eligible customers — Risk: CRITICAL — ACs: AC-5

**Negative (NEG) — 6 scenarios:**
- **NEG-01**: Create Rebate Agreement with overlapping tier volume ranges — system displays error and prevents save — Risk: HIGH — ACs: AC-2
- **NEG-02**: Create Rebate Agreement with tier percentage > 100 — system displays error — Risk: HIGH — ACs: AC-2
- **NEG-03**: Create Rebate Agreement with end date before start date — system displays error — Risk: HIGH — ACs: AC-1
- **NEG-04**: Attempt to edit rebate tiers after settlement has been processed — system prevents changes and displays error — Risk: HIGH — ACs: AC-6
- **NEG-05**: Create Rebate Agreement with non-existent GPO contract number — system displays error — Risk: HIGH — ACs: AC-1
- **NEG-06**: Create Rebate Agreement with non-existent customer ID — system displays error — Risk: HIGH — ACs: AC-1

**Error / Missing Field (ERR) — 7 scenarios:**
- **ERR-01**: Missing GPO Contract Number field — system prevents save and displays mandatory field error — Risk: HIGH — ACs: AC-1
- **ERR-02**: Missing Validity Start Date field — system prevents save and displays mandatory field error — Risk: HIGH — ACs: AC-1
- **ERR-03**: Missing Validity End Date field — system prevents save and displays mandatory field error — Risk: HIGH — ACs: AC-1
- **ERR-04**: Missing Eligible Customers field — system prevents save and displays mandatory field error — Risk: HIGH — ACs: AC-1
- **ERR-05**: Missing Rebate Tier Volume Lower field — system prevents save and displays mandatory field error — Risk: HIGH — ACs: AC-2
- **ERR-06**: Missing Rebate Tier Volume Upper field — system prevents save and displays mandatory field error — Risk: HIGH — ACs: AC-2
- **ERR-07**: Missing Rebate Percentage field — system prevents save and displays mandatory field error — Risk: HIGH — ACs: AC-2

**Edge Case / Boundary (EDGE) — 6 scenarios:**
- **EDGE-01**: Create Rebate Agreement with minimum validity period (1 day) — Risk: MEDIUM — ACs: AC-1
- **EDGE-02**: Define rebate tier with lower boundary = 0 (first tier starting at zero) — Risk: MEDIUM — ACs: AC-2
- **EDGE-03**: Define rebate tier with percentage = 0 (no rebate tier) — Risk: MEDIUM — ACs: AC-2
- **EDGE-04**: Define rebate tier with percentage = 100 (entire amount rebated) — Risk: MEDIUM — ACs: AC-2
- **EDGE-05**: Cumulative purchase volume exactly equals tier upper boundary (boundary crossing) — Risk: MEDIUM — ACs: AC-3
- **EDGE-06**: Process rebate settlement with zero accrued rebate amount (no sales during period) — Risk: MEDIUM — ACs: AC-5

### Recommended Scenarios

**Alternative Path (AP) — 3 scenarios:**
- **AP-01**: Create Rebate Agreement with 3+ rebate tiers (complex tier structure) — Risk: HIGH — ACs: AC-2
- **AP-02**: Process rebate settlement generating rebate payments (instead of credit memos) — Risk: CRITICAL — ACs: AC-5
- **AP-03**: Generate rebate report with date range filter or customer filter — Risk: MEDIUM — ACs: AC-4

**Integration (INT) — 3 scenarios:**
- **INT-01**: Sales order posting for GPO member customer triggers automatic accrual calculation — Risk: CRITICAL — Implicit integration with SD billing
- **INT-02**: Credit memo generated during settlement posts to Financial Accounting (FI) — Risk: CRITICAL — Implicit integration with FI
- **INT-03**: Rebate payment generated during settlement posts to Payment Processing — Risk: CRITICAL — Implicit integration with FI payment processing

### Optional Scenarios

None — all scenario types are MANDATORY or RECOMMENDED due to CRITICAL risk classification.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 5 HP scenarios generated | YES |
| NEG Coverage | All 6 NEG scenarios generated | YES |
| ERR Coverage | All 7 ERR scenarios generated | YES |
| EDGE Coverage | All 6 EDGE TCs generated | YES |
| AP Coverage | All 3 AP scenarios generated | YES (elevated from RECOMMENDED to MANDATORY for CRITICAL story) |
| INT Coverage | All 3 INT scenarios generated | YES (elevated from RECOMMENDED to MANDATORY for CRITICAL story) |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 15 TCs flagged as Automation Candidate: YES (50% of total) | YES |

**Additional Gates for CRITICAL Risk Stories:**

| Additional Gate | Threshold |
|----------------|-----------|
| Negative coverage (entity validation) | 100% — all 6 NEG scenarios cover invalid entities or business rule violations |
| Error coverage (mandatory fields) | 100% — all 7 mandatory fields from AC-1 and AC-2 have ERR test cases |
| Integration coverage | 100% — all 3 implicit integration points (SD billing, FI credit memo, FI payment) have INT test cases |

**Overall pass threshold:** All mandatory gates must PASS. 100% of recommended gates must PASS (elevated requirement for CRITICAL risk).

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Core rebate agreement lifecycle (create, accrue, settle) — failure blocks business process |
| HP (reporting) | HIGH | MAJOR | Report generation is key to audit and verification |
| AP (complex tiers) | HIGH | MAJOR | 3+ tier structure represents real-world GPO contracts — failure causes incorrect payout calculations |
| AP (payment vs credit memo) | CRITICAL | CRITICAL | Payment settlement is financial transaction — errors cause accounting issues |
| AP (report filtering) | MEDIUM | MINOR | Filtering enhances usability but not blocking |
| NEG (invalid entity) | HIGH | MAJOR | Invalid contract or customer references could bypass master data validation |
| NEG (invalid tier logic) | HIGH | MAJOR | Overlapping tiers or invalid percentages cause incorrect rebate calculations |
| NEG (locked agreement) | HIGH | MAJOR | Retroactive changes after settlement create audit and compliance risks |
| ERR (missing mandatory field) | HIGH | MAJOR | Data integrity failures — all mandatory fields must be enforced |
| EDGE (boundary values) | MEDIUM | MINOR | Boundary conditions (tier crossings, zero amounts) are important but not core path |
| INT (accrual calculation) | CRITICAL | CRITICAL | Integration with SD billing — failure means rebates not accrued |
| INT (FI posting) | CRITICAL | CRITICAL | Integration with FI — settlement documents must post correctly |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | All 5 HP scenarios are stable, repeatable, regression-critical |
| AP | PARTIAL | AP-01 (3+ tiers) and AP-03 (report filtering) are YES; AP-02 (payment settlement) is PARTIAL if payment posting requires manual FI config verification |
| NEG | YES | All 6 NEG scenarios involve stable validation checks with predictable error messages |
| ERR | YES | All 7 ERR scenarios involve field-level validation — stable and machine-verifiable |
| EDGE | PARTIAL | EDGE-01, EDGE-02, EDGE-03, EDGE-04 are YES (data-driven boundary values); EDGE-05 (volume boundary crossing) and EDGE-06 (zero rebate) are PARTIAL if they require manual verification of accrual calculation or settlement output |
| INT | PARTIAL | INT-01 (accrual on SO posting) requires orchestrating SO creation in SD — PARTIAL; INT-02 and INT-03 (FI document posting) require FI verification — PARTIAL unless FI document API is available |

**Target automation coverage:** 20 of 30 TCs (67%)

**Automation Candidate Breakdown:**
- HP: 5 of 5 = YES
- AP: 2 of 3 = PARTIAL (AP-01 YES, AP-02 PARTIAL, AP-03 YES)
- NEG: 6 of 6 = YES
- ERR: 7 of 7 = YES
- EDGE: 4 of 6 = PARTIAL (EDGE-01, EDGE-02, EDGE-03, EDGE-04 YES; EDGE-05, EDGE-06 PARTIAL)
- INT: 0 of 3 = PARTIAL (all require multi-module orchestration)

**Total flagged as Automation Candidate = YES: 20 TCs**
**Total flagged as Automation Candidate = PARTIAL: 10 TCs**

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-{HP-01} — Create Rebate Agreement (core transaction)
  TC-CS-{HP-02} — Define 2 rebate tiers (tier logic)
  TC-CS-{HP-03} — Automatic accrual calculation (integration with SD)
  TC-CS-{HP-05} — Settlement processing with credit memos (financial transaction)
  TC-CS-{AP-02} — Settlement processing with rebate payments (financial transaction alternative)
  TC-CS-{INT-01} — SO posting triggers accrual (SD integration)
  TC-CS-{INT-02} — Credit memo posts to FI (FI integration)
  TC-CS-{INT-03} — Rebate payment posts to FI (FI integration)

Priority 2 — HIGH (validate immediately after):
  TC-CS-{NEG-01} — Overlapping tier ranges validation
  TC-CS-{NEG-02} — Tier percentage > 100 validation
  TC-CS-{NEG-03} — End date before start date validation
  TC-CS-{NEG-04} — Locked agreement edit prevention
  TC-CS-{NEG-05} — Non-existent GPO contract validation
  TC-CS-{NEG-06} — Non-existent customer validation
  TC-CS-{ERR-01} — Missing GPO Contract Number
  TC-CS-{ERR-02} — Missing Validity Start Date
  TC-CS-{ERR-03} — Missing Validity End Date
  TC-CS-{ERR-04} — Missing Eligible Customers
  TC-CS-{ERR-05} — Missing Rebate Tier Volume Lower
  TC-CS-{ERR-06} — Missing Rebate Tier Volume Upper
  TC-CS-{ERR-07} — Missing Rebate Percentage
  TC-CS-{HP-04} — Report generation (verification)
  TC-CS-{AP-01} — 3+ tier structure (complex logic)

Priority 3 — MEDIUM (complete coverage):
  TC-CS-{AP-03} — Report filtering (usability)
  TC-CS-{EDGE-01} — Minimum validity period (1 day)
  TC-CS-{EDGE-02} — Tier lower boundary = 0
  TC-CS-{EDGE-03} — Rebate percentage = 0
  TC-CS-{EDGE-04} — Rebate percentage = 100
  TC-CS-{EDGE-05} — Volume exactly equals tier upper boundary
  TC-CS-{EDGE-06} — Zero accrued rebate settlement
```

**Execution Dependencies:**
- NEG-04 (locked agreement edit) depends on HP-05 (settlement must be completed first to lock the agreement)
- INT-01 (accrual on SO posting) should be executed alongside HP-03 (accrual verification)
- INT-02 and INT-03 (FI posting) should be executed alongside HP-05 and AP-02 (settlement processing)
- EDGE-05 (boundary crossing) depends on HP-03 (accrual logic must work first)
- EDGE-06 (zero rebate settlement) depends on HP-05 (settlement logic must work first)

---

## Regulatory and Compliance Notes

**SAP SD Rebate Agreements — Financial and Audit Considerations:**
- Rebate agreements represent legally binding commitments to customers — test cases must verify that rebate calculations are accurate and auditable
- Settlement documents (credit memos and rebate payments) are financial postings — errors cause accounting discrepancies and audit findings
- Rebate accrual must be consistent with sales transactions (VBRK/VBRP) — mismatches indicate integration failures
- Locked agreements after settlement prevent retroactive changes — compliance requirement for financial audit trails
- Ensure test data does not use real production customer IDs or live GPO contract references
- All test execution must use dedicated test system instances (not production)
- Rebate percentage validation (0-100%) prevents overpayment and negative rebate scenarios

**Financial Postings (FI Module Integration):**
- Credit memos and rebate payments must be reversible in the test system (use test fiscal period configuration)
- Ensure Segregation of Duties (SOD) authorization requirements are pre-conditioned correctly for settlement processing
- Test cases involving FI postings should verify document numbers, posting dates, and amounts match expected values

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-38-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, NEG, ERR, EDGE)
3. Generate ALL RECOMMENDED types (AP, INT) — no skipping for CRITICAL risk stories
4. Apply quality gates table — verify all thresholds are met before completing
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above:
   - HP: all 5 flagged YES
   - AP: AP-01 and AP-03 flagged YES, AP-02 flagged PARTIAL
   - NEG: all 6 flagged YES
   - ERR: all 7 flagged YES
   - EDGE: EDGE-01, EDGE-02, EDGE-03, EDGE-04 flagged YES; EDGE-05, EDGE-06 flagged PARTIAL
   - INT: all 3 flagged PARTIAL
7. Output files to `testcases/AI-generated testcases/CS-38/` and `testdata/CS-38/`
8. Use execution order defined above to assign TC sequence numbers (CRITICAL priority scenarios get lower TC numbers)
