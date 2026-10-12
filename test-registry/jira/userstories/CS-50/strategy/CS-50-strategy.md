# Test Strategy: [CS-50] Create A Process Order For A Validated Master Recipe To Manufacture A

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-50/strategy/CS-50-analysis.md
**Risk Profile:**     jira/userstories/CS-50/strategy/CS-50-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Production Supervisor
- **Business Object:** Process Order (pharmaceutical manufacturing)
- **SAP Module:** PP — Production Planning (Pharmaceutical/Process Manufacturing)
- **Business Goal:** Ensure production is executed according to the GMP-approved formula and process parameters

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 1 | 1 | CRITICAL |
| Alternative Path (AP) | NOT APPLICABLE | 0 | 0 | N/A |
| Negative (NEG) | MANDATORY | 2 | 2 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 5 | 5 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 3 | 3 | MEDIUM |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | N/A |
| **TOTAL** | — | **11** | **11** | — |

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**HP-01: Create process order with approved master recipe**
- **Risk:** CRITICAL
- **ACs Covered:** AC-1, AC-2 (approved recipe), AC-3, AC-4, AC-6
- **Description:** Verify end-to-end process order creation from approved master recipe including BOM/routing auto-population, batch number generation, IPC steps display, and order creation success
- **Priority:** CRITICAL
- **Automation Candidate:** YES

**NEG-01: Attempt to select master recipe with "Draft" status**
- **Risk:** HIGH
- **ACs Covered:** AC-2
- **Description:** System must prevent selection or display error when user attempts to select a non-approved master recipe
- **Priority:** HIGH
- **Automation Candidate:** YES

**NEG-02: Attempt to release process order when component material is on quality hold**
- **Risk:** CRITICAL
- **ACs Covered:** AC-5
- **Description:** System must prevent release and display error when any component material is on quality hold
- **Priority:** HIGH
- **Automation Candidate:** YES

**ERR-01: Missing Master Recipe field**
- **Risk:** HIGH
- **ACs Covered:** AC-2
- **Description:** Verify system prevents submission when mandatory Master Recipe field is left blank
- **Priority:** HIGH
- **Automation Candidate:** YES

**ERR-02: Missing Plant field**
- **Risk:** HIGH
- **ACs Covered:** (implicit mandatory field)
- **Description:** Verify system prevents submission when mandatory Plant field is left blank
- **Priority:** HIGH
- **Automation Candidate:** YES

**ERR-03: Missing Order Quantity field**
- **Risk:** HIGH
- **ACs Covered:** (implicit mandatory field)
- **Description:** Verify system prevents submission when mandatory Order Quantity field is left blank
- **Priority:** HIGH
- **Automation Candidate:** YES

**ERR-04: Missing Production Start Date field**
- **Risk:** HIGH
- **ACs Covered:** (implicit mandatory field)
- **Description:** Verify system prevents submission when mandatory Production Start Date field is left blank
- **Priority:** HIGH
- **Automation Candidate:** YES

**ERR-05: Missing Material Number field**
- **Risk:** HIGH
- **ACs Covered:** (implicit mandatory field)
- **Description:** Verify system prevents submission when mandatory Material Number field is left blank
- **Priority:** HIGH
- **Automation Candidate:** YES

**EDGE-01: Order Quantity at minimum lot size boundary**
- **Risk:** MEDIUM
- **ACs Covered:** AC-3
- **Description:** Verify process order creation succeeds when order quantity equals recipe minimum lot size
- **Priority:** MEDIUM
- **Automation Candidate:** YES

**EDGE-02: Order Quantity at maximum lot size boundary**
- **Risk:** MEDIUM
- **ACs Covered:** AC-3
- **Description:** Verify process order creation succeeds when order quantity equals recipe maximum lot size
- **Priority:** MEDIUM
- **Automation Candidate:** YES

**EDGE-03: Production Start Date at current date boundary**
- **Risk:** LOW
- **ACs Covered:** (implicit date validation)
- **Description:** Verify process order creation succeeds when production start date equals current date (earliest valid date)
- **Priority:** MEDIUM
- **Automation Candidate:** YES

### Recommended Scenarios

None — all scenarios from analysis are mandatory due to CRITICAL overall risk.

### Optional Scenarios

None — all scenarios from analysis are mandatory due to CRITICAL overall risk.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 1 HP scenarios generated | YES |
| NEG Coverage | All 2 NEG scenarios generated | YES |
| ERR Coverage | All 5 ERR scenarios generated | YES |
| EDGE Coverage | All 3 EDGE TCs generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 9 TCs flagged as Automation Candidate: YES (target: 11) | YES |

**Overall pass threshold:** All mandatory gates must PASS. Given CRITICAL risk level, all coverage gates require 100% completion.

