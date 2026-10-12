# Test Strategy: [CS-35] Create Outbound Delivery with Cold-Chain shipping for biologics

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-35/strategy/CS-35-analysis.md
**Risk Profile:**     jira/userstories/CS-35/strategy/CS-35-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Warehouse Supervisor
- **Business Object:** Outbound Delivery with Cold-Chain shipping configuration (SAP SD document)
- **SAP Module:** SD — Sales & Distribution
- **Business Goal:** Ensure temperature-sensitive pharmaceutical products (biologics) are shipped with proper environmental controls, monitoring, and documentation to maintain product integrity and regulatory compliance

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 2 | 2 | CRITICAL |
| Alternative Path (AP) | MANDATORY | 1 | 1 | HIGH |
| Negative (NEG) | MANDATORY | 4 | 4 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 4 | 4 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 3 | 3 | MEDIUM |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | N/A |
| **TOTAL** | — | **14** | **14** | — |

**Rationale for CRITICAL risk coverage:**
- All scenario types (HP, AP, NEG, ERR, EDGE) are MANDATORY due to CRITICAL overall risk
- Patient safety and regulatory compliance depend on correct cold-chain handling
- Incorrect temperature assignment or carrier selection can result in product loss, regulatory violations, and patient harm
- Integration scenarios marked NOT APPLICABLE (no linked issues), but implicit integrations covered within HP/NEG scenarios

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios — Happy Path (HP)

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| HP-01 | Create Outbound Delivery from released SO with biologics material (2-8°C), verify Cold-Chain shipping condition auto-assigned, specify certified carrier + temp-controlled method, confirm temperature-sensitive label printed, verify temp range recorded in delivery header | CRITICAL | AC-1, AC-2, AC-3, AC-5, AC-6 |
| HP-02 | Create Outbound Delivery for biologics with -20°C (frozen) temperature requirement, verify different cold-chain shipping condition assigned based on temperature range | CRITICAL | AC-1, AC-2 |

### Mandatory Scenarios — Alternative Path (AP)

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| AP-01 | Create Outbound Delivery for biologics with ultra-cold-chain requirement (-80°C), verify specialized shipping condition and carrier selection | HIGH | AC-2, AC-3 |

### Mandatory Scenarios — Negative (NEG)

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| NEG-01 | Attempt to create Outbound Delivery with non-certified carrier (no cold-chain certification) — system must reject or warn | CRITICAL | AC-3 |
| NEG-02 | Attempt to proceed with delivery when warehouse has no temperature-controlled storage locations available — system must block picking/packing | CRITICAL | AC-4 |
| NEG-03 | Attempt to create Outbound Delivery from non-released Sales Order — system must reject | HIGH | AC-1 |
| NEG-04 | Attempt to create Outbound Delivery with standard (non-cold-chain) shipping method for biologics material — system must reject or warn | HIGH | AC-3 |

### Mandatory Scenarios — Error / Missing Field (ERR)

| ID | Description | Risk | Field | ACs Covered |
|----|-------------|------|-------|-------------|
| ERR-01 | Missing Shipping Method (temperature-controlled) — system must prompt user or block save | HIGH | Shipping Method | AC-3 |
| ERR-02 | Missing Carrier specification — system must prompt user or block save | HIGH | Carrier | AC-3 |
| ERR-03 | Missing Sales Order Number — system must reject (cannot create delivery without reference) | CRITICAL | Sales Order Number | AC-1 |
| ERR-04 | Temperature-Sensitive label printing fails (printer error, output determination not configured) — system must warn or log error | HIGH | Label Output | AC-5 |

### Mandatory Scenarios — Edge Case / Boundary (EDGE)

| ID | Description | Risk | Boundary Type | ACs Covered |
|----|-------------|------|--------------|-------------|
| EDGE-01 | Biologics material with borderline temperature requirement (e.g., 15-25°C) — verify correct shipping condition assignment (ambient vs. controlled) | MEDIUM | Decision boundary (temperature range classification) | AC-2 |
| EDGE-02 | Outbound Delivery for minimum quantity (1 unit) of biologics — verify all cold-chain requirements applied | LOW | Lower boundary (delivery quantity) | AC-1, AC-2 |
| EDGE-03 | Multiple line items with different temperature requirements in same Sales Order — verify system handles or blocks mixed-temp delivery creation | HIGH | Complex scenario (multi-temperature handling) | AC-1, AC-2 |

### Optional Scenarios — Integration (INT)

**None** — No linked Jira issues identified. Implicit integrations documented in analysis (SO → Delivery flow, Material Master, WM storage location control, Output Management, Carrier Master) are covered within HP and NEG scenarios.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory | Rationale |
|------|-----------|---------|-----------|
| AC Traceability | 100% — all 6 ACs covered by ≥ 1 TC | YES | Every acceptance criterion must be validated |
| HP Coverage | All 2 HP scenarios generated | YES | Core cold-chain delivery creation paths must be fully tested |
| NEG Coverage | All 4 NEG scenarios generated | YES | All validation failures (carrier, storage, SO status, shipping method) must be verified |
| ERR Coverage | All 4 ERR scenarios generated | YES | All mandatory fields and critical outputs must have error handling validated |
| EDGE Coverage | All 3 EDGE TCs generated | YES | Temperature boundary classification, minimum quantity, and multi-temp complexity must be tested |
| Parameterization | 0 hardcoded SAP values | YES | All test data must use `{TD.*}` placeholders for reusability |
| Automation Eligibility | ≥ 10 TCs flagged as Automation Candidate: YES or PARTIAL | YES | At least 71% of test cases must be automation-eligible (10 of 14 TCs) |

