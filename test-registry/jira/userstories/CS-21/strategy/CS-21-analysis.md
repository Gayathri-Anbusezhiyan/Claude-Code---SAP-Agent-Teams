# Story Analysis: [CS-21] Record A Return Delivery For A Rejected Batch Back To The Vendor

**Analysed:** 2026-08-24
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-21/CS-21.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Warehouse Operator |
| Core Action | Record a Return Delivery for a rejected batch back to the vendor |
| Business Goal | Formally remove non-conforming GMP materials from inventory with full traceability |
| Business Object | Return Delivery (Goods Movement 122) |
| SAP Module | MM — Materials Management |
| Complexity | Complex (based on multi-step process, quality integration, financial integration) |

### Implicit Business Rules (Domain-Inferred)
- The original goods receipt must exist in the system (material document posted)
- The batch must be in Blocked Stock or Quality Inspection Stock (stock type restricted)
- The Purchase Order must still be open or at least reference-able in the system
- The inspection lot must exist and have a rejection decision (quality integration)
- The material must be batch-managed (batch master record exists)
- The vendor account must be active for debit memo processing (financial integration)
- The user must have authorization for movement type 122 (Return Delivery to Vendor)
- The plant must be assigned to the vendor's purchasing organization
- Rejection reason codes must be configured in the customizing table (T157E)

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Post Goods Movement" (Return Delivery) Fiori app. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The user can select the original Purchase Order and the specific rejected batch to be returned. | VALIDATION_POSITIVE | HIGH | EP | HP, NEG(invalid PO), NEG(invalid batch) | 3 |
| AC-3 | The system requires a rejection reason code (e.g., failed specification, damaged packaging, expired) before the return can be posted. | MANDATORY_FIELD | HIGH | EP | ERR(missing reason) | 1 |
| AC-4 | The stock is removed from Blocked/Quality Inspection stock upon posting of the return delivery. | SUCCESS_CONFIRMATION | CRITICAL | EP, ST | HP, AP(Blocked), AP(QI) | 3 |
| AC-5 | The system generates a Return Delivery document that references the original goods receipt and inspection lot. | SUCCESS_CONFIRMATION | CRITICAL | EP | HP(verify refs) | 1 |
| AC-6 | A debit memo request can be triggered from the return delivery for vendor cost recovery. | INTEGRATION | HIGH | EP | HP(trigger debit), AP(skip debit) | 2 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Purchase Order Number | Purchase Order | Alphanumeric (10 digits) | Yes | Existing PO in SAP with goods receipt posted |
| Batch Number | Batch | Alphanumeric | Yes | Existing batch in Blocked or QI stock |
| Material Number | Material | Alphanumeric | Yes (auto-filled from PO) | Material from original GR |
| Return Quantity | Quantity | Numeric | Yes | > 0, <= available batch quantity |
| Rejection Reason Code | Reason for Movement | Dropdown | Yes | Configured codes (e.g., 0001=Failed spec, 0002=Damaged, 0003=Expired) |
| Plant | Plant | Alphanumeric (4 digits) | Yes | Plant from original GR |
| Storage Location | Storage Location | Alphanumeric (4 chars) | Yes | Storage location from original GR |
| Trigger Debit Memo | Debit Memo Request | Checkbox/Dropdown | No | Yes/No |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Material Description | Material Text | Select Material | Material Master MAKT |
| Vendor ID | Vendor | Select PO | Purchase Order EKKO |
| Vendor Name | Vendor Name | Select PO | Vendor Master LFA1 |
| Base UoM | Unit of Measure | Select Material | Material Master MARA |
| Original GR Document | Material Document | Select PO + Batch | Goods Receipt MKPF/MSEG |
| Inspection Lot Number | Inspection Lot | Select Batch | Quality Management QALS |
| Stock Type | Stock Type | Select Batch | Batch Stock MCHB (from Blocked/QI) |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Material Document Number | Return Delivery document number | 10-digit numeric |
| Material Document Year | Fiscal year of posting | 4-digit year (YYYY) |
| Movement Type | SAP movement type for return delivery | 122 (Return Delivery to Vendor) |
| Posting Date | Date of return delivery posting | YYYY-MM-DD |
| Document Status | Status of the return delivery | Posted/Completed |
| Debit Memo Request Number | Financial document number (if triggered) | 10-digit numeric (optional) |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Return Quantity | 0.001 (minimum positive quantity per UoM precision) | Available batch quantity in Blocked/QI stock | 0 (invalid) | Must be <= quantity in restricted stock |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Return Delivery posting | CRITICAL | MEDIUM | CRITICAL | Core inventory transaction; impacts physical stock and financial reconciliation |
| PO and batch selection | HIGH | MEDIUM | HIGH | Dependency on existing transactional data (GR, inspection lot) |
| Rejection reason enforcement | HIGH | LOW | HIGH | Regulatory/GMP traceability requirement; missing reason = audit failure |
| Stock removal from restricted stock | CRITICAL | MEDIUM | CRITICAL | Incorrect stock type or quantity = inventory accuracy issue |
| Document reference integrity | CRITICAL | LOW | CRITICAL | Traceability to original GR and inspection lot is GMP-critical |
| Debit memo integration | HIGH | MEDIUM | HIGH | Financial integration; failure blocks cost recovery from vendor |
| Boundary validation (quantity) | MEDIUM | MEDIUM | MEDIUM | BVA required; over-return = stock discrepancy |
| Navigation/Access | LOW | LOW | LOW | Cosmetic risk |

