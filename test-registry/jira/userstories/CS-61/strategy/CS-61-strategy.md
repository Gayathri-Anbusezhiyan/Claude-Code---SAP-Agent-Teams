# Test Strategy: [CS-61] View A Capacity Planning Overview For Cleanroom/Sterile Manufacturing

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-61/strategy/CS-61-analysis.md
**Risk Profile:**     jira/userstories/CS-61/strategy/CS-61-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Production Planner
- **Business Object:** Work Center Capacity / Process Order Schedule
- **SAP Module:** PP — Production Planning
- **Business Goal:** Ensure process orders are scheduled without exceeding the available validated capacity of shared production resources in cleanroom/sterile manufacturing suites

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 4 | 4 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 1 | 1 | HIGH |
| Negative (NEG) | MANDATORY | 2 | 2 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 3 | 3 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 3 | 3 | MEDIUM |
| Integration (INT) | RECOMMENDED | 3 | 3 | HIGH |
| **TOTAL** | — | **16** | **16** | — |

**Rationale for Coverage:**
- **CRITICAL overall risk** drives MANDATORY status for HP, NEG, ERR, and EDGE scenario types
- 3 of 6 ACs are CRITICAL risk (capacity load accuracy, overload detection, changeover time inclusion)
- Integration scenarios are RECOMMENDED (not MANDATORY) because no explicit linked issues exist in Jira, but implicit cross-module dependencies are documented in analysis
- AP scenarios are RECOMMENDED because AC-4 explicitly mentions "reschedule or resequence" — both actions must be tested

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP) — 4 scenarios — All MANDATORY**

| ID | Description | Risk | ACs Covered |
|----|-------------|------|------------|
| HP-01 | View capacity planning overview with planned and confirmed load displayed | CRITICAL | AC-1, AC-2 |
| HP-02 | Identify overload situation highlighted on work center capacity view | CRITICAL | AC-3 |
| HP-03 | Reschedule a process order from capacity overview and verify updated start date | HIGH | AC-4, AC-6 |
| HP-04 | View capacity load including cleaning/changeover time between different products | CRITICAL | AC-5 |

**Negative (NEG) — 2 scenarios — All MANDATORY**

| ID | Description | Risk | ACs Covered |
|----|-------------|------|------------|
| NEG-01 | Attempt to schedule process order into time period with insufficient capacity (overload) | CRITICAL | AC-3 |
| NEG-02 | Schedule two incompatible products back-to-back without accounting for required changeover time | CRITICAL | AC-5 |

**Error (ERR) — 3 scenarios — All MANDATORY**

| ID | Description | Risk | ACs Covered | Field Validated |
|----|-------------|------|------------|----------------|
| ERR-01 | Attempt to reschedule process order to a past date | HIGH | AC-4 | Start Date |
| ERR-02 | Attempt to reschedule process order to a work center without capability for the material | HIGH | AC-4 | Work Center |
| ERR-03 | Attempt to access capacity planning for non-existent work center | MEDIUM | AC-1, AC-2 | Work Center |

**Edge Cases (EDGE) — 3 scenarios — All MANDATORY**

| ID | Description | Risk | ACs Covered | Boundary |
|----|-------------|------|------------|----------|
| EDGE-01 | View capacity planning at 100% utilization (no overload) | MEDIUM | AC-2, AC-3 | Upper boundary (capacityUtilization) |
| EDGE-02 | View capacity planning at 0% utilization (idle work center) | LOW | AC-2 | Lower boundary (capacityUtilization) |
| EDGE-03 | Reschedule process order with zero changeover time (same product continuation) | LOW | AC-5 | Lower boundary (changeoverTime) |

### Recommended Scenarios

**Alternative Path (AP) — 1 scenario — RECOMMENDED**

| ID | Description | Risk | ACs Covered |
|----|-------------|------|------------|
| AP-01 | Resequence (change order) of multiple process orders without changing dates | HIGH | AC-4 |

**Integration (INT) — 3 scenarios — RECOMMENDED**

