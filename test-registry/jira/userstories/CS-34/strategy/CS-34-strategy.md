# Test Strategy: [CS-34] User Story SD-002 - Customer pharmacy/wholesaler license validation before order release

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-34/strategy/CS-34-analysis.md
**Risk Profile:**     jira/userstories/CS-34/strategy/CS-34-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Sales Order Processor
- **Business Object:** Sales Order (with pharmaceutical customer license validation)
- **SAP Module:** SD — Sales & Distribution
- **Business Goal:** Remain compliant with pharmaceutical distribution regulations by validating customer pharmacy/wholesaler licenses before order release

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 2 | 2 | CRITICAL |
| Alternative Path (AP) | MANDATORY | 2 | 2 | HIGH |
| Negative (NEG) | MANDATORY | 6 | 6 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 4 | 4 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 5 | 5 | HIGH |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | N/A |
| **TOTAL** | — | **19** | **19** | — |

**Rationale:**
- CRITICAL risk story with regulatory compliance implications — all scenario types are MANDATORY
- AC-2, AC-3, AC-4, AC-6 are CRITICAL risk (license validation, blocking logic, error messaging, audit logging)
- AC-5 is HIGH risk (authorization override must be secure)
- Date boundary validation (expiration date, warning period thresholds) requires comprehensive EDGE coverage
- No linked issues in Jira; implicit integrations (customer master, authorization, audit logging) are covered within HP/NEG scenarios

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path (HP) — 2 scenarios**

- **HP-01:** Create Sales Order for pharmaceutical customer with valid license (beyond warning period) and successfully release
  - Risk: CRITICAL
  - ACs: AC-1, AC-2, AC-3, AC-6
  - Priority: CRITICAL
  - Automation: YES

- **HP-02:** Create Sales Order for pharmaceutical customer with valid license, release, verify audit log captures validation check
  - Risk: CRITICAL
  - ACs: AC-1, AC-2, AC-6
  - Priority: CRITICAL
  - Automation: PARTIAL (audit log verification may require database or log file access)

**Alternative Path (AP) — 2 scenarios**

- **AP-01:** Authorized user overrides license block (expired or warning period) with valid reason and successfully releases Sales Order
  - Risk: HIGH
  - ACs: AC-5, AC-6
  - Priority: HIGH
  - Automation: PARTIAL (requires test user with specific authorization object configured)

- **AP-02:** Sales Order release blocked due to warning period, authorized override performed, audit log captures override action and reason
  - Risk: HIGH
  - ACs: AC-3, AC-4, AC-5, AC-6
  - Priority: HIGH
  - Automation: PARTIAL (authorization + audit log verification)

**Negative (NEG) — 6 scenarios**

- **NEG-01:** Attempt to release Sales Order for customer with missing license number — system blocks release
  - Risk: CRITICAL
  - ACs: AC-2, AC-3, AC-4, AC-6
  - Priority: HIGH
  - Automation: YES

- **NEG-02:** Attempt to release Sales Order for customer with missing license expiration date — system blocks release
  - Risk: CRITICAL
  - ACs: AC-2, AC-3, AC-4, AC-6
  - Priority: HIGH
  - Automation: YES

- **NEG-03:** Attempt to release Sales Order for customer with expired license (expiration date < current date) — system blocks release
  - Risk: CRITICAL
  - ACs: AC-3, AC-4, AC-6
  - Priority: HIGH
  - Automation: YES

- **NEG-04:** Attempt to release Sales Order for customer with license expiring within warning period (e.g., 15 days remaining, threshold = 30 days) — system blocks release
  - Risk: CRITICAL
  - ACs: AC-3, AC-4, AC-6
  - Priority: HIGH
  - Automation: YES

- **NEG-05:** Unauthorized user attempts to override license block — system rejects override
  - Risk: HIGH
  - ACs: AC-5
  - Priority: HIGH
  - Automation: PARTIAL (requires test user without authorization object)

- **NEG-06:** Authorized user attempts override without providing override reason — system rejects or logs incomplete override
  - Risk: MEDIUM
  - ACs: AC-5, AC-6
  - Priority: MEDIUM
  - Automation: YES

**Error Scenarios (ERR) — 4 scenarios**

- **ERR-01:** System displays error message for missing license number with expiration date placeholder
  - Risk: HIGH
  - ACs: AC-4
  - Priority: HIGH
  - Automation: YES

- **ERR-02:** System displays error message for expired license with actual expiration date shown
  - Risk: HIGH
  - ACs: AC-4
  - Priority: HIGH
  - Automation: YES

- **ERR-03:** System displays error message for license in warning period with expiration date and days remaining shown
  - Risk: HIGH
  - ACs: AC-4
  - Priority: HIGH
  - Automation: YES

- **ERR-04:** Unauthorized override attempt displays authorization error message
  - Risk: HIGH
  - ACs: AC-5
  - Priority: HIGH
  - Automation: YES

**Edge Cases (EDGE) — 5 scenarios**

