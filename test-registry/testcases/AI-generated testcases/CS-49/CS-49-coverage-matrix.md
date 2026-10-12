# Test Coverage Matrix: [CS-49] Generate Export Documentation, Including A Certificate Of Analysis Ref

## Coverage Completeness

| Scenario Type | Required (min) | Generated | Status |
|---------------|---------------|-----------|--------|
| Happy Path    | ≥ 1           | 1         | PASS |
| Alternative   | 2             | 2         | PASS |
| Negative      | 7             | 7         | PASS |
| Error         | 4             | 4         | PASS |
| Edge Case     | 4             | 4         | PASS |
| Integration   | 3             | 3         | PASS |
| **TOTAL**     | **21**        | **21**    | **PASS** |

---

## Acceptance Criteria Coverage

| AC ID | Acceptance Criterion | Covered By Test Cases | Coverage Status |
|-------|---------------------|----------------------|----------------|
| AC-1 | The user can access the "Create Outbound Deliveries" Fiori app with export documentation output. | TC-CS-125, TC-CS-135, TC-CS-138 | PASS |
| AC-2 | The system attaches or references the Certificate of Analysis associated with the shipped batch. | TC-CS-125, TC-CS-126, TC-CS-128, TC-CS-137, TC-CS-142, TC-CS-143 | PASS |
| AC-3 | The system generates required export documents (commercial invoice, packing list) reflecting HS codes and country-of-origin data from the material master. | TC-CS-125, TC-CS-126, TC-CS-129, TC-CS-130, TC-CS-135, TC-CS-136, TC-CS-141, TC-CS-142, TC-CS-145 | PASS |
| AC-4 | The delivery cannot be goods-issued for export until all mandatory export document types have been generated. | TC-CS-125, TC-CS-128, TC-CS-129, TC-CS-130, TC-CS-131, TC-CS-132, TC-CS-133, TC-CS-134 | PASS |
| AC-5 | The system flags shipments requiring an export license and blocks goods issue if the license is missing or expired. | TC-CS-125, TC-CS-131, TC-CS-132, TC-CS-139, TC-CS-140 | PASS |
| AC-6 | All generated export documents are archived and retrievable against the delivery for customs audit purposes. | TC-CS-125, TC-CS-126, TC-CS-127, TC-CS-144 | PASS |

**AC Coverage Status:** 6 out of 6 ACs covered (100%)

---

## Test Case-to-AC Traceability Matrix

| Test Case ID | Title | Scenario Type | Priority | ACs Covered |
|-------------|-------|---------------|---------|-------------|
| TC-CS-125 | Create Export Delivery with All Master Data Complete and Generate Export Documentation Package Successfully | HAPPY_PATH | CRITICAL | AC-1, AC-2, AC-3, AC-4, AC-5, AC-6 |
| TC-CS-126 | Create Multi-Line Export Delivery with Multiple Materials and Batches and Verify Consolidated Export Documentation with All CoA References | ALTERNATIVE_PATH | HIGH | AC-2, AC-3, AC-6 |
| TC-CS-127 | Retrieve Archived Export Documents After Goods Issue for Customs Audit Purposes | ALTERNATIVE_PATH | HIGH | AC-6 |
| TC-CS-128 | Attempt Export Delivery Creation and Documentation Generation When Batch Has No Certificate of Analysis Attached | NEGATIVE | HIGH | AC-2, AC-4 |
| TC-CS-129 | Attempt Export Documentation Generation When Material Master Is Missing HS Code | NEGATIVE | HIGH | AC-3, AC-4 |
| TC-CS-130 | Attempt Export Documentation Generation When Material Master Is Missing Country of Origin | NEGATIVE | HIGH | AC-3, AC-4 |
| TC-CS-131 | Attempt Export Delivery and PGI When Export License Is Required But Missing in Master Data | NEGATIVE | HIGH | AC-5, AC-4 |
| TC-CS-132 | Attempt Export Delivery and PGI When Export License Is Expired | NEGATIVE | HIGH | AC-5, AC-4 |
| TC-CS-133 | Attempt Post Goods Issue Before All Mandatory Export Documents Are Generated | NEGATIVE | HIGH | AC-4 |
| TC-CS-134 | Attempt PGI When Mandatory Export Document Type Is Configured But Generation Failed | NEGATIVE | HIGH | AC-4 |
| TC-CS-135 | Attempt Export Delivery Creation with Sales Order Field Empty | ERROR | HIGH | AC-1, AC-3 |
| TC-CS-136 | Attempt Export Delivery Creation with Material Field Empty | ERROR | HIGH | AC-2, AC-3 |
| TC-CS-137 | Attempt Export Delivery Creation with Batch Field Empty for Batch-Managed Material | ERROR | HIGH | AC-2 |
| TC-CS-138 | Attempt Export Delivery Creation with Shipping Point Field Empty | ERROR | HIGH | AC-1 |
| TC-CS-139 | Export Delivery with License Expiring Today (Valid Boundary - PGI Allowed) | EDGE_CASE | CRITICAL | AC-5 |
| TC-CS-140 | Export Delivery with License Expiring Tomorrow (Valid with Warning) | EDGE_CASE | MEDIUM | AC-5 |
| TC-CS-141 | Export Delivery with Minimum Valid Quantity (Decimal Precision Boundary) | EDGE_CASE | MEDIUM | AC-3 |
| TC-CS-142 | Export Delivery with Maximum Number of Line Items (999 Lines - Boundary Upper) | EDGE_CASE | MEDIUM | AC-2, AC-3 |
| TC-CS-143 | QM Inspection Lot Exists But CoA Document Generation Pending in QM Module | INTEGRATION | CRITICAL | AC-2 |
| TC-CS-144 | DMS Archive Link Interface Unavailable - Document Archival Fails | INTEGRATION | HIGH | AC-6 |
| TC-CS-145 | Material Master Maintained But Plant-Specific Export Data Missing | INTEGRATION | HIGH | AC-3 |

