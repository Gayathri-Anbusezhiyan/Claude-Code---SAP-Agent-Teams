# Story Analysis: [CS-32] Move Expired Batches To A Designated Blocked Storage Location Automati

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-32/CS-32.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Warehouse Operator |
| Core Action | Move expired batches to a designated Blocked storage location automatically |
| Business Goal | Prevent accidentally picking expired GMP materials for production or shipment |
| Business Object | Batch / Stock (inventory batch with expiration date) |
| SAP Module | MM — Materials Management (Warehouse Management / Inventory Management / Batch Management) |
| Complexity | Medium (no story points provided, but involves background job + notification + multi-step disposition workflow) |

### Implicit Business Rules (Domain-Inferred)
- Batches must have expiration dates maintained in material master (MCHA-VFDAT field)
- Blocked storage location must be configured in warehouse master data (customizing table)
- GMP-relevant materials require QA disposition approval before removal from blocked status
- System must maintain complete audit trail for regulatory compliance (FDA 21 CFR Part 11, EU GMP Annex 11)
- Background job must run before daily production/shipment cutoff time to prevent expired material usage
- Stock restriction must prevent picking via all channels (manual picking, automated warehouse systems, production orders)
- Notification must include batch number, material, expiration date, quantity, and current location for QA review

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Manage Stock" Fiori app or a scheduled background job for expiration monitoring. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The system runs a daily background check comparing batch expiration dates to the current date. | BUSINESS_RULE | CRITICAL | EP, ST | HP, NEG(job failure), EDGE(same-day) | 3 |
| AC-3 | Batches identified as expired are automatically restricted from unrestricted-use stock. | BUSINESS_RULE | CRITICAL | EP, BVA | HP, EDGE(same-day), EDGE(zero qty) | 3 |
| AC-4 | The system generates a notification to the Warehouse and QA teams listing newly expired batches. | SUCCESS_CONFIRMATION | HIGH | EP | HP, NEG(notification failure) | 2 |
| AC-5 | An authorized user must complete a disposition (destroy, return, rework) before the batch can be removed from blocked status. | MANDATORY_FIELD + BUSINESS_RULE | HIGH | EP, DT | HP, NEG(unauthorized), ERR(missing disposition) | 3 |
| AC-6 | The system maintains a report of all expired batch dispositions for regulatory audit. | SUCCESS_CONFIRMATION | CRITICAL | EP | HP(report verification) | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Batch Number | Batch | Alphanumeric (10 chars) | Yes | Existing batch in SAP (MCHA table) |
| Expiration Date | Expiration Date | Date (YYYYMMDD) | Yes | Must be maintained in batch master (MCHA-VFDAT) |
| Disposition Decision | Disposition Type | Picklist | Yes (for clearance) | Destroy / Return to Vendor / Rework |
| Disposition User | User ID | Alphanumeric | Yes (implicit) | User with QA disposition authorization |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Material Number | Material | Batch selected | Batch master (MCHA-MATNR) |
| Material Description | Material Description | Material number populated | Material master (MAKT-MAKTX) |
| Current Stock Quantity | Stock Quantity | Batch selected | Stock table (MCHB-CLABS unrestricted-use stock) |
| Current Storage Location | Storage Location | Batch selected | Stock table (MCHB-LGORT) |
| Blocked Storage Location | Blocked Storage Loc | Warehouse config lookup | Customizing table (configured per plant) |
| Batch Status | Status | After restriction applied | Stock table (MCHB-CINSM restricted stock) |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Material Document Number | Stock movement document number for batch transfer to blocked location | 10-digit numeric (SAP material document MKPF-MBLNR) |
| Notification ID | SAP notification ID sent to Warehouse and QA teams | Alphanumeric notification number |
| Audit Report Entry | Audit trail record with timestamp, user, batch, disposition decision | JSON or table row in audit report (timestamp, batch, material, qty, disposition, user) |
| Batch Restricted Quantity | Quantity moved from unrestricted to restricted/blocked stock | Numeric with UoM |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Expiration Date | Today (same-day expiry) | Past date (already expired) | N/A (date field) | Critical: same-day expiry must trigger restriction |
| Batch Quantity | Minimum handling unit (e.g., 1 KG) | Maximum stock level per batch | 0 (depleted batch — no stock to move) | Zero quantity batch should not generate transfer doc |
| Background Job Run Time | Daily at configured time (e.g., 00:01) | Before production start (e.g., 06:00) | N/A | Job must complete before first picking activity |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Background job execution | CRITICAL | MEDIUM | CRITICAL | Job failure or delay = expired material available for production/shipment → GMP violation, patient safety risk |
| Batch expiration detection logic | CRITICAL | LOW | CRITICAL | Incorrect date comparison (off-by-one error, timezone issue) = expired material not restricted → regulatory non-compliance |
| Stock restriction (unrestricted → blocked) | CRITICAL | MEDIUM | CRITICAL | Failure to move stock = expired material pickable → contamination risk in pharmaceutical/food production |
| Notification to Warehouse/QA teams | HIGH | MEDIUM | HIGH | Delayed or missing notification = delayed disposition → expired stock accumulates in blocked area |
| Authorization check for disposition | HIGH | LOW | HIGH | Unauthorized disposition = audit failure → regulatory warning letter (FDA 483) |
| Audit report completeness | CRITICAL | LOW | CRITICAL | Missing audit trail = regulatory non-compliance → product recall, FDA warning |
| Disposition workflow completion | HIGH | MEDIUM | HIGH | Incomplete disposition = blocked stock accumulates indefinitely → warehouse space issue |
| App navigation/access | LOW | LOW | LOW | Cosmetic risk — does not impact batch restriction functionality |

