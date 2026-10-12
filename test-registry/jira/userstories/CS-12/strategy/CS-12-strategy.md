# Test Strategy: [CS-12] As a Quality Doc SME, I want to initiate the Send for Review and Verification workflow on a Draft document and assign a reviewer so that the document enters formal review

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-12/strategy/CS-12-analysis.md
**Risk Profile:**     jira/userstories/CS-12/strategy/CS-12-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Quality Doc SME (Subject Matter Expert)
- **Business Object:** Quality Document (Veeva Vault)
- **SAP Module:** N/A — **VEEVA VAULT QUALITYDOCS** (not SAP S/4HANA)
- **Business Goal:** Initiate formal review workflow on Draft document with assigned reviewer, transitioning document to "In Review" state

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 1 | 1 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 1 | 1 | LOW |
| Negative (NEG) | MANDATORY | 5 | 5 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 1 | 1 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 4 | 4 | MEDIUM |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | N/A |
| **TOTAL** | — | **12** | **12** | — |

**Coverage Model Rationale:**
- **CRITICAL risk** story requires MANDATORY coverage for HP, NEG, ERR, and EDGE scenarios per risk matrix
- **EDGE scenarios** set to 4 (all boundary conditions from risk profile) to match CRITICAL risk requirement for comprehensive boundary testing
- **AP scenario** marked RECOMMENDED (direct URL navigation is a minor convenience variant, not core workflow)
- **INT scenario** marked NOT APPLICABLE — no cross-story linked issues exist; intra-system integration (workflow engine → task list, state transitions) is verified within HP-01 and NEG scenarios rather than separate INT test cases

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**HP-01** — Authenticate as Quality Doc SME, navigate to Full Library, search for "Test1 for Workflow", open document, verify Draft state, initiate "Send for Review And Verification" workflow, assign reviewer (Test_user01@partnersi-capgemini.com), submit, verify document status = "In Review", verify workflow task created
- **Risk:** CRITICAL
- **ACs Covered:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7, AC-8, AC-9, AC-10, AC-11, AC-12, AC-13, AC-14, AC-22
- **Priority:** CRITICAL

**NEG-01** — Attempt workflow initiation on document NOT in Draft state (e.g., In Review, Approved) → verify "Send for Review And Verification" action is disabled/hidden
- **Risk:** HIGH
- **ACs Covered:** AC-15, AC-20, AC-22
- **Priority:** HIGH

**NEG-02** — Attempt workflow initiation by user without Quality Doc SME role → verify action unavailable or authorization error
- **Risk:** HIGH
- **ACs Covered:** AC-17, AC-19
- **Priority:** HIGH

**NEG-03** — Attempt authentication with invalid credentials → verify access denied
- **Risk:** HIGH
- **ACs Covered:** AC-18
- **Priority:** HIGH

**NEG-04** — Assign non-existent or invalid reviewer account → verify validation error before workflow submission
- **Risk:** HIGH
- **ACs Covered:** AC-21, AC-24
- **Priority:** HIGH

**NEG-05** — Search for non-existent document → verify "No results found" message
- **Risk:** MEDIUM
- **ACs Covered:** AC-5
- **Priority:** MEDIUM

**ERR-01** — Submit workflow initiation dialog with no reviewer selected (blank reviewer field) → verify error message "Reviewer is required" or submission prevented
- **Risk:** HIGH
- **ACs Covered:** AC-16, AC-23
- **Field:** Reviewer (mandatory)
- **Priority:** HIGH

**EDGE-01** — Document name boundary — minimum length search (1 character)
- **Risk:** LOW
- **ACs Covered:** AC-5
- **Parameter:** documentName
- **Boundary:** lower
- **Priority:** MEDIUM

**EDGE-02** — Document name boundary — maximum length search (255 characters or system max)
- **Risk:** LOW
- **ACs Covered:** AC-5
- **Parameter:** documentName
- **Boundary:** upper
- **Priority:** MEDIUM

**EDGE-03** — Reviewer email boundary — minimum valid email format (e.g., a@b.co)
- **Risk:** LOW
- **ACs Covered:** AC-10
- **Parameter:** reviewerEmail
- **Boundary:** lower
- **Priority:** MEDIUM

**EDGE-04** — Reviewer email boundary — maximum length email (255 characters or system max)
- **Risk:** LOW
- **ACs Covered:** AC-10
- **Parameter:** reviewerEmail
- **Boundary:** upper
- **Priority:** MEDIUM

---

### Recommended Scenarios

**AP-01** — Direct URL navigation to Full Library — SME authenticates using direct Full Library URL with tab parameters (bypassing landing page navigation) → continues with document search and workflow initiation
- **Risk:** LOW
- **ACs Covered:** AC-1, AC-2 (description mentions this alternative)
- **Priority:** LOW

---

### Optional Scenarios

None

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 1 HP scenarios generated | YES |
| NEG Coverage | All 5 NEG scenarios generated | YES |
| ERR Coverage | All 1 ERR scenarios generated | YES |
| EDGE Coverage | All 4 EDGE TCs generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 6 TCs flagged as Automation Candidate: YES (50% threshold) | YES |

