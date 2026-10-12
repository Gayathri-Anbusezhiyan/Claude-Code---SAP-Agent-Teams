# Story Analysis: [CS-56] View A Batch Genealogy Report Showing The Complete Lineage From Raw Ma

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-56/CS-56.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Production Supervisor |
| Core Action | View a Batch Genealogy report showing complete lineage from raw material batches through to finished product batch |
| Business Goal | Respond quickly to suspected quality issues or regulatory recall requests |
| Business Object | Batch Genealogy Report / Batch Record |
| SAP Module | PP — Production Planning & Control / QM — Quality Management |
| Complexity | Complex (assumed 6+ SP based on multi-level traceability requirements and regulatory implications) |

### Implicit Business Rules (Domain-Inferred)
- Batch master records must exist for all raw materials, intermediates, and finished goods involved in the production chain
- Batch determination and where-used tracking must be activated for all materials in the genealogy chain
- Manufacturing orders must be confirmed with batch assignments for consumption and output
- Batch-managed materials must have proper classification records (origin batch, vendor batch) maintained
- Batch status records must be available (in-process inspection results, release status, approval dates)
- User must have authorization for batch information cockpit (transaction code BMBC or equivalent Fiori app)
- Genealogy data must traverse multiple production levels (raw material → semi-finished → finished goods)
- Export functionality requires authorization for data extraction and report generation
- System performance for genealogy queries depends on batch determination configuration and archiving strategy

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Batch Information Cockpit" or equivalent genealogy Fiori app | NAVIGATION | MEDIUM | EP | HP | 1 |
| AC-2 | The user can search by finished goods batch number to view all consumed component batches and their originating vendors | VALIDATION_POSITIVE | CRITICAL | EP, BVA | HP, NEG | 2 |
| AC-3 | The system displays the full where-used chain if the finished batch was further processed or repackaged | BUSINESS_RULE | HIGH | EP, ST | HP, AP, NEG | 3 |
| AC-4 | The report includes relevant dates: manufacturing, in-process control results, and release date | VALIDATION_POSITIVE | HIGH | EP | HP | 1 |
| AC-5 | The report can be exported for inclusion in a regulatory recall response or customer quality inquiry | SUCCESS_CONFIRMATION | HIGH | EP | HP, ERR | 2 |
| AC-6 | The system returns genealogy results within an acceptable time frame to support time-critical recall investigations | BUSINESS_RULE | CRITICAL | Performance Testing | HP, EDGE | 2 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Finished Goods Batch Number | Batch | Alphanumeric (max 10 chars) | Yes | Existing batch in SAP batch master (MCHA) |
| Material Number | Material | Alphanumeric (max 18 chars) | No (can search by batch alone) | Existing material master |
| Plant | Plant | Alphanumeric (4 chars) | No (can be derived from batch) | Existing plant in SAP |
| Search Scope | Direction (Usage/Origin) | Selection | No | "Where Used" or "Components" or "Both" |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Material Description | Material Name | Select Batch Number | Material Master MAKT |
| Manufacturing Date | Production Date | Batch Confirmed | Manufacturing Order Confirmation |
| Vendor Batch Number | Vendor Batch | Component Batch Selected | Batch Classification AUSP/INOB |
| Vendor Name | Supplier | Vendor Batch Loaded | Vendor Master LFA1 |
| Batch Status | Release Status | Batch Loaded | Batch Status (CHVW) |
| Inspection Lot Number | Quality Lot | Batch Loaded | Quality Inspection Lot (QALS) |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Component Batch List | Multi-level list of consumed raw material and intermediate batches | Hierarchical tree structure |
| Where-Used Chain | List of finished goods or repackaged batches that consumed the searched batch | Hierarchical tree or list |
| Manufacturing Order Numbers | Production orders that consumed or produced the batches | 12-digit numeric |
| Inspection Results | In-process control results and final release decisions | Pass/Fail + characteristics |
| Release Date | Batch release to unrestricted use date | Date (YYYY-MM-DD) |
| Vendor Information | Originating vendor name and vendor batch number for each raw material batch | Text + alphanumeric |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Genealogy Depth | 1 level (immediate components or where-used) | System-configured maximum (typically 10-15 levels) | N/A | Performance degrades with depth |
| Query Response Time | 0 seconds (cached) | Acceptable threshold per AC-6 (suggest 10 seconds for complex genealogy) | N/A | Regulatory recall time-criticality |
| Number of Component Batches | 1 (simple BOM) | Thousands (complex assemblies with multiple BOM levels) | 0 (invalid - no components) | Test with varying BOM complexity |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Batch genealogy query accuracy | CRITICAL | MEDIUM | CRITICAL | Incorrect recall scope = regulatory non-compliance + customer safety risk |
| Search by finished goods batch | CRITICAL | LOW | CRITICAL | Core use case for recall investigations |
| Where-used chain completeness | HIGH | MEDIUM | HIGH | Missing downstream products = incomplete recall |
| Component vendor traceability | HIGH | MEDIUM | HIGH | Regulatory requirement to identify source of contamination |
| Date accuracy (mfg, inspection, release) | HIGH | LOW | HIGH | Required for regulatory recall timeline documentation |
| Export functionality | HIGH | LOW | HIGH | Recall response submission to authorities |
| Query performance | CRITICAL | MEDIUM | CRITICAL | Delayed response = delayed recall = safety risk |
| Navigation/Access | MEDIUM | LOW | MEDIUM | Authorization required for sensitive batch data |
| Non-existent batch handling | MEDIUM | MEDIUM | MEDIUM | User error - must provide clear feedback |
| Multi-level BOM complexity | HIGH | MEDIUM | HIGH | Complex products = deep genealogy trees |

