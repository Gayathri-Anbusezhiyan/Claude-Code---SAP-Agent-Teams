# Test Coverage Matrix: [CS-27] Maintain A Purchasing Contract (Outline Agreement) With Negotiated Pri

**Generated:** 2026-08-24  
**User Story:** CS-27  
**Module:** MM — Materials Management  
**Feature:** Purchasing Contract (Outline Agreement) Creation and Maintenance  

---

## Coverage Completeness

| Scenario Type | Required (min) | Generated | Status |
|---------------|---------------|-----------|--------|
| Happy Path    | ≥ 1           | 4         | ✅ PASS |
| Alternative   | 2             | 2         | ✅ PASS |
| Negative      | 6             | 6         | ✅ PASS |
| Error         | 8             | 8         | ✅ PASS |
| Edge Case     | ≥ 2           | 10        | ✅ PASS |
| Integration   | 0             | 0         | ✅ N/A |
| **TOTAL**     | **30**        | **30**    | **✅ PASS** |

**Overall Status:** ✅ **COMPLETE** — All 30 planned test cases generated per strategy document

---

## Acceptance Criteria to Test Case Traceability

### AC-1: The user can access the "Manage Purchase Contracts" Fiori app

| AC ID | Risk Level | Test Cases | Scenario Types | Coverage |
|-------|-----------|------------|---------------|----------|
| AC-1 | LOW | TC-CS-093 | HP | ✅ Complete |

**Coverage Analysis:** Covered by TC-CS-093 (standard contract creation) which includes navigation to the application.

---

### AC-2: The user can define target quantity/value, validity period, and tiered pricing conditions

| AC ID | Risk Level | Test Cases | Scenario Types | Coverage |
|-------|-----------|------------|---------------|----------|
| AC-2 | HIGH | TC-CS-093, TC-CS-094, TC-CS-097, TC-CS-098 (HP/AP)<br>TC-CS-103, TC-CS-104 (NEG)<br>TC-CS-107, TC-CS-108, TC-CS-109, TC-CS-110 (ERR)<br>TC-CS-113, TC-CS-114, TC-CS-115, TC-CS-116, TC-CS-117, TC-CS-118 (EDGE) | HP, AP, NEG, ERR, EDGE | ✅ Complete |

**Coverage Analysis:** 16 test cases covering:
- **HP:** Standard contract with single-tier (TC-CS-093), multi-tier pricing (TC-CS-094)
- **AP:** Target Value only (TC-CS-097), Target Qty + Value dual (TC-CS-098)
- **NEG:** Invalid date order (TC-CS-103), invalid tier order (TC-CS-104)
- **ERR:** Missing Target Qty/Value (TC-CS-107), missing dates (TC-CS-108, TC-CS-109), missing price (TC-CS-110)
- **EDGE:** Min/max quantity (TC-CS-113, TC-CS-114), min value (TC-CS-115), min price (TC-CS-116), date boundaries (TC-CS-117, TC-CS-118)

---

### AC-3: The system tracks cumulative release quantities/values against the contract limit

| AC ID | Risk Level | Test Cases | Scenario Types | Coverage |
|-------|-----------|------------|---------------|----------|
| AC-3 | CRITICAL | TC-CS-095 (HP)<br>TC-CS-101, TC-CS-102 (NEG)<br>TC-CS-113, TC-CS-114, TC-CS-121, TC-CS-122 (EDGE) | HP, NEG, EDGE | ✅ Complete |

**Coverage Analysis:** 7 test cases covering:
- **HP:** Release orders within limit with cumulative tracking (TC-CS-095)
- **NEG:** Exceed quantity limit (TC-CS-101), exceed value limit (TC-CS-102)
- **EDGE:** Min/max quantity boundaries (TC-CS-113, TC-CS-114), exact match quantity (TC-CS-121), exact match value (TC-CS-122)

---

### AC-4: The system warns when a release order would exceed the remaining contract balance

| AC ID | Risk Level | Test Cases | Scenario Types | Coverage |
|-------|-----------|------------|---------------|----------|
| AC-4 | CRITICAL | TC-CS-101, TC-CS-102 (NEG)<br>TC-CS-121, TC-CS-122 (EDGE) | NEG, EDGE | ✅ Complete |