| ID | Description | Risk | ACs Covered | Linked Module |
|----|-------------|------|------------|--------------|
| INT-01 | Reschedule process order from Capacity Planning and verify process order header updated in Manage Process Orders app | HIGH | AC-4, AC-6 | Process Order Management |
| INT-02 | Reschedule process order and verify material availability dates re-calculated in MRP | MEDIUM | AC-4 | Material Requirements Planning |
| INT-03 | Confirm operation in Shop Floor Execution and verify capacity load updated in Capacity Planning | MEDIUM | AC-6 | Shop Floor Execution |

### Optional Scenarios

None

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — all 6 ACs covered by ≥ 1 TC | YES |
| HP Coverage | All 4 HP scenarios generated | YES |
| NEG Coverage | All 2 NEG scenarios generated | YES |
| ERR Coverage | All 3 ERR scenarios generated | YES |
| EDGE Coverage | All 3 EDGE TCs generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 8 TCs (50%) flagged as Automation Candidate: YES | YES |
| Integration Coverage | All 3 INT scenarios generated | RECOMMENDED |
| Alternative Path Coverage | 1 AP scenario generated | RECOMMENDED |

**Overall pass threshold:** All 7 mandatory gates must PASS. At least 1 of 2 recommended gates must PASS.

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Capacity planning overview is the primary business capability — failure blocks production scheduling |
| HP (overload detection) | CRITICAL | CRITICAL | Missing overload alerts cause GMP violations and contamination risk |
| HP (rescheduling) | CRITICAL | CRITICAL | Incorrect rescheduling breaks production sequence and material availability |
| HP (changeover time) | CRITICAL | CRITICAL | Omitting changeover time leads to contamination risk and GMP non-compliance |
| NEG (overload prevention) | HIGH | MAJOR | System must enforce capacity constraints to prevent scheduling conflicts |
| NEG (changeover omission) | HIGH | MAJOR | System must enforce changeover requirements for different products |
| ERR (past date) | HIGH | MAJOR | Invalid date validation prevents logical inconsistencies in schedule |
| ERR (invalid work center) | HIGH | MAJOR | Work center capability validation prevents unexecutable schedules |
| ERR (non-existent work center) | MEDIUM | MINOR | Master data validation — easily detected edge case |
| EDGE (100% utilization) | MEDIUM | MINOR | Boundary validation — system behavior at capacity limit |
| EDGE (0% utilization) | LOW | TRIVIAL | Cosmetic display validation — idle work center |
| EDGE (zero changeover) | LOW | TRIVIAL | Valid edge case — same product continuation |
| AP (resequence) | HIGH | MAJOR | Alternative action to rescheduling — equally valid business operation |
| INT (Process Order sync) | HIGH | MAJOR | Data consistency across modules — critical for schedule integrity |
| INT (MRP sync) | MEDIUM | MINOR | Material availability recalculation — important but not blocking |
| INT (Shop Floor sync) | MEDIUM | MINOR | Real-time capacity update — important but not blocking |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright — stable Fiori app with predictable UI patterns |
| AP | YES | Data-driven via testdata JSON — resequencing can be automated if Fiori UI supports drag-drop or sequence field input |
| NEG | YES | Stable validation checks — overload alerts and changeover warnings are machine-verifiable |
| ERR | YES | Field-level validation stable — error messages are consistent and machine-readable |
| EDGE | YES | Boundary values can be automated — 0% and 100% utilization states are deterministic |
| INT | PARTIAL | Multi-app orchestration needed — requires navigating between Capacity Planning and other Fiori apps in same session. Mark as PARTIAL pending Phase 3 exploration of cross-app navigation capabilities. |

**Target automation coverage:** 13 of 16 TCs (81%)

**Automation notes:**
- All HP, AP, NEG, ERR, EDGE scenarios are fully automatable (13 TCs)
- INT scenarios require multi-app session management — automation viability depends on whether Playwright can maintain navigation state across Fiori apps. If not feasible, INT scenarios will remain manual or require custom session handling logic.

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-{NNN} — HP-01: View capacity planning overview with planned and confirmed load
  TC-CS-{NNN} — HP-02: Identify overload situation highlighted on work center
  TC-CS-{NNN} — HP-03: Reschedule process order and verify updated start date
  TC-CS-{NNN} — HP-04: View capacity load including cleaning/changeover time

