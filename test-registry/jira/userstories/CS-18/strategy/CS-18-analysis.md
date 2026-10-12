# Story Analysis: [CS-18] Receive Materials Into Batch-Managed Stock And Capture The Manufacturi

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-18/CS-18.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Warehouse Operator |
| Core Action | Receive materials into Batch-managed stock and capture manufacturing date, expiration date, and vendor batch number |
| Business Goal | Enable material tracking and issuance according to First-Expiry-First-Out (FEFO) rules |
| Business Object | Goods Receipt with Batch Management Data |
| SAP Module | MM — Materials Management |
| Complexity | High (batch management with date calculations and master data creation) |

### Implicit Business Rules (Domain-Inferred)
- Material must be flagged as batch-managed in the material master (MARC-XCHPF)
- Shelf-life profile must be maintained in material master if auto-calculation is expected (MARA-MHDRZ, MARA-MHDHB)
- Batch number format must comply with the number range configuration for the material
- Purchase Order or Inbound Delivery must exist to post goods receipt against
- Vendor batch number is typically captured but may not be mandatory depending on system configuration
- Manufacturing date cannot be in the future (business logic constraint)
- Expiration date must be after manufacturing date
- System date at posting cannot exceed calculated expiration date
- Batch master record is created in table MCH1 (plant level) and MCHA (storage location level)
- FEFO logic depends on batch classification and expiration date being accurately maintained

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Post Goods Receipt" Fiori app. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | For batch-managed materials, the system requires entry of a batch number, manufacturing date, and expiration date before the goods receipt can be posted. | MANDATORY_FIELD | HIGH | EP | ERR (one per field) | 3 |
| AC-3 | The system automatically calculates the expiration date based on the shelf-life profile maintained in the material master, if not manually overridden. | VALIDATION_POSITIVE | HIGH | EP, BVA | HP (auto-calc) + AP (manual override) | 2 |
| AC-4 | The system creates a new batch master record capturing vendor batch number, manufacturing date, and expiration date. | SUCCESS_CONFIRMATION | CRITICAL | EP | HP (verify batch creation in Display Batch) | 1 |
| AC-5 | The system prevents goods receipt posting if the calculated expiration date has already passed. | VALIDATION_NEGATIVE | CRITICAL | EP, BVA | NEG (past expiration) + EDGE (same day expiration) | 2 |
| AC-6 | The batch classification data is visible in the "Display Batch" app for downstream traceability. | SUCCESS_CONFIRMATION | MEDIUM | EP | HP (verify batch data visibility) | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Material | Material | Alphanumeric | Yes | Existing batch-managed material in SAP master |
| Batch Number | Batch | Alphanumeric | Yes | Unique within material-plant combination, follows number range |
| Manufacturing Date | Production Date / Manufacturing Date | Date | Yes | Past or current date (not future) |
| Expiration Date | Expiration Date / BBD | Date | Conditional | Future date, after manufacturing date (auto-calculated or manual) |
| Vendor Batch Number | Vendor Batch | Alphanumeric | Conditional | Free text, typically captured from delivery note |
| Purchase Order | Purchase Order | Numeric | Yes | Existing PO with batch-managed material |
| PO Item | Item | Numeric | Yes | Valid item number in the PO |
| Quantity | Quantity | Numeric | Yes | Greater than 0, within PO open quantity |
| Storage Location | Storage Location | Alphanumeric | Yes | Valid storage location for the plant |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Expiration Date | Expiration Date / BBD | Confirm Manufacturing Date + Material | Material Master Shelf-Life Profile (MARA-MHDRZ total shelf life in days, MARA-MHDHB minimum remaining shelf life) |
| Material Description | Material Description | Confirm Material | Material Master MAKT |
| Unit of Measure | UoM | Confirm Material | Material Master Base UoM MARA-MEINS |
| Plant | Plant | Confirm Purchase Order | PO line item plant EKPO-WERKS |
| Vendor | Supplier / Vendor | Confirm Purchase Order | PO header vendor EKKO-LIFNR |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Material Document Number | Unique SAP-generated goods receipt document number | 10-digit numeric, year-dependent number range |
| Batch Number | Newly created batch master record ID | Alphanumeric, unique per material-plant |
| Batch Status | Active status of the batch | Unrestricted-use / Quality Inspection / Blocked |
| Posting Date | Date the goods receipt was posted | Date (YYYY-MM-DD) |
| Document Year | Fiscal year of the material document | 4-digit year |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Manufacturing Date | System allows past dates (default 100 years back) | Current date (today) | N/A | Future dates should be rejected by business logic |
| Expiration Date | Manufacturing Date + 1 day (minimum) | Manufacturing Date + shelf life (from material master) | N/A | Past expiration (≤ today) must be rejected per AC-5 |
| Quantity | 0.001 (depends on UoM decimal precision) | PO open quantity (remaining to receive) | 0 (invalid) | Must be positive, cannot exceed PO remaining quantity |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------||
| Batch master creation | CRITICAL | MEDIUM | CRITICAL | Incorrect batch data breaks FEFO logic, regulatory compliance, and traceability |
| Expiration date auto-calculation | HIGH | MEDIUM | HIGH | Calculation errors cause incorrect FEFO sequencing and potential expired material issuance |
| Expiration validation (AC-5) | CRITICAL | LOW | CRITICAL | Posting expired material creates inventory quality and compliance risks |
| Mandatory field enforcement | HIGH | LOW | HIGH | Missing batch data renders goods receipt invalid for batch-managed materials |
| Manufacturing date validation | HIGH | MEDIUM | HIGH | Future dates or invalid dates corrupt batch master data |
| Batch data visibility (AC-6) | MEDIUM | LOW | MEDIUM | Traceability requirement — failure impacts downstream audit and recall processes |
| Navigation/Access (AC-1) | LOW | LOW | LOW | Cosmetic risk — standard Fiori access pattern |