**Additional CRITICAL risk gates:**

| Additional Gate | Threshold | Mandatory |
|----------------|-----------|---------|
| Negative coverage (entity validation) | 100% — all 4 NEG scenarios covering carrier certification, storage availability, SO status, shipping method | YES |
| Error coverage (mandatory fields + critical outputs) | 100% — all 4 ERR scenarios covering Shipping Method, Carrier, SO Number, Label Output | YES |
| Temperature range variants | ≥ 3 temperature ranges tested (2-8°C, -20°C, -80°C) | YES |

**Overall pass threshold:** All mandatory gates must PASS. Story cannot proceed to automation without 100% gate compliance.

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP-01 (core cold-chain delivery 2-8°C) | CRITICAL | CRITICAL | Primary business transaction — most common biologics temperature range — failure blocks fulfillment and risks product integrity |
| HP-02 (frozen biologics -20°C) | CRITICAL | CRITICAL | Second most common temperature range — validates temperature-dependent logic |
| AP-01 (ultra-cold -80°C) | HIGH | MAJOR | Specialized but critical use case for vaccines and rare biologics — validates extended temperature range handling |
| NEG-01 (non-certified carrier) | CRITICAL | CRITICAL | Regulatory compliance failure — non-certified carrier can result in temperature excursion and product loss |
| NEG-02 (no temp-controlled storage) | CRITICAL | CRITICAL | Product integrity risk — prevents shipping from inappropriate storage conditions |
| NEG-03 (non-released SO) | HIGH | MAJOR | Business process control — ensures proper order workflow |
| NEG-04 (standard shipping method) | HIGH | MAJOR | Configuration validation — prevents inappropriate shipping conditions |
| ERR-01 (missing Shipping Method) | HIGH | MAJOR | Mandatory field — prevents incomplete delivery configuration |
| ERR-02 (missing Carrier) | HIGH | MAJOR | Mandatory field — prevents delivery without logistics provider |
| ERR-03 (missing SO Number) | CRITICAL | CRITICAL | Core reference — delivery cannot exist without source document |
| ERR-04 (label printing failure) | HIGH | MAJOR | Documentation requirement — missing label risks carrier mishandling |
| EDGE-01 (borderline temp 15-25°C) | MEDIUM | MINOR | Decision boundary validation — ensures correct classification logic |
| EDGE-02 (minimum quantity) | LOW | MINOR | Lower boundary validation — confirms system handles minimal deliveries |
| EDGE-03 (mixed-temp line items) | HIGH | MAJOR | Complex scenario — validates system handling of conflicting temperature requirements |

---

## Automation Viability

| Scenario Type | Count | Candidate | Notes |
|--------------|-------|-----------|-------|
| HP-01, HP-02 | 2 | YES | Core regression candidates for Playwright — stable, repeatable, critical business flows |
| AP-01 | 1 | YES | Data-driven via testdata JSON — temperature range parameterization |
| NEG-01, NEG-02, NEG-03, NEG-04 | 4 | YES | Validation checks are stable and repeatable — error messages are consistent |
| ERR-01, ERR-02, ERR-03 | 3 | YES | Field-level validation stable — system prompts and error messages consistent |
| ERR-04 | 1 | PARTIAL | Label printing depends on SAP output determination and printer configuration — may require manual verification |
| EDGE-01 | 1 | PARTIAL | Borderline temperature classification may depend on specific SAP customizing (shipping condition decision rules) |
| EDGE-02 | 1 | YES | Minimum quantity handling is stable — system behavior predictable |
| EDGE-03 | 1 | PARTIAL | Mixed-temperature line items may require complex SAP configuration — system behavior varies by setup |

**Target automation coverage:** 10 of 14 TCs (71%)
- 10 TCs marked YES (full automation candidates)
- 3 TCs marked PARTIAL (automation possible with manual verification or configuration prerequisites)
- 1 TC marked PARTIAL (ERR-04 label printing — requires output system integration)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first — highest business + regulatory risk):
  TC-CS-{NNN} — HP-01: Create Outbound Delivery with 2-8°C cold-chain
  TC-CS-{NNN+1} — HP-02: Create Outbound Delivery with -20°C frozen cold-chain
  TC-CS-{NNN+2} — NEG-01: Non-certified carrier rejection
  TC-CS-{NNN+3} — NEG-02: No temp-controlled storage blocking
  TC-CS-{NNN+4} — ERR-03: Missing Sales Order Number

