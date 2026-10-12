# Story Analysis: [CS-40] User Story SD-008 - ATP check excluding batches nearing expiration

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-40/CS-40.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Sales Order Processor |
| Core Action | Create a Sales Order with Available-to-Promise (ATP) check that excludes batches nearing expiration |
| Business Goal | Ensure customers receive products with adequate remaining shelf-life and minimize the risk of returns due to short expiration dates |
| Business Object | Sales Order (batch-managed pharmaceutical material) |
| SAP Module | SD — Sales & Distribution |
| Complexity | Complex (multi-layered business logic: ATP + batch management + shelf-life calculation + authorization override) |

### Implicit Business Rules (Domain-Inferred)
- Material must be batch-managed (XCHPF flag in MARA table = 'X')
- Material must have shelf-life configuration (MHDHB/MHDLP fields in MARA table populated)
- Minimum remaining shelf-life threshold must be configured per material (configurable via customizing or material master)
- Unrestricted stock (MSEG.BWART) must exist in the plant/storage location for the material
- Batches must be created with production/expiration dates (MCH1 table: HSDAT, VFDAT)
- ATP check logic must integrate with batch determination logic (via condition technique or batch search strategy)
- Customer must exist in customer master (KNA1)
- Sales organization, distribution channel, division must be valid for the material
- User must have authorization object V_KONH_VKO (Sales Org) to create Sales Orders
- User must have additional authorization (e.g., custom auth object or V_VBAK_AAT) to override shelf-life restrictions
- Material must be extended to the sales org/distribution channel (MVKE table)
- Pricing procedure must be configured for the sales order type

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can create a Sales Order for a batch-managed pharmaceutical material. | NAVIGATION + BUSINESS_RULE | HIGH | EP | HP | 1 |
| AC-2 | The system performs an ATP check against all unrestricted stock batches. | BUSINESS_RULE | CRITICAL | EP | HP | 1 |
| AC-3 | The system excludes batches from the ATP calculation if their remaining shelf-life is less than the minimum required shelf-life threshold (configurable by material, e.g., 6 months before expiration). | BUSINESS_RULE + VALIDATION_POSITIVE | CRITICAL | EP, BVA | HP + NEG(batch near expiration) + EDGE(exact threshold) | 3 |
| AC-4 | The system confirms availability and proposes a delivery date only if sufficient stock with adequate shelf-life exists. | SUCCESS_CONFIRMATION | CRITICAL | EP | HP | 1 |
| AC-5 | The system displays a warning message if the ATP check fails due to insufficient stock with adequate shelf-life, even if physical stock is available. | VALIDATION_NEGATIVE + ERROR_HANDLING | CRITICAL | EP | NEG(insufficient shelf-life stock) | 1 |
| AC-6 | The system allows the user to override the shelf-life restriction with appropriate authorization (e.g., for discount sales or urgent orders). | BUSINESS_RULE + AUTHORIZATION | HIGH | EP, DT | AP(authorized override) + NEG(unauthorized override) | 2 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Customer ID | Sold-to Party | Alphanumeric (10 digits) | Yes | Existing customer in SAP customer master (KNA1) |
| Material ID | Material | Alphanumeric (18 chars max) | Yes | Existing batch-managed pharmaceutical material with shelf-life config (MARA.XCHPF = 'X', MHDHB populated) |
| Requested Quantity | Order Quantity | Numeric (decimal 13,3) | Yes | > 0, within available ATP stock |
| Requested Delivery Date | Requested Delivery Date | Date (YYYYMMDD) | No | Future date (current date or later) |
| Sales Organization | Sales Organization | Alphanumeric (4 chars) | Yes | Valid sales org from TVKO table |
| Distribution Channel | Distribution Channel | Alphanumeric (2 chars) | Yes | Valid distribution channel from TVTW table |
| Division | Division | Alphanumeric (2 chars) | Yes | Valid division from TSPA table |
| Override Shelf-Life | (Checkbox or flag) | Boolean | No | Only if user has override authorization |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Customer Name | Sold-to Party Name | Confirm Customer ID | Customer master KNA1.NAME1 |
| Material Description | Material Description | Confirm Material ID | Material master MAKT.MAKTX |
| Unit of Measure | Base Unit of Measure | Confirm Material ID | Material master MARA.MEINS |
| Available Quantity (ATP) | Available Quantity | ATP check execution | ATP calculation (CO09) excluding batches below threshold |
| Proposed Delivery Date | Confirmed Delivery Date | ATP check success | ATP logic (lead time + available date) |
| Sales Order Type | Order Type | Default per sales org config | Default order type from IMG (e.g., OR - Standard Order) |
| Pricing Elements | Net Price, Tax, Total | Trigger pricing condition | Pricing procedure (TVAP, KONP) |
| Batch Numbers (proposed) | Batch | Batch determination during ATP | MCH1 table — batches with VFDAT > (current date + min shelf-life) |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Sales Order Number | Unique SAP-generated Sales Order document number | 10-digit numeric (e.g., 0000001234) |
| Sales Order Status | Document status after creation | Open / Partially Delivered / Delivered |
| Delivery Date (Confirmed) | System-confirmed delivery date based on ATP | Date (DD.MM.YYYY) |
| ATP Warning Message | Warning message if ATP fails due to shelf-life | Text: "No sufficient stock with required shelf-life available" (exact text TBD per SAP tenant config) |
| Batch Allocation | Batches allocated to the Sales Order line item | List of batch numbers (MCH1.CHARG) |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Order Quantity | 0.001 (minimum positive) | Available ATP stock quantity | 0 (invalid) | Decimal precision per UoM (e.g., 3 decimals for KG) |
| Requested Delivery Date | Current date (today) | System-configured max future date (e.g., 365 days) | Past date (invalid) | Cannot request delivery in the past |
| Remaining Shelf-Life Threshold | 0 days (no restriction) | Material-specific max (e.g., total shelf-life) | N/A | Configured per material (e.g., 180 days = 6 months) |
| Batch Expiration Date (EDGE) | Exact threshold date (current date + min shelf-life) | Far future date (many years) | Past date (expired batch — invalid) | Batches with VFDAT <= (current date + threshold) excluded |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Sales Order creation (batch-managed material) | CRITICAL | MEDIUM | CRITICAL | Core transactional operation — revenue impact + customer satisfaction |
| ATP check logic (shelf-life exclusion) | CRITICAL | HIGH | CRITICAL | Complex custom logic — requires correct batch determination + date calculation; failure leads to expired products shipped to customers |
| Batch determination with shelf-life filter | CRITICAL | HIGH | CRITICAL | Integration of ATP + batch management + shelf-life config — multi-table dependency (MARA, MCH1, customizing) |
| Material validation (batch-managed + pharmaceutical) | HIGH | MEDIUM | HIGH | External master data dependency — material must have correct flags and shelf-life config |
| Customer validation | HIGH | MEDIUM | HIGH | External master data dependency — customer must exist and be assigned to sales org |
| Warning message display (ATP failure) | HIGH | LOW | HIGH | User notification critical — if missing, user may assume order is valid when stock is insufficient |
| Authorization override (shelf-life) | HIGH | MEDIUM | HIGH | Security + business rule — unauthorized override risks expired product shipment; authorized override enables business flexibility |
| Delivery date confirmation | MEDIUM | MEDIUM | MEDIUM | ATP logic derives date — depends on lead time config and available date |
| Numeric boundaries (quantity, dates) | MEDIUM | MEDIUM | MEDIUM | BVA required — zero quantity, exact threshold date, past delivery date |
| Navigation/Access (Create Sales Order) | LOW | LOW | LOW | Cosmetic risk — standard SAP transaction access |

