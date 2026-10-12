# Test Strategy: [CS-10] Complete final review task to close workflow

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-10/strategy/CS-10-analysis.md
**Risk Profile:**     jira/userstories/CS-10/strategy/CS-10-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Quality Doc SME
- **Business Object:** Workflow Task / Quality Document
- **SAP Module:** N/A — **Veeva Vault QualityDocs** (Life Sciences Document Management)
- **Business Goal:** Formally complete the document review cycle by closing the Send for Review workflow after SME final review approval

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 1 | 1 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 1 | 1 | MEDIUM |
| Negative (NEG) | MANDATORY | 1 | 1 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 1 | 1 | HIGH |
| Edge Case / Boundary (EDGE) | NOT APPLICABLE | 0 | 0 | N/A |
| Integration (INT) | MANDATORY | 1 | 1 | HIGH |
| **TOTAL** | — | **5** | **5** | — |

**Rationale for EDGE = NOT APPLICABLE:** This workflow story contains no numeric input fields, string length constraints, or boundary parameters. All inputs are categorical (username/password authentication, verdict dropdown selection), making edge/boundary testing inapplicable.

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| HP-01 | SME logs in with valid credentials, navigates to Home view, locates most recent final review task, opens task, selects verdict "No Changes Required – Review Complete", clicks Complete to submit, verifies task marked complete and workflow closed, verifies document transitioned to Final Review Complete state, logs out successfully | CRITICAL | AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7, AC-8, AC-9, AC-10 |
| NEG-01 | User with Reviewer role (not Quality Doc SME) attempts to complete the SME final review task and is prevented by role-based authorization check | HIGH | AC-13 |
| ERR-01 | SME attempts to submit final review task without selecting a Verdict from the dropdown and system displays mandatory field error | HIGH | AC-12 |
| INT-01 | Verify that the SME final review task only becomes available after CS-9 (Reviewer review task) has been completed — enforce sequential workflow ordering per RP-NFR-001 | HIGH | (Implicit precondition from story description) |

### Recommended Scenarios

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| AP-01 | SME has multiple workflow tasks in Home view and successfully identifies the most recent final review task corresponding to the current workflow instance | MEDIUM | AC-11 |

### Optional Scenarios

None

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — all 13 ACs covered by ≥ 1 TC | YES |
| HP Coverage | All 1 HP scenarios generated | YES |
| NEG Coverage | All 1 NEG scenarios generated | YES |
| ERR Coverage | All 1 ERR scenarios generated | YES |
| EDGE Coverage | 0 EDGE TCs (NOT APPLICABLE for this story) | N/A |
| INT Coverage | All 1 INT scenarios generated | YES |
| Parameterization | 0 hardcoded Veeva values (use `{TD.*}` and `{ENV.*}` placeholders) | YES |
| Automation Eligibility | ≥ 3 TCs flagged as Automation Candidate: YES | YES |

**Overall pass threshold:** All mandatory gates must PASS. The single recommended scenario (AP-01) should be generated unless explicitly excluded.

**CRITICAL risk story additional requirements:**
- **Negative coverage (entity validation):** 100% — NEG-01 covers role-based authorization enforcement (only authorized SME can complete task)
- **Error coverage (mandatory fields):** 100% — ERR-01 covers the single mandatory field (Verdict) validation

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core workflow completion) | CRITICAL | CRITICAL | Final workflow closure is the primary business objective; failure leaves document in incomplete state; compliance-critical in regulated life sciences environment |
| NEG (role-based authorization) | HIGH | MAJOR | Security and workflow integrity: wrong role completing task violates process controls and regulatory audit requirements |
| ERR (mandatory Verdict field) | HIGH | MAJOR | Data completeness enforcement: workflow cannot close without explicit verdict; missing validation breaks workflow state machine |
| AP (multiple task identification) | MEDIUM | MINOR | UX scenario for task disambiguation; important for user efficiency but not blocking to core workflow |
| INT (sequential dependency on CS-9) | HIGH | MAJOR | Workflow ordering integrity: SME task must not become available before Reviewer task completion; violation breaks process sequence |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright — stable, repeatable, critical business process |
| AP | YES | Data-driven via testdata JSON — can parameterize multiple-task scenarios |
| NEG | YES | Role-based authorization checks are stable and repeatable; negative test ideal for CI/CD regression |
| ERR | YES | Field-level validation is stable; mandatory field error messages are deterministic |
| EDGE | N/A | No boundary parameters in this workflow story |
| INT | PARTIAL | Sequential workflow dependency requires orchestration of CS-9 → CS-10; multi-session setup needed; may require manual workflow initiation for test isolation |

**Target automation coverage:** 4 of 5 TCs (80%) — HP, AP, NEG, ERR fully automatable; INT partially automatable (requires CS-9 setup)

