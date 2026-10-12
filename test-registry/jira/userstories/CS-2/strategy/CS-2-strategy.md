# Test Strategy: [CS-2] Create a New Standard Purchase Order in SAP S/4HANA Cloud

**Created:**          2026-08-12
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-2/strategy/CS-2-analysis.md
**Risk Profile:**     jira/userstories/CS-2/strategy/CS-2-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Procurement Officer
- **Business Object:** Purchase Order (Standard PO)
- **SAP Module:** MM — Materials Management
- **Business Goal:** Formally initiate a procurement transaction that is tracked with a unique PO number in the system

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 2 | 2 | CRITICAL |
| Alternative Path (AP) | NOT APPLICABLE | 0 | 0 | — |
| Negative (NEG) | MANDATORY | 2 | 2 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 4 | 4 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 4 | 4 | MEDIUM |
| Integration (INT) | RECOMMENDED | 1 | 1 | HIGH |
| **TOTAL** | — | **13** | **13** | — |

**Rationale:**
- **HP:** MANDATORY for CRITICAL risk — covers all positive ACs (AC-1 through AC-6) plus multiple line items (AC-4)
- **AP:** NOT APPLICABLE — no alternative valid paths specified in ACs; HP-02 already covers multi-item scenario
- **NEG:** MANDATORY for CRITICAL risk — AC-3 and AC-5 require validation error testing; AC-8 requires descriptive error messages
- **ERR:** MANDATORY for CRITICAL risk — AC-7 lists 4 mandatory fields (Supplier, Material, Quantity, Price)
- **EDGE:** MANDATORY for CRITICAL risk — AC-4 involves 2 numeric parameters (quantity, price); BVA requires lower + zero boundaries for each
- **INT:** RECOMMENDED — CS-6 is a linked defect confirming AC-6 validation requirement; adds verification value but not core functional coverage

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP) — 2 scenarios**
- **HP-01**: Navigate to Manage Purchase Orders, create PO with valid single line item (supplier, material, quantity, price), submit, verify PO number generated — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **HP-02**: Create PO with multiple line items (2+ materials) — Risk: MEDIUM — ACs: AC-4

**Negative (NEG) — 2 scenarios**
- **NEG-01**: Enter non-existent Supplier ID, verify descriptive error message displayed — Risk: HIGH — ACs: AC-3, AC-8
- **NEG-02**: Enter non-existent Material Number, verify descriptive error message displayed — Risk: HIGH — ACs: AC-5, AC-8

**Error / Missing Field (ERR) — 4 scenarios**
- **ERR-01**: Missing Supplier field — verify submission prevented and field indicated — Risk: HIGH — ACs: AC-7
- **ERR-02**: Missing Material field — verify submission prevented and field indicated — Risk: HIGH — ACs: AC-7
- **ERR-03**: Missing Quantity field (or zero quantity) — verify submission prevented and field indicated — Risk: HIGH — ACs: AC-7
- **ERR-04**: Missing Price field (or zero price) — verify submission prevented and field indicated — Risk: HIGH — ACs: AC-7

**Edge Case / Boundary (EDGE) — 4 scenarios**
- **EDGE-01**: Minimum valid quantity (1) — verify PO created successfully — Risk: MEDIUM — ACs: AC-4
- **EDGE-02**: Zero quantity — verify submission rejected with clear error — Risk: MEDIUM — ACs: AC-4, AC-7
- **EDGE-03**: Minimum valid price (0.01 or currency-dependent minimum) — verify PO created successfully — Risk: MEDIUM — ACs: AC-4
- **EDGE-04**: Zero price — verify submission rejected with clear error — Risk: MEDIUM — ACs: AC-4, AC-7

### Recommended Scenarios

**Integration (INT) — 1 scenario**
- **INT-01**: Verify PO number generation and display behavior — confirm defect CS-6 (PO generated but NOT displayed in success message) — Risk: HIGH — Linked: CS-6

### Optional Scenarios

None

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 2 HP scenarios generated | YES |
| NEG Coverage | All 2 NEG scenarios generated | YES |
| ERR Coverage | All 4 ERR scenarios generated | YES |
| EDGE Coverage | All 4 EDGE scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values — all data uses `{TD.*}` or `{ENV.*}` placeholders | YES |
| Automation Eligibility | ≥ 7 TCs flagged as Automation Candidate: YES (50% minimum of total) | YES |

