# Test Strategy: [CS-24] Create A Subcontracting Purchase Order For Outsourced Fill-Finish Manu

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-24/strategy/CS-24-analysis.md
**Risk Profile:**     jira/userstories/CS-24/strategy/CS-24-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Procurement Officer
- **Business Object:** Subcontracting Purchase Order
- **SAP Module:** MM — Materials Management (Subcontracting Procurement)
- **Business Goal:** Enable raw materials to be provided to a Contract Manufacturing Organization (CMO) and receive finished product back into inventory with automatic component consumption and quality inspection

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 4 | 4 | CRITICAL |
| Alternative Path (AP) | MANDATORY | 2 | 2 | HIGH |
| Negative (NEG) | MANDATORY | 4 | 4 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 6 | 6 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 6 | 6 | MEDIUM |
| Integration (INT) | MANDATORY | 3 | 3 | CRITICAL |
| **TOTAL** | — | **25** | **25** | — |

**Rationale for CRITICAL risk coverage:**
- All scenario types are MANDATORY due to CRITICAL overall risk classification
- Subcontracting is a complex SAP process involving multi-module integration (MM-IM, QM, PP-BOM)
- Component consumption automation (backflushing) has high business impact — errors lead to inventory discrepancies
- Quality inspection lot creation is a GMP compliance requirement
- Special stock tracking ("Stock provided to vendor") is critical for inventory accuracy

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios — Happy Path (HP)

| Scenario ID | Description | Risk | ACs Covered |
|------------|-------------|------|-------------|
| HP-01 | Create subcontracting PO with single component, verify PO created, special stock indicator set, component list populated | CRITICAL | AC-1, AC-2, AC-3, AC-6 |
| HP-02 | Issue components to vendor (MB1B movement type 541), verify "Stock provided to vendor" created | CRITICAL | AC-3, AC-6 |
| HP-03 | Post goods receipt for finished product, verify component auto-consumption and inspection lot creation | CRITICAL | AC-4, AC-5 |
| HP-04 | View component balances at CMO via Stock Overview app after issue | MEDIUM | AC-6 |

### Mandatory Scenarios — Alternative Path (AP)

| Scenario ID | Description | Risk | ACs Covered |
|------------|-------------|------|-------------|
| AP-01 | Create subcontracting PO with multiple components (2+) | CRITICAL | AC-2, AC-3, AC-6 |
| AP-02 | Partial goods receipt (quantity < PO quantity), verify partial component consumption | HIGH | AC-4 |

### Mandatory Scenarios — Negative (NEG)

| Scenario ID | Description | Risk | ACs Covered |
|------------|-------------|------|-------------|
| NEG-01 | Attempt to create PO with vendor that does not have subcontracting indicator enabled | CRITICAL | AC-1, AC-2 |
| NEG-02 | Attempt to create PO with material that does not have item category "L" configured | CRITICAL | AC-1, AC-2 |
| NEG-03 | Attempt to specify component not in BOM for the finished material | HIGH | AC-2 |
| NEG-04 | Attempt goods receipt when insufficient component stock at vendor | CRITICAL | AC-4 |

### Mandatory Scenarios — Error / Missing Field (ERR)

| Scenario ID | Description | Risk | Field | ACs Covered |
|------------|-------------|------|-------|-------------|
| ERR-01 | Missing Supplier field | HIGH | Supplier | AC-1 |
| ERR-02 | Missing Material field | HIGH | Material | AC-1 |
| ERR-03 | Missing Plant field | HIGH | Plant | AC-1 |
| ERR-04 | Missing Order Quantity field | HIGH | Order Quantity | AC-1 |
| ERR-05 | Missing Delivery Date field | HIGH | Delivery Date | AC-1 |
| ERR-06 | Missing Item Category or wrong category (not "L") | CRITICAL | Item Category | AC-1, AC-2 |

### Mandatory Scenarios — Edge Case / Boundary (EDGE)

