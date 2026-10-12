# Story Analysis: [CS-26] Generate A Batch Traceability Report Showing All Goods Movements For A

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-26/CS-26.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Compliance Officer |
| Core Action | Generate a Batch Traceability Report showing all goods movements for a specific raw material batch |
| Business Goal | Respond to a regulatory recall inquiry within the required timeframe |
| Business Object | Batch Traceability Report / Batch Where-Used List |
| SAP Module | MM — Materials Management (Batch Management) |
| Complexity | Complex (regulatory compliance + traceability + performance requirements) |

### Implicit Business Rules (Domain-Inferred)
- Batch number must exist in SAP batch master (MCHA/MCH1)
- Material must be configured with batch management enabled (XCHPF = X in MARA)
- Goods movements must be recorded in material documents (MSEG/MKPF)
- Process orders and deliveries must have batch assignments to enable downstream linkage
- User must have authorization for MM03/MB56/MB51 or equivalent Fiori apps
- Vendor batch reference must be maintained at goods receipt if used as search criterion
- System performance for batch traceability queries is critical for time-sensitive recall scenarios

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Batch Where-Used List" or equivalent traceability Fiori app. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The user can search by batch number, material, or vendor batch reference. | VALIDATION_POSITIVE | HIGH | EP, BVA | HP (batch number) + AP (material) + AP (vendor batch) + NEG (non-existent batch) + NEG (material not batch-managed) | 5 |
| AC-3 | The system displays all goods receipts, transfers, consumption, and issues associated with the batch, including dates and quantities. | SUCCESS_CONFIRMATION | CRITICAL | EP | HP (comprehensive display verification) + EDGE (batch with zero movements) | 2 |
| AC-4 | The system displays downstream linkage to any process orders or deliveries that consumed the batch. | INTEGRATION | CRITICAL | EP | HP (with process order) + HP (with delivery) + AP (no downstream linkage) | 3 |
| AC-5 | The report can be exported to Excel/PDF for inclusion in a regulatory response package. | SUCCESS_CONFIRMATION | HIGH | EP | HP (Excel export) + AP (PDF export) + NEG (export failure) | 3 |
| AC-6 | The system completes the search and generates results within an acceptable performance threshold for time-critical recall situations. | BUSINESS_RULE | MEDIUM | EP | HP (performance validation) | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Batch Number | Batch | Alphanumeric (10 chars max) | Yes (for batch search) | Existing batch in SAP master (MCHA) |
| Material Number | Material | Alphanumeric (18 chars max) | Yes (for material search) | Existing material with batch management enabled |
| Vendor Batch | Vendor Batch | Alphanumeric (15 chars max) | Yes (for vendor batch search) | Vendor batch reference from GR |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Material Description | Material Description | Enter Material Number | Material master MAKT |
| Base Unit of Measure | Base UoM | Enter Material Number | Material master MARA-MEINS |
| Plant | Plant | Select from batch results | Material document MSEG-WERKS |
| Storage Location | Storage Location | Select from batch results | Material document MSEG-LGORT |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Goods Receipt Date | Date of goods receipt movement | DD.MM.YYYY |
| Goods Receipt Quantity | Quantity received | Decimal (with UoM) |
| Transfer Date | Date of transfer movement | DD.MM.YYYY |
| Transfer Quantity | Quantity transferred | Decimal (with UoM) |
| Consumption Date | Date of consumption movement | DD.MM.YYYY |
| Consumption Quantity | Quantity consumed | Decimal (with UoM) |
| Issue Date | Date of issue movement | DD.MM.YYYY |
| Issue Quantity | Quantity issued | Decimal (with UoM) |
| Process Order Number | Process order that consumed the batch | 12-digit numeric |
| Delivery Number | Delivery that consumed the batch | 10-digit numeric |
| Material Document | Material document number | 10-digit numeric |
| Movement Type | SAP movement type code | 3-digit numeric (101, 311, 261, etc.) |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Batch with zero movements | 0 movements | System maximum | 0 valid | Edge case: batch created but never used |
| Search results count | 0 results | System maximum (10000+) | 0 valid | Performance test for large result sets |
| Export file size | 0 KB | System maximum (Excel 1MB+ / PDF 10MB+) | N/A | Large report export |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Batch traceability query completeness | CRITICAL | MEDIUM | CRITICAL | Incomplete results could lead to regulatory non-compliance during recall |
| Downstream linkage (process orders/deliveries) | CRITICAL | MEDIUM | CRITICAL | Missing linkage data prevents full recall scope identification |
| Search by batch number | HIGH | LOW | HIGH | Primary search criterion; failure blocks entire workflow |
| Search by material | HIGH | LOW | HIGH | Alternative search path; must work for batch identification |
| Search by vendor batch | HIGH | MEDIUM | HIGH | External reference dependency; vendor data quality risk |
| Export to Excel/PDF | HIGH | MEDIUM | HIGH | Regulatory response requires documented evidence |
| Performance threshold | MEDIUM | MEDIUM | MEDIUM | Time-critical scenario but non-functional requirement |
| Navigation/Access | LOW | LOW | LOW | Standard Fiori app access |

