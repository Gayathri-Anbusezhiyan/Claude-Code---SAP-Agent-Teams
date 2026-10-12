# Test Strategy: [CS-17] Maintain An Approved Vendor List (Source List) For Critical Gmp Raw Ma

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-17/strategy/CS-17-analysis.md
**Risk Profile:**     jira/userstories/CS-17/strategy/CS-17-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Procurement Officer
- **Business Object:** Source List (Approved Vendor List) for Materials
- **SAP Module:** MM — Materials Management
- **Business Goal:** Ensure purchase orders can only be created against vendors who are formally qualified and audited for critical GMP raw materials

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 4 | 4 | CRITICAL |
| Alternative Path (AP) | NOT APPLICABLE | 0 | 0 | — |
| Negative (NEG) | MANDATORY | 3 | 3 | CRITICAL |
| Error / Missing Field (ERR) | MANDATORY | 8 | 8 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 7 | 7 | MEDIUM |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | — |
| **TOTAL** | — | **22** | **22** | — |

**Coverage Model Rationale:**
- **CRITICAL risk story** → All HP, NEG, ERR scenarios are MANDATORY
- **EDGE scenarios MANDATORY** due to time-bound validity (AC-5) and notification timing (AC-6) being HIGH risk ACs
- **AP = NOT APPLICABLE** → No alternative valid paths identified; all HP scenarios are sequential stages of source list lifecycle
- **INT = NOT APPLICABLE** → No linked Jira issues, but implicit integration testing covered in NEG scenarios (PO creation validation against source list)

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

#### Happy Path (HP) — 4 scenarios

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| HP-01 | Create source list entry with single approved vendor for critical GMP material | CRITICAL | AC-1, AC-2, AC-5 |
| HP-02 | Create source list entry with multiple approved vendors for same material-plant combination | CRITICAL | AC-2 |
| HP-03 | Successfully create PO for restricted material using approved vendor from source list | CRITICAL | AC-2, AC-3, AC-4 (inverse validation) |
| HP-04 | Notification sent to Procurement team before vendor approval validity expires | HIGH | AC-6 |

#### Negative (NEG) — 3 scenarios

| ID | Description | Risk | ACs Covered |
|----|-------------|------|-------------|
| NEG-01 | Attempt to create PO for restricted material with non-approved vendor — PO creation blocked | CRITICAL | AC-3, AC-4 |
| NEG-02 | Attempt to create PO for restricted material with vendor not present in source list — PO creation blocked | CRITICAL | AC-3, AC-4 |
| NEG-03 | Attempt to create PO for restricted material with expired vendor approval (validity end date passed) — PO creation blocked | CRITICAL | AC-3, AC-4, AC-5 |

#### Error / Missing Field (ERR) — 8 scenarios

| ID | Description | Risk | ACs Covered | Field |
|----|-------------|------|-------------|-------|
| ERR-01 | Missing Material field | HIGH | AC-2 | Material |
| ERR-02 | Missing Plant field | HIGH | AC-2 | Plant |
| ERR-03 | Missing Vendor field | HIGH | AC-2 | Vendor |
| ERR-04 | Non-existent Material ID entered | HIGH | AC-2 | Material |
| ERR-05 | Non-existent Plant code entered | HIGH | AC-2 | Plant |
| ERR-06 | Non-existent Vendor ID entered | HIGH | AC-2 | Vendor |
| ERR-07 | Valid To date earlier than Valid From date | MEDIUM | AC-5 | Valid To |
| ERR-08 | Valid From date in the past | LOW | AC-5 | Valid From |

#### Edge Cases / Boundary (EDGE) — 7 scenarios

| ID | Description | Risk | ACs Covered | Parameter | Boundary |
|----|-------------|------|-------------|-----------|----------|
| EDGE-01 | Valid From date = today (current date, start of validity period) | MEDIUM | AC-5 | validFrom | lower |
| EDGE-02 | Valid To date = Valid From date (one-day validity period) | MEDIUM | AC-5 | validTo | lower |
| EDGE-03 | Valid To date = far future date (10 years ahead, maximum validity) | LOW | AC-5 | validTo | upper |
| EDGE-04 | Valid To date = null (indefinite approval, no expiry) | MEDIUM | AC-5 | validTo | null |
| EDGE-05 | Notification lead time = 1 day (minimum boundary for AC-6) | HIGH | AC-6 | notificationLeadTime | lower |
| EDGE-06 | Notification lead time = 365 days (maximum boundary for AC-6) | LOW | AC-6 | notificationLeadTime | upper |
| EDGE-07 | Notification lead time = 0 (notification disabled) | MEDIUM | AC-6 | notificationLeadTime | zero |