**CRITICAL risk additional gates:**
- Negative coverage (entity validation): 100% — one NEG per named entity that can be invalid (master recipe status, component material quality status) ✓
- Error coverage (mandatory fields): 100% — one ERR per mandatory field (Master Recipe, Plant, Order Quantity, Start Date, Material) ✓

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Core pharmaceutical production transaction; GMP compliance required; failure blocks all manufacturing operations |
| NEG (invalid entity) | HIGH | MAJOR | Non-approved recipe or on-hold materials violate regulatory requirements; must be caught before production starts |
| ERR (missing field) | HIGH | MAJOR | Missing mandatory fields prevent process order creation; data integrity validation |
| EDGE (boundary) | MEDIUM | MINOR | Boundary values test recipe capacity constraints; important for production planning but not blocking core path |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidate for Playwright; stable master recipe selection + BOM/routing auto-population verifiable via UI assertions |
| NEG | YES | Stable validation checks; error messages for non-approved recipe and quality hold are machine-verifiable |
| ERR | YES | Field-level validation is stable; missing mandatory field errors are consistent |
| EDGE | YES | Boundary values for order quantity and start date are deterministic and testable with stable test data setup |

**Target automation coverage:** 11 of 11 TCs (100%)

**Note:** All test cases are automation candidates because:
- Master recipe selection and validation are stable SAP PP standard functionality
- BOM/routing auto-population can be verified via UI snapshots and element visibility checks
- Batch number generation can be verified via success message text pattern matching
- IPC steps display can be verified via table row count and content assertions
- Quality hold check can be pre-configured in test data setup (set material status to "blocked" in SAP)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-{XXX} (HP-01): Create process order with approved master recipe — full happy path validation

Priority 2 — HIGH (validate immediately after):
  TC-CS-{XXX} (NEG-01): Attempt to select master recipe with "Draft" status
  TC-CS-{XXX} (NEG-02): Attempt to release process order when component material is on quality hold
  TC-CS-{XXX} (ERR-01): Missing Master Recipe field
  TC-CS-{XXX} (ERR-02): Missing Plant field
  TC-CS-{XXX} (ERR-03): Missing Order Quantity field
  TC-CS-{XXX} (ERR-04): Missing Production Start Date field
  TC-CS-{XXX} (ERR-05): Missing Material Number field

Priority 3 — MEDIUM (complete coverage):
  TC-CS-{XXX} (EDGE-01): Order Quantity at minimum lot size boundary
  TC-CS-{XXX} (EDGE-02): Order Quantity at maximum lot size boundary
  TC-CS-{XXX} (EDGE-03): Production Start Date at current date boundary

Priority 4 — Integration (run after core stability confirmed):
  None — no integration scenarios for this story
```

---

## Regulatory and Compliance Notes

**GMP Compliance (Pharmaceutical Manufacturing):**
- Process orders created from master recipes are subject to Good Manufacturing Practice (GMP) regulations enforced by FDA (US) and EMA (EU)
- Test cases must verify that only "Approved/Released" master recipes can be used for production (AC-2 validation is regulatory-critical)
- Batch number generation and linkage (AC-4) is required for product traceability; failure to generate unique batch numbers violates 21 CFR Part 11 (electronic records)
- Quality hold enforcement (AC-5) ensures non-conforming materials cannot enter production; bypassing this check constitutes a regulatory deviation
- In-process control (IPC) steps (AC-6) are required by GMP to document critical process parameters; missing IPC steps invalidate batch records

**Test Data Governance:**
- Use only test system instances (not production) for all test execution
- Test master recipes must be clearly labeled as "TEST" in description field
- Test materials must not use real production material numbers or batch numbers
- All test batches must be flagged for disposal (do not release to inventory)

**SOD (Segregation of Duties):**
- User creating process order (Production Supervisor) must NOT have authorization to release master recipes (Recipe Manager role)
- Verify test user has SAP_PP_PROCESS_ORDER_CREATE authorization but NOT SAP_PP_RECIPE_RELEASE

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-50-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, NEG, ERR, EDGE)
3. Do NOT generate AP or INT test cases (marked NOT APPLICABLE)
4. Apply quality gates table — verify all thresholds are met before completing:
   - All 6 ACs covered
   - 1 HP + 2 NEG + 5 ERR + 3 EDGE = 11 TCs total
   - Zero hardcoded values (all SAP data uses `{TD.*}` placeholders)
   - All 11 TCs flagged as Automation Candidate: YES
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above
7. Output files to `testcases/AI-generated testcases/CS-50/` and `testdata/CS-50/`
8. **GMP-specific test case requirements:**
   - Include explicit verification steps for master recipe status = "Approved/Released" (AC-2)
   - Include explicit verification steps for BOM component list display (AC-3)
   - Include explicit verification steps for routing operations list display (AC-3)
   - Include explicit verification steps for batch number format and uniqueness (AC-4)
   - Include explicit verification steps for IPC steps section visibility and content (AC-6)
   - For NEG-02 (quality hold), include pre-condition step to configure test material with quality status = "blocked" or "on hold"
9. **Expected result format for process order creation:**
   - Success message pattern: "Process Order {10-12 digit number} created" or similar
   - Batch number pattern: alphanumeric, format per client config (e.g., `YYYYMMDD-XXX`)
   - Order status: "CRTD" (Created) or "REL" (Released)
10. **Error message patterns:**
    - Non-approved recipe: "Recipe status must be Approved/Released" or "Recipe is not valid for production"
    - Quality hold: "Component material {material number} is on quality hold" or "Cannot release order: blocked material"
    - Missing mandatory field: "Enter {field name}" or "{field name} is required"
