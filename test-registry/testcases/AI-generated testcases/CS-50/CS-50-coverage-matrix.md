# Test Coverage Matrix: [CS-50] Create A Process Order For A Validated Master Recipe To Manufacture A

**Generated:** 2026-08-24
**Story:** CS-50 — Create A Process Order For A Validated Master Recipe To Manufacture A
**Module:** PP — Production Planning (Pharmaceutical Manufacturing)
**Total Test Cases:** 11

---

## Coverage Completeness

| Scenario Type | Required (min) | Generated | Status |
|---------------|---------------|-----------|--------|
| Happy Path    | ≥ 1           | 1         | PASS   |
| Alternative   | 0 or more     | 0         | N/A    |
| Negative      | 2             | 2         | PASS   |
| Error         | 5             | 5         | PASS   |
| Edge Case     | ≥ 2           | 3         | PASS   |
| Integration   | 0             | 0         | N/A    |
| **TOTAL**     | **11**        | **11**    | **PASS** |

---

## Acceptance Criteria Coverage

| AC ID | Acceptance Criterion | Covered By Test Cases | Coverage Status |
|-------|---------------------|----------------------|----------------|
| AC-1 | The user can access the "Create Process Order" Fiori app. | TC-CS-125 (HP-01) | PASS |
| AC-2 | The system only allows selection of a master recipe with an "Approved/Released" status. | TC-CS-125 (HP-01 — approved recipe), TC-CS-126 (NEG-01 — draft recipe), TC-CS-128 (ERR-01 — missing recipe) | PASS |
| AC-3 | The system automatically pulls the Bill of Material (active ingredients and excipients) and routing/operations from the released recipe. | TC-CS-125 (HP-01), TC-CS-133 (EDGE-01 — min quantity), TC-CS-134 (EDGE-02 — max quantity) | PASS |
| AC-4 | The process order is assigned a unique batch number linked to the finished product batch record. | TC-CS-125 (HP-01) | PASS |
| AC-5 | The system prevents release of the process order if any component material is on quality hold. | TC-CS-127 (NEG-02) | PASS |
| AC-6 | The order displays required in-process control (IPC) steps as defined in the master recipe. | TC-CS-125 (HP-01) | PASS |

**Overall AC Coverage:** 6 of 6 (100%) — PASS

---

## Test Case Inventory

### Happy Path (HP) — 1 test case

| TC ID | Title | Priority | Automation | Estimated Effort |
|-------|-------|----------|-----------|-----------------|
| TC-CS-125 | Create Process Order with Approved Master Recipe and Verify BOM, Routing, Batch Number, and IPC Steps | CRITICAL | YES | LARGE |

**Coverage:** AC-1, AC-2 (approved), AC-3, AC-4, AC-6

---

### Negative (NEG) — 2 test cases

| TC ID | Title | Priority | Automation | Estimated Effort |
|-------|-------|----------|-----------|-----------------|
| TC-CS-126 | Attempt to Select Master Recipe with Draft Status and Verify System Prevents Selection | HIGH | YES | MEDIUM |
| TC-CS-127 | Attempt to Release Process Order When Component Material is on Quality Hold and Verify System Prevents Release | HIGH | YES | LARGE |

**Coverage:**
- TC-CS-126: AC-2 (draft recipe validation)
- TC-CS-127: AC-5 (quality hold enforcement)

---

### Error / Missing Field (ERR) — 5 test cases

| TC ID | Title | Priority | Automation | Estimated Effort |
|-------|-------|----------|-----------|-----------------|
| TC-CS-128 | Attempt to Create Process Order with Missing Master Recipe Field and Verify System Prevents Submission | HIGH | YES | SMALL |
| TC-CS-129 | Attempt to Create Process Order with Missing Plant Field and Verify System Prevents Submission | HIGH | YES | SMALL |
| TC-CS-130 | Attempt to Create Process Order with Missing Order Quantity Field and Verify System Prevents Submission | HIGH | YES | SMALL |
| TC-CS-131 | Attempt to Create Process Order with Missing Production Start Date Field and Verify System Prevents Submission | HIGH | YES | SMALL |
| TC-CS-132 | Attempt to Create Process Order with Missing Material Number Field and Verify System Prevents Submission | HIGH | YES | SMALL |

**Coverage:**
- TC-CS-128: AC-2 (mandatory field validation)
- TC-CS-129 to TC-CS-132: Implicit mandatory field validation

---

### Edge Case / Boundary (EDGE) — 3 test cases

| TC ID | Title | Priority | Automation | Estimated Effort |
|-------|-------|----------|-----------|-----------------|
| TC-CS-133 | Create Process Order with Order Quantity at Minimum Lot Size Boundary and Verify Success | MEDIUM | YES | MEDIUM |
| TC-CS-134 | Create Process Order with Order Quantity at Maximum Lot Size Boundary and Verify Success | MEDIUM | YES | MEDIUM |
| TC-CS-135 | Create Process Order with Production Start Date at Current Date Boundary and Verify Success | MEDIUM | YES | MEDIUM |

