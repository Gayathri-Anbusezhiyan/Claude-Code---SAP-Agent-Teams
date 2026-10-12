# Story Analysis: [CS-44] Block Sales Order when customer exceeds credit limit

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-44/CS-44.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Credit Controller |
| Core Action | Block a Sales Order when customer exceeds credit limit |
| Business Goal | Minimize risk of bad debt and enforce credit control policies before shipping pharmaceutical products |
| Business Object | Sales Order (SD-012) |
| SAP Module | SD — Sales & Distribution |
| Complexity | Complex (No SP assigned — inferred from multi-step credit check workflow + integration with FI) |

### Implicit Business Rules (Domain-Inferred)
- Customer must exist in SAP customer master (KNA1/KNVV) with active credit control area assignment
- Credit limit must be configured for the customer in the Credit Management (FI-AR-CR) configuration
- Credit exposure calculation requires real-time aggregation across multiple document types (Sales Orders: VBAK, Deliveries: LIKP, Open Invoices: BSID)
- Credit block must prevent downstream processing (delivery creation, goods issue, billing) until manual release by authorized Credit Controller
- Notification mechanism must be configured in SAP (workflow, email, or work item in Business Workplace)
- Credit check must occur at specific control points: Sales Order Save and/or Release (configurable per sales document type)
- Customer credit master data (KNKK) must be maintained for the credit control area
- Authorization object F_KNA1_BUK required for Credit Controller to review/release blocked orders

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can create a Sales Order for a customer with a defined credit limit. | NAVIGATION | MEDIUM | EP | HP | 1 |
| AC-2 | The system performs an automatic credit check when the Sales Order is saved or released. | BUSINESS_RULE | CRITICAL | EP, ST | HP + AP(Save vs Release trigger points) | 2 |
| AC-3 | The system calculates the customer's total credit exposure (open sales orders + open deliveries + open invoices) and compares it to the credit limit. | BUSINESS_RULE | CRITICAL | EP, BVA | HP + EDGE(at limit) + EDGE(slightly over) | 3 |
| AC-4 | The system blocks the Sales Order with a credit block status if the credit exposure exceeds the credit limit. | SUCCESS_CONFIRMATION | CRITICAL | EP, DT | HP + NEG(no block when under limit) | 2 |
| AC-5 | The system displays a clear error message indicating the credit limit violation and shows the current credit exposure and limit. | ERROR_HANDLING | HIGH | EP | HP(message verification) | 1 |
| AC-6 | The system sends a notification to the Credit Control team when a Sales Order is blocked due to credit limit violation, allowing manual review and approval. | INTEGRATION | HIGH | EP | HP(notification sent) + INT(manual release workflow) | 2 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Customer ID | Sold-to Party | Alphanumeric (10 digits) | Yes | Existing customer in SAP master with credit limit configured |
| Material ID | Material | Alphanumeric (18 chars max) | Yes | Existing material in SAP master |
| Order Quantity | Order Quantity | Numeric | Yes | > 0, per UoM |
| Net Price | Net Value | Decimal (2 decimals) | No | Auto-calculated from pricing |
| Sales Organization | Sales Organization | Alphanumeric (4 digits) | Yes | Valid sales org assigned to company code |
| Distribution Channel | Distribution Channel | Alphanumeric (2 chars) | Yes | Valid channel for sales org |
| Division | Division | Alphanumeric (2 chars) | Yes | Valid division for material |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Customer Name | Sold-to Party Name | Confirm Customer ID | Customer master KNA1-NAME1 |
| Material Description | Material Description | Confirm Material ID | Material master MAKT-MAKTX |
| Credit Limit | Credit Limit | Customer ID entered | Customer credit master KNKK-KLIMK |
| Current Credit Exposure | Credit Exposure | Sales Order save/release | Calculated: SUM(open SO values VBAK + open delivery values LIKP + open receivables BSID) |
| Credit Control Area | Credit Control Area | Customer ID entered | Customer master KNKK-KKBER |
| Credit Block Status | Credit Block | Credit check execution | Set to "B" (Blocked) if exposure > limit |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Sales Order Number | Unique SAP-generated SO document number | 10-digit numeric |
| Credit Block Indicator | Credit block status flag | "B" (Blocked) or blank |
| Credit Exposure Value | Calculated total credit exposure at time of check | Decimal (2 decimals) in document currency |
| Error Message | Credit limit violation message | Text: "Credit limit exceeded: Exposure {exposure} exceeds limit {limit}" |
| Notification Work Item | SAP workflow work item ID sent to Credit Control team | Numeric work item ID |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Order Quantity | 1 (minimum valid) | System-configured max per material | 0 (invalid) | Per UoM |
| Credit Exposure | 0 (new customer, no exposure) | Credit Limit (at limit = allowed; over = blocked) | 0 (valid) | Boundary test at 99%, 100%, 101% of limit |
| Credit Limit | 0.01 (minimum configured limit) | No upper limit (business-defined) | 0 (means no credit check) | Zero credit limit = no credit check performed |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------||
| Sales Order blocking when limit exceeded | CRITICAL | MEDIUM | CRITICAL | Failure allows over-credit shipments = bad debt exposure |
| Credit exposure calculation accuracy | CRITICAL | MEDIUM | CRITICAL | Incorrect calculation = wrong block decision; multi-document aggregation complexity |
| Credit check trigger execution | CRITICAL | LOW | CRITICAL | If check doesn't run, blocking fails; depends on SD config (automatic credit check active) |
| Error message display | HIGH | LOW | HIGH | User must understand why order is blocked to take corrective action |
| Notification to Credit Control team | HIGH | MEDIUM | HIGH | Workflow/notification system dependency; failure delays manual review |
| Customer credit master data validation | HIGH | MEDIUM | HIGH | Missing/incorrect credit limit config = no credit check |
| Manual release workflow | MEDIUM | LOW | MEDIUM | Assumes authorized user can release; authorization dependency |
| Navigation to Sales Order creation | LOW | LOW | LOW | Standard SD transaction; cosmetic risk |

