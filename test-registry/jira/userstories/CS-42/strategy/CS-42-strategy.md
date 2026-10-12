# Test Strategy: [CS-42] Generate Billing Document only after batch QA release

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-42/strategy/CS-42-analysis.md
**Risk Profile:**     jira/userstories/CS-42/strategy/CS-42-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Billing Clerk
- **Business Object:** Billing Document (linked to Outbound Delivery, Batch, QA Status)
- **SAP Module:** SD — Sales & Distribution (with MM — Materials Management batch integration)
- **Business Goal:** Prevent invoicing customers for pharmaceutical products that may fail final QA inspection

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 3 | 3 | CRITICAL |
| Alternative Path (AP) | NOT APPLICABLE | 0 | 0 | N/A |
| Negative (NEG) | MANDATORY | 3 | 3 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 3 | 3 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 4 | 4 | MEDIUM |
| Integration (INT) | MANDATORY | 3 | 3 | HIGH |
| **TOTAL** | — | **16** | **16** | — |

**Rationale for coverage model:**
- **CRITICAL risk** story requires all scenario types (HP, NEG, ERR, EDGE, INT) to be MANDATORY
- **AP = NOT APPLICABLE** — billing is either allowed (after QA release) or blocked (before QA release); no alternative valid paths exist
- **Integration scenarios MANDATORY** — story has implicit multi-module dependencies (SD ↔ MM ↔ QA) that are CRITICAL to business process

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP) — 3 scenarios:**
1. **HP-01** (CRITICAL): Complete goods issue → all batches QA-released → automatic billing allowed → verify billing document created with QA traceability — ACs: AC-1, AC-2, AC-5, AC-6
2. **HP-02** (CRITICAL): Complete goods issue → all batches QA-released → manual billing → verify billing document created with QA traceability — ACs: AC-1, AC-2, AC-5, AC-6
3. **HP-03** (HIGH): Batch receives QA release → notification sent to Billing team → verify notification received — ACs: AC-4

**Negative (NEG) — 3 scenarios:**
1. **NEG-01** (CRITICAL): Attempt automatic billing when at least one batch is NOT QA-released (status = "Pending") → verify billing blocked with error message — ACs: AC-2, AC-3
2. **NEG-02** (CRITICAL): Attempt automatic billing when at least one batch is QA-rejected (status = "Rejected") → verify billing blocked with error message — ACs: AC-2, AC-3
3. **NEG-03** (CRITICAL): Attempt manual billing creation when at least one batch is NOT QA-released → verify billing document cannot be saved — ACs: AC-3, AC-5

**Error / Missing Field (ERR) — 3 scenarios:**
1. **ERR-01** (HIGH): Missing Delivery Number when attempting billing → verify error message — ACs: AC-1, AC-5
2. **ERR-02** (HIGH): Delivery without goods issue completed → verify billing blocked with appropriate status error — ACs: AC-1, AC-2
3. **ERR-03** (HIGH): Missing batch assignment on delivery line item → verify error during QA check — ACs: AC-2

**Edge Case / Boundary (EDGE) — 4 scenarios:**
1. **EDGE-01** (MEDIUM): Multiple batches in delivery (boundary: minimum = 1 batch all QA-released) → verify billing succeeds — ACs: AC-2, AC-5
2. **EDGE-02** (CRITICAL): Multiple batches in delivery (boundary: mix of released and pending) → verify billing blocked — ACs: AC-2, AC-3
3. **EDGE-03** (MEDIUM): Delivery with maximum allowed batch count, all QA-released → verify billing succeeds — ACs: AC-2, AC-5
4. **EDGE-04** (LOW): QA release date = current date (same day billing) → verify billing allowed and date logged — ACs: AC-6

**Integration (INT) — 3 scenarios:**
1. **INT-01** (CRITICAL): Batch QA status updated in MM module → verify SD billing block status updates in real-time — Integration: MM Batch Management → SD Billing
2. **INT-02** (HIGH): QA release event triggers notification workflow → verify notification reaches Billing team inbox/email — Integration: SD → Workflow System
3. **INT-03** (HIGH): Billing document created → verify QA release date and approver data copied from batch master — Integration: MM Batch Master → SD Billing Document

