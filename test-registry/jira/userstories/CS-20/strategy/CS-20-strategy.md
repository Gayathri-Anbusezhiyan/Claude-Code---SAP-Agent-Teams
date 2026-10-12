# Test Strategy: [CS-20] Create A Purchase Requisition That Automatically Routes For Approval B

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-20/strategy/CS-20-analysis.md
**Risk Profile:**     jira/userstories/CS-20/strategy/CS-20-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Procurement Officer
- **Business Object:** Purchase Requisition (with Release Strategy / Approval Workflow)
- **SAP Module:** MM — Materials Management
- **Business Goal:** Ensure spend on GMP-critical materials receives appropriate management sign-off before PO creation

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 2 | 2 | CRITICAL |
| Alternative Path (AP) | MANDATORY | 2 | 2 | HIGH |
| Negative (NEG) | MANDATORY | 3 | 3 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 4 | 4 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 4 | 4 | MEDIUM |
| Integration (INT) | MANDATORY | 3 | 3 | HIGH |
| **TOTAL** | — | **18** | **18** | — |

**Rationale for CRITICAL risk coverage:**
- All scenario types are MANDATORY because story contains multiple CRITICAL-risk acceptance criteria (AC-2: automatic approval routing, AC-3: PO conversion gate enforcement)
- HP scenarios cover core requisition creation with single-level and multi-level approval workflows
- AP scenarios cover valid alternative outcomes (send back for revision, partial approval states)
- NEG scenarios validate business rule enforcement (invalid material, premature PO conversion, rejection handling)
- ERR scenarios ensure all 4 mandatory fields are enforced
- EDGE scenarios test approval threshold boundaries and input range limits
- INT scenarios validate Fiori integration points (My Inbox, notification delivery)

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios — Happy Path (HP)

| ID | Description | Risk Level | ACs Covered |
|----|-------------|-----------|-------------|
| HP-01 | Create PR below approval threshold (no release strategy required) or single-level approval (e.g., manager only) | CRITICAL | AC-1, AC-2, AC-3, AC-5, AC-6 |
| HP-02 | Create PR requiring multi-level approval (high-value GMP-critical material) | CRITICAL | AC-1, AC-2, AC-3, AC-4, AC-5, AC-6 |

### Mandatory Scenarios — Alternative Path (AP)

| ID | Description | Risk Level | ACs Covered |
|----|-------------|-----------|-------------|
| AP-01 | Approver sends PR back for revision | HIGH | AC-4, AC-5, AC-6 |
| AP-02 | Multi-step approval chain (first approver approves, second approver pending) | HIGH | AC-4, AC-5 |

### Mandatory Scenarios — Negative (NEG)

| ID | Description | Risk Level | ACs Covered |
|----|-------------|-----------|-------------|
| NEG-01 | Invalid material type (material does not exist in plant) | HIGH | AC-2 |
| NEG-02 | Attempt to convert PR to PO before all approvals completed | CRITICAL | AC-3 |
| NEG-03 | Approver rejects PR | HIGH | AC-4, AC-5, AC-6 |

### Mandatory Scenarios — Error / Missing Field (ERR)

| ID | Description | Risk Level | Field | ACs Covered |
|----|-------------|-----------|-------|-------------|
| ERR-01 | Missing Material field | HIGH | Material | AC-1 |
| ERR-02 | Missing Quantity field | HIGH | Quantity | AC-1 |
| ERR-03 | Missing Plant field | HIGH | Plant | AC-1 |
| ERR-04 | Missing Delivery Date field | HIGH | Delivery Date | AC-1 |

### Mandatory Scenarios — Edge Case / Boundary (EDGE)

| ID | Description | Risk Level | Parameter | ACs Covered |
|----|-------------|-----------|-----------|-------------|
| EDGE-01 | PR total value exactly at approval threshold boundary (e.g., $10,000.00) | MEDIUM | totalValue | AC-2 |
| EDGE-02 | Minimum quantity boundary (quantity = 1) | MEDIUM | quantity | AC-1 |
| EDGE-03 | Zero price per unit (price = 0) | MEDIUM | price | AC-2 |
| EDGE-04 | Delivery date = today + 1 day (minimum lead time) | LOW | deliveryDate | AC-1 |

### Mandatory Scenarios — Integration (INT)

| ID | Description | Risk Level | ACs Covered |
|----|-------------|-----------|-------------|
| INT-01 | Fiori My Inbox task creation and delivery to approver | HIGH | AC-4 |
| INT-02 | Notification delivery to requisitioner (approval complete) | MEDIUM | AC-6 |
| INT-03 | Notification delivery to requisitioner (rejection) | MEDIUM | AC-6 |

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 2 HP scenarios generated | YES |
| AP Coverage | All 2 AP scenarios generated | YES |
| NEG Coverage | All 3 NEG scenarios generated | YES |
| ERR Coverage | All 4 ERR scenarios generated | YES |
| EDGE Coverage | All 4 EDGE TCs generated | YES |
| INT Coverage | All 3 INT scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 9 TCs flagged as Automation Candidate: YES (50% of total) | YES |