---

## Integration Risk

None — no linked issues identified. However, implicit integration dependencies exist:
- **FI-AR (Accounts Receivable)**: Credit exposure includes open invoices (BSID table) — requires FI data accuracy
- **SD-Delivery**: Credit exposure includes open deliveries (LIKP table) — requires SD delivery processing
- **Workflow/Notification System**: Notification to Credit Control team — requires SAP workflow configuration (transaction SWETYPV or email setup)

**Inferred Integration Scenarios:**
| Implicit Integration | Type | Integration Risk | Scenario Needed |
|---------------------|------|-----------------|-----------------|
| FI-AR open invoices | Data dependency | MEDIUM | INT-01: Credit exposure includes open invoices from FI |
| SD delivery documents | Data dependency | MEDIUM | INT-02: Credit exposure includes open deliveries |
| SAP workflow system | Notification | MEDIUM | INT-03: Notification work item creation |

---

## Scenario Inventory

SCENARIO INVENTORY — CS-44: Block Sales Order when customer exceeds credit limit
Module: SD

Happy Path Scenarios:
  HP-01: Create SO for customer under credit limit — no block — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3
  HP-02: Create SO for customer at exactly 100% credit limit — no block — Risk: CRITICAL — ACs: AC-2, AC-3, AC-4
  HP-03: Create SO for customer exceeding credit limit — blocked with status B — Risk: CRITICAL — ACs: AC-2, AC-3, AC-4, AC-5
  HP-04: Credit check triggers on Save action — Risk: HIGH — ACs: AC-2
  HP-05: Credit check triggers on Release action — Risk: HIGH — ACs: AC-2

Alternative Path Scenarios:
  AP-01: Create SO for customer with zero credit limit (no credit check) — Risk: MEDIUM — ACs: AC-1, AC-2
  AP-02: Create SO with multiple line items — total value exceeds limit — blocked — Risk: HIGH — ACs: AC-3, AC-4

Negative Scenarios:
  NEG-01: Create SO for customer without credit limit configured — no credit check performed — Risk: HIGH — ACs: AC-2, AC-3
  NEG-02: Create SO for customer not assigned to credit control area — no credit check — Risk: HIGH — ACs: AC-2, AC-3
  NEG-03: Attempt to create SO with invalid customer ID — Risk: MEDIUM — ACs: AC-1

Error Scenarios:
  ERR-01: Missing Sold-to Party field — Risk: HIGH — ACs: AC-1
  ERR-02: Missing Material field — Risk: HIGH — ACs: AC-1
  ERR-03: Missing Order Quantity field — Risk: HIGH — ACs: AC-1
  ERR-04: Zero Order Quantity — Risk: HIGH — ACs: AC-1

Edge Cases:
  EDGE-01: Credit exposure at 99% of limit (just under) — no block — Risk: CRITICAL — ACs: AC-3, AC-4
  EDGE-02: Credit exposure at 100% of limit (exactly at) — no block — Risk: CRITICAL — ACs: AC-3, AC-4
  EDGE-03: Credit exposure at 101% of limit (just over) — blocked — Risk: CRITICAL — ACs: AC-3, AC-4
  EDGE-04: Minimum order quantity (1 unit) — credit check still performed — Risk: MEDIUM — ACs: AC-2, AC-3
  EDGE-05: Customer with zero existing exposure — first SO creation — Risk: MEDIUM — ACs: AC-3

Integration Scenarios:
  INT-01: Credit exposure calculation includes open invoices from FI-AR — Risk: MEDIUM — AC-3
  INT-02: Credit exposure calculation includes open deliveries from SD — Risk: MEDIUM — AC-3
  INT-03: Notification work item sent to Credit Control team inbox — Risk: HIGH — AC-6
  INT-04: Manual release by authorized Credit Controller after review — Risk: MEDIUM — AC-6

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 5 | 3 core happy paths (under/at/over limit) + 2 trigger point variants (Save/Release) |
| AP | 2 | Zero credit limit (no check) + multiple line items total exceeding limit |
| NEG | 3 | Missing credit limit config + missing credit control area + invalid customer |
| ERR | 4 | One per mandatory field: Sold-to Party, Material, Order Quantity, Zero Quantity |
| EDGE | 5 | Three boundary tests at limit (99%/100%/101%) + min quantity + zero exposure |
| INT | 4 | FI open invoices + SD open deliveries + notification + manual release |
| **TOTAL** | **23** | |
