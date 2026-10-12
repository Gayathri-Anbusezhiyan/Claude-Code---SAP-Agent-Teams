# Story Analysis: [CS-48] Maintain Tiered Pricing Conditions For A Pharmaceutical Product Based

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-48/CS-48.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Pricing Analyst |
| Core Action | Maintain tiered Pricing Conditions for a pharmaceutical product based on customer group and order volume |
| Business Goal | Ensure contracted and list pricing is applied correctly and consistently at order entry |
| Business Object | Pricing Condition Record (SAP SD - Condition Master) |
| SAP Module | SD — Sales & Distribution (Pricing & Conditions) |
| Complexity | Complex (based on multi-tier logic, approval workflow, and validity monitoring) |

### Implicit Business Rules (Domain-Inferred)
- Material must exist in material master (MARA/MARD) and be configured for sales
- Customer pricing group must be assigned in customer master (KNVV-KONDA)
- Condition type for tiered pricing must exist in pricing procedure configuration (V/08)
- Price scale breakpoints must be sequential and non-overlapping (quantity ranges must be valid)
- Pricing validity dates must not overlap for the same material-customer-group combination
- Supervisor approval authority must be configured in authorization objects (V_VBAK_VKO, V_KOND_VK2)
- Condition records must reference valid price unit and currency from material/customer master
- Sales organization and distribution channel must be maintained for the pricing analyst user

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Manage Pricing Conditions" Fiori app. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The user can define price scales based on order quantity breakpoints. | BUSINESS_RULE | HIGH | EP, BVA | HP (single tier), AP (multiple tiers), EDGE (boundary quantities) | 3 |
| AC-3 | The system automatically applies the correct price tier based on the customer's pricing group and the ordered quantity. | VALIDATION_POSITIVE | CRITICAL | EP, BVA, DT | HP (tier match), NEG (no tier match), EDGE (boundary threshold) | 3 |
| AC-4 | The system displays the applicable condition record and its validity period on the sales order pricing screen. | SUCCESS_CONFIRMATION | HIGH | EP, ST | HP (valid period), NEG (expired record) | 2 |
| AC-5 | Manual price overrides beyond a configured tolerance require supervisor approval. | BUSINESS_RULE | CRITICAL | BVA, DT | HP (within tolerance), NEG (beyond tolerance, no approval), AP (beyond tolerance, with approval) | 3 |
| AC-6 | The system flags condition records nearing their validity end date for renewal review. | VALIDATION_POSITIVE | MEDIUM | EP, ST | HP (near expiry alert), AP (not near expiry) | 2 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Material ID | Material | Alphanumeric (18 char max) | Yes | Existing material in material master configured for sales |
| Customer Pricing Group | Customer Pricing Group | Alphanumeric (2 char) | Yes | Valid KONDA value from customer master (A0, B0, etc.) |
| Condition Type | Condition Type | Alphanumeric (4 char) | Yes | Valid condition type in pricing procedure (e.g., PR00, ZPR1) |
| Price Scale Quantity | Scale Quantity | Numeric | Yes | Positive integer, sequential breakpoints (e.g., 1, 100, 500) |
| Price Amount | Amount | Decimal (2 places) | Yes | Positive value in configured currency |
| Currency | Currency | Alphanumeric (3 char) | Yes | Valid ISO currency code (USD, EUR, etc.) |
| Valid From Date | Valid From | Date (YYYY-MM-DD) | Yes | Cannot be in the past for new records |
| Valid To Date | Valid To | Date (YYYY-MM-DD) | Yes | Must be after Valid From date |
| Price Tolerance % | Tolerance % | Decimal | No | 0-100 range; defines manual override threshold |
| Manual Override Price | Override Price | Decimal (2 places) | No | Only when user manually changes price at order entry |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Material Description | Material Description | Confirm Material ID | Material master MAKT-MAKTX |
| Base Unit of Measure | Base UoM | Confirm Material ID | Material master MARA-MEINS |
| Sales Organization | Sales Organization | User session context | User assignment USORG |
| Distribution Channel | Distribution Channel | User session context | User assignment VTWEG |
| Created By | Created By | Condition record save | User ID from session |
| Created On | Created On | Condition record save | System timestamp |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Condition Record Number | Unique SAP-generated condition record number | Alphanumeric (10 char) |
| Applied Price Tier | Price amount applied at order entry based on quantity | Decimal (2 places) |
| Approval Status | Status of manual override approval request | PENDING / APPROVED / REJECTED |
| Validity Alert Flag | System flag when record is within alert window (e.g., 30 days) | Boolean (Yes/No) |
| Sales Order Line Item Price | Final price on sales order line after condition application | Decimal (2 places) in order currency |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Scale Quantity | 1 (minimum valid) | 999999 (system max) | 0 (invalid) | Must be sequential across tiers |
| Price Amount | 0.01 (minimum valid price) | 999999999.99 (system max) | 0.00 (invalid) | Cannot be zero or negative |
| Tolerance % | 0 (no tolerance) | 100 (full override allowed) | 0 (default if not configured) | Applies to deviation from list price |
| Valid To Date | Valid From + 1 day (minimum period) | 9999-12-31 (indefinite) | Must not equal Valid From | Cannot be before Valid From |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Tiered pricing application at order entry | CRITICAL | MEDIUM | CRITICAL | Incorrect pricing causes revenue loss or contract breach |
| Price scale definition with quantity breakpoints | HIGH | MEDIUM | HIGH | Complex multi-tier logic with boundary conditions |
| Manual override approval workflow | CRITICAL | LOW | CRITICAL | Compliance risk if unauthorized price changes occur |
| Condition record validity monitoring | MEDIUM | MEDIUM | MEDIUM | Expired records cause order entry failure but detected early |
| Customer pricing group validation | HIGH | LOW | HIGH | External master data dependency |
| Material master validation | HIGH | LOW | HIGH | External master data dependency |
| Tolerance threshold calculation | MEDIUM | MEDIUM | MEDIUM | Numeric boundary logic; business rule complexity |
| Fiori app access/navigation | LOW | LOW | LOW | Cosmetic risk; easily detected |