Priority 2 — HIGH (validate immediately after — prevent configuration/workflow issues):
  TC-CS-{NNN+5} — AP-01: Ultra-cold-chain (-80°C) delivery
  TC-CS-{NNN+6} — NEG-03: Non-released Sales Order rejection
  TC-CS-{NNN+7} — NEG-04: Standard shipping method rejection
  TC-CS-{NNN+8} — ERR-01: Missing Shipping Method
  TC-CS-{NNN+9} — ERR-02: Missing Carrier
  TC-CS-{NNN+10} — ERR-04: Label printing failure handling
  TC-CS-{NNN+11} — EDGE-03: Mixed-temp line items handling

Priority 3 — MEDIUM (complete coverage — boundary validation):
  TC-CS-{NNN+12} — EDGE-01: Borderline temperature classification (15-25°C)
  TC-CS-{NNN+13} — EDGE-02: Minimum quantity (1 unit)

Priority 4 — Integration:
  None (no linked issues — implicit integrations covered in Priority 1-3 scenarios)
```

**Execution guidance:**
- Stop execution if Priority 1 (CRITICAL) scenarios fail — core business process is broken
- Priority 2 (HIGH) failures indicate configuration or validation issues — investigate before proceeding
- Priority 3 (MEDIUM) failures are non-blocking but should be resolved before production release

---

## Regulatory and Compliance Notes

**Pharmaceutical Cold-Chain Compliance:**
- Biologics (vaccines, monoclonal antibodies, blood products) are temperature-sensitive pharmaceutical products regulated under FDA 21 CFR Part 211, EU GDP guidelines, and WHO guidance on temperature-controlled distribution
- Cold-chain break (temperature excursion outside specified range) can result in product degradation, loss of efficacy, and patient safety risk
- Regulatory documentation requirements: temperature-sensitive labels, handling instructions, and temperature monitoring records must be maintained for audit trail

**SAP-Specific Compliance Notes:**
- Test cases must verify that mandatory cold-chain shipping conditions are auto-assigned (AC-2) — manual selection risks human error
- Carrier certification validation (AC-3) must be enforced — non-certified carriers are a critical compliance gap
- Temperature-controlled storage location blocking (AC-4) must prevent picking from inappropriate warehouse areas
- Temperature range and duration recording (AC-6) in delivery header provides carrier visibility and audit trail

**Test Data Governance:**
- Ensure test data does not use real production vendor or material IDs (GDPR/privacy compliance)
- All test execution must use dedicated test system instances (not production)
- Test Sales Orders must use valid biologics material master data with temperature requirements configured
- Test carriers must have cold-chain certification flags correctly maintained in vendor master

**Audit Trail Requirements:**
- Test cases HP-01, HP-02, AP-01 must verify temperature range recording in delivery header (AC-6)
- Test case HP-01 must verify temperature-sensitive label output (AC-5) — required for regulatory documentation
- All NEG and ERR scenarios must verify appropriate error messages are logged (audit trail for rejected transactions)

---

## TestCase Agent Instructions

When consuming this strategy:

1. **Read** `CS-35-risk-profile.json` for the structured scenario inventory
2. **Generate test cases** for ALL MANDATORY scenario types first:
   - HP: 2 test cases (HP-01 2-8°C, HP-02 -20°C)
   - AP: 1 test case (AP-01 -80°C ultra-cold)
   - NEG: 4 test cases (NEG-01 to NEG-04)
   - ERR: 4 test cases (ERR-01 to ERR-04)
   - EDGE: 3 test cases (EDGE-01 to EDGE-03)
3. **Apply quality gates** — verify all thresholds are met before completing:
   - 100% AC coverage (all 6 ACs covered)
   - All 14 scenarios from inventory generated
   - 0 hardcoded values (all data in `{TD.*}` placeholders)
   - ≥ 10 TCs flagged as automation candidates
4. **Use** `prompts/testcase-generation-from-userstory.md` as the generation template
5. **Flag automation candidates** per the Automation Viability table above:
   - HP, AP, NEG, ERR (most): YES
   - ERR-04 (label printing), EDGE-01 (borderline temp), EDGE-03 (mixed-temp): PARTIAL
6. **Output files** to:
   - `testcases/AI-generated testcases/CS-35/testcases/` — individual TC markdown files
   - `testcases/AI-generated testcases/CS-35/CS-35-coverage-matrix.md` — AC traceability
   - `testcases/AI-generated testcases/CS-35/CS-35-summary.json` — machine-readable registry
   - `testdata/CS-35/CS-35-testdata.json` — parameterized test data (3 temperature ranges, carrier certification variants, storage location types, SO status variants)
   - `testdata/CS-35/CS-35-testdata-guide.md` — instructions for resolving real SAP values
7. **Test data structure** must include:
   - Sales Orders: released (valid), non-released (NEG-03), with different temperature materials
   - Materials: biologics with 2-8°C, -20°C, -80°C, 15-25°C temperature requirements
   - Carriers: certified (valid), non-certified (NEG-01)
   - Shipping Methods: cold-chain (COLD, FROZ, UCLD), standard/ambient (NEG-04)
   - Storage Locations: temp-controlled (valid), non-temp-controlled (NEG-02)
   - Quantities: minimum (1), standard (10), multi-item with mixed temps (EDGE-03)
