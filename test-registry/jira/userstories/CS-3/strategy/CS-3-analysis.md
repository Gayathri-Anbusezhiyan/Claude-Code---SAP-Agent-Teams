# Story Analysis: [CS-3] View and Modify an Existing Purchase Order

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-3/CS-3.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Procurement Officer or Buyer |
| Core Action | Open an existing Purchase Order to review in read-only mode or modify its fields (e.g. quantity) |
| Business Goal | Single unified workflow for auditing orders and responding to business changes without creating a new PO |
| Business Object | Purchase Order (SAP MM document, begins with 45) |
| SAP Module | MM — Materials Management |
| Complexity | Medium (not estimated — derived from dual-mode workflow: Display + Edit) |

### Implicit Business Rules (Domain-Inferred)

- The Purchase Order must already exist in SAP (identified by a valid 10-digit PO number beginning with 45)
- The user must have the appropriate SAP Fiori role assigned: "Manage Purchase Orders" app access is role-controlled
- Display mode is the default — no authorization object required beyond read access
- Edit mode requires an additional authorization object (e.g. M_BEST_BSA for MM activity 02 = Change)
- A PO that has had a full goods receipt posted against a line item will have quantity/price locked for that line — this is an SAP processing-status business rule, not a user error
- Goods-receipted fields show a system explanation (locked indicator) but the PO can still be opened
- PO number format is strictly numeric (10 digits); non-numeric input is rejected at field level
- Only open POs (status: Open, Partially Delivered) can have fields changed; fully invoiced or closed POs are fully read-only

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the Purchase Order application ("Display" or "Change" mode) from the SAP Fiori launchpad | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | A specific Purchase Order can be retrieved by entering its PO number | VALIDATION_POSITIVE | HIGH | EP | HP + NEG | 2 |
| AC-3 | All PO details — supplier, line items, materials, quantities, prices, delivery dates, current status — are visible when opened | VALIDATION_POSITIVE | HIGH | EP | HP | 1 |
| AC-4 | In display mode, no fields are editable and the order is strictly read-only | BUSINESS_RULE | HIGH | EP | HP + NEG | 2 |
| AC-5 | A user with edit authorization can switch the order from display mode to edit mode | BUSINESS_RULE | HIGH | EP, DT | HP + NEG | 2 |
| AC-6 | In edit mode, relevant fields (such as order quantity) are modifiable | VALIDATION_POSITIVE | HIGH | EP | HP | 1 |
| AC-7 | Changes made to the PO are saved and persisted in the system upon confirmation | SUCCESS_CONFIRMATION | CRITICAL | EP | HP | 1 |
| AC-8 | A success message confirming the PO has been changed is displayed after a successful save | SUCCESS_CONFIRMATION | HIGH | EP | HP | 1 |
| AC-9 | The system displays a clear error message when an invalid or non-existent PO number is entered | VALIDATION_NEGATIVE | HIGH | EP | NEG | 1 |
| AC-10 | Fields that cannot be changed due to processing status (e.g. goods-receipted) are locked, with a relevant explanation | BUSINESS_RULE | HIGH | DT | NEG + ERR | 1 |

---

## Data Parameter Inventory

### Input Parameters

| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| PO Number | Purchase Order | Numeric string | Yes | Existing 10-digit PO, begins with 45 |
| Order Quantity | Order Quantity | Decimal number | Yes (in edit mode) | > 0; must not exceed system limit |

### Auto-populated Parameters

| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Supplier Name | Supplier | PO opened | PO header data (EKKO/LFA1) |
| Material Description | Material Description | PO opened | Material master MARA/MAKT |
| Unit of Measure | UoM | PO opened | Material master / PO item |
| Net Price | Net Price | PO opened | PO item data EKPO |
| Delivery Date | Delivery Date | PO opened | PO item schedule line EKET |
| PO Status | Status | PO opened | SAP document lifecycle status |
| Company Code | Company Code | PO opened | PO header EKKO-BUKRS |
| Purchasing Org | Purchasing Org | PO opened | PO header EKKO-EKORG |

### Output Parameters

