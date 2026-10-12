# Test Strategy: [CS-49] Generate Export Documentation, Including A Certificate Of Analysis Ref

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-49/strategy/CS-49-analysis.md
**Risk Profile:**     jira/userstories/CS-49/strategy/CS-49-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Logistics Coordinator
- **Business Object:** Outbound Delivery (Export) with Export Documentation Package
- **SAP Module:** SD — Sales & Distribution (with LE, QM, DMS, Export Control integration)
- **Business Goal:** Satisfy customs clearance and regulatory import requirements at the destination for international pharmaceutical shipments

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 1 | 1 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 2 | 2 | HIGH |
| Negative (NEG) | MANDATORY | 7 | 7 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 4 | 4 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 4 | 4 | MEDIUM |
| Integration (INT) | MANDATORY | 3 | 3 | HIGH |
| **TOTAL** | — | **21** | **21** | — |

**Coverage Model Rationale:**

This is a **CRITICAL-risk pharmaceutical export compliance scenario** with regulatory and legal implications. All scenario types are MANDATORY:

- **HP**: Core export documentation generation flow with all validations passing — regulatory requirement
- **AP**: Multi-line delivery and post-PGI archival retrieval — common operational variants
- **NEG**: 7 critical validation failures that must be detected and blocked (missing CoA, missing HS code/origin, license issues, premature PGI, incomplete docs) — FDA 21 CFR Part 11 and EU GMP compliance requires explicit negative testing
- **ERR**: All 4 mandatory fields for delivery creation must be validated
- **EDGE**: License expiry date boundaries and quantity/line-item limits are critical for export compliance — must verify system handles boundaries correctly
- **INT**: 3 implicit cross-module dependencies (QM, DMS, MM) introduce cascading failure risk — integration testing is non-negotiable

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP):**
1. **HP-01** [CRITICAL]: Create export delivery with all master data complete, CoA attached, valid license → generate all required docs (invoice, packing list) → verify CoA reference included → verify archive link created → PGI success → verify goods issue document number
   - **ACs Covered**: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6

**Alternative Path (AP):**
2. **AP-01** [HIGH]: Multi-line delivery (multiple materials/batches) → each material has HS code & origin → each batch has CoA → consolidated export docs generated with all CoAs referenced
   - **ACs Covered**: AC-2, AC-3, AC-6
3. **AP-02** [HIGH]: Retrieve archived export documents after PGI for customs audit purposes → verify all docs accessible via Archive Link
   - **ACs Covered**: AC-6

**Negative (NEG):**
4. **NEG-01** [CRITICAL]: Batch exists but no Certificate of Analysis attached in QM/DMS → system error or warning on doc generation attempt → PGI blocked
   - **ACs Covered**: AC-2, AC-4
5. **NEG-02** [CRITICAL]: Material master missing HS code (MARC-STAWN blank) → export document generation fails with error message
   - **ACs Covered**: AC-3, AC-4
6. **NEG-03** [CRITICAL]: Material master missing country of origin (MARC-HERKL blank) → export document generation fails with error message
   - **ACs Covered**: AC-3, AC-4
7. **NEG-04** [CRITICAL]: Export license required but missing in master data (MEAN-EXTWG set, EIPA record missing) → system flags shipment → PGI blocked with error
   - **ACs Covered**: AC-5, AC-4
8. **NEG-05** [CRITICAL]: Export license expired (EIPA-GLTBIS < today) → system flags shipment → PGI blocked with error
   - **ACs Covered**: AC-5, AC-4
9. **NEG-06** [CRITICAL]: Attempt PGI before all mandatory export documents generated (NAST output incomplete) → system blocks with error message listing missing doc types
   - **ACs Covered**: AC-4
10. **NEG-07** [CRITICAL]: Mandatory document type configured for country but generation failed → PGI blocked even if some docs generated
    - **ACs Covered**: AC-4

**Error / Missing Field (ERR):**
11. **ERR-01** [HIGH]: Missing Sales Order → delivery creation fails with error
    - **ACs Covered**: AC-1, AC-3
    - **Field**: Sales Order
