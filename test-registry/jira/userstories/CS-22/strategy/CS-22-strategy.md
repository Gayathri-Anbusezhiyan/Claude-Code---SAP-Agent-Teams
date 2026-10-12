# Test Strategy: [CS-22] View An Aggregated Vendor Quality Scorecard Based On Inspection Reject

**Created:**          2026-08-24
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   test-registry/jira/userstories/CS-22/strategy/CS-22-analysis.md
**Risk Profile:**     test-registry/jira/userstories/CS-22/strategy/CS-22-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Procurement Manager
- **Business Object:** Vendor Evaluation Report
- **SAP Module:** MM — Materials Management
- **Business Goal:** Make informed sourcing decisions for regulated materials based on vendor quality metrics

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 5 | 5 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 4 | 4 | HIGH |
| Negative (NEG) | MANDATORY | 5 | 5 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 3 | 3 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 8 | 8 | MEDIUM |
| Integration (INT) | RECOMMENDED | 2 | 2 | HIGH |
| **TOTAL** | — | **27** | **27** | — |

**Coverage Model Rationale:**
- **CRITICAL risk** story requires full coverage across all scenario types
- HP scenarios are MANDATORY — cover core app access, calculation display, drill-down, and export
- AP scenarios are RECOMMENDED — cover configurable time periods and threshold states (green/yellow/red)
- NEG scenarios are MANDATORY — cover invalid vendor, no data conditions, threshold breach
- ERR scenarios are MANDATORY — cover missing mandatory fields and invalid date ranges
- EDGE scenarios are MANDATORY — extensive boundary testing for time periods, thresholds, acceptance rates, and delivery rates (8 edge cases identified)
- INT scenarios are RECOMMENDED — cross-module validation with QM inspection lots and MM PO/GR documents

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP) — 5 scenarios:**
- **HP-01**: Access Vendor Evaluation app and view scorecard for valid vendor with inspection history — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-5
- **HP-02**: View batch acceptance rate for configurable time period (standard period, e.g., last 90 days) — Risk: CRITICAL — ACs: AC-2
- **HP-03**: View on-time delivery performance with valid PO and GR data — Risk: CRITICAL — ACs: AC-3
- **HP-04**: Drill down from scorecard to inspection lot details for rejected lots — Risk: HIGH — ACs: AC-4
- **HP-05**: Export vendor quality scorecard to audit-compliant report format — Risk: HIGH — ACs: AC-6

**Negative (NEG) — 5 scenarios:**
- **NEG-01**: Attempt to view scorecard for non-existent vendor ID — Risk: MEDIUM — ACs: AC-1, AC-2
- **NEG-02**: Attempt to view scorecard for vendor with no inspection history (zero lots) — Risk: MEDIUM — ACs: AC-2
- **NEG-03**: Attempt to drill down when no rejected inspection lots exist — Risk: MEDIUM — ACs: AC-4
- **NEG-04**: View on-time delivery when vendor has no purchase orders or goods receipts — Risk: MEDIUM — ACs: AC-3
- **NEG-05**: Vendor falls below quality threshold (red flag) — Risk: HIGH — ACs: AC-5

**Error (ERR) — 3 scenarios:**
- **ERR-01**: Missing Vendor ID field — Risk: MEDIUM — ACs: AC-1
- **ERR-02**: Invalid date range (To Date before From Date) — Risk: MEDIUM — ACs: AC-2
- **ERR-03**: Export fails due to insufficient authorization — Risk: HIGH — ACs: AC-6

**Edge Cases (EDGE) — 8 scenarios:**
- **EDGE-01**: Time period = 1 day (minimum boundary) — Risk: MEDIUM — ACs: AC-2
- **EDGE-02**: Time period = maximum historical data range (e.g., 3 years) — Risk: MEDIUM — ACs: AC-2
- **EDGE-03**: Quality threshold = 0% (all vendors flagged) — Risk: MEDIUM — ACs: AC-5
- **EDGE-04**: Quality threshold = 100% (no vendors flagged) — Risk: MEDIUM — ACs: AC-5
- **EDGE-05**: Batch acceptance rate = 0% (all lots rejected) — Risk: HIGH — ACs: AC-2, AC-5
- **EDGE-06**: Batch acceptance rate = 100% (all lots accepted) — Risk: LOW — ACs: AC-2, AC-5
- **EDGE-07**: On-time delivery rate = 0% (all deliveries late) — Risk: HIGH — ACs: AC-3, AC-5
- **EDGE-08**: On-time delivery rate = 100% (all deliveries on-time) — Risk: LOW — ACs: AC-3

### Recommended Scenarios

