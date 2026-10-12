# Test Strategy: [CS-64] Review A Batch Release Dashboard Showing All Batches Pending Final Qa

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-64/strategy/CS-64-analysis.md
**Risk Profile:**     jira/userstories/CS-64/strategy/CS-64-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** QA Manager
- **Business Object:** Batch, Quality Inspection, Process Order, Batch Record, Stock Status
- **SAP Module:** PP/QM — Production Planning & Quality Management
- **Business Goal:** Prioritize review activities and prevent unreleased batches from causing distribution delays

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 3 | 3 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 3 | 3 | HIGH |
| Negative (NEG) | MANDATORY | 3 | 3 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 2 | 2 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 4 | 4 | MEDIUM |
| Integration (INT) | MANDATORY | 3 | 3 | HIGH |
| **TOTAL** | — | **18** | **18** | — |

**Risk-based adjustment rationale:**
- CRITICAL overall risk → all scenario types are MANDATORY (including AP and EDGE)
- AC-2, AC-5, AC-6 are CRITICAL → HP, AP (disposition variants), NEG, and INT must have 100% coverage
- Multi-module integration (PP → QM → MM → SD) → INT scenarios are mandatory
- Ship date priority logic requires comprehensive EDGE coverage (past, today, future boundaries)
- Batch disposition workflow is legally binding quality decision → ERR scenarios mandatory for all disposition fields

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP):**
1. **HP-01** — Access Batch Release Dashboard and view batches in QI status with days pending and process orders — Risk: CRITICAL — ACs: AC-1, AC-2
2. **HP-02** — Drill down into a batch with open deviations, review compiled batch record, and return to dashboard — Risk: HIGH — ACs: AC-3
3. **HP-03** — Identify a batch approaching customer ship date (highlighted), record Release disposition, verify stock status updated to Unrestricted — Risk: CRITICAL — ACs: AC-2, AC-4, AC-5, AC-6

**Alternative Path (AP):**
1. **AP-01** — Record Reject disposition on a batch, verify stock status remains Blocked — Risk: CRITICAL — ACs: AC-5, AC-6
2. **AP-02** — Record Rework disposition on a batch, verify stock status remains in Quality Inspection — Risk: HIGH — ACs: AC-5, AC-6
3. **AP-03** — Drill down into a batch with no open deviations, confirm empty deviation list — Risk: MEDIUM — ACs: AC-3

**Negative (NEG):**
1. **NEG-01** — Access dashboard when no batches are in Quality Inspection status — verify empty state message — Risk: MEDIUM — ACs: AC-2
2. **NEG-02** — Select a batch with no associated customer ship date — verify no priority highlight — Risk: HIGH — ACs: AC-4
3. **NEG-03** — Attempt disposition action without selecting a batch — verify validation error — Risk: HIGH — ACs: AC-5

**Error / Missing Field (ERR):**
1. **ERR-01** — Missing Batch Number for drill-down — Risk: HIGH — ACs: AC-3
2. **ERR-02** — Missing Disposition selection when attempting to record — Risk: CRITICAL — ACs: AC-5

**Edge Case / Boundary (EDGE):**
1. **EDGE-01** — Batch with 0 days pending (just entered QI status today) — verify days pending = 0 — Risk: MEDIUM — ACs: AC-2
2. **EDGE-02** — Batch with ship date in the past (overdue) — verify highest priority highlight — Risk: HIGH — ACs: AC-4
3. **EDGE-03** — Batch with ship date = today — verify immediate priority highlight — Risk: HIGH — ACs: AC-4
4. **EDGE-04** — Batch with ship date far in future (30+ days) — verify no priority highlight — Risk: LOW — ACs: AC-4

**Integration (INT):**
1. **INT-01** — Verify Released batch becomes available in SD for sales order picking — Risk: CRITICAL — ACs: AC-6 — Integration: QM → MM → SD
2. **INT-02** — Verify Rejected batch is excluded from SD available-to-promise (ATP) — Risk: CRITICAL — ACs: AC-6 — Integration: QM → MM → SD
3. **INT-03** — Verify process order linkage displayed correctly for batches created via production order — Risk: HIGH — ACs: AC-2 — Integration: PP → QM

