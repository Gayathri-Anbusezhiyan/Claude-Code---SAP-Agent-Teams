# Test Strategy: [CS-19] Place A Specific Batch Of Raw Material On Quality Hold

**Created:**          2026-08-24
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-19/strategy/CS-19-analysis.md
**Risk Profile:**     jira/userstories/CS-19/strategy/CS-19-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Plant Manager
- **Business Object:** Material Batch, Stock Status, Batch Stock Transaction
- **SAP Module:** MM — Materials Management (Inventory Management / Quality Management submodule)
- **Business Goal:** Prevent further goods movements consuming a specific batch during deviation investigation by placing it on quality hold

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 3 | 3 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 1 | 1 | MEDIUM |
| Negative (NEG) | MANDATORY | 4 | 4 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 8 | 8 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 3 | 3 | MEDIUM |
| Integration (INT) | RECOMMENDED | 1 | 1 | HIGH |
| **TOTAL** | — | **20** | **20** | — |

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP) — 3 scenarios:**
- **HP-01:** Select batch and change status to "Blocked Stock" (Risk: CRITICAL, ACs: AC-1, AC-2, AC-3, AC-4)
- **HP-02:** Select batch and change status to "Quality Inspection Stock" (Risk: CRITICAL, ACs: AC-1, AC-2, AC-3, AC-4)
- **HP-03:** QA user releases batch hold, restoring to Unrestricted-Use stock (Risk: HIGH, ACs: AC-5)

**Negative (NEG) — 4 scenarios:**
- **NEG-01:** Attempt goods issue transaction against blocked batch (Risk: CRITICAL, ACs: AC-3)
- **NEG-02:** Attempt production order consumption against blocked batch (Risk: CRITICAL, ACs: AC-3)
- **NEG-03:** Unauthorized user attempts to release batch hold (Risk: HIGH, ACs: AC-5)
- **NEG-04:** Attempt to block batch with zero stock quantity (Risk: MEDIUM, ACs: AC-2)

**Error / Missing Field (ERR) — 8 scenarios:**
- **ERR-01:** Missing Material Number (Risk: HIGH, ACs: AC-2, Field: Material)
- **ERR-02:** Missing Batch Number (Risk: HIGH, ACs: AC-2, Field: Batch)
- **ERR-03:** Missing Plant (Risk: HIGH, ACs: AC-2, Field: Plant)
- **ERR-04:** Missing Storage Location (Risk: HIGH, ACs: AC-2, Field: Storage Location)
- **ERR-05:** Missing Reason Code (Risk: HIGH, ACs: AC-4, Field: Reason Code)
- **ERR-06:** Non-existent Material Number (Risk: MEDIUM, ACs: AC-2, Field: Material)
- **ERR-07:** Non-existent Batch Number (Risk: MEDIUM, ACs: AC-2, Field: Batch)
- **ERR-08:** Material not batch-managed (Risk: MEDIUM, ACs: AC-2, Field: Material)

**Edge Case / Boundary (EDGE) — 3 scenarios:**
- **EDGE-01:** Block batch with minimum valid stock quantity (0.001 UoM) (Risk: MEDIUM, ACs: AC-2, AC-3, Parameter: stockQuantity, Boundary: lower)
- **EDGE-02:** Block batch with maximum stock quantity (Risk: LOW, ACs: AC-2, AC-3, Parameter: stockQuantity, Boundary: upper)
- **EDGE-03:** Release hold on batch that was never blocked (Risk: MEDIUM, ACs: AC-5, Parameter: batchStatus, Boundary: invalid-state)

### Recommended Scenarios

**Alternative Path (AP) — 1 scenario:**
- **AP-01:** Block batch via "Batch Where-Used List" app (alternative navigation path) (Risk: MEDIUM, ACs: AC-1, AC-2)

**Integration (INT) — 1 scenario:**
- **INT-01:** Block batch used in active process order → notification sent to Production Planning (Risk: HIGH, ACs: AC-6)

### Optional Scenarios

None

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 3 HP scenarios generated | YES |
| NEG Coverage | All 4 NEG scenarios generated | YES |
| ERR Coverage | All 8 ERR scenarios generated | YES |
| EDGE Coverage | All 3 EDGE TCs generated | YES |
| INT Coverage | 1 INT TC generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 10 TCs flagged as Automation Candidate: YES | YES |

