# Test Strategy: [CS-58] Record Environmental Monitoring Readings (E.G., Cleanroom Particle Cou

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-58/strategy/CS-58-analysis.md
**Risk Profile:**     jira/userstories/CS-58/strategy/CS-58-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Production Operator
- **Business Object:** Process Order (Environmental Monitoring Data)
- **SAP Module:** PP — Production Planning and Control (GMP/Life Sciences vertical)
- **Business Goal:** Document environmental conditions during manufacturing as part of the batch record, ensuring GMP compliance with automatic deviation triggering for out-of-range readings

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 1 | 1 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 1 | 1 | HIGH |
| Negative (NEG) | MANDATORY | 5 | 5 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 5 | 5 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 9 | 9 | MEDIUM |
| Integration (INT) | MANDATORY | 3 | 3 | CRITICAL |
| **TOTAL** | — | **24** | **24** | — |

**Rationale for CRITICAL risk story:**
- All scenario types are MANDATORY given GMP compliance requirements (FDA 21 CFR Part 11)
- Range validation failures have direct patient safety impact (non-compliant product release risk)
- Deviation triggering and EBR integration are regulatory-mandated controls
- Even AP scenarios are RECOMMENDED (not optional) due to multi-operation confirmation complexity

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP):**
- **HP-01** — Record environmental readings (particle count, temperature, humidity) for an active Process Order operation (all readings in range) — verify confirmation created, no deviation triggered, EBR contains readings
  - **Risk:** CRITICAL
  - **ACs Covered:** AC-1, AC-2, AC-3 (in-range validation), AC-5

**Negative (NEG):**
- **NEG-01** — Enter particle count above acceptable range (e.g., 5000 for ISO 5 cleanroom with max 3520) — verify system flags out-of-range, still saves reading, triggers deviation
  - **Risk:** CRITICAL
  - **ACs Covered:** AC-3, AC-4
- **NEG-02** — Enter temperature below acceptable range (e.g., 15.0°C when min is 18.0°C) — verify system flags out-of-range, triggers deviation
  - **Risk:** CRITICAL
  - **ACs Covered:** AC-3, AC-4
- **NEG-03** — Enter humidity above acceptable range (e.g., 75.0% when max is 60.0%) — verify system flags out-of-range, triggers deviation
  - **Risk:** CRITICAL
  - **ACs Covered:** AC-3, AC-4
- **NEG-04** — Attempt to access non-environmentally-controlled operation (no environmental monitoring step configured) — verify system does not prompt for readings
  - **Risk:** HIGH
  - **ACs Covered:** AC-2
- **NEG-05** — Attempt to record readings for inactive/completed Process Order — verify system prevents entry
  - **Risk:** HIGH
  - **ACs Covered:** AC-2

**Error / Missing Field (ERR):**
- **ERR-01** — Missing Particle Count field (when operation requires it) — verify system prevents confirmation submission
  - **Risk:** HIGH
  - **ACs Covered:** AC-2
- **ERR-02** — Missing Temperature field (when operation requires it) — verify system prevents confirmation submission
  - **Risk:** HIGH
  - **ACs Covered:** AC-2
- **ERR-03** — Missing Humidity field (when operation requires it) — verify system prevents confirmation submission
  - **Risk:** HIGH
  - **ACs Covered:** AC-2
- **ERR-04** — Invalid Process Order Number (non-existent) — verify system displays error "Process Order does not exist"
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-1, AC-2
- **ERR-05** — Invalid Operation Number (not part of selected Process Order) — verify system displays error "Operation not found"
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-1, AC-2

**Edge Case / Boundary (EDGE):**
- **EDGE-01** — Particle Count at exact lower boundary (0 particles/m³) — verify system accepts, no out-of-range flag
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-3
- **EDGE-02** — Particle Count at exact upper boundary (e.g., 3520 for ISO 5) — verify system accepts, no out-of-range flag
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-3
- **EDGE-03** — Particle Count at upper boundary + 1 (3521) — verify system flags out-of-range, triggers deviation
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-3, AC-4
- **EDGE-04** — Temperature at exact lower boundary (18.0°C) — verify system accepts, no flag
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-3
- **EDGE-05** — Temperature at exact upper boundary (25.0°C) — verify system accepts, no flag
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-3
- **EDGE-06** — Temperature at lower boundary - 0.1°C (17.9°C) — verify system flags out-of-range
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-3
- **EDGE-07** — Humidity at exact lower boundary (30.0%) — verify system accepts, no flag
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-3
- **EDGE-08** — Humidity at exact upper boundary (60.0%) — verify system accepts, no flag
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-3
- **EDGE-09** — Humidity at lower boundary - 0.1% (29.9%) — verify system flags out-of-range
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-3

**Integration (INT):**
- **INT-01** — Verify deviation record automatically created in QM module when out-of-range reading entered — check deviation linked to Process Order and operation
  - **Risk:** CRITICAL
  - **ACs Covered:** AC-4
