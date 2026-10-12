# Test Strategy: [CS-18] Receive Materials Into Batch-Managed Stock And Capture The Manufacturi

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-18/strategy/CS-18-analysis.md
**Risk Profile:**     jira/userstories/CS-18/strategy/CS-18-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Warehouse Operator
- **Business Object:** Goods Receipt with Batch Management Data
- **SAP Module:** MM — Materials Management
- **Business Goal:** Enable material tracking and issuance according to First-Expiry-First-Out (FEFO) rules by capturing batch manufacturing date, expiration date, and vendor batch number

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 2 | 2 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 2 | 2 | MEDIUM |
| Negative (NEG) | MANDATORY | 4 | 4 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 3 | 3 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 4 | 4 | CRITICAL (EDGE-01), MEDIUM (others) |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | — |
| **TOTAL** | — | **15** | **15** | — |

**Rationale for CRITICAL risk coverage:**
- Story involves batch management for regulatory compliance and FEFO logic — business-critical for pharmaceutical, food, and chemical industries
- AC-4 (batch master creation) and AC-5 (expiration validation) are both CRITICAL risk — failures impact inventory quality, regulatory compliance, and downstream traceability
- All MANDATORY scenario types must pass 100% — no partial coverage acceptable

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP) — 2 scenarios**

1. **HP-01**: Post goods receipt for batch-managed material with auto-calculated expiration date
   - Risk: CRITICAL
   - ACs Covered: AC-1, AC-2, AC-3, AC-4, AC-6
   - Verifies: Core transaction flow + batch creation + auto-calculation + traceability

2. **HP-02**: Post goods receipt for batch-managed material with manually entered expiration date (override auto-calculation)
   - Risk: HIGH
   - ACs Covered: AC-1, AC-2, AC-3, AC-4, AC-6
   - Verifies: Manual override of shelf-life calculation per AC-3

**Negative (NEG) — 4 scenarios**

3. **NEG-01**: Attempt to post goods receipt with expiration date already passed (calculated or manual)
   - Risk: CRITICAL
   - ACs Covered: AC-5
   - Verifies: System prevents posting expired material — regulatory compliance gate

4. **NEG-02**: Attempt to post goods receipt for non-batch-managed material with batch data entry
   - Risk: MEDIUM
   - ACs Covered: AC-2
   - Verifies: System enforces batch management configuration

5. **NEG-03**: Attempt to post goods receipt with manufacturing date in the future
   - Risk: HIGH
   - ACs Covered: AC-2, AC-3
   - Verifies: Business logic constraint on valid manufacturing dates

6. **NEG-04**: Attempt to post goods receipt with expiration date before manufacturing date
   - Risk: HIGH
   - ACs Covered: AC-2, AC-3
   - Verifies: Date logic validation — expiration must be after manufacturing

**Error / Missing Field (ERR) — 3 scenarios**

7. **ERR-01**: Missing Batch Number field
   - Risk: HIGH
   - ACs Covered: AC-2
   - Field: Batch Number
   - Verifies: Mandatory field enforcement per AC-2

8. **ERR-02**: Missing Manufacturing Date field
   - Risk: HIGH
   - ACs Covered: AC-2
   - Field: Manufacturing Date
   - Verifies: Mandatory field enforcement per AC-2

9. **ERR-03**: Missing Expiration Date field (when auto-calculation is not configured)
   - Risk: HIGH
   - ACs Covered: AC-2
   - Field: Expiration Date
   - Verifies: Mandatory field enforcement per AC-2 (when manual entry required)

**Edge Case / Boundary (EDGE) — 4 scenarios**

10. **EDGE-01**: Expiration date equals current date (same-day expiration)
    - Risk: CRITICAL
    - ACs Covered: AC-5
    - Parameter: expirationDate (lower boundary)
    - Verifies: Boundary condition of AC-5 validation — expiration "has already passed" includes same-day

11. **EDGE-02**: Manufacturing date equals current date (today)
    - Risk: MEDIUM
    - ACs Covered: AC-2, AC-3
    - Parameter: manufacturingDate (upper boundary)
    - Verifies: Same-day manufacturing is valid

12. **EDGE-03**: Minimum quantity boundary (0.001 or UoM-specific minimum)
    - Risk: LOW
    - ACs Covered: AC-4
    - Parameter: quantity (lower boundary)
    - Verifies: Batch creation succeeds with minimum valid quantity

