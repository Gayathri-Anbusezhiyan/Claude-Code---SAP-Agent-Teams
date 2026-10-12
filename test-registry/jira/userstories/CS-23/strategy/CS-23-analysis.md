# Story Analysis: [CS-23] User Story MM-008

**Analysed:** 2026-08-24
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** test-registry/jira/userstories/CS-23/CS-23.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Material Planner |
| Core Action | Calculate replenishment requirements for GMP materials using MRP while respecting minimum remaining shelf-life rules |
| Business Goal | Ensure newly procured stock always has sufficient shelf life for downstream production use |
| Business Object | MRP Run, Planned Order, Purchase Requisition, Stock/Requirements List, GMP Material with Shelf-Life Management |
| SAP Module | MM — Materials Management (MRP/Planning) |
| Complexity | Complex (GMP shelf-life constraint integration with MRP logic, exception monitoring, batch-aware availability checking) |

### Implicit Business Rules (Domain-Inferred)
- GMP materials must have batch management activated in the material master (XCHPF = X)
- Minimum remaining shelf-life (MHDRZ) must be maintained in the material master for GMP materials
- Total shelf life (MHDHB) must be defined in the material master
- MRP type must be configured for the material (e.g., PD = MRP, ND = Reorder Point Planning)
- Plant must be configured for MRP and have a valid planning calendar
- Purchasing info records or production versions must exist for procurement/production proposals
- Batches nearing minimum shelf-life threshold must have available stock but be flagged as "restricted use"
- System must be configured to perform shelf-life expiration date checks (SLED activation)
- User must have authorization for transaction MD04 (Stock/Requirements List) and MD01/MD02 (MRP Run)

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Stock/Requirements List" or run MRP via "Schedule MRP Runs" Fiori app. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The system considers the minimum remaining shelf-life requirement defined in the material master when proposing new procurement. | BUSINESS_RULE | CRITICAL | EP, DT | HP, NEG | 2 |
| AC-3 | Batches that do not meet the minimum remaining shelf-life are excluded from available stock in the MRP availability check. | BUSINESS_RULE | CRITICAL | EP, BVA | HP, EDGE | 2 |
| AC-4 | The system generates planned orders or purchase requisitions reflecting adjusted lead times where shelf-life constraints apply. | SUCCESS_CONFIRMATION | CRITICAL | EP, DT | HP, AP | 2 |
| AC-5 | The planner can review and convert planning proposals directly from the Stock/Requirements List. | NAVIGATION | MEDIUM | EP | HP | 1 |
| AC-6 | The system issues an exception message when existing stock is approaching the minimum shelf-life threshold. | ERROR_HANDLING | HIGH | EP, BVA | NEG, EDGE | 2 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Material Number | Material | Alphanumeric (18 chars) | Yes | GMP material with batch management and shelf-life maintained |
| Plant | Plant | Alphanumeric (4 chars) | Yes | Valid plant configured for MRP |
| MRP Controller | MRP Controller | Alphanumeric (3 chars) | No | Valid MRP controller code |
| Processing Key | Processing Key | Code | No | NETCH (net change), NETPL (net change in planning period), NEUPL (regenerative) |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Minimum Remaining Shelf Life | Min. Rem. Shelf Life | Material master lookup | MARA-MHDRZ |
| Total Shelf Life | Total Shelf Life | Material master lookup | MARA-MHDHB |
| MRP Type | MRP Type | Material master lookup | MARC-DISMM |
| Lot Size | Lot Size | Material master lookup | MARC-DISLS |
| Procurement Type | Procurement Type | Material master lookup | MARC-BESKZ (E=In-house, F=External) |
| Planned Delivery Time | Planned Deliv. Time | Purchasing info record or material master | MARC-PLIFZ |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Planned Order Number | System-generated planned order for in-house production | 10-digit numeric |
| Purchase Requisition Number | System-generated purchase requisition for external procurement | 10-digit numeric |
| Exception Message Code | MRP exception code when stock nears min shelf-life | 2-char code (e.g., "10" = shelf-life expiration) |
| MRP Element Type | Type of MRP proposal generated | Code: BA (Purchase Requisition), PA (Planned Order) |
| Receipt Date | Proposed date for material receipt | Date (YYYY-MM-DD) |
| Expiration Date | SLED (Shelf Life Expiration Date) of new batch | Date (YYYY-MM-DD) |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Minimum Remaining Shelf Life (days) | 1 day | Total Shelf Life | 0 (invalid — no constraint) | Must be ≤ Total Shelf Life |
| Total Shelf Life (days) | 1 day | 9999 days | 0 (invalid — no shelf-life mgmt) | Defines batch expiration period |
| Existing Stock Remaining Days | 0 days (expired) | Total Shelf Life | N/A | Batch excluded if < Min Remaining Shelf Life |
| Lead Time Adjustment (days) | 0 (no adjustment) | System max | N/A | Added to standard procurement lead time when shelf-life constraint active |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| MRP calculation with shelf-life constraints | CRITICAL | MEDIUM | CRITICAL | Core planning logic — incorrect proposals lead to production stoppages or expired material use (GMP violation) |
| Batch exclusion from availability | CRITICAL | MEDIUM | CRITICAL | Incorrectly including near-expired batches violates GMP rules; excluding valid batches causes false shortages |
| Planned order/PR generation | CRITICAL | LOW | CRITICAL | Incorrect lead times or missing proposals disrupt supply chain |
| Exception message triggering | HIGH | MEDIUM | HIGH | Missing exception warnings lead to unnoticed shelf-life violations |
| Stock/Requirements List access | LOW | LOW | LOW | Navigation issue; does not affect planning logic |
| Conversion of planning proposals | MEDIUM | LOW | MEDIUM | Manual step; failure requires re-run but does not corrupt data |

