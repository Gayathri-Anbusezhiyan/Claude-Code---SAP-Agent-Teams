# Test Strategy: [CS-15] TC001_Weblogin

**Created:**          2026-08-21
**Created By:**       test-strategy-agent/skills/define-test-strategy
**Story Analysis:**   jira/userstories/CS-15/strategy/CS-15-analysis.md
**Risk Profile:**     jira/userstories/CS-15/strategy/CS-15-risk-profile.json
**Overall Risk:**     CRITICAL

---

## Business Context

- **Actor:** Web Orders user
- **Business Object:** User Session / Authentication Token
- **SAP Module:** Not SAP — Web Orders Application (External)
- **Business Goal:** Access the Web Orders application and perform order management activities

---

## Coverage Model

| Scenario Type | Status | TC Count (min) | TC Count (target) | Priority |
|--------------|--------|---------------|------------------|---------|
| Happy Path (HP) | MANDATORY | 1 | 1 | CRITICAL |
| Alternative Path (AP) | NOT APPLICABLE | 0 | 0 | N/A |
| Negative (NEG) | MANDATORY | 3 | 3 | HIGH |
| Error / Missing Field (ERR) | MANDATORY | 3 | 3 | HIGH |
| Edge Case / Boundary (EDGE) | MANDATORY | 4 | 4 | MEDIUM |
| Integration (INT) | NOT APPLICABLE | 0 | 0 | N/A |
| **TOTAL** | — | **11** | **11** | — |

**Rationale:**
- **CRITICAL risk** story requires full coverage per agent standards
- **AP**: Not applicable — only one valid authentication path exists
- **INT**: Not applicable — no linked issues identified
- **EDGE**: Mandatory despite CRITICAL risk allowing RECOMMENDED — authentication edge cases (whitespace, case sensitivity) are security-critical for login functionality

---

## Scenario Inventory (from Analysis)

### Mandatory Scenarios

#### Happy Path (HP)
- **HP-01**: User accesses login page, enters valid credentials (Tester / test), clicks Login, and is successfully redirected to the Products page with active session
  - **Risk**: CRITICAL
  - **ACs Covered**: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7
  - **TC Count**: 1

#### Negative (NEG)
- **NEG-01**: User enters invalid username and valid password
  - **Risk**: HIGH
  - **ACs Covered**: AC-6
- **NEG-02**: User enters valid username and invalid password
  - **Risk**: HIGH
  - **ACs Covered**: AC-6
- **NEG-03**: User enters invalid username and invalid password
  - **Risk**: HIGH
  - **ACs Covered**: AC-6
  - **TC Count**: 3 (all invalid credential combinations)

#### Error / Missing Field (ERR)
- **ERR-01**: Missing username field (password provided)
  - **Risk**: HIGH
  - **ACs Covered**: AC-2
  - **Field**: Username
- **ERR-02**: Missing password field (username provided)
  - **Risk**: HIGH
  - **ACs Covered**: AC-3
  - **Field**: Password
- **ERR-03**: Both username and password fields empty
  - **Risk**: HIGH
  - **ACs Covered**: AC-2, AC-3
  - **Field**: Username, Password
  - **TC Count**: 3 (all mandatory field combinations)

#### Edge Case / Boundary (EDGE)
- **EDGE-01**: Username with leading/trailing whitespace
  - **Risk**: MEDIUM
  - **ACs Covered**: AC-2
  - **Parameter**: username
  - **Boundary**: whitespace
- **EDGE-02**: Password with leading/trailing whitespace
  - **Risk**: MEDIUM
  - **ACs Covered**: AC-3
  - **Parameter**: password
  - **Boundary**: whitespace
- **EDGE-03**: Case sensitivity test (username 'TESTER' vs 'Tester')
  - **Risk**: MEDIUM
  - **ACs Covered**: AC-2
  - **Parameter**: username
  - **Boundary**: case
