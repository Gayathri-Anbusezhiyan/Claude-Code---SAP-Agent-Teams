# Test Strategy: [CS-23] User Story MM-008

**Created:**          2026-08-24
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   test-registry/jira/userstories/CS-23/strategy/CS-23-analysis.md
**Risk Profile:**     test-registry/jira/userstories/CS-23/strategy/CS-23-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Material Planner
- **Business Object:** MRP Run, Planned Order, Purchase Requisition, Stock/Requirements List, GMP Material with Shelf-Life Management
- **SAP Module:** MM — Materials Management (MRP/Planning)
- **Business Goal:** Calculate replenishment requirements for GMP materials using MRP while respecting minimum remaining shelf-life rules to ensure newly procured stock always has sufficient shelf life for downstream production use

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 3 | 3 | CRITICAL |
| Alternative Path (AP) | MANDATORY | 2 | 2 | HIGH |
| Negative (NEG) | MANDATORY | 2 | 2 | HIGH |
| Error / Missing Field (ERR) | NOT APPLICABLE | 0 | 0 | N/A |
| Edge Case / Boundary (EDGE) | MANDATORY | 5 | 5 | CRITICAL |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | N/A |
| **TOTAL** | — | **12** | **12** | — |

**Rationale for CRITICAL-risk story coverage:**
- HP: MANDATORY — Core MRP calculation with shelf-life constraints is the primary business capability; must verify both in-house and external procurement paths
- AP: MANDATORY (elevated from RECOMMENDED) — Conversion of planning proposals is an integral part of the planner's workflow; includes both Planned Order and Purchase Requisition conversion paths
- NEG: MANDATORY — Must verify system behavior when shelf-life constraints are not configured or when all batches are expired
- ERR: NOT APPLICABLE — MRP is system-driven; no manual field entry validation required
- EDGE: MANDATORY — Boundary conditions for shelf-life thresholds and exception triggering are CRITICAL for GMP compliance; elevated from HIGH to CRITICAL priority
- INT: NOT APPLICABLE — No linked issues identified

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP) — 3 scenarios**

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| HP-01 | Access Stock/Requirements List for GMP material and run MRP for a plant with GMP materials having min shelf-life constraints, resulting in planned order/PR generation | CRITICAL | AC-1, AC-2, AC-3, AC-4, AC-5 |
| HP-02 | Run MRP for GMP material with in-house production (Planned Order generation) | CRITICAL | AC-2, AC-4 |
| HP-03 | Run MRP for GMP material with external procurement (Purchase Requisition generation) | CRITICAL | AC-2, AC-4 |

**Negative (NEG) — 2 scenarios**

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| NEG-01 | Run MRP for material without minimum remaining shelf-life configured (MHDRZ = 0) — system should process as standard MRP without shelf-life constraint | MEDIUM | AC-2 |
| NEG-02 | Run MRP for GMP material with existing batches all below minimum remaining shelf-life — system should exclude all batches and propose full replenishment | CRITICAL | AC-3, AC-4 |

**Edge Case (EDGE) — 5 scenarios**

| ID | Description | Risk | ACs Covered | Parameter | Boundary |
|----|-------------|------|-------------|-----------|----------|
| EDGE-01 | Existing stock batch expiration date exactly equals minimum remaining shelf-life threshold — verify batch is excluded from availability | CRITICAL | AC-3 | Batch remaining shelf life | Exact match with threshold |
| EDGE-02 | Existing stock batch expiration date is 1 day above minimum remaining shelf-life threshold — verify batch is included in availability | CRITICAL | AC-3 | Batch remaining shelf life | 1 day above threshold |
| EDGE-03 | GMP material with total shelf life = minimum remaining shelf-life — verify system proposes procurement with adjusted lead time | HIGH | AC-2, AC-4 | Total shelf life vs min remaining shelf life | Equal values |
| EDGE-04 | Exception message triggered when batch remaining shelf life reaches minimum threshold exactly | HIGH | AC-6 | Batch remaining shelf life | Exact threshold |
| EDGE-05 | Exception message triggered when batch remaining shelf life is 1 day below minimum threshold | HIGH | AC-6 | Batch remaining shelf life | 1 day below threshold |