**Coverage Analysis:** 4 test cases covering:
- **NEG:** Warning when exceeding quantity (TC-CS-101), warning when exceeding value (TC-CS-102)
- **EDGE:** Exact match scenarios (TC-CS-121, TC-CS-122) validate boundary behavior

---

### AC-5: The contract can be linked to a specific approved vendor and material combination consistent with the source list

| AC ID | Risk Level | Test Cases | Scenario Types | Coverage |
|-------|-----------|------------|---------------|----------|
| AC-5 | HIGH | TC-CS-093 (HP)<br>TC-CS-099, TC-CS-100 (NEG)<br>TC-CS-105, TC-CS-106, TC-CS-112 (ERR) | HP, NEG, ERR | ✅ Complete |

**Coverage Analysis:** 6 test cases covering:
- **HP:** Valid vendor-material with source list (TC-CS-093)
- **NEG:** Vendor not approved (TC-CS-099), material not in source list (TC-CS-100)
- **ERR:** Missing supplier (TC-CS-105), missing material (TC-CS-106), missing plant (TC-CS-112)

---

### AC-6: The system alerts the Procurement team a configurable number of days before contract expiration

| AC ID | Risk Level | Test Cases | Scenario Types | Coverage |
|-------|-----------|------------|---------------|----------|
| AC-6 | MEDIUM | TC-CS-096 (HP)<br>TC-CS-119, TC-CS-120 (EDGE) | HP, EDGE | ✅ Complete |

**Coverage Analysis:** 3 test cases covering:
- **HP:** Standard alert trigger (TC-CS-096)
- **EDGE:** Alert lead time boundaries (TC-CS-119: 0 days, TC-CS-120: 365 days)

---

## Test Case Summary by Scenario Type

### Happy Path (4 test cases)

| TC ID | Title | Priority | AC Coverage | Automation |
|-------|-------|----------|-------------|------------|
| TC-CS-093 | Create a valid purchasing contract with single-tier pricing and valid vendor-material combination | CRITICAL | AC-1, AC-2, AC-5 | YES |
| TC-CS-094 | Create a purchasing contract with multi-tier pricing (three ascending quantity tiers) | CRITICAL | AC-2 | YES |
| TC-CS-095 | Create release orders against contract within target quantity limit and verify cumulative tracking updates | CRITICAL | AC-3 | PARTIAL |
| TC-CS-096 | Verify expiration alert is triggered the configured number of days before contract end date | CRITICAL | AC-6 | NO |

---

### Alternative Path (2 test cases)

| TC ID | Title | Priority | AC Coverage | Automation |
|-------|-------|----------|-------------|------------|
| TC-CS-097 | Create a purchasing contract using Target Value instead of Target Quantity | CRITICAL | AC-2 | YES |
| TC-CS-098 | Create a purchasing contract with both Target Quantity AND Target Value specified | CRITICAL | AC-2 | YES |

---

### Negative (6 test cases)

| TC ID | Title | Priority | AC Coverage | Automation |
|-------|-------|----------|-------------|------------|
| TC-CS-099 | Attempt to create a contract with a vendor not approved for the purchasing organization | HIGH | AC-5 | YES |
| TC-CS-100 | Attempt to create a contract with a material not in the source list for the vendor | HIGH | AC-5 | YES |
| TC-CS-101 | Attempt to create a release order that exceeds the remaining contract quantity | CRITICAL | AC-3, AC-4 | PARTIAL |
| TC-CS-102 | Attempt to create a release order that exceeds the remaining contract value | CRITICAL | AC-3, AC-4 | PARTIAL |
| TC-CS-103 | Attempt to create a contract with Validity End Date before Validity Start Date | HIGH | AC-2 | YES |
| TC-CS-104 | Attempt to create tiered pricing with non-ascending quantity thresholds | HIGH | AC-2 | YES |

---

### Error / Missing Field (8 test cases)

| TC ID | Title | Priority | AC Coverage | Automation |
|-------|-------|----------|-------------|------------|
| TC-CS-105 | Attempt to create a contract with missing Supplier field | HIGH | AC-5 | YES |
| TC-CS-106 | Attempt to create a contract with missing Material field | HIGH | AC-5 | YES |
| TC-CS-107 | Attempt to create a contract with both Target Quantity AND Target Value missing | HIGH | AC-2 | YES |
| TC-CS-108 | Attempt to create a contract with missing Validity Start Date | HIGH | AC-2 | YES |
| TC-CS-109 | Attempt to create a contract with missing Validity End Date | HIGH | AC-2 | YES |
| TC-CS-110 | Attempt to create a contract with missing Net Price | HIGH | AC-2 | YES |
| TC-CS-111 | Attempt to create a contract with missing Purchasing Organization | HIGH | AC-2 | YES |
| TC-CS-112 | Attempt to create a contract with missing Plant | HIGH | AC-5 | YES |

