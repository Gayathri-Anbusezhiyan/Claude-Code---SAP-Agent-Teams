# Test Strategy: [CS-43] Create Customer Master with credit limit and regulatory license

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-43/strategy/CS-43-analysis.md
**Risk Profile:**     jira/userstories/CS-43/strategy/CS-43-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Master Data Specialist
- **Business Object:** Customer Master (SD-MD Customer)
- **SAP Module:** SD — Sales & Distribution (Master Data)
- **Business Goal:** Ensure all pharmaceutical customers are properly validated and credit-controlled before processing sales orders

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 1 | 1 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 1 | 1 | MEDIUM |
| Negative (NEG) | MANDATORY | 2 | 2 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 3 | 3 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 5 | 5 | MEDIUM |
| Integration (INT) | RECOMMENDED | 1 | 2 | HIGH |
| **TOTAL** | — | **13** | **14** | — |

**Rationale for CRITICAL risk coverage:**
- All MANDATORY scenario types applied per CRITICAL risk level
- EDGE scenarios are MANDATORY (not just RECOMMENDED) due to CRITICAL validation requirements in AC-4 (license expiration date) and regulatory impact of AC-2 (credit limit)
- Integration scenarios are RECOMMENDED despite no explicit linkedIssues — downstream SD-OTC and FI-AR-CR integration is implicit and business-critical
- Target of 14 TCs provides comprehensive coverage of all 6 ACs with full boundary and error validation

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**HP-01** — Create Customer Master with all three sections (General, Company Code, Sales Area), valid credit limit, valid license with future expiration date, verify customer number generated and notification sent
- **Risk:** CRITICAL
- **ACs Covered:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6
- **Rationale:** Core end-to-end happy path — validates all 6 acceptance criteria in one comprehensive test case

**NEG-01** — Attempt to create Customer Master with blank Pharmacy License Number
- **Risk:** CRITICAL
- **ACs Covered:** AC-4
- **Rationale:** Pharmaceutical compliance requirement — blank license must be rejected

**NEG-02** — Attempt to create Customer Master with expired license (past expiration date)
- **Risk:** CRITICAL
- **ACs Covered:** AC-4
- **Rationale:** Pharmaceutical compliance requirement — expired license must be rejected

**ERR-01** — Missing Credit Limit field in Company Code Data section
- **Risk:** HIGH
- **ACs Covered:** AC-2
- **Rationale:** Credit control integrity — system must enforce mandatory credit limit per AC-2

**ERR-02** — Missing mandatory General Data fields (Name, Address, Country)
- **Risk:** HIGH
- **ACs Covered:** AC-1
- **Rationale:** Master data integrity — General Data section completeness required per AC-1

**ERR-03** — Missing Sales Area Data (Sales Org, Distribution Channel, Division)
- **Risk:** HIGH
- **ACs Covered:** AC-1
- **Rationale:** Sales processing prerequisite — Sales Area assignment required per AC-1

**EDGE-01** — Credit Limit = 0.01 (minimum positive value)
- **Risk:** MEDIUM
- **ACs Covered:** AC-2
- **Rationale:** Lower boundary validation for credit limit (must be > 0)

**EDGE-02** — Credit Limit = maximum allowable value (999999999999.99)
- **Risk:** MEDIUM
- **ACs Covered:** AC-2
- **Rationale:** Upper boundary validation for credit limit (field capacity limit)

**EDGE-03** — License Expiration Date = today (boundary date)
- **Risk:** HIGH
- **ACs Covered:** AC-4
- **Rationale:** Critical boundary — AC-4 requires "future date" so today may be invalid

**EDGE-04** — License Expiration Date = tomorrow (minimum valid future date)
- **Risk:** MEDIUM
- **ACs Covered:** AC-4
- **Rationale:** Lower boundary for valid future date per AC-4

