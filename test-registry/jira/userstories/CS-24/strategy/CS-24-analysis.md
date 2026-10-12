# Story Analysis: [CS-24] Create A Subcontracting Purchase Order For Outsourced Fill-Finish Manu

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-24/CS-24.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Procurement Officer |
| Core Action | Create a Subcontracting Purchase Order for outsourced fill-finish manufacturing |
| Business Goal | Enable raw materials to be provided to a Contract Manufacturing Organization (CMO) and receive finished product back into inventory |
| Business Object | Subcontracting Purchase Order |
| SAP Module | MM — Materials Management (Subcontracting Procurement) |
| Complexity | Complex (inferred from multiple integration points, inventory tracking, and quality inspection requirements) |

### Implicit Business Rules (Domain-Inferred)
- CMO vendor must exist in vendor master (LFA1) with subcontracting indicator enabled
- Finished material must be maintained with item category "Subcontracting" (L) in purchasing info record
- Components (raw materials) must be defined in the BOM (Bill of Materials) for the finished product
- Purchasing organization must be assigned to the company code and plant where CMO operations occur
- Component stock must be physically issued to vendor before consumption can occur at goods receipt
- Quality inspection type must be configured in material master for finished goods (QM activation required)
- Special stock indicator "O" (stock provided to vendor) must be supported in the plant/storage location
- Vendor must have permission to consume components (configured in purchasing info record)
- Component consumption at goods receipt follows FIFO/standard cost accounting rules
- GR/IR account assignment must support subcontracting cost allocation

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Create Purchase Order" Fiori app with item category "Subcontracting." | NAVIGATION | MEDIUM | EP | HP | 1 |
| AC-2 | The system allows the user to specify the components to be provided to the CMO against the subcontracted finished material. | BUSINESS_RULE | CRITICAL | EP, DT | HP, AP (single component vs multiple components), NEG (invalid component) | 3 |
| AC-3 | The system tracks components issued to the vendor as "Stock provided to vendor" inventory. | VALIDATION_POSITIVE | CRITICAL | EP, ST | HP (verify special stock created), INT (integration with inventory management) | 2 |
| AC-4 | Upon goods receipt of the finished product, the system automatically consumes the corresponding component stock at the CMO. | BUSINESS_RULE | CRITICAL | EP, ST | HP (verify auto-consumption), NEG (insufficient component stock), EDGE (partial GR vs full GR) | 3 |
| AC-5 | The system triggers a quality inspection lot for the received finished goods per standard GMP receipt rules. | INTEGRATION | CRITICAL | EP | HP (verify QM lot created), INT (integration with QM module) | 2 |
| AC-6 | The user can view open component balances at the CMO through the "Stock Overview" app. | VALIDATION_POSITIVE | MEDIUM | EP | HP (verify stock visibility after issue), AP (multiple components) | 2 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Supplier ID (CMO) | Supplier | Alphanumeric | Yes | Existing vendor in SAP master with subcontracting indicator |
| Material (Finished Product) | Material | Alphanumeric | Yes | Existing material with item category "L" (Subcontracting) |
| Plant | Plant | Alphanumeric | Yes | Valid plant code assigned to purchasing org |
| Order Quantity | Order Quantity | Numeric | Yes | Must be > 0, aligned with UoM |
| Delivery Date | Delivery Date | Date | Yes | Future date |
| Item Category | Item Category | Dropdown | Yes | "L" (Subcontracting) |
| Components to Provide | Components (in item details) | List of materials | Yes | Valid component materials from BOM |
| Component Quantity | Component Quantity | Numeric | Yes | Calculated from BOM; editable if needed |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Supplier Name | Supplier Name | Confirm Supplier ID | Vendor master LFA1 |
| Material Description | Material Description | Confirm Material ID | Material master MARA |
| Purchasing Organization | Purchasing Organization | Confirm Supplier ID | Purchasing info record |
| Purchasing Group | Purchasing Group | Confirm Supplier ID | Purchasing info record |
| Company Code | Company Code | Confirm Plant | Plant assignment table |
| Unit of Measure | Order Unit | Confirm Material ID | Material master (base UoM) |
| Component BOM List | Components | Confirm Material + Plant | BOM explosion (STPO/STKO) |
| Net Price | Net Price | Confirm Material + Supplier | Purchasing info record or contract |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| PO Number | Unique SAP-generated Subcontracting PO document number | 10-digit numeric, begins with 45 |
| PO Item Number | Line item number for each material | Sequential (10, 20, 30...) |
| Special Stock Indicator | Stock provided to vendor indicator | "O" (auto-set for subcontracting) |
| Component Stock Document | Material document number for component issue (post-creation) | 10-digit numeric, begins with 49 |
| GR Document Number | Goods receipt document number for finished product | 10-digit numeric, begins with 49 |
| Inspection Lot Number | QM inspection lot number generated at goods receipt | Numeric |
| Component Consumption Document | Material document number for auto-consumed components at GR | 10-digit numeric |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Order Quantity | 1 (minimum valid) | System-configured maximum per UoM | 0 (invalid) | Drives component quantity calculation |
| Component Quantity | Calculated from BOM (base) | Manual override up to system max | 0 (invalid) | Must match BOM ratio or be manually adjusted |
| Delivery Date | Today + 1 day (minimum lead time) | System-configured future date limit | Past date (invalid) | Subcontracting typically has longer lead times |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Subcontracting PO creation | CRITICAL | MEDIUM | CRITICAL | Core procurement transaction for outsourced manufacturing |
| CMO vendor validation | CRITICAL | MEDIUM | CRITICAL | Vendor must have subcontracting capabilities configured |
| Finished material validation | CRITICAL | MEDIUM | CRITICAL | Material must support item category "L" |
| Component BOM explosion | CRITICAL | MEDIUM | CRITICAL | Components must be correctly defined in BOM |
| Special stock creation (O) | CRITICAL | LOW | CRITICAL | Inventory accounting accuracy depends on this |
| Component consumption at GR | CRITICAL | MEDIUM | CRITICAL | Automatic backflushing logic — errors lead to stock discrepancies |
| Quality inspection lot creation | CRITICAL | LOW | CRITICAL | GMP compliance requirement — missing lot = regulatory risk |
| Component stock visibility | HIGH | LOW | MEDIUM | Transparency for procurement and inventory teams |
| Mandatory field enforcement | HIGH | LOW | HIGH | UI enforces — but critical for data integrity |
| Numeric boundaries (quantity) | MEDIUM | MEDIUM | MEDIUM | BVA required for quantity validation |
| Item category selection | HIGH | MEDIUM | HIGH | Wrong category = standard PO, not subcontracting |

