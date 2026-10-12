# Story Analysis: [CS-36] Place automatic S&D block on recalled batch

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-36/CS-36.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Quality Assurance Manager |
| Core Action | Automatically place a Sales and Distribution block on all stock of a recalled batch |
| Business Goal | Prevent further sales orders or deliveries for the recalled batch until the recall is resolved |
| Business Object | Batch (CHARG), Stock (MCHB), S&D Block, Sales Order, Outbound Delivery |
| SAP Module | MM/QM/SD — Materials Management / Quality Management / Sales & Distribution (cross-module) |
| Complexity | Complex (cross-module integration, master data updates, transaction blocks) |

### Implicit Business Rules (Domain-Inferred)
- Batch must exist in batch master data (table MCH1)
- Batch must have unrestricted stock (stock type 01) across one or more plants/storage locations
- S&D block flag must be set at batch-plant-storage location level (table MCHB field VMCHB)
- Existing Sales Orders in open status (not yet fully delivered) must be checked for blocked batch
- Outbound Deliveries in picking or goods issue preparation stage must be checked for blocked batch
- SAP authorization object Q_CHARG (batch maintenance) required for marking batch as recalled
- System must propagate block status to SD module in real-time (no batch job delay)
- Stakeholder notification mechanism must be configured (workflow, email, or alert inbox)

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can mark a batch as "Recalled" in the batch master record or via a recall transaction. | NAVIGATION | MEDIUM | EP | HP | 1 |
| AC-2 | The system immediately places an S&D block on all unrestricted stock of the recalled batch across all plants and storage locations. | BUSINESS_RULE | CRITICAL | EP, DT | HP + AP (multi-plant) | 2 |
| AC-3 | The system prevents creation of new Sales Orders for the recalled batch. | VALIDATION_NEGATIVE | CRITICAL | EP | NEG | 1 |
| AC-4 | The system prevents release of existing Sales Orders that contain the recalled batch. | BUSINESS_RULE | CRITICAL | EP, ST | NEG + AP (existing SO) | 2 |
| AC-5 | The system prevents picking and goods issue for Outbound Deliveries that contain the recalled batch. | BUSINESS_RULE | CRITICAL | EP, ST | NEG | 1 |
| AC-6 | The system sends a notification to all relevant stakeholders (Sales, Warehouse, Quality) when a batch is recalled and blocked. | SUCCESS_CONFIRMATION | HIGH | EP | HP | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Batch Number | Batch | Alphanumeric (10 chars) | Yes | Existing batch in SAP with unrestricted stock |
| Material Number | Material | Alphanumeric (18 chars) | Yes | Material assigned to batch |
| Plant | Plant | Alphanumeric (4 chars) | Yes | Plant where batch exists |
| Recall Status Flag | Recalled / Block Indicator | Boolean/Checkbox | Yes | Checked = Recalled |
| Reason for Recall | Recall Reason Code | Alphanumeric/Dropdown | No | Quality reason codes |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Material Description | Material Name | Material Number entry | Material master MAKT |
| Plant Name | Plant Name | Plant entry | Plant master T001W |
| Current Stock Quantity | Unrestricted Stock | Batch + Material + Plant entry | Stock table MCHB |
| Storage Locations | Storage Location List | Batch + Plant entry | MCHB (all storage locations for batch) |
| Existing SO Count | Open Sales Orders | Batch recall trigger | VBAP sales order item table |
| Existing Delivery Count | Open Deliveries | Batch recall trigger | LIPS delivery item table |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| S&D Block Flag | Sales and Distribution Block indicator set on batch stock | Boolean (MCHB-VMCHB field) |
| Block Timestamp | Date/time when block was applied | Timestamp (YYYYMMDD HHMMSS) |
| Notification ID | Workflow or alert notification number | Alphanumeric notification number |
| Affected SO List | List of Sales Order numbers blocked due to recall | Array of SO numbers |
| Affected Delivery List | List of Delivery numbers blocked due to recall | Array of delivery numbers |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Stock Quantity | 1 (minimum stock) | System maximum | 0 (no block needed) | Only unrestricted stock is blocked |
| Number of Plants | 1 (single plant) | All plants in system | 0 (batch not found) | Multi-plant scenario is AP |
| Number of Storage Locations | 1 (single storage location) | All storage locations in plant | 0 (batch not found) | Multi-storage location is AP |
| Open SO Count | 0 (no existing SOs) | System maximum | N/A | Zero SOs = no SO block verification needed |
| Open Delivery Count | 0 (no existing deliveries) | System maximum | N/A | Zero deliveries = no delivery block verification needed |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| S&D block application | CRITICAL | MEDIUM | CRITICAL | Failure allows unsafe product shipment — regulatory and safety risk |
| New SO creation block | CRITICAL | MEDIUM | CRITICAL | Core transaction validation — prevents recalled product orders |
| Existing SO release block | CRITICAL | MEDIUM | CRITICAL | State transition validation — prevents processing blocked orders |
| Delivery picking/GI block | CRITICAL | MEDIUM | CRITICAL | Warehouse execution validation — last line of defense before shipment |
| Multi-plant block propagation | CRITICAL | HIGH | CRITICAL | Cross-organizational unit dependency — partial block is dangerous |
| Batch recall transaction | HIGH | LOW | HIGH | Navigation/authorization — user must be able to trigger recall |
| Stakeholder notification | HIGH | MEDIUM | HIGH | Communication critical for cross-team coordination |
| Batch master data lookup | MEDIUM | LOW | MEDIUM | Standard master data validation |

