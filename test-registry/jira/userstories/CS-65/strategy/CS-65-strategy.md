# Test Strategy: [CS-65] Maintain A Bill Of Material (Bom) For A Pharmaceutical Finished Produc

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-65/strategy/CS-65-analysis.md
**Risk Profile:**     jira/userstories/CS-65/strategy/CS-65-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Master Data Specialist
- **Business Object:** Bill of Material (BOM)
- **SAP Module:** PP — Production Planning and Manufacturing
- **Business Goal:** Ensure production always uses a validated and regulatory-compliant formula

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 2 | 2 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 1 | 1 | HIGH |
| Negative (NEG) | MANDATORY | 6 | 6 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 5 | 5 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 6 | 6 | MEDIUM |
| State Transition (ST) | MANDATORY | 3 | 3 | CRITICAL |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | N/A |
| **TOTAL** | — | **23** | **23** | — |

**Rationale for Coverage Model:**
- Overall Risk = CRITICAL → mandates HP, NEG, ERR, EDGE, ST coverage per strategy rules
- 4 of 6 ACs are CRITICAL or HIGH risk → comprehensive validation and error coverage required
- Pharmaceutical regulatory context → BOM versioning, audit trail, and component approval status are compliance-critical
- State Transition scenarios elevated to MANDATORY due to AC-4 (versioning) and AC-5 (release status enforcement) being CRITICAL risk
- No linked issues → INT = NOT APPLICABLE (domain dependencies captured in pre-conditions)

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

#### Happy Path (HP) — 2 scenarios

**HP-01:** Create BOM for finished pharmaceutical product with single active ingredient and excipient components, all approved and active
- **Risk:** CRITICAL
- **ACs Covered:** AC-1 (navigation), AC-2 (material validation), AC-6 (change history)
- **Priority:** CRITICAL

**HP-02:** Create BOM with alternative/substitute components, each flagged with regulatory approval status
- **Risk:** HIGH
- **ACs Covered:** AC-2 (material validation), AC-3 (alternative components), AC-6 (change history)
- **Priority:** CRITICAL

#### Alternative Path (AP) — 1 scenario

**AP-01:** Create BOM with multiple alternative components for a single item (multiple approved substitutes)
- **Risk:** HIGH
- **ACs Covered:** AC-3 (alternative components)
- **Priority:** HIGH

#### Negative (NEG) — 6 scenarios

**NEG-01:** Attempt to add BOM component with non-existent material ID
- **Risk:** CRITICAL
- **ACs Covered:** AC-2 (material validation)
- **Priority:** HIGH

**NEG-02:** Attempt to add BOM component with inactive/blocked material master
- **Risk:** CRITICAL
- **ACs Covered:** AC-2 (material validation)
- **Priority:** HIGH

**NEG-03:** Attempt to add substitute component without regulatory approval status flag
- **Risk:** HIGH
- **ACs Covered:** AC-3 (alternative components)
- **Priority:** HIGH

**NEG-04:** Attempt to create process order against BOM with Draft status
- **Risk:** CRITICAL
- **ACs Covered:** AC-5 (release status enforcement)
- **Priority:** HIGH

**NEG-05:** Attempt to create process order against BOM with In Review status
- **Risk:** CRITICAL
- **ACs Covered:** AC-5 (release status enforcement)
- **Priority:** HIGH

**NEG-06:** Attempt to create process order against BOM with Obsolete status
- **Risk:** CRITICAL
- **ACs Covered:** AC-5 (release status enforcement)
- **Priority:** HIGH

#### Error / Missing Field (ERR) — 5 scenarios

**ERR-01:** Missing Finished Product Material field
- **Risk:** HIGH
- **ACs Covered:** AC-2 (material validation)
- **Field:** Finished Product Material
- **Priority:** HIGH

**ERR-02:** Missing Plant field
- **Risk:** HIGH
- **ACs Covered:** AC-2 (material validation)
- **Field:** Plant
- **Priority:** HIGH

**ERR-03:** Missing Component Material field
- **Risk:** HIGH
- **ACs Covered:** AC-2 (material validation)
- **Field:** Component Material
- **Priority:** HIGH

