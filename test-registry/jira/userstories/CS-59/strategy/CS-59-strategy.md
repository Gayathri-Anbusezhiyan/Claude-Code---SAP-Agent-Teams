# Test Strategy: [CS-59] Initiate A Rework Order For A Batch That Failed Final Inspection But I

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-59/strategy/CS-59-analysis.md
**Risk Profile:**     jira/userstories/CS-59/strategy/CS-59-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Production Supervisor
- **Business Object:** Rework Order (Process Order with rework type), Batch
- **SAP Module:** PP (Production Planning) + QM (Quality Management) — cross-module integration
- **Business Goal:** Bring a batch that failed final inspection back into specification under a controlled and documented process with full regulatory traceability

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 1 | 1 | CRITICAL |
| Alternative Path (AP) | NOT APPLICABLE | 0 | 0 | — |
| Negative (NEG) | MANDATORY | 3 | 3 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 3 | 3 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 2 | 2 | MEDIUM |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | — |
| **TOTAL** | — | **9** | **9** | — |

**Rationale for Coverage Model:**
- **CRITICAL** overall risk triggers MANDATORY status for HP, NEG, ERR, and EDGE scenarios per Coverage Model Standards
- **AP**: No alternative valid paths identified; rework order creation follows a single controlled regulatory process — marked NOT APPLICABLE
- **INT**: No linked Jira issues identified; cross-module integration (QM disposition validation, batch genealogy, inspection lot creation) is verified within HP-01 scenario
- **NEG scenarios elevated to 3 TCs**: AC-2 is CRITICAL risk and requires comprehensive validation of QA disposition logic (no disposition, rejected disposition, non-existent batch)
- **ERR scenarios**: 3 mandatory fields identified (Batch Number, Rework Procedure/Recipe, Rework Justification) — each requires dedicated ERR test case
- **EDGE scenarios**: 2 boundary tests required (minimum quantity per UoM, zero quantity rejection)

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**HP-01: Create rework order for approved batch with full traceability and QM inspection**
- **Risk Level:** CRITICAL
- **ACs Covered:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6 (all 6 ACs)
- **Description:** End-to-end happy path covering: access to Create Process Order app → validate batch has approved QA disposition → create rework order with batch reference and rework procedure → verify batch genealogy linkage → confirm QM inspection lot auto-created → verify batch record documents original failure and rework justification
- **Expected Outputs:** Rework Order Number (12-digit), Reworked Batch Number (10-char), Batch Genealogy Record (system tables), Inspection Lot Number (12-digit), Rework Order Status (REL or CRTD)

**NEG-01: Attempt rework order creation for batch without QA disposition**
- **Risk Level:** CRITICAL
- **ACs Covered:** AC-2
- **Description:** Verify system blocks rework order creation when batch has no QA disposition record in quality management system
- **Expected Result:** Error message indicating QA disposition is required for rework (regulatory control)

**NEG-02: Attempt rework order creation for batch with QA disposition rejecting rework**
- **Risk Level:** CRITICAL
- **ACs Covered:** AC-2
- **Description:** Verify system blocks rework order creation when QA disposition explicitly rejects rework (e.g., disposition = "Scrap" or "Return to Vendor")
- **Expected Result:** Error message indicating QA disposition does not approve rework for this batch

**NEG-03: Attempt rework order creation for non-existent batch**
- **Risk Level:** HIGH
- **ACs Covered:** AC-2, AC-3
- **Description:** Verify system rejects rework order creation when batch number does not exist in batch master
- **Expected Result:** Error message indicating batch not found or invalid batch number

**ERR-01: Missing Batch Number field**
- **Risk Level:** HIGH
- **ACs Covered:** AC-3
- **Description:** Verify system enforces mandatory Batch Number field during rework order creation
- **Expected Result:** Error message indicating Batch Number is required (data integrity control)

**ERR-02: Missing Rework Procedure/Recipe field**
- **Risk Level:** HIGH
- **ACs Covered:** AC-3
- **Description:** Verify system enforces mandatory Rework Procedure/Recipe field during rework order creation
- **Expected Result:** Error message indicating Rework Procedure/Recipe is required

