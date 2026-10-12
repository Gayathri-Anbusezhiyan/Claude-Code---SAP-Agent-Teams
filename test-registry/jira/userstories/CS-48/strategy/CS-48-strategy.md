# Test Strategy: [CS-48] Maintain Tiered Pricing Conditions For A Pharmaceutical Product Based

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-48/strategy/CS-48-analysis.md
**Risk Profile:**     jira/userstories/CS-48/strategy/CS-48-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Pricing Analyst
- **Business Object:** Pricing Condition Record (SAP SD - Condition Master)
- **SAP Module:** SD — Sales & Distribution (Pricing & Conditions)
- **Business Goal:** Ensure contracted and list pricing is applied correctly and consistently at order entry

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 6 | 6 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 3 | 3 | HIGH |
| Negative (NEG) | MANDATORY | 5 | 5 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 7 | 7 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 10 | 10 | MEDIUM |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | N/A |
| **TOTAL** | — | **31** | **31** | — |

**Coverage Model Rationale:**
- CRITICAL risk story with pricing automation (revenue impact) and approval workflow (compliance risk)
- AC-3 (tiered pricing application) and AC-5 (manual override approval) are both CRITICAL risk
- Multi-tier pricing logic with complex boundary conditions requires comprehensive EDGE coverage
- 7 mandatory fields (Material, Customer Pricing Group, Condition Type, Scale Quantity, Price Amount, Valid From, Valid To) require ERR coverage
- No linked Jira issues — INT scenarios not applicable (SAP module-internal dependencies exist but are not cross-story dependencies)

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP) — 6 scenarios:**
- **HP-01:** Access Manage Pricing Conditions app and create a valid single-tier pricing condition record — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-6
- **HP-02:** Create a multi-tier pricing condition with 3 quantity breakpoints (e.g., 1-99, 100-499, 500+) — Risk: HIGH — ACs: AC-2, AC-3
- **HP-03:** Apply tiered pricing automatically at sales order entry for a customer in the configured pricing group — Risk: CRITICAL — ACs: AC-3, AC-4
- **HP-04:** Manually override price within configured tolerance (e.g., 5% deviation) - no approval required — Risk: CRITICAL — ACs: AC-5
- **HP-05:** System displays condition record with validity period on sales order pricing screen — Risk: HIGH — ACs: AC-4
- **HP-06:** System flags condition records nearing validity end date (e.g., 30 days before expiry) — Risk: MEDIUM — ACs: AC-6

**Negative (NEG) — 5 scenarios:**
- **NEG-01:** Attempt to create condition for non-existent material — Risk: HIGH — ACs: AC-2
- **NEG-02:** Attempt to create condition for invalid customer pricing group — Risk: HIGH — ACs: AC-2
- **NEG-03:** No matching price tier for customer pricing group at order entry — Risk: CRITICAL — ACs: AC-3
- **NEG-04:** Attempt to apply expired condition record at order entry — Risk: HIGH — ACs: AC-4
- **NEG-05:** Attempt manual price override beyond tolerance without supervisor approval — Risk: CRITICAL — ACs: AC-5

**Error / Missing Field (ERR) — 7 scenarios:**
- **ERR-01:** Missing Material field — Risk: HIGH — ACs: AC-2
- **ERR-02:** Missing Customer Pricing Group field — Risk: HIGH — ACs: AC-2
- **ERR-03:** Missing Condition Type field — Risk: HIGH — ACs: AC-2
- **ERR-04:** Missing Scale Quantity field — Risk: HIGH — ACs: AC-2
- **ERR-05:** Missing Price Amount field — Risk: HIGH — ACs: AC-2
- **ERR-06:** Missing Valid From date — Risk: HIGH — ACs: AC-2
- **ERR-07:** Missing Valid To date — Risk: HIGH — ACs: AC-2

