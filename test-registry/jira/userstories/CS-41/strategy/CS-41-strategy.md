# Test Strategy: [CS-41] User Story SD-009 - Export compliance denied-party screening

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-41/strategy/CS-41-analysis.md
**Risk Profile:**     jira/userstories/CS-41/strategy/CS-41-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Sales Order Processor
- **Business Object:** Sales Order (international pharmaceutical orders)
- **SAP Module:** SD — Sales & Distribution
- **Business Goal:** Prevent shipments to sanctioned entities and maintain compliance with export control regulations

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 1 | 1 | CRITICAL |
| Alternative Path (AP) | RECOMMENDED | 1 | 1 | HIGH |
| Negative (NEG) | MANDATORY | 5 | 5 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 1 | 1 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 4 | 4 | MEDIUM |
| Integration (INT) | MANDATORY | 3 | 3 | CRITICAL |
| **TOTAL** | — | **15** | **15** | — |

**Coverage Model Rationale:**
- **CRITICAL risk story** — all scenario types are MANDATORY per risk matrix
- Integration scenarios elevated to MANDATORY due to CRITICAL external dependency on denied-party screening service (SAP GTS or third-party compliance API)
- Alternative Path (AP) marked RECOMMENDED (not MANDATORY) — override flow is HIGH risk but not core transaction path
- NEG coverage expanded to 5 TCs to cover all 4 party types (Sold-To, Ship-To, Bill-To, Payer) plus unauthorized override attempt
- EDGE coverage includes both quantity boundaries and override justification text boundaries

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

**Happy Path:**
- **HP-01:** Create international Sales Order, all parties pass denied-party screening, order released — **CRITICAL** — ACs: AC-1, AC-2, AC-3, AC-5

**Negative:**
- **NEG-01:** Create international Sales Order, Sold-To Party matches denied-party list, order blocked, error message displayed — **CRITICAL** — ACs: AC-2, AC-3, AC-4, AC-5
- **NEG-02:** Create international Sales Order, Ship-To Party matches denied-party list, order blocked, error message displayed — **CRITICAL** — ACs: AC-2, AC-3, AC-4, AC-5
- **NEG-03:** Create international Sales Order, Bill-To Party matches denied-party list, order blocked, error message displayed — **CRITICAL** — ACs: AC-2, AC-3, AC-4, AC-5
- **NEG-04:** Create international Sales Order, Payer matches denied-party list, order blocked, error message displayed — **CRITICAL** — ACs: AC-2, AC-3, AC-4, AC-5
- **NEG-05:** Unauthorized user attempts to override denied-party screening match — **HIGH** — ACs: AC-6

**Error:**
- **ERR-01:** Export Compliance Officer attempts override without documented justification — **HIGH** — ACs: AC-6

**Edge Cases:**
- **EDGE-01:** Create international Sales Order with minimum quantity (boundary) — **MEDIUM** — ACs: AC-1, AC-2
- **EDGE-02:** Create international Sales Order with zero quantity (invalid) — **MEDIUM** — ACs: AC-1
- **EDGE-03:** Override justification text at minimum length (10 characters) — **MEDIUM** — ACs: AC-6
- **EDGE-04:** Override justification text exceeding maximum length (255 characters) — **MEDIUM** — ACs: AC-6

**Integration:**
- **INT-01:** Denied-party screening service unavailable, system handles gracefully — **CRITICAL** — ACs: AC-2
- **INT-02:** Denied-party screening service timeout, system retries or escalates — **CRITICAL** — ACs: AC-2
- **INT-03:** Denied-party screening service returns incomplete data — **CRITICAL** — ACs: AC-2

### Recommended Scenarios

**Alternative Path:**
- **AP-01:** Create international Sales Order, screening match found (false positive), Export Compliance Officer reviews and overrides with documented justification — **HIGH** — ACs: AC-6

### Optional Scenarios

None

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 1 HP scenarios generated | YES |
| NEG Coverage | All 5 NEG scenarios generated | YES |
| ERR Coverage | All 1 ERR scenarios generated | YES |
| EDGE Coverage | All 4 EDGE TCs generated | YES |
| INT Coverage | All 3 INT scenarios generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 7 TCs flagged as Automation Candidate: YES | YES |
| Negative Coverage (Entity Validation) | 100% — 4 party types covered (Sold-To, Ship-To, Bill-To, Payer) | YES |
| Error Coverage (Mandatory Fields) | 100% — override justification field validated | YES |

**Overall pass threshold:** All mandatory gates must PASS. 100% of gates must PASS for CRITICAL risk stories.

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | International Sales Order creation with denied-party screening is the core compliance transaction — regulatory failure risk |
| NEG (invalid entity) | HIGH | MAJOR | Each party type (Sold-To, Ship-To, Bill-To, Payer) must be validated independently — missing any = compliance gap |
| ERR (missing field) | HIGH | MAJOR | Override justification is mandatory for audit trail — missing = regulatory non-compliance |
| EDGE (boundary) | MEDIUM | MINOR | Boundary conditions validate input constraints but not core compliance logic |
| AP (alternative) | HIGH | MAJOR | Override flow is HIGH risk — false-positive handling must be auditable and controlled |
| INT (integration) | CRITICAL | CRITICAL | External compliance service failure = no screening = illegal export risk — must fail gracefully |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidate for Playwright — screening result verification via UI assertions |
| AP | PARTIAL | Override flow requires Export Compliance Officer role (authorization-dependent) — may require manual role setup |
| NEG | PARTIAL | Denied-party matches require test customer master data configured with sanctioned names — SAP GTS or mock service setup needed |
| ERR | YES | Field-level validation stable — override justification blank/missing |
| EDGE | YES | Quantity and text length boundaries are stable UI validations |
| INT | NO | External service failures (unavailable, timeout, incomplete data) require controlled test environment with mock compliance API or SAP GTS test mode — NOT suitable for standard Playwright automation |

