# Story Analysis: [CS-39] Process Free Goods (Sample) order for healthcare provider

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-39/CS-39.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Sales Representative |
| Core Action | Process a Free Goods (Sample) order for a healthcare provider |
| Business Goal | Enable physicians to evaluate pharmaceutical products before prescribing while ensuring compliance with promotional sample regulations |
| Business Object | Sales Order (Free Goods / Promotional Sample type) |
| SAP Module | SD — Sales & Distribution |
| Complexity | Complex (inferred from regulatory compliance, pricing overrides, limit tracking) |

### Implicit Business Rules (Domain-Inferred)
- Customer (healthcare provider) must exist in customer master (KNA1) with appropriate account group
- Healthcare provider must be flagged as eligible for promotional samples in customer master data
- Material must exist in material master (MARA) and be configured for the sales organization and distribution channel
- Material must not be marked as restricted/excluded from promotional sampling (material status or specific control field)
- Free Goods order type must exist in SAP configuration with special pricing procedures that set net value to zero
- Reason codes for free goods must be configured as valid values in SAP (custom Z-field or standard text field with value list)
- Cumulative quantity tracking requires historical order data aggregation (possibly via custom Z-table or info structure)
- Annual sample limit enforcement requires reference to a configured threshold per healthcare provider (customer master extension or separate compliance table)
- Pricing condition type for "Free Goods" (e.g., ZFG0 or similar) must be maintained in the pricing procedure
- Delivery and goods issue processing must be supported for Free Goods orders (no invoice document generated)

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can create a Sales Order with an order type designated for "Free Goods" or "Promotional Samples". | NAVIGATION, BUSINESS_RULE | MEDIUM | EP | HP | 1 |
| AC-2 | The system automatically sets the pricing condition to zero for all line items in the Free Goods order. | VALIDATION_POSITIVE, BUSINESS_RULE | CRITICAL | EP | HP, NEG (verify if manual price entry is blocked) | 2 |
| AC-3 | The system requires the user to specify a reason code for the free goods (e.g., "New Product Launch", "Physician Sample", "Patient Assistance"). | MANDATORY_FIELD, VALIDATION_POSITIVE | HIGH | EP | HP, ERR (missing reason code) | 2 |
| AC-4 | The system validates that the customer is an approved healthcare provider eligible to receive promotional samples. | VALIDATION_NEGATIVE, BUSINESS_RULE | HIGH | EP | HP (approved customer), NEG (non-approved customer) | 2 |
| AC-5 | The system tracks the cumulative quantity of free goods shipped to each healthcare provider for compliance reporting. | BUSINESS_RULE, SUCCESS_CONFIRMATION | MEDIUM | EP | HP (verify tracking data is updated post-delivery) | 1 |
| AC-6 | The system prevents processing of Free Goods orders if the healthcare provider has exceeded the annual sample limit or if the material is restricted from promotional sampling. | VALIDATION_NEGATIVE, BUSINESS_RULE | CRITICAL | EP, BVA | NEG (exceeded limit), NEG (restricted material), EDGE (at limit boundary) | 3 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Order Type | Order Type | Alphanumeric (4 char) | Yes | Specific order type code for Free Goods (e.g., ZFGS, ZSAM) |
| Customer ID | Sold-to Party | Alphanumeric (10 digits) | Yes | Existing healthcare provider customer with eligibility flag |
| Material ID | Material | Alphanumeric (18 char max) | Yes | Existing material not restricted from sampling |
| Quantity | Order Quantity | Numeric | Yes | Positive integer, must not exceed annual sample limit for customer |
| Reason Code | Free Goods Reason / Reason for Sample | Dropdown/Text | Yes | Valid reason code from configured value list (e.g., "New Product Launch", "Physician Sample", "Patient Assistance") |
| Requested Delivery Date | Requested Delivery Date | Date | No | Future date, must align with delivery scheduling |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Customer Name | Sold-to Party Name | Confirm Customer ID | Customer master KNA1 |
| Material Description | Material Description | Confirm Material ID | Material master MARA/MAKT |
| Sales Organization | Sales Organization | User defaults or order type config | User parameter or organization assignment |
| Distribution Channel | Distribution Channel | User defaults or order type config | User parameter or organization assignment |
| Net Price | Net Value / Item Net Price | Material + Order Type confirmation | Pricing procedure (set to 0.00 by condition type for Free Goods) |
| Currency | Currency | Sales organization + Customer | Customer master or sales org currency |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Sales Order Number | Unique SAP-generated Sales Order document number | 10-digit numeric |
| Overall Status | Order processing status | Text (e.g., "Open", "In Process") |
| Cumulative Free Goods Quantity | Updated total quantity of free goods shipped to this customer | Numeric (aggregated across all prior Free Goods orders) |
| Compliance Check Result | Pass/Fail indicator for annual limit validation | Text or status flag |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Order Quantity | 1 (minimum valid) | Annual sample limit minus cumulative quantity already shipped | 0 (invalid — no line item) | Annual limit enforced per customer per material or globally |
| Cumulative Quantity | 0 (new customer) | Annual sample limit (e.g., 10,000 units per year) | N/A | Tracked in compliance reporting table |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Free Goods order creation | CRITICAL | MEDIUM | CRITICAL | Core pharmaceutical compliance transaction; regulatory violations can result in fines |
| Pricing set to zero | CRITICAL | LOW | CRITICAL | If pricing is not zero, company may bill customer incorrectly (regulatory violation) |
| Reason code enforcement | HIGH | MEDIUM | HIGH | Required for compliance audits; missing reason code = non-compliant order |
| Customer eligibility validation | HIGH | MEDIUM | HIGH | Non-approved customers receiving samples = regulatory breach |
| Annual sample limit enforcement | CRITICAL | HIGH | CRITICAL | Exceeding limits = FDA/EMA non-compliance; business-critical control |
| Material restriction check | HIGH | MEDIUM | HIGH | Restricted materials must not be distributed as samples (e.g., controlled substances) |
| Cumulative quantity tracking | MEDIUM | MEDIUM | MEDIUM | Tracking failure impacts compliance reporting but does not block order creation |
| Navigation/Access | LOW | LOW | LOW | UI access issue; no compliance risk |