12. **ERR-02** [HIGH]: Missing Material → delivery creation fails with error
    - **ACs Covered**: AC-2, AC-3
    - **Field**: Material
13. **ERR-03** [CRITICAL]: Missing Batch (for batch-managed pharma material) → delivery creation fails or picking incomplete
    - **ACs Covered**: AC-2
    - **Field**: Batch
14. **ERR-04** [HIGH]: Missing or invalid Shipping Point → delivery creation fails with error
    - **ACs Covered**: AC-1
    - **Field**: Shipping Point

**Edge Case / Boundary (EDGE):**
15. **EDGE-01** [CRITICAL]: Export license expiring today (EIPA-GLTBIS = sy-datum) → boundary = still valid → PGI allowed
    - **ACs Covered**: AC-5
    - **Parameter**: exportLicenseExpiry (lower boundary)
16. **EDGE-02** [MEDIUM]: Export license expiring tomorrow (EIPA-GLTBIS = sy-datum + 1) → PGI allowed but system warning
    - **ACs Covered**: AC-5
    - **Parameter**: exportLicenseExpiry (lower boundary)
17. **EDGE-03** [MEDIUM]: Minimum quantity (0.001) delivery → export docs generated correctly with decimal precision
    - **ACs Covered**: AC-3
    - **Parameter**: deliveryQuantity (lower boundary)
18. **EDGE-04** [MEDIUM]: Maximum number of delivery line items (999) → all CoAs referenced, consolidated docs generated without truncation
    - **ACs Covered**: AC-2, AC-3
    - **Parameter**: numberOfLineItems (upper boundary)

**Integration (INT):**
19. **INT-01** [CRITICAL]: QM inspection lot exists but CoA document generation pending in QM module → delivery creation allowed but doc generation warns/fails → PGI blocked
    - **ACs Covered**: AC-2
    - **Dependency**: QM module CoA generation (QAMB → QM11)
20. **INT-02** [HIGH]: DMS archive link broken or DMS interface down → document archival fails → PGI may succeed but audit trail incomplete (depends on config)
    - **ACs Covered**: AC-6
    - **Dependency**: DMS archival interface (TOA01 → ArchiveLink)
21. **INT-03** [HIGH]: Material master maintained but plant-specific export data missing (MARC record exists but STAWN/HERKL blank at plant level) → doc generation fails
    - **ACs Covered**: AC-3
    - **Dependency**: MM material master plant data (MARC)

### Recommended Scenarios

All scenarios listed above are MANDATORY for this CRITICAL-risk pharmaceutical export compliance story.

### Optional Scenarios

None — comprehensive mandatory coverage required due to regulatory risk.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 1 HP scenarios generated | YES |
| AP Coverage | All 2 AP scenarios generated | YES |
| NEG Coverage | All 7 NEG scenarios generated | YES |
| ERR Coverage | All 4 ERR scenarios generated | YES |
| EDGE Coverage | All 4 EDGE TCs generated | YES |
| INT Coverage | All 3 INT scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 10 TCs flagged as Automation Candidate: YES | YES |
| NEG Entity Coverage (CRITICAL) | 7 NEG scenarios covering: no CoA, missing HS code, missing origin, missing license, expired license, premature PGI, incomplete docs | YES |
| ERR Mandatory Field Coverage (CRITICAL) | 4 ERR scenarios covering: Sales Order, Material, Batch, Shipping Point | YES |

**Overall pass threshold:** All mandatory gates must PASS. 100% of recommended gates must PASS.

