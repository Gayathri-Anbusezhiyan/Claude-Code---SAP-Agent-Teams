# Story Analysis: [CS-57] Create And Version A Master Recipe For A Pharmaceutical Product With D

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-57/CS-57.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Master Data Specialist |
| Core Action | Create and version a Master Recipe for a pharmaceutical product with defined process parameters and in-process control specifications |
| Business Goal | Ensure production is executed consistently according to the validated manufacturing process |
| Business Object | Master Recipe (Recipe Header, Recipe Operations, In-Process Control Specifications, Recipe Version) |
| SAP Module | PP — Production Planning & Manufacturing (Pharmaceutical/Process Manufacturing) |
| Complexity | Complex (No story points assigned — high complexity inferred from: versioning requirements, approval workflow, audit trail, pharmaceutical compliance, in-process control specifications) |

### Implicit Business Rules (Domain-Inferred)
- Master Recipe must be linked to a valid Material Master (finished product)
- Material must be configured for production (Material Type = FERT or HALB)
- Recipe operations must reference valid Work Centers maintained in the plant
- In-process control specifications must reference valid Inspection Characteristics from Quality Management
- Recipe versioning follows SAP standard versioning logic (version counter increments automatically)
- Approval workflow requires defined organizational approval structure (approval roles/users configured)
- Released recipe becomes immutable — any edit creates new version draft
- Historical recipe versions must remain accessible for regulatory audit (21 CFR Part 11 compliance for pharmaceutical)
- Process Order can only reference Released recipes (draft/obsolete versions blocked)
- Recipe effective date controls which version is valid for production planning at any point in time
- Recipe changes trigger change document logging (standard SAP change document object)

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Manage Master Recipes" Fiori app. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The system requires the recipe to go through a defined approval workflow before its status changes to "Released." | BUSINESS_RULE | CRITICAL | EP, ST | HP + NEG(workflow incomplete) | 2 |
| AC-3 | Any change to a released recipe automatically creates a new version, preserving the prior version for audit history. | BUSINESS_RULE | CRITICAL | ST | HP(edit released) + AP(version increment) | 2 |
| AC-4 | The system prevents a process order from being created against a recipe version that is not in "Released" status. | VALIDATION_NEGATIVE | CRITICAL | EP | NEG(draft recipe) + NEG(obsolete recipe) | 2 |
| AC-5 | The recipe captures required in-process control checkpoints, target values, and acceptable ranges. | MANDATORY_FIELD | HIGH | EP, BVA | HP(all fields) + ERR(missing checkpoint) + ERR(missing target) + ERR(missing range) + EDGE(boundary ranges) | 5 |
| AC-6 | The system logs the requestor, approver, and effective date for every recipe version change. | SUCCESS_CONFIRMATION | CRITICAL | EP | HP(audit log verification) | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Material Number | Material | Alphanumeric (18 chars) | Yes | Existing material in Material Master with Material Type = FERT/HALB |
| Plant | Plant | Alphanumeric (4 chars) | Yes | Existing plant in SAP organization structure |
| Recipe Description | Description | Text (40 chars) | Yes | Free text |
| Recipe Type | Recipe Type | Code | Yes | Standard SAP recipe types (e.g., 1=Standard Recipe, 2=Special Recipe) |
| Base Quantity | Base Quantity | Numeric | Yes | > 0, per UoM |
| Base UoM | Unit of Measure | Code (3 chars) | Yes | Valid UoM from UoM master |
| Operation Number | Operation | Numeric (4 digits) | Yes | Unique within recipe, format NNNN |
| Work Center | Work Center | Alphanumeric (8 chars) | Yes | Existing work center in plant |
| Operation Description | Operation Short Text | Text (40 chars) | Yes | Free text |
| Control Key | Control Key | Code (4 chars) | Yes | Valid control key (e.g., PP01=internal processing) |
| Standard Duration | Standard Time | Numeric | Yes | > 0, per time UoM |
| Time UoM | Time Unit | Code | Yes | Valid time UoM (MIN, HR, DAY) |
| In-Process Checkpoint ID | Inspection Characteristic | Alphanumeric | Yes | Existing inspection characteristic in QM master |
| Target Value | Target Value | Numeric | Yes | Within acceptable range |
| Lower Limit | Lower Specification Limit | Numeric | Yes | < Target Value |
| Upper Limit | Upper Specification Limit | Numeric | Yes | > Target Value |
| Effective Date | Valid From | Date | Yes | Today or future date |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Material Description | Material Description | Confirm Material Number | Material Master MAKT |
| Plant Name | Plant Name | Confirm Plant | Plant Master T001W |
| Work Center Description | Work Center Description | Confirm Work Center | Work Center Master CRHD |
| Recipe Status | Status | Recipe creation | System: "Draft" initially |
| Recipe Version | Version | Any change to Released recipe | System: auto-increment (1, 2, 3...) |
| Created By | Created By | Recipe save | User ID from session |
| Created On | Created On | Recipe save | System date/time |
| Changed By | Changed By | Any recipe modification | User ID from session |
| Changed On | Changed On | Any recipe modification | System date/time |
| Approved By | Approved By | Approval workflow completion | Approver user ID |
| Approved On | Approved On | Approval workflow completion | System date/time |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Recipe ID | Unique SAP-generated Master Recipe identifier | Alphanumeric, format plant-dependent (e.g., 10000001) |
| Recipe Version | Version number of the recipe | Numeric counter: 1, 2, 3... |
| Recipe Status | Current status of recipe version | Code: "Draft", "In Approval", "Released", "Obsolete" |
| Change Document Number | SAP change document number for audit trail | 10-digit numeric |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Base Quantity | 0.001 (minimum valid) | 999999999.999 (system max) | 0 (invalid) | Must be > 0 |
| Standard Duration | 0.01 (minimum valid) | 999999.99 (system max) | 0 (invalid) | Must be > 0 |
| Target Value | Depends on characteristic | Depends on characteristic | Depends on characteristic | Must be within Lower/Upper Limits |
| Lower Limit | -999999999.999 | < Target Value | Valid if characteristic allows | Must be < Target |
| Upper Limit | > Target Value | 999999999.999 | Invalid for most cases | Must be > Target |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Recipe creation (released status) | CRITICAL | MEDIUM | CRITICAL | Core master data for production execution — failure blocks manufacturing |
| Approval workflow enforcement | CRITICAL | MEDIUM | CRITICAL | Regulatory compliance requirement (GMP/GDP) — unapproved recipe = audit finding |
| Recipe versioning | CRITICAL | MEDIUM | CRITICAL | Audit trail integrity — failure = regulatory non-compliance (21 CFR Part 11) |
| Process order validation (released status check) | CRITICAL | LOW | CRITICAL | Prevents production against draft/obsolete recipe — failure = quality deviation |
| In-process control specification capture | HIGH | MEDIUM | HIGH | Quality compliance — missing specs = uncontrolled production |
| Audit trail logging (requestor/approver/date) | HIGH | LOW | HIGH | Regulatory requirement — failure = audit finding |
| Material validation | HIGH | MEDIUM | HIGH | External master data dependency — invalid material = recipe creation failure |
| Work Center validation | HIGH | MEDIUM | HIGH | External master data dependency — invalid work center = recipe operation failure |
| Mandatory field enforcement | HIGH | LOW | HIGH | Data integrity — missing fields = incomplete recipe |
| Numeric boundaries (quantity, duration, ranges) | MEDIUM | MEDIUM | MEDIUM | BVA required — edge values may cause calculation errors |
| Navigation/Access | LOW | LOW | LOW | Cosmetic risk — app availability easily verified |

