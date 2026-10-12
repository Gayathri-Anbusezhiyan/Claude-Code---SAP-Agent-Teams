# Story Analysis: [CS-41] User Story SD-009 - Export compliance denied-party screening

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-41/CS-41.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Sales Order Processor |
| Core Action | Create international Sales Order with automated export compliance denied-party screening |
| Business Goal | Prevent shipments to sanctioned entities and maintain compliance with export control regulations |
| Business Object | Sales Order (international pharmaceutical orders) |
| SAP Module | SD — Sales & Distribution |
| Complexity | Complex (Critical priority, multi-party screening, compliance integration, audit logging) |

### Implicit Business Rules (Domain-Inferred)
- Customer (Sold-To, Ship-To, Bill-To, Payer) must exist in customer master (KNA1)
- Ship-to country must differ from company country to trigger international order screening
- Material must be configured as pharmaceutical product with export control classification
- Sales organization, distribution channel, and division must be configured for international trade
- Denied-party screening must execute before order release/credit check
- Denied-party lists must be maintained in SAP or integrated via external compliance service (e.g., SAP GTS, third-party screening API)
- Export Compliance Officer role must have authorization for screening review and override transactions
- Override justification must be documented and auditable per regulatory requirements (ITAR, EAR, OFAC)
- Screening log must persist for regulatory retention period (typically 5+ years)
- Blocked orders must not proceed to delivery creation or billing

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | The user can create a Sales Order for an international customer (ship-to country different from company country). | NAVIGATION | MEDIUM | EP | HP | 1 |
| AC-2 | The system automatically screens the customer (Sold-To, Ship-To, Bill-To, Payer) against government-maintained denied-party lists (e.g., OFAC, BIS, EU sanctions). | INTEGRATION | CRITICAL | EP | HP, NEG (match found), INT | 3 |
| AC-3 | The system blocks release of the Sales Order if the customer or any party matches a denied-party list entry. | BUSINESS_RULE | CRITICAL | EP, DT | HP (no match), NEG (match blocks order) | 2 |
| AC-4 | The system displays a clear error message indicating the export compliance violation and provides the matched party name and list source. | ERROR_HANDLING | CRITICAL | EP | NEG (message validation) | 1 |
| AC-5 | The system logs all denied-party screening checks and matches for audit and regulatory reporting. | SUCCESS_CONFIRMATION | CRITICAL | EP | HP (log verification — clean), NEG (log verification — match) | 2 |
| AC-6 | The system allows authorized users (e.g., Export Compliance Officer) to review and override false-positive matches with documented justification. | BUSINESS_RULE | HIGH | EP, DT | AP (override flow), NEG (unauthorized override), ERR (missing justification) | 3 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (SAP UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Sold-To Party | Sold-To Party | Alphanumeric (10-digit customer ID) | Yes | Existing customer in SAP master (KNA1) |
| Ship-To Party | Ship-To Party | Alphanumeric (10-digit customer ID) | Yes | Existing customer in SAP master (KNA1), country ≠ company country |
| Bill-To Party | Bill-To Party | Alphanumeric (10-digit customer ID) | No | Existing customer in SAP master (KNA1) |
| Payer | Payer | Alphanumeric (10-digit customer ID) | No | Existing customer in SAP master (KNA1) |
| Material | Material | Alphanumeric | Yes | Pharmaceutical material with export classification |
| Quantity | Order Quantity | Numeric | Yes | > 0, per UoM |
| Sales Organization | Sales Organization | Alphanumeric (4-digit) | Yes | Configured for international trade |
| Distribution Channel | Distribution Channel | Alphanumeric (2-digit) | Yes | Standard distribution channel |
| Division | Division | Alphanumeric (2-digit) | Yes | Pharmaceutical division |
| Override Justification | Justification Text | Free text | Conditional (mandatory for override) | Documented reason for override (audit trail) |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Customer Name (Sold-To) | Name 1 | Confirm Sold-To Party | Customer master KNA1-NAME1 |
| Customer Name (Ship-To) | Name 1 | Confirm Ship-To Party | Customer master KNA1-NAME1 |
| Ship-To Country | Country | Confirm Ship-To Party | Customer master KNA1-LAND1 |
| Company Country | Company Country | Sales Organization selection | Company code configuration |
| Currency | Document Currency | Sold-To Party selection | Customer master KNA1-WAERS |
| Screening Status | Screening Status | Denied-party check execution | Compliance service response |
| Blocked Status | Overall Block Status | Screening match detected | SD document block flag |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Sales Order Number | Unique SAP-generated SO document number | 10-digit numeric |
| Screening Result | PASS / FAIL / ERROR | Status code |
| Matched Party Name | Name of entity matching denied-party list | Text (if match found) |
| Matched List Source | Government list identifier (e.g., OFAC SDN, BIS DPL) | Text (if match found) |
| Screening Log Entry | Audit log record with timestamp, user, result | System log entry |
| Override Approval Number | Unique identifier for override transaction | Alphanumeric (if override executed) |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Order Quantity | 1 (minimum valid) | System-configured maximum per material | 0 (invalid — SAP error) | Per UoM |
| Override Justification Text | 10 characters (minimum) | 255 characters (typical text field max) | Empty (invalid for override) | Required for audit |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------|-|
| Denied-party screening execution | CRITICAL | MEDIUM | CRITICAL | Regulatory violation (OFAC/BIS penalties), legal liability, business shutdown risk |
| Order blocking on match | CRITICAL | MEDIUM | CRITICAL | Failure to block = illegal export, severe penalties |
| Error message accuracy | CRITICAL | LOW | CRITICAL | Incorrect message = compliance officer cannot remediate, audit failure |
| Audit log integrity | CRITICAL | LOW | CRITICAL | Missing logs = regulatory non-compliance, failed audit |
| Multi-party screening (Sold-To, Ship-To, Bill-To, Payer) | CRITICAL | MEDIUM | CRITICAL | Missing any party = compliance gap |
| Override authorization control | HIGH | MEDIUM | HIGH | Unauthorized override = compliance violation |
| Override justification documentation | HIGH | MEDIUM | HIGH | Missing justification = audit failure |
| International customer identification | MEDIUM | LOW | MEDIUM | Incorrect country logic = screening not triggered |
| Integration with denied-party service | CRITICAL | HIGH | CRITICAL | External dependency (SAP GTS or third-party API), network/timeout risk |

---

## Integration Risk

**Integration Dependencies Detected:**
- **External Compliance Service:** Denied-party screening requires integration with government-maintained lists (OFAC, BIS, EU sanctions) via SAP GTS (Global Trade Services) or third-party compliance API (e.g., Descartes, Amber Road)
- **Risk Level:** CRITICAL — external service availability, API timeout, data synchronization lag
- **Scenario Required:** INT-01 (service unavailable), INT-02 (service timeout), INT-03 (service returns incomplete data)

**No Linked Jira Issues** — but implicit integration dependency on compliance service

---

## Scenario Inventory

SCENARIO INVENTORY — CS-41: User Story SD-009 - Export compliance denied-party screening
Module: SD — Sales & Distribution

Happy Path Scenarios:
  HP-01: Create international Sales Order, all parties pass denied-party screening, order released — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-5

Alternative Path Scenarios:
  AP-01: Create international Sales Order, screening match found (false positive), Export Compliance Officer reviews and overrides with documented justification — Risk: HIGH — ACs: AC-6

Negative Scenarios:
  NEG-01: Create international Sales Order, Sold-To Party matches denied-party list, order blocked, error message displayed — Risk: CRITICAL — ACs: AC-2, AC-3, AC-4, AC-5
  NEG-02: Create international Sales Order, Ship-To Party matches denied-party list, order blocked, error message displayed — Risk: CRITICAL — ACs: AC-2, AC-3, AC-4, AC-5
  NEG-03: Create international Sales Order, Bill-To Party matches denied-party list, order blocked, error message displayed — Risk: CRITICAL — ACs: AC-2, AC-3, AC-4, AC-5
  NEG-04: Create international Sales Order, Payer matches denied-party list, order blocked, error message displayed — Risk: CRITICAL — ACs: AC-2, AC-3, AC-4, AC-5
  NEG-05: Unauthorized user attempts to override denied-party screening match — Risk: HIGH — ACs: AC-6

Error Scenarios:
  ERR-01: Export Compliance Officer attempts override without documented justification — Risk: HIGH — ACs: AC-6

Edge Cases:
  EDGE-01: Create international Sales Order with minimum quantity (boundary) — Risk: MEDIUM — ACs: AC-1, AC-2
  EDGE-02: Create international Sales Order with zero quantity (invalid) — Risk: MEDIUM — ACs: AC-1
  EDGE-03: Override justification text at minimum length (10 characters) — Risk: MEDIUM — ACs: AC-6
  EDGE-04: Override justification text exceeding maximum length (255 characters) — Risk: MEDIUM — ACs: AC-6

Integration Scenarios:
  INT-01: Denied-party screening service unavailable, system handles gracefully — Risk: CRITICAL — ACs: AC-2
  INT-02: Denied-party screening service timeout, system retries or escalates — Risk: CRITICAL — ACs: AC-2
  INT-03: Denied-party screening service returns incomplete data — Risk: CRITICAL — ACs: AC-2

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 1 | Single happy path: all parties pass screening, order released |
| AP | 1 | Override flow for false-positive match (authorized user) |
| NEG | 5 | 4 party types × 1 NEG each (Sold-To, Ship-To, Bill-To, Payer match) + 1 unauthorized override |
| ERR | 1 | Missing override justification |
| EDGE | 4 | 2 quantity boundaries + 2 justification text boundaries |
| INT | 3 | 3 compliance service failure modes (unavailable, timeout, incomplete) |
| **TOTAL** | **15** | |
