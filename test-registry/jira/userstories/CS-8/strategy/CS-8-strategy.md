# Test Strategy: [CS-8] As a Quality Doc SME, I want to initiate the Send for Review And Verification workflow on a Draft document so that a designated reviewer is formally assigned to evaluate the document

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-8/strategy/CS-8-analysis.md
**Risk Profile:**     jira/userstories/CS-8/strategy/CS-8-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Quality Doc SME
- **Business Object:** Quality Document (Veeva Vault QualityDocs)
- **SAP Module:** QualityDocs — Document Management and Workflow (Veeva Vault QualityDocs)
- **Business Goal:** Formally assign a designated reviewer to evaluate the document, transitioning it from Draft to In Review and creating a workflow task

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 1 | 1 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 1 | 1 | LOW |
| Negative (NEG) | MANDATORY | 4 | 4 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 1 | 1 | HIGH |
| Edge Case / Boundary (EDGE) | NOT APPLICABLE | 0 | 0 | N/A |
| Integration (INT) | MANDATORY | 2 | 2 | CRITICAL |
| **TOTAL** | — | **9** | **9** | — |

**Rationale for Coverage Model:**
- **CRITICAL risk** story requires full coverage across all applicable scenario types
- **HP**: 1 comprehensive end-to-end workflow test covering core ACs (AC-1 through AC-9)
- **AP**: 1 alternative navigation path (module URL direct entry) — recommended to verify navigation flexibility
- **NEG**: 4 distinct negative scenarios are mandatory to validate:
  - Invalid login credentials (authentication failure)
  - Non-existent document search (data validation)
  - Non-Draft document state (lifecycle state enforcement)
  - Wrong role access (RBAC enforcement)
- **ERR**: 1 mandatory field validation (missing reviewer selection)
- **EDGE**: Not applicable — no numeric or boundary parameters in this workflow story
- **INT**: 2 integration scenarios are mandatory due to CRITICAL risk and workflow task creation dependency:
  - Reviewer task assignment verification
  - Document state persistence across system views

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**HP-01** (Happy Path): Complete workflow initiation — SME logs in, searches for Draft document, opens it, initiates "Send for Review And Verification", selects reviewer, submits successfully, document transitions to In Review, reviewer receives task
- **Risk:** CRITICAL
- **ACs Covered:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7, AC-8, AC-9
- **Priority:** CRITICAL

**NEG-01** (Negative): Invalid login credentials — SME attempts login with incorrect username or password
- **Risk:** HIGH
- **ACs Covered:** AC-1
- **Priority:** HIGH

**NEG-02** (Negative): Non-existent document search — SME searches for a document name that does not exist in the library
- **Risk:** HIGH
- **ACs Covered:** AC-3
- **Priority:** HIGH

**NEG-03** (Negative): Non-Draft document state — SME opens a document that is not in Draft state (e.g., In Review, Approved) and "Send for Review And Verification" action is not available
- **Risk:** HIGH
- **ACs Covered:** AC-5, AC-11, AC-14
- **Priority:** HIGH

**NEG-04** (Negative): Wrong role access — User with Reviewer role attempts to initiate "Send for Review And Verification" workflow and is denied access to the action
- **Risk:** HIGH
- **ACs Covered:** AC-13, AC-15
- **Priority:** HIGH

**ERR-01** (Error): Missing reviewer selection — SME clicks "Send for Review And Verification", does not select a reviewer, and attempts to submit; system prevents submission
- **Risk:** HIGH
- **ACs Covered:** AC-7, AC-12, AC-16
- **Field:** Reviewer
- **Priority:** HIGH

**INT-01** (Integration): Reviewer task assignment verification — After SME submits workflow, verify that Test_user01 has the workflow task in their task inbox with correct document reference
- **Risk:** CRITICAL
- **ACs Covered:** AC-9
- **Priority:** CRITICAL

**INT-02** (Integration): Document state persistence — After workflow submission, verify document state is "In Review" across all library views and document detail pages
- **Risk:** CRITICAL
- **ACs Covered:** AC-8
- **Priority:** CRITICAL

### Recommended Scenarios

**AP-01** (Alternative Path): Alternative navigation path — SME navigates via module URL directly to Full Library and executes workflow
- **Risk:** LOW
- **ACs Covered:** AC-10
- **Priority:** LOW

### Optional Scenarios

None

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | 1 HP scenario generated | YES |
| NEG Coverage | All 4 NEG scenarios generated | YES |
| ERR Coverage | 1 ERR scenario generated | YES |
| EDGE Coverage | 0 EDGE TCs (not applicable) | N/A |
| INT Coverage | All 2 INT scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 5 TCs flagged as Automation Candidate: YES | YES |

**Additional CRITICAL Risk Gates:**
| Additional Gate | Threshold | Mandatory |
|----------------|-----------|-----------|
| Negative coverage (entity validation) | 100% — 4 NEG scenarios covering all validation types (auth, search, state, role) | YES |
| Error coverage (mandatory fields) | 100% — 1 ERR scenario covering the mandatory reviewer field | YES |
| Integration coverage | 100% — 2 INT scenarios covering workflow task creation and state persistence | YES |