---

## Integration Risk

None — no linked issues identified.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-23: User Story MM-008
Module: MM — Materials Management (MRP/Planning)

Happy Path Scenarios:
  HP-01: Access Stock/Requirements List for GMP material and run MRP for a plant with GMP materials having min shelf-life constraints, resulting in planned order/PR generation — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-5
  HP-02: Run MRP for GMP material with in-house production (Planned Order generation) — Risk: CRITICAL — ACs: AC-2, AC-4
  HP-03: Run MRP for GMP material with external procurement (Purchase Requisition generation) — Risk: CRITICAL — ACs: AC-2, AC-4

Alternative Path Scenarios:
  AP-01: Review and convert Planned Order to Production Order from Stock/Requirements List — Risk: MEDIUM — ACs: AC-5
  AP-02: Review and convert Purchase Requisition to Purchase Order from Stock/Requirements List — Risk: MEDIUM — ACs: AC-5

Negative Scenarios:
  NEG-01: Run MRP for material without minimum remaining shelf-life configured (MHDRZ = 0) — system should process as standard MRP without shelf-life constraint — Risk: MEDIUM — ACs: AC-2
  NEG-02: Run MRP for GMP material with existing batches all below minimum remaining shelf-life — system should exclude all batches and propose full replenishment — Risk: CRITICAL — ACs: AC-3, AC-4

Error Scenarios:
  (None applicable — MRP does not require manual field entry; execution is system-driven)

Edge Cases:
  EDGE-01: Existing stock batch expiration date exactly equals minimum remaining shelf-life threshold — verify batch is excluded from availability — Risk: CRITICAL — ACs: AC-3
  EDGE-02: Existing stock batch expiration date is 1 day above minimum remaining shelf-life threshold — verify batch is included in availability — Risk: CRITICAL — ACs: AC-3
  EDGE-03: GMP material with total shelf life = minimum remaining shelf-life — verify system proposes procurement with adjusted lead time — Risk: HIGH — ACs: AC-2, AC-4
  EDGE-04: Exception message triggered when batch remaining shelf life reaches minimum threshold exactly — Risk: HIGH — ACs: AC-6
  EDGE-05: Exception message triggered when batch remaining shelf life is 1 day below minimum threshold — Risk: HIGH — ACs: AC-6

Integration Scenarios:
  (None — no linked issues)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 3 | 1 for Stock/Requirements List access + MRP run end-to-end, 1 for Planned Order (in-house), 1 for Purchase Requisition (external procurement) |
| AP | 2 | 1 for Planned Order conversion, 1 for Purchase Requisition conversion |
| NEG | 2 | 1 for material without shelf-life constraint, 1 for all batches below threshold |
| ERR | 0 | No manual input fields — MRP is system-driven |
| EDGE | 5 | 2 for batch inclusion/exclusion boundaries, 1 for total = min shelf-life edge case, 2 for exception message triggering boundaries |
| INT | 0 | No linked issues |
| **TOTAL** | **12** | |
