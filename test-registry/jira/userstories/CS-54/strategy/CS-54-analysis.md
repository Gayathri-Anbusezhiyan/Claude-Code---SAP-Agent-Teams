# Story Analysis: [CS-54] User Story PP-005

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-54/CS-54.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Production Planner |
| Core Action | Run MRP (Material Requirements Planning) to generate Planned Orders |
| Business Goal | Align raw material procurement and production scheduling with anticipated customer demand |
| Business Object | Planned Order, MRP Run, Stock/Requirements List |
| SAP Module | PP — Production Planning & Control |
| Complexity | Complex (inferred from multi-step MRP execution, capacity planning, and cross-module integration) |

### Implicit Business Rules (Domain-Inferred)
- MRP planning file and planning strategy must be configured for the finished product material master
- Minimum batch size and lot-sizing rules (lot-for-lot, fixed lot size, rounding profiles) must be maintained in material master (MRP 1/2/3 views)
- Plant capacity and work center availability must be maintained in the system for capacity overview calculations
- Raw material master data must include shelf-life specifications (remaining shelf life min/max, expiry date) for shelf-life constraint flagging
- Sales orders, forecasts, and current stock data must exist in the system as inputs to net requirements calculation
- Planned orders can only be converted to process orders if the material has a production version; conversion to purchase requisitions requires procurement type "E" (external procurement)
- MRP run requires MRP controller assignment to materials and authorization for MRP processing transactions

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Stock/Requirements List" or "Schedule MRP Runs" Fiori app. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The system generates planned orders based on net requirements calculated from sales orders, forecasts, and current stock levels. | VALIDATION_POSITIVE | CRITICAL | EP, DT | HP + NEG(insufficient stock data) | 2 |
| AC-3 | The system accounts for minimum batch size and lot-sizing rules defined for the finished product. | BUSINESS_RULE | HIGH | BVA, DT | HP(batch size met) + EDGE(batch size rounding) + NEG(batch size not met) | 3 |
| AC-4 | The planner can convert planned orders into process orders or purchase requisitions directly from the planning result. | VALIDATION_POSITIVE | HIGH | EP, DT | HP(convert to process order) + AP(convert to purchase requisition) | 2 |
| AC-5 | The system flags any planned order affected by a raw material shortage or shelf-life constraint. | ERROR_HANDLING | HIGH | EP | NEG(material shortage) + NEG(shelf-life constraint) | 2 |
| AC-6 | The system displays a capacity overview to help the planner sequence orders against available cleanroom/suite capacity. | VALIDATION_POSITIVE | MEDIUM | EP | HP + AP(multiple orders capacity sequencing) | 2 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Material Number | Material | Alphanumeric | Yes | Existing material in SAP master (finished product) |
| Plant | Plant | Alphanumeric | Yes | Existing plant code (e.g., 1710) |
| MRP Controller | MRP Controller | Alphanumeric | Yes | Valid MRP controller code (e.g., 001) |
| Planning Mode | Planning Mode | Enum | Yes | 1=Net change planning, 2=Regenerative planning, 3=Reorder point planning |
| Processing Key | Processing Key | Enum | No | NETCH (net change in planning period), NEUPL (total planning), NETCH+NEUPL |
| Planning Horizon | Schedule | Date range | No | Future date range for MRP calculation |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Material Description | Material Description | Material Number confirmed | Material master MARA-MAKTX |
| Current Stock Level | Available Stock | Material + Plant confirmed | Stock overview MARD table |
| Net Requirements | Net Requirements | MRP execution | Calculated: Sales orders + forecasts - current stock - scheduled receipts |
| Lot Size | Lot Size | Material confirmed | Material master MRP 1 view (lot-sizing procedure field) |
| Minimum Batch Size | Minimum Lot Size | Material confirmed | Material master MRP 1 view (minimum lot size field) |
| Capacity Load | Capacity Load | Planned orders generated | Work center capacity calculation from routing + order quantity |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Planned Order Number | Unique SAP-generated planned order document number | 10-digit numeric |
| Planned Order Quantity | Quantity to be produced in the planned order | Numeric with UoM |
| Planned Start Date | MRP-calculated start date for the order | Date (YYYY-MM-DD) |
| Planned Finish Date | MRP-calculated finish date for the order | Date (YYYY-MM-DD) |
| Exception Messages | Flags for shortages or constraints | Text code (e.g., "10" = shortage, "15" = shelf-life issue) |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Order Quantity | Minimum lot size from material master | System-configured maximum (typically 999999) | 0 (invalid; MRP will not generate) | Per UoM; subject to rounding per lot-sizing rule |
| Planning Horizon Days | 1 day (minimum future planning period) | 999 days (typical system max) | 0 (invalid) | Affects MRP calculation scope |
| Available Capacity | 0% (full capacity shortage) | 100% (full capacity available) | N/A | Affects capacity overview display |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| MRP planned order generation | CRITICAL | MEDIUM | CRITICAL | Core PP transactional operation; failure blocks production planning |
| Net requirements calculation | CRITICAL | MEDIUM | CRITICAL | Incorrect calculation = wrong procurement/production quantities |
| Batch size and lot-sizing rule enforcement | HIGH | MEDIUM | HIGH | Business rule violation = non-compliant batch production |
| Planned order conversion | HIGH | LOW | HIGH | Downstream operation dependency; impacts procurement and production execution |
| Material shortage flagging | HIGH | LOW | HIGH | Failure to flag = production delays not detected |
| Shelf-life constraint flagging | HIGH | LOW | HIGH | Failure to flag = expired raw material risk |
| Capacity overview display | MEDIUM | LOW | MEDIUM | Informational; planner can manually sequence without it |
| Navigation/Access | LOW | LOW | LOW | Cosmetic risk |

