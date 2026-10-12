# Test Strategy: [CS-16] Create A Quality Inspection Lot Automatically Upon Goods Receipt For G

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-16/strategy/CS-16-analysis.md
**Risk Profile:**     jira/userstories/CS-16/strategy/CS-16-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Quality Inspector
- **Business Object:** Quality Inspection Lot, Goods Receipt, Quality Inspection Stock
- **SAP Module:** QM — Quality Management (integrated with MM — Materials Management)
- **Business Goal:** Ensure incoming materials are quarantined and cannot be used in production until QA has reviewed and released them

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 2 | 2 | CRITICAL |
| Alternative Path (AP) | MANDATORY | 2 | 2 | HIGH |
| Negative (NEG) | MANDATORY | 3 | 3 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 3 | 3 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 3 | 3 | MEDIUM |
| Integration (INT) | MANDATORY | 1 | 1 | HIGH |
| **TOTAL** | — | **14** | **14** | — |

**Rationale for coverage decisions:**
- **CRITICAL risk** story requires all scenario types to be MANDATORY
- No adjustment needed from recommended TC counts — all scenarios are essential for GMP regulatory compliance
- Integration testing is MANDATORY due to implicit MM-QM dependency (GR triggering inspection lot creation)
- EDGE scenarios are MANDATORY due to numeric test result specifications requiring boundary value analysis

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

| Scenario ID | Description | Risk | ACs Covered |
|------------|-------------|------|-------------|
| HP-01 | Access "Manage Inspection Lots" app | LOW | AC-1 |
| HP-02 | Post GR for QM-active material → inspection lot auto-created → stock posted to Quality Inspection → record test results (all within spec) → record Accept UD → stock transferred to Unrestricted-Use → verify audit trail | CRITICAL | AC-2, AC-3, AC-4, AC-5, AC-6, AC-8 |
| AP-01 | Post GR for QM-active material → inspection lot auto-created → record test results → record Reject UD → stock transferred to Blocked | CRITICAL | AC-2, AC-3, AC-4, AC-5, AC-7 |
| AP-02 | Post GR for QM-active material → inspection lot auto-created → record test results → record Conditional Accept UD → stock transferred to Unrestricted-Use with restriction note | HIGH | AC-2, AC-3, AC-4, AC-5 |
| NEG-01 | Post GR for material WITHOUT QM inspection type configured → no inspection lot created, stock posted directly to Unrestricted-Use | HIGH | AC-2 |
| NEG-02 | Attempt to issue material from Quality Inspection stock to production (without UD) → system rejects | CRITICAL | AC-3 |
| NEG-03 | Attempt to issue material from Blocked stock to production (after Reject UD) → system rejects | CRITICAL | AC-7 |
| ERR-01 | Missing Inspection Lot Number (system generation failure) | CRITICAL | AC-2 |
| ERR-02 | Missing Test Result entry for mandatory characteristic | HIGH | AC-4 |
| ERR-03 | Missing Usage Decision before attempting to close inspection lot | CRITICAL | AC-5 |
| EDGE-01 | Test result value exactly at lower specification limit | MEDIUM | AC-4 |
| EDGE-02 | Test result value exactly at upper specification limit | MEDIUM | AC-4 |
| EDGE-03 | Test result value outside specification range (out-of-spec) → system should flag and enforce Reject or Conditional Accept UD | HIGH | AC-4, AC-5 |
| INT-01 | Post Goods Receipt via "Post Goods Receipt" Fiori app for QM-active material → verify inspection lot auto-created in "Manage Inspection Lots" app | HIGH | AC-2 |

### Recommended Scenarios

None — All scenarios from the inventory are MANDATORY due to CRITICAL overall risk level.

### Optional Scenarios

None

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 2 HP scenarios generated | YES |
| NEG Coverage | All 3 NEG scenarios generated | YES |
| ERR Coverage | All 3 ERR scenarios generated | YES |
| EDGE Coverage | All 3 EDGE TCs generated | YES |
| AP Coverage | All 2 AP scenarios generated | YES |
| INT Coverage | 1 INT scenario generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 8 TCs flagged as Automation Candidate: YES | YES |

**CRITICAL risk additional gates:**
- **Negative coverage (entity validation):** 100% — all 3 NEG scenarios covering material without QM type (1), quarantine stock enforcement (1), blocked stock enforcement (1) must be generated
- **Error coverage (mandatory fields):** 100% — all 3 ERR scenarios covering inspection lot number (1), test result (1), usage decision (1) must be generated

