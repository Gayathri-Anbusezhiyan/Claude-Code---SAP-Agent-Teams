# Test Strategy: [CS-14] As a Quality Doc SME, I want to complete the final review task and close the workflow so that the document reaches the Final Review Complete state

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-14/strategy/CS-14-analysis.md
**Risk Profile:**     jira/userstories/CS-14/strategy/CS-14-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Quality Doc SME
- **Business Object:** Workflow Task (Final Review Task), Quality Document
- **SAP Module:** N/A — Veeva Vault QualityDocs (Document Management System)
- **Business Goal:** Complete final review task and close workflow, transitioning document to Final Review Complete state

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 1 | 1 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 1 | 1 | MEDIUM |
| Negative (NEG) | MANDATORY | 3 | 3 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 1 | 1 | HIGH |
| Edge Case / Boundary (EDGE) | RECOMMENDED | 1 | 1 | MEDIUM |
| Integration (INT) | RECOMMENDED | 1 | 1 | MEDIUM |
| **TOTAL** | — | **8** | **8** | — |

**Coverage Model Rationale:**

This is a CRITICAL-risk story involving workflow completion and document state transitions in a compliance-focused document management system. The coverage model applies CRITICAL-level standards per the define-test-strategy skill guidelines:

- **HP:** MANDATORY — Core workflow completion path from authentication to logout must be verified (per CRITICAL risk requirement)
- **AP:** RECOMMENDED — Task list ordering and selection with multiple tasks is important for usability but not core-path critical
- **NEG:** MANDATORY — Role-based access control (3 scenarios) is a security and compliance requirement at CRITICAL risk level; workflow closure logic must be verified
- **ERR:** MANDATORY — Mandatory field (Verdict) validation is a data integrity control at HIGH risk level
- **EDGE:** RECOMMENDED (upgraded from OPTIONAL) — Verdict dropdown value selection involves data validation in a CRITICAL workflow; included due to HIGH-risk ACs (AC-9)
- **INT:** RECOMMENDED — Task assignment dependency on CS-13 is documented but not formally linked; verification is recommended for workflow continuity

**Adjustment Rationale:**
- EDGE upgraded from OPTIONAL to RECOMMENDED due to AC-9 HIGH risk classification and Verdict field criticality
- All scenario counts align with the analysis-phase recommendations in CS-14-risk-profile.json
- Total TC count: 8 (same as recommended count from analysis phase)

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**HP-01 (Happy Path — Core Workflow Completion):**
- **Scenario ID:** HP-01
- **Description:** SME re-authenticates, navigates to Home, selects final review task, submits verdict "No Changes Required – Review Complete", clicks Complete, document transitions to Final Review Complete, workflow closes, SME logs out
- **Risk:** CRITICAL
- **ACs Covered:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-7, AC-8, AC-10, AC-11, AC-12, AC-13, AC-14, AC-15, AC-16, AC-27, AC-29, AC-30 (17 ACs)
- **Priority:** CRITICAL
- **Automation Candidate:** YES
- **TC Count:** 1

**NEG-01 (Negative — Unauthorized Role Access):**
- **Scenario ID:** NEG-01
- **Description:** Reviewer (wrong role) attempts to access SME's final review task — access denied
- **Risk:** CRITICAL
- **ACs Covered:** AC-22, AC-23, AC-24, AC-31 (4 ACs)
- **Priority:** HIGH
- **Automation Candidate:** PARTIAL (requires multi-user session orchestration)
- **TC Count:** 1

**NEG-02 (Negative — Workflow Not Closed Without Complete):**
- **Scenario ID:** NEG-02
- **Description:** SME attempts to close workflow without clicking Complete button — workflow remains open
- **Risk:** CRITICAL
- **ACs Covered:** AC-21 (1 AC)
- **Priority:** HIGH
- **Automation Candidate:** YES
- **TC Count:** 1

**NEG-03 (Negative — Task Not Visible):**
- **Scenario ID:** NEG-03
- **Description:** Final review task is not visible in SME's task list after CS-13 completion — workflow deadlock
- **Risk:** CRITICAL
- **ACs Covered:** AC-5, AC-27 (2 ACs)
- **Priority:** HIGH
- **Automation Candidate:** PARTIAL (depends on CS-13 completion timing)
- **TC Count:** 1
- **Note:** This scenario validates system behavior when precondition (CS-13) is not properly executed; requires verification that task assignment workflow is functioning