**Alternative Path (AP) — 2 scenarios (MANDATORY — elevated from RECOMMENDED)**

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| AP-01 | Review and convert Planned Order to Production Order from Stock/Requirements List | MEDIUM → HIGH | AC-5 |
| AP-02 | Review and convert Purchase Requisition to Purchase Order from Stock/Requirements List | MEDIUM → HIGH | AC-5 |

**Elevation rationale:** AC-5 validates planner's ability to execute on MRP proposals — this is an integral part of the planning workflow, not optional.

### Recommended Scenarios

None — all scenarios in the inventory are MANDATORY due to CRITICAL overall risk.

### Optional Scenarios

None.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 3 HP scenarios generated | YES |
| NEG Coverage | All 2 NEG scenarios generated | YES |
| ERR Coverage | 0 ERR scenarios (NOT APPLICABLE) | YES |
| EDGE Coverage | All 5 EDGE TCs generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 6 TCs flagged as Automation Candidate: YES (50% of 12) | YES |
| Batch Management Coverage | 100% — every scenario involving batch shelf-life validation must explicitly reference batch selection/exclusion logic | YES |
| GMP Compliance Coverage | 100% — all test cases must verify that shelf-life constraints prevent use of expired or near-expired materials | YES |

**Overall pass threshold:** All mandatory gates must PASS. 100% of gates must PASS for CRITICAL-risk stories.

**Additional CRITICAL-risk gates:**
- **AC-2 validation:** At least 2 TCs (HP + NEG) must validate that min remaining shelf-life is enforced in procurement proposals
- **AC-3 validation:** At least 4 TCs (HP + EDGE) must validate batch exclusion logic with different shelf-life scenarios
- **AC-6 validation:** At least 2 TCs (EDGE) must validate exception message triggering at threshold boundaries

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | MRP execution with shelf-life constraints is the core planning capability; failure disrupts procurement and production |
| AP (proposal conversion) | HIGH | MAJOR | Elevated from MEDIUM — planner workflow depends on proposal conversion; failure requires manual workarounds |
| NEG (invalid entity) | HIGH | MAJOR | Validates system behavior when shelf-life constraints are absent or all stock is expired; incorrect handling leads to GMP violations |
| EDGE (boundary) | CRITICAL | CRITICAL | Elevated from MEDIUM — boundary conditions for shelf-life thresholds are GMP-critical; off-by-one errors lead to regulatory non-compliance |
| ERR (missing field) | N/A | N/A | Not applicable — no manual input fields |
| INT (integration) | N/A | N/A | Not applicable — no linked issues |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright — MRP runs are repeatable and outcomes are machine-verifiable |
| AP | PARTIAL | Proposal conversion requires MRP-generated proposals; test data setup depends on successful MRP run (HP prerequisite) |
| NEG | YES | Validation checks are stable and repeatable; material master configurations can be parameterized |
| ERR | N/A | Not applicable |
| EDGE | PARTIAL | Boundary scenarios require specific batch configurations with precise expiration dates; may require test data preparation via custom scripts or manual setup |
| INT | N/A | Not applicable |

**Target automation coverage:** 7 of 12 TCs (58%) — all HP + NEG scenarios are full automation candidates; AP and EDGE scenarios require careful test data orchestration and may be partially automated.

**Automation constraints:**
- MRP runs require background processing; tests must wait for MRP completion (polling or scheduled execution)
- Batch shelf-life expiration dates must be calculated dynamically based on test execution date
- Exception messages (AC-6) may require time-based simulation or backdating of batch creation dates
- Stock/Requirements List navigation and proposal conversion steps are fully automatable via Fiori UI interaction

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-{ID} — HP-01: Access Stock/Requirements List and run MRP end-to-end
  TC-CS-{ID} — HP-02: Run MRP for in-house production (Planned Order)
  TC-CS-{ID} — HP-03: Run MRP for external procurement (Purchase Requisition)
  TC-CS-{ID} — EDGE-01: Batch expiration exactly equals min threshold (exclusion)
  TC-CS-{ID} — EDGE-02: Batch expiration 1 day above min threshold (inclusion)

