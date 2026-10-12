# Test Strategy: [CS-56] View A Batch Genealogy Report Showing The Complete Lineage From Raw Ma

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-56/strategy/CS-56-analysis.md
**Risk Profile:**     jira/userstories/CS-56/strategy/CS-56-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Production Supervisor
- **Business Object:** Batch Genealogy Report / Batch Record
- **SAP Module:** PP — Production Planning & Control / QM — Quality Management
- **Business Goal:** Respond quickly to suspected quality issues or regulatory recall requests

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 4 | 4 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 2 | 2 | HIGH |
| Negative (NEG) | MANDATORY | 4 | 4 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 2 | 2 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 4 | 4 | MEDIUM |
| Integration (INT) | RECOMMENDED | 2 | 2 | HIGH |
| **TOTAL** | — | **18** | **18** | — |

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP) — 4 scenarios**

- **HP-01**: View genealogy for a finished goods batch with single-level BOM
  - **Risk:** CRITICAL
  - **ACs Covered:** AC-1, AC-2, AC-4, AC-6
  - **Description:** Core use case for single-tier genealogy tracking

- **HP-02**: View genealogy for a finished goods batch with multi-level BOM (raw → intermediate → finished)
  - **Risk:** CRITICAL
  - **ACs Covered:** AC-1, AC-2, AC-4, AC-6
  - **Description:** Complex genealogy spanning multiple production levels

- **HP-03**: View where-used chain for a batch that was further processed (finished → repackaged)
  - **Risk:** HIGH
  - **ACs Covered:** AC-1, AC-3, AC-4, AC-6
  - **Description:** Downstream traceability for finished batches

- **HP-04**: Export genealogy report to file (PDF or Excel)
  - **Risk:** HIGH
  - **ACs Covered:** AC-1, AC-5
  - **Description:** Regulatory documentation and customer response capability

**Negative (NEG) — 4 scenarios**

- **NEG-01**: Search by non-existent finished goods batch number
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-2, AC-6
  - **Description:** User error handling for invalid batch reference

- **NEG-02**: Search by batch number in wrong format (invalid characters or length)
  - **Risk:** LOW
  - **ACs Covered:** AC-2
  - **Description:** Input validation for batch field

- **NEG-03**: Access Batch Information Cockpit without required authorization
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-1
  - **Description:** Security and authorization control

- **NEG-04**: Search by batch that has no component batches (never consumed anything)
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-2, AC-3
  - **Description:** Edge case for batches without genealogy data

**Error (ERR) — 2 scenarios**

- **ERR-01**: Missing Batch Number field
  - **Risk:** HIGH
  - **ACs Covered:** AC-2
  - **Field:** Batch Number (mandatory)
  - **Description:** Mandatory field validation

- **ERR-02**: Export fails due to system authorization or technical error
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-5
  - **Field:** Export Functionality
  - **Description:** Export authorization and technical failure handling

**Edge Case (EDGE) — 4 scenarios**

- **EDGE-01**: Genealogy query with maximum BOM depth (10+ levels)
  - **Risk:** HIGH
  - **ACs Covered:** AC-2, AC-6
  - **Parameter:** genealogyDepth (upper boundary)
  - **Description:** Performance stress test for deep BOM structures

- **EDGE-02**: Genealogy query for batch with hundreds of component batches (complex assembly)
  - **Risk:** HIGH
  - **ACs Covered:** AC-2, AC-6
  - **Parameter:** componentBatchCount (upper boundary)
  - **Description:** Performance stress test for wide BOM structures

- **EDGE-03**: Query genealogy at exactly the acceptable time threshold
  - **Risk:** CRITICAL
  - **ACs Covered:** AC-6
  - **Parameter:** queryResponseTime (upper boundary)
  - **Description:** Performance boundary validation for time-critical recall scenarios

- **EDGE-04**: Batch with incomplete dates (e.g., released but no inspection date recorded)
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-4
  - **Parameter:** dateCompleteness (lower boundary)
  - **Description:** Data quality handling for partially complete batch records

### Recommended Scenarios

**Alternative Path (AP) — 2 scenarios**

- **AP-01**: Search by batch number without specifying material (system derives material)
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-2
  - **Description:** Simplified search workflow

- **AP-02**: Search with both component view and where-used view enabled (bidirectional genealogy)
  - **Risk:** HIGH
  - **ACs Covered:** AC-2, AC-3
  - **Description:** Comprehensive bidirectional traceability

**Integration (INT) — 2 scenarios**

- **INT-01**: Verify vendor batch number linkage from MM goods receipt to PP batch genealogy
  - **Risk:** HIGH
  - **ACs Covered:** AC-2
  - **Dependency:** MM/PP integration
  - **Description:** Validate vendor traceability through MM-PP data flow

- **INT-02**: Verify inspection lot results from QM appear in genealogy report
  - **Risk:** HIGH
  - **ACs Covered:** AC-4
  - **Dependency:** QM/PP integration
  - **Description:** Validate quality data integration into genealogy report

### Optional Scenarios

None — All scenarios from the inventory are classified as MANDATORY or RECOMMENDED due to the CRITICAL risk level of this story.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 4 HP scenarios generated | YES |
| NEG Coverage | All 4 NEG scenarios generated | YES |
| ERR Coverage | All 2 ERR scenarios generated | YES |
| EDGE Coverage | All 4 EDGE TCs generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 12 TCs flagged as Automation Candidate: YES | YES |

**CRITICAL Risk Additional Gates:**