13. **EDGE-04**: Maximum shelf life (e.g., 10 years for long-shelf-life materials)
    - Risk: LOW
    - ACs Covered: AC-3
    - Parameter: shelfLife (upper boundary)
    - Verifies: Auto-calculation handles long shelf-life materials correctly

### Recommended Scenarios

**Alternative Path (AP) — 2 scenarios**

14. **AP-01**: Post goods receipt with vendor batch number populated
    - Risk: MEDIUM
    - ACs Covered: AC-2, AC-4, AC-6
    - Verifies: Vendor batch capture workflow (common in pharmaceutical/chemical industries)

15. **AP-02**: Post goods receipt without vendor batch number (if optional in system config)
    - Risk: LOW
    - ACs Covered: AC-2, AC-4, AC-6
    - Verifies: Flexibility in system configuration — vendor batch may be optional

### Optional Scenarios

None — all identified scenarios are MANDATORY or RECOMMENDED given the CRITICAL risk level.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 2 HP scenarios generated | YES |
| NEG Coverage | All 4 NEG scenarios generated | YES |
| ERR Coverage | All 3 ERR scenarios generated | YES |
| EDGE Coverage | All 4 EDGE TCs generated (includes CRITICAL EDGE-01) | YES |
| Parameterization | 0 hardcoded SAP values — all data via `{TD.*}` placeholders | YES |
| Automation Eligibility | ≥ 10 TCs (67%) flagged as Automation Candidate: YES | YES |
| Batch Verification | Every HP/AP TC includes verification step in "Display Batch" app (AC-6) | YES |
| Date Validation Coverage | All date boundary conditions covered (EDGE-01, EDGE-02, NEG-03, NEG-04) | YES |
| FEFO Enablement Verification | AC-4 and AC-6 verification confirms batch data supports FEFO logic | YES |

**Overall pass threshold:** All mandatory gates must PASS. All recommended gates (AP scenarios) should PASS unless system configuration prohibits (e.g., vendor batch is mandatory in tenant).

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Batch creation is the core business process — failure blocks all downstream FEFO logic and traceability |
| NEG-01 (expired material) | CRITICAL | CRITICAL | Regulatory compliance risk — posting expired material violates quality standards |
| ERR (missing mandatory fields) | HIGH | MAJOR | Data integrity failure — batch master cannot be created without complete data |
| NEG (date validation) | HIGH | MAJOR | Business logic violations corrupt batch master data and FEFO calculations |
| EDGE-01 (same-day expiration) | CRITICAL | CRITICAL | Boundary condition of AC-5 — defines acceptance criteria for expiration validation |
| EDGE (other boundaries) | MEDIUM | MINOR | Important for data quality but not process-blocking |
| AP (vendor batch variants) | MEDIUM | MINOR | Configuration-dependent — enhances traceability but not mandatory for core flow |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright — stable transaction flow |
| AP | YES | Data-driven via testdata JSON — vendor batch field population is deterministic |
| NEG | YES | Stable validation checks — SAP error messages are consistent and verifiable |
| ERR | YES | Field-level validation stable — mandatory field enforcement is deterministic |
| EDGE | PARTIAL | EDGE-01 and EDGE-02 require dynamic date calculation (today +/- N days) — scriptable but requires date utility functions. EDGE-03 and EDGE-04 depend on material master shelf-life configuration. |
| INT | NOT APPLICABLE | No integration scenarios identified |

**Target automation coverage:** 13 of 15 TCs (87%)

**Automation notes:**
- Date-dependent scenarios (EDGE-01, EDGE-02, NEG-01, NEG-03, NEG-04) require test data generation with dynamic dates relative to execution date
- Batch number must be unique per execution — use timestamp-based generation (e.g., `BATCH-{YYYYMMDD}-{HHMMSS}`)
- Verification step in "Display Batch" app (AC-6) requires navigation to second Fiori app — automation must handle multi-app workflow
- Material master must have shelf-life profile configured for HP-01 (auto-calculation) — requires pre-condition setup or dedicated test material

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-021 (HP-01): Post goods receipt with auto-calculated expiration date
  TC-CS-022 (HP-02): Post goods receipt with manually entered expiration date
  TC-CS-027 (NEG-01): Attempt to post with expiration date already passed
  TC-CS-032 (EDGE-01): Expiration date equals current date