---

### Edge Case / Boundary (10 test cases)

| TC ID | Title | Priority | AC Coverage | Automation |
|-------|-------|----------|-------------|------------|
| TC-CS-113 | Create a contract with Target Quantity = 1 (minimum boundary) | HIGH | AC-2, AC-3 | YES |
| TC-CS-114 | Create a contract with Target Quantity = 999999999 (maximum boundary) | HIGH | AC-2, AC-3 | YES |
| TC-CS-115 | Create a contract with Target Value = 0.01 (minimum boundary) | HIGH | AC-2, AC-3 | YES |
| TC-CS-116 | Create a contract with Net Price = 0.01 (minimum boundary) | HIGH | AC-2 | YES |
| TC-CS-117 | Create a contract with Validity Start Date = today (current date) | MEDIUM | AC-2 | YES |
| TC-CS-118 | Create a contract with Validity End Date = Start Date + 1 day (minimum valid period) | MEDIUM | AC-2 | YES |
| TC-CS-119 | Create a contract with Alert Lead Time = 0 (no alert configuration) | MEDIUM | AC-6 | YES |
| TC-CS-120 | Create a contract with Alert Lead Time = 365 days (maximum typical value) | MEDIUM | AC-6 | YES |
| TC-CS-121 | Create a release order where quantity exactly equals remaining contract quantity | HIGH | AC-3, AC-4 | PARTIAL |
| TC-CS-122 | Create a release order where value exactly equals remaining contract value | HIGH | AC-3, AC-4 | PARTIAL |

---

## Automation Summary

| Automation Status | Count | Percentage | Test Cases |
|------------------|-------|------------|------------|
| **YES (Fully Automatable)** | 23 | 76.7% | TC-CS-093, TC-CS-094, TC-CS-097, TC-CS-098, TC-CS-099, TC-CS-100, TC-CS-103, TC-CS-104, TC-CS-105, TC-CS-106, TC-CS-107, TC-CS-108, TC-CS-109, TC-CS-110, TC-CS-111, TC-CS-112, TC-CS-113, TC-CS-114, TC-CS-115, TC-CS-116, TC-CS-117, TC-CS-118, TC-CS-119 |
| **PARTIAL (Partially Automatable)** | 6 | 20.0% | TC-CS-095, TC-CS-101, TC-CS-102, TC-CS-120, TC-CS-121, TC-CS-122 |
| **NO (Manual Only)** | 1 | 3.3% | TC-CS-096 |
| **TOTAL** | 30 | 100% | All test cases |

**Automation Viability:** 96.7% of test cases are fully or partially automatable (29 out of 30).

**Manual Testing Required:**
- **TC-CS-096:** Alert trigger verification requires time-based background job execution (manual verification of alert delivery via Notification Center, Workflow, or email)

**Partial Automation Notes:**
- **TC-CS-095, TC-CS-101, TC-CS-102, TC-CS-121, TC-CS-122:** Cross-app workflows (Manage Purchase Contracts → Manage Purchase Orders → back) require extended Playwright scripting
- **TC-CS-120:** Alert lead time = 365 days requires manual verification of alert trigger date calculation (configuration save is automatable)

---

## Priority Distribution

| Priority | Count | Percentage | Risk Profile |
|----------|-------|------------|--------------|
| **CRITICAL** | 8 | 26.7% | HP (4), AP (2), NEG (2) — Core business flows and CRITICAL risk scenarios |
| **HIGH** | 16 | 53.3% | NEG (4), ERR (8), EDGE (4) — HIGH risk validations and mandatory field enforcement |
| **MEDIUM** | 6 | 20.0% | EDGE (6) — Date and alert boundary scenarios (lower business impact) |
| **LOW** | 0 | 0.0% | None — All scenarios have MEDIUM or higher business impact |
| **TOTAL** | 30 | 100% | Balanced coverage across all risk levels |

---

## Quality Gate Compliance

