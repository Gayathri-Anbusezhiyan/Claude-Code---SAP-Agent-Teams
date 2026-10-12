# Test Strategy: [CS-9] As a Reviewer, I want to complete my assigned review task with the appropriate verdict and review context so that the document review is formally recorded and the workflow progresses

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-9/strategy/CS-9-analysis.md
**Risk Profile:**     jira/userstories/CS-9/strategy/CS-9-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Reviewer (Test_user01 account)
- **Business Object:** Workflow Task (Review Verdict & Review Context)
- **SAP Module:** N/A — Veeva Vault QualityDocs (non-SAP system)
- **Business Goal:** Formally record document review and advance workflow to next stage (transition document from "In Review" to "Review Completed" and create Quality Doc SME final review task)

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 1 | 1 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 1 | 1 | MEDIUM |
| Negative (NEG) | MANDATORY | 2 | 2 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 2 | 2 | HIGH |
| Edge Case / Boundary (EDGE) | NOT APPLICABLE | 0 | 0 | N/A |
| Integration (INT) | RECOMMENDED | 1 | 1 | HIGH |
| **TOTAL** | — | **7** | **7** | — |

**Rationale for Coverage Model:**
- **CRITICAL risk** story: All validation scenarios (NEG, ERR) are MANDATORY
- **HP**: Core workflow task completion — single comprehensive path covering full login → navigate → select → submit → verify sequence
- **AP**: Recommended for task identification when multiple tasks exist (AC-10 explicitly defines this as alternative path)
- **NEG**: MANDATORY — 2 scenarios covering unauthorized access (AC-13) and role-based action restrictions (AC-16)
- **ERR**: MANDATORY — 2 scenarios for 2 mandatory fields (Verdict: AC-11, Review Context: AC-12)
- **EDGE**: NOT APPLICABLE — no numeric or boundary parameters in this workflow story
- **INT**: RECOMMENDED — workflow chain validation with CS-8 (high business value but depends on CS-8 completion)

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**HP-01** — Reviewer logs in, navigates to Home, opens assigned task, selects Verdict="Review Completed" and Review Context="Quality Review", submits task, verifies task complete and document state="Review Completed" and SME receives final task
- **Risk:** CRITICAL
- **ACs Covered:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7, AC-8, AC-9, AC-14, AC-15
- **TC Count:** 1

**NEG-01** — Non-assigned user (e.g., Quality Doc SME) attempts to complete the Reviewer's task — expected result: access denied or submit disabled
- **Risk:** HIGH
- **ACs Covered:** AC-13, AC-16
- **TC Count:** 1

**NEG-02** — Reviewer with Reviewer role attempts to initiate or finalize workflow (actions outside role scope) — expected result: unauthorized action prevented
- **Risk:** HIGH
- **ACs Covered:** AC-16
- **TC Count:** 1

**ERR-01** — Missing Verdict field — Reviewer attempts to submit task without selecting a Verdict — expected result: validation error "Verdict is required"
- **Risk:** HIGH
- **ACs Covered:** AC-11
- **Field:** Verdict
- **TC Count:** 1

**ERR-02** — Missing Review Context field — Reviewer attempts to submit task without selecting a Review Context — expected result: validation error "Review Context is required"
- **Risk:** HIGH
- **ACs Covered:** AC-12
- **Field:** Review Context
- **TC Count:** 1

### Recommended Scenarios

**AP-01** — Reviewer has multiple tasks in Home view and identifies the most recent one assigned by CS-8 workflow
- **Risk:** MEDIUM
- **ACs Covered:** AC-10
- **TC Count:** 1

**INT-01** — Verify end-to-end workflow from CS-8 completion (SME initiates) to CS-9 completion (Reviewer completes) — validate task assignment chain and state transitions
- **Risk:** HIGH
- **ACs Covered:** AC-3, AC-8, AC-9
- **Dependency:** CS-8 must complete successfully
- **TC Count:** 1

### Optional Scenarios

None

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — all 16 ACs covered by ≥ 1 TC | YES |
| HP Coverage | 1 HP TC generated (HP-01) | YES |
| NEG Coverage | 2 NEG TCs generated (NEG-01, NEG-02) | YES |
| ERR Coverage | 2 ERR TCs generated (ERR-01, ERR-02) | YES |
| EDGE Coverage | 0 EDGE TCs (NOT APPLICABLE — no boundary parameters) | N/A |
| Parameterization | 0 hardcoded credentials or workflow-specific values | YES |
| Automation Eligibility | ≥ 3 TCs flagged as Automation Candidate: YES (HP, 2 ERR scenarios) | YES |

**Overall pass threshold:** All mandatory gates must PASS. Both recommended scenarios (AP-01, INT-01) should be generated unless time/scope constraints apply.

**Critical Quality Requirements:**
- All test cases MUST verify multi-user session isolation (Reviewer session distinct from SME session)
- All test cases MUST use `.env` credentials (`APP_USERNAME_REVIEWER`, `APP_PASSWORD_REVIEWER`, `APP_USERNAME_SME`, `APP_PASSWORD_SME`)
- All test cases MUST verify exact state transitions: "In Review" → "Review Completed"
- All test cases MUST verify exact dropdown selections: Verdict="Review Completed", Review Context="Quality Review"
- INT-01 MUST verify CS-8 → CS-9 workflow chain (SME initiates → Reviewer completes → SME receives final task)

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Core workflow task completion — must work for workflow to progress; covers 11 of 16 ACs including all SUCCESS_CONFIRMATION ACs |
| NEG (unauthorized access) | HIGH | MAJOR | Security and compliance risk — prevents unauthorized task completion and role boundary violations |
| ERR (missing mandatory field) | HIGH | MAJOR | Data integrity — prevents incomplete task submission; 2 mandatory fields identified |
| AP (task identification) | MEDIUM | MINOR | Usability concern — Reviewer must identify correct task when multiple exist, but does not block core flow |
| INT (workflow chain) | HIGH | MAJOR | End-to-end workflow integrity — validates CS-8 → CS-9 orchestration, but depends on CS-8 completion |