**Veeva-specific automation considerations:**
- Authentication may use SSO/OAuth flow (verify Playwright MCP can handle IDP redirects)
- Workflow task assignment requires pre-existing workflow instance (CS-9 completion) — test data setup complexity
- Role-based authorization tests require two distinct user sessions (Reviewer vs SME)
- Document lifecycle state verification may require Veeva Vault API calls (if UI does not display state explicitly)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  {List HP test case IDs once generated}

Priority 2 — HIGH (validate immediately after):
  {List NEG and ERR test case IDs}

Priority 3 — MEDIUM (complete coverage):
  {List AP and EDGE test case IDs}

Priority 4 — Integration (run after core stability confirmed):
  {List INT test case IDs, or "None"}
```

**Execution order rationale:**
1. **HP first** — Establishes that the core workflow completion path works end-to-end
2. **NEG and ERR next** — Validate security controls and data integrity immediately after happy path
3. **INT next** — Confirm workflow sequencing rules before proceeding to UX variations
4. **AP last** — UX refinement scenario; does not block core functionality

**Sequential dependency note:** INT-01 (CS-9 → CS-10 workflow ordering) should be executed early in the cycle to confirm that test data setup (CS-9 completion) is correctly preparing the SME task. If INT-01 fails, all other CS-10 tests will be blocked.

---

## Regulatory and Compliance Notes

**Life Sciences / FDA 21 CFR Part 11 Considerations:**

- **Electronic Signatures:** This workflow represents a quality document review and approval process; in regulated environments, the Verdict selection and task completion may constitute an electronic signature event subject to FDA 21 CFR Part 11 requirements
  - Test cases must verify that the system records user identity, timestamp, and approval action (verdict selection) as part of the audit trail
  - If the Veeva Vault instance is validated under 21 CFR Part 11, test execution must use dedicated test/validation system instances (not production) per GxP requirements

- **Audit Trail Integrity:** Test cases should verify (where possible via UI or API) that workflow state transitions are logged in the Veeva Vault audit trail:
  - Task completion timestamp
  - User identity (QualDocSme.01)
  - Verdict selected ("No Changes Required – Review Complete")
  - Document lifecycle state transition ("Final Review Complete")

- **Role-Based Access Control (RBAC):** NEG-01 validates that only authorized SME roles can complete the final review task — this is a critical GxP control; failure to enforce role separation could result in audit findings or regulatory non-compliance

- **Test Data Governance:**
  - Do not use production documents or real quality records for test execution
  - Ensure test user accounts (QualDocSme.01, QualDocReviewer.01) are clearly labeled as test accounts and segregated from production user base
  - Test execution must use dedicated Veeva Vault sandbox environments (not production vaults)

- **Change Control:** If this story is part of a validated system change (e.g., Veeva Vault configuration update), test execution results must be retained as evidence per GxP change control procedures

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-10-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first:
   - HP-01 (1 TC)
   - NEG-01 (1 TC)
   - ERR-01 (1 TC)
   - INT-01 (1 TC)
3. Generate RECOMMENDED types:
   - AP-01 (1 TC)
4. Apply quality gates table — verify all thresholds are met before completing:
   - AC Traceability: 100% (all 13 ACs mapped to TCs)
   - HP Coverage: 1 TC generated
   - NEG Coverage: 1 TC generated
   - ERR Coverage: 1 TC generated
   - INT Coverage: 1 TC generated
   - Parameterization: All Veeva credentials use `{ENV.*}`, all test data use `{TD.*}`
   - Automation Eligibility: ≥ 3 TCs flagged YES
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above:
   - HP-01: YES
   - AP-01: YES
   - NEG-01: YES
   - ERR-01: YES
   - INT-01: PARTIAL
7. Output files to `testcases/AI-generated testcases/CS-10/` and `testdata/CS-10/`
8. **Veeva-specific test case requirements:**
   - Include IDP/SSO authentication flow in Step 1 (Veeva login redirects to identity provider)
   - Reference exact Veeva UI element labels from RP-BIZ-005 (e.g., "No Changes Required – Review Complete")
   - Verify document lifecycle state transitions explicitly in Expected Result columns
   - For INT-01, document the precondition setup (CS-9 must be completed first) in Preconditions section
   - For NEG-01, use QualDocReviewer.01 credentials (wrong role) to verify authorization failure
9. **Test data parameterization:**
   - Username: `{ENV.VEEVA_SME_USERNAME}` (QualDocSme.01)
   - Password: `{ENV.VEEVA_SME_PASSWORD}`
   - Reviewer Username (for NEG-01): `{ENV.VEEVA_REVIEWER_USERNAME}` (QualDocReviewer.01)
   - Reviewer Password (for NEG-01): `{ENV.VEEVA_REVIEWER_PASSWORD}`
   - Verdict value: `{TD.verdict_approve}` → resolves to "No Changes Required – Review Complete"
   - Document ID: `{TD.document_id}` → resolves to test document created in CS-8/CS-9 flow
