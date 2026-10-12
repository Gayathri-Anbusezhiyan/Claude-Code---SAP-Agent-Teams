# Test Strategy: [CS-13] As a Reviewer, I want to complete my assigned review task with the required verdict and review context so that the workflow advances to the final review stage

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-13/strategy/CS-13-analysis.md
**Risk Profile:**     jira/userstories/CS-13/strategy/CS-13-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Reviewer (role-based user in Veeva Vault QualityDocs)
- **Business Object:** Workflow Task (Reviewer Task)
- **SAP Module:** N/A — Veeva Vault QualityDocs (Pharmaceutical Quality Management System)
- **Business Goal:** Complete assigned review task by providing Verdict and Review Context to advance workflow from In Review to Review Completed state, triggering final review task assignment to SME

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 1 | 1 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 1 | 1 | MEDIUM |
| Negative (NEG) | MANDATORY | 3 | 3 | CRITICAL |
| Error / Missing Field (ERR) | MANDATORY | 3 | 3 | HIGH |
| Edge Case / Boundary (EDGE) | NOT APPLICABLE | 0 | 0 | N/A |
| Integration (INT) | MANDATORY | 2 | 2 | HIGH |
| **TOTAL** | — | **10** | **10** | — |

**Rationale for Coverage Model:**
- **CRITICAL overall risk** drives MANDATORY coverage for HP, NEG, ERR, and INT scenarios
- **NEG scenarios**: Role-based access control (RBAC) is security-critical in pharmaceutical quality workflows — unauthorized task completion invalidates audit trails and violates regulatory compliance (21 CFR Part 11)
- **ERR scenarios**: Mandatory field enforcement (Verdict, Review Context) ensures workflow data integrity — missing fields create incomplete audit records
- **INT scenarios**: Workflow integrity depends on task visibility (CS-12 → CS-13) and task assignment propagation (CS-13 → CS-14) — both are MANDATORY to verify
- **EDGE scenarios**: NOT APPLICABLE — no numeric, text length, or date boundary parameters identified in this story
- **AP scenarios**: RECOMMENDED to verify task list sorting behavior (most recent task at top) when multiple tasks are present

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**HP-01: Complete Reviewer Task (Happy Path)**
- **Description:** Reviewer authenticates, navigates to Home, selects task, completes with Verdict="Review Completed" and Review Context="Quality Review", submits → document transitions to Review Completed, SME receives final review task
- **Risk:** CRITICAL
- **ACs Covered:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7, AC-8, AC-9, AC-10, AC-11, AC-12, AC-13, AC-14, AC-15, AC-16, AC-17, AC-24
- **Priority:** CRITICAL
- **Automation Candidate:** YES

**NEG-01: Non-Reviewer Role Access Denial**
- **Description:** User with non-Reviewer role attempts to access reviewer's task → system denies access
- **Risk:** CRITICAL
- **ACs Covered:** AC-22, AC-23
- **Priority:** CRITICAL
- **Automation Candidate:** YES

**NEG-02: Different User Completion Prevention**
- **Description:** Assigned Reviewer is logged in, but a different user attempts to complete the same task → system prevents completion
- **Risk:** CRITICAL
- **ACs Covered:** AC-22, AC-23
- **Priority:** CRITICAL
- **Automation Candidate:** PARTIAL (requires multi-user session orchestration)

**NEG-03: Invalid Document State Transition Prevention**
- **Description:** Reviewer attempts to submit task when document is not in "In Review" state → system prevents state transition
- **Risk:** HIGH
- **ACs Covered:** AC-14
- **Priority:** HIGH
- **Automation Candidate:** PARTIAL (requires document state manipulation outside normal workflow)

**ERR-01: Missing Verdict Field Validation**
- **Description:** Missing Verdict field → system displays field-level error, blocks submission
- **Risk:** HIGH
- **ACs Covered:** AC-18, AC-20, AC-21, AC-24, AC-25
- **Priority:** HIGH
- **Automation Candidate:** YES

**ERR-02: Missing Review Context Field Validation**
- **Description:** Missing Review Context field → system displays field-level error, blocks submission
- **Risk:** HIGH
- **ACs Covered:** AC-19, AC-20, AC-21, AC-24, AC-25
- **Priority:** HIGH
- **Automation Candidate:** YES

**ERR-03: Multiple Missing Mandatory Fields Validation**
- **Description:** Both Verdict and Review Context missing → system displays multiple field-level errors, blocks submission
- **Risk:** HIGH
- **ACs Covered:** AC-18, AC-19, AC-20, AC-21, AC-24, AC-25
- **Priority:** HIGH
- **Automation Candidate:** YES

**INT-01: Task Visibility After CS-12 Workflow Initiation**
- **Description:** Verify task is visible in reviewer's Home view task list after CS-12 workflow initiation by SME
- **Risk:** HIGH
- **ACs Covered:** AC-5
- **Linked Issue:** CS-12 (inferred from preconditions)
- **Priority:** HIGH
- **Automation Candidate:** YES (requires CS-12 automation as prerequisite)

