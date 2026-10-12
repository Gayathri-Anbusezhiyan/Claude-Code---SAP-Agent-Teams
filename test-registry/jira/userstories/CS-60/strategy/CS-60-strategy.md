# Test Strategy: [CS-60] Maintain A Resource/Work Center Master For Validated Production Equipm

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-60/strategy/CS-60-analysis.md
**Risk Profile:**     jira/userstories/CS-60/strategy/CS-60-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Maintenance Planner
- **Business Object:** Work Center Master Record with Calibration/Qualification tracking
- **SAP Module:** PP — Production Planning (with PM — Plant Maintenance integration)
- **Business Goal:** Process Orders can only be scheduled on equipment that is currently within its qualification and calibration validity period

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 4 | 4 | CRITICAL |
| Alternative Path (AP) | MANDATORY | 3 | 3 | HIGH |
| Negative (NEG) | MANDATORY | 3 | 3 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 4 | 4 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 5 | 5 | MEDIUM |
| Integration (INT) | MANDATORY | 5 | 5 | HIGH |
| **TOTAL** | — | **24** | **24** | — |

**Rationale for MANDATORY coverage across all types:**
- Story is CRITICAL risk with regulatory compliance implications (GMP/FDA 21 CFR Part 11)
- Multiple CRITICAL-risk ACs (AC-3, AC-5, AC-6) require comprehensive validation
- Cross-module integration (PP-PM-QM) demands explicit integration testing
- Calibration/qualification tracking is legally binding for regulated manufacturing
- Equipment scheduling failures can result in production halts and product recalls

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios — Happy Path (HP)

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| HP-01 | Create Work Center with valid calibration date and verify capacity planning eligibility | HIGH | AC-1, AC-2, AC-5 |
| HP-02 | Update existing Work Center with new calibration expiration date | MEDIUM | AC-2 |
| HP-03 | Verify alert generated when calibration expiration is within alert lead-time threshold | HIGH | AC-4 |
| HP-04 | Verify batch record captures Work Center ID and calibration status at production confirmation | CRITICAL | AC-6 |

### Mandatory Scenarios — Alternative Path (AP)

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| AP-01 | Mark Work Center as "Out of Service" and verify automatic exclusion from capacity planning | CRITICAL | AC-5 |
| AP-02 | Requalify Work Center (update calibration date post-maintenance) and verify re-inclusion in capacity planning | HIGH | AC-5 |
| AP-03 | Configure custom alert lead-time (non-default value) and verify alert timing | MEDIUM | AC-4 |

### Mandatory Scenarios — Negative (NEG)

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| NEG-01 | Attempt to schedule Process Order operation on Work Center with expired calibration | CRITICAL | AC-3 |
| NEG-02 | Attempt to schedule Process Order operation on Work Center marked "Out of Service" | CRITICAL | AC-3, AC-5 |
| NEG-03 | Enter past date as calibration expiration date and verify validation error | HIGH | AC-2 |

### Mandatory Scenarios — Error / Missing Field (ERR)

| ID | Description | Risk | Field | ACs Covered |
|----|-------------|------|-------|-------------|
| ERR-01 | Missing Work Center ID | HIGH | Work Center | AC-2 |
| ERR-02 | Missing Plant | HIGH | Plant | AC-2 |
| ERR-03 | Missing Work Center Category | HIGH | Category | AC-2 |
| ERR-04 | Missing Equipment Number (when calibration tracking required) | MEDIUM | Equipment | AC-2 |

### Mandatory Scenarios — Edge Cases (EDGE)

| ID | Description | Risk | Parameter | Boundary | ACs Covered |
|----|-------------|------|-----------|----------|-------------|
| EDGE-01 | Calibration expiration date = Today (minimum valid boundary) | MEDIUM | calibrationExpirationDate | lower | AC-2 |
| EDGE-02 | Alert lead-time = 0 days (alert on expiration day only) | MEDIUM | alertLeadTime | lower | AC-4 |
| EDGE-03 | Alert lead-time = 999 days (maximum boundary) | LOW | alertLeadTime | upper | AC-4 |
| EDGE-04 | Available capacity = 1 minute (minimum valid) | MEDIUM | availableCapacity | lower | AC-5 |
| EDGE-05 | Calibration expiration date = exactly alert lead-time days from today (boundary trigger) | HIGH | calibrationExpirationDate | threshold | AC-4 |

