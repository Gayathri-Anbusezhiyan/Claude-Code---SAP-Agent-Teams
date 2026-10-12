# Story Analysis: [CS-30] Create A Material Master Record For A New Api With A Defined Shelf-Lif

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-30/CS-30.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Material Master Data Specialist |
| Core Action | Create a Material Master record for a new API with a defined shelf-life profile and batch management indicator |
| Business Goal | Material is correctly controlled through procurement, inventory, and production processes |
| Business Object | Material Master (GMP-regulated API) |
| SAP Module | MM — Materials Management |
| Complexity | Complex (GMP regulatory compliance, batch management, QM integration) |

### Implicit Business Rules (Domain-Inferred)
- GMP (Good Manufacturing Practice) materials require stricter controls than standard materials due to pharmaceutical regulatory requirements
- Batch management is mandatory for GMP-regulated APIs (Active Pharmaceutical Ingredients) to enable lot tracking through production and distribution
- Quality Management (QM) module integration is mandatory for GMP materials to enforce quality inspections
- Material type configuration drives mandatory field requirements — GMP flag in material type configuration activates additional mandatory fields
- Shelf-life parameters must be maintained at Plant Data/Storage view level (not general data) to enable plant-specific shelf-life control
- Regulatory audit trail is mandatory for pharmaceutical materials to comply with FDA 21 CFR Part 11 and EU GMP Annex 11 electronic records requirements
- Minimum Remaining Shelf Life must be less than Total Shelf Life to allow time-based inventory management (SLED)
- Material cannot be used in procurement or production until all GMP-relevant fields are complete and validated
- Changes to regulatory-relevant fields (batch indicator, shelf-life, QM type) must be logged with user ID, timestamp, and old/new values

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Manage Material Master" Fiori app. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The system requires the batch management indicator to be set for materials flagged as GMP-regulated in the material type configuration. | BUSINESS_RULE + MANDATORY_FIELD | CRITICAL | EP, DT | HP, NEG, ERR | 3 |
| AC-3 | The system requires entry of total shelf life and minimum remaining shelf life on the Plant Data / Storage view. | MANDATORY_FIELD | HIGH | EP, BVA | HP, ERR (×2), EDGE (×4) | 7 |
| AC-4 | The system requires an assigned Quality Management inspection type for GMP-relevant materials. | MANDATORY_FIELD + INTEGRATION | HIGH | EP | HP, NEG, ERR | 3 |
| AC-5 | The material record cannot be released for procurement until all mandatory GMP fields are completed. | BUSINESS_RULE + VALIDATION_NEGATIVE | CRITICAL | DT, EP | HP, NEG | 2 |
| AC-6 | A change log captures all subsequent modifications to regulatory-relevant fields for audit purposes. | SUCCESS_CONFIRMATION + BUSINESS_RULE | CRITICAL | EP | HP | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Material Type | Material Type | Alphanumeric | Yes | Must be GMP-regulated type (e.g., FERT, HALB, ROH with GMP flag in config) |
| Material Number | Material | Alphanumeric | Yes (if manual numbering) | Unique identifier; auto-generated if internal numbering enabled |
| Material Description | Material Description | Text | Yes | Max 40 characters (short text) or 80 characters (long text) depending on field |
| Base Unit of Measure | Base Unit of Measure | UoM Code | Yes | Valid UoM from SAP T006 (e.g., KG, L, PC, EA) |
| Batch Management Indicator | Batch Management | Checkbox/Flag | Yes (for GMP materials) | True/False; must be True for GMP materials |
| Total Shelf Life | Total Shelf Life | Numeric (days) | Yes (for GMP materials) | Integer > 0, typically 1–3650 days |
| Minimum Remaining Shelf Life | Min. Remaining Shelf Life | Numeric (days) | Yes (for GMP materials) | Integer > 0 and < Total Shelf Life |
| Plant | Plant | Alphanumeric | Yes | Valid plant code from SAP T001W |
| Storage Location | Storage Location | Alphanumeric | No | Valid storage location for the plant from SAP T001L |
| QM Inspection Type | QM Inspection Type | Code | Yes (for GMP materials) | Valid QM inspection type from SAP quality management configuration |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Material Group | Material Group | Material Type selection | Material type master configuration |
| Valuation Class | Valuation Class | Material Type + Plant selection | Material type and plant combination in config |
| Profit Center | Profit Center | Plant assignment | Plant master data T001W |
| Company Code | Company Code | Plant assignment | Plant-to-company code assignment T001K |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Material Number | Unique SAP-generated material identifier (if auto-numbering) | Alphanumeric, length varies by numbering range config (e.g., 18-digit for internal, custom for external) |
| Creation Date | System timestamp of material creation | Date (YYYY-MM-DD) |
| Created By | User ID who created the material | SAP User ID |
| Change Log Entry | Audit log record for each modification to regulatory-relevant fields | Table entry in change documents (CDHDR/CDPOS) containing: Material, Field Name, Old Value, New Value, Change Date, Changed By |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Total Shelf Life | 1 day (minimum valid) | 3650 days (typical max; system-configured) | 0 (invalid; system rejects) | Must be positive integer |
| Minimum Remaining Shelf Life | 1 day (minimum valid) | Total Shelf Life - 1 (must be less than total) | 0 (invalid; system rejects) | Must be positive integer and < Total Shelf Life |
| Material Description (short text) | 1 character | 40 characters | Empty (invalid if mandatory) | Length constraint per SAP field MAKTX |
| Material Description (long text) | 1 character | 80 characters | Empty (depends on config) | Optional long description field |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| GMP Material Master creation (complete flow) | CRITICAL | MEDIUM | CRITICAL | Regulatory compliance failure; incorrect setup leads to production delays, batch traceability loss, and audit failures (FDA, EU GMP) |
| Batch management indicator enforcement | CRITICAL | MEDIUM | CRITICAL | GMP materials without batch tracking violate pharmaceutical regulations; cannot track lot numbers through production and distribution |
| Shelf-life validation | HIGH | MEDIUM | HIGH | Incorrect shelf-life parameters lead to material expiry issues in production and inventory; affects FEFO (First Expired, First Out) logic |
| QM inspection type assignment | HIGH | MEDIUM | HIGH | Missing QM integration blocks quality control processes; materials cannot be inspected before release |
| Procurement release control (incomplete fields) | CRITICAL | LOW | CRITICAL | Releasing incomplete GMP materials causes downstream procurement errors; POs created with invalid materials |
| Change log audit trail | CRITICAL | LOW | CRITICAL | Audit trail failure violates regulatory compliance (FDA 21 CFR Part 11, EU GMP Annex 11); risk of audit findings and production shutdown |
| Navigation/Access to Manage Material Master app | LOW | LOW | LOW | Cosmetic risk; easily detected; does not affect business process |