### Recommended Scenarios

None — all scenarios are MANDATORY due to CRITICAL risk level.

### Optional Scenarios

None — all scenarios are MANDATORY due to CRITICAL risk level.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 3 HP scenarios generated | YES |
| AP Coverage | All 3 AP scenarios generated | YES |
| NEG Coverage | All 3 NEG scenarios generated | YES |
| ERR Coverage | All 2 ERR scenarios generated | YES |
| EDGE Coverage | All 4 EDGE TCs generated (all ship date boundaries) | YES |
| INT Coverage | All 3 INT scenarios generated (PP→QM, QM→MM→SD) | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 12 TCs flagged as Automation Candidate: YES | YES |

**CRITICAL-risk additional gates:**
- **Negative coverage (entity validation):** 100% — one NEG per named entity that can be invalid (batch selection, ship date presence, empty dashboard state) ✓ (NEG-01, NEG-02, NEG-03 cover all)
- **Error coverage (mandatory fields):** 100% — one ERR per mandatory field in ACs (Batch Number, Disposition) ✓ (ERR-01, ERR-02 cover all)
- **Stock status update verification:** Every disposition scenario (HP-03, AP-01, AP-02, INT-01, INT-02) must assert final stock status value

**Overall pass threshold:** All 12 mandatory gates must PASS. No recommended gates defined for CRITICAL risk stories.

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Dashboard access and Release disposition are core QA workflows; failure blocks all quality release operations |
| HP (drill-down) | HIGH | MAJOR | Batch record visibility required for informed QA decisions; missing data risks compliance |
| AP (Reject/Rework) | CRITICAL | CRITICAL | Alternative disposition outcomes are equally critical to Release — blocking or reworking batches affects production planning |
| NEG (invalid entity) | HIGH | MAJOR | Empty dashboard state and missing ship dates must be handled gracefully; no process-blocking impact |
| ERR (missing field) | CRITICAL | CRITICAL | Missing batch or disposition selection prevents workflow execution; data integrity failure |
| EDGE (boundary) | HIGH | MAJOR | Ship date boundaries drive release prioritization; incorrect highlighting causes delayed releases and missed customer commitments |
| INT (integration) | CRITICAL | CRITICAL | Stock status updates must propagate to SD for picking; integration failure causes fulfillment delays and customer impact |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright — dashboard access, drill-down, and Release disposition are stable and repeatable |
| AP | YES | Reject and Rework disposition variants are data-driven via testdata JSON; drill-down without deviations is stable |
| NEG | YES | Empty state checks and missing entity validations are stable and machine-verifiable |
| ERR | YES | Field-level validation errors are stable and repeatable |
| EDGE | PARTIAL | Ship date boundaries require specific sales order test data setup in SAP; days pending calculation is auto-generated and stable (YES for EDGE-01, PARTIAL for EDGE-02/03/04) |
| INT | PARTIAL | Multi-module integration requires verification across QM, MM, and SD apps; stock availability check in SD may require separate test session or API verification |

**Target automation coverage:** 14 of 18 TCs (78%) — all HP, AP, NEG, ERR, and EDGE-01 are full automation candidates; EDGE-02/03/04 and all INT scenarios require careful test data setup but are automatable with scriptless MCP exploration.

**Automation recommendations:**
- Use Playwright MCP scriptless execution (Phase 3) to capture real batch numbers, process orders, and stock status values during exploration
- Parameterize all batch-specific data (batchNumber, processOrder, customerShipDate) in testdata JSON
- For INT scenarios, verify stock status updates via dashboard UI first (automatable); SD availability check can be verified in same session by navigating to SD app
- Ship date boundary test data (EDGE-02/03/04) requires sales order creation with specific delivery dates — recommend using existing sales orders in SAP demo tenant and documenting batch-to-SO mappings in testdata guide

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-064 (HP-01) — Access dashboard and view batches
  TC-CS-065 (HP-03) — Release disposition with stock status update
  TC-CS-066 (AP-01) — Reject disposition
  TC-CS-069 (ERR-02) — Missing disposition selection
  TC-CS-072 (INT-01) — Released batch available in SD
  TC-CS-073 (INT-02) — Rejected batch excluded from SD ATP