### Mandatory Scenarios — Integration (INT)

| ID | Description | Risk | Integration Point | ACs Covered |
|----|-------------|------|------------------|-------------|
| INT-01 | Calibration date in Equipment Master (PM) propagates to Work Center Master (PP) | HIGH | PM ↔ PP | AC-2 |
| INT-02 | Process Order scheduling engine queries Work Center calibration status before assignment | CRITICAL | PP scheduling logic | AC-3 |
| INT-03 | Alert notification created in PM Notifications module and routed to Maintenance Planner | HIGH | PP → PM Notifications | AC-4 |
| INT-04 | Batch record in QM captures Equipment ID and calibration status from Work Center at production confirmation | CRITICAL | PP → QM Batch Management | AC-6 |
| INT-05 | Background job scans Work Centers and generates alerts based on configurable lead-time | HIGH | Background Job Framework | AC-4 |

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — all 6 ACs covered by ≥ 1 TC | YES |
| HP Coverage | All 4 HP scenarios generated | YES |
| AP Coverage | All 3 AP scenarios generated | YES |
| NEG Coverage | All 3 NEG scenarios generated | YES |
| ERR Coverage | All 4 ERR scenarios generated | YES |
| EDGE Coverage | All 5 EDGE TCs generated (including threshold boundary) | YES |
| INT Coverage | All 5 INT scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values — all data via {TD.*} placeholders | YES |
| Automation Eligibility | ≥ 12 TCs (50%) flagged as Automation Candidate: YES or PARTIAL | YES |
| Regulatory Compliance | All TCs include audit trail verification steps where applicable | YES |

**Overall pass threshold:** All mandatory gates must PASS. 100% compliance required for CRITICAL risk story.