### Recommended Scenarios

None — all scenarios are MANDATORY due to CRITICAL risk level.

### Optional Scenarios

None.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 3 HP scenarios generated | YES |
| NEG Coverage | All 3 NEG scenarios generated | YES |
| ERR Coverage | All 3 ERR scenarios generated | YES |
| EDGE Coverage | All 4 EDGE TCs generated (exceeds minimum of 2) | YES |
| INT Coverage | All 3 INT scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values — all data must use {TD.*} placeholders | YES |
| Automation Eligibility | ≥ 8 TCs flagged as Automation Candidate: YES (50% of 16 TCs) | YES |

**Additional CRITICAL risk gates:**
| Additional Gate | Threshold |
|----------------|-----------|
| Negative coverage (entity validation) | 100% — NEG-01 (Pending batch), NEG-02 (Rejected batch), NEG-03 (manual billing block) |
| Error coverage (mandatory fields) | 100% — ERR-01 (Delivery Number), ERR-02 (Goods Issue Status), ERR-03 (Batch Number) |

**Overall pass threshold:** All mandatory gates must PASS. No recommended gates defined (all gates are mandatory).

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Billing document creation after QA release is the core business process — any failure blocks pharmaceutical invoicing |
| NEG (invalid entity) | HIGH | MAJOR | QA-based billing block is regulatory requirement (GxP) — system must prevent billing of unreleased batches |
| ERR (missing field) | HIGH | MAJOR | Missing delivery, goods issue status, or batch assignment prevents QA check — data integrity failure |
| EDGE (boundary) | MEDIUM | MINOR | Batch count boundaries and mixed status scenarios validate edge cases but do not block core path |
| AP (alternative) | N/A | N/A | Not applicable — no alternative paths in this story |
| INT (integration) | HIGH | MAJOR | Multi-module integration (SD ↔ MM ↔ QA) is critical — failures cascade across modules and breach regulatory traceability |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright — billing document creation is stable and repeatable |
| AP | N/A | Not applicable — no alternative paths |
| NEG | PARTIAL | QA status validation checks are stable, but require batch master data setup in SAP (Pending/Rejected statuses) |
| ERR | YES | Field-level validation stable — missing delivery, goods issue, batch assignment |
| EDGE | PARTIAL | Batch count boundaries require specific SAP configuration (multi-batch deliveries with controlled QA statuses) |
| INT | PARTIAL | Multi-module orchestration (MM batch status update → SD billing block update) requires careful timing and state management; notification workflow may require email/inbox verification |

**Target automation coverage:** 8 of 16 TCs (50%)
- **YES candidates (6 TCs):** HP-01, HP-02, HP-03, ERR-01, ERR-02, ERR-03
- **PARTIAL candidates (10 TCs):** NEG-01, NEG-02, NEG-03, EDGE-01, EDGE-02, EDGE-03, EDGE-04, INT-01, INT-02, INT-03

**Automation priority order:**
1. HP-01, HP-02 (CRITICAL — core billing after QA release)
2. NEG-01, NEG-02, NEG-03 (CRITICAL — regulatory compliance checks)
3. ERR-01, ERR-02, ERR-03 (HIGH — data validation)
4. EDGE-02 (CRITICAL — mixed batch status blocking)
5. INT-01, INT-02, INT-03 (HIGH — cross-module integration)
6. EDGE-01, EDGE-03, EDGE-04 (MEDIUM — boundary conditions)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-XXX: HP-01 — Automatic billing after all batches QA-released
  TC-CS-XXX: HP-02 — Manual billing after all batches QA-released
  TC-CS-XXX: NEG-01 — Billing blocked when batch status = Pending
  TC-CS-XXX: NEG-02 — Billing blocked when batch status = Rejected
  TC-CS-XXX: NEG-03 — Manual billing blocked when batch not released
  TC-CS-XXX: EDGE-02 — Billing blocked with mixed batch statuses

