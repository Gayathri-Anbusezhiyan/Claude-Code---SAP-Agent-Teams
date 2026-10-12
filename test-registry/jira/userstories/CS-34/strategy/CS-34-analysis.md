# Story Analysis: [CS-34] User Story SD-002 - Customer pharmacy/wholesaler license validation before order release

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-34/CS-34.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Sales Order Processor |
| Core Action | Validate customer's pharmacy/wholesaler license before releasing a sales order |
| Business Goal | Remain compliant with pharmaceutical distribution regulations |
| Business Object | Sales Order (with pharmaceutical customer license validation) |
| SAP Module | SD — Sales & Distribution |
| Complexity | Complex (No SP assigned, but involves compliance, authorization override, audit logging, configurable parameters) |

### Implicit Business Rules (Domain-Inferred)
- Customer must exist in customer master (KNA1/KNVV) with complete pharmaceutical license information
- License expiration date must be maintained in customer master record (likely custom field or extension)
- Warning period threshold must be configurable (system parameter or configuration table)
- Authorization object must exist for license block override (likely custom Z_SD_LICENSE_OVERRIDE or similar)
- Sales Order must be in a releasable status (not already released/delivered/invoiced)
- License validation must occur at sales order release, not at creation
- Audit log must capture: user, timestamp, license status, override reason (if applicable)
- System must differentiate between pharmaceutical and non-pharmaceutical customers (customer classification or material type)

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can create a Sales Order for a pharmaceutical customer. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | The system checks the customer master record for the presence of a valid pharmacy/wholesaler license number and expiration date. | VALIDATION_POSITIVE | CRITICAL | EP, BVA | HP + NEG(missing license) + NEG(missing expiration) | 3 |
| AC-3 | The system blocks release of the Sales Order if the license is missing, expired, or within a configurable warning period (e.g., 30 days before expiration). | VALIDATION_NEGATIVE | CRITICAL | EP, BVA, DT | NEG(missing) + NEG(expired) + NEG(warning period) + HP(valid outside warning) | 4 |
| AC-4 | The system displays a clear error message indicating the license validation failure and provides the license expiration date. | ERROR_HANDLING | HIGH | EP | NEG(error message verification for each block scenario) | 3 |
| AC-5 | The user can override the block with appropriate authorization (e.g., for emergency/compassionate use orders). | BUSINESS_RULE | HIGH | EP, DT | AP(authorized override) + NEG(unauthorized override attempt) | 2 |
| AC-6 | The system logs all license validation checks and overrides for audit purposes. | SUCCESS_CONFIRMATION | CRITICAL | EP | HP(audit log on success) + AP(audit log on override) + NEG(audit log on block) | 3 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Customer ID | Sold-to Party | Alphanumeric | Yes | Existing customer in SAP master with pharmaceutical classification |
| Material ID | Material | Alphanumeric | Yes | Existing material in SAP master |
| Order Quantity | Order Quantity | Numeric | Yes | >= 1 |
| Release Action | Release | Action/Button | Yes | User initiates release transaction |
| Override Reason | Override Reason / Comments | Text | Conditional (if override) | Free text explaining emergency/compassionate use |
| Authorization | User authorization object | System-checked | Yes (for override) | Z_SD_LICENSE_OVERRIDE or equivalent |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Customer Name | Sold-to Party Name | Confirm Customer ID | Customer master KNA1 |
| License Number | Pharmacy/Wholesaler License Number | Confirm Customer ID | Customer master (custom field Z_PHARM_LICENSE or equivalent) |
| License Expiration Date | License Expiration Date | Confirm Customer ID | Customer master (custom field Z_LICENSE_EXPIRY or equivalent) |
| License Status | License Status (Valid/Expired/Warning) | Trigger release action | Calculated: compare expiration date vs current date + warning period |
| Warning Period Threshold | License Warning Days | System configuration | Configuration table or parameter (default 30 days) |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Sales Order Number | Unique SAP-generated SO document number | 10-digit numeric |
| Release Status | Sales Order release status after validation | Released / Blocked |
| Error Message | License validation failure message | Text: "License validation failed: [reason]. Expiration date: [date]." |
| Audit Log Entry | License validation audit record | Timestamp, User, Customer, License Status, Action (Released/Blocked/Overridden), Override Reason |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| License Expiration Date | Current date (expired if <= today) | No upper limit | Not applicable | Past dates = expired; within warning period = warning; future beyond warning = valid |
| Warning Period Days | 0 days (no warning) | System-configured maximum (e.g., 90 days) | 0 = immediate expiration only | Configurable parameter |
| Order Quantity | 1 (minimum valid) | System-configured maximum | 0 (invalid) | Per UoM |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| License validation at release | CRITICAL | MEDIUM | CRITICAL | Regulatory non-compliance = fines, legal action, business shutdown |
| Missing license data | CRITICAL | HIGH | CRITICAL | Master data quality dependency; if not enforced, orders may slip through |
| Expired license detection | CRITICAL | LOW | CRITICAL | Date comparison logic is simple, but failure = regulatory breach |
| Warning period calculation | HIGH | MEDIUM | HIGH | Off-by-one errors, timezone issues, misconfigured threshold |
| Authorization for override | HIGH | MEDIUM | HIGH | Security risk if unauthorized users can override compliance blocks |
| Audit logging completeness | CRITICAL | MEDIUM | CRITICAL | Regulatory requirement; missing audit trail = compliance failure |
| Error message clarity | MEDIUM | LOW | MEDIUM | User must understand why block occurred and how to resolve |
| Sales Order creation (basic) | MEDIUM | LOW | MEDIUM | Standard SD functionality, but prerequisite for validation |

