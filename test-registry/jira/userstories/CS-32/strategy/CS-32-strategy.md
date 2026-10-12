# Test Strategy: [CS-32] Move Expired Batches To A Designated Blocked Storage Location Automati

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-32/strategy/CS-32-analysis.md
**Risk Profile:**     jira/userstories/CS-32/strategy/CS-32-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Warehouse Operator
- **Business Object:** Batch / Stock (inventory batch with expiration date)
- **SAP Module:** MM — Materials Management (Warehouse Management / Inventory Management / Batch Management)
- **Business Goal:** Prevent accidentally picking expired GMP materials for production or shipment

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 2 | 2 | CRITICAL |
| Alternative Path (AP) | NOT APPLICABLE | 0 | 0 | N/A |
| Negative (NEG) | MANDATORY | 3 | 3 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 1 | 1 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 3 | 3 | MEDIUM |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | N/A |
| **TOTAL** | — | **9** | **9** | — |

**Notes:**
- **AP = NOT APPLICABLE**: No alternative valid paths exist for batch expiration handling — only one business process for restricting expired batches.
- **INT = NOT APPLICABLE**: No linked issues identified. Implicit SAP standard integration points (QM, WM, PP modules) are handled by SAP core functionality and do not require additional integration test cases.
- **EDGE = MANDATORY**: Given CRITICAL risk level and safety-critical nature (pharmaceutical/food GMP compliance), all boundary conditions (same-day expiry, zero quantity, backlog processing) must be explicitly tested.

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP):**
- **HP-01** — Daily background job detects expired batch and automatically moves to blocked storage location with notification sent — **Risk: CRITICAL** — ACs: AC-1, AC-2, AC-3, AC-4, AC-6
- **HP-02** — Authorized QA user completes disposition (Destroy/Return/Rework) and batch cleared from blocked status with audit entry created — **Risk: HIGH** — ACs: AC-5, AC-6

**Negative (NEG):**
- **NEG-01** — Background job fails to run (schedule error, system down, job variant missing) — expired batches not detected — **Risk: CRITICAL** — ACs: AC-2
- **NEG-02** — Notification generation fails (recipient configuration error, email service down) — teams not alerted — **Risk: HIGH** — ACs: AC-4
- **NEG-03** — Unauthorized user attempts disposition — system rejects with authorization error — **Risk: HIGH** — ACs: AC-5

**Error / Missing Field (ERR):**
- **ERR-01** — Missing disposition decision — batch remains blocked indefinitely, no clearance path — **Risk: HIGH** — ACs: AC-5 — Field: Disposition Decision

**Edge Case / Boundary (EDGE):**
- **EDGE-01** — Batch expiring today (same-day boundary) — system must detect and restrict on same day — **Risk: CRITICAL** — ACs: AC-2, AC-3 — Parameter: expirationDate, Boundary: same-day
- **EDGE-02** — Batch with zero quantity (already fully consumed before expiration) — no stock to move, no material document generated — **Risk: MEDIUM** — ACs: AC-3 — Parameter: quantity, Boundary: zero
- **EDGE-03** — Batch expiration date in past (already expired before job ran) — backlog processing of expired batches — **Risk: HIGH** — ACs: AC-2, AC-3 — Parameter: expirationDate, Boundary: past

### Recommended Scenarios

None — all identified scenarios are mandatory given CRITICAL overall risk.

### Optional Scenarios

None — all identified scenarios are mandatory given CRITICAL overall risk.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 2 HP scenarios generated | YES |
| NEG Coverage | All 3 NEG scenarios generated | YES |
| ERR Coverage | All 1 ERR scenario generated | YES |
| EDGE Coverage | All 3 EDGE scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 5 TCs flagged as Automation Candidate: YES | YES |
| Entity Validation Coverage | 1 NEG per named entity that can be invalid (Background job, Notification, Authorization) | YES |
| Mandatory Field Coverage | 1 ERR per mandatory field in ACs (Disposition Decision) | YES |
| Audit Trail Verification | HP-01 and HP-02 must explicitly verify audit report entry creation | YES |

**Overall pass threshold:** All mandatory gates must PASS. 100% of gates must PASS given CRITICAL risk level.

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Core batch restriction workflow — failure allows expired GMP material into production/shipment → patient safety risk, regulatory non-compliance (FDA 21 CFR Part 11, EU GMP Annex 11) |
| NEG (invalid entity) | HIGH | MAJOR | Background job failure (NEG-01) → expired material not detected → patient safety risk. Notification failure (NEG-02) → QA teams not alerted → delayed disposition. Authorization bypass (NEG-03) → audit failure → FDA 483 warning letter |
| ERR (missing field) | HIGH | MAJOR | Missing disposition decision → batch blocked indefinitely → warehouse space exhaustion, disposal workflow incomplete → audit trail gap |
| EDGE (boundary) | MEDIUM | MINOR (EDGE-02) / MAJOR (EDGE-01, EDGE-03) | Same-day expiry boundary (EDGE-01) → off-by-one error → expired material not restricted → CRITICAL failure. Backlog processing (EDGE-03) → system recovery validation → HIGH impact. Zero quantity (EDGE-02) → operational edge case → MEDIUM impact |
| AP (alternative) | N/A | N/A | Not applicable — no alternative valid paths |
| INT (integration) | N/A | N/A | Not applicable — no linked issues |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright — stable background job monitoring and disposition workflows |
| AP | N/A | Not applicable |
| NEG | PARTIAL | NEG-01 (job failure) requires SAP job scheduler manipulation — mark PARTIAL. NEG-02 (notification failure) requires email server mocking — mark PARTIAL. NEG-03 (authorization) is stable — mark YES |
| ERR | YES | Field-level validation stable — disposition field validation is repeatable |
| EDGE | PARTIAL | EDGE-01 (same-day expiry) requires system date manipulation or test batch creation with dynamic expiration dates — mark PARTIAL. EDGE-02 (zero quantity) requires pre-setup of depleted batch — mark PARTIAL. EDGE-03 (past expiry) is stable with fixed test data — mark YES |
| INT | N/A | Not applicable |

