# Test Strategy: [CS-36] Place automatic S&D block on recalled batch

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-36/strategy/CS-36-analysis.md
**Risk Profile:**     jira/userstories/CS-36/strategy/CS-36-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Quality Assurance Manager
- **Business Object:** Batch (CHARG), Stock (MCHB), S&D Block, Sales Order, Outbound Delivery
- **SAP Module:** MM/QM/SD — Materials Management / Quality Management / Sales & Distribution (cross-module integration)
- **Business Goal:** Prevent further sales orders or deliveries for recalled batches until recall is resolved — ensuring product safety compliance and regulatory adherence

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 2 | 2 | CRITICAL |
| Alternative Path (AP) | MANDATORY | 4 | 4 | CRITICAL |
| Negative (NEG) | MANDATORY | 4 | 4 | CRITICAL |
| Error / Missing Field (ERR) | MANDATORY | 3 | 3 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 3 | 3 | MEDIUM |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | N/A |
| **TOTAL** | — | **16** | **16** | — |

**Note on Coverage Model:**
- This CRITICAL-risk story requires MANDATORY coverage across all applicable scenario types
- All APs are CRITICAL risk because partial S&D block application or incomplete transaction blocking creates immediate product safety risk
- Integration scenarios are covered implicitly via AP and NEG scenarios (cross-module validation embedded)
- No linked Jira issues, but cross-module integration complexity (MM/QM/SD) requires rigorous testing

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios — Happy Path (HP)

| ID | Description | Risk | ACs Covered | Automation Candidate |
|----|-------------|------|-------------|---------------------|
| HP-01 | Mark batch as recalled via batch master → S&D block applied → verify block flag set | CRITICAL | AC-1, AC-2, AC-6 | YES |
| HP-02 | Stakeholder notification sent successfully to all roles | HIGH | AC-6 | PARTIAL |

### Mandatory Scenarios — Alternative Path (AP)

| ID | Description | Risk | ACs Covered | Automation Candidate |
|----|-------------|------|-------------|---------------------|
| AP-01 | Batch exists in multiple plants → S&D block applied to all plants | CRITICAL | AC-2 | YES |
| AP-02 | Batch exists in multiple storage locations within plant → S&D block applied to all storage locations | CRITICAL | AC-2 | YES |
| AP-03 | Existing open Sales Order contains recalled batch → SO release blocked | CRITICAL | AC-4 | YES |
| AP-04 | Existing open Delivery contains recalled batch → picking/GI blocked | CRITICAL | AC-5 | YES |

### Mandatory Scenarios — Negative (NEG)

| ID | Description | Risk | ACs Covered | Automation Candidate |
|----|-------------|------|-------------|---------------------|
| NEG-01 | Attempt to create new Sales Order with recalled batch → system rejects with error | CRITICAL | AC-3 | YES |
| NEG-02 | Attempt to release existing Sales Order with recalled batch → system rejects with error | CRITICAL | AC-4 | YES |
| NEG-03 | Attempt to pick/post goods issue for Delivery with recalled batch → system rejects with error | CRITICAL | AC-5 | YES |
| NEG-04 | Mark non-existent batch as recalled → system rejects with error | HIGH | AC-1 | YES |

### Mandatory Scenarios — Error / Missing Field (ERR)

| ID | Description | Risk | Field | ACs Covered | Automation Candidate |
|----|-------------|------|-------|-------------|---------------------|
| ERR-01 | Missing Batch Number field → system prevents recall trigger | HIGH | Batch Number | AC-1 | YES |
| ERR-02 | Missing Material Number field → system prevents recall trigger | HIGH | Material Number | AC-1 | YES |
| ERR-03 | Missing Plant field → system prevents recall trigger | HIGH | Plant | AC-1 | YES |

### Mandatory Scenarios — Edge Case / Boundary (EDGE)