---

## Integration Risk

None — no linked issues identified. However, implicit integration dependencies exist:
- **Customer Master (KNA1/KNVV)**: License data must be maintained and accessible
- **User Authorization (PFCG)**: Authorization object for override must be configured
- **Audit Logging System**: Custom or standard SAP audit mechanism must be active
- **Configuration Tables**: Warning period parameter must be maintained

---

## Scenario Inventory

SCENARIO INVENTORY — CS-34: Customer pharmacy/wholesaler license validation before order release
Module: SD — Sales & Distribution

Happy Path Scenarios:
  HP-01: Create Sales Order for pharmaceutical customer with valid license (beyond warning period) and successfully release — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-6
  HP-02: Create Sales Order for pharmaceutical customer with valid license, release, verify audit log captures validation check — Risk: CRITICAL — ACs: AC-1, AC-2, AC-6

Alternative Path Scenarios:
  AP-01: Authorized user overrides license block (expired or warning period) with valid reason and successfully releases Sales Order — Risk: HIGH — ACs: AC-5, AC-6
  AP-02: Sales Order release blocked due to warning period, authorized override performed, audit log captures override action and reason — Risk: HIGH — ACs: AC-3, AC-4, AC-5, AC-6

Negative Scenarios:
  NEG-01: Attempt to release Sales Order for customer with missing license number — system blocks release — Risk: CRITICAL — ACs: AC-2, AC-3, AC-4, AC-6
  NEG-02: Attempt to release Sales Order for customer with missing license expiration date — system blocks release — Risk: CRITICAL — ACs: AC-2, AC-3, AC-4, AC-6
  NEG-03: Attempt to release Sales Order for customer with expired license (expiration date < current date) — system blocks release — Risk: CRITICAL — ACs: AC-3, AC-4, AC-6
  NEG-04: Attempt to release Sales Order for customer with license expiring within warning period (e.g., 15 days remaining, threshold = 30 days) — system blocks release — Risk: CRITICAL — ACs: AC-3, AC-4, AC-6
  NEG-05: Unauthorized user attempts to override license block — system rejects override — Risk: HIGH — ACs: AC-5
  NEG-06: Authorized user attempts override without providing override reason — system rejects or logs incomplete override — Risk: MEDIUM — ACs: AC-5, AC-6

Error Scenarios:
  ERR-01: System displays error message for missing license number with expiration date placeholder — Risk: HIGH — ACs: AC-4
  ERR-02: System displays error message for expired license with actual expiration date shown — Risk: HIGH — ACs: AC-4
  ERR-03: System displays error message for license in warning period with expiration date and days remaining shown — Risk: HIGH — ACs: AC-4
  ERR-04: Unauthorized override attempt displays authorization error message — Risk: HIGH — ACs: AC-5

Edge Cases:
  EDGE-01: License expiration date = current date (boundary: expired on the day) — Risk: HIGH — ACs: AC-3, AC-4
  EDGE-02: License expiration date = current date + warning threshold (boundary: first day of warning period) — Risk: HIGH — ACs: AC-3, AC-4
  EDGE-03: License expiration date = current date + warning threshold + 1 day (boundary: last day before warning period) — Risk: MEDIUM — ACs: AC-3
  EDGE-04: Warning period configured as 0 days (only expired licenses blocked, no advance warning) — Risk: MEDIUM — ACs: AC-3
  EDGE-05: Warning period configured at maximum (e.g., 90 days) — Risk: LOW — ACs: AC-3

Integration Scenarios:
  (None — no linked issues in Jira. Implicit integrations noted in Risk Assessment.)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 2 | One for basic valid license release; one for explicit audit log verification |
| AP | 2 | Authorized override scenarios (expired and warning period) with audit logging |
| NEG | 6 | Four license validation failures (missing number, missing date, expired, warning period) + two unauthorized override scenarios |
| ERR | 4 | Error message verification for each block scenario (missing, expired, warning, unauthorized override) |
| EDGE | 5 | Boundary testing for expiration date (on expiration day, first day of warning, last day before warning) + warning period configuration boundaries (0 days, max days) |
| INT | 0 | None — no linked issues (implicit integrations do not require separate test cases; covered in HP/NEG scenarios) |
| **TOTAL** | **19** | |