| Scenario ID | Description | Risk | Parameter | Boundary | ACs Covered |
|------------|-------------|------|-----------|----------|-------------|
| EDGE-01 | Minimum order quantity (1 unit) | MEDIUM | quantity | lower | AC-2, AC-4 |
| EDGE-02 | Zero order quantity | MEDIUM | quantity | zero | AC-2 |
| EDGE-03 | Maximum order quantity (system limit) | LOW | quantity | upper | AC-2 |
| EDGE-04 | Delivery date = today (minimum lead time) | MEDIUM | deliveryDate | lower | AC-1 |
| EDGE-05 | Past delivery date | MEDIUM | deliveryDate | invalid | AC-1 |
| EDGE-06 | Component quantity override to zero (if system allows manual edit) | HIGH | componentQuantity | zero | AC-2 |

### Mandatory Scenarios — Integration (INT)

| Scenario ID | Description | Risk | Integration Module | ACs Covered |
|------------|-------------|------|-------------------|-------------|
| INT-01 | Verify integration with MM-IM (special stock creation and component consumption) | CRITICAL | MM-IM | AC-3, AC-4 |
| INT-02 | Verify integration with QM (inspection lot creation at GR) | CRITICAL | QM | AC-5 |
| INT-03 | Verify integration with BOM (component explosion from STPO/STKO) | CRITICAL | PP-BOM | AC-2 |

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — all 6 ACs covered by ≥ 1 TC | YES |
| HP Coverage | All 4 HP scenarios generated | YES |
| AP Coverage | All 2 AP scenarios generated | YES |
| NEG Coverage | All 4 NEG scenarios generated | YES |
| ERR Coverage | All 6 ERR scenarios generated | YES |
| EDGE Coverage | All 6 EDGE scenarios generated | YES |
| INT Coverage | All 3 INT scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values (all data via `{TD.*}` placeholders) | YES |
| Automation Eligibility | ≥ 15 TCs (60%) flagged as Automation Candidate: YES | YES |

**CRITICAL Risk Additional Gates:**

| Additional Gate | Threshold | Mandatory |
|----------------|-----------|---------|
| Negative coverage (entity validation) | 100% — NEG TCs for vendor, material, component, stock validation | YES |
| Error coverage (mandatory fields) | 100% — ERR TCs for all 6 mandatory fields (Supplier, Material, Plant, Quantity, Date, Item Category) | YES |
| Integration coverage | 100% — INT TCs for MM-IM, QM, BOM integrations | YES |

