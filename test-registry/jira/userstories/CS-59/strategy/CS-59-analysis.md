# Story Analysis: [CS-59] Initiate A Rework Order For A Batch That Failed Final Inspection But I

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-59/CS-59.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Production Supervisor |
| Core Action | Initiate a Rework Order for a batch that failed final inspection but is eligible for reprocessing |
| Business Goal | Bring the batch back into specification under a controlled and documented process |
| Business Object | Rework Order (Process Order with rework type), Batch |
| SAP Module | PP (Production Planning) + QM (Quality Management) — cross-module integration |
| Complexity | Complex (multi-module integration, batch genealogy, QM disposition logic) |

### Implicit Business Rules (Domain-Inferred)
- Batch must exist in SAP batch master (MCHA/MCH1) before rework order can be created
- QA disposition record must exist in quality management system (QALS table) linked to the batch
- Rework procedure/recipe must be maintained in SAP recipe management (master recipe or control recipe)
- Rework order type must be configured in customizing with specific control parameters (order type category, movement types, costing rules)
- Batch traceability is maintained via batch genealogy (batch where-used/batch origin chain in MCH_WHO_MAT and MCH_IBASE tables)
- Reworked batch inherits critical characteristics from original batch but must have a distinct batch number
- QM inspection lot must be auto-created for the reworked batch (same inspection plan as original production)
- Authorization object PP_ORDER (production order maintenance) and QM_INSP (inspection lot processing) required
- Company code, plant, and material must be valid and linked in organizational structure
- Batch status must permit rework (not scrapped, not unrestricted-use unless QA disposition explicitly allows rework from unrestricted)

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Create Process Order" Fiori app with an order type designated for rework. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The system only allows a rework order to be created against a batch with a documented QA disposition approving rework. | BUSINESS_RULE, VALIDATION_POSITIVE | CRITICAL | EP, DT | HP (approved QA disposition), NEG (no QA disposition), NEG (QA disposition rejects rework) | 3 |
| AC-3 | The rework order references the original batch and captures the approved rework procedure/recipe. | VALIDATION_POSITIVE, MANDATORY_FIELD | HIGH | EP | HP, ERR (missing batch reference), ERR (missing rework procedure) | 3 |
| AC-4 | The system maintains full batch traceability linking the reworked batch to the original failed batch. | INTEGRATION, SUCCESS_CONFIRMATION | CRITICAL | EP | HP (verify batch genealogy post-creation) | 1 |
| AC-5 | The reworked batch is subject to the same quality inspection and in-process control requirements as standard production. | BUSINESS_RULE, INTEGRATION | HIGH | EP | HP (verify QM inspection lot triggered) | 1 |
| AC-6 | The batch record for the reworked batch documents the original failure and the approved rework justification. | SUCCESS_CONFIRMATION, VALIDATION_POSITIVE | HIGH | EP | HP (verify batch record content: original batch ref, failure reason, justification) | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Order Type | Order Type | Alphanumeric (4-char) | Yes | Configured rework order type (e.g., ZRW1) |
| Batch Number | Batch | Alphanumeric (10-char) | Yes | Existing batch with QA disposition approving rework |
| Material | Material | Alphanumeric (18-char) | Yes | Material master maintained for plant |
| Quantity | Quantity | Numeric (decimal) | Yes | > 0, within batch available quantity |
| Plant | Plant | Alphanumeric (4-char) | Yes | Valid plant in org structure |
| Rework Procedure/Recipe | Recipe / Master Recipe | Alphanumeric | Yes | Approved rework recipe in recipe management |
| Rework Justification | Rework Reason / Text | Text (long) | Yes | Free text explaining approved rework basis |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Material Description | Material Description | Confirm Material | Material master MAKT |
| Unit of Measure | UoM | Confirm Material | Material master MARA-MEINS |
| Original Batch Status | Batch Status | Confirm Batch | Batch master MCHA-ZUSCH |
| QA Disposition Status | UD Decision / Usage Decision | Confirm Batch | Quality inspection lot QALS-VBDKEY |
| Company Code | Company Code | Confirm Plant | Plant org assignment T001W |
| Production Scheduler | MRP Controller | Confirm Material + Plant | Material master MARC-DISPO |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Rework Order Number | Unique SAP-generated process order number | 12-digit numeric (e.g., 000001234567) |
| Reworked Batch Number | New batch number for the reworked output | 10-char alphanumeric, system-generated or user-assigned |
| Batch Genealogy Record | Traceability linkage (original batch → reworked batch) | System table entries in MCH_WHO_MAT, MCH_IBASE |
| Inspection Lot Number | QM inspection lot auto-created for reworked batch | 12-digit numeric |
| Rework Order Status | Initial order status | REL (Released) or CRTD (Created), depending on config |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Quantity | 0.001 (minimum positive, UoM-dependent) | Available batch quantity (from original batch stock) | 0 (invalid) | Must not exceed original batch unrestricted or blocked stock eligible for rework |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Rework order creation | CRITICAL | MEDIUM | CRITICAL | Core business transaction for non-conforming material recovery; failure blocks rework process |
| QA disposition validation | CRITICAL | MEDIUM | CRITICAL | Regulatory compliance risk; rework without QA approval violates cGMP/quality standards |
| Batch traceability linkage | CRITICAL | MEDIUM | CRITICAL | Regulatory requirement (FDA 21 CFR Part 11, ISO 13485); missing genealogy = audit finding |
| Recipe/procedure assignment | HIGH | MEDIUM | HIGH | Incorrect recipe leads to batch failure or non-conformance |
| Mandatory field enforcement | HIGH | LOW | HIGH | Data integrity; missing fields compromise batch record completeness |
| QM inspection triggering | HIGH | MEDIUM | HIGH | Bypassed inspection = undetected quality issues in reworked batch |
| Navigation/Access | LOW | LOW | LOW | Cosmetic risk; easily detected in UAT |