**EDGE-05** — License Expiration Date = far future (e.g., 50 years from today)
- **Risk:** LOW
- **ACs Covered:** AC-4
- **Rationale:** Upper boundary — verify system accepts long-term valid licenses

### Recommended Scenarios

**AP-01** — Create Customer Master with multiple regulatory licenses (Pharmacy License + DEA Number + Wholesaler License all provided)
- **Risk:** MEDIUM
- **ACs Covered:** AC-3
- **Rationale:** Alternative data completeness scenario — validates all optional license fields (DEA, Wholesaler) alongside mandatory Pharmacy License

**INT-01** — Verify created customer can be used in Sales Order creation (implicit SD-OTC integration)
- **Risk:** HIGH
- **ACs Covered:** AC-1, AC-5
- **Rationale:** Downstream integration verification — confirms customer number assignment enables transactional flow

**INT-02** — Verify credit limit is respected during Sales Order credit check (implicit FI-AR-CR integration)
- **Risk:** HIGH
- **ACs Covered:** AC-2
- **Rationale:** Credit management integration — confirms credit limit is active and enforced in order processing

### Optional Scenarios

None

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 1 HP scenarios generated | YES |
| NEG Coverage | All 2 NEG scenarios generated | YES |
| ERR Coverage | All 3 ERR scenarios generated | YES |
| EDGE Coverage | All 5 EDGE TCs generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 9 TCs flagged as Automation Candidate: YES | YES |
| Negative coverage (entity validation) | 100% — 2 NEG TCs for license validation (blank + expired) | YES |
| Error coverage (mandatory fields) | 100% — 3 ERR TCs covering credit limit + general data + sales area | YES |

**Overall pass threshold:** All mandatory gates must PASS. At least 80% of recommended gates (INT scenarios) must PASS.

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | End-to-end customer master creation with all three data sections — blocks all downstream sales processing if failed |
| NEG (invalid license) | HIGH | MAJOR | Pharmaceutical compliance — selling to unlicensed or expired-license customers violates FDA/DEA regulations |
| ERR (missing credit limit) | HIGH | MAJOR | Financial control failure — missing credit limit exposes company to unchecked credit risk |
| ERR (missing general/sales data) | HIGH | MAJOR | Master data integrity failure — incomplete customer record cannot be used in sales orders |
| EDGE (credit limit boundaries) | MEDIUM | MINOR | Boundary validation — ensures system handles extreme but valid values |
| EDGE (license date boundaries) | HIGH | MAJOR | Critical for EDGE-03 (today boundary) — potential compliance risk if system incorrectly accepts today as valid expiration |
| AP (multiple licenses) | MEDIUM | MINOR | Alternative data completeness — validates optional fields but not core requirement |
| INT (sales order / credit check) | HIGH | MAJOR | Integration failures cascade — customer unusable in downstream processes despite successful creation |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidate for Playwright — stable three-section customer master creation flow |
| AP | YES | Data-driven via testdata JSON — multiple license fields parameterized |
| NEG | YES | Stable validation checks — blank license and expired date produce consistent error messages |
| ERR | YES | Field-level validation stable — missing mandatory fields trigger predictable errors |
| EDGE | PARTIAL | Credit limit boundaries (EDGE-01, EDGE-02): YES — numeric input stable. License date boundaries (EDGE-03, EDGE-04, EDGE-05): PARTIAL — date validation may vary based on system date settings |
| INT | PARTIAL | INT-01 (Sales Order creation): PARTIAL — requires multi-app orchestration (Customer Master → Sales Order). INT-02 (Credit check): PARTIAL — requires specific order conditions to trigger credit validation |

**Target automation coverage:** 11 of 14 TCs (79%)
- Full automation: HP (1) + AP (1) + NEG (2) + ERR (3) + EDGE (2 credit limit) = 9 TCs
- Partial automation: EDGE (3 license dates) + INT (2) = 5 TCs (scriptless execution recommended for INT scenarios)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-{NNN} — HP-01: Create Customer Master with all sections, valid credit limit, valid license