**Additional CRITICAL-risk gates:**
- **Negative coverage (entity validation):** 100% — one NEG per named entity that can be invalid (expired calibration, out-of-service status, past date)
- **Error coverage (mandatory fields):** 100% — one ERR per mandatory field identified in data parameter inventory (Work Center ID, Plant, Category, Equipment Number)
- **Integration coverage (cross-module):** 100% — explicit TC per integration dependency (PM Equipment Master sync, PP scheduling validation, PM Notification generation, QM Batch traceability, Background Job)

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Work Center creation/update with calibration tracking is the foundation for all downstream capacity planning and regulatory compliance. Failure blocks all dependent processes. |
| HP (batch traceability) | CRITICAL | CRITICAL | Batch record linkage (HP-04) is a regulatory requirement (GMP 21 CFR Part 11). Missing or incorrect equipment reference in batch records results in product recall and audit findings. |
| AP (out-of-service workflow) | HIGH | MAJOR | Equipment maintenance workflow (AP-01, AP-02) directly impacts production capacity planning. Incorrect exclusion/inclusion logic causes schedule disruption and capacity overcommitment. |
| AP (alert customization) | MEDIUM | MINOR | Custom alert lead-time (AP-03) is a configuration flexibility requirement but does not block core functionality if default is acceptable. |
| NEG (expired calibration) | CRITICAL | CRITICAL | Preventing Process Order operations on expired equipment (NEG-01, NEG-02) is the primary regulatory control. Failure allows production of non-compliant batches. |
| NEG (date validation) | HIGH | MAJOR | Past date validation (NEG-03) prevents master data integrity issues that cascade into incorrect capacity planning and alert generation. |
| ERR (mandatory fields) | HIGH | MAJOR | Missing mandatory fields (ERR-01 to ERR-04) prevent Work Center creation entirely. Data integrity enforcement is essential for downstream reliability. |
| EDGE (date boundaries) | MEDIUM | MINOR | Boundary conditions (EDGE-01, EDGE-05) verify robustness of date validation logic but are less likely failure scenarios than core happy path. |
| EDGE (alert lead-time boundaries) | MEDIUM | MINOR | Edge alert configurations (EDGE-02, EDGE-03) test system limits but are edge cases unlikely to be used in production. |
| EDGE (capacity minimum) | MEDIUM | MINOR | Minimum capacity (EDGE-04) verifies field validation but does not impact core scheduling logic. |
| INT (PM-PP sync) | HIGH | MAJOR | Equipment Master calibration date propagation (INT-01) is foundational for all Work Center calibration logic. Sync failure causes data inconsistency across PP and PM modules. |
| INT (scheduling validation) | CRITICAL | CRITICAL | Process Order scheduling validation (INT-02) is the enforcement point for calibration-based capacity exclusion. Failure allows invalid production orders. |
| INT (alert generation) | HIGH | MAJOR | PM Notification integration (INT-03) ensures timely maintenance planning. Missed alerts cause equipment downtime and delayed production. |
| INT (batch record linkage) | CRITICAL | CRITICAL | QM Batch Management integration (INT-04) is the regulatory traceability mechanism. Failure violates GMP audit trail requirements. |
| INT (background job) | HIGH | MAJOR | Background job alert scanning (INT-05) is the automated trigger for proactive maintenance. Job failure causes silent alert loss. |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core Work Center CRUD operations are stable, repeatable, and regression-critical. HP-01 to HP-03 are ideal Playwright candidates. |
| HP (batch traceability) | PARTIAL | HP-04 requires multi-app orchestration (Manage Work Centers → Process Order → Batch Record). Feasible but complex; recommend manual verification initially. |
| AP | PARTIAL | AP-01 and AP-02 (status transitions) are automatable if status change UI is accessible. AP-03 (custom alert lead-time) requires configuration access which may not be via Fiori UI. |
| NEG | YES | Validation checks (NEG-01 to NEG-03) are stable and repeatable. Expected error messages are machine-verifiable. |
| ERR | YES | Field-level validation (ERR-01 to ERR-04) is stable and repeatable. Error message text can be asserted. |
| EDGE | PARTIAL | Date boundaries (EDGE-01, EDGE-05) are automatable via parameterized test data. Alert lead-time boundaries (EDGE-02, EDGE-03) depend on system configuration access. Capacity minimum (EDGE-04) is automatable. |
| INT | PARTIAL | INT-01 (PM-PP sync) requires multi-module navigation (Equipment Master → Work Center). INT-02 (scheduling validation) requires Process Order app access. INT-03 to INT-05 require background job monitoring and notification inbox access — manual verification recommended for first iteration. |

**Target automation coverage:** 12-14 of 24 TCs (50-58%)
- Automate all HP (4), NEG (3), ERR (4), and EDGE date boundaries (2-3) = 13-14 TCs
- Manual verification for complex INT scenarios (multi-app orchestration, background jobs, notification inbox)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-001 (HP-01): Create Work Center with valid calibration → capacity planning eligibility
  TC-CS-004 (HP-04): Batch record captures Work Center ID + calibration status (if automatable)
  TC-CS-005 (NEG-01): Attempt to schedule Process Order on expired calibration Work Center
  TC-CS-006 (NEG-02): Attempt to schedule Process Order on out-of-service Work Center
  TC-CS-008 (AP-01): Mark Work Center as "Out of Service" → verify capacity exclusion
  TC-CS-018 (INT-02): Process Order scheduling validation queries calibration status
  TC-CS-019 (INT-04): Batch record QM integration captures equipment calibration

Priority 2 — HIGH (validate immediately after):
  TC-CS-002 (HP-02): Update Work Center with new calibration expiration date
  TC-CS-003 (HP-03): Alert generated within lead-time threshold
  TC-CS-007 (NEG-03): Past date calibration validation error
  TC-CS-009 (AP-02): Requalify Work Center → verify capacity re-inclusion
  TC-CS-011 (ERR-01): Missing Work Center ID
  TC-CS-012 (ERR-02): Missing Plant
  TC-CS-013 (ERR-03): Missing Work Center Category
  TC-CS-017 (INT-01): Equipment Master calibration date syncs to Work Center Master
  TC-CS-020 (INT-03): Alert notification created in PM Notifications
  TC-CS-021 (INT-05): Background job scans Work Centers and generates alerts