---

## Integration Risk

None — no linked issues identified.

However, this story has **implicit cross-module integration risk**:
- **MM module** (batch master, stock tables MCHB)
- **SD module** (sales order VBAP, delivery LIPS, ATP check)
- **QM module** (quality status, recall reason codes)
- **Workflow/Notification module** (stakeholder alerts)

Recommendation: Treat as high integration complexity even without explicit linked issues.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-36: Place automatic S&D block on recalled batch
Module: MM/QM/SD (cross-module)

Happy Path Scenarios:
  HP-01: Mark batch as recalled via batch master → S&D block applied → verify block flag set — Risk: CRITICAL — ACs: AC-1, AC-2, AC-6
  HP-02: Stakeholder notification sent successfully to all roles — Risk: HIGH — ACs: AC-6

Alternative Path Scenarios:
  AP-01: Batch exists in multiple plants → S&D block applied to all plants — Risk: CRITICAL — ACs: AC-2
  AP-02: Batch exists in multiple storage locations within plant → S&D block applied to all storage locations — Risk: CRITICAL — ACs: AC-2
  AP-03: Existing open Sales Order contains recalled batch → SO release blocked — Risk: CRITICAL — ACs: AC-4
  AP-04: Existing open Delivery contains recalled batch → picking/GI blocked — Risk: CRITICAL — ACs: AC-5

Negative Scenarios:
  NEG-01: Attempt to create new Sales Order with recalled batch → system rejects with error — Risk: CRITICAL — ACs: AC-3
  NEG-02: Attempt to release existing Sales Order with recalled batch → system rejects with error — Risk: CRITICAL — ACs: AC-4
  NEG-03: Attempt to pick/post goods issue for Delivery with recalled batch → system rejects with error — Risk: CRITICAL — ACs: AC-5
  NEG-04: Mark non-existent batch as recalled → system rejects with error — Risk: HIGH — ACs: AC-1

Error Scenarios:
  ERR-01: Missing Batch Number field → system prevents recall trigger — Risk: HIGH — ACs: AC-1
  ERR-02: Missing Material Number field → system prevents recall trigger — Risk: HIGH — ACs: AC-1
  ERR-03: Missing Plant field → system prevents recall trigger — Risk: HIGH — ACs: AC-1

Edge Cases:
  EDGE-01: Batch has zero unrestricted stock → no S&D block needed (informational message) — Risk: MEDIUM — ACs: AC-2
  EDGE-02: Batch already has existing S&D block → system confirms re-application or skips — Risk: MEDIUM — ACs: AC-2
  EDGE-03: Batch has stock in restricted or blocked status only (no unrestricted) → no S&D block applied — Risk: MEDIUM — ACs: AC-2

Integration Scenarios:
  (None explicitly linked, but cross-module validation scenarios listed under AP and NEG)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 2 | 1 for recall + block application + notification, 1 for notification verification |
| AP | 4 | Multi-plant, multi-storage location, existing SO block, existing delivery block |
| NEG | 4 | New SO rejection, existing SO release rejection, delivery picking/GI rejection, invalid batch rejection |
| ERR | 3 | 3 mandatory fields (Batch, Material, Plant) × 1 ERR each |
| EDGE | 3 | Zero stock, existing block, restricted stock only |
| INT | 0 | None (cross-module validated via AP/NEG scenarios) |
| **TOTAL** | **16** | |