**ERR-01 (Error — Missing Verdict Field):**
- **Scenario ID:** ERR-01
- **Description:** Missing Verdict field — system displays error and blocks submission
- **Risk:** HIGH
- **ACs Covered:** AC-18, AC-19, AC-20, AC-25, AC-26, AC-28 (6 ACs)
- **Field:** Verdict
- **Priority:** HIGH
- **Automation Candidate:** YES
- **TC Count:** 1

### Recommended Scenarios

**AP-01 (Alternative Path — Multiple Tasks in List):**
- **Scenario ID:** AP-01
- **Description:** Multiple tasks exist in task list; SME identifies and selects the most recent final review task by position (top of list)
- **Risk:** MEDIUM
- **ACs Covered:** AC-6, AC-17 (2 ACs)
- **Priority:** MEDIUM
- **Automation Candidate:** YES
- **TC Count:** 1

**EDGE-01 (Edge Case — Verdict Dropdown Values):**
- **Scenario ID:** EDGE-01
- **Description:** Verdict dropdown contains multiple predefined values; SME selects "No Changes Required – Review Complete"
- **Risk:** MEDIUM
- **ACs Covered:** AC-9 (1 AC)
- **Parameter:** verdict
- **Boundary:** multiple predefined values
- **Priority:** MEDIUM
- **Automation Candidate:** YES
- **TC Count:** 1

**INT-01 (Integration — Task Assignment After CS-13):**
- **Scenario ID:** INT-01
- **Description:** Verify final review task is assigned to SME immediately after CS-13 (reviewer completes task)
- **Risk:** MEDIUM
- **ACs Covered:** AC-5, AC-27 (2 ACs - shared with NEG-03 but different test angle)
- **Priority:** MEDIUM
- **Automation Candidate:** PARTIAL (requires CS-13 execution as precondition)
- **TC Count:** 1
- **Linked Issue:** CS-13 (precondition dependency — not formally linked)

### Optional Scenarios

None.

**AC Coverage Summary:**
- Total ACs: 31
- ACs covered by mandatory scenarios: 31 (all ACs covered by at least one scenario)
- ACs covered by HP-01: 17
- ACs covered by NEG scenarios: 7
- ACs covered by ERR-01: 6
- ACs covered by recommended scenarios: 5
- Note: Some ACs are covered by multiple scenarios (e.g., AC-5 and AC-27 by both NEG-03 and INT-01)

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — all 31 ACs covered by ≥ 1 TC | YES |
| HP Coverage | All 1 HP scenarios generated | YES |
| NEG Coverage | All 3 NEG scenarios generated | YES |
| ERR Coverage | All 1 ERR scenarios generated | YES |
| EDGE Coverage | ≥ 1 EDGE TC generated | YES |
| Parameterization | 0 hardcoded SAP values — all credentials, task IDs, document IDs use `{TD.*}` or `{ENV.*}` placeholders | YES |
| Automation Eligibility | ≥ 4 TCs flagged as Automation Candidate: YES (50% threshold) | YES |

**CRITICAL-Risk Additional Gates:**

| Additional Gate | Threshold | Mandatory |
|----------------|-----------|---------|
| Negative coverage (entity validation) | 100% — all 3 NEG scenarios generated (unauthorized role, workflow not closed, task not visible) | YES |
| Error coverage (mandatory fields) | 100% — Verdict field ERR scenario generated | YES |
| State transition verification | HP-01 must explicitly verify document state transition from "Review Completed" to "Final Review Complete" | YES |
| Workflow closure verification | HP-01 must explicitly verify workflow status changes to "Closed" and no further tasks are created | YES |
| Session termination verification | HP-01 must explicitly verify session termination (logout → login screen displayed) | YES |

**Overall pass threshold:** All mandatory gates must PASS. At least 75% of recommended gates must PASS (AP-01 and INT-01 should be generated unless explicitly out of scope).

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | End-to-end workflow completion including authentication, task submission, state transition, workflow closure, and logout — core compliance requirement for regulatory document management |
| NEG (invalid entity) | HIGH | MAJOR | Security and compliance requirement — prevents unauthorized users from completing workflow tasks; prevents workflow closure without explicit Complete action; prevents workflow deadlock |
| ERR (missing field) | HIGH | MAJOR | Data integrity control — prevents incomplete workflow closure by validating mandatory Verdict field |
| EDGE (boundary) | MEDIUM | MINOR | Data validation — ensures correct verdict value is selectable from dropdown among multiple predefined values |
| AP (alternative) | MEDIUM | MINOR | Usability verification — ensures task list ordering supports correct task selection when multiple tasks exist |
| INT (integration) | MEDIUM | MINOR | Workflow continuity verification — confirms precondition dependency on CS-13 is satisfied |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright — stable workflow path with machine-verifiable state transitions (document state, workflow status, session termination) |
| AP | YES | Data-driven via testdata JSON — task list scenario with multiple tasks can be parameterized |
| NEG | PARTIAL | NEG-01: Requires multi-user session orchestration (SME + Reviewer sessions). NEG-02: Fully automatable (workflow state verification). NEG-03: Requires CS-13 non-completion setup (partial) |
| ERR | YES | Field-level validation is stable and repeatable — error message text verification |
| EDGE | YES | Dropdown value selection is stable and repeatable |
| INT | PARTIAL | Multi-session orchestration needed — requires CS-13 execution as precondition; feasible with automated pre-condition scripts |