Priority 3 — MEDIUM (complete coverage):
  TC-CS-010 (AP-03): Configure custom alert lead-time → verify timing
  TC-CS-014 (ERR-04): Missing Equipment Number (when calibration required)
  TC-CS-015 (EDGE-01): Calibration date = Today (lower boundary)
  TC-CS-016 (EDGE-02): Alert lead-time = 0 days (lower boundary)
  TC-CS-022 (EDGE-03): Alert lead-time = 999 days (upper boundary)
  TC-CS-023 (EDGE-04): Available capacity = 1 minute (lower boundary)
  TC-CS-024 (EDGE-05): Calibration date = exactly alert lead-time days from today (threshold boundary)

Priority 4 — Integration (run after core stability confirmed):
  Already distributed across Priority 1 and Priority 2 due to CRITICAL/HIGH risk.
  No additional integration-only scenarios deferred.
```

**Execution strategy:**
- Run Priority 1 (CRITICAL) scenarios in every CI/CD pipeline commit
- Run Priority 1 + Priority 2 (HIGH) for nightly regression
- Run full suite (all priorities) for release candidate validation
- Re-run failed scenarios in isolation before escalating to defect logging

---

## Regulatory and Compliance Notes

**SAP PP-PM-QM regulated manufacturing environment:**
- Work Centers linked to production equipment must comply with GMP (Good Manufacturing Practice) and FDA 21 CFR Part 11 (electronic records and signatures)
- Calibration and qualification expiration dates are legally binding — test cases must verify that expired equipment cannot be used for production orders
- Batch traceability (AC-6) is a regulatory requirement — every production batch must reference the specific equipment used and its calibration status at time of production
- All test execution must use dedicated test system instances (not production) to prevent accidental creation of regulatory-significant records
- Test data must not use real production equipment IDs, vendor IDs, or batch numbers
- Audit trail completeness: every Work Center status change, calibration date update, and capacity planning exclusion must generate a system log entry

**Data privacy and security:**
- No personally identifiable information (PII) in test datasets (use generic "Maintenance Planner" role, not actual user names)
- All test Work Center IDs and Equipment Numbers must be clearly marked as test data (prefix with "TEST-" or use reserved number ranges)

**Test environment requirements:**
- SAP S/4HANA Cloud test tenant with PP, PM, and QM modules activated
- Background job scheduler must be active for alert generation scenarios (INT-03, INT-05)
- Test user must have authorizations: Work Center display/change (PP), Equipment Master display (PM), Process Order create/display (PP), Notification display (PM), Batch Record display (QM)

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-60-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types (HP, AP, NEG, ERR, EDGE, INT) — no scenario type is optional for this CRITICAL risk story
3. Apply quality gates table — verify all thresholds are met before completing:
   - 100% AC traceability (all 6 ACs covered)
   - All 24 scenarios generated (4 HP + 3 AP + 3 NEG + 4 ERR + 5 EDGE + 5 INT)
   - 0 hardcoded SAP values (use {TD.workCenterId}, {TD.plant}, {TD.calibrationDate}, etc.)
   - ≥ 12 TCs flagged as Automation Candidate: YES or PARTIAL
4. Use `prompts/testcase-generation-from-userstory.md` as the generation template
5. Flag automation candidates per the Automation Viability table above:
   - YES: HP (except HP-04), NEG, ERR, EDGE date boundaries
   - PARTIAL: HP-04 (multi-app), AP (status transitions), EDGE (alert config), INT (multi-module)
6. Output files to `testcases/AI-generated testcases/CS-60/` and `testdata/CS-60/`
7. Include regulatory compliance verification steps in all CRITICAL-priority TCs:
   - Verify audit trail entries for Work Center status changes
   - Verify batch record equipment linkage includes calibration status timestamp
   - Verify Process Order scheduling validation error messages reference calibration expiration
8. Use priority assignment from Test Case Priority Assignment table above
9. Assign severity levels matching priority: CRITICAL → CRITICAL, HIGH → MAJOR, MEDIUM → MINOR
10. Include preconditions for integration scenarios:
    - INT-01: Equipment Master record must exist in PM with calibration date
    - INT-02: Process Order must exist with operation referencing the Work Center
    - INT-03: PM Notification recipient configuration must be active
    - INT-04: Batch production order must exist with equipment assignment
    - INT-05: Background job must be scheduled and active in test system
