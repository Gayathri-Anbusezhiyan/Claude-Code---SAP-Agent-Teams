# Test Strategy: [CS-54] User Story PP-005

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-54/strategy/CS-54-analysis.md
**Risk Profile:**     jira/userstories/CS-54/strategy/CS-54-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Production Planner
- **Business Object:** Planned Order, MRP Run, Stock/Requirements List
- **SAP Module:** PP — Production Planning & Control
- **Business Goal:** Align raw material procurement and production scheduling with anticipated customer demand through MRP execution and planned order generation

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 2 | 2 | CRITICAL |
| Alternative Path (AP) | MANDATORY | 2 | 2 | HIGH |
| Negative (NEG) | MANDATORY | 4 | 4 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 3 | 3 | HIGH |
| Edge Case / Boundary (EDGE) | RECOMMENDED | 3 | 4 | MEDIUM |
| Integration (INT) | RECOMMENDED | 1 | 1 | HIGH |
| **TOTAL** | — | **15** | **16** | — |

**Rationale for Coverage Model:**
- **CRITICAL risk** story requires full MANDATORY coverage across HP, AP, NEG, ERR
- **AP scenarios** elevated to MANDATORY due to HIGH-risk conversion operations (AC-4) that are core to the business workflow
- **EDGE scenarios** remain RECOMMENDED (not MANDATORY) but 3 out of 4 are strongly recommended due to HIGH-risk batch size and capacity constraints
- **INT scenario** recommended due to implicit cross-module dependencies (MM stock data + SD sales orders) affecting net requirements calculation accuracy

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP) — 2 scenarios**

1. **HP-01**: Run MRP and generate planned orders for finished product based on demand and stock
   - **Risk**: CRITICAL
   - **ACs Covered**: AC-1, AC-2, AC-3, AC-6
   - **Rationale**: Core transactional operation; MRP execution is the primary business function

2. **HP-02**: Convert planned order to process order
   - **Risk**: HIGH
   - **ACs Covered**: AC-4
   - **Rationale**: Critical downstream conversion operation for production execution

**Alternative Path (AP) — 2 scenarios**

3. **AP-01**: Convert planned order to purchase requisition (external procurement)
   - **Risk**: HIGH
   - **ACs Covered**: AC-4
   - **Rationale**: Alternative conversion path explicitly required by AC-4; impacts procurement workflow

4. **AP-02**: Run MRP with multiple materials and sequence by capacity
   - **Risk**: MEDIUM
   - **ACs Covered**: AC-6
   - **Rationale**: Multi-material planning and capacity sequencing is a key planner workflow variant

**Negative (NEG) — 4 scenarios**

5. **NEG-01**: Attempt MRP run with material not configured for MRP planning
   - **Risk**: HIGH
   - **ACs Covered**: AC-2
   - **Rationale**: Invalid master data configuration must be detected and rejected

6. **NEG-02**: Planned order affected by raw material shortage
   - **Risk**: HIGH
   - **ACs Covered**: AC-5
   - **Rationale**: Exception flagging is critical to prevent production delays

7. **NEG-03**: Planned order affected by shelf-life constraint
   - **Risk**: HIGH
   - **ACs Covered**: AC-5
   - **Rationale**: Shelf-life violations must be flagged to prevent expired material usage

8. **NEG-04**: Material lot-sizing rule not satisfied (quantity below minimum batch size)
   - **Risk**: HIGH
   - **ACs Covered**: AC-3
   - **Rationale**: Business rule violation must be enforced to maintain batch integrity

**Error / Missing Field (ERR) — 3 scenarios**

9. **ERR-01**: Missing Material Number field
   - **Risk**: HIGH
   - **ACs Covered**: AC-1, AC-2
   - **Mandatory Field**: Material

10. **ERR-02**: Missing Plant field
    - **Risk**: HIGH
    - **ACs Covered**: AC-1, AC-2
    - **Mandatory Field**: Plant

11. **ERR-03**: Missing MRP Controller field
    - **Risk**: HIGH
    - **ACs Covered**: AC-1, AC-2
    - **Mandatory Field**: MRP Controller

### Recommended Scenarios

