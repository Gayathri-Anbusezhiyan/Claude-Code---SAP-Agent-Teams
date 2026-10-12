# Story Analysis: [CS-52] Confirm Yield And Scrap Quantities Against A Process Order Operation

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-52/CS-52.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Production Supervisor |
| Core Action | Confirm yield and scrap quantities against a Process Order operation |
| Business Goal | Accurately record and reconcile actual production output and losses against the planned batch size |
| Business Object | Process Order Confirmation (Manufacturing Execution) |
| SAP Module | PP — Production Planning and Execution |
| Complexity | Complex (inferred from multi-step operation confirmations, variance calculations, deviation workflows, and reporting requirements) |

### Implicit Business Rules (Domain-Inferred)
- Process Order must exist in the system and be in a releasable/released status before confirmation
- Process Order operations must have planned quantities defined to calculate yield variance
- User must have PP_CONF authorization object access to confirm production operations
- Yield variance tolerance thresholds must be configured per material type or plant
- Scrap reason codes must exist in the system master data (QMFE table)
- Finished goods batch must exist or be created automatically upon yield confirmation
- Yield + Scrap should not exceed Maximum Order Quantity (business rule validation)
- Deviation record workflow must be configured in the system for out-of-tolerance scenarios
- Production confirmations are time-phased and may require shift/line assignment
- Reporting data aggregation depends on proper material master, work center, and shift calendar configuration

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Confirm Process Order" Fiori app. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The user can enter yield quantity, scrap quantity, and scrap reason code at each relevant operation. | VALIDATION_POSITIVE | HIGH | EP, BVA | HP + AP(multiple operations) + NEG(invalid operation) | 3 |
| AC-3 | The system calculates and displays the yield variance percentage against the planned batch quantity. | BUSINESS_RULE | CRITICAL | EP, BVA | HP + EDGE(variance at tolerance boundary) | 2 |
| AC-4 | A yield variance exceeding a configured tolerance triggers a mandatory deviation record before the order can be technically completed. | BUSINESS_RULE | CRITICAL | DT | HP(within tolerance) + NEG(exceeds tolerance, deviation required) + AP(deviation flow) | 3 |
| AC-5 | The system updates the finished goods batch quantity based on confirmed yield. | SUCCESS_CONFIRMATION | CRITICAL | EP | HP(verify batch update) | 1 |
| AC-6 | A report is available showing yield trends by material, line, and shift for continuous improvement analysis. | NAVIGATION | MEDIUM | EP | HP(report access and data validation) | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Process Order Number | Process Order | Alphanumeric | Yes | Existing process order in SAP (AUFK table, AUTYP='30') |
| Operation Number | Operation | Numeric | Yes | Valid operation number from order routing (AFVC table) |
| Yield Quantity | Yield | Numeric (decimal) | Yes | 0 to Maximum Order Quantity (per UoM) |
| Scrap Quantity | Scrap | Numeric (decimal) | No | 0 to (Max Order Qty - Yield) |
| Scrap Reason Code | Scrap Reason | Alphanumeric | Conditional (mandatory if Scrap > 0) | Valid scrap reason code (QMFE master data) |
| Confirmation Date/Time | Execution Date/Time | DateTime | Yes | Current or past date/time (shift-aligned) |
| Work Center | Work Center | Alphanumeric | Auto/Manual | Valid work center from operation (CRHD table) |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Planned Batch Quantity | Target Quantity | Load Process Order | Process Order header (AFPO-GAMNG) |
| Material Number | Material | Load Process Order | Process Order header (AFPO-MATNR) |
| Material Description | Material Description | Load Material | Material Master (MAKT-MAKTX) |
| UoM | Unit of Measure | Load Material | Material Master (MARA-MEINS) |
| Operation Description | Operation Text | Load Operation | Routing operation (AFVC-LTXA1) |
| Work Center | Work Center | Load Operation | Routing operation (AFVC-ARBPL) |
| Variance Tolerance (%) | Configured Tolerance | Load Material/Plant Config | Customizing table or Material Master |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Yield Variance (%) | Calculated variance percentage: ((Yield - Planned) / Planned) × 100 | Numeric (decimal, 2 decimal places), with +/- sign |
| Deviation Record Number | Unique system-generated deviation document number (if variance exceeds tolerance) | Alphanumeric, system-defined format |
| Updated Batch Quantity | Finished goods batch stock quantity after yield confirmation | Numeric (matches Yield quantity and UoM) |
| Confirmation Number | Unique confirmation document number (CO02/AFRU table) | Numeric, 10-12 digits |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Yield Quantity | 0.001 (minimum valid positive) | Maximum Order Quantity (AFPO-GAMNG) | 0 (valid if full scrap scenario) | Per UoM precision |
| Scrap Quantity | 0 (valid — no scrap) | (Max Order Qty - Yield) | 0 (valid — no scrap) | Scrap + Yield ≤ Max Qty |
| Yield Variance (%) | Tolerance lower bound (e.g., -10%) | Tolerance upper bound (e.g., +10%) | 0% (exact match to planned) | Tolerance is configurable per material/plant |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Process Order confirmation creation | CRITICAL | MEDIUM | CRITICAL | Core production execution operation — failure stops production tracking |
| Yield variance calculation | CRITICAL | MEDIUM | CRITICAL | Incorrect variance blocks completion or allows bad data to proceed |
| Deviation workflow trigger | CRITICAL | MEDIUM | CRITICAL | Tolerance breach without deviation = compliance failure |
| Batch quantity update | CRITICAL | LOW | CRITICAL | Inventory accuracy depends on correct yield posting |
| Scrap reason code validation | HIGH | MEDIUM | HIGH | Invalid scrap codes cause reporting and cost allocation errors |
| Multiple operation confirmations | HIGH | MEDIUM | HIGH | Complex order routings increase data entry error risk |
| Yield + Scrap boundary validation | HIGH | MEDIUM | HIGH | Over-confirmation can create inventory discrepancies |
| Report availability and accuracy | MEDIUM | LOW | MEDIUM | Reporting issues impact CI analysis but not transactional integrity |
| Navigation/Access | LOW | LOW | LOW | Cosmetic risk — easily detected |