### Recommended Scenarios

None — all scenarios are MANDATORY given CRITICAL risk classification.

### Optional Scenarios

None — all scenario types are MANDATORY or NOT APPLICABLE.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — all 6 ACs covered by ≥ 1 TC | YES |
| HP Coverage | All 4 HP scenarios generated | YES |
| NEG Coverage | All 3 NEG scenarios generated | YES |
| ERR Coverage | All 8 ERR scenarios generated | YES |
| EDGE Coverage | All 7 EDGE scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values (material IDs, vendor IDs, plant codes, dates) | YES |
| Automation Eligibility | ≥ 11 TCs (50%) flagged as Automation Candidate: YES | YES |
| GMP Compliance Note | All TCs include precondition: "Material is flagged as GMP/critical in material master" | YES |
| Audit Trail Verification | HP-01 and HP-02 include verification step: "Verify Created By and Created On fields populated" | YES |

**CRITICAL Risk Additional Gates:**

| Additional Gate | Threshold |
|----------------|-----------|
| Negative coverage (entity validation) | 100% — 3 NEG scenarios covering all PO blocking conditions |
| Error coverage (mandatory fields) | 100% — ERR-01, ERR-02, ERR-03 cover all mandatory fields (Material, Plant, Vendor) |
| Error coverage (invalid entities) | 100% — ERR-04, ERR-05, ERR-06 cover validation of all entity fields |

**Overall pass threshold:** All mandatory gates must PASS. 100% of scenario targets must be met (no recommended/optional scenarios defined).

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP-01 (core source list creation) | CRITICAL | CRITICAL | Foundation for GMP compliance — failure blocks all downstream vendor approval enforcement |
| HP-02 (multi-vendor approval) | CRITICAL | CRITICAL | Business rule validation — incorrect implementation allows unapproved vendors |
| HP-03 (PO validation pass) | CRITICAL | CRITICAL | Inverse validation — proves source list check is functioning in PO creation flow |
| HP-04 (notification delivery) | HIGH | MAJOR | Preventive control for GMP compliance — missed notification leads to expired vendor usage |
| NEG-01/02/03 (PO blocking) | CRITICAL | CRITICAL | Primary compliance control — failure = regulatory violation and patient safety risk |
| ERR-01/02/03 (missing mandatory fields) | HIGH | MAJOR | Data integrity — prevents incomplete source list entries |
| ERR-04/05/06 (invalid entity validation) | HIGH | MAJOR | Master data integrity — prevents orphaned source list records |
| ERR-07/08 (date validation) | MEDIUM | MINOR | Data quality — prevents illogical validity periods but does not block core function |
| EDGE-01/02/03/04 (date boundaries) | MEDIUM | MINOR | Edge case robustness — ensures system handles all valid date configurations |
| EDGE-05/06/07 (notification timing) | HIGH | MAJOR | Operational reliability — notification timing affects proactive vendor requalification |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP-01, HP-02 | YES | Core source list creation — stable UI, repeatable actions, regression-critical |
| HP-03 | PARTIAL | Requires integration with PO creation app — may need multi-page orchestration |
| HP-04 | NO | Notification delivery requires time-based workflow execution or manual verification in SAP notification inbox — not automatable via Playwright |
| NEG-01, NEG-02, NEG-03 | YES | PO blocking validation — stable error messages, repeatable, regression-critical |
| ERR-01 to ERR-08 | YES | Field-level validation — stable error messages, deterministic outcomes |
| EDGE-01 to EDGE-07 | YES | Date and numeric boundary testing — deterministic inputs, stable validation |

**Target automation coverage:** 20 of 22 TCs (91%)

**Non-automatable scenarios (2 TCs):**
- HP-04: Notification delivery requires background workflow execution and SAP inbox verification — recommend manual execution or separate workflow test suite
- HP-03 (PARTIAL): May require scriptless or manual execution if PO creation app integration proves complex

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-XXX (HP-01) — Create source list with single approved vendor
  TC-CS-XXX (HP-02) — Create source list with multiple approved vendors
  TC-CS-XXX (HP-03) — Successfully create PO using approved vendor
  TC-CS-XXX (NEG-01) — Block PO for non-approved vendor
  TC-CS-XXX (NEG-02) — Block PO for vendor not in source list
  TC-CS-XXX (NEG-03) — Block PO for expired vendor approval