---

## Scenario Inventory Status

| Scenario ID | Description | Test Case ID | Status |
|------------|-------------|-------------|--------|
| HP-01 | Create export delivery with all master data complete, CoA attached, valid license → generate all required docs → verify CoA reference → verify archive link → PGI success → verify goods issue document number | TC-CS-125 | GENERATED |
| AP-01 | Multi-line delivery (multiple materials/batches) → each material has HS code & origin → each batch has CoA → consolidated export docs generated with all CoAs referenced | TC-CS-126 | GENERATED |
| AP-02 | Retrieve archived export documents after PGI for customs audit purposes → verify all docs accessible via Archive Link | TC-CS-127 | GENERATED |
| NEG-01 | Batch exists but no Certificate of Analysis attached in QM/DMS → system error or warning on doc generation attempt → PGI blocked | TC-CS-128 | GENERATED |
| NEG-02 | Material master missing HS code (MARC-STAWN blank) → export document generation fails with error message | TC-CS-129 | GENERATED |
| NEG-03 | Material master missing country of origin (MARC-HERKL blank) → export document generation fails with error message | TC-CS-130 | GENERATED |
| NEG-04 | Export license required but missing in master data (MEAN-EXTWG set, EIPA record missing) → system flags shipment → PGI blocked with error | TC-CS-131 | GENERATED |
| NEG-05 | Export license expired (EIPA-GLTBIS < today) → system flags shipment → PGI blocked with error | TC-CS-132 | GENERATED |
| NEG-06 | Attempt PGI before all mandatory export documents generated (NAST output incomplete) → system blocks with error message listing missing doc types | TC-CS-133 | GENERATED |
| NEG-07 | Mandatory document type configured for country but generation failed → PGI blocked even if some docs generated | TC-CS-134 | GENERATED |
| ERR-01 | Missing Sales Order → delivery creation fails with error | TC-CS-135 | GENERATED |
| ERR-02 | Missing Material → delivery creation fails with error | TC-CS-136 | GENERATED |
| ERR-03 | Missing Batch (for batch-managed pharma material) → delivery creation fails or picking incomplete | TC-CS-137 | GENERATED |
| ERR-04 | Missing or invalid Shipping Point → delivery creation fails with error | TC-CS-138 | GENERATED |
| EDGE-01 | Export license expiring today (EIPA-GLTBIS = sy-datum) → boundary = still valid → PGI allowed | TC-CS-139 | GENERATED |
| EDGE-02 | Export license expiring tomorrow (EIPA-GLTBIS = sy-datum + 1) → PGI allowed but system warning | TC-CS-140 | GENERATED |
| EDGE-03 | Minimum quantity (0.001) delivery → export docs generated correctly with decimal precision | TC-CS-141 | GENERATED |
| EDGE-04 | Maximum number of delivery line items (999) → all CoAs referenced, consolidated docs generated without truncation | TC-CS-142 | GENERATED |
| INT-01 | QM inspection lot exists but CoA document generation pending in QM module → delivery creation allowed but doc generation warns/fails → PGI blocked | TC-CS-143 | GENERATED |
| INT-02 | DMS archive link broken or DMS interface down → document archival fails → PGI may succeed but audit trail incomplete (depends on config) | TC-CS-144 | GENERATED |
| INT-03 | Material master maintained but plant-specific export data missing (MARC record exists but STAWN/HERKL blank at plant level) → doc generation fails | TC-CS-145 | GENERATED |

