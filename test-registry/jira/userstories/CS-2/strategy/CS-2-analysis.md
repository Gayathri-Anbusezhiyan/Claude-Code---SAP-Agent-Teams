# Story Analysis: [CS-2] Create a New Standard Purchase Order in SAP S/4HANA Cloud

**Analysed:** 2026-08-12
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-2/CS-2.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Procurement Officer |
| Core Action | Create a new Standard Purchase Order by specifying supplier, material, quantity, and price |
| Business Goal | Formally initiate a procurement transaction tracked with a unique PO number in the system |
| Business Object | Purchase Order (Standard) |
| SAP Module | MM — Materials Management |
| Complexity | Simple (2 SP) |

### Implicit Business Rules (Domain-Inferred)
- Supplier must exist in vendor master (LFA1) and be maintained with purchasing organization assignment
- Material must exist in material master (MARA) and be configured for procurement in the specified plant
- Purchasing Organization must be assigned to the Company Code
- Plant must be valid for the selected Purchasing Organization
- Price must be greater than zero (SAP does not allow zero-value procurement)
- Quantity must follow the material's unit of measure (UoM) rules
- User must have authorization for transaction code ME21N or Fiori app "Manage Purchase Orders"
- PO creation triggers automatic determination of: Purchasing Group, Company Code, Currency (from supplier master)

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Manage Purchase Orders" application from the SAP Fiori launchpad. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | A new Purchase Order form is available by clicking "Create" on the Manage Purchase Orders page. | NAVIGATION | LOW | EP | HP | 1 |
| AC-3 | The system validates the entered Supplier ID and auto-populates supplier details upon confirmation. | VALIDATION_POSITIVE | HIGH | EP, BVA | HP + NEG(invalid supplier) | 2 |
| AC-4 | The user can add one or more line items to the order by specifying a material, order quantity, and net order price. | BUSINESS_RULE | MEDIUM | EP, BVA | HP(single item) + AP(multiple items) | 2 |
| AC-5 | The system validates the material number and auto-populates material details upon confirmation. | VALIDATION_POSITIVE | HIGH | EP, BVA | HP + NEG(invalid material) | 2 |
| AC-6 | A unique Standard Purchase Order number is generated and displayed upon successful order submission. | SUCCESS_CONFIRMATION | CRITICAL | EP | HP(result verification) | 1 |
| AC-7 | The system prevents submission if any mandatory field (Supplier, Material, Quantity, Price) is missing and clearly indicates which fields need to be filled. | MANDATORY_FIELD | HIGH | EP | ERR(one per field: Supplier, Material, Quantity, Price) | 4 |
| AC-8 | The system displays a descriptive error message if the supplier or material entered does not exist in the system. | VALIDATION_NEGATIVE | HIGH | EP | NEG(non-existent supplier) + NEG(non-existent material) | 2 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Supplier ID | Supplier | Alphanumeric | Yes | Existing vendor in SAP master (LFA1) |
| Material ID | Material | Alphanumeric | Yes | Existing material in SAP master (MARA) for procurement |
| Order Quantity | Order Quantity | Numeric (Decimal) | Yes | > 0, aligned with material UoM |
| Net Order Price | Net Order Price | Numeric (Decimal) | Yes | > 0, per material UoM |
| Plant | Plant | Alphanumeric | Yes | Valid plant for purchasing organization |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Supplier Name | Supplier Name | Confirm Supplier ID | Vendor master LFA1 |
| Purchasing Organization | Purchasing Organization | Confirm Supplier ID | Vendor purchasing data LFM1 |
| Purchasing Group | Purchasing Group | Confirm Supplier ID | Vendor purchasing data LFM1 |
| Company Code | Company Code | Confirm Supplier ID | Purchasing Org assignment |
| Currency | Currency | Confirm Supplier ID | Vendor master currency |
| Material Description | Material | Confirm Material ID | Material master MAKT |
| Unit of Measure | Order Unit | Confirm Material ID | Material master MARA base UoM |
| Material Group | Material Group | Confirm Material ID | Material master MARA |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| PO Number | Unique SAP-generated Purchase Order document number | 10-digit numeric, begins with 45 (standard PO range) |
| PO Status | Document status after submission | "Sent" (if automatic release active) or "In Process" |
| Creation Date | Timestamp of PO creation | YYYY-MM-DD |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Order Quantity | 1 (minimum valid) | System-configured maximum per material | 0 (invalid — rejected) | Per material UoM |
| Net Order Price | 0.01 (minimum valid) | System-configured maximum | 0.00 (invalid — rejected) | Per currency decimal places |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| PO document creation (successful submission) | CRITICAL | MEDIUM | CRITICAL | Core transactional operation — failure blocks procurement process |
| Supplier validation | HIGH | MEDIUM | HIGH | External master data dependency — invalid supplier blocks PO creation |
| Material validation | HIGH | MEDIUM | HIGH | External master data dependency — invalid material blocks line item entry |
| Mandatory field enforcement | HIGH | LOW | HIGH | Data integrity breach risk — missing fields could corrupt PO data |
| Numeric boundaries (quantity, price) | MEDIUM | MEDIUM | MEDIUM | BVA required — zero/negative values are common user errors |
| Auto-population of derived fields | MEDIUM | LOW | MEDIUM | Depends on master data quality — missing data could prevent submission |
| Navigation/UI access | LOW | LOW | LOW | Cosmetic risk — easily detected in smoke testing |
| Multiple line items | MEDIUM | LOW | MEDIUM | Business rule complexity — single item vs. multi-item order |

