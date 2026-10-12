# Story Analysis: [CS-38] Maintain Rebate Agreements for GPO contracts

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-38/CS-38.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Contract Administrator |
| Core Action | Maintain Rebate Agreements for Group Purchasing Organization (GPO) contracts |
| Business Goal | Ensure member hospitals and pharmacies receive correct volume-based rebates at the end of each contract period |
| Business Object | Rebate Agreement |
| SAP Module | SD — Sales & Distribution |
| Complexity | Complex (inferred from multi-tier volume-based calculation, accrual automation, settlement processing, and reporting requirements) |

### Implicit Business Rules (Domain-Inferred)
- GPO contract must exist in the system before creating a Rebate Agreement
- Eligible customers (GPO members) must exist in the customer master (KNA1)
- Material/product master must contain items eligible for rebate
- Rebate tiers must be mutually exclusive and cover all possible volume ranges
- Accrual calculation must run automatically when sales orders/deliveries are posted against GPO customers
- Credit memo or rebate payment document type must be configured in the system
- Rebate Agreement must be locked (no edits allowed) after settlement is processed
- Cumulative purchase volume must aggregate across all GPO members linked to the agreement
- Validity period (start and end dates) determines which transactions are included in accrual calculation
- Rebate settlement requires approval workflow (if settlement amount exceeds threshold)

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can create a Rebate Agreement specifying the GPO contract number, validity period, and eligible customers (GPO members). | NAVIGATION + MANDATORY_FIELD | CRITICAL | EP, BVA | HP + ERR(missing fields) | 5 |
| AC-2 | The system allows the user to define rebate tiers based on cumulative purchase volume (e.g., 2% rebate for 0-10,000 units, 4% rebate for 10,001-50,000 units). | BUSINESS_RULE + VALIDATION_POSITIVE | HIGH | EP, BVA, DT | HP(standard tiers) + AP(3+ tiers) + EDGE(boundary volumes) + NEG(overlapping tiers) | 6 |
| AC-3 | The system automatically accrues rebate amounts for each eligible customer based on their cumulative purchases during the contract period. | BUSINESS_RULE + INTEGRATION | CRITICAL | EP, ST | HP + INT(sales order posting triggers accrual) | 3 |
| AC-4 | The system provides a report showing cumulative purchases and accrued rebates for each GPO member. | VALIDATION_POSITIVE + SUCCESS_CONFIRMATION | MEDIUM | EP | HP(report generation) + AP(filtering) | 2 |
| AC-5 | The user can process a rebate settlement at the end of the contract period, generating credit memos or rebate payments for eligible customers. | BUSINESS_RULE + SUCCESS_CONFIRMATION | CRITICAL | EP | HP(settlement processing) + AP(credit memo vs payment) | 2 |
| AC-6 | The system prevents retroactive changes to rebate tiers after the settlement has been processed. | VALIDATION_NEGATIVE + BUSINESS_RULE | HIGH | EP, ST | NEG(attempt to edit locked agreement) | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| GPO Contract Number | Agreement Number / Contract Reference | Alphanumeric | Yes | Existing contract in SAP |
| Validity Start Date | Valid From | Date | Yes | Current or future date |
| Validity End Date | Valid To | Date | Yes | After Valid From date |
| Eligible Customers | Customer List / GPO Members | Multi-select | Yes | Existing customer IDs from KNA1 |
| Rebate Tier Volume Lower | Volume From (per tier) | Numeric | Yes | Non-negative integer, 0 for first tier |
| Rebate Tier Volume Upper | Volume To (per tier) | Numeric | Yes | Greater than Volume From, non-overlapping with other tiers |
| Rebate Percentage | Rebate % (per tier) | Decimal | Yes | 0-100 |
| Settlement Document Type | Credit Memo / Payment Type | Dropdown | Yes | Credit Memo or Rebate Payment |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Customer Name | Customer Name | Confirm Customer ID | Customer master KNA1 |
| GPO Contract Description | Contract Description | Enter GPO Contract Number | Contract master data |
| Sales Organization | Sales Org | Customer ID selection | Customer master KNA1 (sales area assignment) |
| Distribution Channel | Distribution Channel | Customer ID selection | Customer master KNA1 (sales area assignment) |
| Currency | Currency | Sales Organization | Company code currency settings |
| Cumulative Purchase Volume | Total Volume (per customer) | Sales order/delivery posting | Aggregated from VBRK/VBRP (billing documents) during contract period |
| Accrued Rebate Amount | Accrued Rebate | Cumulative volume crosses tier boundary | Calculated: Volume × Rebate % |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Rebate Agreement Number | Unique SAP-generated agreement ID | Alphanumeric (depends on SAP numbering range) |
| Rebate Agreement Status | Current status (Draft / Active / Settled / Locked) | Status indicator |
| Credit Memo Number | Document number generated during settlement | 10-digit numeric (standard SAP credit memo) |
| Rebate Payment Reference | Payment document number generated during settlement | Alphanumeric (depends on payment document type) |
| Settlement Date | Date when settlement was processed | Date (YYYY-MM-DD) |
| Total Rebate Amount | Sum of all rebates across all GPO members | Decimal (2 decimal places) |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Rebate Tier Volume Lower | 0 (first tier must start at 0) | System-configured maximum | Valid for first tier only | Must be sequential and non-overlapping |
| Rebate Tier Volume Upper | 1 (minimum valid) | System-configured maximum | Invalid (tier must have upper limit) | Must be greater than lower boundary |
| Rebate Percentage | 0 (valid — no rebate tier) | 100 (maximum — entire amount rebated) | Valid — represents no rebate | Per tier |
| Validity Period Duration | 1 day (minimum) | No upper limit | Invalid (zero-day contract) | End Date - Start Date ≥ 1 |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Rebate Agreement creation | CRITICAL | MEDIUM | CRITICAL | Core transactional operation; incorrect GPO setup affects all members |
| Rebate tier definition | CRITICAL | MEDIUM | CRITICAL | Incorrect tier boundaries or percentages = incorrect payouts |
| Automatic accrual calculation | CRITICAL | HIGH | CRITICAL | Integration with sales/billing; calculation errors = financial loss or overpayment |
| Cumulative volume aggregation | CRITICAL | MEDIUM | CRITICAL | Incorrect aggregation across customers = wrong rebate amounts |
| Settlement processing | CRITICAL | MEDIUM | CRITICAL | Generates financial documents (credit memos/payments); errors affect accounting |
| Rebate report generation | MEDIUM | LOW | MEDIUM | Reporting failure = manual effort but no financial loss |
| Locked agreement validation | HIGH | MEDIUM | HIGH | Retroactive changes could cause audit/compliance issues |
| Customer master validation | HIGH | MEDIUM | HIGH | External master data dependency |
| Contract reference validation | HIGH | MEDIUM | HIGH | External contract data dependency |
| Date range validation | MEDIUM | LOW | MEDIUM | Standard date validation; errors caught early |