**Overall pass threshold:** All mandatory gates must PASS.

**Additional CRITICAL risk gates:**
- Negative coverage (entity validation): 100% — 5 NEG scenarios covering all validation points (state, role, authentication, reviewer validity, search)
- Error coverage (mandatory fields): 100% — 1 ERR scenario covering the single mandatory field (reviewer assignment)

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core workflow) | CRITICAL | CRITICAL | Document lifecycle state transition is core compliance operation — failure blocks entire review process |
| NEG (invalid state) | HIGH | MAJOR | Workflow on wrong document state violates business rules and causes data integrity issues |
| NEG (role validation) | HIGH | MAJOR | Authorization bypass violates audit and compliance requirements |
| NEG (invalid credentials) | HIGH | MAJOR | Authentication failure blocks all system access |
| NEG (invalid reviewer) | HIGH | MAJOR | Invalid reviewer causes workflow failure or orphaned task |
| NEG (search failure) | MEDIUM | MINOR | Search failure delays workflow but does not block if document can be accessed via other means |
| ERR (missing reviewer) | HIGH | MAJOR | Mandatory field validation failure prevents workflow completion |
| EDGE (boundary) | MEDIUM | MINOR | Edge cases ensure system handles input limits without crashing but not core path |
| AP (alternative) | LOW | MINOR | Alternative path is convenience feature, not critical business flow |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidate for Playwright — stable workflow sequence with machine-verifiable outcomes |
| AP | YES | Data-driven via testdata JSON |
| NEG | YES | Stable validation checks |
| ERR | YES | Field-level validation stable |
| EDGE | PARTIAL | Boundary values are testable but may require test data setup to create documents with extreme name lengths |
| INT | N/A | No cross-story integration scenarios |

**Target automation coverage:** 10 of 12 TCs (83%)

**Automation notes:**
- HP-01 verifies intra-system integration (workflow task creation → reviewer task list) — this is fully automatable via multi-user session handling
- NEG-02 (unauthorized role) and NEG-03 (unauthenticated access) require test accounts with different permission levels — mark as YES if test accounts available, PARTIAL if manual account switching required
- EDGE-01 through EDGE-04 may require test data preparation (documents with boundary-length names, reviewer accounts with boundary-length emails) — mark as PARTIAL

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-{ID}-HP-01 — Complete workflow initiation (authenticate → search → open → initiate → assign → verify state transition → verify task creation)

Priority 2 — HIGH (validate immediately after):
  TC-CS-{ID}-NEG-01 — Workflow unavailable on non-Draft document
  TC-CS-{ID}-NEG-02 — Unauthorized role access blocked
  TC-CS-{ID}-NEG-03 — Unauthenticated access blocked
  TC-CS-{ID}-NEG-04 — Invalid reviewer assignment rejected
  TC-CS-{ID}-ERR-01 — Missing reviewer assignment rejected

Priority 3 — MEDIUM (complete coverage):
  TC-CS-{ID}-NEG-05 — Document search no results
  TC-CS-{ID}-EDGE-01 — Document name minimum length
  TC-CS-{ID}-EDGE-02 — Document name maximum length
  TC-CS-{ID}-EDGE-03 — Reviewer email minimum length
  TC-CS-{ID}-EDGE-04 — Reviewer email maximum length

Priority 4 — LOW (alternative paths):
  TC-CS-{ID}-AP-01 — Direct URL navigation
```

---

## Regulatory and Compliance Notes

**Veeva Vault QualityDocs is a regulated quality management system:**
- Quality documents are subject to FDA 21 CFR Part 11 and EU GMP Annex 11 compliance requirements
- Workflow state transitions must be auditable — test cases must verify audit trail creation (not explicitly in ACs but implied by regulatory context)
- Role-based access control is mandatory for compliance — NEG-02, NEG-03, and NEG-04 are compliance-critical test cases
- Test execution must use validated test system instance, not production
- Test data must use fictitious document names and reviewer accounts that cannot be confused with production quality documents
- All test accounts must have documented authorization matrices matching intended test scenarios

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-12-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first:
   - HP (1 TC)
   - NEG (5 TCs)
   - ERR (1 TC)
   - EDGE (4 TCs)
3. Generate RECOMMENDED types:
   - AP (1 TC)
4. Apply quality gates table — verify all thresholds are met before completing:
   - AC Traceability: all 24 ACs covered
   - HP Coverage: 1 HP TC generated
   - NEG Coverage: 5 NEG TCs generated
   - ERR Coverage: 1 ERR TC generated
   - EDGE Coverage: 4 EDGE TCs generated
   - Parameterization: 0 hardcoded values (use `{TD.*}` placeholders for username, password, documentName, reviewer)
   - Automation Eligibility: ≥ 6 TCs flagged as Automation Candidate: YES
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above
7. Output files to `testcases/AI-generated testcases/CS-12/` and `testdata/CS-12/`
8. Include regulatory compliance verification steps in HP-01 (e.g., verify state transition is logged in audit trail)