- **EDGE-04**: Case sensitivity test (password 'TEST' vs 'test')
  - **Risk**: MEDIUM
  - **ACs Covered**: AC-3
  - **Parameter**: password
  - **Boundary**: case
  - **TC Count**: 4 (comprehensive boundary coverage for authentication)

### Recommended Scenarios

None — all identified scenarios are MANDATORY for CRITICAL risk authentication story.

### Optional Scenarios

None

---

## Quality Gates

These gates MUST all pass before the test case output is accepted.

| Gate | Threshold | Mandatory |
|------|-----------|---------|
| AC Traceability | 100% — every AC item covered by ≥ 1 TC | YES |
| HP Coverage | All 1 HP scenarios generated | YES |
| NEG Coverage | All 3 NEG scenarios generated | YES |
| ERR Coverage | All 3 ERR scenarios generated | YES |
| EDGE Coverage | All 4 EDGE TCs generated | YES |
| Parameterization | 0 hardcoded SAP values | YES |
| Automation Eligibility | ≥ 9 TCs flagged as Automation Candidate: YES (82% of total) | YES |

**CRITICAL risk additional gates:**
- **Negative coverage (entity validation)**: 100% — all 3 invalid credential combinations covered ✓
- **Error coverage (mandatory fields)**: 100% — all 3 mandatory field scenarios covered (username, password, both) ✓

**Overall pass threshold:** All mandatory gates must PASS.

---

## Test Case Priority Assignment

| Scenario Type | Priority | Severity | Rationale |
|--------------|----------|----------|-----------|
| HP (core transaction) | CRITICAL | CRITICAL | Authentication is the gateway to all application functionality; failure blocks 100% of business operations |
| NEG (invalid entity) | HIGH | MAJOR | Invalid credential rejection is a core security control; prevents unauthorized access |
| ERR (missing field) | HIGH | MAJOR | Mandatory field validation is essential for data integrity and security |
| EDGE (boundary) | MEDIUM | MINOR | Edge cases validate authentication robustness (whitespace, case sensitivity) but do not block core functionality |
| AP (alternative) | N/A | N/A | Not applicable — no alternative valid paths |
| INT (integration) | N/A | N/A | Not applicable — no linked issues |

---

## Automation Viability

| Scenario Type | Candidate | Notes |
|--------------|-----------|-------|
| HP | YES | Core regression candidate for Playwright; stable UI flow with predictable outcomes |
| AP | N/A | Not applicable |
| NEG | YES | Stable validation checks; error message assertions are machine-verifiable |
| ERR | YES | Field-level validation stable; client-side or server-side error messages are deterministic |
| EDGE | YES | Boundary value testing fully automatable (whitespace trimming, case sensitivity) |
| INT | N/A | Not applicable |

**Target automation coverage:** 11 of 11 TCs (100%)

**Automation notes:**
- Login functionality is highly stable and repeatable — ideal for Playwright automation
- Error message assertions require exact text matching (capture actual error text during scriptless execution)
- Session establishment verification requires checking for presence of application menus or user profile indicator
- Browser cookies must be enabled for session persistence tests

---

## Test Execution Order

Execute test cases in this order during regression and CI/CD runs:

```
Priority 1 — CRITICAL (execute first):
  TC-CS-021 — HP-01: Valid login flow (Tester / test → Products page)

Priority 2 — HIGH (validate immediately after):
  TC-CS-022 — NEG-01: Invalid username + valid password
  TC-CS-023 — NEG-02: Valid username + invalid password
  TC-CS-024 — NEG-03: Invalid username + invalid password
  TC-CS-025 — ERR-01: Missing username (password provided)
  TC-CS-026 — ERR-02: Missing password (username provided)
  TC-CS-027 — ERR-03: Both fields empty

Priority 3 — MEDIUM (complete coverage):
  TC-CS-028 — EDGE-01: Username with whitespace
  TC-CS-029 — EDGE-02: Password with whitespace
  TC-CS-030 — EDGE-03: Username case sensitivity (TESTER vs Tester)
  TC-CS-031 — EDGE-04: Password case sensitivity (TEST vs test)

Priority 4 — Integration (run after core stability confirmed):
  None
```