Priority 2 — HIGH (validate immediately after):
  TC-CS-XXX (HP-04) — Notification sent before approval expires
  TC-CS-XXX (ERR-01) — Missing Material field
  TC-CS-XXX (ERR-02) — Missing Plant field
  TC-CS-XXX (ERR-03) — Missing Vendor field
  TC-CS-XXX (ERR-04) — Non-existent Material ID
  TC-CS-XXX (ERR-05) — Non-existent Plant code
  TC-CS-XXX (ERR-06) — Non-existent Vendor ID
  TC-CS-XXX (EDGE-05) — Notification lead time = 1 day

Priority 3 — MEDIUM (complete coverage):
  TC-CS-XXX (ERR-07) — Valid To earlier than Valid From
  TC-CS-XXX (ERR-08) — Valid From in the past
  TC-CS-XXX (EDGE-01) — Valid From = today
  TC-CS-XXX (EDGE-02) — Valid To = Valid From (one-day validity)
  TC-CS-XXX (EDGE-03) — Valid To = 10 years ahead
  TC-CS-XXX (EDGE-04) — Valid To = null (indefinite)
  TC-CS-XXX (EDGE-06) — Notification lead time = 365 days
  TC-CS-XXX (EDGE-07) — Notification lead time = 0 (disabled)

Priority 4 — Integration (run after core stability confirmed):
  None
```

**Execution Notes:**
- Execute HP-01 before all NEG scenarios — NEG scenarios depend on source list entry existing in SAP
- Execute HP-02 before HP-03 to validate multi-vendor support before PO integration testing
- HP-04 should be executed last or in a separate workflow test suite due to time-based nature

---

## Regulatory and Compliance Notes

### GMP Compliance Requirements

- **Source lists for GMP-regulated materials are subject to FDA 21 CFR Part 11 requirements** — all test cases must verify audit trail fields (Created By, Created On, Modified By, Modified On)
- **Vendor qualification is a prerequisite for GMP source list approval** — test data must use pre-qualified vendors only
- **Test execution must not use production material or vendor master data** — all test data must be clearly identifiable as test records (e.g., material IDs prefixed with "TEST-")
- **Source list changes are audit-critical events** — test cases should verify that SAP change documents (CDHDR/CDPOS tables) are created for all source list modifications

### SAP Configuration Prerequisites

- **SPRO Configuration Check Required:** Before executing NEG test cases, confirm with SAP admin that "Source of Supply Check" is activated in SPRO for the target plant/purchasing org combination. If not configured, AC-3/AC-4 cannot be tested.
- **Material Master Prerequisite:** Test materials must have "Source List Requirement" indicator set to "1" (Source list required) or "2" (Source list required + exclusive) in material master (MARC-KORDB field)
- **Notification Configuration:** HP-04 requires custom BAdI or workflow configuration to schedule expiry notifications — verify notification functionality exists before executing HP-04

### Data Privacy

- **Vendor master data may contain confidential commercial information** — test data should use dummy vendor names and addresses, not production vendor data
- **Test execution reports must not be shared outside authorized test team** — source list data may reveal strategic sourcing decisions

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-17-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, NEG, ERR, EDGE)
3. No RECOMMENDED or OPTIONAL scenarios defined — all 22 TCs are MANDATORY
4. Apply quality gates table — verify all thresholds are met before completing:
   - All 6 ACs covered by ≥ 1 TC
   - All 22 scenarios from inventory generated
   - 0 hardcoded values (use `{TD.*}` placeholders)
   - ≥ 11 TCs flagged as Automation Candidate: YES
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above (20 YES, 1 PARTIAL, 1 NO)
7. Output files to `testcases/AI-generated testcases/CS-17/` and `testdata/CS-17/`
8. **GMP Compliance:** Include in all TC preconditions: "Material {TD.materialId} is flagged as GMP/critical in material master (MARC-KORDB = 1 or 2)"
9. **Audit Trail:** HP-01 and HP-02 must include verification step: "Verify Created By = {ENV.SAP_USERNAME} and Created On = current timestamp"
10. **SPRO Prerequisite:** Add to all NEG TCs precondition: "Source of Supply Check activated in SPRO for plant {TD.plant} and purchasing org {TD.purchasingOrg}"
11. **Test Data Naming:** Use "TEST-" prefix for all material IDs and "TESTVENDOR-" prefix for vendor IDs to clearly identify test records
12. **HP-03 Integration Note:** If PO creation app integration cannot be automated via Playwright, flag HP-03 as Automation Candidate: PARTIAL and add note: "May require scriptless execution via Playwright MCP or manual execution"
13. **HP-04 Timing Note:** HP-04 requires time-based workflow execution — flag as Automation Candidate: NO and add note: "Recommend manual execution or separate workflow test suite"