**Edge Case / Boundary (EDGE) — 4 scenarios**

12. **EDGE-01**: Minimum batch size boundary (quantity exactly equals minimum lot size)
    - **Risk**: MEDIUM
    - **ACs Covered**: AC-3
    - **Rationale**: Verify lower boundary of lot-sizing rule enforcement

13. **EDGE-02**: Maximum batch size boundary (quantity triggers rounding to next lot)
    - **Risk**: MEDIUM
    - **ACs Covered**: AC-3
    - **Rationale**: Verify upper boundary and rounding behavior of lot-sizing rules

14. **EDGE-03**: Zero available capacity (100% capacity utilization)
    - **Risk**: MEDIUM
    - **ACs Covered**: AC-6
    - **Rationale**: Verify capacity overview display under maximum load conditions

15. **EDGE-04**: Planning horizon = 1 day (minimum future period)
    - **Risk**: LOW
    - **ACs Covered**: AC-2
    - **Rationale**: Verify MRP calculation with minimum planning horizon

**Integration (INT) — 1 scenario**

16. **INT-01**: Run MRP with live sales orders from SD and current stock from MM
    - **Risk**: HIGH
    - **ACs Covered**: AC-2
    - **Cross-Module**: MM (Materials Management), SD (Sales & Distribution)
    - **Rationale**: Verify end-to-end net requirements calculation with real cross-module data

### Optional Scenarios

None

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 2 HP scenarios generated | YES |
| AP Coverage | All 2 AP scenarios generated | YES |
| NEG Coverage | All 4 NEG scenarios generated | YES |
| ERR Coverage | All 3 ERR scenarios generated | YES |
| EDGE Coverage | ≥ 3 EDGE TCs generated (out of 4 recommended) | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 8 TCs flagged as Automation Candidate: YES | YES |

**Additional gates for CRITICAL risk story:**

| Additional Gate | Threshold | Mandatory |
|----------------|-----------|---------|
| Negative coverage (entity validation) | 100% — all 4 NEG scenarios covering material config, shortage, shelf-life, batch size | YES |
| Error coverage (mandatory fields) | 100% — all 3 mandatory fields (Material, Plant, MRP Controller) | YES |

**Overall pass threshold:** All mandatory gates must PASS. 100% of MANDATORY scenarios must be generated. At least 75% of RECOMMENDED scenarios (EDGE + INT) must be generated.

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP-01 (MRP run core transaction) | CRITICAL | CRITICAL | Core PP transactional operation; failure blocks entire production planning process |
| HP-02 (convert to process order) | HIGH | MAJOR | Critical downstream operation for production execution; business process dependency |
| AP-01 (convert to purchase requisition) | HIGH | MAJOR | Alternative conversion path for external procurement; impacts procurement cycle |
| AP-02 (capacity sequencing) | MEDIUM | MINOR | Multi-material planning variant; planner can manually sequence if system fails |
| NEG-01 to NEG-04 | HIGH | MAJOR | Business rule and exception validations; failures can cause production delays or quality issues |
| ERR-01 to ERR-03 | HIGH | MAJOR | Data integrity failures; mandatory field enforcement prevents invalid MRP runs |
| EDGE-01 to EDGE-04 | MEDIUM | MINOR | Boundary condition verification; important but not core path |
| INT-01 | HIGH | MAJOR | Cross-module integration; failure impacts net requirements calculation accuracy |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright; stable MRP execution and conversion workflows |
| AP | YES | Data-driven via testdata JSON; both conversion paths are repeatable |
| NEG | PARTIAL | Shortage and shelf-life scenarios require specific master data setup (material shelf-life config, stock depletion); material-not-configured scenario is fully automatable |
| ERR | YES | Field-level validation stable; mandatory field checks are deterministic |
| EDGE | PARTIAL | Batch size boundaries require material master configuration (minimum lot size, lot-sizing procedure); capacity boundary requires work center capacity setup |
| INT | PARTIAL | Requires live sales orders (SD) and stock data (MM); multi-session orchestration or test data pre-setup needed |

**Target automation coverage:** 10 of 16 TCs (62.5%)

