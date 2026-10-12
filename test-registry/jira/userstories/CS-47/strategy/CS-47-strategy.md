# Test Strategy: [CS-47] Link A Customer Complaint Captured In Sales To A Formal Quality Notifi

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-47/strategy/CS-47-analysis.md
**Risk Profile:**     jira/userstories/CS-47/strategy/CS-47-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Quality Assurance Specialist
- **Business Object:** Quality Notification (linked to Sales/Return Order)
- **SAP Module:** QM — Quality Management (with SD integration)
- **Business Goal:** Ensure product quality issues raised by customers are investigated using GMP-compliant process

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 2 | 2 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 3 | 3 | HIGH |
| Negative (NEG) | MANDATORY | 6 | 6 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 4 | 4 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 4 | 4 | MEDIUM |
| Integration (INT) | MANDATORY | 3 | 3 | HIGH |
| **TOTAL** | — | **22** | **22** | — |

**Rationale for CRITICAL-level coverage:**
- Story involves GMP-compliant regulatory process — all validation and closure rules are non-negotiable
- Multi-module integration (SD → QM → Workflow → Reporting) requires comprehensive INT scenarios
- Business impact is CRITICAL: product safety, customer trust, audit compliance
- AC-4 and AC-5 are both CRITICAL risk — status tracking and closure validation cannot fail

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP) — 2 scenarios**
1. **HP-01**: Create Quality Notification from Sales Order with complete customer complaint details — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-6
2. **HP-02**: Create Quality Notification from Return Order with complete customer complaint details — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4

**Negative (NEG) — 6 scenarios**
1. **NEG-01**: Attempt to create Quality Notification from Sales Order missing material data — Risk: HIGH — ACs: AC-2
2. **NEG-02**: Attempt to create Quality Notification from Sales Order missing batch data — Risk: HIGH — ACs: AC-2
3. **NEG-03**: Attempt to create Quality Notification from Sales Order missing customer data — Risk: HIGH — ACs: AC-2
4. **NEG-04**: Attempt to close Quality Notification without disposition code — Risk: CRITICAL — ACs: AC-5
5. **NEG-05**: Attempt to close Quality Notification without corrective action — Risk: CRITICAL — ACs: AC-5
6. **NEG-06**: Attempt to close Quality Notification without root cause analysis — Risk: CRITICAL — ACs: AC-5

**Error (ERR) — 4 scenarios**
1. **ERR-01**: Missing Defect Description field (mandatory at creation) — Risk: HIGH — ACs: AC-2 — Field: Defect Description
2. **ERR-02**: Missing Disposition Code (mandatory at closure) — Risk: CRITICAL — ACs: AC-5 — Field: Disposition Code
3. **ERR-03**: Missing Corrective Action (mandatory at closure) — Risk: CRITICAL — ACs: AC-5 — Field: Corrective Action
4. **ERR-04**: Missing Root Cause Analysis (mandatory at closure) — Risk: CRITICAL — ACs: AC-5 — Field: Root Cause Analysis

**Edge Case / Boundary (EDGE) — 4 scenarios**
1. **EDGE-01**: Defect Description at minimum length boundary (20 chars) — Risk: MEDIUM — ACs: AC-2 — Parameter: defectDescription, Boundary: lower
2. **EDGE-02**: Defect Description at maximum length boundary (1000 chars) — Risk: LOW — ACs: AC-2 — Parameter: defectDescription, Boundary: upper
3. **EDGE-03**: Root Cause at minimum closure length boundary (50 chars) — Risk: MEDIUM — ACs: AC-5 — Parameter: rootCause, Boundary: lower
4. **EDGE-04**: Corrective Action at minimum closure length boundary (50 chars) — Risk: MEDIUM — ACs: AC-5 — Parameter: correctiveAction, Boundary: lower

**Integration (INT) — 3 scenarios**
1. **INT-01**: Verify Quality Notification status displays correctly on originating Sales Order — Risk: CRITICAL — ACs: AC-4 — Integration: SD-QM bidirectional link
2. **INT-02**: Verify Quality Notification routes to correct QA team member's worklist — Risk: HIGH — ACs: AC-3 — Integration: QM-Workflow routing
3. **INT-03**: Verify complaint report aggregates data from multiple Quality Notifications — Risk: MEDIUM — ACs: AC-6 — Integration: QM-Reporting data aggregation

### Recommended Scenarios

