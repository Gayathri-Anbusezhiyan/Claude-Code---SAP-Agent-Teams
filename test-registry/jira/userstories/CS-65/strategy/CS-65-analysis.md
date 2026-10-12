# Story Analysis: [CS-65] Maintain A Bill Of Material (Bom) For A Pharmaceutical Finished Produc

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-65/CS-65.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Master Data Specialist |
| Core Action | Maintain a Bill of Material (BOM) for a pharmaceutical finished product with active ingredient percentages and approved excipient substitutes |
| Business Goal | Ensure production always uses a validated and regulatory-compliant formula |
| Business Object | Bill of Material (BOM) |
| SAP Module | PP — Production Planning and Manufacturing |
| Complexity | Complex (inferred high complexity due to regulatory compliance requirements, versioning, alternative components) |

### Implicit Business Rules (Domain-Inferred)
- All BOM components must reference materials that exist in the SAP material master (MARA/MARC)
- Material masters referenced in BOM must have an active status (not flagged, blocked, or marked for deletion)
- BOM header must reference a valid finished product material master configured for production
- BOM components must specify valid units of measure compatible with the material master base UoM
- Component quantities must be positive, non-zero values
- Alternative/substitute components must be mutually exclusive within a BOM item group
- Released BOM versions must be locked from direct editing — changes trigger new version creation
- BOM version status transitions follow a defined lifecycle: Draft → In Review → Released → Obsolete
- Regulatory approval status must be captured at the component level for traceability
- Change history must capture user ID, timestamp, field-level changes for audit compliance

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Manage Bills of Material" Fiori app. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The system requires each BOM component to reference an approved, active material master record. | VALIDATION_POSITIVE | CRITICAL | EP, BVA | HP + NEG(invalid material) + NEG(inactive material) | 3 |
| AC-3 | The system supports alternative/substitute components, each individually flagged with regulatory approval status. | BUSINESS_RULE | HIGH | EP, DT | HP(single substitute) + AP(multiple substitutes) + NEG(substitute without approval flag) | 3 |
| AC-4 | Any change to a released BOM triggers a new version and requires re-approval before use in a process order. | BUSINESS_RULE | CRITICAL | ST, DT | HP(modify released BOM → new version created) + NEG(attempt to use unapproved version) | 2 |
| AC-5 | The system prevents process order creation against a BOM version not in "Released" status. | VALIDATION_NEGATIVE | CRITICAL | EP | NEG(Draft status) + NEG(In Review status) + NEG(Obsolete status) | 3 |
| AC-6 | The system maintains a full change history of BOM revisions for regulatory audit purposes. | SUCCESS_CONFIRMATION | HIGH | EP | HP(modify BOM → verify change log entry with user, timestamp, field changes) | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Finished Product Material | Material | Alphanumeric | Yes | Existing material master with material type FERT or HALB, plant-specific |
| Plant | Plant | Alphanumeric (4 chars) | Yes | Existing plant in SAP organizational structure |
| BOM Component Material | Component | Alphanumeric | Yes | Existing material master, active status, approved for use |
| Component Quantity | Quantity | Numeric (decimal) | Yes | > 0, precision based on UoM |
| Component Unit of Measure | UoM | Alphanumeric (3 chars) | Yes | Valid UoM from material master |
| Alternative/Substitute Component | Alternative Component | Alphanumeric | No | Existing material master, same material group/category |
| Regulatory Approval Status | Approval Status | Enumerated | Yes (for pharma) | Approved / Pending / Rejected |
| BOM Usage | BOM Usage | Enumerated | Yes | Production / Engineering / Universal |
| Valid From Date | Valid From | Date | Yes | Today or future date |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Component Description | Component Description | Select Component Material | Material master MAKT |
| Base UoM | Base Unit | Select Component Material | Material master MARA-MEINS |
| Material Group | Material Group | Select Component Material | Material master MARA-MATKL |
| BOM Status | BOM Status | Initial creation | System default = "Draft" |
| Current Version | BOM Version | BOM header retrieval | BOM version management table |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| BOM Number | Unique SAP-generated BOM identifier | 8-digit alphanumeric, plant-specific |
| BOM Version | Version counter for the BOM | 2-digit numeric, increments on change to released BOM |
| Change Number | Engineering change order number (if ECM active) | 12-digit alphanumeric |
| Change Log Entry | Audit record of BOM modification | Timestamp, user ID, object key, field-level changes |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Component Quantity | 0.001 (system precision minimum) | 9999999.999 (system field length) | 0 (invalid) | Precision based on UoM decimal places |
| Number of Components | 1 (minimum valid BOM) | 9999 (system-configured max items per BOM) | 0 (invalid) | Single-component BOMs are valid |
| Number of Alternatives per Component | 0 (primary component only) | 99 (system-configured max alternatives per item) | N/A | Zero alternatives is valid |
| Valid From Date | Today (current date) | No upper limit | Past date (may be invalid based on configuration) | System may allow historical effective dates |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| BOM creation with valid components | CRITICAL | MEDIUM | CRITICAL | Core master data operation for production planning — failure blocks manufacturing |
| Material master validation (active, approved) | CRITICAL | MEDIUM | CRITICAL | Use of unapproved or inactive materials violates regulatory compliance (GMP, FDA 21 CFR Part 11) |
| Alternative/substitute component management | HIGH | MEDIUM | HIGH | Incorrect substitute usage leads to formula deviation and batch rejection |
| BOM versioning on change to released BOM | CRITICAL | HIGH | CRITICAL | Failure to version released BOMs breaks change control — severe audit finding |
| Prevention of process order creation with non-released BOM | CRITICAL | LOW | CRITICAL | System enforces this constraint — but critical if bypass exists |
| Change history/audit trail maintenance | HIGH | LOW | HIGH | Regulatory requirement (FDA, EU GMP) — missing audit trail = compliance violation |
| Mandatory field enforcement (material, quantity, plant) | HIGH | LOW | HIGH | Data integrity — missing fields break downstream MRP and production execution |
| Numeric boundaries (quantity precision, max components) | MEDIUM | MEDIUM | MEDIUM | BVA required — edge cases may cause rounding errors or system performance issues |
| Navigation/App access | LOW | LOW | LOW | Cosmetic risk — easily detected |

