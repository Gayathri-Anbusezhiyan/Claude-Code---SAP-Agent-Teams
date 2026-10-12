# Story Analysis: [CS-63] User Story PP-014

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-63/CS-63.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Production Planner |
| Core Action | Generate Reservation of components against a Planned Order |
| Business Goal | Ensure required raw materials are earmarked and protected from allocation to other production runs |
| Business Object | Reservation (component reservation against Planned Order / Process Order) |
| SAP Module | PP — Production Planning and Control |
| Complexity | Complex (pharmaceutical batch production with component protection logic) |

### Implicit Business Rules (Domain-Inferred)
- Planned Order must exist in the system before conversion to Process Order
- Component materials must be maintained in material master with production-relevant attributes
- Available stock calculations must exclude reserved quantities from ATP (Available-to-Promise) logic
- Reservation documents are linked to specific production orders and have validity dates
- Backflush consumption automatically relieves reservations upon goods issue confirmation
- Plant and Storage Location must be specified for reservation creation
- Material requirements planning (MRP) respects active reservations in net requirements calculation
- Reservation numbers are system-generated and follow SAP document numbering
- Component BOM (Bill of Materials) must exist for the finished product being produced
- Movement types for reservation fulfillment are predefined (e.g., 261 for goods issue to order)

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Stock/Requirements List" Fiori app. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The system automatically creates component reservations when a planned order is converted to a process order. | BUSINESS_RULE | CRITICAL | EP, ST | HP, INT | 2 |
| AC-3 | Reserved quantities are excluded from available stock shown to other planning or sales processes. | BUSINESS_RULE | CRITICAL | EP | HP, INT | 2 |
| AC-4 | The system displays a shortage warning if reserved component quantities exceed current available stock. | VALIDATION_NEGATIVE | HIGH | EP, BVA | NEG, EDGE | 2 |
| AC-5 | The planner can manually adjust reservation quantities or dates prior to process order release. | BUSINESS_RULE | HIGH | EP, BVA | AP, EDGE | 2 |
| AC-6 | The system releases the reservation automatically upon backflush consumption or order cancellation. | BUSINESS_RULE | CRITICAL | EP, ST | HP, AP, INT | 3 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Planned Order Number | Planned Order | Alphanumeric (10 digits) | Yes | Existing planned order in SAP (PP-specific) |
| Material Number | Material | Alphanumeric | Yes | Existing material in material master (MARA) |
| Plant | Plant | Alphanumeric (4 chars) | Yes | Valid plant code in SAP organizational structure |
| Requirement Date | Requirement Date | Date | Yes | Future date within planning horizon |
| Reservation Quantity | Reservation Quantity | Numeric (decimal) | Yes | Greater than 0, less than or equal to planned quantity |
| Storage Location | Storage Location | Alphanumeric (4 chars) | No | Valid storage location for the plant |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Reservation Number | Reservation | Conversion of Planned Order to Process Order | SAP number range (NRIV) |
| Component List | Components | Selection of finished product material | Bill of Materials (BOM) master (STKO/STPO) |
| Base Unit of Measure | Base UoM | Material selection | Material master (MARA-MEINS) |
| Available Stock | Available Quantity | Plant + Material + Storage Location entry | Stock master (MARD) minus existing reservations |
| MRP Controller | MRP Controller | Plant + Material entry | Material master plant data (MARC-DISPO) |
| Production Supervisor | Production Supervisor | Plant entry | Plant parameters or work center data |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Reservation Number | Unique SAP-generated reservation document number | 10-digit numeric |
| Reservation Status | Status indicator (Open, Partially Fulfilled, Completed, Cancelled) | Status code |
| Reserved Quantity | Total quantity reserved for this production order | Numeric with UoM |
| Shortage Indicator | Flag indicating insufficient available stock | Boolean (warning icon or message) |
| Updated Available Stock | Recalculated available stock after reservation | Numeric with UoM |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Reservation Quantity | 0.001 (minimum positive) | Planned quantity from order | 0 (invalid) | Depends on UoM precision |
| Requirement Date | Current date (today) | End of planning horizon (typically 1-2 years) | Past date (invalid) | Business rule enforcement |
| Available Stock | 0 (triggers shortage warning) | Current physical stock | Negative (system-dependent) | Depends on negative stock settings |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Automatic reservation creation on PO→Process Order conversion | CRITICAL | MEDIUM | CRITICAL | Core production planning transaction; failure blocks material allocation |
| Available stock exclusion logic | CRITICAL | MEDIUM | CRITICAL | Incorrect ATP calculation leads to double allocation and production delays |
| Shortage warning display | HIGH | LOW | HIGH | Missing warnings cause production stops; but logic is well-established in SAP |
| Manual reservation adjustment | HIGH | MEDIUM | HIGH | User error risk; incorrect adjustments cause material shortages |
| Automatic reservation release (backflush/cancellation) | CRITICAL | MEDIUM | CRITICAL | Failure locks up inventory indefinitely |
| Navigation to Stock/Requirements List app | LOW | LOW | LOW | UI access issue; cosmetic risk |