| Quality Gate | Criteria | Target | Actual | Status |
|-------------|----------|--------|--------|--------|
| **QG-1: AC Traceability** | Every AC covered by minimum required TCs | 100% | 100% (6/6 ACs) | ✅ PASS |
| **QG-2: Happy Path Coverage** | At least 4 HP TCs | 4 TCs | 4 TCs | ✅ PASS |
| **QG-3: Negative Coverage** | All CRITICAL/HIGH risk NEG scenarios | 6 TCs | 6 TCs | ✅ PASS |
| **QG-4: Error Handling Coverage** | All mandatory fields validated | 8 TCs | 8 TCs | ✅ PASS |
| **QG-5: Boundary Value Coverage** | CRITICAL/HIGH parameters at boundaries | 10 TCs | 10 TCs | ✅ PASS |
| **QG-6: Parameterization** | 100% of TCs use `{TD.*}` placeholders | 100% | 100% | ✅ PASS |
| **QG-7: Expected Result Specificity** | Observable SAP-specific results | 100% | 100% | ✅ PASS |
| **QG-8: Automation Eligibility** | All TCs marked with automation flag | 100% | 100% | ✅ PASS |

**Overall Quality Gate Status:** ✅ **ALL GATES PASSED**

---

## Test Execution Readiness

### Prerequisites Validation Checklist

- [ ] **Master Data Setup:** Vendor `{TD.validVendorId}`, Material `{TD.validMaterialId}`, Source List entry exist in SAP tenant
- [ ] **User Authorization:** Test user has M_EINK_EKO authorization for purchasing org `{TD.purchasingOrg}`
- [ ] **Configuration:** Contract number range configured for document type MK
- [ ] **Test Data Resolution:** All `{{PLACEHOLDER}}` values in testdata JSON resolved to actual SAP tenant data
- [ ] **Environment Access:** SAP Fiori Launchpad accessible at `{ENV.SAP_FIORI_URL}`

### Recommended Execution Order

1. **Wave 1 (P1 — CRITICAL):** TC-CS-093 to TC-CS-098 (HP + AP) — 6 TCs
2. **Wave 2 (P1 — CRITICAL NEG):** TC-CS-101, TC-CS-102 (release limit validation) — 2 TCs
3. **Wave 3 (P2 — HIGH NEG):** TC-CS-099, TC-CS-100, TC-CS-103, TC-CS-104 (master data + data integrity) — 4 TCs
4. **Wave 4 (P2 — HIGH ERR):** TC-CS-105 to TC-CS-112 (mandatory field validation) — 8 TCs
5. **Wave 5 (P2 — HIGH EDGE):** TC-CS-113, TC-CS-114, TC-CS-115, TC-CS-116, TC-CS-121, TC-CS-122 (financial/quantity boundaries) — 6 TCs
6. **Wave 6 (P3 — MEDIUM EDGE):** TC-CS-117, TC-CS-118, TC-CS-119, TC-CS-120 (date/alert boundaries) — 4 TCs

**Total Estimated Effort (Scriptless Execution):** 11-13 hours  
**Total Estimated Effort (Automated Execution):** 6-7 hours (after scripts generated)

---

## Coverage Gaps and Notes

### No Coverage Gaps Identified
All 6 Acceptance Criteria are fully covered by the 30 generated test cases. Coverage model per strategy document (4 HP, 2 AP, 6 NEG, 8 ERR, 10 EDGE) has been met.

### Integration Testing
No integration test cases generated as there are no linked issues (AC-6 alerting is internal SAP workflow, not cross-module integration).

### Known Limitations
1. **TC-CS-096 (Alert Trigger):** Manual verification required for time-based alert delivery
2. **Cross-App Workflows (TC-CS-095, TC-CS-101, TC-CS-102, TC-CS-121, TC-CS-122):** Require extended automation scripts to navigate between "Manage Purchase Contracts" and "Manage Purchase Orders" apps
3. **Source List Validation (TC-CS-100):** May require backend SAP table query (EINA/EINE) if UI error message is not explicit

---

**Test Case Generation Complete:** ✅  
**Coverage Matrix Status:** ✅ **APPROVED FOR EXECUTION**  
**Next Phase:** Phase 3 — Scriptless Execution + Exploration Data Capture  
**Command:** `/run-scriptless CS-27` (after test data resolution)

---