**Coverage:**
- TC-CS-133, TC-CS-134: AC-3 (BOM/routing auto-population at boundaries)
- TC-CS-135: Implicit date validation at earliest valid boundary

---

## Quality Gate Results

| Gate | Threshold | Actual | Status |
|------|-----------|--------|--------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | 100% (6/6 ACs covered) | PASS |
| HP Coverage | All 1 HP scenarios generated | 1 HP generated | PASS |
| NEG Coverage | All 2 NEG scenarios generated | 2 NEG generated | PASS |
| ERR Coverage | All 5 ERR scenarios generated | 5 ERR generated | PASS |
| EDGE Coverage | All 3 EDGE TCs generated | 3 EDGE generated | PASS |
| Parameterization | 0 hardcoded SAP values | 0 hardcoded values (all use `{TD.*}` or `{ENV.*}` placeholders) | PASS |
| Automation Eligibility | ≥ 9 TCs flagged as Automation Candidate: YES (target: 11) | 11 TCs flagged as YES | PASS |

**Overall Quality Gate Status:** PASS — All mandatory gates met

---

## Automation Summary

| Automation Candidate | Count | Percentage |
|---------------------|-------|------------|
| YES | 11 | 100% |
| NO | 0 | 0% |
| PARTIAL | 0 | 0% |

**Target automation coverage:** 11 of 11 TCs (100%) — PASS

---

## Test Execution Priority

Execute test cases in this order during regression and CI/CD runs:

**Priority 1 — CRITICAL (execute first):**
- TC-CS-125 (HP-01): Create process order with approved master recipe — full happy path validation

**Priority 2 — HIGH (validate immediately after):**
- TC-CS-126 (NEG-01): Attempt to select master recipe with "Draft" status
- TC-CS-127 (NEG-02): Attempt to release process order when component material is on quality hold
- TC-CS-128 (ERR-01): Missing Master Recipe field
- TC-CS-129 (ERR-02): Missing Plant field
- TC-CS-130 (ERR-03): Missing Order Quantity field
- TC-CS-131 (ERR-04): Missing Production Start Date field
- TC-CS-132 (ERR-05): Missing Material Number field

**Priority 3 — MEDIUM (complete coverage):**
- TC-CS-133 (EDGE-01): Order Quantity at minimum lot size boundary
- TC-CS-134 (EDGE-02): Order Quantity at maximum lot size boundary
- TC-CS-135 (EDGE-03): Production Start Date at current date boundary

---

## Risk Coverage

| Risk Level | Scenario Count | ACs Covered | Coverage Assessment |
|-----------|---------------|-------------|---------------------|
| CRITICAL | 3 (1 HP + 2 NEG) | AC-1, AC-2, AC-3, AC-4, AC-5, AC-6 | Full coverage of all critical-risk ACs including recipe validation, BOM/routing auto-population, batch number generation, quality hold enforcement, and IPC steps display |
| HIGH | 5 (5 ERR) | AC-2 (mandatory field validation) | Full coverage of mandatory field validation; prevents incomplete process order creation |
| MEDIUM | 3 (3 EDGE) | AC-3 (boundary values) | Full coverage of lot size and date boundaries; ensures recipe capacity constraints are respected |
| LOW | 0 | None | No low-risk scenarios identified |

**Overall Risk Coverage:** PASS — All critical and high-risk scenarios covered; GMP compliance requirements validated

---

## Regulatory Compliance Validation

| GMP Compliance Requirement | Test Case Coverage | Status |
|---------------------------|-------------------|--------|
| Only "Approved/Released" master recipes can be used for production | TC-CS-125 (approved recipe), TC-CS-126 (draft recipe rejection) | PASS |
| Batch number generation and linkage (21 CFR Part 11) | TC-CS-125 (batch number verification) | PASS |
| Quality hold enforcement (no non-conforming materials) | TC-CS-127 (quality hold rejection) | PASS |
| In-process control (IPC) steps documentation | TC-CS-125 (IPC steps display) | PASS |
| BOM/routing traceability | TC-CS-125, TC-CS-133, TC-CS-134 (BOM/routing verification) | PASS |

**Overall Regulatory Compliance Coverage:** PASS — All GMP-critical validations covered

---

## Notes

- All test cases start with the 6-step login sequence using `{ENV.SAP_FIORI_URL}`, `{ENV.SAP_USERNAME}`, `{ENV.SAP_PASSWORD}`
- All test cases navigate to applications via the search bar (top-right shell icon) — NOT tiles
- All test cases use `{TD.*}` placeholders for SAP data — ZERO hardcoded values
- All test cases include Press Enter steps after every lookup field entry (Master Recipe, Material, Plant, Price, Quantity)
- All test cases end with sign-out sequence
- NEG-02 (TC-CS-127) requires pre-configuration of component material quality status to "Blocked" or "On Hold" in the test data setup
- EDGE cases (TC-CS-133, TC-CS-134) require master recipe configuration with defined minimum and maximum lot size constraints
- EDGE-03 (TC-CS-135) requires the current posting period to be open in the SAP system for the test plant