---

## Integration Risk

**None — no linked issues identified.**

However, implicit cross-module dependencies exist:
- **MM (Materials Management):** Material master data, current stock levels, purchase requisition conversion
- **SD (Sales & Distribution):** Sales orders as demand input
- **LE (Logistics Execution):** Forecasts as demand input
- **FI/CO (Finance/Controlling):** Cost center and cost calculation for planned orders

**Recommended INT scenarios:** Verify MRP execution with live sales orders and stock data (cross-module integration test).

---

## Scenario Inventory

SCENARIO INVENTORY — CS-54: User Story PP-005
Module: PP

Happy Path Scenarios:
  HP-01: Run MRP and generate planned orders for finished product based on demand and stock — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-6
  HP-02: Convert planned order to process order — Risk: HIGH — ACs: AC-4

Alternative Path Scenarios:
  AP-01: Convert planned order to purchase requisition (external procurement) — Risk: HIGH — ACs: AC-4
  AP-02: Run MRP with multiple materials and sequence by capacity — Risk: MEDIUM — ACs: AC-6

Negative Scenarios:
  NEG-01: Attempt MRP run with material not configured for MRP planning — Risk: HIGH — ACs: AC-2
  NEG-02: Planned order affected by raw material shortage — Risk: HIGH — ACs: AC-5
  NEG-03: Planned order affected by shelf-life constraint — Risk: HIGH — ACs: AC-5
  NEG-04: Material lot-sizing rule not satisfied (quantity below minimum batch size) — Risk: HIGH — ACs: AC-3

Error Scenarios:
  ERR-01: Missing Material Number field — Risk: HIGH — ACs: AC-1, AC-2
  ERR-02: Missing Plant field — Risk: HIGH — ACs: AC-1, AC-2
  ERR-03: Missing MRP Controller field — Risk: HIGH — ACs: AC-1, AC-2

Edge Cases:
  EDGE-01: Minimum batch size boundary (quantity exactly equals minimum lot size) — Risk: MEDIUM — ACs: AC-3
  EDGE-02: Maximum batch size boundary (quantity triggers rounding to next lot) — Risk: MEDIUM — ACs: AC-3
  EDGE-03: Zero available capacity (100% capacity utilization) — Risk: MEDIUM — ACs: AC-6
  EDGE-04: Planning horizon = 1 day (minimum future period) — Risk: LOW — ACs: AC-2

Integration Scenarios:
  INT-01: Run MRP with live sales orders from SD and current stock from MM — Risk: HIGH — Cross-module: MM, SD

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 2 | Core MRP run + one happy path conversion |
| AP | 2 | Alternative conversion path + capacity sequencing variant |
| NEG | 4 | Material not configured + shortage + shelf-life + batch size violation |
| ERR | 3 | 3 mandatory fields (Material, Plant, MRP Controller) |
| EDGE | 4 | 2 batch size boundaries + capacity boundary + planning horizon boundary |
| INT | 1 | Cross-module integration (MM + SD) |
| **TOTAL** | **16** | |
