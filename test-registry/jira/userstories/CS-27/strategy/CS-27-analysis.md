# Story Analysis: [CS-27] Maintain A Purchasing Contract (Outline Agreement) With Negotiated Pri

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-27/CS-27.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Procurement Officer |
| Core Action | Maintain a Purchasing Contract (Outline Agreement) with negotiated pricing |
| Business Goal | Enable release orders to be issued quickly against pre-agreed terms |
| Business Object | Purchasing Contract (Outline Agreement) |
| SAP Module | MM — Materials Management |
| Complexity | Complex (story points not specified, but feature involves multiple entities: contract master, release tracking, price conditions, vendor/material validation, and time-based alerts) |

### Implicit Business Rules (Domain-Inferred)
- Supplier must exist in vendor master (LFA1) and be marked as approved for the purchasing organization
- Material (API) must exist in material master (MARA/MARC) and be maintained for the plant/purchasing org
- Purchasing Organization must be assigned to the company code
- Contract validity period start date cannot be in the past (or system allows backdating with warning)
- Contract validity end date must be after start date
- Tiered pricing conditions require quantity/value thresholds to be in ascending order
- Cumulative release tracking requires document-level linkage between release orders and the parent contract
- Source list entry for the vendor-material combination must exist if source list enforcement is active
- Contract type must be "MK" (Contract) or similar outline agreement document type
- Pricing conditions are stored in KONV table linked to contract header
- Expiration alert requires a master job/workflow configured in SAP with lead-time parameter

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can access the "Manage Purchase Contracts" Fiori app. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The user can define target quantity/value, validity period, and tiered pricing conditions on the contract. | BUSINESS_RULE | HIGH | EP, BVA | HP (single tier), AP (multiple tiers), EDGE (boundary values for quantity/value/dates) | 4 |
| AC-3 | The system tracks cumulative release quantities/values against the contract limit. | BUSINESS_RULE | CRITICAL | EP, ST | HP (within limit), NEG (exceeds limit) | 2 |
| AC-4 | The system warns the user when a release order would exceed the remaining contract balance. | VALIDATION_NEGATIVE | CRITICAL | EP | NEG (exceed quantity), NEG (exceed value) | 2 |
| AC-5 | The contract can be linked to a specific approved vendor and material combination consistent with the source list. | VALIDATION_POSITIVE | HIGH | EP | HP (valid vendor+material), NEG (vendor not approved), NEG (material not in source list) | 3 |
| AC-6 | The system alerts the Procurement team a configurable number of days before contract expiration. | BUSINESS_RULE | MEDIUM | EP, BVA | HP (alert triggered), EDGE (expiration date boundary, alert lead-time boundary) | 2 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Vendor ID | Supplier | Alphanumeric | Yes | Existing approved vendor in vendor master |
| Material ID | Material | Alphanumeric | Yes | Existing material in material master (API type) |
| Target Quantity | Target Quantity | Numeric | No (if Target Value used) | > 0, per UoM |
| Target Value | Target Value | Currency | No (if Target Quantity used) | > 0, in contract currency |
| Validity Start Date | Valid From | Date | Yes | Today or future (past date may be allowed with warning) |
| Validity End Date | Valid To | Date | Yes | Must be after Valid From |
| Tiered Price (Quantity From) | Scale Quantity | Numeric | Yes (per tier) | Ascending thresholds, first tier starts at 0 or 1 |
| Tiered Price (Net Price) | Net Price | Currency | Yes (per tier) | > 0, per UoM |
| Purchasing Organization | Purchasing Organization | Alphanumeric | Yes | Valid purchasing org for user's authorization |
| Purchasing Group | Purchasing Group | Alphanumeric | Yes | Valid purchasing group |
| Plant | Plant | Alphanumeric | Yes | Valid plant for material |
| Company Code | Company Code | Alphanumeric | Yes (auto) | Derived from Purchasing Org |
| Alert Lead Time (Days) | Reminder Days | Numeric | No | 0-365, default may be 30 or configurable org-wide |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Supplier Name | Supplier Name | Confirm Supplier ID | Vendor master LFA1 |
| Material Description | Material Description | Confirm Material ID | Material master MARA |
| Unit of Measure (UoM) | Order Unit | Select Material | Material master MARC |
| Currency | Currency | Select Supplier or Org | Vendor master or Purchasing Org default |
| Company Code | Company Code | Select Purchasing Org | Org assignment table T001K |
| Remaining Quantity | Remaining Target Qty | Release order posted | Contract cumulative tracking (EKKO/EKPO) |
| Remaining Value | Remaining Target Value | Release order posted | Contract cumulative tracking (EKKO/EKPO) |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Contract Number | Unique SAP-generated contract document number | 10-digit numeric, begins with 46 or 45 (depending on number range) |
| Contract Status | Status of the contract | Draft, Sent, Released, Expired |
| Cumulative Released Quantity | Total quantity released against contract | Numeric, same UoM as target |
| Cumulative Released Value | Total value released against contract | Currency, matches contract currency |
| Alert Trigger Date | Date when expiration alert is sent | Calculated: Validity End Date - Alert Lead Time Days |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Target Quantity | 1 (minimum valid) | System-configured maximum (often 999999999) | 0 (invalid if no Target Value) | Per UoM |
| Target Value | 0.01 (minimum valid) | System-configured maximum | 0 (invalid if no Target Quantity) | Per currency |
| Tiered Price - Quantity From | 0 or 1 (first tier) | <= Target Quantity | 0 (valid for first tier) | Must be ascending |
| Tiered Price - Net Price | 0.01 (minimum valid) | System-configured maximum | 0 (invalid) | Per UoM |
| Validity Start Date | Today (or past if backdating allowed) | No practical upper limit | N/A | Date must exist |
| Validity End Date | Validity Start Date + 1 day | Typically max 99 years from today | N/A | Date must exist and be > Start Date |
| Alert Lead Time | 0 (no alert) | 365 days (or org-configured max) | 0 (valid, means no alert) | Integer days |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Contract document creation | CRITICAL | MEDIUM | CRITICAL | Core transactional operation — failure blocks all contract-based procurement |
| Vendor and material validation | HIGH | MEDIUM | HIGH | External master data dependency + source list consistency check |
| Tiered pricing condition setup | HIGH | MEDIUM | HIGH | Complex data entry — pricing errors lead to financial discrepancies |
| Cumulative release tracking | CRITICAL | HIGH | CRITICAL | State transition logic across multiple release orders — tracking failure leads to over-commitment |
| Release order balance warning | CRITICAL | MEDIUM | CRITICAL | Business rule validation — failure allows over-spending and contract breaches |
| Contract expiration alert | MEDIUM | MEDIUM | MEDIUM | Time-based trigger — failure causes missed renewals, but not transactional failure |
| Validity period enforcement | HIGH | LOW | HIGH | Date logic — errors allow invalid contracts to be used |
| Navigation/Access | LOW | LOW | LOW | Cosmetic risk — easily detected |

