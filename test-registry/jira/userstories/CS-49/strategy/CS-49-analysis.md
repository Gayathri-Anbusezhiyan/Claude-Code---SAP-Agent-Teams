# Story Analysis: [CS-49] Generate Export Documentation, Including A Certificate Of Analysis Ref

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-49/CS-49.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Logistics Coordinator |
| Core Action | Generate export documentation, including Certificate of Analysis reference, for an international shipment of a finished pharmaceutical product |
| Business Goal | Satisfy customs clearance and regulatory import requirements at the destination |
| Business Object | Outbound Delivery (Export) with Export Documentation Package |
| SAP Module | SD — Sales & Distribution (with LE integration — Logistics Execution) |
| Complexity | Complex (No story points provided — inferred from multi-step export compliance flow, integration with material master, batch management, Quality Management, Export Control, and Document Management System) |

### Implicit Business Rules (Domain-Inferred)
- Finished pharmaceutical product must exist in material master with HS code, country of origin, and batch management enabled
- Batch must exist with associated Certificate of Analysis (CoA) in SAP Quality Management (QM) or Document Management System (DMS)
- Delivery must reference a sales order for an international customer (destination country ≠ plant country)
- Export license master data must exist and be valid (if required for destination/material combination)
- Material master must be configured with export documentation types (commercial invoice, packing list, etc.) per destination country
- Delivery cannot be goods-issued (PGI) until all mandatory document checks pass — system enforces blocking
- Document Management System (DMS) integration must be active for CoA attachment/reference
- User must have authorization for export compliance (V_LIKP_LES) and document generation functions
- Customs compliance data (HS code, origin) must be maintained at material-plant level in MARC table
- Commercial invoice generation requires billing document or proforma invoice
- Packing list must reflect actual delivery quantities (LIPS-LFIMG) with weight/volume

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Create Outbound Deliveries" Fiori app with export documentation output. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The system attaches or references the Certificate of Analysis associated with the shipped batch. | INTEGRATION | CRITICAL | EP, ST | HP, NEG (batch without CoA), INT (DMS/QM link) | 3 |
| AC-3 | The system generates required export documents (commercial invoice, packing list) reflecting HS codes and country-of-origin data from the material master. | VALIDATION_POSITIVE | CRITICAL | EP, DT | HP, NEG (missing HS code), NEG (missing country-of-origin), AP (multi-line delivery) | 4 |
| AC-4 | The delivery cannot be goods-issued for export until all mandatory export document types have been generated. | BUSINESS_RULE | CRITICAL | DT, ST | HP, NEG (attempt PGI before doc gen), ERR (incomplete doc types) | 3 |
| AC-5 | The system flags shipments requiring an export license and blocks goods issue if the license is missing or expired. | VALIDATION_NEGATIVE | CRITICAL | EP, BVA (date boundary) | HP (valid license), NEG (missing license), EDGE (expired license), EDGE (license expiring today) | 4 |
| AC-6 | All generated export documents are archived and retrievable against the delivery for customs audit purposes. | SUCCESS_CONFIRMATION | HIGH | EP | HP (verify archive), AP (retrieve after PGI) | 2 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Sales Order Number | Sales Order | Alphanumeric (10 digits) | Yes | Existing international sales order with delivery due (VA02) |
| Delivery Date | Delivery Date | Date | Yes | Future or today (not past for export scheduling) |
| Material Number | Material | Alphanumeric | Yes | Finished pharmaceutical product with batch management (FERT) and HS code |
| Batch Number | Batch | Alphanumeric | Yes (for pharma) | Existing batch with CoA attached (MSC3N) |
| Quantity | Delivery Quantity | Numeric (decimal) | Yes | > 0, ≤ sales order open quantity, per UoM |
| Shipping Point | Shipping Point | Alphanumeric (4 chars) | Yes | Export-enabled shipping point (TVST-VSTEL) |
| Destination Country | Country of Destination | ISO Alpha-2 code | Auto (from customer) | Valid country code requiring export docs |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Ship-to Party | Ship-To Party | Select Sales Order | Sales Order header (LIKP-KUNNR) |
| Destination Country | Country of Destination | Select Sales Order | Customer master (KNA1-LAND1) |
| HS Code | Harmonized System Code | Select Material | Material master export data (MARC-STAWN) |
| Country of Origin | Country of Origin | Select Material | Material master (MARC-HERKL) |
| Export License Requirement | Export Control Classification | Select Material + Destination | Material export control data (MEAN-EXTWG) |
| Certificate of Analysis Ref | CoA Document Number | Select Batch | QM inspection lot result or DMS link (QAMB → DRAW → TOA01) |
| Commercial Invoice Number | Invoice Number | Generate Export Docs | SAP billing document (VF01) or proforma |
| Packing List Number | Packing List Number | Generate Export Docs | SAP output control (V_TVKO_DEPDV) |
| Export License Number | License Number | Material + Dest lookup | Export License master (EIPA-EXPNR) |
| Export License Validity | Valid Until | License lookup | Export License master (EIPA-GLTBIS) |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Outbound Delivery Number | Unique SAP-generated delivery document number | 10-digit numeric, begins with 80 |
| Export Document Package | Set of generated PDF documents (invoice, packing list, CoA reference sheet, export declaration) | Multiple PDF attachments in SAP output management (NAST) |
| Goods Issue Document | Material document number generated on PGI | 10-digit numeric, begins with 49 (MKPF-MBLNR) |
| Archive Link | DMS reference to archived export documentation package | SAP Archive Link object key (TOA01-ARC_DOC_ID) |
| Goods Issue Blocked Status | Blocking indicator if docs incomplete | Boolean flag (LIKP-LIFSP export block) |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Delivery Quantity | 0.001 (minimum non-zero per UoM) | Sales order open quantity (VBAP-KWMENG - delivered) | 0 (invalid) | Decimal precision per UoM (MARM) |
| Export License Validity Date | Today (minimum valid for PGI) | No upper limit | Past date (expired = blocked) | Date comparison at PGI attempt: EIPA-GLTBIS >= sy-datum |
| Number of Delivery Items | 1 (minimum for delivery) | 999 (SAP standard limit LIPS) | 0 (invalid delivery) | Multi-line deliveries generate consolidated docs |
| Number of Required Export Doc Types | 1 (minimum per country config) | 10 (typical max per NAST condition records) | 0 (blocks PGI) | Per destination country + material group configuration (TTXOB) |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Export document generation (AC-3) | CRITICAL | MEDIUM | CRITICAL | Failure = shipment stuck at customs, regulatory fines, customer penalties, contract breach |
| Certificate of Analysis attachment (AC-2) | CRITICAL | HIGH | CRITICAL | Pharma regulatory requirement (FDA 21 CFR Part 11, EU GMP) — missing CoA = shipment rejection, regulatory warning letters, import license suspension |
| Export license check (AC-5) | CRITICAL | MEDIUM | CRITICAL | Export law violation (EAR/ITAR) — blocked shipment, legal penalties up to $1M, audit findings, business debarment risk |
| PGI blocking until docs complete (AC-4) | CRITICAL | LOW | CRITICAL | Business rule enforcement — prevents premature shipment causing customs detention and reverse logistics costs |
| Document archival (AC-6) | HIGH | LOW | HIGH | Audit compliance (SOX, customs authority) — missing archive = no proof for customs retroactive checks, fines for non-compliance |
| Navigation/app access (AC-1) | LOW | LOW | LOW | Cosmetic risk — UI availability issue, does not block business process |
| Master data completeness (HS code, origin) | CRITICAL | MEDIUM | CRITICAL | Dependency on material master data quality — missing data = doc generation failure, incorrect customs classification = duty disputes |