- **EDGE-01:** License expiration date = current date (boundary: expired on the day)
  - Risk: HIGH
  - ACs: AC-3, AC-4
  - Parameter: licenseExpirationDate (equal-to-current-date)
  - Priority: HIGH
  - Automation: YES

- **EDGE-02:** License expiration date = current date + warning threshold (boundary: first day of warning period)
  - Risk: HIGH
  - ACs: AC-3, AC-4
  - Parameter: licenseExpirationDate (warning-period-start)
  - Priority: HIGH
  - Automation: YES

- **EDGE-03:** License expiration date = current date + warning threshold + 1 day (boundary: last day before warning period)
  - Risk: MEDIUM
  - ACs: AC-3
  - Parameter: licenseExpirationDate (warning-period-boundary)
  - Priority: MEDIUM
  - Automation: YES

- **EDGE-04:** Warning period configured as 0 days (only expired licenses blocked, no advance warning)
  - Risk: MEDIUM
  - ACs: AC-3
  - Parameter: warningPeriodDays (lower boundary)
  - Priority: MEDIUM
  - Automation: PARTIAL (requires system configuration change)

- **EDGE-05:** Warning period configured at maximum (e.g., 90 days)
  - Risk: LOW
  - ACs: AC-3
  - Parameter: warningPeriodDays (upper boundary)
  - Priority: LOW
  - Automation: PARTIAL (requires system configuration change)

### Recommended Scenarios

None — all 19 scenarios are MANDATORY due to CRITICAL risk classification.

### Optional Scenarios

None — all 19 scenarios are MANDATORY due to CRITICAL risk classification.

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item (AC-1 through AC-6) covered by ≥ 1 TC | YES |
| HP Coverage | All 2 HP scenarios generated | YES |
| AP Coverage | All 2 AP scenarios generated | YES |
| NEG Coverage | All 6 NEG scenarios generated | YES |
| ERR Coverage | All 4 ERR scenarios generated | YES |
| EDGE Coverage | All 5 EDGE scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values — all customer IDs, material IDs, dates, quantities use `{TD.*}` placeholders | YES |
| Automation Eligibility | ≥ 10 TCs flagged as Automation Candidate: YES (target: 13+ of 19 TCs) | YES |
| License-specific validation | Each NEG/ERR/EDGE TC explicitly verifies error message text includes license expiration date or reason | YES |
| Audit log verification | HP-02, AP-01, AP-02, NEG-01 through NEG-04 test cases include audit log verification step | YES |

**Additional CRITICAL-risk gates:**

| Additional Gate | Threshold | Mandatory |
|----------------|-----------|-----------|
| Negative coverage (license validation) | 100% — one NEG TC per license validation failure mode (missing number, missing date, expired, warning period) | YES |
| Error message content validation | 100% — all ERR TCs verify exact error message format and inclusion of license expiration date | YES |
| Authorization override coverage | 100% — authorized override (AP-01, AP-02) AND unauthorized override (NEG-05, ERR-04) both tested | YES |

**Overall pass threshold:** All mandatory gates must PASS. 100% of scenario coverage required (no recommended-only scenarios).

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Successful license validation and order release is the primary regulatory compliance requirement |
| HP (audit log verification) | CRITICAL | CRITICAL | Audit trail is a mandatory regulatory control — failure = compliance breach |
| AP (authorized override) | HIGH | MAJOR | Emergency/compassionate use override is a critical business continuity control |
| NEG (invalid license data) | HIGH | MAJOR | License validation failures must be correctly detected to prevent regulatory violations |
| ERR (error messaging) | HIGH | MAJOR | Clear error messages enable users to resolve license issues quickly (compliance enabler) |
| EDGE (date boundaries) | HIGH | MAJOR | Off-by-one errors in date logic can result in expired licenses being accepted (HIGH for expiration/warning boundaries, MEDIUM for configuration boundaries) |
| NEG (unauthorized override) | HIGH | MAJOR | Security control — unauthorized users must not bypass compliance blocks |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidates for Playwright — stable validation logic |
| AP | PARTIAL | Requires test users with specific authorization objects configured in SAP (Z_SD_LICENSE_OVERRIDE or equivalent) — automation feasible if test users are pre-configured |
| NEG | YES | Validation checks are stable and repeatable — license data can be parameterized via test data JSON |
| ERR | YES | Error message verification is stable — expected text can be hard-coded or parameterized |
| EDGE | PARTIAL | Date boundary TCs (EDGE-01, EDGE-02, EDGE-03) are fully automatable via parameterized dates. Configuration boundary TCs (EDGE-04, EDGE-05) require system configuration changes (warning period parameter) — mark as PARTIAL unless configuration can be changed via API or transaction |
| INT | N/A | No integration scenarios (no linked issues) |

**Target automation coverage:** 13 of 19 TCs (68%)
- Full automation: HP (2), NEG (6), ERR (4), EDGE (1 — EDGE-01 can use dynamic current date)
- Partial automation: AP (2 — requires pre-configured test users), EDGE (4 — EDGE-02/03 require date parameterization; EDGE-04/05 require config changes)