**Additional CRITICAL-risk gates:**
- Every validation failure (NEG) scenario must explicitly verify PGI is blocked with correct error message
- Every integration scenario must verify failure behavior when upstream dependency is unavailable
- All regulatory-critical fields (CoA reference, HS code, country of origin, export license) must have explicit negative test cases

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core export flow) | CRITICAL | CRITICAL | End-to-end export documentation generation with all validations passing — business process blocker if fails; regulatory compliance dependency |
| NEG (validation failures) | HIGH | MAJOR | Detects critical master data gaps and business rule violations that would cause customs detention, regulatory fines, or shipment rejection |
| ERR (missing mandatory fields) | HIGH | MAJOR | Data integrity — prevents incomplete deliveries from being created; mandatory field validation is foundational |
| EDGE (license expiry boundaries) | CRITICAL | MAJOR | License expiry date boundaries determine legal export authorization — incorrect handling = export law violation (EAR/ITAR) |
| EDGE (quantity/line-item limits) | MEDIUM | MINOR | Important for document generation stability but less business-critical than license compliance |
| AP (multi-line delivery) | HIGH | MAJOR | Common operational scenario — multi-batch shipments are standard for pharmaceutical exports; CoA consolidation must work |
| AP (archival retrieval) | HIGH | MAJOR | Audit compliance — inability to retrieve archived docs = SOX/customs audit failure |
| INT (QM/DMS/MM dependencies) | HIGH | MAJOR | Cross-module integration failures cascade to export documentation failures; QM CoA dependency is regulatory-critical |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidate for Playwright — stable end-to-end flow, machine-verifiable outputs (delivery number, PGI document number, archive link) |
| AP | YES | Multi-line delivery is data-driven via testdata JSON; archival retrieval is repeatable UI navigation |
| NEG | YES | Validation checks are stable and repeatable — error messages are machine-verifiable; PGI blocking is system behavior |
| ERR | YES | Field-level validation stable — missing mandatory fields produce consistent SAP error messages |
| EDGE | PARTIAL | License expiry boundaries require date-specific test data (may need dynamic date generation); quantity/line-item limits are stable |
| INT | PARTIAL | QM CoA and DMS integration scenarios require test system configuration (QM inspection lots, DMS interface availability); MM master data completeness is testable but requires data setup |

**Target automation coverage:** 17 of 21 TCs (81%)

**Automation notes:**
- All HP, AP, NEG, and ERR scenarios are strong automation candidates — stable SAP behaviors with machine-verifiable outcomes
- EDGE scenarios involving date boundaries (EDGE-01, EDGE-02) may require parameterized test data with dynamic date calculations
- INT scenarios (INT-01, INT-02, INT-03) marked PARTIAL due to dependency on upstream system state (QM module, DMS interface, MM master data) — these are automatable if test data setup is scripted or pre-configured

**Scriptless execution note:**
- Phase 3 scriptless exploration should prioritize HP-01, NEG-01 through NEG-07, and ERR-01 through ERR-04 to capture real SAP error messages and blocking behaviors
- INT scenarios should be executed scriptlessly if test system has QM/DMS/MM integration active

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-xxx (HP-01): Happy path export delivery with all validations passing
  TC-CS-xxx (EDGE-01): License expiry date boundary — expires today (still valid)

Priority 2 — HIGH (validate immediately after):
  TC-CS-xxx (NEG-01): No CoA attached to batch
  TC-CS-xxx (NEG-02): Missing HS code
  TC-CS-xxx (NEG-03): Missing country of origin
  TC-CS-xxx (NEG-04): Missing export license
  TC-CS-xxx (NEG-05): Expired export license
  TC-CS-xxx (NEG-06): Attempt PGI before docs generated
  TC-CS-xxx (NEG-07): Mandatory doc type generation failed
  TC-CS-xxx (ERR-01): Missing Sales Order
  TC-CS-xxx (ERR-02): Missing Material
  TC-CS-xxx (ERR-03): Missing Batch
  TC-CS-xxx (ERR-04): Missing Shipping Point
  TC-CS-xxx (AP-01): Multi-line delivery with multiple CoAs
  TC-CS-xxx (AP-02): Retrieve archived docs after PGI

Priority 3 — MEDIUM (complete coverage):
  TC-CS-xxx (EDGE-02): License expiry date — expires tomorrow (valid with warning)
  TC-CS-xxx (EDGE-03): Minimum quantity delivery
  TC-CS-xxx (EDGE-04): Maximum line items delivery