Priority 2 — HIGH (validate immediately after):
  TC-CS-XXX: HP-03 — Notification sent when batch QA-released
  TC-CS-XXX: ERR-01 — Missing Delivery Number error
  TC-CS-XXX: ERR-02 — Delivery without goods issue error
  TC-CS-XXX: ERR-03 — Missing batch assignment error

Priority 3 — MEDIUM (complete coverage):
  TC-CS-XXX: EDGE-01 — Single batch (minimum) all QA-released
  TC-CS-XXX: EDGE-03 — Maximum batch count all QA-released
  TC-CS-XXX: EDGE-04 — Same-day QA release and billing

Priority 4 — Integration (run after core stability confirmed):
  TC-CS-XXX: INT-01 — QA status update in MM syncs to SD billing block
  TC-CS-XXX: INT-02 — QA release triggers notification workflow
  TC-CS-XXX: INT-03 — QA data copied to billing document
```

**Execution dependency notes:**
- Execute HP-01, HP-02 first to establish baseline billing success after QA release
- NEG and ERR scenarios can run in parallel after HP baseline established
- INT scenarios depend on successful HP and NEG execution (require working QA-to-billing integration)

---

## Regulatory and Compliance Notes

**Pharmaceutical Industry (GxP) Requirements:**
- **QA release gating is a regulatory requirement** — billing documents must not be created for pharmaceutical products that have not passed final quality inspection
- **Traceability is mandatory** — QA release date and approver must be logged in billing document for audit purposes
- **Test data constraints:**
  - Use only test batch-managed materials (not production pharmaceutical products)
  - Use test customer accounts (not real customers)
  - Ensure test deliveries are isolated in dedicated SAP test client/environment
- **Authorization testing:**
  - Billing Clerk role must have authorization for billing document creation (VF01/VF04)
  - QA Approver role must have authorization for batch QA release (QM module)
  - Test execution must verify authorization failures if user lacks required permissions

**SAP S/4HANA Cloud Governance:**
- All test execution must use dedicated test system instances (not production)
- Billing documents created during testing must be reversed/deleted after test execution
- Batch QA status changes must be reverted to original state after integration testing
- Notification workflow testing must use test distribution lists (not production Billing team inbox)

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-42-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types (HP, NEG, ERR, EDGE, INT) — no scenario type is optional for CRITICAL risk stories
3. Apply quality gates table — verify all thresholds are met before completing:
   - 100% AC traceability (all 6 ACs covered)
   - All 16 TCs generated (3 HP + 3 NEG + 3 ERR + 4 EDGE + 3 INT)
   - 0 hardcoded values (all test data uses {TD.*} placeholders)
   - ≥ 8 TCs flagged as Automation Candidate: YES or PARTIAL
4. Use `prompts/testcase-generation-from-userstory.md` as the generation template
5. Flag automation candidates per the Automation Viability table above:
   - HP scenarios → YES
   - NEG, EDGE, INT scenarios → PARTIAL (require SAP master data setup)
   - ERR scenarios → YES (field validation stable)
6. Output files to:
   - `testcases/AI-generated testcases/CS-42/testcases/` (individual TC markdown files)
   - `testcases/AI-generated testcases/CS-42/CS-42-coverage-matrix.md` (traceability)
   - `testcases/AI-generated testcases/CS-42/CS-42-summary.json` (registry)
   - `testdata/CS-42/CS-42-testdata.json` (parameterized datasets)
   - `testdata/CS-42/CS-42-testdata-guide.md` (how to fill in real SAP values)
7. **Integration scenario notes:**
   - INT-01 requires MM Batch Management MCP exploration to update QA status and verify SD billing block update
   - INT-02 requires Workflow/Notification system verification (may be out of scope for Playwright automation)
   - INT-03 requires reading QA data from batch master (MCH1) and verifying copy to billing document fields