---

## Integration Risk

| Linked Issue | Type | Integration Risk | Scenario Needed |
|-------------|------|-----------------|-----------------|
| None — no linkedIssues in JSON | — | — | — |

**Note:** Despite no formal linked issues, this story has **critical implicit cross-module dependencies**:
- **QM (Quality Management):** CoA generation from inspection lots and batch certification (QAMB, QM11)
- **DMS (Document Management System):** CoA attachment storage and archive links (CV01N, TOA01)
- **MM (Materials Management):** Material master export data completeness (STAWN, HERKL in MARC)
- **LE (Logistics Execution):** Batch determination, picking, and packing (VL02N, LIPS-CHARG)
- **FI (Financial Accounting):** Commercial invoice generation from billing documents (VF01, VBRK/VBRP)
- **Basis (Export Control):** License master data, validity checks, and compliance rules (MEAN, EIPA)
- **Output Management:** Document output control and PDF generation (NAST, V/47)

These dependencies introduce **HIGH integration risk** even without explicit Jira links. Any failure in upstream data (QM CoA, MM master data, Export Control license) cascades to export documentation.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-49: Generate Export Documentation, Including A Certificate Of Analysis Ref
Module: SD — Sales & Distribution (with LE, QM, DMS, Export Control integration)

**Happy Path Scenarios:**
  HP-01: Create export delivery with all master data complete, CoA attached, valid license → generate all required docs (invoice, packing list) → verify CoA reference included → verify archive link created → PGI success → verify goods issue document number — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6