Priority 2 — HIGH (validate immediately after):
  TC-CS-{ID} — NEG-02: All batches below min shelf-life (full replenishment)
  TC-CS-{ID} — AP-01: Convert Planned Order to Production Order
  TC-CS-{ID} — AP-02: Convert Purchase Requisition to Purchase Order
  TC-CS-{ID} — EDGE-03: Total shelf life = min remaining shelf life
  TC-CS-{ID} — EDGE-04: Exception message at exact threshold
  TC-CS-{ID} — EDGE-05: Exception message 1 day below threshold

Priority 3 — MEDIUM (complete coverage):
  TC-CS-{ID} — NEG-01: Material without min shelf-life configured

Priority 4 — Integration (run after core stability confirmed):
  None
```

**Execution dependencies:**
- AP-01 depends on HP-02 completing successfully (requires Planned Order to exist)
- AP-02 depends on HP-03 completing successfully (requires Purchase Requisition to exist)
- All EDGE scenarios depend on HP-01 baseline execution (requires material master data and batch records)

---

## Regulatory and Compliance Notes

**GMP (Good Manufacturing Practice) Compliance:**
- GMP materials are subject to strict shelf-life management regulations
- Test cases must verify that the system enforces minimum remaining shelf-life requirements to prevent use of expired or near-expired materials in production
- All test execution must use dedicated test system instances with GMP-compliant material master configurations (not production data)
- Batch records used in testing must have realistic shelf-life parameters that mirror production constraints

**SAP MM MRP Governance:**
- MRP runs must not be executed against production plants; use dedicated test plants configured for MRP
- Test materials must have valid MRP types and procurement configurations (in-house or external)
- Ensure test data does not interfere with real production planning runs
- All generated Planned Orders and Purchase Requisitions must be deleted or archived after test execution

**Data Privacy:**
- No production vendor or supplier information should be used in test data
- Material master data should use test material numbers only

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-23-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first: HP (3), AP (2), NEG (2), EDGE (5)
3. ERR and INT scenario types are NOT APPLICABLE — do not generate TCs for these types
4. Apply quality gates table — verify all thresholds are met before completing:
   - All 6 ACs must be traced to at least 1 TC
   - All 3 HP scenarios must be generated
   - All 2 NEG scenarios must be generated
   - All 5 EDGE scenarios must be generated
   - All test data must use `{TD.*}` placeholders (no hardcoded SAP values)
   - At least 6 TCs must be flagged as Automation Candidate: YES
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above:
   - HP: YES for all
   - AP: PARTIAL (note dependency on MRP-generated proposals)
   - NEG: YES for all
   - EDGE: PARTIAL (note test data setup complexity)
7. Output files to `testcases/AI-generated testcases/CS-23/` and `testdata/CS-23/`
8. **Critical**: For all scenarios involving batch shelf-life validation (HP, NEG, EDGE), ensure test steps explicitly verify:
   - Batch selection/exclusion logic in MRP availability check
   - Shelf-life expiration date (SLED) calculations
   - Exception message codes and text
   - Adjusted lead times in procurement proposals
9. **Test data requirements:**
   - Material Number: GMP material with batch management active (XCHPF = X) and min remaining shelf-life configured (MHDRZ > 0)
   - Plant: Valid plant configured for MRP with planning calendar
   - Batch records: Multiple batches with varying expiration dates (above, at, and below min shelf-life threshold)
   - MRP Controller: Valid MRP controller assigned to the plant
10. **Expected results must reference:**
    - Planned Order number (for HP-02, AP-01)
    - Purchase Requisition number (for HP-03, AP-02)
    - MRP exception message code "10" (shelf-life expiration) for EDGE-04, EDGE-05
    - Stock/Requirements List element details (MRP element type, receipt date, expiration date)