---

## Integration Risk

None — no linked issues identified in the Jira story JSON.

**However, implicit integration dependencies exist:**
- Material Master (MM) — material must be configured for sales
- Customer Master (SD) — customer pricing group assignment
- Pricing Procedure Configuration (SD) — condition type must exist in active procedure
- Authorization Management (BASIS) — supervisor approval roles
- Sales Order Processing (SD) — pricing conditions applied at order entry

These are SAP module-internal dependencies, not cross-story dependencies in the Jira project.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-48: Maintain Tiered Pricing Conditions For A Pharmaceutical Product Based
Module: SD — Sales & Distribution (Pricing & Conditions)

Happy Path Scenarios:
  HP-01: Access Manage Pricing Conditions app and create a valid single-tier pricing condition record — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-6
  HP-02: Create a multi-tier pricing condition with 3 quantity breakpoints (e.g., 1-99, 100-499, 500+) — Risk: HIGH — ACs: AC-2, AC-3
  HP-03: Apply tiered pricing automatically at sales order entry for a customer in the configured pricing group — Risk: CRITICAL — ACs: AC-3, AC-4
  HP-04: Manually override price within configured tolerance (e.g., 5% deviation) — no approval required — Risk: CRITICAL — ACs: AC-5
  HP-05: System displays condition record with validity period on sales order pricing screen — Risk: HIGH — ACs: AC-4
  HP-06: System flags condition records nearing validity end date (e.g., 30 days before expiry) — Risk: MEDIUM — ACs: AC-6

Alternative Path Scenarios:
  AP-01: Create condition with indefinite validity (Valid To = 9999-12-31) — Risk: MEDIUM — ACs: AC-2, AC-6
  AP-02: Manually override price beyond tolerance with supervisor approval — Risk: CRITICAL — ACs: AC-5
  AP-03: Supervisor rejects manual price override request — Risk: HIGH — ACs: AC-5

Negative Scenarios:
  NEG-01: Attempt to create condition for non-existent material — Risk: HIGH — ACs: AC-2
  NEG-02: Attempt to create condition for invalid customer pricing group — Risk: HIGH — ACs: AC-2
  NEG-03: No matching price tier for customer pricing group at order entry — Risk: CRITICAL — ACs: AC-3
  NEG-04: Attempt to apply expired condition record at order entry — Risk: HIGH — ACs: AC-4
  NEG-05: Attempt manual price override beyond tolerance without supervisor approval — Risk: CRITICAL — ACs: AC-5

Error Scenarios:
  ERR-01: Missing Material field — Risk: HIGH — ACs: AC-2
  ERR-02: Missing Customer Pricing Group field — Risk: HIGH — ACs: AC-2
  ERR-03: Missing Condition Type field — Risk: HIGH — ACs: AC-2
  ERR-04: Missing Scale Quantity field — Risk: HIGH — ACs: AC-2
  ERR-05: Missing Price Amount field — Risk: HIGH — ACs: AC-2
  ERR-06: Missing Valid From date — Risk: HIGH — ACs: AC-2
  ERR-07: Missing Valid To date — Risk: HIGH — ACs: AC-2

Edge Cases:
  EDGE-01: Minimum quantity tier boundary (e.g., quantity = 1) — Risk: MEDIUM — ACs: AC-2, AC-3
  EDGE-02: Maximum quantity tier boundary (e.g., quantity = 999999) — Risk: MEDIUM — ACs: AC-2, AC-3
  EDGE-03: Quantity exactly at tier breakpoint (e.g., ordered quantity = 100 when tiers are 1-99, 100-499) — Risk: HIGH — ACs: AC-3
  EDGE-04: Zero quantity (invalid) — Risk: MEDIUM — ACs: AC-2
  EDGE-05: Zero price amount (invalid) — Risk: MEDIUM — ACs: AC-2
  EDGE-06: Valid To date = Valid From date (invalid period) — Risk: MEDIUM — ACs: AC-2
  EDGE-07: Valid From date in the past (for new records) — Risk: MEDIUM — ACs: AC-2
  EDGE-08: Manual override at exact tolerance threshold (e.g., 5.00% deviation) — Risk: MEDIUM — ACs: AC-5
  EDGE-09: Manual override just above tolerance threshold (e.g., 5.01% deviation) — Risk: HIGH — ACs: AC-5
  EDGE-10: Condition record exactly at alert window threshold (e.g., 30 days before expiry) — Risk: LOW — ACs: AC-6

Integration Scenarios:
  (None — no linked Jira issues. Implicit SAP module integrations exist but are not cross-story dependencies.)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 6 | Core workflows: create condition, apply pricing, override within tolerance, display validity, flag near-expiry |
| AP | 3 | Alternative valid paths: indefinite validity, supervisor approval, supervisor rejection |
| NEG | 5 | Validation failures: invalid material, invalid customer group, no tier match, expired record, unauthorized override |
| ERR | 7 | Mandatory field checks: 7 required fields (Material, Customer Pricing Group, Condition Type, Scale Quantity, Price Amount, Valid From, Valid To) |
| EDGE | 10 | Boundary conditions: min/max quantities, price thresholds, date boundaries, tolerance thresholds, tier breakpoints |
| INT | 0 | None — no linked issues in Jira project |
| **TOTAL** | **31** | |