---

## Integration Risk

**None — no linked issues identified.**

However, implicit integration dependencies exist:
- **Sales & Distribution module**: Sales orders and deliveries trigger accrual calculation
- **Financial Accounting module**: Credit memos and rebate payments post to FI documents
- **Master Data Management**: Customer master (KNA1) and contract master must be synchronized
- **Billing module**: Cumulative purchase volume sourced from billing documents (VBRK/VBRP)

These represent **implicit integration scenarios** that should be tested even without explicit Jira links. Risk: **HIGH**.

---

## Scenario Inventory

### SCENARIO INVENTORY — CS-38: Maintain Rebate Agreements for GPO contracts
**Module:** SD — Sales & Distribution

#### Happy Path Scenarios:
- **HP-01**: Create Rebate Agreement with GPO contract number, validity period, and 2+ eligible customers — Risk: CRITICAL — ACs: AC-1
- **HP-02**: Define 2 rebate tiers with non-overlapping volume ranges and valid percentages — Risk: CRITICAL — ACs: AC-2
- **HP-03**: Sales order posted for GPO member → system automatically accrues rebate based on cumulative volume and tier — Risk: CRITICAL — ACs: AC-3
- **HP-04**: Generate rebate report showing cumulative purchases and accrued rebates for all GPO members — Risk: MEDIUM — ACs: AC-4
- **HP-05**: Process rebate settlement at end of contract period, generating credit memos for all eligible customers — Risk: CRITICAL — ACs: AC-5