**ERR-04:** Missing Component Quantity field
- **Risk:** HIGH
- **ACs Covered:** AC-2 (material validation)
- **Field:** Component Quantity
- **Priority:** HIGH

**ERR-05:** Missing Component UoM field
- **Risk:** HIGH
- **ACs Covered:** AC-2 (material validation)
- **Field:** Component UoM
- **Priority:** HIGH

#### Edge Case / Boundary (EDGE) — 6 scenarios

**EDGE-01:** Minimum component quantity (0.001 or smallest precision based on UoM)
- **Risk:** MEDIUM
- **ACs Covered:** AC-2 (material validation)
- **Parameter:** Component Quantity (lower boundary)
- **Priority:** MEDIUM

**EDGE-02:** Maximum component quantity (system upper limit)
- **Risk:** MEDIUM
- **ACs Covered:** AC-2 (material validation)
- **Parameter:** Component Quantity (upper boundary)
- **Priority:** MEDIUM

**EDGE-03:** Zero component quantity (invalid)
- **Risk:** MEDIUM
- **ACs Covered:** AC-2 (material validation)
- **Parameter:** Component Quantity (zero boundary)
- **Priority:** MEDIUM

**EDGE-04:** Single-component BOM (minimum valid BOM structure)
- **Risk:** MEDIUM
- **ACs Covered:** AC-2 (material validation)
- **Parameter:** Number of Components (lower boundary)
- **Priority:** MEDIUM

**EDGE-05:** BOM with maximum number of components (system-configured limit)
- **Risk:** MEDIUM
- **ACs Covered:** AC-2 (material validation)
- **Parameter:** Number of Components (upper boundary)
- **Priority:** MEDIUM

**EDGE-06:** Maximum number of alternatives per component item
- **Risk:** MEDIUM
- **ACs Covered:** AC-3 (alternative components)
- **Parameter:** Number of Alternatives (upper boundary)
- **Priority:** MEDIUM

#### State Transition (ST) — 3 scenarios

**ST-01:** Modify released BOM → verify new version created, status = Draft, old version remains Released
- **Risk:** CRITICAL
- **ACs Covered:** AC-4 (versioning on change), AC-6 (change history)
- **Priority:** CRITICAL

**ST-02:** Change Draft BOM (no new version created — in-place edit)
- **Risk:** MEDIUM
- **ACs Covered:** AC-4 (versioning on change), AC-6 (change history)
- **Priority:** MEDIUM

**ST-03:** Release new BOM version → verify status transition Draft → Released
- **Risk:** CRITICAL
- **ACs Covered:** AC-4 (versioning on change), AC-5 (release status enforcement)
- **Priority:** CRITICAL

### Recommended Scenarios

All scenarios listed above are MANDATORY or RECOMMENDED for this CRITICAL-risk story. No additional optional scenarios identified.

### Optional Scenarios

None — given the CRITICAL risk level and pharmaceutical regulatory context, all 23 scenarios are required for compliance and quality assurance.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — all 6 ACs covered by ≥ 1 TC | YES |
| HP Coverage | All 2 HP scenarios generated | YES |
| AP Coverage | 1 AP scenario generated | YES |
| NEG Coverage | All 6 NEG scenarios generated | YES |
| ERR Coverage | All 5 ERR scenarios generated | YES |
| EDGE Coverage | All 6 EDGE scenarios generated | YES |
| ST Coverage | All 3 ST scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values — all data via {TD.*} or {ENV.*} placeholders | YES |
| Automation Eligibility | ≥ 12 TCs flagged as Automation Candidate: YES (≥ 50% of total) | YES |
| Regulatory Compliance Notes | Test data guide explicitly states: "Use test system only, no production vendor/material IDs" | YES |

**Overall pass threshold:** All mandatory gates must PASS. 100% completion required for CRITICAL-risk story.

