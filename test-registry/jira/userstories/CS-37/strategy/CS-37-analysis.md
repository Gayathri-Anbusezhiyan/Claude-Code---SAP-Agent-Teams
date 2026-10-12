# Story Analysis: [CS-37] Process Return Order for customer complaint about defective pharmaceutical

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-37/CS-37.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Customer Service Representative |
| Core Action | Process a Return Order for a customer complaint about a defective pharmaceutical product |
| Business Goal | Enable investigation of the defective batch and provide customer with credit or replacement |
| Business Object | Return Order, Return Delivery, Quality Notification |
| SAP Module | SD — Sales & Distribution (with QM — Quality Management integration) |
| Complexity | Complex (pharmaceutical compliance, quality integration, batch tracking, multi-document process) |

### Implicit Business Rules (Domain-Inferred)
- Original Sales Order must exist and be completed (cannot create return without reference)
- Original Delivery document must exist and goods issue must have been posted
- Customer master data must exist and be valid
- Returned material must be batch-managed in SAP (CHARG field mandatory)
- Quality Inspection stock type must be configured for the plant/storage location
- Return reason codes must be configured in SAP customizing (return reason catalog)
- Quality notification type must be configured and linked to return process
- Credit memo or replacement order workflow depends on company policy and return reason
- Batch traceability is mandatory for pharmaceutical products (regulatory requirement)
- Quality Assurance authorization required to investigate quality notifications
- Stock posting from unrestricted to quality inspection stock requires goods movement type configuration

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can create a Return Order referencing the original Sales Order and Delivery | NAVIGATION, VALIDATION_POSITIVE | CRITICAL | EP | HP | 1 |
| AC-2 | The system allows the user to specify a reason code for the return (e.g., "Defective Product", "Quality Complaint", "Packaging Damage") | VALIDATION_POSITIVE, MANDATORY_FIELD | HIGH | EP | HP, NEG(invalid code), ERR(missing code) | 3 |
| AC-3 | The system captures the batch number, lot number, and expiration date from the returned product | VALIDATION_POSITIVE, MANDATORY_FIELD | CRITICAL | EP, BVA | HP, NEG(invalid batch), NEG(expired batch), ERR(missing batch) | 4 |
| AC-4 | The system creates a Return Delivery document for goods receipt of the returned product | SUCCESS_CONFIRMATION, BUSINESS_RULE | CRITICAL | EP | HP | 1 |
| AC-5 | The system places the returned batch in a "Quality Inspection" stock type for investigation by Quality Assurance | BUSINESS_RULE, VALIDATION_POSITIVE | CRITICAL | EP | HP, NEG(incorrect stock type) | 2 |
| AC-6 | The system creates a quality notification or complaint record linked to the Return Order for investigation and root cause analysis | INTEGRATION, SUCCESS_CONFIRMATION | CRITICAL | EP | HP, INT(quality notification creation) | 2 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Original Sales Order | Sales Order | Alphanumeric | Yes | Existing sales order in SAP with completed delivery |
| Original Delivery | Delivery | Alphanumeric | Yes | Existing delivery document with goods issue posted |
| Return Reason Code | Return Reason | Dropdown | Yes | Pre-configured return reason codes (e.g., ZDEF, ZQUA, ZPKG) |
| Batch Number | Batch | Alphanumeric | Yes | Valid batch from original delivery |
| Lot Number | Lot Number | Alphanumeric | Yes | Valid lot number associated with batch |
| Expiration Date | Expiration Date | Date | Yes | Must match batch master data |
| Returned Quantity | Return Quantity | Numeric | Yes | Must not exceed original delivery quantity |
| Customer Number | Sold-to Party | Alphanumeric | Yes | Existing customer from original sales order |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Customer Name | Sold-to Party Name | Confirm Customer Number | Customer master KNA1 |
| Material Number | Material | Reference Sales Order | Original SO line item |
| Material Description | Material Description | Populate Material | Material master MARA |
| Original Delivery Date | Delivery Date | Reference Delivery | Delivery document LIKP |
| Ship-to Party | Ship-to Party | Reference Sales Order | Sales order header VBAK |
| Sales Organization | Sales Organization | Reference Sales Order | Sales order header VBAK |
| Distribution Channel | Distribution Channel | Reference Sales Order | Sales order header VBAK |
| Division | Division | Reference Sales Order | Sales order header VBAK |
| Plant | Plant | Reference Delivery | Delivery item LIPS |
| Storage Location | Storage Location | Reference Delivery | Delivery item LIPS |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Return Order Number | Unique SAP-generated Return Order document number | 10-digit numeric |
| Return Delivery Number | Unique SAP-generated Return Delivery document number | 10-digit numeric |
| Quality Notification Number | Unique SAP-generated QM notification number | 12-digit numeric |
| Return Order Status | Status of Return Order | Text: "Open", "In Process", "Completed" |
| Stock Type | Stock type for returned goods | Text: "Quality Inspection" |
| Material Document Number | Goods movement document number | 10-digit numeric |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Returned Quantity | 1 (minimum valid) | Original delivery quantity | 0 (invalid) | Cannot return more than delivered |
| Expiration Date | Must be future or past date matching batch | N/A | N/A (date field) | Expired batches trigger additional validation |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------||
| Return Order creation with SO/Delivery reference | CRITICAL | MEDIUM | CRITICAL | Core reverse logistics transaction; failure blocks customer complaint resolution |
| Return reason code validation | HIGH | LOW | HIGH | Required for root cause analysis and regulatory compliance |
| Batch/lot/expiration capture | CRITICAL | MEDIUM | CRITICAL | Pharmaceutical regulatory requirement; traceability mandate |
| Return Delivery document creation | CRITICAL | MEDIUM | CRITICAL | Required for inventory posting; goods receipt must be recorded |
| Quality Inspection stock placement | CRITICAL | HIGH | CRITICAL | Prevents defective product re-entry to unrestricted stock; patient safety risk |
| Quality notification creation and linking | CRITICAL | MEDIUM | CRITICAL | Required for QA investigation; regulatory compliance; linked document dependency |
| Batch validation against original delivery | HIGH | MEDIUM | HIGH | Prevents fraudulent returns; ensures traceability |
| Quantity boundary validation | MEDIUM | LOW | MEDIUM | Business rule enforcement; prevents over-return |