---

## Integration Risk

None — no linked issues identified in Jira.

However, implicit integration dependencies exist:
- **PP (Production Planning)**: Manufacturing order confirmations feed batch consumption records
- **QM (Quality Management)**: Inspection lot results determine batch release status
- **MM (Materials Management)**: Goods receipts create raw material batch records with vendor linkage
- **Warehouse Management**: Batch stock movements affect where-used chain
- **Vendor Master**: Vendor batch classification requires active vendor records

These dependencies introduce **MEDIUM-HIGH** integration risk even without explicit linked stories.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-56: View A Batch Genealogy Report Showing The Complete Lineage From Raw Ma
Module: PP / QM

Happy Path Scenarios:
  HP-01: View genealogy for a finished goods batch with single-level BOM — Risk: CRITICAL — ACs: AC-1, AC-2, AC-4, AC-6
  HP-02: View genealogy for a finished goods batch with multi-level BOM (raw → intermediate → finished) — Risk: CRITICAL — ACs: AC-1, AC-2, AC-4, AC-6
  HP-03: View where-used chain for a batch that was further processed (finished → repackaged) — Risk: HIGH — ACs: AC-1, AC-3, AC-4, AC-6
  HP-04: Export genealogy report to file (PDF or Excel) — Risk: HIGH — ACs: AC-1, AC-5

Alternative Path Scenarios:
  AP-01: Search by batch number without specifying material (system derives material) — Risk: MEDIUM — ACs: AC-2
  AP-02: Search with both component view and where-used view enabled (bidirectional genealogy) — Risk: HIGH — ACs: AC-2, AC-3

Negative Scenarios:
  NEG-01: Search by non-existent finished goods batch number — Risk: MEDIUM — ACs: AC-2, AC-6
  NEG-02: Search by batch number in wrong format (invalid characters or length) — Risk: LOW — ACs: AC-2
  NEG-03: Access Batch Information Cockpit without required authorization — Risk: MEDIUM — ACs: AC-1
  NEG-04: Search by batch that has no component batches (never consumed anything) — Risk: MEDIUM — ACs: AC-2, AC-3

Error Scenarios:
  ERR-01: Missing Batch Number field — Risk: HIGH — ACs: AC-2
  ERR-02: Export fails due to system authorization or technical error — Risk: MEDIUM — ACs: AC-5

Edge Cases:
  EDGE-01: Genealogy query with maximum BOM depth (10+ levels) — Risk: HIGH — ACs: AC-2, AC-6 (performance stress test)
  EDGE-02: Genealogy query for batch with hundreds of component batches (complex assembly) — Risk: HIGH — ACs: AC-2, AC-6 (performance stress test)
  EDGE-03: Query genealogy at exactly the acceptable time threshold — Risk: CRITICAL — ACs: AC-6 (boundary of acceptable performance)
  EDGE-04: Batch with incomplete dates (e.g., released but no inspection date recorded) — Risk: MEDIUM — ACs: AC-4

Integration Scenarios:
  INT-01: Verify vendor batch number linkage from MM goods receipt to PP batch genealogy — Risk: HIGH — Implicit dependency: MM/PP integration
  INT-02: Verify inspection lot results from QM appear in genealogy report — Risk: HIGH — Implicit dependency: QM/PP integration

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 4 | Core genealogy views: single-level, multi-level, where-used, export |
| AP | 2 | Search variants and bidirectional genealogy |
| NEG | 4 | Non-existent batch, invalid format, unauthorized access, no components |
| ERR | 2 | Missing mandatory field + export failure |
| EDGE | 4 | Maximum BOM depth, complex assembly, performance threshold, incomplete dates |
| INT | 2 | MM/PP vendor linkage + QM/PP inspection results |
| **TOTAL** | **18** | Comprehensive coverage for CRITICAL regulatory recall use case |