---

## Integration Risk

None — no linked issues identified.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-52: Confirm Yield And Scrap Quantities Against A Process Order Operation
Module: PP — Production Planning and Execution

Happy Path Scenarios:
  HP-01: Confirm single operation with yield within tolerance, no scrap — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-5
  HP-02: Confirm yield with scrap and valid scrap reason code within tolerance — Risk: CRITICAL — ACs: AC-2, AC-3, AC-5
  HP-03: Confirm multiple operations in sequence (multi-step order) — Risk: HIGH — ACs: AC-2, AC-3, AC-5

Alternative Path Scenarios:
  AP-01: Yield variance within tolerance (positive variance) — Risk: CRITICAL — ACs: AC-3, AC-4
  AP-02: Yield variance within tolerance (negative variance) — Risk: CRITICAL — ACs: AC-3, AC-4
  AP-03: Yield variance exceeds tolerance, deviation record created, order completed after deviation approval — Risk: CRITICAL — ACs: AC-4

Negative Scenarios:
  NEG-01: Non-existent Process Order number — Risk: HIGH — ACs: AC-2
  NEG-02: Invalid Operation number for the given Process Order — Risk: HIGH — ACs: AC-2
  NEG-03: Invalid Scrap Reason Code — Risk: HIGH — ACs: AC-2
  NEG-04: Yield variance exceeds tolerance, user attempts to complete order without creating deviation record — Risk: CRITICAL — ACs: AC-4

Error Scenarios:
  ERR-01: Missing Process Order field — Risk: HIGH — ACs: AC-2
  ERR-02: Missing Operation Number field — Risk: HIGH — ACs: AC-2
  ERR-03: Missing Yield Quantity field — Risk: HIGH — ACs: AC-2
  ERR-04: Missing Scrap Reason Code when Scrap > 0 — Risk: HIGH — ACs: AC-2

Edge Cases:
  EDGE-01: Yield Quantity = 0 (full scrap scenario) — Risk: MEDIUM — ACs: AC-2, AC-3, AC-5
  EDGE-02: Yield Quantity = Maximum Order Quantity (no scrap, exact plan match) — Risk: MEDIUM — ACs: AC-2, AC-3
  EDGE-03: Yield + Scrap = Maximum Order Quantity — Risk: MEDIUM — ACs: AC-2, AC-3
  EDGE-04: Yield + Scrap > Maximum Order Quantity (over-confirmation) — Risk: HIGH — ACs: AC-2
  EDGE-05: Yield Variance = exact tolerance boundary (lower) — Risk: CRITICAL — ACs: AC-3, AC-4
  EDGE-06: Yield Variance = exact tolerance boundary (upper) — Risk: CRITICAL — ACs: AC-3, AC-4
  EDGE-07: Scrap Quantity = 0 (no scrap) — Risk: LOW — ACs: AC-2

Integration Scenarios:
  (None — no linked issues)

Reporting Scenarios:
  REPORT-01: Access yield trend report and verify data aggregation by material — Risk: MEDIUM — ACs: AC-6
  REPORT-02: Access yield trend report and verify data aggregation by line — Risk: MEDIUM — ACs: AC-6
  REPORT-03: Access yield trend report and verify data aggregation by shift — Risk: MEDIUM — ACs: AC-6

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 3 | Single operation, scrap scenario, multi-operation |
| AP | 3 | Within-tolerance positive variance, negative variance, exceeds-tolerance with deviation flow |
| NEG | 4 | Invalid process order, invalid operation, invalid scrap reason, deviation bypass attempt |
| ERR | 4 | Missing process order, operation, yield, scrap reason (conditional) |
| EDGE | 7 | Zero yield, max yield, yield+scrap=max, yield+scrap>max, variance at tolerance boundaries (2), scrap=0 |
| INT | 0 | None — no linked issues |
| REPORT | 3 | Report access + data validation by material, line, shift |
| **TOTAL** | **24** | |