**Alternative Path (AP) — 3 scenarios**
1. **AP-01**: Status transition from "Open" → "Under Investigation" → "Closed" with all required fields — Risk: CRITICAL — ACs: AC-4, AC-5
2. **AP-02**: Access complaint report filtered by specific material — Risk: MEDIUM — ACs: AC-6
3. **AP-03**: Access complaint report filtered by specific batch — Risk: MEDIUM — ACs: AC-6

**Rationale for AP as RECOMMENDED:**
- AP-01 is essential for validating workflow state machine (CRITICAL)
- AP-02 and AP-03 validate reporting filters (business intelligence requirement)
- All three AP scenarios directly support stated ACs

### Optional Scenarios

None. All scenario types have MANDATORY or RECOMMENDED status due to CRITICAL overall risk level and GMP compliance requirements.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 2 HP scenarios generated | YES |
| NEG Coverage | All 6 NEG scenarios generated | YES |
| ERR Coverage | All 4 ERR scenarios generated | YES |
| EDGE Coverage | All 4 EDGE TCs generated (includes lower + upper boundaries) | YES |
| AP Coverage | All 3 AP scenarios generated | YES |
| INT Coverage | All 3 INT scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 11 TCs flagged as Automation Candidate: YES (50% of total) | YES |

**Additional CRITICAL-level gates:**
| Gate | Threshold | Mandatory |
|------|-----------|---------|
| Negative coverage (closure validation) | 100% — 3 NEG scenarios for AC-5 (disposition, corrective action, root cause) | YES |
| Error coverage (mandatory fields) | 100% — 4 ERR scenarios for all mandatory fields | YES |
| Integration bidirectional link | INT-01 must validate status display on Sales Order | YES |

**Overall pass threshold:** All mandatory gates must PASS. 100% of recommended gates must PASS (AP coverage is not optional for this CRITICAL story).

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Quality Notification creation is the primary business process; failure blocks regulatory compliance |
| NEG (closure validation) | CRITICAL | CRITICAL | NEG-04/05/06 enforce GMP-required fields at closure; failure = non-compliant investigation |
| NEG (pre-population validation) | HIGH | MAJOR | NEG-01/02/03 ensure data integrity from Sales; failure = incorrect root cause analysis |
| ERR (missing mandatory field) | HIGH | MAJOR | ERR scenarios enforce field validation; failure = incomplete documentation |
| INT (bidirectional link) | CRITICAL | CRITICAL | INT-01 ensures Sales Order shows QN status; failure = audit trail broken |
| INT (worklist routing) | HIGH | MAJOR | INT-02 ensures QA team assignment; failure = SLA breach, investigation delay |
| AP (status transitions) | CRITICAL | CRITICAL | AP-01 validates workflow state machine; failure = incorrect status tracking |
| AP (reporting filters) | MEDIUM | MINOR | AP-02/03 enable business intelligence; failure = reduced trend analysis capability |
| EDGE (boundary values) | MEDIUM | MINOR | EDGE scenarios validate length constraints; failure = data entry confusion but not blocking |
| INT (reporting aggregation) | MEDIUM | MINOR | INT-03 validates report data accuracy; failure = misleading trend analysis |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright — stable transaction flow |
| AP | YES | Status transitions are repeatable; report filters are data-driven |
| NEG | YES | Stable validation checks for missing source data and closure fields |
| ERR | YES | Field-level validation is stable and repeatable |
| EDGE | YES | Text length boundaries are machine-verifiable |
| INT | PARTIAL | INT-01 (bidirectional link) and INT-02 (worklist routing) require multi-session orchestration; INT-03 (reporting) is automatable with data setup |

**Target automation coverage:** 20 of 22 TCs (91%)

**Automation constraints:**
- INT-01 requires navigating from QM back to Sales Order UI to verify status display — feasible but requires session management
- INT-02 requires worklist access with QA user role — requires dedicated test user with correct authorization
- All NEG/ERR scenarios require test data with intentionally missing fields — must parameterize via testdata JSON

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-{XXX} — HP-01: Create Quality Notification from Sales Order
  TC-CS-{XXX} — HP-02: Create Quality Notification from Return Order
  TC-CS-{XXX} — AP-01: Status transition Open → Under Investigation → Closed
  TC-CS-{XXX} — INT-01: Verify status displays on Sales Order
  TC-CS-{XXX} — NEG-04: Attempt closure without disposition
  TC-CS-{XXX} — NEG-05: Attempt closure without corrective action
  TC-CS-{XXX} — NEG-06: Attempt closure without root cause