**Overall pass threshold:** All mandatory gates must PASS (100% threshold).

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Subcontracting PO creation is the core procurement transaction for outsourced manufacturing. Failure blocks CMO operations. |
| HP (component issue) | CRITICAL | CRITICAL | Component issue (movement type 541) creates special stock "O" — inventory accounting depends on this. |
| HP (goods receipt) | CRITICAL | CRITICAL | GR triggers automatic component consumption (backflushing) and QM inspection lot creation — both are GMP compliance requirements. |
| HP (stock visibility) | HIGH | MAJOR | Transparency requirement for procurement and inventory teams to monitor component balances at CMO. |
| AP (multiple components) | CRITICAL | CRITICAL | Real-world subcontracting scenarios typically involve multiple raw materials — must be validated. |
| AP (partial GR) | HIGH | MAJOR | Partial receipts are common in manufacturing — partial component consumption logic must be correct. |
| NEG (vendor validation) | CRITICAL | CRITICAL | Vendor without subcontracting indicator cannot process subcontracting POs — system must reject. |
| NEG (material validation) | CRITICAL | CRITICAL | Material without item category "L" cannot be used in subcontracting — system must reject. |
| NEG (component validation) | HIGH | MAJOR | Components not in BOM cannot be provided to vendor — system must reject. |
| NEG (insufficient stock) | CRITICAL | CRITICAL | GR without sufficient component stock at vendor causes inventory discrepancies — system must reject. |
| ERR (missing fields) | HIGH | MAJOR | All mandatory fields enforce data integrity — missing fields must be rejected by UI validation. |
| ERR (wrong item category) | CRITICAL | CRITICAL | Wrong item category creates standard PO instead of subcontracting PO — critical business rule failure. |
| EDGE (quantity boundaries) | MEDIUM | MINOR | Boundary value analysis for quantity validation — important but not core path. |
| EDGE (date boundaries) | MEDIUM | MINOR | Delivery date validation — minimum lead time and past date rejection. |
| EDGE (component quantity zero) | HIGH | MAJOR | Zero component quantity should be rejected if manual override is allowed — affects consumption calculation. |
| INT (MM-IM integration) | CRITICAL | CRITICAL | Special stock creation and component consumption integration — inventory accuracy depends on this. |
| INT (QM integration) | CRITICAL | CRITICAL | Inspection lot creation integration — GMP compliance depends on this. |
| INT (BOM integration) | CRITICAL | CRITICAL | Component explosion from BOM — component list accuracy depends on this. |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core subcontracting flow is stable and repeatable — regression-critical for Playwright automation. Full end-to-end flow (PO creation → component issue → GR) should be automated. |
| AP | YES | Multiple components and partial GR scenarios are data-driven and repeatable — can be parameterized via testdata JSON. |
| NEG | PARTIAL | Vendor and material validation require test master data setup with specific configurations (subcontracting indicator enabled/disabled). Can be automated if test data is pre-configured. Component BOM validation and insufficient stock scenarios can be automated. |
| ERR | YES | Field-level validation is stable and UI-enforced — all mandatory field scenarios can be automated with empty/missing field assertions. |
| EDGE | PARTIAL | Quantity and date boundary values can be automated. Component quantity override may require SAP configuration verification (whether manual edit is allowed). |
| INT | PARTIAL | MM-IM and BOM integration can be automated (verify special stock indicator, component list, consumption documents). QM integration (inspection lot creation) can be automated if QM module is configured in test tenant. Multi-module flows require careful orchestration but are automatable. |

**Target automation coverage:** 20 of 25 TCs (80%) — HP, AP (full), ERR (full), EDGE (partial), INT (partial)

**Prerequisites for automation:**
- Test master data: CMO vendor with subcontracting indicator enabled + standard vendor (for NEG-01)
- Test material: Finished product with item category "L" + BOM with 2+ components configured in test plant
- Test plant: Configured for special stock "O" and subcontracting procurement
- QM configuration: Inspection type configured for finished goods material (for INT-02)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-101 (HP-01) — Create subcontracting PO with single component
  TC-CS-102 (HP-02) — Issue components to vendor (movement type 541)
  TC-CS-103 (HP-03) — Post goods receipt with component auto-consumption and inspection lot
  TC-CS-104 (AP-01) — Create subcontracting PO with multiple components
  TC-CS-105 (NEG-01) — Reject PO creation with vendor without subcontracting indicator
  TC-CS-106 (NEG-02) — Reject PO creation with material without item category "L"
  TC-CS-107 (NEG-04) — Reject goods receipt with insufficient component stock
  TC-CS-108 (ERR-06) — Reject PO creation with missing/wrong item category
  TC-CS-109 (INT-01) — Verify MM-IM integration (special stock + consumption)
  TC-CS-110 (INT-02) — Verify QM integration (inspection lot creation)
  TC-CS-111 (INT-03) — Verify BOM integration (component explosion)