**Edge Case / Boundary (EDGE) — 10 scenarios:**
- **EDGE-01:** Minimum quantity tier boundary (e.g., quantity = 1) — Risk: MEDIUM — ACs: AC-2, AC-3
- **EDGE-02:** Maximum quantity tier boundary (e.g., quantity = 999999) — Risk: MEDIUM — ACs: AC-2, AC-3
- **EDGE-03:** Quantity exactly at tier breakpoint (e.g., ordered quantity = 100 when tiers are 1-99, 100-499) — Risk: HIGH — ACs: AC-3
- **EDGE-04:** Zero quantity (invalid) — Risk: MEDIUM — ACs: AC-2
- **EDGE-05:** Zero price amount (invalid) — Risk: MEDIUM — ACs: AC-2
- **EDGE-06:** Valid To date = Valid From date (invalid period) — Risk: MEDIUM — ACs: AC-2
- **EDGE-07:** Valid From date in the past (for new records) — Risk: MEDIUM — ACs: AC-2
- **EDGE-08:** Manual override at exact tolerance threshold (e.g., 5.00% deviation) — Risk: MEDIUM — ACs: AC-5
- **EDGE-09:** Manual override just above tolerance threshold (e.g., 5.01% deviation) — Risk: HIGH — ACs: AC-5
- **EDGE-10:** Condition record exactly at alert window threshold (e.g., 30 days before expiry) — Risk: LOW — ACs: AC-6

### Recommended Scenarios

**Alternative Path (AP) — 3 scenarios:**
- **AP-01:** Create condition with indefinite validity (Valid To = 9999-12-31) — Risk: MEDIUM — ACs: AC-2, AC-6
- **AP-02:** Manually override price beyond tolerance with supervisor approval — Risk: CRITICAL — ACs: AC-5
- **AP-03:** Supervisor rejects manual price override request — Risk: HIGH — ACs: AC-5

### Optional Scenarios

None — all scenario types are MANDATORY or RECOMMENDED for this CRITICAL risk story.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 6 HP scenarios generated | YES |
| NEG Coverage | All 5 NEG scenarios generated | YES |
| ERR Coverage | All 7 ERR scenarios generated | YES |
| EDGE Coverage | All 10 EDGE scenarios generated | YES |
| AP Coverage | All 3 AP scenarios generated | RECOMMENDED |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 20 TCs flagged as Automation Candidate: YES | YES |

**CRITICAL Risk Story — Additional Gates:**
| Additional Gate | Threshold | Mandatory |
|----------------|-----------|---------|
| Negative coverage (entity validation) | 100% — one NEG per named entity that can be invalid (Material, Customer Pricing Group, Pricing Group at order entry, Condition record validity) | YES |
| Error coverage (mandatory fields) | 100% — one ERR per mandatory field in ACs (7 fields confirmed) | YES |

**Overall pass threshold:** All mandatory gates must PASS. At least 100% of recommended gates must PASS (AP Coverage is the only recommended gate and must be met).

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Tiered pricing creation and application are revenue-critical; pricing failures cause financial loss or contract breach |
| HP (access/navigation) | HIGH | MAJOR | Access to Manage Pricing Conditions app is prerequisite for all other workflows |
| AP (multi-tier, approval) | HIGH | MAJOR | Multi-tier pricing and approval workflows are explicitly described in ACs and represent alternative valid business paths |
| NEG (invalid entity) | HIGH | MAJOR | Invalid master data (material, customer group) or no tier match blocks order processing |
| ERR (missing mandatory field) | HIGH | MAJOR | Condition record creation failure due to missing required data causes data integrity issues |
| EDGE (boundary value) | MEDIUM | MINOR | Boundary conditions (min/max quantities, tolerance thresholds, tier breakpoints) are important but not core path |
| INT (integration) | N/A | N/A | Not applicable — no linked Jira issues |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright — stable, repeatable, revenue-critical workflows |
| AP | YES | Data-driven via testdata JSON — approval workflow requires multi-user session orchestration but is automatable |
| NEG | YES | Stable validation checks — expected error messages are machine-verifiable |
| ERR | YES | Field-level validation is stable — mandatory field error messages are predictable |
| EDGE | PARTIAL | Boundary values are automatable but tolerance threshold and alert window may require SAP configuration changes |
| INT | N/A | Not applicable — no cross-story integration scenarios |

**Automation Constraints:**
- AP-02 and AP-03 (supervisor approval/rejection) require multi-user session orchestration — may need manual setup for supervisor role or test user accounts
- EDGE-08, EDGE-09 (tolerance thresholds) require configured tolerance percentage in SAP — if not configurable via API, mark as PARTIAL
- EDGE-10 (alert window threshold) may require date manipulation or system configuration