---

## Integration Risk

None — no linked issues identified.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-27: Maintain A Purchasing Contract (Outline Agreement) With Negotiated Pri
Module: MM — Materials Management

Happy Path Scenarios:
  HP-01: Create a valid contract with single-tier pricing, valid vendor-material, target quantity, validity period, and save successfully — Risk: CRITICAL — ACs: AC-1, AC-2, AC-5
  HP-02: Create a contract with multi-tier pricing (3+ tiers with ascending quantity thresholds) and verify pricing structure is saved — Risk: HIGH — ACs: AC-2
  HP-03: Create release orders against the contract within the target quantity/value limit and verify cumulative tracking updates — Risk: CRITICAL — ACs: AC-3
  HP-04: Verify expiration alert is triggered the configured number of days before contract expiration — Risk: MEDIUM — ACs: AC-6

Alternative Path Scenarios:
  AP-01: Create a contract using Target Value instead of Target Quantity — Risk: HIGH — ACs: AC-2
  AP-02: Create a contract with Target Quantity AND Target Value (both specified) — Risk: HIGH — ACs: AC-2

Negative Scenarios:
  NEG-01: Attempt to create a contract with a vendor not approved for the purchasing org — Risk: HIGH — ACs: AC-5
  NEG-02: Attempt to create a contract with a material not in the source list for the vendor — Risk: HIGH — ACs: AC-5
  NEG-03: Attempt to create a release order that would exceed the remaining contract quantity — Risk: CRITICAL — ACs: AC-3, AC-4
  NEG-04: Attempt to create a release order that would exceed the remaining contract value — Risk: CRITICAL — ACs: AC-3, AC-4
  NEG-05: Attempt to create a contract with Validity End Date before Validity Start Date — Risk: HIGH — ACs: AC-2
  NEG-06: Attempt to create tiered pricing with non-ascending quantity thresholds (e.g., tier 2 threshold < tier 1) — Risk: HIGH — ACs: AC-2