---

## Integration Risk

None — no linked issues identified.

However, domain-implied integration points (not in Jira linkedIssues):
- **Inventory Management (MM)**: ATP check reads stock levels from MM tables (MARD, MCHB) — if stock data is incorrect, ATP fails
- **Batch Management (MM)**: Batch determination reads MCH1 (batch master) — if batch records are missing or expiration dates incorrect, logic fails
- **Material Master (MM)**: Material must be configured as batch-managed with shelf-life — if MARA.XCHPF or MHDHB fields missing, feature not applicable
- **Pricing (SD)**: Sales Order creation triggers pricing — if pricing procedure misconfigured, order creation may fail (but not related to shelf-life logic)

Recommended: Create INT scenarios for batch master data validation and stock data accuracy (if those user stories exist in the project).

---

## Scenario Inventory

SCENARIO INVENTORY — CS-40: ATP check excluding batches nearing expiration
Module: SD — Sales & Distribution

Happy Path Scenarios:
  HP-01: Create Sales Order for batch-managed pharmaceutical material with sufficient stock having adequate shelf-life (> min threshold), ATP check passes, delivery date confirmed, order saved successfully — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4

Alternative Path Scenarios:
  AP-01: User with override authorization creates Sales Order and manually overrides shelf-life restriction to use a batch nearing expiration (e.g., discount sale scenario), order saved successfully — Risk: HIGH — ACs: AC-1, AC-6

