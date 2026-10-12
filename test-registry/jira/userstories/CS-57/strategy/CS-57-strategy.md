# Test Strategy: [CS-57] Create And Version A Master Recipe For A Pharmaceutical Product With D

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-57/strategy/CS-57-analysis.md
**Risk Profile:**     jira/userstories/CS-57/strategy/CS-57-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Master Data Specialist
- **Business Object:** Master Recipe (Recipe Header, Recipe Operations, In-Process Control Specifications, Recipe Version)
- **SAP Module:** PP — Production Planning & Manufacturing (Pharmaceutical/Process Manufacturing)
- **Business Goal:** Ensure production is executed consistently according to the validated manufacturing process

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 2 | 2 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 2 | 2 | HIGH |
| Negative (NEG) | MANDATORY | 6 | 6 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 9 | 9 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 8 | 8 | MEDIUM |
| Integration (INT) | RECOMMENDED | 5 | 5 | HIGH |
| **TOTAL** | — | **32** | **32** | — |

**Coverage Rationale:**

Due to CRITICAL overall risk classification and pharmaceutical regulatory requirements (GMP/GDP, 21 CFR Part 11):

- **HP (MANDATORY):** Core recipe creation and versioning flows are critical to production execution — recipe is the single source of truth for manufacturing operations.
- **AP (RECOMMENDED):** Multi-operation and multi-checkpoint scenarios reflect real-world pharmaceutical manufacturing complexity — essential for practical automation coverage.
- **NEG (MANDATORY):** CRITICAL risk on approval workflow enforcement and status validation — unapproved recipes = regulatory violation. All 6 NEG scenarios are mandatory due to CRITICAL ACs (AC-2, AC-4) and HIGH risk validation dependencies (AC-5).
- **ERR (MANDATORY):** AC-5 defines 9 distinct mandatory fields for recipe completeness — each must have explicit validation test case to ensure data integrity.
- **EDGE (MANDATORY):** Numeric parameters (quantities, durations, ranges) drive production calculations — boundary value testing is mandatory to prevent calculation errors or invalid quality specifications.
- **INT (RECOMMENDED):** Strong implicit dependencies on Material Master, Work Center Master, QM Inspection Characteristics, Workflow Engine, and Change Document System. While not explicitly linked in Jira, integration failures will cascade into production execution failures. All 5 INT scenarios recommended for comprehensive coverage.

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

#### Happy Path (2 scenarios — CRITICAL priority)

- **HP-01:** Create new Master Recipe (draft), define operations, add in-process controls, submit for approval, approve via workflow, verify Released status and audit log
  - **Risk:** CRITICAL
  - **ACs Covered:** AC-1, AC-2, AC-5, AC-6
  - **Test Type:** End-to-end transaction flow

- **HP-02:** Edit a Released recipe, verify new version created automatically, verify prior version preserved, verify new version in Draft status
  - **Risk:** CRITICAL
  - **ACs Covered:** AC-3, AC-6
  - **Test Type:** Versioning behavior validation

#### Negative Scenarios (6 scenarios — HIGH priority)

- **NEG-01:** Attempt to create Process Order against Draft recipe version — verify system blocks with error
  - **Risk:** CRITICAL
  - **ACs Covered:** AC-4

- **NEG-02:** Attempt to create Process Order against Obsolete recipe version — verify system blocks with error
  - **Risk:** CRITICAL
  - **ACs Covered:** AC-4

- **NEG-03:** Attempt to release recipe without completing approval workflow — verify status remains Draft/In Approval
  - **Risk:** CRITICAL
  - **ACs Covered:** AC-2

- **NEG-04:** Attempt to create recipe with invalid Material Number — verify validation error
  - **Risk:** HIGH
  - **ACs Covered:** AC-1, AC-5

- **NEG-05:** Attempt to add operation with invalid Work Center — verify validation error
  - **Risk:** HIGH
  - **ACs Covered:** AC-5

- **NEG-06:** Attempt to add in-process control with invalid Inspection Characteristic — verify validation error
  - **Risk:** HIGH
  - **ACs Covered:** AC-5

#### Error Scenarios (9 scenarios — HIGH priority)

All mandatory field validations for AC-5:

- **ERR-01:** Missing Material Number
- **ERR-02:** Missing Plant
- **ERR-03:** Missing Base Quantity
- **ERR-04:** Missing Operation Number
- **ERR-05:** Missing Work Center
- **ERR-06:** Missing In-Process Checkpoint ID
- **ERR-07:** Missing Target Value
- **ERR-08:** Missing Lower Limit
- **ERR-09:** Missing Upper Limit

Each ERR scenario verifies that the system rejects recipe creation/operation/checkpoint creation when the mandatory field is omitted, with appropriate validation error message.

#### Edge Case / Boundary Scenarios (8 scenarios — MEDIUM priority)

Boundary value testing for numeric parameters defined in AC-5:

- **EDGE-01:** Base Quantity = minimum valid value (0.001)
- **EDGE-02:** Base Quantity = maximum valid value (999999999.999)
- **EDGE-03:** Standard Duration = minimum valid value (0.01)
- **EDGE-04:** Standard Duration = maximum valid value (999999.99)
- **EDGE-05:** Target Value = Lower Limit (boundary case)
- **EDGE-06:** Target Value = Upper Limit (boundary case)
- **EDGE-07:** Lower Limit > Target Value — verify validation error
- **EDGE-08:** Upper Limit < Target Value — verify validation error

### Recommended Scenarios

#### Alternative Path (2 scenarios — HIGH priority)

- **AP-01:** Create recipe with multiple operations (3+ operations in sequence)
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-1, AC-5
  - **Rationale:** Pharmaceutical recipes typically have multi-step operations (mixing, heating, cooling, inspection). Single-operation recipes are atypical.

- **AP-02:** Create recipe with multiple in-process control checkpoints per operation
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-5
  - **Rationale:** Quality-critical operations require multiple inspection points (temperature, pH, viscosity, purity). Single-checkpoint operations are insufficient for GMP compliance.

#### Integration Scenarios (5 scenarios — HIGH priority)

- **INT-01:** Validate Material Master integration — create recipe with material from MM module, verify Material Description auto-populates
  - **Risk:** HIGH
  - **Linked To:** Material Master (MM)
  - **ACs Covered:** AC-5

- **INT-02:** Validate Work Center Master integration — add operation with work center from PP module, verify Work Center Description auto-populates
  - **Risk:** HIGH
  - **Linked To:** Work Center Master (PP)
  - **ACs Covered:** AC-5

- **INT-03:** Validate QM Inspection Characteristic integration — add in-process control with inspection characteristic from QM module, verify characteristic details retrieved
  - **Risk:** HIGH
  - **Linked To:** Quality Management (QM)
  - **ACs Covered:** AC-5

- **INT-04:** Validate Workflow integration — submit recipe for approval, verify workflow triggers, verify approver notification
  - **Risk:** HIGH
  - **Linked To:** Business Workflow
  - **ACs Covered:** AC-2

- **INT-05:** Validate Change Document integration — edit released recipe, verify Change Document Number generated in audit log
  - **Risk:** HIGH
  - **Linked To:** Change Document System
  - **ACs Covered:** AC-3, AC-6

### Optional Scenarios

None. Given the CRITICAL risk classification and pharmaceutical regulatory context, all identified scenarios (32 total) are either MANDATORY or RECOMMENDED.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — all 6 ACs covered by ≥ 1 TC | YES |
| HP Coverage | All 2 HP scenarios generated | YES |
| NEG Coverage | All 6 NEG scenarios generated | YES |
| ERR Coverage | All 9 ERR scenarios generated | YES |
| EDGE Coverage | All 8 EDGE scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values — all data via {TD.*} or {ENV.*} placeholders | YES |
| Automation Eligibility | ≥ 16 TCs flagged as Automation Candidate: YES (50% of 32 TCs) | YES |
| Integration Coverage | All 5 INT scenarios generated | RECOMMENDED |
| Alternative Path Coverage | All 2 AP scenarios generated | RECOMMENDED |

**Overall pass threshold:** All 7 mandatory gates must PASS. At least 1 of 2 recommended gates must PASS (≥50% recommended coverage).

**Additional CRITICAL risk gates:**

