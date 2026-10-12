# Story Analysis: [CS-33] User Story SD-001 - FEFO batch determination for pharmaceutical sales orders

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-33/CS-33.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Sales Order Processor |
| Core Action | Automatically determine batches using FEFO (First-Expiry-First-Out) for pharmaceutical sales orders |
| Business Goal | Products with the nearest expiration dates are shipped first |
| Business Object | Sales Order (batch-managed pharmaceutical materials) |
| SAP Module | SD — Sales & Distribution |
| Complexity | Complex (no story points assigned, but advanced batch logic + split orders + shelf-life thresholds) |

### Implicit Business Rules (Domain-Inferred)
- Customer must exist in customer master (KNA1) for Sales Order creation
- Material must be flagged as batch-managed in material master (MARA-XCHPF)
- Material must be configured for the sales organization and distribution channel (MVKE)
- FEFO batch determination strategy must be configured in Customizing (batch search procedure)
- Batch records must exist in SAP (MCHA) with expiration dates maintained
- Minimum remaining shelf-life (SLED) must be configured per material (MARA-MHDHB or MARC-RDPRF)
- Stock availability check must be active for batch-managed materials
- System must have access to batch stock data (MCHB) with unrestricted stock quantities
- ATP (Available-to-Promise) logic must consider batch expiration constraints
- Multi-batch split logic requires Delivery Split configuration in Customizing

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can create a Sales Order for a pharmaceutical material that is batch-managed. | NAVIGATION + VALIDATION_POSITIVE | CRITICAL | EP | HP | 1 |
| AC-2 | The system automatically determines the batch with the nearest expiration date for the order quantity. | BUSINESS_RULE | CRITICAL | EP, BVA | HP + EDGE (multiple batches with different expiration dates) | 2 |
| AC-3 | The system excludes batches that have expired or are within the minimum remaining shelf-life threshold (configurable by material). | VALIDATION_NEGATIVE + BUSINESS_RULE | CRITICAL | EP, BVA | NEG (expired batch) + NEG (insufficient shelf-life) + EDGE (exactly at threshold) | 3 |
| AC-4 | The system splits the order across multiple batches if a single batch does not have sufficient quantity. | BUSINESS_RULE | HIGH | EP, BVA | AP (split order) + EDGE (exact quantity match vs. shortage) | 2 |
| AC-5 | The system displays the selected batch number(s) and expiration date(s) in the Sales Order line items. | SUCCESS_CONFIRMATION | CRITICAL | EP | HP (verification of displayed data) | 1 |
| AC-6 | The system sends a warning if no batch with sufficient remaining shelf-life is available for the order quantity. | ERROR_HANDLING | HIGH | EP | NEG (no valid batch available) | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Customer ID | Sold-To Party | Alphanumeric (10 chars) | Yes | Existing customer in SAP master (KNA1) |
| Material ID | Material | Alphanumeric (18 chars max) | Yes | Existing batch-managed pharmaceutical material in SAP master (MARA, XCHPF=X) |
| Order Quantity | Order Quantity | Numeric | Yes | Greater than 0, respects UoM constraints |
| Sales Organization | Sales Organization | Alphanumeric (4 chars) | Yes | Valid sales org for material (MVKE) |
| Distribution Channel | Distribution Channel | Alphanumeric (2 chars) | Yes | Valid dist. channel for material (MVKE) |
| Division | Division | Alphanumeric (2 chars) | Yes | Valid division for material (MVKE) |
| Requested Delivery Date | Requested Delivery Date | Date | No | Future date recommended for batch allocation |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Customer Name | Sold-To Party Name | Confirm Customer ID | Customer master KNA1 |
| Material Description | Material Description | Confirm Material ID | Material master MAKT |
| Batch Number(s) | Batch | After availability check and FEFO determination | Batch master MCHA (based on expiration date VFDAT) |
| Expiration Date(s) | Batch Expiry Date | After batch determination | Batch master MCHA-VFDAT |
| Available Quantity per Batch | Available Quantity | During batch determination | Stock table MCHB-CLABS (unrestricted stock) |
| Base Unit of Measure | Base UoM | Confirm Material ID | Material master MARA-MEINS |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Sales Order Number | Unique SAP-generated SO document number | 10-digit numeric |
| Batch Number(s) | Selected batch(s) for line item(s) | Alphanumeric (10 chars) |
| Expiration Date(s) | Expiration date of selected batch(s) | Date format (DD.MM.YYYY) |
| Warning Message | System warning when no valid batch available | Text message in application log or popup |
| Item Confirmation | Confirmed quantity per line item (may be split) | Numeric per line item |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Order Quantity | 1 (minimum valid) | Available stock across all valid batches | 0 (invalid) | Must be greater than 0 |
| Minimum Remaining Shelf-Life (SLED) | 0 days (no restriction) | Material-specific configured value | N/A | Configurable per material in MARA-MHDHB or MARC-RDPRF |
| Expiration Date | Current date + SLED threshold | Future date (no hard upper limit) | Past date = expired (excluded) | Batches with expiration date <= (current date + SLED) are excluded |
| Available Batch Quantity | 1 unit (minimum to allocate) | Total unrestricted stock in batch (MCHB-CLABS) | 0 (batch excluded) | If batch qty = 0, batch not allocated |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| SO document creation | CRITICAL | MEDIUM | CRITICAL | Core sales transaction operation |
| FEFO batch determination logic | CRITICAL | HIGH | CRITICAL | Complex algorithm with expiration date sorting + stock checks |
| Batch expiration exclusion | CRITICAL | MEDIUM | CRITICAL | Regulatory compliance risk (shipping expired or near-expiry drugs) |
| Minimum shelf-life threshold enforcement | CRITICAL | MEDIUM | CRITICAL | Regulatory compliance risk (pharmaceutical industry requirement) |
| Multi-batch split logic | HIGH | HIGH | HIGH | Complex allocation logic with multiple batches + order splits |
| Batch display on line items | HIGH | LOW | HIGH | Data integrity risk if batch not correctly recorded |
| Warning message for no valid batch | HIGH | MEDIUM | HIGH | Business process risk (order cannot be fulfilled) |
| Customer validation | HIGH | LOW | HIGH | External master data dependency |
| Material validation (batch-managed) | HIGH | LOW | HIGH | External master data dependency |
| Order quantity boundaries | MEDIUM | MEDIUM | MEDIUM | BVA required for edge cases |
| Navigation/Access | LOW | LOW | LOW | Cosmetic risk |

