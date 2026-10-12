# Story Analysis: [CS-35] Create Outbound Delivery with Cold-Chain shipping for biologics

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-35/CS-35.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Warehouse Supervisor |
| Core Action | Create an Outbound Delivery with Cold-Chain shipping conditions for biologics |
| Business Goal | Ensure temperature-sensitive pharmaceutical products are shipped with proper environmental controls and monitoring |
| Business Object | Outbound Delivery (SAP SD document with cold-chain shipping configuration) |
| SAP Module | SD — Sales & Distribution |
| Complexity | Complex (No storyPoints assigned — inferred from multi-criteria validation, specialized shipping requirements, temperature-controlled logistics, warehouse blocking conditions, and documentation requirements) |

### Implicit Business Rules (Domain-Inferred)
- Sales Order must exist and be in "Released" status before Outbound Delivery can be created
- Material master must contain temperature requirement attributes (storage conditions: 2-8°C, -20°C, etc.) configured in material type "Biologics" or similar
- Shipping point must be configured in SAP with cold-chain capability flag
- Carrier master must include cold-chain certification indicator
- Warehouse storage locations must be flagged as temperature-controlled in storage location master data (WM configuration)
- Temperature requirements must be maintained in material master (MARA/MARC tables) and mapped to shipping conditions
- Delivery type for biologics must trigger automatic cold-chain assignment logic
- Temperature documentation must be integrated with shipping label printing (output determination)
- Material must be assigned to a sales order item that has not yet been fully delivered (open quantity > 0)
- User must have authorization for VL01N (Create Outbound Delivery) transaction

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can create an Outbound Delivery from a released Sales Order for a biologics material. | NAVIGATION + VALIDATION_POSITIVE | CRITICAL | EP | HP | 1 |
| AC-2 | The system automatically assigns a "Cold-Chain" shipping condition to the delivery based on the material's temperature requirements (e.g., 2-8°C, -20°C). | BUSINESS_RULE + VALIDATION_POSITIVE | CRITICAL | EP, DT | HP + AP(different temp ranges) | 2 |
| AC-3 | The system requires the user to specify a temperature-controlled shipping method and carrier that is certified for cold-chain transport. | MANDATORY_FIELD + VALIDATION_NEGATIVE | HIGH | EP | HP + NEG(non-certified carrier) + ERR(missing carrier) | 3 |
| AC-4 | The system blocks picking and packing if the warehouse does not have temperature-controlled storage locations available for the material. | ERROR_HANDLING + BUSINESS_RULE | CRITICAL | EP, DT | NEG(no temp-controlled storage) | 1 |
| AC-5 | The system prints or attaches a "Temperature-Sensitive" label and handling instructions to the delivery documentation. | SUCCESS_CONFIRMATION + INTEGRATION | HIGH | EP | HP(verify document output) | 1 |
| AC-6 | The system records the temperature range and duration requirements in the delivery header for carrier visibility. | SUCCESS_CONFIRMATION + BUSINESS_RULE | HIGH | EP | HP(verify header fields populated) | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Sales Order Number | Shipping / Sales Order | Alphanumeric (10 digits) | Yes | Existing Sales Order in "Released" status with biologics material |
| Shipping Method | Shipping Conditions / Route | Code (2-4 chars) | Yes | Temperature-controlled shipping methods only (e.g., "COLD", "FROZ") |
| Carrier | Forwarding Agent / Carrier | Alphanumeric | Yes | Carriers certified for cold-chain transport (must have certification flag in vendor master) |
| Warehouse/Storage Location | Storage Location | Code (4 chars) | Yes (implicit via SO) | Temperature-controlled storage locations only |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Cold-Chain Shipping Condition | Shipping Condition | Material temperature requirements detected | Material Master (MARA-RAUBE or custom Z-field for temp requirements) |
| Temperature Range | Temperature Range (custom field) | Material temperature requirements + Shipping Condition assignment | Material Master temperature configuration (2-8°C, -20°C) |
| Duration Requirements | Temperature Duration (custom field) | Material + Route transit time | Material Master + Route configuration |
| Material Description | Material | Sales Order reference | Sales Order item data |
| Temperature-Sensitive Label Indicator | Output Type (label) | Cold-Chain Shipping Condition assigned | Output determination condition records |
| Handling Instructions | Delivery Instructions | Cold-Chain Shipping Condition + Material type | Material Master + Shipping Condition master |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Outbound Delivery Number | Unique SAP-generated delivery document number | 10-digit numeric (e.g., 80xxxxxxxx) |
| Cold-Chain Flag | Indicator that delivery requires cold-chain handling | Boolean / Checkbox |
| Temperature Label Output | PDF or printed label with "Temperature-Sensitive" marking + handling instructions | Document output (PDF/print spool) |
| Delivery Status | Initial status after creation (e.g., "Not yet picked", "Blocked for picking") | Status code + text |
| Temperature Range in Header | Recorded temperature requirements (e.g., "2-8°C for 48 hours") | Text field in delivery header |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Temperature Range | -80°C (ultra-cold) | +25°C (controlled room temp) | N/A | Material-dependent; must match carrier capability |
| Duration Requirement | 1 hour (minimum transit) | System-configured max (e.g., 7 days) | 0 (invalid) | Depends on material stability profile |
| Delivery Quantity | 1 (minimum per UoM) | Sales Order open quantity | 0 (invalid) | Cannot exceed SO open quantity |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------||
| Outbound Delivery creation from released SO | CRITICAL | MEDIUM | CRITICAL | Core SD transactional operation — failure blocks fulfillment |
| Auto-assignment of Cold-Chain shipping condition | CRITICAL | HIGH | CRITICAL | Incorrect assignment → product damage, regulatory violation, patient safety risk |
| Carrier certification validation | CRITICAL | MEDIUM | CRITICAL | Non-certified carrier → temperature excursion, product loss, compliance breach |
| Temperature-controlled storage location check | CRITICAL | MEDIUM | CRITICAL | Incorrect storage → product degradation before shipping |
| Temperature-Sensitive label printing | HIGH | MEDIUM | HIGH | Missing label → carrier mishandling, regulatory documentation gap |
| Temperature range recording in delivery header | HIGH | LOW | HIGH | Missing data → carrier cannot monitor, audit trail incomplete |
| Shipping method validation | HIGH | MEDIUM | HIGH | Incorrect method → wrong transit conditions |
| Handling instructions attachment | MEDIUM | MEDIUM | MEDIUM | Missing instructions → increased risk of mishandling (but label provides primary warning) |