Priority 2 — HIGH (validate immediately after):
  TC-CS-{NNN} — NEG-01: Blank Pharmacy License Number
  TC-CS-{NNN} — NEG-02: Expired license (past expiration date)
  TC-CS-{NNN} — ERR-01: Missing Credit Limit
  TC-CS-{NNN} — ERR-02: Missing General Data fields
  TC-CS-{NNN} — ERR-03: Missing Sales Area Data
  TC-CS-{NNN} — EDGE-03: License Expiration Date = today (boundary validation)

Priority 3 — MEDIUM (complete coverage):
  TC-CS-{NNN} — AP-01: Multiple regulatory licenses
  TC-CS-{NNN} — EDGE-01: Credit Limit = 0.01 (minimum)
  TC-CS-{NNN} — EDGE-02: Credit Limit = 999999999999.99 (maximum)
  TC-CS-{NNN} — EDGE-04: License Expiration Date = tomorrow (minimum valid)
  TC-CS-{NNN} — EDGE-05: License Expiration Date = far future

Priority 4 — Integration (run after core stability confirmed):
  TC-CS-{NNN} — INT-01: Created customer usable in Sales Order
  TC-CS-{NNN} — INT-02: Credit limit enforced in Sales Order credit check
```

---

## Regulatory and Compliance Notes

**SAP SD Master Data (Pharmaceutical Industry):**
- Customer Master records for pharmaceutical customers are subject to regulatory compliance (FDA, DEA for US; equivalent authorities in other regions)
- Regulatory license validation (AC-4) is a **compliance-critical** control — system must reject customers with blank or expired licenses to prevent non-compliant sales
- Credit limit (AC-2) is both a financial control (credit risk management) and an operational prerequisite for SAP Credit Management (FI-AR-CR) integration
- All test execution must use dedicated test system instances (not production)
- Test data must use fictitious business names, addresses, and license numbers — no real pharmaceutical customer data
- Custom fields for license information (Pharmacy License Number, DEA Number, Wholesaler License, License Expiration Date) must be pre-configured in the test SAP tenant before test execution
- Notification workflow (AC-6) requires pre-configured recipient distribution lists (Sales team, Credit team) — verify configuration before executing INT scenarios

**Data Privacy:**
- Customer Master is PII-sensitive — test datasets must not contain real customer data
- Ensure test customer records are clearly marked (e.g., account group "Z001-Pharma-Test") to prevent accidental use in production

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-43-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first: HP (1), NEG (2), ERR (3), EDGE (5)
3. Generate RECOMMENDED types: AP (1), INT (2) — minimum 1 INT scenario (INT-01) is HIGH priority
4. Apply quality gates table — verify all thresholds are met before completing:
   - 100% AC traceability (all 6 ACs covered)
   - All mandatory scenario counts met
   - 0 hardcoded values (full parameterization)
   - ≥ 9 TCs flagged as automation candidates
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above:
   - YES: HP, AP, NEG, ERR, EDGE-01, EDGE-02
   - PARTIAL: EDGE-03, EDGE-04, EDGE-05, INT-01, INT-02
7. Output files to:
   - `testcases/AI-generated testcases/CS-43/testcases/{TC-ID}.md`
   - `testcases/AI-generated testcases/CS-43/CS-43-coverage-matrix.md`
   - `testcases/AI-generated testcases/CS-43/CS-43-summary.json`
   - `testdata/CS-43/CS-43-testdata.json`
   - `testdata/CS-43/CS-43-testdata-guide.md`
8. Ensure all license date EDGE scenarios use dynamic date calculations (e.g., `{{TODAY}}`, `{{TOMORROW}}`, `{{TODAY_PLUS_50_YEARS}}`) — not hardcoded dates
9. For INT scenarios, document prerequisites clearly (INT-01 requires sales order app access; INT-02 requires specific order conditions)