**Scenario Coverage:** 21 out of 21 scenarios covered (100%)

---

## Quality Gate Verification

| Gate | Threshold | Actual | Status |
|------|-----------|--------|--------|
| AC Traceability | 100% — every AC covered by ≥ 1 TC | 100% (6/6 ACs) | PASS |
| HP Coverage | All 1 HP scenarios generated | 1/1 | PASS |
| AP Coverage | All 2 AP scenarios generated | 2/2 | PASS |
| NEG Coverage | All 7 NEG scenarios generated | 7/7 | PASS |
| ERR Coverage | All 4 ERR scenarios generated | 4/4 | PASS |
| EDGE Coverage | All 4 EDGE TCs generated | 4/4 | PASS |
| INT Coverage | All 3 INT scenarios generated | 3/3 | PASS |
| Parameterization | 0 hardcoded SAP values | 0 hardcoded values | PASS |
| Automation Eligibility | ≥ 10 TCs flagged as Automation Candidate: YES | 17 TCs flagged YES, 4 TCs flagged PARTIAL | PASS |
| NEG Entity Coverage (CRITICAL) | 7 NEG scenarios covering: no CoA, missing HS code, missing origin, missing license, expired license, premature PGI, incomplete docs | All 7 present | PASS |
| ERR Mandatory Field Coverage (CRITICAL) | 4 ERR scenarios covering: Sales Order, Material, Batch, Shipping Point | All 4 present | PASS |

**Overall Quality Gate Status: PASS** (11 out of 11 gates passed)

---

## Automation Candidate Summary

| Automation Status | Test Case Count | Percentage |
|------------------|----------------|------------|
| YES | 17 | 81% |
| PARTIAL | 4 | 19% |
| NO | 0 | 0% |
| **TOTAL** | **21** | **100%** |

**Automation Candidates (YES):**
- TC-CS-125 (HP-01)
- TC-CS-126 (AP-01)
- TC-CS-127 (AP-02)
- TC-CS-128 through TC-CS-138 (NEG-01 through ERR-04)

**Automation Candidates (PARTIAL):**
- TC-CS-139, TC-CS-140 (EDGE-01, EDGE-02 - date boundaries require dynamic test data)
- TC-CS-143, TC-CS-144 (INT-01, INT-02 - require QM/DMS test system configuration)

---

## Regulatory and Compliance Coverage

| Regulatory Requirement | Test Coverage | Status |
|------------------------|--------------|--------|
| FDA 21 CFR Part 11 (CoA electronic linkage) | TC-CS-125, TC-CS-126, TC-CS-128, TC-CS-143 | PASS |
| EU GMP Annex 11 (Batch traceability and CoA archival) | TC-CS-125, TC-CS-127, TC-CS-144 | PASS |
| Export Administration Regulations (EAR/ITAR) - License validation | TC-CS-131, TC-CS-132, TC-CS-139, TC-CS-140 | PASS |
| Customs Authority Audit Requirements (Document archival and retrieval) | TC-CS-125, TC-CS-127, TC-CS-144 | PASS |

**Regulatory Coverage Status:** All 4 regulatory requirements covered by test cases

---

## Summary

- **Total Test Cases Generated:** 21
- **Scenario Coverage:** 100% (21 out of 21 scenarios)
- **AC Coverage:** 100% (6 out of 6 ACs)
- **Quality Gates Passed:** 11 out of 11 (100%)
- **Automation Candidates:** 17 YES (81%), 4 PARTIAL (19%)
- **Regulatory Coverage:** All 4 pharmaceutical export compliance requirements covered

**Conclusion:** Test case suite for CS-49 is COMPLETE and meets all quality gates, coverage requirements, and regulatory compliance testing mandates.