---

## Integration Risk

None — no linked issues identified in the story JSON. However, BOM management inherently integrates with:
- Material Master (MM-IM) — component validation dependency
- Production Orders (PP-SFC) — BOM release status check
- Engineering Change Management (PP-BD-ECM) — if change numbers are required
- Batch Management (LE-WM) — for batch-controlled materials in pharma BOMs

These integrations are domain-implied and must be captured in test pre-conditions.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-65: Maintain A Bill Of Material (Bom) For A Pharmaceutical Finished Produc
Module: PP — Production Planning and Manufacturing

Happy Path Scenarios:
  HP-01: Create BOM for finished pharmaceutical product with single active ingredient and excipient components, all approved and active — Risk: CRITICAL — ACs: AC-1, AC-2, AC-6
  HP-02: Create BOM with alternative/substitute components, each flagged with regulatory approval status — Risk: HIGH — ACs: AC-2, AC-3, AC-6

Alternative Path Scenarios:
  AP-01: Create BOM with multiple alternative components for a single item (multiple approved substitutes) — Risk: HIGH — ACs: AC-3

Negative Scenarios:
  NEG-01: Attempt to add BOM component with non-existent material ID — Risk: CRITICAL — ACs: AC-2
  NEG-02: Attempt to add BOM component with inactive/blocked material master — Risk: CRITICAL — ACs: AC-2
  NEG-03: Attempt to add substitute component without regulatory approval status flag — Risk: HIGH — ACs: AC-3
  NEG-04: Attempt to create process order against BOM with Draft status — Risk: CRITICAL — ACs: AC-5
  NEG-05: Attempt to create process order against BOM with In Review status — Risk: CRITICAL — ACs: AC-5
  NEG-06: Attempt to create process order against BOM with Obsolete status — Risk: CRITICAL — ACs: AC-5

Error Scenarios:
  ERR-01: Missing Finished Product Material field — Risk: HIGH — ACs: AC-2
  ERR-02: Missing Plant field — Risk: HIGH — ACs: AC-2
  ERR-03: Missing Component Material field — Risk: HIGH — ACs: AC-2
  ERR-04: Missing Component Quantity field — Risk: HIGH — ACs: AC-2
  ERR-05: Missing Component UoM field — Risk: HIGH — ACs: AC-2

Edge Cases:
  EDGE-01: Minimum component quantity (0.001 or smallest precision based on UoM) — Risk: MEDIUM — ACs: AC-2
  EDGE-02: Maximum component quantity (system upper limit) — Risk: MEDIUM — ACs: AC-2
  EDGE-03: Zero component quantity (invalid) — Risk: MEDIUM — ACs: AC-2
  EDGE-04: Single-component BOM (minimum valid BOM structure) — Risk: MEDIUM — ACs: AC-2
  EDGE-05: BOM with maximum number of components (system-configured limit) — Risk: MEDIUM — ACs: AC-2
  EDGE-06: Maximum number of alternatives per component item — Risk: MEDIUM — ACs: AC-3

State Transition / Versioning Scenarios:
  ST-01: Modify released BOM → verify new version created, status = Draft, old version remains Released — Risk: CRITICAL — ACs: AC-4, AC-6
  ST-02: Change Draft BOM (no new version created — in-place edit) — Risk: MEDIUM — ACs: AC-4, AC-6
  ST-03: Release new BOM version → verify status transition Draft → Released — Risk: CRITICAL — ACs: AC-4, AC-5

Integration Scenarios:
  (None explicitly linked in story, but domain-implied dependencies exist — see Integration Risk section)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 2 | Core BOM creation (standard + with alternatives) |
| AP | 1 | Multiple alternatives for single component |
| NEG | 6 | 2 material validation failures + 1 substitute approval failure + 3 process order prevention scenarios |
| ERR | 5 | 5 mandatory fields (finished product, plant, component, quantity, UoM) |
| EDGE | 6 | 3 quantity boundaries + 2 component count boundaries + 1 alternative count boundary |
| ST | 3 | BOM versioning lifecycle (modify released, modify draft, release new version) |
| INT | 0 | No explicit linked issues — domain dependencies captured in pre-conditions |
| **TOTAL** | **23** | |