**Detailed Automation Assessment:**
- **HP-01:** YES — Fully automatable end-to-end workflow with verifiable state changes
- **AP-01:** YES — Task list ordering with multiple tasks can be parameterized
- **NEG-01:** PARTIAL — Multi-user orchestration needed (SME + Reviewer credentials)
- **NEG-02:** YES — Workflow state verification without Complete action
- **NEG-03:** PARTIAL — Requires CS-13 non-completion or misconfiguration
- **ERR-01:** YES — Mandatory field validation with error message verification
- **EDGE-01:** YES — Dropdown value selection among predefined values
- **INT-01:** PARTIAL — Requires CS-13 execution + task assignment timing verification

**Target automation coverage:** 4 of 8 TCs (50%) flagged as full automation candidates (YES). 4 TCs flagged as PARTIAL (feasible with orchestration/setup). Total automation feasibility: 100% (all scenarios are automatable with appropriate setup).

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-XXX (HP-01): SME re-authenticates, navigates to Home, selects final review task, submits verdict, clicks Complete, document transitions to Final Review Complete, workflow closes, SME logs out

Priority 2 — HIGH (validate immediately after):
  TC-CS-XXX (NEG-01): Reviewer (wrong role) attempts to access SME's final review task — access denied
  TC-CS-XXX (NEG-02): SME attempts to close workflow without clicking Complete button — workflow remains open
  TC-CS-XXX (NEG-03): Final review task is not visible in SME's task list after CS-13 completion — workflow deadlock
  TC-CS-XXX (ERR-01): Missing Verdict field — system displays error and blocks submission

Priority 3 — MEDIUM (complete coverage):
  TC-CS-XXX (AP-01): Multiple tasks exist in task list; SME identifies and selects the most recent final review task by position
  TC-CS-XXX (EDGE-01): Verdict dropdown contains multiple predefined values; SME selects "No Changes Required – Review Complete"

Priority 4 — Integration (run after core stability confirmed):
  TC-CS-XXX (INT-01): Verify final review task is assigned to SME immediately after CS-13 (reviewer completes task)