**Automation blockers:**
- Test users with and without Z_SD_LICENSE_OVERRIDE authorization must be pre-configured
- Warning period configuration parameter must be accessible (either via API or manual setup before test run)
- Audit log access (for HP-02, AP-02, NEG scenarios) — may require database query or SAP audit log transaction (e.g., SLG1 or custom Z transaction)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-034 (HP-01) — Valid license release
  TC-CS-035 (HP-02) — Audit log verification

Priority 2 — HIGH (validate immediately after core path):
  TC-CS-036 (NEG-01) — Missing license number
  TC-CS-037 (NEG-02) — Missing license expiration date
  TC-CS-038 (NEG-03) — Expired license
  TC-CS-039 (NEG-04) — License in warning period
  TC-CS-040 (ERR-01) — Error message for missing license number
  TC-CS-041 (ERR-02) — Error message for expired license
  TC-CS-042 (ERR-03) — Error message for warning period
  TC-CS-043 (EDGE-01) — Expiration date = current date
  TC-CS-044 (EDGE-02) — Expiration date = warning threshold boundary

Priority 3 — HIGH (authorization override scenarios):
  TC-CS-045 (AP-01) — Authorized override (expired license)
  TC-CS-046 (AP-02) — Authorized override (warning period) + audit log
  TC-CS-047 (NEG-05) — Unauthorized override attempt
  TC-CS-048 (ERR-04) — Unauthorized override error message
  TC-CS-049 (NEG-06) — Override without reason

Priority 4 — MEDIUM/LOW (configuration and boundary edge cases):
  TC-CS-050 (EDGE-03) — Last day before warning period
  TC-CS-051 (EDGE-04) — Warning period = 0 days
  TC-CS-052 (EDGE-05) — Warning period = maximum (90 days)
```

---

## Regulatory and Compliance Notes

**Pharmaceutical Distribution Regulations:**
- Customer pharmacy/wholesaler licenses are legally mandated under pharmaceutical distribution laws (e.g., FDA regulations in US, EU GDP guidelines in Europe)
- License validation failures must result in immediate order blocking — no exceptions except authorized overrides
- All license validation checks and overrides must be auditable — audit log must capture: user, timestamp, customer ID, license status, action taken (released/blocked/overridden), override reason (if applicable)
- Test data must use fictional customer IDs and license numbers — real customer data must not be used in test systems

**Authorization and Security:**
- Authorization object for license override (e.g., Z_SD_LICENSE_OVERRIDE) must be tightly controlled — only designated users (e.g., sales managers, compliance officers) should have this authorization
- Unauthorized override attempts must be blocked and logged
- Override reasons must be captured for audit purposes (regulatory requirement for emergency/compassionate use justification)

**SAP Testing Governance:**
- All test execution must use dedicated test system instances (not production)
- License expiration dates in test data should be set to future dates after test completion to avoid false positives in subsequent test runs
- Warning period configuration parameter must be documented and restored to default value after configuration boundary testing (EDGE-04, EDGE-05)

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-34-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL 19 MANDATORY scenarios (no optional scenarios exist for this CRITICAL-risk story)
3. Apply quality gates table — verify all thresholds are met before completing:
   - 100% AC traceability (all 6 ACs covered)
   - All 19 scenarios generated (2 HP + 2 AP + 6 NEG + 4 ERR + 5 EDGE)
   - 0 hardcoded SAP values (all data parameterized)
   - ≥ 10 TCs flagged as Automation Candidate: YES
4. Use `prompts/testcase-generation-from-userstory.md` as the generation template
5. Flag automation candidates per the Automation Viability table above:
   - YES: HP-01, HP-02, NEG-01 through NEG-04, ERR-01 through ERR-04, EDGE-01
   - PARTIAL: AP-01, AP-02, NEG-05, NEG-06, EDGE-02, EDGE-03, EDGE-04, EDGE-05
6. Output files to `testcases/AI-generated testcases/CS-34/` and `testdata/CS-34/`
7. Ensure error message verification steps in ERR test cases explicitly check for license expiration date or failure reason in message text
8. Ensure audit log verification steps in HP-02, AP-01, AP-02, and NEG scenarios (NEG-01 through NEG-04) specify required audit log fields: user, timestamp, customer, license status, action, override reason (if applicable)
9. Parameterize license expiration dates using relative date placeholders (e.g., `{TD.licenseExpirationDateExpired}` = current date - 1 day, `{TD.licenseExpirationDateWarning}` = current date + 15 days, `{TD.licenseExpirationDateValid}` = current date + 60 days)
10. Include test data guide instructions for:
    - Creating test customers with pharmaceutical classification and license data (or identifying existing test customers)
    - Configuring test users with and without authorization object Z_SD_LICENSE_OVERRIDE
    - Configuring warning period parameter (default 30 days for most TCs; 0 days for EDGE-04; 90 days for EDGE-05)
```