**Overall pass threshold:** All mandatory gates must PASS. All gates listed above are mandatory for CRITICAL risk stories.

**Additional CRITICAL-risk gates:**
- Negative coverage (entity validation): 100% — NEG-01 (invalid material) generated
- Error coverage (mandatory fields): 100% — 4 ERR TCs generated (one per mandatory field: Material, Quantity, Plant, Delivery Date)
- Approval workflow coverage: 100% — Both single-level (HP-01) and multi-level (HP-02) approval paths tested
- Approval gate enforcement: 100% — NEG-02 (premature PO conversion blocked) generated

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Purchase Requisition creation with automatic approval routing is the primary business transaction. Failure blocks procurement process and creates compliance risk. |
| AP (alternative outcomes) | HIGH | MAJOR | Valid approval workflow outcomes (send back, partial approval) are part of normal business operations. Failure disrupts approval process but does not block PR creation. |
| NEG (invalid entity) | HIGH | MAJOR | Invalid material detection prevents incorrect requisitions from entering approval workflow. Failure = data integrity breach. |
| NEG (approval gate) | CRITICAL | CRITICAL | PO conversion gate enforcement (NEG-02) is financial control mechanism. Failure = compliance violation and unauthorized spend. |
| NEG (rejection) | HIGH | MAJOR | Rejection handling is standard approval outcome. Failure = notification and status visibility issues. |
| ERR (missing mandatory field) | HIGH | MAJOR | Mandatory field validation prevents incomplete requisitions. Failure = data quality degradation. |
| EDGE (boundary value) | MEDIUM | MINOR | Approval threshold boundaries and input range limits are important for correct workflow assignment but less critical than core transaction paths. |
| INT (Fiori integration) | HIGH | MAJOR | Fiori My Inbox and notification delivery are essential for approval workflow visibility and approver awareness. Failure = delayed approvals and poor user experience. |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright. Single-level and multi-level approval workflows can be automated with approver login fixtures. |
| AP | PARTIAL | Send-back and partial-approval scenarios require approver role switching. Scriptless execution recommended initially; script generation viable if multi-session orchestration is implemented. |
| NEG | YES | Stable validation checks. Invalid material detection and PO conversion gate enforcement are machine-verifiable with exact error message assertions. |
| ERR | YES | Field-level validation stable. Missing mandatory field errors are consistent across SAP releases. |
| EDGE | PARTIAL | Approval threshold boundary testing (EDGE-01) requires SAP release strategy configuration visibility. Min quantity, zero price, and min delivery date are automatable. |
| INT | PARTIAL | Fiori My Inbox task creation (INT-01) requires approver login session and My Inbox app navigation. Notification delivery (INT-02, INT-03) may require email/Fiori notification checking (external to main app flow). Scriptless execution recommended for validation; script generation viable for task creation only. |

**Target automation coverage:** 11 of 18 TCs (61%)
- Fully automatable (YES): HP (2) + NEG (3) + ERR (4) = 9 TCs
- Partially automatable (PARTIAL): AP (2) + EDGE (1 of 4) + INT (1 of 3) = 2 TCs selected for automation = 11 total
- Recommended for scriptless only: AP (send-back requires workflow restart), EDGE-01 (threshold boundary requires config inspection), INT-02/03 (notification delivery checking)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-021: HP-01 — Create PR with single-level or no approval
  TC-CS-022: HP-02 — Create PR with multi-level approval (high-value GMP-critical material)
  TC-CS-026: NEG-02 — Attempt to convert PR to PO before all approvals completed

Priority 2 — HIGH (validate immediately after):
  TC-CS-025: NEG-01 — Invalid material type (material does not exist in plant)
  TC-CS-027: NEG-03 — Approver rejects PR
  TC-CS-028: ERR-01 — Missing Material field
  TC-CS-029: ERR-02 — Missing Quantity field
  TC-CS-030: ERR-03 — Missing Plant field
  TC-CS-031: ERR-04 — Missing Delivery Date field
  TC-CS-023: AP-01 — Approver sends PR back for revision
  TC-CS-024: AP-02 — Multi-step approval chain (partial release)
  TC-CS-036: INT-01 — Fiori My Inbox task creation and delivery

Priority 3 — MEDIUM (complete coverage):
  TC-CS-032: EDGE-01 — PR total value at approval threshold boundary
  TC-CS-033: EDGE-02 — Minimum quantity boundary (quantity = 1)
  TC-CS-034: EDGE-03 — Zero price per unit (price = 0)
  TC-CS-035: EDGE-04 — Delivery date = today + 1 day (minimum lead time)