**ERR-03: Missing Rework Justification field**
- **Risk Level:** HIGH
- **ACs Covered:** AC-6
- **Description:** Verify system enforces mandatory Rework Justification field (batch record documentation requirement)
- **Expected Result:** Error message indicating Rework Justification is required for regulatory compliance

**EDGE-01: Minimum quantity boundary**
- **Risk Level:** MEDIUM
- **ACs Covered:** AC-3
- **Description:** Verify system accepts minimum positive quantity value (0.001 or UoM-specific minimum) for rework order
- **Expected Result:** Rework order created successfully with minimum quantity

**EDGE-02: Zero quantity**
- **Risk Level:** MEDIUM
- **ACs Covered:** AC-3
- **Description:** Verify system rejects rework order creation with zero quantity
- **Expected Result:** Error message indicating quantity must be greater than zero

### Recommended Scenarios

None

### Optional Scenarios

None

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — all 6 ACs covered by ≥ 1 TC | YES |
| HP Coverage | All 1 HP scenarios generated | YES |
| NEG Coverage | All 3 NEG scenarios generated | YES |
| ERR Coverage | All 3 ERR scenarios generated | YES |
| EDGE Coverage | All 2 EDGE TCs generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 5 TCs flagged as Automation Candidate: YES | YES |
| Regulatory Documentation | All TCs reference batch traceability and QA disposition validation | YES |

**Overall pass threshold:** All mandatory gates must PASS. 100% of gates must pass for CRITICAL risk stories.

**Additional CRITICAL Risk Gates:**
- **Negative coverage (entity validation):** 100% — 3 NEG scenarios covering all QA disposition and batch validation rules
- **Error coverage (mandatory fields):** 100% — 3 ERR scenarios covering all mandatory fields (Batch Number, Rework Procedure, Rework Justification)
- **Batch traceability verification:** HP-01 must explicitly verify batch genealogy record creation in system tables (MCH_WHO_MAT, MCH_IBASE)
- **QM integration verification:** HP-01 must explicitly verify QM inspection lot auto-creation for reworked batch

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Rework order creation is a regulated process for non-conforming material recovery; failure blocks entire rework workflow and creates regulatory compliance risk (FDA 21 CFR Part 11, ISO 13485) |
| NEG (QA disposition validation) | HIGH | MAJOR | Regulatory control; rework without QA approval violates cGMP/quality standards and creates audit risk; system must enforce QA disposition approval before allowing rework |
| NEG (batch validation) | HIGH | MAJOR | Data integrity; invalid batch references compromise batch genealogy and traceability requirements |
| ERR (missing mandatory fields) | HIGH | MAJOR | Data integrity and regulatory compliance; incomplete batch records violate documentation requirements for regulated industries |
| EDGE (quantity boundaries) | MEDIUM | MINOR | Boundary validation ensures data quality but does not block core business process; important for edge case coverage |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidate for Playwright; stable transaction with machine-verifiable outputs (order number, batch genealogy, inspection lot) |
| AP | NOT APPLICABLE | No alternative paths defined for this regulatory process |
| NEG | YES | Stable validation checks; QA disposition logic and batch validation are repeatable and deterministic |
| ERR | YES | Field-level validation is stable; mandatory field enforcement is consistent |
| EDGE | YES | Quantity boundary validation is stable; both minimum and zero quantity scenarios are repeatable |
| INT | NOT APPLICABLE | Cross-module integration verified within HP-01; no separate INT scenarios |

**Target automation coverage:** 8 of 9 TCs (89%) — all TCs except manual verification scenarios

**Automation Considerations:**
- **QM disposition setup:** Test data preparation requires QA disposition records to be pre-configured in SAP quality management system (may require manual setup in non-production environments)
- **Batch genealogy verification:** Playwright scripts should verify batch traceability by querying batch genealogy tables (MCH_WHO_MAT, MCH_IBASE) or using SAP OData services
- **Inspection lot verification:** Scripts should verify QM inspection lot creation by checking inspection lot number in order details or using QM OData services
- **Rework recipe maintenance:** Rework procedures/recipes must be maintained in SAP recipe management before test execution

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-XXX: HP-01 — Create rework order for approved batch with full traceability and QM inspection
  (Core business transaction; all downstream tests depend on this passing)