| Additional Gate | Threshold | Rationale |
|----------------|-----------|-----------|
| Approval workflow validation | 100% — NEG-03 + INT-04 must verify workflow cannot be bypassed | Regulatory compliance — unapproved recipe release = GMP violation |
| Versioning validation | 100% — HP-02 + INT-05 must verify version auto-increment + audit trail | 21 CFR Part 11 compliance — audit history integrity |
| Released status validation | 100% — NEG-01 + NEG-02 must verify Process Order blocks non-Released recipes | Production safety — prevents use of unvalidated recipes |

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Recipe creation and versioning are prerequisite to all production execution. Failure blocks entire manufacturing process. Regulatory impact: inability to demonstrate recipe validation. |
| NEG (invalid entity) | HIGH | MAJOR | Validation failures on Material, Work Center, QM Characteristic prevent recipe creation but do not compromise existing production. Regulatory impact: data integrity violations if invalid entities allowed. |
| NEG (workflow/status) | CRITICAL | CRITICAL | NEG-01, NEG-02, NEG-03 enforce regulatory controls (unapproved recipe release = GMP violation). Failure severity = regulatory audit finding. |
| ERR (missing field) | HIGH | MAJOR | Mandatory field enforcement ensures recipe completeness. Incomplete recipes cannot be released (workflow validation gate). Failure = data integrity issue. |
| EDGE (boundary) | MEDIUM | MINOR | Boundary value failures result in calculation errors or invalid quality specifications but are detected during recipe validation (pre-release). Impact limited to specific test data scenarios. |
| AP (alternative) | HIGH | MAJOR | Multi-operation and multi-checkpoint scenarios reflect real pharmaceutical manufacturing. Failure impacts practical automation coverage and production execution fidelity. |
| INT (integration) | HIGH | MAJOR | Integration failures with MM, PP, QM, Workflow, or Change Document systems cascade into production execution failures or regulatory compliance failures. |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright. Stable transaction flows with machine-verifiable outcomes (Recipe ID, Status, Audit Log). |
| AP | YES | Data-driven via testdata JSON. Multiple operations/checkpoints parameterized as table-driven inputs. |
| NEG | PARTIAL | NEG-01, NEG-02 require Process Order app automation (cross-app dependency). NEG-03, NEG-04, NEG-05, NEG-06 are stable validation checks within Master Recipe app. |
| ERR | YES | Field-level validation is stable and repeatable. Error messages are machine-verifiable. |
| EDGE | YES | Boundary values are parameterizable. Validation outcomes are machine-verifiable (success or specific error message). |
| INT | PARTIAL | INT-01, INT-02, INT-03 are YES (auto-population verification within single app). INT-04 requires Workflow Inbox app automation (PARTIAL). INT-05 requires Change Document System query (PARTIAL — may require custom OData/API call). |

**Target automation coverage:** 24 of 32 TCs (75%)

**Breakdown:**
- HP: 2/2 (100%)
- AP: 2/2 (100%)
- NEG: 4/6 (67%) — NEG-01, NEG-02 flagged PARTIAL due to Process Order dependency
- ERR: 9/9 (100%)
- EDGE: 8/8 (100%)
- INT: 3/5 (60%) — INT-04, INT-05 flagged PARTIAL due to cross-system dependencies

**Automation feasibility notes:**

- **Process Order dependency (NEG-01, NEG-02):** Requires "Manage Process Orders" Fiori app automation OR OData API call to create Process Order programmatically. Recommend API approach for scriptless execution (MCP cannot automate Process Order app in Phase 3 without separate app exploration).

- **Workflow dependency (INT-04):** Requires "My Inbox" or "Workflow Approvals" Fiori app automation OR Workflow API call. Recommend stubbing workflow approval in test system (auto-approve configuration) or manual approval step for scriptless execution.

- **Change Document dependency (INT-05):** Requires query to Change Document System (transaction code RSSCD100 or OData service for change documents). Recommend reading Change Document Number from Recipe detail screen (if displayed) or verifying presence of Change Document entry via API query.

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first, block pipeline if fail):
  TC-CS-001: HP-01 — Create new Master Recipe (draft → approval → released)
  TC-CS-002: HP-02 — Edit released recipe (verify versioning)
  TC-CS-009: NEG-01 — Process Order against draft recipe (verify block)
  TC-CS-010: NEG-02 — Process Order against obsolete recipe (verify block)
  TC-CS-011: NEG-03 — Release recipe without approval (verify block)