---

## Integration Risk

None — no linked issues identified in the story JSON.

Note: However, this story has implicit integration dependencies (not captured in Jira links):
- QM module integration (QA disposition check, inspection lot creation)
- Batch Management integration (batch genealogy, batch status)
- Recipe Management integration (rework procedure/recipe assignment)

These cross-module dependencies elevate overall risk to CRITICAL.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-59: Initiate A Rework Order For A Batch That Failed Final Inspection But I
Module: PP (Production Planning) + QM (Quality Management)

Happy Path Scenarios:
  HP-01: Create rework order for approved batch with full traceability and QM inspection — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6

Negative Scenarios:
  NEG-01: Attempt rework order creation for batch without QA disposition — Risk: CRITICAL — ACs: AC-2
  NEG-02: Attempt rework order creation for batch with QA disposition rejecting rework — Risk: CRITICAL — ACs: AC-2
  NEG-03: Attempt rework order creation for non-existent batch — Risk: HIGH — ACs: AC-2, AC-3

Error Scenarios:
  ERR-01: Missing Batch Number field — Risk: HIGH — ACs: AC-3
  ERR-02: Missing Rework Procedure/Recipe field — Risk: HIGH — ACs: AC-3
  ERR-03: Missing Rework Justification field — Risk: HIGH — ACs: AC-6

Edge Cases:
  EDGE-01: Minimum quantity boundary (0.001 or UoM-specific minimum) — Risk: MEDIUM — ACs: AC-3
  EDGE-02: Zero quantity — Risk: MEDIUM — ACs: AC-3

Integration Scenarios:
  (None explicitly defined in Jira links, but implicit QM and Batch Management integration covered in HP-01)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 1 | One comprehensive happy path covering all ACs with QA disposition validation, batch traceability, and QM inspection triggering |
| AP | 0 | None — no alternative valid paths identified; rework order creation follows a single controlled process |
| NEG | 3 | Three validation scenarios: no QA disposition (NEG-01), QA disposition rejects rework (NEG-02), non-existent batch (NEG-03) |
| ERR | 3 | Three mandatory fields: Batch Number (ERR-01), Rework Procedure/Recipe (ERR-02), Rework Justification (ERR-03) |
| EDGE | 2 | Two boundary conditions: minimum quantity (EDGE-01), zero quantity (EDGE-02) |
| INT | 0 | None — no linked Jira issues. Cross-module integration (QM, Batch) verified within HP-01 |
| **TOTAL** | **9** | |
