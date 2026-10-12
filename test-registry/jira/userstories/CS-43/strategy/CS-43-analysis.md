# Story Analysis: [CS-43] Create Customer Master with credit limit and regulatory license

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-43/CS-43.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Master Data Specialist |
| Core Action | Create a Customer Master record with credit limit and regulatory license information |
| Business Goal | Ensure all pharmaceutical customers are properly validated and credit-controlled before processing sales orders |
| Business Object | Customer Master (SD-MD Customer) |
| SAP Module | SD — Sales & Distribution (Master Data) |
| Complexity | Complex (No story points provided, but involves multi-section customer master with validation, custom fields, and integrations) |

### Implicit Business Rules (Domain-Inferred)
- Customer Master creation requires configuration of three data views: General Data (XD01), Company Code Data (credit management), and Sales Area Data (SD-specific attributes)
- Credit limit must be maintained at Company Code level to enable automatic credit checks during sales order processing
- Regulatory license fields are industry-specific extensions (pharmaceutical vertical) — must be enabled via customer master enhancement or custom fields
- License expiration date validation is critical for compliance — system must block creation if license is expired or blank
- Customer number assignment requires active number range configuration for the relevant account group
- Notification workflow requires configured recipients (Sales team distribution list, Credit team email/user IDs)
- Sales Area assignment (Sales Org / Distribution Channel / Division) must exist and be valid for the Company Code
- Credit control area must be configured and linked to the Company Code
- Account group assignment determines field status (mandatory/optional/suppressed) for all three data sections

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can create a Customer Master record in the system with General Data, Company Code Data, and Sales Area Data. | NAVIGATION | CRITICAL | EP | HP, AP (multiple sections) | 1 |
| AC-2 | The system requires the user to enter a credit limit for the customer in the Company Code Data section. | MANDATORY_FIELD | HIGH | EP | ERR (missing credit limit) | 1 |
| AC-3 | The system allows the user to capture regulatory license information (e.g., Pharmacy License Number, DEA Number, Wholesaler License) in customer master extensions or custom fields. | VALIDATION_POSITIVE | HIGH | EP | HP (with valid license) | 1 |
| AC-4 | The system validates that the license number is not blank and has a valid expiration date (future date) before saving the customer master. | VALIDATION_NEGATIVE | CRITICAL | EP, BVA | NEG (blank license), NEG (expired license), EDGE (today's date), EDGE (past date), EDGE (far-future date) | 4 |
| AC-5 | The system assigns a unique customer number upon successful creation of the customer master. | SUCCESS_CONFIRMATION | CRITICAL | EP | HP (result verification) | 1 |
| AC-6 | The system sends a notification to the Sales and Credit teams when a new pharmaceutical customer is created. | INTEGRATION | HIGH | EP | INT (verify notification sent) | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Customer Name | Name | Text (40 chars) | Yes | Any valid business name |
| Street Address | Street / House number | Text | Yes | Valid address format |
| City | City | Text | Yes | Existing city in country master |
| Postal Code | Postal Code | Alphanumeric | Yes | Valid postal code for country |
| Country | Country | Alpha-2 code | Yes | Valid country key (e.g., US, DE) |
| Account Group | Account Group | Code | Yes | Configured account group (e.g., Z001-Pharma) |
| Company Code | Company Code | Alphanumeric (4) | Yes | Existing company code in SAP |
| Credit Limit | Credit Limit | Decimal (13,2) | Yes (AC-2) | > 0, valid currency amount |
| Currency | Currency | ISO code | Yes | Valid currency (e.g., USD, EUR) |
| Sales Organization | Sales Organization | Alphanumeric (4) | Yes | Existing sales org |
| Distribution Channel | Distribution Channel | Alphanumeric (2) | Yes | Valid distribution channel |
| Division | Division | Alphanumeric (2) | Yes | Valid division |
| Pharmacy License Number | Pharmacy License Number (custom field) | Text | Yes (AC-4) | Not blank, alphanumeric |
| License Expiration Date | License Expiry Date (custom field) | Date | Yes (AC-4) | Future date (> today) |
| DEA Number | DEA Number (custom field) | Text | Optional | Alphanumeric, format varies |
| Wholesaler License | Wholesaler License (custom field) | Text | Optional | Alphanumeric |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Credit Control Area | Credit Control Area | Select Company Code | Company Code → Credit Control Area assignment (T001) |
| Country Name | Country Name | Select Country Code | Country master (T005) |
| Language Key | Language Key | Select Country Code | Country master default language |
| Tax Classification | Tax Classification | Select Country Code + Account Group | Account group configuration (T077D) |
| Partner Functions | Partner Functions (Sold-to, Ship-to, Bill-to, Payer) | Create Customer | Default from account group settings |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Customer Number | Unique SAP-generated customer account number | 10-digit numeric (e.g., 0000100001) or alphanumeric per number range config |
| Customer Status | Active status after creation | "Active" or equivalent status indicator |
| Notification ID/Log | Email or workflow notification ID confirming Sales/Credit team notification | System-dependent (BCS message ID or workflow log entry) |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Credit Limit | 0.01 (minimum positive value) | 999999999999.99 (field max 13,2) | 0 (invalid per AC-2) | Must be > 0 per business rule |
| License Expiration Date | Tomorrow (minimum future date) | System date max (e.g., 9999-12-31) | Today (boundary — may be valid or invalid depending on config) | AC-4 requires "future date" |
| Customer Name Length | 1 character | 40 characters (SAP standard) | 0 (blank = invalid) | Mandatory field |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Customer Master creation (3 sections) | CRITICAL | MEDIUM | CRITICAL | Core master data — blocks all sales order processing if failed |
| Credit limit validation | CRITICAL | LOW | CRITICAL | Regulatory and financial control — missing credit limit allows unchecked credit exposure |
| License validation (blank check) | CRITICAL | MEDIUM | CRITICAL | Pharmaceutical compliance — selling to unlicensed customers violates FDA/DEA regulations |
| License expiration validation | CRITICAL | MEDIUM | CRITICAL | Same compliance risk — expired license = non-compliant customer |
| Customer number generation | CRITICAL | LOW | CRITICAL | System integrity — duplicate or missing customer number breaks transactional flow |
| Notification workflow | HIGH | MEDIUM | HIGH | Operational risk — teams unaware of new customers may cause delayed order processing |
| General/Company/Sales Area data entry | MEDIUM | LOW | MEDIUM | Standard master data fields — well-established SAP process |
| Custom field configuration (license fields) | MEDIUM | MEDIUM | MEDIUM | Industry-specific extension — depends on correct custom field setup |

---

## Integration Risk

None — no linked issues identified.

(Note: However, implicit downstream integration exists with Sales Order processing (SD-OTC) and Credit Management (FI-AR-CR), but no explicit Jira linkage provided.)

---

## Scenario Inventory

SCENARIO INVENTORY — CS-43: Create Customer Master with credit limit and regulatory license
Module: SD — Sales & Distribution (Master Data)

Happy Path Scenarios:
  HP-01: Create Customer Master with all three sections (General, Company Code, Sales Area), valid credit limit, valid license with future expiration date, verify customer number generated and notification sent — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6

Alternative Path Scenarios:
  AP-01: Create Customer Master with multiple regulatory licenses (Pharmacy License + DEA Number + Wholesaler License all provided) — Risk: MEDIUM — ACs: AC-3

Negative Scenarios:
  NEG-01: Attempt to create Customer Master with blank Pharmacy License Number — Risk: CRITICAL — ACs: AC-4
  NEG-02: Attempt to create Customer Master with expired license (past expiration date) — Risk: CRITICAL — ACs: AC-4

Error Scenarios:
  ERR-01: Missing Credit Limit field in Company Code Data section — Risk: HIGH — ACs: AC-2
  ERR-02: Missing mandatory General Data fields (Name, Address, Country) — Risk: HIGH — ACs: AC-1
  ERR-03: Missing Sales Area Data (Sales Org, Distribution Channel, Division) — Risk: HIGH — ACs: AC-1

Edge Cases:
  EDGE-01: Credit Limit = 0.01 (minimum positive value) — Risk: MEDIUM — ACs: AC-2
  EDGE-02: Credit Limit = maximum allowable value (999999999999.99) — Risk: MEDIUM — ACs: AC-2
  EDGE-03: License Expiration Date = today (boundary date) — Risk: HIGH — ACs: AC-4
  EDGE-04: License Expiration Date = tomorrow (minimum valid future date) — Risk: MEDIUM — ACs: AC-4
  EDGE-05: License Expiration Date = far future (e.g., 50 years from today) — Risk: LOW — ACs: AC-4

Integration Scenarios:
  (None explicitly required per linkedIssues, but downstream verification scenarios recommended:)
  INT-01: Verify created customer can be used in Sales Order creation (implicit SD-OTC integration) — Risk: HIGH — ACs: AC-1, AC-5
  INT-02: Verify credit limit is respected during Sales Order credit check (implicit FI-AR-CR integration) — Risk: HIGH — ACs: AC-2

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 1 | One comprehensive happy path covering all 6 ACs with valid data across all three customer master sections |
| AP | 1 | One alternative path capturing multiple optional license fields (AC-3 extension) |
| NEG | 2 | AC-4 requires blank license and expired license negative tests |
| ERR | 3 | AC-1 (mandatory General/Sales Area fields) + AC-2 (mandatory Credit Limit) = 3 error cases |
| EDGE | 5 | AC-2 (2 credit limit boundaries) + AC-4 (3 date boundaries: today, tomorrow, far-future) |
| INT | 2 | Implicit integration verification with SD-OTC and FI-AR-CR (recommended but not explicitly required by ACs) |
| **TOTAL** | **14** | |
