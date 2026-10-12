# Test Strategy: [CS-55] Record A Deviation Directly Against An In-Process Control Result That

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-55/strategy/CS-55-analysis.md
**Risk Profile:**     jira/userstories/CS-55/strategy/CS-55-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Quality Assurance Specialist
- **Business Object:** Quality Notification (Deviation), In-Process Control Result, Process Order
- **SAP Module:** PP — Production Planning & QM — Quality Management (cross-module integration)
- **Business Goal:** Formally investigate any out-of-specification event during production before the batch proceeds

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 2 | 2 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 3 | 3 | HIGH |
| Negative (NEG) | MANDATORY | 4 | 4 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 5 | 5 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 8 | 8 | MEDIUM |
| Integration (INT) | MANDATORY | 4 | 4 | HIGH |
| **TOTAL** | — | **26** | **26** | — |

**Coverage Model Rationale:**
- **CRITICAL risk story** with GMP compliance implications — all scenario types are MANDATORY
- **HP (2 TCs):** End-to-end deviation lifecycle (create → document → close → release) + trend report validation
- **AP (3 TCs):** Three disposition decision types (USE_AS_IS, REWORK, SCRAP) — business-critical alternatives
- **NEG (4 TCs):** State transition validations (in-spec rejection, hold enforcement, missing root cause, missing disposition)
- **ERR (5 TCs):** Five mandatory CAPA fields — regulatory requirement for GMP environments
- **EDGE (8 TCs):** Text field boundaries (4 fields × 2 boundaries) + specification limit boundaries (4 scenarios)
- **INT (4 TCs):** Multi-module integration points (Fiori app → QM, QM → PP hold, QM → PP release, Reporting aggregation)

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP):**
- **HP-01:** Record deviation for out-of-spec in-process result + auto-hold process order + document CAPA + close deviation with disposition + verify process order released — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **HP-02:** View trend report showing deviation frequency by material, operation, and root cause — Risk: MEDIUM — ACs: AC-6

**Negative (NEG):**
- **NEG-01:** Attempt to record deviation for in-spec result (result within specification limits) — expect error "Result is within specification — deviation not required" — Risk: HIGH — ACs: AC-2
- **NEG-02:** Attempt to advance process order operation while deviation status is OUTSTANDING — expect error "Operation on hold — deviation {number} must be closed" — Risk: CRITICAL — ACs: AC-5
- **NEG-03:** Attempt to close deviation without documenting root cause — expect validation error — Risk: HIGH — ACs: AC-4
- **NEG-04:** Attempt to close deviation without disposition decision — expect validation error — Risk: HIGH — ACs: AC-5

**Error Scenarios (ERR):**
- **ERR-01:** Missing Root Cause field — Risk: HIGH — ACs: AC-4
- **ERR-02:** Missing Impact Assessment field — Risk: HIGH — ACs: AC-4
- **ERR-03:** Missing Corrective Action field — Risk: HIGH — ACs: AC-4
- **ERR-04:** Missing Preventive Action field — Risk: HIGH — ACs: AC-4
- **ERR-05:** Missing Disposition Decision at closure — Risk: CRITICAL — ACs: AC-5

**Edge Cases (EDGE):**
- **EDGE-01:** Root Cause text at minimum length (10 characters) — Risk: MEDIUM — ACs: AC-4
- **EDGE-02:** Root Cause text at maximum length (255 characters) — Risk: MEDIUM — ACs: AC-4
- **EDGE-03:** Impact Assessment text at minimum length (10 characters) — Risk: MEDIUM — ACs: AC-4
- **EDGE-04:** Impact Assessment text at maximum length (1000 characters) — Risk: MEDIUM — ACs: AC-4
- **EDGE-05:** In-process result exactly at lower spec limit (boundary — should NOT trigger deviation) — Risk: HIGH — ACs: AC-2
- **EDGE-06:** In-process result exactly at upper spec limit (boundary — should NOT trigger deviation) — Risk: HIGH — ACs: AC-2
- **EDGE-07:** In-process result 0.01 below lower spec limit (should trigger deviation) — Risk: HIGH — ACs: AC-2
- **EDGE-08:** In-process result 0.01 above upper spec limit (should trigger deviation) — Risk: HIGH — ACs: AC-2

