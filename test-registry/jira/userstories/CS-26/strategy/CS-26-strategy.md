# Test Strategy: [CS-26] Generate A Batch Traceability Report Showing All Goods Movements For A

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-26/strategy/CS-26-analysis.md
**Risk Profile:**     jira/userstories/CS-26/strategy/CS-26-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Compliance Officer
- **Business Object:** Batch Traceability Report / Batch Where-Used List
- **SAP Module:** MM — Materials Management (Batch Management)
- **Business Goal:** Respond to a regulatory recall inquiry within the required timeframe by generating a comprehensive batch traceability report showing all goods movements, downstream linkage to process orders and deliveries, and export to regulatory-compliant documentation formats

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 3 | 3 | CRITICAL |
| Alternative Path (AP) | MANDATORY | 4 | 4 | HIGH |
| Negative (NEG) | MANDATORY | 3 | 3 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 3 | 3 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 3 | 3 | MEDIUM |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | N/A |
| **TOTAL** | — | **16** | **16** | — |

**Rationale:**
- **CRITICAL overall risk** requires all scenario types except INT (no linked issues identified)
- AC-3 and AC-4 are CRITICAL risk — require exhaustive HP and EDGE coverage
- AC-2 is HIGH risk with multiple search paths — requires full AP coverage for material and vendor batch search
- Regulatory compliance context elevates all validation and error scenarios to MANDATORY
- Integration scenarios are NOT APPLICABLE — no linked issues in Jira

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios — Happy Path (HP)

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| HP-01 | Access Batch Where-Used List app, search by batch number, verify all movements displayed (GR/transfer/consumption/issue), verify downstream process order linkage, export to Excel | CRITICAL | AC-1, AC-2, AC-3, AC-4, AC-5 |
| HP-02 | Search by batch number, verify downstream delivery linkage | CRITICAL | AC-2, AC-4 |
| HP-03 | Search by batch number, verify performance threshold met | MEDIUM | AC-2, AC-6 |

### Mandatory Scenarios — Alternative Path (AP)

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| AP-01 | Search by material number (instead of batch) | HIGH | AC-2, AC-3 |
| AP-02 | Search by vendor batch reference (instead of batch number) | HIGH | AC-2, AC-3 |
| AP-03 | Batch with no downstream linkage (not consumed in process orders or deliveries) | HIGH | AC-4 |
| AP-04 | Export report to PDF (instead of Excel) | HIGH | AC-5 |

### Mandatory Scenarios — Negative (NEG)

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| NEG-01 | Search with non-existent batch number | HIGH | AC-2 |
| NEG-02 | Search with material not configured for batch management | HIGH | AC-2 |
| NEG-03 | Export fails due to system error | HIGH | AC-5 |

### Mandatory Scenarios — Error / Missing Field (ERR)

| ID | Description | Risk | ACs Covered | Field |
|----|-------------|------|-------------|-------|
| ERR-01 | Missing Batch Number field (when batch search selected) | HIGH | AC-2 | Batch Number |
| ERR-02 | Missing Material field (when material search selected) | HIGH | AC-2 | Material |
| ERR-03 | Missing Vendor Batch field (when vendor batch search selected) | HIGH | AC-2 | Vendor Batch |

### Mandatory Scenarios — Edge Case / Boundary (EDGE)

| ID | Description | Risk | ACs Covered | Parameter | Boundary |
|----|-------------|------|-------------|-----------|----------|
| EDGE-01 | Batch with zero goods movements (created but never used) | MEDIUM | AC-3 | movements | lower |
| EDGE-02 | Batch with very large number of movements (performance test) | MEDIUM | AC-3, AC-6 | movements | upper |
| EDGE-03 | Export very large report (file size limit test) | MEDIUM | AC-5 | fileSize | upper |

### Optional Scenarios

None

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 3 HP scenarios generated | YES |
| NEG Coverage | All 3 NEG scenarios generated | YES |
| ERR Coverage | All 3 ERR scenarios generated | YES |
| EDGE Coverage | All 3 EDGE scenarios generated | YES |
| AP Coverage | All 4 AP scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 10 TCs flagged as Automation Candidate: YES | YES |

**CRITICAL-risk specific gates:**
- Negative coverage (entity validation): 100% — NEG-01 (batch validation) and NEG-02 (batch-managed material validation) MUST be generated
- Error coverage (mandatory fields): 100% — ERR-01 (Batch), ERR-02 (Material), ERR-03 (Vendor Batch) MUST be generated
- Downstream linkage coverage: 100% — HP-01 (process order), HP-02 (delivery), AP-03 (no linkage) MUST be generated