---

## Integration Risk

None — no linked issues identified in Jira. However, this story has **inherent cross-module integration** with Quality Management (QM) module:
- Return Order (SD) must trigger Quality Notification creation (QM)
- Stock posting must use Quality Inspection stock type (MM integration)
- Batch master data dependency (MM batch management)

**Recommended Integration Scenarios:** INT-01 (Quality Notification creation), INT-02 (Quality Inspection stock posting)

---

## Scenario Inventory

SCENARIO INVENTORY — CS-37: Process Return Order for customer complaint about defective pharmaceutical
Module: SD — Sales & Distribution (with QM integration)

Happy Path Scenarios:
  HP-01: Create Return Order with valid SO/Delivery reference, reason code, batch/lot/expiration, verify Return Delivery created, batch moved to Quality Inspection stock, Quality Notification generated and linked — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6

Alternative Path Scenarios:
  AP-01: Create Return Order with different return reason codes ("Defective Product", "Quality Complaint", "Packaging Damage") — Risk: HIGH — ACs: AC-2

Negative Scenarios:
  NEG-01: Create Return Order with non-existent Sales Order reference — Risk: HIGH — ACs: AC-1
  NEG-02: Create Return Order with non-existent Delivery reference — Risk: HIGH — ACs: AC-1
  NEG-03: Create Return Order with invalid return reason code — Risk: HIGH — ACs: AC-2
  NEG-04: Create Return Order with invalid batch number (not from original delivery) — Risk: CRITICAL — ACs: AC-3
  NEG-05: Create Return Order with expired batch (expiration date in past) — Risk: CRITICAL — ACs: AC-3
  NEG-06: Create Return Order with mismatched lot number (not associated with batch) — Risk: HIGH — ACs: AC-3
  NEG-07: Return Order with quantity exceeding original delivery quantity — Risk: MEDIUM — ACs: (implicit boundary validation)

Error Scenarios:
  ERR-01: Missing Sales Order reference — Risk: HIGH — ACs: AC-1
  ERR-02: Missing Delivery reference — Risk: HIGH — ACs: AC-1
  ERR-03: Missing Return Reason Code — Risk: HIGH — ACs: AC-2
  ERR-04: Missing Batch Number — Risk: CRITICAL — ACs: AC-3
  ERR-05: Missing Lot Number — Risk: CRITICAL — ACs: AC-3
  ERR-06: Missing Expiration Date — Risk: CRITICAL — ACs: AC-3
  ERR-07: Missing Returned Quantity — Risk: HIGH — ACs: (implicit mandatory field)

Edge Cases:
  EDGE-01: Return quantity = 1 (minimum boundary) — Risk: MEDIUM — ACs: (boundary validation)
  EDGE-02: Return quantity = original delivery quantity (maximum boundary) — Risk: MEDIUM — ACs: (boundary validation)
  EDGE-03: Return quantity = 0 (zero boundary - invalid) — Risk: MEDIUM — ACs: (boundary validation)
  EDGE-04: Batch expiration date = today (boundary date) — Risk: MEDIUM — ACs: AC-3

Integration Scenarios:
  INT-01: Verify Quality Notification created and linked to Return Order — Risk: CRITICAL — ACs: AC-6
  INT-02: Verify returned batch moved to Quality Inspection stock type (not unrestricted stock) — Risk: CRITICAL — ACs: AC-5

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 1 | Single comprehensive happy path covering all 6 ACs in one end-to-end flow |
| AP | 1 | Alternative return reason codes (3 values tested in one TC with data-driven approach) |
| NEG | 7 | 7 negative validation scenarios (non-existent references, invalid data, expired batch, quantity over-return) |
| ERR | 7 | 7 mandatory fields (SO, Delivery, Reason, Batch, Lot, Expiration, Quantity) |
| EDGE | 4 | 3 quantity boundaries (min, max, zero) + 1 date boundary (expiration = today) |
| INT | 2 | Quality Notification creation + Quality Inspection stock placement (cross-module) |
| **TOTAL** | **22** | Comprehensive pharmaceutical return compliance coverage with regulatory traceability |