**Overall pass threshold:** All mandatory gates must PASS. 100% of gates are mandatory for CRITICAL risk stories.

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | HP-02 covers the full end-to-end GMP-compliant inspection lot lifecycle — failure means materials bypass quality control |
| HP (access/navigation) | HIGH | MINOR | HP-01 is a prerequisite for all other test cases but low business risk |
| AP (alternative UD paths) | HIGH | CRITICAL | AP-01 (Reject UD) and AP-02 (Conditional Accept UD) are valid business outcomes with critical stock movement implications |
| NEG (invalid entity) | HIGH | CRITICAL | NEG-01 (no inspection type) verifies system enforces QM activation. NEG-02/NEG-03 verify quarantine and blocked stock cannot be issued to production — GMP compliance critical |
| ERR (missing mandatory field) | HIGH | CRITICAL | ERR-01 (inspection lot generation), ERR-02 (test result), ERR-03 (usage decision) all represent data integrity failures that block the quality process |
| EDGE (boundary) | MEDIUM | MAJOR | EDGE-01/02 verify system accepts boundary values correctly. EDGE-03 (out-of-spec) verifies system flags non-conforming results — important for quality but not core path |
| INT (cross-module) | HIGH | CRITICAL | INT-01 verifies the MM-QM integration trigger (GR → inspection lot creation) — if this fails, the entire quality process is bypassed |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright |
| AP | YES | Data-driven via testdata JSON |
| NEG | YES | Stable validation checks |
| ERR | YES | Field-level validation stable |
| EDGE | PARTIAL | May require specific SAP config |
| INT | PARTIAL | Multi-session orchestration needed |

**Target automation coverage:** 10 of 14 TCs (71%)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  {List HP test case IDs once generated}

Priority 2 — HIGH (validate immediately after):
  {List NEG and ERR test case IDs}

Priority 3 — MEDIUM (complete coverage):
  {List AP and EDGE test case IDs}

Priority 4 — Integration (run after core stability confirmed):
  {List INT test case IDs}
```

---

## Regulatory and Compliance Notes

**GMP (Good Manufacturing Practice) Compliance:**
- This story is subject to GMP regulatory requirements for pharmaceutical and life sciences industries
- Quality inspection lots are legally required documentation for batch release decisions
- **Audit trail completeness (AC-8) is mandatory** — all inspection results, usage decisions, timestamps, and user IDs must be logged and immutable
- **Quarantine enforcement (AC-3) is mandatory** — materials in Quality Inspection stock must not be available for production consumption until Usage Decision is recorded
- **Blocked stock enforcement (AC-7) is mandatory** — materials with Reject UD must not be issuable to production under any circumstances

**Test Data Requirements:**
- All test execution must use dedicated test system instances (not production or quality assurance systems)
- Test materials must have realistic QM inspection plans (inspection characteristics, specification limits) but must not use real production material numbers
- Test data must include both QM-active and non-QM materials to verify NEG-01 scenario
- Ensure test user has Q_INSPLOT authorization object for Usage Decision recording

**Traceability Requirements:**
- Each test case must verify the presence and correctness of audit trail entries (AC-8)
- Test case documentation must link back to regulatory validation requirements if this story is part of a validated system

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-16-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first
3. Generate RECOMMENDED types unless time/scope constraints apply
4. Apply quality gates table — verify all thresholds are met before completing
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above
7. Output files to `testcases/AI-generated testcases/CS-16/` and `testdata/CS-16/`
8. Ensure test data includes:
   - Material with QM inspection type configured (for HP, AP, NEG-02, NEG-03, ERR, EDGE, INT scenarios)
   - Material WITHOUT QM inspection type (for NEG-01 scenario)
   - Inspection plan with at least one numeric characteristic (for EDGE boundary testing)
   - Specification limits for boundary value analysis (e.g., pH 6.5-7.5, purity 98.0-100.0%)
   - Usage Decision codes: A (Accept), R (Reject), C (Conditional Accept)
9. Ensure each test case explicitly states which AC(s) it covers in the AC Traceability section
10. Ensure each test case includes audit trail verification step(s) where applicable (HP-02, AP-01, AP-02)