**Integration (INT):**
- **INT-01:** Verify deviation creation triggered from Fiori app "Manage In-Process Inspection Results" (PP-QM integration) — Risk: HIGH — Implicit linked module: Manage In-Process Inspection Results app
- **INT-02:** Verify process order hold status updated in backend (QM → PP callback) — Risk: CRITICAL — Implicit linked module: Process Order Management
- **INT-03:** Verify process order released after deviation closure (QM → PP callback) — Risk: CRITICAL — Implicit linked module: Process Order Management
- **INT-04:** Verify trend report aggregates data from multiple deviations across materials and operations — Risk: MEDIUM — Implicit linked module: Analytics/Reporting module

### Recommended Scenarios

**Alternative Path (AP):**
- **AP-01:** Record deviation with USE_AS_IS disposition (no rework) — Risk: HIGH — ACs: AC-4, AC-5
- **AP-02:** Record deviation with REWORK disposition (process order returns to previous operation) — Risk: HIGH — ACs: AC-4, AC-5
- **AP-03:** Record deviation with SCRAP disposition (batch cancelled) — Risk: HIGH — ACs: AC-4, AC-5

### Optional Scenarios

None — all scenario types are MANDATORY due to CRITICAL risk classification.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — all 6 ACs covered by ≥ 1 TC | YES |
| HP Coverage | All 2 HP scenarios generated | YES |
| AP Coverage | All 3 AP scenarios generated | YES |
| NEG Coverage | All 4 NEG scenarios generated | YES |
| ERR Coverage | All 5 ERR scenarios generated | YES |
| EDGE Coverage | All 8 EDGE TCs generated | YES |
| INT Coverage | All 4 INT scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values (all use {TD.*} or {ENV.*}) | YES |
| Automation Eligibility | ≥ 13 TCs flagged as Automation Candidate: YES (50% of total) | YES |

**Overall pass threshold:** All mandatory gates must PASS.

**Additional gates for CRITICAL risk:**

| Additional Gate | Threshold | Mandatory |
|----------------|-----------|-----------|
| Negative coverage (entity validation) | 100% — one NEG per named validation rule | YES |
| Error coverage (mandatory fields) | 100% — one ERR per mandatory field in ACs | YES |

**CRITICAL Risk Justification:**
- GMP compliance — out-of-spec events must be captured (regulatory)
- Process order hold failure = non-conforming batch may proceed (safety risk)
- Incorrect auto-population corrupts traceability chain (compliance risk)

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (deviation lifecycle) | CRITICAL | CRITICAL | Core GMP compliance workflow — failure blocks production |
| HP (trend report) | HIGH | MAJOR | Business intelligence — not blocking but critical for continuous improvement |
| AP (disposition types) | HIGH | MAJOR | Business process variants — each disposition type has different downstream effects |
| NEG (validation rules) | HIGH | MAJOR | State transition enforcement — prevents non-conforming batches from proceeding |
| ERR (mandatory fields) | HIGH | MAJOR | CAPA documentation required for regulatory inspection |
| EDGE (text boundaries) | MEDIUM | MINOR | Data validation — important but not blocking |
| EDGE (spec limits) | HIGH | MAJOR | Specification limit logic is core to deviation trigger — boundary testing critical |
| INT (multi-module) | HIGH | MAJOR | Cross-module failures cascade (QM ↔ PP integration) |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright — stable, repeatable workflows |
| AP | YES | Data-driven via testdata JSON — disposition type as parameter |
| NEG | PARTIAL | Validation checks stable; in-spec result scenario may require test data setup in SAP |
| ERR | YES | Field-level validation is stable and repeatable |
| EDGE | PARTIAL | Text boundaries: YES (stable); Spec limit boundaries: PARTIAL (requires inspection plan setup in SAP) |
| INT | PARTIAL | Fiori app integration + backend callbacks testable; process order setup may require manual SAP config |

**Target automation coverage:** 15 of 26 TCs (58%) — exceeds 50% threshold

**Automation Recommendations:**
- **High Priority (automate first):** HP-01, HP-02, ERR-01 through ERR-05, EDGE-01 through EDGE-04
- **Medium Priority:** AP-01, AP-02, AP-03, NEG-01, NEG-03, NEG-04
- **Manual/Exploratory:** NEG-02 (requires process order in active state), EDGE-05 through EDGE-08 (require inspection plan config), INT-01 through INT-04 (multi-system orchestration)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-056 (HP-01): Deviation lifecycle end-to-end

