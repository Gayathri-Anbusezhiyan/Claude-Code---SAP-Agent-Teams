# Test Strategy: [CS-62] Technically Complete A Process Order Only After All Mandatory Quality

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-62/strategy/CS-62-analysis.md
**Risk Profile:**     jira/userstories/CS-62/strategy/CS-62-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Production Supervisor
- **Business Object:** Process Order (Production Order)
- **SAP Module:** PP — Production Planning & Control
- **Business Goal:** Ensure a batch cannot be considered finished while open deviations or missing signatures remain

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 1 | 1 | CRITICAL |
| Alternative Path (AP) | NOT APPLICABLE | 0 | 0 | N/A |
| Negative (NEG) | MANDATORY | 3 | 3 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 2 | 2 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 3 | 3 | MEDIUM |
| Integration (INT) | MANDATORY | 5 | 5 | CRITICAL |
| **TOTAL** | — | **14** | **14** | — |

**Rationale:**
- **CRITICAL risk** story per risk profile → applies most stringent coverage requirements
- **AP = 0**: Technical completion (TECO) is a single-path operation with no alternative valid paths
- **NEG = 3**: Each blocking quality gate (open deviations, missing IPC results, unsigned batch records) requires explicit negative test
- **ERR = 2**: Invalid order number and missing authorization are mandatory error scenarios
- **EDGE = 3**: Boundary conditions (zero vs one+ deviations, duplicate TECO) are MANDATORY for CRITICAL risk
- **INT = 5**: Cross-module quality gates (QM, MM, e-Signature) are MANDATORY — failure allows regulatory non-compliance

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

#### Happy Path (HP)
- **HP-01**: Technical completion of a process order with all quality and documentation requirements met
  - **Risk:** CRITICAL
  - **ACs Covered:** AC-1, AC-2, AC-4, AC-5, AC-6
  - **Validation Points:**
    - All deviations closed
    - All IPC results recorded
    - All batch record sections signed
    - Order status updates to TECO
    - Stock remains in QI
    - Audit log created with user ID and timestamp

#### Negative (NEG)
- **NEG-01**: Attempt TECO with open deviations linked to the process order
  - **Risk:** CRITICAL
  - **ACs Covered:** AC-2, AC-3
  - **Expected:** System blocks TECO and lists open deviation IDs

- **NEG-02**: Attempt TECO with missing in-process control results for required inspection characteristics
  - **Risk:** CRITICAL
  - **ACs Covered:** AC-2, AC-3
  - **Expected:** System blocks TECO and lists missing IPC operation numbers

- **NEG-03**: Attempt TECO with unsigned mandatory batch record sections
  - **Risk:** CRITICAL
  - **ACs Covered:** AC-2, AC-3
  - **Expected:** System blocks TECO and lists unsigned section names

#### Error / Missing Field (ERR)
- **ERR-01**: Attempt TECO with non-existent process order number
  - **Risk:** HIGH
  - **ACs Covered:** AC-1
  - **Expected:** System displays error "Order not found" or similar

- **ERR-02**: Attempt TECO without required authorization (missing TECO function in user role)
  - **Risk:** HIGH
  - **ACs Covered:** AC-1
  - **Expected:** System displays authorization error message

#### Edge Case / Boundary (EDGE)
- **EDGE-01**: Process order with zero open deviations (boundary case: exactly 0 vs 1+)
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-2
  - **Expected:** TECO succeeds (valid lower boundary)

- **EDGE-02**: Process order with exactly one open deviation (boundary case: 1 vs 0)
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-2, AC-3
  - **Expected:** TECO blocked (invalid lower boundary crossed)

- **EDGE-03**: Process order already technically completed (attempt duplicate TECO)
  - **Risk:** MEDIUM
  - **ACs Covered:** AC-4
  - **Expected:** System prevents duplicate TECO or displays status-appropriate message

#### Integration (INT)
- **INT-01**: Verify stock status remains QI after TECO and does not auto-transition to UR without QA release
  - **Risk:** CRITICAL
  - **ACs Covered:** AC-5
  - **Module:** MM Stock Status

- **INT-02**: Verify open deviations from QM Deviation Management block TECO
  - **Risk:** CRITICAL
  - **ACs Covered:** AC-2, AC-3
  - **Module:** QM Deviation Management

- **INT-03**: Verify missing IPC results from QM In-Process Control block TECO
  - **Risk:** HIGH
  - **ACs Covered:** AC-2, AC-3
  - **Module:** QM In-Process Control

- **INT-04**: Verify unsigned batch record sections from e-Signature module block TECO
  - **Risk:** HIGH
  - **ACs Covered:** AC-2, AC-3
  - **Module:** Custom e-Signature

- **INT-05**: Verify QM inspection lot status is not affected by TECO (QA release is separate)
  - **Risk:** CRITICAL
  - **ACs Covered:** AC-5
  - **Module:** QM Inspection Lot

### Recommended Scenarios

None — all scenarios for this CRITICAL risk story are MANDATORY.

### Optional Scenarios

None — all scenarios for this CRITICAL risk story are MANDATORY.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item (AC-1 through AC-6) covered by ≥ 1 TC | YES |
| HP Coverage | All 1 HP scenarios generated | YES |
| NEG Coverage | All 3 NEG scenarios generated | YES |
| ERR Coverage | All 2 ERR scenarios generated | YES |
| EDGE Coverage | All 3 EDGE TCs generated | YES |
| INT Coverage | All 5 INT TCs generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 5 TCs flagged as Automation Candidate: YES (HP + ERR + partial NEG) | YES |
| Negative Detail | Each NEG TC must specify the exact error message/validation text expected | YES |
| Audit Verification | HP TC must verify audit log capture (user ID, timestamp, TECO action code) | YES |