| ID | Description | Risk | Parameter | ACs Covered | Automation Candidate |
|----|-------------|------|-----------|-------------|---------------------|
| EDGE-01 | Batch has zero unrestricted stock → no S&D block needed (informational message) | MEDIUM | Stock Quantity (zero) | AC-2 | YES |
| EDGE-02 | Batch already has existing S&D block → system confirms re-application or skips | MEDIUM | Block Status (existing) | AC-2 | PARTIAL |
| EDGE-03 | Batch has stock in restricted or blocked status only (no unrestricted) → no S&D block applied | MEDIUM | Stock Type (restricted-only) | AC-2 | YES |

### Integration Scenarios (INT)

None explicitly required — cross-module validation is embedded in AP and NEG scenarios above.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 2 HP scenarios generated | YES |
| AP Coverage | All 4 AP scenarios generated | YES |
| NEG Coverage | All 4 NEG scenarios generated | YES |
| ERR Coverage | All 3 ERR scenarios generated | YES |
| EDGE Coverage | All 3 EDGE scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 12 TCs flagged as Automation Candidate: YES | YES |

**Overall pass threshold:** All mandatory gates must PASS. Given the CRITICAL risk level, no exceptions are permitted.

**Additional CRITICAL-risk requirements:**
- Each validation AC (AC-3, AC-4, AC-5) must have at least 1 NEG test case that validates the specific error message
- AC-2 (S&D block propagation) must be validated across multi-plant and multi-storage-location scenarios (AP-01, AP-02)
- Each mandatory field (Batch, Material, Plant) must have 1 ERR test case

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core recall + block) | CRITICAL | CRITICAL | Core product safety transaction — failure allows unsafe product shipment |
| HP (notification) | HIGH | MAJOR | Critical stakeholder communication — delays in notification can cause downstream issues |
| AP (multi-plant/storage) | CRITICAL | CRITICAL | Partial block application is a critical failure — recalled product could ship from unblocked location |
| AP (existing SO/Delivery block) | CRITICAL | CRITICAL | Prevents in-flight transactions from processing recalled product — last line of defense |
| NEG (new SO creation block) | CRITICAL | CRITICAL | Prevents new orders for recalled product — primary preventive control |
| NEG (existing SO release block) | CRITICAL | CRITICAL | State transition validation — ensures blocked orders cannot progress |
| NEG (delivery picking/GI block) | CRITICAL | CRITICAL | Warehouse execution validation — prevents physical shipment |
| NEG (invalid batch) | HIGH | MAJOR | Master data validation — prevents system errors |
| ERR (missing mandatory fields) | HIGH | MAJOR | Data integrity — ensures recall cannot be triggered with incomplete information |
| EDGE (zero stock) | MEDIUM | MINOR | Edge case handling — system should gracefully handle no-stock scenario |
| EDGE (existing block) | MEDIUM | MINOR | Idempotency validation — system should handle re-application correctly |
| EDGE (restricted stock only) | MEDIUM | MINOR | Stock type validation — ensures only unrestricted stock is blocked |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright — stable recall transaction and block verification |
| AP | YES | Data-driven via testdata JSON — multi-plant/storage location scenarios can be parameterized |
| NEG | YES | Stable validation checks — error messages are consistent across SAP |
| ERR | YES | Field-level validation is stable — mandatory field checks do not vary by config |
| EDGE | YES / PARTIAL | EDGE-01 and EDGE-03 are automatable (data-driven stock scenarios). EDGE-02 may require manual setup if block pre-exists. |
| INT | N/A | No explicit INT scenarios — cross-module validation embedded in AP/NEG |

**Target automation coverage:** 14 of 16 TCs (87.5%)
- 2 TCs marked PARTIAL (HP-02 notification verification, EDGE-02 existing block) — may require manual verification steps

**Automation considerations:**
- Batch recall transaction may vary by SAP app (batch master, quality notification, or dedicated recall app) — test strategy assumes batch master or Manage Batches Fiori app
- S&D block verification requires querying batch stock tables (MCHB field VMCHB) or verifying via display batch stock screen
- SO and Delivery blocking validation requires creating pre-existing open documents — setup automation needed
- Notification verification (HP-02) may require workflow inbox or email checking — mark as PARTIAL if automation cannot access notification logs

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-036 (HP-01) — Mark batch as recalled → S&D block applied
  TC-CS-037 (AP-01) — Multi-plant S&D block propagation
  TC-CS-038 (AP-02) — Multi-storage location S&D block propagation
  TC-CS-039 (NEG-01) — New SO creation with recalled batch blocked
  TC-CS-040 (NEG-02) — Existing SO release with recalled batch blocked
  TC-CS-041 (NEG-03) — Delivery picking/GI with recalled batch blocked
  TC-CS-042 (AP-03) — Existing open SO contains recalled batch → block verified
  TC-CS-043 (AP-04) — Existing open Delivery contains recalled batch → block verified

