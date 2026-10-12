# Test Strategy: [CS-31] Review And Approve A Change Request Affecting An Approved Vendor's Manufacturing Site

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-31/strategy/CS-31-analysis.md
**Risk Profile:**     jira/userstories/CS-31/strategy/CS-31-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Quality Assurance Manager
- **Business Object:** Vendor Change Request (affecting manufacturing site)
- **SAP Module:** MM — Materials Management (Vendor Master Management with Quality Workflow)
- **Business Goal:** Ensure materials are not procured from unapproved or unverified manufacturing locations

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 2 | 2 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 1 | 1 | HIGH |
| Negative (NEG) | MANDATORY | 3 | 3 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 4 | 4 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 4 | 4 | MEDIUM |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | N/A |
| **TOTAL** | — | **14** | **14** | — |

**Rationale:**
- **CRITICAL overall risk** requires MANDATORY coverage for HP, NEG, ERR, and EDGE
- AC-2, AC-4, AC-6 (CRITICAL risk business rules) require comprehensive NEG validation
- AC-3 (attachment upload with BVA) requires MANDATORY EDGE coverage despite MEDIUM AC risk due to boundary testing requirements
- AP coverage is RECOMMENDED (not MANDATORY) for workflow flexibility testing
- No linked issues → INT = NOT APPLICABLE

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP) - 2 scenarios - CRITICAL priority**

1. **HP-01**: QA Manager reviews pending vendor manufacturing site change request in My Inbox, attaches site audit report, approves change, system updates vendor master and logs audit trail
   - Risk: CRITICAL
   - ACs covered: AC-1, AC-2, AC-3, AC-5

2. **HP-02**: QA Manager reviews pending vendor manufacturing site change request, rejects change with comments, system restores vendor to previous approved state and logs rejection
   - Risk: CRITICAL
   - ACs covered: AC-1, AC-2, AC-5, AC-6

**Negative (NEG) - 3 scenarios - HIGH priority**

1. **NEG-01**: Procurement user attempts to create PO against vendor with pending manufacturing site change before QA approval - system blocks PO creation
   - Risk: CRITICAL
   - ACs covered: AC-4

2. **NEG-02**: User without QA approval authorization attempts to access and approve change request - system denies access or approval action
   - Risk: HIGH
   - ACs covered: AC-1

3. **NEG-03**: Vendor manufacturing site change is submitted but workflow does not trigger QA approval flag
   - Risk: CRITICAL
   - ACs covered: AC-2

**Error / Missing Field (ERR) - 4 scenarios - HIGH priority**

1. **ERR-01**: Missing Vendor ID in change request
   - Risk: HIGH
   - ACs covered: AC-1, AC-2
   - Field: Vendor

2. **ERR-02**: Missing Approval Decision (neither Approve nor Reject selected)
   - Risk: HIGH
   - ACs covered: AC-5
   - Field: Approval Decision

3. **ERR-03**: Attachment file upload fails due to unsupported file type
   - Risk: MEDIUM
   - ACs covered: AC-3
   - Field: Attachment

4. **ERR-04**: Attachment file upload fails due to size exceeding 10MB limit
   - Risk: MEDIUM
   - ACs covered: AC-3
   - Field: Attachment

**Edge Case / Boundary (EDGE) - 4 scenarios - MEDIUM priority**

1. **EDGE-01**: Attachment file size at minimum boundary (1 KB)
   - Risk: LOW
   - ACs covered: AC-3
   - Parameter: attachmentSize (lower boundary)

2. **EDGE-02**: Attachment file size at maximum boundary (10 MB)
   - Risk: MEDIUM
   - ACs covered: AC-3
   - Parameter: attachmentSize (upper boundary)

3. **EDGE-03**: Approval comments at maximum character length (1000 characters)
   - Risk: LOW
   - ACs covered: AC-5
   - Parameter: commentsLength (upper boundary)

4. **EDGE-04**: Multiple concurrent approval requests for same vendor
   - Risk: HIGH
   - ACs covered: AC-2, AC-4
   - Parameter: concurrentRequests (concurrent boundary)

### Recommended Scenarios

**Alternative Path (AP) - 1 scenario - HIGH priority**

1. **AP-01**: QA Manager approves vendor manufacturing site change without attaching supporting documentation (optional)
   - Risk: MEDIUM
   - ACs covered: AC-1, AC-2, AC-5

### Optional Scenarios

None

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 2 HP scenarios generated | YES |
| NEG Coverage | All 3 NEG scenarios generated | YES |
| ERR Coverage | All 4 ERR scenarios generated | YES |
| EDGE Coverage | All 4 EDGE TCs generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 7 TCs flagged as Automation Candidate: YES | YES |

**Additional CRITICAL-risk gates:**

| Additional Gate | Threshold | Mandatory |
|----------------|-----------|---------|
| Negative coverage (entity validation) | 100% — one NEG per named entity that can be invalid | YES |
| Error coverage (mandatory fields) | 100% — one ERR per mandatory field in ACs | YES |