Priority 2 — HIGH (validate immediately after, abort execution if >20% fail):
  TC-CS-012: NEG-04 — Invalid Material Number
  TC-CS-013: NEG-05 — Invalid Work Center
  TC-CS-014: NEG-06 — Invalid Inspection Characteristic
  TC-CS-015: ERR-01 — Missing Material Number
  TC-CS-016: ERR-02 — Missing Plant
  TC-CS-017: ERR-03 — Missing Base Quantity
  TC-CS-018: ERR-04 — Missing Operation Number
  TC-CS-019: ERR-05 — Missing Work Center
  TC-CS-020: ERR-06 — Missing In-Process Checkpoint ID
  TC-CS-021: ERR-07 — Missing Target Value
  TC-CS-022: ERR-08 — Missing Lower Limit
  TC-CS-023: ERR-09 — Missing Upper Limit
  TC-CS-027: INT-04 — Workflow integration
  TC-CS-028: INT-05 — Change Document integration

Priority 3 — MEDIUM (complete coverage, acceptable partial pass rate):
  TC-CS-003: AP-01 — Multiple operations
  TC-CS-004: AP-02 — Multiple checkpoints per operation
  TC-CS-005: EDGE-01 — Base Quantity minimum
  TC-CS-006: EDGE-02 — Base Quantity maximum
  TC-CS-007: EDGE-03 — Standard Duration minimum
  TC-CS-008: EDGE-04 — Standard Duration maximum
  TC-CS-024: EDGE-05 — Target = Lower Limit
  TC-CS-025: EDGE-06 — Target = Upper Limit
  TC-CS-026: EDGE-07 — Lower > Target (invalid)
  TC-CS-030: EDGE-08 — Upper < Target (invalid)

Priority 4 — Integration (run after core stability confirmed):
  TC-CS-031: INT-01 — Material Master integration
  TC-CS-032: INT-02 — Work Center Master integration
  TC-CS-029: INT-03 — QM Inspection Characteristic integration