Priority 2 — HIGH (validate immediately after):
  TC-CS-044 (HP-02) — Stakeholder notification sent successfully
  TC-CS-045 (NEG-04) — Non-existent batch recall rejected
  TC-CS-046 (ERR-01) — Missing Batch Number field
  TC-CS-047 (ERR-02) — Missing Material Number field
  TC-CS-048 (ERR-03) — Missing Plant field

Priority 3 — MEDIUM (complete coverage):
  TC-CS-049 (EDGE-01) — Zero unrestricted stock (no block needed)
  TC-CS-050 (EDGE-02) — Existing S&D block (idempotency)
  TC-CS-051 (EDGE-03) — Restricted stock only (no unrestricted stock)

Priority 4 — Integration (run after core stability confirmed):
  None (cross-module validation embedded in Priority 1 and 2 scenarios)
```

**Execution dependencies:**
- AP-03 and AP-04 require pre-existing open Sales Orders and Deliveries in the test system — setup scripts must create these before test execution
- All scenarios require valid batch master data with stock in test system — setup data creation is prerequisite

---

## Regulatory and Compliance Notes

**Product Safety and Recall Compliance:**
- Batch recall functionality is subject to regulatory requirements (FDA, EU MDR, ISO 13485 for medical devices; food safety regulations for consumables)
- Test execution must verify that S&D block is **immediately** and **completely** applied — partial or delayed blocking is a critical compliance failure
- All test cases validating block enforcement (NEG-01, NEG-02, NEG-03, AP-01, AP-02) are compliance-critical and cannot be downgraded or skipped
- Ensure test data does not use real production batch numbers — use dedicated test batches only
- Test execution must use dedicated test system instances (not production) — batch recall in production requires actual recall procedures

**SAP Authorization Requirements:**
- Test users must have authorization object Q_CHARG (batch maintenance) with activity "Recall" or "Block"
- Test users must have SD authorization to create Sales Orders (VA01/VA03) and Deliveries (VL01N/VL02N) for validation scenarios
- Test users must have MM authorization to view batch stock (MB53, MMBE) for S&D block verification

**Data Governance:**
- Test data must include batches with unrestricted stock across multiple plants and storage locations for AP scenarios
- Pre-existing Sales Orders and Deliveries must be in "open" status (not completed or canceled) for block validation
- All test execution results must be documented for audit trail purposes (compliance requirement for regulated industries)

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-36-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types — no exceptions permitted for CRITICAL-risk story
3. All 16 test cases must be generated (HP:2 + AP:4 + NEG:4 + ERR:3 + EDGE:3)
4. Apply quality gates table — verify all thresholds are met before completing
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above (14 YES, 2 PARTIAL)
7. Output files to `testcases/AI-generated testcases/CS-36/` and `testdata/CS-36/`
8. Ensure all test data uses `{{PLACEHOLDER}}` syntax in JSON and `{TD.*}` in test steps — no hardcoded SAP values
9. Each test case must include explicit verification steps for S&D block status (MCHB-VMCHB field or display screen check)
10. NEG test cases must include exact expected error message text (to be captured during scriptless execution)
11. AP-03 and AP-04 test cases must include setup steps or precondition notes for creating pre-existing open Sales Orders and Deliveries
12. HP-02 notification test case should document notification verification method (workflow inbox, email, or SAP alert mechanism)

**Critical validation requirements:**
- Every test case covering AC-2 (S&D block application) must include a verification step that checks the block flag is set
- Every NEG test case must include assertion on specific error message preventing the blocked action
- Test data must include batch numbers with sufficient stock across multiple plants and storage locations for AP scenarios