**Overall pass threshold:** All mandatory gates must PASS. All recommended gates must PASS (AP coverage).

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core workflow) | CRITICAL | CRITICAL | End-to-end workflow initiation is the core business transaction; document state transition from Draft to In Review is legally binding and triggers downstream workflow tasks |
| NEG (invalid login) | HIGH | MAJOR | Authentication failure blocks all system access; must validate proper error handling |
| NEG (non-existent document) | HIGH | MAJOR | Document search validation ensures data integrity; failure to handle non-existent documents gracefully impacts user experience |
| NEG (non-Draft state) | HIGH | MAJOR | Lifecycle state enforcement is a critical business rule; allowing workflow initiation on non-Draft documents would violate document control standards |
| NEG (wrong role) | HIGH | MAJOR | RBAC enforcement prevents unauthorized users from initiating workflows; security and compliance requirement |
| ERR (missing reviewer) | HIGH | MAJOR | Mandatory field enforcement ensures workflow cannot be initiated in an invalid state; data integrity requirement |
| AP (alternative navigation) | LOW | MINOR | Alternative navigation path is a convenience feature; does not impact core workflow functionality |
| INT (reviewer task) | CRITICAL | CRITICAL | Workflow task creation is the primary integration point; failure means reviewer cannot perform their role and workflow is broken |
| INT (state persistence) | CRITICAL | CRITICAL | Document state transition must be atomic and visible across all system views; failure indicates data consistency issue |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidate for Playwright; stable workflow with machine-verifiable state transitions |
| AP | YES | Alternative navigation is stable and repeatable |
| NEG | YES | All negative scenarios have stable validation checks with predictable error messages |
| ERR | YES | Field-level validation is stable and repeatable |
| EDGE | N/A | Not applicable to this story |
| INT | PARTIAL | Reviewer task verification requires multi-session orchestration (SME + Reviewer accounts); state persistence verification is fully automatable |

**Target automation coverage:** 8 of 9 TCs (89%)
- Full automation: HP-01, AP-01, NEG-01, NEG-02, NEG-03, NEG-04, ERR-01, INT-02
- Partial automation: INT-01 (requires Reviewer account login to verify task inbox; may require manual verification or additional test fixture setup)

**Automation Strategy:**
- All HP, AP, NEG, ERR scenarios are fully automatable via Playwright MCP
- INT-02 (state persistence) is fully automatable by verifying document state in multiple views within the same SME session
- INT-01 (reviewer task) requires additional setup: either automate reviewer login as a separate test step, or use API verification to check task assignment in Vault workflow engine

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-XXX (HP-01): Complete workflow initiation
  TC-CS-XXX (INT-01): Reviewer task assignment verification
  TC-CS-XXX (INT-02): Document state persistence

Priority 2 — HIGH (validate immediately after):
  TC-CS-XXX (NEG-01): Invalid login credentials
  TC-CS-XXX (NEG-02): Non-existent document search
  TC-CS-XXX (NEG-03): Non-Draft document state
  TC-CS-XXX (NEG-04): Wrong role access
  TC-CS-XXX (ERR-01): Missing reviewer selection

Priority 3 — MEDIUM (complete coverage):
  (None)

Priority 4 — LOW (run after core stability confirmed):
  TC-CS-XXX (AP-01): Alternative navigation path
```

**Execution Notes:**
- HP-01 must pass before executing INT-01 and INT-02 (dependencies on successful workflow completion)
- NEG and ERR scenarios are independent and can be executed in parallel
- AP-01 has lowest priority as it is a convenience feature and does not impact core functionality

---

## Regulatory and Compliance Notes

**Document Management and Workflow Compliance:**
- Quality documents in Veeva Vault QualityDocs are typically subject to regulatory oversight (FDA 21 CFR Part 11, ISO 13485, GxP)
- Workflow state transitions (Draft → In Review) create an audit trail that must be immutable and traceable
- Test cases must verify that:
  - Only authorized roles can initiate workflows (RBAC enforcement)
  - Workflow task assignments are logged and traceable
  - Document state transitions are atomic and auditable
- All test execution must use dedicated test Vault instance (not production or validation environment)
- Test data must not use real production document names or user accounts beyond designated test accounts (QualDocSme.01, Test_user01)

**Segregation of Duties (SOD):**
- The workflow enforces SOD by requiring a separate Reviewer role to approve documents
- Test cases must verify that the SME role cannot both initiate and approve the same document
- NEG-04 (wrong role access) is a critical compliance test case

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-8-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first:
   - 1 HP test case (HP-01)
   - 4 NEG test cases (NEG-01, NEG-02, NEG-03, NEG-04)
   - 1 ERR test case (ERR-01)
   - 2 INT test cases (INT-01, INT-02)
3. Generate RECOMMENDED types:
   - 1 AP test case (AP-01)
4. Apply quality gates table — verify all thresholds are met before completing:
   - All 16 ACs must be covered by at least one test case
   - All MANDATORY scenario types must have the specified TC counts
   - All test data must use `{TD.*}` or `{ENV.*}` placeholders (no hardcoded values)
   - At least 5 test cases must be flagged as "Automation Candidate: YES"
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above:
   - HP-01: YES
   - AP-01: YES
   - NEG-01, NEG-02, NEG-03, NEG-04: YES
   - ERR-01: YES
   - INT-01: PARTIAL (requires multi-session setup)
   - INT-02: YES
7. Output files to `testcases/AI-generated testcases/CS-8/` and `testdata/CS-8/`