---

## Integration Risk

None — no linked issues identified. However, this story has implicit integration dependencies:
| Implicit Integration | Type | Integration Risk | Notes |
|-------------|------|-----------------|-------|
| Sales Order to Delivery flow | Upstream dependency | HIGH | Delivery creation depends on SO data (material, quantity, shipping point) — SO must be in correct status |
| Material Master temperature configuration | Master data | CRITICAL | Material temperature attributes must be correctly maintained — incorrect data → wrong shipping condition |
| Warehouse Management (storage location control) | Parallel system | HIGH | Picking block depends on WM storage location configuration — WM system must be integrated |
| Output Management (label printing) | Downstream process | MEDIUM | Label generation depends on output determination and printer configuration — integration with label printing system |
| Carrier Master (certification data) | Master data | HIGH | Carrier certification flag must be maintained — incorrect master data → wrong carrier selection |

---

## Scenario Inventory

SCENARIO INVENTORY — CS-35: Create Outbound Delivery with Cold-Chain shipping for biologics
Module: SD — Sales & Distribution

Happy Path Scenarios:
  HP-01: Create Outbound Delivery from released SO with biologics material (2-8°C), verify Cold-Chain shipping condition auto-assigned, specify certified carrier + temp-controlled method, confirm temperature-sensitive label printed, verify temp range recorded in delivery header — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-5, AC-6
  HP-02: Create Outbound Delivery for biologics with -20°C (frozen) temperature requirement, verify different cold-chain shipping condition assigned based on temperature range — Risk: CRITICAL — ACs: AC-1, AC-2 (alternative temperature range)

Alternative Path Scenarios:
  AP-01: Create Outbound Delivery for biologics with ultra-cold-chain requirement (-80°C), verify specialized shipping condition and carrier selection — Risk: HIGH — ACs: AC-2, AC-3

Negative Scenarios:
  NEG-01: Attempt to create Outbound Delivery with non-certified carrier (no cold-chain certification) — system must reject or warn — Risk: CRITICAL — ACs: AC-3
  NEG-02: Attempt to proceed with delivery when warehouse has no temperature-controlled storage locations available — system must block picking/packing — Risk: CRITICAL — ACs: AC-4
  NEG-03: Attempt to create Outbound Delivery from non-released Sales Order — system must reject — Risk: HIGH — ACs: AC-1
  NEG-04: Attempt to create Outbound Delivery with standard (non-cold-chain) shipping method for biologics material — system must reject or warn — Risk: HIGH — ACs: AC-3

Error Scenarios:
  ERR-01: Missing Shipping Method (temperature-controlled) — system must prompt user or block save — Risk: HIGH — ACs: AC-3
  ERR-02: Missing Carrier specification — system must prompt user or block save — Risk: HIGH — ACs: AC-3
  ERR-03: Missing Sales Order Number — system must reject (cannot create delivery without reference) — Risk: CRITICAL — ACs: AC-1
  ERR-04: Temperature-Sensitive label printing fails (printer error, output determination not configured) — system must warn or log error — Risk: HIGH — ACs: AC-5

Edge Cases:
  EDGE-01: Biologics material with borderline temperature requirement (e.g., 15-25°C) — verify correct shipping condition assignment (ambient vs. controlled) — Risk: MEDIUM — ACs: AC-2
  EDGE-02: Outbound Delivery for minimum quantity (1 unit) of biologics — verify all cold-chain requirements applied — Risk: LOW — ACs: AC-1, AC-2
  EDGE-03: Multiple line items with different temperature requirements in same Sales Order — verify system handles or blocks mixed-temp delivery creation — Risk: HIGH — ACs: AC-1, AC-2

Integration Scenarios:
  (No explicit linked issues, but implicit integration scenarios identified above — include if cross-system testing is in scope)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 2 | 1 standard cold-chain (2-8°C) + 1 frozen (-20°C) to cover AC-2 decision logic |
| AP | 1 | Ultra-cold-chain variant (-80°C) to test extended temperature range handling |
| NEG | 4 | Non-certified carrier + no temp-controlled storage + non-released SO + standard shipping method (all high-risk validation failures) |
| ERR | 4 | Missing Shipping Method + Missing Carrier + Missing SO + Label printing failure (all mandatory or critical fields/outputs) |
| EDGE | 3 | Borderline temp (decision boundary) + minimum quantity + mixed-temp line items (boundary and complex scenario) |
| INT | 0 | No linked issues (implicit integrations documented but not generating separate TCs — covered in HP/NEG scenarios) |
| **TOTAL** | **14** | Comprehensive coverage of cold-chain logistics complexity, regulatory risk, and multi-validation requirements |