**Overall pass threshold:** All mandatory gates must PASS. 100% of gates are mandatory for this CRITICAL risk story.

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | TECO is the final quality gate before QA release — failure allows non-conforming product to advance |
| NEG (quality blocks) | CRITICAL | CRITICAL | Open deviations, missing IPC, unsigned batch records = regulatory compliance failures (GxP, 21 CFR Part 11) |
| ERR (missing field / auth) | HIGH | MAJOR | Invalid order or missing authorization blocks legitimate TECO operations |
| EDGE (boundary) | MEDIUM | MINOR | Boundary conditions must be explicit but are lower impact than core quality gates |
| INT (cross-module) | CRITICAL | CRITICAL | Integration failures (stock status, QM checks, e-signature) allow quality breaches across modules |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Stable TECO flow with all preconditions met — high-value regression candidate |
| AP | N/A | No alternative paths for this story |
| NEG | PARTIAL | Requires setup of test data with open deviations/missing IPC/unsigned sections — automation possible if pre-seeded |
| ERR | YES | Invalid order number and auth errors are stable and repeatable |
| EDGE | PARTIAL | Zero vs one+ deviations boundary test is automatable; duplicate TECO requires careful order state management |
| INT | PARTIAL | Cross-module integration (QM, MM, e-Signature) requires orchestration across multiple SAP modules — complex but automatable with proper fixtures |

**Target automation coverage:** 8 of 14 TCs (57%)
- Fully automatable: HP (1), ERR (2), EDGE-01 (1), INT-01 (1), INT-05 (1) = 6 TCs
- Partially automatable with fixtures: NEG (3), EDGE-02/03 (2), INT-02/03/04 (3) = 8 TCs
- Manual pre-requisite setup may be required for deviation/IPC/signature test data

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-{ID}-HP-01  → Happy path with all quality gates passed
  TC-CS-{ID}-NEG-01 → Open deviations block TECO
  TC-CS-{ID}-NEG-02 → Missing IPC results block TECO
  TC-CS-{ID}-NEG-03 → Unsigned batch records block TECO
  TC-CS-{ID}-INT-01 → Stock status remains QI after TECO
  TC-CS-{ID}-INT-02 → QM deviation management integration
  TC-CS-{ID}-INT-05 → QM inspection lot status unaffected by TECO

Priority 2 — HIGH (validate immediately after):
  TC-CS-{ID}-ERR-01 → Invalid order number error handling
  TC-CS-{ID}-ERR-02 → Missing authorization error handling
  TC-CS-{ID}-INT-03 → QM IPC integration
  TC-CS-{ID}-INT-04 → e-Signature integration

Priority 3 — MEDIUM (complete coverage):
  TC-CS-{ID}-EDGE-01 → Zero open deviations (lower boundary valid)
  TC-CS-{ID}-EDGE-02 → Exactly one open deviation (lower boundary invalid)
  TC-CS-{ID}-EDGE-03 → Duplicate TECO attempt
```

**Rationale:**
- Priority 1 covers all CRITICAL-risk scenarios — core quality gates and integration checks
- Priority 2 covers HIGH-risk error handling and remaining integrations
- Priority 3 covers MEDIUM-risk boundary conditions
- Total execution time estimate: ~45-60 minutes for full suite (assumes test data pre-seeded)

---

## Regulatory and Compliance Notes

### GxP Compliance (Good Manufacturing Practice)
- This story enforces GxP quality gates for pharmaceutical/regulated manufacturing
- Test cases must verify that incomplete quality documentation (open deviations, unsigned batch records, missing IPC) blocks batch release
- Audit trail capture (user ID, timestamp, TECO action) is a 21 CFR Part 11 requirement — HP TC must validate this explicitly

### Data Integrity Requirements
- All test execution must use dedicated test system instances (not production)
- Test data must include realistic but non-production process order numbers
- Deviation test data, IPC results, and batch record signatures must be pre-configured in QM test environment
- Stock status transitions must be verified in MM module to prevent accidental release of QI stock

### SOD (Segregation of Duties)
- User executing TECO must have appropriate PP authorization but should NOT have QA release authorization
- Test user role configuration must reflect production SOD policies

### Audit and Validation
- All test case execution results must be retained as evidence for regulatory audits
- Negative test results (blocked TECO with proper error messages) are as important as positive results for validation documentation

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-62-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL scenario types — HP (1), NEG (3), ERR (2), EDGE (3), INT (5) — total 14 TCs
3. All coverage types are MANDATORY for this CRITICAL-risk story — do not skip any
4. Apply quality gates table — verify all thresholds are met before completing
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above
7. Output files to `testcases/AI-generated testcases/CS-62/` and `testdata/CS-62/`
8. For NEG scenarios, specify exact expected error messages in Expected Result (consult SAP documentation or exploration if needed)
9. For HP scenario, include explicit verification of audit log entry (user ID, timestamp, TECO action code)
10. For INT scenarios, specify cross-module validation steps (e.g., navigate to stock overview to verify QI status in INT-01)
11. All test data must use `{TD.*}` placeholders — no hardcoded order numbers or user IDs