Priority 2 — HIGH (validate immediately after):
  TC-CS-057 (NEG-02): Process order advance blocked by open deviation
  TC-CS-058 (NEG-03): Close deviation without root cause (validation)
  TC-CS-059 (NEG-04): Close deviation without disposition (validation)
  TC-CS-060 (ERR-01): Missing Root Cause field
  TC-CS-061 (ERR-02): Missing Impact Assessment field
  TC-CS-062 (ERR-03): Missing Corrective Action field
  TC-CS-063 (ERR-04): Missing Preventive Action field
  TC-CS-064 (ERR-05): Missing Disposition Decision at closure
  TC-CS-065 (EDGE-07): In-process result 0.01 below lower spec limit
  TC-CS-066 (EDGE-08): In-process result 0.01 above upper spec limit

Priority 3 — MEDIUM (complete coverage):
  TC-CS-067 (HP-02): Trend report view
  TC-CS-068 (AP-01): USE_AS_IS disposition
  TC-CS-069 (AP-02): REWORK disposition
  TC-CS-070 (AP-03): SCRAP disposition
  TC-CS-071 (NEG-01): In-spec result rejection
  TC-CS-072 (EDGE-01): Root Cause text minimum length
  TC-CS-073 (EDGE-02): Root Cause text maximum length
  TC-CS-074 (EDGE-03): Impact Assessment text minimum length
  TC-CS-075 (EDGE-04): Impact Assessment text maximum length
  TC-CS-076 (EDGE-05): In-process result at lower spec limit
  TC-CS-077 (EDGE-06): In-process result at upper spec limit

Priority 4 — Integration (run after core stability confirmed):
  TC-CS-078 (INT-01): Fiori app integration (In-Process Results → Deviation)
  TC-CS-079 (INT-02): Process order hold status update (QM → PP callback)
  TC-CS-080 (INT-03): Process order release after deviation closure (QM → PP callback)
  TC-CS-081 (INT-04): Trend report data aggregation
```

---

## Regulatory and Compliance Notes

### GMP Compliance Requirements
- **21 CFR Part 211.192** — Production record review: All out-of-specification events during production must be investigated before batch release
- **ICH Q7** — Good Manufacturing Practice for Active Pharmaceutical Ingredients: Deviations must be documented with root cause analysis, impact assessment, and corrective/preventive actions (CAPA)
- **Annex 1 (EU GMP)** — Manufacture of Sterile Medicinal Products: Process order hold pending deviation disposition is a critical control

### Test Data Requirements
- **Process Orders:** Use test process orders in SAP QA system — do NOT use production orders
- **Materials:** Use test material master data (Material Type: ROH or HALB with "TEST" prefix in description)
- **Batches:** Ensure test batches are created in unrestricted-use stock (no financial impact)
- **Inspection Plans:** Test-specific inspection plans must be assigned to test materials (do not modify production inspection plans)

### Authorization Requirements
- **QM02** — Change Quality Notification: Required for deviation documentation
- **QM03** — Display Quality Notification: Required for trend report access
- **IW21** — Create Notification: Required if Fiori app uses classic transaction backend
- **CO02** — Change Process Order: Required for process order hold/release verification

### Audit Trail Requirements
- All test executions must be logged in the test management system
- Deviation numbers created during testing must be marked as "TEST" in the notification text
- Test executions must NOT trigger production alerts or escalation workflows

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-55-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL scenario types — all are MANDATORY for this CRITICAL risk story
3. Apply quality gates table — verify all thresholds are met before completing
4. Use `prompts/testcase-generation-from-userstory.md` as the generation template
5. Flag automation candidates per the Automation Viability table above (target: 15 TCs marked YES)
6. Output files to `testcases/AI-generated testcases/CS-55/` and `testdata/CS-55/`
7. **CRITICAL:** Ensure all test data uses `{TD.*}` placeholders — no hardcoded process order, material, batch, or plant values
8. **CRITICAL:** Ensure each TC includes verification steps for auto-populated fields (material description, plant, work center, etc.)
9. **CRITICAL:** For integration scenarios (INT-01 through INT-04), include explicit verification of cross-module state changes

---

## Notes

- **Complexity:** This is a complex multi-module story (PP ↔ QM) with state transitions and workflow integration
- **Estimated Automation Effort:** 5-8 hours for 15 automated TCs (includes POM setup for Quality Notification + Process Order pages)
- **Manual Test Effort:** 3-4 hours for 11 manual/exploratory TCs (includes SAP config for inspection plans and process orders)
- **Regulatory Risk:** HIGH — test failures in this area may block GMP audit readiness
