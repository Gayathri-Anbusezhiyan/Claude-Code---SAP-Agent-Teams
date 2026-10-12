# Story Analysis: [CS-15] TC001_Weblogin

**Analysed:** 2026-08-21
**Analysed By:** test-strategy-agent/skills/analyze-userstory
**User Story JSON:** jira/userstories/CS-15/CS-15.json

---

## Story Decomposition

| Attribute | Value |
|-----------|-------|
| Actor | Web Orders user |
| Core Action | Log in with valid credentials |
| Business Goal | Access the Web Orders application and perform order management activities |
| Business Object | User Session / Authentication Token |
| SAP Module | Not SAP — Web Orders Application (External) |
| Complexity | Simple (no story points assigned) |

### Implicit Business Rules (Domain-Inferred)
- User account must exist in the Web Orders system with username "Tester"
- Password must match the stored credential for the username
- Session cookie/token must be established upon successful authentication
- Unauthenticated users must not have access to application pages
- Login page must be publicly accessible (no authentication required to view the login form)
- Browser must accept cookies for session persistence

---

## Acceptance Criteria Analysis

| AC ID | Acceptance Criterion | AC Type | Risk | Test Techniques | Scenarios Required | Min TCs |
|-------|---------------------|---------|------|-----------------|-------------------|---------|
| AC-1 | User can access the Web Orders login page. | NAVIGATION | LOW | EP | HP | 1 |
| AC-2 | User can enter a valid username (Tester). | VALIDATION_POSITIVE | MEDIUM | EP | HP | 1 |
| AC-3 | User can enter a valid password (test). | VALIDATION_POSITIVE | MEDIUM | EP | HP | 1 |
| AC-4 | User can successfully click the Login button. | NAVIGATION | LOW | EP | HP | 1 |
| AC-5 | User is redirected to the Web Orders landing page after successful authentication. | SUCCESS_CONFIRMATION | CRITICAL | EP | HP | 1 |
| AC-6 | No authentication error message is displayed. | VALIDATION_NEGATIVE | HIGH | EP | NEG | 1 |
| AC-7 | User session is established and application menus are accessible. | SUCCESS_CONFIRMATION | HIGH | EP, ST | HP | 1 |

---

## Data Parameter Inventory

### Input Parameters
| Parameter | Field Label (Web UI) | Data Type | Mandatory | Valid Range / Values |
|-----------|---------------------|-----------|-----------|---------------------|
| Username | Username | String | Yes | "Tester" (valid account) |
| Password | Password | String | Yes | "test" (valid credential) |

### Auto-populated Parameters
| Parameter | Field Label | Trigger | Source |
|-----------|------------|---------|--------|
| Session Token | (not visible to user) | Successful authentication | Web Orders authentication service |
| User Display Name | (displayed in header after login) | Session establishment | User account profile |

### Output Parameters
| Parameter | Description | Format |
|-----------|-------------|--------|
| Session Cookie | Browser cookie establishing authenticated session | HTTP cookie (domain-specific) |
| Landing Page URL | URL of the Web Orders landing page (Products.aspx) | http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Products.aspx |

### Boundary Parameters
| Parameter | Lower Boundary | Upper Boundary | Zero Value | Notes |
|-----------|---------------|---------------|------------|-------|
| Username length | 1 character | System-defined max (typically 255) | Empty (invalid) | Required field |
| Password length | 1 character | System-defined max (typically 255) | Empty (invalid) | Required field |

---

## Risk Assessment

| Scenario Area | Business Impact | Failure Probability | Risk Level | Rationale |
|--------------|----------------|--------------------|-----------||
| Authentication success (valid credentials) | CRITICAL | LOW | CRITICAL | Core security operation; blocks all downstream functionality |
| Login page accessibility | MEDIUM | LOW | MEDIUM | Users cannot authenticate if page unavailable |
| Session establishment | HIGH | LOW | HIGH | Session failure prevents access to all application features |
| Input field validation | MEDIUM | LOW | MEDIUM | Basic UI interaction; low technical risk |
| Error message handling (invalid credentials) | HIGH | MEDIUM | HIGH | Security feedback mechanism; must prevent brute force |
| Navigation/redirection | MEDIUM | LOW | MEDIUM | User experience impact if landing page incorrect |

---

## Integration Risk

None — no linked issues identified.

---

## Scenario Inventory

SCENARIO INVENTORY — CS-15: TC001_Weblogin
Module: Web Orders (External Application)

Happy Path Scenarios:
  HP-01: User accesses login page, enters valid credentials (Tester / test), clicks Login, and is successfully redirected to the Products page with active session — Risk: CRITICAL — ACs: AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7

Negative Scenarios:
  NEG-01: User enters invalid username and valid password — Risk: HIGH — ACs: AC-6
  NEG-02: User enters valid username and invalid password — Risk: HIGH — ACs: AC-6
  NEG-03: User enters invalid username and invalid password — Risk: HIGH — ACs: AC-6

Error Scenarios:
  ERR-01: Missing username field (password provided) — Risk: HIGH — ACs: AC-2
  ERR-02: Missing password field (username provided) — Risk: HIGH — ACs: AC-3
  ERR-03: Both username and password fields empty — Risk: HIGH — ACs: AC-2, AC-3

Edge Cases:
  EDGE-01: Username with leading/trailing whitespace — Risk: MEDIUM — ACs: AC-2
  EDGE-02: Password with leading/trailing whitespace — Risk: MEDIUM — ACs: AC-3
  EDGE-03: Case sensitivity test (username "TESTER" vs "Tester") — Risk: MEDIUM — ACs: AC-2
  EDGE-04: Case sensitivity test (password "TEST" vs "test") — Risk: MEDIUM — ACs: AC-3

Integration Scenarios:
  (None — no linked issues)

---

## Recommended TC Count

| Scenario Type | Count | Rationale |
|---------------|-------|-----------|
| HP | 1 | Single valid authentication flow covers all positive ACs |
| AP | 0 | None — no alternative valid paths |
| NEG | 3 | Three invalid credential combinations (invalid user, invalid password, both invalid) |
| ERR | 3 | Three mandatory field combinations (missing user, missing password, both missing) |
| EDGE | 4 | Whitespace handling (2) + case sensitivity (2) |
| INT | 0 | None — no linked issues |
| **TOTAL** | **11** | |