---

## Integration Risk

None — no linked issues identified.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-39: Process Free Goods (Sample) order for healthcare provider
Module: SD — Sales & Distribution

Happy Path Scenarios:
  HP-01: Create Free Goods Sales Order for approved healthcare provider with valid reason code, material not restricted, quantity within annual limit, pricing auto-set to zero — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6

Negative Scenarios:
  NEG-01: Customer is not approved for promotional samples — Risk: HIGH — ACs: AC-4
  NEG-02: Material is restricted from promotional sampling — Risk: CRITICAL — ACs: AC-6
  NEG-03: Customer has exceeded annual sample limit — Risk: CRITICAL — ACs: AC-6
  NEG-04: Attempt to manually override pricing to non-zero value — Risk: CRITICAL — ACs: AC-2

Error Scenarios:
  ERR-01: Missing Reason Code for Free Goods — Risk: HIGH — ACs: AC-3
  ERR-02: Missing Customer (Sold-to Party) — Risk: HIGH — ACs: AC-1
  ERR-03: Missing Material — Risk: HIGH — ACs: AC-1
  ERR-04: Missing Order Quantity — Risk: HIGH — ACs: AC-1

Edge Cases:
  EDGE-01: Order quantity exactly at annual sample limit (boundary) — Risk: HIGH — ACs: AC-6
  EDGE-02: Order quantity = 1 (minimum valid quantity) — Risk: MEDIUM — ACs: AC-1
  EDGE-03: Cumulative quantity = 0 (first Free Goods order for this customer) — Risk: LOW — ACs: AC-5

Integration Scenarios:
  (None — no linked issues)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 1 | Single happy path covering AC-1 through AC-6 in sequence |
| AP | 0 | No alternative valid paths identified (Free Goods process is standardized) |
| NEG | 4 | 4 validation/business rule violations (non-approved customer, restricted material, exceeded limit, pricing override attempt) |
| ERR | 4 | 4 mandatory fields (Reason Code, Customer, Material, Quantity) — 1 ERR per field |
| EDGE | 3 | 3 boundary conditions (quantity at limit, quantity = 1, cumulative = 0) |
| INT | 0 | None — no linked issues |
| **TOTAL** | **12** | |