---

## Integration Risk

None — no linked issues identified.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-26: Generate A Batch Traceability Report Showing All Goods Movements For A
Module: MM (Materials Management — Batch Management)

Happy Path Scenarios:
  HP-01: Access Batch Where-Used List app, search by batch number, verify all movements displayed (GR/transfer/consumption/issue), verify downstream process order linkage, export to Excel — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-5
  HP-02: Search by batch number, verify downstream delivery linkage — Risk: CRITICAL — ACs: AC-2, AC-4
  HP-03: Search by batch number, verify performance threshold met — Risk: MEDIUM — ACs: AC-2, AC-6

Alternative Path Scenarios:
  AP-01: Search by material number (instead of batch) — Risk: HIGH — ACs: AC-2, AC-3
  AP-02: Search by vendor batch reference (instead of batch number) — Risk: HIGH — ACs: AC-2, AC-3
  AP-03: Batch with no downstream linkage (not consumed in process orders or deliveries) — Risk: HIGH — ACs: AC-4
  AP-04: Export report to PDF (instead of Excel) — Risk: HIGH — ACs: AC-5

Negative Scenarios:
  NEG-01: Search with non-existent batch number — Risk: HIGH — ACs: AC-2
  NEG-02: Search with material not configured for batch management — Risk: HIGH — ACs: AC-2
  NEG-03: Export fails due to system error — Risk: HIGH — ACs: AC-5

Error Scenarios:
  ERR-01: Missing Batch Number field (when batch search selected) — Risk: HIGH — ACs: AC-2
  ERR-02: Missing Material field (when material search selected) — Risk: HIGH — ACs: AC-2
  ERR-03: Missing Vendor Batch field (when vendor batch search selected) — Risk: HIGH — ACs: AC-2

Edge Cases:
  EDGE-01: Batch with zero goods movements (created but never used) — Risk: MEDIUM — ACs: AC-3
  EDGE-02: Batch with very large number of movements (performance test) — Risk: MEDIUM — ACs: AC-3, AC-6
  EDGE-03: Export very large report (file size limit test) — Risk: MEDIUM — ACs: AC-5

Integration Scenarios:
  (None — no linked issues)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 3 | Core batch search + downstream linkage (process order) + performance |
| AP | 4 | Alternative search paths (material, vendor batch) + no downstream linkage + PDF export |
| NEG | 3 | Non-existent batch + non-batch-managed material + export failure |
| ERR | 3 | Missing mandatory search fields (batch/material/vendor batch) |
| EDGE | 3 | Zero movements + large result set + large export file |
| INT | 0 | None — no linked issues |
| **TOTAL** | **16** | |
