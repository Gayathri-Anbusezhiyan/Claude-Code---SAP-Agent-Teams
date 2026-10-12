# Story Analysis: [CS-51] Perform A Goods Issue (Backflush) Of Raw Material Batches To A Process

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-51/CS-51.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Production Operator |
| Core Action | Perform a Goods Issue (backflush) of raw material batches to a Process Order |
| Business Goal | Automatically record component consumption with full batch traceability to the finished product |
| Business Object | Process Order / Goods Movement / Batch Inventory Record |
| SAP Module | PP — Production Planning and Control |
| Complexity | Complex (estimated 8+ SP) |

### Implicit Business Rules (Domain-Inferred)
- Process Order must be in "Released" or "In Process" status to allow goods issue posting
- Raw materials must be batch-managed and flagged as backflush components in the Bill of Materials (BOM)
- Batch must have sufficient available stock (unrestricted use) in the plant/storage location
- FEFO (First Expired, First Out) strategy requires batches to have a Shelf Life Expiration Date (SLED) maintained
- Batch traceability requires WHERE-USED tracking from raw material batch to finished product batch
- Movement type for backflush goods issue is typically 261 (consumption from process order)
- Goods movement updates inventory tables (MSEG, MKPF) and batch tables (MCHA) atomically
- Quality hold status (e.g., quality inspection status "QI blocked") prevents batch consumption
- Substitute batch selection triggers when: primary batch quantity < required component quantity, or batch is unavailable
- Batch genealogy requires linking via AFPO (order item) and OBJK (batch classification) tables

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Confirm Process Order" or "Post Goods Movement" Fiori app. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The system automatically proposes the batch(es) to be consumed based on FEFO logic for backflushed components. | VALIDATION_POSITIVE | CRITICAL | EP, BVA | HP, AP(multiple batches), EDGE(single batch exact quantity) | 3 |
| AC-3 | The system prevents consumption of a batch that is on quality hold or has expired. | VALIDATION_NEGATIVE | CRITICAL | EP | NEG(quality hold), NEG(expired batch) | 2 |
| AC-4 | Consumed batch numbers are automatically recorded against the process order's batch record for genealogy purposes. | SUCCESS_CONFIRMATION | CRITICAL | EP | HP(verify batch linkage) | 1 |
| AC-5 | The system displays a warning if a substitute batch must be selected due to insufficient primary batch quantity. | ERROR_HANDLING | HIGH | EP, BVA | AP(substitute required), EDGE(exact boundary) | 2 |
| AC-6 | The transaction updates inventory in real time upon confirmation. | SUCCESS_CONFIRMATION | CRITICAL | EP | HP(verify inventory reduction) | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Process Order Number | Order | Alphanumeric (12 chars) | Yes | Existing Process Order in Released/In Process status |
| Yield Quantity | Yield | Numeric (decimal) | Yes (for confirmation) | > 0, per UoM |
| Confirmation Date | Posting Date | Date | Yes | Valid SAP posting period, not in future |
| Plant | Plant | Alphanumeric (4 chars) | Yes | Valid plant code from org structure |
| Storage Location | Storage Location | Alphanumeric (4 chars) | No | Valid SLoc for batch-managed material |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Component Material | Material | Load Process Order | BOM explosion from AFPO/RESB |
| Required Quantity | Quantity Required | Load Process Order | RESB (reservation) based on yield |
| Proposed Batch Number(s) | Batch | Load Component + Apply FEFO | MCHA (batch stock) filtered by SLED |
| Batch Quantity Available | Available Quantity | Select Batch | MCHA.CLABS (unrestricted stock) |
| Expiration Date (SLED) | Shelf Life Expiration Date | Select Batch | MCH1.VFDAT |
| Quality Status | Stock Type | Select Batch | MCHA (batch status) |
| Finished Product Batch | Product Batch | Confirm Order | Generated or manually entered |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Material Document Number | Unique SAP-generated goods movement document | 10-digit numeric, year+serial |
| Movement Type | Standard backflush movement | 261 |
| Batch Genealogy Record | WHERE-USED linkage from raw batch to product batch | Stored in batch classification (AUSP/INOB) |
| Updated Inventory Balance | Real-time stock reduction for consumed batches | Per material-batch-plant-SLoc |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Yield Quantity | 0.001 (min per UoM) | Max order planned quantity | 0 (invalid) | Triggers substitute logic if exceeds available batch qty |
| Batch Available Quantity | 0.001 (sufficient) | Unlimited | 0 (triggers substitute) | Must be >= required component qty |
| Days Until Expiration (SLED) | -infinity (expired, invalid) | 0 (expires today) | N/A | Expired = SLED < system date |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Batch backflush proposal (FEFO logic) | CRITICAL | MEDIUM | CRITICAL | Incorrect FEFO = wrong batch consumed = genealogy failure |
| Quality hold validation | CRITICAL | LOW | CRITICAL | Consuming blocked batch = compliance violation |
| Expired batch validation | CRITICAL | LOW | CRITICAL | Consuming expired batch = product quality/compliance risk |
| Batch genealogy linkage | CRITICAL | MEDIUM | CRITICAL | Missing linkage = no traceability in recall scenario |
| Inventory update atomicity | CRITICAL | LOW | CRITICAL | Inconsistent stock = financial/operational misalignment |
| Substitute batch warning | HIGH | MEDIUM | HIGH | Missing warning = operator unaware of deviation |
| Navigation/Access | LOW | LOW | LOW | Standard Fiori navigation |