- **INT-02** — Verify environmental readings appear in compiled Electronic Batch Record (EBR) — check all operations' readings aggregated correctly
  - **Risk:** CRITICAL
  - **ACs Covered:** AC-5
- **INT-03** — Verify trend report displays environmental data across multiple Process Orders/batches and production suites over time — check date range filtering and chart accuracy
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-6

---

### Recommended Scenarios

**Alternative Path (AP):**
- **AP-01** — Record readings for multiple operations within same Process Order (verify each operation's readings independently recorded and flagged)
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-1, AC-2
  - **Note:** Validates that multi-operation Process Orders correctly handle per-operation environmental monitoring logic

---

### Optional Scenarios

None — all scenarios are MANDATORY or RECOMMENDED given CRITICAL risk classification and GMP compliance requirements.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 1 HP scenarios generated | YES |
| NEG Coverage | All 5 NEG scenarios generated | YES |
| ERR Coverage | All 5 ERR scenarios generated | YES |
| EDGE Coverage | All 9 EDGE TCs generated | YES |
| INT Coverage | All 3 INT scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 12 TCs (50%) flagged as Automation Candidate: YES | YES |

**Overall pass threshold:** All mandatory gates must PASS.

**Additional CRITICAL risk gates:**
- Negative coverage: 100% — 3 out-of-range scenarios (particle count, temperature, humidity) + 2 entity/state validations
- Error coverage: 100% — 3 mandatory environmental reading fields + 2 entity lookup validations
- Integration coverage: 100% — All 3 external system integrations (QM deviation, EBR compilation, trend reporting) verified

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | GMP batch record completeness — missing environmental data = batch rejection |
| NEG (out-of-range readings) | HIGH | CRITICAL | Patient safety — non-compliant product release risk if out-of-range readings not flagged |
| NEG (state/entity validation) | HIGH | MAJOR | Production continuity — prevents invalid confirmations |
| ERR (missing mandatory field) | HIGH | MAJOR | Data integrity — incomplete batch records are FDA audit findings |
| EDGE (boundary values) | MEDIUM | MAJOR | Range validation robustness — edge cases expose off-by-one validation errors |
| AP (multi-operation) | HIGH | MAJOR | Operational accuracy — complex Process Orders require per-operation tracking |
| INT (deviation triggering) | CRITICAL | CRITICAL | Regulatory compliance — missed deviations = audit non-conformance |
| INT (EBR compilation) | CRITICAL | CRITICAL | FDA 21 CFR Part 11 — incomplete batch records block product release |
| INT (trend reporting) | MEDIUM | MINOR | Business intelligence — not immediate compliance risk |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidate — stable Fiori app UI with consistent element refs |
| AP | PARTIAL | Multi-operation logic stable, but requires Process Order with 2+ environmentally-controlled operations in test data |
| NEG | YES | Validation message assertions are stable and repeatable |
| ERR | YES | Mandatory field enforcement and error message text are stable |
| EDGE | YES | Boundary value assertions machine-verifiable (in-range vs. out-of-range flag visible in UI) |
| INT | PARTIAL | Deviation record creation (INT-01) requires QM module read access; EBR compilation (INT-02) may require separate document system access; Trend report (INT-03) requires multi-batch historical data setup |

**Target automation coverage:** 15 of 24 TCs (62.5%)

**Automation challenges:**
- INT-02 (EBR compilation) may be external to Fiori app — requires separate navigation/verification step
- INT-03 (Trend report) requires multi-batch test data setup — automate data creation or use pre-seeded test system
- AP-01 requires Process Order with multiple environmentally-controlled operations — test data prerequisite
- NEG-04, NEG-05 require negative test data (non-environmental operation, inactive PO) — parameterize in testdata JSON

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-{HP-01}    HP: Record environmental readings (all in range)
  TC-CS-{INT-01}   INT: Verify deviation record created (out-of-range)
  TC-CS-{INT-02}   INT: Verify EBR contains environmental readings

Priority 2 — HIGH (validate immediately after):
  TC-CS-{NEG-01}   NEG: Particle count above range
  TC-CS-{NEG-02}   NEG: Temperature below range
  TC-CS-{NEG-03}   NEG: Humidity above range
  TC-CS-{NEG-04}   NEG: Non-environmental operation
  TC-CS-{NEG-05}   NEG: Inactive Process Order
  TC-CS-{ERR-01}   ERR: Missing Particle Count
  TC-CS-{ERR-02}   ERR: Missing Temperature
  TC-CS-{ERR-03}   ERR: Missing Humidity
  TC-CS-{ERR-04}   ERR: Invalid Process Order Number
  TC-CS-{ERR-05}   ERR: Invalid Operation Number
  TC-CS-{AP-01}    AP: Multiple operations

Priority 3 — MEDIUM (complete coverage):
  TC-CS-{EDGE-01}  EDGE: Particle Count lower boundary (0)
  TC-CS-{EDGE-02}  EDGE: Particle Count upper boundary (3520)
  TC-CS-{EDGE-03}  EDGE: Particle Count upper+1 (3521)
  TC-CS-{EDGE-04}  EDGE: Temperature lower boundary (18.0°C)
  TC-CS-{EDGE-05}  EDGE: Temperature upper boundary (25.0°C)
  TC-CS-{EDGE-06}  EDGE: Temperature lower-0.1°C (17.9°C)
  TC-CS-{EDGE-07}  EDGE: Humidity lower boundary (30.0%)
  TC-CS-{EDGE-08}  EDGE: Humidity upper boundary (60.0%)
  TC-CS-{EDGE-09}  EDGE: Humidity lower-0.1% (29.9%)

Priority 4 — Reporting/Analytics (run after core stability confirmed):
  TC-CS-{INT-03}   INT: Trend report across batches
```

**Execution dependency notes:**
- INT-01 depends on NEG-01, NEG-02, or NEG-03 completing first (deviation record only created for out-of-range readings)
- INT-02 depends on HP-01 completing first (EBR must contain at least one valid confirmation)
- INT-03 depends on multiple Process Order confirmations existing in the system (requires historical data or multi-TC execution)

---

## Regulatory and Compliance Notes

**GMP / Life Sciences Compliance:**
- Environmental monitoring is a critical control for pharmaceutical manufacturing under FDA 21 CFR Parts 210/211 (cGMP)
- All environmental readings must be part of the permanent batch record (EBR requirement)
- Out-of-range readings must trigger automatic investigation/deviation records (no manual intervention allowed)
- Acceptable range specifications must be validated and approved (not part of test case scope — assumed pre-configured)
- Test execution must use dedicated GMP-compliant test system with full audit trail enabled
- Test data must not use production Process Order numbers or batch numbers
- All test confirmations must be reversible or flagged as test data in the system

**Data Integrity (ALCOA+ Principles):**
- Readings must be Attributable (user ID captured), Legible (decimal precision respected), Contemporaneous (timestamp auto-generated), Original (no manual edits after save), Accurate (validation enforced)
- Test cases verify system prevents backdated or edited confirmations

**Authorization Requirements:**
- User must have `PP_PROC_ORDER_CONFIRM` authorization object with activity 02 (Change)
- Test user account must have environmentally-controlled work center assignment
- Deviation creation requires `QM_QMEL` authorization object (Quality Notification)

**Test System Requirements:**
- SAP S/4HANA Cloud with GMP-enabled configuration
- Environmental monitoring characteristics configured in inspection plan master data
- Acceptable range specifications defined and activated
- Deviation record linkage configuration active (QM module integration)
- Electronic Batch Record compilation service active (may be third-party DMS integration)

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-58-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, NEG, ERR, EDGE, INT) — 23 TCs
3. Generate RECOMMENDED AP scenario (1 TC) — total 24 TCs
4. Apply quality gates table — verify all thresholds are met before completing
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above:
   - HP-01: YES
   - AP-01: PARTIAL
   - NEG-01 to NEG-05: YES
   - ERR-01 to ERR-05: YES
   - EDGE-01 to EDGE-09: YES
   - INT-01: PARTIAL
   - INT-02: PARTIAL
   - INT-03: PARTIAL
7. Output files to `testcases/AI-generated testcases/CS-58/` and `testdata/CS-58/`
8. Generate test data JSON with these placeholders:
   - `{{PROCESS_ORDER_ACTIVE}}` — Active Process Order with environmental monitoring enabled
   - `{{OPERATION_ENVIRONMENTAL}}` — Operation number flagged as environmentally controlled
   - `{{PROCESS_ORDER_INACTIVE}}` — Completed/closed Process Order
   - `{{OPERATION_NON_ENVIRONMENTAL}}` — Operation without environmental monitoring flag
   - `{{PROCESS_ORDER_NONEXISTENT}}` — Non-existent Process Order number (e.g., 999999999999)
   - `{{OPERATION_INVALID}}` — Operation not part of selected Process Order
   - `{{PARTICLE_COUNT_MIN}}` — 0
   - `{{PARTICLE_COUNT_MAX}}` — 3520 (ISO 5 cleanroom standard)
   - `{{PARTICLE_COUNT_OUT_OF_RANGE}}` — 5000
   - `{{TEMPERATURE_MIN}}` — 18.0
   - `{{TEMPERATURE_MAX}}` — 25.0
   - `{{TEMPERATURE_OUT_OF_RANGE_LOW}}` — 15.0
   - `{{HUMIDITY_MIN}}` — 30.0
   - `{{HUMIDITY_MAX}}` — 60.0
   - `{{HUMIDITY_OUT_OF_RANGE_HIGH}}` — 75.0
9. Document acceptable range values in `CS-58-testdata-guide.md` — note that actual ranges must be verified in SAP system configuration before test execution