```

**Execution flow logic:**

1. **CRITICAL tests (Priority 1):** Must achieve 100% pass rate. If any CRITICAL test fails, stop execution and escalate to development team. Do not proceed to Priority 2+.

2. **HIGH tests (Priority 2):** Acceptable pass rate ≥ 80%. If pass rate < 80%, stop execution and escalate. These tests validate data integrity and integration foundations.

3. **MEDIUM tests (Priority 3):** Acceptable pass rate ≥ 70%. Boundary and alternative path tests are less critical for immediate pipeline blocking but must be resolved before production release.

4. **Integration tests (Priority 4):** Execute last. Acceptable pass rate ≥ 60%. Integration issues may require coordination with external module teams (MM, QM, Workflow) and can be resolved in parallel with Priority 3 test failures.

---

## Regulatory and Compliance Notes

**Pharmaceutical Manufacturing Context (GMP/GDP/21 CFR Part 11):**

- **Master Recipe = Master Production Record:** The Master Recipe is the pharmaceutical equivalent of a Master Production Record (MPR) as defined in FDA 21 CFR Part 211. All test cases must verify that:
  - Recipe cannot be released without documented approval (AC-2, NEG-03)
  - Recipe changes create new versions with full audit trail (AC-3, HP-02, INT-05)
  - Only Released recipes can be used for production (AC-4, NEG-01, NEG-02)
  - Audit trail includes requestor, approver, and effective date (AC-6, HP-01)

- **Electronic Records (21 CFR Part 11):** Recipe versioning and audit trail must comply with 21 CFR Part 11 requirements for electronic records and electronic signatures:
  - Test cases HP-02 and INT-05 verify that prior versions are preserved and immutable
  - Test case HP-01 verifies that approval workflow includes electronic signature equivalent (approver user ID + timestamp)
  - All audit log fields must be system-generated (not user-editable)

- **In-Process Controls (GMP Requirement):** AC-5 mandates capture of in-process control checkpoints, target values, and acceptable ranges. Test cases must verify:
  - All mandatory fields for in-process controls are enforced (ERR-06, ERR-07, ERR-08, ERR-09)
  - Target values fall within specified ranges (EDGE-05, EDGE-06)
  - Invalid ranges are rejected (EDGE-07, EDGE-08)
  - QM Inspection Characteristics are validated against master data (NEG-06, INT-03)

- **Test System Configuration:**
  - All test execution must use dedicated SAP S/4HANA Cloud test tenant (not production)
  - Test data must use fictional material numbers, work centers, and inspection characteristics (no real production master data)
  - Approval workflow must be configured with test user accounts (no real production approvers)
  - Test recipes must be marked as "Test" in description field or deleted after test execution

- **Data Privacy:** No real product formulations, process parameters, or proprietary manufacturing data should be used in test cases. All test data values are placeholder examples requiring replacement with non-sensitive equivalents.

---

## TestCase Agent Instructions

When consuming this strategy:

1. **Read `CS-57-risk-profile.json`** for the structured scenario inventory and data parameters.

2. **Generate test cases in this order:**
   - **Phase 1:** All MANDATORY scenarios (HP, NEG, ERR, EDGE) — 25 test cases
   - **Phase 2:** All RECOMMENDED scenarios (AP, INT) — 7 test cases
   - Total: 32 test cases

3. **Apply quality gates table** — verify all mandatory thresholds are met before completing:
   - AC Traceability: 100% (all 6 ACs covered)
   - HP Coverage: 2/2 generated
   - NEG Coverage: 6/6 generated
   - ERR Coverage: 9/9 generated
   - EDGE Coverage: 8/8 generated
   - Parameterization: 0 hardcoded values (all via {TD.*} or {ENV.*})
   - Automation Eligibility: ≥ 16 TCs flagged YES

4. **Use generation template:** `prompts/testcase-generation-from-userstory.md`

5. **Flag automation candidates** per the Automation Viability table:
   - HP, AP, ERR, EDGE: Automation Candidate = YES
   - NEG-01, NEG-02: Automation Candidate = PARTIAL (Process Order dependency)
   - NEG-03, NEG-04, NEG-05, NEG-06: Automation Candidate = YES
   - INT-01, INT-02, INT-03: Automation Candidate = YES
   - INT-04, INT-05: Automation Candidate = PARTIAL (Workflow/Change Doc dependency)

6. **Output structure:**
   - Test cases: `testcases/AI-generated testcases/CS-57/testcases/TC-CS-{NNN}.md`
   - Coverage matrix: `testcases/AI-generated testcases/CS-57/CS-57-coverage-matrix.md`
   - Summary: `testcases/AI-generated testcases/CS-57/CS-57-summary.json`
   - Test data: `testdata/CS-57/CS-57-testdata.json`
   - Test data guide: `testdata/CS-57/CS-57-testdata-guide.md`

7. **Test data parameterization rules:**
   - All Material Numbers: `{TD.materialNumber}`, `{TD.invalidMaterialNumber}`
   - All Plants: `{TD.plant}`
   - All Work Centers: `{TD.workCenter}`, `{TD.invalidWorkCenter}`
   - All Inspection Characteristics: `{TD.inProcessCheckpointId}`, `{TD.invalidCheckpointId}`
   - All numeric values (quantities, durations, target/limits): `{TD.baseQuantity}`, `{TD.standardDuration}`, `{TD.targetValue}`, etc.
   - All boundary values: `{TD.baseQuantityMin}`, `{TD.baseQuantityMax}`, `{TD.standardDurationMin}`, etc.
   - All SAP URLs: `{ENV.SAP_FIORI_URL}`
   - All credentials: `{ENV.SAP_USERNAME}`, `{ENV.SAP_PASSWORD}`

8. **Test case ID assignment:**
   - Start from TC-CS-001 (if no prior TCs exist for this story)
   - If prior TCs exist in CS project, check `jira/index.json` for highest TC ID and increment
   - Sequential numbering within story, no gaps

9. **Priority assignment** per Test Case Priority Assignment table (all TCs include Priority and Severity fields).

10. **Expected results must be specific:**
    - Include exact SAP status values: "Draft", "In Approval", "Released", "Obsolete"
    - Include specific error message patterns: "Material [value] does not exist" (not "error is displayed")
    - Include audit log field verification: "Created By = {ENV.SAP_USERNAME}", "Approved By = [approver user ID]", "Change Document Number is 10 digits"

11. **Process Order dependency handling (NEG-01, NEG-02):**
    - These test cases require navigation to "Manage Process Orders" app OR API call
    - Expected result: "Error message: 'Recipe [Recipe ID] version [Version] has status [Draft/Obsolete] and cannot be used for production' OR Process Order creation is disabled/blocked"
    - Flag as Automation Candidate = PARTIAL with note: "Requires Process Order app automation or OData API call"