**Automation recommendations:**
- Prioritize HP-01, HP-02, AP-01, ERR-01, ERR-02, ERR-03 as fully automatable (6 TCs)
- Automate AP-02, NEG-01, EDGE-01, EDGE-02 with pre-configured test master data (4 TCs)
- Mark NEG-02, NEG-03, NEG-04, EDGE-03, EDGE-04, INT-01 as PARTIAL; require manual test data setup or exploratory verification (6 TCs)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-054-HP-01   (Run MRP and generate planned orders)

Priority 2 — HIGH (validate immediately after):
  TC-CS-054-HP-02   (Convert planned order to process order)
  TC-CS-054-AP-01   (Convert planned order to purchase requisition)
  TC-CS-054-NEG-01  (Material not configured for MRP)
  TC-CS-054-NEG-02  (Raw material shortage)
  TC-CS-054-NEG-03  (Shelf-life constraint)
  TC-CS-054-NEG-04  (Lot-sizing rule violation)
  TC-CS-054-ERR-01  (Missing Material Number)
  TC-CS-054-ERR-02  (Missing Plant)
  TC-CS-054-ERR-03  (Missing MRP Controller)
  TC-CS-054-INT-01  (Cross-module integration with SD and MM)

Priority 3 — MEDIUM (complete coverage):
  TC-CS-054-AP-02   (Multi-material capacity sequencing)
  TC-CS-054-EDGE-01 (Minimum batch size boundary)
  TC-CS-054-EDGE-02 (Maximum batch size boundary)
  TC-CS-054-EDGE-03 (Zero available capacity)
  TC-CS-054-EDGE-04 (Minimum planning horizon)

Priority 4 — Integration (run after core stability confirmed):
  (Already included in Priority 2 due to HIGH risk)
```

---

## Regulatory and Compliance Notes

**SAP PP Production Planning Compliance:**
- Planned orders are production planning documents that directly impact procurement commitments and production schedules
- Batch size and lot-sizing rules must be enforced to maintain GMP (Good Manufacturing Practice) compliance in pharmaceutical/chemical industries
- Shelf-life constraints must be flagged to prevent usage of expired raw materials (regulatory compliance requirement)
- MRP runs must use dedicated test system instances (not production) to avoid creating false procurement or production commitments
- Test data must not use real production material numbers or plant codes; use isolated test plant and test material master records

**Test Data Governance:**
- All test materials must be flagged as test materials in the SAP system (material master: Material Type = "TEST" or dedicated test plant)
- Test planned orders must not trigger real procurement or production workflows
- Ensure test system has proper isolation from production procurement and production systems

**Authorization and Access Control:**
- MRP execution requires authorization for MRP controller assignment and MRP processing transactions (e.g., MD01, MD02, MD03)
- Test execution must use dedicated test user accounts with PP module authorization (not production planner accounts)

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-54-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, AP, NEG, ERR)
3. Generate at least 3 out of 4 RECOMMENDED EDGE scenarios
4. Generate the 1 RECOMMENDED INT scenario
5. Apply quality gates table — verify all thresholds are met before completing:
   - 100% AC traceability (all 6 ACs covered)
   - All 11 MANDATORY TCs generated (2 HP + 2 AP + 4 NEG + 3 ERR)
   - At least 3 EDGE TCs generated
   - 1 INT TC generated
   - 0 hardcoded values (use `{TD.*}` placeholders for all test data)
   - At least 8 TCs flagged as Automation Candidate: YES or PARTIAL
6. Use `prompts/testcase-generation-from-userstory.md` as the generation template
7. Flag automation candidates per the Automation Viability table above
8. Output files to:
   - `testcases/AI-generated testcases/CS-54/testcases/` (individual TC markdown files)
   - `testcases/AI-generated testcases/CS-54/CS-54-coverage-matrix.md` (AC-to-TC traceability)
   - `testcases/AI-generated testcases/CS-54/CS-54-summary.json` (machine-readable registry)
   - `testdata/CS-54/CS-54-testdata.json` (parameterized test datasets)
   - `testdata/CS-54/CS-54-testdata-guide.md` (guide for filling in real SAP values)