| Additional Gate | Threshold | Mandatory |
|----------------|-----------|---------|
| Negative coverage (entity validation) | 100% — NEG-01 (non-existent batch), NEG-02 (invalid format), NEG-03 (unauthorized), NEG-04 (no components) | YES |
| Error coverage (mandatory fields) | 100% — ERR-01 (missing batch number) | YES |
| Performance boundary testing | EDGE-03 (time threshold) must be explicitly defined with measurable acceptance criteria | YES |

**Overall pass threshold:** All mandatory gates must PASS. At least 100% of recommended gates must PASS (all INT and AP scenarios generated).

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core genealogy query) | CRITICAL | CRITICAL | Regulatory recall response depends entirely on accurate genealogy data — failure = potential public health risk |
| NEG (invalid batch/unauthorized) | HIGH | MAJOR | User error and security controls must prevent incorrect recall scope or unauthorized access to sensitive batch data |
| ERR (missing batch number) | HIGH | MAJOR | Mandatory field validation is essential — missing batch = no genealogy query possible |
| EDGE (performance boundaries) | MEDIUM | MINOR | Performance at scale is critical for time-sensitive recall investigations but does not block core functionality |
| AP (search variants) | HIGH | MAJOR | Bidirectional genealogy (AP-02) is essential for complete recall scope determination |
| INT (MM/PP and QM/PP integration) | HIGH | MAJOR | Vendor traceability and quality data integration are regulatory requirements — missing data = incomplete recall documentation |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright — stable genealogy queries with predictable report structure |
| AP | YES | Data-driven via testdata JSON — search parameter variants are stable |
| NEG | YES | Stable validation checks — error messages are consistent |
| ERR | YES | Field-level validation is stable — missing batch number triggers predictable error |
| EDGE | PARTIAL | Performance testing requires controlled test data setup (batches with known BOM depth/complexity) — may require manual data preparation |
| INT | PARTIAL | Multi-module integration requires MM goods receipts and QM inspection lots to be pre-created — orchestration complexity HIGH |

**Target automation coverage:** 14 of 18 TCs (78%) — HP (4), AP (2), NEG (4), ERR (2), EDGE (2 of 4)

**PARTIAL/NO automation rationale:**
- EDGE-01, EDGE-02 require specific BOM structures that may not exist in test systems — manual data setup needed
- INT-01, INT-02 require multi-session orchestration (MM goods receipt → PP production confirmation → QM inspection → Batch genealogy query) — test data dependencies are complex

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-{XXX}: HP-01 — Single-level genealogy query
  TC-CS-{XXX}: HP-02 — Multi-level genealogy query
  TC-CS-{XXX}: EDGE-03 — Performance threshold validation

Priority 2 — HIGH (validate immediately after):
  TC-CS-{XXX}: HP-03 — Where-used chain query
  TC-CS-{XXX}: HP-04 — Export genealogy report
  TC-CS-{XXX}: NEG-01 — Non-existent batch handling
  TC-CS-{XXX}: NEG-03 — Unauthorized access
  TC-CS-{XXX}: NEG-04 — Batch with no components
  TC-CS-{XXX}: ERR-01 — Missing batch number validation
  TC-CS-{XXX}: AP-02 — Bidirectional genealogy
  TC-CS-{XXX}: INT-01 — MM/PP vendor linkage
  TC-CS-{XXX}: INT-02 — QM/PP inspection results

Priority 3 — MEDIUM (complete coverage):
  TC-CS-{XXX}: NEG-02 — Invalid batch format
  TC-CS-{XXX}: ERR-02 — Export failure handling
  TC-CS-{XXX}: EDGE-01 — Maximum BOM depth
  TC-CS-{XXX}: EDGE-02 — Complex assembly query
  TC-CS-{XXX}: EDGE-04 — Incomplete date handling
  TC-CS-{XXX}: AP-01 — Simplified search (batch only)

Priority 4 — Integration (run after core stability confirmed):
  (INT scenarios already included in Priority 2 due to HIGH risk)
```

---

## Regulatory and Compliance Notes

**Batch Genealogy and Regulatory Recall:**
- Batch genealogy reports are CRITICAL for regulatory recall investigations (FDA, EU MDR, ISO 9001 traceability requirements)
- Test cases must verify that genealogy data is COMPLETE and ACCURATE — incomplete recall scope = regulatory non-compliance + public health risk
- All test execution must use dedicated test system instances with synthetic batch data (never production batches)
- Performance requirements (AC-6) are driven by regulatory timelines for recall notifications (typically 24-48 hours to authorities)

**Data Privacy:**
- Batch records may contain vendor-proprietary information — test data must not use real vendor batch numbers or sensitive manufacturing parameters
- Authorization controls (NEG-03) are essential for protecting competitive and proprietary batch information

**Data Retention:**
- SAP batch records and genealogy data must be retained per regulatory requirements (typically 5-10 years for pharmaceutical/medical device industries)
- Test cases must verify that archived batch data can still be queried for historical recall investigations

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-56-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, NEG, ERR, EDGE)
3. Generate RECOMMENDED types (AP, INT) — all are required due to CRITICAL risk level
4. Apply quality gates table — verify all thresholds are met before completing
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above
7. Output files to `testcases/AI-generated testcases/CS-56/` and `testdata/CS-56/`
8. For EDGE-03 (performance threshold), define explicit acceptance criteria in seconds (suggest 10 seconds for complex genealogy per AC-6 analysis)
9. For INT scenarios, document prerequisite test data setup steps (MM goods receipt, QM inspection lot creation) in Preconditions
10. For export scenarios (HP-04, ERR-02), specify expected file formats (PDF and Excel) and verify export success indicators