**Execution Priority Order:**
1. **CRITICAL:** HP-01 (core workflow task completion)
2. **HIGH:** ERR-01, ERR-02 (mandatory field validation), NEG-01, NEG-02 (authorization checks), INT-01 (workflow chain)
3. **MEDIUM:** AP-01 (task identification with multiple tasks)

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidate for Playwright — stable workflow path, machine-verifiable outcomes (task status, document state, SME task assignment) |
| AP | PARTIAL | Requires test data setup to create multiple workflow tasks; task identification is automatable but setup is manual |
| NEG | YES | Stable authorization checks — attempt unauthorized access and verify error/disabled state |
| ERR | YES | Field-level validation is stable and repeatable — clear validation messages expected |
| EDGE | N/A | Not applicable — no boundary parameters |
| INT | PARTIAL | Multi-session orchestration (CS-8 → CS-9) requires careful session management and inter-test dependencies; high value but complex automation |

**Target automation coverage:** 5 of 7 TCs (71%) — HP, 2 NEG, 2 ERR scenarios

**Automation Considerations:**
- **Multi-user session handling:** HP-01 and INT-01 require Reviewer and SME sessions to be isolated — use separate browser contexts or cookies
- **Workflow state dependencies:** INT-01 depends on CS-8 completion — requires orchestration or pre-condition setup
- **Role-based access control:** NEG scenarios require login with different user roles to verify authorization boundaries
- **Dropdown field automation:** Verdict and Review Context fields must be located and selected via Playwright selectors (likely `<select>` or custom dropdown components)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-XXX: HP-01 — Reviewer completes task with correct verdict and review context (full workflow completion)

Priority 2 — HIGH (validate immediately after):
  TC-CS-XXX: ERR-01 — Missing Verdict field validation
  TC-CS-XXX: ERR-02 — Missing Review Context field validation
  TC-CS-XXX: NEG-01 — Unauthorized user cannot complete Reviewer's task
  TC-CS-XXX: NEG-02 — Reviewer cannot perform actions outside role scope
  TC-CS-XXX: INT-01 — End-to-end workflow chain validation (CS-8 → CS-9)

Priority 3 — MEDIUM (complete coverage):
  TC-CS-XXX: AP-01 — Reviewer identifies most recent task when multiple tasks exist
```

**Execution Dependencies:**
- INT-01 requires CS-8 to have been executed successfully (or pre-condition setup to create a workflow task for the Reviewer)
- All other test cases are independent and can run in parallel

---

## Regulatory and Compliance Notes

**Workflow and Document Control Requirements:**
- This is a Veeva Vault QualityDocs workflow — subject to regulatory compliance for pharmaceutical/life sciences document management (21 CFR Part 11, GxP)
- All workflow state transitions must be auditable and traceable
- Role-based access control (RBAC) is mandatory — test cases MUST verify that only authorized users can complete tasks
- Audit trail requirements: task completion, verdict selection, and review context selection must be logged with timestamp and user identity
- Electronic signatures may apply — verify that task submission constitutes a legally binding review action

**Test Environment Governance:**
- Use dedicated test user accounts (`Test_user01` for Reviewer, appropriate SME test account)
- Do NOT use production credentials or production documents in test execution
- All test execution must occur in a validated test environment (not production Veeva Vault instance)
- Test data cleanup: workflow tasks created during testing should be archived or deleted after test completion

**Compliance Test Coverage:**
- NEG-01 and NEG-02 directly test RBAC enforcement (compliance requirement)
- HP-01 verifies that workflow advancement occurs only after proper review completion (audit trail requirement)
- ERR-01 and ERR-02 verify data integrity controls (mandatory fields cannot be bypassed)

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-9-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first: HP, NEG, ERR (5 TCs)
3. Generate RECOMMENDED types: AP, INT (2 TCs)
4. Apply quality gates table — verify all thresholds are met before completing:
   - All 16 ACs must be traced to ≥ 1 TC
   - Parameterization: use `{ENV.APP_USERNAME_REVIEWER}`, `{ENV.APP_PASSWORD_REVIEWER}`, `{TD.verdict}`, `{TD.reviewContext}`, NOT hardcoded values
   - Automation flag: HP, NEG, ERR scenarios = YES; AP, INT = PARTIAL
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above
7. Output files to `testcases/AI-generated testcases/CS-9/` and `testdata/CS-9/`

**Special Instructions for CS-9:**
- **Test data must include:** Reviewer credentials, SME credentials, expected verdict value, expected review context value
- **Expected results must verify:** task completion status, document state transition ("In Review" → "Review Completed"), SME task assignment
- **Session isolation:** HP-01 and INT-01 must explicitly state that Reviewer and SME use separate sessions
- **Workflow dependency:** INT-01 must reference CS-8 completion as a precondition
- **Error messages:** ERR-01 and ERR-02 must specify exact expected validation messages (if known from system documentation)