**Overall pass threshold:** All mandatory gates must PASS.

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Vendor change approval workflow is a GxP/ISO regulatory control — approval and rejection paths are core quality assurance transactions |
| HP (access/navigation) | HIGH | MAJOR | My Inbox access is a prerequisite for all approval workflows |
| AP (alternative) | HIGH | MAJOR | Approval without attachment tests optional documentation path that must not block approval process |
| NEG (invalid entity) | HIGH | MAJOR | PO blocking logic and workflow trigger validation prevent regulatory non-compliance and supply chain quality risk |
| NEG (authorization) | HIGH | MAJOR | Segregation of duties enforcement — unauthorized approval is a critical security and compliance violation |
| ERR (missing field) | HIGH | MAJOR | Mandatory field validation (Vendor ID, Approval Decision) ensures data integrity in quality workflows |
| ERR (attachment validation) | MEDIUM | MINOR | Attachment validation failures do not block core approval process but reduce audit evidence quality |
| EDGE (boundary) | MEDIUM | MINOR | File size and comment length boundaries are important but do not directly impact regulatory compliance |
| EDGE (concurrent requests) | HIGH | MAJOR | Concurrent approval requests can cause data integrity issues and race conditions in vendor master updates |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright — stable approval workflow with machine-verifiable outcomes |
| AP | YES | Data-driven via testdata JSON — optional attachment flag can be parameterized |
| NEG | PARTIAL | NEG-01 (PO blocking) requires separate PO creation session — multi-app orchestration. NEG-02 (authorization) requires test user with specific auth objects — manual setup. NEG-03 (workflow trigger) may require SAP config changes — config-dependent. |
| ERR | YES | Field-level validation stable — all error messages are machine-verifiable |
| EDGE | PARTIAL | EDGE-01/02 (file size boundaries) require test files of specific sizes — can be automated with pre-created files. EDGE-03 (comment length) is fully automatable. EDGE-04 (concurrent requests) requires parallel test execution framework — advanced orchestration. |
| INT | N/A | No integration scenarios for this story |

**Target automation coverage:** 7 of 14 TCs (50%) — meets minimum threshold for Automation Eligibility quality gate

**Automation recommendations:**
- Fully automate: HP-01, HP-02, AP-01, ERR-02, ERR-03, ERR-04, EDGE-03
- Partially automate: NEG-01 (requires PO creation pre-step), EDGE-01/02 (requires test file assets), EDGE-04 (requires parallel execution framework)
- Manual execution required: NEG-02 (auth setup), NEG-03 (config validation), ERR-01 (invalid change request state testing)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-{NNN} — HP-01: Full approval workflow with attachment and audit trail verification
  TC-CS-{NNN} — HP-02: Full rejection workflow with state restoration verification

Priority 2 — HIGH (validate immediately after):
  TC-CS-{NNN} — NEG-01: PO blocking validation (cross-app integration test)
  TC-CS-{NNN} — NEG-02: Authorization enforcement (security test)
  TC-CS-{NNN} — NEG-03: Workflow trigger validation (system rule test)
  TC-CS-{NNN} — AP-01: Approval without attachment (optional field validation)
  TC-CS-{NNN} — ERR-01: Missing Vendor ID validation
  TC-CS-{NNN} — ERR-02: Missing Approval Decision validation

Priority 3 — MEDIUM (complete coverage):
  TC-CS-{NNN} — ERR-03: Invalid attachment file type validation
  TC-CS-{NNN} — ERR-04: Oversized attachment validation
  TC-CS-{NNN} — EDGE-01: Minimum file size boundary
  TC-CS-{NNN} — EDGE-02: Maximum file size boundary
  TC-CS-{NNN} — EDGE-03: Maximum comment length boundary
  TC-CS-{NNN} — EDGE-04: Concurrent approval requests (race condition test)

Priority 4 — Integration (run after core stability confirmed):
  (None for this story)
```

---

## Regulatory and Compliance Notes

**SAP MM Vendor Master Quality Workflow Compliance:**
- Vendor change approval workflows are regulatory controls for GxP (Good Manufacturing Practice), ISO 9001, and FDA 21 CFR Part 11 compliance
- Test cases must verify that audit trail captures full approval chain: requestor, approver, decision, timestamp, and any attached supporting documentation
- Ensure test data does not use real production vendor IDs or manufacturing site data — use dedicated test vendor records only
- All test execution must use dedicated test system instances with workflow configuration matching production (not production tenant)
- PO blocking logic (AC-4) is a critical supply chain quality control — failure allows procurement from unapproved/unverified sites
- State restoration on rejection (AC-6) must be automatic (no manual intervention) to ensure data integrity and prevent inconsistent vendor master states
- Segregation of duties (SoD) must be enforced: QA approval authorization must be distinct from change request submission authorization

**Test environment requirements:**
- Test user with QA approval authorization object (F_LFA1_APP or equivalent workflow auth)
- Test user without QA approval authorization (for NEG-02 testing)
- Vendor master record with approved status and manufacturing site data configured
- Workflow configuration: vendor manufacturing site changes trigger QA approval flag
- PO creation authorization configured for procurement test user (for NEG-01 testing)

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-31-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, NEG, ERR, EDGE)
3. Generate RECOMMENDED types (AP) — approval without attachment is an important workflow flexibility test
4. Apply quality gates table — verify all thresholds are met before completing:
   - 100% AC traceability (all 6 ACs covered)
   - All 2 HP scenarios generated
   - All 3 NEG scenarios generated
   - All 4 ERR scenarios generated
   - All 4 EDGE scenarios generated
   - 0 hardcoded values (all test data in `{TD.*}` placeholders)
   - ≥ 7 TCs flagged as Automation Candidate: YES
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above
7. Output files to `testcases/AI-generated testcases/CS-31/` and `testdata/CS-31/`
8. For NEG-01 (PO blocking test), include cross-app navigation instructions: My Inbox (approval) → Manage Purchase Orders (PO creation attempt)
9. For EDGE-04 (concurrent requests), specify multi-session execution requirement in test case preconditions
10. For all audit trail verification steps (AC-5), specify exact SAP workflow log table/fields to verify: SWWWIHEAD (workflow header), SWWLOGHIST (workflow log history)