**Overall pass threshold:** All mandatory gates must PASS. At least 100% of recommended gates must PASS.

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Core quality management operation; failure allows consumption of defective material during deviation investigation |
| HP (QA release) | HIGH | MAJOR | Batch hold must be reversible by authorized QA personnel to restore material availability |
| NEG (blocked consumption) | CRITICAL | CRITICAL | Business rule enforcement failure = compliance violation; system must prevent goods issue/PO consumption on blocked batches |
| NEG (unauthorized release) | HIGH | MAJOR | Role-based authorization failure = security breach; only authorized QA users may release holds |
| ERR (missing mandatory field) | HIGH | MAJOR | Data integrity failure; mandatory fields (Material, Batch, Plant, SLoc, Reason) enforce regulatory compliance (GxP, ISO audit trail) |
| EDGE (boundary) | MEDIUM | MINOR | Boundary conditions (min/max stock quantity, invalid batch status) validate edge case handling but do not block core process |
| AP (alternative) | MEDIUM | MINOR | Alternative navigation path via "Batch Where-Used List" app provides flexibility but is not the primary workflow |
| INT (integration) | HIGH | MAJOR | Integration failure with Production Planning causes production disruption when active process orders are affected |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright; stable batch status change transactions with machine-verifiable outcomes (material document number, change log, stock status) |
| AP | YES | Alternative navigation path is stable and repeatable; data-driven via testdata JSON |
| NEG | PARTIAL | NEG-01 and NEG-02 (goods issue / PO consumption) require multi-app orchestration (Manage Stock → Goods Issue / Process Order app); NEG-03 (unauthorized) requires role switching; NEG-04 (zero stock) is YES |
| ERR | YES | Field-level validation is stable; error messages are predictable and machine-verifiable |
| EDGE | PARTIAL | EDGE-01/EDGE-02 (min/max quantity) require specific batch stock setup in SAP; EDGE-03 (invalid state) is YES |
| INT | NO | INT-01 requires active process order setup in PP module and verification of notification delivery to Production Planning; multi-session orchestration and manual PP configuration needed |

**Target automation coverage:** 14 of 20 TCs (70%)

**Fully automatable (14):** HP-01, HP-02, HP-03, AP-01, NEG-04, ERR-01 to ERR-08, EDGE-03

**Partially automatable (5):** NEG-01, NEG-02, NEG-03, EDGE-01, EDGE-02 (require manual SAP data setup or multi-app orchestration; scriptless MCP execution recommended)

**Not automatable (1):** INT-01 (requires manual PP module configuration and cross-module verification)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  HP-01: Block batch (Blocked Stock status)
  HP-02: Block batch (Quality Inspection status)
  NEG-01: Attempt goods issue against blocked batch
  NEG-02: Attempt production order consumption against blocked batch

Priority 2 — HIGH (validate immediately after):
  HP-03: QA user releases batch hold
  NEG-03: Unauthorized user attempts to release batch hold
  ERR-01: Missing Material Number
  ERR-02: Missing Batch Number
  ERR-03: Missing Plant
  ERR-04: Missing Storage Location
  ERR-05: Missing Reason Code
  ERR-06: Non-existent Material Number
  ERR-07: Non-existent Batch Number
  ERR-08: Material not batch-managed
  INT-01: Notification to Production Planning when batch in active PO is blocked

Priority 3 — MEDIUM (complete coverage):
  AP-01: Block batch via Batch Where-Used List app
  NEG-04: Attempt to block batch with zero stock
  EDGE-01: Block batch with minimum stock quantity
  EDGE-02: Block batch with maximum stock quantity
  EDGE-03: Release hold on batch that was never blocked
```

---

## Regulatory and Compliance Notes

**Materials Management (MM) — Quality Hold Process:**
- Batch stock blocking is a regulated operation in industries subject to GxP (Good Manufacturing Practice), ISO 9001, and FDA 21 CFR Part 11 compliance
- Test cases must verify that the audit trail (change log) captures: user ID, timestamp, old status, new status, and reason code — all are mandatory for regulatory compliance
- Blocked batches must be physically segregated in the warehouse; test cases validate logical blocking in SAP but do not verify physical segregation (manual inspection required)
- Quality Inspection stock status may trigger automatic inspection lot creation in SAP QM module; ensure test system has QM integration configured if AC-6 verification is required
- All test execution must use dedicated test system instances (not production) with test master data (batch-managed materials, dummy batches, test plants/storage locations)
- Test data must not use real production material numbers, batch numbers, or vendor IDs
- Ensure Segregation of Duties (SOD) authorization requirements are correctly configured: Plant Manager role for batch blocking, QA Manager role for batch release (AC-5)

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-19-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first: HP (3), NEG (4), ERR (8), EDGE (3)
3. Generate RECOMMENDED types: AP (1), INT (1)
4. Apply quality gates table — verify all thresholds are met before completing:
   - 100% AC traceability (all 6 ACs covered)
   - 3 HP TCs generated
   - 4 NEG TCs generated
   - 8 ERR TCs generated
   - 3 EDGE TCs generated
   - 1 INT TC generated
   - 0 hardcoded SAP values (all data parameterized via `{TD.*}` placeholders)
   - ≥ 10 TCs flagged as Automation Candidate: YES
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above:
   - YES: HP-01, HP-02, HP-03, AP-01, NEG-04, ERR-01 to ERR-08, EDGE-03 (14 TCs)
   - PARTIAL: NEG-01, NEG-02, NEG-03, EDGE-01, EDGE-02 (5 TCs)
   - NO: INT-01 (1 TC)
7. Output files to `testcases/AI-generated testcases/CS-19/` and `testdata/CS-19/`
8. Test data JSON must include parameters for:
   - Material Number (batch-managed material)
   - Batch Number (existing batch with stock > 0)
   - Plant, Storage Location
   - Stock Type (Blocked Stock, Quality Inspection Stock)
   - Reason Code (e.g., DEVINV for deviation investigation)
   - Invalid values for ERR scenarios (non-existent Material, non-existent Batch, non-batch-managed Material)
   - Boundary values for EDGE scenarios (min stock quantity: 0.001, max stock quantity: 999999999.999, zero stock: 0)
   - Process Order Number for INT-01 (active PO consuming the batch)