**Additional CRITICAL-risk gates:**
- **Negative coverage (entity validation):** 100% — all NEG scenarios covering invalid materials, inactive materials, and unapproved substitutes generated
- **Error coverage (mandatory fields):** 100% — all 5 mandatory fields (Finished Product Material, Plant, Component Material, Component Quantity, Component UoM) tested

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core BOM creation) | CRITICAL | CRITICAL | Core master data operation for production planning — failure blocks manufacturing execution |
| HP (alternative components) | CRITICAL | CRITICAL | Regulatory compliance requirement — approved substitutes must be properly configured |
| AP (multiple alternatives) | HIGH | MAJOR | Complex scenario for substitute management — incorrect configuration leads to formula deviation |
| NEG (invalid/inactive material) | HIGH | MAJOR | Material validation failures violate GMP and FDA 21 CFR Part 11 requirements |
| NEG (unapproved substitute) | HIGH | MAJOR | Regulatory compliance — use of unapproved substitutes = audit finding |
| NEG (process order with non-released BOM) | HIGH | MAJOR | Business rule enforcement critical to change control compliance |
| ERR (missing mandatory fields) | HIGH | MAJOR | Data integrity — missing fields break downstream MRP and production execution |
| EDGE (quantity boundaries) | MEDIUM | MINOR | Boundary value analysis — edge cases may cause rounding errors or system performance issues |
| EDGE (component count boundaries) | MEDIUM | MINOR | System limits verification — performance and data integrity at scale |
| ST (versioning on change) | CRITICAL | CRITICAL | Change control compliance — failure to version released BOMs = severe audit finding |
| ST (release transition) | CRITICAL | CRITICAL | Status lifecycle enforcement — ensures only approved BOMs used in production |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright — stable navigation, field entry, success verification |
| AP | YES | Data-driven via testdata JSON — multiple alternatives parameterized |
| NEG | YES | Stable validation checks — error messages are predictable and verifiable |
| ERR | YES | Field-level validation stable — mandatory field checks consistent |
| EDGE | PARTIAL | Boundary values may require specific SAP configuration (UoM precision, system limits) — automate after test data validation |
| ST | PARTIAL | BOM versioning requires multi-step workflow orchestration (create → release → modify → verify version) — automate with careful state management |

**Target automation coverage:** 18 of 23 TCs (78%)
- Fully automatable: HP (2) + AP (1) + NEG (6) + ERR (5) = 14 TCs
- Partially automatable: EDGE (4 of 6) + ST (3 of 3) = 7 TCs (automate after manual validation)
- Total: 14 + 4 = 18 TCs

**Automation Prerequisites:**
- Test master data setup: finished product materials (FERT type), component materials (active + inactive for NEG tests), approved and unapproved alternatives
- Valid plant configuration in SAP organizational structure
- BOM usage types configured (Production, Engineering, Universal)
- Engineering Change Management (ECM) configuration if change numbers are required in this SAP tenant

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first, fail-fast on core functionality):
  TC-CS-[HP-01] — Create BOM with standard components (core transaction)
  TC-CS-[HP-02] — Create BOM with alternative/substitute components
  TC-CS-[ST-01] — Modify released BOM → verify new version created
  TC-CS-[ST-03] — Release new BOM version → verify status transition

Priority 2 — HIGH (validate immediately after core stability confirmed):
  TC-CS-[NEG-01] — Reject non-existent material ID
  TC-CS-[NEG-02] — Reject inactive/blocked material
  TC-CS-[NEG-03] — Reject substitute without approval status
  TC-CS-[NEG-04] — Prevent process order with Draft BOM
  TC-CS-[NEG-05] — Prevent process order with In Review BOM
  TC-CS-[NEG-06] — Prevent process order with Obsolete BOM
  TC-CS-[ERR-01] — Missing Finished Product Material
  TC-CS-[ERR-02] — Missing Plant
  TC-CS-[ERR-03] — Missing Component Material
  TC-CS-[ERR-04] — Missing Component Quantity
  TC-CS-[ERR-05] — Missing Component UoM
  TC-CS-[AP-01] — Multiple alternatives for single component

Priority 3 — MEDIUM (complete coverage, boundary verification):
  TC-CS-[EDGE-01] — Minimum component quantity
  TC-CS-[EDGE-02] — Maximum component quantity
  TC-CS-[EDGE-03] — Zero component quantity (invalid)
  TC-CS-[EDGE-04] — Single-component BOM
  TC-CS-[EDGE-05] — Maximum components per BOM
  TC-CS-[EDGE-06] — Maximum alternatives per component
  TC-CS-[ST-02] — Change Draft BOM (in-place edit)

