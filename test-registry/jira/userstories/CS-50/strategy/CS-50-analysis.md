# Story Analysis: [CS-50] Create A Process Order For A Validated Master Recipe To Manufacture A

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-50/CS-50.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Production Supervisor |
| Core Action | Create a Process Order for a validated master recipe to manufacture a pharmaceutical batch |
| Business Goal | Ensure production is executed according to the GMP-approved formula and process parameters |
| Business Object | Process Order (pharmaceutical manufacturing) |
| SAP Module | PP — Production Planning (Pharmaceutical/Process Manufacturing) |
| Complexity | Complex (no story points assigned, but involves GMP compliance, batch traceability, quality hold checks, IPC controls) |

### Implicit Business Rules (Domain-Inferred)
- Master recipe must exist in SAP with status "Approved/Released" (regulatory compliance requirement)
- Bill of Material (BOM) must be active and linked to the master recipe
- Routing/operations must be defined in the released recipe
- All component materials must have passing quality status (not on quality hold)
- Batch number generation must follow pharmaceutical numbering conventions (unique, traceable to finished product)
- In-process control (IPC) steps must be defined in the master recipe (GMP requirement)
- Process order must be created for a plant with pharmaceutical manufacturing capabilities
- User must have SAP_PP_PROCESS_ORDER_CREATE authorization or equivalent
- Material master must have batch management active for the finished product

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Create Process Order" Fiori app. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The system only allows selection of a master recipe with an "Approved/Released" status. | VALIDATION_NEGATIVE | HIGH | EP, DT | HP (approved) + NEG (non-approved/draft) | 2 |
| AC-3 | The system automatically pulls the Bill of Material (active ingredients and excipients) and routing/operations from the released recipe. | VALIDATION_POSITIVE | CRITICAL | EP | HP (verify BOM + routing auto-population) | 1 |
| AC-4 | The process order is assigned a unique batch number linked to the finished product batch record. | SUCCESS_CONFIRMATION | CRITICAL | EP | HP (verify batch number generation + linkage) | 1 |
| AC-5 | The system prevents release of the process order if any component material is on quality hold. | VALIDATION_NEGATIVE | CRITICAL | EP, DT | NEG (quality hold detected) + HP (no holds) | 2 |
| AC-6 | The order displays required in-process control (IPC) steps as defined in the master recipe. | VALIDATION_POSITIVE | HIGH | EP | HP (verify IPC steps displayed) | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Master Recipe ID | Master Recipe / Recipe | Alphanumeric | Yes | Existing recipe with "Approved/Released" status |
| Plant | Plant | Alphanumeric (4-char) | Yes | Valid pharmaceutical manufacturing plant |
| Order Quantity | Order Quantity / Target Quantity | Numeric | Yes | > 0, within recipe capacity constraints |
| Production Start Date | Start Date / Scheduled Start | Date | Yes | Current date or future |
| Material Number | Material / Product | Alphanumeric (18-char) | Yes | Valid finished product with batch management active |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Bill of Material (BOM) | BOM / Components | Select Master Recipe | Master Recipe BOM (MAST, STPO) |
| Routing/Operations | Routing / Operations | Select Master Recipe | Master Recipe Routing (PLPO, AFKO) |
| Active Ingredients List | Components (Active) | Select Master Recipe | BOM component type "HALB" or "ROH" with active flag |
| Excipients List | Components (Excipients) | Select Master Recipe | BOM component type "ROH" with excipient flag |
| IPC Steps | In-Process Control / Control Steps | Select Master Recipe | Recipe operations with inspection type |
| Batch Number | Batch | Create Process Order (Order Button) | SAP batch number range (NUMKR) for material |
| Production Version | Production Version | Select Material + Plant | Material master production version (MKAL) |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Process Order Number | Unique SAP-generated process order document number | 10-12 digit numeric (begins with 1 or 2) |
| Batch Number | Unique batch identifier for finished product | Alphanumeric, format per client config (e.g., YYYYMMDD-XXX) |
| Order Status | Initial process order status | "CRTD" (Created) or "REL" (Released, depending on config) |
| Order Type | Process order type | "PP01" or client-configured type for pharmaceutical production |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Order Quantity | Minimum lot size (per recipe) | Maximum lot size (per recipe) | 0 (invalid) | Must be within recipe min/max constraints |
| Production Start Date | Current date | None (future dates allowed) | Past date (may trigger warning) | Cannot be in closed period |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------||
| Process Order creation | CRITICAL | MEDIUM | CRITICAL | Core pharmaceutical production transaction; GMP compliance required |
| Master Recipe validation (Approved/Released status) | CRITICAL | MEDIUM | CRITICAL | Non-approved recipe violates regulatory requirements |
| BOM/Routing auto-population | CRITICAL | LOW | CRITICAL | Incorrect formula = non-compliant batch = product recall risk |
| Batch number generation + linkage | CRITICAL | LOW | CRITICAL | Batch traceability required by FDA/EMA regulations |
| Quality hold check (component materials) | CRITICAL | MEDIUM | CRITICAL | Using on-hold material = non-compliant batch = regulatory violation |
| IPC steps display | HIGH | LOW | HIGH | Missing IPC steps = process deviation = regulatory finding |
| Navigation/Access | LOW | LOW | LOW | Cosmetic risk; easily detected |

---

## Integration Risk

None — no linked issues identified.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-50: Create A Process Order For A Validated Master Recipe To Manufacture A
Module: PP — Production Planning (Pharmaceutical)

Happy Path Scenarios:
  HP-01: Create process order with approved master recipe, verify BOM + routing auto-population, batch number generation, IPC steps display, and order creation success — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-6

Negative Scenarios:
  NEG-01: Attempt to select master recipe with "Draft" status — system must prevent selection or display error — Risk: HIGH — ACs: AC-2
  NEG-02: Attempt to release process order when a component material is on quality hold — system must prevent release and display error — Risk: CRITICAL — ACs: AC-5

Error Scenarios:
  ERR-01: Missing Master Recipe field — Risk: HIGH — ACs: AC-2
  ERR-02: Missing Plant field — Risk: HIGH — ACs: (implicit mandatory field)
  ERR-03: Missing Order Quantity field — Risk: HIGH — ACs: (implicit mandatory field)
  ERR-04: Missing Production Start Date field — Risk: HIGH — ACs: (implicit mandatory field)
  ERR-05: Missing Material Number field — Risk: HIGH — ACs: (implicit mandatory field)

Edge Cases:
  EDGE-01: Order Quantity = minimum lot size (lower boundary per recipe) — Risk: MEDIUM — ACs: AC-3
  EDGE-02: Order Quantity = maximum lot size (upper boundary per recipe) — Risk: MEDIUM — ACs: AC-3
  EDGE-03: Production Start Date = current date (earliest valid date) — Risk: LOW — ACs: (implicit date validation)

Integration Scenarios:
  (None — no linked issues)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 1 | One comprehensive happy path covering all positive ACs (AC-1, AC-2 approved, AC-3, AC-4, AC-6) |
| AP | 0 | None — no alternative valid paths identified (single linear process) |
| NEG | 2 | AC-2 (non-approved recipe) + AC-5 (quality hold) |
| ERR | 5 | 5 mandatory fields (Master Recipe, Plant, Order Quantity, Start Date, Material) × 1 ERR each |
| EDGE | 3 | Order Quantity boundaries (min, max) + Start Date boundary (current date) |
| INT | 0 | None — no linked issues |
| **TOTAL** | **11** | |