---

## Integration Risk

| Linked Issue | Type | Integration Risk | Scenario Needed |
|-------------|------|-----------------|-----------------|
| CS-6 | Bug | MEDIUM | INT-01: Verify AC-6 defect — PO number generation vs. display inconsistency |

**Note:** CS-6 is a known defect logged against CS-2, confirming that while PO numbers are generated correctly (backend), they are NOT displayed in the success confirmation message (UI). This is a confirmed AC-6 violation tracked across multiple pipeline runs (2026-05-18, 2026-05-19, 2026-05-21).

---

## Scenario Inventory

**SCENARIO INVENTORY — CS-2: Create a New Standard Purchase Order in SAP S/4HANA Cloud**
Module: MM — Materials Management

### Happy Path Scenarios:
- **HP-01**: Navigate to Manage Purchase Orders, create PO with valid single line item (supplier, material, quantity, price), submit, verify PO number generated — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **HP-02**: Create PO with multiple line items (2+ materials) — Risk: MEDIUM — ACs: AC-4

### Alternative Path Scenarios:
- None identified — no alternative valid flows specified in ACs

### Negative Scenarios:
- **NEG-01**: Enter non-existent Supplier ID, verify descriptive error message displayed — Risk: HIGH — ACs: AC-3, AC-8
- **NEG-02**: Enter non-existent Material Number, verify descriptive error message displayed — Risk: HIGH — ACs: AC-5, AC-8

### Error Scenarios (Mandatory Field Enforcement):
- **ERR-01**: Missing Supplier field — verify submission prevented and field indicated — Risk: HIGH — ACs: AC-7
- **ERR-02**: Missing Material field — verify submission prevented and field indicated — Risk: HIGH — ACs: AC-7
- **ERR-03**: Missing Quantity field (or zero quantity) — verify submission prevented and field indicated — Risk: HIGH — ACs: AC-7
- **ERR-04**: Missing Price field (or zero price) — verify submission prevented and field indicated — Risk: HIGH — ACs: AC-7

### Edge Cases (Boundary Value Analysis):
- **EDGE-01**: Minimum valid quantity (1) — verify PO created successfully — Risk: MEDIUM — ACs: AC-4
- **EDGE-02**: Zero quantity — verify submission rejected with clear error — Risk: MEDIUM — ACs: AC-4, AC-7
- **EDGE-03**: Minimum valid price (0.01 or currency-dependent minimum) — verify PO created successfully — Risk: MEDIUM — ACs: AC-4
- **EDGE-04**: Zero price — verify submission rejected with clear error — Risk: MEDIUM — ACs: AC-4, AC-7

### Integration Scenarios:
- **INT-01**: Verify PO number generation and display behavior — confirm defect CS-6 (PO generated but NOT displayed in success message) — Risk: HIGH — Linked: CS-6

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 2 | HP-01 (single item — covers AC-1 through AC-6) + HP-02 (multiple items — covers AC-4 "one or more") |
| AP | 0 | None — no alternative valid paths in ACs |
| NEG | 2 | NEG-01 (invalid supplier) + NEG-02 (invalid material) — AC-8 requires both |
| ERR | 4 | ERR-01 (missing supplier) + ERR-02 (missing material) + ERR-03 (missing/zero quantity) + ERR-04 (missing/zero price) — AC-7 lists all 4 |
| EDGE | 4 | EDGE-01 (min quantity) + EDGE-02 (zero quantity) + EDGE-03 (min price) + EDGE-04 (zero price) — BVA for both numeric fields |
| INT | 1 | INT-01 (verify AC-6 defect CS-6) — linked bug confirms integration testing need |
| **TOTAL** | **13** | |

---

## Notes

- **Known Defect CS-6**: AC-6 violation confirmed — PO number IS generated (backend) but NOT displayed in success message (UI). This defect has been re-confirmed across 5 pipeline executions (2026-05-18, 2026-05-19, 2026-05-21). INT-01 test case will verify this behavior.
- **Auto-populated fields**: Purchasing Organization, Purchasing Group, Company Code, Currency are typically auto-populated from supplier master data — test cases should verify auto-population but NOT require manual entry unless SAP configuration differs.
- **Plant field**: Often auto-populated but may require manual entry in "Manage Purchase Orders" app based on SAP configuration. Test cases should include Plant as a user-entered input parameter unless exploration confirms auto-population.