---

## Integration Risk

None — no linked issues identified.

---

## Scenario Inventory

**SCENARIO INVENTORY — CS-30: Create A Material Master Record For A New Api With A Defined Shelf-Life**

**Module:** MM — Materials Management

### Happy Path Scenarios:
- **HP-01:** Create complete GMP-regulated API Material Master with all mandatory fields including batch management indicator, total shelf life, minimum remaining shelf life, and QM inspection type; verify material is released for procurement and change log is generated — **Risk: CRITICAL** — **ACs: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6**

### Alternative Path Scenarios:
(None — no alternative valid paths identified for GMP material creation; all fields are mandatory)

### Negative Scenarios:
- **NEG-01:** Attempt to create GMP material without setting batch management indicator — **Risk: CRITICAL** — **ACs: AC-2, AC-5**
- **NEG-02:** Attempt to create GMP material without assigning QM inspection type — **Risk: HIGH** — **ACs: AC-4, AC-5**
- **NEG-03:** Attempt to release material for procurement with incomplete GMP fields (missing shelf-life or QM type) — **Risk: CRITICAL** — **ACs: AC-5**

### Error Scenarios:
- **ERR-01:** Missing Total Shelf Life on Plant Data/Storage view — **Risk: HIGH** — **ACs: AC-3, AC-5**
- **ERR-02:** Missing Minimum Remaining Shelf Life on Plant Data/Storage view — **Risk: HIGH** — **ACs: AC-3, AC-5**
- **ERR-03:** Missing Batch Management Indicator for GMP material — **Risk: CRITICAL** — **ACs: AC-2, AC-5**
- **ERR-04:** Missing QM Inspection Type for GMP material — **Risk: HIGH** — **ACs: AC-4, AC-5**

### Edge Cases:
- **EDGE-01:** Total Shelf Life = 1 day (minimum boundary) — **Risk: MEDIUM** — **ACs: AC-3**
- **EDGE-02:** Total Shelf Life = 3650 days (maximum boundary, typical system limit) — **Risk: MEDIUM** — **ACs: AC-3**
- **EDGE-03:** Minimum Remaining Shelf Life = 1 day (minimum boundary) — **Risk: MEDIUM** — **ACs: AC-3**
- **EDGE-04:** Minimum Remaining Shelf Life = Total Shelf Life - 1 (maximum valid boundary) — **Risk: MEDIUM** — **ACs: AC-3**
- **EDGE-05:** Minimum Remaining Shelf Life = Total Shelf Life (invalid — should fail validation) — **Risk: HIGH** — **ACs: AC-3**

### Integration Scenarios:
(None — no linked issues)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 1 | One complete end-to-end creation flow with all mandatory GMP fields and change log verification |
| AP | 0 | None — no alternative valid paths for GMP material creation; all fields mandatory |
| NEG | 3 | Three validation scenarios: (1) missing batch indicator, (2) missing QM type, (3) procurement release with incomplete fields |
| ERR | 4 | Four mandatory field error scenarios: (1) missing total shelf life, (2) missing min remaining shelf life, (3) missing batch indicator, (4) missing QM type |
| EDGE | 5 | Five boundary scenarios for shelf-life parameters: min/max total shelf life, min/max minimum remaining shelf life, invalid equal values |
| INT | 0 | None — no linked issues identified |
| **TOTAL** | **13** | Comprehensive coverage for GMP-regulated material creation with regulatory compliance focus |