---

## Integration Risk

None — no linked issues identified.

(Note: However, this story has implicit integration dependencies with Quality Management (inspection lot) and Financial Accounting (debit memo). These are domain-level integrations, not Jira-linked stories.)

---

## Scenario Inventory

SCENARIO INVENTORY — CS-21: Record A Return Delivery For A Rejected Batch Back To The Vendor
Module: MM — Materials Management

Happy Path Scenarios:
  HP-01: Return rejected batch from Blocked Stock with debit memo trigger — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
  HP-02: Return rejected batch from Quality Inspection Stock without debit memo — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-5

Alternative Path Scenarios:
  AP-01: Return batch from Blocked Stock (stock type 'S') — Risk: CRITICAL — ACs: AC-2, AC-4
  AP-02: Return batch from Quality Inspection Stock (stock type 'X') — Risk: CRITICAL — ACs: AC-2, AC-4
  AP-03: Trigger debit memo request for vendor cost recovery — Risk: HIGH — ACs: AC-6
  AP-04: Skip debit memo request (manual processing later) — Risk: MEDIUM — ACs: AC-6

Negative Scenarios:
  NEG-01: Invalid or non-existent Purchase Order number — Risk: HIGH — ACs: AC-2
  NEG-02: Invalid or non-existent Batch number — Risk: HIGH — ACs: AC-2
  NEG-03: Batch exists but has zero quantity in restricted stock — Risk: HIGH — ACs: AC-2, AC-4
  NEG-04: Batch is in Unrestricted Stock (not Blocked/QI) — Risk: HIGH — ACs: AC-2, AC-4
  NEG-05: Purchase Order exists but has no goods receipt posted — Risk: HIGH — ACs: AC-2

Error Scenarios:
  ERR-01: Missing Rejection Reason Code — Risk: HIGH — ACs: AC-3
  ERR-02: Missing Return Quantity — Risk: HIGH — ACs: (implied mandatory field)
  ERR-03: Missing Purchase Order — Risk: HIGH — ACs: AC-2

Edge Cases:
  EDGE-01: Return quantity = minimum UoM precision (e.g., 0.001 KG) — Risk: MEDIUM — ACs: AC-4
  EDGE-02: Return quantity = exact available batch quantity (full return) — Risk: MEDIUM — ACs: AC-4
  EDGE-03: Return quantity > available batch quantity (over-return attempt) — Risk: HIGH — ACs: AC-4
  EDGE-04: Return quantity = 0 — Risk: MEDIUM — ACs: AC-4

Integration Scenarios:
  (None — no linkedIssues in Jira. However, domain integration with QM and FI exists and is covered in HP-01, HP-02, AP-03.)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 2 | Two primary paths: with and without debit memo trigger |
| AP | 4 | Two stock types (Blocked, QI) + two debit memo options (trigger, skip) |
| NEG | 5 | 5 validation scenarios for PO, batch, stock type, and quantity |
| ERR | 3 | 3 mandatory fields: Rejection Reason, Return Quantity, Purchase Order |
| EDGE | 4 | 4 boundary cases for return quantity (min, max, over-return, zero) |
| INT | 0 | No Jira-linked issues (domain integrations covered in HP/AP) |
| **TOTAL** | **18** | |