**Overall pass threshold:** All mandatory gates must PASS. No recommended gates (all gates are mandatory for CRITICAL risk).

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core traceability query) | CRITICAL | CRITICAL | Regulatory recall response depends on complete batch traceability data — failure blocks compliance |
| HP (downstream linkage) | CRITICAL | CRITICAL | Incomplete linkage data prevents full recall scope identification — regulatory risk |
| HP (performance) | HIGH | MAJOR | Time-critical recall situations require acceptable query performance — business continuity risk |
| AP (alternative search paths) | HIGH | MAJOR | Multiple search entry points must work reliably — material and vendor batch search are valid recall workflows |
| AP (no downstream linkage) | HIGH | MAJOR | Edge case must not cause report generation failure — data completeness validation |
| AP (PDF export) | HIGH | MAJOR | Alternative export format required for regulatory documentation — compliance requirement |
| NEG (invalid batch) | HIGH | MAJOR | Non-existent batch must produce clear error message — prevents false negatives in recall investigation |
| NEG (non-batch-managed material) | HIGH | MAJOR | System must reject invalid search criteria — data integrity validation |
| NEG (export failure) | HIGH | MAJOR | Export failure must be gracefully handled — regulatory documentation requirement |
| ERR (missing search fields) | HIGH | MAJOR | Mandatory field validation must prevent incomplete queries — data quality gate |
| EDGE (zero movements) | MEDIUM | MINOR | Batch with no movements is valid but uncommon — system must handle gracefully |
| EDGE (large result set) | MEDIUM | MINOR | Performance validation for high-volume batches — scalability requirement |
| EDGE (large export) | MEDIUM | MINOR | Large report export must not fail — system capacity validation |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright — batch search, movements verification, downstream linkage, export actions are stable and repeatable |
| AP | YES | Alternative search paths (material, vendor batch) and PDF export are data-driven and stable |
| NEG | YES | Validation checks for non-existent batch and non-batch-managed material are stable — error message assertions are machine-verifiable |
| ERR | YES | Field-level validation for missing mandatory fields is stable and repeatable |
| EDGE | PARTIAL | Zero movements scenario is automatable; large result set and large export require specific SAP test data setup (may need manual batch creation with many movements) |
| INT | N/A | No integration scenarios |

**Target automation coverage:** 14 of 16 TCs (87.5%) — EDGE-02 and EDGE-03 marked PARTIAL due to test data setup requirements

**Automation recommendations:**
- HP-01 (comprehensive end-to-end) is the PRIMARY regression test — must be automated
- All search paths (batch number, material, vendor batch) should be automated for CI/CD coverage
- Export validation (Excel and PDF) should verify file download and basic file integrity (file exists, size > 0)
- Performance validation (HP-03) should assert query completion within defined threshold (e.g., < 10 seconds)
- EDGE scenarios may require pre-configured test batches in SAP test system (coordinate with SAP admin)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-{NNN} — HP-01: Comprehensive batch traceability query with process order linkage and Excel export
  TC-CS-{NNN} — HP-02: Batch traceability with delivery linkage

Priority 2 — HIGH (validate immediately after):
  TC-CS-{NNN} — HP-03: Performance threshold validation
  TC-CS-{NNN} — AP-01: Search by material number
  TC-CS-{NNN} — AP-02: Search by vendor batch reference
  TC-CS-{NNN} — AP-03: Batch with no downstream linkage
  TC-CS-{NNN} — AP-04: Export to PDF
  TC-CS-{NNN} — NEG-01: Non-existent batch number
  TC-CS-{NNN} — NEG-02: Material not batch-managed
  TC-CS-{NNN} — NEG-03: Export failure handling
  TC-CS-{NNN} — ERR-01: Missing Batch Number field
  TC-CS-{NNN} — ERR-02: Missing Material field
  TC-CS-{NNN} — ERR-03: Missing Vendor Batch field

Priority 3 — MEDIUM (complete coverage):
  TC-CS-{NNN} — EDGE-01: Batch with zero movements
  TC-CS-{NNN} — EDGE-02: Large result set (performance)
  TC-CS-{NNN} — EDGE-03: Large export file size

Priority 4 — Integration (run after core stability confirmed):
  (None)