---

## Integration Risk

None — no linked issues identified.

This story is self-contained within the MM module. However, implicit integration points exist:
- **QM module**: Quality notifications for disposition approval (if QM is active)
- **WM module**: Warehouse management transfer orders (if WM is active)
- **PP module**: Production order material availability check must respect restricted stock

These are SAP standard integration points, not story-level dependencies. No additional INT scenarios required.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-32: Move Expired Batches To A Designated Blocked Storage Location Automati
Module: MM — Materials Management (Warehouse Management / Inventory Management / Batch Management)

Happy Path Scenarios:
  HP-01: Daily background job detects expired batch and automatically moves to blocked storage location with notification sent — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-6
  HP-02: Authorized QA user completes disposition (Destroy/Return/Rework) and batch cleared from blocked status with audit entry created — Risk: HIGH — ACs: AC-5, AC-6

Negative Scenarios:
  NEG-01: Background job fails to run (schedule error, system down, job variant missing) — expired batches not detected — Risk: CRITICAL — ACs: AC-2
  NEG-02: Notification generation fails (recipient configuration error, email service down) — teams not alerted — Risk: HIGH — ACs: AC-4
  NEG-03: Unauthorized user attempts disposition — system rejects with authorization error — Risk: HIGH — ACs: AC-5

Error Scenarios:
  ERR-01: Missing disposition decision — batch remains blocked indefinitely, no clearance path — Risk: HIGH — ACs: AC-5

Edge Cases:
  EDGE-01: Batch expiring today (same-day boundary) — system must detect and restrict on same day — Risk: CRITICAL — ACs: AC-2, AC-3
  EDGE-02: Batch with zero quantity (already fully consumed before expiration) — no stock to move, no material document generated — Risk: MEDIUM — ACs: AC-3
  EDGE-03: Batch expiration date in past (already expired before job ran) — backlog processing of expired batches — Risk: HIGH — ACs: AC-2, AC-3

Integration Scenarios:
  (None — no linked issues)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 2 | Main flow (job detects + restricts + notifies) + disposition flow (user completes disposition + audit entry) |
| AP | 0 | None — no alternative valid paths (only one way to restrict expired batches) |
| NEG | 3 | Job failure (AC-2) + Notification failure (AC-4) + Unauthorized disposition attempt (AC-5) |
| ERR | 1 | Missing disposition decision (AC-5 mandatory field) |
| EDGE | 3 | Same-day expiry boundary (AC-2/AC-3) + Zero quantity batch (AC-3) + Past expiration date backlog (AC-2/AC-3) |
| INT | 0 | None — no linked issues |
| **TOTAL** | **9** | |