Priority 2 — HIGH (validate immediately after):
  TC-CS-067 (HP-02) — Drill down with deviations
  TC-CS-068 (AP-02) — Rework disposition
  TC-CS-070 (NEG-02) — Missing ship date
  TC-CS-071 (NEG-03) — Disposition without batch selection
  TC-CS-075 (ERR-01) — Missing batch for drill-down
  TC-CS-077 (EDGE-02) — Ship date overdue
  TC-CS-078 (EDGE-03) — Ship date today
  TC-CS-079 (INT-03) — Process order linkage

Priority 3 — MEDIUM (complete coverage):
  TC-CS-074 (AP-03) — Drill down without deviations
  TC-CS-076 (NEG-01) — Empty dashboard state
  TC-CS-080 (EDGE-01) — Days pending = 0
  TC-CS-081 (EDGE-04) — Ship date future
```

**Execution strategy notes:**
- Run Priority 1 CRITICAL scenarios first — if any fail, halt execution and investigate immediately
- Priority 2 HIGH scenarios validate remaining core paths and error handling — these must all pass before proceeding to Priority 3
- Priority 3 MEDIUM scenarios provide complete edge case coverage — these are regression-critical but not deployment-blocking
- Integration scenarios (INT-01, INT-02, INT-03) should be executed after all non-integration scenarios pass to ensure baseline functionality is stable

---

## Regulatory and Compliance Notes

**SAP QM/PP Context:**
- Batch release decisions are legally binding quality control records — test cases must verify that all disposition actions (Release, Reject, Rework) are recorded with timestamp and user ID for audit trail
- Batch records and deviation tracking are GxP-critical in regulated industries (pharma, food, medical devices) — ensure test data does not use real production batch numbers or quality inspection data
- Stock status updates triggered by disposition are financially relevant (released batches become available inventory) — test execution must use dedicated test system instances (not production) to prevent accidental stock movements
- All test execution must comply with SAP S/4HANA Cloud test governance and not interfere with production quality workflows

**Test Data Governance:**
- Use test batches created in SAP demo tenant quality inspection status
- Ensure test process orders are linked to test batches (not production orders)
- Use test sales orders with controlled ship dates for EDGE scenarios
- Document all test batch-to-sales-order mappings in `testdata/CS-64/CS-64-testdata-guide.md`

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-64-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (all 6 types: HP, AP, NEG, ERR, EDGE, INT)
3. No RECOMMENDED or OPTIONAL types defined — all 18 scenarios are mandatory
4. Apply quality gates table — verify all 12 thresholds are met before completing:
   - 100% AC traceability (all 6 ACs covered)
   - All 3 HP scenarios generated
   - All 3 AP scenarios generated
   - All 3 NEG scenarios generated
   - All 2 ERR scenarios generated
   - All 4 EDGE scenarios generated
   - All 3 INT scenarios generated
   - 0 hardcoded values (all data in `{TD.*}` placeholders)
   - ≥ 12 TCs flagged as Automation Candidate: YES
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above:
   - All HP, AP, NEG, ERR → YES
   - EDGE-01 → YES; EDGE-02/03/04 → PARTIAL
   - All INT → PARTIAL
7. Output files to `testcases/AI-generated testcases/CS-64/` and `testdata/CS-64/`
8. Ensure every disposition scenario (HP-03, AP-01, AP-02, INT-01, INT-02) includes explicit stock status assertion in Expected Result
9. For integration scenarios (INT-01, INT-02, INT-03), document cross-module verification steps clearly (e.g., "Navigate to SD app → verify batch availability")