Error Scenarios:
  ERR-01: Missing Supplier field — Risk: HIGH — ACs: AC-5
  ERR-02: Missing Material field — Risk: HIGH — ACs: AC-5
  ERR-03: Missing Target Quantity AND Target Value (both blank) — Risk: HIGH — ACs: AC-2
  ERR-04: Missing Validity Start Date — Risk: HIGH — ACs: AC-2
  ERR-05: Missing Validity End Date — Risk: HIGH — ACs: AC-2
  ERR-06: Missing Net Price in a pricing tier — Risk: HIGH — ACs: AC-2
  ERR-07: Missing Purchasing Organization — Risk: HIGH — ACs: AC-2
  ERR-08: Missing Plant — Risk: HIGH — ACs: AC-5

Edge Cases:
  EDGE-01: Target Quantity = 1 (minimum boundary) — Risk: MEDIUM — ACs: AC-2, AC-3
  EDGE-02: Target Quantity = maximum allowed value (e.g., 999999999) — Risk: MEDIUM — ACs: AC-2, AC-3
  EDGE-03: Target Value = 0.01 (minimum boundary) — Risk: MEDIUM — ACs: AC-2, AC-3
  EDGE-04: Net Price in first tier = 0.01 (minimum boundary) — Risk: MEDIUM — ACs: AC-2
  EDGE-05: Validity Start Date = today (current date) — Risk: LOW — ACs: AC-2
  EDGE-06: Validity End Date = Start Date + 1 day (minimum valid period) — Risk: MEDIUM — ACs: AC-2
  EDGE-07: Alert Lead Time = 0 (no alert) — Risk: LOW — ACs: AC-6
  EDGE-08: Alert Lead Time = 365 days (maximum typical value) — Risk: LOW — ACs: AC-6
  EDGE-09: Release order quantity exactly equals remaining contract quantity (no overage) — Risk: MEDIUM — ACs: AC-3, AC-4
  EDGE-10: Release order value exactly equals remaining contract value (no overage) — Risk: MEDIUM — ACs: AC-3, AC-4

Integration Scenarios:
  (None — no linked issues)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 4 | 1 standard creation + 1 multi-tier pricing + 1 release tracking + 1 expiration alert |
| AP | 2 | Target Value variant + both Target Quantity and Value variant |
| NEG | 6 | 2 master data validation (vendor, material/source list) + 2 contract limit exceeded (qty, value) + 2 data integrity (invalid date order, invalid price tier order) |
| ERR | 8 | 8 mandatory fields (Supplier, Material, Target Qty/Value, Valid From, Valid To, Net Price, Purch Org, Plant) |
| EDGE | 10 | 2 Target Quantity boundaries + 1 Target Value boundary + 1 Net Price boundary + 3 Validity Date boundaries + 2 Alert Lead Time boundaries + 2 exact balance match boundaries |
| INT | 0 | None — no linked issues |
| **TOTAL** | **30** | |