---

## Integration Risk

None — no linked issues identified.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-33: User Story SD-001 - FEFO batch determination for pharmaceutical sales orders
Module: SD — Sales & Distribution

Happy Path Scenarios:
  HP-01: Create Sales Order for batch-managed pharmaceutical material with single batch (sufficient stock, valid expiration) — Risk: CRITICAL — ACs: AC-1, AC-2, AC-5

Alternative Path Scenarios:
  AP-01: Create Sales Order with multi-batch split (single batch insufficient, multiple batches required) — Risk: HIGH — ACs: AC-1, AC-2, AC-4, AC-5

Negative Scenarios:
  NEG-01: System excludes expired batch (batch expiration date in the past) — Risk: CRITICAL — ACs: AC-3
  NEG-02: System excludes batch within minimum remaining shelf-life threshold — Risk: CRITICAL — ACs: AC-3
  NEG-03: No valid batch available (all batches expired or below threshold) — system displays warning — Risk: HIGH — ACs: AC-3, AC-6

Error Scenarios:
  ERR-01: Missing Customer ID (Sold-To Party) — Risk: HIGH — ACs: AC-1
  ERR-02: Missing Material ID — Risk: HIGH — ACs: AC-1
  ERR-03: Missing Order Quantity — Risk: HIGH — ACs: AC-1
  ERR-04: Missing Sales Organization — Risk: HIGH — ACs: AC-1
  ERR-05: Invalid Customer ID (non-existent) — Risk: HIGH — ACs: AC-1
  ERR-06: Invalid Material ID (non-existent or not batch-managed) — Risk: HIGH — ACs: AC-1

Edge Cases:
  EDGE-01: Order quantity exactly matches single batch available quantity (no split) — Risk: MEDIUM — ACs: AC-2, AC-4
  EDGE-02: Order quantity exceeds total available stock across all valid batches — Risk: HIGH — ACs: AC-4, AC-6
  EDGE-03: Batch expiration date exactly at minimum shelf-life threshold boundary (threshold date) — Risk: CRITICAL — ACs: AC-3
  EDGE-04: Minimum order quantity (1 unit) — Risk: MEDIUM — ACs: AC-2
  EDGE-05: Multiple batches with identical expiration dates (FEFO tie-breaker logic) — Risk: MEDIUM — ACs: AC-2

Integration Scenarios:
  (None — no linked issues)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 1 | Single batch with sufficient stock and valid expiration (AC-1, AC-2, AC-5) |
| AP | 1 | Multi-batch split scenario (AC-4) |
| NEG | 3 | Expired batch, insufficient shelf-life, no valid batch available (AC-3, AC-6) |
| ERR | 6 | Missing mandatory fields (3) + invalid master data (2) + non-batch material (1) (AC-1) |
| EDGE | 5 | Exact quantity match, insufficient stock, threshold boundary, min quantity, tie-breaker (AC-2, AC-3, AC-4) |
| INT | 0 | No linked issues |
| **TOTAL** | **16** | |