Priority 4 — Integration (N/A for this story):
  None — no linked issues. Domain dependencies (Material Master, Process Orders) captured in pre-conditions.
```

**Execution Strategy:**
- Run Priority 1 (CRITICAL) first — if any fail, stop and fix before proceeding
- Run Priority 2 (HIGH) next — comprehensive validation and error coverage
- Run Priority 3 (MEDIUM) for complete boundary coverage
- Recommended execution time: CRITICAL + HIGH scenarios ≤ 30 minutes (target for CI/CD fast feedback)

---

## Regulatory and Compliance Notes

**Pharmaceutical Industry Context (FDA 21 CFR Part 11, EU GMP Annex 11):**
- Bills of Material are critical master data records subject to full audit trail requirements
- All BOM changes must be traceable: user ID, timestamp, field-level changes (AC-6 verification mandatory)
- Released BOMs are locked from direct editing — changes trigger versioning (AC-4 enforcement critical)
- Component approval status must be explicitly captured for regulatory compliance (AC-3 requirement)
- Process orders must only reference Released BOMs — system must prevent use of Draft/In Review/Obsolete versions (AC-5 enforcement critical)

**Test Data Governance:**
- **Ensure test data does not use real production vendor or material IDs** — risk of accidental master data corruption
- All test execution must use dedicated test system instances (not production SAP tenant)
- Test materials must be clearly marked as "TEST" in material master descriptions
- Use material type FERT (finished product) or HALB (semi-finished product) for finished product materials
- Use material type ROH (raw material) or HALB for component materials
- Ensure test plant configuration is isolated from production plant data

**Data Retention:**
- BOM change history records must be retained per regulatory archive requirements (typically 7+ years for pharmaceutical)
- Test execution logs and screenshots should be archived for audit trail purposes

---

## TestCase Agent Instructions

When consuming this strategy:

1. **Read structured data:** `CS-65-risk-profile.json` for the complete scenario inventory with IDs, descriptions, risk levels, and AC mappings
2. **Generate MANDATORY scenarios first:**
   - HP (2 scenarios) — Priority 1
   - NEG (6 scenarios) — Priority 2
   - ERR (5 scenarios) — Priority 2
   - EDGE (6 scenarios) — Priority 3
   - ST (3 scenarios) — Priority 1 and 3
3. **Generate RECOMMENDED scenarios:**
   - AP (1 scenario) — Priority 2
4. **Apply quality gates:** Verify all 10 gates pass before completing generation
5. **Use generation template:** `prompts/testcase-generation-from-userstory.md`
6. **Flag automation candidates:** Mark HP, AP, NEG, ERR as "YES"; EDGE and ST as "PARTIAL" per Automation Viability table
7. **Output locations:**
   - Test cases: `testcases/AI-generated testcases/CS-65/testcases/`
   - Coverage matrix: `testcases/AI-generated testcases/CS-65/CS-65-coverage-matrix.md`
   - Summary: `testcases/AI-generated testcases/CS-65/CS-65-summary.json`
   - Test data: `testdata/CS-65/CS-65-testdata.json`
   - Test data guide: `testdata/CS-65/CS-65-testdata-guide.md`
8. **Parameterization:** All SAP-specific values (material IDs, plant codes, quantities, UoMs) must use `{TD.*}` placeholders
9. **Regulatory notes:** Include compliance context in test data guide and TC preconditions

---

## Summary

- **Total Planned TCs:** 23 (min = target for CRITICAL risk)
- **Breakdown:** HP:2 + AP:1 + NEG:6 + ERR:5 + EDGE:6 + ST:3
- **Priority Distribution:** CRITICAL:5, HIGH:13, MEDIUM:5
- **Automation Target:** 18 TCs (78%)
- **Quality Gates:** 10 mandatory gates, 100% pass threshold required
- **Regulatory Context:** Pharmaceutical BOM management — full audit trail, versioning, approval status enforcement
- **Risk Mitigation:** Comprehensive validation coverage (NEG + ERR = 11 TCs) addresses CRITICAL material validation and release status enforcement risks
- **Next Step:** Run `/generate-testcases CS-65`