---

## Integration Risk

None — no linked issues identified. However, the story has **implicit integration dependencies** with:
- **Inventory Management (MM-IM):** Special stock "O" tracking, component issue (MB1B), goods receipt (MIGO)
- **Quality Management (QM):** Inspection lot creation, GMP receipt rules
- **Bill of Materials (PP-BOM):** BOM explosion for component determination
- **Purchasing Info Records (MM-PUR):** Vendor-material relationships, subcontracting indicator

These are standard SAP module integrations, not explicit Jira-linked issues, but they represent HIGH integration risk due to data flow across modules.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-24: Create A Subcontracting Purchase Order For Outsourced Fill-Finish Manu
Module: MM — Materials Management (Subcontracting Procurement)

Happy Path Scenarios:
  HP-01: Create subcontracting PO with single component, verify PO created, special stock indicator set, component list populated — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-6
  HP-02: Issue components to vendor (MB1B movement type 541), verify "Stock provided to vendor" created — Risk: CRITICAL — ACs: AC-3, AC-6
  HP-03: Post goods receipt for finished product, verify component auto-consumption and inspection lot creation — Risk: CRITICAL — ACs: AC-4, AC-5
  HP-04: View component balances at CMO via Stock Overview app after issue — Risk: MEDIUM — ACs: AC-6

Alternative Path Scenarios:
  AP-01: Create subcontracting PO with multiple components (2+) — Risk: CRITICAL — ACs: AC-2, AC-3, AC-6
  AP-02: Partial goods receipt (quantity < PO quantity), verify partial component consumption — Risk: HIGH — ACs: AC-4

Negative Scenarios:
  NEG-01: Attempt to create PO with vendor that does not have subcontracting indicator enabled — Risk: CRITICAL — ACs: AC-1, AC-2
  NEG-02: Attempt to create PO with material that does not have item category "L" configured — Risk: CRITICAL — ACs: AC-1, AC-2
  NEG-03: Attempt to specify component not in BOM for the finished material — Risk: HIGH — ACs: AC-2
  NEG-04: Attempt goods receipt when insufficient component stock at vendor — Risk: CRITICAL — ACs: AC-4

Error Scenarios:
  ERR-01: Missing Supplier field — Risk: HIGH — ACs: AC-1
  ERR-02: Missing Material field — Risk: HIGH — ACs: AC-1
  ERR-03: Missing Plant field — Risk: HIGH — ACs: AC-1
  ERR-04: Missing Order Quantity field — Risk: HIGH — ACs: AC-1
  ERR-05: Missing Delivery Date field — Risk: HIGH — ACs: AC-1
  ERR-06: Missing Item Category or wrong category (not "L") — Risk: CRITICAL — ACs: AC-1, AC-2

Edge Cases:
  EDGE-01: Minimum order quantity (1 unit) — Risk: MEDIUM — ACs: AC-2, AC-4
  EDGE-02: Zero order quantity — Risk: MEDIUM — ACs: AC-2
  EDGE-03: Maximum order quantity (system limit) — Risk: LOW — ACs: AC-2
  EDGE-04: Delivery date = today (minimum lead time) — Risk: MEDIUM — ACs: AC-1
  EDGE-05: Past delivery date — Risk: MEDIUM — ACs: AC-1
  EDGE-06: Component quantity override to zero (if system allows manual edit) — Risk: HIGH — ACs: AC-2

Integration Scenarios:
  INT-01: Verify integration with MM-IM (special stock creation and component consumption) — Risk: CRITICAL — Implicit integration
  INT-02: Verify integration with QM (inspection lot creation at GR) — Risk: CRITICAL — Implicit integration (AC-5)
  INT-03: Verify integration with BOM (component explosion from STPO/STKO) — Risk: CRITICAL — Implicit integration (AC-2)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 4 | Core subcontracting flow: PO creation, component issue, goods receipt, stock visibility |
| AP | 2 | Multiple components variant, partial goods receipt variant |
| NEG | 4 | Vendor validation, material validation, component validation, insufficient stock at GR |
| ERR | 6 | 6 mandatory fields (Supplier, Material, Plant, Quantity, Delivery Date, Item Category) |
| EDGE | 6 | Quantity boundaries (min, zero, max), date boundaries (today, past), component quantity zero |
| INT | 3 | MM-IM integration, QM integration, BOM integration |
| **TOTAL** | **25** | |