Priority 4 — Integration (run after core stability confirmed):
  TC-CS-037: INT-02 — Notification delivery to requisitioner (approval complete)
  TC-CS-038: INT-03 — Notification delivery to requisitioner (rejection)
```

**Execution dependencies:**
- NEG-02 (PO conversion gate) depends on HP-01 or HP-02 having created a PR that is not yet fully approved
- AP-01 (send back) and AP-02 (partial approval) depend on HP-02 (multi-level approval PR) being created first
- INT-01 depends on HP-02 (multi-level approval PR) triggering task creation
- INT-02 depends on HP-01 or HP-02 completing full approval cycle
- INT-03 depends on NEG-03 (rejection) being executed by approver

---

## Regulatory and Compliance Notes

**SAP MM Purchase Requisition — Regulatory Context:**
- Purchase Requisitions with approval workflows are subject to internal financial control policies and may fall under SOX (Sarbanes-Oxley) compliance requirements if the organization is publicly traded
- Release strategies based on spend thresholds implement segregation of duties (SoD) controls — test cases must verify that approval gates cannot be bypassed
- GMP-critical materials (referenced in story description) suggest pharmaceutical or life sciences domain — requisitions for such materials may require additional regulatory traceability (FDA 21 CFR Part 11 compliance for electronic records and signatures)
- Test data must not use real production vendor IDs, material IDs, or approver identities
- All test execution must occur in dedicated SAP development or quality assurance client (not production)
- Approval workflow configuration (release strategy determination) is tenant-specific — test data must be validated against the SAP S/4HANA Cloud tenant being tested (my426318.s4hana.cloud.sap)

**Test Data Governance:**
- Do NOT use real GMP-critical material IDs from production systems
- Approver user accounts for testing must have appropriate authorization objects (M_EINK_FRG) but should be test-specific accounts, not production approver IDs
- PR documents created during testing should be flagged as test data (if tenant supports test data flagging) or deleted after test execution completes

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-20-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types (all 6 types are mandatory for this CRITICAL-risk story):
   - HP: 2 TCs (HP-01, HP-02)
   - AP: 2 TCs (AP-01, AP-02)
   - NEG: 3 TCs (NEG-01, NEG-02, NEG-03)
   - ERR: 4 TCs (ERR-01, ERR-02, ERR-03, ERR-04)
   - EDGE: 4 TCs (EDGE-01, EDGE-02, EDGE-03, EDGE-04)
   - INT: 3 TCs (INT-01, INT-02, INT-03)
3. Apply quality gates table — verify all thresholds are met before completing:
   - 100% AC traceability (all 6 ACs must appear in at least one TC's "ACs Validated" section)
   - 100% coverage of all scenario types (18 TCs total)
   - 0 hardcoded values (all test data must use `{TD.*}` placeholders)
   - ≥ 9 TCs flagged as "Automation Candidate: YES"
4. Use `prompts/testcase-generation-from-userstory.md` as the generation template
5. Flag automation candidates per the Automation Viability table:
   - HP-01, HP-02: YES
   - AP-01, AP-02: PARTIAL (mark as NO initially; recommend scriptless execution)
   - NEG-01, NEG-02, NEG-03: YES
   - ERR-01, ERR-02, ERR-03, ERR-04: YES
   - EDGE-01: NO (requires config inspection)
   - EDGE-02, EDGE-03, EDGE-04: YES
   - INT-01: PARTIAL (mark as YES for task creation part)
   - INT-02, INT-03: NO (notification delivery checking is external)
6. Assign priorities per Test Case Priority Assignment table:
   - HP-01, HP-02, NEG-02: CRITICAL
   - AP-01, AP-02, NEG-01, NEG-03, ERR-01 to ERR-04, INT-01: HIGH
   - EDGE-01 to EDGE-04, INT-02, INT-03: MEDIUM
7. Output files to:
   - `testcases/AI-generated testcases/CS-20/testcases/TC-CS-{NNN}.md` (18 individual TC files)
   - `testcases/AI-generated testcases/CS-20/CS-20-coverage-matrix.md` (traceability matrix)
   - `testcases/AI-generated testcases/CS-20/CS-20-summary.json` (machine-readable registry)
   - `testdata/CS-20/CS-20-testdata.json` (parameterized datasets with `{{PLACEHOLDER}}` syntax)
   - `testdata/CS-20/CS-20-testdata-guide.md` (guide for resolving placeholders)
8. Test case IDs: Start from TC-CS-021 (previous story CS-19 ended at TC-CS-020; if CS-19 does not exist or ended at different number, query project memory or inspect testcases/ folder for last used ID)