---

## Integration Risk

None — no linked issues identified (issuelinks array is empty).

However, **implicit integration dependencies exist**:
- Material Master (MM module) — Recipe must reference valid material
- Work Center Master (PP module) — Recipe operations must reference valid work centers
- Quality Management (QM module) — In-process controls reference inspection characteristics
- Workflow Engine (Business Workflow) — Approval workflow execution
- Change Document System — Audit trail logging
- Production Orders (PP-SFC) — Process order creation validates recipe status

**Recommendation:** Add integration test scenarios for Material Master validation, Work Center validation, and QM Inspection Characteristic validation.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-57: Create And Version A Master Recipe For A Pharmaceutical Product With D
Module: PP — Production Planning & Manufacturing (Pharmaceutical)

Happy Path Scenarios:
  HP-01: Create new Master Recipe (draft), define operations, add in-process controls, submit for approval, approve via workflow, verify Released status and audit log — Risk: CRITICAL — ACs: AC-1, AC-2, AC-5, AC-6
  HP-02: Edit a Released recipe, verify new version created automatically, verify prior version preserved, verify new version in Draft status — Risk: CRITICAL — ACs: AC-3, AC-6

Alternative Path Scenarios:
  AP-01: Create recipe with multiple operations (3+ operations in sequence) — Risk: MEDIUM — ACs: AC-1, AC-5
  AP-02: Create recipe with multiple in-process control checkpoints per operation — Risk: MEDIUM — ACs: AC-5