#### Alternative Path Scenarios:
- **AP-01**: Create Rebate Agreement with 3+ rebate tiers (complex tier structure) — Risk: HIGH — ACs: AC-2
- **AP-02**: Process rebate settlement generating rebate payments (instead of credit memos) — Risk: CRITICAL — ACs: AC-5
- **AP-03**: Generate rebate report with date range filter or customer filter — Risk: MEDIUM — ACs: AC-4

#### Negative Scenarios:
- **NEG-01**: Create Rebate Agreement with overlapping tier volume ranges — system displays error and prevents save — Risk: HIGH — ACs: AC-2
- **NEG-02**: Create Rebate Agreement with tier percentage > 100 — system displays error — Risk: HIGH — ACs: AC-2
- **NEG-03**: Create Rebate Agreement with end date before start date — system displays error — Risk: HIGH — ACs: AC-1
- **NEG-04**: Attempt to edit rebate tiers after settlement has been processed — system prevents changes and displays error — Risk: HIGH — ACs: AC-6
- **NEG-05**: Create Rebate Agreement with non-existent GPO contract number — system displays error — Risk: HIGH — ACs: AC-1
- **NEG-06**: Create Rebate Agreement with non-existent customer ID — system displays error — Risk: HIGH — ACs: AC-1

#### Error Scenarios:
- **ERR-01**: Missing GPO Contract Number field — system prevents save and displays mandatory field error — Risk: HIGH — ACs: AC-1
- **ERR-02**: Missing Validity Start Date field — system prevents save and displays mandatory field error — Risk: HIGH — ACs: AC-1
- **ERR-03**: Missing Validity End Date field — system prevents save and displays mandatory field error — Risk: HIGH — ACs: AC-1
- **ERR-04**: Missing Eligible Customers field — system prevents save and displays mandatory field error — Risk: HIGH — ACs: AC-1
- **ERR-05**: Missing Rebate Tier Volume Lower field — system prevents save and displays mandatory field error — Risk: HIGH — ACs: AC-2
- **ERR-06**: Missing Rebate Tier Volume Upper field — system prevents save and displays mandatory field error — Risk: HIGH — ACs: AC-2
- **ERR-07**: Missing Rebate Percentage field — system prevents save and displays mandatory field error — Risk: HIGH — ACs: AC-2

#### Edge Cases:
- **EDGE-01**: Create Rebate Agreement with minimum validity period (1 day) — Risk: MEDIUM — ACs: AC-1
- **EDGE-02**: Define rebate tier with lower boundary = 0 (first tier starting at zero) — Risk: MEDIUM — ACs: AC-2
- **EDGE-03**: Define rebate tier with percentage = 0 (no rebate tier) — Risk: MEDIUM — ACs: AC-2
- **EDGE-04**: Define rebate tier with percentage = 100 (entire amount rebated) — Risk: MEDIUM — ACs: AC-2
- **EDGE-05**: Cumulative purchase volume exactly equals tier upper boundary (boundary crossing) — Risk: MEDIUM — ACs: AC-3
- **EDGE-06**: Process rebate settlement with zero accrued rebate amount (no sales during period) — Risk: MEDIUM — ACs: AC-5

#### Integration Scenarios:
- **INT-01**: Sales order posting for GPO member customer triggers automatic accrual calculation — Risk: CRITICAL — Implicit integration with SD billing
- **INT-02**: Credit memo generated during settlement posts to Financial Accounting (FI) — Risk: CRITICAL — Implicit integration with FI
- **INT-03**: Rebate payment generated during settlement posts to Payment Processing — Risk: CRITICAL — Implicit integration with FI

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 5 | 5 primary workflows (create agreement, define tiers, accrual, report, settlement) |
| AP | 3 | 3+ tier structure, payment vs credit memo, report filtering |
| NEG | 6 | 6 validation scenarios (overlapping tiers, invalid %, invalid dates, locked agreement, invalid contract, invalid customer) |
| ERR | 7 | 7 mandatory fields (GPO contract, start date, end date, customers, tier volume lower/upper, tier %) |
| EDGE | 6 | 6 boundary conditions (min validity period, tier boundaries, rebate % 0/100, volume boundary, zero rebate settlement) |
| INT | 3 | 3 implicit integration scenarios (accrual on SO posting, credit memo to FI, payment to FI) |
| **TOTAL** | **30** | |