**Target automation coverage:** 5 of 9 TCs (56%) — HP-01, HP-02, NEG-03, ERR-01, EDGE-03

**Automation challenges:**
- Background job scheduling (NEG-01) — requires SAP job variant configuration and scheduler manipulation (PARTIAL candidate)
- Notification testing (NEG-02) — requires email integration mocking or SAP notification monitoring (PARTIAL candidate)
- Date-dependent scenarios (EDGE-01) — requires dynamic test data generation with current date + batch master maintenance (PARTIAL candidate)
- Depleted batch testing (EDGE-02) — requires pre-setup of batch with zero unrestricted stock (PARTIAL candidate)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-{NNN} — HP-01: Daily background job detects expired batch and automatically moves to blocked storage location with notification sent
  TC-CS-{NNN} — EDGE-01: Batch expiring today (same-day boundary) — system must detect and restrict on same day

Priority 2 — HIGH (validate immediately after):
  TC-CS-{NNN} — HP-02: Authorized QA user completes disposition (Destroy/Return/Rework) and batch cleared from blocked status with audit entry created
  TC-CS-{NNN} — NEG-01: Background job fails to run — expired batches not detected
  TC-CS-{NNN} — NEG-02: Notification generation fails — teams not alerted
  TC-CS-{NNN} — NEG-03: Unauthorized user attempts disposition — system rejects with authorization error
  TC-CS-{NNN} — ERR-01: Missing disposition decision — batch remains blocked indefinitely
  TC-CS-{NNN} — EDGE-03: Batch expiration date in past — backlog processing

Priority 3 — MEDIUM (complete coverage):
  TC-CS-{NNN} — EDGE-02: Batch with zero quantity — no stock to move

Priority 4 — Integration (run after core stability confirmed):
  (None — no integration scenarios)
```

---

## Regulatory and Compliance Notes

**SAP MM/Batch Management — GMP Compliance:**
- Batch expiration monitoring and restriction is a regulatory requirement for pharmaceutical and food manufacturing under:
  - **FDA 21 CFR Part 11** — Electronic Records and Electronic Signatures (audit trail requirement)
  - **EU GMP Annex 11** — Computerized Systems (data integrity and audit trail)
- Test cases must verify that the system maintains a complete audit trail for all batch disposition activities (AC-6 coverage in HP-01 and HP-02).
- Test data must not use real production batch numbers, material IDs, or expiration dates — use dedicated test batches in a non-production SAP system instance.
- All test execution must occur in a designated test environment with test period configuration (SAP fiscal calendar) to ensure no impact on production inventory.

**Authorization and Segregation of Duties (SOD):**
- Disposition workflow (AC-5) requires QA authorization — test cases must verify that unauthorized users cannot complete disposition (NEG-03).
- Ensure test users are configured with appropriate authorization objects (SAP authorization profile for QA disposition).

**Audit Trail Verification:**
- HP-01 and HP-02 must explicitly verify that audit report entries are created with complete metadata (timestamp, batch, material, quantity, disposition decision, user ID).
- Audit report retrieval (AC-6) must be testable via SAP standard reports or custom Fiori app — confirm report name/transaction code before test case generation.

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-32-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first
3. No RECOMMENDED types — all scenarios are mandatory given CRITICAL risk
4. Apply quality gates table — verify all thresholds are met before completing
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above:
   - HP-01, HP-02 → YES
   - NEG-01, NEG-02 → PARTIAL (requires SAP job/notification infrastructure)
   - NEG-03 → YES
   - ERR-01 → YES
   - EDGE-01, EDGE-02 → PARTIAL (requires dynamic test data or batch pre-setup)
   - EDGE-03 → YES
7. Output files to `testcases/AI-generated testcases/CS-32/` and `testdata/CS-32/`
8. **Critical test data requirements:**
   - Batch number with maintained expiration date (MCHA-VFDAT field)
   - Material number flagged as GMP-relevant (batch-managed, expiration date required)
   - Blocked storage location configured in warehouse master data
   - QA-authorized user ID for disposition workflow
   - Unauthorized user ID for NEG-03 scenario
   - Past, current, and future expiration dates for boundary testing
9. **Audit trail verification steps:**
   - HP-01 and HP-02 must include explicit steps to query audit report (provide SAP report name/transaction code if known)
   - Verify presence of audit entry with batch number, material, disposition decision, user ID, timestamp
10. **Background job testing notes:**
    - NEG-01 requires manual job schedule manipulation or SAP job variant deletion — provide detailed preconditions for test setup
    - HP-01 may require waiting for scheduled job execution or triggering job manually (F8 in SM37) — document in test steps
11. **Notification testing notes:**
    - NEG-02 requires email recipient configuration error simulation or notification service disruption — provide detailed preconditions
    - HP-01 must verify notification content (batch number, material, expiration date, quantity) — specify notification type and access method (SAP Inbox, email, Fiori notification panel)