Priority 4 — Integration (run after core stability confirmed):
  TC-CS-xxx (INT-01): QM CoA generation pending
  TC-CS-xxx (INT-02): DMS archive interface unavailable
  TC-CS-xxx (INT-03): MM plant export data missing
```

**Execution dependencies:**
- HP-01 must pass before executing INT scenarios (integration tests depend on stable core flow)
- NEG scenarios can execute in parallel (independent validation checks)
- ERR scenarios can execute in parallel (independent field validations)
- AP-02 (archival retrieval) should execute after HP-01 or AP-01 completes successfully (requires archived delivery to exist)

---

## Regulatory and Compliance Notes

**Pharmaceutical Export Compliance:**
- **FDA 21 CFR Part 11**: Certificate of Analysis (CoA) must be electronically linked to batch records and export documentation — test cases must verify CoA reference is included in generated export documents (AC-2)
- **EU GMP Annex 11**: Batch traceability requires CoA archival and retrievability — test cases must verify Archive Link functionality (AC-6)
- **Export Administration Regulations (EAR) / ITAR**: Export license validation is legally mandated — system must block shipments with missing or expired licenses (AC-5). Incorrect handling = potential $1M+ penalties and business debarment.
- **Customs Authority Audit Requirements**: All export documentation must be archived for 7+ years and retrievable on demand — test cases must verify document archival and retrieval (AC-6)

**Test Data Governance:**
- Do NOT use real production vendor IDs, customer IDs, or material numbers in test data
- Use dedicated test system instances (not production SAP tenant)
- Test batch numbers must be associated with QM-generated CoA documents in the test system
- Export license master data must exist in test system with controllable expiry dates for EDGE scenarios

**Master Data Prerequisites:**
- Material master records must have:
  - Batch management enabled (MARA-XCHPF)
  - HS code maintained at plant level (MARC-STAWN)
  - Country of origin maintained at plant level (MARC-HERKL)
  - Export control classification (MEAN-EXTWG) if license required
- Customer master must have international destination country (KNA1-LAND1 ≠ plant country)
- Export license master data must exist (EIPA table) with controllable expiry dates
- QM module must have inspection lots with CoA documents for test batches
- DMS ArchiveLink interface must be configured and active in test system

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-49-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types (HP, AP, NEG, ERR, EDGE, INT) — no exceptions
3. Apply quality gates table — verify all thresholds are met before completing:
   - All 6 ACs covered
   - All 21 scenarios generated (1 HP + 2 AP + 7 NEG + 4 ERR + 4 EDGE + 3 INT)
   - 0 hardcoded SAP values (use `{TD.*}` and `{ENV.*}` placeholders)
   - ≥ 17 TCs flagged as Automation Candidate: YES
4. Use `prompts/testcase-generation-from-userstory.md` as the generation template
5. Flag automation candidates per the Automation Viability table above:
   - HP, AP, NEG, ERR: YES
   - EDGE (date boundaries): PARTIAL
   - INT: PARTIAL
6. Output files to `testcases/AI-generated testcases/CS-49/` and `testdata/CS-49/`
7. For each NEG scenario, explicitly verify in Expected Result that PGI is blocked and error message is displayed
8. For each ERR scenario, verify in Expected Result that delivery creation fails with specific SAP error message for missing mandatory field
9. For INT scenarios, describe in Preconditions the required upstream system state (e.g., "QM inspection lot exists but CoA document generation is pending")
10. Use test data placeholders for all SAP master data:
    - `{TD.salesOrderNumber}` — international sales order
    - `{TD.materialNumber}` — pharma finished product with batch management and HS code
    - `{TD.batchNumber}` — batch with CoA attached
    - `{TD.shippingPoint}` — export-enabled shipping point
    - `{TD.exportLicenseExpiry}` — dynamic date for EDGE scenarios
11. Document in test data guide (`CS-49-testdata-guide.md`) the master data prerequisites for each test data parameter (how to create/verify in SAP test system)