---

## Integration Risk

| Linked Issue | Type | Integration Risk | Scenario Needed |
|-------------|------|-----------------|-----------------|
| None | N/A | NONE | No linked issues identified in story JSON |

**Note:** Despite no explicitly linked issues, this feature has **implicit integration dependencies** with:
- **Inventory Management (MM-IM)** — Stock levels and movements
- **Material Master (MM-MAT)** — Material definitions and BOM structures
- **Sales & Distribution (SD)** — ATP checks and availability confirmations
- **Production Execution (PP-SFC)** — Goods issue confirmations and backflushing

**Recommended Integration Test Scenarios:**
- INT-01: Verify reservation prevents allocation to concurrent sales order (PP → SD integration)
- INT-02: Verify backflush goods issue releases reservation (PP → MM integration)
- INT-03: Verify shortage warning reflects real-time stock updates from other modules (cross-module data consistency)

---

## Scenario Inventory

SCENARIO INVENTORY — CS-63: User Story PP-014
Module: PP — Production Planning and Control

**Happy Path Scenarios:**
  HP-01: Access Stock/Requirements List app and view existing reservations — Risk: LOW — ACs: AC-1
  HP-02: Convert Planned Order to Process Order and verify automatic component reservation creation — Risk: CRITICAL — ACs: AC-2, AC-3
  HP-03: Confirm reserved quantities are excluded from available stock in other processes — Risk: CRITICAL — ACs: AC-3
  HP-04: Execute backflush consumption and verify automatic reservation release — Risk: CRITICAL — ACs: AC-6

**Alternative Path Scenarios:**
  AP-01: Manually adjust reservation quantity before process order release — Risk: HIGH — ACs: AC-5
  AP-02: Manually adjust reservation date before process order release — Risk: HIGH — ACs: AC-5
  AP-03: Cancel process order and verify automatic reservation release — Risk: CRITICAL — ACs: AC-6

**Negative Scenarios:**
  NEG-01: Attempt to reserve component quantity exceeding current available stock and verify shortage warning — Risk: HIGH — ACs: AC-4
  NEG-02: Attempt to convert planned order with no BOM and verify error handling — Risk: HIGH — ACs: AC-2
  NEG-03: Attempt to access Stock/Requirements List app without authorization — Risk: MEDIUM — ACs: AC-1

**Error Scenarios:**
  ERR-01: Missing Planned Order Number — Risk: HIGH — ACs: AC-2
  ERR-02: Missing Material Number — Risk: HIGH — ACs: AC-2
  ERR-03: Missing Plant — Risk: HIGH — ACs: AC-2
  ERR-04: Missing Requirement Date — Risk: HIGH — ACs: AC-2
  ERR-05: Missing Reservation Quantity (when manual adjustment attempted) — Risk: HIGH — ACs: AC-5

**Edge Cases:**
  EDGE-01: Reservation quantity at minimum boundary (0.001 or smallest UoM unit) — Risk: MEDIUM — ACs: AC-5
  EDGE-02: Reservation quantity equal to planned quantity (maximum valid boundary) — Risk: MEDIUM — ACs: AC-5
  EDGE-03: Requirement date set to current date (earliest valid date) — Risk: MEDIUM — ACs: AC-5
  EDGE-04: Requirement date set to end of planning horizon (furthest valid date) — Risk: MEDIUM — ACs: AC-5
  EDGE-05: Available stock exactly zero when reservation attempted (boundary for shortage warning) — Risk: HIGH — ACs: AC-4

**Integration Scenarios:**
  INT-01: Verify reservation prevents concurrent allocation to sales order (PP→SD integration) — Risk: HIGH — Integration: Sales Order ATP check
  INT-02: Verify backflush goods issue releases reservation (PP→MM integration) — Risk: CRITICAL — Integration: Goods Movement posting
  INT-03: Verify shortage warning reflects real-time stock updates from warehouse (MM→PP integration) — Risk: HIGH — Integration: Stock update event

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 4 | Core access (1) + reservation creation (1) + stock exclusion (1) + backflush release (1) |
| AP | 3 | Manual quantity adjustment (1) + manual date adjustment (1) + cancellation release (1) |
| NEG | 3 | Shortage warning (1) + missing BOM (1) + authorization failure (1) |
| ERR | 5 | 5 mandatory fields: Planned Order, Material, Plant, Requirement Date, Reservation Quantity |
| EDGE | 5 | Quantity min/max (2) + date min/max (2) + zero stock boundary (1) |
| INT | 3 | Sales order ATP conflict (1) + backflush goods issue (1) + real-time stock sync (1) |
| **TOTAL** | **23** | Comprehensive coverage for CRITICAL risk pharmaceutical production scenario |