| Parameter | Description | Format |
|-----------|-------------|--------|
| Updated PO | The same PO document with changed field value persisted | 10-digit PO number unchanged |
| Success Message | SAP confirmation message after save | "Purchase Order {PO#} has been changed" or equivalent |
| Error Message (invalid PO) | System message for non-existent PO number | "Purchase order {PO#} does not exist" or equivalent |
| Locked Field Indicator | SAP tooltip/message for goods-receipted field | System-generated explanation text |

### Boundary Parameters

| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Order Quantity | 1 (minimum valid) | System-configured maximum (typically 9,999,999) | 0 (invalid — SAP rejects) | Per UoM; partial receipt may further constrain min |
| PO Number length | 1 digit (too short → error) | 10 digits (valid) | N/A | Non-numeric also invalid |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| PO display (read-only verification) | HIGH | LOW | HIGH | Core audit/review workflow; failure blocks procurement visibility |
| PO modification + save | CRITICAL | MEDIUM | CRITICAL | Direct change to legally binding procurement document |
| Display-to-edit mode switch | HIGH | LOW | HIGH | Role/authorization gate; failure blocks all edit capability |
| Read-only enforcement in display mode | HIGH | LOW | HIGH | Data integrity and compliance — unauthorized changes must be prevented |
| Invalid PO number handling | HIGH | LOW | HIGH | User experience and prevention of system errors |
| Locked-field (goods-receipted) handling | HIGH | MEDIUM | HIGH | Complex SAP state-dependent business rule |
| Quantity boundary values | MEDIUM | MEDIUM | MEDIUM | Boundary errors possible but recoverable |
| Navigation/App access | LOW | LOW | LOW | Standard Fiori launchpad access |

---

## Integration Risk

None — no linked issues identified. CS-3 operates entirely within the MM Purchase Order document lifecycle.

---

## Scenario Inventory

```
SCENARIO INVENTORY — CS-3: View and Modify an Existing Purchase Order
Module: MM — Materials Management

Happy Path Scenarios:
  HP-01: Open an existing PO in Display mode and verify all header/item details are visible and read-only
         — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4
  HP-02: Switch an open PO from Display to Edit mode, modify order quantity, save, and verify success message
         — Risk: CRITICAL — ACs: AC-1, AC-2, AC-5, AC-6, AC-7, AC-8

Negative Scenarios:
  NEG-01: Enter an invalid (non-existent) PO number — verify clear error message is displayed
          — Risk: HIGH — ACs: AC-2, AC-9
  NEG-02: Attempt to interact with an editable field while PO is in Display mode — verify field remains read-only
          — Risk: HIGH — ACs: AC-4
  NEG-03: Attempt to switch to Edit mode without edit authorization — verify access is denied
          — Risk: HIGH — ACs: AC-5

Error Scenarios:
  ERR-01: Attempt to modify a goods-receipted (locked) item field in Edit mode — verify field is locked with explanation
          — Risk: HIGH — ACs: AC-10

Edge Cases:
  EDGE-01: Modify quantity to minimum valid value (1) — verify save succeeds
           — Risk: MEDIUM — ACs: AC-6, AC-7
  EDGE-02: Attempt to set quantity to zero — verify system rejection
           — Risk: MEDIUM — ACs: AC-6
  EDGE-03: Enter a PO number in invalid format (non-numeric or too short) — verify error message
           — Risk: MEDIUM — ACs: AC-2, AC-9

Integration Scenarios:
  (None — no linked issues)
```

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 2 | Display mode verification (HP-01) + Edit-mode save workflow (HP-02) |
| AP | 0 | No alternative valid paths beyond HP-01/HP-02 defined in ACs |
| NEG | 3 | Invalid PO number (NEG-01), display-mode edit attempt (NEG-02), unauthorized edit attempt (NEG-03) |
| ERR | 1 | Goods-receipted locked field (ERR-01) |
| EDGE | 3 | Min quantity (EDGE-01), zero quantity (EDGE-02), invalid PO format (EDGE-03) |
| INT | 0 | No linked issues — no integration scenarios |
| **TOTAL** | **9** | |