Priority 2 — HIGH (validate immediately after):
  TC-CS-{XXX} — NEG-01: Missing material data
  TC-CS-{XXX} — NEG-02: Missing batch data
  TC-CS-{XXX} — NEG-03: Missing customer data
  TC-CS-{XXX} — ERR-01: Missing Defect Description
  TC-CS-{XXX} — ERR-02: Missing Disposition Code
  TC-CS-{XXX} — ERR-03: Missing Corrective Action
  TC-CS-{XXX} — ERR-04: Missing Root Cause Analysis
  TC-CS-{XXX} — INT-02: Verify worklist routing

Priority 3 — MEDIUM (complete coverage):
  TC-CS-{XXX} — AP-02: Report filter by material
  TC-CS-{XXX} — AP-03: Report filter by batch
  TC-CS-{XXX} — EDGE-01: Defect Description min length (20 chars)
  TC-CS-{XXX} — EDGE-03: Root Cause min length (50 chars)
  TC-CS-{XXX} — EDGE-04: Corrective Action min length (50 chars)
  TC-CS-{XXX} — INT-03: Report aggregation

Priority 4 — LOW (boundary edge cases):
  TC-CS-{XXX} — EDGE-02: Defect Description max length (1000 chars)
```

**Rationale:**
- HP scenarios establish baseline functionality
- CRITICAL NEG/INT scenarios (closure validation + bidirectional link) must pass before continuing
- HIGH NEG/ERR scenarios validate data integrity and field validation
- MEDIUM scenarios complete coverage (reporting, boundaries)
- LOW priority scenarios are non-blocking edge cases

---

## Regulatory and Compliance Notes

**GMP Compliance Requirements:**
- Quality Notifications are GMP-controlled documents — test cases must verify that all mandatory documentation fields (Disposition, Corrective Action, Root Cause) are enforced at closure
- Ensure test data does not use real production customer, material, or batch IDs
- All test execution must use dedicated SAP QAS (Quality Assurance System) or sandbox instance — not production
- Test cases must verify that Quality Notification numbers are traceable back to originating Sales/Return Order (bidirectional link) for audit purposes
- Defect Description minimum length (20 chars) is a GMP requirement — EDGE-01 specifically validates this boundary
- Root Cause and Corrective Action minimum lengths (50 chars) enforce documentation quality — EDGE-03 and EDGE-04 validate these boundaries

**Authorization and Segregation of Duties:**
- Quality Notification creation requires QA Specialist role with authorization object Q_QMEL (Quality Notification - Create)
- Worklist routing (AC-3) requires QA team member assignment via Workflow authorization
- Closure validation (AC-5) may require additional authorization for Disposition code assignment (system-dependent)
- Test user credentials must have appropriate QM module authorizations

**Data Privacy:**
- Customer complaint details may contain PII (Personally Identifiable Information) — test data must use anonymized customer records
- Do not use real customer names or contact information in test datasets

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-47-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first: HP (2), NEG (6), ERR (4), EDGE (4), INT (3)
3. Generate ALL RECOMMENDED scenario types: AP (3) — these are not optional for this CRITICAL story
4. Apply quality gates table — verify all thresholds are met before completing:
   - 100% AC traceability (all 6 ACs covered)
   - All 22 test cases generated (no reductions permitted)
   - 0 hardcoded SAP values (all data via `{TD.*}` or `{ENV.*}` placeholders)
   - ≥ 20 TCs flagged as Automation Candidate: YES
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above:
   - HP, AP, NEG, ERR, EDGE: YES
   - INT: PARTIAL (note multi-session or authorization constraints)
7. Output files to:
   - `testcases/AI-generated testcases/CS-47/testcases/` — individual TC markdown files
   - `testcases/AI-generated testcases/CS-47/CS-47-coverage-matrix.md` — AC traceability matrix
   - `testcases/AI-generated testcases/CS-47/CS-47-summary.json` — machine-readable TC registry
   - `testdata/CS-47/CS-47-testdata.json` — parameterized test datasets
   - `testdata/CS-47/CS-47-testdata-guide.md` — guide for resolving SAP values
8. Assign TC IDs sequentially: `TC-CS-{nnn}` starting from the next available ID in the CS project
9. Assign priorities per the Test Case Priority Assignment table above
10. Include GMP compliance notes in each TC's Preconditions section where applicable