**Target automation coverage:** 7 of 15 TCs (47%) — HP, ERR, EDGE scenarios fully automatable

**Automation constraints:**
- NEG scenarios require test denied-party list configuration in SAP GTS or mock compliance service (PARTIAL automation — setup-dependent)
- AP scenario requires Export Compliance Officer authorization (PARTIAL automation — role-dependent)
- INT scenarios require controlled service failure simulation (NO automation — infrastructure-dependent)

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-XXX (HP-01): Create international Sales Order, all parties pass screening, order released
  TC-CS-XXX (INT-01): Denied-party screening service unavailable
  TC-CS-XXX (INT-02): Denied-party screening service timeout
  TC-CS-XXX (INT-03): Denied-party screening service incomplete data

Priority 2 — HIGH (validate immediately after):
  TC-CS-XXX (NEG-01): Sold-To Party matches denied-party list
  TC-CS-XXX (NEG-02): Ship-To Party matches denied-party list
  TC-CS-XXX (NEG-03): Bill-To Party matches denied-party list
  TC-CS-XXX (NEG-04): Payer matches denied-party list
  TC-CS-XXX (NEG-05): Unauthorized override attempt
  TC-CS-XXX (ERR-01): Override without justification
  TC-CS-XXX (AP-01): Override false-positive match

Priority 3 — MEDIUM (complete coverage):
  TC-CS-XXX (EDGE-01): Minimum quantity boundary
  TC-CS-XXX (EDGE-02): Zero quantity (invalid)
  TC-CS-XXX (EDGE-03): Minimum justification text length
  TC-CS-XXX (EDGE-04): Maximum justification text length
```

**Execution sequence rationale:**
- **CRITICAL scenarios first:** HP and INT scenarios validate core screening and service integration — if these fail, downstream testing is blocked
- **HIGH scenarios second:** All party types and authorization controls must be validated before edge cases
- **MEDIUM scenarios last:** Boundary conditions are important but not blocking for compliance validation

---

## Regulatory and Compliance Notes

**Export Control Regulations:**
- This story validates compliance with U.S. export control regulations (OFAC, BIS, EAR) and EU sanctions
- Denied-party screening is a legal requirement for international pharmaceutical shipments
- Failure to screen or block sanctioned parties can result in:
  - Civil penalties (up to $1M per violation — OFAC)
  - Criminal penalties (up to $20M and 20 years imprisonment — IEEPA)
  - Export license revocation
  - Business shutdown

**Test Data Requirements:**
- All test customer master data (Sold-To, Ship-To, Bill-To, Payer) must use FICTIONAL names that do NOT match real sanctioned entities
- Test denied-party list entries must use SYNTHETIC names clearly marked as test data (e.g., "TEST SANCTIONED COMPANY")
- Do NOT use real production customer IDs or names in test execution
- All test execution must use SAP S/4HANA Cloud TEST tenant (not production)

**Audit Trail:**
- All screening checks and override transactions must be logged with timestamp, user ID, and screening result
- Override justifications must be retained for regulatory audit period (minimum 5 years)
- Test execution logs must demonstrate 100% screening coverage (all party types screened)

**Authorization Requirements:**
- Export Compliance Officer role must be configured in SAP with authorization for override transactions
- Standard Sales Order Processor role must NOT have override authorization (validate with NEG-05)

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-41-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first: HP (1), NEG (5), ERR (1), EDGE (4), INT (3) = 14 TCs minimum
3. Generate RECOMMENDED AP scenario (1 TC) unless time/scope constraints apply
4. Apply quality gates table — verify all thresholds are met before completing:
   - 100% AC traceability (all 6 ACs covered)
   - 100% NEG coverage (all 4 party types + unauthorized override)
   - 100% ERR coverage (override justification validated)
   - 100% EDGE coverage (4 boundaries)
   - 100% INT coverage (3 service failure modes)
   - 0 hardcoded SAP values (use `{TD.*}` placeholders for all customer IDs, material IDs, quantities)
   - ≥ 7 TCs flagged as Automation Candidate: YES
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above:
   - HP: YES
   - AP: PARTIAL (note role dependency)
   - NEG: PARTIAL (note test data dependency)
   - ERR: YES
   - EDGE: YES
   - INT: NO (note infrastructure dependency)
7. Output files to `testcases/AI-generated testcases/CS-41/` and `testdata/CS-41/`
8. **CRITICAL:** For NEG scenarios, test data must reference FICTIONAL sanctioned party names (do NOT use real OFAC/BIS list entries)
9. **CRITICAL:** For AP scenario, test data must include Export Compliance Officer user credentials and override justification text
10. **CRITICAL:** For INT scenarios, expected results must specify graceful error handling (e.g., "System displays message: Screening service unavailable. Order cannot be released.")