**Alternative Path (AP) — 4 scenarios:**
- **AP-01**: View scorecard with custom time period (e.g., last 12 months) — Risk: MEDIUM — ACs: AC-2
- **AP-02**: View scorecard filtered by specific purchasing organization or plant — Risk: MEDIUM — ACs: AC-2, AC-3
- **AP-03**: View vendor with quality threshold met (above threshold, green status) — Risk: HIGH — ACs: AC-5
- **AP-04**: View vendor with quality threshold warning (near threshold, yellow status) — Risk: HIGH — ACs: AC-5

**Integration (INT) — 2 scenarios:**
- **INT-01**: Verify batch acceptance rate aggregates inspection lot results from QM module — Risk: HIGH — Integration: QM inspection lots
- **INT-02**: Verify on-time delivery calculation uses PO delivery dates and GR actual dates — Risk: HIGH — Integration: MM PO + GR documents

### Optional Scenarios

None — all identified scenarios are either MANDATORY or RECOMMENDED due to CRITICAL overall risk.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 5 HP scenarios generated | YES |
| NEG Coverage | All 5 NEG scenarios generated | YES |
| ERR Coverage | All 3 ERR scenarios generated | YES |
| EDGE Coverage | All 8 EDGE TCs generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 14 TCs flagged as Automation Candidate: YES | YES |

**CRITICAL Risk Additional Gates:**
| Additional Gate | Threshold | Mandatory |
|----------------|-----------|---------|
| Entity validation coverage | 100% — NEG-01 (non-existent vendor) included | YES |
| Mandatory field coverage | 100% — ERR-01 (vendor), ERR-02 (date range) included | YES |
| Calculation verification | 100% — HP-02 (acceptance rate), HP-03 (OTD rate) verify formulas | YES |

**Overall pass threshold:** All mandatory gates must PASS. At least 75% of recommended scenarios (AP + INT) must be generated.

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core analytical views) | CRITICAL | CRITICAL | Vendor quality scorecard is a decision-making tool — incorrect data leads to poor sourcing decisions and regulatory risk |
| HP (drill-down navigation) | HIGH | MAJOR | Essential for root cause analysis of quality issues |
| HP (export) | HIGH | MAJOR | GMP audit compliance requirement — export failures block regulatory reporting |
| AP (threshold states) | HIGH | MAJOR | Threshold flagging drives vendor qualification decisions — must test all states |
| NEG (invalid vendor) | HIGH | MAJOR | System must handle invalid vendor gracefully without calculation errors |
| NEG (no data scenarios) | MEDIUM | MINOR | Edge condition but must be handled (empty state display) |
| NEG (threshold breach) | HIGH | MAJOR | Red flag state is the primary action trigger for procurement |
| ERR (missing vendor) | HIGH | MAJOR | Mandatory field enforcement prevents incomplete queries |
| ERR (invalid date range) | HIGH | MAJOR | Date validation prevents nonsensical calculations |
| ERR (export authorization) | HIGH | MAJOR | Security compliance — unauthorized export must be blocked |
| EDGE (time period boundaries) | MEDIUM | MINOR | Boundary conditions for configurable periods must be stable |
| EDGE (threshold boundaries) | MEDIUM | MINOR | 0% and 100% are valid but require special handling |
| EDGE (rate boundaries) | HIGH | MAJOR | 0% acceptance/delivery rates indicate severe quality issues — calculation must be accurate |
| INT (QM aggregation) | HIGH | MAJOR | Incorrect QM data aggregation invalidates entire scorecard |
| INT (PO/GR comparison) | HIGH | MAJOR | OTD calculation depends on accurate date extraction from multiple documents |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright — stable analytical app navigation and verification |
| AP | PARTIAL | Threshold state scenarios (AP-03, AP-04) require specific test data setup; time period and filter scenarios (AP-01, AP-02) are automatable |
| NEG | YES | Stable validation checks — non-existent vendor, no data conditions are repeatable |
| ERR | YES | Field-level validation is stable — missing fields and invalid date ranges are automatable |
| EDGE | PARTIAL | Boundary value scenarios are automatable but may require SAP historical data configuration (e.g., 3-year data range) |
| INT | NO | Cross-module integration testing requires QM inspection lot creation and PO/GR document setup — complex multi-module orchestration not suitable for Playwright in Phase 1 |