**Target automation coverage:** 26 of 31 TCs (84%) — all HP, AP, NEG, ERR scenarios + automatable EDGE scenarios

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  HP-01: Create single-tier pricing condition (access + core workflow)
  HP-02: Create multi-tier pricing condition
  HP-03: Apply tiered pricing at sales order entry
  HP-04: Manual override within tolerance
  AP-02: Manual override beyond tolerance with approval

Priority 2 — HIGH (validate immediately after):
  NEG-01: Non-existent material
  NEG-02: Invalid customer pricing group
  NEG-03: No matching price tier at order entry
  NEG-04: Expired condition record at order entry
  NEG-05: Manual override beyond tolerance without approval
  ERR-01: Missing Material field
  ERR-02: Missing Customer Pricing Group field
  ERR-03: Missing Condition Type field
  ERR-04: Missing Scale Quantity field
  ERR-05: Missing Price Amount field
  ERR-06: Missing Valid From date
  ERR-07: Missing Valid To date
  AP-03: Supervisor rejects manual override

Priority 3 — MEDIUM (complete coverage):
  HP-05: Display condition record with validity period
  HP-06: Flag condition records nearing expiry
  AP-01: Create condition with indefinite validity
  EDGE-01: Minimum quantity tier boundary
  EDGE-02: Maximum quantity tier boundary
  EDGE-03: Quantity at exact tier breakpoint
  EDGE-04: Zero quantity (invalid)
  EDGE-05: Zero price amount (invalid)
  EDGE-06: Valid To = Valid From (invalid period)
  EDGE-07: Valid From in past (invalid)
  EDGE-08: Manual override at exact tolerance threshold
  EDGE-09: Manual override above tolerance threshold
  EDGE-10: Condition record at alert window threshold

Priority 4 — Integration (run after core stability confirmed):
  None — no integration scenarios for this story
```

**Execution Notes:**
- HP-01 must run first — establishes that core app access and single-tier creation work
- HP-02 and HP-03 depend on HP-01 success — multi-tier logic builds on single-tier foundation
- All NEG and ERR scenarios can run in parallel after HP-01 confirms app access
- EDGE scenarios should run after HP and NEG to avoid false positives from core failures
- AP-02 and AP-03 (approval workflows) require supervisor user setup — run after HP-04 (non-approval override) confirms base override logic

---

## Regulatory and Compliance Notes

**SAP SD Pricing Context:**
- Pricing condition records are legally binding commercial agreements — test cases must verify that unauthorized price changes (beyond tolerance) are blocked without supervisor approval
- Pharmaceutical industry context: pricing must be auditable and traceable — ensure all condition record changes are logged with user ID and timestamp
- Tiered pricing is often tied to regulatory pricing agreements (e.g., government contracts, volume discount agreements) — test data must not use real production pricing or customer identifiers
- All test execution must use dedicated test system instances (not production)

**Data Governance:**
- Ensure test data does not use real production material IDs, customer pricing groups, or condition types
- Use test-specific condition type codes (e.g., ZPR1, ZPR2) distinct from production condition types
- Test data cleanup: condition records created during test execution should be flagged for deletion or use validity dates that expire automatically

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-48-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, NEG, ERR, EDGE)
3. Generate RECOMMENDED types (AP) — all 3 AP scenarios are required per quality gates
4. Apply quality gates table — verify all thresholds are met before completing
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above
7. Output files to `testcases/AI-generated testcases/CS-48/` and `testdata/CS-48/`
8. Mark AP-02 and AP-03 as "Automation Candidate: PARTIAL" with note: "Requires multi-user session orchestration for supervisor approval/rejection"
9. Ensure all 6 ACs are traceable to at least one test case in the coverage matrix
10. Generate test data placeholders for: Material ID (valid/invalid), Customer Pricing Group (valid/invalid), Condition Type, Scale Quantities (1, 100, 500, 999999, 0), Price Amounts (0.01, 100.00, 0.00), Valid From dates (today, past date), Valid To dates (future, indefinite, equal to Valid From), Tolerance % (5.00, 5.01), Manual Override Prices