---

## Integration Risk

None — no linked issues identified.

This story operates within the MM module without explicit cross-module dependencies in the Jira data. However, downstream integration with Warehouse Management (WM/EWM) for batch picking and Quality Management (QM) for batch inspection are implicit dependencies not captured in linkedIssues.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-18: Receive Materials Into Batch-Managed Stock And Capture The Manufacturing Date, Expiration Date, And Vendor Batch Number

Module: MM — Materials Management

Happy Path Scenarios:
  HP-01: Post goods receipt for batch-managed material with auto-calculated expiration date — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-6
  HP-02: Post goods receipt for batch-managed material with manually entered expiration date (override auto-calculation) — Risk: HIGH — ACs: AC-1, AC-2, AC-3, AC-4, AC-6

Alternative Path Scenarios:
  AP-01: Post goods receipt with vendor batch number populated — Risk: MEDIUM — ACs: AC-2, AC-4, AC-6
  AP-02: Post goods receipt without vendor batch number (if optional in system config) — Risk: LOW — ACs: AC-2, AC-4, AC-6

Negative Scenarios:
  NEG-01: Attempt to post goods receipt with expiration date already passed (calculated or manual) — Risk: CRITICAL — ACs: AC-5
  NEG-02: Attempt to post goods receipt for non-batch-managed material with batch data entry — Risk: MEDIUM — ACs: AC-2
  NEG-03: Attempt to post goods receipt with manufacturing date in the future — Risk: HIGH — ACs: AC-2, AC-3
  NEG-04: Attempt to post goods receipt with expiration date before manufacturing date — Risk: HIGH — ACs: AC-2, AC-3

Error Scenarios:
  ERR-01: Missing Batch Number field — Risk: HIGH — ACs: AC-2
  ERR-02: Missing Manufacturing Date field — Risk: HIGH — ACs: AC-2
  ERR-03: Missing Expiration Date field (when auto-calculation is not configured) — Risk: HIGH — ACs: AC-2

Edge Cases:
  EDGE-01: Expiration date equals current date (same-day expiration) — Risk: CRITICAL — ACs: AC-5
  EDGE-02: Manufacturing date equals current date (today) — Risk: MEDIUM — ACs: AC-2, AC-3
  EDGE-03: Minimum quantity boundary (0.001 or UoM-specific minimum) — Risk: LOW — ACs: AC-4
  EDGE-04: Maximum shelf life (e.g., 10 years for long-shelf-life materials) — Risk: LOW — ACs: AC-3

Integration Scenarios:
  None — no linked issues in Jira data.

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 2 | AC-3 requires both auto-calculation and manual override paths |
| AP | 2 | Vendor batch number optional/mandatory variants; both valid |
| NEG | 4 | Past expiration (AC-5), non-batch material (AC-2), future mfg date (AC-2/AC-3), expiration before mfg date (AC-2/AC-3) |
| ERR | 3 | Three mandatory fields per AC-2: batch number, manufacturing date, expiration date (when not auto-calculated) |
| EDGE | 4 | Same-day expiration (critical for AC-5), same-day manufacturing, min quantity, max shelf life |
| INT | 0 | None — no linked issues |
| **TOTAL** | **15** | Comprehensive coverage of batch management, date validation, and FEFO enablement |