---

## Integration Risk

None — no linked issues identified.

(However, story inherently integrates with: BOM master data, Batch master data, Process Order creation/release, Inventory management. These are implicit SAP module dependencies, not Jira-linked user stories.)

---

## Scenario Inventory

SCENARIO INVENTORY — CS-51: Perform A Goods Issue (Backflush) Of Raw Material Batches To A Process
Module: PP — Production Planning and Control

Happy Path Scenarios:
  HP-01: Confirm process order with single batch consumption (FEFO-proposed batch has exact quantity) — Risk: CRITICAL — ACs: AC-1, AC-2, AC-4, AC-6
  HP-02: Confirm process order with yield quantity that triggers consumption of primary batch (FEFO logic) — Risk: CRITICAL — ACs: AC-2, AC-4, AC-6

Alternative Path Scenarios:
  AP-01: Confirm process order requiring multiple batches (primary batch insufficient, substitute batch auto-selected with warning) — Risk: HIGH — ACs: AC-2, AC-5, AC-6
  AP-02: Manually override FEFO-proposed batch and select a different valid batch — Risk: MEDIUM — ACs: AC-2, AC-4, AC-6

Negative Scenarios:
  NEG-01: Attempt to consume a batch on quality hold (QI blocked) — Risk: CRITICAL — ACs: AC-3
  NEG-02: Attempt to consume an expired batch (SLED < system date) — Risk: CRITICAL — ACs: AC-3

Error Scenarios:
  ERR-01: Missing Process Order Number field — Risk: HIGH — ACs: (implicit mandatory field)
  ERR-02: Missing Yield Quantity field — Risk: HIGH — ACs: (implicit mandatory field)
  ERR-03: Missing Posting Date field — Risk: HIGH — ACs: (implicit mandatory field)
  ERR-04: Process Order in incorrect status (e.g., "Locked", "Closed") — Risk: HIGH — ACs: (implicit business rule)

Edge Cases:
  EDGE-01: Minimum yield quantity (0.001 per UoM) — Risk: MEDIUM — ACs: AC-2, AC-6
  EDGE-02: Batch available quantity exactly matches required quantity (boundary) — Risk: MEDIUM — ACs: AC-2, AC-5
  EDGE-03: Batch expiration date is today (SLED = system date) — Risk: HIGH — ACs: AC-3
  EDGE-04: Zero available quantity for FEFO-proposed batch (triggers immediate substitute) — Risk: HIGH — ACs: AC-2, AC-5

Integration Scenarios:
  (None — no Jira-linked issues, but implicit SAP module integration with MM, QM)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 2 | One for single-batch exact quantity, one for standard FEFO-proposed batch |
| AP | 2 | Multiple batch consumption + manual batch override |
| NEG | 2 | Quality hold + expired batch (both critical validations) |
| ERR | 4 | 3 mandatory fields + 1 process order status validation |
| EDGE | 4 | Min yield, batch qty boundary, expiration boundary, zero qty substitute |
| INT | 0 | No Jira-linked issues |
| **TOTAL** | **14** | |