**Overall pass threshold:** All mandatory gates must PASS.

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Core procurement workflow — PO creation failure blocks entire business process |
| NEG (invalid entity) | HIGH | MAJOR | Invalid master data (supplier, material) blocks PO submission — business process halted |
| ERR (missing field) | HIGH | MAJOR | Missing mandatory fields violate data integrity — incomplete PO unacceptable |
| EDGE (boundary) | MEDIUM | MINOR | Boundary conditions are edge cases — important for validation robustness but not core path |
| INT (integration) | HIGH | MAJOR | AC-6 defect verification — known issue confirms need for explicit validation |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright — stable, repeatable, critical path |
| NEG | YES | Validation error checks are stable — expected error messages consistent |
| ERR | YES | Field-level validation stable — missing field errors consistent |
| EDGE | YES | Boundary value testing automatable — zero/min values produce consistent SAP behavior |
| INT | YES | AC-6 defect verification automatable — success message structure verifiable via DOM assertions |

**Target automation coverage:** 13 of 13 TCs (100%)

**All scenarios are automation candidates:** This is a core transactional flow with stable SAP behavior. All expected results are machine-verifiable (success messages, error messages, PO number generation). No manual judgment or visual verification required.

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-001  (HP-01: Single line item PO creation end-to-end)
  TC-CS-002  (HP-02: Multiple line items PO creation)

Priority 2 — HIGH (validate immediately after):
  TC-CS-003  (NEG-01: Non-existent Supplier ID)
  TC-CS-004  (NEG-02: Non-existent Material Number)
  TC-CS-005  (ERR-01: Missing Supplier field)
  TC-CS-006  (ERR-02: Missing Material field)
  TC-CS-007  (ERR-03: Missing Quantity field)
  TC-CS-008  (ERR-04: Missing Price field)

Priority 3 — MEDIUM (complete coverage):
  TC-CS-009  (EDGE-01: Minimum valid quantity)
  TC-CS-010  (EDGE-02: Zero quantity)
  TC-CS-011  (EDGE-03: Minimum valid price)
  TC-CS-012  (EDGE-04: Zero price)

Priority 4 — Integration (verify defect behavior):
  TC-CS-013  (INT-01: AC-6 defect verification — PO number display)
```

---

## Regulatory and Compliance Notes

**Purchase Orders are legally binding procurement documents:**
- Test cases must verify that mandatory approval fields are enforced per SAP configuration
- Ensure test data does not use real production vendor or material IDs
- All test execution must use dedicated test system instances (not production)

**Master Data Governance:**
- Supplier IDs and Material Numbers used in test cases must be documented in `testdata/{KEY}/{KEY}-testdata-guide.md`
- Non-existent entity IDs for NEG test cases must be clearly flagged as test-only values (not real SAP master data)

**SAP S/4HANA Cloud Test Governance:**
- Standard SAP S/4HANA Cloud test governance applies
- Test user credentials must have appropriate authorization objects: M_BEST_BSA, M_BEST_EKO, M_BEST_EKG, M_BEST_WRK

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-2-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, NEG, ERR, EDGE)
3. Generate RECOMMENDED INT scenario (INT-01)
4. Apply quality gates table — verify all thresholds are met before completing
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag all 13 TCs as automation candidates (Automation Candidate: YES)
7. Output files to `testcases/AI-generated testcases/CS-2/` and `testdata/CS-2/`
8. Ensure all test data uses `{TD.*}` placeholders per Parameterization quality gate
9. Include test data guide explaining which SAP master data values to substitute per placeholder

---

## Known Defects and Constraints

**CS-6 Defect (Linked Issue):**
- **Summary:** [MM] TC-CS-021: PO success notification does not display generated PO number — AC-6 violated
- **Status:** To Do
- **Impact:** PO number IS generated in SAP backend but NOT displayed in the success confirmation message (UI)
- **Test Case Requirement:** INT-01 must verify this behavior explicitly — assert that success message appears but does NOT contain the 10-digit PO number pattern
- **Re-confirmed:** 5 times across pipeline runs (2026-05-18, 2026-05-19, 2026-05-21)

**SAP Configuration (my426318 tenant):**
- Automatic Release is active — PO status after Order button: **"Sent"** (not "Open")
- Guided Tour dialog may appear on login — dismiss with "Leave Tour" button
- Plant field may require manual entry in Manage Purchase Orders app (auto-population varies by SAP config)

---

## Quality Assurance Checkpoints

Before marking test case generation as complete, verify:

- [ ] All 8 ACs have explicit traceability in coverage matrix
- [ ] All 13 scenarios from inventory have corresponding test case files
- [ ] All test cases use `{TD.*}` placeholders — zero hardcoded SAP values
- [ ] All test cases include Step 1 with `{ENV.SAP_FIORI_URL}`
- [ ] All error/negative test cases specify exact expected error message text
- [ ] Test data JSON includes all input parameters (supplier, material, quantity, price, plant)
- [ ] Test data guide documents which SAP master data values are valid for this tenant (my426318)
- [ ] Coverage matrix shows 100% AC coverage
- [ ] Summary JSON includes all 13 TC IDs with correct scenario types