Negative Scenarios:
  NEG-01: Create Sales Order for batch-managed material where all available batches have remaining shelf-life < min threshold, ATP check fails, warning message displayed, order cannot be saved — Risk: CRITICAL — ACs: AC-2, AC-3, AC-5
  NEG-02: User without override authorization attempts to override shelf-life restriction, system rejects override, order cannot proceed with near-expiration batch — Risk: HIGH — ACs: AC-6
  NEG-03: Create Sales Order for batch-managed material with zero unrestricted stock, ATP check fails, warning message displayed (standard ATP failure, not shelf-life specific) — Risk: HIGH — ACs: AC-2, AC-5
  NEG-04: Create Sales Order for material that is NOT batch-managed (MARA.XCHPF = blank), system performs standard ATP check without shelf-life logic (feature not applicable) — Risk: MEDIUM — ACs: AC-1, AC-2

Error Scenarios:
  ERR-01: Missing Sold-to Party (Customer ID) — Risk: HIGH — ACs: AC-1
  ERR-02: Missing Material ID — Risk: HIGH — ACs: AC-1
  ERR-03: Missing Order Quantity — Risk: HIGH — ACs: AC-1
  ERR-04: Missing Sales Organization — Risk: HIGH — ACs: AC-1
  ERR-05: Invalid Customer ID (does not exist in customer master) — Risk: HIGH — ACs: AC-1
  ERR-06: Invalid Material ID (does not exist in material master) — Risk: HIGH — ACs: AC-1
  ERR-07: Material not extended to Sales Org/Distribution Channel (MVKE entry missing) — Risk: HIGH — ACs: AC-1

Edge Cases:
  EDGE-01: Batch expiration date exactly equals (current date + min shelf-life threshold) — boundary condition — verify if batch is included or excluded from ATP — Risk: CRITICAL — ACs: AC-3
  EDGE-02: Order Quantity equals exact available ATP stock (with shelf-life filter applied) — full consumption — verify delivery date and stock allocation — Risk: MEDIUM — ACs: AC-2, AC-4
  EDGE-03: Order Quantity exceeds available ATP stock (with shelf-life filter applied) by 1 unit — verify ATP failure warning — Risk: MEDIUM — ACs: AC-5
  EDGE-04: Requested Delivery Date is today (same day) — verify ATP check uses today as base date for shelf-life calculation — Risk: MEDIUM — ACs: AC-4
  EDGE-05: Minimum shelf-life threshold configured as 0 days (no restriction) — verify all batches included in ATP regardless of expiration date — Risk: LOW — ACs: AC-3
  EDGE-06: Material has multiple batches: one with adequate shelf-life (> threshold), one near expiration (< threshold) — verify system selects only adequate batch — Risk: CRITICAL — ACs: AC-3

Integration Scenarios:
  (None — no linkedIssues in Jira)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 1 | One primary happy path: create SO with batch-managed material, ATP passes with shelf-life filter |
| AP | 1 | Authorized override scenario — business-critical alternative path |
| NEG | 4 | 4 negative scenarios: (1) ATP fails due to shelf-life, (2) unauthorized override attempt, (3) zero stock ATP failure, (4) non-batch-managed material (feature not applicable) |
| ERR | 7 | 7 error scenarios: 3 missing mandatory fields (Customer, Material, Quantity) + 1 missing Sales Org + 3 invalid/misconfigured data (invalid customer, invalid material, material not extended to sales org) |
| EDGE | 6 | 6 edge cases: (1) exact threshold boundary date, (2) exact ATP stock quantity, (3) ATP stock exceeded by 1 unit, (4) same-day delivery date, (5) zero threshold config, (6) mixed batch shelf-life |
| INT | 0 | No linked issues in Jira — but domain integration points noted above (MM batch master, stock) |
| **TOTAL** | **19** | Comprehensive coverage for a complex ATP + batch + shelf-life feature |