**INT-02: SME Task Assignment After CS-13 Completion**
- **Description:** Verify SME receives final review task in their Home view task list after reviewer completes CS-13 task
- **Risk:** HIGH
- **ACs Covered:** AC-15, AC-16
- **Linked Issue:** CS-14 (inferred from postconditions)
- **Priority:** HIGH
- **Automation Candidate:** YES (requires multi-user session orchestration)

### Recommended Scenarios

**AP-01: Multiple Tasks in Task List (Recent Task Selection)**
- **Description:** Reviewer authenticates, navigates to Home with multiple tasks in list, identifies and selects most recent task by position at top, completes task
- **Risk:** MEDIUM
- **ACs Covered:** AC-5, AC-6, AC-7
- **Priority:** MEDIUM
- **Automation Candidate:** YES (requires test data setup with multiple tasks)

### Optional Scenarios

None

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — all 25 ACs covered by ≥ 1 TC | YES |
| HP Coverage | 1 HP scenario generated covering all 18 happy-path ACs | YES |
| NEG Coverage | All 3 NEG scenarios generated | YES |
| ERR Coverage | All 3 ERR scenarios generated | YES |
| EDGE Coverage | N/A — 0 EDGE scenarios (no boundary parameters) | N/A |
| INT Coverage | All 2 INT scenarios generated | YES |
| Parameterization | 0 hardcoded values — all credentials, URLs, and dropdown values use {TD.*} or {ENV.*} placeholders | YES |
| Automation Eligibility | ≥ 7 TCs flagged as Automation Candidate: YES (70% of 10 TCs) | YES |
| Role-Based Access Control Validation | 100% — all RBAC scenarios (NEG-01, NEG-02, AC-22, AC-23) covered | YES (CRITICAL regulatory requirement) |
| Mandatory Field Validation | 100% — all mandatory fields (Verdict, Review Context) tested for ERR scenarios | YES (CRITICAL data integrity requirement) |

**Overall pass threshold:** All MANDATORY gates must PASS. At least 75% of recommended gates must PASS.

**CRITICAL risk story additional gates:**
- **Negative coverage (entity validation):** 100% — NEG-01 (non-Reviewer role), NEG-02 (different user) verified
- **Error coverage (mandatory fields):** 100% — ERR-01 (missing Verdict), ERR-02 (missing Review Context), ERR-03 (both missing) verified
- **State transition validation:** 100% — NEG-03 (invalid document state) verified
- **Integration dependency validation:** 100% — INT-01 (task visibility after CS-12), INT-02 (SME task assignment after CS-13) verified

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Core workflow progression blocker — reviewer task completion is the critical path for advancing documents from In Review to Review Completed state |
| NEG (RBAC - non-Reviewer role) | CRITICAL | CRITICAL | Security and compliance risk — pharmaceutical quality workflows require strict RBAC enforcement per 21 CFR Part 11; unauthorized access invalidates audit trails |
| NEG (RBAC - different user) | CRITICAL | CRITICAL | Same as above — task ownership must be enforced to prevent audit trail tampering |
| NEG (invalid document state) | HIGH | MAJOR | Workflow integrity risk — state transitions must be validated to prevent data corruption |
| ERR (missing mandatory field) | HIGH | MAJOR | Data integrity risk — incomplete workflow data creates invalid audit records and blocks downstream processing |
| AP (multiple tasks in list) | MEDIUM | MINOR | Usability risk — task sorting behavior affects reviewer efficiency but does not block core workflow |
| INT (task visibility after CS-12) | HIGH | MAJOR | Integration dependency risk — if task is not visible after CS-12, reviewer cannot complete workflow step |
| INT (SME task assignment after CS-13) | HIGH | MAJOR | Integration dependency risk — if SME task is not created after CS-13, workflow cannot advance to final review stage |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidate for Playwright — stable workflow, repeatable steps, machine-verifiable success criteria (document status, task assignment) |
| AP | YES | Data-driven via testdata JSON — requires setup step to create multiple test tasks |
| NEG (non-Reviewer role) | YES | Stable validation check — system should consistently deny access to non-Reviewer users |
| NEG (different user) | PARTIAL | Multi-user session orchestration needed — requires two simultaneous browser sessions (Reviewer + different user) |
| NEG (invalid document state) | PARTIAL | Requires document state manipulation outside normal workflow — may need API calls to force document into invalid state |
| ERR (missing Verdict) | YES | Field-level validation is stable — dropdown field can be left unselected in Playwright |
| ERR (missing Review Context) | YES | Field-level validation is stable — dropdown field can be left unselected in Playwright |
| ERR (both missing) | YES | Combination of ERR-01 and ERR-02 — stable validation check |
| INT (task visibility) | YES | Requires CS-12 automation as prerequisite — run CS-12 script to create task, then verify visibility in CS-13 context |
| INT (SME task assignment) | YES | Requires multi-user session orchestration — after CS-13 completes, log in as SME and verify task presence |

**Target automation coverage:** 7 of 10 TCs (70%) are full YES candidates. 3 TCs are PARTIAL (require multi-user orchestration or state manipulation).