**Execution notes:**
- HP test must pass before proceeding to NEG/ERR tests (confirms login page is accessible)
- NEG and ERR tests can run in parallel (independent validation scenarios)
- EDGE tests should run after core validation is confirmed stable

---

## Regulatory and Compliance Notes

- **Authentication security**: Login functionality is a critical security control. Test cases must verify that:
  - Invalid credentials are rejected with appropriate error messages
  - Missing mandatory fields are handled gracefully (no application crash or stack trace exposure)
  - Session tokens are established only after successful authentication
  - No sensitive information (passwords) is logged or exposed in error messages

- **Test data governance**:
  - Use dedicated test account credentials (Tester / test)
  - Do not use production user accounts for testing
  - Password values in test data JSON must be marked as sensitive (consider encryption or external secrets management for CI/CD environments)

- **Browser compatibility**: Web Orders is a web application — consider testing across multiple browsers (Chrome, Firefox, Edge) if required by business stakeholders

- **Standard test governance**:
  - All test execution must use dedicated test system instances (not production)
  - Test results must be logged with timestamps for audit trail

---

## TestCase Agent Instructions

When consuming this strategy:

1. Read `CS-15-risk-profile.json` for the structured scenario inventory
2. Generate test cases for ALL MANDATORY scenario types first (HP, NEG, ERR, EDGE — total 11 TCs)
3. No RECOMMENDED or OPTIONAL types apply for this story
4. Apply quality gates table — verify all thresholds are met before completing:
   - AC traceability: 100% (all 7 ACs covered)
   - HP coverage: 1 TC generated
   - NEG coverage: 3 TCs generated
   - ERR coverage: 3 TCs generated
   - EDGE coverage: 4 TCs generated
   - Parameterization: 0 hardcoded values (use `{TD.*}` placeholders)
   - Automation eligibility: All 11 TCs flagged as YES (100%)
5. Use `prompts/testcase-generation-from-userstory.md` as the generation template
6. Flag automation candidates per the Automation Viability table above (all TCs = YES)
7. Output files to `testcases/AI-generated testcases/CS-15/` and `testdata/CS-15/`
8. **Critical**: Capture actual error message text during scriptless execution (NEG and ERR scenarios) for accurate Expected Result assertions
9. **Session verification**: HP test case must include explicit verification that application menus/user profile are visible after login (AC-7)
10. **Test data structure**: Create separate test data sets for:
    - Valid credentials (HP)
    - Invalid username variations (NEG-01, NEG-03)
    - Invalid password variations (NEG-02, NEG-03)
    - Whitespace variations (EDGE-01, EDGE-02)
    - Case variations (EDGE-03, EDGE-04)
    - Empty/missing field variations (ERR-01, ERR-02, ERR-03)
11. **Environment configuration**: Use `{ENV.WEB_ORDERS_URL}` placeholder for login page URL
12. **Test data placeholders**:
    - `{TD.VALID_USERNAME}` — valid username (default: "Tester")
    - `{TD.VALID_PASSWORD}` — valid password (default: "test")
    - `{TD.INVALID_USERNAME}` — invalid username for NEG scenarios
    - `{TD.INVALID_PASSWORD}` — invalid password for NEG scenarios
    - `{TD.USERNAME_WITH_WHITESPACE}` — username with leading/trailing spaces
    - `{TD.PASSWORD_WITH_WHITESPACE}` — password with leading/trailing spaces
    - `{TD.USERNAME_UPPERCASE}` — username in uppercase (TESTER)
    - `{TD.PASSWORD_UPPERCASE}` — password in uppercase (TEST)