**Target automation coverage:** 18 of 27 TCs (67%)
- YES: 5 HP + 5 NEG + 3 ERR = 13 TCs
- PARTIAL: 4 AP (2 automatable) + 8 EDGE (6 automatable) = 8 automatable, 4 manual = 8 TCs
- NO: 2 INT = 0 TCs
- **Total automatable: 13 + 5 (from PARTIAL) = 18 TCs**

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  HP-01: Access Vendor Evaluation app and view scorecard for valid vendor
  HP-02: View batch acceptance rate for configurable time period
  HP-03: View on-time delivery performance
  HP-04: Drill down to inspection lot details
  HP-05: Export vendor quality scorecard

Priority 2 — HIGH (validate immediately after):
  NEG-01: Non-existent vendor ID
  NEG-05: Vendor falls below quality threshold (red flag)
  ERR-01: Missing Vendor ID field
  ERR-02: Invalid date range
  ERR-03: Export authorization failure
  AP-03: Quality threshold met (green status)
  AP-04: Quality threshold warning (yellow status)
  EDGE-05: Batch acceptance rate = 0% (all rejected)
  EDGE-07: On-time delivery rate = 0% (all late)

Priority 3 — MEDIUM (complete coverage):
  NEG-02: Vendor with no inspection history
  NEG-03: No rejected inspection lots
  NEG-04: No purchase orders or goods receipts
  AP-01: Custom time period
  AP-02: Filter by purchasing org or plant
  EDGE-01: Time period = 1 day (minimum)
  EDGE-02: Time period = maximum range
  EDGE-03: Quality threshold = 0%
  EDGE-04: Quality threshold = 100%
  EDGE-06: Batch acceptance rate = 100% (all accepted)
  EDGE-08: On-time delivery rate = 100% (all on-time)

Priority 4 — Integration (run after core stability confirmed):
  INT-01: Verify QM inspection lot aggregation
  INT-02: Verify PO/GR date comparison calculation
```

---

## Regulatory and Compliance Notes

**GMP (Good Manufacturing Practice) Compliance:**
- This feature supports GMP vendor qualification and audit processes for regulated materials
- Exported reports must be audit-ready and traceable to source data (inspection lots, POs, GRs)
- Test cases must verify that exported reports contain all required data fields for GMP audits
- Quality threshold flagging is a regulatory control — false positives/negatives have compliance implications

**Data Privacy and Test Governance:**
- Ensure test data does not use real production vendor IDs — use dedicated test vendors
- Inspection lot data should be synthetic or anonymized
- All test execution must use dedicated test system instances (not production)
- Quality scorecard access requires appropriate authorization — test ERR-03 verifies this control

**SAP S/4HANA Cloud Standard:**
- Vendor Evaluation analytical apps are standard Fiori applications in S/4HANA Cloud
- Quality threshold configuration is tenant-specific — document actual threshold values in testdata files
- Historical data retention policies may affect EDGE-02 (maximum time period) — verify with SAP basis team

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-22-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, NEG, ERR, EDGE = 21 TCs)
3. Generate RECOMMENDED types (AP, INT = 6 TCs) to reach target of 27 TCs
4. Apply quality gates table — verify all thresholds are met before completing:
   - 100% AC traceability (all 6 ACs covered)
   - All 5 HP scenarios generated
   - All 5 NEG scenarios generated
   - All 3 ERR scenarios generated
   - All 8 EDGE scenarios generated
   - Zero hardcoded vendor IDs, dates, or thresholds — use `{TD.*}` placeholders
   - At least 14 TCs flagged as "Automation Candidate: YES"
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above:
   - All HP, NEG, ERR scenarios: YES
   - AP-01, AP-02, EDGE-01 through EDGE-08: PARTIAL → flag as YES if no manual setup required
   - AP-03, AP-04: PARTIAL → flag as PARTIAL (requires specific vendor test data)
   - INT-01, INT-02: NO
7. Output files to `test-registry/testcases/AI-generated testcases/CS-22/testcases/` and `test-registry/testdata/CS/CS-testdata.json`
8. For each test case:
   - Include clear verification steps for calculated fields (acceptance rate %, OTD rate %)
   - Document expected visual indicators (Green/Yellow/Red status)
   - For drill-down scenarios (HP-04, NEG-03), specify navigation path and expected destination
   - For export scenarios (HP-05, ERR-03), specify expected file format and content verification
9. Test data parameters to include in `CS-testdata.json`:
   - Valid vendor with inspection history (for HP-01, HP-02, HP-03)
   - Vendor with quality threshold met/warning/breach (for AP-03, AP-04, NEG-05)
   - Vendor with rejected inspection lots (for HP-04)
   - Vendor with no inspection history (for NEG-02)
   - Non-existent vendor ID (for NEG-01)
   - Valid time period ranges (standard, custom, 1-day, 3-year)
   - Quality threshold values (0%, 50%, 75%, 100%)
   - Date ranges (valid and invalid)