Priority 2 — HIGH (validate immediately after):
  TC-CS-029 (NEG-03): Manufacturing date in the future
  TC-CS-030 (NEG-04): Expiration date before manufacturing date
  TC-CS-024 (ERR-01): Missing Batch Number
  TC-CS-025 (ERR-02): Missing Manufacturing Date
  TC-CS-026 (ERR-03): Missing Expiration Date

Priority 3 — MEDIUM (complete coverage):
  TC-CS-023 (AP-01): Vendor batch number populated
  TC-CS-028 (AP-02): Vendor batch number omitted
  TC-CS-033 (EDGE-02): Manufacturing date equals current date
  TC-CS-034 (EDGE-03): Minimum quantity boundary
  TC-CS-035 (EDGE-04): Maximum shelf life

Priority 4 — Integration (run after core stability confirmed):
  None
```

**Execution dependencies:**
- HP-01 must pass before executing NEG and ERR scenarios (establishes baseline for valid transaction)
- Display Batch verification (AC-6) requires batch creation to succeed — run after HP scenarios
- EDGE-01 depends on date calculation logic tested in HP scenarios

---

## Regulatory and Compliance Notes

### SAP MM Batch Management Compliance
- Batch master records (MCH1/MCHA tables) are audit-critical for industries subject to FDA 21 CFR Part 11, EU GMP Annex 11, and ISO 22000
- Manufacturing date and expiration date are required for FEFO logic and regulatory lot tracking
- Test execution must verify that batch data is immutable after posting (audit trail requirement)
- Vendor batch number enables traceability to supplier's production records — critical for recall procedures

### Test Data Governance
- Use only test materials flagged as batch-managed in the test system — do not use production material IDs
- Batch numbers must follow the configured number range for the material (typically internal assignment or external with validation)
- Manufacturing dates must be realistic (within past 1-2 years for typical materials) to avoid suspicion in audit scenarios
- Expiration dates must align with material shelf-life profiles maintained in material master

### Test System Requirements
- SAP tenant must have dedicated test Purchase Orders with batch-managed materials
- Material master must include at least one material with shelf-life profile configured (MARA-MHDRZ > 0)
- Storage location must allow batch-managed inventory (warehouse config)
- All test execution must occur in non-production environment — batch postings are not reversible without goods issue

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-18-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, NEG, ERR, EDGE)
3. Generate RECOMMENDED types (AP) unless tenant configuration prohibits vendor batch field
4. Apply quality gates table — verify all thresholds are met before completing:
   - Every AC has ≥ 1 TC referencing it
   - All 15 scenarios from inventory are generated
   - All test data uses `{TD.*}` placeholders (no hardcoded material IDs, batch numbers, dates)
   - At least 10 TCs flagged "Automation Candidate: YES"
   - Every HP and AP TC includes verification in "Display Batch" app (AC-6)
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above
7. Output files to `testcases/AI-generated testcases/CS-18/` and `testdata/CS-18/`
8. Test data must include:
   - Batch-managed material ID (placeholder: `{TD.batchManagedMaterial}`)
   - Non-batch-managed material ID for NEG-02 (placeholder: `{TD.nonBatchMaterial}`)
   - Purchase Order with batch-managed material (placeholder: `{TD.purchaseOrder}`)
   - Unique batch number generation pattern (placeholder: `{TD.batchNumber}` with guidance for timestamp-based uniqueness)
   - Dynamic date expressions for manufacturing and expiration dates (e.g., `{TD.manufacturingDate.today}`, `{TD.expirationDate.pastExpired}`, `{TD.expirationDate.future}`)
   - Vendor batch number (optional, placeholder: `{TD.vendorBatch}`)
   - Storage location (placeholder: `{TD.storageLocation}`)
   - Quantity values including minimum boundary (placeholder: `{TD.quantity.min}`, `{TD.quantity.standard}`)
9. Test case priorities match the Test Case Priority Assignment table above
10. Expected Results must reference:
    - Material Document Number format (10-digit numeric)
    - Batch master creation confirmation message
    - Batch data visibility in "Display Batch" app (AC-6)
    - SAP validation error messages for NEG and ERR scenarios (exact text to be captured during scriptless execution)