Priority 2 — HIGH (validate immediately after):
  TC-CS-{NNN} — NEG-01: Attempt to schedule into overload situation
  TC-CS-{NNN} — NEG-02: Schedule incompatible products without changeover time
  TC-CS-{NNN} — ERR-01: Attempt to reschedule to past date
  TC-CS-{NNN} — ERR-02: Attempt to reschedule to work center without capability
  TC-CS-{NNN} — AP-01: Resequence multiple process orders

Priority 3 — MEDIUM (complete coverage):
  TC-CS-{NNN} — EDGE-01: View capacity at 100% utilization
  TC-CS-{NNN} — ERR-03: Access capacity planning for non-existent work center
  TC-CS-{NNN} — EDGE-02: View capacity at 0% utilization
  TC-CS-{NNN} — EDGE-03: Reschedule with zero changeover time

Priority 4 — Integration (run after core stability confirmed):
  TC-CS-{NNN} — INT-01: Verify process order header updated in Manage Process Orders app
  TC-CS-{NNN} — INT-02: Verify material availability dates re-calculated in MRP
  TC-CS-{NNN} — INT-03: Verify capacity load updated after Shop Floor confirmation
```

---

## Regulatory and Compliance Notes

**GMP and Cleanroom Manufacturing Considerations:**
- Cleanroom/sterile manufacturing is subject to **GMP (Good Manufacturing Practice)** regulations — capacity planning errors can lead to contamination risk, batch failures, and regulatory non-compliance
- Work centers must be validated and qualified for specific cleanroom classifications (Grade A/B/C/D per EU GMP Annex 1 or FDA equivalents)
- **Changeover/cleaning time is mandatory** between different products on the same production line to prevent cross-contamination — test cases must verify that the system enforces this requirement
- **Capacity overload situations** can result in rushed changeovers or skipped cleaning steps, creating contamination risk — test cases must verify that overload alerts are visible and actionable
- All test execution must use dedicated test system instances (not production) with validated test work centers and process orders
- Test data must use **fictitious product codes and work centers** — do not use real production identifiers that could interfere with validated manufacturing schedules

**SAP-specific Compliance:**
- Capacity Planning data must be consistent with Work Center master data (CRHD table) and Process Order operations (AFPO/AFVC tables)
- Rescheduling actions must update all dependent planning tables (availability dates, MRP exceptions, shop floor schedules)
- Ensure Segregation of Duties (SOD) authorization requirements are pre-conditioned correctly — production planners must have authorization object PP_ORDER with activity "Change" (02)

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-61-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, NEG, ERR, EDGE) — total 12 TCs
3. Generate RECOMMENDED types (AP, INT) — total 4 TCs — unless time/scope constraints apply
4. Apply quality gates table — verify all 7 mandatory thresholds are met before completing
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above:
   - HP, AP, NEG, ERR, EDGE → **Automation Candidate: YES**
   - INT → **Automation Candidate: PARTIAL** (note required: multi-app navigation)
7. Output files to `testcases/AI-generated testcases/CS-61/` and `testdata/CS-61/`
8. **Cleanroom-specific test data requirements:**
   - Work Center IDs must be cleanroom/sterile classification (e.g., STERILE-WC-001, CLEANROOM-A-01)
   - Materials must be pharmaceutical or medical device products (e.g., DRUG-001, VACCINE-002)
   - Process orders must reference cleanroom work centers and materials
   - Changeover times must vary based on product compatibility (same product: 0, different products: >0)
   - Capacity utilization percentages must span full range (0%, 50%, 100%, >100%)
9. **Parameterization requirement:**
   - All test data values MUST use `{TD.*}` placeholders in test steps
   - No hardcoded SAP values (work center IDs, process order numbers, dates, times)
   - Create comprehensive `CS-61-testdata.json` with all scenarios covered
   - Include `CS-61-testdata-guide.md` with instructions for resolving placeholders to real SAP values