**Alternative Path Scenarios:**
  AP-01: Multi-line delivery (multiple materials/batches) → each material has HS code & origin → each batch has CoA → consolidated export docs generated with all CoAs referenced — Risk: HIGH — ACs: AC-2, AC-3, AC-6
  AP-02: Retrieve archived export documents after PGI for customs audit purposes → verify all docs accessible via Archive Link — Risk: HIGH — ACs: AC-6

**Negative Scenarios:**
  NEG-01: Batch exists but no Certificate of Analysis attached in QM/DMS → system error or warning on doc generation attempt → PGI blocked — Risk: CRITICAL — ACs: AC-2, AC-4
  NEG-02: Material master missing HS code (MARC-STAWN blank) → export document generation fails with error message — Risk: CRITICAL — ACs: AC-3, AC-4
  NEG-03: Material master missing country of origin (MARC-HERKL blank) → export document generation fails with error message — Risk: CRITICAL — ACs: AC-3, AC-4
  NEG-04: Export license required but missing in master data (MEAN-EXTWG set, EIPA record missing) → system flags shipment → PGI blocked with error — Risk: CRITICAL — ACs: AC-5, AC-4
  NEG-05: Export license expired (EIPA-GLTBIS < today) → system flags shipment → PGI blocked with error — Risk: CRITICAL — ACs: AC-5, AC-4
  NEG-06: Attempt PGI before all mandatory export documents generated (NAST output incomplete) → system blocks with error message listing missing doc types — Risk: CRITICAL — ACs: AC-4
  NEG-07: Mandatory document type configured for country but generation failed → PGI blocked even if some docs generated — Risk: CRITICAL — ACs: AC-4

**Error Scenarios:**
  ERR-01: Missing Sales Order → delivery creation fails with error — Risk: HIGH — ACs: AC-1, AC-3
  ERR-02: Missing Material → delivery creation fails with error — Risk: HIGH — ACs: AC-2, AC-3
  ERR-03: Missing Batch (for batch-managed pharma material) → delivery creation fails or picking incomplete — Risk: CRITICAL — ACs: AC-2
  ERR-04: Missing or invalid Shipping Point → delivery creation fails with error — Risk: HIGH — ACs: AC-1

**Edge Cases:**
  EDGE-01: Export license expiring today (EIPA-GLTBIS = sy-datum) → boundary = still valid → PGI allowed — Risk: CRITICAL — ACs: AC-5
  EDGE-02: Export license expiring tomorrow (EIPA-GLTBIS = sy-datum + 1) → PGI allowed but system warning — Risk: MEDIUM — ACs: AC-5
  EDGE-03: Minimum quantity (0.001) delivery → export docs generated correctly with decimal precision — Risk: MEDIUM — ACs: AC-3
  EDGE-04: Maximum number of delivery line items (999) → all CoAs referenced, consolidated docs generated without truncation — Risk: MEDIUM — ACs: AC-2, AC-3

**Integration Scenarios:**
  INT-01: QM inspection lot exists but CoA document generation pending in QM module → delivery creation allowed but doc generation warns/fails → PGI blocked — Risk: CRITICAL — Implicit QM dependency (QAMB → QM11)
  INT-02: DMS archive link broken or DMS interface down → document archival fails → PGI may succeed but audit trail incomplete (depends on config) — Risk: HIGH — Implicit DMS dependency (TOA01 → ArchiveLink)
  INT-03: Material master maintained but plant-specific export data missing (MARC record exists but STAWN/HERKL blank at plant level) → doc generation fails — Risk: HIGH — Implicit MM dependency (MARC plant-material records)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 1 | One complete end-to-end export delivery flow with all validations passing (covers AC-1 through AC-6) |
| AP | 2 | Multi-line delivery variant (tests consolidated CoA references) + post-PGI document retrieval (tests archival access) |
| NEG | 7 | 7 critical validation failures: no CoA (AC-2), missing HS code (AC-3), missing origin (AC-3), missing license (AC-5), expired license (AC-5), premature PGI (AC-4), incomplete doc types (AC-4) |
| ERR | 4 | 4 mandatory delivery creation fields: Sales Order, Material, Batch (pharma), Shipping Point |
| EDGE | 4 | License expiry date boundaries: expires today (valid), expires tomorrow (valid with warning), min quantity, max line items |
| INT | 3 | 3 implicit cross-module dependencies: QM CoA generation status, DMS archive interface availability, MM master data completeness |
| **TOTAL** | **21** | Comprehensive coverage of critical pharmaceutical export compliance scenario with regulatory risk |