```

**Execution Dependencies and Notes:**
- **INT-01:** Requires CS-13 (reviewer completes task) to be executed first — this is a precondition dependency
- **NEG-01:** Requires both SME and Reviewer user sessions — multi-user test orchestration needed
- **NEG-03:** Also depends on CS-13 non-completion — can be tested by verifying task visibility failure when CS-13 is not executed
- **INT-01 vs NEG-03:** Both scenarios test task visibility but from different angles:
  - INT-01: Positive test — task IS visible after successful CS-13 completion
  - NEG-03: Negative test — task is NOT visible when CS-13 fails or is incomplete
- **HP-01, AP-01, NEG-02, ERR-01, EDGE-01:** Can be executed independently after manual test data setup (SME credentials, existing final review task)

---

## Regulatory and Compliance Notes

**Document Management Compliance:**
- Workflow tasks are part of a regulated document review process — test cases must verify that role-based access control is strictly enforced (NEG-01, AC-22 to AC-24, AC-31)
- Document state transitions (Review Completed → Final Review Complete) are audit-critical — HP-01 must verify the exact state transition (AC-12)
- Workflow closure is permanent and cannot be reversed without administrative intervention — test cases must verify workflow status changes to "Closed" (AC-13)
- Session termination (logout) is a security requirement — HP-01 must verify session is terminated and login screen is displayed (AC-14, AC-15, AC-16, AC-30)

**Test Data Governance:**
- All test execution must use dedicated Veeva Vault test system instances (not production or validated environments)
- Test data must use placeholder credentials:
  - `{ENV.SME_USERNAME}` and `{ENV.SME_PASSWORD}` for Quality Doc SME role
  - `{ENV.REVIEWER_USERNAME}` and `{ENV.REVIEWER_PASSWORD}` for Reviewer role (NEG-01)
- Document IDs and Task IDs must be dynamically resolved from the test system — no hardcoded production IDs
- Ensure test data cleanup procedures are documented for workflow tasks and document state changes after test execution

**Role-Based Access Control Testing:**
- NEG-01 requires verification that Reviewer role cannot complete SME's final review task (AC-22, AC-23, AC-24, AC-31)
- Test data must include both SME and Reviewer credentials
- Access denial must be verified — system must prevent unauthorized role from accessing task form or submitting task

**Standard SAP S/4HANA Cloud test governance applies:**
- Note: This story is for Veeva Vault QualityDocs (non-SAP system); standard SAP governance does NOT apply
- Follow Veeva Vault test environment governance and GxP compliance requirements instead

---

## TestCase Agent Instructions

When consuming this strategy:

1. **Read `CS-14-risk-profile.json`** for the structured scenario inventory
2. **Generate test cases for ALL MANDATORY scenario types first:**
   - HP-01 (core workflow completion)
   - NEG-01 (unauthorized role access)
   - NEG-02 (workflow not closed without Complete)
   - NEG-03 (task not visible)
   - ERR-01 (missing Verdict field)
3. **Generate RECOMMENDED types:**
   - AP-01 (multiple tasks in list)
   - EDGE-01 (verdict dropdown values)
   - INT-01 (task assignment after CS-13)
   - Generate all recommended types unless time/scope constraints apply
4. **Apply quality gates table** — verify all thresholds are met before completing:
   - All 31 ACs must be covered by at least 1 TC (verify coverage matrix)
   - All 8 scenarios from the inventory must be generated
   - All credentials, task IDs, document IDs must use `{TD.*}` or `{ENV.*}` placeholders (zero hardcoded values)
   - Document state transition (Review Completed → Final Review Complete) must be explicitly verified in HP-01 Expected Result
   - Workflow closure (status = Closed, no further tasks) must be explicitly verified in HP-01 Expected Result
   - Session termination (logout → login screen) must be explicitly verified in HP-01 Expected Result
5. **Use `prompts/testcase-generation-from-userstory.md`** as the generation template
6. **Flag automation candidates** per the Automation Viability table above:
   - HP-01: YES
   - AP-01: YES
   - NEG-01: PARTIAL (multi-user orchestration required)
   - NEG-02: YES
   - NEG-03: PARTIAL (depends on CS-13 non-completion)
   - ERR-01: YES
   - EDGE-01: YES
   - INT-01: PARTIAL (depends on CS-13 execution)
7. **Output files to:**
   - Test cases: `testcases/AI-generated testcases/CS-14/testcases/{TC-ID}.md`
   - Coverage matrix: `testcases/AI-generated testcases/CS-14/CS-14-coverage-matrix.md`
   - Summary: `testcases/AI-generated testcases/CS-14/CS-14-summary.json`
   - Test data: `testdata/CS-14/CS-14-testdata.json`
   - Test data guide: `testdata/CS-14/CS-14-testdata-guide.md`
8. **Special instructions for NEG-03 and INT-01:**
   - NEG-03 validates negative scenario (task not visible when CS-13 is incomplete)
   - INT-01 validates positive scenario (task is visible after CS-13 completes successfully)
   - Document precondition setup steps explicitly in test case Preconditions section
   - NEG-03 precondition: "CS-13 (Reviewer completes review task) has NOT been executed OR has failed"
   - INT-01 precondition: "CS-13 (Reviewer completes review task) has been executed successfully"
9. **Special instructions for NEG-01:**
   - Requires Reviewer role credentials (separate from SME credentials)
   - Document in testdata guide that Reviewer credentials must be obtained from test environment admin
   - Document expected behavior: "Access Denied" or "You do not have permission to access this task" (exact message may vary)
10. **Verdict field test data:**
    - Testdata JSON must include predefined verdict values as an array:
      - `verdictOptions: ["No Changes Required – Review Complete", "Changes Required", "Additional Review Needed"]` (example values)
    - HP-01, AP-01, and EDGE-01 must use "No Changes Required – Review Complete" as the selected verdict
    - ERR-01 must leave Verdict field blank (empty string or null)
    - Document in testdata guide that actual verdict values must be confirmed from Veeva Vault QualityDocs configuration before test execution
11. **Test case ID assignment:**
    - Use sequential TC IDs starting from the next available TC-CS-XXX number for this story
    - Format: TC-CS-{NNN} where NNN is a zero-padded 3-digit sequential number
    - Order: HP → AP → NEG → ERR → EDGE → INT (as per execution priority)