```

**Execution strategy:**
- Run Priority 1 tests first — if HP-01 or HP-02 fail, halt execution and investigate (core functionality broken)
- Run Priority 2 tests in parallel where possible (alternative search paths are independent)
- Run Priority 3 tests last — EDGE scenarios may have longer execution times due to large data volumes
- Re-run failed tests once to rule out transient SAP system issues before logging defects

---

## Regulatory and Compliance Notes

**Batch traceability is a regulatory compliance requirement:**
- Batch traceability reports are used in food safety recalls, pharmaceutical adverse event investigations, and chemical compliance audits
- Incomplete or inaccurate traceability data can result in regulatory penalties, product liability, and reputational damage
- Test cases must verify that ALL goods movements are displayed (not just a subset) — AC-3 is CRITICAL
- Downstream linkage to process orders and deliveries is essential for identifying affected finished goods — AC-4 is CRITICAL
- Exported reports must be complete and include all required data fields for regulatory submission — AC-5 is HIGH

**SAP S/4HANA Cloud specific considerations:**
- Batch management must be enabled at material master level (MARA-XCHPF = X)
- Batch master records are stored in MCHA (plant level) and MCH1 (client level)
- Goods movements are recorded in MSEG (material document items) and MKPF (material document headers)
- Vendor batch reference is optional but commonly used in regulated industries — test coverage required (AP-02)
- Performance is critical for recall situations — acceptable threshold should be defined with business stakeholders (suggested: < 10 seconds)

**Test data governance:**
- Do NOT use production batch numbers or real vendor batch references in test cases
- Use dedicated test batches created in SAP test system (coordinate with SAP admin or data provisioning team)
- Ensure test batches have representative goods movements (GR 101, transfer 311, consumption 261, issue 201)
- For EDGE-02 (large result set), pre-create a test batch with 100+ movements if possible
- For export tests, verify that test reports do not contain sensitive or production data

**Authorization requirements:**
- User must have authorization for MM batch management transactions (MM03 for batch display, MB56 for batch where-used list)
- Fiori app authorization: F1801 (Batch Where-Used List) or equivalent
- Export authorization may be separately controlled (S_GUI with activity 61 for Excel export)
- Test execution requires a test user with full MM batch traceability authorization object S_BMEI

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-26-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types (HP, AP, NEG, ERR, EDGE) — all 16 test cases must be generated
3. Do NOT generate INT test cases (no linked issues)
4. Apply quality gates table — verify all thresholds are met before completing:
   - 100% AC traceability (all 6 ACs covered)
   - All 3 HP scenarios generated
   - All 4 AP scenarios generated
   - All 3 NEG scenarios generated
   - All 3 ERR scenarios generated
   - All 3 EDGE scenarios generated
   - 0 hardcoded SAP values (use `{TD.*}` placeholders for batch number, material, vendor batch, etc.)
   - ≥ 10 TCs flagged Automation Candidate: YES
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table:
   - HP: YES (all 3)
   - AP: YES (all 4)
   - NEG: YES (all 3)
   - ERR: YES (all 3)
   - EDGE: PARTIAL for EDGE-02 and EDGE-03 (mark as YES with note: "Requires pre-configured test data")
7. Output files to:
   - `testcases/AI-generated testcases/CS-26/testcases/` — individual TC markdown files
   - `testcases/AI-generated testcases/CS-26/CS-26-coverage-matrix.md` — AC-to-TC traceability
   - `testcases/AI-generated testcases/CS-26/CS-26-summary.json` — machine-readable TC registry
   - `testdata/CS-26/CS-26-testdata.json` — parameterized test datasets with `{{PLACEHOLDER}}` values
   - `testdata/CS-26/CS-26-testdata-guide.md` — guide for SAP admin to fill in real batch numbers and materials

**Critical test data parameters for CS-26:**
- Batch Number (valid, with movements) — for HP-01, HP-02, HP-03
- Batch Number (valid, with process order linkage) — for HP-01
- Batch Number (valid, with delivery linkage) — for HP-02
- Batch Number (valid, zero movements) — for EDGE-01
- Batch Number (valid, large movements) — for EDGE-02
- Batch Number (non-existent) — for NEG-01
- Material Number (batch-managed, with batches) — for AP-01
- Material Number (NOT batch-managed) — for NEG-02
- Vendor Batch Reference (valid) — for AP-02
- Expected performance threshold (seconds) — for HP-03
- Expected movement types (101, 311, 261, 201, etc.) — for HP-01 movement verification
- Expected process order number format — for HP-01
- Expected delivery number format — for HP-02