Priority 2 — HIGH (validate immediately after):
  TC-CS-112 (HP-04) — View component balances via Stock Overview app
  TC-CS-113 (AP-02) — Partial goods receipt with partial consumption
  TC-CS-114 (NEG-03) — Reject component not in BOM
  TC-CS-115 (ERR-01) — Reject missing Supplier field
  TC-CS-116 (ERR-02) — Reject missing Material field
  TC-CS-117 (ERR-03) — Reject missing Plant field
  TC-CS-118 (ERR-04) — Reject missing Order Quantity field
  TC-CS-119 (ERR-05) — Reject missing Delivery Date field
  TC-CS-120 (EDGE-06) — Reject zero component quantity override

Priority 3 — MEDIUM (complete coverage):
  TC-CS-121 (EDGE-01) — Minimum order quantity (1 unit)
  TC-CS-122 (EDGE-02) — Zero order quantity rejection
  TC-CS-123 (EDGE-03) — Maximum order quantity (system limit)
  TC-CS-124 (EDGE-04) — Delivery date = today (minimum lead time)
  TC-CS-125 (EDGE-05) — Past delivery date rejection
```

**Execution strategy:**
- Run Priority 1 (CRITICAL) scenarios first in CI/CD — if any fail, block deployment
- Run Priority 2 (HIGH) validation scenarios immediately after to ensure complete core coverage
- Run Priority 3 (MEDIUM) boundary scenarios to complete regression suite
- Total execution time estimate: 45-60 minutes for full suite (assumes automation)

---

## Regulatory and Compliance Notes

**SAP MM Subcontracting Procurement:**
- Subcontracting Purchase Orders are legally binding procurement documents — test cases must verify that mandatory approval fields and authorization workflows are enforced
- Component issue and goods receipt transactions create material documents that affect inventory valuation — test cases must verify correct accounting treatment (special stock "O" valuation)
- Quality inspection lots are GMP compliance artifacts — test cases must verify inspection lot creation per standard receipt rules

**Test Data Governance:**
- Ensure test data does not use real production vendor IDs or material IDs
- Use dedicated test plant and test company code for all subcontracting transactions
- All test execution must use dedicated test system instances (not production SAP tenant)
- Test BOM structures should be clearly marked as test configurations in material master

**Quality Management (QM) Module:**
- If QM inspection lot creation is tested (INT-02), ensure QM module is fully configured in test tenant
- Inspection type configuration must match production GMP rules but use test inspection plans

**Inventory Management (MM-IM) Module:**
- Special stock "O" (stock provided to vendor) must be configured in test plant storage locations
- Component consumption (backflushing) logic depends on costing configuration — ensure test plant uses standard cost accounting

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-24-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL scenario types — all are MANDATORY for CRITICAL risk story
3. Apply quality gates table — verify all thresholds are met before completing:
   - 100% AC traceability (all 6 ACs covered)
   - All 25 test cases generated (4 HP + 2 AP + 4 NEG + 6 ERR + 6 EDGE + 3 INT)
   - 0 hardcoded SAP values (all data via `{TD.*}` placeholders)
   - ≥ 15 TCs (60%) flagged as Automation Candidate: YES
4. Use `prompts/testcase-generation-from-userstory.md` as the generation template
5. Flag automation candidates per the Automation Viability table above:
   - HP: all YES
   - AP: all YES
   - NEG: PARTIAL (flag as YES if test data is pre-configured)
   - ERR: all YES
   - EDGE: PARTIAL (flag quantity/date as YES, component override as PARTIAL)
   - INT: PARTIAL (flag MM-IM and BOM as YES, QM as PARTIAL if QM not configured)
6. Output files to `testcases/AI-generated testcases/CS-24/` and `testdata/CS-24/`
7. Generate test data JSON with placeholders for:
   - CMO Supplier ID (with subcontracting indicator)
   - Finished Material ID (with item category "L")
   - Component Material IDs (from BOM)
   - Plant (configured for subcontracting)
   - Standard Supplier ID (for NEG-01 — without subcontracting indicator)
   - Standard Material ID (for NEG-02 — without item category "L")
   - Invalid Component ID (for NEG-03 — not in BOM)
   - All boundary values (min/max quantities, dates)