Priority 2 — HIGH (validate immediately after):
  TC-CS-XXX: NEG-01 — Attempt rework order creation for batch without QA disposition
  TC-CS-XXX: NEG-02 — Attempt rework order creation for batch with QA disposition rejecting rework
  TC-CS-XXX: NEG-03 — Attempt rework order creation for non-existent batch
  TC-CS-XXX: ERR-01 — Missing Batch Number field
  TC-CS-XXX: ERR-02 — Missing Rework Procedure/Recipe field
  TC-CS-XXX: ERR-03 — Missing Rework Justification field
  (Regulatory controls and data integrity validations; critical for compliance)

Priority 3 — MEDIUM (complete coverage):
  TC-CS-XXX: EDGE-01 — Minimum quantity boundary
  TC-CS-XXX: EDGE-02 — Zero quantity
  (Boundary validations; important for data quality but not blocking)

Priority 4 — Integration (run after core stability confirmed):
  None
```

**Execution Dependencies:**
- All test cases are independent; no sequential dependencies
- HP-01 should be executed first to validate core functionality before testing negative and error scenarios
- NEG and ERR scenarios can be executed in parallel after HP-01 passes
- EDGE scenarios can be executed in parallel with NEG/ERR scenarios

---

## Regulatory and Compliance Notes

**Pharmaceutical/Life Sciences Manufacturing Context:**
- Rework orders are regulated business processes under FDA 21 CFR Part 11 (Electronic Records), FDA 21 CFR Part 210/211 (cGMP), and ISO 13485 (Medical Devices Quality Management)
- Batch traceability is a regulatory requirement; test cases must verify that batch genealogy records are created and maintained in SAP system tables (MCH_WHO_MAT, MCH_IBASE)
- QA disposition approval is mandatory before rework can proceed; test cases must verify system enforces QA disposition validation (NEG-01, NEG-02)
- Rework justification must be documented in the batch record for audit purposes (AC-6, ERR-03)
- QM inspection lot must be auto-created for reworked batches to ensure same quality controls as standard production (AC-5, HP-01)

**Test Data Governance:**
- Use only dedicated test batches and materials in non-production SAP environments
- Do not use production batch numbers, material IDs, or QA disposition records in test data
- Ensure test batches have appropriate QA disposition records pre-configured for HP and NEG scenarios
- Test data must be reversible; use test-specific order types and plants that can be purged after test execution

**Authorization and Segregation of Duties (SOD):**
- Test user must have authorization object PP_ORDER (production order maintenance) and QM_INSP (inspection lot processing)
- Ensure test user roles comply with SOD requirements (same user should not have both order creation and QA disposition approval rights in production)

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-59-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types: HP (1), NEG (3), ERR (3), EDGE (2) — total 9 TCs
3. Do not generate AP or INT test cases (marked NOT APPLICABLE)
4. Apply quality gates table — verify all thresholds are met before completing:
   - 100% AC traceability (all 6 ACs covered)
   - All 9 mandatory scenarios generated
   - 0 hardcoded SAP values (use `{TD.*}` placeholders)
   - ≥ 5 TCs flagged as Automation Candidate: YES
   - All TCs reference batch traceability and QA disposition validation
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above (all 9 TCs should be YES)
7. Output files to `testcases/AI-generated testcases/CS-59/` and `testdata/CS-59/`
8. Include regulatory compliance notes in test case descriptions (batch traceability, QA disposition validation, inspection lot creation)
9. Test data parameters:
   - **Input:** Order Type, Batch Number, Material, Quantity, Plant, Rework Procedure/Recipe, Rework Justification
   - **Auto-populated:** Material Description, UoM, Original Batch Status, QA Disposition Status, Company Code, Production Scheduler
   - **Output:** Rework Order Number, Reworked Batch Number, Batch Genealogy Record, Inspection Lot Number, Rework Order Status
   - **Boundary:** Quantity (0.001 minimum, available batch quantity maximum, zero invalid)
10. HP-01 must include verification steps for:
    - Batch genealogy record creation (original batch → reworked batch linkage)
    - QM inspection lot auto-creation for reworked batch
    - Batch record documentation (original failure + rework justification)