Negative Scenarios:
  NEG-01: Attempt to create Process Order against Draft recipe version — verify system blocks with error — Risk: CRITICAL — ACs: AC-4
  NEG-02: Attempt to create Process Order against Obsolete recipe version — verify system blocks with error — Risk: CRITICAL — ACs: AC-4
  NEG-03: Attempt to release recipe without completing approval workflow — verify status remains Draft/In Approval — Risk: CRITICAL — ACs: AC-2
  NEG-04: Attempt to create recipe with invalid Material Number — verify validation error — Risk: HIGH — ACs: AC-1, AC-5
  NEG-05: Attempt to add operation with invalid Work Center — verify validation error — Risk: HIGH — ACs: AC-5
  NEG-06: Attempt to add in-process control with invalid Inspection Characteristic — verify validation error — Risk: HIGH — ACs: AC-5

Error Scenarios:
  ERR-01: Missing Material Number — verify mandatory field error — Risk: HIGH — ACs: AC-5
  ERR-02: Missing Plant — verify mandatory field error — Risk: HIGH — ACs: AC-5
  ERR-03: Missing Base Quantity — verify mandatory field error — Risk: HIGH — ACs: AC-5
  ERR-04: Missing Operation Number — verify mandatory field error — Risk: HIGH — ACs: AC-5
  ERR-05: Missing Work Center — verify mandatory field error — Risk: HIGH — ACs: AC-5
  ERR-06: Missing In-Process Checkpoint ID — verify mandatory field error — Risk: HIGH — ACs: AC-5
  ERR-07: Missing Target Value — verify mandatory field error — Risk: HIGH — ACs: AC-5
  ERR-08: Missing Lower Limit — verify mandatory field error — Risk: HIGH — ACs: AC-5
  ERR-09: Missing Upper Limit — verify mandatory field error — Risk: HIGH — ACs: AC-5

Edge Cases:
  EDGE-01: Base Quantity = minimum valid value (0.001) — verify recipe creation succeeds — Risk: MEDIUM — ACs: AC-5
  EDGE-02: Base Quantity = maximum valid value (999999999.999) — verify recipe creation succeeds — Risk: MEDIUM — ACs: AC-5
  EDGE-03: Standard Duration = minimum valid value (0.01) — verify operation creation succeeds — Risk: MEDIUM — ACs: AC-5
  EDGE-04: Standard Duration = maximum valid value (999999.99) — verify operation creation succeeds — Risk: MEDIUM — ACs: AC-5
  EDGE-05: Target Value = Lower Limit (boundary case) — verify in-process control validation — Risk: MEDIUM — ACs: AC-5
  EDGE-06: Target Value = Upper Limit (boundary case) — verify in-process control validation — Risk: MEDIUM — ACs: AC-5
  EDGE-07: Lower Limit > Target Value — verify validation error — Risk: MEDIUM — ACs: AC-5
  EDGE-08: Upper Limit < Target Value — verify validation error — Risk: MEDIUM — ACs: AC-5

Integration Scenarios:
  INT-01: Validate Material Master integration — create recipe with material from MM module, verify Material Description auto-populates — Risk: HIGH — Implicit dependency: Material Master (MM)
  INT-02: Validate Work Center Master integration — add operation with work center from PP module, verify Work Center Description auto-populates — Risk: HIGH — Implicit dependency: Work Center Master (PP)
  INT-03: Validate QM Inspection Characteristic integration — add in-process control with inspection characteristic from QM module, verify characteristic details retrieved — Risk: HIGH — Implicit dependency: Quality Management (QM)
  INT-04: Validate Workflow integration — submit recipe for approval, verify workflow triggers, verify approver notification — Risk: HIGH — Implicit dependency: Business Workflow
  INT-05: Validate Change Document integration — edit released recipe, verify Change Document Number generated in audit log — Risk: HIGH — Implicit dependency: Change Document System

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 2 | HP-01 (full create-approve-release flow), HP-02 (versioning flow) |
| AP | 2 | AP-01 (multiple operations), AP-02 (multiple checkpoints) |
| NEG | 6 | NEG-01 (draft recipe in process order), NEG-02 (obsolete recipe in process order), NEG-03 (approval workflow bypass), NEG-04 (invalid material), NEG-05 (invalid work center), NEG-06 (invalid QM characteristic) |
| ERR | 9 | 9 mandatory fields × 1 ERR each (Material, Plant, Base Quantity, Operation, Work Center, Checkpoint ID, Target, Lower Limit, Upper Limit) |
| EDGE | 8 | 4 boundary parameters × 2 boundaries (Base Quantity min/max, Standard Duration min/max, Target Value lower/upper boundary, Limit validation) |
| INT | 5 | Material Master, Work Center Master, QM Inspection Characteristic, Workflow Engine, Change Document System |
| **TOTAL** | **32** | |