**Automation strategy:**
- **Phase 1 (immediate):** Automate all 7 YES scenarios (HP-01, NEG-01, ERR-01, ERR-02, ERR-03, INT-01, AP-01)
- **Phase 2 (advanced):** Implement multi-user session orchestration for NEG-02 and INT-02
- **Phase 3 (complex):** Implement API-based document state manipulation for NEG-03 (if Veeva Vault API supports test data setup)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-{NNN}: HP-01 (Complete Reviewer Task - Happy Path)
  TC-CS-{NNN}: NEG-01 (Non-Reviewer Role Access Denial)
  TC-CS-{NNN}: NEG-02 (Different User Completion Prevention)

Priority 2 — HIGH (validate immediately after):
  TC-CS-{NNN}: NEG-03 (Invalid Document State Transition Prevention)
  TC-CS-{NNN}: ERR-01 (Missing Verdict Field Validation)
  TC-CS-{NNN}: ERR-02 (Missing Review Context Field Validation)
  TC-CS-{NNN}: ERR-03 (Multiple Missing Mandatory Fields Validation)
  TC-CS-{NNN}: INT-01 (Task Visibility After CS-12 Workflow Initiation)
  TC-CS-{NNN}: INT-02 (SME Task Assignment After CS-13 Completion)

Priority 3 — MEDIUM (complete coverage):
  TC-CS-{NNN}: AP-01 (Multiple Tasks in Task List - Recent Task Selection)
```

**Execution dependencies:**
- **INT-01** must run AFTER CS-12 automation completes successfully (prerequisite: CS-12 workflow initiation script)
- **INT-02** must run AFTER HP-01 completes successfully (prerequisite: reviewer task completion)
- **NEG-02** requires HP-01 to have created a valid task assignment before attempting different-user access
- **AP-01** requires test data setup step to create multiple tasks in the reviewer's task list

---

## Regulatory and Compliance Notes

**Pharmaceutical Quality Management System (Veeva Vault QualityDocs):**
- This workflow is subject to **21 CFR Part 11** (FDA Electronic Records and Electronic Signatures regulations)
- All test cases involving role-based access control (NEG-01, NEG-02, AC-22, AC-23) are **CRITICAL compliance requirements** — RBAC failures invalidate audit trails and violate regulatory requirements
- Mandatory field validation (ERR-01, ERR-02, ERR-03) ensures **audit trail completeness** — incomplete workflow data creates compliance gaps
- Document state transitions (AC-14, NEG-03) must maintain **workflow integrity** — out-of-sequence state changes violate business rule enforcement
- All test execution must use **dedicated test system instances** (not production) to avoid contaminating validated workflows
- Test data must use **synthetic user accounts** (not real employee credentials) — use {ENV.REVIEWER_USERNAME} and {ENV.REVIEWER_PASSWORD} placeholders
- Task assignment records must be **reversible** after test execution (or use isolated test environment that is reset between runs)

**Audit Trail Validation:**
- Test cases should verify that task completion actions are recorded in the Veeva Vault audit log (if accessible via UI or API)
- Verify that RBAC denial events (NEG-01, NEG-02) are logged for security monitoring

**Standard Veeva Vault Test Governance:**
- All test accounts must have appropriate role assignments pre-configured
- Workflow configuration must be stable (dropdown values for Verdict and Review Context must be present)
- Integration dependencies (CS-12, CS-14) must be resolved or mocked before test execution

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-13-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first:
   - 1 HP test case (HP-01)
   - 3 NEG test cases (NEG-01, NEG-02, NEG-03)
   - 3 ERR test cases (ERR-01, ERR-02, ERR-03)
   - 2 INT test cases (INT-01, INT-02)
3. Generate RECOMMENDED type (AP-01) unless time/scope constraints apply
4. Apply quality gates table — verify all thresholds are met before completing:
   - 100% AC traceability (all 25 ACs covered)
   - 0 hardcoded values (all credentials, URLs, dropdown values parameterized)
   - ≥ 7 TCs flagged as Automation Candidate: YES
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above:
   - YES: HP-01, NEG-01, ERR-01, ERR-02, ERR-03, INT-01, AP-01
   - PARTIAL: NEG-02, NEG-03, INT-02 (document complexity in TC Notes)
7. Output files to:
   - `testcases/AI-generated testcases/CS-13/testcases/` — individual TC markdown files
   - `testcases/AI-generated testcases/CS-13/CS-13-coverage-matrix.md` — AC-to-TC traceability
   - `testcases/AI-generated testcases/CS-13/CS-13-summary.json` — machine-readable TC registry
   - `testdata/CS-13/CS-13-testdata.json` — parameterized test datasets
   - `testdata/CS-13/CS-13-testdata-guide.md` — guide for filling in real Veeva Vault values
8. **CRITICAL for this story:** Ensure ERR and NEG test cases explicitly document expected error messages and system behaviors (e.g., "System displays error: 'You do not have permission to complete this task'" for NEG-01)
9. **Integration dependency handling:** Document in each INT test case that CS-12 or CS-14 automation must be available as a prerequisite
